chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('window.html', {
        'outerBounds': {
            'width': 1000,
            'height': 720
        }
    });
});

var socketOption = {
    persistent: true,
    name: 'tcpSocket',
    bufferSize: 4096 // 缓冲区大小
};

var tcpSocket = new tcp();

tcpSocket.init(function () {

    //We'll do something after tcp socket init later
});

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    sendResponse('我是后台，我已收到你的消息了：' + JSON.stringify(request));
});