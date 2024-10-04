import React, { useContext, memo } from 'react';
import { PlaygroundContext } from '../PlaygroundContext';
import FileNameItem from '../FileNameItem';
import styles from './index.module.scss';
import { APP_COMPONENT_FILE_NAME, ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME } from '../files';
const readonlyFileNames = [
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
  APP_COMPONENT_FILE_NAME,
  'App.css',
];
const FileNameList: React.FC = () => {
  const { files, setSelectedFileName, selectedFileName, updateFileName, removeFile, addFile } =
    useContext(PlaygroundContext);

  const handleEditComplete = (name: string, prevName: string) => {
    updateFileName(prevName, name);
    setSelectedFileName(name);
  };

  /**
   * 先将选择的文件改为 app.tsx
   * 然后删除这个文件
   */
  const deleteFile = (name: string) => {
    setSelectedFileName(APP_COMPONENT_FILE_NAME);
    removeFile(name);
  };
  const addTab = () => {
    addFile('Comp.tsx');
  };
  return (
    <div className={styles.tabs}>
      {Object.keys(files).map((fileName) => (
        <FileNameItem
          readonly={readonlyFileNames.includes(fileName)}
          key={fileName}
          value={fileName}
          selected={fileName === selectedFileName}
          onClick={() => setSelectedFileName(fileName)}
          onEditComplete={(name: string) => handleEditComplete(name, fileName)}
          onRemoveFile={() => deleteFile(fileName)}
        />
      ))}
      <div className={styles.add} onClick={addTab}>
        +
      </div>
    </div>
  );
};

export default memo(FileNameList);
