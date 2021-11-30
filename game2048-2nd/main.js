let board = [];
let boardFlag = [];
let updateTimeout,gameOverTimeout,addNumTimeout,changeScoreTimeout;
let score = 0;
let best = 0;

$('document').ready(()=>{
	initialFontsize();
	initialGrid();
	newgame();
});

$('#btn').click(newgame);

window.onresize = ()=>{
	initialFontsize();
	initialGrid();
	updateBoard();
};

function initialFontsize() {
	let width = $('body').width();
	let font;
	if(width >= 550) font = '16px';
	else if(width >= 500) font = '15px';
	else if(width >= 430) font = '13px';
	else if(width >= 380) font = '12px';
	else font = '10px';
	$('html').css('font-size',font);
}

function initialGrid() {
	$('#mainctn').height($('#mainctn').width());
	for(let i = 0; i < 4; i++) {
		for(let j = 0; j < 4; j++) {
			let grid = $('#gridcell-' + i + j);
			grid.css({
				top: getPosTop(i,j),
				left: getPosLeft(i,j),
				width: getCellWH(),
				height: getCellWH()});
		}
	}
}

function newgame() {
	initial();

	addRdmNumber();
	addRdmNumber();
}

function initial() {
	$('#waitcover').hide();
	initialScore();
	initialBoard();
	initialBoardflag();
	updateBoard();
}

function initialScore() {
	score = 0;
	$('#score').text(score);
}


function initialBoard() {
	for(let i = 0; i < 4; i++){
		board[i] = [];
		for(let j = 0; j < 4; j++){
			board[i][j] = 0;
		}
	}
}

function initialBoardflag() {
	for(let i = 0; i < 4; i++){
		boardFlag[i] = [];
		for(let j = 0; j < 4; j++){
			boardFlag[i][j] = 1;
		}
	}
}

function addRdmNumber() {
	let times = 0;
	let i, j;
	do{
		i = Math.floor(Math.random()*4);
		j = Math.floor(Math.random()*4);
		if(!board[i][j]) break;
		times++;
	} while(times < 50);
	if(times == 50) {
		tag1:for(i = 0; i < 4; i++)
			for(j = 0; j < 4; j++)
				if(!board[i][j]) break tag1;
	}

	let number = (Math.random()<0.5)?2:4;
	board[i][j] = number;
	$('#boardcell-'+i+j).text(number);
	$('#boardcell-'+i+j).css({
		backgroundColor: getCellBgcolor(board[i][j]),
		color: getCellColor(board[i][j]),
		fontSize: getCellFontSize(board[i][j]),
		lineHeight: getCellWH()+'px'
	})
	showNumberAnimation(i,j,board);
}

function updateBoard() {
	$('.boardcell').remove();
	for(let i = 0; i < 4; i++){
		for(let j = 0; j < 4; j++){
			$('#main').append('<div class="boardcell" id="boardcell-'+i+j+'"></div>');
			if(board[i][j]) {
				$('#boardcell-'+i+j).text(board[i][j]);
				$('#boardcell-'+i+j).css({
					top: getPosTop(i,j),
					left: getPosLeft(i,j),
					width: getCellWH(),
					height: getCellWH(),
					backgroundColor: getCellBgcolor(board[i][j]),
					color: getCellColor(board[i][j]),
					fontSize: getCellFontSize(board[i][j]),
					lineHeight: getCellWH()+'px'
				});
			} else {
				$('#boardcell-'+i+j).text('');
				$('#boardcell-'+i+j).css({
					top: getPosTop0(i,j),
					left: getPosLeft0(i,j),
					width: 0,
					height: 0
				});
			}
		}
	}
}

function updateScore(plus) {
	score += plus;
	plusAnimation(plus);
	changeScoreTimeout = setTimeout(()=>{
		$('#score').text(score);
	},200);
}

window.onkeypress = (e)=>{
	switch(e.key) {
		case 'w':
			if(moveUp()) {
				addNumTimeout = setTimeout(()=>{
					addRdmNumber();
					checkOver();
				},300);
			}
			break;
		case 's':
			if(moveDown()) {
				addNumTimeout = setTimeout(()=>{
					addRdmNumber();
					checkOver();
				},300);
			}
			break;
		case 'a':
			if(moveLeft()) {
				addNumTimeout = setTimeout(()=>{
					addRdmNumber();
					checkOver();
				},300);
			}
			break;
		case 'd':
			if(moveRight()) {
				addNumTimeout = setTimeout(()=>{
					addRdmNumber();
					checkOver();
				},300);
			}
			break;
	}
};

