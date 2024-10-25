---
layout: post
title: Hello Jekyll
date: 2017-12-08
math: true
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

## 数学公式

Inline math: $$2^3=8$$

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