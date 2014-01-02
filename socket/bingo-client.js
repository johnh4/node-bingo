var socketClient = require('socket.io-client');
var client = socketClient.connect('ws://yahoobingo.herokuapp.com');
var Bingo = require('../models/bingo');

var bingo;
var credentials = {
	name: "John Howlett",
	email: "jehowl4@gmail.com",
	url: "http://www.github.com/johnh4/node-bingo"
}

var bingoClient = {

	run: function(){
		console.log('in run');
		client.on('connect', function(){
			console.log('connected!!!!');
		});
		client.on('connect', function(){
			console.log('connected!!!!');
			client.emit('register', credentials);
		});
		client.on('disconnect', function(){
			console.log('disconnected!');
		});
		client.on('card', function(payload){
			console.log('card received!');
			console.log('payload',payload);
			bingo = new Bingo(payload);
		});
		client.on('win', function(message){
			console.log('message', message);
		});
		client.on('lose', function(message){
			console.log('message', message);
		});
		client.on('number', function(num){
			console.log('num', num);
			bingo.checkNum(num);
			console.log(bingo.taken);
			if(bingo.checkWin()){
				client.emit('bingo');
			}
		});
	}
}

module.exports = bingoClient;