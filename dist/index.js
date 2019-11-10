"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("./api");
var program = require('commander');
program
    .option('-x, --xxx', 'output extra debugging');
program
    .command('add <taskName...>')
    .action(function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    api_1.add(args).then(null);
});
program
    .command('clear')
    .action(function () {
    api_1.clear();
});
console.log('index');
program.parse(process.argv);
//# sourceMappingURL=index.js.map