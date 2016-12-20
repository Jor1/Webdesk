<?php
/**
 * Llorix_One_Lite_Message class file
 *
 * PHP version 5.6
 *
 * @category    Custom Controls
 * @package     Llorix_One_Lite
 * @license     GNU General Public License v2 or later
 * @link        http://themeisle.com
 */

/**
 * Llorix_One_Lite_Message class
 *
 * @category    Admin
 * @package     Llorix_One_Lite
 * @license     GNU General Public License v2 or later
 * @link        http://themeisle.com
 */
class Llorix_One_Lite_Message extends WP_Customize_Control {

	/**
	 * Sting to output.
	 *
	 * @var mixed|string $message Sting to output.
	 */
	private $message = '';

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string $manager       The name of this control.
	 * @param      string $id    Control id.
	 * @param      array  $args    Arguments.
	 */
	public function __construct( $manager, $id, $args = array() ) {
		parent::__construct( $manager, $id, $args );
		if ( ! empty( $args['llorix_one_lite_message'] ) ) {
			$this->message = $args['llorix_one_lite_message'];
		}
	}

	/**
	 * Render the content on the theme customizer page
	 */
	public function render_content() {
		echo '<span class="customize-control-title">' . $this->label . '</span>';
		echo $this->message;
	}
}

