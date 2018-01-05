---
layout: post
title: Headless Chrome
date: 2018-01-05
---

Headless Chrome 是 Chrome 浏览器的无界面形态，可以在不打开浏览器的前提下，使用所有 Chrome 支持的特性运行你的程序。相比于现代浏览器，Headless Chrome 更加方便测试 web 应用，获得网站的截图，做爬虫抓取信息等。

## 如何在终端使用

在 Mac 上使用前，建议先绑定 Chrome 别名

```sh
alias google-chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
```

然后，在终端输入：

```sh
google-chrome --headless --disable-gpu --remote-debugging-port=9222  https://github.com
```

此时，Headless Chrome已经成功运行了。打开浏览器，输入 `http://localhost:9222`。

To Be Continue

## REF

- [初探 Headless Chrome - zhihu.com][zhihu]
- [使用 Headless Chrome 进行页面渲染 - segmentfault.com][seg]
- [Headless Chrome入门 - jianshu.com][jianshu]
- [Headless Chrome略知一二 - nsfocus.net][nsfocus]
- [使用 Headless Chrome 进行页面渲染][zhihu2]

[zhihu]: https://zhuanlan.zhihu.com/p/27100187
[seg]: https://segmentfault.com/a/1190000009353359
[jianshu]: https://www.jianshu.com/p/aec4b1216011
[nsfocus]: http://blog.nsfocus.net/headless-chrome/
[zhihu2]: https://zhuanlan.zhihu.com/p/26810049