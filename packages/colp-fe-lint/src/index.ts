/*
 * @Author: conglongping 1010578148@qq.com
 * @Date: 2025-01-02 20:30:10
 * @LastEditors: conglongping 1010578148@qq.com
 * @LastEditTime: 2025-01-03 16:24:11
 * @FilePath: \demo\packages\colp-fe-lint\src\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ora from 'ora';
import initAction from './actions/init';
import scanAction from './actions/scan';
import type { InitOptions, ScanOptions } from './types';
import { PKG_NAME } from './utils/constants';
import printReport from './utils/print-report';

type IInitOptions = Omit<InitOptions, 'checkVersionUpdate'>;

export const init = async (options: IInitOptions) => {
  return await initAction({
    ...options,
    checkVersionUpdate: false,
  });
};

export const scan = async (options: ScanOptions) => {
  const checking = ora();
  checking.start(`执行 ${PKG_NAME} 代码检查`);

  const report = await scanAction(options);
  const { results, errorCount, warningCount } = report;
  let type = 'succeed';
  if (errorCount > 0) {
    type = 'fail';
  } else if (warningCount > 0) {
    type = 'warn';
  }

  checking[type]();
  if (results.length > 0) printReport(results, false);

  return report;
};
