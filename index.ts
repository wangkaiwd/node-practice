import { add, clear } from './api';

const program = require('commander');

program
  .option('-x, --xxx', 'output extra debugging');

program
  .command('add <taskName>')
  .action((title: string) => {
    add(title).then(null);
  });

program
  .command('clear')
  .action(() => {
    clear();
  });
program.parse(process.argv);
