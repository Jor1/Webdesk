<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Akina
 */

?>

	</div><!-- #content -->
	
	
	 <?php 
			if(akina_option('general_disqus_plugin_support')=='1'){
				get_template_part('layouts/duoshuo');
			}else{
				comments_template('', true); 
			}
	?>
			

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="site-info">
			<?php esc_attr_e('Copyright ©', 'akina'); ?> <?php esc_attr_e(date('Y')); ?> by Fuzzz <?php esc_attr_e('. All rights reserved.', 'akina'); ?>
			<span class="sep"> | </span>
			<!-- ！！！！！！！！！！！！请尊重作者，此主题免费，请不要修改版权，谢谢 -->
			<?php printf( esc_html__( 'Theme: %1$s by %2$s.', 'akina' ), 'Akina', '<a href="http://www.akina.pw" rel="designer">Fuzzz</a>' ); ?>
			<div class="footertext">
			<p><?php echo akina_option('footer_info', ''); ?></p>
			</div>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<a href="#" class="cd-top"></a>

    <!-- search start -->
	  <form class="js-search search-form search-form--modal" method="get" action="<?php echo home_url(); ?>" role="search">
		<div class="search-form__inner">
			<div>
				<p class="micro mb-"><?php _e('你想搜索什么...', 'akina') ?></p>
				<i class="iconfont">&#xe603;</i>
				<input class="text-input" type="search" name="s" placeholder="<?php _e('搜索...', 'akina') ?>">
			</div>
		</div>
	</form>
	<!-- search end -->
	
	<div id="loading">
	  <div id="loading-center">
	    <div id="loading-center-absolute">
	      <div class="object" id="object_one"></div>
	      <div class="object" id="object_two"></div>
	      <div class="object" id="object_three"></div>
	      <div class="object" id="object_four"></div>
	    </div>
	  </div>
	</div>

<?php wp_footer(); ?>


</body>
</html>
