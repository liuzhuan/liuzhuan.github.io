---
layout: post
title: 使用 Taro
date: 2018-07-15
---

Taro 是一套 React 语法规范的多端开发解决方案，由京东「[凹凸实验室][aotu]」出品。

可以使用 npm 或 yarn 安装：

```sh
$ npm install -g @tarojs/cli
# or
$ yarn global add @tarojs/cli
```

然后就可以使用命令创建模板项目：

```sh
$ taro init myApp
```

npm 5.2+ 也可以在不全局安装的情况下使用 npx 创建模板项目：

```sh
$ npx @tarojs/cli init myApp
```

> npx 是 npm 5.2.0 内置的包执行器。详情请参考「[npx: npm 5.2.0 内置的包执行器 - 王下邀月熊](https://zhuanlan.zhihu.com/p/27832595)」

进入项目目录开发，可以选择小程序预览模式，或 H5 预览模式：

```sh
# 小程序预览模式
$ npm run dev:weapp
$ taro build --type weapp --watch

# H5 编译预览模式
$ npm run dev:h5
$ taro build --type h5 --watch
```

⚠️ 注意：如果使用微信小程序预览模式，需要在开发者工具做如下设置：

1. 关闭 ES6 转 ES5 功能
2. 关闭上传代码时样式自动补全
3. 关闭代码压缩上传

Taro 提供了更新命令来更新 CLI 工具自身和项目中 Taro 相关的依赖。

```sh
# update taro cli
$ taro update self

# update project dependecies related with taro
$ taro update project
```

## 项目目录

入口文件默认是 `src` 目录下的 `app.js`。

一个普通的入口文件实例如下：

```jsx
import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

class App extends Component {
    // 项目管理，这算是什么变量？
    config = {
        pages: [
            'pages/index/index'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        }
    }

    // app.onLaunch()
    componentWillMount () {}

    // app.onLaunch(), after componentWillMount()
    componentDidMount () {}

    // app.onShow()
    componentDidShow () {}

    // app.onHide()
    componentDidHide () {}

    render () {
        return (
            <Index />
        )
    }
}
```

一个普通的页面文件示例如下：

```jsx
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
    config = {
        navigationBarTitleText: '首页'
    }

    // page.onLoad()
    componentWillMount () { }

    // page.onReady()
    componentDidMount () { }

    shouldComponentUpdate () {}

    componentWillUpdate () {}

    componentDidUpdate () {}

    // page.onUnload()
    componentWillUnmout () { }

    // page.onShow()
    componentDidShow () { }

    // page.onHide()
    componentDidHide () { }

    render () {
        return (
            <View className='index'>
                <Text>1</Text>
            </View>
        )
    }
}
```

样式文件建议放在页面 JS 同级目录，通过 `import` 引入，支持使用 CSS 预编译处理器，目前提供了 sass 预编译插件 `@tarojs/plugin-sass`，需要自行在本地进行安装。

Taro 支持组件化开发。组件的代码结构与 page 类似，只是没有 `config` 变量，并且增加了 `componentWillReceiveProps` 生命周期函数，当父组件更新时，将带动子组件更新时调用。

## 路由功能

Taro 自带 API 用于路由跳转：

```js
Taro.navigateTo({
    url: '/pages/page/path/name'
})

Taro.redirectTo({
    url: '/pages/page/path/name'
})
```

路由传参：

```js
Taro.navigateTo({
    url: '/pages/page/path/name?id=2&type=test'
})

// 在目标页的生命周期通过 `this.$router.params` 获取参数
class C extends Taro.Component {
    componentWillMount () {
        console.log(this.$router.params)
        // => { id: 2, type: 'test' }
    }
}
```

## 设计稿和尺寸单位

Taro 建议尺寸使用 `px`, `百分比%`。如果你希望部分 px 单位不被转换成 rpx 或者 rem ，最简单的做法就是在px单位中增加一个大写字母，例如 Px 或者 PX 这样，则会被转换插件忽略。

详情参考[文档](https://nervjs.github.io/taro/size.html)。

## 静态资源引用

## REF

- [Taro 首页][home]
- [Taro 起步式][doc]
- [Taro 介绍][intro], by [yuche][yuche], 2018/06/07
- [Taro 诞生记][birth], by [luckyadam][luckyadam], 2018/06/25

[home]: https://taro.aotu.io/
[doc]: https://nervjs.github.io/taro/
[aotu]: https://aotu.io/
[birth]: https://aotu.io/notes/2018/06/25/the-birth-of-taro/
[intro]: https://aotu.io/notes/2018/06/07/Taro/
[yuche]: https://github.com/yuche
[luckyadam]: https://github.com/luckyadam