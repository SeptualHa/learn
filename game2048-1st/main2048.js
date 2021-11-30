var board = [];
var hasConflicted = [];
var score = 0;
var plus = 0;
var best = 0;

var addnewTimeout,isoverTimeout,showscoreTimeout;

var cellwidth, gapwidth;

var startx, starty;
var endx, endy;

$('document').ready(() => {
	getSize();
	getRootFontsize();
	newgame();
});

$('#ngbtn').click(() => {
	newgame();
});

window.onresize = () => {
	getSize();
	getRootFontsize();
	initialGridcell();
	updateBoardView();
};

window.onkeypress = e => {
	switch(e.key) {
		case 'w':
			if(moveUp()) {
				addnewTimeout = setTimeout(generateOneNumber,250);
				isoverTimeout = setTimeout(isgameover, 500);
			}
			break;
		case 'a':
			if(moveLeft()) {
				addnewTimeout = setTimeout(generateOneNumber,250);
				isoverTimeout = setTimeout(isgameover, 500);
			}
			break;
		case 's':
			if(moveDown()) {
				addnewTimeout = setTimeout(generateOneNumber,250);
				isoverTimeout = setTimeout(isgameover, 500);
			}
			break;
		case 'd':
			if(moveRight()) {
				addnewTimeout = setTimeout(generateOneNumber,250);
				isoverTimeout = setTimeout(isgameover, 500);
			}
			break;
	}
};

window.addEventListener('touchstart', e=>{
	startx = e.touches[0].pageX;
	starty = e.touches[0].pageY;
});

window.addEventListener('touchmove', e=>{
	e.preventDefault();
});

window.addEventListener('touchend', e=>{
	endx = e.changedTouches[0].pageX;
	endy = e.changedTouches[0].pageY;

	var dx = endx - startx;
	var dy = endy - starty;
	var d = Math.sqrt(dx*dx + dy*dy);
	if(d < 20) return false;

	var a = dx + dy;
	var b = dy - dx;
	if(a >= 0 && b > 0) {
		if(moveDown()) {
			addnewTimeout = setTimeout(generateOneNumber,250);
			isoverTimeout = setTimeout(isgameover, 500);
		}
	}else if(a > 0 && b <= 0) {
		if(moveRight()) {
			addnewTimeout = setTimeout(generateOneNumber,250);
			isoverTimeout = setTimeout(isgameover, 500);
		}
	} else if(a <= 0 && b < 0) {
		if(moveUp()) {
			addnewTimeout = setTimeout(generateOneNumber,250);
			isoverTimeout = setTimeout(isgameover, 500);
		}
	} else if(a < 0 && b >= 0) {
		if(moveLeft()) {
			addnewTimeout = setTimeout(generateOneNumber,250);
			isoverTimeout = setTimeout(isgameover, 500);
		}
	}
});

function newgame() {
	/* 停止目前进行的动作 */
	stopAll();
	/* 初始化棋盘 */
	initial();
	/* 加入随机两个数字 */
	generateOneNumber();
	generateOneNumber();
}

function stopAll() {
	clearTimeout(addnewTimeout);
	clearTimeout(isoverTimeout);
	clearTimeout(showscoreTimeout);
	$('.plus').remove();
}

function initial() {
	/* 初始化分数 */
	score = 0;
	$('#score').text(0);

	/* 确定背景格子位置 */
	$('#cover').hide();
	initialGridcell();


	/* 初始化两个数组 */
	for(let i = 0; i < 4; i++) {
		board[i] = [];
		hasConflicted[i] = [];
		for(let j = 0; j < 4; j++){
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}
	updateBoardView();
}

function initialGridcell() {
	for(let i = 0; i < 4; i++) {
		for(let j = 0; j < 4; j++){
			let gridcell = $('#gridcell-'+i+'-'+j);
			gridcell.css('top', getPosTop(i,j,cellwidth,gapwidth) + 'px');
			gridcell.css('left', getPosLeft(i,j,cellwidth,gapwidth) + 'px');
			gridcell.css('width', cellwidth);
			gridcell.css('height', cellwidth);
		}
	}
}

function updateBoardView() {
	$('.numbercell').remove();

	for(let i = 0; i < 4; i++) {
		for(let j = 0; j < 4; j++) {
			$('.main').append("<div class='numbercell' id='numbercell-" + i + '-' + j +"'></div>");
			let numbercell = $('#numbercell-' + i + '-' + j);
			if(board[i][j] == 0) {
				numbercell.css('width', '0px');
				numbercell.css('height', '0px');
				numbercell.css('top', getPosTop(i,j,cellwidth,gapwidth) + cellwidth * 0.5 + 'px');
				numbercell.css('left', getPosLeft(i,j,cellwidth,gapwidth) + cellwidth * 0.5 + 'px');
			} else {
				numbercell.css('width', cellwidth + 'px');
				numbercell.css('height', cellwidth + 'px');
				numbercell.css('top', getPosTop(i,j,cellwidth,gapwidth) + 'px');
				numbercell.css('left', getPosLeft(i,j,cellwidth,gapwidth) + 'px');
				numbercell.css('background-color', getNCBgcolor(board[i][j]));
				numbercell.css('color', getNCColor(board[i][j]));
				numbercell.css('font-size', getNCFontsize(board[i][j]));
				numbercell.text(board[i][j]);
			}

			hasConflicted[i][j] = false;
		}
	}
}

function generateOneNumber() {
	/* 是否有空位 */
	//if(nospace(board)) return false;

	/* 随机位置 */
	var randomi,randomj;
	var times = 0;
	while(times < 5) {
		randomi = parseInt(Math.floor(Math.random() * 4));
		randomj = parseInt(Math.floor(Math.random() * 4));
		times++;
		if(board[randomi][randomj] == 0) break;
	}
	if(times == 5) {
		tag1:for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 4; j++) {
				if(board[i][j] == 0) {
					randomi = i;
					randomj = j;
					break tag1;
				}
			}
		}
	}
	/* 随机数 */
	var randomNumber = (Math.random()<0.5)?2:4;

	board[randomi][randomj] = randomNumber;
	showNumberWithAnimation(randomi,randomj,randomNumber,cellwidth,gapwidth);
}

