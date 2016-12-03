(function ($) {
     $(document).ready(function(){ 
 
   
   /*
	   GLOBAL VARAIBLES
   */
   
   var map=[];
   var pointFeature=[];
   latx="";
   laty="";


function init(key){

	  /*
		  HIDE AREA TEXT
	  */
    $('#'+key+' .control-group').css('display','none');

	
	 /*
		ADDING MAP	
	 */
    $('#'+key).append('<div id="edit-field-ubicacion-lat-long" class="form-type-item form-item">\
	 	<div class="field-lat">\
			    	<label for="edit-field-ubicacion-lat" class="control-label">Latitud<span class="form-required" title="Este campo es obligatorio.">*</span></label>\
			    	  <input id="'+key+'-edit-field-ubicacion-lat" type="text" autocomplete="off">\
			    </div>\
			    <div class="field-long">\
			    	<label for="edit-field-ubicacion-long" class="control-label">Longitud<span class="form-required" title="Este campo es obligatorio.">*</span></label>\
			    	  <input id="'+key+'-edit-field-ubicacion-long" type="text" autocomplete="off">\
			    </div>\
			    <p class="help-block">Latitud y longitud con 8 decimales de precisión ej. 20.17972377 -103.32916268</p>\
			</div>\
			<div id="'+key+'-map" class="medium-map map" style="height:500px; width: 100%;"></div>\
	<div class="olControlEditingToolbar olControlNoSelect">\
		<div id="ctrl-save-'+key+'" class="ctrl-save" style="display: none;">Guardar</div>\
		<div class="olControlDrawFeaturePointItemInactive olButton"></div>\
		<div class="olControlModifyFeatureItemInactive olButton"></div>\
	</div>');
	
	 /*
		 MOVILE CAPTURE GPS
	 */
     $('#'+key).before('<div id="locate-me-wrapper" class="visible-phone form-actions form-wrapper">\
	  							 <button id="locate-me" class="btn btn-primary" type="submit" name="locate-me">Capturar georeferencia GPS-Movíl</button>\
	  						  </div>');
	
	
	
	/*
		VARIABLES
	*/  															 											 
    geographic = new OpenLayers.Projection("EPSG:4326");
    mercator = new OpenLayers.Projection("EPSG:900913")
    var mapsLayers=[];
    var modify="";
    var lastselected;
    
    
    
    /*
	    LAYERS
    */
	mapsLayers[0]=new OpenLayers.Layer.Google("Google Streets 6",{numZoomLevels: 20});

	mapsLayers[1] = new OpenLayers.Layer.Google("Google Hybrid",{type: google.maps.MapTypeId.HYBRID,numZoomLevels: 20});

	 	
	var stylesMap = new OpenLayers.StyleMap({
			"default": new OpenLayers.Style({
				pointRadius: 5,
				fillColor: "#B04E64",
				strokeColor: "#9C4559",
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

	 //Estados
	   mapsLayers[2] = new OpenLayers.Layer.WMS(
                "Sitios",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:sitios", format: "image/gif", transparent:true}
            );
        mapsLayers[2].setVisibility(false);

	    mapsLayers[3] = new OpenLayers.Layer.WMS(
	                "Infra. RadioBases",
	                "/geoserver/cartaro2/wms",
	                {layers: " 	cartaro2:infraestructura_radiobase", format: "image/gif", transparent:true}
	            );
		mapsLayers[3].setVisibility(false);
		
	    mapsLayers[4] = new OpenLayers.Layer.WMS(
                "Cobre",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:trans_cobre", format: "image/gif", transparent:true}
            );
       	mapsLayers[4].setVisibility(false);
       	
       mapsLayers[5] = new OpenLayers.Layer.WMS(
                "Fibra Óptica",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:trans_fibra_optica", format: "image/gif", transparent:true}
            );
       	mapsLayers[5].setVisibility(false);	
       	   	
       	mapsLayers[6] = new OpenLayers.Layer.WMS(
                "Registros de Fibra Óptica",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:registros_fo", format: "image/gif", transparent:true}
            );
       	mapsLayers[6].setVisibility(false);
       	
       	mapsLayers[7] = new OpenLayers.Layer.WMS(
	                "Puntos de interconexión",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:puntos_interconexion", format: "image/gif", transparent:true}
	            );
		mapsLayers[7].setVisibility(false);
		
		mapsLayers[8] = new OpenLayers.Layer.WMS(
	                "Terrenos disponibles",
	                "/geoserver/cartaro2/wms",
	                {layers: " 	cartaro2:poligonos_espacios", format: "image/gif", transparent:true}
	            );
		mapsLayers[8].setVisibility(false);	
		
		mapsLayers[9] = new OpenLayers.Layer.WMS(
	                "Derecho de vía",
	                "/geoserver/cartaro2/wms",
	                {layers: " 	cartaro2:derecho_de_via", format: "image/gif", transparent:true}
	            );
		mapsLayers[9].setVisibility(false);	
	
       	mapsLayers[10] = new OpenLayers.Layer.WMS(
                "Corrientes de agua",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:CorrienteAgua", format: "image/gif", transparent:true}
            );
       	mapsLayers[10].setVisibility(false);

       mapsLayers[11] = new OpenLayers.Layer.WMS(
                "Cuerpos de agua",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:cuerposAgua", format: "image/gif", transparent:true}
            );
       	mapsLayers[11].setVisibility(false);
       
	  	mapsLayers[12] = new OpenLayers.Layer.WMS(
	                "Curvas de nivel",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:CurvasNivel", format: "image/gif", transparent:true}
	            );
		mapsLayers[12].setVisibility(false);
	
	    mapsLayers[13] = new OpenLayers.Layer.WMS(
	                "Estados 41",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:ESTADOS", format: "image/gif", transparent:true}
	            );
		mapsLayers[13].setVisibility(false);
	
	    mapsLayers[14] = new OpenLayers.Layer.WMS(
	                "México ADM",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:municipios", format: "image/gif", transparent:true}
	            );
		mapsLayers[14].setVisibility(false);
	
	    mapsLayers[15] = new OpenLayers.Layer.WMS(
	                "Vías ferreas",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:ViaFerrea", format: "image/gif", transparent:true}
	            );
		mapsLayers[15].setVisibility(false);
	
	    mapsLayers[16] = new OpenLayers.Layer.WMS(
	                "Líneas de transmisión",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:LineaTransmision", format: "image/gif", transparent:true}
	            );
		mapsLayers[16].setVisibility(false);
		mapsLayers[17] = new OpenLayers.Layer.Vector("Canvas-"+name,{
                'displayInLayerSwitcher':false,
				styleMap: stylesMap
		});
		
		
		/*
			CREATING MAP
		*/
		map[key] = new OpenLayers.Map( key+'-map',{projection: mercator});
		map[key].addLayers(mapsLayers);
		map[key].addControl(new OpenLayers.Control.LayerSwitcher());
		map[key].setCenter(new OpenLayers.LonLat(-102.669983,23.725012).transform(geographic,mercator), 5);

	   
      
     /***************************************************
		A D D I N G   A  P O I N T    F R O M   M A P
     ***************************************************/  				
     
	 	//Deleting option zoomwheel.
		var navCtrls = map[key].getControlsByClass('OpenLayers.Control.Navigation');
		for (var i = 0; i < navCtrls.length; i++)
				navCtrls[i].disableZoomWheel();
		 
		//Create one feature point
		pointFeature[key]=new OpenLayers.Control.DrawFeature(mapsLayers[17],OpenLayers.Handler.Point);
		
		//Allow just to draw one marker
		pointFeature[key].handler.callbacks.create = function(data){
			if(mapsLayers[17].features.length > 1)
			
				for(i=0;i<=mapsLayers[17].features.length;i++)
			         mapsLayers[17].removeFeatures( mapsLayers[17].features[i]);

			}
			
		//Click on point		
		pointFeature[key].events.register('featureadded',this,function(f){
			
			var wkt= new OpenLayers.Format.KML();
			var myPoint = new OpenLayers.Geometry.Point(f.feature.geometry.x,f.feature.geometry.y);
			var myLatLonPoint = myPoint.transform(mercator,geographic);
			latx=lngGeo=myLatLonPoint.x.toFixed(8);
			laty=latGeo=myLatLonPoint.y.toFixed(8);


			map[key].moveTo(new OpenLayers.LonLat(lngGeo,latGeo).transform(geographic,mercator),12,true);  			
	   		point = new OpenLayers.Geometry.Point(lngGeo,latGeo).transform(geographic,mercator);
           		mapsLayers[17].addFeatures([new OpenLayers.Feature.Vector(point)]);
		  	bou =f.feature.geometry.getBounds().getCenterLonLat();
			var someLoc = new OpenLayers.LonLat(bou.lon,bou.lat);
			xy=map[key].getPixelFromLonLat(someLoc);	
			$('#ctrl-save-'+key).fadeIn('slow');

			var url1 = "/geoserver/cartaro2/wms" ;
	
		    	var paramHash =  {
		      		INFO_FORMAT : "application/json", REQUEST : "GetFeatureInfo", EXCEPTIONS : "application/vnd.ogc.se_xml" , SERVICE : "WMS" , VERSION : "1.1.1" ,
		      		BBOX : map[key].getExtent().toBBOX(), X : Math.round(xy.x), Y : Math.round(xy.y), INFO_FORMAT : "application/json", 
		      		QUERY_LAYERS : "cartaro2:municipios", LAYERS : "cartaro2:municipios" , FEATURE_COUNT :1 , format : "image/png" , propertyName: "nom_mun,cve_ent",
		      		srs : "EPSG:900913", styles : "", WIDTH : map[key].size.w, HEIGHT : map[key].size.h
		    	};
	
	
			var request = OpenLayers.Request.GET({
			    url: url1,
			    params: paramHash,
			    callback: handlerResponse
			});
			
		});

		map[key].addControl(pointFeature[key]);
		

		/*
		 	HANDLERS  
		*/
		function handlerResponse(request){		
		jv=$.parseJSON(request.responseText);
		console.log(jv);
		
		   if(jv.features['0']){
		   
			   mun = jv.features['0']['properties']['nom_mun'];
			   ent = jv.features['0']['properties']['cve_ent'];
			   entresp=ent;
			   $.when(	getEstadoCVE(ent)  ).done(function(entIn){
				       ent = entIn;
					   checkValidation(latx,laty,mun,ent);
			   });
		   }else{
				    changeContentAlert('Coordenadas fuera del rango nacional',
								 '<p>las coordenadas ingresadas están fuera del rango nacional.</p>');		 	
					 mapsLayers[17].removeAllFeatures();
					 cleanCamps();
								
				
			}
		}
		
		/*
			 S E T T I N G  P O I T
		 */
		  var setPoint = function(llat,llng, zoom){     

			   		if(zoom==null)
			   			map[key].moveTo(new OpenLayers.LonLat(llat,llng).transform(geographic,mercator));
			   		else
			   			map[key].moveTo(new OpenLayers.LonLat(llat,llng).transform(geographic,mercator),zoom);

			   	    
			   		point = new OpenLayers.Geometry.Point(latx,laty).transform(geographic,mercator);
			   		mapsLayers[17].removeAllFeatures();
			   		mapsLayers[17].addFeatures([new OpenLayers.Feature.Vector(point)]);
			   		$('#'+key+"-edit-field-ubicacion-lat").val(laty);
					$('#'+key+"-edit-field-ubicacion-long").val(latx);
					$('#'+key+" .form-textarea-wrapper textarea").val('GEOMETRYCOLLECTION(POINT('+latx+' '+laty+'))');
			   		
					   	   			
		  }
		
		/*
			CONTROLS
		*/
	 	$('.olControlDrawFeaturePointItemInactive').click(function(){  
				 pointFeature[key].activate();    	   
	        });
	        $('.olControlModifyFeatureItemInactive').click(function(){
				 pointFeature[key].deactivate();       
	        });
	        $('#ctrl-save-'+key).click(function(){
				 pointFeature[key].deactivate();       
				 $(this).fadeOut('slow');
				 
	        });	 
	     
	     
	    /*
		     DRAWING EDO OR MUN
	    */ 
		polygonLayer=createPolygon(); 
		map[key].addLayer(polygonLayer);
		map[key]['fo']=0;
		$('#'+key+'-map').hover(function(){	
		
		$numfea= mapsLayers[17].features.length;
		
		if( map[key]['fo']==0 && $numfea==0 ){
				    map[key].updateSize();
				    $ext=polygonLayer.getDataExtent();
				    if($ext!=null)
						map[key].zoomToExtent($ext);
					map[key]['fo']=1;
			}
		}); 
		   
		
		
     /*
	     GPS
     */  	
     
       $("#locate-me").click(function(e){
					
					e.preventDefault();
					
					geolocate.deactivate();   
					geolocate.watch = false;
					firstGeolocation = true;
					geolocate.activate();
					
		});	
		
		var geolocate = new OpenLayers.Control.Geolocate({
		    bind: false,
		    geolocationOptions: {
		        enableHighAccuracy: false,
		        maximumAge: 0,
		        timeout: 7000
		    }
		});
		map[key].addControl(geolocate);
			var firstGeolocation = true;
			geolocate.events.register("locationupdated",geolocate,function(e) {
		    mapsLayers[17].removeAllFeatures();
		    point = new OpenLayers.LonLat(e.point.x,e.point.y).transform(mercator,geographic);


			latx=lngGeo=point.lon.toFixed(8);
			laty=latGeo=point.lat.toFixed(8);
			
			 $('#'+key+"-edit-field-ubicacion-long").val(latx);
       		 $("#"+key+"-edit-field-ubicacion-lat").val(laty);

		     $('#'+key+"-edit-field-ubicacion-long").keyup();
			

		});
		
			
		
		geolocate.events.register("locationfailed",this,function() {
			 			 
						 changeContentAlert('Geolocalización fallida',
						 '<p>Lo sentimos su dispositivo no pudo brindar la información suficiente para calcular su posición actual, \
						 verifica que su dispositivo tenga opciones GPS e intente denuevo.</p>');
  
		});
				
		/*
			Keys 
		*/
		 
		   $('#'+key+"-edit-field-ubicacion-long , #"+key+"-edit-field-ubicacion-lat").keyup(function(e) {

				clearTimeout($.data(this, 'timer'));
				if (e.keyCode == 13){
					 
					getResult(key);
				}else{
					 
					$(this).data('timer', setTimeout(function(){ getResult(key);}, 2000));
				}
				    
			});
	
	   /*
		   Evaluating changin field
	   */
	
		getResult= function(bar){

	        var lg= $('#'+bar+"-edit-field-ubicacion-long").val();
       		var lt= $('#'+bar+"-edit-field-ubicacion-lat").val();
	   		

            if((lt>=-90 && lt<=90) && (lg>=-180 && lg<=180)){

	       		$.get( "/geoserver/cartaro2/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cartaro2:municipios\
	       			&outputFormat=json&cql_filter=INTERSECTS%28the_geom,%20POINT ("+lg+" "+lt+" ))&propertyName=cve_ent,nom_mun\
	       		", function( data ) {
	       		
					   	if(data.features.length>=1){
				       		latx=lg;
							laty=lt;
							
							mun = data.features[0]['properties']['nom_mun'];
							ent = data.features[0]['properties']['cve_ent'];
							entresp=ent;
							
							 $.when(	getEstadoCVE(ent)  ).done(function(entIn){
								 	ent = entIn;
								 
								 	checkValidation(latx,laty,mun,ent);
							});
									   	
						}else{
							changeContentAlert('Coordenadas fuera del rango nacional',
								 '<p>No puedes colar coordenadas fuera del rango nacional.</p>');		 	
						     mapsLayers[17].removeFeatures(mapsLayers[17]);
					}				
			});

			  }else{

				changeContentAlert('Coordenadas fuera de rango existente',
						 '<p>Las coordenadas ingresadas se encuentran fuera de rango, verifica que la Latitud sea mayor o igual a -90 \
						      y menor o igual a 90, así como la Longitud sea mayor o igual a -180 y menor o igual a 180.</p>');
				cleanCamps();

				 
			  }
		}
		/*
				I n i t i al    V a l u e s	
		*/
		
		 function initVal(){
		   var $valor=$('#'+key+" .form-textarea").html();
		   $valor=$valor.replace('POINT(', "");
		   $valor=$valor.replace('GEOMETRYCOLLECTION(', "");
		   $valor=$valor.replace(')', "");
		   $valor=$valor.replace(')', "");
		   $valor=$valor.split(" ");
		   lg=$valor[0];
		   lt=$valor[1];
		   if(lg!='EMPTY' && lg !=""){
			   $('#'+key+"-edit-field-ubicacion-long").val(lg);
	       	   $('#'+key+"-edit-field-ubicacion-lat").val(lt);
	
	       	   map[key].moveTo(new OpenLayers.LonLat(lg,lt).transform(geographic,mercator),8,true);  	
			   mapsLayers[17].removeFeatures(mapsLayers[17].features);		
		   	   point = new OpenLayers.Geometry.Point(lg,lt).transform(geographic,mercator);
	           mapsLayers[17].addFeatures([new OpenLayers.Feature.Vector(point)]); 
	           map[key].updateSize();
		   }

		}
		
		//Init fields
		initVal();
		
		
		/*
			Clean camps
		*/
		cleanCamps = function(){

				  $('#'+key+"-edit-field-ubicacion-long").val("");
				  $('#'+key+"-edit-field-ubicacion-lat").val("");
				  $('#'+key+" .form-textarea-wrapper textarea").val("");	
				  
				   mapsLayers[17].removeAllFeatures();
		}
		
		
		/*
		    Validation  Check
		*/
		 var checkValidation = function (latx,laty,mun,ent){
			   
			   
			   
					   rmun = replaceQuo(mun);
					   rent = replaceQuo(ent);
					 
		
					   	if(estadoUser==""){
							    setPoint(latx,laty,15);
							    return;
						   }
					   
		
					   if(municipioUser!=""){
						   	
						   if(mun.toUpperCase()==municipioUser.toUpperCase()){
						   	console.log("campo--"+mun);
						   	console.log(municipioUser);
							  
							   var lg= $('#'+key+"-edit-field-ubicacion-long").val();
							   var lt= $('#'+key+"-edit-field-ubicacion-lat").val();
							     setPoint(latx,laty,15);  
			
						   }else{
							     
							 	changeContentAlert('Coordenadas fuera de rango municipal',
								'<p>No puedes colocar un sitio en el municipio de '+mun+', solo tiene derecho en el municipio de '+municipioUser+'.</p>');
								cleanCamps(key);
								
							   
						   }
						   
					   }else{
					   
			
						   if(ent==estadoUser){

		
							    setPoint(latx,laty,15);
							    
							  
								   $valMun= $('.form-municipios-cve input').val(); 
						 
								   if($valMun+""!="undefined" ){
								   					   
									   $.when(	getCVEMunicipio(mun,entresp)  ).done(function(cve_mun){
										 	   
										 	   console.log(cve_mun);
										 	   
										 	   if($valMun!=""&& $valMun!=cve_mun){
											 	    
												 changeContentAlert('Clave municipal discrepante',
												 '<p>La clave municipal actual es '+$valMun+', la nueva clave asignada será '+cve_mun
												 +' correspondiente al municipio de '+mun+'. Verifica que la clave sea la deseada.</p>');
												
												 	   
											   }  
											   $('.form-item-municipio .form-municipios-cve input').val(cve_mun);
											  console.log($('.form-item-municipio ul.multiselect-container li input[value="'+cve_mun+'"]'));
											    $('.form-item-municipio ul.multiselect-container li input[value="'+cve_mun+'"]').click();													   	
											}
										);
										
									}else{
										 changeContentAlert('Municipio Indefinido', 'El campo "Nombre del Municipio" no ha sido creado, por favor elija un municipio.');
										
									}


						   }else{
							     
							 	 changeContentAlert('Coordenadas fuera de rango estatal',
								'<p>No puedes colocar un sitio en el estado de '+ent+', solo tienes derecho en el estado de '+estadoUser+'.</p>');
								cleanCamps(key);
							  
								  
							   
						   } 
					   }
				
				}					   		
	   				
		
		  
		  }
  
  
  
  /*******************
     	I N I T
  *****************/

       	init("edit-field-ubicacion");



  });
  })(jq1102);
  