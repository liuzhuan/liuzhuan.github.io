---
layout: post
title: wepy 入门
date: 2018-05-21
---

* TOC
{:toc}

WePY - 让小程序支持组件化开发的框架

## 快速开始

```sh
$ npm install wepy-cli -g
$ wepy new myproject
# 1.7.0之后的版本使用 wepy init standard myproject 初始化项目，使用 wepy list 查看项目模板
$ cd myproject
$ npm install
# 开启实时编译
$ wepy build --watch
```

## 快速开始(1.7.0+)

对于 1.7.0 之后的版本，可以如下操作

```sh
$ npm insatll -g wepy-cli
$ wepy init standard my-project
```

### 使用

```sh
Commands:
    init [options] <template-name> [project-name]  从模板新建项目
    build [options]                                编译项目
    list [options]                                 列举官方可用模板
    upgrade [options]                              更新至最新版
```

## 目录结构

```
├── dist                   小程序运行代码目录（该目录由WePY自动编译生成，不要修改该目录下的文件）
├── node_modules           
├── src                    代码编写的目录（该目录为使用WePY后的开发目录）
|   ├── components         WePY组件目录（组件不属于完整页面，仅供完整页面或其他组件引用）
|   |   ├── com_a.wpy      可复用的WePY组件a
|   |   └── com_b.wpy      可复用的WePY组件b
|   ├── pages              WePY页面目录（属于完整页面）
|   |   ├── index.wpy      index页面（经build后，会在dist目录下的pages目录生成index.js、index.json、index.wxml和index.wxss文件）
|   |   └── other.wpy      other页面（经build后，会在dist目录下的pages目录生成other.js、other.json、other.wxml和other.wxss文件）
|   └── app.wpy            小程序配置项（全局数据、样式、声明钩子等；经build后，会在dist目录下生成app.js、app.json和app.wxss文件）
└── package.json           项目的package配置
```

## 添加项目

`1.7.0` 之后的版本 `init` 新生成的代码包会在根目录包含 `project.config.json` 文件，之前生成的代码包可能不存在 `project.config.json` 文件。 检查根目录是否存在该文件。

**要关闭 ES6 转 ES5 选项**。重要：未关闭会运行报错。

**关闭上传代码时样式自动补全**。某些情况下漏掉此项也会运行报错。

**关闭代码压缩上传**选项。开启后，会导致真机 `computed`、`props.sync` 等属性失效。

> 压缩功能可使用 WePY 提供的 `build` 指令代替，详见后文相关介绍以及 Demo 项目根目录中 `wepy.config.js` 和 `package.json` 文件。

## 代码高亮

文件后缀为 `.wpy`，可共用 Vue 的高亮规则，但需要手动设置。

VS Code

安装 `Vetur`，打开 `.wpy` 文件，设置 `.wpy 的配置文件关联...`。

## 代码规范

1. 变量与方法尽量使用驼峰式命名，并且注意避免使用 `$` 开头。
2. 小程序入口、页面、组件文件名的后缀为 `.wpy`；外链的文件可以是其它后缀。
3. 使用 ES6 语法开发。
4. 使用 Promise。[启用 Promise 方法][doc.promise]
5. 事件绑定语法使用优化语法代替。
    - 原 `bindtap="click"` 替换为 `@tap="click"`，原 `catchtap="click"` 替换为`@tap.stop="click"`。
    - 原 `capture-bind:tap="click"` 替换为 `@tap.capture="click"`，原`capture-catch:tap="click"` 替换为 `@tap.capture.stop="click"`。
6. 事件传参使用优化后语法代替。 原 `bindtap="click" data-index={{index}}` 替换为 `@tap="click({{index}})"`。
7. 自定义组件命名应避开微信原生组件名称以及功能标签 `<repeat>`。 不可以使用 `input`、`button`、`view`、`repeat` 等微信小程序原生组件名称命名自定义组件；另外也不要使用 `WePY` 框架定义的辅助标签 `repeat`命名。

## 主要功能特性

### 开发模式转换

基于 WePY 的代码

