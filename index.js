const db = require('./db');
const fs = require('fs');
const inquirer = require('inquirer');
const add = async (title) => {
  title = title.join(' ');
  // 想要的调用方式：
  // const list = await db.read();
  // list.push({ title, done: false });
  // await db.write(list);
  db.read()
    .then(list => {
      list.push({ title, done: false });
      return db.write(list);
    });

  // 分别用Promise和async和await来进行处理结果
  // 相对来说，async和await会看起来更加优雅
};
const clear = () => {
  fs.writeFile(db.dbPath, JSON.stringify([]), (err) => {
    if (err) {console.log(err);}
  });
};

const markAsCompleted = (list, index) => {
  list[index].done = true;
  db.write(list);
};
const markAsUnCompleted = (list, index) => {
  list[index].done = false;
  db.write(list);
};
const updateTitle = (list, index) => {
  inquirer
    .prompt({
      type: 'input',
      name: 'title',
      message: '新的任务名称'
    })
    .then(answer => {
      list[index].title = answer.title;
      db.write(list);
    });
};

const deleteTask = (list, index) => {
  list.splice(index, 1);
  db.write(list);
};

const askForCreateTask = (list) => {
  inquirer
    .prompt({
      type: 'input',
      name: 'title',
      message: '任务名称'
    })
    .then(answer => {
      list.push({ title: answer.title, done: false });
      db.write(list);
    });
};
const TASK_OPERATES = [
  { name: '退出', value: 'quite' },
  { name: '已完成', value: 'markAsCompleted' },
  { name: '未完成', value: 'markAsUnCompleted' },
  { name: '改标题', value: 'updateTitle' },
  { name: '删除', value: 'deleteTask' }
];
const askForOperateTask = (list, index) => {
  inquirer
    .prompt({
      type: 'list',
      name: 'operate',
      message: '选择操作？',
      choices: TASK_OPERATES
    })
    .then(answer => {
      const operateMaps = { markAsCompleted, markAsUnCompleted, updateTitle, deleteTask };
      const operate = operateMaps[answer.operate];
      if (typeof operate === 'function') {
        operate(list, index);
      }
    });
};
const displayAll = async () => {
  const list = await db.read();
  const choicesList = (list) => {
    return list.map((item, i) => {
      const name = `${item.done ? '[x]' : '[_]'} ${i + 1}-${item.title}`;
      return { name, value: i.toString() };
    });
  };
  inquirer
    .prompt({
      type: 'list',
      name: 'index',
      message: '请选择要操作的任务？',
      choices: [
        { name: '退出', value: '-1' },
        ...choicesList(list),
        { name: '+ 创建任务', value: '-2' }
      ]
    })
    .then(answer => {
      const index = Number(answer.index);
      if (index >= 0) {
        askForOperateTask(list, index);
      } else if (index === -2) {
        askForCreateTask(list);
      }
    });
};

module.exports = { add, clear, displayAll };
