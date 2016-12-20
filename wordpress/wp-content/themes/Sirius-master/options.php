<?php

function optionsframework_option_name() {

	$themename = wp_get_theme();
	$themename = preg_replace("/\W/", "_", strtolower($themename) );
	$optionsframework_settings = get_option( 'optionsframework' );
	$optionsframework_settings['id'] = $themename;
	update_option( 'optionsframework', $optionsframework_settings );

}

function optionsframework_options() {

	$options = array();
	$options[] = array(
		'name' => '站点配置',
		'type' => 'heading');
	$options[] = array(
		'name' => '站点黑白',
		'desc' => '提示：是否启用站点黑白功能(用于悼念日)',
		'id' => 'site_bw',
		'std' => '0',
		'type' => 'select',
		'class' => 'mini',
		'options' => array(
			'0' => '否',
			'1' => '是')
	);
	$options[] = array(
		'name' => '顶部图片',
		'id' => 'background_image',
		'class' => 'background_image',
		'type' => 'upload');
	$options[] = array(
		'name' => '站点图标',
		'id' => 'site_logo',
		'std' => get_template_directory_uri() . '/images/avatar.png',
		'type' => 'upload');
	$options[] = array(
		'name' => '站点名称',
		'id' => 'background_text1',
		'std' => 'Sirius',
		'type' => 'text');
	$options[] = array(
		'name' => '站点简介',
		'id' => 'background_text2',
		'std' => 'A simple theme for WordPress',
		'type' => 'textarea');
	$options[] = array(
		'name' => '颜色样式',
		'id' => 'background_color',
		'desc' => '提示：日了狗了，这个功能还没实现！',
		'std' => '#5BC0EB',
		'class' => "background_color",
		'type' => 'color' );

	$options[] = array(
		'name' => 'SEO设置',
		'type' => 'heading');
	$options[] = array(
		'name' => '关键词',
		'desc' => '提示：每个关键词之间用英文逗号分割',
		'id' => 'site_keywords',
		'type' => 'text');
	$options[] = array(
		'name' => '站点描述',
		'id' => 'site_description',
		'std' => '',
		'type' => 'textarea');
	$options[] = array(
		'name' => '站点统计',
		'desc' => '提示：填写时需要去掉前面的 &lt;script 与后面的 &lt;/script&gt; ',
		'id' => 'site_tongji',
		'std' => '',
		'type' => 'textarea');

	$options[] = array(
		'name' => '文章页面',
		'type' => 'heading');
	$options[] = array(
		'name' => '版权声明',
		'desc' => '提示：是否启用 CC BY-SA 4.0 声明',
		'id' => 'post_cc',
		'std' => '0',
		'type' => 'select',
		'class' => 'mini',
		'options' => array(
			'0' => '是',
			'1' => '否')
	);
	$options[] = array(
		'name' => '文章打赏',
		'desc' => '提示：是否启用文章打赏功能',
		'id' => 'post_like_donate',
		'std' => '0',
		'type' => 'select',
		'class' => 'mini',
		'options' => array(
			'0' => '是',
			'1' => '否')
	);
	$options[] = array(
		'name' => '打赏页面',
		'desc' => '提示：输入您的打赏介绍页面的连接，若没开启点赞打赏功能该项无效',
		'id' => 'donate_links',
		'std' => '',
		'type' => 'text'
	);
	$options[] = array(
		'name' => '主页设置',
		'type' => 'heading');
	$options[] = array(
		'name' => '导航一名称',
		'id' => 'menu-1-name',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => '导航一地址',
		'desc' => '提示：连接前要带有 http:// 或者 https:// ',
		'id' => 'menu-1-link',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => '导航二名称',
		'id' => 'menu-2-name',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => '导航二地址',
		'desc' => '提示：连接前要带有 http:// 或者 https:// ',
		'id' => 'menu-2-link',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => '导航三名称',
		'id' => 'menu-3-name',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => '导航三地址',
		'desc' => '提示：连接前要带有 http:// 或者 https:// ',
		'id' => 'menu-3-link',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => '导航四名称',
		'id' => 'menu-4-name',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => '导航四地址',
		'desc' => '提示：连接前要带有 http:// 或者 https:// ',
		'id' => 'menu-4-link',
		'std' => '',
		'type' => 'text');

	$options[] = array(
		'name' => '社会化组件',
		'type' => 'heading');
	$options[] = array(
		'name' => '新浪微博',
		'desc' => '提示：连接前要带有 http:// 或者 https:// ',
		'id' => 'social_weibo',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => '腾讯微博',
		'desc' => '提示：连接前要带有 http:// 或者 https:// ',
		'id' => 'social_tweibo',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => 'Twitter',
		'desc' => '提示：连接前要带有 http:// 或者 https:// ',
		'id' => 'social_twitter',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => 'FaceBook',
		'desc' => '提示：连接前要带有 http:// 或者 https:// ',
		'id' => 'social_facebook',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => 'LinkedIn',
		'desc' => '提示：连接前要带有 http:// 或者 https:// ',
		'id' => 'social_linkedin',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => 'GitHub',
		'desc' => '提示：连接前要带有 http:// 或者 https:// ',
		'id' => 'social_github',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => 'Instagram',
		'desc' => '提示：连接前要带有 http:// 或者 https:// ',
		'id' => 'social_instagram',
		'std' => '',
		'type' => 'text');

	return $options;
}