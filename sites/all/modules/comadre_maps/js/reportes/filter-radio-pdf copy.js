(function ($) {


   Drupal.settings.geo_filters={
	"edit-geo-field-ubicacion":"filter-radio|Filtrar por radio",
   };

   var map=[];
   var polygonFeature=[];
   var modify="";
   latx="";
   laty="";

	/***************************************************
				C R E A T I N G    M A P
	***************************************************/
	var createMap = function(key, name, title){
	
	   $('.view-reportes.view-display-id-page_4 #'+key+'-wrapper input').css('display','none');
	   $('.view-reportes.view-display-id-page_4 #'+key+'-wrapper').css({'width':'100%'});

	   /***************************************************
		        V A R I A B L E S
	   ***************************************************/
      
	    geographic = new OpenLayers.Projection("EPSG:4326");
	    mercator = new OpenLayers.Projection("EPSG:900913")
	    var mapsLayers=[];
	    var modify="";
	    var lastselected;
 
 
 
		 /*******************************
		        S   T   Y  L   E   S 
		 ********************************/      


		var colors = {
			one: "rgb(153, 153, 153)",
			low: "rgb(255, 185, 115)",
			middle: "rgb(255, 167, 66)",
			high: "rgb(255, 91, 36)",
			red: "rgb(217, 0, 0)",
			gray: "rgb(120, 120, 120)",
			green: "rgb(132, 180, 0)",
		};
		
		
		
		/*New styles*/
				
		//Density
		var density = new OpenLayers.Rule({
			 symbolizer: {
				fillColor: colors.high,
				fillOpacity: 0.2,
				strokeColor:   colors.high,
				strokeOpacity: 0.01,
				strokeWidth: 2,
				pointRadius: 3,
				labelOutlineWidth: 0
			}	
		});
		
		//Point
		var point = new OpenLayers.Rule({
			 symbolizer: {
				fillColor: colors.one,
				fillOpacity: 0.8,
				strokeColor:  "rgb(255,255,255)",
				strokeOpacity: 0.3,
				strokeWidth: 2,
				pointRadius: 3,
				labelOutlineWidth: 0,
				fontColor: "#ffffff",
				fontOpacity: 0.8,
				fontSize: "10px"
			}		
		});
		
		
		//conected
		var connec = new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.GREATER_THAN,
				property: "conectado",
				value: 0
			 }),
			 symbolizer: {
				fillColor: colors.green,
				fillOpacity: 0.8,
				strokeColor: "rgb(255,255,255)",
				strokeOpacity: 0.3,
				strokeWidth: 2,
				pointRadius: 3,
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
				strokeOpacity: 0.3,
				strokeWidth: 2,
				pointRadius: 3
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
		
		//Estilos Infraestructura
		var infraestructuraEstilo = new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.EQUAL_TO,
				property: "type",
				value: 'field_point_infra_radiobase'
			}),
			symbolizer: {
				graphicName: 'triangle',
				fillColor: '#8C008C',
				strokeColor: '#8C008C',
				fillOpacity: 0.9,
				pointRadius: 5,
				labelOutlineWidth: 1,
				fontColor: "#ffffff",
				fontOpacity: 0.8,
				fontSize: "12px"
			}
		});		
		
		//Estilos Cobre
		var cobre = new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.EQUAL_TO,
				property: "type",
				value: 'field_wkt_polilinea_cobre'
			}),
			symbolizer: {
				graphicName: 'Line',
				strokeColor: '#8D008E',
				strokeWidth: '3px',
				strokeLinecap: 'round',
			}
		});		
				
		var fibra = new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.EQUAL_TO,
				property: "type",
				value: 'field_wkt_polilinea_fibra'
			}),
			symbolizer: {
				graphicName: 'Line',
				strokeColor: '#FF00FF',
				strokeWidth: '3px',
				strokeLinecap: 'round',
			}
		});		
			

		var puntos_interconexion = new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.EQUAL_TO,
				property: "type",
				value: 'field_punto_pts_interconexion'
			}),
			symbolizer: {
			   graphicName: 'square',
			   strokeColor: "#FF00FF",
			   strokeOpacity: 1,
			   pointRadius: 4,
			   strokeWidth: 1,
			   fillColor: "#8D008E",
			   strokeLinecap: "square",
			   fillOpacity: 0.8,
			}
		});		
		
		var registros_fo = new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.EQUAL_TO,
				property: "type",
				value: 'field_wkt_polipoint_registros'
			}),
			symbolizer: {
			   graphicName: 'square',
			   strokeColor: "#FF00FF",
			   strokeOpacity: 1,
			   pointRadius: 4,
			   rotation: 45,
			   strokeWidth: 1,
			   fillColor: "#8D008E",
			   strokeLinecap: "square",
			   fillOpacity: 0.8,
			}
		});	

		var poligono_espacios = new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.EQUAL_TO,
				property: "type",
				value: 'field_wkt_poligono_espacios'
			}),
			symbolizer: {
				graphicName: 'Line',
				strokeColor: '#999999',
				fillOpacity: 0.8,
				fillColor: '#999999',
				strokeWidth: '4px',
				strokeLinecap: 'round',
			}
		});					
		var derecho_via = new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.EQUAL_TO,
				property: "type",
				value: 'field_wkt_poli_linea_derecho_via'
			}),
			symbolizer: {
				graphicName: 'Line',
				strokeColor: '#999999',
				strokeWidth: '4px',
				strokeLinecap: 'round',
			}
		});		

		
		switch(getUrlVar('style')){
		
			case "Densidad": 
				$rules=[density,infraestructuraEstilo,cobre,fibra, puntos_interconexion,registros_fo,derecho_via,poligono_espacios];
				$strategies=[];
			break;
			case "Puntos": 
				$rules=[point,connec,red,infraestructuraEstilo,cobre,fibra, puntos_interconexion,registros_fo,derecho_via,poligono_espacios];
				$strategies=[];
			break;
			case "Cluster":
			default:
				$rules=[point, connec, red, lowRule, middleRule, highRule,infraestructuraEstilo,cobre,fibra, puntos_interconexion,registros_fo,derecho_via,poligono_espacios];
				$strategies=[
		        new OpenLayers.Strategy.AnimatedCluster({
		            distance: 45,
		            animationMethod: OpenLayers.Easing.Expo.easeOut,
		            animationDuration: 20
		        })
		    ]
			break;
		}
		
		var style = new OpenLayers.Style(null, {
			rules: $rules
		});
	
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

	     mapsLayers[0]=new OpenLayers.Layer.Google("Google Streets",{numZoomLevels: 20});
	     mapsLayers[1] = new OpenLayers.Layer.Google("Google Hybrid",{type: google.maps.MapTypeId.HYBRID,numZoomLevels: 20});
	     mapsLayers[2] = new OpenLayers.Layer.Vector("Canvas-"+name,{'displayInLayerSwitcher':false,styleMap: stylesMap});
	     //var vector_strategies = [new OpenLayers.Strategy.Fixed()];
             //= new OpenLayers.Layer.Vector("Layer 1", {projection: geographic});
	     //SITIOS
	     mapsLayers[3] = new OpenLayers.Layer.Vector("Sitios", {
			projection: geographic,
		    renderers: ['Canvas','SVG'],
		    strategies: $strategies,
		    styleMap: new OpenLayers.StyleMap(style)
   	     });
   	     
	     //INFRA RADIO BASES
	     mapsLayers[4] = new OpenLayers.Layer.Vector("Infra. Radiobases", {
			projection: geographic,
			styleMap: new OpenLayers.StyleMap(style)
   	     });

	     //COBRE
	     mapsLayers[5] = new OpenLayers.Layer.Vector("Cobre", {
			projection: geographic,
			styleMap: new OpenLayers.StyleMap(style),
   	     });	

	     //PUNTO DE INTERCONEXION
	     mapsLayers[6] = new OpenLayers.Layer.Vector("Fibra Óptica", {
			projection: geographic,
			styleMap: new OpenLayers.StyleMap(style),
   	     });	
		
             mapsLayers[7] = new OpenLayers.Layer.Vector("Registros de fibra Óptica", {
			projection: geographic,
			styleMap: new OpenLayers.StyleMap(style),
   	     });	

             mapsLayers[8] = new OpenLayers.Layer.Vector("Puntos de interconexión", {
			projection: geographic,
			styleMap: new OpenLayers.StyleMap(style),
   	     });	

             mapsLayers[9] = new OpenLayers.Layer.Vector("Terrenos disponibles", {
			projection: geographic,
			styleMap: new OpenLayers.StyleMap(style),
   	     });	

             mapsLayers[10] = new OpenLayers.Layer.Vector("Derecho de via", {
			projection: geographic,
			styleMap: new OpenLayers.StyleMap(style),
   	     });	
   	     
   	    /*Static Layers*/ 
   	    
	   	    mapsLayers[11] = new OpenLayers.Layer.WMS(
	                "Corrientes de agua",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:CorrienteAgua", format: "image/png", transparent:true}
	            );
	       mapsLayers[11].setVisibility(false);

       		mapsLayers[12] = new OpenLayers.Layer.WMS(
                "Cuerpos de agua",
                "/geoserver/cartaro2/wms",
                {layers: "cartaro2:cuerposAgua", format: "image/png", transparent:true}
            );;
       		mapsLayers[12].setVisibility(false);
       
	  		mapsLayers[13] = new OpenLayers.Layer.WMS(
	                "Curvas de nivel",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:CurvasNivel", format: "image/png", transparent:true}
	            );
			mapsLayers[13].setVisibility(false);
	
	    	mapsLayers[14] = new OpenLayers.Layer.WMS(
	                "Estados 41",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:ESTADOS", format: "image/png", transparent:true}
	            );
			mapsLayers[14].setVisibility(false);
	
	    	mapsLayers[15] = new OpenLayers.Layer.WMS(
	                "México ADM",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:municipios", format: "image/png", transparent:true}
	            );
			mapsLayers[15].setVisibility(false);
	
	    	mapsLayers[16] = new OpenLayers.Layer.WMS(
	                "Vías ferreas",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:ViaFerrea", format: "image/png", transparent:true}
	            );
			mapsLayers[16].setVisibility(false);
	
		    mapsLayers[17] = new OpenLayers.Layer.WMS(
	                "Líneas de transmisión",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:LineaTransmision", format: "image/png", transparent:true}
	            );
			mapsLayers[17].setVisibility(false);
			
			
			/*------*/
			mapsLayers[18] = new OpenLayers.Layer.WMS(
	                "Telcel",
	                "/geoserver/cartaro2/wms",
	                {"layers": "cartaro2:municipios", "format": "image/png", "version": "1.1.1","transparent":"TRUE",  STYLES: '', cql_filter: "cve_ent='17'"}
	            );

			mapsLayers[18].mergeNewParams({
				styles: 'a)telcel'
			}); 

			mapsLayers[18].setVisibility(false);
			           /*------*/
			mapsLayers[19] = new OpenLayers.Layer.WMS(
	                "Telmex",
	                "/geoserver/cartaro2/wms",
	                {"layers": "cartaro2:municipios", "format": "image/png", "version": "1.1.1","transparent":"TRUE",  STYLES: '', cql_filter: "cve_ent='17'"}
	            );

			mapsLayers[19].mergeNewParams({
				styles: 'a)telmex'
			}); 

			mapsLayers[19].setVisibility(false);
        	           /*------*/
			mapsLayers[20] = new OpenLayers.Layer.WMS(
	                "Isuacell",
	                "/geoserver/cartaro2/wms",
	                {"layers": "cartaro2:municipios", "format": "image/png", "version": "1.1.1","transparent":"TRUE",  STYLES: '', cql_filter: "cve_ent='17'"}
	            );

			mapsLayers[20].mergeNewParams({
				styles: 'a)iusacell'
			}); 

			mapsLayers[20].setVisibility(false);
					/*------*/
			mapsLayers[21] = new OpenLayers.Layer.WMS(
	                "Cablemás",
	                "/geoserver/cartaro2/wms",
	                {"layers": "cartaro2:municipios", "format": "image/png", "version": "1.1.1","transparent":"TRUE",  STYLES: '', cql_filter: "cve_ent='17'"}
	            );

			mapsLayers[21].mergeNewParams({
				styles: 'a)cablevision'
			}); 

			mapsLayers[21].setVisibility(false);
			
		           /*------*/
			mapsLayers[22] = new OpenLayers.Layer.WMS(
	                "Movistar",
	                "/geoserver/cartaro2/wms",
	                {"layers": "cartaro2:municipios", "format": "image/png", "version": "1.1.1","transparent":"TRUE",  STYLES: '', cql_filter: "cve_ent='17'"}
	            );

			mapsLayers[22].mergeNewParams({
				styles: 'a)movistar'
			}); 

			mapsLayers[22].setVisibility(false);			
			           /*------*/
			mapsLayers[23] = new OpenLayers.Layer.WMS(
	                "Axtel",
	                "/geoserver/cartaro2/wms",
	                {"layers": "cartaro2:municipios", "format": "image/png", "version": "1.1.1","transparent":"TRUE",  STYLES: '', cql_filter: "cve_ent='17'"}
	            );

			mapsLayers[23].mergeNewParams({
				styles: 'a)axtel'
			}); 

			mapsLayers[23].setVisibility(false);
					    /*------*/
			mapsLayers[24] = new OpenLayers.Layer.WMS(
	                "Megacable",
	                "/geoserver/cartaro2/wms",
	                {"layers": "cartaro2:municipios", "format": "image/png", "version": "1.1.1","transparent":"TRUE",  STYLES: '', cql_filter: "cve_ent='17'"}
	        );

			mapsLayers[24].mergeNewParams({
				styles: 'a)megacable'
			}); 

			mapsLayers[24].setVisibility(false);
					   /*------*/
			mapsLayers[25] = new OpenLayers.Layer.WMS(
	                "Cantidad de proveedores",
	                "/geoserver/cartaro2/wms",
	                {"layers": "cartaro2:municipios", "format": "image/png", "version": "1.1.1","transparent":"TRUE",  STYLES: '', cql_filter: "cve_ent='17'"}
	        );

			mapsLayers[25].mergeNewParams({
				styles: 'a)proveedores'
			}); 

			mapsLayers[25].setVisibility(false);
			
			



		 $('.view-reportes.view-display-id-page_4 #'+key+'-wrapper').append('<legend><span class="fieldset-legend">'+title+'</span></legend>\
		  	   <div class="wrapper-visibility-mode block-facetapi">\
		  	   <h2>Visualizar sitios como:</h2>\
		       	 <select id="view-mode-map">\
		       		 <option value="Cluster">Cluster</option>\
		       		 	<option value="Densidad">Densidad</option>\
		       		 	<option value="Puntos">Puntos</option>\
		        </select>\
		      </div>\
		  <div id="'+key+'-map" class="medium-map map" style="height:710px; width: 100%;"></div>\
		 <div class="olControlEditingToolbar olControlNoSelect">\
		 	<div id="ctrl-save-'+name+'" class="ctrl-save" >Buscar</div>\
		 	<div id="ctrl-delete-'+name+'" class="ctrl-delete" >Borrar</div>\
		 	<div class="olControlDrawFeaturePolygonItemInactive olButton"></div>\
		 	<div class="olControlModifyFeatureItemInactive olButton"></div>\
		</div>');
		
		
	    $(".page-reportes-pdf select").multiselect({ enableFiltering: true });
		  
		 $actualVal=getUrlVar('style');
		if( $actualVal!=""){
			$('.wrapper-visibility-mode button.multiselect').html($actualVal+'<b class="caret"></b>'); 
				$('.wrapper-visibility-mode .multiselect-container li input').each(function( index ) {
					if($(this).val()==$actualVal){		
						$(this).prop("checked", true);
						$(this).parent().parent().parent().addClass("active");
					}		
					else{
						$(this).prop("checked", false);
						$(this).parent().parent().parent().removeClass("active");
						
					}
				});
					if($('.wrapper-visibility-mode .multiselect-container li input').attr('value')==$actualVal){
			console.log($('.wrapper-visibility-mode .multiselect-container li input').attr('value'));
							 $(this).select();
			}
			
		} 
		
		
		$(".wrapper-visibility-mode .multiselect-container.dropdown-menu a").click(function(){
		
			     				  $val=$(this).children().children(":first").val();
			     				  
			     				  var pathname = window.location.href;
			     				  
			     				 $symbol=(pathname.indexOf("?")==-1)?"?":"&";
			     				 
			     				 $var=getUrlVar('style');    
				 				 if($var=="")
					 				  pathname=pathname+$symbol+"style="+$val;
				 				 else
					 				  pathname= pathname.replace($var,$val);
				 				 			     				     
			     				 $(location).attr('href',pathname);
			});


		
		  map[name] = new OpenLayers.Map(key+'-map',{projection: mercator});

		  map[name].addLayers(mapsLayers);
		  
		  
		 
		
		  map[name].addControl(new OpenLayers.Control.LayerSwitcher());
		  map[name].setCenter(new OpenLayers.LonLat(-102.669983,23.725012).transform(geographic,mercator), 5);

		  polyOptions = {sides: 40};
		  polygonFeature[name]=new OpenLayers.Control.DrawFeature(mapsLayers[2],OpenLayers.Handler.RegularPolygon, {handlerOptions: polyOptions});
		  

		var navCtrls = map[name].getControlsByClass('OpenLayers.Control.Navigation');
		for (var i = 0; i < navCtrls.length; i++)
				navCtrls[i].disableZoomWheel();
		  
		  
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
	
		  map[name].addControl(polygonFeature[name]);
		  map[name].addControl(modify);
		  modify.activate();


	 	/***************************************************
		  			C   O  N  T  R  O  L  S
	     ***************************************************/  
		$('.olControlDrawFeaturePolygonItemInactive').click(function(){  
				 mapsLayers[2].removeFeatures(mapsLayers[2].features);
				 polygonFeature[name].activate();    	   
	        });
	    
	    $('.olControlModifyFeatureItemInactive').click(function(){
	    		 //mapsLayers[2].removeFeatures(mapsLayers[2].features);
				 polygonFeature[name].deactivate();       
	        });
	    
	    $('#ctrl-save-'+name).click(function(){
				 polygonFeature[name].deactivate();       
				 $(this).fadeOut('slow');
	        });


         polygonFeature[name].events.register('featureadded',this,function(f){
			

	        $('#ctrl-save-'+name).fadeIn('slow');
	        $('#ctrl-delete-'+name).fadeIn('slow');
	         
         });
	     /***************************************************
	     	A D D I N G    N E W   F E A T U R E S
	     ***************************************************/  
		 $('#ctrl-save-'+name).click(function() {
		 	
		 	$.each(mapsLayers[2].features, function(key, item){	
		 		formats = {
				  'in': {
				  wkt: new OpenLayers.Format.WKT()
				  }, 
				  'out': {
				  wkt: new OpenLayers.Format.WKT({ 'internalProjection':  mercator, 'externalProjection':  geographic })
				  } 
				};
					 		
				var limits = item.geometry.getBounds();
		 		var center=limits.getCenterLonLat();
		 		var center2=new OpenLayers.Geometry.Point(center.lon, center.lat);
				var center_feat=new OpenLayers.Feature.Vector(center2); 
				var str = formats['out']['wkt'].write(center_feat, '1');
				str = str.replace(/,/g, ', ');
				var x=str.split("(");
				var y=x[1].split(")");
				var w=y[0].split(" ");
				var wkt="POINT("+w[1]+" "+w[0]+")";

				
				var radius=limits.getWidth();
				var km = (radius/2) / 1000;
				url = window.location.href.split("geo");
				
				if(window.location.href=="https://mexicoconectado.udg.mx/reportes")
					window.location.href=url[0]+"?geo={!geofilt sfield=gsearch}&pt="+w[1]+","+w[0]+"&d="+km;
				else
					window.location.href=url[0]+"&geo={!geofilt sfield=gsearch}&pt="+w[1]+","+w[0]+"&d="+km;

		 	});
		 	
		    $('#ctrl-delete-'+name).fadeOut('slow');
			try{ 
			 modify.unselectFeature(mapsLayers[2].features);
			}catch(e){} 
		

		
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
		 	 	mapsLayers[2].removeFeatures(mapsLayers[2].features);
		 	 	
		 });

	        var wkt = new OpenLayers.Format.WKT();
            var features_geo_field_ubicacion = [];
            var features_geo_field_point_infra_radiobase = [];
		    var features_ts_field_wkt_polilinea_cobre = [];
		    var features_ts_field_wkt_polilinea_fibra = [];
		    var features_ts_field_wkt_polipoint_registros = [];
		    var features_geo_field_punto_pts_interconexion = [];
		    var features_ts_field_wkt_poli_linea_derecho_via = [];
		    var features_ts_field_wkt_poligono_espacios = [];
            $.each(cartaro_reportes_results.response.docs, function(i, item) {	

				var in_options = { 'internalProjection': mercator, 'externalProjection': geographic }; 
				
				if(item.geo_field_ubicacion!=undefined){
					var in_options = { 'internalProjection': mercator, 'externalProjection': geographic };
					var fea= new OpenLayers.Format.WKT(in_options).read(item.geo_field_ubicacion[0]);
					if(item.is_field_conectado!=undefined){
						fea.attributes.conectado = item.is_field_conectado;
						
					}
					if(item.is_field_sitio_cerca!=undefined) 
						fea.attributes.cerca = item.is_field_sitio_cerca;
					features_geo_field_ubicacion.push(fea);
				 	
				}
				if(item.geo_field_point_infra_radiobase!=undefined){
					var fea= new OpenLayers.Format.WKT(in_options).read(item.geo_field_point_infra_radiobase[0]); 
					fea.attributes.type = 'field_point_infra_radiobase'; 
					features_geo_field_point_infra_radiobase.push(fea);
				}
			
				if(item.ts_field_wkt_polilinea_cobre!=undefined){
					var fea= new OpenLayers.Format.WKT(in_options).read(item.ts_field_wkt_polilinea_cobre); 
					fea.attributes.type = 'field_wkt_polilinea_cobre';
					features_ts_field_wkt_polilinea_cobre.push(fea);
					
				}
			        if(item.ts_field_wkt_polipoint_registros!=undefined){
					var fea= new OpenLayers.Format.WKT(in_options).read(item.ts_field_wkt_polipoint_registros); 
					fea.attributes.type = 'field_wkt_polipoint_registros';
					features_ts_field_wkt_polipoint_registros.push(fea);
				}
				if(item.ts_field_wkt_polilinea_fibra!=undefined){
					var fea= new OpenLayers.Format.WKT(in_options).read(item.ts_field_wkt_polilinea_fibra); 
					fea.attributes.type = 'field_wkt_polilinea_fibra';
					features_ts_field_wkt_polilinea_fibra.push(fea);
				}



				if(item.geo_field_punto_pts_interconexion!=undefined){
					var fea= new OpenLayers.Format.WKT(in_options).read(item.geo_field_punto_pts_interconexion[0]); 
					fea.attributes.type = 'field_punto_pts_interconexion';
					features_geo_field_punto_pts_interconexion.push(fea);	
				}

				if(item.ts_field_wkt_poli_linea_derecho_via!=undefined){
					var fea= new OpenLayers.Format.WKT(in_options).read(item.ts_field_wkt_poli_linea_derecho_via); 
					fea.attributes.type = 'field_wkt_poli_linea_derecho_via';
					features_ts_field_wkt_poli_linea_derecho_via.push(fea);
				}
				if(item.ts_field_wkt_poligono_espacios!=undefined){
					var fea= new OpenLayers.Format.WKT(in_options).read(item.ts_field_wkt_poligono_espacios); 
					fea.attributes.type = 'field_wkt_poligono_espacios';
					features_ts_field_wkt_poligono_espacios.push(fea);
				}
			



	
            });
            mapsLayers[3].addFeatures(features_geo_field_ubicacion);
            mapsLayers[4].addFeatures(features_geo_field_point_infra_radiobase);
		    mapsLayers[5].addFeatures(features_ts_field_wkt_polilinea_cobre);
		    mapsLayers[6].addFeatures(features_ts_field_wkt_polilinea_fibra);
		    mapsLayers[7].addFeatures(features_ts_field_wkt_polipoint_registros);
		    mapsLayers[8].addFeatures(features_geo_field_punto_pts_interconexion);
		    mapsLayers[9].addFeatures(features_ts_field_wkt_poligono_espacios);
		    mapsLayers[10].addFeatures(features_ts_field_wkt_poli_linea_derecho_via);
		    var centered = 0;
		    for(x=3;x<=10;x++){
				if(mapsLayers[x].features.length>0){
					map[name].zoomToExtent(mapsLayers[x].getDataExtent());
					map[name].updateSize();
					break;
				}
			}
			
			
			
			map[name].events.register("zoomend", map[name], function(){
		   
			for(i=0;i<mapsLayers[3].features.length;i++)
			
			if(mapsLayers[3].features[i].cluster!=null)
				if(mapsLayers[3].features[i].cluster.length==1){
					 mapsLayers[3].features[i].attributes.cerca=mapsLayers[3].features[i].cluster[0].attributes.cerca;
	  				 mapsLayers[3].features[i].attributes.conectado=mapsLayers[3].features[i].cluster[0].attributes.conectado;
				}
			});	
			
			

	      polygonLayer=createPolygon();
		  map[name].addLayer(polygonLayer);
		  $ext=polygonLayer.getDataExtent();
		  if($ext!=null)
			map[name].zoomToExtent(polygonLayer.getDataExtent());
			
		  var pt = getUrlVar('pt');
		  var coord = pt.split(',');
		  if(coord!=""){
			  var d = getUrlVar('d');
			  var circle = OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(coord[1], coord[0]).transform(geographic,mercator),d*1000,40,0);
			  var featurecircle = new OpenLayers.Feature.Vector(circle);
			  var centerLayer = new OpenLayers.Layer.Vector("center");
			  centerLayer.addFeatures([featurecircle]);
			  map[name].zoomToExtent(centerLayer.getDataExtent());
		  }
		 					  

	
   }	

   $("document").ready(function(){
	   
	  	$.each(Drupal.settings.geo_filters, function( key, name ) {
	  	
	  	console.log(name);
                   if($('#'+key).html()!=null){
                      name= name.split('|');                   
	                     createMap(key,name[0],name[1]);
	                     $(".view-reportes.view-display-id-page_4 #edit-geo-field-ubicacion-wrapper").append('<div id="nomenclatura-wrapper" style="position:relative; top:-10px"><ul class="nomeclatura"><li class="title">Simbolog&iacute;a:</li>'+
						'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/radiobase.png" /> Radio Base</li>'+
						'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/cobre.png" />  Cobre</li>'+
						'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/fo.png" />   Fibra &Oacute;ptrica</li>'+
						'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/registro.png" /> Registros de fibra &oacute;ptica</li>'+
						'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/interconexion.png" /> Puntos de interconexi&oacute;n</li>'+
						'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/terreno.png" /> Terrenos disponibles</li>'+
						'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/derechovia.png" />Derecho de v&iacute;a</li>'+
					'</ul>'+
					'<ul id="proveedores" class="nomeclatura">'+
							'<li class="title">Proveedores:</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/cablemas.png" />Cablem&aacute;s</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/movistar.png" />Movistar</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/iusacell.png" />Iusacell</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/telcel.png" />Telcel</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/telmex.png" />Telmex</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/axtel.png" />Axtel</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/megacable.png" />Megacable</li>'+
					'</ul>'+
					'<ul id="estado" class="nomeclatura">'+
							'<li class="title">Estado del sitio:</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/conectado.png" />Conectado</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/sct.png" />Conectado por CSIC</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/noconectado.png" />No conectado</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/50metros.png" />Sitio a menos de 50 metros</li>'+
					'</ul>'+
				    '<ul id="numero-proveedores" class="nomeclatura">'+
							'<li class="title">N&uacute;mero de proveedores:</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/2pro.png" />2</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/3pro.png" />3</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/4pro.png" />4</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/5pro.png" />5</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/6pro.png" />6</li>'+
					'</ul>'+
				'</div>');
	                     //map[name[0]].updateSize();
                  }
		});
 	   
   });  
   
   
   	getUrlVar = function(key){
	    var value = new RegExp('[\\?&]' + key + '=([^&#]*)').exec(window.location.href);
	    if(value!=undefined)
	    	return value[1];
	    else
	    	return "";
	}; 
 
})(jq1102);
