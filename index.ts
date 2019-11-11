#!/usr/bin/env node
import { add, clear, showAll } from './api';
import pkg from './package.json';

const program = require('commander');

program
  .version(pkg.version, '-v, --version', 'output the current version')
  .command('add <taskName...>')
  .action((titles: string[]) => {
    add(titles).then(null);
  });

program
  .command('clear')
  .action(() => {
    clear().then();
  });
if (typeof process.argv[2] === 'undefined') {
  showAll().then();
}
program.parse(process.argv);
