+++
date = '2025-03-26T13:56:05+08:00'
title = 'Html 的 Details 元素'
summary = '使用 `<details>` 和 `<summary>` 实现可折叠的交互式组件'
tags = ['html']
+++

如果你想创建一个可折叠的交互式组件，使用 `<details>` 元素即可，一行 JavaScript 也不用写。

![HTML details element](/images/html-details.png)

`<details>` 组件定义了一个可折叠的容器，它的第一个元素必须是 `<summary>` 元素，代表标题，用户点击它可以控制区域的显示和隐藏。后面的元素随便写，它们会出现在打开的面板中。

```html
<details>
  <summary>我是标题</summary>
  <p>
    我是具体的内容，我是第一段。
  </p>
</details>
```

如果你想让 `<details>` 默认打开，添加 `open` 属性。

```html
<details open>
  <summary>我是标题</summary>
  <p>
    我是具体的内容，我是第一段。
  </p>
</details>
```

如果把多个 `<details>` 放在一起，并且给它们设置相同的 `name` 属性，就可以形成联动效果。点击其中一个，其余面板自动关闭。

```html
<details open name="demo">
  <summary>我是标题 1</summary>
  <p>
    我是具体的内容，我是第一段。
  </p>
</details>

<details name="demo">
  <summary>我是标题 2</summary>
  <p>
    我是具体的内容，我是第二段。
  </p>
</details>

<details name="demo">
  <summary>我是标题 3</summary>
  <p>
    我是具体的内容，我是第三段。
  </p>
</details>
```

默认样式比较简陋，使用 CSS 给它们化化妆。

```css
details {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 10px;
  border-radius: 10px;
  overflow: hidden;
}

summary {
  cursor: pointer;
}

details[open] {
  padding: 0;
}

details[open] summary {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  background: skyblue;
}

details > p {
  padding: 10px;
}
```

![HTML Details Gif](/images/html-details.gif)

[details]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details