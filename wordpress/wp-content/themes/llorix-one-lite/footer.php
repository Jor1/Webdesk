<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package llorix-one-lite
 */
?>

	<footer itemscope itemtype="http://schema.org/WPFooter" id="footer" role="contentinfo" class = "footer grey-bg">

		<div class="container">
			<div class="footer-widget-wrap">
			
				<?php
					if ( is_active_sidebar( 'footer-area' ) ) {
				?>
				<div itemscope itemtype="http://schema.org/WPSideBar" role="complementary" id="sidebar-widgets-area-1" class="col-md-3 col-sm-6 col-xs-12 widget-box" aria-label="<?php esc_html_e( 'Widgets Area 1','llorix-one-lite' ); ?>">
				<?php
				dynamic_sidebar( 'footer-area' );
				?>
				</div>
				
				<?php
					}
					if ( is_active_sidebar( 'footer-area-2' ) ) {
				?>
				<div itemscope itemtype="http://schema.org/WPSideBar" role="complementary" id="sidebar-widgets-area-2" class="col-md-3 col-sm-6 col-xs-12 widget-box" aria-label="<?php esc_html_e( 'Widgets Area 2','llorix-one-lite' ); ?>">
				<?php
				dynamic_sidebar( 'footer-area-2' );
				?>
				</div>
				<?php
					}
					if ( is_active_sidebar( 'footer-area-3' ) ) {
				?>
				<div itemscope itemtype="http://schema.org/WPSideBar" role="complementary" id="sidebar-widgets-area-3" class="col-md-3 col-sm-6 col-xs-12 widget-box" aria-label="<?php esc_html_e( 'Widgets Area 3','llorix-one-lite' ); ?>">
			   <?php
				dynamic_sidebar( 'footer-area-3' );
				?>
				</div>
				<?php
					}
					if ( is_active_sidebar( 'footer-area-4' ) ) {
				?>
				<div itemscope itemtype="http://schema.org/WPSideBar" role="complementary" id="sidebar-widgets-area-4" class="col-md-3 col-sm-6 col-xs-12 widget-box" aria-label="<?php esc_html_e( 'Widgets Area 4','llorix-one-lite' ); ?>">
				<?php
				dynamic_sidebar( 'footer-area-4' );
				?>
				</div>
				<?php
					}
				?>

			</div><!-- .footer-widget-wrap -->

	        <div class="footer-bottom-wrap">
				<?php
					global $wp_customize;

					/* COPYRIGHT */
					$llorix_one_lite_copyright = get_theme_mod( 'llorix_one_lite_copyright','Themeisle' );

					if ( ! empty( $llorix_one_lite_copyright ) ) {
					echo '<span class="llorix_one_lite_copyright_content">' . esc_attr( $llorix_one_lite_copyright ) . '</span>';
					} elseif ( isset( $wp_customize )   ) {
					echo '<span class="llorix_one_lite_copyright_content llorix_one_lite_only_customizer"></span>';
					}

					/* OPTIONAL FOOTER LINKS */

					echo '<div itemscope role="navigation" itemtype="http://schema.org/SiteNavigationElement" id="menu-secondary" aria-label="' . esc_html__( 'Secondary Menu','llorix-one-lite' ) . '">';
						echo '<h1 class="screen-reader-text">' . esc_html__( 'Secondary Menu', 'llorix-one-lite' ) . '</h1>';
						wp_nav_menu(
							array(
								'theme_location'    => 'llorix_one_lite_footer_menu',
								'container'         => false,
								'menu_class'        => 'footer-links small-text',
								'depth' 			=> 1,
								'fallback_cb'       => false,
) );
					echo '</div>';
					/* SOCIAL ICONS */

					$llorix_one_lite_social_icons = get_theme_mod('llorix_one_lite_social_icons',
						json_encode(array(
								array( 'icon_value' => 'fa-facebook' , 'link' => '#', 'id' => 'llorix_one_lite_56d069b78cb6e' ),
								array( 'icon_value' => 'fa-twitter' , 'link' => '#', 'id' => 'llorix_one_lite_56d450842cb39' ),
								array( 'icon_value' => 'fa-google-plus-square' , 'link' => '#', 'id' => 'llorix_one_lite_56d450512cb38' ),
							)
						));

					if ( ! empty( $llorix_one_lite_social_icons ) ) {

							$llorix_one_lite_social_icons_decoded = json_decode( $llorix_one_lite_social_icons );

							if ( ! empty( $llorix_one_lite_social_icons_decoded ) ) {

								echo '<ul class="social-icons">';

								foreach ( $llorix_one_lite_social_icons_decoded as $llorix_one_lite_social_icon ) {
									if ( ! empty( $llorix_one_lite_social_icon->icon_value ) && ($llorix_one_lite_social_icon->icon_value != 'No Icon') ) {
										explode( '-',$llorix_one_lite_social_icon->icon_value );
										if ( ! empty( $llorix_one_lite_social_icon->icon_value[2] ) ) {
											if ( function_exists( 'icl_t' ) ) {
												echo '<li><a href="' . esc_url( icl_t( 'Footer Social Link',$llorix_one_lite_social_icon->id . '_footer_social_link', $llorix_one_lite_social_icon->link ) ) . '"><i class="fa llorix-one-lite-footer-icons ' . icl_t( 'Footer Social Icon',$llorix_one_lite_social_icon->id . '_footer_social_icon',esc_attr( $llorix_one_lite_social_icon->icon_value ) ) . ' transparent-text-dark" aria-hidden="true"></i><span class="screen-reader-text">' . esc_attr( $llorix_one_lite_social_icon->icon_value[2] ) . '</span></a></li>';
											} else {
												echo '<li><a href="' . esc_url( $llorix_one_lite_social_icon->link ) . '"><i class="fa llorix-one-lite-footer-icons ' . esc_attr( $llorix_one_lite_social_icon->icon_value ) . ' transparent-text-dark" aria-hidden="true"></i><span class="screen-reader-text">' . esc_attr( $llorix_one_lite_social_icon->icon_value[2] ) . '</span></a></li>';
											}
										}
									}
}

								echo '</ul>';

								}
					}
				?>
	            
	        </div><!-- .footer-bottom-wrap -->

	        <div class="powered-by">
	            <?php echo apply_filters( 'llorix_one_lite_powered_by',"<a class='' href='http://themeisle.com/themes/llorix-one/' rel='nofollow'>Llorix One Lite </a>" . esc_html__( 'powered by','llorix-one-lite' ) . "<a class='' href='http://wordpress.org/' rel='nofollow'>" . esc_html__( 'WordPress','llorix-one-lite' ) . '</a>' ); ?>
	        </div>

	    </div><!-- container -->

	</footer>

	<?php wp_footer(); ?>

</body>
</html>
