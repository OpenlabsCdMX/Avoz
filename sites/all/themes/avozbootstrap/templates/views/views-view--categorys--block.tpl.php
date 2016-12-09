<?php
global $language;
$prefix=$language->prefix;
if(!empty($view->result)):?>
    <div class="wrapper-category row">
		<?php  foreach($view->result as $key=>$row): ?>
		
		<?php $hidd=($key>=12)?"hidden":""; ?>
		<?php $offset=($key==18)?"col-md-offset-5 col-sm-offset-4 col-xs-offset-3":""; ?>
		  <div class="col-md-2 col-sm-4 col-xs-6 item-category <?php print $hidd." ".$offset; ?>">
			<div class="img-wrapper">
				<?php
					$alt=(!empty($row->field_field_image[0]['raw']['alt']))?$row->field_field_image[0]['raw']['alt']:"Imagen de ".$row->taxonomy_term_data_name;
					$filter=($row->taxonomy_vocabulary_machine_name=="knowledge")? 'knowlodge':'poblation';
				   if(!empty($row->field_field_image[0]['raw']['uri'])):
				?>
					<a class="link-category" href="/<?php print $prefix; ?>/videos?field_<?php print $filter;?>=<?php print $row->tid; ?>" >
					  <img class="img-responsive" src="<?php print image_style_url('squared', $row->field_field_image[0]['raw']['uri']);?>" alt="<?php print  $alt ?>" />
					  <div class="over-link">
						<div class="inner-category">
							  <div class="icon-wrapper term-<?php print $row->tid; ?>">
							  </div>
						</div>
					  </div>
					</a>
				<?php  endif;  ?>
			</div>
			<div class="title-wrapper">
			   <div class="centered">
				  <?php
					$term = i18n_taxonomy_localize_terms(taxonomy_term_load($row->tid));
					print $term->name;
				  ?>
			  </div>
			</div>
		  </div>
		<?php  endforeach;?>
    </div>
	<div class="pager pager-load-more text-center">
			<a class="btn btn-primary" id="more-category-btn">
					<?php print t("Cargar más categorías"); ?>
			</a>
	</div>
<?php  endif;?>

<style type="text/css">
	<?php  
		foreach($view->result as $row){
		
			if(!empty($row->field_field_icon_white[0]['raw']['uri'])){
				
				$url=file_create_url($row->field_field_icon_white[0]['raw']['uri']);
					print ".term-".$row->tid."{
						background: url('".$url."');
					}";
			}
			
		} 
	?>
</style>
<script type="text/javascript">
	jQuery("#more-category-btn").click(function(){
			jQuery(this).css("display","none");
			jQuery(".item-category.hidden").removeClass("hidden");
		
	});
</script>
