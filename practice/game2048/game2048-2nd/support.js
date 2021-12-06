function getPosTop(i,j) {
	let ctnWidth = $('#mainctn').width();
	return 0.04*ctnWidth + i*0.24*ctnWidth;
}

function getPosLeft(i,j) {
	let ctnWidth = $('#mainctn').width();
	return 0.04*ctnWidth + j*0.24*ctnWidth;
}

function getCellWH() {
	let ctnWidth = $('#mainctn').width();
	return 0.2*ctnWidth;
}

function getPosTop0(i,j) {
	let ctnWidth = $('#mainctn').width();
	return 0.04*ctnWidth + i*0.24*ctnWidth + 0.1*ctnWidth;
}

function getPosLeft0(i,j) {
	let ctnWidth = $('#mainctn').width();
	return 0.04*ctnWidth + j*0.24*ctnWidth + 0.1*ctnWidth;
}

function getCellBgcolor(number) {
	switch(number){
		case 2: return '#fff';
		case 4: return '#ddd';
		case 8: return '#ccc';
		case 16: return '#bbb';
		case 32: return '#aaa';
		case 64: return '#777';
		case 128: return '#666';
		case 256: return '#444';
		case 512: return '#333';
		case 1024: return '#222';
		case 2048: return '#111';
	}
}

function getCellColor(number) {
	if(number < 50) return '#555';
	else return '#fff';
}

function getCellFontSize(number) {
	if(number < 10) return '3.5rem';
	else if(number < 100) return '3rem';
	else if(number < 1000) return '2.5rem';
	else return '2rem';
}

function canMoveUp(board) {
	for(let i = 1; i < 4; i++){
		for(let j = 0; j < 4; j++){
			if(board[i][j]) {
				if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown(board) {
	for(let i = 2; i >= 0; i--){
		for(let j = 0; j < 4; j++){
			if(board[i][j]) {
				if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveLeft(board) {
	for(let i = 0; i < 4; i++){
		for(let j = 1; j < 4; j++){
			if(board[i][j]) {
				if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveRight(board) {
	for(let i = 0; i < 4; i++){
		for(let j = 2; j >= 0; j--){
			if(board[i][j]) {
				if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function noNumCol(row1,row2,col,board) {
	for(let i = row1+1; i < row2; i++){
		if(board[i][col]) return false;
	}
	return true;
}

function noNumVer(col1,col2,row,board) {
	for(let j = col1+1; j < col2; j++){
		if(board[row][j]) return false;
	}
	return true;
}