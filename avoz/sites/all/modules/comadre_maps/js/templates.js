	/**************************************************
	   T E M P L A T E    P O P U P    M U L T I P L E    
	 ***************************************************/  	
	function constructHTMLMultiple($object){
	
	  $out= '<div class="infowindow"><div class="green multi-geo">\
	  <div class="popup-header">\
			<div class="name">SITIOS EN LA MISMA GEO-REFERENCIA</div>';
			  
			 for(i=0;i<$object.cluster.length;i++) {

				 $out+=   '<div class="description"><a target= "_blank" href="/node/'+$object.cluster[i].attributes.nid+'" title="Ir al sitio">Sitio '+(i+1)+'</a></div>';
				 $out+=  '<span class="separator"></span>';
			  }
	   $out+= '</div>\
	<div class="popup-content-wrapper">';
	

		

	$out+='</div>\
	</div>';

	   return $out;
	}

	
	/*******************************
	   T E M P L A T E    P O P U P   
	   
	   
	   Generacion del popup invocado desde el mapa de la seccion de reportes cuando se hace click en el punto del sitio
	 ********************************/  	
	function constructHTML($d){

//console.log($d);
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
			
				if($d.field_clave_centro_value !=null && $d.field_clave_centro_value !="")			
			$out+='<li>\
				<div class="name">Clave del Centro	</div>\
				<div class="description">'+$d.field_clave_centro_value+'</div>\
			</li>';
	
		if($d.field_dependecia_sitio_value !=null && $d.field_dependecia_sitio_value !="")			
			$out+='<li>\
				<div class="name">Dependencia	</div>\
				<div class="description">'+$d.field_dependecia_sitio_value+'</div>\
			</li>';
			
	    if($d.field_clave_localidad_inegi_value !=null && $d.field_clave_localidad_inegi_value !="")			
			$out+='<li>\
				<div class="name">Clave localidad	</div>\
				<div class="description">'+$d.field_clave_localidad_inegi_value+'</div>\
			</li>';
			
		if($d.field_clave_municipal_inegi_value !=null && $d.field_clave_municipal_inegi_value !="")			
			$out+='<li>\
				<div class="name">Clave municipio	</div>\
				<div class="description">'+$d.field_clave_municipal_inegi_value+'</div>\
			</li>';
			
	    if($d.field_clave_estatal_inegi_value !=null && $d.field_clave_estatal_inegi_value !="")			
			$out+='<li>\
				<div class="name">Clave estatal	</div>\
				<div class="description">'+$d.field_clave_estatal_inegi_value+'</div>\
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

		if($d.field_num_exterior_value !=null && $d.field_num_exterior_value !="")			
			$out+='<li>\
				<div class="name">Número exterior 	</div>\
				<div class="description">'+$d.field_num_exterior_value+'</div>\
			</li>';
	   
	   		if($d.field_tipo_asentamiento_value !=null && $d.field_tipo_asentamiento_value !=" ")			
			$out+='<li>\
				<div class="name">Tipo de asentamiento humano </div>\
				<div class="description">'+$d.field_tipo_asentamiento_value+'</div>\
			</li>';
			
			
	  if($d.field_num_interior_value !=null && $d.field_num_interior_value !="")			
			$out+='<li>\
				<div class="name">Número interior </div>\
				<div class="description">'+$d.field_num_interior_value+'</div>\
			</li>';
			


	$out+='</ul>\
		</div>\
	</div>';

	   return $out;
	}