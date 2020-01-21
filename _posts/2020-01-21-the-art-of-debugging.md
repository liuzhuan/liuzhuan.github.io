---
layout: post
title: （译）调试的艺术
date: 2020-01-21
---

![The Art of Debugging Cover][2]

## 调试的三个步骤

作者 *Remy Sharp* 把调试分为三个步骤：

1. 复现：发现 bug
1. 隔离：理解 bug
1. 消除：修复 bug

### 复现

复现 bug 是最难的部分。有一些工具可以辅助复现过程：

1. 开启浏览器的匿名浏览模式。防止流氓扩展插件的干扰。
1. 配置多个浏览器用户。不同的用户设置不同的安全等级。

### 隔离

隔离就是尽可能的减少潜在的 Bug 源。如果扩展是 Bug 的原因，可能每次关闭一个扩展，直到排查出罪魁祸首。

Remy 创建 jsbin.com 的目的，就是为了尽可能隔离 Bug 代码。

### 消除

修复 Bug 相对简单。Remy 一般创建一个失败的测试用例，然后修改代码，让测试用例通过。

## 测试方法

1. 从里到外 Inside out。可以使用 `debugger` 语句。
1. 从外到里 Outside in。
    1. DOM 断点。当子元素变更，属性值变更或节点删除时触发。
    1. Ajax 断点。当执行 XHR 调用时触发。
    1. 回放 XHR。允许重新插入 XHR 的响应。
    1. 时间轴截屏。

## 常用工具

### Workspaces & 实时更新

打开开发者工具，选中 Sources 面板，把本地目录拖拽到 Sources 面板，同意开发者工具的权限请求即可。

To Be Continued...

## REF

1. [The Art of Debugging][1], by *Remy Sharp*, 2015/10/14

[1]: https://remysharp.com/2015/10/14/the-art-of-debugging "The Art of Debugging"
[2]: https://remysharp.com/images/art-of-debugging-cover.jpg