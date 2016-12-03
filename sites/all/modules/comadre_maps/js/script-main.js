(function ($) {
     $(document).ready(function(){ 


	function init(){
	   	var map, mapoptions, vectors, formats, select;
		var lon = -102.669983;
		var lat = 23.725012;
		var zoom = 5;
		var str = '';  
		var currentPopup=""; 
	          
	 /*******************************
	        S   T   Y  L   E   S 
	 ********************************/      
	var colors = {
		one: "rgb(153, 153, 153)",
		low: "rgb(255, 185, 115)",
		middle: "rgb(255, 167, 66)",
		high: "rgb(255, 91, 36)",
		red: "rgb(217, 0, 0)",
		gray: "rgb(132, 180, 0)",
		blue: "rgb(0,83,184)",
		orange: "rgb(217, 0, 217)"
	};
	
	
	
	

	//Sitio normal
	var one = new OpenLayers.Rule({
		filter: new OpenLayers.Filter.Comparison({
			type: OpenLayers.Filter.Comparison.LESS_THAN,
			property: "count",
			value: 2
		 }),

		 symbolizer: {
			fillColor: colors.one,
			fillOpacity: 0.8,
			strokeColor:  "rgb(255,255,255)",
			strokeOpacity: 0.8,
			strokeWidth: 2,
			pointRadius: 8,
			labelOutlineWidth: 0,
			fontColor: "#ffffff",
			fontOpacity: 0.8,
			fontSize: "10px"
		}	
	});
	
	//conected
	var two = new OpenLayers.Rule({
		filter: new OpenLayers.Filter.Comparison({
			type: OpenLayers.Filter.Comparison.GREATER_THAN,
			property: "conectado",
			value: 0
		 }),
		 symbolizer: {
			fillColor: colors.gray,
			fillOpacity: 0.8,
			strokeColor:   "rgb(255,255,255)",
			strokeOpacity: 0.8,
			strokeWidth: 2,
			pointRadius: 8,
			labelOutlineWidth: 0,
			fontColor: "#ffffff",
			fontOpacity: 0.8,
			fontSize: "10px"
		}	
	});
	
	//desconected
		var red = new OpenLayers.Rule({
		filter: new OpenLayers.Filter.Comparison({
			type: OpenLayers.Filter.Comparison.GREATER_THAN,
			property: "cerca",
			value: 0,
		 }),
		 symbolizer: {
			fillColor: colors.red,
			fillOpacity: 0.8,
			strokeColor:  "rgb(255,255,255)",
			strokeOpacity: 0.8,
			strokeWidth: 2,
			pointRadius: 8,
			label: "R",
			labelOutlineWidth: 0,
			fontColor: "#ffffff",
			fontOpacity: 0.8,
			fontSize: "10px"
		}	
	});
	
	//conected cst
		var connecst = new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.GREATER_THAN,
				property: "anterior",
				value: 0,
			 }),
			 symbolizer: {
				fillColor: colors.blue,
				fillOpacity: 0.8,
				strokeColor: "rgb(255,255,255)",
				strokeOpacity: 0.3,
				strokeWidth: 2,
				pointRadius: 8,
				labelOutlineWidth: 0,
				fontColor: "#ffffff",
				fontOpacity: 0.8,
				fontSize: "10px"
			}	
		});	
		
	//conected licitado
		var licitado = new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.GREATER_THAN,
				property: "licitado",
				value: 0,
			 }),
			 symbolizer: {
				fillColor: colors.orange,
				fillOpacity: 0.8,
				strokeColor: "rgb(255,255,255)",
				strokeOpacity: 0.3,
				strokeWidth: 2,
				pointRadius: 8,
				labelOutlineWidth: 0,
				fontColor: "#ffffff",
				fontOpacity: 0.8,
				fontSize: "10px"
			}	
		});
	
	
	var lowRule = new OpenLayers.Rule({
		filter: new OpenLayers.Filter.Comparison({
			type: OpenLayers.Filter.Comparison.BETWEEN,
			property: "count",
			lowerBoundary: 2,
			upperBoundary: 14
		 }),
		 symbolizer: {
			fillColor: colors.low,
			fillOpacity: 0.9,
			strokeColor: colors.low,
			strokeOpacity: 0.5,
			strokeWidth: 10,
			pointRadius: 16,
			label: "${count}",
			labelOutlineWidth: 1,
			fontColor: "#ffffff",
			fontOpacity: 0.8,
			fontSize: "12px"
		}	
	});
	
	var middleRule = new OpenLayers.Rule({
		filter: new OpenLayers.Filter.Comparison({
			type: OpenLayers.Filter.Comparison.BETWEEN,
			property: "count",
			lowerBoundary: 15,
			upperBoundary: 50
		}),
		symbolizer: {
			fillColor: colors.middle,
			fillOpacity: 0.9,
			strokeColor: colors.middle,
			strokeOpacity: 0.5,
			strokeWidth: 10,
			pointRadius: 22,
			label: "${count}",
			labelOutlineWidth: 1,
			fontColor: "#ffffff",
			fontOpacity: 0.8,
			fontSize: "12px"
		}
	});
	
	
	var highRule = new OpenLayers.Rule({
		filter: new OpenLayers.Filter.Comparison({
			type: OpenLayers.Filter.Comparison.GREATER_THAN,
			property: "count",
			value: 50
		}),
		symbolizer: {
			fillColor: colors.high,
			fillOpacity: 0.9,
			strokeColor: colors.high,
			strokeOpacity: 0.5,
			strokeWidth: 10,
			pointRadius: 27,
			label: "${count}",
			labelOutlineWidth: 1,
			fontColor: "#ffffff",
			fontOpacity: 0.8,
			fontSize: "12px"
		}
	});
	
	// Create a Style that uses the three previous rules
	var style = new OpenLayers.Style(null, {
		rules: [one, two, red , connecst, licitado, lowRule, middleRule, highRule] 
	});
	
	
	// Create a map and add OSM raster layer as the base layer
	mapoptions = {projection: new OpenLayers.Projection("EPSG:3857")};
	var map = new OpenLayers.Map("map",mapoptions);
	
	
	MyLayerSwitcher =new OpenLayers.Control.LayerSwitcher();
	
	map.addControl(MyLayerSwitcher);
	
  $('.maximizeDiv').click(function(){
				$("#button-nomen").click(); 
				 
  });
	
	//Deleting option zoomwheel.
	var navCtrls = map.getControlsByClass('OpenLayers.Control.Navigation');
	for (var i = 0; i < navCtrls.length; i++)
			navCtrls[i].disableZoomWheel();

	
    /*******************************
	    L   A   Y   E    R    S
    ********************************/ 
	
	var google_street = new OpenLayers.Layer.Google("Google Street 1",{numZoomLevels:30});
	var google_hybrid = new OpenLayers.Layer.Google("Google Hybrid",{type: google.maps.MapTypeId.HYBRID,numZoomLevels: 30});
	map.addLayers([google_street,google_hybrid]);
	
	var vector = new OpenLayers.Layer.Vector("Sitios", {
		renderers: ['Canvas','SVG'],
		strategies: [
			new OpenLayers.Strategy.AnimatedCluster({
				distance: 45,
				animationMethod: OpenLayers.Easing.Expo.easeOut,
				animationDuration: 20
			})
		],
		styleMap: new OpenLayers.StyleMap(style)
	});
	
	map.addLayer(vector);
	
		infrarb = new OpenLayers.Layer.WMS(
	                "Infra. RadioBases",
	                "/geoserver/cartaro2/wms",
	                {layers: " 	cartaro2:infraestructura_radiobase", format: "image/png", transparent:true}
	            );
	    map.addLayer(infrarb);
		infrarb.setVisibility(false);
		

	    cobre = new OpenLayers.Layer.WMS(
                "Cobre",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:trans_cobre", format: "image/png", transparent:true}
            );
       	map.addLayer(cobre);
       	cobre.setVisibility(false);
       	
       	
        fo = new OpenLayers.Layer.WMS(
                "Fibra Óptica",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:trans_fibra_optica", format: "image/png", transparent:true}
            );
       	map.addLayer(fo);
       	fo.setVisibility(false);	
       	
       	
       	rfo = new OpenLayers.Layer.WMS(
                "Registros de Fibra Óptica",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:registros_fo", format: "image/png", transparent:true}
            );
       	map.addLayer(rfo);
       	rfo.setVisibility(false);
       	
       	pinterconexion = new OpenLayers.Layer.WMS(
	                "Puntos de interconexión",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:puntos_interconexion", format: "image/png", transparent:true}
	            );
			map.addLayer(pinterconexion);
		pinterconexion.setVisibility(false);
		
		poliespacios = new OpenLayers.Layer.WMS(
	                "Terrenos disponibles",
	                "/geoserver/cartaro2/wms",
	                {layers: " 	cartaro2:poligonos_espacios", format: "image/png", transparent:true}
	            );
	       	 map.addLayer(poliespacios);
		poliespacios.setVisibility(false);	
		
		
		poliderecho = new OpenLayers.Layer.WMS(
	                "Derecho de vía",
	                "/geoserver/cartaro2/wms",
	                {layers: " 	cartaro2:derecho_de_via", format: "image/png", transparent:true}
	            );
	       	 map.addLayer(poliderecho);
		poliderecho.setVisibility(false);	
		
		
		
	  infoControls = {
            click: new OpenLayers.Control.WMSGetFeatureInfo({
                url: '/geoserver/cartaro2/wms', 
                title: 'Identify features by clicking',
                layers: [infrarb,cobre,fo,pinterconexion, poliespacios,poliderecho],
                queryVisible: true,
				eventListeners: { 
                getfeatureinfo: function(event) { 

                if(event.text.indexOf("</ul>") >= 0)
                    map.addPopup(new OpenLayers.Popup.FramedCloud( 
                        "chicken", 
                        map.getLonLatFromPixel(event.xy), 
                        null, 
                        event.text, 
                        null, 
                        true 
                    )); 
                } 
				} 
            })
        };		

         map.addControl(infoControls['click']); 
         infoControls.click.activate();
		
		
	    coAgua = new OpenLayers.Layer.WMS(
                "Corrientes de agua",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:CorrienteAgua", format: "image/png", transparent:true}
            );
       	map.addLayer(coAgua);
       	coAgua.setVisibility(false);

       	cuAgua = new OpenLayers.Layer.WMS(
                "Cuerpos de agua",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:cuerposAgua", format: "image/png", transparent:true}
            );
       	map.addLayer(cuAgua);
       	cuAgua.setVisibility(false);
       
	  	curvas = new OpenLayers.Layer.WMS(
	                "Curvas de nivel",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:CurvasNivel", format: "image/png", transparent:true}
	            );
	       	map.addLayer(curvas);
		curvas.setVisibility(false);
	
	    estados41 = new OpenLayers.Layer.WMS(
	                "Estados 41",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:ESTADOS", format: "image/png", transparent:true}
	            );
	       	map.addLayer(estados41);
		estados41.setVisibility(false);
	
	    mexadm = new OpenLayers.Layer.WMS(
	                "México ADM",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:municipios", format: "image/png", transparent:true}
	            );
	       	map.addLayer(mexadm);
		mexadm.setVisibility(false);
	
	    via = new OpenLayers.Layer.WMS(
	                "Vías ferreas",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:ViaFerrea", format: "image/png", transparent:true}
	            );
	       	map.addLayer(via);
		via.setVisibility(false);
	
	    litra = new OpenLayers.Layer.WMS(
	                "Líneas de transmisión",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:LineaTransmision", format: "image/png", transparent:true}
	            );
	       	map.addLayer(litra);
		litra.setVisibility(false);
				
	 /*******************************
	       I     N    I   T
	 ********************************/   
	
	map.setCenter(new OpenLayers.LonLat(lon, lat).transform('EPSG:4326','EPSG:3857'), zoom);
	
	
	
	
		
	
	
	 /*******************************
	       M  A  R  K  E  R  S
	 ********************************/   	
	

	// Create some random features
	var features = [];
	$.each(mapdata.split('|'),function(i,row){
	
		if(i!=0){
	        geo = row.split(',');
			if(geo[1]!=null){
				
				row= geo[1].split(' ');
				var lonlat = new OpenLayers.LonLat(row[0], row[1]);
				lonlat.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:3857"));
				var f = new OpenLayers.Feature.Vector( new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));
				 f.attributes.cerca=geo[2];
				 f.attributes.conectado = geo[3] ;
				 f.attributes.anterior = (geo[4]==false)?0:1;
				 f.attributes.licitado =  geo[5];
				 f.poupInfo = geo[0];
				 features.push(f);
			}
		}

	});
	
	vector.addFeatures(features);
	
	
	map.events.register("zoomend", map, function(){
			
			for(i=0;i<vector.features.length;i++)
				if(vector.features[i].cluster.length==1){
					 vector.features[i].attributes.cerca=vector.features[i].cluster[0].attributes.cerca;
	  				 vector.features[i].attributes.conectado=vector.features[i].cluster[0].attributes.conectado;
	  				  vector.features[i].attributes.anterior=vector.features[i].cluster[0].attributes.anterior;
					  vector.features[i].attributes.licitado=vector.features[i].cluster[0].attributes.licitado;
				}
			 
  });	
	
	 /*******************************
	    A D D I N G    P O P U P     
	 ********************************/   
	selectControl = new OpenLayers.Control.SelectFeature(vector,{
	        onSelect: onPopupFeatureSelect,
	        onUnselect: onPopupFeatureUnselect 
	    });
	map.addControl(selectControl);
	selectControl.activate();
	
	function onPopupClose(evt) {
	if(typeof selectedFeature !== undefined)
	    selectControl.unselect(selectedFeature);
	}
	
	function onPopupFeatureSelect(feature) {
		console.log("function onpopup");

		if(feature.cluster.length<=1){
		
	        var  popup;
			var $nid=feature.cluster[0].poupInfo;
            
		    selectedFeature = feature;
			var url1 = "/geoserver/cartaro2/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cartaro2:sitios&maxFeatures=1&outputFormat=json&cql_filter=nid="+$nid ;
			
			
			$.ajax(url1)
			.done(function(content) {
                 
				$renderhtml=constructHTML(content.features[0].properties);
				popup = new OpenLayers.Popup.FramedCloud("popup",
		        feature.geometry.getBounds().getCenterLonLat(),
		        null,$renderhtml, null, true, onPopupClose);
				popup.panMapIfOutOfView = false;
				popup.autoSize = false;
				feature.popup = popup;
				map.addPopup(popup,true);
				feature.attributes.cerca=feature.cluster[0].attributes.cerca;
				currentPopup = popup;
				
				
			})
			  .fail(function() {});
		}else{		
			
			 
			 if(feature.cluster.length<=120){

			
				
				  if(  feature.cluster.length>1  &&  (map.getZoom()=="21") ){
					  popup = new OpenLayers.Popup.FramedCloud("popup",
				        feature.geometry.getBounds().getCenterLonLat(),
				        null,constructHTMLMultiple(feature), null, true, onPopupClose);
						popup.panMapIfOutOfView = false;
						popup.autoSize = false;
						feature.popup = popup;
						map.addPopup(popup,true);
						feature.attributes.cerca=feature.cluster[0].attributes.cerca;
				  }else{
					  map.setCenter(feature.geometry.getBounds().getCenterLonLat());
					  map.zoomIn();map.zoomIn();map.zoomIn();  
				  }

			  }else{	  
				map.setCenter(feature.geometry.getBounds().getCenterLonLat());
				map.zoomIn();map.zoomIn();map.zoomIn();
			  }	
			
				  $('#popup_close').click(function(){
			       $(this).parent().parent().remove();
			  });
		}

	}
	
	function onPopupFeatureUnselect(feature) {
	    if(feature.popup) {
	       try{
	        while (map.popups.length > 0) {
			    map.removePopup(map.popups[0]);
			    
			} 
	        feature.popup.destroy();
	        delete feature.popup;
	        }catch(e){}
		}		
	}
	
	
	 /**************************************************
	   T E M P L A T E    P O P U P    M U L T I P L E    
	 ***************************************************/  	
	function constructHTMLMultiple($object){
	
	  $out= '<div class="infowindow"><div class="green">\
	  <div class="popup-header">\
			<div class="name">SITIOS EN LA MISMA GEO-REFERENCIA</div>';
			  
			 for(i=0;i<$object.cluster.length;i++) {

				 $out+=   '<div class="description"><a target= "_blank" href="/node/'+$object.cluster[i].poupInfo+'" title="Ir al sitio">Sitio '+(i+1)+'</a></div>';
				 $out+=  '<span class="separator"></span>';
			  }
	   $out+= '</div>\
	<div class="popup-content-wrapper">';
	

		

	$out+='</div>\
	</div>';

	   return $out;
	}
	
	
	/*********************************************************************
	   D R A W I N G   U S E R   S T A T E   A N D   M U N I C I P I O		
	*********************************************************************/
		 

	    polygonLayer=createPolygon();
		map.addLayer(polygonLayer);
		$ext=polygonLayer.getDataExtent();
		if($ext!=null)
			map.zoomToExtent(polygonLayer.getDataExtent());
			
 


	
	 /*******************************
	   T E M P L A T E    P O P U P     
	 ********************************/  	
	function constructHTML($d){

	  $out= '<div class="infowindow"><div class="green">\
	  <div class="popup-header">\
			  <div class="description"><a target= "_blank" href="/node/'+$d.nid+'" title="Ir al sitio">'+$d.name+'</a></div>\
			<span class="separator"></span>\
	  </div>\
	<div class="popup-content-wrapper">';
	
	$out+='<ul class="list">';
		

		if($d.field_clave_inmueble_value !=null && $d.field_clave_inmueble_value !="")
			$out+='<li>\
				<div class="name">Clave del inmueble</div>\
				<div class="description">'+$d.field_clave_inmueble_value+'</div>\
			</li>';
			
				if($d.field_clave_cento_value !=null && $d.field_clave_cento_value !="")			
			$out+='<li>\
				<div class="name">Clave del Centro	</div>\
				<div class="description">'+$d.field_clave_cento_value+'</div>\
			</li>';
	
		if($d.field_nombre_institucion_tid !=null && $d.field_nombre_institucion_tid !="")			
			$out+='<li>\
				<div class="name">Clave del Institución a la que pertenece el sitio	</div>\
				<div class="description">'+$d.field_nombre_institucion_tid+'</div>\
			</li>';
			
	    if($d.field_nombre_centro_traba_tid !=null && $d.field_nombre_centro_traba_tid !="")			
			$out+='<li>\
				<div class="name">Clave del centro de trabajo	</div>\
				<div class="description">'+$d.field_nombre_centro_traba_tid+'</div>\
			</li>';	
			
	    if($d.field_clave_localidad_value !=null && $d.field_clave_localidad_value !="")			
			$out+='<li>\
				<div class="name">Clave localidad	</div>\
				<div class="description">'+$d.field_clave_localidad_value+'</div>\
			</li>';
			
		if($d.field_clave_municipio_value !=null && $d.field_clave_municipio_value !="")			
			$out+='<li>\
				<div class="name">Clave municipio	</div>\
				<div class="description">'+$d.field_clave_municipio_value+'</div>\
			</li>';
			
	    if($d.field_clave_estatal_value !=null && $d.field_clave_estatal_value !="")			
			$out+='<li>\
				<div class="name">Clave estatal	</div>\
				<div class="description">'+$d.field_clave_estatal_value+'</div>\
			</li>';
			
		if($d.field_int_poblacion_beneficiada_value !=null && $d.ffield_int_poblacion_beneficiada_value !="")			
			$out+='<li>\
				<div class="name">Población beneficiada </div>\
				<div class="description">'+$d.field_int_poblacion_beneficiada_value+'</div>\
			</li>';
			
		if($d.field_tipo_vialidad_value !=null && $d.field_tipo_vialidad_value !="")			
			$out+='<li>\
				<div class="name">Tipo de vialidad	</div>\
				<div class="description">'+$d.field_tipo_vialidad_value+'</div>\
			</li>';

		if($d.field_nombre_vialidad_value !=null && $d.field_nombre_vialidad_value !="")			
					$out+='<li>\
						<div class="name">Nombre de vialidad	</div>\
						<div class="description">'+$d.field_nombre_vialidad_value+'</div>\
					</li>';

		if($d.field_numero_exterior_value !=null && $d.field_numero_exterior_value !="")			
			$out+='<li>\
				<div class="name">Número exterior 	</div>\
				<div class="description">'+$d.field_numero_exterior_value+'</div>\
			</li>';
	   
	   		if($d.field_nombre_asentamiento_value !=null && $d.field_nombre_asentamiento_value !=" ")			
			$out+='<li>\
				<div class="name">Asentamineto humano </div>\
				<div class="description">'+$d.field_nombre_asentamiento_value+'</div>\
			</li>';
			
			
	  if($d.field_numero_interior_value !=null && $d.field_numero_interior_value !="")			
			$out+='<li>\
				<div class="name">Número interior </div>\
				<div class="description">'+$d.field_numero_interior_value+'</div>\
			</li>';
			


	$out+='</ul>\
		</div>\
	</div>';

	   return $out;
	}

  }
 init();
 
 	$('#map .baseLbl').html('Capas Base');
	$('#map .dataLbl').html('Capas');

});
})(jQuery);
