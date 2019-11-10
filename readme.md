## 项目介绍
使用`nodejs`实现的`todo`命令行界面。

项目依赖介绍：  
* [`commander`](https://github.com/tj/commander.js): `Node.js`命令行界面完整的解决方案
* [`inquirer`](https://github.com/SBoudrias/Inquirer.js/): 命令行用户界面一些常用交互
* `ts-node`
* `typescript`

### 功能

### 实现思路

我们利用`Node.js`的`fs`模块将命令行中添加任务保存到电脑的`home`目录的`.todos`文件中，该文件相当于一个小型数据库。

> `stackoverflow`关于`node.js`中获取`home`目录的讨论：
  [`Node.js - Find home directory in platform agnostic way`](https://stackoverflow.com/questions/9080085/node-js-find-home-directory-in-platform-agnostic-way)

实现过程中主要使用了`fs.writeFile`和`fs.readFile`这俩个`api`，并对其进行简单封装：  
```typescript

```

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

