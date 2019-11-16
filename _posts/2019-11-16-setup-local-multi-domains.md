---
layout: post
title: 如何使用 nginx 在本地设置多个域名？
date: 2019/11/16
---

* TOC
{:toc}

有时候，为了验证跨域问题，需要用到多个域名。使用 nginx 在本地设置多域名，是最方便经济的方法。以下详细描述具体步骤。

比如，我们要在本地设置 a.com 和 b.com 两个域名。两个域名的根目录分别映射到 `/path/to/a/` 和 `/path/to/b`。

## 1. 设置 hosts 文件

在 hosts 文件中增加一行:

```diff
+ 127.0.0.1 a.com b.com
```

## 2. 创建目录和文件

```sh
$ mkdir -p /path/to/{a,b}
$ touch /path/to/{a,b}/index.html
```

编辑两个 html 文件，随便写点什么就好。

## 3. 设置 nginx

在 nginx 配置目录下，找到 `servers` 子目录，在其中创建 `local.conf` 文件。文件内容如下：

```
server {
    server_name a.com;

    location / {
        root /path/to/a/;
        index index.html index.html;
    }
}

server {
    server_name b.com;

    location / {
        root /path/to/b/;
        index index.html index.html;
    }
}
```

如果 nginx 正在运行，重启 nginx

```sh
$ sudo nginx -s reload
```

## 4. 大功告成

在浏览器地址栏输入 `http://a.com` 或 `http://b.com`，应该就能看到你随便写的内容了。