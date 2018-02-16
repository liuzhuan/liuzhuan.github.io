---
layout: post
title: 为什么函数式编程重要？
date: 2018-02-16
---

约翰·休斯教授曾写过一篇论文，专门论述函数式编程的重要性。在其中，休斯指出：

> 函数式语言的两个特性：高阶函数和懒求值，能有效提升模块化。 ~ 约翰·休斯（John Hughes）

## John Hughes 约翰·休斯是谁？

<figure>
<img src="http://www.cse.chalmers.se/~rjmh/Me%20prisma.jpg" title="John Hughes" style="width:300px;max-width:100%;" />
<figcaption>John Hughes 肖像，来自 http://www.cse.chalmers.se/~rjmh/ </figcaption>
</figure>

约翰·休斯（生于 1958 年 7 月 15 日）是一名瑞典计算机科学家，也是查尔姆斯理工大学（Chalmers University of Technology）计算机学院的教授。他是查尔姆斯函数式语言组的成员，主要工作与 Haskell 编程语言有关。在该领域发表了很多有影响力的论文，其中包括 "[Why Functional Programming Matters][whyfp]"（后文简称 `whyfp`）。

whyfp 是休斯教授 1984 发表的论文，主要解释函数式编程的重要性，其中关键在于模块化。

为了展示高阶函数和懒求值的应用，论文包含以下几部分

## 处理数组和树

使用高阶函数和递归模式，可轻松重复使用模块，以便实现更复杂的功能。

## 数值算法

基于懒求值，通过模块化实现了牛顿-拉弗森（Newton-Raphson）平方根算法。

另外，还使用懒求值实现了数值微积分。

## Alpha-beta 启发法，一种 AI 算法

通过结合使用高阶函数和懒求值这两个粘合剂，可以实现人工智能复杂的算法。

论文地址可参见[这里][whyfp]。

## REF

- [Why Functional Programming Matters (paper review)][why], by *Matt Gathu*, 2017/08/06
- [John Hughes - wikipedia][john]
- [John Hughes - chalmers.se][rjmh]
- [Why Functional Programming Matters][whyfp], by *John Hughes*, 1984

[why]: https://mattgathu.github.io/why-functional-programming/
[john]: https://en.wikipedia.org/wiki/John_Hughes_(computer_scientist)
[whyfp]: http://www.cse.chalmers.se/~rjmh/Papers/whyfp.html
[rjmh]: http://www.cse.chalmers.se/~rjmh/