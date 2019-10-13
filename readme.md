## 项目介绍
使用`nodejs`实现的`todo`应用

## 发布到`npm`
### `package.json`
1. [bin](https://docs.npmjs.com/files/package.json#bin):大量的包有一个或多个想安装到`PATH`可执行文件。`npm`使这个变得十分简单。
2. [files](https://docs.npmjs.com/files/package.json#files):指定上传到npm中的文件(当你的包被作为依赖安装时包含的文件)

### 添加`shebang`命令
要在入口文件中添加`shebang`命令，才能让`bin`里的命令正确执行

[node and shebang : help executing via command line](https://stackoverflow.com/questions/24253027/node-and-shebang-help-executing-via-command-line)

