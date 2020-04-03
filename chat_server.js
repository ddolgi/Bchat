var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

//if (process.argv.length < 3 )
//{
	//console.log("Usage : node %s PORT", process.argv[1]);
	//process.exit();
//}

//var port = process.argv[2];
var port = 50000;
var server = http.createServer(function (req, res) {
	fs.readFile('chat_client.html', function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/html' });
		res.end(data);
	});
}).listen(port, function(){
	console.log('Chatting Server Running at '+ port);
});

var users = {};
var io = socketio.listen(server);
io.set('log level', 2);
io.sockets.on('connection', function(socket) {
	var myName = "";
	socket.on('set name', function (name) {
		socket.emit('ready');
		myName = name;
		users[name] = new Date().toUTCString(); 
		io.sockets.emit('users', users);
	});

	socket.on('message', function(msg) {
		io.sockets.emit('message', msg);
	});

	socket.on('disconnect', function(data) {
		delete users[myName];
		io.sockets.emit('users', users);
	});
});



