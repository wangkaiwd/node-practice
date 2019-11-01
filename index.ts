import { add } from './api';

const program = require('commander');

program
  .option('-x, --xxx', 'output extra debugging');

program
  .command('add <taskName>')
  .action((title: string) => {
    add(title);
  });
program.parse(process.argv);
