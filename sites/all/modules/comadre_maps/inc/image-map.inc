<?php

function serviceImageByFID($fid){

	  $file = file_load($fid);
	  $url =  image_style_url('medium',$file->uri);
  
	 if($file->filemime=="image/png"){
		header('Content-type: image/png');
		imagepng(imagecreatefrompng($url));	 
	 }elseif($file->filemime=="image/jpeg"){
		header('Content-type: image/jpeg');
		imagejpeg(imagecreatefromjpeg($url)); 
	 }

}