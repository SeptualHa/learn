function showNumberAnimation(i,j,board) {
	$('#boardcell-'+i+j).animate({
		top: getPosTop(i,j),
		left: getPosLeft(i,j),
		width: getCellWH(),
		height: getCellWH(),
	},100);
}

function moveAnimation(fromi,fromj,toi,toj) {
	$('#boardcell-'+fromi+fromj).animate({
		top: getPosTop(toi,toj),
		left: getPosLeft(toi,toj)
	},200);
}

function plusAnimation(plus) {
	$('.plus').remove();
	$('#scorectn').append('<p class="plus">+' + plus + '</p>');
	$('.plus').animate({
		bottom: '1.8rem',
		opacity: 1
	},100).animate({
		bottom: '2rem',
		opacity: 0
	},200);
}

function bestAnimation() {
	$('#new').css('display','block');
	$('#new').animate({
		opacity: 1
	},200).animate({
		opacity: 0
	},200).animate({
		opacity: 1
	},200).animate({
		opacity: 0
	},200).animate({
		opacity: 1
	},200).fadeOut(1000);
}