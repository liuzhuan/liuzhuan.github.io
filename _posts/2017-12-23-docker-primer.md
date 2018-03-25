---
layout: post
title: Docker 入门
date: 2017-12-23
---

## Docker 是什么？

Docker 是基于 Go 语言实现的开源容器项目，诞生于 2013 年。

目前已有多个相关项目，包括 Docker 三剑客（Machine, Compose, Swarm）、Kubernetes 等。

Docker 的构想是要实现“Build, Ship and Run Any App, Anywhere”，即通过对应用的封装、分发、部署、运行生命周期进行管理，达到应用组件“一次封装，到处运行”的目的。

Docker 使用 Linux 容器（Linux Containers, LXC）技术。早期的 Docker 代码实现直接基于 LXC。自 0.9 版本开始，Docker 开发了 `libcontainer` 项目，作为更广泛的容器驱动实现，从而替换掉 LXC 实现。

简单的讲，可以把 Docker 容器理解为一种轻量级的沙盒（sandbox）。

## 为什么要使用 Docker？

Docker 项目发起人兼公司 CTO *Solomon Hykes* 曾认为，Docker 在正确的地点、正确的时间顺应了正确的趋势 --- 如何正确的构建应用。

快速分发和部署，这正是 Docker 所能够提供的最大优势。

使用 Docker，开发人员可以使用镜像快速构建一套标准的开发环境；开发完成之后，测试和运维人员可以使用完全相同的环境来部署代码。

更新管理更简单。使用 Dockfile，只需要修改配置，就可以替代以往大量的更新工作。

## 三大核心概念

Docker 的大部分操作都围绕着它的三大核心概念 --- 镜像（Image）、容器（Container）和仓库（Repository）而展开。所以一定要正确理解这三个概念。

### 镜像

可以把镜像理解为一个只读模板，它是创建 Docker 容器的基础。可以把它比作光盘💿镜像。

### 容器

容器类似于一个轻量级沙箱，用来运行和隔离应用。可以把容器看作是一个简易版的 Linux 系统环境。

镜像是只读的，容器从镜像启动时，会在镜像之上创建一个可写层。

### 仓库

Docker 仓库类似代码仓库，用于集中存放镜像文件。就像光盘货架一样。

不要把仓库和注册服务器（Registry）混淆。注册服务器是存放仓库的地方。每个仓库集中存放某一类镜像，通过不同的标签（tag）区分。

仓库可以分为公开仓库和私有仓库。目前最大的公开仓库是官方的 [Docker Hub][hub]。

## 安装

Docker for Mac 是一款 Docker 社区版应用。它的安装包囊括了 Mac 运行 Docker 的所有东西。

在官网[下载页面][install-docker-mac]下载安装即可。

## REF

- [Docker 技术入门与实战（第2版）][book]，杨保华、戴王剑、曹亚仑编著，2017年3月出版，机械工业出版社
- [Docker Homepage][docker]
- [Docker Docs][docs]
- [Install Docker for Mac][install-docker-mac]
- [Get started with Docker for Mac][docker-for-mac]

[docker]: https://www.docker.com/
[docs]: https://docs.docker.com/
[book]: https://book.douban.com/subject/28489095/
[hub]: https://hub.docker.com
[docker-for-mac]: https://docs.docker.com/docker-for-mac/
[install-docker-mac]: https://docs.docker.com/docker-for-mac/install/