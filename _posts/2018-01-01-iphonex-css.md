---
layout: post
title: 如何适配 iPhone X?
date: 2018-01-01
---

Safari 浏览器默认将网页在安全区域内显示，避免主要内容被圆角或传感器截断。

安全区域外会以页面背景色 `background-color` 填充，一般在 `<body>` 或 `<html>` 中指定。这足以应付大多数网站。

对于其他网站 - 比如包含通栏导航条的网站（如下图所示），可选择 iOS 11 搭载的崭新 WebKit API ，在全面屏上实现更好的显示效果。

点击图片可观看对应的在线网页 demo。

[![default inset behavior](https://webkit.org/wp-content/uploads/default-inset-behavior.png)](https://webkit.org/demos/safe-area-insets/1-default.html)

## 使用整屏

第一个新特性，是对 `viewport` 标签的扩展，名为 `viewport-fit`，可精细控制内缩行为。它在 iOS 11 中可用。

`viewport-fit` 默认值为 `auto`，效果如上图所示。为了让页面内容铺满屏幕，可以设定 `viewport-fit` 为 `cover`。比如：

```html
<meta name="viewport" content="initial-scale=1, viewport-fit=cover">
```

刷新页面，效果如下：

[![viewport fit cover](https://webkit.org/wp-content/uploads/viewport-fit-cover.png)](https://webkit.org/demos/safe-area-insets/2-viewport-fit.html)

尽管内容铺满屏幕，主要内容却被圆角和传感器区域截断，且底部导航也变得难用。

## 遵守安全区域

为提升页面可用性，设定 `viewport-fit=cover` 后，下一步需设定主要内容的内边距。这样，既能充分利用寸土寸金的屏幕，还能让主要内容躲避边角和传感器的截断。

[![safe areas 1](https://webkit.org/wp-content/uploads/safe-areas-1.png)](https://webkit.org/demos/safe-area-insets/safe-areas.html)

iOS 11 的 WebKit 包含一个 [CSS 函数][env]：`env()`，以及[四个变量][props]：`safe-area-inset-left`, `safe-area-inset-right`, `safe-area-inset-top`, `safe-area-inset-bottom`。综合两者，可以得到当前安全区域的四个内边距。

`env()` 同 `var()` 一样，比如：

```css
.post {
    padding: 12px;
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
}
```

不支持 `env()` 的浏览器会忽略它。因此，每条 `env()` 样式声明最好考虑兼容性。

> iOS 11 最早的函数名为 `constant()`，自打 Safari Technology Preview 41 及 iOS 11.2 beta 开始，`constant()` 遭弃用，替换为 `env()`。若有必要，可利用 CSS 回退机制使用两者，其他情况下应优先使用 `env()`。

## 使用 `min()` 和 `max()` 整合

> 本小节的特性存在于 Safari Technology Preview 41 和 iOS 11.2 beta 版中。

如果网站设计采用了安全区域规范，就很难同时设定最小内边距。在上面例子中，如果把 12px 左内边距替换为 `env(safe-area-inset-left)`，当手机恢复竖直状态时，安全区域左边距会变为 0，文字就会紧贴屏幕左边界。

[![no margins](https://webkit.org/wp-content/uploads/no-margins.png)](https://webkit.org/demos/safe-area-insets/3-safe-area-constants.html)

为了解决这个问题，我们可以将边距设定为默认边距和安全区域边距两者的较大值。通过全新的 [CSS 函数 `min()` 和 `max()`][math] 可以实现。

在本例中，我们需使用 `max()`：

```css
@supports(padding: max(0px)) {
    .post {
        padding-left: max(12px, env(safe-area-inset-left));
        padding-right: max(12px, env(safe-area-inset-right));
    }
}
```

> ⚠️ 注意：需要使用 `@supports` 检测 `min` 和 `max` 是否可用。

在上面例子中，当手机处于竖直状态时，`env(safe-area-inset-left)` 返回 0px，此时 `max()` 函数得到 12px。在水平状态下，由于传感器外壳的存在，`env(safe-area-inset-left)` 会变得较大，从而被 `max()` 函数返回。这样，重要内容始终可见。

[![max safe areas insets](https://webkit.org/wp-content/uploads/max-safe-areas-insets.png)](https://webkit.org/demos/safe-area-insets/4-min-max.html)

## REF

- [如何针对 iPhone X 设计网站？ - zhihu][zhihu], by 寸志, 2018-01-01
- [Designing Websites for iPhone X - webkit.org][webkit], by Timothy Horton, 2017-09-22


[zhihu]: https://zhuanlan.zhihu.com/p/32532138?group_id=931270020638556160
[webkit]: https://webkit.org/blog/7929/designing-websites-for-iphone-x/
[hig]: https://developer.apple.com/ios/human-interface-guidelines/overview/iphone-x/
[uikit]: https://developer.apple.com/documentation/uikit/uiview/positioning_content_relative_to_the_safe_area
[env]: https://github.com/w3c/csswg-drafts/pull/1817
[props]: https://github.com/w3c/csswg-drafts/pull/1819
[math]: https://drafts.csswg.org/css-values/#calc-notation
[invalid]: https://drafts.csswg.org/css-variables/#invalid-variables