---
layout: post
title: 数据结构和算法
date: 2017-12-11
---

著名作者赵岩曾在《C语言点滴》中专门论述过数据结构和算法：

> 如果程序是一个人，正确的数据结构就像是强壮的体格，高效的算法就像是高尚的性格，而语言，只是一件外衣而已。纠结于语言的程序员，就像是只关注外衣是否漂亮的小姑娘。凡是能够流传千古的作品，你会发现都是不穿衣服的。

可见，数据结构和算法的重要性。

文中提到的代码可以[在此下载][code]。

## 数组

数组是一个存储元素的线性集合，元素可以通过索引来任意存取。常用操作如下所示：

```js
// 数组任意位置增加元素
arr.splice(idx, 0, newArr);

// 数组任意位置删除元素
arr.splice(idx, delNum); // => 返回被删除的元素数组

arr.reverse(); // 原地翻转
arr.sort(); // 原地排序，按字符升序排列
arr.sort((num1, num2) => num1 - num2); // 按照数字升序排列

// 迭代器
arr.forEach(item => console.log(item.key))
arr.every(item => item > 0)
arr.some(item => item > 0)
arr.reduce((sum, current) => sum + current); // 累加器
arr.reduceRight((sum, current) => sum + current); // 右侧优先累加器
arr.map(a => b)
arr.filter(item => item > 0)
```

## 列表

列表的抽象数据类型定义

```javascript
listSize
pos
length()
clear()
contains() boolean // 判断是否在列表中
toString()
getElement()
insert(item, index) boolean // 插入元素
append(item) // 增加元素到末尾
remove(item) boolean // 删除指定元素
front()
end()
prev()
next()
currPos()
moveTo()
find(item) int // 判断是否存在某元素
```

## 栈

栈的相关方法和属性

```javascript
push()
pop()
peek()
clear()
top
length
empty
```

实现原理

```js
function Stack() {
    this.dataStore = []
    this.top = 0
    this.push = push
    this.top = top
    this.peek = peek
}

function push(item) {
    this.dataStore[this.top++] = item
}

function pop() {
    return this.dataStore[--this.top]
}

function peek() {
    // when top === 0, return undefined
    return this.dataStore[this.top - 1]
}

function length() {
    return this.top
}

function clear() {
    this.top = 0
}
```

### 栈的应用场景

数制的转换

```javascript
function mulBase(num, base) {
    var s = new Stack();
    do {
        s.push(num%base);
        num = Math.floor(num/=base);
    } while (num > 0);

    var converted = '';
    while (s.length() > 0) {
        converted += s.pop();
    }

    return converted;
}
```

> 用 JavaScript 原生数组也可实现该功能，此处的 `Stack` 便于描述和理解。

判断回文 `isPalindrome(word)`。

递归演示。

## 队列 Queue

队列在队尾插入数据，队首删除数据，是一种先进先出（First-In-First-Out, FIFO）的数据结构。可用于操作系统进程池，打印任务池等。

队列的构造函数代码[见这里][queue-code]。

## REF

- [数据结构与算法JavaScript描述][data-structure-javascript] by *Michael McMillan*

[data-structure-javascript]: https://book.douban.com/subject/25945449/
[code]: https://github.com/liuzhuan/data-structure-algorithm-code
[queue-code]: https://github.com/liuzhuan/data-structure-algorithm-code/blob/master/queue/Queue.js