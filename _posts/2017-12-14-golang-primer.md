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

循环变量 `i` 在 for 循环的第一部分声明。`:=` 用作**简短变量声明**（*short variable declaration*），它通过初始值推导变量类型。

for 循环是 Go 仅有的循环结构。它有多种形式，比如：

```go
for initialization; condition; post {
    // zero or more statements
}
```

for 循环中无需圆括号，但是花括号却是必需，且左花括号须和循环条件位于一行。

for 循环中的初始化语句、判断条件、后置操作都是可选的。如果没有初始化和后置操作，分号也可省略，此时变为传统的 while 循环：

```go
// a traditional "while" loop
for condition {
    // ...
}
```

如果条件判断也省略，即为无限循环：

```go
// a traditional infinite loop
for {
    // ...
}
```

for 循环的另一种形式是遍历一个数值范围，比如字符串或 slice。为了演示这种用法，我们可以改写 echo 程序如下：

```go
// Echo2 prints its command-line arguments
package main

import (
	"fmt"
	"os"
)

func main() {
	s, sep := "", ""
	for _, arg := range os.Args[1:] {
		s += sep + arg
		sep = " "
	}
	fmt.Println(s)
}
```

每次循环迭代中，`range` 产生一对数值：当前索引值和当前元素。在本例中，我们不需要索引，但是 `range` 语法一定要产生索引，而且如果声明了变量但却不使用，Go 编译器会抱怨。

为了解决语法和业务逻辑不可调和的矛盾，可以使用“空虚变量”（*blank identifier*），即 `_`。其实就是用来糊弄 Go 编译器的。

在上面的循环中，每次都会产生新字符串。如果循环数量级很大，将影响执行效率。更简单有效的解决方案是使用 strings package 的 `Join` 函数。

```go
// Echo3 print its command-line arguments
package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	fmt.Println(strings.Join(os.Args[1:], " "))
}
```

如果你不在乎格式，只是想看看输出内容，可以直接使用：

```go
fmt.Println(os.Args[1:])
```

输出结果和 `strings.Join()` 结果大体相同，只不过两侧增加了方括号。

如果要同时输出 `os.Args[0]`，可以使用：

```go
// Echo4 print its command-line arguments
package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	fmt.Println(strings.Join(os.Args[:], " "))
}
```

此时，如果执行 `go run echo4.go hello world`，则可能输出如下内容：

```sh
/var/folders/7q/tpp7ng255nndwwh9pnhl1jyc0000gn/T/go-build153488329/command-line-arguments/_obj/exe/echo4 hello world
```

可以看到 `go run` 会在临时文件夹生成可执行文件并运行。

如果先执行 `go build echo4.go` 生成可执行文件 `echo4`，然后执行 `./echo4 hello world`，则输出：

```sh
./echo4 hello world
```

若要打印命令行参数的索引和数值，每个一行，可以这么写：

```go
// echo5.go
// Print index and value of arguments
// one per line
package main

import (
    "fmt"
    "os"
)

func main() {
    for index, value := range os.Args[1:] {
        fmt.Println(index, "=", value)
    }
}
```

如果要计算 `strings.Join()` 高效率版本和低效率版本的执行效率差异，如何衡量？

可以使用 `time` package。其计算时间的方法如下：

```go
t0 := time.Now()
expensiveCall()
t1 := time.Now()
diff := t1.Sub(t0)
fmt.Printf("The call took %v to run.\n", diff)
```

因此，两个版本的执行效率差异可以如此评价：

```go
// echo6.go
// time benchmark
package main

import (
    "fmt"
    "os"
    "strings"
    "time"
)

func main() {
    s, sep := "", ""

    t0 := time.Now()
    for _, value := range os.Args[1:] {
        s += sep + value
        sep = " "
    }
    fmt.Println(s)
    t1 := time.Now()
    fmt.Printf("loop uses %v to run.\n", t1.Sub(t0))

    t0 = time.Now()
    fmt.Println(strings.Join(os.Args[1:], " "))
    t1 = time.Now()
    fmt.Printf("strings.Join() uses %v to run.\n", t1.Sub(t0))
}
```

运行一下查看执行结果：

```sh
$ go run echo6.go 1 2 3 ... 40
1 2 3 ... 40
loop uses 40µs to run.
1 2 3 ... 40
strings.Join() usss 4µs to run.
```

### 搜索重复行

我们将编写一个名为 `dup` 的程序，用来查找相邻的重复行。

第一个版本会打印出现重复的行及其重复次数。这个应用介绍了 `if` 语句，`map` 数据类型和 `bufio` package。

