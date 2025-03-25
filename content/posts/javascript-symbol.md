+++
date = '2025-01-19T14:42:03+08:00'
title = 'Javascript 的 Symbol 符号'
summary = '如何使用 Symbol 表示唯一值'
tags = ['javascript']
+++

## 局部符号 {#local-symbol}

[Symbol][symbol] 是 JavaScript 的一种基本数据类型，用于创建唯一的、不可变的值，通常用作对象属性的键。

```js
const s = Symbol();
typeof s // 'symbol'
```

注意，Symbol 不是构造函数，不能使用 `new` 调用它。

```js
new Symbol()
// TypeError: Symbol is not a constructor
```

使用 `Symbol()` 函数创建的符号，也可以被称作局部符号（local symbol）。

可以为 Symbol 添加描述性文本。但描述性文本相同，并不意味着它们的值也相等。

```js
const s = Symbol('foo')
s // Symbol(foo)

const s1 = Symbol('foo')
const s2 = Symbol('foo')
s1 === s2 // false
```

Symbol 可以当作对象的键，避免意外的键名冲突。记住始终要用方括号包裹 Symbol 键名，否则会被当作字符串键。

```js
const s = Symbol('foo')
const obj = {
  [s]: 'foo',
  s: 'string'
}

obj[s] // 'foo'
obj.s // 'string'
obj['s'] // 'string'
obj[Symbol('foo')] // undefined, each symbol is unique
```

Symbol 也可以当作 Map 的键。

```js
const s = Symbol('foo')
const map = new Map()

map.set(s, 'symbol') // use symbol as key

map.size // 1
map.get(s) // 'symbol'
```

## 全局符号 {#global-symbol}

使用 [`Symbol.for()`][symbol.for] 静态方法，可以在全局 Symbol 注册表（global symbol registry）中创建或获取一个 Symbol 实例，这种实例也叫**全局 Symbol**。

如果注册表已经存在相同描述的 Symbol，则直接返回，否则创建一个新的 Symbol，并注册后返回。

```js
const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
s1 === s2 // true
```

注意，即使拥有相同描述信息，全局 Symbol （global symbol）和局部 Symbol（local symbol）不是一回事。

```js
const s3 = Symbol('foo') // local symbol
const s4 = Symbol.for('foo') // global symbol
s3 === s4 // false
```

使用 [`Symbol.keyFor()`][symbol.keyfor] 可以获取全局 Symbol 的描述文本：

```js
const s = Symbol.for('foo'); // Global symbol
Symbol.keyFor(s); // 'foo'
```

`Symbol.keyFor()` 只能在全局 Symbol 上使用吗？不能在局部 Symbol 上用么？没错。

```js
const s2 = Symbol('foo') // local symbol
Symbol.keyFor(s2) // undefined
```

## 众所周知的符号 {#well-known-symbols}

JS 有一些[众所周知的 Symbol][well-known-symbols]，用于定义对象的行为。比如：

- `Symbol.asyncIterator`：用于实现异步迭代器（async iterator）
- `Symbol.hasInstance`：用于判断实例是否属于某个构造函数，和 `instanceof` 操作符一起使用
- `Symbol.isConcatSpreadable`：布尔值，`Array.prototype.concat()` 会根据此属性判断某个对象是否当作数组对待
- `Symbol.iterator`：定义一个对象的默认迭代器
- `Symbol.match`：定制对象与字符串的匹配行为
- `Symbol.matchAll`：定义对象在调用 `String.prototype.matchAll()` 方法时的行为
- `Symbol.replace`：定义对象在调用 `String.prototype.replace()` 方法时如何进行替换操作
- `Symbol.search`：定义对象在调用 `String.prototype.search()` 时的行为
- `Symbol.species`：定义在创建衍生对象（如子类实例）时所使用的构造函数。由于安全和性能问题，最好不要使用它
- `Symbol.split`：定义对象在调用 `String.prototype.split()` 方法时的行为
- `Symbol.toPrimitive`：定义对象在被强制转换为原始值（如字符串、数字或布尔值）时的行为，允许开发者自定义对象的类型转换逻辑
- `Symbol.toStringTag`：定义对象的默认字符串描述
- `Symbol.unscopables`：用于指定对象中哪些属性不应被 `with` 语句的作用域链访问，从而避免某些属性在 `with` 环境中被意外覆盖或暴露

以 `Symbol.toStringTag` 为例，看看它的作用：

```js
const obj = { name: 'Tony Stark', age: 42 }
obj.toString() // '[object Object]'

obj[Symbol.toStringTag] = '钢铁侠'
obj.toString() // '[object 钢铁侠]'
```

[symbol]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
[symbol.for]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for
[symbol.keyfor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/keyFor
[well-known-symbols]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols