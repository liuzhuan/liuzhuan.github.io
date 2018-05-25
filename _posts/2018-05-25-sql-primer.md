---
layout: post
title: 《SQL 必知必会》读书笔记
date: 2018-05-25
---

* TOC
{:toc}

![book](/assets/sql-primer.jpg)

## 了解 SQL

SQL（Structured Query Language）是一种专门用来与数据库沟通的语言。

数据库（database）是保存有组织的数据的容器。

**表（table）**是一种结构化的文件，用来存储特定类型的数据。**存储在表中的数据是同一种类型的数据或清单**。表有一些特性，描述这些特性的信息称为**模式（schema）**。

表由**列（column）**组成，列存储表中某部分的信息。每个列都有相应的**数据类型（datatype）**，定义了列可以存储哪些数据类型。

**行（row）**是表中的一个记录。

表中每一行都应该有一列（或几列）可以唯一标识自己，这些列称为**主键（primary key）**。

主键必需满足如下条件：

1. 任意两行不可有相同主键
2. 主键不可为 NULL
3. 主键不允许修改或更新
4. 主键值不可重用

标准 SQL 由 ANSI 标准委员会管理，从而称为 **ANSI SQL**。

## 检索数据

`SELECT` 是最简单的 SQL 语句，用来检索数据。

检索单个列

```sql
SELECT prod_name
FROM Product;
```

多条 SQL 语句必需以分号（`;`）分割。**SQL 语句不区分大小写**，但是表名、列名和值有可能会区分。

TODO

## REF

- [SQL 必知必会（第4版）][douban]，by *Ben Forta*，人民邮电出版社，2013/05/01

[douban]: https://book.douban.com/subject/24250054/