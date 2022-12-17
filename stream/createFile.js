import fs from 'node:fs';
export async function createFile(filePath) {
  return new Promise(async (resolve, reject) => {
    try {
      await fs.promises.writeFile(filePath, '');
      resolve();
    } catch (err) {
      //throw new Error(err);
      reject(err);
    }
  });
}
