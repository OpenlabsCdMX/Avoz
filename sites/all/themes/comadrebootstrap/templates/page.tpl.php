<?php
	global $language;
	$prefix=$language->prefix;
?>
<header id="navbar" role="banner" class="<?php print $navbar_classes; ?>">
	<div class="container">
		<?php if ($logo): ?>
			<div class="logo-container ">
				<div class="wrapper-logo">
					<a class="logo navbar-btn pull-left" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
						<img src="<?php print $logo; ?>" alt="Logotipo de HumanaMente" class="hidden-xs" />
						<span class="show-xs hidden-lg hidden-md hidden-sm logo-text"><p>HumanaMente</p></span>
					</a>
				</div>
			</div>
		<?php endif; ?>
		<div class="navbar-header">


			<?php if (!empty($site_name)): ?>
			<a class="name navbar-brand  hidden-sm" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>"><?php print $site_name; ?></a>
			<?php endif; ?>

			<!-- .btn-navbar is used as the toggle for collapsed navbar content -->
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
			  <span class="sr-only">Menú desplegable</span>
			  <span class="icon-bar"></span>
			  <span class="icon-bar"></span>
			  <span class="icon-bar"></span>
			</button>
		</div>
		<?php if (!empty($primary_nav) || !empty($secondary_nav) || !empty($page['navigation'])): ?>
			<div class="navbar-collapse collapse">
				<nav role="navigation">
					<?php if (!empty($primary_nav)): ?>
						<?php print render($primary_nav); ?>
					<?php endif; ?>
					<?php
							$menu_leng=menu_tree('menu-lenguage');
							$output=drupal_render($menu_leng);
							print $output;
					 ?>
					 <div class="wrapper-llamada">
								<?php
									$url= ($prefix=="br")? "/br/chamada": "/es/llamada";
								?>
							 <a class="btn btn-default" href="<?php print $url; ?>">
								 <i class="fa fa-cloud-upload" aria-hidden="true"></i>
								 <?php print t("Sugerir un vídeo"); ?>
							 </a>
					 </div>
					 <div class="search-menu hidden-xs hidden-sm hidden-md">
						 <input class="form-control form-text" type="text" id="search-title" name="title" size="18" maxlength="128"  placeholder="<?php print t("Buscar por palabra");?>">
						 <a id="search-main-btn" class="btn btn-primary" href="/<?php print $prefix; ?>/videos?title=">
							 <i class="fa fa-search" aria-hidden="true"></i>
							 <?php print t('<span class="sr-only">Buscar</span>'); ?>
						 </a>
					 </div>
					 <?php if (!empty($page['navigation'])): ?>
						 <?php print render($page['navigation']); ?>
					 <?php endif; ?>
				</nav>
			</div>
		<?php endif; ?>
	</div>
</header>

<?php if(!empty($page['video'])): ?>
		<div id="scena" class="precontent-escena">
					<?php print render($page['video']); ?>

		</div>
<?php endif;?>

<div class="main-container container">

  <header role="banner" id="page-header">
    <?php if (!empty($site_slogan)): ?>
      <p class="lead"><?php print $site_slogan; ?></p>
    <?php endif; ?>

    <?php print render($page['header']); ?>
  </header> <!-- /#page-header -->

  <div class="row">

    <?php if (!empty($page['sidebar_first'])): ?>
      <aside class="col-sm-3" role="complementary">
        <?php print render($page['sidebar_first']); ?>
      </aside>  <!-- /#sidebar-first -->
    <?php endif; ?>

    <section<?php print $content_column_class; ?>>
      <?php if (!empty($page['highlighted'])): ?>
        <div class="highlighted jumbotron"><?php print render($page['highlighted']); ?></div>
      <?php endif; ?>
      <?php if (!empty($breadcrumb)): print $breadcrumb; endif;?>
      <a id="main-content"></a>
      <?php print render($title_prefix); ?>
      <?php if (!empty($title)): ?>
        <h1 class="page-header"><?php print $title; ?></h1>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
      <?php print $messages; ?>
      <?php if (!empty($tabs)): ?>
        <?php print render($tabs); ?>
      <?php endif; ?>
      <?php if (!empty($page['help'])): ?>
        <?php print render($page['help']); ?>
      <?php endif; ?>
      <?php if (!empty($action_links)): ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
      <?php print render($page['content']); ?>
    </section>

    <?php if (!empty($page['sidebar_second'])): ?>
      <aside class="col-sm-3" role="complementary">
        <?php print render($page['sidebar_second']); ?>
      </aside>  <!-- /#sidebar-second -->
    <?php endif; ?>

  </div>
</div>

	<?php if (!empty($page['floor_one'])): ?>
			<div class="floor floor-one" id="que-es">
				<div class="container">
					<?php	print render($page['floor_one']); ?>
				</div>
			</div>
    <?php endif; ?>

	<?php if (!empty($page['floor_two'])): ?>
	<div class="floor floor-two colored" id="como-sera">
			<div class="container">
				<?php	print render($page['floor_two']); ?>
			</div>
	</div>
	<?php endif; ?>

<footer id="footer" class="floor-footer">
		<div class="container">
						<?php	print render($page['footer']); ?>
		</div>
</footer>
