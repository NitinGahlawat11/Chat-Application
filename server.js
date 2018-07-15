var express = require('express');
var app = express();

var http = require('http');
var server = http.createServer(app);

var socket = require('socket.io');

var io = socket(server);
var msgs = [];
var connected_users={};
io.on('connection', function(socket){
    console.log('connection established.');
    socket.on('receive_message', function(data) {

        msgs.push(data);

        io.emit('get', data, connected_users);
    });
    socket.emit('all', msgs, connected_users);

    socket.on('username', function(data){
        console.log(data, socket.id);
        connected_users[socket.id]=data;
        console.log('connected_users= '+connected_users);
    });
    socket.on('disconnect', function(){
        delete  connected_users[socket.id];
        console.log(connected_users);
        console.log('disconnected');
    });


});


app.use('/', express.static('public'));
server.listen(process.env.PORT || 3000, function(){
    console.log("server is listening on port 5000");
});


