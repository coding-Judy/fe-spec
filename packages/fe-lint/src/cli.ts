/*
 * @Author: conglongping 1010578148@qq.com
 * @Date: 2024-12-31 14:46:49
 * @LastEditors: conglongping 1010578148@qq.com
 * @LastEditTime: 2025-01-02 19:49:32
 * @FilePath: \cli-demo\src\cli.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { execSync } from 'child_process';
import { program } from 'commander';
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import glob from 'glob';
import ora from 'ora';
import path from 'path';
import init from './actions/init';
import scan from './actions/scan';
import update from './actions/update';
import { PKG_NAME, PKG_VERSION } from './utils/constants';
import generateTemplate from './utils/generate-template';
import log from './utils/log';
import npmType from './utils/npm-type';
import printReport from './utils/print-report';

const cwd = process.cwd();

/**
 * 若无 node_modules，则帮用户 install（否则会找不到 config）
 */
const installDepsIfThereNo = async () => {
  const lintConfigFiles = [].concat(
    glob.sync('.eslintrc?(.@(js|yaml|yml|json))', { cwd }),
    glob.sync('.stylelintre?(.@(js|yaml|yml|json))', { cwd }),
    glob.sync('markdownlint(.@(yaml|yml|json))', { cwd }),
  );
  const nodeModulesPath = path.resolve(cwd, 'node_modules');

  if (!fs.existsSync(nodeModulesPath) && lintConfigFiles.length > 0) {
    const npm = await npmType;
    log.info(`使用项目 Lint 配置，检测到项目未安装依赖，将进行安装（执行 ${npm} install）`);
    execSync(`cd${cwd}&& ${npm} i`);
  }
};

program
  .version(PKG_VERSION)
  .description(
    `${PKG_NAME} 是 印客学院前端编码规范工程化 的配套 Lint 工具，提供简单的 CLI 和 Node.js API，让项目能够一键接入、一键扫描、一键修复、一键升级，并为项目配置 git commit 卡点，降低项目实施规约的成本`,
  );

program
  .command('init')
  .description('一键接入：为项目初始化规约工具喝配置，可以根据项目类型和需求进行定制')
  .option('--vscode', '写入.vscode/setting.json配置')
  .action(async (cmd) => {
    if (cmd.vscode) {
      const configPath = path.resolve(cwd, `${PKG_NAME}.config.js`);
      generateTemplate(cwd, require(configPath), true);
    } else {
      await init({
        cwd,
        checkVersionUpdate: true,
      });
    }
  });

program
  .command('scan')
  .description('一键扫描：对项目进行代码规范问题扫描')
  .option('-q,--quiet', '仅报告错误信息 - 默认：false')
  .option('-o,--output-report', '输出扫描出的规范问题日志')
  .option('-i,--include <dirpath>', '指定要进行规范扫描的目录')
  .option('--no--ignore', '忽略eslint 的 ignore配置文件和ignore 规则')
  .action(async (cmd) => {
    await installDepsIfThereNo();
    const checking = ora();
    checking.start(`执行${PKG_NAME} 代码检查`);
    const { results, errorCount, warningCount, runErrors } = await scan({
      cwd,
      fix: false,
      include: cmd.include || cwd,
      quiet: Boolean(cmd.quiet),
      outputReport: Boolean(cmd.outputReport),
      ignore: cmd.ignore, // 对应 --no-ignore
    });
    let type = 'succeed';
    if (runErrors.length > 0 || errorCount > 0) {
      type = 'fail';
    } else if (warningCount > 0) {
      type = 'warn';
    }

    checking[type]();
    if (results.length > 0) printReport(results, false);

    // 输出 lint 运行错误
    runErrors.forEach((e) => console.log(e));
  });

program
  .command('commit-msg-scan')
  .description('commit message 检查：git commit 时对commit message 进行检查')
  .action(() => {
    const result = spawn.sync('commitlint', ['-E', 'HUSKY_GIT_PARAMS'], { stdio: 'inherit' });

    if (result.status !== 0) {
      process.exit(result.status);
    }
  });

program
  .command('update')
  .description(`更新${PKG_NAME}至最新版本`)
  .action(() => update(true));