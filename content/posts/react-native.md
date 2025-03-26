+++
date = '2025-03-26T12:42:57+08:00'
draft = true
title = 'React Native'
summary = 'React Native 的基本用法'
tags = ['react native', 'react']
+++

2015 年 Meta 公司发布 [React Native][reactnative]，它可以让开发者使用 React 前端框架开发安卓、iOS 等原生应用。

```jsx
function HomeScreen() {
  return (
    <View>
      <Text>Hello World 🖐️ 🌍!</Text>
    </View>
  )
}
```

使用 JavaScript 编写的应用，会被 React Native 渲染为原生代码。

React Native 只专注视图层，不包含路由管理、平台 API 等其他功能。为了构建完整的 App，官方推荐使用 [Expo][expo] 框架。Expo 框架提供了基于文件的路由，可以使用任意库、SDK 或原生代码。

2024 年 10 月 23 日，React Native 0.76 使用了[全新架构][new-arch]。新架构对 React 特性支持度更好，包括 [Suspense][suspense], [Transitions][transitions], [自动批处理][auto-batch]和 [`useLayoutEffect`][useLayoutEffect] 等。新架构还包括 [Native Module][native-modules] 和 [Native Components][native-components] 系统，无需桥接，直接访问原生接口。

## 使用 Expo 创建新项目 {#expo-new-project}

官方推荐的创建 Expo 项目命令是 `npx create-expo-app@latest`，我实际使用的体验是这个安装速度太慢，不如换成 `pnpm create expo`。

下一步是[设置本地开发环境][setup-env]。Expo Go 是一个沙箱应用，适合快速尝试 Expo。

下载 Expo Go App，

## 启动开发服务器 {#start-dev-server}

执行如下命令启动开发服务器：

```sh
npx expo start
```

[reactnative]: https://reactnative.dev/
[expo]: https://expo.dev/
[new-arch]: https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here
[suspense]: https://react.dev/blog/2022/03/29/react-v18#new-suspense-features
[transitions]: https://react.dev/blog/2022/03/29/react-v18#new-feature-transitions
[auto-batch]: https://react.dev/blog/2022/03/29/react-v18#new-feature-automatic-batching
[useLayoutEffect]: https://react.dev/reference/react/useLayoutEffect
[native-modules]: https://reactnative.dev/docs/next/turbo-native-modules-introduction
[native-components]: https://reactnative.dev/docs/next/fabric-native-components-introduction
[setup-env]: https://docs.expo.dev/get-started/set-up-your-environment
