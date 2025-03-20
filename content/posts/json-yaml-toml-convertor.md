+++
date = '2025-03-20T10:24:59+08:00'
title = 'JSON Yaml Toml 在线转换工具'
summary = '一个基于 CodeMirror 6 的在线格式转换工具'
tags = ['codemirror', 'jsr', 'tailwindcss']
+++

目前最常用的配置文件有 JSON、[YAML][yaml] 和 [TOML][toml]。我对 JSON 比较熟悉，对 YAML 和 TOML 的语法却不是很熟悉，一不小心就会写错。

为了解决这个问题，我编写了一个 [JSON-YAML-TOML 格式在线转换工具][convertor]。它有三个编辑器，输入任一代码格式，会自动同步到其它另外两种格式。

编辑器使用 CodeMirror 6 开发，可以对语法进行校验。如果格式错误，将用红色下划线展示，鼠标移上时，会显示具体的错误信息和位置。

数据会实时保存在本地缓存，所以不用担心关闭浏览器丢失数据。

这个转换工具的技术栈如下：

- CodeMirror 6 代码编辑器
- Tailwind CSS v4
- [JSR][jsr] 开源注册表，使用了其中的两个包：`@std/yaml` 和 `@std/toml`
- Vite 构建工具
- TypeScript 语言
- pnpm 包管理器

开发过程中有一些有意思的点，记录一下。

## JSR 注册表{#jsr}

前端开发常用的库注册表（registry）是 npmjs，而 JSR 是 Deno 团队开发的另一个新的注册表，对 TypeScript 支持更好，而且可以在多个运行时（Node.js、Deno、Bun、Cloudflare Worker 等）使用。

2025 年 2 月 3 日，[JSR 宣布成立开放治理委员会][jsr-open]，首届董事会成员有：

- 尤雨溪：Vue.js 和 Vite 的作者，VoidZero 创始人
- Issac Schlueter：npm 作者，[vlt][vlt] 联合创始人
- James Snell：Node.js TSC 成员，Cloudflare 首席系统工程师
- Luca Casonato：Deno 软件工程师，TC39 代表
- Ryan Dahl：Node.js 和 Deno 的作者

在寻找 YAML 和 TOML 的 JS 解析库时，我发现 npmjs 上的包要么好几年没有更新，要么使用人数很少，无法保证代码质量。

JSR 上提供的 `@std/toml` 和 `@std/yaml` 看上去质量更有保障。`@std` 是 JSR 上的一个命名空间，专门用于存放 Deno 标准库的包。这两个包的安装和使用方式类似，下面仅以 `@std/toml` 为例演示它的用法。

如果想在 Node.js 中使用 JSR 的包，使用 pnpm 包管理器的安装方式如下：

```sh
pnpm dlx jsr add @std/toml
```

下载成功后，在 JS 文件中当作模块引入。

```js
import * as TOML from '@std/toml';

// 解析 TOML 字符串，返回 object 对象
const obj = TOML.parse(tomlStr);

// 把 object 对象转换为 TOML 格式的字符串
const tomlStr = TOML.stringify(obj);
```

## 格式之间的转化{#format-convert}

TOML 和 YAML 之间没有直接转换的方法，但是它们都能转换为 JS 的 object 的对象，因此，把 object 当作中间桥梁，便能在三种数据格式间随意转换。

## 配置 Tailwind CSS 框架{#config-tailwindcss}

2025 年 1 月 22 日发布的 [Tailwind CSS v4][tailwindcss-v4]，配置更简单，构建速度更快。

安装依赖：

```sh
pnpm add tailwindcss @tailwindcss/vite
```

配置 Vite 插件。在 `vite.config.ts` 配置文件中，引入 `@tailwindcss/vite` 插件。

```js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

在 CSS 文件中引入 Tailwind CSS。

```css
@import 'tailwindcss';
```

这样就算配置完了。和 v3 安装和配置 `postcss` 和 `autoprefixer` 相比，流程简化了许多。

## 配置 CodeMirror{#config-codemirror}

为了语法高亮和自动补全，此处使用了 CodeMirror 6 代码编辑器。

```sh
pnpm add codemirror @codemirror/view @codemirror/lang-json @codemirror/lang-yaml
```

创建 CodeMirror 编辑器，使用 JSON 语言扩展：

```js
import { basicSetup } from 'codemirror';
import { EditorView, placeholder } from '@codemirror/view';
import { json } from '@codemirror/lang-json';

const view = new EditorView({
  doc: '',
  parent: document.getElementById('editor-wrapper'),
  extensions: [
    basicSetup,
    EditorView.lineWrapping,
    placeholder('something'),
    json(),
  ],
});
```

### 处理语法报错{#handle-syntax-error}

这三种配置语言都有严格的语法，如果输入错误，会导致解析失败。此时，最好给用户明确的提示。

在 CodeMirror 中，错误提示由 Linter 提供。以 JSON 的语法检测为例，首先要安装对应的模块：

```sh
pnpm add @codemirror/lint
```

然后，创建 Linter 函数。

```ts
import { Diagnostic } from '@codemirror/lint';

export function JsonLinter(view: EditorView) {
  const diagnostics: Diagnostic[] = [];
  const content = view.state.doc.toString();

  try {
    JSON.parse(content);
  } catch (e) {
    if (e instanceof Error) {
      diagnostics.push({
        from: 0,
        to: content.length,
        severity: 'error',
        message: e.message,
      });
    }
  }

  return diagnostics;
}
```

接着，把 JsonLinter 放入扩展数组即可。

```ts
import { linter } from '@codemirror/lint';

const view = new EditorView({
  // ...
  extensions: [linter(JsonLinter)],
});
```

完

[yaml]: https://yaml.org/
[toml]: https://toml.io/en/
[convertor]: https://www.1zh.tech/tools/json-yaml-toml-convertor/
[jsr]: https://jsr.io/
[jsr-open]: https://deno.com/blog/jsr-open-governance-board
[vlt]: https://www.vlt.sh/
[tailwindcss-v4]: https://tailwindcss.com/blog/tailwindcss-v4
