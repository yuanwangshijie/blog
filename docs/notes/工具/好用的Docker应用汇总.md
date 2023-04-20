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
### nginx-web-ui
> [镜像地址](https://hub.docker.com/r/cym1102/nginxwebui)<br>
> 部署完成后访问设定的`81`端口, 首次登录要求初始化管理员账号
```yaml
version: '3.7'
services:
  nginx-web-ui:
    image: cym1102/nginxwebui
    container_name: nginx-web-ui
    volumes:
      - ./data:/home/nginxWebUI          # 挂载应用文件夹
      - /appdata/www:/www                # 挂载静态页面文件夹，根据实际情况配置
    environment:
      BOOT_OPTIONS: "--server.port=81"   # 设置端口
    restart: always
    network_mode: host
```

### portainer-ce汉化版（Docker管理面板）
> [镜像地址](https://hub.docker.com/r/6053537/portainer-ce)
> 部署完成后访问设定的`83`端口, 首次登录要求初始化管理员账号
```yaml
version: '3.7'
services:
  app:
    image: 6053537/portainer-ce
    container_name: portainer-ce
    restart: always
    ports:
      - '83:9000'
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./data:/data
```

### Gogs（自建git服务）
> [镜像地址](https://hub.docker.com/r/gogs/gogs)
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

### x-ui（xray面板）
> [镜像地址](https://hub.docker.com/r/stilleshan/x-ui)<br>
> 部署完成后访问服务器`54321`端口, 默认账号密码: `admin`/`admin`
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

### jenkins
> [镜像地址](https://hub.docker.com/r/jenkins/jenkins)<br>
> 部署完成后访问设定的`82`端口
```yaml
version: '3.7'
services:                                      # 集合
  docker_jenkins:
    user: root                                 # 为了避免一些权限问题 在这我使用了root
    restart: always                            # 重启方式
    image: jenkins/jenkins                     # 指定服务所使用的镜像
    container_name: jenkins                    # 容器名称
    ports:                                     # 对外暴露的端口定义
      - '82:8080'                              # 访问Jenkins服务端口
      - '50000:50000'
    volumes:                                   # 卷挂载路径
      - ./jenkins_home/:/var/jenkins_home      # 这是我们一开始创建的目录挂载到容器内的jenkins_home目录
      - /usr/bin/docker:/usr/bin/docker        # 这是为了我们可以在容器内使用docker命令
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/local/bin/docker-compose:/usr/local/bin/docker-compose
```

### minio(分布式部署)
> [镜像地址](https://hub.docker.com/r/minio/minio)<br>
> [教程地址](https://www.jb51.net/article/258178.htm)
```yaml
version: "3.7"
services:
  minio:
    image: "minio/minio"
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - "./data/data1:/data1"
      - "./data/data2:/data2"
      - "./data/data3:/data3"
      - "./data/data4:/data4"
    command: server --console-address ":9001" http://ip1:9000/data{1...4} http://ip2:9000/data{1...4}
    environment:
      - MINIO_ROOT_USER=admin
      - MINIO_ROOT_PASSWORD=12345678
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3
```

### httpd
> [镜像地址](https://hub.docker.com/_/httpd)
```yaml
version: "3.7"
services:
  web1:
    image: httpd
    volumes:
      - ./web1:/usr/local/apache2/htdocs/
    ports:
      - '8001:80'
    restart: always
```

### frps
> [镜像地址](https://hub.docker.com/r/stilleshan/frps)
```yaml
docker run -d --name=frps --restart=always --network host -v ./frps.ini:/frp/frps.ini stilleshan/frps
```
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

### frpc
> [镜像地址](https://hub.docker.com/r/stilleshan/frpc)
```yaml
docker run -d --name=frpc --restart=always --network host -v /mnt/usb1-1/Apps/Frpc/frpc.ini:/frp/frpc.ini stilleshan/frpc
```
```yaml
version: '3.7'
services:
  frps:
    image: stilleshan/frpc
    container_name: frpc
    volumes:
      - /mnt/usb1-1/Apps/Frpc/frpc.ini:/frp/frpc.ini
    restart: always
    network_mode: host
```

### Alist(预装aria2)
> [镜像地址](https://hub.docker.com/r/xhofe/alist-aria2)<br>
> 部署完成后访问设定的`5244`端口, 获取初始账号密码: 在宿主机执行`docker exec -it 容器ID bash`进入容器, 执行`./alist admin`
```yaml
docker run -d --name=alist --restart=always -p 5244:5244 -v /mnt/usb1-1/Apps/Alist:/opt/alist/data -e PUID=0 -e PGID=0 -e UMASK=022 xhofe/alist-aria2:latest
```
```yaml
version: '3.7'
services:
  alist:
    image: xhofe/alist-aria2
    container_name: alist
    volumes:
      - /mnt/usb1-1/Apps/Alist:/opt/alist/data
    ports:
      - '5244:5244'
    environment:
      - PUID=0
      - PGID=0
      - UMASK=022
    restart: always
```