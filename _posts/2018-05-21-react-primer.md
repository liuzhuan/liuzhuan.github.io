---
layout: post
title: React 入门
date: 2018-05-21
---

* TOC
{:toc}

> React, A JavaScript library for building user interfaces.

## 样例

### 简单组件

React 组件均实现 `render()` 方法，可以将输入数据转化为输出界面。例子使用了一种类 XML 语法 `JSX`。从外界传入的数据，可以在 `render()` 中通过 `this.props` 访问。

**JSX 是可选项，并非 React 开发必需**。可以在 Babel REPL 查看 JSX 编译后的原生 JavaScript 代码。

```jsx
class HelloMessage extends React.Component {
    render() {
        return (
            <div>
                Hello {this.props.name}
            </div>
        )
    }
}

ReactDOM.render(
    <HelloMessage name="Taylor" />,
    mountNode
)
```

### 状态组件

除了外界的数据（通过 `this.props` 传入），组件可以维持内部状态（通过 `this.state` 可以访问）。当组件的状态数据变化时，会调用 `render()` 重新渲染 markup。  

```jsx
class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { seconds: 0 }
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }))
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <div>
                Seconds: {this.state.seconds}
            </div>
        )
    }
}

ReactDOM.render(<Timer />, mountNode)
```

### 完整应用

TODO

## REF

- [React Home][home]
- [SurviveJS - React][survivejs], by *Juno Vepsäläinen*

[home]: https://reactjs.org/
[survivejs]: https://survivejs.com/react/
