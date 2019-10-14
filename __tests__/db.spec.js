const db = require('../db');
const fs = require('fs');
jest.mock('fs');
describe('db', () => {
  it('能读文件', () => {
    expect(db.read).toBeInstanceOf(Function);
    expect(fs.x()).toBe('xxx');
  });
  it('能写文件', () => {
    expect(db.read).toBeInstanceOf(Function);
  });
});

