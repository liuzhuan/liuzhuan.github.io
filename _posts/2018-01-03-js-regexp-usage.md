---
layout: post
title: JavaScript 的正则表达式
date: 2018-01-03
---

正则表达式(Regular Expression)，又称正规表示法、常规表示法，在实际的软件开发项目中经常会被使用到。它使用单个字符串来描述、匹配并获取一系列符合某个句法规则的结果。

## 起源

1956 年，数学家 *Stephen Kleene* 在 *Warren McCulloch* 和 *Walter Pitts* 早期神经系统工作的基础上，设计出了一个数学符号体系 —— *regular sets*(规则的集合)，这个东西很快被计算机科学家用于编译器的扫描或词法分析。由于正则表达式强大的文本处理能力，很快被应用到 Unix 的工具软件 grep 中；此后，正则表达式被广泛应用于 Unix 系操作系统、Perl、PHP，JavaScript 等语言和开发环境中。

## 基本语法

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

- [正则表达式介绍及常见用法][aliyun]，周兆熊，2016/07/25
- [Regular Expression Language - Quick Reference - microsoft][ms], 2017/03/30
- [String.prototype.match() - MDN][string.match]
- [Regular expression - wikipedia][wiki]

[aliyun]: https://yq.aliyun.com/articles/254339
[ms]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference
[wiki]: https://en.wikipedia.org/wiki/Regular_expression
[string.match]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match