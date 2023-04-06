---
title: NPM与XUI共存
icon: blog
date: 2023-04-04
category:
  - 教程
tag:
  - Docker
  - 科学上网
star: true
---

> 本文转自：https://blog.laoda.de/archives/npm-xui <br>
> 【Docker魔法系列】NPM与XUI共存！Nginx Proxy Manager搭配X-UI实现Vless+WS+TLS教程

## 1.搭建环境

* 服务器并装好Linux系统
* 域名一枚，并做好解析到服务器上（域名购买、域名解析 视频教程）
* 安装好Docker、Docker-compose [相关脚本](https://www.runoob.com/docker/centos-docker-install.html)
* 安装好Nginx Proxy Manager [相关教程](https://github.com/xiaoxinpro/nginx-proxy-manager-zh)

## 3.搭建方式

### 3.2下载xui

```shell
bash <(curl -Ls https://raw.githubusercontent.com/FranzKafkaYu/x-ui/master/install.sh)
```
### 3.3 登陆xui面板并配置



