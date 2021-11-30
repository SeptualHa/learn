let board = [];
let boardFlag = [];

let score = 0;
let best = 0;

let startx,starty,endx,endy;

let generateTimeout, gameOverTimeout;

$('document').ready(()=>{
	initialSize();
	initialGrid();
	newgame();
});

window.onresize = ()=>{
	initialSize();
	initialGrid();
	updateBoard();
};

$('#btn').click(()=>{
	newgame();
});

function initialSize() {
	let width = $('#mainctn').width();
	$('#mainctn').height(width);
	$('html').css('font-size',getRootFontSize());
}

function initialGrid() {
	for(let i = 0; i < 4; i++) {
		for(let j = 0; j < 4; j++) {
			$('#gridcell-'+i+j).css({
				top: getPosTop(i,j),
				left: getPosLeft(i,j),
				height: $('#gridcell-'+i+j).width()
			});
		}
	}
}

function initialScore() {
	score = 0;
	$('#score').text(score);
}

function initialBoard() {
	for(let i = 0; i < 4; i++) {
		board[i] = []
		for(let j = 0; j < 4; j++) {
			board[i][j] = 0;
		}
	}
}

function initialBoardFlag() {
	for(let i = 0; i < 4; i++) {
		boardFlag[i] = []
		for(let j = 0; j < 4; j++) {
			boardFlag[i][j] = 1;
		}
	}
}

function removeCover() {
	$('#cover').css('display','none');
}

function newgame() {
	removeCover();
	initialScore();
	initialBoard();
	initialBoardFlag();
	updateBoard();

	generateOneNumber();
	generateOneNumber();
}

function updateBoard() {
	$('.boardcell').remove();
	let cellwidth = $('#gridcell-00').width();
	for(let i = 0; i < 4; i++) {
		for(let j = 0; j < 4; j++) {
			$('#main').append('<div class="boardcell" id="boardcell-'+i+j+'"></div>');
			let cell = $('#boardcell-'+i+j);
			let number = board[i][j];
			if(number == 0) {
				cell.text('');
				cell.css({
					top: getPosTop0(i,j),
					left: getPosLeft0(i,j),
					width: 0,
					height: 0
				});
			} else {
				cell.text(number);
				cell.css({
					top: getPosTop(i,j),
					left: getPosLeft(i,j),
					width: cellwidth,
					height: cellwidth,
					lineHeight: cellwidth+'px',
					backgroundColor: getBgColor(number),
					color: getColor(number),
					fontSize: getFontSize(number)
				});
			}
		}
	}
}

function generateOneNumber() {
	let rdmNumber = (Math.random()<0.5)?4:2;
	let times = 0;
	let rdmi,rdmj;
	do{
		rdmi = Math.floor(Math.random()*4);
		rdmj = Math.floor(Math.random()*4);
		times++;
		if(board[rdmi][rdmj] == 0) break;
	} while(times < 50);
	if(times == 50) {
		tag1: for(let i = 0; i < 4; i++){
			for(let j = 0; j < 4; j++){
				if(board[i][j] == 0){
					rdmi = i;
					rdmj = j;
					break tag1;
				}
			}
		}
	}

	board[rdmi][rdmj] = rdmNumber;
	$('#boardcell-'+rdmi+rdmj).text(rdmNumber);
	$('#boardcell-'+rdmi+rdmj).css({
		lineHeight: $('#gridcell-00').width()+'px',
		backgroundColor: getBgColor(rdmNumber),
		color: getColor(rdmNumber),
		fontSize: getFontSize(rdmNumber)
	});
	showNumberAnimation(rdmi,rdmj);
}

window.onkeypress = (e)=>{
	switch(e.key) {
		case 'w':
			if(moveUp()) {
				generateTimeout = setTimeout(()=>{
					updateBoard();
					generateOneNumber();
					isGameOver()
				},150);
			}
			break;
		case 's':
			if(moveDown()) {
				generateTimeout = setTimeout(()=>{
					updateBoard();
					generateOneNumber();
					isGameOver()
				},150);
			}
			break;
		case 'a':
			if(moveLeft()) {
				generateTimeout = setTimeout(()=>{
					updateBoard();
					generateOneNumber();
					isGameOver()
				},150);
			}
			break;
		case 'd':
			if(moveRight()) {
				generateTimeout = setTimeout(()=>{
					updateBoard();
					generateOneNumber();
					isGameOver()
				},150);
			}
			break;
	}
};

