---
layout: post
title: 如何校验文件
date: 2018-05-11
---

* TOC
{:toc}

通过网络下载的文件，在传输过程中可能会丢失数据，也可能被恶意注入代码。为了保证下载文件和原始文件一致，网站主人可以提供一些校验文件，供下载者验证真伪。

## MD5 校验

```sh
$ md5 /path/to/file
```

使用 OpenSSL 也可以校验 MD5。

```sh
$ openssl md5 /path/to/file
```

## SHA1 校验

```sh
$ shasum -a 1 /path/to/file
```

使用 OpenSSL 校验 SHA1。

```sh
$ openssl sha1 /path/to/file
```

## SHA256 和 SHA512 校验

```sh
$ shasum -a 256 /path/to/file
$ openssl sha256 /path/to/file

$ shasum -a 512 /path/to/file
$ openssl sha512 /path/to/file
```

## REF

- [How to verify checksum on a Mac - MD5, SHA1, SHA256, etc][checksum]

[checksum]: https://www.dyclassroom.com/howto-mac/how-to-verify-checksum-on-a-mac-md5-sha1-sha256-etc