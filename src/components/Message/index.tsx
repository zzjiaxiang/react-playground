import classnames from 'classnames';
import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';

export interface MessageProps {
  type: 'error' | 'warn';
  content: string;
}

const Message: React.FC<MessageProps> = ({ type, content }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!content);
  }, [content]);

  return visible ? (
    <div className={classnames(styles.msg, styles[type])}>
      <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
      <button className={styles.dismiss} onClick={() => setVisible(false)}>
        ✕
      </button>
    </div>
  ) : null;
};

export default React.memo(Message);
