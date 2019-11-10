import { add, clear, showAll } from './api';

const program = require('commander');

program
  .option('-x, --xxx', 'output extra debugging');

program
  .command('add <taskName...>')
  .action((titles: string[]) => {
    add(titles).then(null);
  });

program
  .command('clear')
  .action(() => {
    clear();
  });
if (typeof process.argv[2] === 'undefined') {
  showAll().then();
}
program.parse(process.argv);
