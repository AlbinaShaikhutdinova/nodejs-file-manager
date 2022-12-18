import * as readline from 'node:readline/promises';
import { getHomeDirectory } from './os/getHomeDirectory.js';
import { listFiles } from './stream/listFiles.js';
import { sortFilesAndDirs } from './helpers/sortFilesAndDirs.js';
import { readFile } from './stream/readFile.js';
import { formatPath } from './helpers/formatPath.js';
import { createFile } from './stream/createFile.js';
import { renameFile } from './stream/renameFile.js';
import { copyFile } from './stream/copyFile.js';
import { moveFile } from './stream/moveFile.js';
import { deleteFile } from './stream/deleteFile.js';
import { getHash } from './hash/getHash.js';
import { getEOL } from './os/getEOL.js';
import { getCPU } from './os/getCPU.js';
import { getUsername } from './os/getUsername.js';
import { getArchitecture } from './os/getArchitecture.js';
import { compress } from './zip/compress.js';
import { decompress } from './zip/decompress.js';
export class FileManager {
  constructor({ input, output, args }) {
    this.rl = readline.createInterface({ input, output });
    // add actual arg name check
    this.userName = args.toString().split('=')[1] || 'Anonymous';
    this.currentDirectory = getHomeDirectory();
  }
  sayHi() {
    this.rl.write(`Welcome to the File Manager, ${this.userName}!\n`);
  }
  sayBye() {
    this.rl.write(`Thank you for using File Manager, ${this.userName}, goodbye!`);
    this.close();
  }
  showInvalidInputMessage() {
    console.log('Invalid input\n\r');
    this.prompt();
  }
  showOperationFailedMessage() {
    console.log('Operation failed\n\r');
    this.prompt();
  }
  close() {
    this.rl.pause();
    this.rl.close();
    this.rl.removeAllListeners();
  }
  goToHomeDirectory() {
    process.chdir(this.currentDirectory);
  }
  showCurrentDirectory() {
    console.log(`You are currently in ${process.cwd()}\n\r`);
  }
  prompt() {
    this.rl.prompt(true);
  }
  up() {
    try {
      process.chdir('..');
      this.showCurrentDirectory();
      this.prompt();
    } catch (err) {
      this.showOperationFailedMessage();
    }
  }
  changeDirectory(dir) {
    try {
      process.chdir(dir);
      this.showCurrentDirectory();
      this.prompt();
    } catch (err) {
      this.showOperationFailedMessage();
    }
  }
  ls() {
    listFiles(process.cwd(), this.displayList.bind(this));
  }
  displayList(files) {
    console.table(sortFilesAndDirs(files));
    this.showCurrentDirectory();
    this.prompt();
  }
  printNewLine() {
    console.log('\r\n');
  }
  cat(path) {
    this.getResult(readFile.bind(this, formatPath(path)), true);
  }
  add(path) {
    this.getResult(createFile.bind(this, formatPath(path)));
  }
  rn(path, newName) {
    this.getResult(renameFile.bind(this, formatPath(path), newName));
  }
  async cp(source, target) {
    this.getResult(copyFile.bind(this, formatPath(source), formatPath(target)));
  }
  mv(source, target) {
    this.getResult(moveFile.bind(this, formatPath(source), formatPath(target)));
  }
  rm(path) {
    this.getResult(deleteFile.bind(this, formatPath(path)));
  }

  hash(path) {
    this.getResult(getHash.bind(this, formatPath(path)), true);
  }
  async os(command) {
    switch (command) {
      case '--EOL':
        console.log(getEOL().replace(/\n/g, '\\n').replace(/\r/g, '\\r'));
        this.printNewLine();
        this.showCurrentDirectory();
        this.prompt();
        break;
      case '--cpus':
        getCPU().forEach((item, id) => {
          if (id === 0) {
            console.log(`${item.property}: ${item.value}`);
          } else {
            console.log(`Model: ${item.model}, CLock Rate: ${item.speed} GHz`);
          }
          this.printNewLine();
        });
        this.showCurrentDirectory();
        this.prompt();
        break;
      case '--homedir':
        console.log(getHomeDirectory());
        this.printNewLine();
        this.showCurrentDirectory();
        this.prompt();
        break;
      case '--username':
        console.log(getUsername());
        this.printNewLine();
        this.showCurrentDirectory();
        this.prompt();
        break;
      case '--architecture':
        console.log(getArchitecture());
        this.printNewLine();
        this.showCurrentDirectory();
        this.prompt();
        break;
      default:
        this.showInvalidInputMessage();
    }
  }
  compress(source, target) {
    this.getResult(compress.bind(this, source, target));
  }
  decompress(source, target) {
    this.getResult(decompress.bind(this, source, target));
  }

  isEnoughArgs(args, cb) {
    let flag = true;
    args.forEach((arg) => {
      if (!arg) {
        flag = false;
      }
    });
    flag ? cb() : this.showInvalidInputMessage();
  }
  async getResult(func, printRes = false) {
    try {
      const res = await func();
      if (printRes) {
        console.log(res + '\r\n');
      }
      this.printNewLine();
      this.showCurrentDirectory();
      this.prompt();
    } catch (err) {
      this.showOperationFailedMessage();
    }
  }
}
