var express = require("express"); //web server
var app = express();

app.use(express.static(__dirname + '/public')); //define that /public contains the static webpages

var http = require("http").Server(app);
var io = require("socket.io")(http); //web socket server

//Transfers the file at the given path
app.get("/", function(req , res){
	res.sendFile('index.html', { root: __dirname }); //absolute path to the file
});

//Open and set the serial port
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const mySerial = new SerialPort('/dev/ttyUSB0') //set serial port 
const parser = mySerial.pipe(new Readline({ delimiter: '\r\n' })); //receive data from serial port

mySerial.on("open", function(){
	console.log("Porta aberta.");
});

//send to cliente the message
parser.on('data', onData);
function onData(data){
	io.sockets.emit('dadoArduino', data); 
}

//connect to Arduino
io.on("connection", function(socket){
	console.log("Planta esta conectada!");
});

//open the server on port 3000
http.listen(3000, function(){
	console.log("Servidor rodando na porta 3000");
});