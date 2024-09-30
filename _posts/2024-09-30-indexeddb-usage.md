---
layout: post
title: IndexedDB 的用法
date: 2024-09-30 12:16:00 +0800
---

* TOC
{:toc}

[IndexedDB][indexeddb] 是一种大容量客户端存储方案，它可以存储结构化数据，包括 [`File`][file] 和 [`Blob`][blob] 等二进制数据，比如图片、视频等。

`localStorage` 最多存储 5MiB 的容量，IndexedDB 的容量要大得多，但用法也更复杂。

## 核心概念 {#concepts}

IndexedDB 是一种**事务性数据库系统**（transactional database system）。

**事务**（transaction）是一组不可分割的操作序列，这些操作要么全部成功执行，要么全部不执行，以确保数据的完整性和一致性。

**未完待续**

[indexeddb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API "IndexedDB API"
[blob]: "https://developer.mozilla.org/en-US/docs/Web/API/Blob" "Blob"
[file]: https://developer.mozilla.org/en-US/docs/Web/API/File "File"
[structrured-clone]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm "The structured clone algorithm"
[terminology]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Terminology "IndexedDB key characteristics and basic terminology"