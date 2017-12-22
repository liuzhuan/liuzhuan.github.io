---
layout: post
title: Makefile 入门
date: 2017-12-21
---

编译源代码枯燥乏味，却难以避免。

`Makefiles` 配合 `make` 实用程序，可自动化构建管理软件项目。

## `make` 

在一个大型项目中，`make` 工具可自动推断出哪些源文件需重新编译，并调用对应的编译命令。

```sh
# 默认读取当前目录的 makefile
make
# 指定某一 makefile
make -f MyMakefile
```

## Makefile

`Makefile` 指导 make 如何编译。

```
target: dependencies
[tab] system command
```

## REF

- [Makefiles - Mrbook's Stuff][mrbook]
- [GNU make][gnu]
- [Make 命令教程][ryf1], 阮一峰, 2015/02/20
- [使用 Make 构建网站][ryf2], 阮一峰, 2015/03/13

[mrbook]: http://mrbook.org/blog/tutorials/make/
[gnu]: http://www.gnu.org/software/make/manual/make.html
[ryf1]: http://www.ruanyifeng.com/blog/2015/02/make.html
[ryf2]: http://www.ruanyifeng.com/blog/2015/03/build-website-with-make.html