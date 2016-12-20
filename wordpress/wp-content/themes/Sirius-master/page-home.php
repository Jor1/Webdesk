<?php
/*
Template Name: 主页模板
*/
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title><?php wp_title( '-', true, 'right' ); ?></title>
    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="<?php sirius_description(); ?>" />
    <meta name="keywords" content="<?php sirius_keywords();?>" />
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/css/main.css" />
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/css/font-awesome.css">
</head>

<body class="home-template">
    <span class="mobile btn-mobile-menu">
      <i class="fa fa-list btn-mobile-menu__social fa"></i>
      <i class="fa fa-angle-up btn-mobile-close__social fa hidden"></i>
    </span>
    <header class="panel-cover" id="topimg">
        <div class="panel-main">
            <div class="panel-main__inner panel-inverted">
                <div class="panel-main__content">
                <img src="<?php echo sirius_option('site_logo'); ?>" width="80" class="panel-cover__logo logo"  />
                    <h1 class="panel-cover__title panel-title"><?php echo sirius_option('background_text1'); ?></h1>
                    <span class="panel-cover__subtitle panel-subtitle"><?php echo sirius_option('background_text2'); ?></span>
                    <hr class="panel-cover__divider" />
                    <hr class="panel-cover__divider panel-cover__divider--secondary" />
                    <div class="navigation-wrapper">
                        <div>
                            <nav class="cover-navigation cover-navigation--primary">
                                <ul class="navigation">
                                    <?php echo (!sirius_option('menu-1-name')) ? '' : '<li class="navigation__item"><a target="_blank" rel="nofollow" href="' . sirius_option('menu-1-link') . '" class="blog-button">' . sirius_option('menu-1-name') . '</a></li>'; ?>
                                    <?php echo (!sirius_option('menu-2-name')) ? '' : '<li class="navigation__item"><a target="_blank" rel="nofollow" href="' . sirius_option('menu-2-link') . '" class="blog-button">' . sirius_option('menu-2-name') . '</a></li>'; ?>
                                    <?php echo (!sirius_option('menu-3-name')) ? '' : '<li class="navigation__item"><a target="_blank" rel="nofollow" href="' . sirius_option('menu-3-link') . '" class="blog-button">' . sirius_option('menu-3-name') . '</a></li>'; ?>
                                    <?php echo (!sirius_option('menu-4-name')) ? '' : '<li class="navigation__item"><a target="_blank" rel="nofollow" href="' . sirius_option('menu-4-link') . '" class="blog-button">' . sirius_option('menu-4-name') . '</a></li>'; ?>
                                </ul>
                            </nav>
                        </div>
                        <div>
                            <nav class="cover-navigation navigation--social">
                                <ul class="navigation">
                                    <?php echo (!sirius_option('social_weibo')) ? '' : '<li class="navigation__item"><a target="_blank" rel="nofollow" href="' . sirius_option('social_weibo') . '" class="social fa fa-weibo"><span class="label">Weibo</span></a></li>'; ?>
                                    <?php echo (!sirius_option('social_tweibo')) ? '' : '<li class="navigation__item"><a target="_blank" rel="nofollow" href="' . sirius_option('social_tweibo') . '" class="social fa fa-tencent-weibo"><span class="label">Tweibo</span></a></li>'; ?>
                                    <?php echo (!sirius_option('social_twitter')) ? '' : '<li class="navigation__item"><a target="_blank" rel="nofollow" href="' . sirius_option('social_twitter') . '" class="social fa fa-twitter"><span class="label">Twitter</span></a></li>'; ?>
                                    <?php echo (!sirius_option('social_facebook')) ? '' : '<li class="navigation__item"><a target="_blank" rel="nofollow" href="' . sirius_option('social_facebook') . '" class="social fa fa-facebook-official"><span class="label">Facebook</span></a></li>'; ?>
                                    <?php echo (!sirius_option('social_linkedin')) ? '' : '<li class="navigation__item"><a target="_blank" rel="nofollow" href="' . sirius_option('social_linkedin') . '" class="social fa fa-linkedin-square"><span class="label">Weibo</span></a></li>'; ?>
                                    <?php echo (!sirius_option('social_github')) ? '' : '<li class="navigation__item"><a target="_blank" rel="nofollow" href="' . sirius_option('social_github') . '" class="social fa fa-github"><span class="label">Github</span></a></li>'; ?>
                                    <?php echo (!sirius_option('social_instagram')) ? '' : '<li class="navigation__item"><a target="_blank" rel="nofollow" href="' . sirius_option('social_instagram') . '" class="social fa fa-instagram"><span class="label">Instagram</span></a></li>'; ?>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
    </header>
    <footer class="footer">
        <span class="footer__copyright">&copy; 2016 <a href="<?php echo get_option('home'); ?>"><?php bloginfo('name'); ?></a> All Rights Reserved.</span>
        <span class="footer__copyright"><?php echo get_option( 'zh_cn_l10n_icp_num' );?></span>
    </footer>
    <script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            var a = "url(<?php bloginfo('template_url'); ?>/images/bg-" + Math.floor(6 * Math.random() + 1) + ".jpg)";
            $("#topimg").css("background-image", a)
        });
    </script>
    </div>
    </div>
</body>

</html>