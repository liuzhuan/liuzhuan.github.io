---
layout: post
title: JavaScript 的正则表达式
date: 2018-01-03
---

* TOC
{:toc}

正则表达式(Regular Expression)，在实际的软件开发项目中经常会被使用到。它使用单个字符串来描述、匹配并获取一系列符合某个句法规则的结果。

## 起源

1956 年，数学家 *Stephen Kleene* 在 *Warren McCulloch* 和 *Walter Pitts* 早期神经系统工作的基础上，设计出了一个数学符号体系 —— *regular sets*(规则的集合)，这个东西很快被计算机科学家用于编译器的扫描或词法分析。由于正则表达式强大的文本处理能力，很快被应用到 Unix 的工具软件 grep 中；此后，正则表达式被广泛应用于 Unix 系操作系统、Perl、PHP，JavaScript 等语言和开发环境中。

## 基本语法

JavaScript 的 `RegExp` 类表示正则表达式。`String` 和 `RegExp` 皆有许多函数，用于模式匹配和查找替换。

我们通常使用正则表达式的字面量语法，比如 `/s$/`。注意，和字符串字面量不同，每个正则字面量都是重新生成的，即**拥有相同值的正则表达式字面量并非严格相等**。

```js
/a/ === /a/
// ==> false

'a' === 'a'
// ==> true
```

### 字面量字符

字面量字符（Literal Characters）

| 字符      | 匹配的值                                                       |
| -------- | ------------------------------------------------------------- |
| `\0`     | `NUL` 字符（`\u0000`）                                         |
| `\t`     | Tab（`\u0009`）                                                |
| `\n`     | 换行（`\u000A`）                                               |
| `\v`     | 垂直 Tab（`\u000B`）                                           |
| `\f`     | Form Feed（`\u000C`）                                          |
| `\r`     | 回车（`\u000D`）                                               |
| `\xnn`   | 十六进制数字 `nn` 表示的拉丁字符；比如 `\x0A` 相当于 `\n`           |
| `\uxxxx` | 十六进制数字 `xxxx` 表示的 Unicode 字符；比如 `\u0009` 相当于 `\t` |
| `\cX`    | 控制字符 `^X`；比如，`\cJ` 相当于换行符 `\n`                      |

### 字符类

将多个单字符用方括号包围，就可以组合成**字符类**（*character classes*）。比如 `/[abc]/`。还可以取字符类的“补集”，比如 `/[^abc]/`。用短横线连接可以定义字符类的起止字符，比如 `/[a-zA-Z0-9]/`。

除了方括号语法，JavaScript 还为常用的字符类定义了一些转义字符，相当于某些字符类的快捷方式。所有的字符类如下：

| 字符      | 匹配的值                              |
| -------- | ------------------------------------ |
| `[...]`  | 方括号之间字符集的任意一个字符            |
| `[^...]` | 方括号字符集之外的任意一个字符            |
| `.`      | 除换行符或 Unicode 行结束符之外的任意字符 |
| `\w`     | 任意 ASCII 字符，相当于 `[a-zA-Z0-9_]`  |
| `\W`     | 相当于 `[^a-zA-Z0-9_]`                |
| `\s`     | 任意 Unicode 空白符                    |
| `\S`     | 任意非 Unicode 空白符。                 |
| `\d`     | 任意 ASCII 数字。相当于 `[0-9]`         |
| `\D`     | 任意非 ASCII 数字。相当于 `[^0-9]`      |
| `[\b]`   | 退格字面量（特殊情况）                   |

### 重复量词

| 字符     | 含义                               |
| ------- | ---------------------------------- |
| `{n,m}` | 匹配前面元素至少 `n` 次，至多 `m` 次   |
| `{n,}`  | 匹配前面元素至少 `n` 次               |
| `{n}`   | 匹配前面元素恰好 `n` 次               |
| `?`     | 匹配前面元素 0 或 1 次。相当于 `{0,1}` |
| `+`     | 匹配前面元素 1 或多次。相当于 `{1,}`   |
| `*`     | 匹配前面元素 0 或多次。相当于 `{0,}`   |

重复量词默认是**贪婪的**（`greedy`），也就是说，它们会尽可能多的匹配字符。

可以给数量词增加 `?` 后缀，将其切换为“非贪婪模式”。比如：`??`、`+?`、`*?`，甚至 `{1,5}?`。这样它会尽可能少的匹配元素。

比如，对于字符串 `"aaa"`，正则表达式 `/a+/` 是贪婪的，会匹配全部字符串 `"aaa"`。`/a+?/` 不贪婪，很腼腆，只匹配第一个 `"a"`。

### 可选值、群组和引用

