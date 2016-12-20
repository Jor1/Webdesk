<?php
/**
 * About template file
 *
 * PHP version 5.6
 *
 * @category    Sections
 * @package     Llorix_One_Lite
 * @author      Themeisle <cristian@themeisle.com>
 * @license     GNU General Public License v2 or later
 * @link        http://themeisle.com
 */

$llorix_one_lite_our_story_image = get_theme_mod( 'llorix_one_lite_our_story_image', llorix_one_lite_get_file( '/images/about-us.png' ) );
$llorix_one_lite_our_story_title = get_theme_mod( 'llorix_one_lite_our_story_title', esc_html__( 'Our Story','llorix-one-lite' ) );
$llorix_one_lite_our_story_text = get_theme_mod( 'llorix_one_lite_our_story_text', esc_html__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.','llorix-one-lite' ) );
$llorix_one_lite_our_story_show = get_theme_mod( 'llorix_one_lite_our_story_show' );

/* If section is not disabled */
if ( isset( $llorix_one_lite_our_story_show ) && $llorix_one_lite_our_story_show != 1 ) { ?>
	<section class="brief text-left brief-design-one brief-left" id="story" role="region" aria-label="<?php esc_html_e( 'About','llorix-one-lite' ) ?>">
	<?php
} else {
	if ( is_customize_preview() ) {  ?>
		<section class="brief text-left brief-design-one brief-left llorix_one_lite_only_customizer" id="story" role="region" aria-label="<?php esc_html_e( 'About','llorix-one-lite' ) ?>">
		<?php
	}
}
if ( (isset( $llorix_one_lite_our_story_show ) && $llorix_one_lite_our_story_show != 1) || is_customize_preview() ) {  ?>
		<div class="section-overlay-layer">
			<div class="container">
				<div class="row">
					<?php
					if ( ! empty( $llorix_one_lite_our_story_image ) ) { ?>
						<div class="col-md-6 brief-content-two">
						<?php
					} else {
						if ( is_customize_preview() ) { ?>
							<div class="col-md-6 brief-content-two llorix_one_lite_only_customizer">
						<?php
						}
					}
					if ( ! empty( $llorix_one_lite_our_story_image ) || is_customize_preview() ) {  ?>
							<div class="brief-image-right">
								<img src="<?php echo esc_url( $llorix_one_lite_our_story_image ); ?>" <?php if ( ! empty( $llorix_one_lite_our_story_title ) ) {
									echo 'alt="' . esc_attr( $llorix_one_lite_our_story_title ) . '"'; } ?> ">
							</div>
						</div>
					<?php
					} ?>

					<div class="<?php if ( ! empty( $llorix_one_lite_our_story_image ) ) {  echo 'col-md-6'; } else { echo 'col-md-12'; } ?> content-section brief-content-one">
						<?php
						if ( ! empty( $llorix_one_lite_our_story_title ) ) { ?>
							<h2 class="text-left dark-text">
								<?php echo wp_kses_post( $llorix_one_lite_our_story_title ); ?>
							</h2>
							<div class="colored-line-left"></div>
							<?php
						} else {
							if ( is_customize_preview() ) { ?>
								<h2 class="text-left dark-text llorix_one_lite_only_customizer"></h2>
								<div class="colored-line-left llorix_one_lite_only_customizer"></div>
								<?php
							}
						}

						if ( ! empty( $llorix_one_lite_our_story_text ) ) { ?>
							<div class="brief-content-text">
								<?php
								echo wp_kses_post( $llorix_one_lite_our_story_text ); ?>
							</div>
							<?php
						} else {
							if ( is_customize_preview() ) {  ?>
								<div class="brief-content-text llorix_one_lite_only_customizer"></div>
								<?php
							}
						} ?>
					</div>
				</div>
			</div>
		</div>
	</section><!-- .brief-design-one -->
	<?php
}
