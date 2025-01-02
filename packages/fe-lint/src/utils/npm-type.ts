/*
 * @Author: conglongping 1010578148@qq.com
 * @Date: 2024-12-29 14:15:35
 * @LastEditors: conglongping 1010578148@qq.com
 * @LastEditTime: 2024-12-29 14:17:32
 * @FilePath: \前端编码规范工程化\cli-demo\src\utils\npm-type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { sync as commandExistsSync } from 'command-exists';

/**
 * npm 类型
 */
const promise: Promise<'npm' | 'pnpm'> = new Promise((resolve) => {
  if (!commandExistsSync('pnpm')) return resolve('npm');

  resolve('pnpm');
});

export default promise;
