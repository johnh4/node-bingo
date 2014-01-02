var Bingo = require('../models/bingo');

describe("Bingo", function(){
	var board = { slots:
	   { B: [ 4, 7, 10, 11, 13 ],
	     I: [ 20, 22, 25, 33, 36 ],
	     N: [ 37, 45, 46, 52, 54 ],
	     G: [ 55, 59, 60, 62, 69 ],
	     O: [ 73, 74, 76, 77, 78 ] } };
	var bingo;

	beforeEach(function(){
		bingo = new Bingo(board);
	});

	it("should have the correct board", function(next){
		expect(bingo.slots).toEqual(board.slots);
		next();
	});

	it("should have the correct methods", function(next){
		expect(bingo.checkNum).toBeDefined();
		expect(bingo.addNum).toBeDefined();
		expect(bingo.getRow).toBeDefined();
		expect(bingo.getCol).toBeDefined();
		expect(bingo.checkWin).toBeDefined();
		expect(bingo.checkRowsAndCols).toBeDefined();
		expect(bingo.checkDiags).toBeDefined();
		next();
	});

	it("taken should be empty to start", function(next){
		var dblEmpty = [0,0,0,0,0];
		dblEmpty = dblEmpty.map(function(row){ return [0,0,0,0,0] });
		expect(bingo.taken).toEqual(dblEmpty);
		next();
	});

	describe("methods", function(){

		beforeEach(function(){
			bingo.checkNum('I25');
			bingo.checkNum('N46');
			bingo.checkNum('I33');
		});

		it("should get the correct row with getRow", function(next){
			var row = [0,1,1,0,0];
			expect(bingo.getRow(2)).toEqual(row);
			next();
		});

		it("should get the correct col with getCol", function(next){
			var col = [0,0,1,1,0];
			expect(bingo.getCol(1)).toEqual(col);
			next();
		});

		it("should get the correct diagonal with checkDiags", function(next){
			bingo = new Bingo(board);
			bingo.checkNum('B4');
			bingo.checkNum('I22');
			bingo.checkNum('N46');
			bingo.checkNum('G62');
			bingo.checkNum('O78');
			expect(bingo.checkDiags()).toBe(true);
			expect(bingo.checkWin()).toBe(true);
			next();
		});

		describe("when determining a winner", function(){
			
			beforeEach(function(){
				bingo = new Bingo(board);
				bingo.checkNum('B10');
				bingo.checkNum('N46');
				bingo.checkNum('G60');
				bingo.checkNum('O76');
			});

			it("should not give a winner prematurely", function(next){
				expect(bingo.getRow(2)).not.toEqual([1,1,1,1,1]);
				expect(bingo.checkWin()).toBe(false);
				next();
			});

			it("should reveal winner via checkWin", function(next){
				bingo.checkNum('I25');
				expect(bingo.getRow(2)).toEqual([1,1,1,1,1]);
				expect(bingo.checkWin()).toBe(true);
				next();
			});

		});


	});
});