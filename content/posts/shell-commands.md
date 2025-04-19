+++
date = '2025-04-03T16:09:44+08:00'
title = 'Shell Commands'
summary = '常用的 Shell 命令'
tags = ['shell']
+++

使用 `date` 打印当前日期和时间，可以使用 `+` 开头的格式化字符串调整日期的输出格式。

```sh
$ date
2025年 4月 3日 星期四 16时11分03秒 CST

$ date "+%Y-%m-%d %H:%M:%S"
2025-04-03 16:13:38

$ date +%s
1743944693 # 打印以秒为单位的当前时间戳
```

`CST` 表示中国标准时间（China Standard Time），比协调世界时快 8 小时。

## grep

`grep` 是 **Global Regular Expression Print** 的首字母缩写，它的作用是全局查找文本字符串，如果找到了，就打印匹配的行。

`grep` 命令的语法如下：

```sh
grep <选项> <搜索字符串> <路径>
```

如果你想在 `main.js` 中搜索 `function` 关键字：

```sh
grep "function" main.js
```
