/*
	Developed by Ludwig Rubio
	Date 29/03/2016
*/
(function($) {
Drupal.behaviors.biciWhiteBike= {
  attach: function (context, settings) {

   var map=[];
   formats="";
   var polilineFeature=[];
   style="density";
   
  if(store.get('style')!=undefined){
	    style=store.get('style');
	    
	    
	    $('#style-controls select').find('option').each(function(i,e){
       
        	if($(e).val() == style)
				$(e).attr('selected', true);
        
		 });
   }

  
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
	   
	   //ZMG
	   mapsLayers[2] = new OpenLayers.Layer.WMS(
                "ZMG",
                "http://bicizmg.com:8080/geoserver/bicizmg/wms",
                {layers: "bicizmg:zmg", format: "image/png", transparent:true, styles:'polygon_zmg'}
            );
        mapsLayers[2].setVisibility(true);
        
        
        
        if(window.location.href.indexOf("?") > -1) {
        	
        	$cql_filter = makeCQLFilter();
        	
        	 mapsLayers[3] = new OpenLayers.Layer.WMS(
                "Bicicletas Blancas",
                "http://bicizmg.com:8080/geoserver/bicizmg/wms",
                {layers: "bicizmg:white_bike", format: "image/png", transparent:true, cql_filter: $cql_filter, tiled: true, tilesorigin: "1,1" }
            );
			mapsLayers[3].setVisibility(true);
			
			mapsLayers[3].mergeNewParams({
				styles: style+'_style'
			});
			
        }else{
	         mapsLayers[3] = new OpenLayers.Layer.WMS(
                "Bicicletas Blancas",
                "http://bicizmg.com:8080/geoserver/bicizmg/wms",
                {layers: "bicizmg:white_bike", format: "image/png", transparent:true, styles: style+'_style'}
            );
            mapsLayers[3].setVisibility(true);
        }


		 map[ident] = new OpenLayers.Map( ident+'-map',{projection: mercator});
		 map[ident].addLayers(mapsLayers);
		 map[ident].addControl(new OpenLayers.Control.LayerSwitcher());
		 map[ident].setCenter(new OpenLayers.LonLat(-103.410164,20.677534).transform(geographic,mercator), 9);
		
		//Deleting option zoomwheel.
		var navCtrls = map[ident].getControlsByClass('OpenLayers.Control.Navigation');
		for (var i = 0; i < navCtrls.length; i++)
				navCtrls[i].disableZoomWheel();


	 
	 var features = [];
	 
       map[ident].zoomIn();

 
     /***************************************************
		      F  U  L  L        S   C  R   E   E   N
	  ****************************************************/
			
	$('.olControlFullScreenInactive').on("click",function(){
			     
				  
		           if($(this).hasClass('full-active')){

						$(this).removeClass('full-active');
						$('.olControlEditingToolbar').removeClass('bar-relative');
						$('.map-wrapper').removeClass("full-screen");
						$('#white-bike-map').css("height","420px");
						$('body').css('overflow-y','scroll');
						('.nomenclatura').removeClass("nomenclatura-relative");
						map[ident].updateSize();

				   
				   }else{
						$("html, body").animate({ scrollTop: 0 }, "slow");
						$('body').addClass('height',$( window ).height()+"px");
						$('body').css('overflow','hidden');
						$(this).addClass('full-active');
						$('.olControlEditingToolbar').addClass('bar-relative');
						$('.map-wrapper').addClass("full-screen");
						$('#white-bike-map').css("height","100%");
						$('.nomenclatura').addClass("nomenclatura-relative");
						map[ident].updateSize();
				   }
			
	});
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
    
    $('#map-white-bike-wrapper').append('<div class="nomenclatura container col-xs-12"><div class="container"></div></div>');
   
   
       switch(style){
	    
			case 'cause': 
			         $('.nomenclatura .container').append('<div class="col-xs-2 media"><span class="nom-icon logo-auto media-object pull-left"></span><span class="media-body">Auto</span></div>\
			         							<div class="col-xs-2 media"><span class="nom-icon logo-camion media-object pull-left"></span><span class="media-body">Camión</span></div>\
			         							<div class="col-xs-2 media"><span class="nom-icon logo-camioneta media-object pull-left"></span><span class="media-body">Camioneta</span></div>\
			         							<div class="col-xs-2 media"><span class="nom-icon logo-otro media-object pull-left"></span><span class="media-body">Otro</span></div>\
			         							<div class="col-xs-2 media"><span class="nom-icon logo-taxi media-object pull-left"></span><span class="media-body">Taxi</span></div>\
			         							<div class="col-xs-2 media"><span class="nom-icon logo-transporte media-object pull-left"></span><span class="media-body">Transporte público</span></div>');
			         $('.nomenclatura').attr('id','cause');
			break;  
			case 'range_age': 
					 $('.nomenclatura .container').append('<div class="col-xs-3 media"><span class="nom-logo logo-range-uno media-object pull-left"></span><span class="media-body">00-20</span></div>\
												 <div class="col-xs-3 media"><span class="nom-logo logo-range-dos media-object pull-left"></span><span class="media-body">20-29</span></div>\
												 <div class="col-xs-3 media"><span class="nom-logo logo-range-tres media-object pull-left"></span><span class="media-body">30-39</span></div>\
												 <div class="col-xs-3 media"><span class="nom-logo logo-range-cuatro media-object pull-left"></span><span class="media-body">40-49</span></div>\
												 <div class="col-xs-3 media"><span class="nom-logo logo-range-cinco media-object pull-left"></span><span class="media-body">50-59</span></div>\
												 <div class="col-xs-3 media"><span class="nom-logo logo-range-seis media-object pull-left"></span><span class="media-body">60-69</span></div>\
					 							 <div class="col-xs-3 media"><span class="nom-logo logo-range-siete media-object pull-left"></span><span class="media-body">70 o más</span></div>\
					 							 <div class="col-xs-3 media"><span class="nom-logo logo-range-ocho media-object pull-left"></span><span class="media-body">Sin info</span></div>');
					 $('.nomenclatura').attr('id','range_age');
			
			break; 
			case 'sex': 
					 $('.nomenclatura .container').append('<div class="col-xs-6 media"><span class="nom-logo logo-mujer media-object pull-left"></span><span class="media-body">Mujer</span></div>\
					 							<div class="col-xs-6 media"><span class="nom-logo logo-hombre media-object pull-left"></span><span class="media-body">Hombre</span></div>');
					 $('.nomenclatura').attr('id','sex');
			
			break; 
			case 'white_bike': 
					 $('.nomenclatura .container').append('<div class="col-xs-6 media"><span class="nom-logo logo-instalada media-object pull-left"></span><span class="media-body">Bicicleta Blanca instalada</span></div>\
					 							<div class="col-xs-6 media"><span class="nom-logo logo-noinstalada media-object pull-left"></span><span class="media-body">Bicicleta Blanca sin instalar</span></div>');
					 $('.nomenclatura').attr('id','white_bike');
			
			break;  
			case 'density': 
					 $('.nomenclatura .container').append('<div class="col-xs-3 media">Menor número de muertes</div>\
												<div class="grade-color col-xs-6 media"></div>\
												<div class="col-xs-3 media">Mayor número de muertes</div>');
												
					 $('.nomenclatura').attr('id','density');
			
			break;    
		}
	}
	
	
	
	/***************************************************
	    	L  O  O C  K  I  N  G    F  O  R
	***************************************************/
   
   $("document").ready(function(){
              
              if($("#white-bike-map").length)
		   			showMap("white-bike","white-bike");			   
   
	});  	   
  }
}
})(jQuery);