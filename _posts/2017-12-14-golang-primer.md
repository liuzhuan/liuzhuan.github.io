---
layout: post
title: 《Go 编程语言》读书笔记
date: 2017/12/14
---

* TOC
{:toc}

> Go is an open source programming language that makes it easy to build simple, reliable, and efficient software

经典书籍 [The Go Programming Language][go-lang] 适合入门阅读。本文是该书的一个读书笔记。同时，也对习题作出自己的答案。

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

`ReadFile` 返回一个字节 slice，必需转换为 `string` 才可被 `strings.Split` 拆分。

`bufio.Scanner`、`ioutil.ReadFile`、`ioutil.WriteFile` 在底层都使用 `*os.File` 的 `Read` 和 `Write` 方法。通常使用高层函数就好。

### GIF 动画

下面介绍 Go 的图形库。我们会创建一系列图像，并将其整合为一个 gif 动画文件。

我们要做的图像名为利萨佐斯图形（*Lissajous figures*），它们由两个维度的简谐振动叠加而成。

```go
package main

import (
	"image"
	"image/color"
	"image/gif"
	"io"
	"math"
	"math/rand"
	"os"
)

var palette = []color.Color{color.White, color.Black}

const (
	whiteIndex = 0 // first color in palette
	blackIndex = 1 // next color in palette
)

func main() {
	lissajous(os.Stdout)
}

func lissajous(out io.Writer) {
	const (
		cycles  = 5     // number of complete x oscillator revolutions
		res     = 0.001 // angular resolution
		size    = 100   // image canvas covers [-size..+size]
		nframes = 128   // number of animation frames
		delay   = 8     // delay between frames in 10ms units
	)

	freq := rand.Float64() * 3.0 // relative frequency of y oscillator
	anim := gif.GIF{LoopCount: nframes}
	phase := 0.0
	for i := 0; i < nframes; i++ {
		rect := image.Rect(0, 0, 2*size+1, 2*size+1)
		img := image.NewPaletted(rect, palette)
		for t := 0.0; t < cycles*2*math.Pi; t += res {
			x := math.Sin(t)
			y := math.Sin(t*freq + phase)
			img.SetColorIndex(size+int(x*size+0.5), size+int(y*size+0.5), blackIndex)
		}
		phase += 0.1
		anim.Delay = append(anim.Delay, delay)
		anim.Image = append(anim.Image, img)
	}
	gif.EncodeAll(out, &anim)
}
```

如果 package 名有多个组件，比如 `image/color`，在程序中使用时需要引用最后一个组件，比如 `color.Color`。

`const` 用来声明常量。常量只可以是 number、string 或 boolean。

表达式 `[]color.Color{...}` 和 `gif.GIF{...}` 是**复合字面量**（*composite literals*），这是一种使用变量初始化复合类型的简洁表示法。此处第一个是 slice，第二个是 struct。

`gif.GIF` 是一个 struct 类型。`anim` 是一个 `gif.GIF` 类型的 struct 变量。

### 获取 URL

Go 提供的网络相关包，都位于 `net` 名下。

下面的 `fetch` 程序，用于获取网络资源。

```go
// Fetch prints the content found at URL
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

func main() {
	for _, url := range os.Args[1:] {
		resp, err := http.Get(url)
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
			os.Exit(1)
		}
		b, err := ioutil.ReadAll(resp.Body)
		resp.Body.Close()
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: reading %s: %v\n", url, err)
			os.Exit(1)
		}
		fmt.Printf("%s", b)
	}
}
```

程序引入两个包，`net/http` 和 `io/ioutil`。`http.Get` 用来发起 HTTP 请求，如果没有错误，返回响应内容 `resp`。`resp` 的 `Body` 字段包含服务器响应消息，是可读流的形式。`ioutil.ReadAll` 读取所有的响应，结果储存到 `b`。Body 流需要关闭，以避免内存泄漏。

**习题 1.7** 使用 `io.Copy(dst, src)` 替代 `ioutil.ReadAll()`。

```go
// Fetch2 prints the content found at URL
// use io.Copy(dst, src) instead of ioutil.ReadAll
package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	for _, url := range os.Args[1:] {
		resp, err := http.Get(url)
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
			os.Exit(1)
		}
		_, err = io.Copy(os.Stdout, resp.Body)
		resp.Body.Close()
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: reading %s: %v\n", url, err)
			os.Exit(1)
		}
	}
}
```