function moveUp() {
	if(!canMoveUp(board)) return false;

	for(let i = 1; i < 4; i++) {
		for(let j = 0; j < 4; j++) {
			if(board[i][j]) {
				for(let k = 0; k < i; k++) {
					if(board[k][j] == 0 && noBlockVertical(j,k,i,board)) {
						board[k][j] = board[i][j];
						board[i][j] = 0;
						showMoveAnimation(i,j,k,j,cellwidth,gapwidth);
						continue;
					} else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]) {
						board[k][j] += board[i][j];
						board[i][j] = 0;
						hasConflicted[k][j] = true;
						showMoveAnimation(i,j,k,j,cellwidth,gapwidth);
						plus += board[k][j];
						continue;
					}
				}
			}
		}
	}

	if(plus){
		score += plus;
		updateScore(score,plus);
		plus = 0;
	}
	
	setTimeout(updateBoardView, 200);
	return true;
}

function moveDown() {
	if(!canMoveDown(board)) return false;

	for(let i = 2; i >= 0; i--) {
		for(let j = 0; j < 4; j++) {
			if(board[i][j]) {
				for(let k = 3; k > i; k--) {
					if(board[k][j] == 0 && noBlockVertical(j,i,k,board)) {
						board[k][j] = board[i][j];
						board[i][j] = 0;
						showMoveAnimation(i,j,k,j,cellwidth,gapwidth);
						continue;
					} else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]) {
						board[k][j] += board[i][j];
						board[i][j] = 0;
						hasConflicted[k][j] = true;
						showMoveAnimation(i,j,k,j,cellwidth,gapwidth);
						plus += board[k][j];
						continue;
					}
				}
			}
		}
	}

	if(plus){
		score += plus;
		updateScore(score,plus);
		plus = 0;
	}

	setTimeout(updateBoardView,200);
	return true;
}

function moveLeft() {
	if(!canMoveLeft(board)) return false;

	for(let i = 0; i < 4; i++) {
		for(let j = 1; j < 4; j++){
			if(board[i][j]) {
				for(let k = 0; k < j; k++) {
					if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)) {
						//move
						board[i][k] = board[i][j];
						board[i][j] = 0;
						showMoveAnimation(i,j,i,k,cellwidth,gapwidth);
						continue;
					} else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]) {
						//move
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						hasConflicted[i][k] = true;
						showMoveAnimation(i,j,i,k,cellwidth,gapwidth);
						plus += board[i][k];
						continue;
					}
				}
			}
		}
	}

	if(plus){
		score += plus;
		updateScore(score,plus);
		plus = 0;
	}
		
	setTimeout(updateBoardView, 200);
	return true;
}

function moveRight() {
	if(!canMoveRight(board)) return false;

	for(let i = 0; i < 4; i++) {
		for(let j = 2; j >= 0; j--) {
			if(board[i][j]) {
				for(let k = 3; k > j; k--) {
					if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)) {
						board[i][k] = board[i][j];
						board[i][j] = 0;
						showMoveAnimation(i,j,i,k,cellwidth,gapwidth);
						continue;
					} else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]) {
						board[i][k] += board[i][j];
						board[i][j] = 0;
						hasConflicted[i][k] = true;
						showMoveAnimation(i,j,i,k,cellwidth,gapwidth);
						plus += board[i][k];
						continue;
					}
				}
			}
		}
	}

	if(plus){
		score += plus;
		updateScore(score,plus);
		plus = 0;
	}

	setTimeout(updateBoardView, 200);
	return true;
}

function isgameover() {
	if(canMoveUp(board) || canMoveDown(board) || canMoveLeft(board) || canMoveRight(board)) return true;

	gameover();
}

function gameover() {
	$('#cover').show();
	if(score > best) {
		best = score;
		updateBest(best);
	}
}

function updateScore(score,plus) {
	showscoreTimeout = setTimeout(()=>{$('#score').text(score)}, 300);
	plusAnimation(plus);
}

function updateBest(best) {
	$('#best').text(best);
	bestAnimation();
}

function getSize() {
	var width = parseInt(window.innerWidth);
	if(width >= 550) {
		cellwidth = 100;
		gapwidth = 15;
	} else {
		cellwidth = 18.125 * width * 0.01;
		gapwidth = 2.7 * width * 0.01;
	}
}

function getRootFontsize() {
	var width = parseInt(window.innerWidth);
	if(width >= 500) {
		$('html').css('font-size', '16px');
	} else if(width >= 450) {
		$('html').css('font-size', '15px');
	} else {
		$('html').css('font-size', '13px');		
	} 

}