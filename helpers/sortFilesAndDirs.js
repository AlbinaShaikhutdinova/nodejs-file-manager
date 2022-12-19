export function sortFilesAndDirs(array) {
  const files = array.filter((item) => item.type === 'file');
  const dirs = array.filter((item) => item.type === 'directory');
  files.sort((a, b) => a.name.localeCompare(b.name));
  dirs.sort((a, b) => a.name.localeCompare(b.name));
  return [...dirs, ...files];
}
