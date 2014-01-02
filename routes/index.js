var Bingo = require('../models/bingo');

/*
 * GET home page.
 */

exports.index = function(req, res){
	var payload = { slots:
   { B: [ 4, 7, 10, 11, 13 ],
     I: [ 20, 22, 25, 33, 36 ],
     N: [ 37, 45, 46, 52, 54 ],
     G: [ 55, 59, 60, 62, 69 ],
     O: [ 73, 74, 76, 77, 78 ] } }
	var game = new Bingo(payload);
	var test = game.B;
	console.log(game.checkNum("N37"));
	console.log(game.checkNum("N45"));
	console.log(game.checkNum("N46"));
	console.log(game.checkNum("N52"));

	//console.log(game.checkNum("B4"));
	//console.log(game.checkNum("I22"));
	//console.log(game.checkNum("G62"));
	//console.log(game.checkNum("O78"));
	console.log(game.checkNum("B13"));
	console.log(game.checkNum("I33"));
	console.log(game.checkNum("G59"));
	console.log(game.checkNum("O73"));
	console.log(game.getRow(2));
  res.render('index', { title: 'Express', test: test });
};