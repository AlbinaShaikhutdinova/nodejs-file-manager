import fs from 'node:fs';
export async function deleteFile(source) {
  return new Promise(async (resolve, reject) => {
    try {
      await fs.promises.unlink(source);
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
}
