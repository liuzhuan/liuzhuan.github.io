---
layout: post
title: JavaScript 的正则表达式
date: 2018-01-03
---

正则表达式(Regular Expression)，又称正规表示法、常规表示法，在实际的软件开发项目中经常会被使用到。它使用单个字符串来描述、匹配并获取一系列符合某个句法规则的结果。

## 起源

1956 年，数学家 *Stephen Kleene* 在 *Warren McCulloch* 和 *Walter Pitts* 早期神经系统工作的基础上，设计出了一个数学符号体系 —— *regular sets*(规则的集合)，这个东西很快被计算机科学家用于编译器的扫描或词法分析。由于正则表达式强大的文本处理能力，很快被应用到 Unix 的工具软件 grep 中；此后，正则表达式被广泛应用于 Unix 系操作系统、Perl、PHP，JavaScript 等语言和开发环境中。

## 基本语法

JavaScript 的 `RegExp` 类表示正则表达式。`String` 和 `RegExp` 皆有许多函数，用于模式匹配和查找替换。

我们通常使用正则表达式的字面量语法，比如 `/s$/`。注意，和字符串字面量不同，每个正则字面量都是重新生成的，即**拥有相同值的正则表达式字面量并非严格相等**。

```js
var a1 = /a/
var a2 = /a/
a1 === a2
// ==> false

var a3 = 'a'
var a4 = 'a'
a3 === a4
// ==> true
```

### 正则表达式字面量字符（Literal Characters）

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

### 字符类（Character Classes）

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

### 指代、群组和引用

TODO

### 指定匹配位置

TODO

### 标志位

TODO

### ES6+ 新增语法

TODO

## String 的函数

TODO

## RegExp 对象

TODO

### RegExp 属性

TODO

### RegExp 方法

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