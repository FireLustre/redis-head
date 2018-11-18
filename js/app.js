console.log('----------------start app js---------------------');

var content = 'some thing';

var socketOption = {
    persistent: true,
    name: 'tcpSocket',
    bufferSize: 4096 // 缓冲区大小
};

var tcpSocket = new tcp();

tcpSocket.init(function () {
    console.log('tcp socket init, socketId =', tcpSocket.socketId);
});

// 连接
$(".connect").click(function () {
    $(this).hide();
    var address = $("#address").val();
    var port = $('#port').val();

    $('#content').html('连接中......');

    tcpSocket.connect(address, port);

    $('#content').html('连接成功');
});

// 命令操作
// 查询
$(".search").click(function () {
    var buf = strToBuf("SET test 123");
    tcpSocket.send(buf, function (data) {
        console.log('send back', data)
    })
});

// string to binary
function strToBuf(str) {
    var buf = new ArrayBuffer(str.length * 2);
    bufView = new Uint16Array(buf);
    for (var i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

// binary to string
function bufToStr(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}


console.log('----------------end app js---------------------');