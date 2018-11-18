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
    console.log("test")
    //We'll do something after tcp socket init later
});