---
layout: post
title: JS上传文件
date: 2018-02-01
---

HTML 表单的 `<input type="file">` 元素，可以让用户选择文件，并将其放入 POST 数据体内，发送给服务器。使用 XHR2 API，可以使用 JavaScript 动态处理文件上传。

没有 `File()` 构造函数，文件只能由用户选择产生。每个 `<input type="file">` 都有 `files` 属性，类似数组，元素为文件对象。

以下代码使用 POST 方式上传文件：

```javascript
function init() {
    var elts = document.getElementsByTagName('input')
    for (var i = 0; i < elts.length; i++) {
        var input = elts[i]
        if (input.type !== 'file') continue;
        var url = input.getAttribute('data-uploadto')
        if (!url) continue

        input.addEventListener('change', function(){
            var file = this.files[0]
            if (!file) return
            var xhr = new XMLHttpRequest()
            xhr.open('POST', url)
            xhr.send(file)
        }, false)
    }
}
```

File 类型其实是通用类型 `Blob` 的子集。XHR2 允许向 `send()` 函数传递任意的 Blob 对象。Blob 对象的 `type` 属性会当作上传的 `Content-Type` 请求头，如果你没有指定该请求头。

## `multipart/form-data` 请求

若表单即包含上传文件，也包含其他字段，就需要使用一种特殊表单编码，名为 `multipart/form-data`。该编码需要使用一个较长的“边界”字符串，将请求体分隔为多个部分。

XHR2 定义了一种新的 FormData API，使得 multipart 创建更简单。首先，使用 `FormData()` 构造函数生成一个 FormData 对象，然后执行该对象的 `append()` 方法，增加多个部分。最后，将最终的 FormData 传递到 `send()` 方法。`send()` 会创建一个合适的边界字符串，并设置请求头的 `Content-Type` 字段。

实际案例如下：

```javascript
function postFormData(url, data, callback) {
    if (typeof FormData === 'undefined')
        throw new Error('FormData is not implemented')
    var request = new XMLHttpRequest()
    request.open('POST', url)
    request.onreadystatechange = function() {
        if (request.readyState === 4 && callback)
            callback(request)
    }

    var formdata = new FormData()
    for (var name in data) {
        if (!data.hasOwnProperty(name)) continue
        var value = data[name]
        if (typeof value === 'function') continue
        formdata.append(name, value)
    }

    request.send(formdata)
}
```

## HTTP Pregress 事件

To Be Continue...

## REF

- [JavaScript: The Definitive Guide][amazon]

[amazon]: https://www.amazon.com/JavaScript-Definitive-Guide-Activate-Guides-ebook/dp/B004XQX4K0