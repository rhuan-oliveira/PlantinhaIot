var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));

var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req , res){
	res.sendFile('index.html', { root: __dirname });
});

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const mySerial = new SerialPort('/dev/ttyUSB0')

const parser = mySerial.pipe(new Readline({ delimiter: '\r\n' }));

mySerial.on("open", function(){
	console.log("Porta aberta.");
});


parser.on('data', onData);
function onData(data){
	io.sockets.emit('dadoArduino', data);
}

io.on("connection", function(socket){
	console.log("Planta esta conectada!");
});

http.listen(3000, function(){
	console.log("Servidor rodando na porta 3000");
});