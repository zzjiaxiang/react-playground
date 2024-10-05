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
    if (!confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }
    setSelectedFileName(APP_COMPONENT_FILE_NAME);
    removeFile(name);
  };
  const addTab = () => {
    let i = 0;
    let name = `Comp.tsx`;

    while (true) {
      let hasConflict = false;
      for (const filename of Object.keys(files)) {
        if (filename === name) {
          hasConflict = true;
          name = `Comp${++i}.tsx`;
          break;
        }
      }
      if (!hasConflict) {
        break;
      }
    }
    addFile(name);
  };
  return (
    <div className={styles.tabs}>
      <div className={styles.left}>
        {Object.keys(files)
          .filter((fileName) => fileName !== IMPORT_MAP_FILE_NAME)
          .map((fileName) => (
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
      <div className={styles.right}>
        <FileNameItem
          readonly
          value={IMPORT_MAP_FILE_NAME}
          selected={IMPORT_MAP_FILE_NAME === selectedFileName}
          onClick={() => setSelectedFileName(IMPORT_MAP_FILE_NAME)}
        />
      </div>
    </div>
  );
};

export default memo(FileNameList);
