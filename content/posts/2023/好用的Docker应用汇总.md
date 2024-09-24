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
- 国内用户搭配镜像加速食用更佳 `https://docker.1v1.uk`

## 二、应用汇总

### zerotier

[镜像地址](https://hub.docker.com/r/zerotier/zerotier) | [教程地址](http://www.360doc.com/content/12/0121/07/11604731_1081143038.shtml)

```yaml
services:
  zerotier:
    image: zerotier/zerotier
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

### watchtower(自动更新容器)

[镜像地址](https://hub.docker.com/r/containrrr/watchtower) | [教程地址](https://blog.csdn.net/qq_21127151/article/details/129574398)

```yaml
services:
  watchtower:
    image: containrrr/watchtower
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
如果选择使用 sqlite 数据库，`BOOT_OPTIONS` 只保留 `--server.port=8080` 参数即可。  
首次登录需要初始化管理员账号密码。

```yaml
services:
  nginx-web-ui:
    image: cym1102/nginxwebui
    container_name: nginx-web-ui
    restart: unless-stopped
    privileged: true
    network_mode: host
    volumes:
      - ./data:/home/nginxWebUI
      - ./www:/www
    environment:
      - TZ=Asia/Shanghai
      # - BOOT_OPTIONS=--server.port=8080 # 使用sqlite
      - BOOT_OPTIONS=--server.port=8080 --spring.database.type=mysql --spring.datasource.url=jdbc:mysql://<mysql-host>:3306/nginx-web-ui --spring.datasource.username=<mysql-user> --spring.datasource.password=<mysql-password>
```

### portainer-ce 汉化版

[镜像地址](https://hub.docker.com/r/6053537/portainer-ce) | [教程地址](https://imnks.com/3406.html)  
首次登录初始化管理员账号密码

```yaml
services:
  portainer-ce:
    image: 6053537/portainer-ce
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
    image: gitea/gitea
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
    image: gogs/gogs
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

[镜像地址](https://hub.docker.com/r/enwaiax/x-ui)  
默认账号密码: `admin`/`admin`

```yaml
services:
  xui:
    image: enwaiax/x-ui
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
      - JAVA_OPTS=-server -Xms512m -Xmx512m -Xmn256m
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
      - MINIO_ROOT_USER=minio
      - MINIO_ROOT_PASSWORD=your-minio-password
    command: server /data
```

### mysql

[镜像地址](https://hub.docker.com/_/mysql) | [教程地址](https://www.cnblogs.com/Galaxy1/p/17806388.html) | [内存优化](https://blog.csdn.net/weixin_43888891/article/details/122518719)  
注意事项：`my.cnf`的文件权限需要设置为`655`

```yaml
services:
  mysql:
    image: mysql:lts
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
      - MYSQL_ROOT_PASSWORD=your-mysql-password
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

### postgres

[镜像地址](https://hub.docker.com/_/postgres) | [教程地址](https://www.itcto.cn/jc/docker/docker-compose-postgresql/)

```yaml
services:
  postgres:
    image: postgres
    container_name: postgres
    restart: unless-stopped
    ports:
      - 5432:5432
    volumes:
      - ./data:/var/lib/postgresql/data
    environment:
      - TZ=Asia/Shanghai
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=your-postgres-password
      - POSTGRES_DB=postgres
```

### mongo

[镜像地址](https://hub.docker.com/_/mongo) | [教程地址](https://www.cnblogs.com/studyjobs/p/17626496.html)

```yaml
services:
  mongo:
    image: mongo
    container_name: mongo
    restart: unless-stopped
    ports:
      - 27017:27017
    volumes:
      - ./data:/data/db
    environment:
      - TZ=Asia/Shanghai
      - MONGO_INITDB_ROOT_USERNAME=<your-mogo-user>
      - MONGO_INITDB_ROOT_PASSWORD=<your-mogo-password>
```

### redis

[镜像地址](https://hub.docker.com/_/redis) | [教程地址](https://www.jianshu.com/p/094078ef4347)

```yaml
services:
  redis:
    image: redis
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

### httpd

[镜像地址](https://hub.docker.com/_/httpd)

```yaml
services:
  httpd1:
    image: httpd
    container_name: httpd1
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
    image: snowdreamtech/frps
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
    image: snowdreamtech/frpc
    container_name: frpc
    restart: unless-stopped
    network_mode: host
    volumes:
      - ./config/frpc.toml:/etc/frp/frpc.toml
    environment:
      - TZ=Asia/Shanghai
```

### alist(预装 aria2)

[镜像地址](https://hub.docker.com/r/xhofe/alist-aria2) | [教程地址](https://alist.nn.ci/zh/guide/install/docker.html)  
获取初始账号密码: 在宿主机执行`docker exec -it 容器ID bash`进入容器, 执行`./alist admin set your-password`手动设置密码

```yaml
services:
  alist:
    image: xhofe/alist-aria2
    container_name: alist
    restart: unless-stopped
    ports:
      - 5244:5244
      - 6800:6800
    volumes:
      - ./data:/opt/alist/data
      - ./mydata:/mydata
    environment:
      - TZ=Asia/Shanghai
      - PUID=0
      - PGID=0
      - UMASK=022
```

### rocketmq(单机部署)

[镜像地址](https://hub.docker.com/r/rocketmqinc/rocketmq) | [教程地址](https://www.jianshu.com/p/9ed30a99a50a) | [配置文件解释](https://blog.csdn.net/weixin_44606481/article/details/129780540)  
部署需要前先创建 `./config/broker.conf` 文件，下面有示例。

```yaml
services:
  rocketmq-namesrv:
    image: rocketmqinc/rocketmq
    container_name: rocketmq-namesrv
    restart: unless-stopped
    ports:
      - 9876:9876
    volumes:
      - ./data/namesrv/logs:/home/rocketmq/logs
      - ./data/namesrv/store:/home/rocketmq/store
    environment:
      - TZ=Asia/Shanghai
      - JAVA_OPT_EXT=-Duser.home=/home/rocketmq -Xms512m -Xmx512m -Xmn256m
    command: ["sh", "mqnamesrv"]

  rocketmq-broker:
    image: rocketmqinc/rocketmq
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
      - JAVA_OPT_EXT=-Duser.home=/home/broker -Xms512m -Xmx512m -Xmn256m
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
    image: styletang/rocketmq-console-ng
    container_name: rocketmq-console
    restart: unless-stopped
    ports:
      - 8080:8080
    volumes:
      - ./data/console:/tmp
    environment:
      - TZ=Asia/Shanghai
      - JAVA_OPTS=-Drocketmq.namesrv.addr=rocketmq-namesrv:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false -Xms256m -Xmx256m -Xmn128m
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

```yaml
services:
  verdaccio:
    image: verdaccio/verdaccio
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

```yaml
services:
  nexus:
    image: sonatype/nexus3
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
默认的账号和密码都是 `nacos`

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
      - MYSQL_SERVICE_HOST=your-mysql-host
      - MYSQL_SERVICE_PORT=3306
      - MYSQL_SERVICE_USER=root
      - MYSQL_SERVICE_PASSWORD=your-mysql-password
      - MYSQL_SERVICE_DB_NAME=nacos
      - MYSQL_SERVICE_DB_PARAM=characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
      - JVM_XMS=512m
      - JVM_XMX=512m
      - JVM_XMN=256m
      - JVM_MS=64m
      - JVM_MMS=256m
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
    image: fauria/vsftpd
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
      - FTP_USER=root
      - FTP_PASS=your-password
      - PASV_MIN_PORT=21100
      - PASV_MAX_PORT=21200
```

### code-server(网页版 vscode)

[镜像地址](https://hub.docker.com/r/codercom/code-server) | [github 地址](https://github.com/coder/code-server)  
如果启动失败，日志显示没有权限创建文件或目录，可以试试给`./data`目录提升读写权限。

```yaml
services:
  code-server:
    image: codercom/code-server
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
      - PASSWORD=your-password
      - SUDO_PASSWORD=your-password
```

### samba(samba 服务器)

[镜像地址](https://hub.docker.com/r/dperson/samba) | [教程地址](https://juejin.cn/post/7250398315778998327)

```yaml
services:
  samba:
    image: dperson/samba
    container_name: samba
    restart: unless-stopped
    ports:
      - 139:139
      - 445:445
    volumes:
      - ./data:/mount
    environment:
      - TZ=Asia/Shanghai
    command: '-u "username1;password1" -u "username2;password2" -s "share;/mount/;yes;yes;yes;all;none" -s "public;/mount/;yes;no;no;all;none"'
```

### lychee(瀑布流相册)

[镜像地址](https://hub.docker.com/r/lycheeorg/lychee) | [github 地址](https://github.com/LycheeOrg/Lychee-Docker/tree/master)

```yaml
services:
  lychee:
    image: lycheeorg/lychee
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

[镜像地址](https://hub.docker.com/r/halcyonazure/lsky-pro-docker) | [github 地址](https://github.com/HalcyonAzure/lsky-pro-docker)

```yaml
services:
  lsky-pro:
    image: halcyonazure/lsky-pro-docker
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

[镜像地址](https://hub.docker.com/r/ddsderek/easyimage) | [github 地址](https://github.com/icret/EasyImages2.0)

```yaml
services:
  easyimage:
    image: ddsderek/easyimage
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

### voce-chat(在线聊天室)

[镜像地址](https://hub.docker.com/r/privoce/vocechat-server) | [官方文档](https://doc.voce.chat/zh-cn/)

```yaml
services:
  voce-chat:
    image: privoce/vocechat-server
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
    image: louislam/uptime-kuma
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
  docker-registry:
    image: registry
    container_name: docker-registry
    restart: unless-stopped
    ports:
      - 5000:5000
    volumes:
      - ./data:/var/lib/registry
    environment:
      - TZ=Asia/Shanghai
```

### rustdesk-server(RustDesk 远程桌面服务端)

[镜像地址](https://hub.docker.com/r/rustdesk/rustdesk-server) | [github 地址](https://github.com/rustdesk/rustdesk-server#docker-images)  
部署完成后，查看 `./data/id_ed25519.pub` 文件获取公钥，用于客户端填写服务器的 `key`。

```yaml
services:
  rustdesk-server:
    image: rustdesk/rustdesk-server-s6
    container_name: rustdesk-server
    restart: unless-stopped
    ports:
      - 21115:21115
      - 21116:21116
      - 21116:21116/udp
      - 21117:21117
      - 21118:21118
      - 21119:21119
    volumes:
      - ./data:/data
    environment:
      - TZ=Asia/Shanghai
      - RELAY=rustdesk.example.com:21117
      - ENCRYPTED_ONLY=1
```

### dosgame(DOS 游戏)

[镜像地址](https://hub.docker.com/r/oldiy/dosgame-web-docker) | [github 地址](https://github.com/rwv/chinese-dos-games)

```yaml
services:
  dosgame:
    image: oldiy/dosgame-web-docker
    container_name: dosgame
    restart: unless-stopped
    ports:
      - 262:262
    environment:
      - TZ=Asia/Shanghai
```

### kuboard(k8s 可视化面板)

[镜像地址](https://hub.docker.com/r/eipwork/kuboard) | [教程地址](https://kuboard.cn/install/v3/install-built-in.html#安装) | [Nginx 代理](https://kuboard.cn/install/reverse-proxy.html#nginx-配置)  
Nginx 代理路径注意事项：`/`不要配置`WebSocket`，`/k8s-ws/`需要配置`WebSocket`

```yaml
services:
  kuboard:
    image: eipwork/kuboard:v3
    container_name: kuboard
    restart: unless-stopped
    ports:
      - 8080:80
      - 10081:10081
    volumes:
      - ./data:/data
    environment:
      - TZ=Asia/Shanghai
      - KUBOARD_ENDPOINT=http://<your-ip>:8080
      - KUBOARD_AGENT_SERVER_TCP_PORT=10081
```

### kubepi(k8s 可视化面板)

[镜像地址](https://hub.docker.com/r/1panel/kubepi) | [github 地址](https://github.com/1Panel-dev/KubePi)

```yaml
services:
  kubepi:
    image: 1panel/kubepi
    container_name: kubepi
    restart: unless-stopped
    privileged: true
    ports:
      - 8080:80
    environment:
      - TZ=Asia/Shanghai
```

### rainbond(云原生平台)

[教程地址](https://www.rainbond.com/docs/installation/install-with-ui/)

```yaml
services:
  rainbond:
    image: registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.15.0-release-allinone
    container_name: rainbond
    restart: unless-stopped
    network_mode: host
    volumes:
      - ./.ssh:/root/.ssh
      - ./data:/app/data
    environment:
      - TZ=Asia/Shanghai
```

### hnet-web(在线网页代理)

[镜像地址](https://hub.docker.com/r/stilleshan/hideipnetwork-web) | [教程地址](https://blog.tanglu.me/web-browser/)

```yaml
services:
  hideipnetwork-web:
    image: stilleshan/hideipnetwork-web
    container_name: hideipnetwork-web
    restart: unless-stopped
    ports:
      - 56559:56559
    environment:
      - TZ=Asia/Shanghai
```

### memos(备忘录)

[镜像地址](https://hub.docker.com/r/neosmemo/memos) | [github 地址](https://github.com/usememos/memos)

```yaml
services:
  memos:
    image: neosmemo/memos
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
    image: m1k1o/neko:firefox
    container_name: neko
    restart: "unless-stopped"
    shm_size: "2gb"
    ports:
      - 8080:8080
      - 52000-52100:52000-52100/udp
    cap_add:
      - SYS_ADMIN
    environment:
      - TZ=Asia/Shanghai
      - NEKO_SCREEN='1920x1080@60'
      - NEKO_PASSWORD=neko
      - NEKO_PASSWORD_ADMIN=admin
      - NEKO_EPR=52000-52100
      - NEKO_NAT1TO1=127.0.0.1
      - NEKO_FILE_TRANSFER_ENABLED=true
```

### lobe-chat(开源的高性能聊天机器人框架)

[镜像地址](https://hub.docker.com/r/lobehub/lobe-chat) | [github 地址](https://github.com/lobehub/lobe-chat) | [环境变量](https://github.com/lobehub/lobe-chat/blob/main/src/config/server/provider.ts)

```yaml
services:
  lobe-chat:
    image: lobehub/lobe-chat
    container_name: lobe-chat
    restart: unless-stopped
    ports:
      - 3210:3210
    environment:
      - TZ=Asia/Shanghai
      - ACCESS_CODE=your-password
      - OLLAMA_PROXY_URL=your-ollama-url
      - OPENAI_API_KEY=your-openai-key
      - OPENAI_PROXY_URL=your-openai-url
      - ANTHROPIC_API_KEY=your-anthropic-key
      - ANTHROPIC_PROXY_URL=your-anthropic-url
```

### chatgpt-next-web(跨平台 ChatGPT 应用)

[镜像地址](https://hub.docker.com/r/yidadaa/chatgpt-next-web) | [教程地址](https://github.com/Yidadaa/ChatGPT-Next-Web)

```yaml
services:
  chatgpt:
    image: yidadaa/chatgpt-next-web
    container_name: chatgpt
    restart: unless-stopped
    ports:
      - 3000:3000
    environment:
      - TZ=Asia/Shanghai
      - OPENAI_API_KEY=your-key
      - CODE=your-password
      - BASE_URL=https://your-openai-api-url/v1
      - OLLAMA_PROXY_URL=https://your-ollama-api-url/v1
```

### pairdrop(在线文件传输)

[镜像地址](https://hub.docker.com/r/linuxserver/pairdrop) | [github 地址](https://github.com/schlagmichdoch/PairDrop)

```yaml
services:
  pair-drop:
    image: linuxserver/pairdrop
    container_name: pair-drop
    restart: unless-stopped
    ports:
      - 3000:3000
    environment:
      - TZ=Asia/Shanghai
      - PUID=1000
      - PGID=1000
      - RATE_LIMIT=false
      - WS_FALLBACK=false
```

### it-tools(开发者工具箱)

[镜像地址](https://hub.docker.com/r/corentinth/it-tools) | [github 地址](https://github.com/CorentinTh/it-tools)

```yaml
services:
  it-tools:
    image: corentinth/it-tools
    container_name: it-tools
    restart: unless-stopped
    ports:
      - 8080:80
    environment:
      - TZ=Asia/Shanghai
```

### filecodebox(文件快递柜)

[镜像地址](https://hub.docker.com/r/lanol/filecodebox) | [github 地址](https://github.com/vastsa/FileCodeBox)

```yaml
services:
  file-code-box:
    image: lanol/filecodebox:beta
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

[镜像地址](https://hub.docker.com/r/holtwick/briefing) | [github 地址](https://github.com/holtwick/briefing)

```yaml
services:
  briefing:
    image: holtwick/briefing
    container_name: briefing
    restart: unless-stopped
    ports:
      - 8080:8080
    environment:
      - TZ=Asia/Shanghai
```

### emby(emby 多媒体服务器-特别版)

[镜像地址](https://hub.docker.com/r/lovechen/embyserver)

```yaml
services:
  emby:
    image: lovechen/embyserver
    container_name: emby
    restart: unless-stopped
    ports:
      - 8096:8096
      - 8920:8920
      - 1900:1900/udp
      - 7359:7359/udp
    volumes:
      - ./data:/config
      - ./your-media-path:/media
    environment:
      - TZ=Asia/Shanghai
      - UID=0
      - GID=0
      - GIDLIST=0
      - NVIDIA_VISIBLE_DEVICES=all
    devices:
      - /dev/dri:/dev/dri
```

### plex(plex 多媒体服务器)

[镜像地址](https://hub.docker.com/r/linuxserver/plex) | [获取 claim](https://plex.tv/claim)

```yaml
services:
  plex:
    image: linuxserver/plex
    container_name: plex
    restart: unless-stopped
    network_mode: host
    volumes:
      - ./data:/config
      - ./your-media-path:/media
    environment:
      - TZ=Asia/Shanghai
      - PUID=1000
      - PGID=1000
      - VERSION=docker
      - PLEX_CLAIM=your-claim
```

### stash(stash 多媒体管理)

[镜像地址](https://hub.docker.com/r/stashapp/stash) | [github 地址](https://github.com/stashapp/stash)

```yaml
services:
  stash:
    image: stashapp/stash
    container_name: stash
    restart: unless-stopped
    ports:
      - "9999:9999"
    volumes:
      - ./data/config:/root/.stash
      - ./data/generated:/generated
      - ./data/metadata:/metadata
      - ./data/cache:/cache
      - ./your-media-path:/media
    environment:
      - TZ=Asia/Shanghai
      - STASH_GENERATED=/generated/
      - STASH_METADATA=/metadata/
      - STASH_CACHE=/cache/
      - STASH_STASH=/media/
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
    image: linuxserver/transmission
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
      - USER=your-username
      - PASS=your-password
```

### showdoc(在线文档)

[镜像地址](https://hub.docker.com/r/star7th/showdoc) | [帮助文档](https://www.showdoc.com.cn/help/)

```yaml
services:
  showdoc:
    image: star7th/showdoc
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
安装自定义模块需要配置`odoo.conf`，具体看教程。

```yaml
services:
  odoo:
    image: odoo
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
      - HOST=your-postgres-host
      - USER=your-postgres-user
      - PASSWORD=your-postgres-password
```

### onlyoffice-server(onlyoffice 在线文档服务端)

[镜像地址](https://hub.docker.com/r/onlyoffice/documentserver)  
如果要使用`jwt`，就去除`- JWT_ENABLED=false`

```yaml
services:
  onlyoffice-server:
    image: onlyoffice/documentserver
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
    image: nextcloud
    container_name: nextcloud
    restart: unless-stopped
    ports:
      - 8080:80
    volumes:
      - ./data:/var/www/html
    environment:
      - TZ=Asia/Shanghai
      - MYSQL_HOST=your-mysql-host
      - MYSQL_USER=your-mysql-user
      - MYSQL_PASSWORD=your-mysql-password
      - MYSQL_DATABASE=nextcloud
```

### kodbox(可道云)

[镜像地址](https://hub.docker.com/r/kodcloud/kodbox)  
免费版有 10 个用户的上限

```yaml
services:
  kodbox:
    image: kodcloud/kodbox
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

[镜像地址](https://hub.docker.com/_/yourls) | [github 地址](https://github.com/YOURLS/YOURLS)  
首次登录需要初始化数据库，管理面板地址：`http://<your-site-ip>:8080/admin/`

```yaml
services:
  yourls:
    image: yourls
    container_name: yourls
    restart: unless-stopped
    ports:
      - 8080:80
    environment:
      - TZ=Asia/Shanghai
      - YOURLS_DB_HOST=your-mysql-host
      - YOURLS_DB_USER=your-mysql-user
      - YOURLS_DB_PASS=your-mysql-password
      - YOURLS_DB_NAME=yourls
      - YOURLS_SITE=https://example.com
      - YOURLS_USER=your-site-user
      - YOURLS_PASS=your-site-password
```

### mattermost(在线聊天、协作、分享)

[镜像地址](https://hub.docker.com/r/mattermost/mattermost-team-edition) | [教程地址](https://cloud.tencent.com/developer/article/2121477)  
需要手动创建数据库 `mattermost`

```yaml
services:
  mattermost:
    image: mattermost/mattermost-team-edition
    container_name: mattermost
    restart: unless-stopped
    read_only: false
    pids_limit: 200
    ports:
      - 8065:8065
      - 8443:8443
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
    image: rocket.chat
    container_name: rocket-chat
    restart: unless-stopped
    ports:
      - 3000:3000
    volumes:
      - ./data:/app/uploads
    environment:
      - TZ=Asia/Shanghai
      - ROOT_URL=https://rocket-chat.example.com
      - MONGO_URL=mongodb://<mongo-user>:<mongo-password>@<mongo-host>:27017/rocket-chat?authSource=admin
      - MONGO_OPLOG_URL=mongodb://<mongo-user>:<mongo-password>@<mongo-host>:27017/local?authSource=admin
```

### nezha(哪吒监控-面板)

[镜像地址](https://github.com/naiba/nezha/pkgs/container/nezha-dashboard) | [官方文档](https://nezha.wiki/guide/dashboard.html) | [github 地址](https://github.com/naiba/nezha) | [官方 config.yaml](https://github.com/naiba/nezha/blob/master/script/config.yaml)

> 推荐使用官方的一键脚本部署。  
> 这里是给~~像我一样~~有 docker 部署洁癖的人参考的。

- 部署前根据官方文档获取 `Oauth2` 登录配置。
- 根据官方的 `config.yaml` 示例或下方我提供的示例，创建 `./data/config.yaml` 文件。
- 修改文件里 `Oauth2` 登录相关的配置，然后就可以部署了。
- 成功部署后，剩下的配置可以在面板的管理后台慢慢配置。

```yaml
services:
  nezha:
    image: ghcr.io/naiba/nezha-dashboard
    container_name: nezha
    restart: unless-stopped
    ports:
      - 8008:80
      - 5555:5555
    volumes:
      - ./data:/dashboard/data
      - ./static-custom/static:/dashboard/resource/static/custom:ro
      - ./theme-custom/template:/dashboard/resource/template/theme-custom:ro
      - ./dashboard-custom/template:/dashboard/resource/template/dashboard-custom:ro
```

下方是我的`./data/config.yaml`文件，请自行按需修改。

```
AvgPingCount: 2
Cover: 0
DDNS:
  AccessID: ""
  AccessSecret: ""
  Enable: false
  MaxRetries: 3
  Profiles:
    example:
      AccessID: ""
      AccessSecret: ""
      Provider: ""
      WebhookHeaders: ""
      WebhookMethod: ""
      WebhookRequestBody: ""
      WebhookURL: ""
  Provider: webhook
  WebhookHeaders: ""
  WebhookMethod: ""
  WebhookRequestBody: ""
  WebhookURL: ""
Debug: false
DisableSwitchTemplateInFrontend: false
EnableIPChangeNotification: false
EnablePlainIPInNotification: false
GRPCHost: nezha.example.com # 面板所在的服务器域名或ip
GRPCPort: 5555 # 容器内面板和Agent通信的端口
HTTPPort: 80 # 容器内面板的端口
IPChangeNotificationTag: default
IgnoredIPNotification: ""
IgnoredIPNotificationServerIDs: {}
Language: zh-CN
Location: Asia/Shanghai
MaxTCPPingValue: 1000
Oauth2:
  Admin: username # 管理员列表，半角逗号隔开，这里填写github的用户名
  AdminGroups: ""
  ClientID: ***************** # 根据官方文档里的教程获取
  ClientSecret: ************************* # 根据官方文档里的教程获取
  Endpoint: "" # 如gitea自建需要设置
  OidcAutoCreate: false
  OidcAutoLogin: false
  OidcDisplayName: OIDC
  OidcGroupClaim: groups
  OidcIssuer: ""
  OidcLoginClaim: sub
  OidcLogoutURL: ""
  OidcRegisterURL: ""
  OidcScopes: openid,profile,email
  Type: github # Oauth2 登录接入类型，github/gitlab/jihulab/gitee/gitea
ProxyGRPCPort: 0
Site:
  Brand: 哪吒监控 # 站点名称
  CookieName: nezha-dashboard # 浏览器 Cookie 字段名，可不改
  CustomCode: ""
  CustomCodeDashboard: ""
  DashboardTheme: default
  Theme: default
  ViewPassword: ""
TLS: false
```
