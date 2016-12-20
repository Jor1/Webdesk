<?php
/**
 * Logos template file
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

	$llorix_one_lite_logos_show = get_theme_mod( 'llorix_one_lite_logos_show' );

	$llorix_one_lite_logos = get_theme_mod('llorix_one_lite_logos_content',
		json_encode(
			array(
				array( 'image_url' => llorix_one_lite_get_file( '/images/companies/1.png' ) ,'link' => '#','id' => 'llorix_one_lite_56d069bb8cb71' ),
				array( 'image_url' => llorix_one_lite_get_file( '/images/companies/2.png' ) ,'link' => '#','id' => 'llorix_one_lite_56d069bc8cb72' ),
				array( 'image_url' => llorix_one_lite_get_file( '/images/companies/3.png' ) ,'link' => '#','id' => 'llorix_one_lite_56d069bd8cb73' ),
				array( 'image_url' => llorix_one_lite_get_file( '/images/companies/4.png' ) ,'link' => '#','id' => 'llorix_one_lite_56d06d128cb74' ),
				array( 'image_url' => llorix_one_lite_get_file( '/images/companies/5.png' ) ,'link' => '#','id' => 'llorix_one_lite_56d06d3d8cb75' ),
			)
		)
	);
	/* If section is not disabled */
	if ( isset( $llorix_one_lite_logos_show ) && $llorix_one_lite_logos_show != 1 ) {

		if ( ! empty( $llorix_one_lite_logos ) ) {
			$llorix_one_lite_logos_decoded = json_decode( $llorix_one_lite_logos );
			if ( ! empty( $llorix_one_lite_logos_decoded ) ) {
				echo '<div class="clients white-bg" id="clients" role="region" aria-label="' . __( 'Affiliates Logos','llorix-one-lite' ) . '">';
					echo '<div class="container">';
						echo '<ul class="client-logos">';

						foreach ( $llorix_one_lite_logos_decoded as $llorix_one_lite_logo ) {
					if ( ! empty( $llorix_one_lite_logo->image_url ) ) {

						echo '<li>';
						if ( ! empty( $llorix_one_lite_logo->link ) ) {
							if ( function_exists( 'icl_t' ) ) {
								echo '<a href="' . esc_url( icl_t( 'Logo link',$llorix_one_lite_logo->id . '_logo_link', $llorix_one_lite_logo->link ) ) . '" title="">';
									echo '<img src="' . esc_url( icl_t( 'Logo image',$llorix_one_lite_logo->id . '_logo_image', $llorix_one_lite_logo->image_url ) ) . '" alt="' . esc_html__( 'Logo','llorix-one-lite' ) . '">';
								echo '</a>';
							} else {
								echo '<a href="' . $llorix_one_lite_logo->link . '" title="">';
									echo '<img src="' . $llorix_one_lite_logo->image_url . '" alt="' . esc_html__( 'Logo','llorix-one-lite' ) . '">';
								echo '</a>';
							}
						} else {
							if ( function_exists( 'icl_t' ) ) {
								echo '<img src="' . esc_url( icl_t( 'Logo image',$llorix_one_lite_logo->id . '_logo_image', $llorix_one_lite_logo->image_url ) ) . '" alt="' . esc_html__( 'Logo','llorix-one-lite' ) . '">';
							} else {
								echo '<img src="' . esc_url( $llorix_one_lite_logo->image_url ) . '" alt="' . esc_html__( 'Logo','llorix-one-lite' ) . '">';
							}
						}
						echo '</li>';

					}
						}
						echo '</ul>';
					echo '</div>';
				echo '</div>';
			}
		}
	/* If section is disabled, but we are in Customize, display section with class llorix_one_lite_only_customizer */
	} elseif ( isset( $wp_customize ) ) {
		if ( ! empty( $llorix_one_lite_logos ) ) {
			$llorix_one_lite_logos_decoded = json_decode( $llorix_one_lite_logos );
			if ( ! empty( $llorix_one_lite_logos_decoded ) ) {
				echo '<div class="clients white-bg llorix_one_lite_only_customizer" id="clients" role="region" aria-label="' . __( 'Affiliates Logos','llorix-one-lite' ) . '">';
					echo '<div class="container">';
						echo '<ul class="client-logos">';

						foreach ( $llorix_one_lite_logos_decoded as $llorix_one_lite_logo ) {
					if ( ! empty( $llorix_one_lite_logo->image_url ) ) {

						echo '<li>';
						if ( ! empty( $llorix_one_lite_logo->link ) ) {
							if ( function_exists( 'icl_t' ) ) {
								echo '<a href="' . esc_url( icl_t( 'Logo link',$llorix_one_lite_logo->id . '_logo_link', $llorix_one_lite_logo->link ) ) . '" title="">';
									echo '<img src="' . esc_url( icl_t( 'Logo image',$llorix_one_lite_logo->id . '_logo_image', $llorix_one_lite_logo->image_url ) ) . '" alt="' . esc_html__( 'Logo','llorix-one-lite' ) . '">';
								echo '</a>';
							} else {
								echo '<a href="' . $llorix_one_lite_logo->link . '" title="">';
									echo '<img src="' . $llorix_one_lite_logo->image_url . '" alt="' . esc_html__( 'Logo','llorix-one-lite' ) . '">';
								echo '</a>';
							}
						} else {
							if ( function_exists( 'icl_t' ) ) {
								echo '<img src="' . esc_url( icl_t( 'Logo image',$llorix_one_lite_logo->id . '_logo_image', $llorix_one_lite_logo->image_url ) ) . '" alt="' . esc_html__( 'Logo','llorix-one-lite' ) . '">';
							} else {
								echo '<img src="' . esc_url( $llorix_one_lite_logo->image_url ) . '" alt="' . esc_html__( 'Logo','llorix-one-lite' ) . '">';
							}
						}
						echo '</li>';

					}
						}
						echo '</ul>';
					echo '</div>';
				echo '</div>';
			}
		}
	}


