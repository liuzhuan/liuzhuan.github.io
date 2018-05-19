---
layout: post
title: Golang 入门
date: 2017/12/14
---

* TOC
{:toc}

> Go is an open source programming language that makes it easy to build simple, reliable, and efficient software

[The Go Programming Language][go-lang] 适合入门阅读。本文是该书的一个读书笔记。

2007 年 9 月，*Robert Griesemer*、*Rob Pike* 和 *Ken Thompson* 开始构思 Go 语言。2009 年 11 月公布。

Go 从 C 语言继承了表达式语法、控制流结构、基础数据类型、调用参数传值、指针等很多思想。

Go 语言的家族树还有其他祖先，其中一支来自 *Niklaus Wirth* 所设计的 Pascal 语言。

Go 的另一祖先，灵感来自贝尔实验室的 *Tony Hoare* 于 1978 年发表的关于并发研究的基础文献：**顺序通信进程**（Communicating Sequential Process，缩写为 CSP）。 在 CSP 中，程序是一组没有共享状态的并行运行的处理过程，之间使用管道进行通信和控制同步。

## Go 语言项目

编程语言反映了语言设计者对编程哲学的反思。Go 的编程哲学是简洁很重要。

## 入门

### Hello World

```go
// helloworld.go
package main

import "fmt"

func main() {
    fmt.Println("Hello, 世界")
}
```

Go 是编译语言。Go 工具链将源码及其依赖编译为原生机器码。这些工具可以通过 `go` 及其子命令获得。最简单的子命令是 `run`。

```sh
$ go run helloworld.go
```

如果想把编译结果保留，可以使用 `go build`：

```sh
$ go build helloworld.go
```

这会产生一个 `hellworld` 可执行二进制文件。使用 `go1.8 darwin/amd64` 编译后的文件大约 1.6 MB。

如果想下载依赖项，可以使用 `go get` 命令。比如，下载 *The Go Programming Language* 的实例代码：

```sh
$ go get gopl.io/ch1/helloworld
```

Go 代码本身由 package 构成。一个 pacakge 由单个目录下的多个 `.go` 源文件构成。每个源码以 `package` 声明开头，声明了当前文件所属的包，然后是它引入的多个依赖项，然后是文件的源码。

Go 源码拥有超过 100 个 pacakge，用来执行常见任务，比如输入输出，排序和处理文本。比如，`fmt` package 可以格式化输出输入。`Println` 是 `fmt` 的一个基本输出函数。

package `main` 比较特殊，它定义独立可执行程序，而非库。package main 中的 `main` 函数也有特殊地址，它是程序的入口。

我们必须告知编译器，当前源码需要哪些 package。这是 `import` 声明的职责。

你必须精确指明引入的 package。过多或过少都不可编译。这种严格要求可以防止在程序发展过程中引入不必要的包。

`import` 声明必须在 `package` 声明之后。接着是函数、变量、常量和类型的声明（关键字分别是 `func`、`var`、`const`、`type`）

Go 代码风格相当强硬。`gofmt` 工具将代码改写为标准风格。`go fmt` 会使用 `gofmt` 对包内所有源文件处理。强制颁发官方风格，不仅消除了愚蠢琐碎的代码风格争辩（例如，分号党 VS. 无分号党），而且可以很容易编写自动化源码转译工具。

可以配置文本编辑器，当保存文件时，自动执行 `gofmt`，这样代码始终符合规范。另有一个社区工具 `goimports`，可以管理 import 声明的增删。可以通过以下工具获取：

```sh
$ go get golang.org/x/tools/cmd/goimports
```

### 命令行参数

大部分程序处理输入，产生输出。这就是计算的本质。输入可有多种，可以是用户输入、文件、网络链接、其他程序的输出等。下面介绍几种常见输入。

`os` package 提供了一些函数，用来处理操作系统相关的操作。命令行相关函数位于 `os.Args`。

`os.Args` 变量是一个字符串切片（`slice`）。Slices 是 Go 的一个基础概念。可以把 slice 想象为一个具有动态长度的序列 s，可以通过 `s[i]` 访问当个序列元素，也可以通过 `s[m:n]` 访问序列的一段连续的范围。元素个数可以通过 `len(s)` 获得。

`os.Args` 的第一个参数 `os.Args[0]` 是命令本身。其他元素是命令行参数，可以通过 `os.Args[1:len(os.Args)]` 获取。如果省略 `n`，就会默认取值 `len(s)`，因此可以简化为 `os.Args[1:]`

下面是 Unix `echo` 命令的简单实现，可以输出命令行参数。该程序引用两个 package，使用了一个括号列表。引用顺序不重要，因为 `gofmt` 会按照字母顺序重新排列。

```go
// Echo1 prints its command-line arguments
package main

import (
	"fmt"
	"os"
)

func main() {
	var s, sep string
	for i := 1; i < len(os.Args); i++ {
		s += sep + os.Args[i]
		sep = " "
	}
	fmt.Println(s)
}
```

注释以 `//` 开头，直至行尾。

`var` 语句声明了两个变量 `s` 和 `sep`，类型是 `string`。变量可以在声明时初始化。如果没有显示初始化，则被默认初始化为当前类型的**零值**，对于数字类型是 0，对于字符串类型是 `""`。

// TODO http://www.gopl.io/ch1.pdf 22/59

## 程序结构

// TODO

## 基础数据类型

// TODO

## 复合数据类型

// TODO

## 函数

// TODO

## 方法

// TODO

## 接口

// TODO

## Goroutines 和 Channels

// TODO

## 共享变量并发

// TODO

## 包和工具

// TODO

## 测试

// TODO

## 反射

// TODO

## 底层编程

// TODO

## REF

- [The Go Programming Language][go-lang] by *Alan A. A. Donovan* & *Brian W. Kernighan*, 2015/10/26

[go-lang]: http://www.gopl.io
[rob]: http://genius.cat-v.org/rob-pike/