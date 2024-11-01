---
layout: post
title: Hello Jekyll
date: 2017-12-08
use_math: true
---

* TOC
{:toc}

今天终于在 Github 上成功搭建起 Jekyll ，虽然很丑，但是因为是自己定制的丑，还是很开心。

以后会慢慢美化这个博客，将更多的知识输出出来。

## 安装

```sh
# in ubuntu you need install ruby before you get gem
sudo apt install ruby

gem install jekyll bundler

# or in Ubuntu
sudo apt install jekyll
```

## bundler

[bundler][bundler] provides a consistent environment for Ruby projects by tracking and installing the exact gems and versions that are needed.

## 主题

可以使用 `bundle show <theme>` 查看主题所在的文件夹。比如：`bundle show minima`。

`minima` 主题自带 [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag) 插件，可以在页面中使用如下 [YAML front matter 字段](https://github.com/jekyll/jekyll-seo-tag/blob/master/docs/usage.md)，以提升搜索效果：

- `title`
- `description`
- `image`
- `author`
- `locale`

## 数学公式 {#math}

在网页显示数学公式，有两种方案：

- [MathJax](https://www.mathjax.org/)，排版质量高，功能丰富，符号全面
- [KaTeX](https://katex.org/)，渲染速度快，功能不如 MathJax 全面

GitHub Pages 仅支持 MathJax。如果想在 GitHub Pages 中使用 MathJax，首先在根目录下创建 `_includes/mathjax.html` 文件，内容如下：

```html
<script>
MathJax = {
    tex: {
        inlineMath: [['\\(', '\\)']],
        displayMath: [
            ['$$', '$$'],
            ['\\[', '\\]']
        ]
    }
}
</script>
<script id="MathJax-script" async src="https://unpkg.com/mathjax@3/es5/tex-mml-chtml.js"></script>
```

如果你用的是 Minima 主题，可以创建 `_includes/head.html` 文件，内容如下：

```html
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  {%- seo -%}

  {%- if page.use_math -%}
  {%- include mathjax.html -%}
  {%- endif -%}

  <link rel="stylesheet" href="{{ "/assets/main.css" | relative_url }}">
  {%- feed_meta -%}
  {%- if jekyll.environment == 'production' and site.google_analytics -%}
    {%- include google-analytics.html -%}
  {%- endif -%}
</head>
```

在需要数学公式的文章顶部，设置 `use_math: true`  front matter。

行内函数使用 `\\(` 和 `\\)` 包裹，比如：\\(2^3=8\\)。

块级公式使用 `\\[` 和 `\\]` 包裹，也可以使用 `$$` 包裹，比如：

$$
\int_m^n{(a + b)}dt = c
$$

## 网站地图

[jekyll-sitemap][sitemap] 可以自动创建网站地址。用法如下：

1. 在 Gemfile 增加 `gem 'jekyll-sitemap'`，然后运行 `bundle`
2. 在网站 `_config.yml` 中增加如下内容：

```yml
...
plugins:
    - jekyll-sitemap
```

## 目录

如果 Jekyll 使用了 kramdown 引擎，那么会很容易。根据 *Sean Buscay* 的[博客][toc]，只需要在待插入目录的地方加入以下代码即可：

```
* TOC
{:toc}
```

## REF

- [jekyll homepage][jekyll]
- [Creating and Hosting a Personal Site on GitHub][guides]
- [Jekyll 中使用 KaTex][katex]

[jekyll]: https://jekyllrb.com/
[jekyll-theme]: https://jekyllrb.com/docs/themes/
[bundler]: http://bundler.io/
[guides]: http://jmcglone.com/guides/github-pages/
[katex]: https://frankindev.com/2017/02/08/using-katex-in-jekyll/
[sitemap]: https://github.com/jekyll/jekyll-sitemap
[toc]: http://www.seanbuscay.com/blog/jekyll-toc-markdown/