---
layout: post
title: Python 核心模块
date: 2024-09-30 19:07:00 +0800
---

* TOC
{:toc}

## os {#os}

[`os`][os] 模块主要和操作系统交互。

### 文件和目录操作 {#os-file}

- `os.getcwd()` 获取当前的工作目录
- `os.chdir(path)` 改变当前工作目录
- `os.listdir(path=None)` 列举当前目录下的文件列表
- `os.mkdir(path, mode=511, *, dir_fd=None)` 创建目录
- `os.makedirs(name, mode=511, exist_ok=False)` 递归创建多级目录
- `os.rmdir(path, *, dir_fd=None)` 移除空目录
- `os.remove(path, *, dir_fd=None)` 删除文件（和 `unlink()` 一样）
- `os.rename(src, dst)` 重命名文件或目录
- `os.stat(path)` 获取文件的元数据

### 路径管理 {#os.path}

[`os.path`][os.path] 模块用于处理常见的路径操作。

- `os.path.abspath(path)` 返回路径对应的绝对路径
- `os.path.exists(path)` 检测路径是否存在
- `os.path.join(a, *p)` 拼接多个路径片段
- `os.path.split(p)` 把路径拆解为 `(head, tail)` 元组，其中 `tail` 是最后一个斜线之后的内容
- `os.path.splitext(p)` 把路径拆分成 `(root, ext)` 元组，其中 `ext` 是文件扩展名
- `os.path.getsize(filename)` 返回文件大小，以字节为单位
- `os.path.isfile(path)` 判断路径是否普通文件
- `os.path.isdir(s)` 判断路径是否现存目录
- `os.path.dirname(p)` 获取路径中的目录部分
- `os.path.basename(p)` 获取路径中的文件部分
- `os.path.sep` 路径分隔符，在 macOS 上是 `/`

```python
os.path.abspath('a') # '/Users/codeman/a'

os.path.join('a', 'b', 'c') # 'a/b/c'

os.path.dirname('a/b/c.txt') # 'a/b'
os.path.basename('a/b/c.txt') # 'c.txt'

os.path.split('a/b/c.txt') # ('a/b', 'c.txt')
os.path.splitext('a/b/c.txt') # ('a/b/c', '.txt')
```

### 环境变量 {#os.environ}

- `os.environ` 访问和修改操作系统的环境变量

```python
os.environ.get('PAGER')
# 'less'
```

### 进程管理 {#os-process}

- `os.system(command)` 在子 shell 中执行 `command` 命令
- `os.fork()` 分叉一个子进程（child process）。子进程返回 `0`，父进程返回 PID

## random

[`random`][random] 模块用于生成伪随机数。

伪随机数的生成依赖**梅森旋转算法**（[*Mersenne Twister*][mersenne]），这种算法久经考验，速度够快，适合一般场景用途，不适合密码安全领域。

- `random.choice(seq)` 从非空序列中随机取一个值
- `random.randrange(start, stop[, step])` 生成序列中的某一个数字。作用类似于 `choice(range(start, stop, step))`，但是支持任意大的范围，并且对一般场景做了优化
- `random.randint(a, b)` 返回一个随机整数 N，N 满足 `a <= N <= b`。相当于 `randrange(a, b+1)` 的别名
- `random.shuffle(x)` 对序列原地随机调整顺序
- `random.sample(population, k)` 从序列中随机提取 `k` 个元素，原序列不受影响

```python
import random

random.choice([1, 2, 3, 4, 5, 6]) # 3
random.choice('abc') # 'c'

random.randrange(1, 99, 2) # 95

random.randint(1, 6) # 6

a_list = [1, 2, 3, 4, 5, 6]
random.shuffle(a_list)
a_list # [4, 3, 2, 1, 6, 5]

a_list = [1, 2, 3, 4, 5, 6]
result = random.sample(a_list, 3)
a_list # [1, 2, 3, 4, 5, 6]
result # [5, 2, 1]
```



## sys {#sys}

[`sys`][sys] 模块主要和 Python 解释器交互。

- `sys.argv` 获取命令行参数，这是一个列表，第一个元素是入口脚本名称，后面依次是空格分割的参数
- `sys.exit(status=None)` 通过抛出异常 `SystemExit(status)` 退出应用。其中的 `status` 是状态码，默认是 `0`。应用退出后，状态码可以通过 Shell 特殊变量 `$?` 获取。
- `sys.stdin`、`sys.stdout` 和 `sys.stderr` 表示标准输入、标准输出和错误流。
- `sys.path` 可以访问和修改 Python 模块的搜索路径。
- `sys.version` 获取 Python 解释器的版本信息。
- `sys.byteorder` 获取解释器的字节顺序

```python
sys.version
# 3.12.6 (main, Sep  7 2024, 20:50:40) [Clang 14.0.0 (clang-1400.0.29.202)]

sys.byteorder
# 'little'
```

这是一个持续更新的文档

[os]: https://docs.python.org/3/library/os.html "Miscellaneous operating system interfaces"
[os.path]: https://docs.python.org/3/library/os.path.html "Common pathname manipulations"
[random]: https://docs.python.org/3/library/random.html "Generate pseudo-random numbers"
[sys]: https://docs.python.org/3/library/sys.html "System-specific parameters and functions"
[mersenne]: https://dl.acm.org/doi/10.1145/272991.272995 "Mersenne twister"