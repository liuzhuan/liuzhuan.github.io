---
layout: post
title: pygame 入门
date: 2024-09-27
---

* TOC
{:toc}

[pygame][pygame] 是一个基于 [SDL][sdl] 的 python 游戏框架，使用它可以制作二维游戏和多媒体应用。

目前的最新版本是 [2.6.0][2.6.0]，发布于 2024 年 6 月 25 日。安装命令如下：

```bash
# 复杂形式
$ python3 -m pip install -U pygame==2.6.0

# 简单形式
$ pip3 install pygame
```

pygame 附赠了许多游戏例子，路径位于 `pygame/examples` 中。如果想验证安装是否正常，可以执行如下代码，这会启动一个外星人入侵的小游戏：

```bash
$ python3 -m pygame.examples.aliens
```

## 基本概念 {#concepts}

- **Surface**（表面）：[Surface][surface] 是绘制图像的二维平面。使用 `pygame.display.set_mode(size)` 创建的 `Surface` 是游戏主窗口
- **Rect**（矩形）：[Rect][rect] 表示二维矩形，游戏元素的定位、碰撞检测都离不开它
- **Sprite**（精灵）：[Sprite][sprite] 表示位置可以变化的游戏元素
- **Group**（群组）：[Group][group] 是 `Sprite` 的容器，方便批量管理和渲染多个 `Sprite`
- **帧率**：指的是每秒播放多少帧，帧率越快，画面越平滑，同时也更加消耗 CPU。通常游戏的帧率设定为 60fps。在 pygame 中，使用 [pygame.time.Clock][clock] 实例控制帧率

## 游戏主循环 {#main-loop}

pygame 游戏的基本框架包括初始化和游戏主循环，主要的游戏逻辑在主循环中定义。

```python
import pygame

# 初始化所有模块
pygame.init()
# 设定窗口尺寸
screen = pygame.display.set_mode((1280, 720))
# 创建计时器，用于限定帧率
clock = pygame.time.Clock()
running = True

while running:
    # 监听事件
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill('purple')

    # Render your game here

    # 更新屏幕画面
    pygame.display.flip()

    clock.tick(60) # 限制帧率为 60fps

# 卸载所有模块
pygame.quit()
```

## 颜色 {#color}

使用 [`pygame.Color`][color] 类定义颜色。颜色可以只包含 RGB 三原色，也可以包含 RGBA，其中 A 表示透明度 alpha。每个通道的取值范围都是 `[0, 255]`。

```python
red = pygame.Color(255, 0, 0)
```

另外，pygame 还提供了[命名颜色][named-colors]（named colors），比如 `white`、`black`、`aqua`、`azure` 等常见颜色。

## 绘制图形 {#draw}

[`pygame.draw`][pygame.draw] 模块提供了绘制基本几何图形的功能。比如：

- `line(surface, color, start_pos, end_pos, width=1)` 绘制直线
- `aaline(surface, color, start_pos, end_pos)` 绘制抗锯齿的直线
- `lines(surface, color, closed, points)` 绘制折线
- `aalines(surface, color, closed, points)` 绘制抗锯齿的折线
- `rect(surface, color, rect)` 绘制矩形
- `polygon(surface, color, points)` 绘制多边形
- `circle(surface, color, center, radius)` 绘制圆形
- `ellipse(surface, color, rect)` 绘制椭圆
- `arc(surface, color, rect, start_angle, stop_angle)` 绘制椭圆圆弧，角度单位是弧度

## 加载图像 {#image}

使用 [`pygame.image.load()`][image.load] 加载图像素材。返回值是 [Surface][surface] 类型。

默认情况下，pygame 至少支持 `.bmp` 图片格式。如果 [`pygame.image.get_extended()`][get_extended] 返回值为 `True`，则表示可以加载更多图像格式，比如 `.jpg`, `.png`, `.gif` 等。

```python
if not pygame.image.get_extended():
    raise SystemExit('Sorry, extended image module required')

def load_image(file):
    try:
        surface = pygame.image.load(file)
    except pygame.error:
        raise SystemExit(f'Could not load image "{file}" {pygame.get_error()}')

    return surface.convert()
```

上面的 [`convert()`][convert] 函数用于转换图像的**像素格式**（*pixel format*），也就是把图像文件的原始格式转换为 Surface 支持的格式。提前转换像素格式，可以提高应用性能。对于包含透明度通道的图像格式，如 `.png` 等，可以使用 [`convert_alpha()`][convert_alpha] 函数。

图像加载完毕，使用 [`Surface.blit()`][surface.blit] 将其绘制到屏幕上。

```python
screen = pygame.display.set_mode((550, 400))

ship = load_image('ship.png')
ship_rect = ship.get_rect()

while True:
    # ...
    screen.blit(ship, ship_rect) # 绘制图像
```

