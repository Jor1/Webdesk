/**
 * 列表页js
 * @author LYC
 */

$(document).ready(function(){
	
	var bug_list_obj = {
			//绑定页面元素点击事件
			init : function() {
				
				$('input[name=bug_type],input[name=bug_level],input[name=bug_status],input[name="version_id"],input[name="module_id"],input[name="appointee_user_id"],'+
				'input[name="create_user_id"],input[name="followers"],input[name="search"],input[name=parent_version_id],input[name=parent_module_id]').change(function() {
					bug_list_obj.queryResult(true);
				});
				
				$('#btn_resetForm').click(function() {
					$('input[type=checkbox]:checked').each(function(index, element) {
						$(element).removeAttr('checked');
					});
					
					$('input[name="search"]').val('');
					
					bug_list_obj.queryResult(true);
				});
				
//				if ($('#form_member input[type=checkbox]:checked').length > 0) {
//					bug_list_obj.queryResult(true);
//				}
				
				bug_list_obj.queryResult(true);
				
			},
			query : function() {
				var param_obj = new Object();
				param_obj.where = new Object();
				
				for (var wp in this._where_param) {
					var key = this._where_param[wp];
					
					if ((typeof(this['_' + key]) == 'string' && this['_' + key] != '') ||
						(this['_' + key] instanceof Array && this['_' + key].length > 0) ||
						(typeof(this['_' + key]) == 'number' && this['_' + key] != 0) ) 
					{
						param_obj.where[key] = this['_' + key];
					}
				}
				
				if (this._search_string != '') {
					param_obj.search_string = this._search_string;
				}
				
				if (this._followers.length > 0) {
					param_obj.followers = this._followers;
				}
				
				param_obj.page = this._page;
				param_obj.limit = this._limit;
				
				$.post(this._query_ajax_url + '?key=' + this._project_key, param_obj, function(data) {
					//jquery html到页面
					$('#bug_list').html(data);
					
					$('.test .s2 input').blur(function() {
						bug_list_obj.editReset();
						var bug_detail = $(this).val();
						var bug_id = $(this).attr('data-bug-id');
						
						bug_list_obj._bug_detail = bug_detail;
						bug_list_obj._bug_id = bug_id;
						
						bug_list_obj.edit();
					});
					
					$('span[data-type=prev_page_btn]').click(function(){
						bug_list_obj.prevPage();
						bug_list_obj.queryResult(false);
					});
					
					$('span[data-type=next_page_btn]').click(function(){
						bug_list_obj.nextPage();
						bug_list_obj.queryResult(false);
					});
					
					bug_edit_obj.init(false);
					
				}, 'html');
			},
			prevPage : function() {
				this._page--;
			},
			nextPage : function() {
				this._page++;
			},
			setParam : function(param, value) {
				this['_' + param] = value;
			},
			queryReset : function(isResetPage) {
				this._bug_id = 0;
				this._bug_title = '';
				this._bug_type = [];
				this._bug_level = [];
				this._bug_status = [];
				this._version_id = [];
				this._module_id = [];
				this._appointee_user_id = [];
				this._create_user_id = [];
				this._followers = [];
				
				if (isResetPage) {
					this._page = 1;
					this._limit = 20;
				}
				
				this._search_string = '';
			},
			queryResult : function(isResetPage) {
				bug_list_obj.queryReset(isResetPage);
				bug_list_obj._project_key = testin.key;
				
				for (var wp in bug_list_obj._where_param) {
					var key = bug_list_obj._where_param[wp];
					
					if (bug_list_obj['_' + key] instanceof Array) {
						$('input[name=' + key + ']:checked').each(function(index, v) {
							bug_list_obj['_' + key].push(v.value);
						});
					}
				}
				
				$('input[name=followers]:checked').each(function(index, v){
					bug_list_obj._followers.push(v.value);
				});
				
				bug_list_obj._search_string = $('input[name=search]').val();
				
				bug_list_obj.query();
			},
			_bug_id : null,
			_bug_title : null,
			_project_id : 0,
			_project_key : null,
			_bug_type : null,
			_bug_level : null,
			_bug_status : null,
			_version_id : null,
			_module_id : null,
			_appointee_user_id : null,
			_create_user_id : null,
			_followers : null,
			_bug_detail : null,
			_page : 1,
			_limit : 20,
			_search_string : null,
			_query_ajax_url : '/bug/list',
			_where_param : ['bug_id', 'bug_title', 'bug_type', 'bug_level', 'bug_status', 'version_id', 'module_id', 'appointee_user_id', 'create_user_id', 'bug_detail']
	};
	
	
	bug_list_obj.init(true);
	
});