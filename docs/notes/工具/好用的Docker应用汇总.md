---
title: 好用的Docker应用汇总
icon: blog
date: 2023-02-01
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

### 5. jenkins
> [镜像地址](https://hub.docker.com/r/jenkins/jenkins)
```yaml
version: '3.7'
services:                                      # 集合
  docker_jenkins:
    user: root                                 # 为了避免一些权限问题 在这我使用了root
    restart: always                            # 重启方式
    image: jenkins/jenkins:latest              # 指定服务所使用的镜像
    container_name: jenkins                    # 容器名称
    ports:                                     # 对外暴露的端口定义
      - 8082:8080                              # 访问Jenkins服务端口
      - 50000:50000
    volumes:                                   # 卷挂载路径
      - ./jenkins_home/:/var/jenkins_home  # 这是我们一开始创建的目录挂载到容器内的jenkins_home目录
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker                # 这是为了我们可以在容器内使用docker命令
      - /usr/local/bin/docker-compose:/usr/local/bin/docker-compose

```

### 6. nginx-web-ui
> [镜像地址](https://hub.docker.com/r/cym1102/nginxwebui)
```yaml
version: '3.7'
services:
  nginx-web-ui:
    image: cym1102/nginxwebui:latest
    container_name: nginx-web-ui
    volumes:
      - ./data:/home/nginxWebUI
    environment:
      BOOT_OPTIONS: "--server.port=81"
    restart: always
    network_mode: host
```

### 7. httpd
> [镜像地址](https://hub.docker.com/_/httpd)
```yaml
version: "3.7"
services:
  web1:
    image: httpd:latest
    volumes:
      - ./你的文件路径:/usr/local/apache2/htdocs/
    ports:
      - 8001:80
    restart: always
```

### 8. frps
> [镜像地址](https://hub.docker.com/r/stilleshan/frps)
```yaml
version: '3.7'
services:
  frps:
    image: stilleshan/frps
    container_name: frps
    volumes:
      - ./frps.ini:/frp/frps.ini
    restart: always
    network_mode: host
```

### 9. frpc
> [镜像地址](https://hub.docker.com/r/stilleshan/frps)
```yaml
version: '3.7'
services:
  frps:
    image: stilleshan/frps
    container_name: frps
    volumes:
      - ./frps.ini:/frp/frps.ini
    restart: always
    network_mode: host
```