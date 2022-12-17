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

  async cat(path) {
    const data = await readFile(formatPath(path));
    this.rl.write(data + '\n\r');
    this.showCurrentDirectory();
    this.prompt();
  }
  async add(path) {
    const res = await createFile(formatPath(path));
    console.log(res);
    this.showCurrentDirectory();
    this.prompt();
  }
  async rn(path, newName) {
    const res = await renameFile(formatPath(path), newName);
    console.log(res);
    this.showCurrentDirectory();
    this.prompt();
  }
  async cp(source, target) {
    const res = await copyFile(formatPath(source), formatPath(target));
    console.log(res);
    this.showCurrentDirectory();
    this.prompt();
  }
  async mv(source, target) {
    const res = await moveFile(formatPath(source), formatPath(target));
    console.log(res);
    this.showCurrentDirectory();
    this.prompt();
  }
  async rm(path) {
    const res = await deleteFile(formatPath(path));
    console.log(res);
    this.showCurrentDirectory();
    this.prompt();
  }

  async hash(path) {
    const res = await getHash(formatPath(path));
    this.rl.write(res + '\r\n');
    this.showCurrentDirectory();
    this.prompt();
  }
}
