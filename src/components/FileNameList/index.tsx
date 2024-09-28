import React, { useContext, useEffect, useState } from 'react';
import { PlaygroundContext } from '../PlaygroundContext';
import FileNameItem from '../FileNameItem';
import styles from './index.module.scss';

const FileNameList: React.FC = () => {
  const { files, setSelectedFileName, selectedFileName } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState(['']);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  return (
    <div className={styles.tabs}>
      {tabs.map((item) => (
        <FileNameItem
          key={item}
          value={item}
          Selected={item === selectedFileName}
          handelClick={() => setSelectedFileName(item)}
        ></FileNameItem>
      ))}
    </div>
  );
};

export default FileNameList;
