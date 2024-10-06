import classnames from 'classnames';
import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';

export interface MessageProps {
  type: 'error' | 'warn';
  content: string;
}
const Message: React.FC<MessageProps> = ({ type, content }) => {
  const [show, setShow] = useState(!!content);

  useEffect(() => {
    setShow(!!content);
  }, [content]);

  return show ? (
    <div className={classnames(styles.msg, styles[type])}>
      <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
      <button className={styles.dismiss} onClick={() => setShow(false)}>
        ✕
      </button>
    </div>
  ) : null;
};

export default React.memo(Message);
