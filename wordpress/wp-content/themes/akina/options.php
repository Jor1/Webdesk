<?php
/**
 * A unique identifier is defined to store the options in the database and reference them from the theme.
 * By default it uses the theme name, in lowercase and without spaces, but this can be changed if needed.
 * If the identifier changes, it'll appear as if the options have been reset.
 */
 
 

function optionsframework_option_name() {

	// 从样式表获取主题名称
	$themename = wp_get_theme();
	$themename = preg_replace("/\W/", "_", strtolower($themename) );

	$optionsframework_settings = get_option( 'optionsframework' );
	$optionsframework_settings['id'] = $themename;
	update_option( 'optionsframework', $optionsframework_settings );
}

/**
 * Defines an array of options that will be used to generate the settings page and be saved in the database.
 * When creating the 'id' fields, make sure to use all lowercase and no spaces.
 *
 * If you are making your theme translatable, you should replace 'options_framework_theme'
 * with the actual text domain for your theme.  请阅读:
 * http://codex.wordpress.org/Function_Reference/load_theme_textdomain
 */

function optionsframework_options() {
	// 测试数据
	$test_array = array(
		'one' => __('1', 'options_framework_theme'),
		'two' => __('2', 'options_framework_theme'),
		'three' => __('3', 'options_framework_theme'),
		'four' => __('4', 'options_framework_theme'),
		'five' => __('5', 'options_framework_theme'),
		'six' => __('6', 'options_framework_theme'),
		'seven' => __('7', 'options_framework_theme')
	);
		

	// 复选框数组
	$multicheck_array = array(
		'one' => __('法国吐司', 'options_framework_theme'),
		'two' => __('薄煎饼', 'options_framework_theme'),
		'three' => __('煎蛋', 'options_framework_theme'),
		'four' => __('绉绸', 'options_framework_theme'),
		'five' => __('感化饼干', 'options_framework_theme')
	);

	// 复选框默认值
	$multicheck_defaults = array(
		'one' => '1',
		'five' => '1'
	);

	// 背景默认值
	$background_defaults = array(
		'color' => '',
		'image' => '',
		'repeat' => 'repeat',
		'position' => 'top center',
		'attachment'=>'scroll' );

	// 版式默认值
	$typography_defaults = array(
		'size' => '15px',
		'face' => 'georgia',
		'style' => 'bold',
		'color' => '#bada55' );
		
	// 版式设置选项
	$typography_options = array(
		'sizes' => array( '6','12','14','16','20' ),
		'faces' => array( 'Helvetica Neue' => 'Helvetica Neue','Arial' => 'Arial' ),
		'styles' => array( 'normal' => '普通','bold' => '粗体' ),
		'color' => false
	);

	// 将所有分类（categories）加入数组
	$options_categories = array();
	$options_categories_obj = get_categories();
	foreach ($options_categories_obj as $category) {
		$options_categories[$category->cat_ID] = $category->cat_name;
	}
	
	// 将所有标签（tags）加入数组
	$options_tags = array();
	$options_tags_obj = get_tags();
	foreach ( $options_tags_obj as $tag ) {
		$options_tags[$tag->term_id] = $tag->name;
	}


	// 将所有页面（pages）加入数组
	$options_pages = array();
	$options_pages_obj = get_pages('sort_column=post_parent,menu_order');
	$options_pages[''] = 'Select a page:';
	foreach ($options_pages_obj as $page) {
		$options_pages[$page->ID] = $page->post_title;
	}

	// 如果使用图片单选按钮, define a directory path
	$imagepath =  get_template_directory_uri() . '/images/';

	$options = array();

	//基本设置
	$options[] = array(
		'name' => __('基本设置', 'options_framework_theme'),
		'type' => 'heading');
		
		$options[] = array(
		'name' => __("主题风格", 'akina'),
		'desc' => __("14种颜色供选择，点击选择你喜欢的颜色，保存后前端展示会有所改变。", 'haoui'),
		'id' => "theme_skin",
		'std' => "A0DAD0",
		'type' => "colorradio",
		'options' => array(
			'A0DAD0' => 100,
			'93D7F1' => 1,
			'FDEE83' => 2,
			'FFBE5B' => 3,
			'FF7D7D' => 4,
			'FFBCCF' => 5,
			'2B394E' => 6,
		)
	);
		
	$options[] = array(
		'name' => __('logo', 'options_framework_theme'),
		'desc' => __('高度尺寸50px。', 'options_framework_theme'),
		'id' => 'akina_logo',
		'type' => 'upload');
		
	$options[] = array(
		'name' => __('博主描述', 'options_framework_theme'),
		'desc' => __('一段自我描述的话', 'options_framework_theme'),
		'id' => 'admin_des',
		'std' => 'Carpe Diem and Do what I like',
		'type' => 'textarea');	
	
	$options[] = array(
		'name' => __('自定义关键词和首页描述', 'options_framework_theme'),
		'desc' => __('开启之后可自定义填写关键词和首页描述', 'options_framework_theme'),
		'id' => 'akina_meta',
		'std' => '0',
		'type' => 'checkbox');
		
	$options[] = array(
		'name' => __('关键词', 'options_framework_theme'),
		'desc' => __('各关键字间用半角逗号","分割，数量在5个以内最佳。', 'options_framework_theme'),
		'id' => 'akina_meta_keywords',
		'std' => '',
		'type' => 'text');	
		
	$options[] = array(
		'name' => __('首页描述', 'options_framework_theme'),
		'desc' => __('用简洁的文字描述本站点，字数建议在120个字以内。', 'options_framework_theme'),
		'id' => 'akina_meta_description',
		'std' => '',
		'type' => 'text');	
	
		
	$options[] = array(
		'name' => __('是否开启多说插件支持', 'options_framework_theme'),
		'desc' => __('如果使用多说插件，请开启此选项;使用自带评论请关闭', 'options_framework_theme'),
		'id' => 'general_disqus_plugin_support',
		'std' => '0',
		'type' => 'checkbox');		
	
	$options[] = array(
		'name' => __('顶部搜索按钮', 'akina'),
		'id' => 'top_search',
		'std' => "yes",
		'type' => "radio",
		'options' => array(
			'yes' => __('开启', ''),
			'no' => __('关闭', '')
		));	
		
	$options[] = array(
		'name' => __('评论收缩', 'akina'),
		'id' => 'toggle-menu',
		'std' => "yes",
		'type' => "radio",
		'options' => array(
			'yes' => __('开启', ''),
			'no' => __('关闭', '')
		));	
		
	$options[] = array(
		'name' => __('是否开启preloader动画', 'akina'),
		'id' => 'preloader',
		'std' => "no",
		'type' => "radio",
		'options' => array(
			'yes' => __('开启', ''),
			'no' => __('关闭', '')
		));	
		
	$options[] = array(
		'name' => __('首页列表特色图样式', 'akina'),
		'id' => 'pagenav_style',
		'std' => "ajax",
		'type' => "radio",
		'options' => array(
			'ajax' => __('ajax加载', ''),
			'np' => __('上一页和下一页', '')
		));	

	$options[] = array(
		'name' => __('页脚信息', 'options_framework_theme'),
		'desc' => __('页脚说明文字', 'options_framework_theme'),
		'id' => 'footer_info',
		'std' => 'Carpe Diem and Do what I like',
		'type' => 'textarea');	

		
	//首页布局	

	$options[] = array(
		'name' => __('首页布局', 'options_framework_theme'),
		'type' => 'heading');

	$options[] = array(
		'name' => __('是否一直显示菜单', 'options_framework_theme'),
		'desc' => __('默认不显示', 'options_framework_theme'),
		'id' => 'shownav',
		'std' => '0',
		'type' => 'checkbox');
		
	$options[] = array(
		'name' => __('是否开启顶部focus区', 'options_framework_theme'),
		'desc' => __('默认显示，勾选关闭', 'options_framework_theme'),
		'id' => 'head_focus',
		'std' => '0',
		'type' => 'checkbox');	
	
	$options[] = array(
		'name' => __('focus区背景图', 'options_framework_theme'),
		'desc' => __('高度尺寸1920*1080。', 'options_framework_theme'),
		'id' => 'focus_img',
		'type' => 'upload'); 
		
	 $options[] = array(
		'name' => __('个人头像', 'options_framework_theme'),
		'desc' => __('高度尺寸50px。', 'options_framework_theme'),
		'id' => 'focus_logo',
		'type' => 'upload'); 
		
	$options[] = array(
		'name' => __('是否开启顶公告', 'options_framework_theme'),
		'desc' => __('默认不显示，勾选开启', 'options_framework_theme'),
		'id' => 'head_notice',
		'std' => '0',
		'type' => 'checkbox');	

	$options[] = array(
		'name' => __('顶部公告内容', 'options_framework_theme'),
		'desc' => __('顶部公告内容', 'options_framework_theme'),
		'id' => 'notice_title',
		'std' => '我很荣幸的启用了Akina主题',
		'type' => 'text');		
		
	$options[] = array(
		'name' => __('首页列表特色图样式', 'akina'),
		'id' => 'list_type',
		'std' => "round",
		'type' => "radio",
		'options' => array(
			'round' => __('圆形', ''),
			'square' => __('方形', '')
		));	
		
	$options[] = array(
		'name' => __('是否开启聚焦', 'options_framework_theme'),
		'desc' => __('默认开启', 'options_framework_theme'),
		'id' => 'top_feature',
		'std' => '1',
		'type' => 'checkbox');	

	$options[] = array(
		'name' => __('聚焦标题', 'options_framework_theme'),
		'desc' => __('默认为聚焦，你也可以修改为其他，当然不能当广告用！不允许！！', 'options_framework_theme'),
		'id' => 'feature_title',
		'std' => '聚焦',
		'class' => 'mini',
		'type' => 'text');	
		
	$options[] = array(
		'name' => __('聚焦图一', 'options_framework_theme'),
		'desc' => __('尺寸257px*160px', 'options_framework_theme'),
		'id' => 'feature1_img',
		'std' => 'http://i4.piimg.com/501993/38f8fc40d638024f.jpg',
		'type' => 'upload');

	$options[] = array(
		'name' => __('聚焦图一标题', 'options_framework_theme'),
		'desc' => __('聚焦图一标题', 'options_framework_theme'),
		'id' => 'feature1_title',
		'std' => 'feature1',
		'type' => 'text');	
		
	$options[] = array(
		'name' => __('聚焦图一链接', 'options_framework_theme'),
		'desc' => __('聚焦图一链接', 'options_framework_theme'),
		'id' => 'feature1_link',
		'std' => '#',
		'type' => 'text');		
		
	$options[] = array(
		'name' => __('聚焦图二', 'options_framework_theme'),
		'desc' => __('尺寸257px*160px', 'options_framework_theme'),
		'id' => 'feature2_img',
		'std' => 'http://i4.piimg.com/501993/d496add2ef7bcd54.jpg',
		'type' => 'upload');

	$options[] = array(
		'name' => __('聚焦图二标题', 'options_framework_theme'),
		'desc' => __('聚焦图二标题', 'options_framework_theme'),
		'id' => 'feature2_title',
		'std' => 'feature2',
		'type' => 'text');

	$options[] = array(
		'name' => __('聚焦图二链接', 'options_framework_theme'),
		'desc' => __('聚焦图二链接', 'options_framework_theme'),
		'id' => 'feature2_link',
		'std' => '#',
		'type' => 'text');		
		
			
	$options[] = array(
		'name' => __('聚焦图三', 'options_framework_theme'),
		'desc' => __('尺寸257px*160px', 'options_framework_theme'),
		'id' => 'feature3_img',
		'std' => 'http://i4.piimg.com/501993/e90886a32d277f1c.jpg',
		'type' => 'upload');

	$options[] = array(
		'name' => __('聚焦图三标题', 'options_framework_theme'),
		'desc' => __('聚焦图三标题', 'options_framework_theme'),
		'id' => 'feature3_title',
		'std' => 'feature3',
		'type' => 'text');	

	$options[] = array(
		'name' => __('聚焦图三链接', 'options_framework_theme'),
		'desc' => __('聚焦图三链接', 'options_framework_theme'),
		'id' => 'feature3_link',
		'std' => '#',
		'type' => 'text');
			
		
	//文章页	

	$options[] = array(
		'name' => __('文章页', 'options_framework_theme'),
		'type' => 'heading');
			
		
	$options[] = array(
		'name' => __('文章点赞', 'akina'),
		'id' => 'post_like',
		'std' => "yes",
		'type' => "radio",
		'options' => array(
			'yes' => __('开启', ''),
			'no' => __('关闭', '')
		));	
		
	$options[] = array(
		'name' => __('文章分享', 'akina'),
		'id' => 'post_share',
		'std' => "yes",
		'type' => "radio",
		'options' => array(
			'yes' => __('开启', ''),
			'no' => __('关闭', '')
		));	
	
	$options[] = array(
		'name' => __('上一篇下一篇', 'akina'),
		'id' => 'post_nepre',
		'std' => "yes",
		'type' => "radio",
		'options' => array(
			'yes' => __('开启', ''),
			'no' => __('关闭', '')
		));	
		
	$options[] = array(
		'name' => __('博主信息', 'akina'),
		'id' => 'author_profile',
		'std' => "yes",
		'type' => "radio",
		'options' => array(
			'yes' => __('开启', ''),
			'no' => __('关闭', '')
		));		
		
	//社交选项	

	$options[] = array(
		'name' => __('社交设置', 'options_framework_theme'),
		'type' => 'heading');
		
	
	$options[] = array(
		'name' => __('微信', 'options_framework_theme'),
		'desc' => __('微信二维码', 'options_framework_theme'),
		'id' => 'wechat',
		'type' => 'upload');
	
    $options[] = array(
		'name' => __('新浪微博', 'options_framework_theme'),
		'desc' => __('新浪微博地址', 'options_framework_theme'),
		'id' => 'sina',
		'std' => 'www.fuzzz.cc',
		'type' => 'text');
		
		
	$options[] = array(
		'name' => __('腾讯qq', 'options_framework_theme'),
		'desc' => __('qq号码', 'options_framework_theme'),
		'id' => 'qq',
		'std' => 'www.fuzzz.cc',
		'type' => 'text');
		
	$options[] = array(
		'name' => __('qq空间', 'options_framework_theme'),
		'desc' => __('qq空间地址', 'options_framework_theme'),
		'id' => 'qzone',
		'std' => 'www.fuzzz.cc',
		'type' => 'text');	
		
	$options[] = array(
		'name' => __('GitHub', 'options_framework_theme'),
		'desc' => __('GitHub地址', 'options_framework_theme'),
		'id' => 'github',
		'std' => 'www.fuzzz.cc',
		'type' => 'text');

	$options[] = array(
		'name' => __('lofter', 'options_framework_theme'),
		'desc' => __('lofter地址', 'options_framework_theme'),
		'id' => 'lofter',
		'std' => '',
		'type' => 'text');

	$options[] = array(
		'name' => __('bilibili', 'options_framework_theme'),
		'desc' => __('bilibili地址', 'options_framework_theme'),
		'id' => 'bili',
		'std' => '',
		'type' => 'text');

	$options[] = array(
		'name' => __('youku', 'options_framework_theme'),
		'desc' => __('youku地址', 'options_framework_theme'),
		'id' => 'youku',
		'std' => '',
		'type' => 'text');		
		
	
	

	//自定义页面
	$options[] = array(
		'name' => __('其他', 'options_framework_theme'),
		'type' => 'heading' );	
		
	$options[] = array(
		'name' => __('作品页面', 'options_framework_theme'),
		'desc' => __('选择一个或多个分类作为作品页面', 'options_framework_theme'),
		'id' => 'works_multicheck',
		'type' => 'multicheck',
		'options' => $options_categories);	
		
	$options[] = array(
		'name' => __('七牛图片cdn', 'options_framework_theme'),
		'desc' => __('！重要:填写格式为 http://你的二级域名（七牛三级域名）/wp-content/uploads', 'options_framework_theme'),
		'id' => 'qiniu_cdn',
		'std' => '',
		'type' => 'text');	
		
	$options[] = array(
		'name' => __('关于欢迎页', 'options_framework_theme'),
		'desc' => __('页面类型中存在着一个welcome页面，我觉得是很鸡肋的，但是我TM就是要加这个页面，其中前四个是已经固定的模块，第五个可以自定义', 'options_framework_theme'),
		'type' => 'info');
	
	$options[] = array(
		'name' => __('欢迎页自定义模块标题', 'options_framework_theme'),
		'desc' => __('默认是works', 'options_framework_theme'),
		'id' => 'youset_title',
		'std' => 'works',
		'type' => 'text');
		
	$options[] = array(
		'name' => __('欢迎页自定义模块描述', 'options_framework_theme'),
		'desc' => __('随便写', 'options_framework_theme'),
		'id' => 'youset_des',
		'std' => 'view my projects',
		'type' => 'text');
		
	$options[] = array(
		'name' => __('自定义图标', 'options_framework_theme'),
		'desc' => __('64*64。', 'options_framework_theme'),
		'id' => 'youset_logo',
		'type' => 'upload');

	$options[] = array(
		'name' => __('欢迎页自定义模块链接', 'options_framework_theme'),
		'desc' => __('随便写', 'options_framework_theme'),
		'id' => 'youset_link',
		'std' => '#',
		'type' => 'text');	
	
	$options[] = array(
		'name' => __('About页面链接', 'options_framework_theme'),
		'desc' => __('关于我地址链接', 'options_framework_theme'),
		'id' => 'about_link',
		'std' => '#',
		'type' => 'text');		
			
	$options[] = array(
		'name' => __('links页面链接', 'options_framework_theme'),
		'desc' => __('友链页面地址链接', 'options_framework_theme'),
		'id' => 'links_link',
		'std' => '#',
		'type' => 'text');	
	
	$options[] = array(
		'name' => __('archives页面链接', 'options_framework_theme'),
		'desc' => __('归档地址链接', 'options_framework_theme'),
		'id' => 'archives_link',
		'std' => '#',
		'type' => 'text');
		
		
		
		

	return $options;
}