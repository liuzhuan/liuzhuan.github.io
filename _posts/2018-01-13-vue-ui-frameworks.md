---
layout: post
title: Vue 系 UI 框架总结
date: 2018-01-13
---

* TOC
  {:toc}

前端开发，UI 先行。目前 Vue 系 UI 框架很多，知名的有 vux, element, mint 等。本文略作比较。

## Vux

Vux 是基于 WeUI 和 Vue(2.x) 开发的移动端 UI 组件库，主要服务于微信页面。

> Vux 并不是大团队维护的项目，没有捐赠，纯靠热情，维护者有权决定什么时候处理什么问题，什么问题不处理。入坑请万分谨慎。

## Element

Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。来自饿了么前端团队。

### 安装

npm 安装

```sh
$ npm i element-ui -S
```

或者，CDN 引用:

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
```

使用线上版本的 hello world 如下：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <!-- import CSS -->
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
</head>

<body>
    <div id="app">
        <el-button @click="visible = true">Button</el-button>
        <el-dialog :visible.sync="visible" title="Hello world">
            <p>Try Element</p>
        </el-dialog>
    </div>
</body>

<!-- import Vue before Element -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- import JavaScript -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>

<script>
new Vue({
    el: '#app',
    data: function() {
        return { visible: false }
    }
})
</script>
</html>
```

### 引入

若要完整引入，可以在 `main.js` 中写入以下内容：

```js
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";

Vue.use(ElementUI);

new Vue({
  el: "#app",
  render: h => h(App)
});
```

需要注意的是，样式文件需要单独引入。

借助 `babel-plugin-component`，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 `babel-plugin-component`：

```sh
$ npm install babel-plugin-component -D
```

然后，修改 `.babelrc`：

```json
{
    "presets": [["es2015", { "modules": false }]],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}
```

如果只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```js
import Vue from 'vue'
import { Button, Select } from 'element-ui'
import App from './App.vue'

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)

/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
    el: '#app',
    render: h => h(App)
})
```

完整的组件列表以 [components.json](https://github.com/ElemeFE/element/blob/master/components.json) 为准。完整引入方式如下：

```js
import Vue from 'vue';
import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui';

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
```

### 国际化

若需要多语言设置，需要在 `main.js` 中：

```js
// 完整引入 Element
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })
```

或

```js
// 按需引入 Element
import Vue from 'vue'
import { Button, Select } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// 设置语言
locale.use(lang)

// 引入组件
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
```

如果使用其它语言，默认情况下中文语言包依旧是被引入的，可以使用 webpack 的 `NormalModuleReplacementPlugin` 替换默认语言包。

```js
{
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/en')
    ]
}
```

### 内置过渡动画

fade 淡入淡出

```html
<transition name="el-fade-in-linear">
    <div v-show="show" class="transition-box">.el-fade-in-linear</div>
</transition>
<transition name="el-fade-in">
    <div v-show="show" class="transition-box">.el-fade-in</div>
</transition>
```

zoom 缩放

```html
<transition name="el-zoom-in-center">
    <div v-show="show2" class="transition-box">.el-zoom-in-center</div>
</transition>

<transition name="el-zoom-in-top">
    <div v-show="show2" class="transition-box">.el-zoom-in-top</div>
</transition>

<transition name="el-zoom-in-bottom">
    <div v-show="show2" class="transition-box">.el-zoom-in-bottom</div>
</transition>
```

collapse 展开折叠

```html
<el-collapse-transition>
    <div v-show="show3">
        <div class="transition-box">el-collapse-transition</div>
        <div class="transition-box">el-collapse-transition</div>
    </div>
</el-collapse-transition>
```

按需引入

```js
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import Vue from 'vue'

Vue.component(CollapseTransition.name, CollapseTransition)
```

### Layout

通过基础的 24 分栏，迅速简便地创建布局。

基础布局

通过 `row` 和 `col` 组件，并通过 `col` 组件的 `span` 属性我们就可以自由地组合布局。

```html
<el-row>
    <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
<el-row>
    <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>
```

分栏间隔

Row 组件提供 `gutter` 属性来指定每一栏之间的间隔，默认间隔是 0.

```html
<el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
```

分栏偏移

```html
```

TODO
 
## Mint-UI

Mint UI，基于 Vue.js 的移动端组件，同样来自饿了么前端团队。

## [Cube UI](https://didi.github.io/cube-ui/#/zh-CN)

> 基于 Vue.js 实现的精致移动端组件库

未完待续。。。

## REF

* [vux][vux]
  * [vux on github][vux.github]
* [element][eleme]
  * [element on github][eleme.github]
* [mint-ui][mint]
  * [mint on github][mint.github]
* [vue-carbon][carbon]
* [muse-ui][muse]
* [N3-componenets][n3]
* [awesome-vue][awesome]
* [Cube UI][cube-ui]

[mint.github]: https://github.com/ElemeFE/mint-ui
[mint]: http://mint-ui.github.io/#!/zh-cn
[eleme.github]: https://github.com/ElemeFE/element
[eleme]: http://element-cn.eleme.io/#/zh-CN
[carbon]: https://github.com/myronliu347/vue-carbon
[muse]: https://github.com/museui/muse-ui
[n3]: https://github.com/N3-components/N3-components
[awesome]: https://github.com/vuejs/awesome-vue
[vux]: https://vux.li/#/
[vux.github]: https://github.com/airyland/vux
[cube-ui]: https://github.com/didi/cube-ui
