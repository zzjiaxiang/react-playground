import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import { PlaygroundContext } from '../PlaygroundContext';
import CompilerWorker from './compiler.worker?worker';
import iframeRaw from './iframe.html?raw';
import { IMPORT_MAP_FILE_NAME } from '../files';
import Message from '../Message';

const iframeStyle = {
  width: '100%',
  height: '100%',
  padding: 0,
  border: 'none',
};
interface MessageData {
  data: {
    type: string;
    message: string;
  };
}

const Preview: React.FC = () => {
  const { files } = useContext(PlaygroundContext);
  const [compiledCode, setCompiledCode] = useState('');
  const compilerWorkerRef = useRef<Worker>();

  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompilerWorker();
      compilerWorkerRef.current.addEventListener('message', ({ data: { type, data } }) => {
        if (type === 'COMPILED_CODE') {
          setCompiledCode(data);
          setError('');
        }
      });
    }
  }, []);

  useEffect(() => {
    compilerWorkerRef.current?.postMessage(files);
  }, [files]);

  const [error, setError] = useState('');

  const handleMessage = ({ data: { type, message } }: MessageData) => {
    if (type === 'iframeError') {
      setError(message);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const IframeUrl = useMemo(() => {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`,
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`,
      );
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }));
  }, [files, compiledCode]);

  return (
    <>
      <iframe src={IframeUrl} style={{ ...iframeStyle }} />
      <Message type="error" content={error} />
    </>
  );
};

export default Preview;
