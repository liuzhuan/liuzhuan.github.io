---
layout: post
title: 常用的 Git 命令
date: 2024-09-27 22:19
---

* TOC
{:toc}

## 配置信息

### 三个层级

[`git config`][setup] 命令用于设置 Git 参数，参数的储存位置有三：

1. `[path]/etc/gitconfig`，该文件的参数影响当前系统的所有用户的所有仓库，读写时需使用 `--system` 选项
2. `~/.gitconfig` 或 `~/.config/git/config`，其中的参数影响当前登录用户及其拥有的仓库，使用 `--global` 选项读写该配置文件
3. 每个 Git 仓库目录下的 `.git/config` 文件，其中的参数仅影响当前所在仓库，你可以使用 `--local` 选项强制读写该配置文件。当没有任何选项时，默认就是 `--local`

### 设置用户名称和邮箱

```bash
# 设置全局的用户名和邮箱
$ git config --global user.name "Tony Stark"
$ git config --global user.email tony@stark.com
```

[setup]: https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup "First-Time Git Setup"