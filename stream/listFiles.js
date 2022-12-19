import fs from 'fs';
import path from 'path';
export function listFiles(dir, cb) {
  const res = [];
  const promises = [];
  fs.readdir(dir, (err, files) => {
    files.forEach((file) => {
      const promise = new Promise((resolve) =>
        fs.stat(file, (err, stat) =>
          resolve({
            name: stat.isDirectory()
              ? path.parse(file).name
              : `${path.parse(file).name}${path.extname(file)}`,
            type: stat.isDirectory() ? 'directory' : 'file',
          })
        )
      );
      promises.push(promise);
    });
    Promise.all(promises).then((res) => cb(res));
  });
}
