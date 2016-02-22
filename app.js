/**
 * Created by Aamod Pisat on 17-02-2016.
 */
var app = require('express')(),
    MongoClient= require('mongodb').MongoClient,
    monngoose= require('mongoose'),
    events= require('events'),
    http = require('http').Server(app),
    io = require('socket.io')(http);

var url= 'mongodb://localhost:27017/test';

MongoClient.connect(url,function(err,db){
   console.log("Connected correctly to Server...");
    db.close();
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/register',function(req,res){
    res.sendfile(_dirname + '/views/register.html');
});


io.on('connection',function(socket){
    console.log("User connected");
    socket.on('chat message',function(msg){
        console.log("Message: "+msg);
        io.emit('chat',msg , {for : 'everyone'});
    });

    socket.on('disconnect',function(){
        console.log("User disconnected")
    });
});



http.listen(3000, function(){
    console.log('Welcome, App listening on port no.3000');
});