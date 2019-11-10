import * as fs from 'fs';
import * as path from 'path';

const homedir = require('os').homedir();

const dbPath = path.resolve(homedir, '.todos');

export interface TaskProp {
  title: string;
  done: boolean;
}

const read = (filePath: string = dbPath) => {
  return new Promise<TaskProp[]>((resolve, reject) => {
    // flag
    // default: r, open file for reading. An exception occurs if the file does not exist
    // a+ : open file for reading and appending. The file is created if it does not exist
    fs.readFile(filePath, { flag: 'a+' }, (err, data) => {
      if (err) return reject(err);
      const tasks = data.toString() ? JSON.parse(data.toString()) : [];
      resolve(tasks);
    });
  });
};

const write = (data: TaskProp[], filePath: string = dbPath) => {
  return new Promise((resolve, reject) => {
    const dataString = JSON.stringify(data);
    fs.writeFile(filePath, dataString, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
const db = {
  read (filePath: string = dbPath) {
    return new Promise<TaskProp[]>((resolve, reject) => {
      // flag
      // default: r, open file for reading. An exception occurs if the file does not exist
      // a+ : open file for reading and appending. The file is created if it does not exist
      fs.readFile(filePath, { flag: 'a+' }, (err, data) => {
        if (err) return reject(err);
        const tasks = data.toString() ? JSON.parse(data.toString()) : [];
        resolve(tasks);
      });
    });
  },
  write (data: TaskProp[], filePath: string = dbPath) {
    return new Promise((resolve, reject) => {
      const dataString = JSON.stringify(data);
      fs.writeFile(filePath, dataString, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
};
export default db;
