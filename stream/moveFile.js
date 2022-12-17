import fs from 'node:fs';
import { copyFile } from './copyFile.js';
export async function moveFile(source, target) {
  return new Promise(async (resolve, reject) => {
    const res = await copyFile(source, target);
    if (res) {
      await fs.promises.unlink(source);
      resolve(true);
    } else {
      reject(false);
    }
  });
}
