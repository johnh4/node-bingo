var socket = require('socket.io-client');
var Bingo = require('../models/bingo');

describe("websocket tests", function(){

	var board = { slots:
   { B: [ 4, 7, 10, 11, 13 ],
     I: [ 20, 22, 25, 33, 36 ],
     N: [ 37, 45, 46, 52, 54 ],
     G: [ 55, 59, 60, 62, 69 ],
     O: [ 73, 74, 76, 77, 78 ] } }
	var client;
	var bingo;
	var credentials = {
		name: "John Howlett",
		email: "jehowl4@gmail.com",
		url: "http://www.github.com/johnh4/node-bingo"
	}

	client = socket.connect('ws://yahoobingo.herokuapp.com');
	client.on('connect', function(){
		console.log('connected!!!!');
		//done();
	});
	client.on('disconnect', function(){
		console.log('disconnected!');
	});
	client.on('card', function(payload){
		console.log('card received!');
		console.log('payload',payload);
		bingo = new Bingo(payload);
		console.log('bingo.slots', bingo.slots);
	});

	//beforeEach(function(done){
	//});

	//afterEach(function(done){
	//	if(client.socket.connected){
	//		console.log('disconnecting!');
	//		client.disconnect();
	//	} else {
	//		console.log('no connection to disconnect from');
	//	}
	//	done();
	//});

	xit("should connect to the server", function(next){
		expect(client.socket.connected).toBe(true);
		next();
	});

	it("should receive a card from the registration", function(next){
		runs(function(){
			client.emit('register', credentials);
		});

		waitsFor(function(){
			return (bingo !== undefined);
		}, 4500);

		runs(function(){
			expect(bingo).toBeDefined();
		});
		next();
	});

	it("receives moves", function(next){
		var received;
		runs(function(){
			client.on('number', function(num){
				console.log('num', num,'bingo.taken', bingo.taken);
				received = bingo.checkNum(num);
			});
		});
		waitsFor(function(){
			return received !== undefined;
		}, 5000);
		runs(function(){
			console.log('bingo.taken', bingo.taken);
			expect(received).not.toBe(undefined);
			//client.disconnect();
		});
		next();
	});

	it("can win a game", function(next){
		runs(function(){
			client.on('number', function(num){
				console.log('num', num,'bingo.taken', bingo.taken);
				bingo.checkNum(num);
			});
		});
		waitsFor(function(){
			return bingo.checkWin();
		}, 150000);
		runs(function(){
			expect(bingo.checkWin()).toBe(true);
			client.disconnect();
		});
		next();
	});

});
