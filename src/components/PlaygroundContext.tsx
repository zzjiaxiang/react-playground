import React, { createContext, useState, PropsWithChildren, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { fileNameLanguage } from '../utils';
import { Files, ContextProps, Theme } from './types';
import initFiles from './files';
import defaultTemp from '../template/default?raw';
import { utoa, atou } from '../utils';

const { matches } = window.matchMedia('(prefers-color-scheme: light)');
const SysTheme = matches ? 'light' : 'dark';

export const PlaygroundContext = createContext<ContextProps>({
  selectedFileName: 'App.tsx',
} as ContextProps);

const getFilesFromUrl = () => {
  const data = window.location.hash.slice(1);
  if (!data) return initFiles;

  try {
    const hash = atou(data);
    return JSON.parse(hash);
  } catch (error) {
    console.error('Error parsing files from URL:', error);
    return initFiles;
  }
};

const PlaygroundProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [files, setFiles] = useImmer<Files>(getFilesFromUrl);
  const [selectedFileName, setSelectedFileName] = useState('App.tsx');
  const [theme, setTheme] = useState<Theme>(SysTheme);

  useEffect(() => {
    const hash = JSON.stringify(files);
    window.location.hash = utoa(hash);
  }, [files]);

  const addFile = (name: string) => {
    setFiles((draft) => {
      draft[name] = {
        name,
        language: fileNameLanguage(name),
        value: defaultTemp,
      };
    });
  };

  const removeFile = (name: string) => {
    setFiles((draft) => {
      delete draft[name];
    });
  };

  const updateFileName = (oldFileName: string, newFileName: string) => {
    if (!files[oldFileName] || !newFileName) return;
    if (Object.is(oldFileName, newFileName)) return;

    setFiles((draft) => {
      const file = draft[oldFileName];
      if (file) {
        delete draft[oldFileName];
        draft[newFileName] = {
          ...file,
          name: newFileName,
          language: fileNameLanguage(newFileName),
        };
      }
    });
  };

  const contextValue = {
    theme,
    setTheme,
    files,
    selectedFileName,
    setSelectedFileName,
    setFiles,
    addFile,
    removeFile,
    updateFileName,
  };

  return <PlaygroundContext.Provider value={contextValue}>{children}</PlaygroundContext.Provider>;
};

export default PlaygroundProvider;
