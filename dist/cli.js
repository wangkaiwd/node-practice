#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("./api");
var program = require('commander');
program
    .version('0.0.6', '-v, --version', 'output the current version')
    .command('add <taskName...>')
    .action(function (titles) {
    api_1.add(titles).then(null);
});
program
    .command('clear')
    .action(function () {
    api_1.clear().then();
});
if (typeof process.argv[2] === 'undefined') {
    api_1.showAll().then();
}
program.parse(process.argv);
