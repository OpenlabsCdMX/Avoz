(function($){
	
	$(document).ready(function(){
		$('.slider-full-wrapper img').attr("data-adaptive-background","");
		
		$.adaptiveBackground.run({
		  normalizeTextColor: true
		});
	});

})(jQuery);
