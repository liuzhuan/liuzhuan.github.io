---
layout: post
title: Yarn 用法
date: 2017-12-17
---

Yarn 是 Facebook 出品的打包器，其优势在于快、稳。

## 安装

在 macOS 安装可用 Homebrew :

```sh
brew install yarn
```

在 Ubuntu 上安装方式如下：

```sh
# configure repository
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# add yarn
sudo apt-get update && sudo apt-get install yarn
```

## 配置

yarn 安装的全局包路径，可以由 `yarn global bin` 获得。需将其加入个人配置文件中：

```sh
# add the following line into .profile, .bashrc, .zshrc etc.
export PATH="$PATH:`yarn global bin`"
```

## 命令

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