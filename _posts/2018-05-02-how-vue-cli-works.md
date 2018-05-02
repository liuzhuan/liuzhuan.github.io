---
layout: post
title: vue-cli 工作原理是什么？
date: 2018-05-02
---

> 本文以 vue-cli v2.9.3 为例。由于 vue-cli v3 改动较大，且目前尚未稳定，因此暂不考虑。

众所周知，`vue-cli` 是快速搭建 Vue 项目的脚手架。

如果使用 vue-cli v2.9.3，首先全局安装：

```sh
$ npm install -g vue-cli
```

接着，可以使用模板创建新项目：

```sh
$ vue init <template-name> <project-name>
```

比如：

```sh
$ vue init webpack my-project
```

上面例子从 `vuejs-templates/webpack` 拉取模板，向用户提几个问题，然后在 `./my-project/` 目录生成项目。

`webpack` 是官方提供的众多模板之一，除此之外，还有 `webpack-simple`、`browserify` 等。这些官方模板全部位于 [vuejs-templates][vuejs-templates] 之下。

## 自定义模板

如果官方模板不合胃口，你可以 fork 一份官方模板，稍作改造，照样使用 `vue-cli`：

```sh
$ vue init username/repo my-project
```

其中，`username/repo` 是你的 fork 副本的 Github 仓库缩写。

[`download-git-repo`][download-git-repo] 会读取仓库缩写，因此你还可以使用 `bitbucket:username/repo` 读取 Bitbucket 仓库，并且使用 `username/repo#branch` 读取标签或分支。

## 本地模板

除了 GitHub 仓库，你还可以使用本地文件系统的模板：

```sh
$ vue init ~/fs/path/to-custom-template my-project
```

## 从零编写自定义模板

- 模板仓库必须拥有 `template` 目录，其中包含模板文件
- 模板仓库可以有元数据文件，名为 `meta.js` 或 `meta.json`。可以包含以下字段：
    - `prompts`：用来收集用户选项数据
    - `filters`：用来渲染过滤文件？
    - `metalsmith`：用来在工具链中增加自定义的 metasmith 插件
    - `completeMessage`：用来包含模板创建成功后的展示文本。可以包含一些指导信息。
    - `complete`：一个钩子函数，模板创建成功后执行。作用和 `completeMessage` 类似。

### prompts

未完待续。。。

## REF

- [vue-cli][vue-cli] forked from vuejs/vue-cli
- [vuejs-templates][vuejs-templates]
- [download-git-repo][download-git-repo]
- [Inquirer][inquirer]

[vue-cli]: https://github.com/liuzhuan/vue-cli
[vuejs-templates]: https://github.com/vuejs-templates
[download-git-repo]: https://github.com/flipxfx/download-git-repo
[inquirer]: https://github.com/SBoudrias/Inquirer.js/#question