const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();
const dbPath = path.resolve(homedir, './.todo');

/**
 * fs.readFile的参数：
 *  1. 文件路径(要传入绝对路径)
 *  2. 选项: string,object
 *      string: encoding
 *      object: {encoding: '字符编码', flag:'文件系统标志'}
 */
const read = (path = dbPath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { flag: 'a+' }, (err, data) => {
      if (err) return reject(err);
      let list;
      try {
        list = JSON.parse(data.toString());
      } catch (e) {
        list = [];
      }
      resolve(list);
    });
  });
};

const write = (list, path = dbPath) => {
  list = JSON.stringify(list);
  return new Promise((resolve, reject) => {
    fs.writeFile(path, list, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

module.exports = { read, write };
