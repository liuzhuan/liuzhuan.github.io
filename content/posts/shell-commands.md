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
```

`CST` 表示中国标准时间（China Standard Time），比协调世界时快 8 小时。
