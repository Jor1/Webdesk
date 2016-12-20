<?php
/**
 * WordPress基础配置文件。
 *
 * 这个文件被安装程序用于自动生成wp-config.php配置文件，
 * 您可以不使用网站，您需要手动复制这个文件，
 * 并重命名为“wp-config.php”，然后填入相关信息。
 *
 * 本文件包含以下配置选项：
 *
 * * MySQL设置
 * * 密钥
 * * 数据库表名前缀
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/zh-cn:%E7%BC%96%E8%BE%91_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL 设置 - 具体信息来自您正在使用的主机 ** //
/** WordPress数据库的名称 */
define('DB_NAME', 'webzhaoruicomdb');

/** MySQL数据库用户名 */
define('DB_USER', 'webzhaoruicomdb');

/** MySQL数据库密码 */
define('DB_PASSWORD', 'db0d75798353');

/** MySQL主机 */
define('DB_HOST', 'hk05.nw-host.com');

/** 创建数据表时默认的文字编码 */
define('DB_CHARSET', 'utf8');

/** 数据库整理类型。如不确定请勿更改 */
define('DB_COLLATE', '');

/**#@+
 * 身份认证密钥与盐。
 *
 * 修改为任意独一无二的字串！
 * 或者直接访问{@link https://api.wordpress.org/secret-key/1.1/salt/
 * WordPress.org密钥生成服务}
 * 任何修改都会导致所有cookies失效，所有用户将必须重新登录。
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'nmi:am}SV)FGWP-;DX6Y1?^!]~h<kueV#h*U/NB>K<{n9Ot@S-<(l1D-L:y~vIWb');
define('SECURE_AUTH_KEY',  'vR|[!;m/M]it#7gDmEzsyV:sxdm+R/rXLfG=C9}j8l|Ll =s?)&AH64m27fWo_@)');
define('LOGGED_IN_KEY',    'V,DMMR&Hj1=SeggIfd:B}.S0 ~6KAhv/{I)RhJk~{u}FG4_ED wg5M|M9iphA!kZ');
define('NONCE_KEY',        '<s?0EOKv*K#Ub0}lTJfCp^zi)|K6!6{E&Br!rQ[3%Mrh :IOHaQ6b+rSaE<X2(6e');
define('AUTH_SALT',        '$?s^Iog=h=uC94Midda@u;[_$u3cGY{.Ij3A0RtZ>&`0b3/A,@)kG57f|`1Y)$fo');
define('SECURE_AUTH_SALT', 'z_!M,LrtK49)bH!^jgx/;~+p$>%%/+)Pi*/Y6l/1G]-kVMqO9m%GZFT$6kmi[a!Y');
define('LOGGED_IN_SALT',   't=Sp$43fH;LKvU3+(,taEF3~5r7laKe;%LQsunRvi-Y3y.,9X<v([vk-dlf7Z+Fl');
define('NONCE_SALT',       'Qnf{4qAE?0qO3n*~M><Tmn1w)|zlR=THfujEIUPmxDB(|o>nb1%dkiCrm``vkQ=i');

/**#@-*/

/**
 * WordPress数据表前缀。
 *
 * 如果您有在同一数据库内安装多个WordPress的需求，请为每个WordPress设置
 * 不同的数据表前缀。前缀名只能为数字、字母加下划线。
 */
$table_prefix  = 'wp_';

/**
 * 开发者专用：WordPress调试模式。
 *
 * 将这个值改为true，WordPress将显示所有用于开发的提示。
 * 强烈建议插件开发者在开发环境中启用WP_DEBUG。
 *
 * 要获取其他能用于调试的信息，请访问Codex。
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/**
 * zh_CN本地化设置：启用ICP备案号显示
 *
 * 可在设置→常规中修改。
 * 如需禁用，请移除或注释掉本行。
 */
define('WP_ZH_CN_ICP_NUM', true);

/* 好了！请不要再继续编辑。请保存本文件。使用愉快！ */

/** WordPress目录的绝对路径。 */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** 设置WordPress变量和包含文件。 */
require_once(ABSPATH . 'wp-settings.php');
