<?php
/**
 * Template Name: Eventbrite Events
 *
 * @package llorix-one-lite
 */

get_header(); ?>

	</div>
	<!-- /END COLOR OVER IMAGE -->
</header>
<!-- /END HOME / HEADER  -->

<div role="main" id="content" class="content-wrap">
	<div class="container">

		<div id="primary" class="content-area col-md-8">
			<main id="main" class="site-main" role="main">

					<?php
					// Set up and call our Eventbrite query.
					$events = new Eventbrite_Query( apply_filters( 'eventbrite_query_args', array(
						// 'display_private' => false, // boolean
						// 'nopaging' => false,        // boolean
						// 'limit' => null,            // integer
						// 'organizer_id' => null,     // integer
						// 'p' => null,                // integer
						// 'post__not_in' => null,     // array of integers
						// 'venue_id' => null,         // integer
						// 'category_id' => null,      // integer
						// 'subcategory_id' => null,   // integer
						// 'format_id' => null,        // integer
					) ) );

					if ( $events->have_posts() ) :
						while ( $events->have_posts() ) : $events->the_post();
						?>
							<article id="event-<?php the_ID(); ?>" <?php post_class(); ?>>
								<header class="entry-header">
									<?php the_post_thumbnail(); ?>

									<?php the_title( sprintf( '<h1 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h1>' ); ?>

									<div class="entry-meta">
										<?php eventbrite_event_meta(); ?>
									</div><!-- .entry-meta -->
								</header><!-- .entry-header -->

								<div class="entry-content">
									<?php eventbrite_ticket_form_widget(); ?>
								</div><!-- .entry-content -->

								<footer class="entry-footer">
									<?php eventbrite_edit_post_link( __( 'Edit', 'llorix-one-lite' ), '<span class="edit-link">', '</span>' ); ?>
								</footer><!-- .entry-footer -->
							</article><!-- #post-## -->

					<?php endwhile; ?>

					<?php // Previous/next post navigation.
					eventbrite_paging_nav( $events ); ?>

				<?php else : ?>

					<?php get_template_part( 'content', 'none' ); ?>

				<?php endif;
				// Return $post to its rightful owner.
				wp_reset_postdata();
				?>

			</main><!-- #main -->
		</div><!-- #primary -->

		<?php get_sidebar(); ?>

	</div>
</div><!-- .content-wrap -->

<?php get_footer(); ?>
