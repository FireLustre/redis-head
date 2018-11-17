function tcp() {
    var _tcp = chrome.sockets.tcp;
    this.option = {},
        this.socketId = 0,
        this.create = function (callback) {
            _tcp.create(this.option, function (socketInfo) {
                this.socketId = socketInfo.socketId;
                callback();
            }.bind(this));
        }.bind(this),
        this.update = function () {
            _tcp.update(this.socketId, newSocketOption, callback);
        }.bind(this),
        this.pause = function (isPaused, callback) {
            _tcp.setPaused(this.socketId, isPaused, callback);
        }.bind(this),
        this.keepAlive = function (enable, delay, callback) {
            _tcp.setKeepAlive(this.socketId, enable, delay, function (code) {
                if (code < 0) {
                    this.error(code);
                }
                else {
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
        this.disconnect = function (callback) {
            _tcp.disconnect(this.socketId, callback);
        }.bind(this),
        this.close = function (callback) {
            _tcp.close(this.socketId, callback);
        }.bind(this),
        this.error = function (code) {
            console.log('An error occurred with code ' + code);
        },
        this.init = function (callback) {
            this.create(callback);
        }.bind(this)
}