var express = require('express');
var socket= require('socket.io');
var app=express();
app.use(express.static('public'));




var server = app.listen(4000,function () {
    console.log("server is listening on port 4000");

})
var io = socket(server);// socket will be listening on the server we have defined below

// io will be looking for a connection method and each  new user will have its own socket,

io.on('connection', function(socket){

    console.log('made socket connection',socket.id) ; // each socket will have its own unique id and we will get different id everytime we restart


    socket.on('chat',function(data){
        io.emit('chat',data);
    })
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    })
});