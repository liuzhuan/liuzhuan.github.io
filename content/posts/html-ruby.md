+++
date = '2025-03-26T22:02:48+08:00'
title = '在网页中显示汉语拼音'
summary = '使用 `<ruby>` 元素在网页中显示汉语拼音'
tags = ['html']
+++

如果你想在网页中显示汉语拼音，可以使用 [`<ruby>`][ruby] 标签。注意，它和 [Ruby 编程语言][ruby-lang]没有任何关系。

在 `<ruby>` 标签内，使用 `<rt>` 标签包裹汉语拼音，跟在它的目标汉字之后。使用 CSS 可以改变拼音字符的外观样式。

```html
<ruby>帅<rt>shuài</rt></ruby>

<style>
  ruby {
    font-size: 4em;
  }

  rt {
    font-size: 20px;
    color: red;
  }
</style>
```

![html ruby](/images/html-ruby.png)

某些旧浏览器可能不支持 `<ruby>` 标签，为了兼容这些浏览器，可以使用 `<rp>` 标签包裹括号，如下：

```html
<ruby>帅<rp>（</rp><rt>shuài</rt><rp>）</rp></ruby>
```

在不兼容的浏览器中，上面的汉字和拼音会显示为 `帅（shuài）`，也能接受。

一个 `<ruby>` 标签内可以同时显示多个汉字和拼音，只要挨个写好就行。

```html
<ruby>
  帅<rp>(</rp><rt>shuài</rt><rp>)</rp>呆<rp>(</rp><rt>dāi</rt><rp>)</rp>了
</ruby>
```

![html ruby 2](/images/html-ruby-2.png)

当然，把汉语拼音改成英语也是没问题的。

```html
<ruby>
  帅呆<rp>(</rp><rt>handsome</rt><rp>)</rp>了
</ruby>
```

![html ruby 3](/images/html-ruby-3.png)

完

[ruby]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby
[ruby-lang]: https://www.ruby-lang.org/zh_cn/
