const db = require('./db');
const add = async (title) => {
  title = title.join(' ');
  // 想要的调用方式：
  const list = await db.read();
  list.push({ title, done: false });
  await db.write(list);
};

module.exports = add;
