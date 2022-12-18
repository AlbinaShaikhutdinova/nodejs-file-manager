import fs from 'fs';
import path from 'path';
import url from 'url';
import zlib from 'zlib';
export function compress(source, target, cb) {
  const rs = fs.createReadStream(source);
  const ws = fs.createWriteStream(target);

  // Create brotli compress object
  const brotli = zlib.createBrotliCompress();

  // Pipe the read and write operations with brotli compression
  const stream = rs.pipe(brotli).pipe(ws);

  stream.on('finish', () => {
    cb();
  });
}
