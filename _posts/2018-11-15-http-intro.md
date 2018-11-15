---
layout: post
title: 《图解HTTP》笔记
date: 2018/11/15
---

## HTTP 历史

1996年5月，[RFC1945][rfc1945]正式推出HTTP/1.0。

1997年1月，[RFC2068][rfc2068]推出HTTP/1.1，后来发布新的修订版[RFC2616][rfc2616]。

## 网络基础 TCP/IP

TCP/IP 指与互联网相关联的协议集合。TCP/IP 协议族是分层的。包括如下四层：

| 层级 | 包含的协议 | 作用 |
| --- | --- | --- |
| 应用层 | HTTP, FTP, DNS | |
| 传输层 | TCP, UDP | 提供字节流服务 |
| 网络层 | IP | 传递数据包 |
| 数据链路层 | | 控制硬件 |

IP 间的通信仰仗 MAC 地址。ARP 协议可将 IP 地址反查其对应的 MAC 地址。

> MAC: Media Access Control Address

为了将数据安全送往目的地，TCP 协议使用三次握手策略。

```
client ----- SYN -----> server
client <--- SYN/ACK --- server
client ----- ACK -----> server
```

## REF

- [图解HTTP][book]，（日）上野宣著，于均良译，北京图灵文化发展有限公司，2014年5月1日出版

[book]: http://www.duokan.com/book/103506
[rfc1945]: http://www.ietf.org/rfc/rfc1945.txt
[rfc2068]: http://www.ietf.org/rfc/rfc2068.txt
[rfc2616]: http://www.ietf.org/rfc/rfc2616.txt