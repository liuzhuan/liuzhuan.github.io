---
layout: post
title: Jest 初探
date: 2018-01-19
---

> Jest: Delightful JavaScript Testing

Jest 是 Facebook 出品的测试框架。优势在于设置简单，快速反馈，快照测试，零配置测试框架。

在多个 worker 进程并行运行测试，效率很高；内置代码覆盖率报告，使用 `--coverage` 即可。无需多余设置和库；零配置，当使用 `create-react-app` 或 `react-native init` 创建的项目自带 Jest。将测试用例放置到 `__tests__` 目录，或者将它们后缀命名为 `.spec.js` 或 `.test.js`，Jest 将执行你的测试用例。

此外，还有强悍的 mocking 功能；与 TypeScript 合作愉快。

## 开始使用

安装

```
npm install --save-dev jest
yarn add --dev jest
```

编写业务代码，比如 `sum.js`：

```js
function sum(a, b) {
    return a + b
}
module.exports = sum
```

创建测试用例，比如 `sum.test.js`：

```js
const sum = require('./sum')

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1 + 2)).toBe(3)
})
```

更新 `package.json`，增加测试命令：

```json
{
    "scripts": {
        "test": "jest"
    }
}
```

运行测试用例：

```
npm test
```

**我们刚刚成功执行了第一个测试用例！**

上面测试用例用到了 `expect` 和 `toBe` 测试两个数值是否相等。

如果想进一步了解 Jest 使用详情，请阅读[《Jest 简明教程》][hello-jest]。

## REF

- [Jest - Delightful JavaScript Testing][jest]
- [Getting Started - Jest][started]
- [Using Matchers - Jest][matchers]

[jest]: https://facebook.github.io/jest/
[started]: https://facebook.github.io/jest/docs/en/getting-started.html
[matchers]: https://facebook.github.io/jest/docs/en/using-matchers.html
[kent]: https://github.com/kentcdodds
[hello-jest]: http://1zh.tech/hello-jest