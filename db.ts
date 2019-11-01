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

const db = { read, write };
export default db;
