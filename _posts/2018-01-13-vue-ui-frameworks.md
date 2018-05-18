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

通过指定 col 组件的 offset 属性可以指定分栏偏移的栏数

```html
<el-row :gutter="20">
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row :gutter="20">
    <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row :gutter="20">
    <el-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
```

对齐方式

通过 flex 布局来对分栏进行灵活的对齐。

```html
<el-row type="flex" class="row-bg">
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row type="flex" class="row-bg" justify="center">
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row type="flex" class="row-bg" justify="end">
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row type="flex" class="row-bg" justify="space-between">
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row type="flex" class="row-bg" justify="space-around">
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
```

响应式布局

参照 Bootstrap 的响应式设计，预设了五个响应尺寸：xs、sm、md、lg 和 xl。

```html
<el-row :gutter="10">
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col>
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>
```

基于断点的隐藏类

Element 额外提供了一系列类名，用于在某些条件下隐藏元素。如果需要，自行引入以下文件：

```js
import 'element-ui/lib/theme-chalk/display.css'
```

包含的类名及其含义为：

- `hidden-xs-only` - 当视口在 xs 尺寸时隐藏
- `hidden-sm-only` - 当视口在 sm 尺寸时隐藏
- `hidden-sm-and-down` - 当视口在 sm 及以下尺寸时隐藏
- `hidden-sm-and-up` - 当视口在 sm 及以上尺寸时隐藏
- `hidden-md-only` - 当视口在 md 尺寸时隐藏
- `hidden-md-and-down` - 当视口在 md 及以下尺寸时隐藏
- `hidden-md-and-up` - 当视口在 md 及以上尺寸时隐藏
- `hidden-lg-only` - 当视口在 lg 尺寸时隐藏
- `hidden-lg-and-down` - 当视口在 lg 及以下尺寸时隐藏
- `hidden-lg-and-up` - 当视口在 lg 及以上尺寸时隐藏
- `hidden-xl-only` - 当视口在 xl 尺寸时隐藏

### Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构。

`<el-container>`：外层容器。当子元素中包含 `<el-header>` 或 `<el-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<el-header>`：顶栏容器。

`<el-aside>`：侧边栏容器。

`<el-main>`：主要区域容器。

`<el-footer>`：底栏容器。

### Color 色彩

Element 使用一套特定的调色板来规定颜色，为产品提供一致的外观视觉感受。调色板包括的颜色有：

- 主色
- 辅助色 Success, Warning, Danger, Info
- 中性色
    - 主要文字、常规文字、次要文字、占位文字
    - 一级边框、二级边框、三级边框、四级边框

### 字体

```css
font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
```

字体使用规范

| 标题级别   | 字号字重                 |
| --------- | ---------------------- |
| 主标题     | 20px Extra large       |
| 标题       | 18px large             |
| 小标题     | 16px Medium            |
| 正文      | 14px Small             |
| 正文（小） | 13px Extra Small       |
| 辅助文字   | 12px Extra Extra Small |

### Icon 图标

直接通过设置类名为 `el-icon-iconName` 来使用即可。

```html
<i class="el-icon-edit"></i>
<i class="el-icon-share"></i>
<i class="el-icon-delete"></i>
<el-button type="primary" icon="el-icon-search">搜索</el-button>
```

### Button 按钮

使用 `type`、`plain`、`round`、`circle` 属性来定义 Button 的样式。

```html
<el-row>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
</el-row>

<el-row>
    <el-button plain>朴素按钮</el-button>
    <el-button type="primary" plain>主要按钮</el-button>
    <el-button type="success" plain>成功按钮</el-button>
    <el-button type="info" plain>信息按钮</el-button>
    <el-button type="warning" plain>警告按钮</el-button>
    <el-button type="danger" plain>危险按钮</el-button>
</el-row>

<el-row>
    <el-button round>圆角按钮</el-button>
    <el-button type="primary" round>主要按钮</el-button>
    <el-button type="success" round>成功按钮</el-button>
    <el-button type="info" round>信息按钮</el-button>
    <el-button type="warning" round>警告按钮</el-button>
    <el-button type="danger" round>危险按钮</el-button>   
</el-row>

<el-row>
    <el-button icon="el-icon-search" circle></el-button>
    <el-button type="primary" icon="el-icon-edit" circle></el-button>
    <el-button type="success" icon="el-icon-check" circle></el-button>
    <el-button type="info" icon="el-icon-message" circle></el-button>
    <el-button type="warning" icon="el-icon-star-off" circle></el-button>
    <el-button type="danger" icon="el-icon-delete" circle></el-button>
</el-row>
```

禁用状态

```html
<el-row>
    <el-button disabled>默认按钮</el-button>
    <el-button type="primary" disabled>主要按钮</el-button>
    <el-button type="success" disabled>成功按钮</el-button>
    <el-button type="info" disabled>信息按钮</el-button>
    <el-button type="warning" disabled>警告按钮</el-button>
    <el-button type="danger" disabled>危险按钮</el-button>
</el-row>

<el-row>
    <el-button plain disabled>朴素按钮</el-button>
    <el-button type="primary" plain disabled>主要按钮</el-button>
    <el-button type="success" plain disabled>成功按钮</el-button>
    <el-button type="info" plain disabled>信息按钮</el-button>
    <el-button type="warning" plain disabled>警告按钮</el-button>
    <el-button type="danger" plain disabled>危险按钮</el-button>
</el-row>
```

