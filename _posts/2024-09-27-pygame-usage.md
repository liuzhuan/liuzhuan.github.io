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

## Sprite 和 Group {#sprite}

pygame 1.3 引入的 [`pygame.sprite`][sprite] 模块，用于处理移动的游戏物体。它包含两个主要的类：`Sprite` 和 `Group`。

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