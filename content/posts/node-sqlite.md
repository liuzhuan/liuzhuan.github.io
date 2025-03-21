+++
date = '2025-03-05T22:58:29+08:00'
title = '使用 Node.js 内置的 sqlite 模块'
summary = '如何使用 sqlite 模块'
tags = ['node', 'sqlite']
+++

2024 年 7 月 17 日发布的 Node.js [v22.5.0][v22.5.0]，新增 `node:sqlite` 内置模块，试验性原生支持 SQLite 数据库。

截至目前，它还处于积极开发阶段，[API][sqlite-api] 尚未稳定，因此不可用于生产环境，但在个人项目中使用还是挺方便的。

## 导入模块{#import}

```js
// filename: app.mjs
import sqlite from 'node:sqlite';
console.log(sqlite);
```

使用 `--experimental-sqlite` 开启 sqlite 实验特性，才能使用它。

```sh
node --experimental-sqlite app.mjs
```

输出信息如下：

```sh
{
  DatabaseSync: [Function: DatabaseSync],
  StatementSync: [Function: StatementSync],
  SQLITE_CHANGESET_OMIT: 0,
  SQLITE_CHANGESET_REPLACE: 1,
  SQLITE_CHANGESET_ABORT: 2
}
(node:9284) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
```

## 创建数据库连接{#create-connection}

使用 `DatabaseSync` 构造函数创建数据库连接。可以传入文件路径创建文件数据库，也可以传入 `":memory:"` 字符串创建内存数据库。

```js
import { DatabaseSync } from 'node:sqlite';

// create a single connection to an in-memory database
const database = new DatabaseSync(':memory:');

// close a database connection
database.close();
```

## 执行 SQL 语句{#execute-sql}

执行 SQL 语句有两种方式，一种是 `.exec()` 方法，一种是 `.prepare()` 方法。

### exec

`.exec()` 函数只是简单执行传入的 SQL 语句，无法防止 SQL 注入，适合开发者可控的 SQL 语句。另外，`.exec()` 没有返回值。

```js
database.exec(`
  CREATE TABLE data (
    key INTEGER PRIMARY KEY,
    value TEXT
  ) STRICT
`);
```

语句中的 `STRICT` 让数据类型检查更严格，避免隐式类型转换。

`.exec()` 使用场景较少，大部分场景应当使用更安全高效的 `.prepare()` 方法。

### prepare

`.prepare()` 会创建预编译 SQL 语句，可以在多次执行时重复使用，通常用于提高性能和防止 SQL 注入攻击。`.prepare()` 方法使用 `?` 充当数据占位符。

```js
// Create a prepared statement to insert data into database
const insert = database.prepare('INSERT INTO data (key, value) VALUES (?, ?)');

// Execute the prepared statement with bound value
insert.run(1, 'hello');
insert.run(2, 'world');
```

上述代码使用预编译 SQL 语句，向数据库插入两次值。

## 检索数据库{#select}

要检索数据库，可以使用预编译语句的 `.get()` 方法或 `.all()` 方法。`.get()` 返回一个值，`.all()` 以数组的形式返回多个值。

```js
const allStatement = database.prepare('SELECT * FROM data');
console.log(allStatement.all());
// [{key: 1, value: 'hello'}, {key: 2, value: 'world'}]

const getStatement = database.prepare(`SELECT * FROM data WHERE key=?`);
console.log(getStatement.get(1));
// {key: 1, value: 'hello'}
```

完

[v22.5.0]: https://nodejs.org/en/blog/release/v22.5.0
[sqlite-api]: https://nodejs.org/api/sqlite.html