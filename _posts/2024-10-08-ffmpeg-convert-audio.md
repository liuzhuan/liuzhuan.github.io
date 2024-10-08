---
layout: post
title: 使用 FFmpeg 转换音频文件格式
date: 2024-10-08
---

* TOC
{:toc}

[FFmpeg][ffmpeg] 是一个开源的多媒体框架，可以处理音视频等多媒体数据。你可以用它对多媒体进行录制、格式转换、流媒体等操作。

FFmpeg 的原作者是法国天才程序员**法布里斯·贝拉**（[*Fabrice Bellard*][bellard]）。

FFmpeg 包含 `ffmpeg` 命令行工具，在 macOS 可以使用 Homebrew 安装它：

```bash
$ brew install ffmpeg
```

## 基本概念

进行音频文件格式转换前，需要搞清楚几个基本概念。

### 比特率

比特率（bitrate）是衡量数据传输速度的单位，通常以**比特每秒**（bps, bits per second）或**千比特每秒**（kbps）来表示。在数字音视频压缩中，比特率很重要，因为它直接影响到文件的大小和质量。

具体到音频，比特率越高，音频的动态范围和细节就越丰富，音质就越好。

网上搜索的音频文件的常见比特率参考范围，如下：

- 电话通话：`16kbps - 32kbps`
- 低质量 mp3：`64kbps - 96kbps`
- 标准质量 mp3：`128kbps - 160kbps`
- 高质量 mp3：`192kbps - 320kbps`

### CBR 和 VBR

CBR 和 VBR 是数字音频压缩中使用的两种不同的比特率控制模式，它们有各自的适用场景。

CBR 表示**恒定比特率**（Constant Bitrate），整个文件的比特率是固定的。它的优点在于稳定性、兼容性、简单、低延迟，适用于直播等流媒体传输场景。缺点是不能根据内容调整码率，体积较大。

VBR 表示**可变比特率**（Variable Bitrate），它的比特率会根据音频内容的复杂性自动调整。比如，在音频的安静部分，比特率会降低，而在复杂或响亮的部分，比特率会增加，以保持音频质量。VBR 编码的文件通常比相同质量 CBR 文件小，所以更适合存储和下载。但 VBR 的解码更复杂，延迟较高，所以不适合直播等流媒体场景。

## 转换为 mp3 格式

假设你有一个 `music.m4a` 文件，需要转换为 [`.mp3`][mp3] 格式。如果你想以 VBR 的方式编码，可以这样写：

```bash
$ ffmpeg -i music.m4a -c:a libmp3lame -q:a 8 output.mp3
```

其中的 `-i` 选项用于指定输入文件名。

`-c:a` 选项用于指定音频编码器，此处使用 MP3 编码器 [LAME][lame]。`-c:a` 选项的别名还有 `-codec:a`、`-acodec`。

`-q:a` 选项用于指定编码质量，它的数值和编码器相关。具体到 [`libmp3lame`][ffmpeg-mp3]，取值范围是 `[0, 9]`，值越小，质量越高。`0-3` 质量和原始音频几乎一样，默认的 `4` 和原始音频也比较接近，`6` 的质量“尚可接受”。`-q:a` 选项的别名是 `-qscale:a`。

| ffmpeg 选项 | 比特率范围 kbps |
| --- | --- |
| `-q:a 0` | 220-260 |
| `-q:a 1` | 190-250 |
| `-q:a 2` | 170-210 |
| `-q:a 3` | 150-195 |
| `-q:a 4` | 140-185 |
| `-q:a 5` | 120-150 |
| `-q:a 6` | 100-130 |
| `-q:a 7` | 80-120 |
| `-q:a 8` | 70-105 |
| `-q:a 9` | 45-85 |

如果想编码成 CBR 恒定比特率音频文件，可以这么写：

```bash
$ ffmpeg -i music.m4a -c:a libmp3lame -b:a 96k output.mp3
```

其中的 `-b:a` 选项用于指定恒定的比特率。例子中的 `-b:a 96k` 表示音频文件的比特率是 96kbps。可用的选项有：8, 16, 24, 32, 40, 48, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320（需要加后缀 `k`）。

[ffmpeg]: https://ffmpeg.org/ "FFmpeg"
[bellard]: https://bellard.org/ "Fabrice Bellard"
[mp3]: https://www.mp3-history.com/en/whatismp3.html "What is mp3?"
[audio-codecs]: https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs "Web audio codec guide"
[lame]: https://lame.sourceforge.io/ "The LAME Project"
[ffmpeg-mp3]: https://trac.ffmpeg.org/wiki/Encode/MP3 "FFmpeg MP3 Encoding Guide"