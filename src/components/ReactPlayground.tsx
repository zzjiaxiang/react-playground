import React from 'react';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import Header from './Header';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
const ReactPlayground: React.FC = () => {
  return (
    <div style={{ height: '100vh' }}>
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
