/*
 * @Author: conglongping 1010578148@qq.com
 * @Date: 2025-01-01 20:50:06
 * @LastEditors: conglongping 1010578148@qq.com
 * @LastEditTime: 2025-01-03 11:11:48
 * @FilePath: \cli-demo\src\lints\eslint\doEslint.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ESLint } from 'eslint';
import fg from 'fast-glob';
import { extname } from 'path';
import { Config, PKG, ScanOptions } from '../../types';
import { ESLINT_FILE_EXT, ESLINT_IGNORE_PATTERN } from '../../utils/constants';
import { formatESLintResults } from './formatESLintResults';
import { getESLintConfig } from './getESLintConfig';

export interface DoESLintOptions extends ScanOptions {
  pkg: PKG;
  config?: Config;
}
export async function doESLint(options: DoESLintOptions) {
  let files: string[];
  if (options.files) {
    files = options.files.filter((name) => {
      ESLINT_FILE_EXT.includes(extname(name));
    });
  } else {
    files = await fg(`**/*.{${ESLINT_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`, {
      cwd: options.cwd,
      ignore: ESLINT_IGNORE_PATTERN,
    });
  }

  const eslint = new ESLint(getESLintConfig(options, options.pkg, options.config));
  const report = await eslint.lintFiles(files);
  if (options.fix) {
    await ESLint.outputFixes(report);
  }
  return formatESLintResults(report, options.quiet, eslint);
}
