---
layout: post
title: 如何设置本地 HTTPS 开发环境（基于nginx）
---

## 生成自签名 SSL 证书

```sh
# 1. 生成 Private Key
openssl genrsa -des3 -out server.key 1024

# 2. 生成CSR (Certificate Signing Request) 
openssl req -new -key server.key -out server.csr
# 然后根据提示依次输入信息，域名不要填错

# 3. 移除 Passphrase
cp server.key http://server.key.org
openssl rsa -in http://server.key.org -out server.key 

# 4.生成自签名证书
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

# 完成了以上4步后，将 server.crt 和 server.key 移到你想要存放证书的地方。
```

## 配置 nginx

```
server {
    listen 443 ssl;
    server_name www.example.com;
    ssl_certificate www.example.com.crt;
    ssl_certificate_key www.example.com.key;
    ...
}
```

服务器证书（`ssl_certificate`）是一个公开文件，每个请求连接的客户端都会收到一份。私有密钥（`ssl_certificate_key`）是加密单元，需要存储在保密的地方，但要确保 nginx 主线程可访问。私有密钥一般和证书存储到同一位置。

## REF

- [用Nginx实现微信小程序本地SSL请求 - zhihu][wxapp-https], by *罗含章*, 2016/11/14
- [How to create a self-signed SSL Certificate - akadia.com][self-signed-ssl]

[wxapp-https]: https://zhuanlan.zhihu.com/p/23640321
[self-signed-ssl]: https://www.akadia.com/services/ssh_test_certificate.html
[config-nginx]: http://nginx.org/en/docs/http/configuring_https_servers.html
[nginx-https-cnblogs]: http://www.cnblogs.com/tintin1926/archive/2012/07/12/2587311.html