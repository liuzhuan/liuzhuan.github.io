+++
date = '2025-04-01T17:43:39+08:00'
title = 'Volta'
summary = '如何使用 Volta 管理 Node.js 版本？'
tags = ['volta', 'node']
+++

[Volta][volta] 是一个现代化的 JavaScript 工具管理器，擅长 Node.js、npm/pnpm/yarn 等工具的版本切换和项目管理体验。

Volta 的一个核心功能是自动化版本管理，它会根据 `package.json` 中的信息自动切换 Node.js 和 npm 的版本，避免手动切换导致的版本混乱。

Volta 使用 Rust 开发，性能高。

在 Unix/Linux 操作系统安装 Volta 的命令如下：

```sh
curl https://get.volta.sh | bash
```

上述安装命令会自动修改 Shell 配置脚本，增加必要的环境变量。如果你用的是 Bash，在 `~/.bashrc` 配置文件会出现如下指令：

```
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
```

如果你想安装 Node.js，使用 `volta install` 命令：

```sh
volta install node
```

它会安装最新的 LTS 长期支持版本。从 Node.js 官网首页可以看到最新 LTS 版本是 v22.14.0。

```sh
node -v
v22.14.0
```

下载时你也可以指定 Node.js 的具体版本：

```sh
volta install node@18.0.1

# 也可以仅指定大版本，它会下载满足要求的最新版本
volta install node@20
```

除 Node.js 外，也可以使用 Volta 下载 pnpm 等包管理器。

```sh
volta install pnpm
```

Volta 把这些 JavaScript 工具安装到了哪里？使用 `which` 指令可以显示命令的完整路径。

```sh
$ which node pnpm
~/.volta/bin/node
~/.volta/bin/pnpm
```

## 自动切换版本 {#pin-version}

如果你有两个前端项目，一个依赖 Node.js v18.0.0，另一个依赖 Node.js v20.0.0。Volta 的自动切换版本功能会让你方便许多。

使用 `volta pin` 命令锁定 JS 工具（包括 Node.js 和 npm 等）版本。比如：

```sh
volta pin node@18.0.0
```

此时，它会下载并切换到 Node.js v18.0.0，同时在 `package.json` 中增加字段如下：

```json
{
  "volta": {
    "node": "18.0.0"
  }
}
```

此时，在该项目根目录执行 `node -v` 查看版本号，会发现就是 `18.0.0`。如果返回父级目录，再次执行 `node -v`，会发现自动切换为默认的 `22.14.0`。这种根据目录自动切换 Node.js 的功能，让你在不同前端项目切换更加自如。

当你把版本锁定信息推送到远程仓库，其他开发者也能享受 Volta 带来的自动版本切换。当然，前提是他们也要安装 Volta 工具。

[volta]: https://volta.sh/
