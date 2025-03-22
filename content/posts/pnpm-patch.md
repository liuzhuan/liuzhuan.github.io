+++
date = '2025-03-22T15:33:08+08:00'
title = '为 npm 依赖包打补丁'
summary = '如何使用 pnpm patch 命令修改第三方依赖包的错误？'
tags = ['pnpm']
+++

我们在使用第三方 npm 包时，可能会发现一些 BUG，或者它不满足某些定制需求。我们无法直接修改源代码，也不能修改 `node_modules/` 目录下的文件，因为它们被 git 忽略，无法同步到其他同事机器中。这种情况下，可以使用 pnpm 的[补丁][pnpm-patch]功能。

使用 pnpm 补丁的流程分三个步骤：

1. 创建 npm 包副本
2. 在副本内修复代码
3. 对比原始代码和副本代码，生成补丁文件

下面用一个简单例子展示补丁的使用流程。假设我们在代码中使用了 [`is-even`][is-even] 包。

```sh
pnpm add is-even
```

这个包的功能很简单，就是判断一个数字是否偶数。

```js
// file: main.js
const isEven = require('is-even');
console.log(isEven(42)); //=> true
```

## 创建 npm 包的副本{#create-copy}

使用 `pnpm patch` 命令创建指定 npm 包的副本。

```sh
pnpm patch is-even@1.0.0
```

在输出消息中，可以看到副本的存储位置是一个临时路径。

```sh
Patch: You can now edit the package at:

  /path/to/pnpm-patch-demo/node_modules/.pnpm_patches/is-even@1.0.0

To commit your changes, run:

  pnpm patch-commit '/path/to/pnpm-patch-demo/node_modules/.pnpm_patches/is-even@1.0.0'
```

## 修改副本代码{#edit-copy}

使用代码编辑器修改副本代码，比如增加一行打印文本的代码：

```diff
var isOdd = require('is-odd');

module.exports = function isEven(i) {
+  console.log(`${i} is even or not?`);
  return !isOdd(i);
};
```

## 生成补丁文件{#create-patch}

执行 `pnpm patch-commit` 命令生成补丁文件，该命令的参数是副本代码所在的临时目录。

```sh
pnpm patch-commit '/path/to/pnpm-patch-demo/node_modules/.pnpm_patches/is-even@1.0.0'
```

执行完上述命令，pnpm 会自动创建补丁文件 `patches/is-even@1.0.0.patch`。内容如下：

```diff
diff --git a/index.js b/index.js
index 832d92223a9ec491364ee10dcbe3ad495446ab80..b12f66c0a1d373c52ea8765dafcac2ea344c0e5b 100644
--- a/index.js
+++ b/index.js
@@ -10,5 +10,6 @@
 var isOdd = require('is-odd');
 
 module.exports = function isEven(i) {
+  console.log(`${i} is even or not?`);
   return !isOdd(i);
 };
```

另外，`package.json` 中会多出一个字段 `pnpm.patchedDependencies`，其中包含补丁文件的目标模块和文件路径。

```json
{
    "pnpm": {
        "patchedDependencies": {
            "is-even@1.0.0": "patches/is-even@1.0.0.patch"
        }
    }
}
```

同时，版本锁定文件 `pnpm-lock.yaml` 中也会有相应的补丁信息。

把补丁文件、`package.json` 和 `pnpm-lock.yaml` 推送到远程仓库，其他人拉取代码后，就能使用你为第三方包提交的补丁。

如果你想查看 pnpm 补丁的具体代码，可以参见这个仓库：https://github.com/liuzhuan/pnpm-patch-demo

[pnpm-patch]: https://pnpm.io/cli/patch "pnpm patch <pkg>"
[is-even]: https://www.npmjs.com/package/is-even "is-even npm package"