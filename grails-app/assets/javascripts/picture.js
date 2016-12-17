//= require plugins/bootstrap-jasny
//= require_self

$('.photo.fileinput-new .thumbnail, .photo.fileinput-exists .thumbnail').has('img')
	.css('cursor', 'pointer')
	.click(function(evt) {
		var fileName = $(this).attr('data-field');
		var srcDataImage = $(this).find('img').attr('src').split(',')[0];

		BootstrapDialog.show({
			cssClass: 'image-dialog',
			title: (decodeURIComponent(fileName.replace(/\+/g, "%20"))).split('/')[2],
			message: function(dialog) {
				var ctnr = $('<div><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>');
				var img = $('<img/>').on('load', function(event) {
					if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
						dialog.setType(BootstrapDialog.TYPE_DANGER);
						dialog.getModalBody().html('Broken image!');
					} else {
						dialog.setType(BootstrapDialog.TYPE_INFO);
						ctnr.html($('<div>').append(img));//.kinetic();
						// var bsModal = dialog.getModal().data('bs.modal');
						var ele = $(dialog.$modal[0]).find('.modal-dialog');
						if (this.width > 600) {
							ele.css('width', (30+this.width)+'px');
						}
						ele.css('height', (30+this.height)+'px');
					}
				}).attr('src', server.ctxPath + server.imgPath + '/' + fileName);

				return ctnr;
			}
		});
	});
