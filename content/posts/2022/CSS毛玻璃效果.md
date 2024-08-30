---
title: CSS毛玻璃效果
date: 2022-12-27
categories: ["教程"]
tags: ["CSS", "毛玻璃"]
---

## backdrop-filter 与 filter 的区别

> filter：模糊内容<br>
> backdrop-filter:透过该层的底部元素模糊化<br>
> 这两个属性的语法是一样的

## 写法

```css
backdrop-filter: saturate(150%) contrast(50%) blur(8px);
background-color: rgba(0, 0, 0, 0.3);
```

saturate(150%)意为使…饱和，类似 ps 饱和度效果，小于 100%变暗，大于 100%变亮<br>
contrast(50%)意为对比，类似 ps 对比度，100%为原图，0%为全灰色图像

## 使用效果

**亮色背景**<br>
![](https://minio.qiang.uk/static/2024/08/30/e88c191b7a245b1cee55d27beeff2549.jpg)

**暗色背景**<br>
![](https://minio.qiang.uk/static/2024/08/30/cbb3b938592a3614ddebbc24ff33bad0.jpg)
