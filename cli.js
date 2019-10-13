#!/usr/bin/env node
const pkg = require('./package');
const program = require('commander');
const { add, clear, displayAll } = require('./index');
program
  .version(pkg.version, '-v, --version', 'output the current version');

// Command implemented using action handler (description is supplied separately to `.command`)
// Returns new command for configuring.
program
  .command('add <taskName...>')
  .description('add a task')
  .action(add);

program
  .command('clear')
  .description('clear task')
  .action(clear);

program.parse(process.argv);

if (process.argv.length === 2) {
  displayAll();
}

// 操作过程：
// 1. 随便找一段示例代码(不要太简单)在编辑器里运行
// 2. 将复制过来的代码根据CRM方法进行学习
// 3. 为什么想到了添加子命令？

// 新增一个任务：
// 1. 创建一个add方法，将传入的任务添加到数据库中
//    1. 用一个文件来充当数据库，将对应的todos列表进行存储
//    2. 使用home目录下的.todo来作为数据存储的路径
