---
layout: post
title: 全国哀悼日
date: 2020-04-04
---

今天是全国哀悼日，深切悼念抗击新冠肺炎疫情斗争牺牲烈士和逝世同胞。

各大网站首页变灰，变灰的 CSS 核心代码如下：

```css
html {
    filter: grayscale(100%);
}
```

如果要兼容 IE 9-，可以使用 IE 独有的 [BasicImage Filter][1]：

```css
html {
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    -webkit-filter: grayscale(1);
}
```

[1]: https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/ms532972%28v%3dvs.85%29