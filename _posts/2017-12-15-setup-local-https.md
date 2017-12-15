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

按照以上步骤生成 `server.key` 和 `server.crt`，在 Chrome 中依然报错：

```
Subject Alternative Name missing
The certificate for this site does not contain a Subject Alternative Name extension containing a domain name or IP address.
```

按照 [citrix][self-signed-san] 的方式试试：

创建 openssl 配置文件 `req.conf`

```
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no
[req_distinguished_name]
C = US
ST = VA
L = SomeCity
O = MyCompany
OU = MyDivision
CN = www.company.com
[v3_req]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS.1 = www.company.net
DNS.2 = company.com
DNS.3 = company.net
```

执行如下命令创建证书：

```
openssl req -x509 -nodes -days 730 -newkey rsa:2048 -keyout cert.pem -out cert.pem -config req.conf -extensions 'v3_req'
```

**这个方法是好用的！**热烈推荐！

## 配置 nginx

```
server {
    listen 443 ssl;
    server_name www.example.com;
    ssl_certificate cert.pem;
    ssl_certificate_key cert.pem;
    ...
}
```

服务器证书（`ssl_certificate`）是一个公开文件，每个请求连接的客户端都会收到一份。私有密钥（`ssl_certificate_key`）是加密单元，需要存储在保密的地方，但要确保 nginx 主线程可访问。私有密钥一般和证书存储到同一位置。

`cert.pem` 就是上一个步骤产生的证书和密钥，在一个文件中。

## 配置浏览器

打开 Chrome 的开发者工具下的【security】选项卡，查看当前的证书，然后下载下来，双击添加到操作系统中，修改为始终信任就可以了。

## REF

- [用Nginx实现微信小程序本地SSL请求 - zhihu][wxapp-https], by *罗含章*, 2016/11/14
- [How to create a self-signed SSL Certificate - akadia.com][self-signed-ssl]
- [Chrome: Invalid self signed SSL cert - “Subject Alternative Name Missing” - stackoverflow.com][invalid-ssl-cert]
- [Chrome Deprecates Subject CN Matching][chrome-deprecate-cn], by *Eric Lawrence*, 2017/03/10
- [How to Create a Self-Signed SAN Certificate Using OpenSSL on a NetScaler Appliance - citrix.com][self-signed-san], 2017/09/14 :+1:
- [openssl、x509、crt、cer、key、csr、ssl、tls 这些都是什么鬼?][glossary], by *杨俊明*, 2016/02/03

[wxapp-https]: https://zhuanlan.zhihu.com/p/23640321
[self-signed-ssl]: https://www.akadia.com/services/ssh_test_certificate.html
[config-nginx]: http://nginx.org/en/docs/http/configuring_https_servers.html
[nginx-https-cnblogs]: http://www.cnblogs.com/tintin1926/archive/2012/07/12/2587311.html
[invalid-ssl-cert]: https://stackoverflow.com/questions/43665243/chrome-invalid-self-signed-ssl-cert-subject-alternative-name-missing
[chrome-deprecates-cn]: https://textslashplain.com/2017/03/10/chrome-deprecates-subject-cn-matching/
[create-self-signed-cert]: https://stackoverflow.com/questions/10175812/how-to-create-a-self-signed-certificate-with-openssl/43860138#43860138
[self-signed-san]: https://support.citrix.com/article/CTX135602_
[glossary]: http://www.cnblogs.com/yjmyzz/p/openssl-tutorial.html
[intro-openssl]: https://users.dcc.uchile.cl/~pcamacho/tutorial/crypto/openssl/openssl_intro.html
[secure-programming-ibm]: https://www.ibm.com/developerworks/library/l-openssl/index.html
[openssl-san]: http://liaoph.com/openssl-san/