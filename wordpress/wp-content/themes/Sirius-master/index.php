<?php get_header(); ?>
 <div id="main">
    <?php $site_banner = sirius_option('background_image');?>
    <?php if ( !empty( $site_banner ) ) {?>
    <div id="banner" style="background-image: url(<?php echo sirius_option('background_image'); ?>);"></div> 
    <?php } ?>
        <section>
            <div class="container">
                <div class="features">
            <?php
                if(is_home()){
                }elseif(is_category()){
            ?>
                 <div>
                    <h1>分类目录：<?php echo single_cat_title('', false); ?></h1>
                </div>              
            <?php
                }elseif(is_date()){
            ?>  
            <?php
                }elseif(is_tag()){
            ?>
                <div>
                    <h1>标签目录：<?php echo single_cat_title('', false); ?></h1>
                </div>
            <?php
                }elseif(is_search()){
            ?>
                 <div>
                    <h1>搜索结果：<?php the_search_query(); ?></h1>
                </div>              
            <?php
                }
            ?>
            <?php
                if ( have_posts() ) {
                    while ( have_posts() ){
                        the_post();
                        get_template_part('content', get_post_format());
                    }
                }else{
            ?>
            <div>
                    <h1>很抱歉，没有找到任何内容。</h1>
            </div>
            <?php } ?>
                <?php sirius_pages(3);?>
                <?php wp_reset_query(); ?>
                </div>
            </div>
        </section>
    </div>
<?php get_footer(); ?>