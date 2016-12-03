<?php if($view_mode == "full"): ?>
	<?php if(!empty($node->field_imagen_principal) || !empty($node->body) ): ?>
		<div class="row">
			<?php
				//dsm($node->field_img_escena);
				if(empty($node->field_img_escena)):
					$exist_img = "0";
				else:
					if($node->field_img_escena['und'][0]['value'] != 0):
						$exist_img = "-1";
					else:
						$exist_img = "0";
					endif;
				endif;
			?>
			<?php //dsm($exist_img);?>
			<?php if(!empty($node->field_imagen_principal) && $exist_img != -1 ):
				$body_col = "9"; ?>
				<div class="col-md-3">
					<?php
						//$image = field_get_items('node', $node, 'field_imagen_principal');
						//$output = field_view_value('node', $node, 'field_imagen_principal', $image[0]);
						//print render($output);
						//$new_url = image_style_url('img_proporcion_3_2',$node->field_imagen_principal['und'][0]['uri']);
						//dsm(str_replace("/var/www/html/","/",drupal_realpath($node->field_imagen_principal['und'][0]['uri'])));
						$new_url = str_replace("/var/www/humanamente/","/",drupal_realpath($node->field_imagen_principal['und'][0]['uri']));
					?>
					<img src="<?php print $new_url; ?>" alt="<?php print (!empty($node->field_imagen_principal['und'][0]['alt'])) ? $node->field_imagen_principal['und'][0]['alt'] :""; ?>" title="<?php print (!empty($node->field_imagen_principal['und'][0]['title'])) ? $node->field_imagen_principal['und'][0]['title'] : ""; ?>" class="img-responsive img-thumbnail" />
				</div>
			<?php else:
				$body_col = "12";
			endif; ?>
			<?php if(!empty($node->body)): ?>
				<div class="content col-md-<?php print $body_col; ?>">
					<?php
						$body = field_get_items('node', $node, 'body');
						$output = field_view_value('node', $node, 'body', $body[0]);
						print render($output);
					?>
				</div>
			<?php endif; ?>
		</div>
	<?php endif; ?>
<?php endif; ?>
