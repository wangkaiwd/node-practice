"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("./db"));
var inquirer = __importStar(require("inquirer"));
exports.add = function (titles) { return __awaiter(void 0, void 0, void 0, function () {
    var title, tasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                title = titles.join(' ');
                return [4 /*yield*/, db_1.default.read()];
            case 1:
                tasks = _a.sent();
                tasks.push({ title: title, done: false });
                return [4 /*yield*/, db_1.default.write(tasks)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.clear = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.write([])];
            case 1:
                _a.sent();
                console.log('清空成功');
                return [2 /*return*/];
        }
    });
}); };
var createListPrompt = function (message, choices) {
    return inquirer
        .prompt([
        { type: 'list', name: 'key', message: message, choices: choices }
    ]);
};
var markAsCompleted = function (list, index) {
    list[index].done = true;
    db_1.default.write(list).then();
};
var markAsUnComplete = function (list, index) {
    list[index].done = false;
    db_1.default.write(list).then();
};
var updateTitle = function (list, index) {
    askForNewTask(list).then(function (title) {
        list[index].title = title;
        db_1.default.write(list).then(function () {
            console.log('更新成功');
        });
    });
};
var deleteTask = function (list, index) {
    list.splice(index, 1);
    db_1.default.write(list).then();
};
var askForNewTask = function (list) {
    var questions = [{
            type: 'input',
            name: 'title',
            message: '新任务的名称'
        }];
    return inquirer.prompt(questions)
        .then(function (answers) { return answers.title; });
};
var askForAction = function (list, index) {
    var actions = [
        { name: '退出', value: -1 },
        { name: '已完成', value: 'markAsCompleted' },
        { name: '未完成', value: 'markAsUnComplete' },
        { name: '修改标题', value: 'updateTitle' },
        { name: '删除', value: 'deleteTask' }
    ];
    createListPrompt('选择操作', actions).then(function (answers) {
        if (answers.key !== -1) {
            var actionMap = { markAsCompleted: markAsCompleted, markAsUnComplete: markAsUnComplete, updateTitle: updateTitle, deleteTask: deleteTask };
            actionMap[answers.key](list, index);
        }
    });
};
exports.showAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    var list, allChoices;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.read()];
            case 1:
                list = _a.sent();
                allChoices = function () {
                    return list.map(function (task, i) {
                        var taskFlag = task.done ? '[x]' : '[_]';
                        var value = i;
                        var name = taskFlag + " " + (i + 1) + ". " + task.title;
                        return { name: name, value: value };
                    });
                };
                createListPrompt('请选择要操作的任务?', __spreadArrays([
                    { name: '退出', value: -1 }
                ], allChoices(), [
                    { name: '+ 创建任务', value: -2 },
                ])).then(function (answers) {
                    if (answers.key >= 0) {
                        askForAction(list, answers.key);
                    }
                    else if (answers.key === -2) {
                        askForNewTask(list)
                            .then(function (title) {
                            list.push({ title: title, done: false });
                            return db_1.default.write(list);
                        }).then(function () { console.log('添加成功'); });
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
