## 概述
本文会通过实现一个的`todo`命令行工具来一步步带你学习以下知识：
* 调试`Node.js + TypeScript`应用
* `fs.readFile`和`fs.writeFile`的使用
* 使用`Node.js + TypeScript`开发命令行工具
* 发布`Node.js + TypeScript`项目到`npm`

项目依赖介绍：  

* [`commander`](https://github.com/tj/commander.js): `Node.js`命令行界面完整的解决方案
* [`inquirer`](https://github.com/SBoudrias/Inquirer.js/): 命令行用户界面一些常用交互
* [`ts-node`](https://github.com/TypeStrong/ts-node): `node.js`的`TypeScript`执行的交互式解析器，支持直接用`node.js`来执行`.ts`代码
* [`typescript`](https://github.com/microsoft/TypeScript): 可以`JavaScript`代码指定类型

### 功能
首先看一下实现效果：  
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/node-ts-todos-cli-demonstrate001.gif)

* todo add taskName: 添加任务
* todo clear: 清空所有任务
* todo: 显示所有任务，选择之后可进行增删改查操作

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
这里主要使用`Promise`来封装,方便之后通过`.then`或者`async/await`来进行使用。并且我们为`readFile`传入了`{flag: 'a+'}`来防止文件不存在时报错。所有文件系统标识可以看这里: [文件系统标志](http://nodejs.cn/api/fs.html#fs_file_system_flags)

当然官方也为我们专门提供了`fsPromise`相关`api`，有兴趣的同学可以了解一下直接使用: [传送门](http://nodejs.cn/api/fs.html#fs_fs_promises_api)。

之后的增删改查逻辑都是以这俩个方法为基础，并结合`commander`和`inquirer`。

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
> 笔者这里使用的是`yarn`来进行发布，`npm`的操作过程是类似的  
> 所有`tsconfig.json`的配置描述在这里：[传送门](http://json.schemastore.org/tsconfig)

首先，我们需要一个`npm`账号。如果小伙伴没还没有账号的话可以去官网注册。

在正式发布之前，我们还需要在`package.json`和`tsconfig.json`中添加或修改一些配置：  
```json
{
  "bin": {
    "todo": "dist/cli.js"
  },
  "files": [
    "dist/**/*.js",
    "typings/**/*.d.ts"
  ],
  "types": "typings/*/**.d.ts"
}
```

* `bin`: 可以让执行自定义的快捷命令，全局安装后可直接使用
* `file`: 当你的包作为依赖被安装时所包含的文件(需要上传到`npm`的源代码)
* `types`: 编译的`JavaScript`文件对应的类型声明文件 

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "declarationDir": "typings"
  }
}
```

* `outDir`: 指定编译生成的`JavaScript`文件存放的目录
* `declaration`: 是否生成编译后`JavaScript`对应的类型声明文件
* `declarationDir`: 指定类型声明文件的输出目录

需要注意的是，我们要确保`bin`中引入的文件要以`#!/usr/bin/env node`开头，否则脚本不能在`node`环境下运行

准备工作完成后，我们正式开始发布。

#### 1. 切换到`npm`官方源
> 这里使用[`nrm`](https://github.com/Pana/nrm)对`npm`源进行管理，有需要的小伙伴可以自行安装 

在命令行中执行如下命令：
```shell script
nrm ls
nrm use npm
```

#### 2. 使用`yarn`登录`npm`
发布之前我们需要进行登录：  
```shell script
yarn login
```
接下来会提示我们输入用户名和邮箱，按照提示输入即可：  
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/ts-node-todo-yarn-login.png)

#### 3. 发布到`npm`
在命令行输入：  
```shell script
yarn publish
```
之后会提示我们输入新的版本号(第一个次可以不输)，要保证和之前已有版本号不能重名
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/node-ts-todo-publish.png)

如果你的`package.json`中的`name`写的比较随意的话，会碰到这样的报错：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/node-ts-todo-publish-error.png)

这是由于我们的包名触发了`npm`的垃圾邮件检测，我们需要重新更改`name`属性，并且尽量避免一些常用名称和数字

#### 4. 在本机安装使用
使用`yarn`全局安装我们发布到`npm`官网上的`package`:  
```shell script
yarn global add todos-cli-node-test
```
然后执行脚本提供的命令： 
```shell script
todo
```
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/node-ts-todo-install-success.png)

可以看到成功显示了任务列表。

到这里我们成功将一个`Node.js + TypeScript`命令行工具发布到`npm`，并且可以在电脑中下载通过全局命令来直接使用。

### 结语
文章源代码在这里： [戳我](https://github.com/wangkaiwd/node-practice)

开源不易，如果本文对你有帮助的话可以点一下`star`，这将是对作者最大的鼓励。
