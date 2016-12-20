<?php
/**
 * Ribbon template file
 *
 * PHP version 5.6
 *
 * @category    Sections
 * @package     Llorix_One_Lite
 * @author      Themeisle <cristian@themeisle.com>
 * @license     GNU General Public License v2 or later
 * @link        http://themeisle.com
 */

	global $wp_customize;
	$ribbon_background = get_theme_mod( 'llorix_one_lite_ribbon_background', llorix_one_lite_get_file( '/images/background-images/parallax-img/parallax-img1.jpg' ) );
	$llorix_one_lite_ribbon_title = get_theme_mod( 'llorix_one_lite_ribbon_title',esc_html__( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.','llorix-one-lite' ) );
	$llorix_one_lite_button_text = get_theme_mod( 'llorix_one_lite_button_text',esc_html__( 'GET STARTED','llorix-one-lite' ) );
	$llorix_one_lite_button_link = get_theme_mod( 'llorix_one_lite_button_link','#' );

	$llorix_one_lite_ribbon_show = get_theme_mod( 'llorix_one_lite_ribbon_show' );

	/* If section is not disabled */
	if ( isset( $llorix_one_lite_ribbon_show ) && $llorix_one_lite_ribbon_show != 1 ) {

	if ( ! empty( $llorix_one_lite_ribbon_title ) || ! empty( $llorix_one_lite_button_text ) ) {

		if ( ! empty( $ribbon_background ) ) {
			echo '<section class="call-to-action ribbon-wrap" id="ribbon" style="background-image:url(' . $ribbon_background . ');" role="region" aria-label="' . esc_html__( 'Ribbon','llorix-one-lite' ) . '">';
			} else {
			echo '<section class="call-to-action ribbon-wrap" id="ribbon" role="region" aria-label="' . esc_html__( 'Ribbon','llorix-one-lite' ) . '">';
			}

	?>
		<div class="section-overlay-layer">
			<div class="container">
				<div class="row">
					<div class="col-md-8 col-md-offset-2">

						<?php
							if ( ! empty( $llorix_one_lite_ribbon_title ) ) {
							echo '<h2 class="white-text strong">' . esc_attr( $llorix_one_lite_ribbon_title ) . '</h2>';
							} elseif ( isset( $wp_customize )   ) {
							echo '<h2 class="white-text strong llorix_one_lite_only_customizer"></h2>';
							}

							if ( ! empty( $llorix_one_lite_button_text ) ) {
							if ( empty( $llorix_one_lite_button_link ) ) {
								echo '<button class="btn btn-primary standard-button llorix_one_lite_only_customizer" type="button" data-toggle="modal" data-target="#stamp-modal"><span class="screen-reader-text">' . esc_html__( 'Ribbon button label:','llorix-one-lite' ) . $llorix_one_lite_button_text . '</span>' . $llorix_one_lite_button_text . '</button>';
							} else {
								echo '<button onclick="window.location=\'' . esc_url( $llorix_one_lite_button_link ) . '\'" class="btn btn-primary standard-button" type="button" data-toggle="modal" data-target="#stamp-modal"><span class="screen-reader-text">' . esc_html__( 'Ribbon button label:','llorix-one-lite' ) . $llorix_one_lite_button_text . '</span>' . esc_attr( $llorix_one_lite_button_text ) . '</button>';
							}
							} elseif ( isset( $wp_customize ) ) {
							echo '<button class="btn btn-primary standard-button llorix_one_lite_only_customizer" type="button" data-toggle="modal" data-target="#stamp-modal"></button>';
							}
						?>

						</div>
					</div>
				</div>
			</div>
		</section>
		
	<?php
	}
	/* If section is disabled, but we are in Customize, display section with class llorix_one_lite_only_customizer */
	} elseif ( isset( $wp_customize ) ) {
	if ( ! empty( $ribbon_background ) ) {
		echo '<section class="call-to-action ribbon-wrap llorix_one_lite_only_customizer" id="ribbon" style="background-image:url(' . $ribbon_background . ');" role="region" aria-label="' . esc_html__( 'Ribbon','llorix-one-lite' ) . '">';
		} else {
		echo '<section class="call-to-action ribbon-wrap llorix_one_lite_only_customizer" id="ribbon" role="region" aria-label="' . esc_html__( 'Ribbon','llorix-one-lite' ) . '">';
		}
?>
<div class="section-overlay-layer">
<div class="container">
<div class="row">
<div class="col-md-8 col-md-offset-2">

<?php
if ( ! empty( $llorix_one_lite_ribbon_title ) ) {
	echo '<h2 class="white-text strong">' . esc_attr( $llorix_one_lite_ribbon_title ) . '</h2>';
	} elseif ( isset( $wp_customize )   ) {
	echo '<h2 class="white-text strong llorix_one_lite_only_customizer"></h2>';
	}

if ( ! empty( $llorix_one_lite_button_text ) ) {
	if ( empty( $llorix_one_lite_button_link ) ) {
					echo '<button class="btn btn-primary standard-button llorix_one_lite_only_customizer" type="button" data-toggle="modal" data-target="#stamp-modal"><span class="screen-reader-text">' . esc_html__( 'Ribbon button label:','llorix-one-lite' ) . $llorix_one_lite_button_text . '</span>' . $llorix_one_lite_button_text . '</button>';
	} else {
	echo '<button onclick="window.location=\'' . esc_url( $llorix_one_lite_button_link ) . '\'" class="btn btn-primary standard-button" type="button" data-toggle="modal" data-target="#stamp-modal"><span class="screen-reader-text">' . esc_html__( 'Ribbon button label:','llorix-one-lite' ) . $llorix_one_lite_button_text . '</span>' . esc_attr( $llorix_one_lite_button_text ) . '</button>';
	}
	} elseif ( isset( $wp_customize ) ) {
	echo '<button class="btn btn-primary standard-button llorix_one_lite_only_customizer" type="button" data-toggle="modal" data-target="#stamp-modal"></button>';
	}
?>

</div>
</div>
</div>
</div>
</section>
<?php
	}
?>
