---
title: PicGo+MinIO自建图床
date: 2024-08-30
categories: ["教程"]
tags: ["图床", "PicGo", "MinIO"]
---

## 1.介绍

### 1.1 图床

图床一般是指一种用于存储和托管图片的在线服务[^图床介绍]。通过图床，用户可以轻松地上传自己的图片，并获得一个唯一的链接或者嵌入代码，以便在网页、博客、论坛等任何地方方便地分享和展示这些图片。<br>

### 1.2 MinIO

MinIO 是一个基于 Apache License v2.0 开源协议的对象存储服务。它兼容亚马逊 S3 云存储服务接口，非常适合于存储大容量非结构化的数据，例如图片、视频、日志文件、备份数据和容器/虚拟机镜像等，而一个对象文件可以是任意大小，从 KB 到最大 TB 不等。

### 1.3 PicGo

> [官方文档](https://picgo.github.io/PicGo-Doc/zh/guide/)

一个用于快速上传图片并获取图片 URL 链接的工具。默认支持七牛图床、腾讯云、又拍云、GitHub、SM.MS、阿里云、Imgur。如果需要使用其他图床，可以寻找对于的图床插件，本文介绍的就是使用 MinIO 上传插件上传到自建的 MinIO 服务里。

## 2.安装

### 2.1 MinIO 安装

**部署**<br>
教程：[docker-compose 部署 minio 服务](https://blog.qiang.uk/2023/02/01/好用的docker应用汇总/#minio单机部署)<br>
部署完 minio 后，最好给 minio 配置一个域名。

**添加存储桶**<br>
点击图示按钮，填写存储桶名称，然后按下回车完成创建。
![](https://minio.qiang.uk/static/2024/08/30/9945329c78051eb943788e7d999053f8.jpg)

**配置存储桶读写权限**<br>
![](https://minio.qiang.uk/static/2024/08/30/597255acf4375fe9db671b6a5e2a493e.jpg)
![](https://minio.qiang.uk/static/2024/08/30/41dbb49777b1d7dbb3cb92f0a352f5dc.jpg)

### 2.2 PicGo 安装

[**下载地址**](https://github.com/Molunerfinn/PicGo/releases)<br>
根据当前操作系统选择对应的安装包，Windows 系统如果 64 位的版本安装完有问题，就下载 32 位的。<br>
![](https://minio.qiang.uk/static/2024/08/30/b16c70598b4c3b7f02198751918e838b.jpg)

### 2.3 安装并配置 PicGo 插件

### 2.4 测试上传图片

[^图床介绍]: [《图床是啥，如何使用》](https://blog.csdn.net/m0_46350557/article/details/141127831)
