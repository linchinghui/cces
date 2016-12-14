//= require plugins/bootstrap-jasny
//= require_self
$('.photo.fileinput-new .thumbnail, .photo.fileinput-exists .thumbnail').has('img')
.css('cursor', 'pointer')
.click(function(evt) {
	var fileName = $(this).attr('data-field');
	BootstrapDialog.show({
		title: (decodeURIComponent(fileName.replace(/\+/g,"%20"))).split('/')[2],
		// message: requestAction4BootstrapDialog({
		// 	url: server.ctxPath + server.imgPath + '/' + fileName
		// }) // GET method
		message: '<img src="' + server.ctxPath + server.imgPath + '/' + fileName + '" />'
	});
});
