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

        // TODO connect loading

        APP.client = new redis(APP.host, APP.port, APP.password);
        APP.client.init(APP.SuccessCallBack, )
    };

    
    APP.SuccessCallBack = function(data) {
        console.log("callback=>", data)
        // toggle to main page
        if (!APP.isConnect && (data.data === 'PONG' || data.data === 'OK')) {
            console.log("connect success.");
            APP.isConnect = true;
            APP.ShowMainPage();
            return;
        }

        if (data.type === TYPE_STRING || data.type === TYPE_STATUS) {
            $(".query-result-pannel p").text(data.data);
        } else if (data.type === TYPE_ARRAY) {
            $(".query-result-pannel p").html(data.data.join("<br/>"));
        }

        console.log('redis back data =>', data);
    };

    APP.ErrCallBack = function() {
        console.log("something err.")
    };

    APP.Query = function(teminal) {
        APP.client.exec(teminal, APP.isConnect);
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
