var socket = require('socket.io-client');
var Bingo = require('../models/bingo');

describe("websocket tests", function(){

	var client;
	var bingo;

	beforeEach(function(done){
		client = socket.connect('ws://yahoobingo.herokuapp.com');
		client.on('connect', function(){
			console.log('connected!!!!');
			var board = { slots:
		   { B: [ 4, 7, 10, 11, 13 ],
		     I: [ 20, 22, 25, 33, 36 ],
		     N: [ 37, 45, 46, 52, 54 ],
		     G: [ 55, 59, 60, 62, 69 ],
		     O: [ 73, 74, 76, 77, 78 ] } }
			var bingo = new Bingo(board);
			done();
		});
		client.on('disconnect', function(){
			console.log('disconnected!');
		});
	});

	afterEach(function(done){
		if(client.socket.connected){
			console.log('disconnecting!');
			client.disconnect();
		} else {
			console.log('no connection to disconnect from');
		}
		done();
	});

	it("should connect to the server", function(next){
		expect(client.socket.connected).toBe(true);
		next();
	});


});
