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

tcpSocket.receive(function (data) {
    console.log("receive data", data);
});

// 连接
$(".connect").click(function () {
    $(this).hide();
    var address = $("#address").val();
    var port = $('#port').val();

    $('#content').html('连接中......');

    tcpSocket.connect(address, port, function (code) {
        // 底层网络调用返回的结果代码，负值表示错误
        if (code < 0) {
            $('#content').html('连接失败');
        } else {
            $('#content').html('连接成功');
        }
    });
});

// 命令操作
// 查询
$(".search").click(function () {
    var redisProtocolArray = encode("set test 123");
    var buf = str2ab(redisProtocolArray.join(`\r\n`));

    tcpSocket.send(buf, function (data) {

    })
});

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Int8Array(buf));
}
function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Int8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

console.log('----------------end app js---------------------');