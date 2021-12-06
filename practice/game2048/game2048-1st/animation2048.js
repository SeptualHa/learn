function showNumberWithAnimation(i,j,x,cellwidth,gapwidth) {
	var numbercell = $('#numbercell-' + i + '-' + j);
	numbercell.css('background-color', getNCBgcolor(x));
	numbercell.css('color', getNCColor(x));
	numbercell.text(x);

	numbercell.animate({
		width: cellwidth,
		height: cellwidth,
		top: getPosTop(i,j,cellwidth,gapwidth) + 'px',
		left: getPosLeft(i,j,cellwidth,gapwidth) + 'px'
	}, 100);
}

function showMoveAnimation(fromi,fromj,toi,toj,cellwidth,gapwidth) {
	var numbercell = $('#numbercell-' + fromi + '-' + fromj);
	
	numbercell.animate({
		top: getPosTop(toi,toj,cellwidth,gapwidth) + 'px',
		left: getPosLeft(toi,toj,cellwidth,gapwidth) + 'px'
	},200);
}

function plusAnimation(plus) {
	var newpara = $("<p class='plus'>+" + plus + "</p>")
	$('#score').after(newpara);
	newpara.animate({
		opacity: '1',
		bottom: '0px'
	},150).animate({
		opacity: '0',
		bottom: '5px'
	},150);
	
	setTimeout(()=>{newpara.remove();},350);
}

function bestAnimation() {
	var newpara = $("<p class='light'>new!!</p>")
	$('#best').after(newpara);

	newpara.animate({
		opacity: '0'
	},500).animate({
		opacity: '1'
	},500).animate({
		opacity: '0'
	},500).animate({
		opacity: '1'
	},500);
	
	setTimeout(()=>{newpara.remove();},3000);
}