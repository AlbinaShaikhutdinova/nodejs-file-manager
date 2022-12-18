import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
export async function decompress(source, target) {
  const destFile = path.join(target, path.basename(source).replace('br', 'txt'));
  const rs = fs.createReadStream(source);
  const ws = fs.createWriteStream(destFile);
  const brotli = zlib.createBrotliDecompress();
  const stream = rs.pipe(brotli).pipe(ws);
  return new Promise((resolve, reject) => {
    stream.on('error', () => {
      reject(false);
    });
    stream.on('finish', () => {
      resolve(true);
    });
  });
}
