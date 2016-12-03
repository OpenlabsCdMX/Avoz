<?php
global $language;
$prefix=$language->prefix;
if(!empty($view->result)):?>
    <div class="row">
		<?php  foreach($view->result as $row): ?>
      <div class="wrapper-video">
          <div class="container">
        <?php
            $node=node_load($row->nid);

            $video_data = $node->field_video['und'][0];
            $video_data['style'] = 'normal';
            $video_data['url'] = $video_data['video_url'];
            template_preprocess_video_embed_field_embed_code($video_data);
            $temp_media = "<div class='media'>";
            $temp_media .= $video_data['embed_code'];
            $temp_media .= "</div>";
            print $temp_media;
          ?>
          <div class="extra-video">
              <div class="count">
                      <i class="fa fa-eye" aria-hidden="true"> </i>
                      <span class="sr-only"><?php print t("Visitas:"); ?></span>
                      <?php print ($row->node_counter_totalcount); ?>
              </div>
              <?php
                $block = module_invoke('simplified_social_share', 'block_view', 'open_sharing');
                print render($block['content']);
              ?>
          </div>
        </div>
      </div>
      <?php  if(!empty($row->field_field_poblation[0])): ?>
          <div class="container">
            <h1 class="page-header">
                <?php
                    $term = i18n_taxonomy_localize_terms(taxonomy_term_load($row->field_field_poblation[0]['raw']['tid']));
                    print $term->name;
                 ?>
            </h1>
          </div>
      <?php  endif;?>
		<?php  endforeach;?>
    </div>
<?php  endif;?>
