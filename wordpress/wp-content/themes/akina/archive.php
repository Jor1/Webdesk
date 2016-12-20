<?php
/**
 * The template for displaying archive pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Akina
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php
		if ( have_posts() ) : ?>

			<header class="page-header">
				<h1 class="cat-title"><?php single_cat_title('', true); ?></h1>
			<span class="cat-des">
			<?php 
				if(category_description() !== ""){ 
					echo "" . category_description(); 
				} 
			?>
			</span>
			</header><!-- .page-header -->

			<?php
			/* Start the Loop */
			while ( have_posts() ) : the_post(); 
			?>
			
			<?php 
					/*
					* 如果选择分类ID  那么这个页面将输出works样式
					*/
				$cat_array = akina_option('works_multicheck');
				$huluwa = array();
				foreach ($cat_array as $key=>$works_multicheck){
					if ($works_multicheck==1) $huluwa[]=$key;
				} 				
				if ( is_category($huluwa) ){
					include(TEMPLATEPATH . '/template-parts/works-list.php');
				} else {
					/*
					* Include the Post-Format-specific template for the content.
					* If you want to override this in a child theme, then include a file
					* called content-___.php (where ___ is the Post Format name) and that will be used instead.
					*/
					get_template_part( 'template-parts/content', get_post_format() );
				}
				
				endwhile; ?>
				<div class="clearer"></div>

			<nav class="navigator">
        <?php previous_posts_link('<i class="iconfont">&#xe611;</i>') ?><?php next_posts_link('<i class="iconfont">&#xe60f;</i>') ?>
	</nav>

	<?php	else :

			get_template_part( 'template-parts/content', 'none' );

		endif; ?>

		</main><!-- #main -->
		
		<div id="pagination"><?php next_posts_link(__('加载更多')); ?></div>
		
	</div><!-- #primary -->

<?php
get_sidebar();
get_footer();
