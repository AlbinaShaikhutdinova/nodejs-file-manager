import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';
import { FileManager } from './FileManager.js';

//const rl = readline.createInterface({ input, output });
function start() {
  const args = process.argv.slice(2);
  const manager = new FileManager({ input, output, args });
  manager.sayHi();
  manager.goToHomeDirectory();
  manager.showCurrentDirectory();
  manager.prompt();
  manager.rl.on('close', manager.sayBye.bind(manager));
  manager.rl.on('line', (line) => {
    switch (line.split(' ')[0].trim()) {
      case 'up':
        manager.up();
        manager.showCurrentDirectory();
        manager.prompt();
        break;
      case '.exit':
        manager.sayBye.bind(manager);
        break;
      case 'cd':
        manager.changeDirectory(line.split(' ')[1].trim());
        manager.showCurrentDirectory();
        manager.prompt();
        break;
      case 'ls':
        manager.ls();
        break;
      case 'cat':
        manager.cat(line.split(' ')[1].trim());
        break;
      case 'add':
        manager.add(line.split(' ')[1].trim());
        break;
      case 'cp':
        manager.cp(line.split(' ')[1].trim(), line.split(' ')[2].trim());
        break;
      case 'mv':
        manager.mv(line.split(' ')[1].trim(), line.split(' ')[2].trim());
        break;
      case 'rn':
        manager.rn(line.split(' ')[1].trim(), line.split(' ')[2].trim());
        break;
      case 'rm':
        manager.rm(line.split(' ')[1].trim());
        break;

      case 'hash':
        manager.hash(line.split(' ')[1].trim());
        break;
      case 'os':
        manager.os(line.split(' ')[1].trim());
        break;
    }
  });
}
start();
