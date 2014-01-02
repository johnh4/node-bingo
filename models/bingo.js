var payload = { slots:
   { B: [ 4, 7, 10, 11, 13 ],
     I: [ 20, 22, 25, 33, 36 ],
     N: [ 37, 45, 46, 52, 54 ],
     G: [ 55, 59, 60, 62, 69 ],
     O: [ 73, 74, 76, 77, 78 ] } }


var Bingo = function(card){
	this.slots = card.slots;
	this.B = this.slots.B;
	this.taken = [0,0,0,0,0];
	this.taken = this.taken.map(function(row){
		return [0,0,0,0,0];
	});

	this.checkNum = function(move){
		//console.log('this.taken', this.taken);
		var col = move.replace(/([A-Z])\d+/,'$1');
		var num = parseInt(move.replace(/[A-Z](\d+)/,'$1'));
		var i = 0;
		for (var prop in this.slots){
			var letter = prop.toString();
			if(col === letter){
				var colArr = this.slots[prop];
				var location = colArr.indexOf(num);
				if(location !== -1){
					this.addNum(location, i);
					return true;
				}
			}
			i++;
		}
		return false;
	}

	this.addNum = function(rowIndex, colIndex){
		this.taken[rowIndex][colIndex] = 1;
		//console.log('this.taken', this.taken);
		//console.log('this.checkWin()',this.checkWin());
	}

	this.getRow = function(index){
		//var row = [];
		//for(var i = 0; i < 5; i++){
		//	row.push(this.taken[index][i]);
		//}
		//return row;
		return this.taken[index];
	}

	this.getCol = function(index){
		var col = [];
		for(var i = 0; i < 5; i++){
			col.push(this.taken[i][index]);
		}
		return col;
		//return this.taken[index];
	}

	this.checkWin = function(){
		return (this.checkRowsAndCols() || this.checkDiags());
	}

	this.checkRowsAndCols = function(){
		for(var i=0; i < 5; i++){
			var row = this.getRow(i);
			var col = this.getCol(i);
			var winningRow = row.every(function(num){ return num === 1 });
			var winningCol = col.every(function(num){ return num === 1 });
			if(winningRow || winningCol) return true;
		}
		return false;
	}

	this.checkDiags = function(){
		var diag1 = [];
		var diag2 = [];
		for(var i = 0; i < 5; i++){
			diag1.push(this.taken[i][i]);
			diag2.push(this.taken[i][4-i]);
		}
		//console.log('diag1', diag1, 'diag2', diag2);
		var diag1Win = diag1.every(function(num){ return num === 1 });
		var diag2Win = diag2.every(function(num){ return num === 1 });
		//console.log('diag1Win', diag1Win, 'diag2Win', diag2Win);
		return (diag1Win || diag2Win);
	}
}

module.exports = Bingo;