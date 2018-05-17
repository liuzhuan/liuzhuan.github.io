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

编译程序：

```sh
$ go run helloworld.go
```

// TODO

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