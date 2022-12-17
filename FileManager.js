import * as readline from 'node:readline/promises';
import { getHomeDirectory } from './os/getHomeDirectory.js';
import { listFiles } from './stream/listFiles.js';
import { sortFilesAndDirs } from './helpers/sortFilesAndDirs.js';
export class FileManager {
  constructor({ input, output, args }) {
    this.rl = readline.createInterface({ input, output });
    // add actual arg name check
    this.userName = args.toString().split('=')[1];
    this.currentDirectory = getHomeDirectory();
  }
  sayHi() {
    this.rl.write(`Welcome to the File Manager, ${this.userName}!\n`);
  }
  sayBye() {
    this.rl.write(`Thank you for using File Manager, ${this.userName}, goodbye!`);
    this.close();
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
    //this.rl.write(`You are currently in ${this.currentDirectory}\n\r`);
    this.rl.write(`You are currently in ${process.cwd()}\n\r`);
  }
  prompt() {
    this.rl.prompt(true);
  }
  up() {
    process.chdir('..');
    this.currentDirectory = process.cwd();
  }
  changeDirectory(dir) {
    process.chdir(dir);
  }
  ls() {
    listFiles(process.cwd(), this.displayList.bind(this));
  }
  displayList(files) {
    console.table(sortFilesAndDirs(files));
    this.showCurrentDirectory();
    this.prompt();
  }
}