function moveUp() {
	if(! canMoveUp(board)) return false;
	let plus = 0;
	for(let i = 1; i < 4; i++) {
		for(let j = 0; j < 4; j++) {
			if(board[i][j]) {
				for(let k = 0; k < i; k++){
					if(!board[k][j] && noNumCol(k,i,j,board)){
						board[k][j] = board[i][j];
						board[i][j] = 0;
						moveAnimation(i,j,k,j);
						break;
					} else if(board[k][j] == board[i][j] && noNumCol(k,i,j,board) && boardFlag[k][j]) {
						board[k][j] += board[i][j];
						board[i][j] = 0;
						boardFlag[k][j] = 0;
						moveAnimation(i,j,k,j);
						plus += board[k][j];
						break;
					}
				}
			}
		}
	}

	if(plus) updateScore(plus);
	updateTimeout = setTimeout(updateBoard,200);
	initialBoardflag();
	return true;
}

function moveDown() {
	if(! canMoveDown(board)) return false;
	let plus = 0;
	for(let i = 2; i >= 0; i--) {
		for(let j = 0; j < 4; j++) {
			if(board[i][j]) {
				for(let k = 3; k > i; k--){
					if(!board[k][j] && noNumCol(i,k,j,board)){
						board[k][j] = board[i][j];
						board[i][j] = 0;
						moveAnimation(i,j,k,j);
						break;
					} else if(board[k][j] == board[i][j] && noNumCol(i,k,j,board) && boardFlag[k][j]) {
						board[k][j] += board[i][j];
						board[i][j] = 0;
						boardFlag[k][j] = 0;
						moveAnimation(i,j,k,j);
						plus += board[k][j];
						break;
					}
				}
			}
		}
	}

	if(plus) updateScore(plus);
	updateTimeout = setTimeout(updateBoard,200);
	initialBoardflag();
	return true;
}

function moveLeft() {
	if(! canMoveLeft(board)) return false;
	let plus = 0;
	for(let i = 0; i < 4; i++) {
		for(let j = 1; j < 4; j++) {
			if(board[i][j]) {
				for(let k = 0; k < j; k++){
					if(!board[i][k] && noNumVer(k,j,i,board)){
						board[i][k] = board[i][j];
						board[i][j] = 0;
						moveAnimation(i,j,i,k);
						break;
					} else if(board[i][k] == board[i][j] && noNumVer(k,j,i,board) && boardFlag[i][k]) {
						board[i][k] += board[i][j];
						board[i][j] = 0;
						boardFlag[i][k] = 0;
						moveAnimation(i,j,i,k);
						plus += board[i][k];
						break;
					}
				}
			}
		}
	}

	if(plus) updateScore(plus);
	updateTimeout = setTimeout(updateBoard,200);
	initialBoardflag();
	return true;
}

function moveRight() {
	if(! canMoveRight(board)) return false;
	let plus = 0;
	for(let i = 0; i < 4; i++) {
		for(let j = 2; j >= 0; j--) {
			if(board[i][j]) {
				for(let k = 3; k > j; k--){
					if(!board[i][k] && noNumVer(j,k,i,board)){
						board[i][k] = board[i][j];
						board[i][j] = 0;
						moveAnimation(i,j,i,k);
						break;
					} else if(board[i][k] == board[i][j] && noNumVer(j,k,i,board) && boardFlag[i][k]) {
						board[i][k] += board[i][j];
						board[i][j] = 0;
						boardFlag[i][k] = 0;
						moveAnimation(i,j,i,k);
						plus += board[i][k];
						break;
					}
				}
			}
		}
	}

	if(plus) updateScore(plus);
	updateTimeout = setTimeout(updateBoard,200);
	initialBoardflag();
	return true;
}

function checkOver() {
	if(!(canMoveUp(board) || canMoveDown(board) || canMoveLeft(board) || canMoveRight(board))) {
		gameOverTimeout = setTimeout(gameOver,200);
		return true;
	}
	return false;
}

function gameOver() {
	$('#waitcover').show();
	if(score > best) {
		best = score;
		$('#best').text(best);
		bestAnimation();
	}
}

window.addEventListener('touchstart', (e)=>{
	startx = e.touches[0].pageX;
	starty = e.touches[0].pageY;
});

window.addEventListener('touchmove', (e)=>{
	e.preventDefault(); //警告：被忽略
});

window.addEventListener('touchend', (e)=>{
	endx = e.changedTouches[0].pageX;
	endy = e.changedTouches[0].pageY;

	let dx = endx - startx;
	let dy = endy - starty;
	if(Math.sqrt(dx*dx+dy*dy) < 20) return false;

	if(dx + dy <= 0 && dx - dy > 0){
		if(moveUp()) {
			addNumTimeout = setTimeout(()=>{
				addRdmNumber();
				checkOver();
			},300);
		}
	}
	if(dx + dy >= 0 && dx - dy < 0){
		if(moveDown()) {
			addNumTimeout = setTimeout(()=>{
				addRdmNumber();
				checkOver();
			},300);
		}
	}
	if(dx + dy < 0 && dx - dy <= 0){
		if(moveLeft()) {
			addNumTimeout = setTimeout(()=>{
				addRdmNumber();
				checkOver();
			},300);
		}
	}
	if(dx + dy > 0 && dx - dy >= 0){
		if(moveRight()) {
			addNumTimeout = setTimeout(()=>{
				addRdmNumber();
				checkOver();
			},300);
		}
	}
})