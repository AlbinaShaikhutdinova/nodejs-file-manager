import fs from 'node:fs';
import path from 'path';
export async function renameFile(filePath, newName) {
  const newPath = path.join(path.dirname(filePath), newName);
  try {
    console.log(newPath);
    await fs.promises.rename(filePath, newPath);
    return true;
  } catch (err) {
    return false;
  }
}
