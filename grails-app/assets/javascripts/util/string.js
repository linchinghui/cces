/*
 * string utilities
 */
function pad(num, len, ch) {
	if (typeof(len) === 'undefined') { len = 10; }
	if (typeof(ch) === 'undefined') { ch = 0; }
	return (String(ch).repeat(len) + String(num)).slice(String(num).length)
}

function hideHalf(str) {
	if (typeof(str) === 'undefined') {
		return '';
	}
	var mid = str ? str.length / 2 : 2;
	return str.slice(0, mid) + '<span class="hidden-xs">' + str.slice(mid) + '</span>';
}
