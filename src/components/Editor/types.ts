import { EditorProps } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

interface EditorFile {
  name: string;
  value?: string;
  language: string;
}

export interface Props {
  file: EditorFile;
  onChange?: EditorProps['onChange'];
  options?: editor.IStandaloneEditorConstructionOptions;
}
