---
layout: post
title: Svelte 指南
date: 2019/11/24
---

* TOC
{:toc}

Svelte 是一个 UI 框架，作者是 Rich Harris。他还发明了 [Rollup][4] 和 [Bublé][3] 等工具。

Svelte 与其他主流 UI 框架（React, Vue, Angular）最大的不同在于，它的运行时很小。组件在编译期间转换为原生 JS 代码。因此最终的应用体积很小，速度很快。

目前最新的版本是 [Svelte 3][6]。

## 语法

学习 Svelte 语法的最佳去处是 [Svelte Tutorial][7]。这是一个交互式的练习场，有许多循序渐进的小练习。如果想在本地开发，可以使用 [degit][9]。具体命令如下：

```sh
$ npx degit sveltejs/template my-svelte-project
$ cd my-svelte-project
$ npm install
$ npm run dev
```

### 基础

Svelte 组件后缀是 `.svelte` ，其中可以包含任意合法的 HTML 片段。比如：

```html
<h1>Hello World!</h1>
```

状态

```html
<script>
    let name = 'world';
</script>

<h1>Hello, {name}!</h1>
<h2>Hello, {name.toUpperCase()}!</h2>
```

动态属性

```html
<script>
    let src = 'tutorial/image.gif';
</script>

<img src={src} alt="A man dances.">
```

如果属性名和属性值一样，可以使用如下简写形式：

```html
<img {src} alt="A man dances.">
```

样式

```html
<style>
p {
    color: purple;
}
</style>

<p>This is a paragraph.</p>
```

注意，这些样式默认是局部有效，不会影响其他组件。

嵌套组件

```html
<script>
    import Nested from './Nested.svelte';
</script>

<p>This is a paragraph</p>
<Nested />
```

HTML 标记

使用特殊标记 `{@html ...}` 引入 HTML 标记。

```html
<p>{@html string}</p>
```

创建应用

```js
import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        answer: 42,
    },
});
```

如果想在本地基于 Rollup 开发 Svelte，可以使用 [`rollup-plugin-svelte`][8] 插件。

### Reactivity

赋值

```html
<button on:click={handleClick}>
    Click {count} times.
</button>

<script>
    let count = 0;
    function handleClick() {
        count += 1;
    }
</script>
```

声明

该声明作用类似 Vue.js 中的计算属性。

```html
<script>
    let count = 0;
    $: doubled = count * 2;
</script>
```

语句

```html
<script>
    let count = 0;
    $: console.log(`the count is ${count}.`);
    $: {
        console.log(`the count is ${count}.`);
        alert(`I SAID THE COUNT IS ${count}.`);
    }
    $: if (count >= 10) {
        alert(`count is dangerously high!`);
        count = 9;
    }
</script>
```

更新数组和对象

由于 Svelte 的 reactivity 是通过赋值触发的，数组方法 `push` 和 `splice` 无法自动更新页面数据。

惯用的解决方法如下：

```js
function addNumber() {
    numbers = [...numbers, numbers.length + 1];
}
```

### 属性

使用 `export` 关键字，可以声明属性。

```html
<!-- Nested.svelte -->
<script>
    export let answer;
</script>

<p>The answer is {answer}</p>

<!-- App.svelte -->
<script>
    import Nested from './Nested.svelte';
</script>

<Nested answer={42} />
```

指定默认属性很简单：

```js
export let answer = 'a mystery';
```

如果你有一个属性对象，可以将它在组件中展开。这样就不必依次指定各个属性。

```html
<!-- Info.svelte -->
<script>
export let name;
export let version;
</script>

{name}: {version}

<!-- App.svelte -->
<script>
import Info from './Info.svelte';
const pkg = {
    name: 'svelte',
    version: 3,
}
</script>

<Info {...pkg} />
```

### 逻辑

if 块

```html
{#if user.loggedIn}
    <button on:click={toggle}>
        Logout
    </button>
{/if}
```

else 块

```html
{#if user.loggedIn}
    ...
{:else}
    ...
{/if}
```

在 Svelte 中，`#` 表示开始，`/` 表示结束，`:` 表示中间环节。

`else if` 块

```html
{#if x > 10}
    ...
{:else if 5 > x}
    ...
{:else}
    ...
{/if}
```

Each 块

```html
{#each cats as cat}
    <li>{cat.name}</li>
{/each}

{#each cats as cat, i}
    <li>{i+1}. {cat.name}</li>
{/each}

{#each cats as {id, name}}
    <li>{id+1}. {name}</li>
{/each}
```

指定键值

```html
{#each things as thing (thing.id)}
    <Thing current={thing.color} />
{/each}
```

[Await blocks](https://svelte.dev/tutorial/await-blocks)

## REF

1. [Svelte - Cybernetically enhanced web apps][5]
1. [如何看待 svelte 这个前端框架？ - 知乎][1]，尤雨溪，2019/10/16
1. [Interview with Rich Harris][2], by *Juho Vepsäläinen*, 2016/12/07
1. [Svelte Tutorial][7]

[1]: https://www.zhihu.com/question/53150351/answer/133912199 "如何看待 svelte 这个前端框架？ - 知乎"
[2]: https://survivejs.com/blog/svelte-interview/ "Svelte - The magical disappearing UI framework - Interview with Rich Harris"
[3]: https://buble.surge.sh "Bublé"
[4]: https://rollupjs.org/guide/en/ "rollup.js"
[5]: https://svelte.dev/ "Svelte"
[6]: https://svelte.dev/blog/svelte-3-rethinking-reactivity "Svelte 3: Rethinking reactivity"
[7]: https://svelte.dev/tutorial/basics "Svelte Tutorial"
[8]: https://github.com/rollup/rollup-plugin-svelte "rollup-plugin-svelte"
[9]: https://github.com/Rich-Harris/degit "Straightforward project scaffolding"
