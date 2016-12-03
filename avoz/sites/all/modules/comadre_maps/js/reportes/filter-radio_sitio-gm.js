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
	
	
	$(key+'-map').html("<div>fddf</div>");
	   $('#'+key+'-wrapper input').css('display','none');
	   $('#'+key+'-wrapper').css({'width':'100%'});

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
			blue: "rgb(25,144,255)",
			mmalto: "rgb(102,77,51)",
			malto: "rgb(153,26,0)",
			mmedio: "rgb(255,133,10)",
			mbajo: "rgb(245,245, 122)",
			mmuybajo: "rgb(153,153,102)",
			pink: "rgb(90, 0, 181)"
		};
		
		/*Marginacion lavel*/
		
		var mmalto = new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.EQUAL_TO,
				property: "marginacion",
				value: "muy alto"
			 }),
			 symbolizer: {
				fillColor: colors.mmalto,
				fillOpacity: 0.5,
				strokeColor: colors.mmalto,
				strokeOpacity: 0.1,
				strokeWidth: 2,
				pointRadius: 4,
				labelOutlineWidth: 0,
				fontColor: "#ffffff",
				fontOpacity: 0.8,
				fontSize: "10px"
			}	
		});	
		
		var malto = new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.EQUAL_TO,
				property: "marginacion",
				value: "Alto"
			 }),
			 symbolizer: {
				fillColor: colors.malto,
				fillOpacity: 0.5,
				strokeColor: colors.malto,
				strokeOpacity: 0.1,
				strokeWidth: 2,
				pointRadius: 4,
				labelOutlineWidth: 0,
				fontColor: "#ffffff",
				fontOpacity: 0.8,
				fontSize: "10px"
			}	
		});	
		
		var mmedio = new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.EQUAL_TO,
				property: "marginacion",
				value: "Medio"
			 }),
			 symbolizer: {
				fillColor: colors.mmedio,
				fillOpacity: 0.5,
				strokeColor: colors.mmedio,
				strokeOpacity: 0.1,
				strokeWidth: 2,
				pointRadius: 4,
				labelOutlineWidth: 0,
				fontColor: "#ffffff",
				fontOpacity: 0.8,
				fontSize: "10px"
			}	
		});	
		
		var mbajo = new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.EQUAL_TO,
				property: "marginacion",
				value: "Bajo"
			 }),
			 symbolizer: {
				fillColor: colors.mbajo,
				fillOpacity: 0.5,
				strokeColor: colors.mbajo,
				strokeOpacity: 0.1,
				strokeWidth: 2,
				pointRadius: 4,
				labelOutlineWidth: 0,
				fontColor: "#ffffff",
				fontOpacity: 0.8,
				fontSize: "10px"
			}	
		});	
		
		var mmuybajo = new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.EQUAL_TO,
				property: "marginacion",
				value:  "Muy bajo"
			 }),
			 symbolizer: {
				fillColor: colors.mmuybajo,
				fillOpacity: 0.5,
				strokeColor: colors.mmuybajo,
				strokeOpacity: 0.1,
				strokeWidth: 2,
				pointRadius: 4,
				labelOutlineWidth: 0,
				fontColor: "#ffffff",
				fontOpacity: 0.8,
				fontSize: "10px"
			}	
		});		
		
		
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
				pointRadius: 3,
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
				fillColor: colors.pink,
				fillOpacity: 1,
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
				$rules=[point,connec,red,connecst, licitado, infraestructuraEstilo,cobre,fibra, puntos_interconexion,registros_fo,derecho_via,poligono_espacios];
				$strategies=[];
			break;
			case "Cluster":
				$rules=[point, connec, red,connecst,licitado, lowRule, middleRule, highRule,infraestructuraEstilo,cobre,fibra, puntos_interconexion,registros_fo,derecho_via,poligono_espacios];
				$strategies=[
		        new OpenLayers.Strategy.AnimatedCluster({
		            distance: 45,
		            animationMethod: OpenLayers.Easing.Expo.easeOut,
		            animationDuration: 20
		        })
		    ]
			break;
			case "Marginacion":
			default:
				$rules=[point,mmalto,malto,mmedio,mbajo,mmuybajo];
				$strategies=[];
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

	     mapsLayers[0]=new OpenLayers.Layer.Google("Google Streets",{numZoomLevels: 24});
	     mapsLayers[1] = new OpenLayers.Layer.Google("Google Hybrid",{type: google.maps.MapTypeId.HYBRID,numZoomLevels: 24});
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


	       mapsLayers[4] = new OpenLayers.Layer.WMS(
	                "Infra. RadioBases",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:infraestructura_radiobase", format: "image/png", transparent:true}
	            );
	       mapsLayers[4].setVisibility(false);
	       mapsLayers[5] = new OpenLayers.Layer.WMS(
	                 "Cobre",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:trans_cobre", format: "image/png", transparent:true}
	            );
	       mapsLayers[5].setVisibility(false);
	       mapsLayers[6] = new OpenLayers.Layer.WMS(
	               "Fibra &Oacute;ptica",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:trans_fibra_optica", format: "image/png", transparent:true}
	            );
	       mapsLayers[6].setVisibility(false);
	       mapsLayers[7] = new OpenLayers.Layer.WMS(
	               "Registros - Fibra &Oacute;ptica",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:registros_fo", format: "image/png", transparent:true}
	            );
	       mapsLayers[7].setVisibility(false);
	       mapsLayers[8] = new OpenLayers.Layer.WMS(
	                 "Puntos de interconexi&oacute;n",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:puntos_interconexion", format: "image/png", transparent:true}
	            );
	       mapsLayers[8].setVisibility(false);
	       mapsLayers[9] = new OpenLayers.Layer.WMS(
	                "Terrenos disponibles",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:poligonos_espacios", format: "image/png", transparent:true}
	            );
	       mapsLayers[9].setVisibility(false);
	       mapsLayers[10] = new OpenLayers.Layer.WMS(
	                 "Derecho de v&iacute;a",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:derecho_de_via", format: "image/png", transparent:true}
	            );
	       mapsLayers[10].setVisibility(false);

	     
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
            );
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
	                "M&eacute;xico ADM",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:municipios", format: "image/png", transparent:true}
	            );
			mapsLayers[15].setVisibility(false);
	
	    	mapsLayers[16] = new OpenLayers.Layer.WMS(
	                "V&iacute;as ferreas",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:ViaFerrea", format: "image/png", transparent:true}
	            );
			mapsLayers[16].setVisibility(false);
	
		    mapsLayers[17] = new OpenLayers.Layer.WMS(
	                "L&iacute;neas de transmisi&oacute;n",
	                "/geoserver/cartaro2/wms",
	                {layers: "cartaro2:LineaTransmision", format: "image/png", transparent:true}
	            );
			mapsLayers[17].setVisibility(false);



		 $('#'+key+'-wrapper').append('<legend><span class="fieldset-legend">'+title+'</span></legend>\
		  	   <div class="wrapper-visibility-mode block-facetapi">\
		  	   <h2>Visualizar sitios como:</h2>\
		       	 <select id="view-mode-map">\
		       			<option value="Marginacion">Marginación</option>\
		       			<option value="Cluster">Cluster</option>\
		       		 	<option value="Densidad">Densidad</option>\
		       		 	<option value="Puntos">Puntos</option>\
		        </select>\
		      </div>\
		  <div id="'+key+'-map" class="medium-map map" style="height:710px; width: 100%;"></div>\
		 <div class="olControlEditingToolbar olControlNoSelect">\
		 	<div id="ctrl-save-'+name+'" class="ctrl-save" >Buscar</div>\
		 	<div id="ctrl-delete-'+name+'" class="ctrl-delete" >Borrar</div>\
		 	<div class="olControlFullScreenInactive olButton"></div>\
		 	<div class="olControlDrawFeaturePolygonItemInactive olButton"></div>\
		 	<div class="olControlModifyFeatureItemInactive olButton"></div>\
		</div>');
		
		
	    $(".page-reportes-marginacion select").multiselect({ enableFiltering: true });
		  
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
			
		   if(mapsLayers[2].features.length > 1)
				for(i=0;i<=mapsLayers[2].features.length;i++)
			         mapsLayers[2].removeFeatures( mapsLayers[2].features[i]);
						

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
			var features_lines = [];
			

           $.each(cartaro_reportes_results.response.docs, function(i, item) {	
           		
		     	var in_options = { 'internalProjection': mercator, 'externalProjection': geographic }; 
				if(item.geo_field_ubicacion!=undefined){
					var in_options = { 'internalProjection': mercator, 'externalProjection': geographic };
					var fea= new OpenLayers.Format.WKT(in_options).read(item.geo_field_ubicacion[0]);
					
					if(item.is_field_conectado!=undefined)
						fea.attributes.conectado = item.is_field_conectado;					
					
					if(item.is_field_sitio_cerca!=undefined) 
						fea.attributes.cerca = item.is_field_sitio_cerca;
					
					if(item.bm_field_nuevo!=undefined)
						fea.attributes.anterior= (item.bm_field_nuevo[0]==false) ? 0 : 1;
						
					if(item.bm_field_licitado!=undefined)
						fea.attributes.licitado= item.bm_field_licitado[0];

					if(item.entity_id!=undefined)
						fea.attributes.nid= item.entity_id;	
						
							

					/*Grado de marginación*/
					$edumunloc=item.label.split("[");
					fea.attributes.marginacion = cartaro_reportes_gm_results[$edumunloc[0]];
					
					features_geo_field_ubicacion.push(fea);
					
					
				 	
				}		     

	
            });
            mapsLayers[3].addFeatures(features_geo_field_ubicacion);

            map[name].zoomToExtent(mapsLayers[3].getDataExtent());
			map[name].updateSize();
			
			
		 /***************************************************
		         F  U  L  L        S   C  R   E   E   N
	     ****************************************************/
			
			$('.olControlFullScreenInactive').on("click",function(){
			     
				  
		           if($(this).hasClass('full-active')){

						$(this).removeClass('full-active');
						$('.olControlEditingToolbar').removeClass('bar-relative');
						$('.medium-map').removeClass("full-screen");
						$('body').css('overflow-y','scroll');
						map[name].updateSize();

				   
				   }else{
						$("html, body").animate({ scrollTop: 0 }, "slow");
						$('body').css('height',$( window ).height()+"px");
						$('body').css('overflow','hidden');
						$(this).addClass('full-active');
						$('.olControlEditingToolbar').addClass('bar-relative');
						$('.medium-map').addClass("full-screen");
						map[name].updateSize();
						
				   }
			
			});
		
			
			
			map[name].events.register("zoomend", map[name], function(){

			for(i=0;i<mapsLayers[3].features.length;i++)
			if( mapsLayers[3].features[i].cluster!== undefined)
				if(mapsLayers[3].features[i].cluster.length==1){
					 mapsLayers[3].features[i].attributes.cerca=mapsLayers[3].features[i].cluster[0].attributes.cerca;
	  				 mapsLayers[3].features[i].attributes.conectado=mapsLayers[3].features[i].cluster[0].attributes.conectado;
	  				 mapsLayers[3].features[i].attributes.anterior=mapsLayers[3].features[i].cluster[0].attributes.anterior;
	  				 mapsLayers[3].features[i].attributes.licitado=mapsLayers[3].features[i].cluster[0].attributes.licitado;
	  				 mapsLayers[3].features[i].attributes.nid=mapsLayers[3].features[i].cluster[0].attributes.nid;
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
		  
		  
		/***************************************************
			      F E A T U R E S      P  O  U  P
	    ****************************************************/	  
		infoControls = {
	            click: new OpenLayers.Control.WMSGetFeatureInfo({
	                url: '/geoserver/cartaro2/wms', 
	                title: 'Identify features by clicking',
	                layers: [ mapsLayers[4],mapsLayers[5],mapsLayers[6],mapsLayers[7],mapsLayers[8],mapsLayers[9],mapsLayers[10]],
	                queryVisible: true,
					eventListeners: { 
	                getfeatureinfo: function(event) { 
	
	                if(event.text.indexOf("</ul>") >= 0)
	                    map[name].addPopup(new OpenLayers.Popup.FramedCloud( 
	                        "chicken", 
	                        map[name].getLonLatFromPixel(event.xy), 
	                        null, 
	                        event.text, 
	                        null, 
	                        true 
	                    )); 
	                } 
					} 
	            })
	        };		
	
	     map[name].addControl(infoControls['click']); 
	     infoControls.click.activate();

		  
		  
		 selectControl = new OpenLayers.Control.SelectFeature(mapsLayers[3],{
	        onSelect: onPopupFeatureSelect,
	        onUnselect: onPopupFeatureUnselect 
		 });
		 map[name].addControl(selectControl);
		 selectControl.activate();
			
			
		function onPopupClose(evt) {
				if(typeof selectedFeature !== undefined)
					selectControl.unselect(selectedFeature);
		}
		
		function onPopupFeatureSelect(feature) {


	       if(feature.cluster!=undefined){
			    if(feature.cluster.length<=1){
				
			        var  popup;
					var $nid=feature.attributes.nid;
		            
				    selectedFeature = feature;
					var url1 = "/geoserver/cartaro2/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cartaro2:sitios&maxFeatures=1&outputFormat=json&cql_filter=nid="+$nid ;
					
					
					$.ajax({url:url1, beforeSend: function( xhr ) {
						   				$(".medium-map").css("cursor", "progress");
						   			}
						   	})
					 .done(function(content) {
		   
						$renderhtml=constructHTML(content.features[0].properties);
						popup = new OpenLayers.Popup.FramedCloud("popup",
				        feature.geometry.getBounds().getCenterLonLat(),
				        null,$renderhtml, null, true, onPopupClose);
						popup.panMapIfOutOfView = false;
						popup.autoSize = false;
						feature.popup = popup;
						map[name].addPopup(popup,true);
						feature.attributes.cerca=feature.cluster[0].attributes.cerca;
						currentPopup = popup;
						$(".medium-map").css("cursor", "default");
						
						
					})
					  .fail(function() {});
				}else{		
					
					 
					 if(feature.cluster.length<=120){
				
						  if(  feature.cluster.length>1  &&  (map[name].getZoom()=="21") ){
						  
							  popup = new OpenLayers.Popup.FramedCloud("popup",
						        feature.geometry.getBounds().getCenterLonLat(),
						        null,constructHTMLMultiple(feature), null, true, onPopupClose);
								popup.panMapIfOutOfView = false;
								popup.autoSize = false;
								feature.popup = popup;
								map[name].addPopup(popup,true);
								feature.attributes.cerca=feature.cluster[0].attributes.cerca;
						  }else{
							  map[name].setCenter(feature.geometry.getBounds().getCenterLonLat());
							  map[name].zoomIn();map[name].zoomIn();map[name].zoomIn();
						  }
		
					  }else{	  
						 map[name].setCenter(feature.geometry.getBounds().getCenterLonLat());
						 map[name].zoomIn();map[name].zoomIn();map[name].zoomIn();		  
						}	
					
						  $('#popup_close').click(function(){
					       $(this).parent().parent().remove();
					  });
				}
		    }else{
	
		    		var  popup;
					var $nid=feature.attributes.nid;
				    selectedFeature = feature;
					var url1 = "/geoserver/cartaro2/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cartaro2:sitios&maxFeatures=1&outputFormat=json&cql_filter=nid="+$nid ;
					
					
					$.ajax({url:url1, beforeSend: function( xhr ) {
						   				$(".medium-map").css("cursor", "progress");
						   			}
						   	})
					 .done(function(content) {
		   
						$renderhtml=constructHTML(content.features[0].properties);
						popup = new OpenLayers.Popup.FramedCloud("popup",
				        feature.geometry.getBounds().getCenterLonLat(),
				        null,$renderhtml, null, true, onPopupClose);
						popup.panMapIfOutOfView = false;
						popup.autoSize = false;
						feature.popup = popup;
						map[name].addPopup(popup,true);
						feature.attributes.cerca=feature.attributes.cerca;
						currentPopup = popup;
						$(".medium-map").css("cursor", "default");
						
						
					})
					  .fail(function() {});    
			    
		    }

		}		 
		 function onPopupFeatureUnselect(feature) {
		    if(feature.popup) {
		       try{
		        while ( map[name].popups.length > 0) {
				    map[name].removePopup( map[name].popups[0]);
				    
				} 
		        feature.popup.destroy();
		        delete feature.popup;
		        }catch(e){}
			}		
		}

   }	
   

   $("document").ready(function(){

	  	$.each(Drupal.settings.geo_filters, function( key, name ) {
                   if($('#'+key).html()!=null){
                      name= name.split('|');                   
	                     createMap(key,name[0],name[1]);
	                     $("#edit-geo-field-ubicacion-wrapper").append('<div id="nomenclatura-wrapper" style="position:relative; top:-10px"><ul class="nomeclatura">'+
	                     	'<li class="title">Simbolog&iacute;a:</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/radiobase.png" /> Radio Base</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/cobre.png" />  Cobre</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/fo.png" />   Fibra &Oacute;ptrica</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/registro.png" /> Registros de fibra &oacute;ptica</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/interconexion.png" /> Puntos de interconexi&oacute;n</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/terreno.png" /> Terrenos disponibles</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/derechovia.png" />Derecho de v&iacute;a</li>'+
						'</ul>'+
						'<ul id="estado" class="nomeclatura">'+
							'<li class="title">Estado del sitio:</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/licitado.png" />Licitado</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/conectado.png" />Conectado</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/sct.png" />Conectado por CSIC</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/noconectado.png" />No conectado</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/50metros.png" />Sitio a menos de 50 metros</li>'+
						'</ul>'+
						'<ul class="nomeclatura">'+
							'<li class="title">Grado de Marginaci&oacute;n:</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/malta.png" />Muy Alto</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/alta.png" />Alto</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/media.png" />Medio</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/baja.png" />Bajo</li>'+
							'<li><img  alt="icon" src="/sites/all/modules/maps_mc/images/types/mbaja.png" />Muy Bajo</li>'+
					'</ul>'+
				'</div>');
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
