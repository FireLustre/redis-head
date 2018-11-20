# redis-head
a google chrome extension for redis manager

## 采坑

- background.js 中console.log打印无效
- 修改background.js，必须在`chrome://extensions`页面中刷新扩展，调试页面刷新无效

# 使用tcpdump

查看网卡
> tcpdump -D

查看请求信息 
> sudo tcpdump tcp -i 8  port 6379


### 参考文档及资料
- https://developer.chrome.com
- http://redisdoc.com/topic/protocol.html
- https://github.com/sxei/chrome-plugin-demo
- https://crxdoc-zh.appspot.com/apps/sockets_tcp