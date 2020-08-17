$(function() {
    var APP = {
        host: '127.0.0.1',
        port: 6379,
        password: '',
        client: null,
        isConnect: false,
    };
    
    APP.Connect = function() {
        // connect redis server
        APP.host = $('input[name=host]').val();
        APP.port = $('input[name=port]').val();
        APP.password = $('input[name=password]').val();

        console.log("try to connect =>", APP.host, APP.port, APP.password);

        // TODO connect loading

        APP.client = new redis(APP.host, APP.port, APP.password);
        APP.client.init(APP.SuccessCallBack, )
    };

    
    APP.SuccessCallBack = function(data) {
        // toggle to main page
        if (!APP.isConnect && data === 'PONG') {
            console.log("connect success.");
            APP.isConnect = true;
            APP.ShowMainPage();
            return;
        }
        console.log('redis back data =>', data)
    };

    APP.ErrCallBack = function() {
        console.log("something err.")
    };

    APP.Query = function(teminal) {
        console.log("123");
        APP.client.exec(teminal);
    };

    APP.ShowMainPage = function() {
        $("#page-main").show();
        $("#page-connect").hide();
    };

    // register the connect event
    $('.connect').click(function() {
        APP.Connect();
    });

    // register the query event
    $('.query').click(function() {
        let teminal = $("#teminal").val();
        APP.Query(teminal);
    });
})
