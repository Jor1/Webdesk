<?php
/**
 * The template for displaying archive pages.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package llorix-one-lite
 */

get_header(); ?>
	</div>
	<!-- /END COLOR OVER IMAGE -->
</header>
<!-- /END HOME / HEADER  -->

<?php
	$llorix_one_lite_blog_header_image = get_theme_mod( 'llorix_one_lite_blog_header_image', llorix_one_lite_get_file( '/images/background-images/background-blog.jpg' ) );
	$llorix_one_lite_blog_header_title = get_theme_mod( 'llorix_one_lite_blog_header_title', 'This Theme Supports a Custom FrontPage' );
	$llorix_one_lite_blog_header_subtitle = get_theme_mod( 'llorix_one_lite_blog_header_subtitle' );

	if ( ! empty( $llorix_one_lite_blog_header_image ) || ! empty( $llorix_one_lite_blog_header_title ) || ! empty( $llorix_one_lite_blog_header_subtitle ) ) :

	if ( ! empty( $llorix_one_lite_blog_header_image ) ) :
		echo '<div class="archive-top" style="background-image: url(' . $llorix_one_lite_blog_header_image . ');">';
		else :
			echo '<div class="archive-top">';
		endif;
		echo '<div class="section-overlay-layer">';
		echo '<div class="container">';

		if ( ! empty( $llorix_one_lite_blog_header_title ) ) :
			echo '<p class="archive-top-big-title">' . $llorix_one_lite_blog_header_title . '</p>';
			echo '<p class="colored-line"></p>';
			endif;

		if ( ! empty( $llorix_one_lite_blog_header_subtitle ) ) :
			echo '<p class="archive-top-text">' . $llorix_one_lite_blog_header_subtitle . '</p>';
			endif;

		echo '</div>';
		echo '</div>';
		echo '</div>';

	endif;

?>


<div role="main" id="content" class="content-wrap">
	<div class="container">

		<div id="primary" class="content-area col-md-8 post-list">
			<main <?php if ( have_posts() ) { echo 'itemscope itemtype="http://schema.org/Blog"';} ?> id="main" class="site-main" role="main">

				<?php if ( have_posts() ) : ?>

					<header class="page-header">
						<?php
							the_archive_title( '<h1 class="page-title">', '</h1>' );
							the_archive_description( '<div class="taxonomy-description">', '</div>' );
						?>
					</header><!-- .page-header -->

					<?php /* Start the Loop */ ?>
					<?php while ( have_posts() ) : the_post(); ?>

						<?php

						/**
						 *  Include the Post-Format-specific template for the content.
						 *  If you want to override this in a child theme, then include a file
						 *  called content-___.php (where ___ is the Post Format name) and that will be used instead.
						 */
						get_template_part( 'content', get_post_format() ); ?>

					<?php endwhile; ?>

					<?php the_posts_navigation(); ?>

				<?php else : ?>

					<?php get_template_part( 'content', 'none' ); ?>

				<?php endif; ?>

			</main><!-- #main -->
		</div><!-- #primary -->

		<?php get_sidebar(); ?>

	</div>
</div><!-- .content-wrap -->

<?php get_footer(); ?>
