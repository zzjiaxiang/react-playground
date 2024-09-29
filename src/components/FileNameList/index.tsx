import React, { useContext, useMemo } from 'react';
import { PlaygroundContext } from '../PlaygroundContext';
import FileNameItem from '../FileNameItem';
import styles from './index.module.scss';

const FileNameList: React.FC = () => {
  const { files, setSelectedFileName, selectedFileName } = useContext(PlaygroundContext);

  const memoizedFileItems = useMemo(
    () =>
      Object.keys(files).map((fileName) => (
        <FileNameItem
          key={fileName}
          value={fileName}
          Selected={fileName === selectedFileName}
          onClick={() => setSelectedFileName(fileName)}
        />
      )),
    [files, setSelectedFileName, selectedFileName],
  );

  return <div className={styles.tabs}>{memoizedFileItems}</div>;
};

export default FileNameList;
