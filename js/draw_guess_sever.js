/**
 * New node file
 */
var ws = require("websocket-server");//启动时加载模块

var server = ws.createServer();

server.addListener("connection", function(connection){
connection.addListener("message", function(msg){
	console.log(msg);
	server.broadcast(msg);
});
});

server.listen(8999);
console.log('my web sorket darw_guess_server is running on 8999');