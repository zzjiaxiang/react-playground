import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import styles from './index.module.scss';

interface Props {
  value: string;
  onClick: () => void;
  selected: boolean;
  readonly: boolean;
  onEditComplete: (name: string) => void;
  onRemoveFile: () => void;
}

const FileNameItem: React.FC<Props> = ({
  value,
  onClick,
  selected,
  onEditComplete,
  readonly,
  onRemoveFile,
}) => {
  const [name, setName] = useState(value);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const handleDoubleClick = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    });
  };
  const handleInputBlur = () => {
    setEditing(false);
    onEditComplete(name);
  };
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemoveFile();
  };
  return (
    <div
      className={classnames(styles['tab-item'], selected ? styles.selected : null)}
      onClick={onClick}
    >
      {editing ? (
        <Input
          ref={inputRef}
          onBlur={handleInputBlur}
          value={name}
          onChange={({ target }) => setName(target.value)}
          className={styles['ant-input']}
        ></Input>
      ) : (
        <>
          <span onDoubleClick={handleDoubleClick}>{value}</span>
          {!readonly && <CloseOutlined onClick={handleRemoveFile} />}
        </>
      )}
    </div>
  );
};

export default FileNameItem;
