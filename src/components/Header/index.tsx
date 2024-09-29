import React from 'react';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import logoSvg from '../../assets/react.svg';
import styles from './index.module.scss';
const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img alt="logo" src={logoSvg} />
        <span>React Playground</span>
      </div>
      <div className={styles.right}>
        <MoonOutlined className={styles.icon} />
        <SunOutlined className={styles.icon} />
      </div>
    </div>
  );
};

export default Header;
