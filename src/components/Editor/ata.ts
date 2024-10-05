// see https://www.npmjs.com/package/@typescript/ata
import { setupTypeAcquisition } from '@typescript/ata';
let ts: typeof import('typescript');
// import ts from 'typescript';

export const createATA = async (onDownloadFile: (code: string, path: string) => void) => {
  ts = await importTsFromCdn('latest');
  return setupTypeAcquisition({
    projectName: 'My ATA Project',
    typescript: ts,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        onDownloadFile(code, path);
      },
    },
  });
};

async function importTsFromCdn(tsVersion: string) {
  const _module = globalThis.module;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).module = { exports: {} };
  const tsUrl = `https://cdn.jsdelivr.net/npm/typescript@${tsVersion}/lib/typescript.js`;
  await import(/* @vite-ignore */ tsUrl);
  const ts = globalThis.module.exports;
  globalThis.module = _module;
  return ts as typeof import('typescript');
}
