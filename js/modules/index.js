/**
 * Created by lfs on 16/8/4.
 */
var flg = 1;
$(document).ready(function(){

    $(".title").find("input").attr("disabled",true);
    
    var module_old_name='';//编辑时的老数据

    //切换
    var can_toggle = 1;
    $(".action-area *").hover(function(){
        can_toggle = 0;
    },function(){
        can_toggle = 1;
    });

    var arrow_icon_event = function(){
        $(this).parents(".version-area").toggleClass("opening");
    };

    //
    var edit_module_name_event = function(){
        var par = $(this).parents(".module-item");
        par.toggleClass("editing");
        if (par.hasClass("editing")) {
            par.find(".adjust-layout").find(".title").find("input").attr("disabled",false);
            module_old_name = par.find(".adjust-layout").find(".title").find("input").val();
        }else{
            par.find(".adjust-layout").find(".title").find("input").attr("disabled",true);
        }
    };

    //
    var save_text_event = function(){
        var par = $(this).parents(".module-item");
        var module_name = $.trim(par.find(".adjust-layout").find(".title").find("input").val());

        if(undefined == module_name || '' == module_name ){
            $('.ebms-warning-tip').tip('请填写模块名称');
            par.find(".adjust-layout").find(".title").find("input").val(module_old_name);
            return false;
        }

        if (module_name.length>20) {
            $('.ebms-warning-tip').tip('模块名不能超过20字符');
            return false;
        }

        var module_id = par.attr('data-id');
        var project_id = $('#module-project-id').val();

        $.ajax({
            url : edit_module_url,
            data : {'project_id' : project_id,'module_id' :module_id, 'module_name':module_name},
            type : 'post',
            dataType : 'json',

            success: function(e) {
                if (0 == e.code) {

                    par.removeClass("editing");
                    par.find(".adjust-layout").find(".title").find("input").attr("disabled",true);

                    //提示成功
                    $('.ebms-success-tip').tip('保存成功');
                } else {
                    par.removeClass("editing");
                    par.find(".adjust-layout").find(".title").find("input").val(module_old_name).attr("disabled",true);

                    //提示失败
                    if(e.msg == null){
                        $('.ebms-success-tip').tip('保存成功');
                    }else{
                        $('.ebms-failed-tip').tip('保存失败');

                    }
                }
            },
            error : function () {
                //提示失败

            }
        });

    };

    //添加模块
    var add_module_value_event = function(){
        var moduleId = $(this).closest('.main').attr('data-id');

        $('#parent-module-id').val('');

        //主模块
        if('undefined' == moduleId){

        //子模块
        } else {
            $('#parent-module-id').val(moduleId);
        }
    };

    var close_event = function(){
        $('#parent-module-id').val('');
    };

    //
    var remove_module_event = function(){
        var module_id = $(this).closest('.module-item').attr('data-id');
        var project_id = $('#module-project-id').val();

        $.ajax({
            url : del_module_url,
            data : {'project_id' : project_id, 'module_id' : module_id},
            type : 'post',
            dataType : 'json',

            success: function(e) {
                if (0 == e.code) {
                    //成功提示
                    $('.ebms-success-tip').tip('删除成功');

                    //前端修改
                    $(".module-item").each(function(){
                        var $userId = $(this).attr('data-id');

                        if($userId == e.data.module_id){
                            if(1 == $(this).closest('.version-area').children('.sub-module-container').length){
                                $(this).closest('.version-area').find('.btn-disabled').addClass('remove-module').removeClass('btn-disabled').attr('style','').click(remove_module_event);
                            }

                            $(this).parent().remove();
                        }
                    });

                    if(0 == $('.module_list_wrapper').children('.version-area').length){
                        $('.module_list_wrapper').append('<p>这个项目没有建立任何模块</p>');
                    }

                } else {
                    $('.ebms-failed-tip').tip('删除失败');

                }
            }
        });
    };

    //重新加载
    function reload_all_function(obj) {
        var objBigClass = obj.attr('class');
        
        //清除掉父级数据
        $('#parent-module-id').val('');
        $('#modulemodel-module_name').val('');
        
        if  ('version-area' == objBigClass) { //一级
            obj.find('.add-modules-value').on('click', add_module_value_event);
            obj.find('.module-item.main').on('click', arrow_icon_event);
            obj.find('.edit-module-name').on('click', edit_module_name_event);
            if(flg){
                obj.find('.remove-module').on('click', remove_module_event);
            }
            obj.find('.save-text').on('click', save_text_event);

        } else {    //二级

            obj.find('.edit-module-name').on('click', edit_module_name_event);
            obj.find('.remove-module').on('click', remove_module_event);
            obj.find('.save-text').on('click', save_text_event);
        }
    };

    //增加模块按钮
    var add_module_btn_event = function(){
        //去除二级模块数据
        var data = $('#add-modules-modal').serializeArray();
        if('' == $.trim(data[1].value)){
            $('.ebms-warning-tip').tip('模块名称不能为空');
            return false;
        } else {
            data[1].value = $.trim(data[1].value);
        }
        //名称
        if(data[1].value.length > 20){
            $('.ebms-warning-tip').tip('模块名不能超过20字符');
            return false;
        }

        $.ajax({
            url : add_module_url,
            data : data,
            type : 'post',
            dataType : 'json',

            success: function(e) {
                if (0 == e.code) {

                    if (1 == e.data.module_type) {      //主模块
                        if( 0 == $('.module_list_wrapper').children('.version-area').length){
                            $('.module_list_wrapper').empty();
                        }

                        //增加模块
                        if (flg) {
                            $('.module_list_wrapper').append("<div class=\"version-area\"> <div class=\"module-item clearfix main\" data-id=\" "+e.data.module_id+" \"> <div class=\"adjust-layout clearfix\"> <div class=\"col-xs-7 title\"> <div class=\"arrow-icon\"> <i class=\"iconfont\">&#xe607;</i> </div> <input type=\"text\" value=\""+e.data.module_name+"\" disabled='disabled'> <i class=\"save-text iconfont\">&#xe60f;</i> </div> <div class=\"col-xs-5 action\"> <div class=\"action-area\"> <a class=\"add-sub-module add-modules-value\" data-toggle=\"modal\" data-target=\"#add-main\">添加子模块</a> <a class=\"edit-module-name\">编辑</a> <a class=\"remove-module\">删除</a> </div> </div> </div> </div></div>");
                        } else {
                            $('.module_list_wrapper').append("<div class=\"version-area\"> <div class=\"module-item clearfix main\" data-id=\" "+e.data.module_id+" \"> <div class=\"adjust-layout clearfix\"> <div class=\"col-xs-7 title\"> <div class=\"arrow-icon\"> <i class=\"iconfont\">&#xe607;</i> </div> <input type=\"text\" value=\""+e.data.module_name+"\" disabled='disabled'> <i class=\"save-text iconfont\">&#xe60f;</i> </div> <div class=\"col-xs-5 action\"> <div class=\"action-area\"> <a class=\"add-sub-module add-modules-value\" data-toggle=\"modal\" data-target=\"#add-main\">添加子模块</a> <a class=\"edit-module-name\">编辑</a> </div> </div> </div> </div></div>");
                        }

                        //增加事件
                        reload_all_function($('.module_list_wrapper').find('.version-area:last'));

                    } else if(2 == e.data.module_type) {    //子模块

                        //查找子模块
                        $('.version-area').find(".module-item").each(function(){
                            var $data_id = $(this).attr('data-id');

                            if($data_id  == e.data.parent_module_id){
                                if (flg) {
                                    $(this).closest('.version-area').append("<div class=\"sub-module-container\"> <div class=\"module-item sub clearfix\" data-id=\" " + e.data.module_id + " \"> <div class=\"adjust-layout clearfix\"> <div class=\"col-xs-7 title\"> <input type=\"text\" value=\"" + e.data.module_name+"\" disabled='disabled'> <i class=\"save-text iconfont\">&#xe60f;</i> </div> <div class=\"col-xs-5 action\"> <div class=\"action-area\"> <a class=\"edit-module-name\">编辑</a> <a class=\"remove-module\">删除</a> </div> </div> </div> </div> </div>");
                                }else{
                                    $(this).closest('.version-area').append("<div class=\"sub-module-container\"> <div class=\"module-item sub clearfix\" data-id=\" " + e.data.module_id + " \"> <div class=\"adjust-layout clearfix\"> <div class=\"col-xs-7 title\"> <input type=\"text\" value=\"" + e.data.module_name+"\" disabled='disabled'> <i class=\"save-text iconfont\">&#xe60f;</i> </div> <div class=\"col-xs-5 action\"> <div class=\"action-area\"> <a class=\"edit-module-name\">编辑</a></div> </div> </div> </div> </div>");
                                }
                                $(this).find('.remove-module').addClass('btn-disabled').removeClass('remove-module').css('color','#cccccc');

                                //增加事件
                                reload_all_function($(this).closest('.version-area').find('.sub-module-container:last'));
                            }
                        });

                        //主模块删除按钮更改
                    }
                    $('#add-main').modal("hide");

                    //提示语
                    $('.ebms-success-tip').tip('保存成功');

                } else {
                    //提示语
                   $('.ebms-failed-tip').tip('保存失败');
                }
            },
            error : function () {
                $('.ebms-failed-tip').tip('保存失败');
            }
        });
    };
    

    //切换
    $(".module-item.main").click(arrow_icon_event);

    //编辑模块名称
    $(".edit-module-name").click(edit_module_name_event);

    //保存名称
    $(".save-text").click(save_text_event);

    //添加模块获取数值
    $('.add-modules-value').click(add_module_value_event);

    $('.close').click(close_event);

    //添加模块
    $('#add-module-btn').click(add_module_btn_event);
    
    //删除提示
    $('.remove-module').click(remove_module_event);
    
});