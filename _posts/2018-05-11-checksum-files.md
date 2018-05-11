---
layout: post
title: 如何校验文件
date: 2018-05-11
---

* TOC
{:toc}

通过网络下载的文件，在传输过程中可能会丢失数据，也可能被恶意注入代码。为了保证下载文件和原始文件一致，网站主人可以提供一些校验文件，供下载者验证真伪。

## MD5 校验

MD5 是一种广泛使用的哈希算法，可以生成 128 位的哈希值。

1991 年 *Ronald Rivest* 发明 MD5，用来代替旧的哈希函数 MD4。MD 代表 Message Digest，即**信息摘要**。

```sh
$ md5 /path/to/file
```

使用 OpenSSL 也可以校验 MD5。

```sh
$ openssl md5 /path/to/file
```

## SHA1 校验

在密码学中，SHA-1（Secure Hash Algorithm 1）是一种加密哈希函数。它可以接收输入，并产生 160 比特（20字节）的哈希值。哈希值通常以十六进制表示，长度为 40 位。

它由美国国家安全局设计，属于一种联邦信息处理标准（Federal Information Processing Standard）。

2005 以后，SHA-1 已被认为不再安全。微软、谷歌、苹果和 Mozilla 等公司均表示，2017 年之前将放弃支持 SHA-1 证书。

```sh
$ shasum -a 1 /path/to/file
```

使用 OpenSSL 校验 SHA1。

```sh
$ openssl sha1 /path/to/file
```

## SHA256 和 SHA512 校验

SHA256 和 SHA512 均属于 SHA-2 算法。与前任 SHA-1 相比，SHA-2 有许多重要改动。

SHA-2 家族包含 6 种哈希函数，分别是 SHA-224, SHA-256, SHA-384, SHA-512, SHA-512/224, SHA-512/256。

```sh
$ shasum -a 256 /path/to/file
$ openssl sha256 /path/to/file

$ shasum -a 512 /path/to/file
$ openssl sha512 /path/to/file
```

## REF

- [How to verify checksum on a Mac - MD5, SHA1, SHA256, etc][checksum]
- [MD5 - wikipedia.org][md5]
- [SHA-1 - wikipedia.org][sha1]

[checksum]: https://www.dyclassroom.com/howto-mac/how-to-verify-checksum-on-a-mac-md5-sha1-sha256-etc
[md5]: https://en.wikipedia.org/wiki/MD5
[sha1]: https://en.wikipedia.org/wiki/SHA-1