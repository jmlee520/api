const redis = require('redis');
const host = '192.168.0.109';
const port = '6379';
let client = redis.createClient(port, host);
client.on('connect', function(){
    console.log('connected to Redis');
});

module.exports = client;

//what to store on redis
//view counts, number of visit, likes, report
//business page view count
//detail page view count
//detail:[{postId: Integer viewCount}]
//business:[{businessId: Integer viewcount}]
//likes: [{postId: Integer}]
//reportComment:[{commentId: Integer}]
//reportPost: [{postId: Integer}]