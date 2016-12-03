<?php
global $language;
$prefix=$language->prefix;
if(!empty($view->result)):?>
    <div class="wrapper-category row">
		<?php  foreach($view->result as $row): ?>
      <div class="col-md-2 col-sm-4 col-xs-6 item-category">
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
<?php  endif;?>
