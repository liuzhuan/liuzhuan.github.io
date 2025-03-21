+++
date = '2025-03-19T21:30:45+08:00'
title = 'Hugo 的基本用法'
summary = '如何使用 Hugo 搭建个人博客，自动部署至 GitHub Pages，以及开启搜索功能。'
tags = ['Hugo']
+++

[Hugo](https://gohugo.io/) 是使用 Go 语言编写的静态网站构建工具，构建速度非常快。

## 安装

Hugo 在 macOS、Windows 和 Linux 都可以使用。以 macOS 为例，使用 Homebrew 安装的命令如下：

```sh
$ brew install hugo

# 检测安装是否成功
$ hugo version
hugo v0.145.0-666444f0a52132f9fec9f71cf25b441cc6a4f355+extended darwin/amd64 BuildDate=2025-02-26T15:41:25Z VendorInfo=gohugoio
```

也可以直接去 [releases](https://github.com/gohugoio/hugo/releases/) 页面下载预编译的二进制文件，解压后放在系统路径即可，比如 `/usr/local/bin/` 之下。

## 创建新网站

创建新网站需要使用 `hugo new site` 命令。

```sh
$ hugo new site my-blog
$ cd my-blog

# 初始化 Git 仓库
$ git init
```

在 [Hugo Themes](https://themes.gohugo.io/) 页面可以查看各种主题，选择一个好看的安装。以下代码将 PaperMod 主题安装为子模块（submodule），子模块路径是 `themes/papermod`。

```sh
$ git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/papermod
```

PaperMod 主题的作者是 [_Aditya Telange_](https://adityatelange.in/about/)。

配置文件 `hugo.toml` 可以设定网站级别的参数，比如修改基本路径、语言编码和主题等。

```toml
baseURL = 'https://example.com/'
languageCode = 'zh-CN'
title = '我的博客标题'
theme = 'papermod'
```

## 添加新页面

使用 `hugo new content` 命令添加新页面。内容统一放在 `content/` 目录下，博客文章建议放在 `content/posts` 子目录中：

```sh
$ hugo new content content/posts/my-first-post.md
```

新生成的页面头部元数据叫 [Front Matter](https://gohugo.io/content-management/front-matter/)，它可以定义页面的基本信息，比如 `title`, `date`, `summary`, `tags`, `draft` 等。

`draft` 是一个布尔值，表示是否草稿。草稿态的文章不会在生产环境显示。

```toml
+++
date = 2024-02-02T04:14:54-08:00
draft = false
title = 'Example'
weight = 10
[params]
  author = 'John Smith'
+++
```

Front Matter 支持三种语法：YAML, TOML 和 JSON。YAML 的分割线是 `---`，TOML 的分隔线是 `+++`，JSON 使用 `{}` 分隔。

## 本地预览

使用 `hugo server` 可以启动本地服务器预览文章效果。默认不显示草稿状态的文章，除非使用 `--buildDrafts` / `-D` 选项。

```sh
$ hugo server -D
```

本地服务器会监听文件变动，自动刷新页面。

## 构建网站

使用 `hugo` 命令构建整个网站。生成的文件会放在 `/public/` 目录下，对于输出文件，可以在 `.gitignore` 中将其忽略。

```ini
/public/
.hugo_build.lock
```

## 自动部署到 GitHub Pages

如果你想自动部署到 GitHub Pages，可以使用 [Hugo 出品的 GitHub Actions 脚本](https://gohugo.io/host-and-deploy/host-on-github-pages/)。

首先，修改配置文件 `hugo.toml`，修改图片缓存地址：

```toml
[caches]
  [caches.images]
    dir = ':cacheDir/images'
```

然后，创建 GitHub 工作流配置文件 `.github/workflows/hugo.yaml`，其内容如下：

```yaml
# Sample workflow for building and deploying a Hugo site to GitHub Pages
name: Deploy Hugo site to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches:
      - main

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: 'pages'
  cancel-in-progress: false

# Default to bash
defaults:
  run:
    shell: bash

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.145.0
      HUGO_ENVIRONMENT: production
      TZ: Asia/Shanghai
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb
      - name: Install Dart Sass
        run: sudo snap install dart-sass
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5
      - name: Install Node.js dependencies
        run: '[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true'
      - name: Cache Restore
        id: cache-restore
        uses: actions/cache/restore@v4
        with:
          path: |
            ${{ runner.temp }}/hugo_cache
          key: hugo-${{ github.run_id }}
          restore-keys: hugo-
      - name: Build with Hugo
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/" \
            --cacheDir "${{ runner.temp }}/hugo_cache"
      - name: Cache Save
        id: cache-save
        uses: actions/cache/save@v4
        with:
          path: |
            ${{ runner.temp }}/hugo_cache
          key: ${{ steps.cache-restore.outputs.cache-primary-key }}
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

如果顺利的话，当你向远程的 GitHub 仓库推送时，会自动触发构建和部署。

## 增加搜索功能

PaperMod 主题默认使用 [Fuse.js Basic](https://www.fusejs.io/getting-started/different-builds.html#explanation-of-different-builds) 提供的模糊搜索功能，要开启搜索需要按照[帮助文档](https://github.com/adityatelange/hugo-PaperMod/wiki/Features#search-page)做一些必要的设置。

在配置文件 `hugo.toml` 中，增加 JSON 输出格式。

```toml
[outputs]
home = ['HTML', 'RSS', 'JSON']
```

创建新文件 `content/search.md`，用作搜索页面模板：

```toml
+++
title = 'Search'
layout = 'search'
summary = 'search'
placeholder = '请输入搜索关键字'
+++
```

如果某个页面不想被搜索，可以在它的 Front Matter 中增加如下字段：

```toml
+++
searchHidden = true
+++
```

如果想调整 fuse.js 的搜索参数，可以在 hugo.toml 写如下参数：

```toml
[params.fuseOpts]
isCaseSensitive = false
shouldSort = true
location = 0
distance = 1000
threshold = 0.4
minMatchCharLength = 0
keys = ['title', 'permalink', 'summary', 'content']
```

最后，在首页顶部菜单增加搜索页的入口。修改 hugo.toml 如下：

```toml
[[menu.main]]
name = 'Search'
url = 'search'
weight = 10
```
