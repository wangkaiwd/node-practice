import db, { TaskProp } from './db';
import * as inquirer from 'inquirer';
import { Answers } from 'inquirer';

export const add = async (titles: string[]) => {
  const title = titles.join(' ');
  const tasks: TaskProp[] = await db.read();
  tasks.push({ title, done: false });
  await db.write(tasks);
};

export const clear = (): void => {
  // TODO: the methods of clear database compare with previous code
  db.write([]).then(null);
};

interface ChoiceProps {
  name: string;
  value: number | string;
}
type Actions = 'markAsCompleted' | 'markAsUnComplete' | 'updateTitle' | 'deleteTask'
type ActionMap = {
  [K in Actions]: () => void
}
const createPrompt = (message: string, choices: ChoiceProps[], type: string = 'list'): Promise<{ key: number | string }> => {
  return inquirer
    .prompt([
      { type, name: 'key', message, choices }
    ]);
};
const markAsCompleted = () => {

};

const markAsUnComplete = () => {

};
const updateTitle = () => {

};
const deleteTask = () => {

};
export const showAll = async () => {
  const list = await db.read();
  const allChoices = (): ChoiceProps[] => {
    return list.map((task, i) => {
      const taskFlag = task.done ? '[x]' : '[_]';
      const value = i;
      const name = `${taskFlag} ${i + 1} ${task.title}`;
      return { name, value };
    });
  };
  createPrompt('请选择要操作的任务?', [
    { name: '退出', value: -1 },
    ...allChoices(),
    { name: '+ 创建任务', value: -2 },
  ]).then(answers => {
    if (answers.key >= 0) {
      const actions = [
        { name: '退出', value: -1 },
        { name: '已完成', value: 'markAsCompleted' },
        { name: '未完成', value: 'markAsUnComplete' },
        { name: '修改标题', value: 'updateTitle' },
        { name: '删除', value: 'deleteTask' }
      ];
      createPrompt('选择操作', actions).then(
        answers => {
          if (answers.key !== -1) {
            const actionMap: ActionMap = { markAsCompleted, markAsUnComplete, updateTitle, deleteTask };
            actionMap[(answers.key as Actions)]();
          }
        }
      );
    }
  });
};


