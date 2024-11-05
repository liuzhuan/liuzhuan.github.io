---
layout: post
title: Java 快速入门
date: 2024-11-05
---

* TOC
{:toc}

推荐通过廖雪峰的《[Java 教程](https://liaoxuefeng.com/books/java/introduction/index.html)》入门。

## 安装 {#install}

可以去 Oracle 官网的 [Java Downloads](https://www.oracle.com/java/technologies/downloads/) 页下载最新的 SDK 23。

macOS 平台的 x64 DMG Installer 体积 228.39MB。官方提供了 sha256 的校验码，在 macOS 可以通过 `shasum` 或 `openssl` 校验：

```sh
shasum -a 256 ~/Downloads/jdk-23_macos-x64_bin.dmg
openssl sha256 ~/Downloads/jdk-23_macos-x64_bin.dmg
```

安装完成后，执行 `java -version` 查看版本信息。

```
java version "23.0.1" 2024-10-15
Java(TM) SE Runtime Environment (build 23.0.1+11-39)
Java HotSpot(TM) 64-Bit Server VM (build 23.0.1+11-39, mixed mode, sharing)
```

## 你好，世界 {#hello-world}

编写 `Hello.java`，内容如下：

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```

执行 `javac Hello.java` 编译代码，生成 `Hello.class` 字节码。

执行 `java Hello` 运行 `Hello` 类。