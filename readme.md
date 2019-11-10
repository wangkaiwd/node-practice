## 项目介绍
使用`nodejs`实现的`todo`命令行界面。

项目依赖介绍：  
* [`commander`](https://github.com/tj/commander.js): `Node.js`命令行界面完整的解决方案
* [`inquirer`](https://github.com/SBoudrias/Inquirer.js/): 命令行用户界面一些常用交互
* `ts-node`
* `typescript`

### 功能

![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/node-ts-todos-display.gif)


### 实现思路

我们利用`Node.js`的`fs`模块将命令行中添加任务保存到电脑的`home`目录的`.todos`文件中，该文件相当于一个小型数据库。

> `stackoverflow`关于`node.js`中获取`home`目录的讨论：
  [`Node.js - Find home directory in platform agnostic way`](https://stackoverflow.com/questions/9080085/node-js-find-home-directory-in-platform-agnostic-way)

实现过程中主要使用了`fs.writeFile`和`fs.readFile`这俩个`api`，并对其进行简单封装：  
```typescript
const db = {
  read (filePath: string = dbPath) {
    return new Promise<TaskProp[]>((resolve, reject) => {
      // flag
      // default: r, open file for reading. An exception occurs if the file does not exist
      // a+ : open file for reading and appending. The file is created if it does not exist
      fs.readFile(filePath, { flag: 'a+' }, (err, data) => {
        if (err) return reject(err);
        const tasks = data.toString() ? JSON.parse(data.toString()) : [];
        resolve(tasks);
      });
    });
  },
  write (data: TaskProp[], filePath: string = dbPath) {
    return new Promise((resolve, reject) => {
      const dataString = JSON.stringify(data);
      fs.writeFile(filePath, dataString, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
};
```
这里主要使用`Promise`来封装,方便之后通过`.then`或者`async/await`来进行使用。并且我们为`readFile`传入了`{flag: 'a+'}`来防止文件不存在时报错。

当然官方也为我们专门提供了`fs.Promise`相关`api`，有兴趣的同学可以了解一些直接使用。

### 调试`TypeScript + Node.js`文件

在开发过程中难免会遇到一些比较复杂的逻辑，需要通过连接调试器来一步步找出问题所在，接下来介绍如何利用`WebStorm`调试`TypeScript + Node.js`的源代码。

首先我们需要将`tsconfig.json`中的`sourceMap`功能开启,并设置编译的`JavaScript`问文件存放到`dist`目录中：  
```json
{
    ...
    "sourceMap": true,
    "outDir": "dist",
    ...
}
```

接下来我们需要将`TypeScript`文件实时编译为`JavaScript`文件：  
```shell script
tsc -p .
```

而我们用`WebStorm`调试的文件其实是编译生成的`JavaScript`文件，`Debug configuration`配置如下：  
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/webstorm-debug-ts-configuration.png)

这样配置之后，虽然可以调试`TypeScript + Node.js`源代码，但是每次更改代码都需要重新编译、重新启动`debug`配置，那有没有什么办法可以实时更新调试器中的代码呢？

经过在`Google`一番探索，发现了`WebStorm`的`live edit`功能，具体讨论链接在这里：[传送门](https://stackoverflow.com/a/45716154/11720536)

首先，我们开启实时编译`TypeScript`文件：
```shell script
tsc -p . -w
```

然后我们配置`WebStorm`的`Live Edit`功能：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/node-debugger-live-edit.png)

目前笔者用这种方法来进行代码调试，如果你有更好的调试方法，可以留言告诉我，让我们一起进步学习。


### 发布到`npm`

