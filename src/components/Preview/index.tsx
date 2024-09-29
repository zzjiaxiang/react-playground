import React, { useContext, useEffect, useState } from 'react';
import { PlaygroundContext } from '../PlaygroundContext';
import Editor from '../Editor';
import { compile } from '../../Preview/compiler';
const Preview: React.FC = () => {
  const { files } = useContext(PlaygroundContext);
  const [compiledCode, setCompiledCode] = useState('');

  useEffect(() => {
    const res = compile(files);
    setCompiledCode(res);
  }, [files]);
  return (
    <div style={{ height: '100%' }}>
      <Editor
        file={{
          name: 'dist.js',
          value: compiledCode,
          language: 'javascript',
        }}
      />
    </div>
  );
};

export default Preview;
