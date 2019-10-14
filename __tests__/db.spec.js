const db = require('../db');
describe('db', () => {
  it('能读文件', () => {
    expect(db.read).toBeInstanceOf(Function);
  });
  it('能写文件', () => {
    expect(db.read).toBeInstanceOf(Function);
  });
});

