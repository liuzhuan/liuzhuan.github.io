---
layout: post
title: JavaScript 的正则表达式
date: 2018-01-03
---

正则表达式(Regular Expression)，又称正规表示法、常规表示法，在实际的软件开发项目中经常会被使用到。它使用单个字符串来描述、匹配并获取一系列符合某个句法规则的结果。

## 起源

1956 年，数学家 *Stephen Kleene* 在 *Warren McCulloch* 和 *Walter Pitts* 早期神经系统工作的基础上，设计出了一个数学符号体系 —— *regular sets*(规则的集合)，这个东西很快被计算机科学家用于编译器的扫描或词法分析。由于正则表达式强大的文本处理能力，很快被应用到 Unix 的工具软件 grep 中；此后，正则表达式被广泛应用于 Unix 系操作系统、Perl、PHP，JavaScript 等语言和开发环境中。

## 基本语法

JavaScript 使用 `RegExp` 类代表正则表达式。`String` 和 `RegExp` 皆有许多函数，用于模式匹配和查找替换。

我们通常使用正则表达式的字面量语法，比如 `/s$/`。需要注意的是，于字符串字面量不同，每个正则表达式字面量都是重新生成的，即拥有相同值的正则表达式字面量不是严格相等的。可以通过以下代码验证：

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

正则表达式字面量字符（Literal Characters）

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

TODO

### ES6+ 新增语法

TODO

## API

TODO

### String 的函数

```javascript
str.match(regexp)
```

如果 regexp 非正则表达式，则隐式转换。

### RegExp 的函数

未完待续。。。

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