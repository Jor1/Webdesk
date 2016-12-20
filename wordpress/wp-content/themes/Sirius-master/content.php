<article>
	<?php sirius_blog_thumbnail(); ?>
	<div class="inner">
		<h4><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h4>
		<div class="sirius-post-meta">
				<span>
				<a href="#"><i class="fa fa-calendar"></i> <?php the_time('Y/n/j') ?></a>
				<?php $category = get_the_category(); echo '<a href="' . get_category_link($category[0] -> term_id) . '"><i class="fa fa-folder-open-o"></i> ' . $category[0] -> cat_name . '</a>'; ?>
				<a href="<?php the_permalink() ?>"><i class="fa fa-eye"></i> <?php echo sirius_get_post_views(); ?> Views</a>
				<span>
			</div>
		<?php $excerptphoto = wp_trim_words(get_the_excerpt(), 110); ?>
		<div class="abstract">
		<p><?php echo $excerptphoto ?></p>
		</div>
	</div>
</article>