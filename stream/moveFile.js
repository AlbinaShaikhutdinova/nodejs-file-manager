import fs from 'node:fs';
import { copyFile } from './copyFile.js';
export async function moveFile(source, target) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await copyFile(source, target);
      await fs.promises.unlink(source);
      resolve(true);
    } catch (err) {
      reject(false);
    }
  });
}
