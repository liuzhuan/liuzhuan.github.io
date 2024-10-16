---
layout: post
title: JS 中的服务工作线程
date: 2024-10-16 18:37:00 +0800
---

前情提要

1. [JS 中的专用工作线程](https://www.1zh.tech/2024/10/12/dedicated-worker.html)
2. [JS 中的共享工作线程](https://www.1zh.tech/2024/10/14/sharedworker.html)

**服务工作线程**（*[service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)*）也是工作线程的一种，它的作用就像代理服务器，可以拦截 web 应用发出的请求，并返回实际的响应或本地缓存。

web 应用的弱点是必须联网，一旦断网就无法使用。原生应用就没这个烦恼，因为它可以安装在本地设备。service workers 可以为 web 应用带来离线使用的能力。