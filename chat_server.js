var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

if (process.argv.length < 3 )
{
	console.log("Usage : node %s PORT", process.argv[1]);
	process.exit();
}

var port = process.argv[2];
var server = http.createServer(function (req, res) {
	fs.readFile('chat_client.html', function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/html' });
		res.end(data);
	});
}).listen(port, function(){
	console.log('Chatting Server Running at '+ port);
});

var io = socketio.listen(server);
io.set('log level', 2);
io.sockets.on('connection', function(socket) {
	socket.on('message', function(data) {
		io.sockets.emit('message', data);
	});

});

