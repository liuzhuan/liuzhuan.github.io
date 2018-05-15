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