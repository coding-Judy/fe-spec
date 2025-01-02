/*
 * @Author: conglongping 1010578148@qq.com
 * @Date: 2025-01-01 20:50:23
 * @LastEditors: conglongping 1010578148@qq.com
 * @LastEditTime: 2025-01-02 19:26:37
 * @FilePath: \cli-demo\src\lints\eslint\formatESlintResults.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ESLint } from 'eslint';
import { ScanResult } from '../../types';

export function formatESLintResults(
  results: ESLint.LintResult[],
  quiet: boolean,
  eslint: ESLint,
): ScanResult[] {
  const rulesMeta = eslint.getRulesMetaForResults(results);
  return results
    .filter(({ warningCount, errorCount }) => errorCount || warningCount)
    .map(
      ({
        filePath,
        messages,
        errorCount,
        warningCount,
        fixableErrorCount,
        fixableWarningCount,
      }) => ({
        filePath,
        errorCount,
        warningCount: quiet ? 0 : warningCount,
        fixableErrorCount,
        fixableWarningCount: quiet ? 0 : fixableWarningCount,
        messages: messages
          .map(({ line = 0, column = 0, ruleId, message, fatal, severity }) => {
            return {
              line,
              column,
              rule: ruleId,
              url: rulesMeta[ruleId]?.docs?.url || '',
              message: message.replace(/[^ ]\.$/u, '$1'),
              errored: fatal || severity === 2,
            };
          })
          .filter(({ errored }) => (quiet ? !errored : true)),
      }),
    );
}
