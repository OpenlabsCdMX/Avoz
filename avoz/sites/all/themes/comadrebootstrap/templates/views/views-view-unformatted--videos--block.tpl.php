<?php if(!empty($view->result)):?>
    <div class="wrapper-videos row">
		<?php foreach($view->result as $row): ?>
      <div class="col-md-3 col-sm-6 item-video">
        <div class="img-wrapper">
            <?php
                $entity=$row->_entity_properties['entity object'];

                $alt=(!empty($row->field_image['und'][0]['alt']))?$row->field_image['und'][0]['alt']:"Imagen de ".$entity->title;
                if(!empty($entity->field_image['und'][0]['uri'])):
            ?>
                <a href="/node/<?php print $entity->nid ?>">
                  <img class="img-responsive" src="<?php print image_style_url('preview', $entity->field_image['und'][0]['uri']);?>" alt="<?php print  $alt ?>" />
                  <div class="play-link"></div>
                </a>
            <?php  else:  ?>
              <a href="/node/<?php print $entity->nid ?>">
                  <img class="img-responsive" src="<?php print image_style_url('preview', $entity->field_video['und'][0]['thumbnail_path']);?>" alt="<?php print  $alt ?>" />
                  <div class="play-link"></div>
              </a>
            <?php  endif;  ?>
        </div>
            <h2 class="block-title">
                <?php print $entity->title; ?>
            </h2>
            <div class="more-info">
                <?php if(!empty($entity->field_time['und'][0]['value'])): ?>
                    <div class="duration">
                      <span class="sr-only"><?php print t("Duración: "); ?></span>
                      <i class="fa fa-clock-o" aria-hidden="true"></i> <?php print $entity->field_time['und'][0]['value']; ?> min.</div>
                <?php  endif; ?>
                <?php if(!empty($entity->field_type_video['und'][0]['tid'])): ?>
                        <?php
                          $term = taxonomy_term_load($entity->field_type_video['und'][0]['tid']);
                        ?>
                        <div class=" hidden type">
                          <span class="sr-only"><?php print t("Tipo de vídeo: "); ?></span>
                          <i class="fa fa-video-camera" aria-hidden="true"></i> <?php print  $term->name; ?>
                        </div>
                <?php  endif; ?>
            </div>
      </div>
		<?php  endforeach;?>
    </div>
<?php  endif;?>
