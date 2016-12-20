<?php 

	/**
	 * NEXT / PREVIOUS POSTS
	 */
	
	$previous_post = get_previous_post();
	$next_post = get_next_post();

?>

	<section class="post-squares nextprev">
		<?php if(!empty($previous_post)){
				$thumb_url = wp_get_attachment_image_src(get_post_thumbnail_id($previous_post->ID), 'opengraph');
		?>
		<a href="<?php echo esc_url(get_permalink($previous_post->ID)); ?>" class="<?php if(!empty($next_post)){ echo 'half'; }else{ echo 'full'; }; ?> previous">
			<div class="background" style="background-image:url('<?php echo esc_url($thumb_url[0]); ?>');"></div>
			<span class="label"><?php esc_html_e('Previous Post', 'severn'); ?></span>
			<div class="info">
				<?php 
					/**$post_category = get_the_category($previous_post->ID);
					if($post_category){
						$color_option = get_option('category_meta_' . $post_category[0]->term_id . '_color');
						if(!empty($color_option)){ $color = get_option('category_meta_' . $post_category[0]->term_id . '_color'); }else{ $color = '7fbb00'; };
						echo '<span class="category" style="background:#' . $color . ';">' . esc_html($post_category[0]->name) . '</span>';
					}*/
				?>
				<h3><?php echo esc_html(get_the_title( $previous_post->ID )); ?></h3>
				<hr>
			</div>
		</a>
		<?php } ?>

		<?php if(!empty($next_post)){
				$thumb_url = wp_get_attachment_image_src(get_post_thumbnail_id($next_post->ID), 'opengraph');
		?>
		<a href="<?php echo esc_url(get_permalink($next_post->ID)); ?>" class="<?php if(!empty($previous_post)){ echo 'half'; }else{ echo 'full'; }; ?> next">
			<div class="background" style="background-image:url('<?php echo esc_url($thumb_url[0]); ?>');"></div>
			<span class="label"><?php esc_html_e('Next Post', 'severn'); ?></span>
			<div class="info">
				<?php 
					/**$post_category = get_the_category($next_post->ID);
					if($post_category){
						$color_option = get_option('category_meta_' . $post_category[0]->term_id . '_color');
						if(!empty($color_option)){ $color = get_option('category_meta_' . $post_category[0]->term_id . '_color'); }else{ $color = '7fbb00'; };
						echo '<span class="category" style="background:#' . $color . ';">' . esc_html($post_category[0]->name) . '</span>';
					}*/
				?>
				<h3><?php echo esc_html(get_the_title( $next_post->ID )); ?></h3>
				<hr>
			</div>
		</a>
		<?php } ?>

	</section>
