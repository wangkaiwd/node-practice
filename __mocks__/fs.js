const fs = jest.genMockFromModule('fs');
const _fs = jest.requireActual('fs');
const readMock = {};
fs.setReadMock = (path, error, data) => {
  readMock[path] = [error, data];
};
fs.readFile = (path, options, callback) => {
  // options选传
  if (typeof callback === 'undefined') {callback = options;}
  if (path in readMock) {
    callback(...readMock[path]);
  } else {
    _fs.readFile(path, options, callback);
  }

};
module.exports = fs;
