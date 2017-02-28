/*
 * string utilities
 */
function pad(num, len = 10, ch = 0) {
	return (String(ch).repeat(len) + String(num)).slice(String(num).length)
}
