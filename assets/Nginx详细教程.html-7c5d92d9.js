import{_ as e,V as i,W as n,$ as d}from"./framework-06105c01.js";const s="/img/nginx-01.png",l="/img/nginx-02.png",a="/img/nginx-03.png",r="/img/nginx-04.png",v="/img/nginx-05.png",c={},t=d('<h2 id="一、nginx介绍" tabindex="-1"><a class="header-anchor" href="#一、nginx介绍" aria-hidden="true">#</a> 一、Nginx介绍</h2><h3 id="_1-1-引言" tabindex="-1"><a class="header-anchor" href="#_1-1-引言" aria-hidden="true">#</a> 1.1 引言</h3><blockquote><p>为什么要学习<code>Nginx</code><br> 问题1：客户端到底要将请求发送给哪台服务器<br> 问题2：如果所有客户端的请求都发送给了服务器<br> 问题3：客户端发送的请求可能是申请动态资源的，也有申请静态资源的<br></p></blockquote><p><strong>服务器搭建集群后</strong></p><figure><img src="'+s+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>在搭建集群后，使用Nginx做反向代理</strong></p><figure><img src="'+l+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_1-2-nginx介绍" tabindex="-1"><a class="header-anchor" href="#_1-2-nginx介绍" aria-hidden="true">#</a> 1.2 Nginx介绍</h3><p><code>Nginx</code>是由俄罗斯人研发的，应对<code>Rambler</code>的网站并发，并且2004年发布的第一个版本</p><blockquote><p><strong>Nginx的特点</strong></p><ol><li>稳定性极强，7*24小时不间断运行(就是一直运行)</li><li>Nginx提供了非常丰富的配置实例</li><li>占用内存小，并发能力强（随便配置一下就是5w+，而tomcat的默认线程池是150）</li></ol></blockquote><h2 id="二、nginx的安装" tabindex="-1"><a class="header-anchor" href="#二、nginx的安装" aria-hidden="true">#</a> 二、Nginx的安装</h2><h3 id="_2-1-安装nginx" tabindex="-1"><a class="header-anchor" href="#_2-1-安装nginx" aria-hidden="true">#</a> 2.1 安装Nginx</h3><p>使用<code>docker-compose</code>安装</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#在/opt目录下创建docker_nginx目录
cd /opt
mkdir docker_nginx
#创建docker-compose.yml文件并编写下面的内容,保存退出
vim docker-compose.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &#39;3.1&#39;
services: 
  nginx:
    restart: always
    image: daocloud.io/library/nginx:latest
    container_name: nginx
    ports: 
      - 80:80
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>执行docker-compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-nginx的配置文件" tabindex="-1"><a class="header-anchor" href="#_2-2-nginx的配置文件" aria-hidden="true">#</a> 2.2 Nginx的配置文件</h3><p><code>Nginx</code>的核心配置文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 查看当前nginx的配置需要进入docker容器中
docker exec -it 容器id bash
# 进入容器后
cd /etc/nginx/
cat nginx.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>nginx.conf</code>文件内容如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
# 以上同称为全局块
# worker_processes的数值越大，Nginx的并发能力就越强
# error_log代表Nginx错误日志存放的位置
# pid是Nginx运行的一个标识

events {
    worker_connections  1024;
}
# events块
# worker_connections的数值越大，Nginx的并发能力就越强

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;
                      &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;
                      &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}

# http块
# include 代表引入一个外部文件
# include /etc/nginx/mime.types;    mime.types中存放着大量媒体类型
# include /etc/nginx/conf.d/*.conf; 引入了conf.d下以.conf为结尾的配置文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>conf.d</code>目录下只有一个<code>default.conf</code>文件，内容如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
    # location块
    # root:将接受到的请求根据/usr/share/nginx/html去查找静态资源
    # index:默认去上述的路径中找到index.html或index.htm

}

# server块
# listen代表Nginx监听的端口号
# server_name代表Nginx接受请求的IP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-修改docker-compose文件" tabindex="-1"><a class="header-anchor" href="#_2-3-修改docker-compose文件" aria-hidden="true">#</a> 2.3 修改docker-compose文件</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 退出容器
exit
# 关闭容器
docker-compose down
# 修改docker-compose.yml文件如下
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &#39;3.1&#39;
services: 
  nginx:
    restart: always
    image: daocloud.io/library/nginx:latest
    container_name: nginx
    ports: 
      - 80:80
    volumes:
      - /opt/docker_nginx/conf.d/:/etc/nginx/conf.d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 重新构建容器
