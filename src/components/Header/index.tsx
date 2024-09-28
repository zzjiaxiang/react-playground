import React from 'react';
import logoSvg from '../../assets/react.svg';
import styles from './index.module.scss';
const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img alt="logo" src={logoSvg} />
        <span>React Playground</span>
      </div>
    </div>
  );
};

export default Header;
