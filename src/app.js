$(function() {
    var APP = {
        host: '127.0.0.1',
        port: 6379,
        password: '',
        isConnect: false,
    };
    
    APP.Connect = function() {
        // connect redis server
        APP.host = $('input[name=host]').val();
        APP.port = $('input[name=port]').val();
        APP.password = $('input[name=password]').val();

        console.log("try to connect =>", APP.host, APP.port, APP.password);

        // TODO connect loading

        var client = new redis(APP.host, APP.port, APP.password);
        client.init(APP.SuccessCallBack, )
    };

    
    APP.SuccessCallBack = function(data) {
        if (!APP.isConnect && data === 'PONG') {
            APP.isConnect = true;
            console.log("connect success.");

            // TODO jump to main page
            return;
        }
        console.log('redis back data =>', data)
    };

    APP.ErrCallBack = function() {
        console.log("something err.")
    }


    // register the connect event
    $('.connect').click(function() {
        APP.Connect();
    });
})
