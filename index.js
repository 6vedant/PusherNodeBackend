var express = require('express');
var Pusher = require('pusher');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8090;

var pusher = new Pusher({
    appId: '1331919',
    key: '5a78ac20c7997388e791',
    secret: '6b1f3c950506f0c853d2',
    cluster: 'eu',
    encrypted: true
});

app.get("/test",function(req,res){
    res.json({success: 200});
});

app.post('/messages/:room', function(req, res){
    var message = req.body;
    var chatRoom = req.params.room;
    pusher.trigger(chatRoom, 'new_message', message);
    res.json({success: 200});
});

app.listen(port);
console.log('REST API is runnning at ' + port);