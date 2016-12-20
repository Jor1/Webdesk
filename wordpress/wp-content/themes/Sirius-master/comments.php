<?php
if ( post_password_required() ) {
	return;
}
?>
<div id="comments" class="comments-area">
	<?php if ( have_comments() ) : ?>
		<ol class="comment-list">
			<?php
				wp_list_comments( array(
					'style' => 'ol',
					'short_ping' => true,
					'avatar_size'=> 50,
				) );
			?>
		</ol>
		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : ?>
	<div id="comments-nav">
<?php paginate_comments_links('prev_text=<&next_text=>');?>
</div>
		<?php endif; ?>
	<?php endif; ?>
	<?php
		if ( ! comments_open() && '0' != get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) :
	?>
		<p class="no-comments"><?php _e( 'Comments are closed.', 'amadeus' ); ?></p>
	<?php endif; ?>
	<?php include(TEMPLATEPATH . '/smiley.php');?>
	<?php 
		$fields =  array(
   			 'author' => '<div class="row uniform"><div class="6u 12u(xsmall)"><input type="text" name="author" id="author" aria-required="true" required placeholder="Author" value="" ' . esc_attr( $commenter['comment_author'] ) . '" size="30"' . $aria_req . ' /></div>',
   			 'email'  => '<div class="6u 12u(xsmall)"><input type="email" name="email" id="email" aria-required="true" required placeholder="E-Mail" value="" ' . esc_attr(  $commenter['comment_author_email'] ) . '" size="30"' . $aria_req . ' /></div></div>',
   			 'url'  => '',
		);
		$args = array(
			'title_reply_before' => '<h4 id="reply-title" class="comment-reply-title">',
			'title_reply_after'  => '</h4>',
			'fields' =>  $fields,
			'class_submit' => 'special',
			'comment_notes_before' => '',
			'comment_field' =>  '<p class="smilies-list">'.$smilies.'</p><div class="12u"><textarea class="form-control" name="comment" id="comment" placeholder="Message" rows="5" aria-required="true" required  onkeydown="if(event.ctrlKey){if(event.keyCode==13){document.getElementById(\'submit\').click();return false}};"></textarea></div>',
		);
		comment_form($args);
	?>
</div>