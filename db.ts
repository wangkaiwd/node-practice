import * as fs from 'fs';
import * as path from 'path';

const homedir = require('os').homedir();

const dbPath = path.resolve(homedir, '.todos');

interface TaskProps {
  title: string;
  done: boolean;
}

const read = (filePath: string = dbPath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) return reject();
      resolve(data);
    });
  });
};

const write = (data: TaskProps, filePath: string = dbPath) => {
  return new Promise((resolve, reject) => {
    const dataString = JSON.stringify(data);
    fs.writeFile(filePath, dataString, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
export { read, write };
