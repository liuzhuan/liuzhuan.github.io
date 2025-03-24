+++
date = '2025-03-24T16:59:49+08:00'
title = '常见的 Promise 并发处理方法'
summary = '你知道 Promise.all(), Promise.race(), Promise.allSettled() 和 Promise.any() 的用法吗？'
tags = ['javascript', 'promise']
+++

[Promise][promise] 对象代表一个未来的值，它有三种状态：

- pending 待定，这是 Promise 的初始状态，它可能成功，也可能失败，前途未卜
- fulfilled 已完成，这是一种成功的状态，此时可以获取值
- rejected 已拒绝，这是一种失败的状态，此时可查看导致失败的原因

无论成功还是失败，Promise 一旦尘埃落定，结果便不可逆转。fulfilled 和 rejected 状态统称为 resolved（已解决的）状态。

![promise status diagram](/images/promise-status.png)

在 JavaScript 中，[Promise 的并发处理][concurrency]指的是同时启动多个 Promise 异步操作，并以某种方式管理它们的结果。Promise 提供了四种静态方法，每个方法的处理策略各不相同。

1. [`Promise.all()`][promise.all] 只要有一个 Promise 失败，则整体立即失败。仅当所有 Promise 都成功时，整体才算成功（大家好才是真的好）
1. [`Promise.race()`][promise.race] 整体的状态取决于第一个 resolved 的 Promise（先入为主）
1. [`Promise.allSettled()`][promise.allsettled] 整体返回所有 Promise 的状态，无论成功还是失败（一视同仁）
1. [`Promise.any()`][promise.any] 只要有一个 Promise 成功，则整体就算成功（好饭不怕晚）

## Promise.all()

`Promise.all()` 是 ES2015 引入的方法。如果顺利的话，它会等待所有 Promise 进入 fulfilled 状态。

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});

// [3, 42, 'foo']
```

但是一旦某个 Promise 失败，则整体立即宣告失败。

```js
const promise1 = Promise.reject(new Error('baz'));
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'foo');
});

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.log('ERR:', err.message);
  });

// ERR: baz
```

## Promise.race()

`Promise.race()` 同样是在 ES2015 引入的方法。它的结果取决于最先进入 resolved 状态的 Promise。

如果最先 resolved 的 Promise 是 fulfilled 状态，那么最终结果也是 fulfilled 状态。

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
});

// two
```

如果第一个 resolved 的 Promise 是 rejected 状态，则结果也是 rejected 状态。

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, new Error('two is error!'));
});

Promise.race([promise1, promise2])
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.error('ERR:', error.message);
  });

// ERR: two is error!
```

## Promise.allSettled()

`Promise.allSettled()` 是 ES2020 引入的方法。它会忠实记录每个 Promise 的状态，无论成功还是失败，平等对待，童叟无欺。

最终值是一个数组，数组元素的 `status` 表示对应的 Promise 是成功（`'fulfilled'`）还是失败（`'rejected'`）。成功 Promise 的 `value` 属性用于储存值，失败 Promise 的 `reason` 属性用于解释失败原因。

![Promise.allSettled() diagram](/images/promise-allsettled.png)

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, new Error('two is error!'));
});

Promise.allSettled([promise1, promise2])
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.error('ERR:', error.message);
  });

// [
//   { status: 'fulfilled', value: 'one' },
//   {
//     status: 'rejected',
//     reason: Error('two is error!'),
//   },
// ];
```

## Promise.any()

`Promise.any()` 出现的最晚，它是 ES2021 引入的方法。顺利的话，它会等待第一个 fulfilled 的 Promise。

注意它和 `Promise.race()` 的差别。如果第一个 resolved 的 Promise 是 rejected 状态，`.race()` 方法会立即接受它，自己也变为 `rejected` 状态。而 `.any()` 方法会再等等，看看后续是否有 fulfilled 状态的 Promise 出现。

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, new Error('two is error!'));
});

Promise.any([promise1, promise2])
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.error('ERR:', error.message);
  });

// one
```

如果很不幸，所有的并发 Promise 都以失败告终，则 `Promise.any()` 也会宣布失败。此时的 `.catch()` 子句捕获到的错误类型是 [`AggregateError`][AggregateError]，它是多个错误对象的合体。

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(reject, 500, new Error('one is error!'));
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, new Error('two is error!'));
});

Promise.any([promise1, promise2])
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.error('ERR:', error.message);
  });

// ERR: All promises were rejected
```

如果你想查看每个具体的错误信息，可以访问 `AggregateError` 的 `errors` 属性，这是一个错误对象的数组。

```js
// ...
Promise.any([promise1, promise2])
  .catch((error) => {
    console.error(error.errors);
  });

// [Error('one is error!'), Error('two is error!')];
```

完

[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[concurrency]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#promise_concurrency
[promise.all]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[promise.race]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
[promise.allsettled]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
[promise.any]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any
[AggregateError]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError