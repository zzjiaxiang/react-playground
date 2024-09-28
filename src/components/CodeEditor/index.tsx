import React, { useContext } from 'react';
import { EditorProps } from '@monaco-editor/react';
import { PlaygroundContext } from '../PlaygroundContext';
import Editor from '../Editor';
import FileNameList from '../FileNameList';
import style from './index.module.scss';
import { Files } from '../types';
const CodeEditor: React.FC = () => {
  const { files, selectedFileName, setFiles } = useContext(PlaygroundContext);
  const file = files[selectedFileName];

  const onEditorChange: EditorProps['onChange'] = (value?: string) => {
    setFiles((draft:Files) => {
      draft[selectedFileName].value = value;
    });
  };
  return (
    <div className={style.container}>
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} />
    </div>
  );
};

export default CodeEditor;
