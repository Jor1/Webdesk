<?php get_header(); ?>
<div id="main">
    <?php $site_banner = sirius_option('background_image');?>
    <?php if ( !empty( $site_banner ) ) {?>
    <div id="banner" style="background-image: url(<?php echo sirius_option('background_image'); ?>);"></div> 
    <?php } ?>
        <section>
            <div class="container">
				<?php if (have_posts()) : the_post(); update_post_caches($posts);
				?>
                <header class="post-header">
                    <h1 class="post-title text-center"><?php the_title(); ?></h1>
                    <div class="post-meta text-center">
                        <span>
                        <a href="#"><i class="fa fa-calendar"></i> <?php the_time('Y/n/j') ?></a>
                        <?php comments_popup_link('<i class="fa fa-commenting-o"></i> 0 Comment', '<i class="fa fa-commenting-o"></i> 1 Comment', '<i class="fa fa-commenting-o"></i> % Comment', '', '<i class="fa fa-commenting-o"></i> 0 Comment'); ?>
                        <a href="<?php the_permalink() ?>"><i class="fa fa-eye"></i> <?php echo sirius_get_post_views();?> View</a>
                        <a href="<?php the_permalink() ?>"><i class="fa fa-thumbs-o-up"></i> <?php if( get_post_meta($post->ID,'sirius_love',true) ){ echo get_post_meta($post->ID,'sirius_love',true); } else { echo '0'; }?> Times</a>
                        <?php if( current_user_can( 'manage_options' ) ) {?>
                        <?php edit_post_link('<i class="fa fa-pencil"></i> Edit'); ?>
                        <?php }?>
                        </span>
                    </div>
                </header>
                <div class="post-content"><?php the_content(); ?></div>
				<?php endif; ?>
                <div class="post-like-donate">
                    <?php switch (sirius_option('post_like_donate')) {case '0':?>
                    <a href="<?php echo sirius_option('donate_links'); ?>" class="KratosDonate"><i class="fa fa-bitcoin"></i> 打赏</a>
                    <a href="javascript:;" data-action="love" data-id="<?php the_ID(); ?>" class="SiriusLove <?php if(isset($_COOKIE['sirius_love_'.$post->ID])) echo 'done';?>" >
                        <i class="fa fa-thumbs-o-up"></i> 点赞</a>
                    <?php ;break;case '1':?>
                    <a href="javascript:;" data-action="love" data-id="<?php the_ID(); ?>" class="SiriusLove <?php if(isset($_COOKIE['sirius_love_'.$post->ID])) echo 'done';?>" >
                        <i class="fa fa-thumbs-o-up"></i> 点赞</a>
                    <?php default:break;}?>
                </div>
                <?php switch (sirius_option('post_cc')) {case '0':?>
                    <div class="post-copyright">
                        <img alt="知识共享许可协议" src="<?php echo get_template_directory_uri(); ?>/images/licenses.png">
                        <h5>本作品采用 <a rel="license nofollow" target="_blank" href="http://creativecommons.org/licenses/by-sa/4.0/">知识共享署名-相同方式共享 4.0 国际许可协议</a> 进行许可</h5>
                    </div>
                <?php ;break;default:break;}?>
                <h4 class="comment-reply-list">评论列表</h4>
                <?php comments_template(); ?>
            </div>
        </section>
</div>
<?php get_footer(); ?>