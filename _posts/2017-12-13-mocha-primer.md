---
layout: post
title: Mocha 测试框架入门
date: 2017-12-13
---

Mocha 是一个特性丰富的 JavaScript 测试框架，可以在 Node.js 和浏览器中运行，简化了异步测试。

## 安装

```sh
# 全局安装
npm install --global mocha

# 项目本地安装
npm install --save-dev mocha
```

Mocha v3.0.0+ 需要 npm v2.14.2+ 和 Node.js v4+。

## 起步

```sh
mkdir test
vim test/test.js
```

`test.js` 文件内容如下：

```javascript
var assert = require('assert')
describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            assert.equal([1, 2, 3].indexOf(4), -1)
        })
    })
})
```

设置 `package.json` 的 `scripts` 属性：

```json
"scripts": {
    "test": "mocha"
}
```

```sh
npm test
```

## 断言库

Mocha 允许使用任意断言库，比如：`should.js`, `expect.js`, `chai`, `better-assert`, `unexpected` 等。

什么是断言库？以 [Chai][chai] 为例，它有三种断言类型：`Should`, `Expect` 和 `Assert`，分别如下：

```javascript
// Should
chai.should()
foo.should.be.a('string')
foo.should.equal('bar')
foo.should.have.lengthOf(3)
tea.should.have.property('flavors').with.lengthOf(3)

// Expect
var expect = chai.expect

expect(foo).to.be.a('string')
expect(foo).to.equal('bar')
expect(foo).to.have.lengthOf(3)
expect(tea).to.have.property('flavors').with.lengthOf(3)

// Assert
var assert = chai.assert

assert.typeOf(foo, 'string')
assert.equal(foo, 'bar')
assert.lengthOf(foo, 3)
assert.property(tea, 'flavors')
```

## 异步代码

在 Mocha 中测试异步代码十分简单，只需要在测试完成时执行回调函数即可。只需在 `it()` 中增加一个回调函数（通常命名为 `done`），Mocha 就会死死等待这个函数执行后，才会结束测试。

```javascript
describe('User', function(){
    describe('#save()', function(){
        it('should save without error', function(done){
            var user = new User('Luna')
            user.save(function(err){
                if (err) done(err)
                else done()
            })
        })
    })
})

// 由于 done 可以接受 error 参数，所以上面可以简化 `it` 为
it('should save without error', function(done){
    var user = new User('Luna')
    user.save(done)
})
```

## REF

- [Mocha test framework][mochajs]
- [Chai][chai]

[mochajs]: http://mochajs.org/
[chai]: http://chaijs.com/
[chai-as-promised]: https://www.npmjs.com/package/chai-as-promised