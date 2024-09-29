import React from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { createATA } from './ata';
import { Props } from './types';

const Editor: React.FC<Props> = ({ file, onChange, options }) => {
  const { name, value, language } = file;

  const handleEditorMount: OnMount = async (editor, monaco) => {
    // https://github.com/microsoft/monaco-editor/issues/264
    // 设置 jsx 为 preserve，也就是输入 <div> 输出 <div>，保留原样
    // 如果设置为 react 会输出 React.createElement("div")
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    });

    // 做类型提示
    // 根据编辑器的内容自动下载 *.d.ts 文件的依赖
    const ata = await createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`);
    });

    const updateTypeHints = () => ata(editor.getValue());
    

    editor.onDidChangeModelContent(updateTypeHints);
    // 开始自动运行一次
    updateTypeHints();
  };

  const editorOptions = {
    fontSize: 14,
    scrollBeyondLastLine: false,
    minimap: {
      enabled: false,
    },
    scrollbar: {
      verticalScrollbarSize: 6,
      horizontalScrollbarSize: 6,
    },
    ...options,
  };

  return (
    <MonacoEditor
      height="100%"
      path={name}
      language={language}
      value={value}
      onChange={onChange}
      onMount={handleEditorMount}
      options={editorOptions}
    />
  );
};

export default React.memo(Editor);
