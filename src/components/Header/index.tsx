import React, { useContext } from 'react';
import {
  MoonOutlined,
  SunOutlined,
  GithubOutlined,
  ShareAltOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message } from 'antd';
import { PlaygroundContext } from '../PlaygroundContext';
import logoSvg from '../../assets/react.svg';
import styles from './index.module.scss';
import { downloadFiles } from '../../utils';

const linkToGithub = () => {
  window.open('https://github.com/zzjiaxiang/react-playground');
};
const Header: React.FC = () => {
  const { theme, setTheme, files } = useContext(PlaygroundContext);
  const [messageApi, contextHolder] = message.useMessage();

  const onCopy = () => {
    messageApi.open({
      type: 'success',
      content: '链接已复制到剪贴板!',
    });
  };
  const download = () => {
    downloadFiles(files);
  };
  return (
    <>
      {contextHolder}
      <div className={styles.header}>
        <div className={styles.logo}>
          <img alt="React Playground logo" src={logoSvg} />
          <span>React Playground</span>
        </div>
        <div className={styles.right}>
          {theme === 'light' ? (
            <SunOutlined className={styles.anticon} onClick={() => setTheme('dark')} />
          ) : (
            <MoonOutlined className={styles.anticon} onClick={() => setTheme('light')} />
          )}
          <CopyToClipboard text={window.location.href} onCopy={onCopy}>
            <ShareAltOutlined className={styles.anticon} />
          </CopyToClipboard>
          <GithubOutlined className={styles.anticon} onClick={linkToGithub} />
          <DownloadOutlined className={styles.anticon} onClick={download} />
        </div>
      </div>
    </>
  );
};

export default Header;
