<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Akina
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

<div class="Extendfull">
  <?php the_post_thumbnail('full'); ?>
  <header class="entry-header">
		<h1 class="entry-title"><?php the_title(); ?></h1>
		<hr>
	</header>
	 </div>

<!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'ondemand' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="post-footer">
	
	<div class="post-tags">
			<?php if ( get_the_tags() ) { echo '<i class="iconfont">&#xe602;</i> '; the_tags('', ' ', ' ');}?>
		</div>
		 <?php get_template_part('inc/sharelike'); ?>
		
	
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