**习题 1.8** 如果 URL 无协议头 `http://`，就增加 `http://`。可能会使用 `strings.HasPrefix` 方法。

```go
// Fetch prints the content found at URL
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
)

func main() {
	for _, url := range os.Args[1:] {
		if needPrefix(url) {
			url = "http://" + url
		}
		resp, err := http.Get(url)
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
			os.Exit(1)
		}
		b, err := ioutil.ReadAll(resp.Body)
		resp.Body.Close()
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: reading %s: %v\n", url, err)
			os.Exit(1)
		}
		fmt.Printf("%s", b)
	}
}

func needPrefix(url string) bool {
	if strings.HasPrefix(url, "http://") == true {
		return false
	}
	if strings.HasPrefix(url, "https://") == true {
		return false
	}
	return true
}
```

**习题 1.9** 打印 HTTP 状态码，`resp.Status` 提供。

```diff
// ...
+ fmt.Println(resp.StatusCode)
fmt.Printf("%s", b)
```

### 并发获取 URL

并发编程是 Go 编程的一个有趣而又创新的特性。这是一个很大的话题，这里只是对 Go 的主要并发机制、goroutines 和 channels 稍作介绍。

下一个程序 `fetchall`，作用和 `fetch` 一样，也是读取网络数据，但是会并发同时请求。`fetchall` 会打印每个请求的时间和响应大小。

```go
// Fetchall fetches URLs in parallel and reports their times and sizes
package main

import (
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"time"
)

func main() {
	start := time.Now()
	ch := make(chan string)
	for _, url := range os.Args[1:] {
		go fetch(url, ch) // start a goroutine
	}
	for range os.Args[1:] {
		fmt.Println(<-ch) // receive from channel ch
	}
	fmt.Printf("%.2fs elapsed\n", time.Since(start).Seconds())
}

func fetch(url string, ch chan<- string) {
	start := time.Now()
	resp, err := http.Get(url)
	if err != nil {
		ch <- fmt.Sprint(err) // Send to channel ch
		return
	}
	nbytes, err := io.Copy(ioutil.Discard, resp.Body)
	resp.Body.Close() // don't leak resources
	if err != nil {
		ch <- fmt.Sprintf("while reading %s: %v", url, err)
		return
	}
	secs := time.Since(start).Seconds()
	ch <- fmt.Sprintf("%.2f %7d %s", secs, nbytes, url)
}
```

`goroutine` 表示一个并发程序，而 `channel` 是 goroutine 间的通信机制。main 函数在 goroutine 中执行，`go` 语句可以创建新的 goroutine。

main 函数使用 `make` 创建 channel。

当一个 goroutine 尝试从 channel 发送或接收数据时，它会一直堵塞，直到有其他 goroutine 向该 channel 接受或发送数据，此时数据转移，所有 goroutine 继续。在本例中，每个 `fetch` 向 channel 发送数据（`ch <- expression`），main 函数全部接收它们（`<-ch`）。

**习题 1.10** 修改 `fetchall`，将输出内容保存到文件中，以备后期检查。

暂时不知如何解答。

**习题 1.11** 尝试增大命令行参数长度，比如读取 alexa.com 排名前 100 万的网站，如果有些网站没有响应，如何处理？

暂时不知如何解答。

### 网络服务器

使用 Go 的库编写服务器很轻松。我们将编写一个简单服务器，可以返回 URL 的路径部分。比如，请求 `http://localhost:8000/hello`，将返回 `/hello`。

```go
// Server1 is a minimal "echo" server
package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", handler) // each request calls handler
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "URL.Path = %q\n", r.URL.Path)
}
```

main 函数将监听函数绑定到一个路径 `/`，即监听所有路径。请求用 `http.Request` struct 表示，它包含很多字段，其中就有 `URL`。

然后就可以在后台运行服务器，如果是 Linux 或 macOS，只要在命令后增加 `&` 即可。

```sh
$ go run path/to/server1.go &
```

给服务器增加功能也很简单。比如增加一个 `/count` 路由，用于统计请求次数（剔除 `/count` 请求次数）。

