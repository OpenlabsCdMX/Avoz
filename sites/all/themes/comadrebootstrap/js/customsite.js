(function ($) {

	$( document ).ready(function() {
		$('form button').removeClass("btn-primary");
		$('form button').addClass("btn-success");
		
		
		$('.front a[href*="#"]:not([href="#"])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html, body').animate({
					  scrollTop: target.offset().top
					}, 1500);
					return false;
				}
			}						
			
		});	
		
		$('.webform-component-fieldset .panel-body').css('padding', '0');				
		
		
		$('.node-type-videos iframe.media-youtube-player').attr('width','100%');
		$('.node-galeria .field-type-image .field-item, .node-type-articulo-bazar .field-type-image .field-item').addClass('col-md-3 col-sm-4 col-xs-6');
		$('.node-galeria .field-type-image .field-item img, .node-type-articulo-bazar .field-type-image .field-item img,.node-type-noticia .field-type-image img, .views-field-field-fotografia img,  .views-field-field-imagenes img,.file-video-youtube img, .node-type-profesionales-colaboradores .field-type-image img, .views-field-field-imagen-principal img').addClass('img-thumbnail img-responsive');
		$('.view-id-imagen_como_escena img').removeClass('img-thumbnail');
	
	});
})(jQuery);