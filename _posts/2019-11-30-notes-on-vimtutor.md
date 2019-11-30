---
layout: post
title: vimtutor 笔记
date: 2019-11-30
---

对于 Vim 新手，一般从 vimtutor 教程入门。以下是教程的要点笔记。


> As you go through this tutor, do not try to memorize, learn by usage.

不要用大脑记忆，要用肌肉记忆。

| KEY | ACTION |
| --- | --- |
| x | 删除一次字符 |
| dw | 删除一个单词 |
| d$ | 从当前位置至行尾，全部删除 |
| p | 将删除的文本粘贴到光标行之后 |
| rx | 将光标处的字符替换为 x |
| ce | 替换单词，直到单词结尾 |
| CTRL-G | 显示光标所在行号和文件状态 |
| G | 跳转到最后一行 |
| number G | 跳转到第 number 行 |
| gg | 跳转到第一行 |
| / | 向前搜索 |
| ? | 向后搜索 |
| n | 搜索下一个 |
| N | 搜索上一个 |
| Ctrl-O | 返回较旧位置 |
| Ctrl-I | 跳转到较新位置 |
| % | 寻找匹配的 ), ], 或 } |
| :s/old/new/g | 使用 'new' 替换 'old' |
| :#,#s/old/new/g | #,# 是行号，替换两行之间的文本 |
| :%s/old/new/g | 全文范围内查找替换 |
| :%s/old/new/gc | 全文范围内查找替换，每次替换前需用户确定 |
| !<cmd> | 执行外部命令 |
| :w FILENAME | 保存文件 |
| v | 开启可视化选择模式 |
| :r FILENAME | 在当前位置插入文件内容 retrieve |
| :r !ls | 插入当前目录下的文件列表 |
| o | 在当前行下方插入一行，并进入插入模式 |
| O | 在当前行上方插入一行，并进入插入模式 |
| R | 进入替换模式 |
| y | 拷贝 |
| :set ic | 忽略大小写 |
| :set noic | 大小写敏感 |
| :set hls | 开启高亮搜索 |
| :set ic | 开启递增搜索 |
| :help | 获取帮助 |
| Ctrl-W Ctrl-W | 在窗口间跳转 |
| :e ~/.vimrc | 编辑 vim 配置文件 |
| :r $VIMRUNTIME/vimrc_example.vim | 插入 vim 配置文件示例 |
| :help vimrc-intro | 查看 vim 配置文件的文档介绍 |
| :set nocp | 进入非兼容模式 |
| Ctrl-D and <TAB> | 自动补全命令 |

> Many commands that change text are made from an operator and a motion.

很多修改文本的命令，通常包含一个操作符和一个动作。常见的动作如下表所示：

| KEY | MOTION |
| --- | --- |
| w | 直到下一个单词开始，不包含它的第一个字符 |
| e | 直到当前单词结尾，包含最后一个字符 |
| $ | 直到行尾，包含最后一个字符 |
