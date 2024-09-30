---
layout: post
title: Python 核心模块
date: 2024-09-30 19:07:00 +0800
---

* TOC
{:toc}

## os

[`os`][os] 模块主要和操作系统交互。

### 文件和目录操作

- `os.mkdir(path, mode=511, *, dir_fd=None)` 创建目录
- `os.remove(path, *, dir_fd=None)` 删除文件（和 `unlink()` 一样）

### 路径管理

[`os.path`][os.path] 模块用于处理常见的路径操作。

- `os.path.join(a, *p)` 拼接多个路径片段
- `os.path.split(p)` 把路径拆解为 `(head, tail)` 元组，其中 `tail` 是最后一个斜线之后的内容

```python
os.path.split('a/b/c.txt') # ('a/b', 'c.txt')
```

### 环境变量

- `os.environ` 访问和修改操作系统的环境变量

```python
os.environ.get('PAGER')
# 'less'
```

### 进程管理

- `os.system(command)` 在子 shell 中执行 `command` 命令
- `os.fork()` 分叉一个子进程（child process）。子进程返回 `0`，父进程返回 PID

## sys

[`sys`][sys] 模块主要和 Python 解释器交互。

- `sys.argv` 获取命令行参数，这是一个列表，第一个元素是入口脚本名称，后面依次是空格分割的参数
- `sys.exit(status=None)` 通过抛出异常 `SystemExit(status)` 退出应用。其中的 `status` 是状态码，默认是 `0`。应用退出后，状态码可以通过 Shell 特殊变量 `$?` 获取。
- `sys.stdin`、`sys.stdout` 和 `sys.stderr` 表示标准输入、标准输出和错误流。
- `sys.path` 可以访问和修改 Python 模块的搜索路径。

这是一个持续更新的文档

[os]: https://docs.python.org/3/library/os.html "Miscellaneous operating system interfaces"
[os.path]: https://docs.python.org/3/library/os.path.html "Common pathname manipulations"
[sys]: https://docs.python.org/3/library/sys.html "System-specific parameters and functions"