正则表达式语法包括一些特殊字符，用来表示可选值、群组子表达式和引用子表达式。`|` 用来隔离可选值。比如，`/ab|cd|ef/` 可以匹配 `"ab"` 或 `"cd"` 或 `"ef"`。`/\d{3}|[a-z]{4}/` 匹配三个数字或四个小写字母。

圆括号用来分组，将多个字符组合为一个单元。比如，`/java(script)?/` 匹配 `"java"` 后面跟着一个可选的 `"script"`。

与圆括号相关的另一个语法是引用前面出现的子单元，使用 `\nn` 即可，其中 `nn` 是数字，表示第几个子单元。比如，`\1` 表示第一个子单元。

引用可以增加一些限制，比如，如果要匹配成对单引号或双引号及其包围的内容，可以使用 `/(['"])[^'"]*\1/`。

不可以在字符类内使用引用，因此如下写法是不对的：

```js
/(['"])[^\1]*\1/
```

有时候需要将元素作为群组处理，但是不可以创建数字引用，此时可以使用 `(?:...)` 语法创建。比如：

```js
/([Jj]ava(?:[Ss]cript)?)\sis\s(fun\w*)/
```

此时，`(?:[Ss]cript)` 仅使用群组功能，并不会生成数字引用。所以 `\2` 会指代 `(fun\w*)` 匹配的文本。

下表对可选值、群组和引用略作总结

| 字符       | 含义                        |
| --------- | --------------------------- |
| `|`       | 可选值                       |
| `(...)`   | 群组。匹配的字符可在后面引用    |
| `(?:...)` | 仅做群组。不记忆该群组匹配的字符 |
| `\n`      | 引用前面已匹配字符             |

> ⚠️ 注意，上面的 `\n` 的 `n` 表示一个数字，比如 `\1`。不要与换行符 `\n` 混淆。

### 匹配位置

有些正则表达式元素可以匹配特定位置，比如 `\b` 匹配单词边界，即 `\w` 和 `\W` 之间等位置。这些元素有时也被称作**正则表达式锚点**（*regular-expression anchors*）。

| 字符     | 含义                                                              |
| ------- | ---------------------------------------------------------------- |
| `^`     | 匹配字符首部，在多行搜索中，匹配行首                                   |
| `$`     | 匹配字符尾部，在多行搜索中，匹配行尾                                   |
| `\b`    | 匹配单词边界。包括 `\w` 和 `\W` 之间的位置，以及 `\w` 和行首行尾之间的位置 |
| `\B`    | 匹配非单词边界                                                      |
| `(?=p)` | 前向断言。需要匹配模式 `p`，但 `p` 的对应字符不会出现在匹配结果中          |
| `(?!p)` | 反向断言。要求后面的字符不可以匹配 `p`                                 |

### 标志位

正则表达式标示位表示高层的模式匹配规则。

| 字符 | 含义       |
| --- | ---------- |
| `i` | 不区分大小写 |
| `g` | 全局搜索模式 |
| `m` | 多行搜索模式 |

### ES6+ 新增语法

TODO

## String 的函数

### search()

String 支持正则的函数有四种，最简单的是 `search()`，它返回字符串中匹配正则的第一个字符的索引值，或者没有匹配时，返回 -1。

```js
"JavaScript".search(/script/i)
// => 4
```

如果 `search` 的参数不是正则表达式类型，会被 `RegExp` 构造函数转换为正则表达式。`search` 不支持全局搜索，会忽略 `g` 标识符。

### replace()

`replace()` 用来查找替换。它的函数签名如下：

```js
string.replace(regexp, replacement)
```

`regexp` 表示待匹配的正则表达式，`replacement` 是替换后的字符串或者函数。

对于未指定 `g` 标志位的正则表达式，它只替换第一个发现的匹配字符串。

```js
'hello world hello regexp'.replace(/hello/, '你好')
// => "你好 world hello regexp"
```

如果正则表达式有 `g` 标志位，`replace()` 会替换所有的匹配字符：

```js
'hello world hello regexp'.replace(/hello/g, '你好')
// => "你好 world 你好 regexp"
```

`replace()` 的功能不止于此。对于捕获到的匹配群组，可以使用 `$1`、`$2` 等分别指代第一个群组文本，第二个群组文本等。因此可以在 `replacement` 使用 `$1` 等实现部分字串替换。

比如，我们想将 `"hello" is "great"!` 中的双引号替换为方括号，可以这么做：

```js
'"hello" is "great"!'.replace(/"([^"]+)"/g, '[$1]')
// => '[hello] is [great]!'
```

`replacement` 可以出现的特殊字符小结如下：

