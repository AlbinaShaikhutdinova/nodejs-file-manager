import { stdin as input, stdout as output } from 'process';
import { FileManager } from './FileManager.js';

function start() {
  const args = process.argv.slice(2);
  const manager = new FileManager({ input, output, args });
  manager.sayHi();
  manager.goToHomeDirectory();
  manager.showCurrentDirectory();
  manager.prompt();
  manager.rl.on('close', manager.sayBye.bind(manager));
  manager.rl.on('line', (input) => {
    const line = input.trim().replace(/ +/g, ' ').split(' ');
    switch (line[0]) {
      case 'up':
        manager.up();
        break;
      case '.exit':
        manager.rl.close();
        break;
      case 'cd':
        manager.isEnoughArgs([line[1]], manager.changeDirectory.bind(manager, line[1]));
        break;
      case 'ls':
        manager.ls();
        break;
      case 'cat':
        manager.isEnoughArgs([line[1]], manager.cat.bind(manager, line[1]));
        break;
      case 'add':
        manager.isEnoughArgs([line[1]], manager.add.bind(manager, line[1]));
        break;
      case 'cp':
        manager.isEnoughArgs([line[1], line[2]], manager.cp.bind(manager, line[1], line[2]));
        break;
      case 'mv':
        manager.isEnoughArgs([line[1], line[2]], manager.mv.bind(manager, line[1], line[2]));
        break;
      case 'rn':
        manager.isEnoughArgs([line[1], line[2]], manager.rn.bind(manager, line[1], line[2]));
        break;
      case 'rm':
        manager.isEnoughArgs([line[1]], manager.rm.bind(manager, line[1]));
        break;
      case 'hash':
        manager.isEnoughArgs([line[1]], manager.hash.bind(manager, line[1]));
        break;
      case 'os':
        manager.isEnoughArgs([line[1]], manager.os.bind(manager, line[1]));
        break;
      case 'compress':
        manager.isEnoughArgs([line[1], line[2]], manager.compress.bind(manager, line[1], line[2]));
        break;
      case 'decompress':
        manager.isEnoughArgs(
          [line[1], line[2]],
          manager.decompress.bind(manager, line[1], line[2])
        );
        break;
      case 'Invalid':
        break;
      default:
        manager.showInvalidInputMessage();
        break;
    }
  });
}
start();
