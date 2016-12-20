/**
 * 详辑面编辑js
 * @author LYC
 */
$(document).ready(function() {
	var bug_edit_obj = {
			//绑定页面元素点击事件
			init : function(is_init) {
				var $body = $('body');
			    $('.dropdown-select').each(function(){
			        var $dropdown_text = $(this).find('.dropdown-text'),
			            $hidden = $(this).find('input:hidden');
			        $(this).find('.dropdown-menu').each(function(){
			            $(this).on('click','>li',function(){
			            	var hidden_value = $hidden.val();
			            	
			                $hidden.val($(this).attr('value'));
			                $dropdown_text.html($(this).html());
			                $(this).siblings('.selected').removeClass('selected').end().addClass('selected');
			                
			                if ($(this).attr('is_request') == 'no') {
			                	return;
			                }
			                
			                if (hidden_value == $(this).attr('value')) {
			                	return;
			                }
			                
			                $bug_id = $(this).attr('data-id');
			                $dataType = $(this).attr('data-type');
			                $dataValue = $(this).attr('data-value');
			                
			                bug_edit_obj.editReset();
			                bug_edit_obj._bug_id = $bug_id;
			                bug_edit_obj['_' + $dataType] = $dataValue;
			                
			                bug_edit_obj.edit();
			                
			                if ($dataType == 'bug_type' && $('#bug_type_str').length > 0) {
			                	$('#bug_type_str').html(bug_type_config[$dataValue]);
			                }
			            });
			        });
			    });
			    
			    if (is_init) {
			    	$('.dropdown-multi').each(function(){
				        var isload = true,
				            that = $(this),
				            $all_cbx = $(this).find('.dropdown-multi-btn .checkbox-inline .input-checkbox'),
				            $dropdown_menu = $(this).find('.dropdown-menu'),
				            $other_cbxs = $dropdown_menu.find('.checkbox-inline .input-checkbox');
				        $all_cbx.on('change',function(){
				            $other_cbxs.prop('checked',$(this).prop('checked'));
				        }).parent().on('click',function(e){
				            e.stopPropagation();
				        });
				        $other_cbxs.on('change',function(){
				            $all_cbx.prop('checked',$other_cbxs.filter(':checked').length);
				        });
				        $dropdown_menu.on('click','>li',function(e){
				            e.stopPropagation();
				        });
				        $(this).data('dropdown_menu',$dropdown_menu).on('shown.bs.dropdown',function(e){
				            if(isload){
				                $dropdown_menu.addClass('dropdown-multi-menu').appendTo($body);
				                isload = false;
				            }
				            $dropdown_menu.css(that.offset()).show();
				        }).on('hidden.bs.dropdown',function(){
				            $(this).data('dropdown_menu').hide();
				        });
				    });
			    }
			    
			    var $version_list = $('.version-list');
			    $('.btn-show-more').click(function(){
			        $version_list.addClass('all');
			        $(this).hide();
			    });
			    
			    $('.swiper').each(function() {
			        var swiper = $(this).swiper({
			            paginationClickable         : true,
			            spaceBetween                : 0,
			            centeredSlides              : true,
			            autoplay                    : 8000,
			            autoplayDisableOnInteraction: false
			        });
			        $(this).find('.swiper-button-prev').on('click', function(e){
			            e.preventDefault();
			            swiper.swipePrev();
			        });
			        $(this).find('.swiper-button-next').on('click', function(e){
			            e.preventDefault();
			            swiper.swipeNext();
			        })
			    });
			    
			    $('.problem-desc').each(function(){
			        var $that = $(this),
			            $text = $(this).find('.problem-desc-content'),
			            $input_text = $(this).find('input:text'),
			            $btn_edit = $(this).find('.btn-edit'),
			            $btn_save = $(this).find('.btn-save');
			        //保存描述
			        $(this).on('save.desc',function(){

			            var val = $input_text.val();
			            //文本框内容为空时不保存
			            !val.length||$text.text(val);
			            $btn_save.hide();
			            $btn_edit.show();
			            $input_text.hide();
			            $text.show();
			            
			            bug_edit_obj.editReset();
		                bug_edit_obj._bug_id = $('input[name=bug_title]').attr('data-id');
		                bug_edit_obj['_bug_title'] = $('input[name=bug_title]').val();
		                
		                bug_edit_obj.edit();
			        });
			        $input_text.on('keyup',function(e){
			            if(e.keyCode==13){
			                $that.trigger('save');
			            }else if($btn_save.is(':hidden')){
			                $btn_edit.hide();
			                $btn_save.show();
			            }
			        });
			        $btn_edit.on('click',function(){
			            $text.hide();
			            $input_text.show().focus();
			            $btn_save.show();
			            $btn_edit.hide();
			        });
			        $btn_save.on('click',function(){
			            $that.trigger('save');
			        });
			    });
			    
			    $('li[name=parent_module_id]').click(function() {
			    	var select_parent_module_id = $(this).val();
			    	var son = modules[select_parent_module_id] ? modules[select_parent_module_id]['son'] : null;
			    	
			    	$('#module_id_ul').empty();
			    	$('#module_name').html('-');
			    	$('#module_id_val').val(select_parent_module_id);
			    	
			    	$('<li>', {
			    		'value' : select_parent_module_id,
			    		'text' : '-',
			    		'data-type' : 'module_id',
			    		'data-value' : select_parent_module_id,
			    		'data-id' : bug_id
			    	}).appendTo('#module_id_ul');
			    	
			    	if (son) {
			    		for (var i in son) {
			    			$('<li>', {
					    		'value' : i,
					    		'text' : son[i].module_name,
					    		'data-type' : 'module_id',
					    		'data-value' : son[i].module_id,
					    		'data-id' : bug_id
					    	}).appendTo('#module_id_ul');
			    		}
			    	}
			    });
			    
			    $('#detail_list_ul a').click(function() {
			    	var content_id = $(this).attr('href');
			    	var request_type = $(this).attr('request-type');
			    	
			    	if (!request_type) {
			    		return;
			    	}
			    	
			    	if ($(content_id + ' .bug_content').html().trim().length == 0) {
			    		$.post(
					    		'/bug/' + request_type + '-info', 
					    		{'service_id' : service_id, 'biz_bug_number' : biz_bug_number}, 
					    		function(ret) {
					    			$(content_id + ' .bug_content').html(ret);
					    		}
					    	);
			    	}
			    	
			    });
			},
			edit : function(cb) {
				var param_obj = new Object();
				
				for (var wp in this._where_param) {
					var key = this._where_param[wp];
					
					if (this['_' + key] != null) {
						param_obj[key] = this['_' + key];
					}
				}
				
				$.post(this._edit_ajax_url + "?key=" + testin.key, param_obj, function(data) {
					if( 0 == data.code){
						$('.ebms-success-tip').tip('保存成功');
					}else{
						$('.ebms-failed-tip').tip('修改失败，请刷新页面重试');
					}
					
					if (cb) {
						cb(data);
					}
				}, 'json');
			},
			editReset : function() {
				this._bug_id = null;
				this._bug_title = null;
				this._bug_type = null;
				this._bug_level = null;
				this._bug_status = null;
				this._version_id = null;
				this._module_id = null;
				this._appointee_user_id = null;
				this._create_user_id = null;
				this._bug_detail = null;
				this._is_deleted = null;
			},
			_bug_id : null,
			_bug_title : null,
			_project_id : 0,
			_bug_type : null,
			_bug_level : null,
			_bug_status : null,
			_version_id : null,
			_module_id : null,
			_appointee_user_id : null,
			_create_user_id : null,
			_followers : null,
			_bug_detail : null,
			_is_deleted : null,
			_edit_ajax_url : '/bug/edit',
			_where_param : ['bug_id', 'bug_title', 'bug_type', 'bug_level', 'bug_status', 'version_id', 'module_id', 'appointee_user_id', 'create_user_id', 'bug_detail', 'is_deleted']
	};
	
	window.bug_edit_obj = bug_edit_obj;
});