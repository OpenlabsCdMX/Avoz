(function($) {
Drupal.behaviors.biciZMG = {
  attach: function (context, settings) {
 

			  if($("#gmap").length){  
			  
			  	var wkt=$(".data-wkt").html();
				myLatLng=WKTtoPoint(wkt); 
			  
				var gmap = new google.maps.Map(document.getElementById('gmap'), {
				  disableDefaultUI: false,
				  keyboardShortcuts: false,
				  draggable: true,
				  disableDoubleClickZoom: false,
				  scrollwheel: false,
				  streetViewControl: true,
				  center:  myLatLng,
				  zoom: 17
				});

				var marker = new google.maps.Marker({
				    position: myLatLng,
				    map: gmap,
				    title: $("h1").html()
				});	
				
			} 
  }
};
})(jQuery);