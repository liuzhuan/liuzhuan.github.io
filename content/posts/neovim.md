+++
date = '2025-04-02T21:42:58+08:00'
title = 'Neovim'
tags = ['neovim', 'vim']
summary = 'Neovim 入门指南'
+++

[Neovim][neovim] 是一款基于 Vim 的文本编辑器，可以从[这里][download]下载最新稳定版。Neovim 的安装包很小，比如，macOS x86 安装包仅有 9.1MB。

## 安装和配置 {#install-config}

macOS 下载的 `nvim-macos-x86_64.tar.gz`，可以对其执行 `xattr -c` 命令，清除文件的扩展属性（extended attributes），解除因元数据导致的权限问题。

然后，解压文件，并移动到 `/usr/local` 目录。

```sh
tar xzvf nvim-macos-x86_64.tar.gz
mv nvim-macos-x86_64 /usr/local/nvim
ln -s /usr/local/nvim/bin/nvim /usr/local/bin/nvim
```

Neovim 的配置文件可以使用 Lua 语言，它的主文件路径是 `~/.config/nvim/init.lua`，在其中可设置基本配置参数如下：

```lua
vim.opt.number = true

vim.opt.tabstop = 4
vim.opt.shiftwidth = 0
vim.opt.expandtab = true

vim.opt.cursorline = true
vim.opt.colorcolumn = "80"
vim.opt.wrap = true -- 启用自动换行
vim.opt.linebreak = true -- 在单词边界换行（避免单词被截断）
vim.opt.breakindent = true -- 换行后保持缩进
```

## 帮助文件 {#help}

执行 `:help` 命令进入帮助文档。在帮助文档中有标签文字，执行 `CTRL-]` 打开标签对应的主题文件。执行 `CTRL-O` 返回原来的位置。

执行 `:help CTRL-D` 可以查看快捷键 `CTRL-D` 的含义（向下翻半页）。类似的，向上翻半页的指令是 `CTRL-U`。

## 缓冲区管理 {#buffers}

缓冲区（Buffer）是载入至内存的磁盘文件。

常用的缓冲区管理命令：

- `:ls` 列举缓冲区列表
- `:bn` 切换至下一个缓冲区
- `:bp` 切换至上一个缓冲区
- `:bd` 卸载当前缓冲区并把它从列表中移除

## 终端 {#terminal}

执行 `:term` 命令进入终端。在终端里，输入插入命令（如 `i`）后，可以输入命令。

如果要从终端的插入模式退出，执行 `CTRL-\ CTRL-N`。

## 窗口管理 {#windows}

窗口（Window）相关的快捷键多以 `CTRL-W` 为前缀。

执行 `:split` 或 `CTRL-W s` 拆分为上下两个窗口，新窗口在当前窗口上方。

执行 `:vsplit` 或 `CTRL-W v` 拆分为左右两个窗口，新窗口在原窗口左侧。

在不同窗口间移动的命令：

- `CTRL-W k` 移动到上方窗口
- `CTRL-W j` 移动到下方窗口
- `CTRL-W h` 移动到左侧窗口
- `CTRL-W l` 移动到右侧窗口

改变窗口尺寸的命令：

- `CTRL-W +` 增加窗口高度
- `CTRL-W -` 减小窗口高度
- `CTRL-W >` 增大窗口宽度
- `CTRL-W <` 减小窗口宽度
- `:resize [height]` 设定绝对高度值
- `:vertical resize [width]` 设定绝对宽度值

移动窗口的命令：

- `CTRL-W r` 向右向下旋转窗口，光标位置保持不变
- `CTRL-W x` 交换当前窗口和下一个窗口，光标位置也会交换

关闭窗口的命令：

- `CTRL-W c` 关闭当前窗口
- `CTRL-W o` 关闭其余窗口，只保留当前窗口
- `:qall` 退出所有窗口

## 标签管理 {#tab}

一个标签可以包含多个窗口。多个标签可以展示不同的项目。

执行 `:tabnew` 或 `:tabe` 创建新标签。`gt` 切换到下一个标签，`gT` 切换到上一个标签。

关闭标签执行 `:tabclose` 或 `tabc`。

[neovim]: https://neovim.io/
[download]: https://github.com/neovim/neovim/releases/latest
