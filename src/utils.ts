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
