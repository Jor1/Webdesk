<?php
/**
 * Getting started template
 */

$customizer_url = admin_url() . 'customize.php' ;
?>

<div id="getting_started" class="llorix-one-lite-tab-pane active">

	<div class="llorix-one-lite-tab-pane-center">

		<h1 class="llorix-one-welcome-title"><?php _e('Welcome to Llorix One Lite!','llorix-one-lite'); ?> <?php if( !empty($llorix_one['Version']) ): ?> <sup id="llorix-one-lite-theme-version"><?php echo esc_attr( $llorix_one['Version'] ); ?> </sup><?php endif; ?></h1>

		<p><?php esc_html_e( 'Our most elegant and professional one-page theme, which turns your scrolling into a smooth and pleasant experience.','llorix-one-lite'); ?></p>
		<p><?php esc_html_e( 'We want to make sure you have the best experience using Llorix One Lite and that is why we gathered here all the necessary informations for you. We hope you will enjoy using Llorix One Lite, as much as we enjoy creating great products.', 'llorix-one-lite' ); ?>

	</div>

	<hr />

	<div class="llorix-one-lite-tab-pane-center">

		<h1><?php esc_html_e( 'Getting started', 'llorix-one-lite' ); ?></h1>

		<h4><?php esc_html_e( 'Customize everything in a single place.' ,'llorix-one-lite' ); ?></h4>
		<p><?php esc_html_e( 'Using the WordPress Customizer you can easily customize every aspect of the theme.', 'llorix-one-lite' ); ?></p>
		<p><a href="<?php echo esc_url( $customizer_url ); ?>" class="button button-primary"><?php esc_html_e( 'Go to Customizer', 'llorix-one-lite' ); ?></a></p>

	</div>

	<hr />

	<div class="llorix-one-lite-tab-pane-center">

		<h1><?php esc_html_e( 'FAQ', 'llorix-one-lite' ); ?></h1>

	</div>

	<div class="llorix-one-lite-tab-pane-half llorix-one-lite-tab-pane-first-half">

		<h4><?php esc_html_e( 'Create a child theme', 'llorix-one-lite' ); ?></h4>
		<p><?php esc_html_e( 'If you want to make changes to the theme\'s files, those changes are likely to be overwritten when you next update the theme. In order to prevent that from happening, you need to create a child theme. For this, please follow the documentation below.', 'llorix-one-lite' ); ?></p>
		<p><a href="http://docs.themeisle.com/article/14-how-to-create-a-child-theme/" class="button"><?php esc_html_e( 'View how to do this', 'llorix-one-lite' ); ?></a></p>

		<hr />
		
		<h4><?php esc_html_e( 'How to Internationalize Your Website', 'llorix-one-lite' ); ?></h4>
		<p><?php esc_html_e( 'Although English is the most used language on the internet, you should consider all your web users as well. Find out what it takes to make your website ready for foreign markets from this document.', 'llorix-one-lite' ); ?></p>
		<p><a href="http://docs.themeisle.com/article/80-how-to-translate-zerif" class="button"><?php esc_html_e( 'View how to do this', 'llorix-one-lite' ); ?></a></p>

		<hr />

		<h4><?php esc_html_e( 'Build a landing page with a drag-and-drop content builder', 'llorix-one-lite' ); ?></h4>
		<p><?php esc_html_e( 'In the below documentation you will find an easy way to build a great looking landing page using a drag-and-drop content builder plugin.', 'llorix-one-lite' ); ?></p>
		<p><a href="http://docs.themeisle.com/article/219-how-to-build-a-landing-page-with-a-drag-and-drop-content-builder" class="button"><?php esc_html_e( 'View how to do this', 'llorix-one-lite' ); ?></a></p>

	</div>

	<div class="llorix-one-lite-tab-pane-half">

		<h4><?php esc_html_e( 'Speed up your site', 'llorix-one-lite' ); ?></h4>
		<p><?php esc_html_e( 'If you find yourself in the situation where everything on your site is running very slow, you might consider having a look at the below documentation where you will find the most common issues causing this and possible solutions for each of the issues.', 'llorix-one-lite' ); ?></p>
		<p><a href="http://docs.themeisle.com/article/63-speed-up-your-wordpress-site/" class="button"><?php esc_html_e( 'View how to do this', 'llorix-one-lite' ); ?></a></p>

		<hr />

		<h4><?php esc_html_e( 'Link Menu to sections', 'llorix-one-lite' ); ?></h4>
		<p><?php esc_html_e( 'Linking the frontpage sections with the top menu is very simple, all you need to do is assign section anchors to the menu. In the below documentation you will find a nice tutorial about this.', 'llorix-one-lite' ); ?></p>
		<p><a href="http://docs.themeisle.com/article/59-how-to-link-menu-to-sections-in-parallax-one" class="button"><?php esc_html_e( 'View how to do this', 'llorix-one-lite' ); ?></a></p>

		<hr />

		<h4><?php esc_html_e( 'Change anchors', 'llorix-one-lite' ); ?></h4>
		<p><?php esc_html_e( 'To better suit your site\'s needs, you can change each section\'s anchor to what you want. The entire process is described below.', 'llorix-one-lite' ); ?></p>
		<p><a href="http://docs.themeisle.com/article/72-parallax-one-how-to-change-section-anchor" class="button"><?php esc_html_e( 'View how to do this', 'llorix-one-lite' ); ?></a></p>
		
	</div>

	<div class="llorix-one-lite-clear"></div>

	<hr />

	<div class="llorix-one-lite-tab-pane-center">

		<h1><?php esc_html_e( 'View full documentation', 'llorix-one-lite' ); ?></h1>
		<p><?php esc_html_e( 'Need more details? Please check our full documentation for detailed information on how to use Llorix One.', 'llorix-one-lite' ); ?></p>
		<p><a href="http://themeisle.com/documentation-llorix-one/" class="button button-primary"><?php esc_html_e( 'Read full documentation', 'llorix-one-lite' ); ?></a></p>

	</div>

	<hr />

	<div class="llorix-one-lite-tab-pane-center">
		<h1><?php esc_html_e( 'Recommended plugins', 'llorix-one-lite' ); ?></h1>
	</div>

	<div class="llorix-one-lite-tab-pane-half llorix-one-lite-tab-pane-first-half">
	
		<!-- Llorix One Companion -->
		<h4><?php esc_html_e( 'Llorix One Companion', 'llorix-one-lite' ); ?></h4>
		<p><?php esc_html_e( 'The Llorix One Companion plugin is a simple, easy and in the same time quite powerful plugins that adds options for Our Services, Our Team and Testimonials sections on frontpage.', 'llorix-one-lite' ); ?></p>

		<?php if ( is_plugin_active( 'llorix-one-companion/llorix-one-companion.php' ) ) { ?>

				<p><span class="llorix-one-lite-w-activated button"><?php esc_html_e( 'Already activated', 'llorix-one-lite' ); ?></span></p>

			<?php
		}
		else { ?>

				<p><a href="<?php echo esc_url( wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=llorix-one-companion' ), 'install-plugin_llorix-one-companion' ) ); ?>" class="button button-primary"><?php esc_html_e( 'Install Llorix One Companion', 'llorix-one-lite' ); ?></a></p>

			<?php
		}

		?>
		<hr />
		<!-- Pirate Forms -->
		<h4><?php esc_html_e( 'Pirate Forms', 'llorix-one-lite' ); ?></h4>
		<p><?php esc_html_e( 'Makes your contact page more engaging by creating a good-looking contact form on your website. The interaction with your visitors was never easier.', 'llorix-one-lite' ); ?></p>

		<?php if ( is_plugin_active( 'pirate-forms/pirate-forms.php' ) ) { ?>

				<p><span class="llorix-one-lite-w-activated button"><?php esc_html_e( 'Already activated', 'llorix-one-lite' ); ?></span></p>

			<?php
		}
		else { ?>

				<p><a href="<?php echo esc_url( wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=pirate-forms' ), 'install-plugin_pirate-forms' ) ); ?>" class="button button-primary"><?php esc_html_e( 'Install Pirate Forms', 'llorix-one-lite' ); ?></a></p>

			<?php
		}

		?>
		<hr />
		<!-- ECPT -->
		<h4><?php esc_html_e( 'Easy Content Types', 'llorix-one-lite' ); ?></h4>
		<p><?php esc_html_e( 'Custom Post Types, Taxonomies and Metaboxes in Minutes', 'llorix-one-lite' ); ?></p>

		<?php if ( is_plugin_active( 'easy-content-types/easy-content-types.php' ) ) { ?>

				<p><span class="llorix-one-lite-w-activated button"><?php esc_html_e( 'Already activated', 'llorix-one-lite' ); ?></span></p>

			<?php
		}
		else { ?>

				<p><a href="<?php echo esc_url( 'http://themeisle.com/plugins/easy-content-types/' ); ?>" class="button button-primary"><?php esc_html_e( 'Download Easy Content Types', 'llorix-one-lite' ); ?></a></p>

			<?php
		}

		?>
		<hr />




	</div>


	
	<div class="llorix-one-lite-tab-pane-half">
	
		<!-- Page Builder by SiteOrigin -->
		<h4><?php esc_html_e( 'Page Builder by SiteOrigin', 'llorix-one-lite' ); ?></h4>
		<p><?php esc_html_e( 'Build responsive page layouts using the widgets you know and love using this simple drag and drop page builder.', 'llorix-one-lite' ); ?></p>
 
 		<?php if ( is_plugin_active( 'siteorigin-panels/siteorigin-panels.php' ) ) { ?>
 
 				<p><span class="llorix-one-lite-w-activated button"><?php esc_html_e( 'Already activated', 'llorix-one-lite' ); ?></span></p>
 
 			<?php
 		}
 		else { ?>
 
 				<p><a href="<?php echo esc_url( wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=siteorigin-panels' ), 'install-plugin_siteorigin-panels' ) ); ?>" class="button button-primary"><?php esc_html_e( 'Install Page Builder by SiteOrigin', 'llorix-one-lite' ); ?></a></p>
 
 			<?php
 		}
 
 		?>
		<hr />
		<!-- Intergeo Maps -->
		<h4><?php esc_html_e( 'Intergeo Maps - Google Maps Plugin', 'llorix-one-lite' ); ?></h4>
		<p><?php esc_html_e( 'The Intergeo Google Maps plugin is a simple, easy and in the same time quite powerful tool for handling Google Maps in your website. The plugin allows users to create new maps by using powerful UI builder.', 'llorix-one-lite' ); ?></p>

		<?php if ( is_plugin_active( 'intergeo-maps/index.php' ) ) { ?>

				<p><span class="llorix-one-lite-w-activated button"><?php esc_html_e( 'Already activated', 'llorix-one-lite' ); ?></span></p>

			<?php
		}
		else { ?>

				<p><a href="<?php echo esc_url( wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=intergeo-maps' ), 'install-plugin_intergeo-maps' ) ); ?>" class="button button-primary"><?php esc_html_e( 'Install Intergeo Maps', 'llorix-one-lite' ); ?></a></p>

			<?php
		}

		?>
		
		<hr />
		<!-- FEEDZY RSS Feeds -->
		<h4>FEEDZY RSS Feeds</h4>

		<?php if ( is_plugin_active( 'feedzy-rss-feeds/feedzy-rss-feed.php' ) ) { ?>

				<p><span class="llorix-one-lite-w-activated button"><?php esc_html_e( 'Already activated', 'llorix-one-lite' ); ?></span></p>

			<?php
		}
		else { ?>

				<p><a href="<?php echo esc_url( wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=feedzy-rss-feeds' ), 'install-plugin_feedzy-rss-feeds' ) ); ?>" class="button button-primary"><?php esc_html_e( 'Install', 'llorix-one-lite'); ?> FEEDZY RSS Feeds</a></p>

			<?php
		}
		?>

		<hr />

		<!-- Adblock Notify -->
		<h4>Adblock Notify</h4>

		<?php if ( is_plugin_active( 'adblock-notify-by-bweb/adblock-notify.php' ) ) { ?>

				<p><span class="parallax-one-w-activated button"><?php esc_html_e( 'Already activated', 'llorix-one-lite' ); ?></span></p>

			<?php
		}
		else { ?>

				<p><a href="<?php echo esc_url( wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=adblock-notify-by-bweb' ), 'install-plugin_adblock-notify-by-bweb' ) ); ?>" class="button button-primary"><?php esc_html_e( 'Install', 'llorix-one-lite' ); ?> Adblock Notify</a></p>

			<?php
		}
		?>


		<hr />

	</div>

	<div class="llorix-one-lite-clear"></div>

</div>
