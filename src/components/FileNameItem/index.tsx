import React from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';

interface Props {
  value: string;
  handelClick: () => void;
  Selected: boolean;
}

const FileNameItem: React.FC<Props> = ({ value, handelClick, Selected }) => {
  return (
    <div
      className={classnames(styles['tab-item'], Selected ? styles.Selected : null)}
      onClick={handelClick}
    >
      {value}
    </div>
  );
};

export default FileNameItem;
