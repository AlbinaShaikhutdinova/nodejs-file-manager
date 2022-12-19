import fs from 'node:fs';
export async function readFile(filePath) {
  return new Promise((resolve, reject) => {
    try {
      const stream = fs.createReadStream(filePath, 'utf-8');
      let data = '';
      stream.on('data', (chunk) => (data += chunk));
      stream.on('end', () => resolve(data));
      stream.on('error', (error) => reject(false));
    } catch (err) {
      reject(false);
    }
  });
}
