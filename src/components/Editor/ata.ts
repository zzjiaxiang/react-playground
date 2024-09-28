// see https://www.npmjs.com/package/@typescript/ata
import { setupTypeAcquisition } from '@typescript/ata';
import ts from 'typescript';

export const createATA = (onDownloadFile: (code: string, path: string) => void) =>
  setupTypeAcquisition({
    projectName: 'My ATA Project',
    typescript: ts,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        console.info('自动下载的包', { code }, { path });
        onDownloadFile(code, path);
      },
    },
  });
