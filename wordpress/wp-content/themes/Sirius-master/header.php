<!DOCTYPE HTML>
<html>
    <head>
		<title><?php wp_title( '-', true, 'right' ); ?></title>
		<meta charset="<?php bloginfo('charset'); ?>">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<meta name="description" content="<?php sirius_description(); ?>" />
		<meta name="keywords" content="<?php sirius_keywords();?>" />
		<?php wp_head(); ?>
		<?php switch (sirius_option('site_bw')) {case '1':?>
			<style type="text/css">html{filter: grayscale(100%);-webkit-filter: grayscale(100%);-moz-filter: grayscale(100%);-ms-filter: grayscale(100%);-o-filter: grayscale(100%);filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);filter: gray;-webkit-filter: grayscale(1); }</style>
		<?php ;break;default:break;}?>
        <!--[if lte IE 8]><script src="<?php bloginfo('template_url'); ?>/js/ie/html5shiv.js"></script><![endif]-->
        <!--[if lte IE 8]><link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/ie8.css" /><![endif]-->
        <!--[if lte IE 8]><script src="<?php bloginfo('template_url'); ?>/js/ie/respond.min.js"></script><![endif]-->
    </head>
    	<?php flush(); ?>
<body>
    <section id="header">
        <header>
            <span class="image avatar"><a href="<?php echo get_option('home'); ?>/wp-admin/"><img src="<?php echo sirius_option('site_logo'); ?>" /></a></span>
            <h1 id="logo"><a href="<?php echo get_option('home'); ?>"><?php echo sirius_option('background_text1'); ?></a></h1>
            <p><?php echo sirius_option('background_text2'); ?></p>
        </header>
            <?php $defaults = array('theme_location' => 'header_menu', 'container' => 'nav', 'container_id' => 'nav' ); ?>
            <?php wp_nav_menu($defaults); ?>
        <span id="site-name"><a href="<?php echo get_option('home'); ?>"><?php bloginfo('name'); ?></a></span>
        <footer>
            <ul class="icons">
            <?php echo (!sirius_option('social_weibo')) ? '' : '<li><a target="_blank" rel="nofollow" href="' . sirius_option('social_weibo') . '" class="icon fa-weibo"><span class="label">Weibo</span></a></li>'; ?>
            <?php echo (!sirius_option('social_tweibo')) ? '' : '<li><a target="_blank" rel="nofollow" href="' . sirius_option('social_tweibo') . '" class="icon fa-tencent-weibo"><span class="label">Tweibo</span></a></li>'; ?>
            <?php echo (!sirius_option('social_twitter')) ? '' : '<li><a target="_blank" rel="nofollow" href="' . sirius_option('social_twitter') . '" class="icon fa-twitter"><span class="label">Twitter</span></a></li>'; ?>
            <?php echo (!sirius_option('social_facebook')) ? '' : '<li><a target="_blank" rel="nofollow" href="' . sirius_option('social_facebook') . '" class="icon fa-facebook-official"><span class="label">Facebook</span></a></li>'; ?>
            <?php echo (!sirius_option('social_linkedin')) ? '' : '<li><a target="_blank" rel="nofollow" href="' . sirius_option('social_linkedin') . '" class="icon fa-linkedin-square"><span class="label">Weibo</span></a></li>'; ?>
            <?php echo (!sirius_option('social_github')) ? '' : '<li><a target="_blank" rel="nofollow" href="' . sirius_option('social_github') . '" class="icon fa-github"><span class="label">Github</span></a></li>'; ?>
            <?php echo (!sirius_option('social_instagram')) ? '' : '<li><a target="_blank" rel="nofollow" href="' . sirius_option('social_instagram') . '" class="icon fa-instagram"><span class="label">Instagram</span></a></li>'; ?>
            </ul>
        </footer>
    </section>
        <div id="wrapper">
