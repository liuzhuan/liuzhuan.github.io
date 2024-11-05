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

## 变量 {#var}

变量分为基本类型和引用类型。

基本类型包括：

- 整数：byte, short, int, long
- 浮点数：float, double
- 字符：char
- 布尔：boolean

不同类型占据的内存大小：

- short = 2 bytes, int = 4 bytes, long = 8 bytes
- float = 4 bytes, double = 8 bytes
- char = 2 bytes

```java
int x = 1;
x = 42; // 变量可以重新赋值

long n1 = 9000000000000L; // long 型需要增加 L 结尾

float f1 = 3.14f;
float f3 = 1.0; // 错误：不带 f 后缀的是 double 类型，不能赋值给 float

boolean b1 = true;
boolean b2 = false;
int age = 12;
boolean isAdult = age >= 18;

char a = 'A'; // char 用单引号表示
char zh = '中';
```

Java 只有带符号的整型。

除了基本类型，剩下的都是引用类型，比如字符串 `String`。

```java
String s = "hello";
```

### 常量 {#final}

使用 `final` 修饰符，变量就变成了常量。

```java
final double PI = 3.14; // 定义一个常量
PI = 300; // ERROR: 常量不可修改
```

为了和变量区分，常量名通常全部大写。

### var 关键字 {#var-keyword}

为了简写类型名称，可以使用 `var` 关键字：

```java
var sb = new StringBuilder();

// 相当于以下语句：
StringBuilder sb = new StringBuilder();
```

### 数组类型 {#array}

使用 `Type[]` 创建数组。数组一旦创建，大小不可变化。

```java
int[] ns = new int[5];
ns[0] = 68;

int[] ns = new int[] { 68, 79, 91, 85, 62 }; // 使用数值填充数组
int[] ns = { 68, 79, 91, 85, 62 }; // 进一步简写

ns.length; // 访问数组的长度
```

## 流程控制 {#flow-control}

[输入和输出](https://liaoxuefeng.com/books/java/quick-start/flow/input-output/index.html)