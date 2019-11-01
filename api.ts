// 将操作信息存储到 home dir 下的 .todos 文件中

import db, { TaskProp } from './db';

const add = async (title: string) => {
  // 提前思考如何使用，然后进行实现
  const tasks: TaskProp[] = await db.read();
  tasks.push({ title, done: false });
  await db.write(tasks);
};

const clear = () => {

};

export { add, clear };
