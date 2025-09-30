---
title: 好用的Docker应用汇总
date: 2023-02-01
categories: ["工具"]
tags: ["Docker", "Docker Compose"]
weight: 1
---

> 本文收集一些比较有趣的 Docker 应用，镜像版本更新可能会导致脚本或配置失效，如果无法使用请发邮件给我。

## 一、安装环境

- 系统 `Ubuntu` 已开启 `BBR加速` [BBR 加速开启脚本](https://blog.ylx.me/archives/783.html)
- 安装 `docker` 和 `docker-compose`最新版本 [教程地址](https://www.runoob.com/docker/ubuntu-docker-install.html)
- 国内用户搭配镜像加速食用更佳 `https://docker.1panel.live`

## 二、应用汇总

### zerotier

[镜像地址](https://hub.docker.com/r/zerotier/zerotier) | [教程地址](http://www.360doc.com/content/12/0121/07/11604731_1081143038.shtml)

```yaml
services:
  zerotier:
    image: zerotier/zerotier:1.14.2
    container_name: zerotier
    restart: unless-stopped
    privileged: true
    network_mode: host
    volumes:
      - ./data:/var/lib/zerotier-one
    devices:
      - /dev/net/tun
    environment:
      - TZ=Asia/Shanghai
    cap_add:
      - NET_ADMIN
      - SYS_ADMIN
    command: ["你的网络ID"]
```

### wg-easy(wireguard 服务端可视化面板)

[GitHub 地址](https://github.com/wg-easy/wg-easy/blob/master/docker-compose.yml) | [教程地址](https://newzone.top/services/dockers-on-nas/wireguard.html#_1-部署-wireguard-服务端) | [客户端下载](https://www.wireguard.com/install/)  
执行`docker run -it ghcr.nju.edu.cn/wg-easy/wg-easy wgpw 'YOUR_PASSWORD'` 后获得 `PASSWORD_HASH`，填写到`docker-compose.yml` 里的时候需要去掉**单引号**，并且把 `$` 替换为 `$$` 。

```yaml
services:
  wg-easy:
    image: ghcr.nju.edu.cn/wg-easy/wg-easy:15
    container_name: wg-easy
    restart: unless-stopped
    ports:
      - 51820:51820/udp
      - 51821:51821/tcp
    volumes:
      - ./data:/etc/wireguard
    cap_add:
      - NET_ADMIN
      - SYS_MODULE
    sysctls:
      - net.ipv4.ip_forward=1
      - net.ipv4.conf.all.src_valid_mark=1
    environment:
      - TZ=Asia/Shanghai
      - LANG=chs
      - WG_HOST=wg.example.com
      - PASSWORD_HASH=$$2a$$12$$XwvwZ1NKx6kWw5PfIKHy0uo5PNsU1BxEksVW8JAjGxWjAVYLEmoC2
      - WG_DEFAULT_ADDRESS=10.8.0.x
      - WG_ALLOWED_IPS=10.8.0.0/24
      - WG_DEFAULT_DNS=8.8.8.8
      - WG_PERSISTENT_KEEPALIVE=25
```

### MT-insightface(人脸识别 API)

[镜像地址](https://hub.docker.com/r/devfox101/mt-photos-insightface-unofficial) | [教程地址](https://mtmt.tech/docs/advanced/insightface_api/)  
这里用了 `MT Photos` 的打包好的人脸识别 API, 教程地址里有国内镜像。

```yaml
services:
  face:
    image: devfox101/mt-photos-insightface-unofficial:latest
    container_name: face
    restart: unless-stopped
    ports:
      - 8066:8066
    environment:
      - API_AUTH_KEY=<your_key>
```

### watchtower(自动更新容器)

[镜像地址](https://hub.docker.com/r/containrrr/watchtower) | [教程地址](https://blog.csdn.net/qq_21127151/article/details/129574398)

```yaml
services:
  watchtower:
    image: containrrr/watchtower:latest
    container_name: watchtower
    restart: unless-stopped
    network_mode: host
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - TZ=Asia/Shanghai
```

### nginx-web-ui

[镜像地址](https://hub.docker.com/r/cym1102/nginxwebui) | [教程地址](https://www.nginxwebui.cn/product.html)

```yaml
services:
  nginx-web-ui:
    image: cym1102/nginxwebui:4.3.0
    container_name: nginx-web-ui
    restart: unless-stopped
    privileged: true
    network_mode: host
    volumes:
      - ./data:/home/nginxWebUI
      - ./www:/www
    environment:
      - TZ=Asia/Shanghai
      - BOOT_OPTIONS=--server.port=8080
```

### portainer-ce 汉化版

[镜像地址](https://hub.docker.com/r/6053537/portainer-ce) | [教程地址](https://imnks.com/3406.html)

```yaml
services:
  portainer-ce:
    image: 6053537/portainer-ce:2.21.4
    container_name: portainer-ce
    restart: unless-stopped
    ports:
      - 9000:9000
    volumes:
      - ./data:/data
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - TZ=Asia/Shanghai
```

### gitea

[镜像地址](https://hub.docker.com/r/gitea/gitea) | [教程地址](https://docs.gitea.io/zh-cn/installation/install-with-docker/)

```yaml
services:
  gitea:
    image: gitea/gitea:1.24
    container_name: gitea
    restart: unless-stopped
    ports:
      - 3000:3000
    volumes:
      - ./data:/data
    environment:
      - TZ=Asia/Shanghai
      - USER_UID=1000
      - USER_GID=1000
```

### gogs

[镜像地址](https://hub.docker.com/r/gogs/gogs) | [教程地址](https://learnku.com/articles/36255)

```yaml
services:
  gogs:
    image: gogs/gogs:0.13
    container_name: gogs
    restart: unless-stopped
    ports:
      - 3000:3000
    volumes:
      - ./data:/data
    environment:
      - TZ=Asia/Shanghai
```

### x-ui

[镜像地址](https://hub.docker.com/r/enwaiax/x-ui) | [教程地址](https://hub.docker.com/r/enwaiax/x-ui)  
默认账号密码: `admin`/`admin` 。

```yaml
services:
  x-ui:
    image: enwaiax/x-ui:latest
    container_name: x-ui
    restart: unless-stopped
    ports:
      - 54321:54321
      - 12345:12345
    volumes:
      - ./data:/etc/x-ui
    environment:
      - TZ=Asia/Shanghai
```

### jenkins

[镜像地址](https://hub.docker.com/r/jenkins/jenkins) | [教程地址](https://segmentfault.com/a/1190000042279781)

```yaml
services: # 集合
  jenkins:
    image: jenkins/jenkins:lts # 指定服务所使用的镜像
    container_name: jenkins # 容器名称
    restart: unless-stopped # 重启方式
    user: root # 为了避免一些权限问题 在这我使用了root
    ports: # 对外暴露的端口定义
      - 8080:8080 # 访问Jenkins服务端口
      - 50000:50000
    volumes: # 卷挂载路径
      - ./data:/var/jenkins_home # 这是我们一开始创建的目录挂载到容器内的jenkins_home目录
      - /usr/bin/docker:/usr/bin/docker # 这是为了我们可以在容器内使用docker命令
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/local/bin/docker-compose:/usr/local/bin/docker-compose # docker-compose如果有问题，确认一下宿主机的docker-compose的路径
    environment:
      - TZ=Asia/Shanghai
      - JAVA_OPTS=-server -Xms512m -Xmx512m -XX:+UseG1GC
```

### minio(单机部署)

[镜像地址](https://hub.docker.com/r/minio/minio) | [旧版教程](https://blog.csdn.net/weixin_45653525/article/details/128842091) | [新版教程](https://blog.csdn.net/qq_57581439/article/details/126192492)  
这里选择部署旧版 minio ，是因为旧版 minio 上传的文件是保持原格式的。  
`RELEASE.2021-06-17T00-10-46Z` 这个版本是旧版 minio 最后一次更新。

```yaml
services:
  minio:
    image: minio/minio:RELEASE.2021-06-17T00-10-46Z
    container_name: minio
    restart: unless-stopped
    ports:
      - 9000:9000
    volumes:
      - ./data:/data
    environment:
      - TZ=Asia/Shanghai
      - MINIO_ROOT_USER=<minio_user>
      - MINIO_ROOT_PASSWORD=<minio_password>
    command: server /data
```

### mysql

[镜像地址](https://hub.docker.com/_/mysql) | [教程地址](https://www.cnblogs.com/Galaxy1/p/17806388.html) | [内存优化](https://blog.csdn.net/weixin_43888891/article/details/122518719)  
**注意事项**：`./config/my.cnf` 文件的权限需要设置为 `655`

```yaml
services:
  mysql:
    image: mysql:8.0.43-debian
    container_name: mysql
    restart: unless-stopped
    ports:
      - 3306:3306
    volumes:
      - ./config/my.cnf:/etc/mysql/conf.d/my.cnf
      - ./data:/var/lib/mysql
      - ./log:/var/log/mysql
    environment:
      - TZ=Asia/Shanghai
      # 初始化mysql的root密码
      - MYSQL_ROOT_PASSWORD=<mysql_password>
```

my.cnf 文件，请自行按需修改。

```
[mysqld]
user=mysql
max_connections=1000
mysql-native-password=ON
character-set-server=utf8mb4
collation-server=utf8mb4_general_ci
default-storage-engine=INNODB
default-time_zone='+8:00'
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION

[client]
default-character-set=utf8mb4

[mysql]
default-character-set=utf8mb4
```

### postgres(带有 pgvector 插件)

[镜像地址](https://hub.docker.com/r/pgvector/pgvector) | [GitHub 地址](https://github.com/pgvector/pgvector) | [教程地址](https://www.itcto.cn/jc/docker/docker-compose-postgresql/)

```yaml
services:
  postgres:
    image: pgvector/pgvector:pg17
    container_name: postgres
    restart: unless-stopped
    ports:
      - 5432:5432
    volumes:
      - ./data:/var/lib/postgresql/data
    environment:
      - TZ=Asia/Shanghai
      - POSTGRES_USER=<postgres_user>
      - POSTGRES_PASSWORD=<postgres_password>
      - POSTGRES_DB=postgres
```

### mongo

[镜像地址](https://hub.docker.com/_/mongo) | [教程地址](https://www.cnblogs.com/studyjobs/p/17626496.html)

```yaml
services:
  mongo:
    image: mongo:8.0.10
    container_name: mongo
    restart: unless-stopped
    ports:
      - 27017:27017
    volumes:
      - ./data:/data/db
    environment:
      - TZ=Asia/Shanghai
      - MONGO_INITDB_ROOT_USERNAME=<mogo_user>
      - MONGO_INITDB_ROOT_PASSWORD=<mogo_password>
```

### redis

[镜像地址](https://hub.docker.com/_/redis) | [教程地址](https://www.jianshu.com/p/094078ef4347)  
启动前先创建 `./config/redis.conf` 文件，文件内容参考下方。

```yaml
services:
  redis:
    image: redis:8.0.2
    container_name: redis
    restart: unless-stopped
    ports:
      - 6379:6379
    volumes:
      - ./config/redis.conf:/etc/redis/redis.conf
      - ./data:/data
    environment:
      - TZ=Asia/Shanghai
    command: redis-server /etc/redis/redis.conf
```

redis.conf 文件，请自行按需修改。

```
#开启远程可连接
#bind 127.0.0.1
#自定义密码
requirepass 12345678
#指定 Redis 监听端口(默认:6379)
port 6379
#客户端闲置指定时长后关闭连接(单位:秒。0:关闭该功能)
timeout 0
# 900s内如果至少一次写操作则执行bgsave进行RDB持久化操作
save 900 1
# 在300s内，如果至少有10个key进行了修改，则进行持久化操作
save 300 10
#在60s内，如果至少有10000个key进行了修改，则进行持久化操作
save 60 10000
#是否压缩数据存储(默认:yes。Redis采用LZ 压缩，如果为了节省 CPU 时间，可以关闭该选项，但会导致数据库文件变的巨大)
rdbcompression yes
#指定本地数据文件名(默认:dump.rdb)
dbfilename dump.rdb
#指定本地数据文件存放目录
dir /data
#指定日志文件位置(如果是相对路径，redis会将日志存放到指定的dir目录下)
logfile "redis.log"
```

### httpd

[镜像地址](https://hub.docker.com/_/httpd)

```yaml
services:
  httpd:
    image: httpd:2.4.63
    container_name: httpd
    restart: unless-stopped
    ports:
      - 8080:80
    volumes:
      - ./data/web1:/usr/local/apache2/htdocs/
    environment:
      - TZ=Asia/Shanghai
```

### frps

[镜像地址](https://hub.docker.com/r/snowdreamtech/frps) | [参考配置](https://dusays.com/636/)

```yaml
services:
  frps:
    image: snowdreamtech/frps:0.62.1
    container_name: frps
    restart: unless-stopped
    network_mode: host
    volumes:
      - ./config/frps.toml:/etc/frp/frps.toml
    environment:
      - TZ=Asia/Shanghai
```

### frpc

[镜像地址](https://hub.docker.com/r/snowdreamtech/frpc) | [参考配置](https://dusays.com/636/)

```yaml
services:
  frpc:
    image: snowdreamtech/frpc:0.62.1
    container_name: frpc
    restart: unless-stopped
    network_mode: host
    volumes:
      - ./config/frpc.toml:/etc/frp/frpc.toml
    environment:
      - TZ=Asia/Shanghai
```

### openlist(集成 Aria2、qBittorrent、Caddy)

[GitHub 地址](https://github.com/huancun/Openlist-EX-container) | [参考配置](https://github.com/huancun/Openlist-EX-container/blob/main/docker-compose.yml)  
执行 `docker logs openlist` 获取初始密码。

```yaml
services:
  openlist:
    image: ghcr.io/huancun/openlist-ex-container:latest
    container_name: openlist
    restart: unless-stopped
    ports:
      - 5244:8080
    volumes:
      - ./data:/data
    environment:
      - TZ=Asia/Shanghai
      - CADDY_DOMAIN=http://<openlist_domain>
      - CADDY_WEB_PORT=8080
      - ARIA2_TOKEN=<aria2_token>
      - ARIA2_TRACKER_UPDATE=enable
      - OPENLIST_PORT=61600
      - ARIA2_PORT=61601
      - QBT_WEBUI_PORT=61602
```

### emqx(mqtt 消息服务器)

[镜像地址](https://dhcdn.qiang.uk/r/emqx/emqx) | [教程地址](https://blog.csdn.net/apple_74262176/article/details/143093752)  
启动前先在主机创建 `etc`、`data`、`log`，然后临时启动一个容器，把容器内对应的目录拷贝到主机，详细步骤可以看教程。

```yaml
services:
  emqx:
    image: emqx/emqx:5.8.6
    container_name: emqx
    restart: unless-stopped
    ports:
      - 1883:1883
      - 8083:8083
      - 8084:8084
      - 8883:8883
      - 18083:18083
    volumes:
      - ./data/etc:/opt/emqx/etc
      - ./data/data:/opt/emqx/data
      - ./data/log:/opt/emqx/log
    environment:
      - TZ=Asia/Shanghai
```

### rocketmq(单机部署)

[镜像地址](https://hub.docker.com/r/rocketmqinc/rocketmq) | [教程地址](https://rocketmq.apache.org/zh/docs/quickStart/03quickstartWithDockercompose/) | [配置文件解释](https://blog.csdn.net/weixin_44606481/article/details/129780540)  
启动前先配置 `./config/broker.conf` 文件，下面有示例。

```yaml
services:
  rocketmq-namesrv:
    image: rocketmqinc/rocketmq:4.4.0
    container_name: rocketmq-namesrv
    restart: unless-stopped
    ports:
      - 9876:9876
    volumes:
      - ./data/namesrv/logs:/home/rocketmq/logs
      - ./data/namesrv/store:/home/rocketmq/store
    environment:
      - TZ=Asia/Shanghai
      - JAVA_OPT_EXT=-Duser.home=/home/rocketmq -Xms512m -Xmx512m
    command: ["sh", "mqnamesrv"]

  rocketmq-broker:
    image: rocketmqinc/rocketmq:4.4.0
    container_name: rocketmq-broker
    restart: unless-stopped
    ports:
      - 10909:10909
      - 10911:10911
    volumes:
      - ./config/broker.conf:/etc/rocketmq/broker.conf
      - ./data/broker/logs:/home/rocketmq/logs
      - ./data/broker/store:/home/rocketmq/store
    environment:
      - TZ=Asia/Shanghai
      - JAVA_OPT_EXT=-Duser.home=/home/broker -Xms512m -Xmx512m
    command:
      [
        "sh",
        "mqbroker",
        "-c",
        "/etc/rocketmq/broker.conf",
        "-n",
        "rocketmq-namesrv:9876",
        "autoCreateTopicEnable=true",
      ]
    depends_on:
      - rocketmq-namesrv

  rocketmq-console:
    image: styletang/rocketmq-console-ng:1.0.0
    container_name: rocketmq-console
    restart: unless-stopped
    ports:
      - 8080:8080
    volumes:
      - ./data/console:/tmp
    environment:
      - TZ=Asia/Shanghai
      - JAVA_OPTS=-Drocketmq.namesrv.addr=rocketmq-namesrv:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false -Xms256m -Xmx256m
    depends_on:
      - rocketmq-namesrv
```

下面是 `./config/broker.conf` 文件的示例

```
# 集群名称
brokerClusterName = DefaultCluster
# 节点名称
brokerName = broker-a
# 节点ID，0表示master，其他的正整数表示slave，不能小于0。
brokerId = 0
# Broker服务地址，内部使用填内网ip，如果是需要给外部使用填公网ip。
brokerIP1 = 192.168.1.2
# Broker角色
brokerRole = ASYNC_MASTER
# 刷盘方式
flushDiskType = ASYNC_FLUSH
# 在每天的什么时间删除已经超过文件保留时间的CommitLog，默认值04。
deleteWhen = 04
# 以小时计算的文件保留时间，默认值72小时。
fileReservedTime = 72
# 是否允许Broker自动创建Topic，建议线下开启，线上关闭。
autoCreateTopicEnable = true
# 是否允许Broker自动创建订阅组，建议线下开启，线上关闭。
autoCreateSubscriptionGroup = true
```

### verdaccio(npm 私服)

[镜像地址](https://hub.docker.com/r/verdaccio/verdaccio) | [教程地址](https://blog.csdn.net/jxy139/article/details/129198445)  
启动前先配置 `./data/conf/config.yaml` 文件，配置内容看教程示例。

```yaml
services:
  verdaccio:
    image: verdaccio/verdaccio:6.1.3
    container_name: verdaccio
    restart: unless-stopped
    ports:
      - 3005:3005
    volumes:
      - ./data/conf:/verdaccio/conf
      - ./data/plugins:/verdaccio/plugins
      - ./data/storage:/verdaccio/storage
    environment:
      - TZ=Asia/Shanghai
      - VERDACCIO_PORT=3005
      - VERDACCIO_USER_NAME=root
```

### nexus(maven 私服)

[镜像地址](https://hub.docker.com/r/sonatype/nexus3) | [教程地址](https://blog.csdn.net/qiaohao0206/article/details/125471721)  
启动前先创建 `./data` 目录，并设置目录权限为 `777` 。

```yaml
services:
  nexus:
    image: sonatype/nexus3:3.81.1
    container_name: nexus
    restart: unless-stopped
    ports:
      - 8081:8081
    volumes:
      - ./data:/nexus-data
    environment:
      - TZ=Asia/Shanghai
```

### nacos

[镜像地址](https://hub.docker.com/r/nacos/nacos-server) | [官方文档](https://nacos.io/zh-cn/docs/quick-start-docker.html) | [数据库初始化](https://github.com/alibaba/nacos/blob/2bb7193d1b311ec04c844b61612d6a151013ae88/config/src/main/resources/META-INF/mysql-schema.sql) | [教程地址](https://www.cnblogs.com/studyjobs/p/18014237)  
启动前需要初始化数据库，默认的账号和密码都是 `nacos` 。

```yaml
services:
  nacos:
    image: nacos/nacos-server:v2.2.3
    container_name: nacos
    restart: unless-stopped
    ports:
      - 8848:8848
      - 9848:9848
      - 9849:9849
    volumes:
      - ./logs/:/home/nacos/logs
    environment:
      - TZ=Asia/Shanghai
      - MODE=standalone
      - SPRING_DATASOURCE_PLATFORM=mysql
      - MYSQL_SERVICE_HOST=<mysql_host>
      - MYSQL_SERVICE_PORT=3306
      - MYSQL_SERVICE_USER=<mysql_user>
      - MYSQL_SERVICE_PASSWORD=<mysql_password>
      - MYSQL_SERVICE_DB_NAME=nacos
      - MYSQL_SERVICE_DB_PARAM=characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
      - JVM_XMS=512m
      - JVM_XMX=512m
      - JVM_XMN=256m
      # 是否开启鉴权
      # 开启(true)：服务注册需要配置账号密码，nacos面板需要账号密码才能访问。
      # 关闭(false)：服务注册不需要配置账号密码，nacos面板不需要账号密码就能直接访问。
      - NACOS_AUTH_ENABLE=true
      # 随便用一个不少于32个字符组成的字符串，生成 base64 字符串，填写到这里即可。
      - NACOS_AUTH_TOKEN=VG9rZW5Ub2tlblRva2VuVG9rZW5Ub2tlblRva2VuVG9rZW4=
      # 随便填写
      - NACOS_AUTH_IDENTITY_KEY=NacosKey
      # 随便填写
      - NACOS_AUTH_IDENTITY_VALUE=NacosValue
```

### vsftpd(ftp)

[镜像地址](https://hub.docker.com/r/fauria/vsftpd) | [教程地址](http://zongming.net/read-1394/?h=ftp)

```yaml
services:
  vsftpd:
    image: fauria/vsftpd:latest
    container_name: vsftpd
    restart: unless-stopped
    ports:
      - 20:20
      - 21:21
      - 21100-21200:21100-21200
    volumes:
      - ./data:/home/vsftpd
      - ./logs/vsftpd.log:/var/log/vsftpd.log
    environment:
      - TZ=Asia/Shanghai
      - FTP_USER=<ftp_user>
      - FTP_PASS=<ftp_password>
      - PASV_MIN_PORT=21100
      - PASV_MAX_PORT=21200
```

### code-server(网页版 vscode)

[镜像地址](https://hub.docker.com/r/codercom/code-server) | [GitHub 地址](https://github.com/coder/code-server)  
启动前先创建 `./data` 目录，并设置目录权限为 `777` 。

```yaml
services:
  code-server:
    image: codercom/code-server:4.100.3
    container_name: code-server
    restart: unless-stopped
    ports:
      - 8080:8080
    volumes:
      - ./data:/home/coder
    environment:
      - TZ=Asia/Shanghai
      - PUID=0
      - PGID=0
      - PASSWORD=<site_password>
      - SUDO_PASSWORD=<sudo_password>
      # - HTTP_PROXY=http://<ip>:<port>
      # - HTTPS_PROXY=http://<ip>:<port>
```

### samba(samba 服务器)

[镜像地址](https://hub.docker.com/r/dperson/samba) | [教程地址](https://juejin.cn/post/7250398315778998327)

```yaml
services:
  samba:
    image: dperson/samba:latest
    container_name: samba
    restart: unless-stopped
    ports:
      - 139:139
      - 445:445
    volumes:
      - ./data:/mount
    environment:
      - TZ=Asia/Shanghai
    command: '-u "user1;password1" -u "user2;password2" -s "share;/mount/;yes;yes;yes;all;none" -s "public;/mount/;yes;no;no;all;none"'
```

### lychee(瀑布流相册)

[镜像地址](https://hub.docker.com/r/lycheeorg/lychee) | [GitHub 地址](https://github.com/LycheeOrg/Lychee-Docker/tree/master)

```yaml
services:
  lychee:
    image: lycheeorg/lychee:v6.6.9
    container_name: lychee
    restart: unless-stopped
    ports:
      - 8080:80
    volumes:
      - ./config:/conf
      - ./sym:/sym
      - ./data:/uploads
    environment:
      - TZ=Asia/Shanghai
      - PUID=1000
      - PGID=1000
      - DB_CONNECTION=sqlite
```

### lsky-pro(兰空图床)

[镜像地址](https://hub.docker.com/r/halcyonazure/lsky-pro-docker) | [GitHub 地址](https://github.com/HalcyonAzure/lsky-pro-docker)  
如果使用 https 访问，出现页面或图片加载问题，就执行下面的命令，注意将 `lsky-pro` 改为自己容器的名字。

```
docker exec -it lsky-pro sed -i '32 a \\\Illuminate\\Support\\Facades\\URL::forceScheme('"'"'https'"'"');' /var/www/html/app/Providers/AppServiceProvider.php
```

```yaml
services:
  lsky-pro:
    image: halcyonazure/lsky-pro-docker:latest
    container_name: lsky-pro
    restart: unless-stopped
    ports:
      - 8089:8089
    volumes:
      - ./data:/var/www/html
    environment:
      - TZ=Asia/Shanghai
      - WEB_PORT=8089
```

### easyimage(简单图床)

[镜像地址](https://hub.docker.com/r/ddsderek/easyimage) | [GitHub 地址](https://github.com/icret/EasyImages2.0)

```yaml
services:
  easyimage:
    image: ddsderek/easyimage:v2.8.6
    container_name: easyimage
    restart: unless-stopped
    ports:
      - 8080:80
    volumes:
      - ./config:/app/web/config
      - ./data:/app/web/i
    environment:
      - TZ=Asia/Shanghai
      - PUID=1000
      - PGID=1000
      - DEBUG=false
```

### draw.io(流程图绘制)

[镜像地址](https://hub.docker.com/r/jgraph/drawio) | [GitHub 地址](https://github.com/jgraph/drawio) | [教程地址](https://blog.uusite.com/cloud/deploy/218.html)  
启动后在工具栏 `Extras` -> `Language` 选择语言，刷新页面生效。

```yaml
services:
  draw:
    image: jgraph/drawio:latest
    container_name: draw
    restart: unless-stopped
    ports:
      - 8080:8080
    environment:
      - TZ=Asia/Shanghai
```

### voce-chat(在线聊天室)

[镜像地址](https://hub.docker.com/r/privoce/vocechat-server) | [官方文档](https://doc.voce.chat/zh-cn/)

```yaml
services:
  voce-chat:
    image: privoce/vocechat-server:v0.4.3
    container_name: voce-chat
    restart: unless-stopped
    ports:
      - 3000:3000
    volumes:
      - ./data:/home/vocechat-server/data
    environment:
      - TZ=Asia/Shanghai
```

### uptime-kuma(开源监控工具)

[镜像地址](https://hub.docker.com/r/louislam/uptime-kuma) | [教程地址](https://blog.csdn.net/csdnzxm/article/details/123081322)

```yaml
services:
  uptime-kuma:
    image: louislam/uptime-kuma:1.23.16
    container_name: uptime-kuma
    restart: unless-stopped
    ports:
      - 3001:3001
    volumes:
      - ./data:/app/data
    environment:
      - TZ=Asia/Shanghai
```

### docker-registry(docker 仓库)

[镜像地址](https://hub.docker.com/_/registry) | [教程地址](https://blog.csdn.net/qq120631157/article/details/104398209)

```yaml
services:
  registry:
    image: registry:3.0.0
    container_name: registry
    restart: unless-stopped
    ports:
      - 5000:5000
    volumes:
      - ./data:/var/lib/registry
    environment:
      - TZ=Asia/Shanghai
```

### rustdesk-server(RustDesk 远程桌面服务端)

[镜像地址](https://hub.docker.com/r/rustdesk/rustdesk-server-s6) | [GitHub 地址](https://github.com/rustdesk/rustdesk-server#docker-images) | [教程地址](https://www.hcjike.com/archives/GyeSDHJT)  
启动后查看 `./data/id_ed25519.pub` 文件获取公钥，用于客户端填写服务器的 `key`。

```yaml
services:
  rustdesk-server:
    image: rustdesk/rustdesk-server-s6:1.1.14
    container_name: rustdesk-server
    restart: unless-stopped
    ports:
      - 21115:21115
      - 21116:21116
      - 21116:21116/udp
      - 21117:21117
    volumes:
      - ./data:/data
    environment:
      - TZ=Asia/Shanghai
      - RELAY=rustdesk.example.com:21117
      - ENCRYPTED_ONLY=1
```

### dosgame(DOS 游戏)

[镜像地址](https://hub.docker.com/r/oldiy/dosgame-web-docker) | [GitHub 地址](https://github.com/rwv/chinese-dos-games)

```yaml
services:
  dosgame:
    image: oldiy/dosgame-web-docker:latest
    container_name: dosgame
    restart: unless-stopped
    ports:
      - 262:262
    environment:
      - TZ=Asia/Shanghai
```

### kuboard(k8s 可视化面板)

[镜像地址](https://hub.docker.com/r/eipwork/kuboard) | [教程地址](https://kuboard.cn/install/v3/install-built-in.html#安装) | [Nginx 代理](https://kuboard.cn/install/reverse-proxy.html#nginx-配置)  
Nginx 代理路径注意事项：`/` 不要配置 `websocket`，`/k8s-ws/` 需要配置 `websocket`

```yaml
services:
  kuboard:
    image: eipwork/kuboard:v3.5.2.7
    container_name: kuboard
    restart: unless-stopped
    ports:
      - 8080:80
      - 10081:10081
    volumes:
      - ./data:/data
    environment:
      - TZ=Asia/Shanghai
      - KUBOARD_ENDPOINT=http://<ip>:8080
      - KUBOARD_AGENT_SERVER_TCP_PORT=10081
```

### kubepi(k8s 可视化面板)

[镜像地址](https://hub.docker.com/r/1panel/kubepi) | [GitHub 地址](https://github.com/1Panel-dev/KubePi)

```yaml
services:
  kubepi:
    image: 1panel/kubepi:latest
    container_name: kubepi
    restart: unless-stopped
    privileged: true
    ports:
      - 8080:80
    environment:
      - TZ=Asia/Shanghai
```

### hnet-web(在线网页代理)

[镜像地址](https://hub.docker.com/r/stilleshan/hideipnetwork-web) | [教程地址](https://blog.tanglu.me/web-browser/)

```yaml
services:
  hideipnetwork-web:
    image: stilleshan/hideipnetwork-web:latest
    container_name: hideipnetwork-web
    restart: unless-stopped
    ports:
      - 56559:56559
    environment:
      - TZ=Asia/Shanghai
```

### memos(备忘录)

[镜像地址](https://hub.docker.com/r/neosmemo/memos) | [GitHub 地址](https://github.com/usememos/memos)

```yaml
services:
  memos:
    image: neosmemo/memos:0.24.0
    container_name: memos
    restart: unless-stopped
    ports:
      - 5230:5230
    volumes:
      - ./data:/var/opt/memos
    environment:
      - TZ=Asia/Shanghai
```

### neko(neko 远程浏览器)

[镜像地址](https://hub.docker.com/r/m1k1o/neko) | [教程地址](https://blog.tanglu.me/neko/)

```yaml
services:
  neko:
    image: m1k1o/neko:chromium
    container_name: neko
    restart: unless-stopped
    shm_size: 2gb
    ports:
      - 8080:8080
      - 52000-52100:52000-52100/udp
    cap_add:
      - SYS_ADMIN
    environment:
      - TZ=Asia/Shanghai
      - NEKO_SCREEN=1920x1080@60
      - NEKO_PASSWORD=<site_password>
      - NEKO_PASSWORD_ADMIN=<site_admin_password>
      - NEKO_EPR=52000-52100
      - NEKO_NAT1TO1=127.0.0.1
      - NEKO_FILE_TRANSFER_ENABLED=true
```

### lobe-chat(开源的高性能聊天机器人框架)

[镜像地址](https://hub.docker.com/r/lobehub/lobe-chat) | [GitHub 地址](https://github.com/lobehub/lobe-chat) | [环境变量](https://github.com/lobehub/lobe-chat/blob/main/src/config/server/provider.ts)

```yaml
services:
  lobe-chat:
    image: lobehub/lobe-chat:latest
    container_name: lobe-chat
    restart: unless-stopped
    ports:
      - 3210:3210
    environment:
      - TZ=Asia/Shanghai
      - ACCESS_CODE=<site_password> #可选
      - OLLAMA_PROXY_URL=<ollama_api_url> #可选
      - OPENAI_API_KEY=<openai_api_key> #可选
      - OPENAI_PROXY_URL=<openai_api_url> #可选
      - ANTHROPIC_API_KEY=<anthropic_api_key> #可选
      - ANTHROPIC_PROXY_URL=<anthropic_api_url> #可选
```

### chatgpt-next-web(跨平台 ChatGPT 应用)

[镜像地址](https://hub.docker.com/r/yidadaa/chatgpt-next-web) | [教程地址](https://github.com/Yidadaa/ChatGPT-Next-Web)

```yaml
services:
  chatgpt:
    image: yidadaa/chatgpt-next-web:latest
    container_name: chatgpt
    restart: unless-stopped
    ports:
      - 3000:3000
    environment:
      - TZ=Asia/Shanghai
      - OPENAI_API_KEY=<openai_api_key> #可选
      - CODE=<site_password> #可选
      - BASE_URL=<openai_api_url> #可选
      - OLLAMA_PROXY_URL=<ollama_api_url> #可选
```

### pairdrop(在线文件传输)

[镜像地址](https://hub.docker.com/r/linuxserver/pairdrop) | [GitHub 地址](https://github.com/schlagmichdoch/PairDrop)

```yaml
services:
  pair-drop:
    image: linuxserver/pairdrop:latest
    container_name: pair-drop
    restart: unless-stopped
    ports:
      - 3000:3000
    environment:
      - TZ=Asia/Shanghai
      - PUID=1000
      - PGID=1000
      - WS_FALLBACK=false
      - RTC_CONFIG=false
      - RATE_LIMIT=false
      - DEBUG_MODE=false
```

### it-tools(开发者工具箱)

[镜像地址](https://hub.docker.com/r/corentinth/it-tools) | [GitHub 地址](https://github.com/CorentinTh/it-tools)

```yaml
services:
  it-tools:
    image: corentinth/it-tools:latest
    container_name: it-tools
    restart: unless-stopped
    ports:
      - 8080:80
    environment:
      - TZ=Asia/Shanghai
```

### filecodebox(文件快递柜)

[镜像地址](https://hub.docker.com/r/lanol/filecodebox) | [GitHub 地址](https://github.com/vastsa/FileCodeBox)

```yaml
services:
  file-code-box:
    image: lanol/filecodebox:latest
    container_name: file-code-box
    restart: unless-stopped
    ports:
      - 12345:12345
    volumes:
      - ./data:/app/data
    environment:
      - TZ=Asia/Shanghai
```

### briefing(WebRTC 视频通话)

[镜像地址](https://hub.docker.com/r/holtwick/briefing) | [GitHub 地址](https://github.com/holtwick/briefing)

```yaml
services:
  briefing:
    image: holtwick/briefing:3.1.10
    container_name: briefing
    restart: unless-stopped
    ports:
      - 8080:8080
    environment:
      - TZ=Asia/Shanghai
```

### emby(emby 媒体服务器-学习版)

[镜像地址](https://hub.docker.com/r/amilys/embyserver)

```yaml
services:
  emby:
    image: amilys/embyserver:latest
    container_name: emby
    restart: unless-stopped
    privileged: true
    ports:
      - 8096:8096
    volumes:
      - ./data:/config
      - /your_media_path:/your_media_path
    environment:
      - TZ=Asia/Shanghai
      # 如果刮削不正常就尝试走代理
      # - HTTP_PROXY=http://<ip>:<port>
      # - HTTPS_PROXY=http://<ip>:<port>
```

### plex(plex 媒体服务器)

[镜像地址](https://hub.docker.com/r/linuxserver/plex) | [获取 claim](https://plex.tv/claim)  
访问端口 `32400`

```yaml
services:
  plex:
    image: linuxserver/plex:latest
    container_name: plex
    restart: unless-stopped
    network_mode: host
    volumes:
      - ./data:/config
      - /your_media_path:/your_media_path
    environment:
      - TZ=Asia/Shanghai
      - PUID=1000
      - PGID=1000
      - VERSION=docker
      - PLEX_CLAIM=<your_claim>
      # 如果刮削不正常就尝试走代理
      # - HTTP_PROXY=http://<ip>:<port>
      # - HTTPS_PROXY=http://<ip>:<port>
```

### stash(stash 媒体服务器)

[镜像地址](https://hub.docker.com/r/stashapp/stash) | [GitHub 地址](https://github.com/stashapp/stash)

```yaml
services:
  stash:
    image: stashapp/stash:latest
    container_name: stash
    restart: unless-stopped
    ports:
      - 9999:9999
    volumes:
      - ./data/config:/root/.stash
      - ./data/generated:/generated
      - ./data/metadata:/metadata
      - ./data/cache:/cache
      - /your_media_path:/your_media_path
    environment:
      - TZ=Asia/Shanghai
      - STASH_GENERATED=/generated/
      - STASH_METADATA=/metadata/
      - STASH_CACHE=/cache/
      - STASH_STASH=/your_media_path/
      - STASH_PORT=9999
    logging:
      driver: "json-file"
      options:
        max-file: "10"
        max-size: "2m"
```

### transmission(bt 下载工具)

[镜像地址](https://registry.hub.docker.com/r/linuxserver/transmission) | [中文 web-ui](https://github.com/ronggang/transmission-web-control)

```yaml
services:
  transmission:
    image: linuxserver/transmission:2.94-r3-ls53
    container_name: transmission
    restart: unless-stopped
    ports:
      - 9091:9091
      - 51413:51413
      - 51413:51413/udp
    volumes:
      - ./data:/config
      - ./downloads:/downloads
    environment:
      - TZ=Asia/Shanghai
      - PUID=1000
      - PGID=1000
      - TRANSMISSION_WEB_HOME=/config/transmission-web-ui
      - USER=<site_username>
      - PASS=<site_password>
```

### showdoc(在线文档)

[镜像地址](https://hub.docker.com/r/star7th/showdoc) | [帮助文档](https://www.showdoc.com.cn/help/)

```yaml
services:
  showdoc:
    image: star7th/showdoc:latest
    container_name: showdoc
    restart: unless-stopped
    privileged: true
    user: root
    ports:
      - 8080:80
    volumes:
      - ./data:/var/www/html
    environment:
      - TZ=Asia/Shanghai
```

### odoo(开源的商业应用程序)

[镜像地址](https://hub.docker.com/_/odoo) | [教程地址](https://www.cnblogs.com/gzxiaohai/p/17303629.html)  
安装自定义模块需要配置 `odoo.conf`，具体看教程。

```yaml
services:
  odoo:
    image: odoo:17.0
    container_name: odoo
    restart: unless-stopped
    ports:
      - 8069:8069
    volumes:
      - ./config:/etc/odoo
      - ./data:/var/lib/odoo
      - ./addons:/mnt/extra-addons
    environment:
      - TZ=Asia/Shanghai
      - HOST=<postgres_host>
      - USER=<postgres_user>
      - PASSWORD=<postgres_password>
```

### onlyoffice-server(onlyoffice 在线文档服务端)

[镜像地址](https://hub.docker.com/r/onlyoffice/documentserver)  
如果要使用 `jwt`，就去除 `- JWT_ENABLED=false`

```yaml
services:
  onlyoffice-server:
    image: onlyoffice/documentserver:latest
    container_name: onlyoffice-server
    restart: unless-stopped
    ports:
      - 8080:80
    environment:
      - TZ=Asia/Shanghai
      - JWT_ENABLED=false
```

### nextcloud(自建网盘)

[镜像地址](https://hub.docker.com/_/nextcloud)

```yaml
services:
  nextcloud:
    image: nextcloud:latest
    container_name: nextcloud
    restart: unless-stopped
    ports:
      - 8080:80
    volumes:
      - ./data:/var/www/html
    environment:
      - TZ=Asia/Shanghai
      - MYSQL_HOST=<mysql_host>
      - MYSQL_USER=<mysql_user>
      - MYSQL_PASSWORD=<mysql_password>
      - MYSQL_DATABASE=nextcloud
```

### kodbox(可道云)

[镜像地址](https://hub.docker.com/r/kodcloud/kodbox)  
免费版有 10 个用户的上限

```yaml
services:
  kodbox:
    image: kodcloud/kodbox:latest
    container_name: kodbox
    restart: unless-stopped
    ports:
      - 8080:80
    volumes:
      - ./data:/var/www/html
    environment:
      - TZ=Asia/Shanghai
```

### yourls(短链接工具)

[镜像地址](https://hub.docker.com/_/yourls) | [GitHub 地址](https://github.com/YOURLS/YOURLS)  
管理面板地址：`http://<your_site_ip>:8080/admin/`

```yaml
services:
  yourls:
    image: yourls:latest
    container_name: yourls
    restart: unless-stopped
    ports:
      - 8080:80
    environment:
      - TZ=Asia/Shanghai
      - YOURLS_DB_HOST=<mysql_host>
      - YOURLS_DB_USER=<mysql_user>
      - YOURLS_DB_PASS=<mysql_password>
      - YOURLS_DB_NAME=yourls
      - YOURLS_SITE=https://example.com
      - YOURLS_USER=<site_user>
      - YOURLS_PASS=<site_password>
```

### mattermost(在线聊天、协作、分享)

[镜像地址](https://hub.docker.com/r/mattermost/mattermost-team-edition) | [教程地址](https://cloud.tencent.com/developer/article/2121477)  
需要手动创建数据库 `mattermost`

```yaml
services:
  mattermost:
    image: mattermost/mattermost-team-edition:latest
    container_name: mattermost
    restart: unless-stopped
    read_only: false
    pids_limit: 200
    ports:
      - 8065:8065
    security_opt:
      - no-new-privileges:true
    tmpfs:
      - /tmp
    volumes:
      - ./data/config:/mattermost/config:rw
      - ./data/data:/mattermost/data:rw
      - ./data/logs:/mattermost/logs:rw
      - ./data/plugins:/mattermost/plugins:rw
      - ./data/client/plugins:/mattermost/client/plugins:rw
      - ./data/bleve-indexes:/mattermost/bleve-indexes:rw
    environment:
      - TZ=Asia/Shanghai
      - MM_SQLSETTINGS_DRIVERNAME=postgres
      - MM_SQLSETTINGS_DATASOURCE=postgres://<postgres_user>:<postgres_password>@<postgres_host>:5432/mattermost?sslmode=disable&connect_timeout=10
      - MM_BLEVESETTINGS_INDEXDIR=/mattermost/bleve-indexes
      - MM_SERVICESETTINGS_SITEURL=https://mattermost.example.com
```

### rocket.chat(在线 IM 聊天系统)

[镜像地址](https://hub.docker.com/_/rocket.chat) | [密码特殊字符转义](https://www.alibabacloud.com/help/zh/mongodb/support/why-is-the-instance-not-connected-if-the-password-in-the-connection-string-contains-special-characters)

```yaml
services:
  rocket-chat:
    image: rocket.chat:latest
    container_name: rocket-chat
    restart: unless-stopped
    ports:
      - 3000:3000
    volumes:
      - ./data:/app/uploads
    environment:
      - TZ=Asia/Shanghai
      - ROOT_URL=https://rocket-chat.example.com
      - MONGO_URL=mongodb://<mongo_user>:<mongo_password>@<mongo_host>:27017/rocket-chat?authSource=admin
      - MONGO_OPLOG_URL=mongodb://<mongo_user>:<mongo_password>@<mongo_host>:27017/local?authSource=admin
```

### nezha(哪吒监控-面板)

[官方文档](https://nezha.wiki/guide/dashboard.html) | [GitHub 地址](https://github.com/naiba/nezha) | [教程地址](https://emohe.cn/posts/10/)  
后台路径 `/dashboard` ，默认账号密码 `admin/admin` 。

```yaml
services:
  nezha:
    image: ghcr.nju.edu.cn/nezhahq/nezha:latest
    container_name: nezha
    restart: unless-stopped
    ports:
      - 8008:8008
    volumes:
      - ./data:/dashboard/data
```

### trilium(在线笔记)

[镜像地址](https://hub.docker.com/r/nriver/trilium-cn) | [GitHub 地址](https://github.com/Nriver/trilium-translation)

```yaml
services:
  trilium-cn:
    image: nriver/trilium-cn:0.63.7
    container_name: trilium-cn
    restart: unless-stopped
    ports:
      - 8080:8080
    volumes:
      - ./data:/root/trilium-data
    environment:
      - TZ=Asia/Shanghai
      - TRILIUM_DATA_DIR=/root/trilium-data
```

### n8n(开源低代码平台)

[镜像地址](https://hub.docker.com/r/n8nio/n8n) | [GitHub 地址](https://github.com/n8n-io/n8n) | [教程地址](https://n8n.akashio.com/article/n8n-deployment-method)

```yaml
services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - 5678:5678
    volumes:
      - ./data:/home/node/.n8n
    environment:
      - GENERIC_TIMEZONE=Asia/Shanghai
      - N8N_PROTOCOL=https
      - N8N_HOST=n8n.example.com
      - WEBHOOK_URL=https://n8n.example.com/
      - N8N_SECURE_COOKIE=false
```

### openai-edge-tts(文本转语音)

[镜像地址](https://hub.docker.com/r/travisvn/openai-edge-tts) | [GitHub 地址](https://github.com/travisvn/openai-edge-tts) | [模型列表](https://tts.travisvn.com/)

```yaml
services:
  openai-edge-tts:
    image: travisvn/openai-edge-tts:latest
    container_name: openai-edge-tts
    restart: unless-stopped
    ports:
      - 5050:5050
    environment:
      - TZ=Asia/Shanghai
      - PORT=5050
      - API_KEY=<your_api_key>
```

调用示例，需要替换 `your_api_key` 。

```
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key" \
  -d '{
    "model": "tts-1",
    "speed": "1.0",
    "input": "你好，远望世界。",
    "voice": "zh-CN-XiaoxiaoNeural"
  }' \
  --output speech.mp3
```

### teamspeak(团队语音服务端)

[镜像地址](https://hub.docker.com/_/teamspeak) | [教程地址](https://www.cnblogs.com/Yogile/p/17632826.html) | [客户端下载](https://www.teamspeak.com/zh-CN/downloads/#ts3client) | [汉化包下载](https://github.com/VigorousPro/TS3-Translation_zh-CN/releases)

```yaml
services:
  teamspeak:
    image: teamspeak:3.13.7
    container_name: teamspeak
    restart: unless-stopped
    ports:
      - 9987:9987/udp
      - 30033:30033
    volumes:
      - ./data:/var/ts3server
    environment:
      - TZ=Asia/Shanghai
      - TS3SERVER_LICENSE=accept
```

### xiaomusic(小爱音箱音乐播放)

[镜像地址](https://hub.docker.com/r/hanxi/xiaomusic) | [GitHub 地址](https://github.com/hanxi/xiaomusic)

```yaml
services:
  xiaomusic:
    image: hanxi/xiaomusic:latest
    container_name: xiaomusic
    restart: unless-stopped
    ports:
      - 58090:8090
    volumes:
      - ./data/xiaomusic_music:/app/music
      - ./data/xiaomusic_conf:/app/conf
    environment:
      XIAOMUSIC_PUBLIC_PORT: 58090
```

### FileCodeBox(文件快递柜)

[GitHub 地址](https://github.com/vastsa/FileCodeBox) | [教程地址](https://fcb-docs.aiuo.net/)  
后台管理路径：`http://<ip>:<port>/#/admin`，默认密码 `FileCodeBox2023`。

```yaml
services:
  filecodebox:
    image: lanol/filecodebox:latest
    container_name: filecodebox
    restart: unless-stopped
    ports:
      - 12345:12345
    volumes:
      - ./data:/app/data
    environment:
      - TZ=Asia/Shanghai
```
