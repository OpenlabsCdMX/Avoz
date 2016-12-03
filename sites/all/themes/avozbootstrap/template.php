<?php
function getImage($item){
	$img = [];
	if(count($item->field_field_imagen_principal) > 0):										
		$img_attrs = $item->field_field_imagen_principal[0]['rendered']['#item'];							
		$img['name']= str_replace("/var/www/humanamente/","/",drupal_realpath($img_attrs['uri']));
		$img['alt']= isset($img_attrs['alt']) ? $img_attrs['alt'] : "";
		return $img;
	else:
		if(count($item->field_field_fotografia_1) > 0):
			$img_attrs = $item->field_field_fotografia_1[0]['rendered']['#item'];							
			$img['name']= str_replace("/var/www/humanamente/","/",drupal_realpath($img_attrs['uri']));
			$img['alt']= isset($img_attrs['alt']) ? $img_attrs['alt'] : "";
			return $img;
		else:
			if(count($item->field_field_foto_profesional) > 0):
				$img_attrs = $item->field_field_foto_profesional[0]['rendered']['#item'];							
				$img['name']= str_replace("/var/www/humanamente/","/",drupal_realpath($img_attrs['uri']));
				$img['alt']= isset($img_attrs['alt']) ? $img_attrs['alt'] : "";
				return $img;
			else:
				if(count($item->field_field_imagenes) > 0):
					$img_attrs = $item->field_field_imagenes[0]['rendered']['#item'];							
					$img['name']= str_replace("/var/www/humanamente/","/",drupal_realpath($img_attrs['uri']));
					$img['alt']= isset($img_attrs['alt']) ? $img_attrs['alt'] : "";
					return $img;
				else:
					if(count($item->field_field_video) > 0):
						$img_attrs = $item->field_field_video[0]['rendered']['file'];							
						$img['name']= str_replace("/var/www/humanamente/","/",drupal_realpath($img_attrs['#path']));
						$img['alt']= isset($img_attrs['#alt']) ? $img_attrs['#alt'] : "";
						return $img;
					endif;
				endif;
			endif;
		endif;
	endif;
}