---
layout: post
title: 认识地图坐标系
date: 2018-05-23
---

* TOC
{:toc}

微信小程序的 [`map` 组件][comp]，文档有以下介绍：

> `map` 组件使用的经纬度是火星坐标系，调用 `wx.getLocation` 接口需要指定 `type` 为 `gcj02`

它的相关 API 文档也有相关介绍。比如，`wx.getLocation(OBJECT)` 的 `type` 属性释义：

> 默认为 `wgs84` 返回 gps 坐标，`gcj02` 返回可用于 `wx.openLocation` 的坐标

> iOS 6.3.30 `type` 参数不生效，只会返回 `wgs84` 类型的坐标信息

另一个 API `wx.createMapContext(mapId, this)` 中，对 `mapContext` 对象的方法列表，也有如下描述：

> `getCenterLocation` 获取当前地图中心的经纬度，返回的是 `gcj02` 坐标系，可以用于 `wx.openLocation`

所以，什么是“火星坐标系”？什么是“wgs84”？什么是“gcj02”？它们和 gps 坐标是什么关系？各大电子地图都使用哪种坐标系？

## WGS84

[wgs84][wiki.wgs]（World Geodetic System），又称世界大地测量系统，是一种用于地图学、大地测量学和导航（包括全球定位系统）的大地测量系统标准。WGS 包含一套地球的标准经纬坐标系、一个用于计算原始海拔数据的参考椭球体，和一套用以定义海平面高度的引力等势面数据。

WGS 的最新版本为 WGS 84（也称作 WGS 1984、EPSG:4326），1984年定义、最后修订于2004年。之前的版本有 WGS 72、WGS 66、WGS 60。全球定位系统使用的就是 WGS 84 参考系。

## GCJ-02

[GCJ-02][baidu.gcj02] 是由中国国家测绘局（G表示Guojia国家，C表示Cehui测绘，J表示Ju局）制订的地理信息系统的坐标系统。

它是一种对经纬度数据的加密算法，即加入随机的偏差。

国内出版的各种地图系统（包括电子形式），必须至少采用 GCJ-02 对地理位置进行首次加密。

民间称之为**火星坐标系**。

## BD-09

[BD-09][bd90] 为百度坐标系，在 GCJ02 坐标系基础上再次加密。其中 bd09ll 表示百度经纬度坐标，bd09mc 表示百度墨卡托米制坐标。

## 开发过程需要注意的事

来自[coordtransform][wandergis]

### 从设备获取经纬度（GPS）坐标

- 如果使用的是百度 sdk 那么可以获得百度坐标（bd09）或者火星坐标（GCJ02)，默认是 bd09
- 如果使用的是 ios 的原生定位库，那么获得的坐标是 WGS84
- 如果使用的是高德 sdk，那么获取的坐标是 GCJ02

### 互联网在线地图使用的坐标系

**火星坐标系**

- iOS 地图（其实是高德）
- Google国内地图（.cn域名下）
- 搜搜、阿里云、高德地图、腾讯

**百度坐标系**

- 当然只有百度地图

**WGS84坐标系**

- 国际标准，谷歌国外地图、osm 地图等国外的地图一般都是这个

## REF

[comp]: https://developers.weixin.qq.com/miniprogram/dev/component/map.html#map
[api]: https://developers.weixin.qq.com/miniprogram/dev/api/location.html#wxopenlocationobject
[api.map]: https://developers.weixin.qq.com/miniprogram/dev/api/api-map.html#wxcreatemapcontextmapid
[wiki.wgs]: https://zh.wikipedia.org/wiki/%E4%B8%96%E7%95%8C%E5%A4%A7%E5%9C%B0%E6%B5%8B%E9%87%8F%E7%B3%BB%E7%BB%9F
[baidu.gcj02]: https://baike.baidu.com/item/GCJ-02
[bd90]: http://lbsyun.baidu.com/index.php?title=coordinate
[wandergis]: https://github.com/wandergis/coordtransform