import React from 'react';
import { Updater } from 'use-immer';

export interface File {
  name: string;
  value?: string;
  language: string;
}

export interface Files {
  [key: string]: File;
}
export interface PlaygroundProps {
  children: React.ReactNode;
}

export interface ContextProps {
  files: Files;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
  setFiles: Updater<Files>;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (oldFieldName: string, newFieldName: string) => void;
}