```js
// index.wpy 中的 <script> 部分

import wepy from 'wepy';

// 通过继承自 wepy.page 的类创建页面逻辑
export default class Index extends wepy.page {
    // 可用于页面模板绑定的数据
    data = {
        motto: 'Hello World',
        userInfo: {}
    };

    // 事件处理函数(集中保存在methods对象中)
    methods = {
        bindViewTap () {
            console.log('button clicked');
        }
    };

    // 页面的生命周期函数
    onLoad() {
        console.log('onLoad');
    };
}
```

### 支持组件化开发

index.wpy

```html
<template>
    <view>
        <panel>
            <h1 slot="title"></h1>
        </panel>
        <counter1 :num="myNum"></counter1>
        <counter2 :num.sync="syncNum"></counter2>
        <list :item="items"></list>
    </view>
</template>

<script>
import wepy from 'wepy';
// 引入 List、Panel 和 Counter 组件
import List from '../components/list';
import Panel from '../components/panel';
import Counter from '../components/counter';

export default class Index extends wepy.page {
    // 页面配置
    config = {
        "navigationBarTitleText": "test"
    };

    // 声明页面中将要使用到的组件
    components = {
        panel: Panel,
        counter1: Counter,
        counter2: Counter,
        list: List
    };

    // 可用于页面模板中绑定的数据
    data = {
        myNum: 50,
        syncNum: 100,
        items: [1, 2, 3, 4]
    }
}
</script>
```

### 支持加载外部 npm 包

在编译过程当中，会递归遍历代码中的 `require` 然后将对应依赖文件从 `node_modules` 当中拷贝出来，并且修改 `require` 为相对路径，从而实现对外部 NPM 包的支持。

### 单文件模式

单文件模式，目录结构更清晰，开发更方便

### 支持 ES6/7 的一些新特性

用户可以通过修改 `wepy.config.js` (老版本使用 `.wepyrc`)配置文件，配置自己熟悉的 `babel` 环境进行开发。默认开启使用了一些新的特性如 `promise`、`async/await`（自WePY 1.4.1开始必须手动开启，原因参见前文代码规范一节中的介绍）等等。

示例代码：

```js
import wepy from 'wepy';

export default class Index extends wepy.page {
    getData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({data: 123});
            }, 3000);
        });
    };

    async onLoad() {
        let data = await this.getData();
        console.log(data.data);
    };
}
```

### 针对原生 API 进行优化

对小程序原生 API 进行 `promise` 处理，同时修复了一些原生 API 的缺陷，比如：`wx.request` 的并发问题等。

基于 WePY 的代码：

```js
import wepy from 'wepy';

async onLoad() {
    await wepy.login();
    this.userInfo = await wepy.getUserInfo();
}
```

## 进阶介绍

### wepy.config.js 配置文件说明

执行 `wepy init standard demo` 后，会生成类似下面这样的配置文件。

```js
let prod = process.env.NODE_ENV === 'production';

module.exports = {
    'target': 'dist',
    'source': 'src',
    'wpyExt': '.wpy',
    'compilers': {
        less: {
            'compress': true
        },
        /*sass: {
            'outputStyle': 'compressed'
        },
        postcss: {
            plugins: [
                cssnext({
                    browsers:['iOS 9', 'Android 4.4']
                })
            ]
        },*/
        babel: {
            'presets': [
                'es2015',
                'stage-1'
            ],
            'plugins': [
                'transform-export-extensions',
                'syntax-export-extensions',
                'transform-runtime'
            ]
        }
    },
    'plugins': {
    }
};

if (prod) {
    // 压缩sass
    module.exports.compilers['sass'] = {'outputStyle': 'compressed'};

    // 压缩less
    module.exports.compilers['less'] = {'compress': true};

    // 压缩js
    module.exports.plugins = {
        'uglifyjs': {
            filter: /\.js$/,
            config: {
            }
        },
        'imagemin': {
            filter: /\.(jpg|png|jpeg)$/,
            config: {
                'jpg': {
                    quality: 80
                },
                'png': {
                    quality: 80
                }
            }
        }
    };
}
```

