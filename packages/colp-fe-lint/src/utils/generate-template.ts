import ejs from 'ejs';
import fs from 'fs-extra';
import glob from 'glob';
import _ from 'lodash';
import path from 'path';
import {
  ESLINT_IGNORE_PATTERN,
  MARKDOWN_LINT_IGNORE_PATTERN,
  STYLELINT_FILE_EXT,
  STYLELINT_IGNORE_PATTERN,
} from './constants';

const mergeVSCodeConfig = (filepath: string, content: string) => {
  ///不需要merge
  if (!fs.existsSync(filepath)) return content;

  try {
    const targetData = fs.readJSONSync(filepath);
    const sourceData = JSON.parse(content);
    return JSON.stringify(
      _.mergeWith(targetData, sourceData, (target, source) => {
        if (Array.isArray(target) && Array.isArray(source)) {
          return [...new Set(source.concat(target))];
        }
      }),
      null,
      2,
    );
  } catch (e) {
    return '';
  }
};
export default (cwd: string, data: Record<string, any>, vscode?: boolean) => {
  ///要生成的模板路径
  const templatePath = path.resolve(__dirname, '../config');
  ///获取要生成的文件的ejs文件
  const templates = glob.sync(`${vscode ? '_vscode' : '**'}/*.ejs`, { cwd: templatePath });
  for (const name of templates) {
    //写入项目中文件路径
    const filepath = path.resolve(cwd, name.replace(/\.ejs$/, '').replace(/^_/, '.'));
    let content = ejs.render(fs.readFileSync(path.join(templatePath, name), 'utf-8'), {
      eslintIgnores: ESLINT_IGNORE_PATTERN,
      stylelintExt: STYLELINT_FILE_EXT,
      stylelintIgnores: STYLELINT_IGNORE_PATTERN,
      markdownLintIgnores: MARKDOWN_LINT_IGNORE_PATTERN,
      ...data,
    });

    // 合并 vscode config
    if (/^_vscode/.test(name)) {
      content = mergeVSCodeConfig(filepath, content);
    }

    //跳过空文件
    if (!content.trim()) continue;
    fs.outputFileSync(filepath, content, 'utf8');
  }
};
