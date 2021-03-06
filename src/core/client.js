const 
	JS_EOL = `\r\n`,
	DELIMITER = ` `,

	BUFFER_SIZE = 4096, // socket buffer size

	OPS_PING = 'PING',
	OPS_INFO = 'INFO',
	OPS_TYPE = 'TYPE',
	OPS_SCAN = 'SCAN',
	OPS_GET  = 'GET',
	OPS_SET  = 'SET',
	OPS_DEL  = 'DEL',
	OPS_EXPIRE  = 'EXPIRE';
	

var 
	receivedAllData = '',
	isEndReceive = false,
	textEncoder = new TextEncoder(),
	textDecoder = new TextDecoder();

var redis = function (host, port, password) {
	this.host = host,
	this.port = port,
	this.password = password,
	this.tcpSocket = {},

	// create an redis tcp client
	this.init = function (callBack, errCallBack) {
		this.tcpSocket = new tcp();
		this.tcpSocket.option = {
			persistent: true,
			name: 'redis_tcp_socket',
			bufferSize: BUFFER_SIZE
		};
		this.tcpSocket.init(function () {
			// send ping to make sure redis is connected
			if (this.password !== "") {
				console.log(this.password);
				this.auth();
			} else {
				this.ping();
			}
			console.log('create socket, socket_id =', this.tcpSocket.socketId);
		}.bind(this));

		// register listen events
		// listen events include success event and err event
		this.tcpSocket.onReceive(function (data) {
			console.log("receive data =>", data);
			var dataStr = ab2str(data.data);
			if (data.data.byteLength >= BUFFER_SIZE) {
				receivedAllData = receivedAllData + dataStr
			} else {
				receivedAllData = receivedAllData + dataStr
				isEndReceive = true
			}

			// check is received all
			if (isEndReceive) {
				callBack(parseReply(receivedAllData));

				// reset receive flag
				isEndReceive = false;
				receivedAllData = '';
			}
		}.bind(this));

		// listen err event
		this.tcpSocket.onReceiveErr(function () {
			errCallBack();
			// this.tcpSocket.disconnect(function () {
			// 	console.log('disconnect')
			// });
		}.bind(this));

		return this;
	}.bind(this),

	this.connect = function(callBack) {
		this.tcpSocket.connect(this.host, this.port, callBack);
	},

	// 'ping' to redis
	// success to reply 'PONG'
	this.ping = function () {
		this.exec(OPS_PING);
	},

	// get all keys, bad ops
	// this.keys = function () {
	// 	this.exec(`KEYS *`);
	// },

	// get the type of key
	this.type = function (key) {
		this.exec(makeTeminal(OPS_TYPE, key));
	},

	// get the value of key
	this.get = function (key) {
		this.exec(makeTeminal(OPS_GET, key));
	},

	// set key value
	this.set = function (key, value) {
		this.exec(makeTeminal(OPS_SET, key, value));
	},

	// set key expire time
	this.expire = function (ttl) {
		this.exec(makeTeminal(OPS_EXPIRE, key, ttl));
	},

	// delete key
	this.del = function (key) {
		this.exec(makeTeminal(OPS_DEL, key));
	},

	// auth
	this.auth = function() {
		this.exec(makeTeminal('auth', this.password));
	}

	// exec redis teminal
	this.exec = function (teminal, isConnect) {
		if (isConnect) {
			console.log("teminal exec =>", teminal);
			var buf = textEncoder.encode(teminal+JS_EOL);
			
			this.tcpSocket.pause(false, () => {
				this.tcpSocket.send(buf, function (sentResult) {
					console.log("send callback =>", sentResult);
					if (sentResult.resultCode != 0) {
						console.log('send err', sentResult);
					}
				});
			});
			
			return;
		}
		this.connect(() => {
			console.log("teminal exec =>", teminal);
			var buf = textEncoder.encode(teminal+JS_EOL);
	
			this.tcpSocket.send(buf, function (sentResult) {
				if (sentResult.resultCode != 0) {
					console.log('send err', sentResult);
				}
			});
		});
	},

	this.destroy = function () {
		this.tcpSocket.close(function () {
			console.log("关闭socket")
		})
	}
}

function ab2str(buf) {
	return textDecoder.decode(new Int8Array(buf));
}

// redis terminal to array buffer
function str2ab(str) {
	var buf = new ArrayBuffer(str.length*2);
	var bufView = new Int16Array(buf);
	for (var i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}

function concatenate(resultConstructor, ...arrays) {
	let totalLength = 0;
	for (let arr of arrays) {
		totalLength += arr.length;
	}
	let result = new resultConstructor(totalLength);
	let offset = 0;
	for (let arr of arrays) {
		result.set(arr, offset);
		offset += arr.length;
	}
	return result;
}

function makeTeminal(...args) {
	return args.reduce((p, c) => {
		return p + DELIMITER + c;
	})
}