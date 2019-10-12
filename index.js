const program = require('commander');

program
  .option('-x, --xxx', 'what the x');

// Command implemented using action handler (description is supplied separately to `.command`)
// Returns new command for configuring.
program
  .command('add <taskName...>')
  .description('add a task')
  .action((a) => {
    console.log('add command called', a.join(' '));
  });

program
  .command('clear')
  .description('clear task')
  .action(() => {
    console.log('clear');
  });

program.parse(process.argv);
console.log('stuff');

// 操作过程：
// 1. 随便找一段示例代码(不要太简单)在编辑器里运行
// 2. 将复制过来的代码根据CRM方法进行学习
// 3. 为什么想到了添加子命令？

