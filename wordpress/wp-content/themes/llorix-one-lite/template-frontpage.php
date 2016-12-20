<?php
/**
 * Template name: Frontpage
 *
 * @package llorix-one-lite
 */


	get_header();

?>

<!-- =========================
	PRE LOADER       
============================== -->
<?php

	global $wp_customize;

	if ( ! isset( $wp_customize ) ) :

	$llorix_one_lite_disable_preloader = get_theme_mod( 'llorix_one_lite_disable_preloader' );

	if ( isset( $llorix_one_lite_disable_preloader ) && ($llorix_one_lite_disable_preloader != 1) ) :

		echo '<div class="preloader">';
			echo '<div class="status">&nbsp;</div>';
		echo '</div>';

		endif;

	endif;

	llorix_one_lite_get_template_part( apply_filters( 'llorix_one_lite_header_layout','/sections/llorix_one_lite_header_section' ) );

?>
	</div>
	<!-- /END COLOR OVER IMAGE -->
</header>
<!-- /END HOME / HEADER  -->

<div itemprop id="content" class="content-wrap" role="main">

<?php

	$sections_array = apply_filters(
		'llorix_one_companion_sections_filter',
		array(
			'sections/llorix_one_lite_logos_section',
			'sections/llorix_one_lite_our_story_section',
			'sections/llorix_one_lite_ribbon_section',
			'sections/llorix_one_lite_latest_news_section',
			'sections/llorix_one_lite_contact_info_section',
			'sections/llorix_one_lite_map_section',
			)
		);

	if ( ! empty( $sections_array ) ) {
		foreach ( $sections_array as $section ) {
			llorix_one_lite_get_template_part( $section );
		}
	}
?>

</div><!-- .content-wrap -->

<?php

	get_footer();

?>