文字按钮

```html
<el-button type="text">文字按钮</el-button>
<el-button type="text" disabled>文字按钮</el-button>
```

图标按钮

```html
<el-button type="primary" icon="el-icon-edit"></el-button>
<el-button type="primary" icon="el-icon-share"></el-button>
<el-button type="primary" icon="el-icon-delete"></el-button>
<el-button type="primary" icon="el-icon-search">搜索</el-button>
<el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
```

按钮组

```html
<el-button-group>
    <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
    <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
</el-button-group>
<el-button-group>
    <el-button type="primary" icon="el-icon-edit"></el-button>
    <el-button type="primary" icon="el-icon-share"></el-button>
    <el-button type="primary" icon="el-icon-delete"></el-button>
</el-button-group>
```

加载中

```html
<el-button type="primary" :loading="true"></el-button>
```

不同尺寸

```html
<el-row>
    <el-button>默认按钮</el-button>
    <el-button size="medium">中等按钮</el-button>
    <el-button size="small">小型按钮</el-button>
    <el-button size="mini">超小按钮</el-button>
</el-row>
<el-row>
    <el-button round>默认按钮</el-button>
    <el-button size="medium" round>中等按钮</el-button>
    <el-button size="small" round>小型按钮</el-button>
    <el-button size="mini" round>超小按钮</el-button>
</el-row>
```

### Radio 单选框

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

```html
<template>
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>
```

禁用状态

```html
<template>
    <el-radio disabled v-model="radio1" label="禁用">备选项</el-radio>
    <el-radio disabled v-model="radio1" label="选中且禁用">备选项</el-radio>
</template>
```

单选框组

```html
<template>
    <el-radio-group v-model="radio2">
        <el-radio :label="3">备选项</el-radio>
        <el-radio :label="6">备选项</el-radio>
        <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
</template>

<script>
    export default {
        data () {
            return {
                radio2: 3
            };
        }
    }
</script>
```

按钮样式

```html
<template>
    <div>
        <el-radio-group v-model="radio3">
            <el-radio-button label="上海"></el-radio-button>
            <el-radio-button label="北京"></el-radio-button>
            <el-radio-button label="广州"></el-radio-button>
            <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
    </div>
    <div style="margin-top: 20px">
        <el-radio-group v-model="radio4" size="medium">
            <el-radio-button label="上海" ></el-radio-button>
            <el-radio-button label="北京"></el-radio-button>
            <el-radio-button label="广州"></el-radio-button>
            <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
    </div>
    <div style="margin-top: 20px">
        <el-radio-group v-model="radio5" size="small">
            <el-radio-button label="上海"></el-radio-button>
            <el-radio-button label="北京" disabled ></el-radio-button>
            <el-radio-button label="广州"></el-radio-button>
            <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
    </div>
    <div style="margin-top: 20px">
        <el-radio-group v-model="radio6" disabled size="mini">
            <el-radio-button label="上海"></el-radio-button>
            <el-radio-button label="北京"></el-radio-button>
            <el-radio-button label="广州"></el-radio-button>
            <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
    </div>
</template>
```

带有边框

```html
<template>
    <div>
        <el-radio v-model="radio7" label="1" border>备选项1</el-radio>
        <el-radio v-model="radio7" label="2" border>备选项2</el-radio>
    </div>
    <div style="margin-top: 20px">
        <el-radio v-model="radio8" label="1" border size="medium">备选项1</el-radio>
        <el-radio v-model="radio8" label="2" border size="medium">备选项2</el-radio>
    </div>
    <div style="margin-top: 20px">
        <el-radio-group v-model="radio9" size="small">
            <el-radio label="1" border>备选项1</el-radio>
            <el-radio label="2" border disabled>备选项2</el-radio>
        </el-radio-group>
    </div>
    <div style="margin-top: 20px">
        <el-radio-group v-model="radio10" size="mini" disabled>
            <el-radio label="1" border>备选项1</el-radio>
            <el-radio label="2" border>备选项2</el-radio>
        </el-radio-group>
    </div>
</template>
```

### Checkbox 多选框

```html
<template>
    <!-- `checked` 为 true 或 false -->
    <el-checkbox v-model="checked">备选项</el-checkbox>
</template>
<script>
    export default {
        data() {
            return {
                checked: true
            };
        }
    };
</script>
```

禁用状态略

多选框组

```html
<template>
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="复选框 A"></el-checkbox>
    <el-checkbox label="复选框 B"></el-checkbox>
    <el-checkbox label="复选框 C"></el-checkbox>
    <el-checkbox label="禁用" disabled></el-checkbox>
    <el-checkbox label="选中且禁用" disabled></el-checkbox>
  </el-checkbox-group>
</template>

<script>
  export default {
    data () {
      return {
        checkList: ['选中且禁用','复选框 A']
      };
    }
  };
</script>
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
