import fs from 'node:fs';
import crypto from 'crypto';
export async function getHash(filePath) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fs.promises.readFile(filePath);
      const hashSum = crypto.createHash('sha256');
      hashSum.update(data);
      resolve(hashSum.digest('hex'));
    } catch (err) {
      reject(err);
    }
  });
}
