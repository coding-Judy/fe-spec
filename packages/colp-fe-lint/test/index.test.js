/*
 * @Author: conglongping 1010578148@qq.com
 * @Date: 2025-01-02 20:30:10
 * @LastEditors: conglongping 1010578148@qq.com
 * @LastEditTime: 2025-01-03 15:37:47
 * @FilePath: \demo\packages\colp-fe-lint\test\index.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
const fs = require('fs-extra');
const encodeFeLint = require('../lib/index');

const { init } = encodeFeLint;

describe('init', () => {
  const templatePath = path.resolve(__dirname, './fixtures/template/init');
  const outputPath = path.resolve(__dirname, './fixtures/template/temp');

  beforeEach(() => {
    fs.copySync(templatePath, outputPath);
    fs.renameSync(`${outputPath}/_vscode`, `${outputPath}/.vscode`);
  });

  test('node api init should work as expected', async () => {
    await init({
      cwd: outputPath,
      checkVersionUpdate: false,
      eslintType: 'index',
      enableStylelint: true,
      enableMarkdownlint: true,
      enablePrettier: true,
    });

    const pkg = require(`${outputPath}/package.json`);
    const settings = require(`${outputPath}/.vscode/settings.json`);

    expect(settings['editor.defaultFormatter']).toBe('esbenp.prettier-vscode');
    console.log(settings['editor.defaultFormatter'], '1111111');
    expect(settings['eslint.validate'].includes('233')).toBeTruthy();
    expect(settings.test).toBeTruthy();
  });

  afterEach(() => {
    fs.removeSync(outputPath);
  });
});
