---
layout: post
title: 语义化版本简介
date: 2017-12-07
---

在 `package.json` 依赖项中，经常能看到 `^8.0.33`, `~0.7.1` 之类的版本号，比如 [vue/package.json][vue-package-json] 和 [webpack/package.json][webpack-package-json]。 开头的 `^`, `~` 是什么含义？

要理解这些符号，要从语义化版本说起。

## 语义化版本 semantic versioning

软件开发过程中难免需要依赖第三方库。一般我们都希望使用最新的第三方库，因为新版会修复旧版 bug，并增加新特性。但新版本也可能与旧版本不兼容。

如何既能使用新版本，又能保持与旧版的兼容性呢？语义化版本提出了一种解决思路。

在语义化版本中，版本号划分为三个粒度：`MAJOR.MINOR.PATCH`，可以分别称为大版本、小版本和修复版本。

- 如果只是修复了上一个版本的 bug，新版本只需要增加 `PATCH` 版本号即可，发行修复版本更新。
- 如果新增了特性，但是与上版本兼容，可以增加 `MINOR` 版本号，发行小版本更新。
- 如果引入的新特性与上版本不兼容，需要增加 `MAJOR`，发行大版本更新。

如果库文件开发者和使用者都遵循语义化版本，就可以在保持兼容性的前提下，使用最新的版本。

npm 作者 Issac Z. Schlueter 开发了 `semver`，专门用来处理语义化版本号。

## semver

`semver` 使用了一些符号来表示版本范围，基本运算符如下：

- `<` 小于某版本
- `<=` 不大于某版本
- `>` 大于某个版本
- `>=` 不小于某版本
- `=` 等于某版本

除了基本运算符，还可以使用空格连接两个版本号，表示一个版本集合，比如：`>=1.2.7 <1.3.0`。

还可以使用 `||` 连接多个集合，形成一个版本范围，比如：`1.2.7 || >=1.2.9 <2.0.0`

### 高级范围语法

连字符范围 `-`

- `X.Y.Z - A.B.C` 等价于 `>=X.Y.Z <=A.B.C`

X 范围

- `*` 等价于 `>=0.0.0`，即所有版本
- `1.x` 等价于 `>=1.0.0 <2.0.0`
- `1.2.x` 等价于 `>=1.2.0 <1.3.0`

波浪线范围 `~`，是修复级别的版本范围

- `~1.2.3` 等价于 `>=1.2.3 <1.3.0`

插入符范围 `^`，是小版本的范围

- `^1.2.3` 等价于 `>=1.2.3 <2.0.0`

所以，`^`, `~`, `*` 是控制不同版本范围的粒度。

[vue-package-json]: https://github.com/vuejs/vue/blob/dev/package.json#L60
[webpack-package-json]: https://github.com/webpack/webpack/blob/master/package.json#L36

## REF

- [Semantic Versioning 2.0.0](https://semver.org/)
- [Semantic versioning and npm](https://docs.npmjs.com/getting-started/semantic-versioning)
- [semver - The semantic versioner for npm](https://docs.npmjs.com/misc/semver)
