(function ($) {
     $(document).ready(function(){ 
 
 
	var map, mapoptions, vectors, formats, select;
	var lon = -102.669983;
	var lat = 23.725012;
	var zoom = 5;
	var str = '';
	
	function updateFormats() {
		var out_options = {'internalProjection': map.baseLayer.projection,
							'externalProjection': new OpenLayers.Projection("EPSG:4326")
						  };
		formats = {'out': { wkt: new OpenLayers.Format.WKT(out_options),}};
	}


	function init(){
		
		mapoptions = {projection: new OpenLayers.Projection("EPSG:3857")};

//Deleting option zoomwheel.


		map = new OpenLayers.Map('map-geo',mapoptions);



		var google_street = new OpenLayers.Layer.Google("Google Street 2",{numZoomLevels:20});
		var google_hybrid = new OpenLayers.Layer.Google("Google Hybrid",{type: google.maps.MapTypeId.HYBRID,numZoomLevels: 20});
		
		
	   /*
		   L A Y E R S
	   */





	   mrks = new OpenLayers.Layer.WMS(
                "Sitios",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:sitios", format: "image/gif", transparent:true}
            );
       map.addLayer(mrks);
       mrks.setVisibility(false);

	   infrarb = new OpenLayers.Layer.WMS(
	                "Infra. RadioBases",
	                "/geoserver/cartaro2/wms",
	                {layers: " 	cartaro2:infraestructura_radiobase", format: "image/gif", transparent:true}
	            );
	    map.addLayer(infrarb);
		infrarb.setVisibility(false);
		
	    cobre = new OpenLayers.Layer.WMS(
                "Cobre",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:trans_cobre", format: "image/gif", transparent:true}
            );
       	map.addLayer(cobre);
       	cobre.setVisibility(false);
       	
        fo = new OpenLayers.Layer.WMS(
                "Fibra Óptica",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:trans_fibra_optica", format: "image/gif", transparent:true}
            );
       	map.addLayer(fo);
       	fo.setVisibility(false);	
       	   	
       	rfo = new OpenLayers.Layer.WMS(
                "Registros de Fibra Óptica",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:registros_fo", format: "image/gif", transparent:true}
            );
       	map.addLayer(rfo);
       	rfo.setVisibility(false);
       	
       	pinterconexion = new OpenLayers.Layer.WMS(
	                "Puntos de interconexión",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:puntos_interconexion", format: "image/gif", transparent:true}
	            );
			map.addLayer(pinterconexion);
		pinterconexion.setVisibility(false);
		
		poliespacios = new OpenLayers.Layer.WMS(
	                "Terrenos disponibles",
	                "/geoserver/cartaro2/wms",
	                {layers: " 	cartaro2:poligonos_espacios", format: "image/gif", transparent:true}
	            );
	       	 map.addLayer(poliespacios);
		poliespacios.setVisibility(false);	
		
		poliderecho = new OpenLayers.Layer.WMS(
	                "Derecho de vía",
	                "/geoserver/cartaro2/wms",
	                {layers: " 	cartaro2:derecho_de_via", format: "image/gif", transparent:true}
	            );
	       	 map.addLayer(poliderecho);
		poliderecho.setVisibility(false);	
	
       	coAgua = new OpenLayers.Layer.WMS(
                "Corrientes de agua",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:CorrienteAgua", format: "image/gif", transparent:true}
            );
       	map.addLayer(coAgua);
       	coAgua.setVisibility(false);

       	cuAgua = new OpenLayers.Layer.WMS(
                "Cuerpos de agua",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:cuerposAgua", format: "image/gif", transparent:true}
            );
       	map.addLayer(cuAgua);
       	cuAgua.setVisibility(false);
       
	  	curvas = new OpenLayers.Layer.WMS(
	                "Curvas de nivel",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:CurvasNivel", format: "image/gif", transparent:true}
	            );
	       	map.addLayer(curvas);
		curvas.setVisibility(false);
	
	    estados41 = new OpenLayers.Layer.WMS(
	                "Estados 41",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:ESTADOS", format: "image/gif", transparent:true}
	            );
	       	map.addLayer(estados41);
		estados41.setVisibility(false);
	
	    mexadm = new OpenLayers.Layer.WMS(
	                "México ADM",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:municipios", format: "image/gif", transparent:true}
	            );
	       	map.addLayer(mexadm);
		mexadm.setVisibility(false);
	
	    via = new OpenLayers.Layer.WMS(
	                "Vías ferreas",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:ViaFerrea", format: "image/gif", transparent:true}
	            );
	       	map.addLayer(via);
		via.setVisibility(false);
	
	    litra = new OpenLayers.Layer.WMS(
	                "Líneas de transmisión",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:LineaTransmision", format: "image/gif", transparent:true}
	            );
	       	map.addLayer(litra);
		litra.setVisibility(false);
	
	    
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
	    
	    
	   
	    vectors = new OpenLayers.Layer.Vector(
	    			"Capa de dibujo",
	    			{isBaseLayer: false,
		    		  styleMap: stylesMap
	    			}
	    		);
	    	map.addLayer(vectors);
		vectors.setVisibility(true);
		
		
		map.addLayers([google_street,google_hybrid]);
		map.addControl(new OpenLayers.Control.LayerSwitcher());
		
		
		var container = document.getElementById("panel-control-draw");
		var panel = new OpenLayers.Control.EditingToolbar(vectors, {div:container});
		map.addControl(panel);
		
		var options = {hover: true,
						onSelect: serialize};
		
		select = new OpenLayers.Control.SelectFeature(vectors, options);
		
		map.addControl(select);
		select.activate();
		
		updateFormats();
		map.setCenter(new OpenLayers.LonLat(lon, lat).transform('EPSG:4326','EPSG:3857'), zoom);
			//Deleting option zoomwheel.
		var navCtrls = map.getControlsByClass('OpenLayers.Control.Navigation');
		for (var i = 0; i < navCtrls.length; i++)
				navCtrls[i].disableZoomWheel();

		
				
	}
	
	function serialize(feature) {}
 
 init();
 
 });
})(jQuery);
  
