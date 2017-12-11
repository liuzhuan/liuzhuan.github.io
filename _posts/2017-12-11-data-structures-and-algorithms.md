---
layout: post
title: 数据结构和算法
date: 2017-12-11
---

著名作者赵岩曾在《C语言点滴》中专门论述过数据结构和算法：

> 如果程序是一个人，正确的数据结构就像是强壮的体格，高效的算法就像是高尚的性格，而语言，只是一件外衣而已。纠结于语言的程序员，就像是只关注外衣是否漂亮的小姑娘。凡是能够流传千古的作品，你会发现都是不穿衣服的。

可见，数据结构和算法的重要性。

## 数组

数组是一个存储元素的线性集合，元素可以通过索引来任意存取。常用操作如下所示：

```js
// 数组任意位置增加元素
arr.splice(idx, 0, newArr);

// 数组任意位置删除元素
arr.splice(idx, delNum);

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

BOOKMARK 2.6 P44

## REF

- [数据结构与算法JavaScript描述][data-structure-javascript] by *Michael McMillan*

[data-structure-javascript]: https://book.douban.com/subject/25945449/