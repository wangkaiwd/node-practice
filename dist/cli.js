#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("./api");
var package_json_1 = __importDefault(require("./package.json"));
var program = require('commander');
program
    .version(package_json_1.default.version, '-v, --version', 'output the current version')
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
