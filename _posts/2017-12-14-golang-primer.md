---
layout: post
title: Golang 入门
date: 2017/12/14
---

* TOC
{:toc}

> Go is an open source programming language that makes it easy to build simple, reliable, and efficient software

[The Go Programming Language][go-lang] 适合入门阅读。

2007 年 9 月，*Robert Griesemer*、*Rob Pike* 和 *Ken Thompson* 开始构思 Go 语言。2009 年 11 月公布。

Go 从 C 语言继承了表达式语法、控制流结构、基础数据类型、调用参数传值、指针等很多思想。

Go 语言的家族树还有其他祖先，其中一支来自 *Niklaus Wirth* 所设计的 Pascal 语言。

Go 的另一祖先，灵感来自贝尔实验室的 *Tony Hoare* 于 1978 年发表的关于并发研究的基础文献：**顺序通信进程**（Communicating Sequential Process，缩写为 CSP）。 在 CSP 中，程序是一组没有共享状态的并行运行的处理过程，之间使用管道进行通信和控制同步。

## Go 语言项目

编程语言反映了语言设计者对编程哲学的反思。

[Rob Pike][rob] 说过，“软件的复杂性是乘数级相关的”，通过增加一个部分的复杂性来修复问题，通常将慢慢的增加其他部分的复杂性。通过增加功能和选项的配置是修复问题的最快途径，但是这很容易让人忘记简洁的内涵，即使从长远来看，简洁依然是好软件的关键因素。

简洁的设计需要在工作开始的时候舍弃不必要的想法，并且在软件的生命周期内严格区别好的改变或坏的改变。只有通过简洁的设计，才能让一个系统保持稳定、安全和持续的进化。

Go 项目包括编程语言本身，附带了相关的工具和标准库，以及关于简洁编程哲学的宣言。

TODO

## 指针

go 会对方法的依附对象做自动转换，转换为函数定义时需要的类型。

```go
type Int int
func (m Int) Change() {
    fmt.Println("Inside Change, m:", m)
    m = 42
}

func (m *Int) Change2() {
    fmt.Println("Inside Change2, m:", m)
    *m = 42
}

func main() {
    var i Int = 3
    n := &i

    n.Change()
    fmt.Printf("After Change, n:%v, i:%v\n\n", n, i)

    n.Change2()
    fmt.Printf("After Change2, n:%v, i:%v\n", n, i)
}
```

输入结果如下：

```
Inside Change, m: 3
After Change, n:0xc42000e268, i:3

Inside Change2, m: 0xc42000e268
After Change2, n:0xc42000e268, i:42
```

## REF

- [The Go Programming Language][go-lang] by *Alan A. A. Donovan* & *Brian W. Kernighan*, 2015/10/26
- [Methods, Interfaces and Embedded Types in Go][go-pointer], by *William Kennedy*, 2014/05/03

[go-pointer]: https://www.goinggo.net/2014/05/methods-interfaces-and-embedded-types.html
[go-lang]: http://www.gopl.io
[rob]: http://genius.cat-v.org/rob-pike/