import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
export async function compress(source, target) {
  const destFile = path.join(target, path.basename(source) + '.br');
  const rs = fs.createReadStream(source, 'utf-8');
  const ws = fs.createWriteStream(destFile);
  const brotli = zlib.createBrotliCompress();
  const stream = rs.pipe(brotli).pipe(ws);
  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve(true));
    stream.on('error', () => reject(false));
  });
}
