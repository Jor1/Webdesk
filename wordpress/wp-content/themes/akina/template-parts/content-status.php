<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Akina
 */

?>

<article class="post post-list" itemscope="" itemtype="http://schema.org/BlogPosting">
<div class="post-status">
 <div class="postava">
  <a href="<?php the_permalink();?>"><?php echo get_avatar( get_the_author_meta( 'ID' ), 64 ); ?></a>
  </div>
  <div class="s-content">
		<p><?php echo mb_strimwidth(strip_shortcodes(strip_tags(apply_filters('the_content', $post->post_content))), 0, 150,"...");?></p>
	<div class="s-time">
	<?php if(is_sticky()) : ?>
			<i class="iconfont hotpost">&#xe618;</i>
		 <?php endif ?>
	  <i class="iconfont">&#xe604;</i> <?php the_time('Y-m-d');?>
	  </div>
	</div>
	

	<footer class="entry-footer">
	<div class="info-meta">
       <div class="comnum">  
        <span><i class="iconfont">&#xe610;</i> <?php comments_popup_link('NOTHING', '1 条评论', '% 条评论'); ?></span>
		</div>
		<div class="views"> 
		<span><i class="iconfont">&#xe614;</i> <?php get_post_views($post -> ID); ?> 热度</span>
		 </div>   
        </div>		
	</footer><!-- .entry-footer -->
	</div>	
	<hr>
</article><!-- #post-## -->

