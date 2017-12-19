---
layout: post
title: Shell 入门
date: 2017-12-19
---

Shell 无处不在，异常强大，是每个开发人员必备技能。

写脚本很简单，但是写一个运行正常、稳定可靠的脚本并非易事，需要扎实的基础知识。

## 内建命令

```sh
# 别名，用短名表示复杂命令
alias listsource="ls *.c *.h"
# 别名只在当前 shell 会话期间有效，
# 若要使其永久生效，可将其保存至登录脚本。
```

## 登录脚本

对于 `bash`, `zsh` 等 `Bourne shell` 家族，以下文件可以保存设置：

- `~/.profile` 所有登录脚本自动执行
- `~/.bash_profile` 与 `.profile` 类似，但仅在 bash 中执行
- `~/.bashrc` 和 `~/.zshrc` 对非登陆 `bash` 或 `zsh` shell 脚本自动运行。

可在 `.bashrc` 中读取 `.profile` 内容：

```sh
. $HOME/.profile
```

## 输入特殊字符

输入特殊字符时，可以在其之前输入 `Ctrl-v`，这会禁止之后特殊字符的功能：

```
echo "control-V control-G"
```

将在屏幕输出：

```
echo "^G"
```

## REF

- [Shell Scripting Primer - apple.com][apple-shell-primer]

[apple-shell-primer]: https://developer.apple.com/library/content/documentation/OpenSource/Conceptual/ShellScripting/Introduction/Introduction.html