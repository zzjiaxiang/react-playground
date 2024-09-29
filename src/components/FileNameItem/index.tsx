import React from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';

interface Props {
  value: string;
  onClick: () => void;
  Selected: boolean;
}

const FileNameItem: React.FC<Props> = ({ value, onClick, Selected }) => {
  return (
    <div
      className={classnames(styles['tab-item'], Selected ? styles.Selected : null)}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default FileNameItem;
