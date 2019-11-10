import { add, clear } from './api';

const program = require('commander');

program
  .option('-x, --xxx', 'output extra debugging');

program
  .command('add <taskName...>')
  .action((titles:string[]) => {
    add(titles).then(null);
  });

program
  .command('clear')
  .action(() => {
    clear();
  });
console.log('index');
program.parse(process.argv);
