console.log('----------------start app js---------------------');

const JS_EOL = `\r\n`;

var socketOption = {
    persistent: true,
    name: 'tcpSocket',
    bufferSize: 4096 // 缓冲区大小
};

var tcpSocket = new tcp();

var address = $("#address").val();
var port = $('#port').val();

// 连接
$(".connect").click(function () {
    $(".connect").toggle();
    $(".disconnect").toggle();
    tcpSocket.init(function () {
        console.log('socket create, socketId =', tcpSocket.socketId);

        tcpSocket.connect(address, port, function (code) {
            console.log("tcp start", code);
        });

        tcpSocket.receive(function (data) {
            $("#search-result").html(ab2str(data.data));
        }, function (data) {
            // $("#search-result").html(data)
        });
    });
});

// 断开连接
$(".disconnect").click(function () {
    $(".connect").toggle();
    $(".disconnect").toggle();

    tcpSocket.disconnect(function () {
        console.log("断开连接", data)
    });

    tcpSocket.close(function () {
        console.log('socket close, socketId =', tcpSocket.socketId);
    });
});

// 命令操作
// 查询
$(".search").click(function () {

    var teminal = $('#teminal').val();
    var redisProtocolArray = encode(teminal);
    var buf = str2ab(redisProtocolArray.join(JS_EOL) + JS_EOL);

    tcpSocket.send(buf, function (sentResult) {
        // 底层网络调用返回的结果代码，负值表示错误
        if (sentResult.resultCode != 0) {
            console.log('send err', err);
        }
    });
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