(function ($) {

  Drupal.behaviors.maps = {
    attach: function (context, settings) {
  var map=[];
   formats="";
   var pointFeature=[];
   $globalURL = " ";
   mapsLayers = "";


	/***************************************************
				C R E A T I N G    M A P
	***************************************************/
	var createMap = function(key,name,title){

	$('#'+key).css('display','none');
	$('#'+key).parent().parent().find('.grippie').css('display','none');
	/***************************************************
			        V A R I A B L E S
	***************************************************/

    geographic = new OpenLayers.Projection("EPSG:4326");
    mercator = new OpenLayers.Projection("EPSG:900913");
    var mapsLayers=[];
    var modify="";
    var lastselected;


	   mapsLayers[0]=new OpenLayers.Layer.Google("Google Streets",{numZoomLevels: 20});

	   mapsLayers[1] = new OpenLayers.Layer.Google("Google Hybrid",{type: google.maps.MapTypeId.HYBRID,numZoomLevels: 20});



	var stylesMap = new OpenLayers.StyleMap({
			"default": new OpenLayers.Style({
				pointRadius: 5,
				fillColor: "#00AC9A",
				strokeColor: "#22CEBC",
				strokeWidth: 2,
				graphicZIndex: 2,
				fillOpacity: 0.6
			}),
			"select": new OpenLayers.Style({
				fillColor: "#777777",
				strokeColor: "#444444",
				graphicZIndex: 1
			})
		});


		mapsLayers[2] = new OpenLayers.Layer.Vector("Canvas-"+name,{
                'displayInLayerSwitcher':false,
				styleMap: stylesMap
		});


	/***************************************************
	  				   F E A T U R E S
     ***************************************************/

	 	 $('#'+key).before('<div class="wrapper row">\
							<div class="form-group col-md-4">\
							   <label for="edit-lat">Latitud</label>\
							   <input id="edit-lat" class="form-control form-text required" type="text" maxlength="255" size="50" value="" name="lat">\
							</div>\
							<div class="form-group col-md-4">\
								<label for="edit-lng">Longitud</label>\
								<input id="edit-lng" class="form-control form-text required" type="text" maxlength="255" size="50" value="" name="lng">\
							</div>\
							<div class="form-group  col-md-4">\
									<div class="btn btn-success" id="btn-gps"><i class="fa fa-globe" aria-hidden="true"></i> '+Drupal.t("GPS Actual")+'</div>\
						</div>\
	 <div id="'+name+'-map" class="medium-map map col-md-12" style="height:610px; width: 100%;"></div>\
	 <div class="olControlEditingToolbar olControlNoSelect">\
	 	<div id="ctrl-save-'+name+'" class="ctrl-save  olButton" >Guardar</div>\
	 	<div id="ctrl-delete-'+name+'" class="ctrl-delete  olButton" >Borrar</div>\
	 	<div class="olControlDrawFeaturePointItemInactive fa fa-pencil olButton"></div>\
	 	<div class="olControlModifyFeatureItemInactive fa fa-arrows olButton"></div>\
	</div>\
	');

	 map[name] = new OpenLayers.Map( name+'-map',{projection: mercator});
		 map[name].addLayers(mapsLayers);
		 map[name].setCenter(new OpenLayers.LonLat(-80,-17).transform(geographic,mercator), 3);



	//Deleting option zoomwheel.
		var navCtrls = map[name].getControlsByClass('OpenLayers.Control.Navigation');
		for (var i = 0; i < navCtrls.length; i++)
				navCtrls[i].disableZoomWheel();

		pointFeature[name]=new OpenLayers.Control.DrawFeature(mapsLayers[2],OpenLayers.Handler.Point);
		  modify= new OpenLayers.Control.ModifyFeature(mapsLayers[2],
		  {  setFeatureState: function(){
			  		$('#ctrl-save-'+name).fadeIn('slow');
			  	},
		     beforeSelectFeature:function(e){
		   			 lastseleced=e;
		   			 $('#ctrl-delete-'+name).fadeIn('slow');
		   		}
		  });
		  modify.mode = OpenLayers.Control.ModifyFeature.RESHAPE;

		  map[name].addControl(pointFeature[name]);
		  map[name].addControl(modify);
		  modify.activate();



     /***************************************************
	  	A D D I N G   P A S T   F E A T U R E S
     ***************************************************/
    $wktPre=$('#'+key).val();


    if($wktPre!=""&&$wktPre!="GEOMETRYCOLLECTION EMPTY"&&$wktPre!="GEOMETRYCOLLECTION(EMPTY)"){
	    wkt = new OpenLayers.Format.WKT();

	    feature=wkt.read($wktPre);


		$.each(feature, function(index,value) {

				wktFormat = new OpenLayers.Format.WKT({
						'internalProjection':  mercator,
						'externalProjection':  geographic});
				 out = wkt.write(value);

				 wktfeature= wktFormat.read(out);
				 mapsLayers[2].addFeatures([wktfeature]);

				$wktval=wkt.write( mapsLayers[2].features);

				$wktval=$wktPre.replace('GEOMETRYCOLLECTION (POINT (','').replace("))","").split(" ");
				  $('#edit-lat').val($wktval[1]);
				  $('#edit-lng').val($wktval[0]);



		});
		 map[name].zoomToExtent(mapsLayers[2].getDataExtent());
		 map[name].updateSize();
    }

	 /***************************************************
	  			C   O  N  T  R  O  L  S
     ***************************************************/

	$('.olControlDrawFeaturePointItemInactive').click(function(){
			 pointFeature[name].activate();
        });

    $('.olControlModifyFeatureItemInactive').click(function(){
			 pointFeature[name].deactivate();
        });

    $('#ctrl-save-'+name).click(function(){
			 pointFeature[name].deactivate();
			 $(this).fadeOut('slow');
        });


     /***************************************************
	     	A D D I N G    N E W   F E A T U R E S
     ***************************************************/
	 $('#ctrl-save-'+name).click(function() {

		 $('#ctrl-delete-'+name).fadeOut('slow');
		try{
		 modify.unselectFeature(mapsLayers[2].features);
		}catch(e){}

		wkt=new OpenLayers.Format.WKT({
				'internalProjection':  mercator,
				'externalProjection':  geographic
		});
		$('#'+key).val(wkt.write( mapsLayers[2].features));

	});


	/***************************************************
	          D E L E T E    F E A T U R E S
     ***************************************************/
	  $('#ctrl-delete-'+name).click(function() {
	  		 $('#ctrl-delete-'+name).fadeOut('slow');
	  		 $('#ctrl-save-'+name).fadeOut('slow');
	  		 try{
		  		 modify.unselectFeature(mapsLayers[2].features);
		  	}catch(e){}
	 	 	mapsLayers[2].removeFeatures(lastseleced);
	 	 	$('#'+key).val('');
	 });

		pointFeature[name].handler.callbacks.create = function(data){



			if( mapsLayers[2].features.length >= 1){
				$('#ctrl-save-'+name).fadeIn('slow');
				  map[name].zoomToExtent(mapsLayers[2].getDataExtent());

			      wkt=new OpenLayers.Format.WKT({
						'internalProjection':  mercator,
						'externalProjection':  geographic});

				if( mapsLayers[2].features.length > 1)
					for(i=0;i<=mapsLayers[2].features.length;i++)
				         mapsLayers[2].removeFeatures( mapsLayers[2].features[i]);


				$wktval=wkt.write( mapsLayers[2].features);
				$wktval=$wktval.replace('GEOMETRYCOLLECTION(POINT(','').replace("))","").split(" ");

				  $('#edit-lat').val($wktval[1]);
				  $('#edit-lng').val($wktval[0]);


				var setPoint = function(llat,llng, zoom){
			   		if(zoom==null)
			   			map.moveTo(new OpenLayers.LonLat(llng,llat).transform(geographic,mercator));
			   		else
			   			map.moveTo(new OpenLayers.LonLat(llng,llat).transform(geographic,mercator),zoom);

			   		pointLayer.removeFeatures(pointLayer.features[0]);
	   				point = new OpenLayers.Geometry.Point(llng,llat).transform(geographic,mercator);
                    pointLayer.addFeatures([new OpenLayers.Feature.Vector(point)]);

			}



			}
		}

	$('#ctrl-save-'+name).fadeOut('slow');
	$('#ctrl-delete-'+name).fadeOut('slow');

	/***************************************************
	    	 L O C A T E       G  P  S
	***************************************************/

	 $("#btn-gps").click(function(e){

			tryGeolocation();
		});

	var apiGeolocationSuccess = function(e) {

			mapsLayers[2].removeAllFeatures();
			point = new OpenLayers.LonLat(e.coords.longitude,e.coords.latitude);

			latx=lngGeo=point.lon.toFixed(8);
			laty=latGeo=point.lat.toFixed(8);

			 $("#edit-lng").val(latx);
			 $("#edit-lat").val(laty);
			 $("#edit-lng").keyup();
	};

	var tryAPIGeolocation = function() {
		jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function(success) {
			apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
	  })
	  .fail(function(err) {
		alert("API Geolocation error! \n\n"+err);
	  });
	};

	var browserGeolocationSuccess = function(e) {

			point = new OpenLayers.LonLat(e.coords.longitude,e.coords.latitude);

			latx=lngGeo=point.lon.toFixed(8);
			laty=latGeo=point.lat.toFixed(8);

			 $("#edit-lng").val(latx);
			 $("#edit-lat").val(laty);
			 $("#edit-lng").keyup();
	};

	var browserGeolocationFail = function(error) {
	  switch (error.code) {
		case error.TIMEOUT:
		  alert("Browser geolocation error !\n\nTimeout.");
		  break;
		case error.PERMISSION_DENIED:
		  if(error.message.indexOf("Only secure origins are allowed") == 0) {
			tryAPIGeolocation();
		  }
		  break;
		case error.POSITION_UNAVAILABLE:
		  alert("Browser geolocation error !\n\nPosition unavailable.");
		  break;
	  }
	};

	var tryGeolocation = function() {
	  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			browserGeolocationSuccess,
		  browserGeolocationFail,
		  {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true});
	  }
	};

	/***************************************************
	    	 F I E L D      R E A C T I O N
	***************************************************/


	 var setFieldsLL = function(){

		  lon= $("#edit-lng").val();
		  lat= $("#edit-lat").val();

		     	function isNumber(n) {
					  return !isNaN(parseFloat(n)) && isFinite(n);
				}


		  if(isNumber(lon)&&isNumber(lat) ){
			  if(lon!=""&&lat!=""){
				   $cplatlong= new OpenLayers.LonLat(lon, lat);

				   	$('#'+key).text('GEOMETRYCOLLECTION (POINT ('+lon+' '+lat+"))");

					console.log("d");
				   		mapsLayers[2].removeFeatures(mapsLayers[2].features[0]);
				   		point = new OpenLayers.Geometry.Point(lon,lat).transform(geographic,mercator);
	                    mapsLayers[2].addFeatures([new OpenLayers.Feature.Vector(point)]);
	                    map[name].zoomToExtent(mapsLayers[2].getDataExtent());
			  }

		  }else{
			   alert("Error de formato. Los datos deben ser numúricos.");
			$("#edit-lng").val("");
			$("#edit-lat").val("");
		  }

		}

  $("#edit-lng").keyup(function(e) {

			clearTimeout($.data(this, 'timer'));
			if ( !(e.keyCode == 13)){
				 $(this).data('timer', setTimeout(setFieldsLL, 8000));
			}

		});
    $("#edit-lat").keyup(function(e) {

			clearTimeout($.data(this, 'timer'));
			if ( !(e.keyCode == 13)){
				 $(this).data('timer', setTimeout(setFieldsLL, 8000));
			}

		});

	}


	/***************************************************
	    	L  O  O C  K  I  N  G    F  O  R
	***************************************************/

      $("document").ready(function(){

		   if($('.page-node-8,.page-node-9,.node-type-video').html()!=undefined)
        if(!$('#edit-field-locate-und-0-geom').hasClass("done"))
		      createMap('edit-field-locate-und-0-geom',"geo","Ubicación");
      $('#edit-field-locate-und-0-geom').addClass("done");

     });
    }
  };
})(jQuery);