**compilers**：compilers 为 1.3.1 版本之后的功能，如果需要使用其它语法，请先配置 `compilers`，然后再安装相应的 `compilers`。目前支持 `wepy-compiler-less`，`wepy-compiler-postcss`，`wepy-compiler-sass`、`wepy-compiler-babel`、`wepy-compiler-pug`，其他 `compiler` 持续开发中......

**plugins**： plugins 为 1.1.6 版本之后的功能，目前支持 js 压缩 `wepy-plugin-ugliyjs`、图片压缩`wepy-plugin-imagemin`，其他 plugin 持续开发中......

### 脚本部分介绍

小程序入口 `app.wpy`

```html
<script>
import wepy from 'wepy';
export default class extends wepy.app {
    config = {
        "pages":[
            "pages/index/index"
        ],
        "window":{
            "backgroundTextStyle": "light",
            "navigationBarBackgroundColor": "#fff",
            "navigationBarTitleText": "WeChat",
            "navigationBarTextStyle": "black"
        }
    };
    onLaunch() {
        console.log(this);
    }
}
</script>

<style lang="less">
/** less **/
</style>
```

入口文件 `app.wpy` 中所声明的小程序实例继承自 `wepy.app` 类，包含一个 `config` 属性和其它全局属性、方法、事件。其中 `config` 属性对应原生的 `app.json` 文件，build 编译时会根据 `config` 属性自动生成`app.json` 文件，如果需要修改 config 中的内容，请使用微信提供的相关 API。

页面 `page.wpy`

```html
<script>
import wepy from 'wepy';
import Counter from '../components/counter';

export default class Page extends wepy.page {
    config = {};
    components = {counter1: Counter};

    data = {};
    methods = {};

    events = {};
    onLoad() {};
}
</script>

<template lang="wxml">
    <view>
    </view>
    <counter1></counter1>
</template>

<style lang="less">
/** less **/
</style>
```

页面文件 `page.wpy` 中所声明的页面实例继承自 `wepy.page` 类，该类的主要属性介绍如下：

| 属性        | 说明                                                                                      |
| ---------- | ---------------------------------------------------------------------------------------- |
| config     | 页面配置对象，对应于原生的 `page.json` 文件，类似于 `app.wpy` 中的 `config`                     |
| components | 页面组件列表对象，声明页面所引入的组件列表                                                      |
| data       | 页面渲染数据对象，存放可用于页面模板绑定的渲染数据                                                |
| methods    | wxml 事件处理函数对象，存放响应 wxml 中所捕获到的事件的函数，如 `bindtap`、`bindchange`           |
| events     | WePY 组件事件处理函数对象，存放响应组件之间通过 `$broadcast`、`$emit`、`$invoke` 所传递的事件的函数 |
| 其它        | 小程序页面生命周期函数，如 `onLoad`、`onReady` 等，以及其它自定义的方法与属性                      |

组件 `com.wpy`

```html
<template lang="wxml">
    <view>  </view>
</template>

<script>
import wepy from 'wepy';
export default class Com extends wepy.component {
    components = {};

    data = {};
    methods = {};

    events = {};
    // Other properties
}
</script>

<style lang="less">
/** less **/
</style>
```

组件文件 `com.wpy` 中所声明的组件实例继承自 `wepy.component` 类，除了不需要 `config` 配置以及页面特有的一些生命周期函数之外，其属性与页面属性大致相同。

### 实例

TODO

## API

TODO

## REF

- [WePY Home][home]
- [WePY 官方文档][doc]
    - [wepy-cli 1.7.0+ 文档][doc.cli]
    - [API][doc.api]
- [wepy 项目中使用 Promise - github][doc.promise]

[home]: https://tencent.github.io/wepy/
[doc]: https://tencent.github.io/wepy/document.html
[doc.cli]: https://tencent.github.io/wepy/document.html#/./doc.cli
[doc.api]: https://tencent.github.io/wepy/document.html#/api?id=api
[doc.promise]: https://github.com/Tencent/wepy/wiki/wepy%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8Promise