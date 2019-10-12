const program = require('commander');
const add = (a) => {
  console.log('a', a);
};
const clear = (c) => {
  console.log('c', c);
};
program
  .option('add <taskName>', 'add a task', add)
  .option('clear', 'clear all tasks', clear);

program.parse(process.argv);
console.log('stuff');

// 1. 如何找到示例代码
// 2. 如何进行进一步的开发