docker-compose bulid
# 重新启动容器
docker-compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时我们再次访问<code>80</code>端口是访问不到的，因为我们映射了数据卷之后还没有编写<code>server</code>块中的内容</p><p>接下来我们在<code>/opt/docker_nginx/conf.d</code>下新建<code>default.conf</code>，并插入如下内容</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 重启nginx
docker-compose restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、nginx的反向代理" tabindex="-1"><a class="header-anchor" href="#三、nginx的反向代理" aria-hidden="true">#</a> 三、Nginx的反向代理</h2><h3 id="_3-1-正向代理和反向代理介绍" tabindex="-1"><a class="header-anchor" href="#_3-1-正向代理和反向代理介绍" aria-hidden="true">#</a> 3.1 正向代理和反向代理介绍</h3><blockquote><p>正向代理：</p><ol><li>正向代理服务是由客户端设立的</li><li>客户端了解代理服务器和目标服务器都是谁</li><li>帮助咱们实现突破访问权限，提高访问的速度，对目标服务器隐藏客户端的ip地址</li></ol></blockquote><figure><img src="`+a+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p>反向代理：</p><ol><li>反向代理服务器是配置在服务端的</li><li>客户端不知道访问的到底是哪一台服务器</li><li>达到负载均衡，并且可以隐藏服务器真正的ip地址</li></ol></blockquote><figure><img src="'+r+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_3-2-基于nginx实现反向代理" tabindex="-1"><a class="header-anchor" href="#_3-2-基于nginx实现反向代理" aria-hidden="true">#</a> 3.2 基于Nginx实现反向代理</h3><blockquote><ol><li>准备一个目标服务器</li><li>启动tomcat服务器</li><li>编写nginx的配置文件(/opt/docker_nginx/conf.d/default.conf)，通过Nginx访问到tomcat服务器</li></ol></blockquote><p>准备<code>Tomcat</code>服务器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run -d -p 8080:8080 --name tomcat  daocloud.io/library/tomcat:8.5.15-jre8
#或者已经下载了tomcat镜像
docker run -d -p 8080:8080 --name tomcat 镜像的标识
#添加数据卷
docker run -it -v /宿主机绝对目录:/容器内目录 镜像名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>default.conf</code>文件内容如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;
    # 基于反向代理访问Tomcat服务器
    location / {
        proxy_pass http://IP:8080/;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 重启nginx 
docker-compose restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这时我们访问<code>80</code>端口可以看到<code>8080</code>端口tomcat的默认首页</p><h3 id="_3-3-关于nginx的location路径映射" tabindex="-1"><a class="header-anchor" href="#_3-3-关于nginx的location路径映射" aria-hidden="true">#</a> 3.3 关于Nginx的location路径映射</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>优先级关系：
(location = ) 
    &gt; (location /xxx/yyy/zzz) 
    &gt; (location ^~) 
    &gt; (location ~,~*) 
    &gt; (location /起始路径) 
    &gt; (location /)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 1. = 匹配
location / {
    # 精准匹配，主机名后面不能带能和字符串
    # 例如www.baidu.com不能是www.baidu.com/id=xxx
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 2. 通用匹配
location /xxx {
    # 匹配所有以/xxx开头的路径
    # 例如127.0.0.1:8080/xxx  xxx可以为空，为空则和=匹配一样
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 3. 正则匹配
location ~ /xxx {
    # 匹配所有以/xxx开头的路径
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 4. 匹配开头路径
location ^~ /xxx/xx {
    # 匹配所有以/xxx/xx开头的路径
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 5. 匹配结尾路径
location ~* \\.(gif/jpg/png)$ {
    # 匹配以.gif、.jpg或者.png结尾的路径
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改<code>/opt/docker_nginx/conf.d/default.conf</code>如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location /index {
        proxy_pass http://IP:8081/; # A首页
    }

    location ^~ /mall/ {
        proxy_pass http://IP:8080/; # B首页
    }

    location / {
        proxy_pass http://IP:8080/; # C首页
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker-compose restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="四、nginx负载均衡" tabindex="-1"><a class="header-anchor" href="#四、nginx负载均衡" aria-hidden="true">#</a> 四、Nginx负载均衡</h2><blockquote><p>Nginx为我们默认提供了三种负载均衡的策略：</p><ol><li>轮询： 将客户端发起的请求，平均分配给每一台服务器</li><li>权重： 会将客户端的请求，根据服务器的权重值不同，分配不同的数量</li><li>ip_hash: 基于发起请求的客户端的ip地址不同，他始终会将请求发送到指定的服务器上 就是说如果这个客户端的请求的ip地址不变，那么处理请求的服务器将一直是同一个</li></ol></blockquote><h3 id="_4-1-轮询" tabindex="-1"><a class="header-anchor" href="#_4-1-轮询" aria-hidden="true">#</a> 4.1 轮询</h3><p>想实现<code>轮询</code>负载均衡机制只需要修改配置文件如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream my_server{
    server IP:8080;
    server IP:8081;
}
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location / {
        proxy_pass http://my_server/;   #Tomcat首页
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-权重" tabindex="-1"><a class="header-anchor" href="#_4-2-权重" aria-hidden="true">#</a> 4.2 权重</h3><p>实现<code>权重</code>的方式：在配置文件中<code>upstream</code>块中加上<code>weight</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream my_server{
    server IP:8080 weight=10;
    server IP:8081 weight=2;
}
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location / {
        proxy_pass http://my_server/;   #Tomcat首页
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-ip-hash" tabindex="-1"><a class="header-anchor" href="#_4-3-ip-hash" aria-hidden="true">#</a> 4.3 ip_hash</h3><p>实现<code>ip_hash</code>方式：在配置文件<code>upstream</code>块中加上<code>ip_hash</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream my_server{
    ip_hash;
    server IP:8080 weight=10;
    server IP:8081 weight=2;
}
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location / {
        proxy_pass http://my_server/;   #Tomcat首页
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、nginx动静分离" tabindex="-1"><a class="header-anchor" href="#五、nginx动静分离" aria-hidden="true">#</a> 五、Nginx动静分离</h2><blockquote><p>Nginx的并发能力公式： <code>worker_processes</code> * <code>worker_connections</code> / (4 or 2)，动态资源需要/4，静态资源需要/2<br> Nginx通过动静分离来提升Nginx的并发能力，更快的给用户响应</p></blockquote><h3 id="_5-1-动态资源代理" tabindex="-1"><a class="header-anchor" href="#_5-1-动态资源代理" aria-hidden="true">#</a> 5.1 动态资源代理</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 配置如下
location / {
  proxy_pass 路径;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-静态资源代理" tabindex="-1"><a class="header-anchor" href="#_5-2-静态资源代理" aria-hidden="true">#</a> 5.2 静态资源代理</h3><p>先修改<code>docker-compose</code>文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &#39;3.1&#39;
services: 
  nginx:
    restart: always
    image: daocloud.io/library/nginx:latest
    container_name: nginx
    ports: 
      - 80:80
    volumes:
      - /opt/docker_nginx/conf.d/:/etc/nginx/conf.d
      - /opt/docker_nginx/html/:/usr/share/nginx/html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 在/opt/docker_nginx/html下新建一个index.html
# 在index.html里面随便写点东西展示
# 修改nginx的配置文件

location / {
    root /usr/share/nginx/html;
    index index.html;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 配置如下
location / {
    root 静态资源路径;
    index 默认访问路径下的什么资源;
    autoindex on; # 代表展示静态资源的全部内容，以列表的形式展开
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 重启nginx
docker-compose restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、nginx集群" tabindex="-1"><a class="header-anchor" href="#六、nginx集群" aria-hidden="true">#</a> 六、Nginx集群</h2><h3 id="_6-1-引言" tabindex="-1"><a class="header-anchor" href="#_6-1-引言" aria-hidden="true">#</a> 6.1 引言</h3><blockquote><p>目的：避免单点nginx的宕机，导致整个程序的崩溃</p><ul><li>准备多台nginx</li><li>准备keepalived，监听nginx的健康情况</li><li>准备haproxy，提供一个虚拟的路径，统一的去接收用户的请求</li></ul></blockquote><figure><img src="`+v+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_6-2-搭建" tabindex="-1"><a class="header-anchor" href="#_6-2-搭建" aria-hidden="true">#</a> 6.2 搭建</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 先准备好以下文件放入/opt/docker_nginx_cluster目录中
# 然后启动容器    注意确保80、8081和8082端口未被占用(或者修改docker-compose.yml中的端口)
docker-compose up -d

# 然后我们访问8081端口可以看到master，访问8082端口可以看到slave
# 因为我们设置了81端口的master优先级未200比82端口的slave优先级100高，所以我们访问80端口看到的是master
# 现在我们模仿8081端口的nginx宕机了
# docker stop 8081端口nginx容器的ID
# 这时我们再去访问80端口看到的就是slave了
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Dockerfile</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FROM nginx:1.13.5-alpine
RUN apk update &amp;&amp; apk upgrade
RUN apk add --no-cache bash curl ipvsadm iproute2 openrc keepalived
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD [&quot;/entrypoint.sh&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>entrypoint.sh</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/sh

#/usr/sbin/keepalvined -n -l -D -f /etc/keepalived/keepalived.conf --dont-fork --log-console &amp;
/usr/sbin/keepalvined -D -f /etc/keepalived/keepalived.conf

nginx -g &quot;daemon off;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>docker-compose.yml</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &quot;3.1&quot;
services:
  nginx_master:
    build:
      context: ./
      dockerfile: ./Dockerfile
    ports:
      -8081:80
    volumes:
      - ./index-master.html:/usr/share/nnginx/html/index.html
      - ./favicon.ico:/usr/share/nnginx/html/favicon.ico
      - ./keepalived-master.conf:/etv/keepalived/keepalived.conf
    networks:
      static-network:
        ipv4_address:172.20.128.2
    cap_add:
      - NET_ADMIN
  nginx_slave:
    build:
      context: ./
      dockerfile: ./Dockerfile
    ports:
      -8082:80
    volumes:
      - ./index-slave.html:/usr/share/nnginx/html/index.html
      - ./favicon.ico:/usr/share/nnginx/html/favicon.ico
      - ./keepalived-slave.conf:/etv/keepalived/keepalived.conf
    networks:
      static-network:
        ipv4_address:172.20.128.3
    cap_add:
      - NET_ADMIN
  proxy:
    image:  haproxy:1.7-apline
    ports:
      - 80:6301
    volumes:
      - ./happroxy.cfg:/usr/local/etc/haproxy/haproxy.cfg
    networks:
      - static-network
networks:
  static-network:
    ipam:
      congig:
        - subnet: 172.20.0.0/16
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>keepalived-master.conf</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vrrp_script chk_nginx {
    script &quot;pidof nginx&quot;
    interval 2
}

vrrp_instance VI_1 {
    state MASTER
    interface etch0 # 容器内部的网卡名称
    virtual_router_id 33
    priority 200    # 优先级
    advert_int 1
    
    autheentication {
        auth_type PASS
        auth_pass letmein
    }

    virtual_ipaddress {
        172.20.128.50   # 虚拟路径
    }

    track_script {
        chk_nginx
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>keepalived-slave.conf</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vrrp_script chk_nginx {
    script &quot;pidof nginx&quot;
    interval 2
}

vrrp_instance VI_1 {
    state BACKUP
    interface etch0 # 容器内部的网卡名称
    virtual_router_id 33
    priority 100    # 优先级
    advert_int 1
    
    autheentication {
        auth_type PASS
        auth_pass letmein
    }

    virtual_ipaddress {
        172.20.128.50   # 虚拟路径
    }

    track_script {
        chk_nginx
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>haproxy.cfg</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>global
    log 127.0.0.1 local0
    maxconn 4096
    daemon
    nbproc 4
    
defaults
    log 127.0.0.1 local3
    mode http
    option dontlognull
    option redispatch
    retries 2
    maxconn 2000
    balance roundrobin
    timeout connect 5000ms
    timeout client 5000ms
    timeout server 5000ms
    
frontend main
    bind *:6301
    default_backend webserver
    
backend webserveer
    server nginx_master 127.20.127.50:80 check inter 2000 rise 2 fall 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="七、内置变量" tabindex="-1"><a class="header-anchor" href="#七、内置变量" aria-hidden="true">#</a> 七、内置变量</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$args                    #请求中的参数值
$query_string            #同 $args
$arg_NAME                #GET请求中NAME的值
$is_args                 #如果请求中有参数，值为&quot;?&quot;，否则为空字符串
$uri                     #请求中的当前URI(不带请求参数，参数位于$args)，可以不同于浏览器传递的$request_uri的值，它可以通过内部重定向，或者使用index指令进行修改，$uri不包含主机名，如&quot;/foo/bar.html&quot;。
$document_uri            #同 $uri
$document_root           #当前请求的文档根目录或别名
$host                    #优先级：HTTP请求行的主机名&gt;&quot;HOST&quot;请求头字段&gt;符合请求的服务器名.请求中的主机头字段，如果请求中的主机头不可用，则为服务器处理请求的服务器名称
$hostname                #主机名
$https                   #如果开启了SSL安全模式，值为&quot;on&quot;，否则为空字符串。
$binary_remote_addr      #客户端地址的二进制形式，固定长度为4个字节
$body_bytes_sent         #传输给客户端的字节数，响应头不计算在内；这个变量和Apache的mod_log_config模块中的&quot;%B&quot;参数保持兼容
$bytes_sent              #传输给客户端的字节数
$connection              #TCP连接的序列号
$connection_requests     #TCP连接当前的请求数量
$content_length          #&quot;Content-Length&quot; 请求头字段
$content_type            #&quot;Content-Type&quot; 请求头字段
$cookie_name             #cookie名称
$limit_rate              #用于设置响应的速度限制
$msec                    #当前的Unix时间戳
$nginx_version           #nginx版本
$pid                     #工作进程的PID
$pipe                    #如果请求来自管道通信，值为&quot;p&quot;，否则为&quot;.&quot;
$proxy_protocol_addr     #获取代理访问服务器的客户端地址，如果是直接访问，该值为空字符串
$realpath_root           #当前请求的文档根目录或别名的真实路径，会将所有符号连接转换为真实路径
$remote_addr             #客户端地址
$remote_port             #客户端端口
$remote_user             #用于HTTP基础认证服务的用户名
$request                 #代表客户端的请求地址
$request_body            #客户端的请求主体：此变量可在location中使用，将请求主体通过proxy_pass，fastcgi_pass，uwsgi_pass和scgi_pass传递给下一级的代理服务器
$request_body_file       #将客户端请求主体保存在临时文件中。文件处理结束后，此文件需删除。如果需要之一开启此功能，需要设置client_body_in_file_only。如果将次文件传 递给后端的代理服务器，需要禁用request body，即设置proxy_pass_request_body off，fastcgi_pass_request_body off，uwsgi_pass_request_body off，or scgi_pass_request_body off
$request_completion      #如果请求成功，值为&quot;OK&quot;，如果请求未完成或者请求不是一个范围请求的最后一部分，则为空
$request_filename        #当前连接请求的文件路径，由root或alias指令与URI请求生成
$request_length          #请求的长度 (包括请求的地址，http请求头和请求主体)
$request_method          #HTTP请求方法，通常为&quot;GET&quot;或&quot;POST&quot;
$request_time            #处理客户端请求使用的时间,单位为秒，精度毫秒； 从读入客户端的第一个字节开始，直到把最后一个字符发送给客户端后进行日志写入为止。
$request_uri             #这个变量等于包含一些客户端请求参数的原始URI，它无法修改，请查看$uri更改或重写URI，不包含主机名，例如：&quot;/cnphp/test.php?arg=freemouse&quot;
$scheme                  #请求使用的Web协议，&quot;http&quot; 或 &quot;https&quot;
$server_addr             #服务器端地址，需要注意的是：为了避免访问linux系统内核，应将ip地址提前设置在配置文件中
$server_name             #服务器名
$server_port             #服务器端口
$server_protocol         #服务器的HTTP版本，通常为 &quot;HTTP/1.0&quot; 或 &quot;HTTP/1.1&quot;
$status                  #HTTP响应代码
$time_iso8601            #服务器时间的ISO 8610格式
$time_local              #服务器时间（LOG Format 格式）
$cookie_NAME             #客户端请求Header头中的cookie变量，前缀&quot;$cookie_&quot;加上cookie名称的变量，该变量的值即为cookie名称的值
$http_NAME               #匹配任意请求头字段；变量名中的后半部分NAME可以替换成任意请求头字段，如在配置文件中需要获取http请求头：&quot;Accept-Language&quot;，$http_accept_language即可
$http_cookie
$http_host               #请求地址，即浏览器中你输入的地址（IP或域名）
$http_referer            #url跳转来源,用来记录从那个页面链接访问过来的
$http_user_agent         #用户终端浏览器等信息
$http_x_forwarded_for
$sent_http_NAME          #可以设置任意http响应头字段；变量名中的后半部分NAME可以替换成任意响应头字段，如需要设置响应头Content-length，$sent_http_content_length即可
$sent_http_cache_control
$sent_http_connection
$sent_http_content_type
$sent_http_keep_alive
$sent_http_last_modified
$sent_http_location
$sent_http_transfer_encoding
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,96),u=[t];function o(m,b){return i(),n("div",null,u)}const p=e(c,[["render",o],["__file","Nginx详细教程.html.vue"]]);export{p as default};
