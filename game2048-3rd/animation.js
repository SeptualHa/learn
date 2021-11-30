function showNumberAnimation(i,j) {
	$('#boardcell-'+i+j).animate({
		top: getPosTop(i,j),
		left: getPosLeft(i,j),
		width: $('#gridcell-00').width(),
		height: $('#gridcell-00').width(),
	},150);
}

function moveAnimation(fromi,fromj,toi,toj) {
	$('#boardcell-'+fromi+fromj).animate({
		top: getPosTop(toi,toj),
		left: getPosLeft(toi,toj)
	},150);
}