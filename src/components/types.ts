import React from 'react';
import { Draft } from 'immer';

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

type DraftFunction<S> = (draft: Draft<S>) => void;
type Updater<S> = (arg: S | DraftFunction<S>) => void;

export interface ContextProps {
  files: Files;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
  setFiles: Updater<Files>;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (oldFieldName: string, newFieldName: string) => void;
}
