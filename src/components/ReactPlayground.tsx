import React, { useContext } from 'react';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import Header from './Header';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import { PlaygroundContext } from './PlaygroundContext';
import styles from './index.module.scss';
const ReactPlayground: React.FC = () => {
  const { theme } = useContext(PlaygroundContext);

  return (
    <div className={`${styles.container} ${theme}`}>
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={100}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default ReactPlayground;
