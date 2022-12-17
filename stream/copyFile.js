import fs from 'node:fs';
import { pipeline } from 'node:stream';
import path from 'path';
export async function copyFile(source, target) {
  const fileName = path.basename(source);
  return new Promise((resolve, reject) => {
    try {
      const rs = fs.createReadStream(source, 'utf-8');
      const ws = fs.createWriteStream(path.join(target, fileName));
      rs.on('error', (error) => reject(error));
      ws.on('error', (error) => reject(error));
      pipeline(rs, ws, (err) => (err ? reject(err) : resolve(true)));
    } catch (err) {
      reject(err);
    }
  });
}
