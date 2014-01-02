var socket = require('socket.io-client');
var Bingo = require('../models/bingo');

describe("websocket tests", function(){

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
