const db = require('../db');
const fs = require('fs');
jest.mock('fs');
describe('db', () => {
  it('能读文件', async () => {
    const list1 = [{ title: '任务1', done: false }];
    fs.setReadMock('/xxx', null, JSON.stringify(list1));
    const list2 = await db.read('/xxx');
    expect(list2).toStrictEqual(list1);
  });
  it('能写文件', async () => {
    const list = [{ title: '任务yyy', done: false }];
    let fakeList = null;
    fs.setWriteMock('/yyy', (path, data, callback) => {
      fakeList = data;
      callback(null);
    });
    await db.write(list, '/yyy');
    expect(JSON.stringify(list)).toBe(fakeList);
  });
});

