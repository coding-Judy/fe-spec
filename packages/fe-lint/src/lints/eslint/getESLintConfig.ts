import { ESLint } from 'eslint';
import fs from 'fs-extra';
import { glob } from 'glob';
import path from 'path';
import { Config, PKG, ScanOptions } from '../../types';
import { ESLINT_FILE_EXT } from '../../utils/constants';
import { getESLintConfigType } from './getESLintConfigType';

export function getESLintConfig(opts: ScanOptions, pkg: PKG, config: Config): ESLint.Options {
  const { cwd, fix, ignore } = opts;
  const lintConfig: ESLint.Options = {
    cwd,
    fix,
    ignore,
    extensions: ESLINT_FILE_EXT,
    errorOnUnmatchedPattern: false,
  };

  if (config.eslintOptions) {
    //若用户传入了eslintOptions,则用用户的
    Object.assign(lintConfig, config.eslintOptions);
  } else {
    //根据扫描目录下有无lintrc文件，若无则使用默认的lint配置
    const lintConfigFiles = glob.sync('.eslintrc?(.@(js|yaml|yml|json))', { cwd });
    if (lintConfigFiles.length === 0 && !pkg.eslintConfig) {
      lintConfig.resolvePluginsRelativeTo = path.resolve(__dirname, '../../');
      lintConfig.useEslintrc = false;
      lintConfig.baseConfig = {
        extends: [
          getESLintConfigType(cwd, pkg),
          //ESLint 不再管格式问题，直接使用Prettier 进行格式化
          ...(config.enablePrettier ? ['prettier'] : []),
        ],
      };
    }
    //根据扫描目录下有无lintignore 文件 若无则使用默认的ignore配置
    const lintIgnoreFiles = path.resolve(cwd, '.eslintignore');
    if (!fs.existsSync(lintIgnoreFiles) && !pkg.eslintIgnore) {
      lintConfig.ignorePath = path.resolve(__dirname, '../config/_eslintignore.ejs');
    }
  }

  return lintConfig;
}
