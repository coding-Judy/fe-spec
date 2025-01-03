/*
 * @Author: conglongping 1010578148@qq.com
 * @Date: 2025-01-02 20:30:10
 * @LastEditors: conglongping 1010578148@qq.com
 * @LastEditTime: 2025-01-03 11:09:19
 * @FilePath: \demo\packages\colp-fe-lint\src\actions\scan.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import fs from 'fs-extra';
import path from 'path';
import { doESLint, doMarkdownlint, doPrettier, doStylelint } from '../lints';
import { Config, PKG, ScanOptions, ScanReport, ScanResult } from '../types';
import { PKG_NAME } from '../utils/constants';
export default async (options: ScanOptions): Promise<ScanReport> => {
  const { cwd, fix, outputReport, config: scanConfig } = options;
  const readConfigFile = (pth: string) => {
    const localPath = path.resolve(cwd, pth);
    return fs.existsSync(localPath) ? require(localPath) : {};
  };
  const pkg: PKG = readConfigFile('package.json');
  const config: Config = scanConfig || readConfigFile(`${PKG_NAME}.config.js`);
  const runErrors: Error[] = [];
  let results: ScanResult[] = [];

  //prettier
  if (fix && config.enablePrettier !== false) {
    await doPrettier(options);
  }

  //eslint
  if (config.enableESLint !== false) {
    try {
      const eslintResults = await doESLint({ ...options, pkg, config });
      results = results.concat(eslintResults);
    } catch (e) {
      runErrors.push(e);
    }
  }
  // stylelint
  if (config.enableStylelint !== false) {
    try {
      const stylelintResults = await doStylelint({ ...options, pkg, config });
      results = results.concat(stylelintResults);
    } catch (e) {
      runErrors.push(e);
    }
  }

  // markdown
  if (config.enableMarkdownlint !== false) {
    try {
      const markdownlintResults = await doMarkdownlint({ ...options, pkg, config });
      results = results.concat(markdownlintResults);
    } catch (e) {
      runErrors.push(e);
    }
  }

  // 生成报告报告文件
  if (outputReport) {
    const reportPath = path.resolve(process.cwd(), `./${PKG_NAME}-report.json`);
    fs.outputFile(reportPath, JSON.stringify(results, null, 2), () => {});
  }

  return {
    results,
    errorCount: results.reduce((count, { errorCount }) => count + errorCount, 0),
    warningCount: results.reduce((count, { warningCount }) => count + warningCount, 0),
    runErrors,
  };
};
