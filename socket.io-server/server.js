var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),    
    sockets = [];

app.use( express.static(__dirname + '/public'));

server.listen(4000);

io.sockets.on('connection', function (socket) {

    sockets.push(socket);
    

    socket.on('songChange', function (data) {
        //console.log(data);        
        song = data.song;
        action = data.action;

        if(action == "add"){
            console.log("add");        
            sockets.forEach(function (socket) {
                socket.emit('songAdded', song);
            });
        }
        if(action == "update"){
            console.log("update");        
            sockets.forEach(function (socket) {
                socket.emit('songUpdated', song);
            });
        }
        if(action == "delete"){
            console.log("delete");        
            sockets.forEach(function (socket) {
                socket.emit('songDeleted', song);
            });
        }
    });
});