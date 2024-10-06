import { transform } from '@babel/standalone';
import { PluginObj } from '@babel/core';
import { Files, File } from '../types';
import { ENTRY_FILE_NAME } from '../files';
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];
const regexReact = /import\s+React\s*(,?\s*\{[^}]*\}\s*)?from\s+['"]react['"]/;

/**
 * 因为编译后的文件被转化成了React.createElement,但是文件可能没有 import React导入，所以这里引入.
 * 规则1: import React from 'react',规则2: import React,{useXXX} from 'react'
 */
export const beforeTransformCode = (filename: string, code: string) => {
  return (filename.endsWith('.jsx') || filename.endsWith('.tsx')) && !regexReact.test(code)
    ? `import React from 'react';\n${code}`
    : code;
};

export const babelTransform = (filename: string, code = '', files: Files): string => {
  const transformedCode = beforeTransformCode(filename, code);
  try {
    return (
      transform(transformedCode, {
        presets: ['react', 'typescript'],
        filename,
        plugins: [customResolver(files)],
        retainLines: true,
      }).code || ''
    );
  } catch (e) {
    self.postMessage({ type: 'ERROR', e });
    return '';
  }
};

const getModuleFile = (files: Files, modulePath: string): File | undefined => {
  const moduleName = modulePath.split('./').pop() || '';
  if (!moduleName.includes('.')) {
    return Object.entries(files).find(
      ([key]) =>
        FILE_EXTENSIONS.some((ext) => key.endsWith(ext)) && key.split('.').includes(moduleName),
    )?.[1];
  }
  return files[moduleName];
};

const json2Js = (file: File): string => {
  const js = `export default ${file.value}`;
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }));
};

const css2Js = (file: File): string => {
  const randomId = Date.now();
  const js = `
(() => {
  const stylesheet = document.createElement('style');
  stylesheet.id = 'style_${randomId}_${file.name}';
  stylesheet.textContent = \`${file.value}\`;
  document.head.appendChild(stylesheet);
})()`;
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }));
};

const customResolver = (files: Files): PluginObj => ({
  visitor: {
    ImportDeclaration: (path) => {
      const modulePath = path.node.source.value;
      if (!modulePath.startsWith('.')) return;

      const file = getModuleFile(files, modulePath);
      if (!file) return;

      let transformedValue;
      if (file.name.endsWith('.css')) {
        transformedValue = css2Js(file);
      } else if (file.name.endsWith('.json')) {
        transformedValue = json2Js(file);
      } else {
        const transformedCode = babelTransform(file.name, file.value, files);
        transformedValue = URL.createObjectURL(
          new Blob([transformedCode], { type: 'application/javascript' }),
        );
      }

      path.node.source.value = transformedValue;
    },
  },
});

export const compile = (files: Files): string => {
  const main = files[ENTRY_FILE_NAME];
  return babelTransform(ENTRY_FILE_NAME, main?.value, files);
};

self.addEventListener('message', async ({ data }) => {
  self.postMessage({
    type: 'COMPILED_CODE',
    data: compile(data),
  });
});
