+++
date = '2024-11-12T17:45:13+08:00'
draft = false
title = 'Sass 语言使用说明'
summary = 'Sass 预编译语言的基本用法'
tags = ['sass', 'css']
+++

[Sass](https://sass-lang.com/) 是一种 CSS 预处理器语言，它的作者是 [_Hampton Catlin_](https://github.com/hamptonmakes) 和 [_Natalie Weizenbaum_](https://github.com/nex3) (nex3)。

2006 年，Ruby 正当红，_Natalie_ 和 _Hampton_ 基于 Ruby 实现了最初的 Sass 版本：[Ruby Sass](https://sass-lang.com/ruby-sass/)。该版本于 2019 年 3 月 26 日停止维护。

[LibSass](https://sass-lang.com/libsass/) 是基于 C/C++ 实现的 Sass 库，目的是便于和其它编程语言整合。这个库也不再维护。

目前推荐使用的 Sass 基于 Dart 编程语言实现，即 [Dart Sass](https://sass-lang.com/dart-sass)，npm 上的 [`sass`](https://www.npmjs.com/package/sass) 包就是源自 `Dart Sass`，只不过编译成了纯 JavaScript 代码。

目前最新的 `Dart Sass` 版本号是 1.80.6。

## 安装 {#install}

把 Sass 安装为项目的开发依赖：

```sh
pnpm add --save-dev sass
```

Sass 支持两种语法风格，一种是 `.sass`，使用缩进代表嵌套层级，另一种是 `.scss`，更靠近原生的 CSS 语法，后者更常用。

如果希望把 `.scss` 文件编译为 `.css` 文件，执行如下命令：

```sh
pnpm sass input.scss output.css
```

如果希望实时监听文件或目录，使用 `--watch` 选项：

```sh
pnpm sass --watch input.scss output.css
```

如果监听的目标是文件夹，使用冒号 `:` 分隔源目录和目标目录：

```sh
pnpm sass --watch src/scss:dist/styles
```

## 变量 {#variables}

Sass 变量使用 `$` 前缀标识。

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

会被编译为：

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

## 嵌套 {#nesting}

源代码：

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
  }
}
```

编译结果：

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

nav li {
  display: inline-block;
}
```

## 片段 {#partials}

片段文件以下划线 `_` 开头，比如 `_partial.scss`。其中可以包含一些 CSS 代码片段，引入到其它模块中使用。

使用 `@use` 指令引入片段文件。

## 模块 {#modules}

2019 年 10 月 2 日发布的 Dart Sass 1.23.0 引入了[模块系统](https://sass-lang.com/blog/the-module-system-is-launched/)的概念。在此之前的代码复用主要依靠 `@import` 指令，但是 `@import` 指令不好用，它会把全部成员引入到全局作用域，难以区分成员来源，无法避免命名冲突，因此不得不设计新的模块系统代替它。

利用模块，可以把不同的功能划分到不同文件，并使用 `@use` 指令引用。模块有自己的命名空间，因此可以方便区分来源，也能避免命名冲突。

源代码：

```scss
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

```scss
// input.scss
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```

编译结果：

```css
/* output.css */
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}

.inverse {
  background-color: #333;
  color: white;
}
```

注意，在上面的 `@use "base";` 中，无需后缀和下划线前缀，Sass 足够智能，会自动判断模块路径。

## 混入 {#mixins}

如果需要多次使用一组相似的样式，可以把它们封装为**混入**（_mixins_）。混入可以包含参数，传入不同的具体值，实现样式的定制化。

定义混入使用 `@mixin` 指令，执行混入使用 `@include` 指令。

源代码：

```scss
@mixin theme($theme: DarkGray) {
  // <-- 定义混入
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, 0.25);
  color: #fff;
}

.info {
  @include theme; // <-- 执行混入，使用默认值
}

.alert {
  @include theme($theme: DarkRed); // <-- 执行混入，传入具体的值
}

.success {
  @include theme($theme: DarkGreen);
}
```

编译结果：

```css
.info {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}

.alert {
  background: DarkRed;
  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
  color: #fff;
}

.success {
  background: DarkGreen;
  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
  color: #fff;
}
```

### 内容块 {#content-block}

除了参数类型，混入还可以把整个样式块引入，使用 `@content` 指令表示样式的内容块。

源代码：

```scss
@mixin hover {
  &:not([disabled]):hover {
    @content;
  }
}

.button {
  border: 1px solid black;
  @include hover {
    border-width: 2px;
  }
}
```

编译结果：

```css
.button {
  border: 1px solid black;
}
.button:not([disabled]):hover {
  border-width: 2px;
}
```

## 扩展 {#extend}

使用 `@extend` 指令可以扩展（继承）其它选择器的属性。

和这个指令相关的另一个特性叫做**占位符类**（_placeholder classes_）。占位符类以 `%` 开头，只有当子类扩展它，它的代码才会出现在最终编译产物中。这有助于让编译结果保持精简和干净。

源代码：

```scss
// 下面的占位符类的代码会出现在编译结果中，因为有子类继承（扩展）它
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// 下面的占位符类不会出现在编译结果，因为它没有子类
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}
```

编译结果：

```css
.error,
.success,
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}
```

## 操作符 {#operators}

Sass 提供了标准的数学运算符号，比如 `+`、`-`、`*` 和 `math.div()`，以及 `%`。

```scss
@use 'sass:math';

.container {
  display: flex;
}

article[role='main'] {
  width: math.div(600px, 960px) * 100%;
}

aside[role='complementary'] {
  width: math.div(300px, 960px) * 100%;
  margin-left: auto;
}
```

编译结果：

```css
.container {
  display: flex;
}

article[role='main'] {
  width: 62.5%;
}

aside[role='complementary'] {
  width: 31.25%;
  margin-left: auto;
}
```

上面源代码中的 [`"sass:math"`](https://sass-lang.com/documentation/modules/math/) 是 Sass 内置的数学模块。

## 插值 {#interpolation}

插值几乎可以用在 Sass 样式表的任意地方，只要把变量使用 `#{}` 包裹即可。

源代码：

```scss
@mixin corner-icon($name, $top-or-bottom, $left-or-right) {
  .icon-#{$name} {
    background-image: url('/icons/#{$name}.svg');
    position: absolute;
    #{$top-or-bottom}: 0;
    #{$left-or-right}: 0;
  }
}

@include corner-icon('mail', top, left);
```

编译结果：

```css
.icon-mail {
  background-image: url('/icons/mail.svg');
  position: absolute;
  top: 0;
  left: 0;
}
```

## 内置模块 {#built-in-modules}

Sass 的内置模块包括：

- `sass:math` 处理数字计算
- `sass:string` 处理字符串
- `sass:color` 处理颜色
- `sass:list` 处理列表元素
- `sass:map` 处理哈希表
- `sass:selector` 处理选择器
- `sass:meta` 暴露 Sass 内部机制

### sass:color

[`sass:color`](https://sass-lang.com/documentation/modules/color/) 模块包含大量处理颜色的使用函数。

比如 `color.adjust($color, $red: null, $green: null, ...)` 可以按照颜色通道、亮度、色相等参数调整颜色。

```scss
@use 'sass:color';

@debug color.adjust(#6b717f, $red: 15); //=> #7a717f
@debug color.adjust(
  lab(40% 30 40),
  $lightness: 10%,
  $a: -20
); //=> lab(50% 10 40)
@debug color.adjust(
  #d2e1dd,
  $hue: 45deg,
  $space: oklch
); //=> rgb(209.7987810501, 223.8631944886, 229.398869806)
```
