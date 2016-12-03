/*
	Developed by Ludwig Rubio
	Date 26/05/2016
*/
(function($) {
Drupal.behaviors.biciReportes= {
  attach: function (context, settings) {

   var map=[];
   formats="";
   var polilineFeature=[];
   style="type_report";
     
	/***************************************************
				C R E A T I N G    M A P
	***************************************************/
	var showMap = function(ident,wktUnique){

	OpenLayers.ProxyHost = "/proxy.php?url=";
	/***************************************************
			        V A R I A B L E S
	***************************************************/
      
    var geographic = new OpenLayers.Projection("EPSG:4326");
    var mercator = new OpenLayers.Projection("EPSG:900913");
    var mapsLayers=[];
    var modify="";
    var lastselected;
    

	   mapsLayers[0]=new OpenLayers.Layer.Google("Google Streets",{numZoomLevels: 20});

	   mapsLayers[1] = new OpenLayers.Layer.Google("Google Hybrid",{type: google.maps.MapTypeId.HYBRID,numZoomLevels: 20});
	   
	       //Estado
	   mapsLayers[2] = new OpenLayers.Layer.WMS(
                "ZMG",
                "http://bicizmg.com:8080/geoserver/bicizmg/wms",
                {layers: "bicizmg:zmg", format: "image/png", transparent:true, styles:'polygon_zmg'}
            );
        mapsLayers[2].setVisibility(true);
        
	   mapsLayers[3] = new OpenLayers.Layer.WMS(
                "Reportes",
                "http://bicizmg.com:8080/geoserver/bicizmg/wms",
                {layers: "bicizmg:reports", format: "image/png", transparent:true, styles: 'type_report_style'}
            );
        mapsLayers[3].setVisibility(true);


		 map[ident] = new OpenLayers.Map(ident,{projection: mercator});
		 map[ident].addLayers(mapsLayers);
		 map[ident].addControl(new OpenLayers.Control.LayerSwitcher());
		 map[ident].addControl( new OpenLayers.Control.TouchNavigation({ pinchZoom: new  OpenLayers.Control.PinchZoom({autoActivate: true}),}));
		 map[ident].setCenter(new OpenLayers.LonLat(-103.370164,20.677534).transform(geographic,mercator), 12);
		
		//Deleting option zoomwheel.
		var navCtrls = map[ident].getControlsByClass('OpenLayers.Control.Navigation');
		for (var i = 0; i < navCtrls.length; i++)
				navCtrls[i].disableZoomWheel();

 
	 var features = [];
	 
       map[ident].zoomIn();

	/***************************************************
		      P  O  P     U P     C O N T R O L
	 ****************************************************/	
	 
	 var replaceT = function (input, opentag, closetag, replacement) {
		    var read_index = 0;
		    var open_index = 0;
		    var close_index = 0;
		    var output = '';
		
		    while ( (open_index = input.indexOf(opentag, read_index)) != -1) {
		        output += input.slice(read_index, open_index) + opentag;
		        read_index = open_index + opentag.length;
		
		        if((close_index = input.indexOf(closetag, read_index)) != -1) {
		            output += replacement + closetag;
		            read_index = close_index + closetag.length;
		        }
		    }
		
		    output += input.slice(read_index);
		
		    return output;
		};
	
	 
	 infoControls = {
            click: new OpenLayers.Control.WMSGetFeatureInfo({
                url: 'http://bicizmg.com:8080/geoserver/bicizmg/wms', 
                title: 'Identify features by clicking',
                layers: [mapsLayers[3]],
                queryVisible: true,
				eventListeners: { 
                getfeatureinfo: function(event) { 
						console.log(event.text);
				    events=event.text.substr(event.text.indexOf('<div class="info-box">'),event.text.length); 
				    events=events.substr(0,events.indexOf('</div>')); 
				    events = replaceT(event.text,'  <body>','  </body>',events);
					
                if(event.text.indexOf("class=\"featureInfo\"") >= 0)
                    map[ident].addPopup(new OpenLayers.Popup.FramedCloud( 
                        "chicken", 
                        map[ident].getLonLatFromPixel(event.xy), 
                        null, 
                        event.text, 
                        null, 
                        true 
                    )); 
                } 
				} 
            })
        };		

         map[ident].addControl(infoControls['click']); 
         infoControls.click.activate();	
         
         
    $('#style-controls select').change(function(){

	    	store.set('style',$(this).val());
	    	location.reload();
	   
    });
    
    $('#map-reportes').append('<div class="nomenclatura container col-xs-12"><div id="nom-tipo-reporte" class="container">\
		<div class="col-sm-3 col-xs-12 media"><span class="nom-logo logo-accidente media-object pull-left"></span><span class="media-body">Accidente</span></div>\
		<div class="col-sm-3 col-xs-12 media"><span class="nom-logo logo-agresion media-object pull-left"></span><span class="media-body">Agresión</span></div>\
		<div class="col-sm-3 col-xs-12 media"><span class="nom-logo logo-bache media-object pull-left"></span><span class="media-body">Bache </span></div>\
		<div class="col-sm-3 col-xs-12 media"><span class="nom-logo logo-obstaculo media-object pull-left"></span><span class="media-body">Obstáculo</span></div>\
	</div></div>');
	 $('#map-reportes').prepend('<div class="text-center col-xs-8 col-xs-offset-2 wrapper-button-report"><a href="/add/reporte" class="btn btn-lg btn-warning">Haz un reporte</a></div>');
   
	}
	
	/***************************************************
	    	L  O  O C  K  I  N  G    F  O  R
	***************************************************/
   
   $("document").ready(function(){
              
              if($(".front").length)
		   			showMap("map-reportes","map-reportes");			   
   
	});  	   
  }
}
})(jQuery);