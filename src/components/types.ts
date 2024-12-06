import type { Updater } from 'use-immer';

export interface File {
  name: string;
  value?: string;
  language: string;
}

export interface Files {
  [key: string]: File;
}

export type Theme = 'light' | 'dark';

export interface ContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  files: Files;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
  setFiles: Updater<Files>;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (oldFieldName: string, newFieldName: string) => void;
}
