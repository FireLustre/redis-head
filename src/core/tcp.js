function tcp() {
    var _tcp = chrome.sockets.tcp;
    this.option = {},
    this.socketId = 0,

    this.init = function (callback) {
        this.create(callback);
    }.bind(this),
    this.create = function (callback) {
        _tcp.create(this.option, function (socketInfo) {
            this.socketId = socketInfo.socketId;
            callback();
        }.bind(this));
    }.bind(this),

    this.update = function () {
        _tcp.update(this.socketId, newSocketOption, callback);
    }.bind(this),

    this.connect = function (address, port, callback) {
        _tcp.connect(this.socketId, address, parseInt(port), function () {
            console.log("tcp connected");
            callback();
        }.bind(this));
    }.bind(this),

    this.send = function (data, onSentCallback) {
        console.log('tcp socket info', this.socketId, data)
        _tcp.send(this.socketId, data, function (sentResult) {
            onSentCallback(sentResult);
        }.bind(this));
    }.bind(this),

    this.onReceive = function (callback) {
        _tcp.onReceive.addListener(function (info) {
            this.receive(info);
            if (info.socketId == this.socketId) {
                callback(info);
            }
        }.bind(this));

    }.bind(this),

    this.onReceiveErr = function () {
        _tcp.onReceiveError.addListener(function (info) {
            console.log("onReceiveErr =>", info)
            if (info.socketId == this.socketId) {
                this.pause(false);
                this.error(info.resultCode);
            }
        }.bind(this));
    }.bind(this),

    this.receive = function (info) {
        console.log('Received data.');
    },

    this.pause = function (isPaused, callback) {
        _tcp.setPaused(this.socketId, isPaused, function () {
            console.log("isPaused");
        });
    }.bind(this),

    this.keepAlive = function (enable, delay, callback) {
        _tcp.setKeepAlive(this.socketId, enable, delay, function (code) {
            if (code < 0) {
                this.error(code);
            } else {
                callback();
            }
        }.bind(this));
    }.bind(this),

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

    this.getInfo = function (callback) {
        _tcp.getInfo(this.socketId, callback);
    }.bind(this),

    this.getSockets = function (callback) {
        _tcp.getSockets(callback);
    }.bind(this),

    this.disconnect = function (callback) {
        _tcp.disconnect(this.socketId, callback);
    }.bind(this),

    this.close = function (callback) {
        _tcp.close(this.socketId, callback);
    }.bind(this),

    this.error = function (code) {
        console.log('An error occurred with code ' + code);
    }
}