---
layout: post
title: QuickJS 使用指南
date: 2019/11/26
---

* TOC
{:toc}

## 简介

QuickJS 是 [Fabrice Bellard][4] 和 Charlie Gordon 编写的 JS 引擎。2019 年 7 月 9 日首次公开发布。

> QuickJS is a small and embeddable Javascript engine. It supports the ES2019 specification including modules, asynchronous generators and proxies.

QuickJS 是一个小型嵌入式的 JavaScript 引擎。它支持 ES2019 规范，比如模块、异步生成器和代理等特性。

> It optionally supports mathematical extensions such as big integers (BigInt), big floating point numbers (BigFloat) and operator overloading.

它还支持数学扩展，比如大整数（BigInt），大浮点数（BigFloat）和运算符重载。

主要特性：

1. 体积小，可嵌入：只有几个 C 文件，没有外部依赖。
2. 启动快，执行快。
3. 几乎支持完整的 ES2019 特性。
4. 几乎 100% 通过 ES2019 测试套件。
5. 可以把 JavaScript 源码编译为可执行文件，无需外部依赖。
6. 使用基于引用计数和循环删除的垃圾回收
7. 数学扩展：BigInt, BigFloat, 运算符重载，bigint 模式，math 模式。
8. 命令行解释器语法高亮和自动补全，基于 JavaScript 实现。
9. 小型内建标准库

## 使用

### 安装

在 Linux 或 MacOS/X ，可以使用提供的 Makefile 自动编译。

下载最新的源码，比如 [quickjs-2019-10-27.tar.xz][3]，然后执行如下命令：

```sh
$ tar -xf quickjs-2019-10-27.tar.xz
$ cd quickjs-2019-10-27.tar.xz
$ make

# 安装二进制，把支持文件移动到 /usr/local
# 这个命令是可选项
$ make install
```

### 快速开始

`qjs` 是命令行解释器（Read-Eval-Print Loop）。可以读取 JavaScript 文件，执行其中的代码：

```sh
$ ./qjs examples/hello.js
```

`qjsc` 是命令行编译器，可以把 JS 源码编译为可执行文件：

```sh
$ ./qjsc -o hello examples/hello.js
$ ./hello
```

`qjsbn` 和 `qjscbn` 是包含数学扩展的相应的解释器和编译器。

> bn 也许是 bignum 的简写

```sh
$ ./qjsbn examples/pi.js 1000
```

### 命令行参数

`qjs` 解释器

```sh
usage: qjs [options] [file]
-h  --help         list options
-e  --eval EXPR    evaluate EXPR
-i  --interactive  go to interactive mode
-m  --module       load as ES6 module (default=autodetect)
    --script       load as ES6 script (default=autodetect)
    --std          make 'std' and 'os' available to the loaded script
-T  --trace        trace memory allocation
-d  --dump         dump the memory usage stats
-q  --quit         just instantiate the interpreter and quit
```

`qjsc` 编译器

```sh
usage: qjsc [options] [files]

options are:
-c          only output bytecode in a C file
-e          output main() and bytecode in a C file (default = executable output)
-o output   set the output filename
-N cname    set the C name of the generated data
-m          compile as Javascript module (default=autodetect)
-M module_name[,cname] add initialization code for an external C module
-x          byte swapped output
-p prefix   set the prefix of the generated C names
-flto       use link time optimization
-fno-[date|eval|string-normalize|regexp|json|proxy|map|typedarray|promise|module-loader]
            disable selected language features (smaller code size)
```

### 标准库

命令行解释器默认包含标准库，即两个模块 `os` 和 `std`，和一些全局对象。

全局对象

1. `scriptArgs` 命令行参数
1. `print(...args)` 打印参数
1. `console.log(...args)` 同 print 一样

`std` 模块和 `os` 模块的具体内容可以参考[文档][6]。

## REF

1. [QuickJS JavaScript Engine][1]
1. [ECMAScript 2019 Language Specification][2]
1. [QuickJS Development Mailing List][5]

[1]: https://bellard.org/quickjs/quickjs.html "QuickJS JavaScript Engine"
[2]: https://www.ecma-international.org/ecma-262/10.0/ "ECMAScript 2019 Language Specification"
[3]: https://bellard.org/quickjs/quickjs-2019-10-27.tar.xz "quickjs-2019-10-27.tar.xz"
[4]: https://bellard.org/ "Fabrice Bellard's Home Page"
[5]: https://www.freelists.org/list/quickjs-devel "QuickJS Development Mailing List"
[6]: https://bellard.org/quickjs/quickjs.html#std-module "std module"