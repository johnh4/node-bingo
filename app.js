
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var Bingo = require('./models/bingo');

var app = express();
var server = http.createServer(app);
//var io = require('socket.io').listen(server);

//socket.io-client
var socketClient = require('socket.io-client');
var client = socketClient.connect('ws://yahoobingo.herokuapp.com');

client.on('connect', function(){
	console.log('connected!!!!');
	var board = { slots:
   { B: [ 4, 7, 10, 11, 13 ],
     I: [ 20, 22, 25, 33, 36 ],
     N: [ 37, 45, 46, 52, 54 ],
     G: [ 55, 59, 60, 62, 69 ],
     O: [ 73, 74, 76, 77, 78 ] } }
	var bingo = new Bingo(board);
});

var credentials = {
	name: "John Howlett",
	email: "jehowl4@gmail.com",
	url: "http://www.github.com/johnh4/node-bingo"
}
//client.emit('register', credentials);

client.on('card', function(payload){
	console.log('payload', payload);
	
});

client.on('number', function(number){
	console.log('number', number);
});

client.on('disconnect', function(){
	console.log('disconnected.');
});

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

//var client = socketClient.connect('ws://yahoobingo.herokuapp.com');


server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//io.sockets.on('connection', function (socket) {
//  socket.emit('news', { hello: 'world' });
//  socket.on('my other event', function (data) {
//    console.log(data);
//  });
//});