```go
// Server2 is a minimal "echo" and counter server
package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"
)

var mu sync.Mutex
var count int

func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/count", counter)
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

// handler echoes the Path component of the requested URL.
func handler(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	count++
	mu.Unlock()
	fmt.Fprintf(w, "URL.Path = %q\n", r.URL.Path)
}

// counter echoes the number of calls so far
func counter(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	fmt.Fprintf(w, "Count %d\n", count)
	mu.Unlock()
}
```

server 有两个 handler，请求的 URL 决定了执行哪个。请求 `/count` 会执行计数，其余的请求都会执行 `handler` 函数。如果 handler 模式以 `/` 结尾，它可以匹配所有以该模式开头的 URL。

服务器对于每个请求，都会开启独立的 goroutine，因此它可以同时满足并发请求。但是，如果两个并发请求同时尝试修改 `count`，可能会出现不一致的错误；程序会出现一种严重 bug：竞争状态（*race condition*）。为了解决这个问题，我们必需确保同一时间最多只有一个 goroutine 访问变量，这就是 `mu.Lock()` 和 `mu.Unlock()` 的作用。

下面是一个更丰富的 handler 函数，可以打印请求头和表单数据。

```go
// Server3 is a minimal "echo" and counter server
package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

// handler echoes the HTTP request
func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "%s %s %s\n", r.Method, r.URL, r.Proto)
	for k, v := range r.Header {
		fmt.Fprintf(w, "Header[%q] = %q\n", k, v)
	}
	fmt.Fprintf(w, "Host = %q\n", r.Host)
	fmt.Fprintf(w, "RemoteAddr = %q\n", r.RemoteAddr)
	if err := r.ParseForm(); err != nil {
		log.Print(err)
	}
	for k, v := range r.Form {
		fmt.Fprintf(w, "Form[%q] = %q\n", k, v)
	}
}
```

上面利用 `http.Request` 的 struct 字段打印信息。

注意，`ParseForm` 嵌套在一个 `if` 语句中。

**习题 1.12** 修改 Lissajous 服务器，从 URL 中读取参数。比如，从 `http://localhost:8000/?cycles=20` 设置 cycles 为 20。使用 `strconv.Atoi` 将字符串转换为整数。

待解决。

### 零星问题

Go 还有很多内容我们尚未提及，下面做个粗略介绍。

**流程控制：** `switch` 语句是一个多路选择控制语句，以下是简单例子：

```go
// Switch use switch to make multi-way branch
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	heads, tails := 0, 0
	for i := 0; i < 10; i++ {
		switch coinflip() {
		case "heads":
			heads++
		case "tails":
			tails++
		default:
			fmt.Println("landed on edge!")
		}
	}
	fmt.Printf("heads: %d, tails: %d\n", heads, tails)
}

func coinflip() string {
	// 每次随机数都是相同
	r := rand.Float32()
	if r > 0.5 {
		return "tails"
	}

	if r == 0.5 {
		return "edge"
	}
	return "heads"
}
```

不同的分支之间，默认不会自动进入。

`switch` 并非必需操作数。它可以仅仅列举各种 cases，每个 case 都是一个布尔值。

```go
func Signum(x int) int {
	switch {
	case x > 0:
		return +1
	default:
		return 0
	case x < 0:
		return -1
	}
}
```

这种格式称为 *tagless switch*；它相当于 `switch true`。

就像 `for` 和 `if` 语句一样，`switch` 可能包含一个可选的简单语句 --- 一个简短变量声明，一个自增或赋值语句，或者一个函数调用 --- 可以在测试前设置变量。

`break` 和 `continue` 语句可以改变流程走向。

**命名类型**

type 声明可以为现有类型创建新名。由于 struct 类型通常较长，它们几乎总是要重命名。比如，2D 图形坐标系统的 Point 类型：

```go
type Point struct {
	X, Y int
}
var p Point
```

**指针**

Go 提供指针，即包含变量地址的数值。在 C 中，指针的使用几乎不受任何限制，在某些语言中，指针被称为“引用”类型，除了传值别无它用。Go 对于指针的态度位于两个极端中间地带。指针可见，`&` 可获取变量地址，`*` 可获取指针指向的变量，但却不支持指针运算。

**方法和接口**

方法是与命名类型绑定的函数。在放荡不羁的 Go 中，方法几乎可以和任意命名类型捆绑。