```go
// Dup1 prints the text of each line that appears more than
// once in the standard input, preceded by its count
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	counts := make(map[string]int)
	input := bufio.NewScanner(os.Stdin)
	for input.Scan() {
		counts[input.Text()]++
	}
	// NOTE: ignoring potential errors from input.Err()
	for line, n := range counts {
		if n > 1 {
			fmt.Printf("%d\t%s\n", n, line)
		}
	}
}
```

`map` 可以存储键值对，它的存储、检索、测试时间都是恒定的。key 可以是任意类型，只要求它们可以使用 `==` 比较。通常 key 为字符类型。内建函数 `make` 创建一个空 map。

每次 dup 读取一行文本，line 数据被当作 map 的 key。

`bufio` package 让输入输出简洁高效。它的重要作用之一是它的 `Scanner` 类型，可以读取输入，并将其拆分为行或单词。它是处理行数据的最简单方法。

scanner 从标准输入读取数据。每次调用 `input.Scan()` 都会读取下一行，并且剔除结尾换行符；结果可以通过 `input.Text()` 读取。只要有数据，`Scan` 函数就会返回 `true`。

`fmt.Printf` 函数用来格式化输出。第一个参数是格式化字符串。以下列出了常用的转化格式符号：

| verbs            | 含义                            |
| ---------------- | ------------------------------ |
| `%d`             | 十进制整数                       |
| `%x`, `%o`, `%b` | 整数，十六进制、八进制、二进制      |
| `%f`, `%g`, `%e` | 浮点数                          |
| `%t`             | 布尔值：`true` 或 `false`        |
| `%c`             | rune（Unicode 码点）            |
| `%s`             | 字符串                          |
| `%q`             | 引号字符串 `"abc"` 或 rune `'c'` |
| `%v`             | 任意类型的自然格式                |
| `%T`             | 任意类型                        |
| `%%`             | 百分号字面量                     |

依惯例，所有以 `f` 结尾的格式化函数，比如 `log.Printf` 和 `fmt.ErrorF`，都会使用 `fmt.Printf` 的格式化规则。以 `ln` 结尾的格式化函数仿效 `fmt.Println` 的规则，末尾插入换行符。

许多程序不仅从标准输入获取数据，还可以读取文件内容。下面版本的 `dup` 除了标准输入外，还可以处理一系列文件名称，使用 `os.Open` 打开文件：

```go
// Dup2 prints the count and text of lines that appear more than once
// in the input. It reads from stdin or from a list of named files
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	counts := make(map[string]int)
	files := os.Args[1:]
	if len(files) == 0 {
		countLines(os.Stdin, counts)
	} else {
		for _, arg := range files {
			f, err := os.Open(arg)
			if err != nil {
				fmt.Fprintf(os.Stderr, "dup2: %v\n", err)
				continue
			}
			countLines(f, counts)
			f.Close()
		}
	}
	for line, n := range counts {
		if n > 1 {
			fmt.Printf("%d\t%s\n", n, line)
		}
	}
}

func countLines(f *os.File, counts map[string]int) {
	input := bufio.NewScanner(f)
	for input.Scan() {
		counts[input.Text()]++
	}
}
```

`os.Open` 函数返回两个值，第一个是打开的文件（`*os.File`），用在后续的 `Scanner` 中。

第二个返回值是内建的 `error` 类型。如果 `err` 等于内建的特殊值 `nil`，说明文件被正确打开。`Close` 函数可以关闭文件，释放资源。

如果 `err` 不等于 `nil`，说明出现问题。error 对象中包含具体报错原因。

map 是对 `make` 创建的数据结构的引用。当 map 传递给一个函数，函数将接收到引用的一个副本，因此被调用函数对于 map 底层数据当任何改变，都可以通过调用函数的 map 引用感知。在本例中，`countLines` 对于 map 的所有改变，都可以在 `main` 中看到。

以上版本的 dup 处于“流”模式。另一种方案是将文件整体读入内存，然后统一处理。下个版本 `dep3`，使用 `ReadFile`（位于 `io/ioutil` package）读取整个文件，`strings.Split` 将字符串拆分为子串。

我们对 `dep3` 做了简化，只读取文件：

```go
// Dup3
package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"strings"
)

func main() {
	counts := make(map[string]int)
	for _, filename := range os.Args[1:] {
		data, err := ioutil.ReadFile(filename)
		if err != nil {
			fmt.Fprintf(os.Stderr, "dup3: %v\n", err)
			continue
		}
		for _, line := range strings.Split(string(data), "\n") {
			counts[line]++
		}
	}

	for line, n := range counts {
		if n > 1 {
			fmt.Printf("%d\t%s\n", n, line)
		}
	}
}
```

// TODO http://www.gopl.io/ch1.pdf 31/59

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