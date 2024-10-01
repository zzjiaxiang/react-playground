import React, { createContext, useState,PropsWithChildren } from 'react';
import { useImmer } from 'use-immer';
import { fileNameLanguage } from '../utils';
import { Files, ContextProps, Theme } from './types';
import initFiles from './files';

const { matches } = window.matchMedia('(prefers-color-scheme: light)');
const SysTheme = matches ? 'light' : 'dark';

export const PlaygroundContext = createContext<ContextProps>({
  selectedFileName: 'App.tsx',
} as ContextProps);

const PlaygroundProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [files, setFiles] = useImmer<Files>(initFiles);
  const [selectedFileName, setSelectedFileName] = useImmer('App.tsx');
  const [theme, setTheme] = useState<Theme>(SysTheme);
  const addFile = (name: string) => {
    setFiles((draft) => {
      draft[name] = {
        name,
        language: fileNameLanguage(name),
        value: '',
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
