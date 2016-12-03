
			
(function ($) {
     $(document).ready(function(){ 	 

	 sitenotallowed= '<div class="modal fade" id="notAllowedSiteModal">\
			  <div class="modal-dialog" >\
				<div class="modal-content">\
				  <div class="modal-header">\
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
					<h4 class="modal-title">Coordenadas fuera de rango estatal</h4>\
				  </div>\
				  <div class="modal-body">\
				  </div>\
				  <div class="modal-footer">\
					<button type="button" class="btn btn-default" data-dismiss="modal">Aceptar</button>\
				  </div>\
				</div>\
			  </div>\
			</div>';
						
    alertstatic= '<div class="modal fade" id="alert-static">\
			  <div class="modal-dialog" >\
				<div class="modal-content">\
				  <div class="modal-header">\
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
					<h4 class="modal-title">Titulo</h4>\
				  </div>\
				  <div class="modal-body">\
				  		Cuerpo\
				  </div>\
				  <div class="modal-footer">\
					<button type="button" class="btn btn-default" data-dismiss="modal">Aceptar</button>\
				  </div>\
				</div>\
			  </div>\
			</div>';
			
			
			
			
	 		
	//	$('body').append(sitenotallowed);
	//	$('body').append(alertstatic);
  });
})(jQuery);