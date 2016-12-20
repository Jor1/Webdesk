<?php
/**
 * Child themes template
 */
?>
<div id="child_themes" class="llorix-one-lite-tab-pane">

    <?php
    $current_theme = wp_get_theme();
    ?>

    <div class="llorix-one-lite-tab-pane-center">

        <h1><?php echo 'Get a whole new look for your site'; ?></h1>

    </div>


    <div class="llorix-one-lite-tab-pane-half llorix-one-lite-tab-pane-first-half">

        <!-- Naturelle -->
        <div class="llorix-one-lite-child-theme-container">
            <div class="llorix-one-lite-child-theme-image-container">
                <img src="<?php echo esc_url( get_template_directory_uri() ) . '/inc/admin/welcome-screen/img/naturelle.png'; ?>" alt="" />
                <div class="llorix-one-lite-child-theme-description">
                    <h2><?php echo 'Naturelle'; ?></h2>
                </div>
            </div>
            <div class="llorix-one-lite-child-theme-details">
                <?php if ( 'Naturelle' != $current_theme['Name'] ) { ?>
                    <div class="theme-details">
                        <span class="theme-name">Naturelle</span>
                        <a href="http://themeisle.com/themes/naturelle" class="button button-primary install right"><?php echo 'Get now'; ?></a>
                        <a class="button button-secondary preview right" target="_blank" href="http://themeisle.com/demo/?theme=Naturelle"><?php echo 'Live Preview'; ?></a>
                        <div class="llorix-one-lite-clear"></div>
                    </div>
                <?php } else { ?>
                    <div class="theme-details active">
                        <span class="theme-name"><?php echo 'Naturelle - Current theme'; ?></span>
                        <a class="button button-secondary customize right" target="_blank" href="<?php echo get_site_url(). '/wp-admin/customize.php' ?>"><?php echo 'Customize'; ?></a>
                        <div class="llorix-one-lite-clear"></div>
                    </div>
                <?php } ?>
            </div>
        </div>

    </div>


</div>