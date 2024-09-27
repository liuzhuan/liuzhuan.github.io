---
layout: post
title: 高效使用 Vim 的七个习惯 
date: 2024-09-28 00:39:00 +0800
---

* TOC
{:toc}

[Vim][vim] 是一个流行的文本编辑器，原作者是 *[Bram Moolenaar][bram]* (1961 ~ 2023-08-03)。

2000 年 11 月，*Bram Moolenaar* 有一篇文章：[高效文本编辑的七个习惯][habits]，专门讲述文本编辑的技巧和策略。2007 年 2 月，他在谷歌演讲，题目是 [高效文本编辑的七个习惯 2.0][habits2]，B 站有录制的现场视频。

我们认识一下这七个习惯。

## 编辑文件 {#edit}

### 1. 快速移动 {#move}

程序员的大部分时间是在阅读代码、查找错误、寻找最佳修改位置，相比之下，真正插入新代码的时间不多。

在 Vim 中，`/pattern` 随时启动一次查找。`n` 在匹配字符间跳转。

如果你想查找光标下的单词，执行 `*` 命令。

如果开启了 `incsearch` 选项，Vim 会先匹配命中的第一个位置，随着输入不断变化。这种快速反馈让你很轻松就能发现错误。

如果开启了 `hlsearch` 选项，Vim 会使用黄色背景高亮显示命中的位置。

在结构化文本中，Vim 提供了更多跳转选项。比如，在 C 语言中，`%` 可以在配对括号间跳转，或者在 `#if` 和匹配的 `#endif` 间跳转。其实，`%` 可以在很多不同的匹配符号间来回跳转。

使用 `[{` 可以跳转到当前代码块的开始括号 `{` 位置处。

使用 `gd` 命令，可以跳转到变量的局部声明的位置。

**完**

[vim]: https://www.vim.org/ "Vim Homepage"
[bram]: https://vimhelp.org/version9.txt.html#Bram "Bram Moolenaar"
[habits]: https://www.moolenaar.net/habits.html "Seven habits of effective text editing"
[habits2]: https://www.bilibili.com/video/BV13U4y1j75T/ "Seven Habits of Effective Text Editing 2.0"
