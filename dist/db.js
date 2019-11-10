"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var homedir = require('os').homedir();
var dbPath = path.resolve(homedir, '.todos');
var read = function (filePath) {
    if (filePath === void 0) { filePath = dbPath; }
    return new Promise(function (resolve, reject) {
        // flag
        // default: r, open file for reading. An exception occurs if the file does not exist
        // a+ : open file for reading and appending. The file is created if it does not exist
        fs.readFile(filePath, { flag: 'a+' }, function (err, data) {
            if (err)
                return reject(err);
            var tasks = data.toString() ? JSON.parse(data.toString()) : [];
            resolve(tasks);
        });
    });
};
var write = function (data, filePath) {
    if (filePath === void 0) { filePath = dbPath; }
    return new Promise(function (resolve, reject) {
        var dataString = JSON.stringify(data);
        fs.writeFile(filePath, dataString, function (err) {
            if (err)
                return reject(err);
            resolve();
        });
    });
};
var db = { read: read, write: write };
// TODO: how export db object will more elegant
exports.default = db;
//# sourceMappingURL=db.js.map