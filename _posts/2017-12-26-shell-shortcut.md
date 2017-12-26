---
layout: post
title: Shell 快捷方式
date: 2017-12-26
---

## 进程相关

- `Ctrl+C` 杀死当前运行进程。向进程发送 `SIGINT` 信号。
- `Ctrl+Z` 暂停当前进程。向进程发送 `SIGTSTP` 信号，若后期想重新唤起进程，需要执行 `fg process_name` 命令。
- `Ctrl+D` 关闭当前 shell。类似于执行 `exit` 命令。

## 屏幕相关

- `Ctrl+L` 清理屏幕
- `Ctrl+S` 暂停向屏幕输出
- `Ctrl+Q` 继续向屏幕输出

## 移动光标

- `Ctrl+A` 至行首
- `Ctrl+E` 至行尾
- `Alt+B` 或 `Esc+B` 后退一词
- `Alt+F` 或 `Esc+F` 前进一词
- `Ctrl+B` 后退一字
- `Ctrl+F` 前进一字
- `Ctrl+XX` 在行首和当前位置之间跳转

## 删除文本

- `Ctrl+D` 删除光标下字符
- `Esc+D` 删除当前光标后的词
- `Ctrl+H` 删除光标前字符

## 修复错误

- `Esc+T` 交换光标下的词和前面的词
- `Ctrl+T` 迅速互换光标前两个字符位置
- `Ctrl+_` 撤销键入的字符

## 剪切和粘贴

- `Ctrl+W` 剪切光标前的词，并放入剪贴板
- `Ctrl+K` 剪切光标后的文本行，并放入剪贴板
- `Ctrl+U` 剪切光标前的文本行，并放入剪贴板
- `Ctrl+Y` 将剪贴板中内容粘贴到当前位置

## 大写切换

- `Esc+U` 将光标后的字符切换为大写字符
- `Esc+C` 将光标后的字符切换为首字符大写

## REF

- [The Best Keyboard Shortcuts for Bash (aka the Linux and macOS Terminal) - howtogeek.com][shell]

[shell]: https://www.howtogeek.com/howto/ubuntu/keyboard-shortcuts-for-bash-command-shell-for-ubuntu-debian-suse-redhat-linux-etc/