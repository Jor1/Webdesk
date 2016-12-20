<?php
/**
 * Llorix_One_Lite_Customize_Alpha_Color_Control class file
 *
 * PHP version 5.6
 *
 * @category    Custom Controls
 * @package     Llorix_One_Lite
 * @license     GNU General Public License v2 or later
 * @link        http://themeisle.com
 */

/**
 * Llorix_One_Lite_Customize_Alpha_Color_Control class
 *
 * @category    Admin
 * @package     Llorix_One_Lite
 * @license     GNU General Public License v2 or later
 * @link        http://themeisle.com
 */
class Llorix_One_Lite_Customize_Alpha_Color_Control extends WP_Customize_Control {

	/**
	 * Remove the color palettes
	 *
	 * @var     bool     $palette     Remove the color palettes.
	 */
	public $palette = true;

	/**
	 * Default values.
	 *
	 * @var     string     $default    Default values.
	 */
	public $default = '';

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
		$this->default = $this->setting->default;
	}

	/**
	 * Class render function
	 */
	protected function render() {
		$id = 'customize-control-' . str_replace( '[', '-', str_replace( ']', '', $this->id ) );
		$class = 'customize-control customize-control-alphacolor'; ?>
		<li id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $class ); ?>">
			<?php $this->render_content(); ?>
		</li>
	<?php
	}

	/**
	 * Render the content on the theme customizer page
	 */
	public function render_content() {
	?>
		<label>
			<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
			<input type="text" data-palette="<?php echo $this->palette; ?>" data-default-color="<?php echo $this->default; ?>" value="<?php echo intval( $this->value() ); ?>" class="pluto-color-control" <?php $this->link(); ?>  />
		</label>
	<?php
	}
}
