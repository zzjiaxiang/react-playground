import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { Files } from './components/types';

const languageMap: { [key: string]: string } = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  json: 'json',
  css: 'css',
};

export const fileNameLanguage = (name: string = '') =>
  languageMap[name.split('.').pop()!] ?? 'javascript';

/**
 * @description 将字符串数据压缩并转换为 base64 编码。
 * @param data（要压缩的字符串）
 * @returns base64 压缩后的编码字符串
 */
export function utoa(data: string): string {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level: 9 });
  const binary = strFromU8(zipped, true);
  return btoa(binary);
}

/**
 * @description 将 base64 编码的压缩数据解压缩并转换回原始字符串。
 * @param base64 要解压的 base64 编码字符串
 * @returns string 解压后的原始字符串
 */
export function atou(base64: string): string {
  const binary = atob(base64);
  const buffer = strToU8(binary, true);
  const unzipped = unzlibSync(buffer);
  return strFromU8(unzipped);
}

export async function downloadFiles(files: Files) {
  const zip = new JSZip();

  Object.keys(files).forEach((name) => {
    zip.file(name, files[name].value!);
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `code${Math.random().toString().slice(2, 8)}.zip`);
}
