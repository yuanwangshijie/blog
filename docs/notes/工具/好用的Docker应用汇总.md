---
title: 好用的Docker应用汇总
icon: blog
date: 2022-12-29
category:
  - 工具
tag:
  - Docker
star: true
---

> 本文收集一些在用的或者看起来好用的Docker应用

## 一、安装环境
* 系统 `CentOS 7` 已安装 `bbrplus` [内核安装脚本](https://blog.ylx.me/archives/783.html)
* 安装 `docker` 和 `docker-compose` [安装教程](https://www.runoob.com/docker/centos-docker-install.html)

## 二、应用汇总

### 1. NPM汉化版（Nginx代理管理器）
> [镜像地址](https://hub.docker.com/r/chishin/nginx-proxy-manager-zh)

`docker-compose.yml`
```yaml
version: '3.7'
services:
  app:
    image: chishin/nginx-proxy-manager-zh:latest
    container_name: nginx-proxy-manager-zh
    restart: always
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

### 2. portainer-ce汉化版（Docker管理面板）
> [镜像地址](https://hub.docker.com/r/6053537/portainer-ce)

`docker-compose.yml`
```yaml
version: '3.7'
services:
  app:
    image: 6053537/portainer-ce
    container_name: portainer-ce
    restart: always
    ports:
      - '9000:9000'
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./data:/data
```

### 3. Gogs（自建git服务）
> [镜像地址](https://hub.docker.com/r/gogs/gogs)

`docker-compose.yml`
```yaml
version: '3.7'
services:
  gogs:
    image: gogs/gogs
    container_name: gogs
    restart: always
    ports:
      - '3000:3000'
      - '2023:22'
    volumes:
      - ./data:/data
```

### 4. x-ui（xray面板）
> [镜像地址](https://hub.docker.com/r/stilleshan/x-ui)

`docker-compose.yml`
```yaml
version: '3.7'
services:
  xui:
    image: stilleshan/x-ui
    container_name: x-ui
    volumes:
      - ./data/x-ui.db:/etc/x-ui/x-ui.db
      - ./ssl:/ssl
    restart: always
    network_mode: host
```