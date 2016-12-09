<?php
global $language;
$prefix=$language->prefix;

	if($node->status=="0"): ?>

	<div  id="revision-process"  class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
	  <div class="modal-dialog" role="document">
				<div class="modal-content">
			      <div class="modal-header">
			        <h4 class="modal-title"><?php print t("Validando vídeo"); ?></h4>
			      </div>
			      <div class="modal-body">
			        <p>
									<?php
												print t("Gracias por tu recomendación, este video se encuentra en proceso de revisión, pronto estará disponible en la plataforma.");
											?>
							</p>
							<div class="modal-footer">
					        <a type="button" class="btn btn-primary" onclick="goBack()" >Regresar</a>
					      </div>
			      </div>
	    </div>
	  </div>
	</div>
	<script type="text/javascript">
					jQuery('#revision-process').modal({
						backdrop: 'static',
						keyboard: false
					});

					function goBack() {
							window.location.replace(document.referrer);
					}
	</script>
<?php endif; ?>
<div class="video-wrapper">
	<?php print render($content['field_video']);  ?>
</div>

<div class="row">
	<div class="col-md-8 wrapper-main">
		<?php if(!empty($node->field_notes['und'][0])) :?>
			<div class="notes">
				<?php print render($content['field_notes']);  ?>
			</div>
		<?php endif; ?>
		<?php dsm($node->field_knowlodge); if(!empty($node->field_knowlodge['und'][0])) :?>
			<h2 class="sr-only"><?php print t('Categorías'); ?></h2>
			<div class="categorys row">
				<?php  foreach($node->field_knowlodge['und'] as $know): ?>
								<?php   if(!empty($know['taxonomy_term']->field_icono['und'][0]['uri'])): ?>
									<div class="wrapper-category col-xs-6 col-md-3">
										<a href="/<?php print $prefix?>/videos?field_knowlodge=<?php print $know['taxonomy_term']->tid; ?>">
											<img class="img-responsive" alt="<?php print $know['taxonomy_term']->name; ?>" src="<?php print image_style_url('icono_categor_a',$know['taxonomy_term']->field_icono['und'][0]['uri']);?>"/>
										</a>
										<div class="title-category hovered"><?php print $know['taxonomy_term']->name; ?></div>
									</div>

								<?php endif; ?>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>

	<div class="col-md-4 wrapper-secundary">
	<?php if(!empty($node->field_locate['und'][0])) :?>
		<div class="locate">
				<?php print render($content['field_locate']);  ?>
		</div>
	<?php endif; ?>

	<?php if(!empty($node->field_collaborator['und'][0]['entity']->title)) :?>
		<div class="well colaborator">
			<div class="small"><?php print t("Colaborador:"); ?></div>
			<div class="media">
							<div class="media-left">
								<div class="circle">
									<?php print	strtoupper(substr($node->field_collaborator['und'][0]['entity']->title,0,1)); ?>
								</div>
							</div>
							<div class="media-body">
											<?php print	$node->field_collaborator['und'][0]['entity']->title; ?>
							</div>
			</div>
			<div class="btn-wrapper-site">
					<?php	if(!empty($node->field_collaborator['und'][0]['entity']->field_url_web['und'][0])): ?>
									<?php $extra= (strpos($node->field_collaborator['und'][0]['entity']->field_url_web['und'][0]['url'], 'http') !== false)? "":"http://";?>
									<a class="btn btn-primary" href="<?php print $extra.$node->field_collaborator['und'][0]['entity']->field_url_web['und'][0]['url'] ?>" target="_blanck">
										<i class="fa fa-external-link" aria-hidden="true"></i>
											<?php print t("Ir al sitio del colaborador");?>
											<span class="sr-only">(Abre en nueva ventana)</span>
									</a>
					<?php endif; ?>
			</div>
		</div>
	<?php endif; ?>
	
	<?php if(!empty($node->field_qr_code['und'][0])) :?>
			<div class="qr-code text-center">
				<?php
					print render($content['field_qr_code']);  
				?>
			</div>
	<?php endif; ?>
	
	</div>
</div>
<?php

		if( !empty($node->field_qr_code['und'][0])&& !empty($node->field_image['und']['0'])){
			
			$markup= $content['field_qr_code'][0]['#markup'];
			$image_url=str_replace("public://","sites/default/files/",$node->field_image['und']['0']['uri']) ;
				
			$src = preg_match("<img.*?src=[\"\"'](?<url>.*?)[\"\"'].*?>",$markup,$output);
			$url_qrcode=substr($output['url'],strpos($output['url'],"sites"));
			
		}

?>


