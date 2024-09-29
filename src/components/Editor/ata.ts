// see https://www.npmjs.com/package/@typescript/ata
import { setupTypeAcquisition } from '@typescript/ata';

export const createATA = async (onDownloadFile: (code: string, path: string) => void) => {
  const ts = await import('typescript');
  return setupTypeAcquisition({
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
};
