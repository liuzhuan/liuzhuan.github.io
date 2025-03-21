+++
date = '2025-03-21T16:36:04+08:00'
title = '如何在 Hugo 中使用数学公式？'
summary = '以 PaperMod 主题为例，使用 KaTeX 数学排版库。'
tags = ['Hugo', 'KaTeX', 'PaperMod']
math = true
+++

目前的 Hugo 默认不支持数学公式，但是它的扩展能力让我们很容易就能做到。

目前浏览器中常用的数学排版引擎有两个：[KaTeX][katex] 和 [MathJax][mathjax]。KaTeX 轻巧速度快，MathJax 稳重功能丰富。对于普通的个人博客，KaTeX 足够用了。

如果你的 Hugo 也是 PaperMod 主题，下面演示如何添加数学公式排版功能。本文参考了 PaperMod 作者的教程 [Math Typesetting](https://adityatelange.github.io/hugo-PaperMod/posts/math-typesetting/)。

## 创建数学片段文件{#math-partial}

首先，创建片段文件 `/layouts/partials/math.html`，参考 KaTeX 官网 [Auto-render Extension](https://katex.org/docs/autorender.html) 指南，在其中粘贴如下代码：

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css"
  integrity="sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib"
  crossorigin="anonymous"
/>
<script
  defer
  src="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.js"
  integrity="sha384-Rma6DA2IPUwhNxmrB/7S3Tno0YY7sFu9WSYMCuulLhIqYSGZ2gKCJWIqhBWqMQfh"
  crossorigin="anonymous"
></script>
<script
  defer
  src="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/contrib/auto-render.min.js"
  integrity="sha384-hCXGrW6PitJEwbkoStFjeJxv+fSOOQKOPbJxSfM6G5sWZjAyWhXiTIIAmQqnlLlh"
  crossorigin="anonymous"
  onload="renderMathInElement(document.body);"
></script>
```

如果无法访问 jsdelivr 的 CDN，也可以替换为 unpkg 网站的对应资源：

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/katex@0.16.21/dist/katex.min.css"
  integrity="sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib"
  crossorigin="anonymous"
/>
<script
  defer
  src="https://unpkg.com/katex@0.16.21/dist/katex.min.js"
  integrity="sha384-Rma6DA2IPUwhNxmrB/7S3Tno0YY7sFu9WSYMCuulLhIqYSGZ2gKCJWIqhBWqMQfh"
  crossorigin="anonymous"
></script>
<script
  defer
  src="https://unpkg.com/katex@0.16.21/dist/contrib/auto-render.min.js"
  integrity="sha384-hCXGrW6PitJEwbkoStFjeJxv+fSOOQKOPbJxSfM6G5sWZjAyWhXiTIIAmQqnlLlh"
  crossorigin="anonymous"
  onload="renderMathInElement(document.body);"
></script>
```

当然，为了更加保险，也可以把这些资源下载到本地，放在 Hugo 的 `/static` 目录下即可。务必记得下载字体，否则渲染会很难看。现代浏览器只需下载 `.woff2` 格式即可，字体列表可参考 [unpkg 这里](https://app.unpkg.com/katex@0.16.21/files/dist/fonts)。

## 设置页面头{#config-head}

修改页面头文件 `/layouts/partials/extend_head.html`，如果没有的话，请新建它。在其中写入如下代码：

```html
{{ if or .Params.math .Site.Params.math }}
{{ partial "math.html" . }}
{{ end }}
```

它的意思是，如果页面参数或整站参数包含 `math = true`，则当前页面会引入 `math.html` 片段文件。

## 开启数学模式{#enable-math}

如果要整站启用 KaTeX，可以在 `hugo.toml` 中添加参数 `math = true`。

```toml
[params]
math = true
```

如果只想在某个页面启用数学，可以在它的 Front Matter 中添加 `math = true` 参数。

```toml
+++
math = true
+++
```

## 编写数学公式{#write-math}

行内公式使用 `\\(` 和 `\\)` 包裹，比如：\\(E = mc^2\\) 的公式是：

```latex
\\(E = mc^2\\)
```

而块级公式使用 `$$` 包裹，比如：

```latex
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

完

[katex]: https://katex.org/
[mathjax]: https://www.mathjax.org/
