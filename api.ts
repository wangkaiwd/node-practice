import db, { TaskProp } from './db';

const add = async (title: string) => {
  const tasks: TaskProp[] = await db.read();
  tasks.push({ title, done: false });
  await db.write(tasks);
};

const clear = () => {
  // TODO: the methods of clear database compare with previous code
  db.write([]).then(null);
};

export { add, clear };
