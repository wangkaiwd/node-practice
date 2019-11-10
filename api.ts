import db, { TaskProp } from './db';
import * as inquirer from 'inquirer';

export const add = async (titles: string[]) => {
  const title = titles.join(' ');
  const tasks: TaskProp[] = await db.read();
  tasks.push({ title, done: false });
  await db.write(tasks);
};

export const clear = async () => {
  // TODO: the methods of clear database compare with previous code
  await db.write([]);
  console.log('清空成功');
};

interface ChoiceProps {
  name: string;
  value: number | string;
}
type Actions = 'markAsCompleted' | 'markAsUnComplete' | 'updateTitle' | 'deleteTask'
type ActionMap = {
  [K in Actions]: (list: TaskProp[], index: number) => void
}
const createListPrompt = (message: string, choices: ChoiceProps[]): Promise<{ key: number | string }> => {
  return inquirer
    .prompt([
      { type: 'list', name: 'key', message, choices }
    ]);
};
const markAsCompleted = (list: TaskProp[], index: number) => {
  list[index].done = true;
  db.write(list).then();
};

const markAsUnComplete = (list: TaskProp[], index: number) => {
  list[index].done = false;
  db.write(list).then();
};
const updateTitle = (list: TaskProp[], index: number) => {
  askForNewTask(list).then(title => {
    list[index].title = title;
    db.write(list).then(() => {
      console.log('更新成功');
    });
  });
};
const deleteTask = (list: TaskProp[], index: number) => {
  list.splice(index, 1);
  db.write(list).then();
};
const askForNewTask = (list: TaskProp[]) => {
  const questions = [{
    type: 'input',
    name: 'title',
    message: '新任务的名称'
  }];
  return inquirer.prompt(questions)
    .then((answers): string => answers.title as string);
};
const askForAction = (list: TaskProp[], index: number) => {
  const actions = [
    { name: '退出', value: -1 },
    { name: '已完成', value: 'markAsCompleted' },
    { name: '未完成', value: 'markAsUnComplete' },
    { name: '修改标题', value: 'updateTitle' },
    { name: '删除', value: 'deleteTask' }
  ];
  createListPrompt('选择操作', actions).then(
    answers => {
      if (answers.key !== -1) {
        const actionMap: ActionMap = { markAsCompleted, markAsUnComplete, updateTitle, deleteTask };
        actionMap[(answers.key as Actions)](list, index);
      }
    }
  );

};

export const showAll = async () => {
  const list = await db.read();
  const allChoices = (): ChoiceProps[] => {
    return list.map((task, i) => {
      const taskFlag = task.done ? '[x]' : '[_]';
      const value = i;
      const name = `${taskFlag} ${i + 1}. ${task.title}`;
      return { name, value };
    });
  };
  createListPrompt('请选择要操作的任务?', [
    { name: '退出', value: -1 },
    ...allChoices(),
    { name: '+ 创建任务', value: -2 },
  ]).then(answers => {
    if (answers.key >= 0) {
      askForAction(list, answers.key as number);
    } else if (answers.key === -2) {
      askForNewTask(list)
        .then(title => {
          list.push({ title, done: false });
          return db.write(list);
        }).then(() => {console.log('添加成功');});
    }
  });
};


