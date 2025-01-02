/*
 * @Author: conglongping 1010578148@qq.com
 * @Date: 2025-01-01 15:05:53
 * @LastEditors: conglongping 1010578148@qq.com
 * @LastEditTime: 2025-01-01 16:26:03
 * @FilePath: \demo\packages\eslint-plugin\configs\recommended.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  plugins: ['eslint-plugin'],
  rules: {
    'eslint-plugin/no-http-url': 'warn',
    'eslint-plugin/no-secret-info': 'error',
  },
};
