---
layout: post
title: Hello Jekyll
date: 2017-12-08
math: true
---

今天终于在 Github 上成功搭建起 Jekyll ，虽然很丑，但是因为是自己定制的丑，还是很开心。

以后会慢慢美化这个博客，将更多的知识输出出来。

## Install

```sh
# in ubuntu you need install ruby before you get gem
sudo apt install ruby

gem install jekyll bundler

# or in Ubuntu
sudo apt install jekyll
```

## bundler

[bundler][bundler] provides a consistent environment for Ruby projects by tracking and installing the exact gems and versions that are needed.

## 主题 theme

可以使用 `bundle show <theme>` 查看主题所在的文件夹。比如：`bundle show minima`。

## 使用数学公式

Inline math: $$2^3=8$$

$$
\int_m^n{(a + b)}dt = c
$$

## 使用网站地图

[jekyll-sitemap][sitemap] 可以自动创建网站地址。用法如下：

1. 在 Gemfile 增加 `gem 'jekyll-sitemap'`，然后运行 `bundle`
2. 在网站 `_config.yml` 中增加如下内容：

```yml
...
plugins:
    - jekyll-sitemap
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