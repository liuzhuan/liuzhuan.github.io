+++
date = '2025-04-02T21:42:58+08:00'
title = 'Neovim'
tags = ['neovim', 'vim']
summary = 'Neovim 入门指南'
+++

[Neovim][neovim] 是一款基于 Vim 的文本编辑器，可以从[这里][download]下载最新稳定版。Neovim 的安装包很小，比如，macOS x86 安装包仅有 9.1MB。

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

## 终端 {#terminal}

执行 `:term` 命令进入终端。在终端里，输入插入命令（如 `i`）后，可以输入命令。

如果要从终端的插入模式退出，执行 `Ctrl+\ Ctrl+N`。

[neovim]: https://neovim.io/
[download]: https://github.com/neovim/neovim/releases/latest
