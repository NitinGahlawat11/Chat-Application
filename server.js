const http = require('http');
const express = require('express');
const app = express();
const socketServer = http.Server(app);
const socket = require('socket.io');
var messages=[];
const io = socket(socketServer);

app.use('/', express.static('public'));

io.on('connection',function (sk) {  // connection is a parameter already present in socket.io which will fire when connection has been made
    sk.on('message',function (data) {
messages.push(data);
        io.emit('show',data); // use io.emit if you want sender too, to receive the message otherwise use sk.broadcast
    })
sk.emit('ms',messages);
});

//console.log(io);
// const server = http.createServer((req,res)=> {
//     res.write("Hello World");
//     res.end();
// });

socketServer.listen(8080, function(){
    console.log("Server is listening on port 8080");

});