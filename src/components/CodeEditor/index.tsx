import React, { useContext, useCallback, useMemo } from 'react';
import { EditorProps } from '@monaco-editor/react';
import { debounce } from 'lodash-es';
import { PlaygroundContext } from '../PlaygroundContext';
import Editor from '../Editor';
import FileNameList from '../FileNameList';
import style from './index.module.scss';
import { Files } from '../types';
const CodeEditor: React.FC = () => {
  const { files, selectedFileName, setFiles, theme } = useContext(PlaygroundContext);
  const file = useMemo(() => files[selectedFileName], [files, selectedFileName]);

  const onEditorChange = useCallback(
    debounce((value: string) => {
      setFiles((draft: Files) => {
        draft[selectedFileName].value = value;
      });
    }, 800),
    [selectedFileName]
  ) as EditorProps['onChange'];

  return (
    <div className={style.container}>
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} options={{ theme: `vs-${theme}` }} />
    </div>
  );
};

export default CodeEditor;
