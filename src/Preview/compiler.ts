// https://babeljs.io/docs/plugins#plugin-development
// babel plugins开发
// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md
import { transform } from '@babel/standalone';
import { PluginObj } from '@babel/core';
const customResolver = (files: Files): PluginObj => {
  console.log(files)
  return {
    visitor: {
      ImportDeclaration(path) {
        path.node.source.value = '23333';
      },
    },
  };
};
import { Files } from '../components/types';
import { ENTRY_FILE_NAME } from '../components/files';

export const babelTransform = (filename: string, code: string = '', files: Files) => {
  let result = '';
  try {
    result = transform(code, {
      presets: ['react', 'typescript'],
      filename,
      plugins: [customResolver(files)],
      retainLines: true,
    }).code!;
  } catch (e) {
    console.error('编译出错', e);
  }
  return result;
};

export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME];
  return babelTransform(ENTRY_FILE_NAME, main?.value, files);
};
