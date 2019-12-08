---
layout: post
title: Sapper Tutorial
date: 2019-12-08
---

* TOC
{:toc}

## What is Sapper?

Sapper is a framework for building extremely high-performance web apps. There are two basic concepts:

1. Each page of your app is a svelte component.
1. You create pages by adding files to the `src/routes` directory of your project. These will be server-rendered so that a user's first visit to your app is as fast as possible, then a client-side app takes over.

In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as **sappers**.

## Why Sapper?

TODO

## How to use Sapper?

The easiest way to start building a Sapper app is as following:

```sh
$ npx degit "sveltejs/sapper-template#rollup" my-app
$ cd my-app
$ npm install
$ npm run dev
```

## REF

1. [Sapper - The next small thing in web development][1]
1. [Sapper: Towards the ideal web app framework][2], by *Rich Harris*, 2017/12/31

[1]: https://sapper.svelte.dev/ "Sapper - The next small thing in web development"
[2]: https://svelte.dev/blog/sapper-towards-the-ideal-web-app-framework
