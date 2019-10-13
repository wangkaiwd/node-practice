const db = require('./db');
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

module.exports = add;
