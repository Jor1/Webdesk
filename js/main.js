/**
 * Created by lfs on 16/7/28.
 */
var testin = {
		init : function() {
			this.param = this.request();
			this.key = $('body').attr('key');
			this.url = location.pathname;
		},
		get_project : function(){
			if (!testin.project) {
				$.post('/site/get-project', {'key' : this.key, 'url' : this.url}, function(data){
					if (data.code != 0) {
						return;
					}
					
					testin.project = data.data;

					$('#nav_project_ul').html(testin.project.project_list_html);
					
					//if ($('#nav_project_type').html().trim().length == 0) {
						var project_type_symbol = '';
						
						switch (testin.project.current_project.project_type) {
							case 0:
								project_type_symbol = '&#xe612;';
								break;
							case 1:
								project_type_symbol = '&#xe610;';
								break;
							case 2:
								project_type_symbol = '&#xe62c;';
								break;
							default:
							
						}
						
						$('#nav_project_type').html(project_type_symbol);
					//}

					//todo::这里有点没想明白(等彦成看一下)
					//if ($('#nav_project_name').html().trim().length == 0) {
						$('#nav_project_name').html(testin.project.current_project.project_name);
					//}
				});
			} else {
				$('#project_ul').html(testin.project.project_list_html);
			}
			
		},
		request : function() {
			var url = location.search; //获取url中"?"符后的字串
			var theRequest = new Object(); 

			if (url.indexOf("?") != -1) { 
				var str = url.substr(1); 
				strs = str.split("&"); 

				for(var i = 0; i < strs.length; i ++) { 
					theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
				} 
			} 
			
			return theRequest; 
		},
		param : null,
		project : null,
		key : null,
		url : null
};

$(document).ready(function(){
	testin.init();
	
	if (!testin.project) {
		if ($('#nav_project_type').length > 0) {
			testin.get_project();
		}
	}
});

var upload_Url = 'http://fs.testin.cn/form.upload';

var tips = {
	init : function(){
		var info = '';
		var info_class = 'info';
		
		if ('error' == info_class) {
			tips.error(info);
		} else if('success' == info_class) {
			tips.success(info);
		} else if('warn' == info_class) {
			tips.warn(info);
		} else {
			tips.info(info);
		}
	},
	error : function(info){
		$('.ebms-tip').addClass('ebms-failed-tip').html('<i class=\"iconfont\">&#xe64d;</i>'+info);
	},
	success : function(info){
		$('.ebms-tip').addClass('ebms-success-tip').html('<i class=\"iconfont\">&#xe60f;</i>'+info);
	},
	info : function (info) {
		$('.ebms-tip').html(info);
	},
	warn : function(info) {
		$('.ebms-tip').addClass('ebms-warning-tip').html('<i class=\"iconfont\">&#xe619;</i>'+info);
	}
};