var redisClient = new redis('127.0.0.1', 6379)

redisClient.init(function (data) {
    console.log('redis back data', data)
})

$(".search").click(function () {
    redisClient.keys();
});
