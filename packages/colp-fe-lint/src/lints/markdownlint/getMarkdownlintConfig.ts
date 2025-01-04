/*
 * @Author: conglongping 1010578148@qq.com
 * @Date: 2025-01-02 20:30:10
 * @LastEditors: conglongping 1010578148@qq.com
 * @LastEditTime: 2025-01-03 13:27:45
 * @FilePath: \demo\packages\colp-fe-lint\src\lints\markdownlint\getMarkdownlintConfig.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import glob from 'glob';
import markdownLint from 'markdownlint';
import markdownLintConfig from 'markdownlint-config-colp';
import path from 'path';
import type { Config, PKG, ScanOptions } from '../../types';

type LintOptions = markdownLint.Options & { fix?: boolean };

/**
 * 获取 Markdownlint 配置
 */
export function getMarkdownlintConfig(opts: ScanOptions, pkg: PKG, config: Config): LintOptions {
  const { cwd } = opts;
  const lintConfig: LintOptions = {
    fix: Boolean(opts.fix),
    resultVersion: 3,
  };

  if (config.markdownlintOptions) {
    // 若用户传入了 markdownlintOptions，则用用户的
    Object.assign(lintConfig, config.markdownlintOptions);
  } else {
    const lintConfigFiles = glob.sync('.markdownlint(.@(yaml|yml|json))', { cwd });
    if (lintConfigFiles.length === 0) {
      lintConfig.config = markdownLintConfig;
    } else {
      lintConfig.config = markdownLint.readConfigSync(path.resolve(cwd, lintConfigFiles[0]));
    }
  }

  return lintConfig;
}
