function tcp() {
    var _tcp = chrome.sockets.tcp;
    this.option = {},
        this.socketId = 0,

        // 创建
        this.init = function (callback) {
            this.create(callback);
        }.bind(this),
        this.create = function (callback) {
            _tcp.create(this.option, function (socketInfo) {
                this.socketId = socketInfo.socketId;
                callback();
            }.bind(this));
        }.bind(this),

        // 更新
        this.update = function () {
            _tcp.update(this.socketId, newSocketOption, callback);
        }.bind(this),

        // 连接
        this.connect = function (address, port, callback) {
            _tcp.connect(this.socketId, address, parseInt(port), function (resultCode) {
                callback(resultCode);
            }.bind(this));
        }.bind(this),

        // 发送
        this.send = function (data, err) {
            _tcp.send(this.socketId, data, function (sendResult) {
                if (sendResult.resultCode < 0) {
                    err(sendResult)
                }
            }.bind(this));
        }.bind(this),

        // 接收
        this.receive = function (callback) {
            _tcp.onReceive.addListener(function (info) {
                callback(info);
            })
        },

        // 阻止和解除阻止socket接收数据
        // 当一个socket被阻止后，将不会触发消息接收事件，解除阻止后将恢复正常
        this.pause = function (isPaused, callback) {
            _tcp.setPaused(this.socketId, isPaused, callback);
        }.bind(this),

        // 长连接
        this.keepAlive = function (enable, delay, callback) {
            _tcp.setKeepAlive(this.socketId, enable, delay, function (code) {
                if (code < 0) {
                    this.error(code);
                } else {
                    callback();
                }
            }.bind(this));
        }.bind(this),

        // 禁用和启用纳格算法
        // 纳格算法以减少封包传送量来增进TCP/IP网络的效能。可以通过setNoDelay方法禁用或启用
        this.noDelay = function (noDelay, callback) {
            _tcp.setNoDelay(this.socketId, noDelay, function (code) {
                if (code < 0) {
                    this.error(code);
                }
                else {
                    callback();
                }
            }.bind(this));
        }.bind(this),

        // 获取指定socket
        this.getInfo = function (callback) {
            _tcp.getInfo(this.socketId, callback);
        }.bind(this),

        // 获取全部活动的socket
        this.getSockets = function (callback) {
            _tcp.getSockets(callback);
        }.bind(this),

        // 断开连接
        this.disconnect = function (callback) {
            _tcp.disconnect(this.socketId, callback);
        }.bind(this),

        // 关闭socket
        this.close = function (callback) {
            _tcp.close(this.socketId, callback);
        }.bind(this),

        this.error = function (code) {
            console.log('An error occurred with code ' + code);
        }
}