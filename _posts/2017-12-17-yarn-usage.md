---
layout: post
title: Yarn 用法
date: 2017-12-17
---

Yarn 是 Facebook 出品的打包器，其优势在于快、稳。

在 macOS 安装可用 Homebrew :

```sh
brew install yarn
```

其常用命令如下：

```sh
# 开启新项目
yarn init

# 添加依赖
yarn add <package>
yarn add <package>@<version>
yarn add <package>@<tag>

yarn add <package> --dev
yarn add <package> --peer
yarn add <package> --optional

# 升级依赖项
yarn upgrade <package>
yarn upgrade <package>@<version>
yarn upgrade <package>@<tag>

# 移除依赖项
yarn remove <package>

# 安装所有依赖项
yarn
yarn install

# 全局安装
yarn global add <package> [--prefix]
yarn global add create-react-app --prefix /usr/local
```

## REF

- [Yarn 官网][home]
- [Yarn 安装][install]
- [Yarn Usage][usage]
- [yarn global 全局安装][global]

[home]: https://yarnpkg.com/zh-Hans/
[install]: https://yarnpkg.com/en/docs/install
[usage]: https://yarnpkg.com/en/docs/usage
[global]: https://yarnpkg.com/en/docs/cli/global