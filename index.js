const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();
const dbPath = path.resolve(homedir, './.todo');
const add = (title) => {
  // 想要的调用方式：
  // const list = db.read()
  // list.push(task)
  // db.write(list)
};

module.exports = add;
