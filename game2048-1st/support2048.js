function getPosTop(i,j,cellwidth,gapwidth) {
	return gapwidth + i * (cellwidth + gapwidth);
}

function getPosLeft(i,j,cellwidth,gapwidth) {
	return gapwidth + j * (cellwidth + gapwidth);
}

function getNCBgcolor(x) {
	switch(x) {
		case 2: return '#edf3ee';break;
		case 4: return '#d6ebe2';break;
		case 8: return '#b5d0cb';break;
		case 16: return '#9cbec2';break;
		case 32: return '#718c9f';break;
		case 64: return '#587788';break;
		case 128: return '#475e71';break;
		case 256: return '#3e7f8d';break;
		case 512: return '#39708f';break;
		case 1024: return '#315f9d';break;
		case 2048: return '#2393aa';break;
	}
}

function getNCColor(x) {
	if(x <= 16) return '#142c4d';
	return '#fff';
}

function getNCFontsize(x) {
	if(x < 10) return '3.3rem';
	else if(x < 100) return '2.8rem';
	else if(x < 1000) return '2.5rem';
	else return '1.9rem';
}

function nospace(arr) {
	for(let i = 0; i < 4; i++) {
		for(let j = 0; j < 4; j++) {
			if(arr[i][j] == 0) return false;
		}
	}
	return true;
}

function canMoveUp(arr) {
	for(let i = 1; i < 4; i++) {
		for(let j = 0; j < 4; j++) {
			if(arr[i][j]) {
				if(arr[i-1][j] == 0 || arr[i][j] == arr[i-1][j]) return true;
			}
		}
	}
	return false;
}

function canMoveDown(arr) {
	for(let i = 2; i >= 0; i--) {
		for(let j = 0; j < 4; j++) {
			if(arr[i][j]) {
				if(arr[i+1][j] == 0 || arr[i][j] == arr[i+1][j]) return true;
			}
		}
	}
	return false;
}

function canMoveLeft(arr) {
	for(let i = 0; i < 4; i++) {
		for(let j = 1; j < 4; j++) {
			if(arr[i][j] != 0) {
				if(arr[i][j-1] == 0 || arr[i][j] == arr[i][j-1]) return true;
			}
		}
	}
	return false;
}

function canMoveRight(arr) {
	for(let i = 0; i < 4; i++) {
		for(let j = 2; j >= 0; j--) {
			if(arr[i][j]) {
				if(arr[i][j+1] == 0 || arr[i][j] == arr[i][j+1]) return true;
			}
		}
	}
	return false;
}

function noBlockHorizontal(row,col1,col2,arr) {
	for(var m = col1+1; m < col2; m++) {
		if(arr[row][m]) return false;
	}
	return true;
}

function noBlockVertical(col,row1,row2,arr) {
	for(var m = row1+1; m < row2; m++) {
		if(arr[m][col]) return false;
	}
	return true;
}