接口是一种抽象类型，可以将不同的实际类型，根据它们共有的方法，抽象为一种通用类型。至于它们内部是如何定义或实现的，这都不打紧。

**包**

Go 自带许多实用工具包，Go 社区也在不断贡献新的包。

开始编写代码钱，最好先看看，是不是地球的某个地方的好心人，已经帮你实现了你期望的功能。官方的库可以从 [Packages](https://golang.org/pkg/) 页面查找，社区贡献的包可以从 [GoDoc](https://godoc.org/) 获得。`go doc` 命令可以轻易从命令行获取每个函数方法的含义。

```sh
$ go doc http.ListenAndServe
package http // import "net/http"

func ListenAndServe(addr string, handler Handler) error
    ListenAndServe listens on the TCP network address addr and then calls Serve
    with handler to handle requests on incoming connections. Accepted
    connections are configured to enable TCP keep-alives. Handler is typically
    nil, in which case the DefaultServeMux is used.
	...
```

## 程序结构

### 名字

Go 有 25 个关键词，它们属于语法的一部分，不可以当作变量名。

除此之外，还有一些预先声明的变量，用作内置常量、类型和函数。如下：

```
Constants:	true	false	iota	nil

Types:		int		int8	int16	int32	int64
			uint	uint8	uint16	uint32	uint64	uintptr
			float32	float64	complex128	complex64
			bool	byte	rune	string	error

Functions:	make	len	cap	new	append	copy	close	delete
			complex	real	img
			panic	recover
```

这些名字不是保留字，可以将其重新赋值。但是一定要明白重新赋值带来的蝴蝶效应。

如果实体在函数内部声明，它就属于函数的局部变量。如果在函数体外声明，它将对包内所有文件可见。名称首字母大小写，决定了它是否可以被包外代码看见。如果名称首字母大写，意味着它将被导出，可以被包外代码访问。比如，`fmt.Printf` 。

Go 语言更青睐“驼峰”写法。

### 声明

有四种主要的声明类型：`var`, `const`, `type`, `func`。

### 变量

声明的通用语法如下：

```go
var name type = expression
```

`type` 和 `= expression` 两者不可全部缺席，至少保留一份。

如果 `expression` 省略，变量将被赋予 `type` 类型的“零值”。

零值机制可以确保任何时间变量的值都是合法的。在 Go 中，不存在未初始化变量。

包级变量在 main 之前初始化。局部变量在函数执行过程中初始化。

多个变量还可以被返回多值的函数初始化。比如：

```go
var f, err = os.Open(name)	// os.Open 返回一个文件和错误对象
```

#### 简洁变量声明

简洁变量声明（short variable declaration）常用于局部变量声明。比如：

```go
anim := gif.GIF{LoopCount: nframes}
freq := rand.Float64() * 3.0
```

`var` 声明常用于需要明确类型的变量声明，或者初始值不重要的变量。比如：

```go
var boiling float64 = 100
var names []string
var err error
```

可以使用一条简洁声明初始化多个变量：

```go
i, j := 0, 1
```

注意区分简洁声明（`:=`）和元组赋值（*tuple assignment* `=`）的区别。

⚠️ 注意，如果简洁声明左边的某些元素，在同级作用域中已经声明过，那么对于这些变量，简洁声明将失效，退化为赋值操作。

比如，在下面代码中，首先声明了两个变量 `in` 和 `err`，第二行声明了 `out`，但是并未重新声明 `err`，只是为现存的 `err` 重新赋值而已。

```go
in, err := os.Open(infile)
// ...
out, err := os.Create(outfile)
```

每条简洁声明需要至少声明一个新变量，否则会报错：

```go
f, err := os.Open(infile)
// ...
f, err := os.Create(outfile) // compile error: no new variables
```

解决方法是把第二个简洁声明替换为普通的赋值。

#### 指针

指针是变量的地址。使用指针可以间接修改变量。

```go
package main

import "fmt"

func main() {
    x := 1
    p := &x
    fmt.Println(*p)
    *p = 2
    fmt.Println(*p)

}
```

所有类型的零值都是 nil。如果指针 p 指向某一变量，则 `p != nil` 是真。

// TODO p32 2.3.2 Pointers

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