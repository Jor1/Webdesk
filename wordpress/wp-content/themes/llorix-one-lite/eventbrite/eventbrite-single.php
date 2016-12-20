<?php
/**
 * The Template for displaying all single Eventbrite events.
 *
 * @package llorix-one-lite
 */

get_header(); ?>

</div>
	<!-- /END COLOR OVER IMAGE -->
</header>
<!-- /END HOME / HEADER  -->

<div class="content-wrap">
	<div class="container">

		<div id="primary" class="content-area <?php if ( is_active_sidebar( 'sidebar-1' ) ) { echo 'col-md-8';} else { echo 'col-md-12';}  ?>">
			<main itemscope itemtype="http://schema.org/WebPageElement" itemprop="mainContentOfPage" id="main" class="site-main" role="main">

			<?php
				// Get our event based on the ID passed by query variable.
				$event = new Eventbrite_Query( array( 'p' => get_query_var( 'eventbrite_id' ) ) );

				if ( $event->have_posts() ) :
				while ( $event->have_posts() ) : $event->the_post(); ?>

					<article id="event-<?php the_ID(); ?>" <?php post_class(); ?>>
						<header class="entry-header">
							<?php the_post_thumbnail(); ?>

							<h1 class="entry-title"><?php the_title(); ?></h1>

							<div class="entry-meta">
								<?php eventbrite_event_meta(); ?>
							</div><!-- .entry-meta -->
						</header><!-- .entry-header -->

						<div class="entry-content">
							<?php the_content(); ?>

							<?php eventbrite_ticket_form_widget(); ?>
						</div><!-- .entry-content -->

						<footer class="entry-footer">
							<?php eventbrite_edit_post_link( __( 'Edit', 'llorix-one-lite' ), '<span class="edit-link">', '</span>' ); ?>
						</footer><!-- .entry-footer -->
					</article><!-- #post-## -->

			<?php endwhile; // end of the loop.
				else :
					// If no content, include the "No posts found" template.
					get_template_part( 'content', 'none' );
				endif;
				wp_reset_postdata();
			?>

			</main><!-- #main -->
		</div><!-- #primary -->

		<?php get_sidebar(); ?>

	</div>
</div><!-- .content-wrap -->

<?php get_footer(); ?>
