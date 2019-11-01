import db, { TaskProp } from './db';

const add = async (title: string) => {
  const tasks: TaskProp[] = await db.read();
  tasks.push({ title, done: false });
  await db.write(tasks);
};

const clear = () => {
  db.write([]).then(null);
};

export { add, clear };
