<?php
/**
 * Welcome Screen Class
 */
class Llorix_One_Lite_Welcome {
	/**
	 * Constructor for the welcome screen
	 */
	public function __construct() {
		/* create dashbord page */
		add_action( 'admin_menu', array( $this, 'llorix_one_lite_welcome_register_menu' ) );
		/* activation notice */
		add_action( 'load-themes.php', array( $this, 'llorix_one_lite_activation_admin_notice' ) );
		/* enqueue script and style for welcome screen */
		add_action( 'admin_enqueue_scripts', array( $this, 'llorix_one_lite_welcome_style_and_scripts' ) );
		
		/* enqueue script for customizer */
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'llorix_one_lite_welcome_scripts_for_customizer' ) );
		/* load welcome screen */
		add_action( 'llorix_one_lite_welcome', array( $this, 'llorix_one_lite_welcome_getting_started' ), 	    10 );
		add_action( 'llorix_one_lite_welcome', array( $this, 'llorix_one_lite_welcome_actions_required' ),      20 );
		add_action( 'llorix_one_lite_welcome', array( $this, 'llorix_one_lite_welcome_child_themes' ), 		    30 );
		add_action( 'llorix_one_lite_welcome', array( $this, 'llorix_one_lite_welcome_github' ), 		        40 );
		add_action( 'llorix_one_lite_welcome', array( $this, 'llorix_one_lite_welcome_support' ), 			    50 );
		add_action( 'llorix_one_lite_welcome', array( $this, 'llorix_one_lite_welcome_changelog' ), 			60 );
		
		/* ajax callback for dismissable required actions */
		add_action( 'wp_ajax_llorix_one_lite_dismiss_required_action', array( $this, 'llorix_one_lite_dismiss_required_action_callback') );
		add_action( 'wp_ajax_nopriv_llorix_one_lite_dismiss_required_action', array($this, 'llorix_one_lite_dismiss_required_action_callback') );
	}
	/**
	 * Creates the dashboard page
	 * @see  add_theme_page()
	 */
	public function llorix_one_lite_welcome_register_menu() {
		add_theme_page( 'About Llorix One Lite', 'About Llorix One Lite', 'activate_plugins', 'llorix-one-lite-welcome', array( $this, 'llorix_one_lite_welcome_screen' ) );
	}
	/**
	 * Adds an admin notice upon successful activation.
	 */
	public function llorix_one_lite_activation_admin_notice() {
		global $pagenow;
		if ( is_admin() && ('themes.php' == $pagenow) && isset( $_GET['activated'] ) ) {
			add_action( 'admin_notices', array( $this, 'llorix_one_lite_welcome_admin_notice' ), 99 );
		}
	}
	/**
	 * Display an admin notice linking to the welcome screen
	 */
	public function llorix_one_lite_welcome_admin_notice() {
		?>
			<div class="updated notice is-dismissible">
				<p><?php echo sprintf( esc_html__( 'Welcome! Thank you for choosing Llorix One Lite! To fully take advantage of the best our theme can offer please make sure you visit our %swelcome page%s.', 'llorix-one-lite' ), '<a href="' . esc_url( admin_url( 'themes.php?page=llorix-one-lite-welcome' ) ) . '">', '</a>' ); ?></p>
				<p><a href="<?php echo esc_url( admin_url( 'themes.php?page=llorix-one-lite-welcome' ) ); ?>" class="button" style="text-decoration: none;"><?php _e( 'Get started with Llorix One Lite', 'llorix-one-lite' ); ?></a></p>
			</div>
		<?php
	}
	/**
	 * Load welcome screen css and javascript
	 */
	public function llorix_one_lite_welcome_style_and_scripts( $hook_suffix ) {
		if ( 'appearance_page_llorix-one-lite-welcome' == $hook_suffix ) {
			wp_enqueue_style( 'llorix-one-lite-welcome-screen-css', get_template_directory_uri() . '/inc/admin/welcome-screen/css/welcome.css' );
			wp_enqueue_script( 'llorix-one-lite-welcome-screen-js', get_template_directory_uri() . '/inc/admin/welcome-screen/js/welcome.js', array('jquery') );
			
			global $llorix_one_lite_required_actions;
			
			$nr_actions_required = 0;
			
			/* get number of required actions */
			if( get_option('llorix_one_lite_show_required_actions') ):
				$llorix_one_lite_show_required_actions = get_option('llorix_one_lite_show_required_actions');
			else:
				$llorix_one_lite_show_required_actions = array();
			endif;
			if( !empty($llorix_one_lite_required_actions) ):
				foreach( $llorix_one_lite_required_actions as $llorix_one_required_action_value ):
					if(( !isset( $llorix_one_required_action_value['check'] ) || ( isset($llorix_one_required_action_value['check'] ) && ( $llorix_one_required_action_value['check'] == false ) ) ) && ( (isset($llorix_one_lite_show_required_actions[$llorix_one_required_action_value['id']]) && ($llorix_one_lite_show_required_actions[$llorix_one_required_action_value['id']] == true)) || !isset($llorix_one_lite_show_required_actions[$llorix_one_required_action_value['id']]) )) :
						$nr_actions_required++;
					endif;
				endforeach;
			endif;
			wp_localize_script( 'llorix-one-lite-welcome-screen-js', 'llorixOneLiteWelcomeScreenObject', array(
				'nr_actions_required' => $nr_actions_required,
				'ajaxurl' => admin_url( 'admin-ajax.php' ),
				'template_directory' => get_template_directory_uri(),
				'no_required_actions_text' => __( 'Hooray! There are no required actions for you right now.','llorix-one-lite' )
			) );
		}
	}
	
	/**
	 * Load scripts for customizer page
	 */
	public function llorix_one_lite_welcome_scripts_for_customizer() {
		
		wp_enqueue_style( 'llorix-one-lite-welcome-screen-customizer-css', get_template_directory_uri() . '/inc/admin/welcome-screen/css/welcome_customizer.css' );
		wp_enqueue_script( 'llorix-one-lite-welcome-screen-customizer-js', get_template_directory_uri() . '/inc/admin/welcome-screen/js/welcome_customizer.js', array('jquery'), '20120206', true );
		
		global $llorix_one_lite_required_actions;
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
		wp_localize_script( 'llorix-one-lite-welcome-screen-customizer-js', 'llorixOneWelcomeScreenCustomizerObject', array(
			'nr_actions_required' => $nr_actions_required,
			'aboutpage' => esc_url( admin_url( 'themes.php?page=llorix-one-lite-welcome#actions_required' ) ),
			'customizerpage' => esc_url( admin_url( 'customize.php#actions_required' ) ),
		) );
	}
	
	/**
	 * Dismiss required actions
	 */
	public function llorix_one_lite_dismiss_required_action_callback() {
		
		global $llorix_one_lite_required_actions;
		
		$llorix_one_dismiss_id = (isset($_GET['dismiss_id'])) ? $_GET['dismiss_id'] : 0;
		echo $llorix_one_dismiss_id; /* this is needed and it's the id of the dismissable required action */
		if( !empty($llorix_one_dismiss_id) ):
			/* if the option exists, update the record for the specified id */
			if( get_option('llorix_one_lite_show_required_actions') ):
				$llorix_one_lite_show_required_actions = get_option('llorix_one_lite_show_required_actions');
				$llorix_one_lite_show_required_actions[$llorix_one_dismiss_id] = false;
				update_option( 'llorix_one_lite_show_required_actions',$llorix_one_lite_show_required_actions );
			/* create the new option,with false for the specified id */
			else:
				$llorix_one_lite_show_required_actions_new = array();
				if( !empty($llorix_one_lite_required_actions) ):
					foreach( $llorix_one_lite_required_actions as $llorix_one_required_action ):
						if( $llorix_one_required_action['id'] == $llorix_one_dismiss_id ):
							$llorix_one_lite_show_required_actions_new[$llorix_one_required_action['id']] = false;
						else:
							$llorix_one_lite_show_required_actions_new[$llorix_one_required_action['id']] = true;
						endif;
					endforeach;
				update_option( 'llorix_one_lite_show_required_actions', $llorix_one_lite_show_required_actions_new );
				endif;
			endif;
		endif;
		die(); // this is required to return a proper result
	}
	/**
	 * Welcome screen content
	 */
	public function llorix_one_lite_welcome_screen() {
		require_once( ABSPATH . 'wp-load.php' );
		require_once( ABSPATH . 'wp-admin/admin.php' );
		require_once( ABSPATH . 'wp-admin/admin-header.php' );
		?>

		<ul class="llorix-one-lite-nav-tabs" role="tablist">
			<li role="presentation" class="active"><a href="#getting_started" aria-controls="getting_started" role="tab" data-toggle="tab"><?php esc_html_e( 'Getting started','llorix-one-lite'); ?></a></li>
			<li role="presentation" class="llorix-one-lite-w-red-tab"><a href="#actions_required" aria-controls="actions_required" role="tab" data-toggle="tab"><?php esc_html_e( 'Actions recommended','llorix-one-lite'); ?></a></li>
			<li role="presentation"><a href="#child_themes" aria-controls="child_themes" role="tab" data-toggle="tab"><?php echo 'Child themes'; ?></a></li>
			<li role="presentation"><a href="#github" aria-controls="github" role="tab" data-toggle="tab"><?php esc_html_e( 'Contribute','llorix-one-lite'); ?></a></li>
			<li role="presentation"><a href="#support" aria-controls="support" role="tab" data-toggle="tab"><?php esc_html_e( 'Support','llorix-one-lite'); ?></a></li>
			<li role="presentation"><a href="#changelog" aria-controls="changelog" role="tab" data-toggle="tab"><?php esc_html_e( 'Change log','llorix-one-lite'); ?></a></li>
		</ul>

		<div class="llorix-one-lite-tab-content">

			<?php
			/**
			 * @hooked llorix_one_lite_welcome_getting_started - 10
			 * @hooked llorix_one_lite_welcome_actions_required - 20
			 * @hooked llorix_one_lite_welcome_child_themes - 30
			 * @hooked llorix_one_lite_welcome_github - 40
			 * @hooked llorix_one_lite_welcome_support - 50
			 * @hooked llorix_one_lite_welcome_changelog - 60
			 */
			do_action( 'llorix_one_lite_welcome' ); ?>

		</div>
		<?php
	}
	/**
	 * Getting started
	 */
	public function llorix_one_lite_welcome_getting_started() {
		require_once( get_template_directory() . '/inc/admin/welcome-screen/sections/getting-started.php' );
	}
	/**
	 * Actions required
	 */
	public function llorix_one_lite_welcome_actions_required() {
		require_once( get_template_directory() . '/inc/admin/welcome-screen/sections/actions-required.php' );
	}
	/**
	 * Contribute
	 */
	public function llorix_one_lite_welcome_github() {
		require_once( get_template_directory() . '/inc/admin/welcome-screen/sections/github.php' );
	}
	/**
	 * Child themes
	 * @since 1.8.2.4
	 */
	public function llorix_one_lite_welcome_child_themes() {
		require_once( get_template_directory() . '/inc/admin/welcome-screen/sections/child-themes.php' );
	}
	/**
	 * Support
	 */
	public function llorix_one_lite_welcome_support() {
		require_once( get_template_directory() . '/inc/admin/welcome-screen/sections/support.php' );
	}
	/**
	 * Changelog
	 */
	public function llorix_one_lite_welcome_changelog() {
		require_once( get_template_directory() . '/inc/admin/welcome-screen/sections/changelog.php' );
	}	
}
$GLOBALS['Llorix_One_Lite_Welcome'] = new Llorix_One_Lite_Welcome();