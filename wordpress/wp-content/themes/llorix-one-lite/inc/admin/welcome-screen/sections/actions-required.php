<?php
/**
 * Actions required
 */
?>

<div id="actions_required" class="llorix-one-lite-tab-pane">

    <h1><?php esc_html_e( 'Keep up with Llorix One Lite\'s recommended actions' ,'llorix-one-lite' ); ?></h1>

    <!-- NEWS -->
    <hr />
	
	<?php
	global $llorix_one_lite_required_actions;
	
	if( !empty($llorix_one_lite_required_actions) ):
	
		/* $llorix_one_lite_required_actions is an array of true/false for each required action that was dismissed */
		
		$llorix_one_lite_show_required_actions = get_option("llorix_one_lite_show_required_actions");
		
		foreach( $llorix_one_lite_required_actions as $llorix_one_required_action_key => $llorix_one_required_action_value ):
		
			if(@$llorix_one_lite_show_required_actions[$llorix_one_required_action_value['id']] === false) continue;
			if(@$llorix_one_required_action_value['check']) continue;
			?>
			<div class="llorix-one-lite-action-required-box">
				<span class="dashicons dashicons-no-alt llorix-one-lite-dismiss-required-action" id="<?php echo $llorix_one_required_action_value['id']; ?>"></span>
				<h4><?php echo $llorix_one_required_action_key + 1; ?>. <?php if( !empty($llorix_one_required_action_value['title']) ): echo $llorix_one_required_action_value['title']; endif; ?></h4>
				<p><?php if( !empty($llorix_one_required_action_value['description']) ): echo $llorix_one_required_action_value['description']; endif; ?></p>
				<?php
					if( !empty($llorix_one_required_action_value['plugin_slug']) ):
						?><p><a href="<?php echo esc_url( wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin='.$llorix_one_required_action_value['plugin_slug'] ), 'install-plugin_'.$llorix_one_required_action_value['plugin_slug'] ) ); ?>" class="button button-primary"><?php if( !empty($llorix_one_required_action_value['title']) ): echo $llorix_one_required_action_value['title']; endif; ?></a></p><?php
					endif;
				?>

				<hr />
			</div>
			<?php
		endforeach;
	endif;
	$nr_actions_required = 0;
	/* get number of required actions */
	if( get_option('llorix_one_lite_show_required_actions') ):
		$llorix_one_lite_show_required_actions = get_option('llorix_one_lite_show_required_actions');
	else:
		$llorix_one_lite_show_required_actions = array();
	endif;
	if( !empty($llorix_one_lite_required_actions) ):
		foreach( $llorix_one_lite_required_actions as $llorix_one_required_action_value ):
			if(( !isset( $llorix_one_required_action_value['check'] ) || ( isset( $llorix_one_required_action_value['check'] ) && ( $llorix_one_required_action_value['check'] == false ) ) ) && ((isset($llorix_one_lite_show_required_actions[$llorix_one_required_action_value['id']]) && ($llorix_one_lite_show_required_actions[$llorix_one_required_action_value['id']] == true)) || !isset($llorix_one_lite_show_required_actions[$llorix_one_required_action_value['id']]) )) :
				$nr_actions_required++;
			endif;
		endforeach;
	endif;
	if( $nr_actions_required == 0 ):
		echo '<p>'.__( 'Hooray! There are no recommended actions for you right now.','llorix-one-lite' ).'</p>';
	endif;
	?>

</div>