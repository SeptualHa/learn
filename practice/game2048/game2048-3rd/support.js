function getPosTop(i,j) {
	let width = $('#mainctn').width();
	return 0.032*width + 0.242*width*i;
}

function getPosLeft(i,j) {
	let width = $('#mainctn').width();
	return 0.032*width + 0.242*width*j;
}

function getPosTop0(i,j) {
	let width = $('#mainctn').width();
	return 0.032*width + 0.242*width*i + 0.105*width;
}

function getPosLeft0(i,j) {
	let width = $('#mainctn').width();
	return 0.032*width + 0.242*width*j + 0.105*width;
}

function getBgColor(x) {
	switch(x) {
		case 2048: return '#444';
		case 1024: return '#555';
		case 512: return '#666';
		case 256: return '#777';
		case 128: return '#888';
		case 64: return '#999';
		case 32: return '#aaa';
		case 16: return '#bbb';
		case 8: return '#ccc';
		case 4: return '#ddd';
		case 2: return '#eee';
	}
}

function getColor(x) {
	if(x <= 256) return '#555';
	else return '#ddd';
}

function getFontSize(x) {
	if(x < 10) return '4rem';
	else if(x < 100) return '3.5rem';
	else if(x < 1000) return '3rem';
	else return '2.3rem';
}

function getRootFontSize() {
	let width = $('body').width();
	if(width > 530) return '16px';
	else if(width > 450) return '14px';
	else if(width > 400) return '12px';
	else return '11px';
}

function canMoveUp(board) {
	for(let i = 1; i < 4; i++){
		for(let j = 0; j < 4; j++){
			if(board[i][j] != 0) {
				if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
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
			if(board[i][j] != 0) {
				if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveLeft(board){
	for(let i = 0; i < 4; i++) {
		for(let j = 1; j < 4; j++){
			if(board[i][j] != 0) {
				if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
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
			if(board[i][j] != 0) {
				if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function noNumberVer(row1,row2,col,board) {
	for(let row = row1+1; row < row2; row++) {
		if(board[row][col] != 0){return false;}
	}
	return true;
}

function noNumberHori(col1,col2,row,board) {
	for(let col = col1+1; col < col2; col++) {
		if(board[row][col] != 0){return false;}
	}
	return true;
}