## 绘制文本 {#font}

绘制文本需要使用 [`pygame.font`][pygame.font] 模块。

绘制文本前先创建字体。创建字体有两种办法，一种从系统字体中创建，一种从字体文件中创建。

### 系统字体 {#sysfont}

首先使用 `pygame.font.SysFont(name, size) -> Font` 从系统字体中创建字体对象。

然后，使用 `Font.render(text, antialias, color, background=None) -> Surface` 将文字渲染为 Surface 表面。

最后，使用 `screen.blit(surface, rect)` 绘制到屏幕。

```python
font = pygame.font.SysFont('verdana', 48)
text = font.render('Hello, Font!', True, 'red', 'green')
screen.blit(text, text.get_rect())
```

如果想显示中文，需要使用中文字体。执行 `pygame.font.get_fonts()` 可以查看所有字体。

### 字体文件 {#fontfile}

使用 [`pygame.font.Font()`](https://www.pygame.org/docs/ref/font.html#pygame.font.Font "pygame.font.Font") 函数从字体文件中创建字体。

```python
font = pygame.font.Font('lxgw.ttf', 48)
text = font.render('得分', True, 'red')
screen.blit(text, text.get_rect())
```

## sprite 模块 {#sprite-module}

pygame 1.3 引入的 [`pygame.sprite`][sprite] 模块，用于处理移动的游戏物体。它包含两个主要的类：`Sprite` 和 `Group`。

### Sprite

使用 `Sprite` 的做法一般是：

1. 创建自定义类，使其继承 `Sprite` 类
2. 在自定义构造函数中定义两个属性：`image`（精灵的外观）和 `rect`（精灵的位置）
3. 覆盖父类方法 `update()`，改变精灵外观或位置

```python
from pygame import Sprite

class Alien(Sprite):
    def __init__(self, *group):
        super().__init__(*group)
        self.image = load_image('images/alien.png')
        self.rect = self.image.get_rect()

    def update(self):
        # 每次更新，垂直向下移动一个像素
        self.rect.move_ip(0, 1)
```

`Sprite` 的常用方法包括：

- `update()` 控制精灵外观的更新方法，需要在子类中覆盖。当执行 `Group.update()` 时，群组内所有精灵的 `update()` 方法均会被自动调用
- `add(*groups)` 添加精灵至指定群组
- `remove(*groups)` 从群组中移除精灵
- `kill()` 从所有群组中移除精灵
- `alive() -> bool` 判断精灵是否属于任何群组
- `groups() -> group_list` 返回所有包含此精灵的群组

### Group

`Group` 类用于容纳和渲染 `Sprite`，它的常用方法有：

- `add(*sprites)` 在当前群组添加多个 `Sprite` 实例
- `remove(*sprites)` 移除多个 `Sprite` 实例
- `update()` 会调用群组内的所有 `Sprite` 实例的 `update()` 方法
- `draw(surface)` 在 `surface` 表面绘制群组内所有精灵，使用 `Sprite` 的 `image` 和 `rect` 当作外观和位置

```python
import pygame
from pygame.sprite import Sprite, Group

pygame.init()
screen = pygame.display.set_mode((550, 400))
clock = pygame.time.Clock()

aliens = Group() # 新建 Group 群组

# 向群组添加 10 个 Sprite
for i in range(10):
    new_alien = Alien()
    new_alien.rect.move_ip(i * 60, 0)
    aliens.add(new_alien)

# 游戏主循环
while True:
    # ...

    aliens.update() # 更新所有 Sprite 的外观和位置信息
    aliens.draw(screen) # 渲染所有的 Sprite

    pygame.display.flip() # 重绘整个画面
    clock.tick(60)
```

### 碰撞检测 {#collision-detection}

碰撞检测是 sprite 模块提供的一个重要功能。主要函数如下：

- `spritecollide(sprite, group, dokill) -> Sprite_list` 检测精灵和群组是否发生碰撞，返回值是和精灵碰撞的群组内精灵组成的列表。`dokill` 是布尔值，如果为 `True`，发生碰撞的精灵会从群组中移除
- `spritecollideany(sprite, group) -> Sprite` 测试精灵是否和群组发生碰撞，比 `spritecollide()` 函数稍快
- `collide_rect(left, right) -> bool` 基于矩形的精灵碰撞检测，要求两个精灵实例必须包含 `rect` 属性
- `collide_rect_ratio(ratio) -> collided_callable` 基于缩放矩形的精灵碰撞检测
- `collide_circle(left, right) -> bool` 基于圆形的精灵碰撞，要求两个精灵拥有 `rect` 属性，可以拥有 `radius` 属性
- `collide_circle_ratio(ratio) -> collided_callable` 基于缩放圆形的碰撞检测
- `collide_mask(sprite1, sprite2) -> (int, int)` 基于遮罩的碰撞检测
- `groupcollide(group1, group2, dokill1, dokill2) -> Sprite_dict` 两个群组之间的碰撞检测

## 声音 {#sound}

游戏中的声音分两种，一种是**背景音乐**，一种是**动作音效**。

背景音乐一般较长，循环反复播放，用于营造游戏气氛。动作音效相对短促，比如爆炸、碰撞等声音，常常和瞬时事件绑定，不需要长时间播放。

pygame 使用两个不同的模块分别处理背景音乐和动作音效。

### 背景音乐 {#bgmusic}

[`pygame.mixer.music`][music] 模块提供了背景音乐的播放功能。背景音乐使用流媒体方式加载，即一边下载一边播放，有较短的启动速度。

较早的 pygame 在 Mac 和 Linux 平台上对于 MP3 格式的支持有限，pygame v2.0.2 增强了 MP3 的支持。如果你需要更好的压缩效果，可以使用 [OGG][ogg] 格式代替 MP3。

背景音乐只能播放一个文件，如果打开另一个音乐文件，当前播放的音乐会自动停止。

播放背景音乐的一般步骤如下：

1. 执行 `load(filename)` 方法加载音乐文件
1. 执行 `set_volume(volume)` 设定音量，音量 `volume` 是 `[0.0, 1.0]` 区间的浮点数
1. 执行 `play(loops)` 方法播放文件，可以指定循环次数。默认是 `0`，表示不重复播放。设为 `-1`，表示无限循环播放

举个例子，按 P 键播放音乐，按 S 键停止音乐：

```python
import pygame as py

py.init()
screen = py.display.set_mode((550, 400))
# 加载背景音乐
py.mixer.music.load('sound/bgmusic.mp3')

running = True
while running:
    for event in py.event.get():
        if event.type == py.QUIT:
            running = False
        if event.type == py.KEYDOWN:
            if event.key == py.K_q:
                running = False
            # 按 P 键，播放音乐
            elif event.key == py.K_p:
                py.mixer.music.play(-1) # 无限循环播放
            # 按 S 键，停止播放音乐
            elif event.key == py.K_s:
                py.mixer.music.stop()
    screen.fill('purple')
    py.display.flip()
```

### 动作音效 {#sound-effects}

使用 [`pygame.mixer.Sound()`][sound] 加载动作音效。它的 `play()` 方法播放音效。

动作音效可以在多个通道上同时播放多个音效。常见的函数如下：

```python
sound = pygame.mixer.Sound('sound.mp3') # 加载音效
sound.set_volume(0.2) # 设定音效音量
sound.play() # 播放音效
sound.stop() # 停止音效
```

**未完待续**

[pygame]: https://www.pygame.org/
[sdl]: https://www.libsdl.org/ "Simple DirectMedia Layer"
[2.6.0]: https://www.pygame.org/news/2024/6/pygame-2-6-0
[image.load]: https://www.pygame.org/docs/ref/image.html#pygame.image.load "pygame.image.load"
[get_extended]: https://www.pygame.org/docs/ref/image.html#pygame.image.get_extended "pygame.image.get_extended()"
[surface]: https://www.pygame.org/docs/ref/surface.html "pygame.Surface"
[convert]: https://www.pygame.org/docs/ref/surface.html#pygame.Surface.convert
[convert_alpha]: https://www.pygame.org/docs/ref/surface.html#pygame.Surface.convert_alpha
[sprite]: https://www.pygame.org/docs/ref/sprite.html "pygame.sprite"
[rect]: https://www.pygame.org/docs/ref/rect.html "pygame.Rect"
[group]: https://www.pygame.org/docs/ref/sprite.html#pygame.sprite.Group "pygame.sprite.Group"
[clock]: https://www.pygame.org/docs/ref/time.html#pygame.time.Clock "pygame.time.Clock"
[sprite-intro]: https://www.pygame.org/docs/tut/SpriteIntro.html "Sprite Module Introduction"
[surface.blit]: https://www.pygame.org/docs/ref/surface.html#pygame.Surface.blit "pygame.Surface.blit"
[color]: https://www.pygame.org/docs/ref/color.html "pygame.Color"
[named-colors]: https://www.pygame.org/docs/ref/color_list.html "Named Colors"
[pygame.draw]: https://www.pygame.org/docs/ref/draw.html "pygame.draw"
[pygame.font]: https://www.pygame.org/docs/ref/font.html "pygame.font"
[music]: https://www.pygame.org/docs/ref/music.html "pygame.mixer.music"
[mixer]: https://www.pygame.org/docs/ref/mixer.html "pygame.mixer"
[ogg]: https://www.xiph.org/ogg/ "Ogg 容器格式"
[sound]: https://www.pygame.org/docs/ref/mixer.html#pygame.mixer.Sound "pygame.mixer.Sound"