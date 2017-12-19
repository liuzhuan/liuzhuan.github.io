---
layout: post
title: nginx 入门
date: 2017-12-17
---

nginx 是由 *Igor Sysoev* 为俄罗斯大型网站 [Rambler.ru](https://www.rambler.ru/) 设计开发的。

Igor 是 1970 年生人。

## 安装

macOS 用 Homebrew

```sh
brew install nginx
```

## 运行机制

nginx 有一个主进程（master process）和多个工作进程（worker process）。主进程读取分析配置文件，维护工作进程。工作进程对请求作实际处理。nginx 基于事件模型，利用操作系统原生机制将请求高效分配至各工作进程。配置文件定义了工作进程的数目，可固定，也可随中央处理器内核数而变化。

配置文件决定着 nginx 及其模块的运行方式。其默认名 `nginx.conf`，位于 `/usr/local/nginx/conf`, `/etc/nginx` 或 `/usr/local/etc/nginx` 中。

## 常用命令

TO READ: http://nginx.org/en/docs/beginners_guide.html#control

## 术语表

- 主进程 master process
- 工作进程 worker process

## REF

- [nginx 初学者指南][guide]
- [Igor Sysoev][igor]

[guide]: http://nginx.org/en/docs/beginners_guide.html
[igor]: http://sysoev.ru/en/