<?php
	global $language;
	$prefix=$language->prefix;
?>
<h1 class="sr-only">Co.Madre</h1>
<div id="main-content">
	<div class="branding-area">
		<header id="navbar" role="banner" class="<?php print $navbar_classes; ?>">
			<div class="container">
				<div class="navbar-header">
					<?php if ($logo): ?>
					<a class="logo navbar-btn pull-left" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
					  <!--<img src="<?php print $logo; ?>" alt="Logotipo de HumanaMente" />-->
					</a>
					<?php endif; ?>

					<?php if (!empty($site_name)): ?>
					<a class="name navbar-brand hidden-sm" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>"><?php print $site_name; ?></a>
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
							<?php if (!empty($page['navigation'])): ?>
								<?php print render($page['navigation']); ?>
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
							 <div class="search-menu hidden-sm hidden-md">
								 <input class="form-control form-text" type="text" id="search-title" name="title" size="18" maxlength="128"  placeholder="<?php print t("Buscar por palabra");?>">
								 <a id="search-main-btn" class="btn btn-primary" href="/<?php print $prefix; ?>/videos?title=">
									 <i class="fa fa-search" aria-hidden="true"></i>
									 <?php print t('<span class="sr-only">Buscar</span>'); ?>
								 </a>
							 </div>
						</nav>
					</div>
				<?php endif; ?>
			</div>
		</header>
		<div class="imagen-container">
				<div class="container">
						<img src="/sites/all/themes/comadrebootstrap/img/llamada/comadre.jpg" alt="Dibujo alucibo a las mujeres afrodecendientes" class="img-responsive">
				</div>
		</div>
		<div class="floor floor-cero colored" id="llamada">
				<div class="container">
					<?php	print render($page['video']); ?>
				</div>
		</div>
	</div>


	<div class="floor floor-content" id="area-content">
		<div class="container">
			<?php	print render($page['content']); ?>
		</div>
	</div>
	<footer id="footer" class="floor-footer">
			<div class="container">
							<?php	print render($page['footer']); ?>
			</div>
	</footer>
</div>
