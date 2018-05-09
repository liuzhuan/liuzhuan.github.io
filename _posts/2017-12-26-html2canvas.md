---
layout: post
title: html2canvas 简介
date: 2017-12-26
---

[在线 demo][demo]

## 如何绘制跨域图片？

比如，`m.example.com` 网站的 js 想读取 `static.example.com` 的图片。

首先，在 `static.example.com` 服务器增加跨域请求头。以 nginx 为例：

```
location / {
    add_header 'Access-Control-Allow-Origin' 'https://m.example.com' always;
    ...
}
```

传入截图选项 `useCORS: true`: 

```javascript
const html2canvas = require('html2canvas')
const options = {
    useCORS: true
}
html2canvas(target, options)
    .then(canvas => {
        document.body.appendChild(canvas)
    })
```

### useCORS

当设定 `{ useCORS: true }` 后，html2canvas 到底做了什么操作？

在源代码 [`src/ResourceLoader.js`](https://github.com/niklasvh/html2canvas/blob/v1.0.0-alpha.12/src/ResourceLoader.js#L41-L54) 中：

```js
// ...
if (!isSVG(src) || FEATURES.SUPPORT_SVG_DRAWING) {
    if (this.options.allowTaint === true || isInlineImage(src) || this.isSameOrigin(src)) {
        return this.addImage(src, src, false);
    } else if (!this.isSameOrigin(src)) {
        if (typeof this.options.proxy === 'string') {
            this.cache[src] = Proxy(src, this.options).then(src =>
                loadImage(src, this.options.imageTimeout || 0)
            );
            return src;
        } else if (this.options.useCORS === true && FEATURES.SUPPORT_CORS_IMAGES) {
            return this.addImage(src, src, true);
        }
    }
}
// ...
```

因此，当图片域名和当前页面不一致 `isSameOrigin === false` 时，并且设置了 `useCORS: true` 选项，就会调用 `addImage(src, src, true)` 函数加载图像。

继续跟踪 [`addImage()`](https://github.com/niklasvh/html2canvas/blob/v1.0.0-alpha.12/src/ResourceLoader.js#L127-L169) 函数：

```js
// ...
addImage(key: string, src: string, useCORS: boolean): string {
    // ...

    const imageLoadHandler = (supportsDataImages: boolean): Promise<Image> =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            //ios safari 10.3 taints canvas with data urls unless crossOrigin is set to anonymous
            if (!supportsDataImages || useCORS) {
                img.crossOrigin = 'anonymous';
            }

            img.onerror = reject;
            img.src = src;
            if (img.complete === true) {
                // Inline XML images may fail to parse, throwing an Error later on
                setTimeout(() => {
                    resolve(img);
                }, 500);
            }
            if (this.options.imageTimeout) {
                const timeout = this.options.imageTimeout;
                setTimeout(
                    () =>
                        reject(
                            __DEV__
                                ? `Timed out (${timeout}ms) fetching ${src.substring(0, 256)}`
                                : ''
                        ),
                    timeout
                );
            }
        });

    this.cache[key] =
        isInlineBase64Image(src) && !isSVG(src)
            ? // $FlowFixMe
                FEATURES.SUPPORT_BASE64_DRAWING(src).then(imageLoadHandler)
            : imageLoadHandler(true);
    return key;
}
```

当 `useCORS` 为真，会动态产生图片，并设置其 `crossOrigin = "anonymous"`，让其可以跨域。

## REF

- [html2canvas - Screenshots with JavaScript][home]
- [启用了 CORS 的图片][cors]

[home]: https://html2canvas.hertzen.com/
[demo]: /test/html2canvas-demo/index.html
[cors]: https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image