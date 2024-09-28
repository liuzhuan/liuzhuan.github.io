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

## 游戏主循环

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

## 加载图像

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

## Sprite 和 Group

pygame 1.3 引入的 [`pygame.sprite`][sprite] 模块，善于处理运动的游戏物体。它包含两个主要的类：`Sprite` 和 `Group`。


**完**

[pygame]: https://www.pygame.org/
[sdl]: https://www.libsdl.org/ "Simple DirectMedia Layer"
[2.6.0]: https://www.pygame.org/news/2024/6/pygame-2-6-0
[image.load]: https://www.pygame.org/docs/ref/image.html#pygame.image.load "pygame.image.load"
[get_extended]: https://www.pygame.org/docs/ref/image.html#pygame.image.get_extended "pygame.image.get_extended()"
[surface]: https://www.pygame.org/docs/ref/surface.html "pygame.Surface"
[convert]: https://www.pygame.org/docs/ref/surface.html#pygame.Surface.convert
[convert_alpha]: https://www.pygame.org/docs/ref/surface.html#pygame.Surface.convert_alpha
[sprite]: https://www.pygame.org/docs/ref/sprite.html "pygame.sprite"
[sprite-module]: https://www.pygame.org/docs/tut/SpriteIntro.html "Sprite Module Introduction"