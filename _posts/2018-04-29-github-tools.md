---
layout: post
title: GitHub 相关工具
date: 2018-04-29
---

在 GitHub 眼里，所有的文件都是纯文本，返回的响应头均为 `text/plain`。

如果你在 GitHub 上面编写了一个 JavaScript 文件，想要在自己页面中引用，会发现报错：

```
Refused to execute script from 'https://raw.githubusercontent.com/username/repository/master/branch/example.js' because its MIME type ('text/plain') is not executable, and strict MIME type checking is enabled.
```

（未完待续。。。）

## RawGit

**RawGit** serves raw files directly from GitHub with proper **Content-Type** headers.

## REF

- [RawGit][rawgit]

[rawgit]: https://rawgit.com/