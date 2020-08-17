var APP = {
    isConnect: false,
};

var client = new redis('47.114.63.189', 6380, '');
client.init(function (data) {
    console.log('redis back data =>', data)
})


$(".search").click(function () {
    client.ping();
});