| 字符                    | 在 replacement 的含义           |
| ---------------------- | ------------------------------ |
| `$1`, `$2`, ..., `$99` | 匹配正则的群组子串，从第1个到第99个 |
| `$&`                   | 匹配正则的字符串                 |
| <code class="hightlighter-rouge">$`</code> | 匹配字符串左侧的字符串 |
| `$'`                   | 匹配字符串右侧的字符串            |
| `$$`                   | 美元符号字面量                   |

ECMAScript v3 规定，`replacement` 参数还可以是函数，每次匹配后都会执行，函数返回的结果会当作替换文本。

函数的第一个参数表示匹配的字符串，后面的参数是匹配的群组子串，数量从零到多个不等，下一个参数是匹配子串在原字符串的位置索引，最后一个参数是字符串本身。

如果要将所有单词变为首字母大写：

```js
text.replace(/\b\w+\b/g, function(word) {
    return word.substring(0, 1).toUpperCase() + 
        word.substring(1)
})
```

### match()

`match()` 是最通用的字符串正则表达式函数。它只有一个参数（正则表达式类型），返回值是一个数组，包含了匹配结果。

如果正则表达式含有 `g` 标志位，数组中会返回所有匹配的结果。如果没有匹配项，则返回 `null`。比如：

```js
'1 plus 2 equals 3'.match(/\d+/g)
// => ['1', '2', '3']

'hello world'.match(/\d+/g)
// => null
```

如果正则表达式没有 `g` 标志位，`match()` 将不进行全局搜索；它仅搜索第一个匹配项。尽管没有全局搜索，它依然返回一个数组。数组第一个元素是匹配的字符串部分，后面依次是群组匹配的子串。

因此，如果 `match()` 返回一个数组 `a`，那么 `a[0]` 包含完整的匹配，`a[1]` 包含第一个群组匹配的子串。依次类推。

与 `replace()` 做个类比，`a[n]` 的内容和 `$n` 一样。

比如，以下的例子用于解析 URL：

```js
var url = /(\w+):\/\/([\w.]+)\/(\S*)/
var text = 'Visit my blog at http://www.example.com/~david'
var result = text.match(url)
if (result) {
    var fullurl = result[0]
    var protocol = result[1]
    var host = result[2]
    var path = result[3]

    console.log(fullurl)    // => http://www.example.com/~david
    console.log(protocol)   // => http
    console.log(host)       // => www.example.com
    console.log(path)       // => ~david
}
```

⚠️ 注意，将非全局搜索的正则表达式（即不设置 `g` 标志位）传递给 `match()` 函数，相当于把该字符串传递给 `RegExp` 的 `exec()` 方法。返回的数组均有 `index` 和 `input` 两个属性。其中的 `index` 表示匹配子串在原串的位置索引，`input` 就是原始字符串。

### split()

将字符串按照给定的模式拆分为多个字符串。比如：

```js
'1, 2, 3, 4, 5'.split(/\s*,\s*/)
// => ['1', '2', '3', '4', '5']
```

TODO: split 还有其他特性，参见犀牛书附录详解。

## RegExp 对象

TODO

### RegExp 属性

每个 RegExp 有五个属性。

TODO

### RegExp 方法

exec()

TODO: exec() 函数详解

在 [download-git-repo](https://github.com/liuzhuan/download-git-repo/blob/v1.0.2/index.js#L57-L59) 中有如下用法：

```js
function normalize(repo) {
    var regex = /^((github|gitlab|bitbucket):)?((.+):)?([^/]+)\/([^#]+)(#(.+))?$/
    var match = regex.exec(repo)
    var type = match[2] || 'github'
    // ...
}
```

用于从字符串中提取各部分信息。

test()

TODO

## 工具

工欲善其事，必先利其器。正则表达式晦涩难懂，好的工具可以让你事半功倍。

- [regexr.com](https://regexr.com/) by gskinner, 实时在线高亮正则表达式匹配元素

TODO

## REF

- [JavaScript 权威指南（第6版）][definitive] by *David Flanagan*，第10章《Pattern Matching with Regular Expressions》
- [正则表达式介绍及常见用法][aliyun]，周兆熊，2016/07/25
- [String.prototype.match() - MDN][string.match]
- [Regular expression - wikipedia][wiki]
- [New regular expression features - exploring es6][es6], by *Dr. Axel Rauschmayer*

[aliyun]: https://yq.aliyun.com/articles/254339
[wiki]: https://en.wikipedia.org/wiki/Regular_expression
[string.match]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
[definitive]: https://book.douban.com/subject/5303032/
[es6]: http://exploringjs.com/es6/ch_regexp.html