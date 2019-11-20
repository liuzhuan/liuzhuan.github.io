---
layout: post
title: The Linux Command Line 笔记
date: 2019/11/18
---

* TOC
{:toc}

*William Shotts* 的 The Linux Command Line 是一本开源电子书，可以免费[下载 pdf][2] 文件。

全书分为四个部分：

1. 脚本基础
2. 配置与环境
3. 常见任务和必备工具
4. 编写 shell 脚本

以下是各章节的摘抄笔记。

## 1. 什么是 Shell？

Shell 是程序员和操作系统沟通的桥梁。在图形界面中，通常使用终端模拟器运行 shell 命令。

常见的简单命令：

```sh
$ date
Tue Nov 19 07:35:50 CST 2019

$ cal
   November 2019
Su Mo Tu We Th Fr Sa
                1  2
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30

# 查看磁盘剩余空间
$ df
Filesystem    512-blocks      Used Available Capacity iused      ifree %iused  Mounted on
/dev/disk1s5   976695384  20936568 666579888     4%  483729 4882993191    0%   /
devfs                391       391         0   100%     677          0  100%   /dev
/dev/disk1s1   976695384 281378848 666579888    30% 2611081 4880865839    0%   /System/Volumes/Data
/dev/disk1s4   976695384   6293544 666579888     1%       4 4883476916    0%   /private/var/vm
map auto_home          0         0         0   100%       0          0  100%   /System/Volumes/Data/home
/dev/disk1s3   976695384   1032312 666579888     1%      34 4883476886    0%   /Volumes/Recovery

# 查看可用内存情况 (macOS 没有此命令)
$ free

# 结束终端会话
$ exit
```

## 2. 导航

主要命令如下：

1. pwd - 打印当前目录名
1. cd - 切换目录
1. ls - 展示目录内容

## 3. 探索系统

主要命令如下：

1. ls - 展示目录内容
1. file - 查看文件类型
1. less - 查看文件内容

```sh
# ls 可以同时展示多个目录
$ ls ~ /usr

# 查看详细信息，并按照时间排序
$ ls -lt /usr

# 倒序排列 macOS
$ ls -ltr
# linux
$ ls -lt --reverse
```

大部分的 shell 命令格式：

```sh
$ command -options arguments
```

> page 40 of 555

## REF

1. [The Linux Command Line by William Shotts][1]

[1]: http://www.linuxcommand.org/tlcl.php/ "The Linux Command Line by William Shotts"
[2]: http://sourceforge.net/projects/linuxcommand/files/TLCL/19.01/TLCL-19.01.pdf/download "The Linux Command Line PDF"