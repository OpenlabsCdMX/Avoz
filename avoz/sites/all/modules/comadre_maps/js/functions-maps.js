

function WKTtoPoint($wkt){

	$data=$wkt.replace("GEOMETRYCOLLECTION (POINT (","");
	$data=$data.replace("))","");
	$data=$data.split(" ");

	var myLatLng = {lat: parseFloat($data[1]), lng: parseFloat($data[0])};

	return  myLatLng;
}



function makeCQLFilter(){

	$cql_filter="field_sex_value IN (1,0) AND ";
	$url= window.location.href;
	$url=$url.split("?");
	$get_params=$url[1].split("&");

	jQuery.each($get_params, function( index, value ){

	     $param=value.split("=");
	     if($param[1]!=="All"&&$param[1]!=""){
		     $cql_filter= $cql_filter+value+" AND ";
	     }

	 });

	$cql_filter = $cql_filter.slice(0,-5);
	return $cql_filter;
}