function moveUp() {
	if(!canMoveUp(board)) return false;

	let plus = 0;
	for(let i = 1; i < 4; i++) {
		for(let j = 0; j < 4; j++) {
			if(board[i][j] != 0) {
				for(let k = 0; k < i; k++) {
					//之间没有阻碍
					if(noNumberVer(k,i,j,board)){
						//board[k][j]为0
						if(board[k][j] == 0){
							board[k][j] = board[i][j];
							board[i][j] = 0;
							moveAnimation(i,j,k,j);
							break;
						}
						//数字相同
						if(board[k][j] == board[i][j] && boardFlag[k][j]) {
							board[k][j] += board[i][j];
							board[i][j] = 0;
							plus += board[k][j];
							boardFlag[k][j] = 0;
							moveAnimation(i,j,k,j);
							break;
						}
					}
				}
			}
		}
	}
	updateScore(plus);
	initialBoardFlag();
	return true;
}

function moveDown() {
	if(!canMoveDown(board)) return false;

	let plus = 0;
	for(let i = 2; i >= 0; i--){
		for(let j = 0; j < 4; j++){
			if(board[i][j] != 0) {
				for(let k = 3; k > i; k--){
					if(noNumberVer(i,k,j,board)) {
						//
						if(board[k][j] == 0) {
							board[k][j] = board[i][j];
							board[i][j] = 0;
							moveAnimation(i,j,k,j);
							break;
						}
						//
						if(board[k][j] == board[i][j] && boardFlag[k][j]) {
							board[k][j] += board[i][j];
							board[i][j] = 0;
							plus += board[k][j];
							boardFlag[k][j] = 0;
							moveAnimation(i,j,k,j);
							break;
						}
					}
				}
			}
		}
	}
	updateScore(plus);
	initialBoardFlag();
	return true;
}

function moveLeft() {
	if(!canMoveLeft(board)) return false;

	let plus = 0;
	for(let i = 0; i < 4; i++){
		for(let j = 1; j < 4; j++){
			if(board[i][j] != 0){
				for(let k = 0; k < j; k++){
					if(noNumberHori(k,j,i,board)){
						//
						if(board[i][k] == 0) {
							board[i][k] = board[i][j];
							board[i][j] = 0;
							moveAnimation(i,j,i,k);
							break;
						}
						//
						if(board[i][k] == board[i][j] && boardFlag[i][k]) {
							board[i][k] += board[i][j];
							board[i][j] = 0;
							plus += board[i][k];
							boardFlag[i][k] = 0;
							moveAnimation(i,j,i,k);
							break;
						}
					}
				}
			}
		}
	}
	updateScore(plus);
	initialBoardFlag();
	return true;
}

function moveRight() {
	if(!canMoveRight(board)) return false;

	let plus = 0;
	for(let i = 0; i < 4; i++){
		for(let j = 2; j >= 0; j--){
			if(board[i][j] != 0){
				for(let k = 3; k > j; k--){
					if(noNumberHori(j,k,i,board)){
						//
						if(board[i][k] == 0){
							board[i][k] = board[i][j];
							board[i][j] = 0;
							moveAnimation(i,j,i,k);
							break;
						}
						//
						if(board[i][k] == board[i][j] && boardFlag[i][k]) {
							board[i][k] += board[i][j];
							board[i][j] = 0;
							plus += board[i][k];
							boardFlag[i][k] = 0;
							moveAnimation(i,j,i,k);
							break;
						}
					}
				}
			}
		}
	}
	updateScore(plus);
	initialBoardFlag();
	return true;
}

function isGameOver() {
	if(canMoveUp(board) || canMoveDown(board) || canMoveLeft(board) || canMoveRight(board)){
		return false;
	}

	gameOverTimeout = setTimeout(gameOver,400);
	return true;
}

function gameOver() {
	if(score > best){
		best = score;
		$('#best').text(best);
	}
	$('#cover').css('display','block');
}

function updateScore(plus) {
	score += plus;
	$('#score').text(score);
}

window.addEventListener('touchstart',(e)=>{
	startx = e.touches[0].pageX;
	starty = e.touches[0].pageY;
});

window.addEventListener('touchend',(e)=>{
	endx = e.changedTouches[0].pageX;
	endy = e.changedTouches[0].pageY;

	let dx = endx - startx;
	let dy = endy - starty;

	if(Math.sqrt(dx*dx+dy*dy) < 20) return false;

	if(dx+dy>=0 && dx-dy<0) {
		if(moveDown()) {
			generateTimeout = setTimeout(()=>{
				updateBoard();
				generateOneNumber();
				isGameOver()
			},150);
		}
	} else if(dx+dy<=0 && dx-dy>0) {
		if(moveUp()) {
			generateTimeout = setTimeout(()=>{
				updateBoard();
				generateOneNumber();
				isGameOver()
			},150);
		}
	} else if(dx+dy>0 && dx-dy>=0) {
		if(moveRight()) {
			generateTimeout = setTimeout(()=>{
				updateBoard();
				generateOneNumber();
				isGameOver()
			},150);
		}
	} else if(dx+dy<0 && dx-dy<=0) {
		if(moveLeft()) {
			generateTimeout = setTimeout(()=>{
				updateBoard();
				generateOneNumber();
				isGameOver()
			},150);
		}
	}
});