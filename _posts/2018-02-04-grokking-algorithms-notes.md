---
layout: post
title: 图解算法读书笔记
date: 2018-02-04
math: true
---

<img src="/imgs/grokking-algorithms.jpg" class="book-cover">

《图解算法》作者是 *Aditya Y. Bhargava*，内容浅显易懂，他的个人博客 [adit.io][adit] 干货内容不少，有丰富插图，十分有趣。本书在亚马逊有 [kindle 版][amazon]。

本书代码使用 Python 2.7。

以下是读书笔记的内容。

## 1.2 二分查找

比如：登录 Facebook，核实账户是否存在。

对于包含 n 个元素的列表，用二分查找最多需要 $$log_2{n}$$ 步。

仅当列表是有序时，二分查找才管用。

```py
def binary_search(list, item):
    low = 0
    high = len(list) - 1
    
    while low <= high:
        mid = (low + high) / 2
        guess = list[mid]
        
        if guess == item:
            return mid
        if guess > item:
            high = mid - 1
        else:
            low = mid + 1
    return None

my_list = [1, 3, 5, 7, 9]
print binary_search(my_list, 3) # => 1
print binary_search(my_list, -1) # => None
```

### 运行时间

简单查找最多需要猜测的次数与列表长度相同，这被称为**线性时间**（`linear time`）。

二分查找的运行时间为**对数时间**（或 $$log$$ 时间）。

## 1.3 大 $$O$$ 表示法

大 $$O$$ 表示法指出算法有多快。比如，简单查找的运行时间为 $$O(n)$$，二分查找法的运行时间是 $$O(log_2{n})$$。

### 1.3.4 一些常见的大 $$O$$ 运行时间

- $$O(log_2{n})$$ 也称**对数时间**，此类算法包括二分查找。
- $$O(n)$$ 也称**线性时间**，此类算法包括简单查找。
- $$O(n * log_2{n})$$ 此类算法包括快速排序，一种速度较快的排序算法。
- $$O(n^2)$$ 此类算法包括选择排序，一种速度较慢的排序算法。
- $$O(n!)$$ 也称**阶乘时间**，此类算法包括旅行商问题的解决方案，一种非常慢的算法。

## 2.1 内存的工作原理

计算机就像是很多抽屉的集合体，每个抽屉都有地址。

## 2.2 数组和链表

数组添加新元素的速度会很慢。而且必须是排列在一起。数组随机读取效率很高。

链表的每个元素都存储了下一个元素的地址，从而使一系列随机的内存地址串在一起。犹如寻宝游戏。

链表无需移动元素。链表随机读的效率很低，需要从第一个元素开始读取。

常见的数组和链表操作的运行时间如下：

| | 数组 | 链表 |
| --- | --- | --- |
| 读取 | $$O(1)$$ | $$O(n)$$ |
| 插入 | $$O(n)$$ | $$O(1)$$ |
| 删除 | $$O(n)$$ | $$O(1)$$ |

当需要在中间插入元素或删除元素时，链表是更好的选择。

当需要随机访问时，推荐使用数组。

## REF

- [Grokking Algorithms - manning.com][manning]
- [作者个人博客][adit]
- [图解算法 - 亚马逊][amazon]

[manning]: https://www.manning.com/books/grokking-algorithms
[adit]: http://adit.io/
[amazon]: https://www.amazon.cn/dp/B075SWP6LG/ref=sr_1_1?s=books&ie=UTF8&qid=1517739356&sr=1-1