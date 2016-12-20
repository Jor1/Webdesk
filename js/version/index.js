/**
 * Created by Chase on 16/7/27.
 */
$(document).ready(function(){
    var projectId = $('#input-projectId').val();
    var projectKey = $('#input-projectKey').val();

    $(".title").find("input").attr("disabled",true);

    //            切换
    var can_toggle = 1;
    $(".action-area *").hover(function(){
        can_toggle = 0;
    },function(){
        can_toggle = 1;
    });

    //展开收起
    var arrow_icon_event = function(){
        if(can_toggle==1){
            $(this).parents(".version-area").toggleClass("opening");
        }
    };

    //点击添加版本按钮清空弹出框内的输入框
    var clear_input = function () {
        $('.input-version-name').val('');
        $('.input-build-name').val('');
    };

    //点击添加build号按钮清空弹出框内的输入框
    var clear_version_input = function () {
        $('.input-build-name').val('');
    };

    //添加框导入数据
    var add_version_modal_event = function(){
        var versionName = $(this).attr('data-version');
        if ('' != versionName) {
            $('#add-version .input-version-name').val(versionName);
            $('.input-version-name').attr('disabled', 'disabled');
        } else {
            $('#add-sub .input-version-name').val('');
            $('.input-version-name').attr('disabled', false);
        }
    };

    //编辑版本名称
    var edit_module_name_event = function(){
        var par = $(this).parents(".module-item");
        par.toggleClass("editing");
        if(par.hasClass("editing")){
            par.find(".adjust-layout").find(".title").find("input").attr("disabled",false);
        }else{
            par.find(".adjust-layout").find(".title").find("input").attr("disabled",true);
        }
    };

    //保存修改的版本名称
    var save_text_event = function(){
        var par = $(this).parents(".module-item");
        par.removeClass("editing");
        par.find(".adjust-layout").find(".title").find("input").attr("disabled",true);
        var versionId = $(this).closest('.module-item').attr('data-id');
        var versionName = $(this).prev('.input-version').val();
        var type = $(this).prev('.input-version').attr('data-type');
        var oldVersion = $(this).prev('.input-version').attr('data-version');
        $.post(update_version_url, {versionId : versionId, versionName : versionName, oldVersion : oldVersion, type : type, project_id : projectId}, function(data){
            if (0 == data.code) {
                $('.ebms-success-tip').tip('保存成功');
            } else {
                if ('' != data.message) {
                    $('.ebms-failed-tip').tip(data.message);
                } else {
                    $('.ebms-failed-tip').tip('保存失败，请稍后重试');
                }
            }
        });
    };

    //保存添加的版本
    var add_version_value_event = function(){
        var versionName = $('.input-version-name').val();
        var buildName = $('.input-build-name').val();
        $.post(add_version_url, {bug_version : versionName, bug_version_build : buildName, key : projectKey}, function(data){
            if (1 == data.code) {
                if ('' != data.message) {
                    $('.ebms-failed-tip').tip(data.message);
                } else {
                    $('.ebms-failed-tip').tip('保存失败，请稍后重试');
                }
            } else {
                $('#add-version').modal("hide");
                $('.ebms-success-tip').tip('保存成功');
                $('#version-list').html(data);
                var addBugVersion = $('#input-addBugVersion').val();
                $('.list-version'+addBugVersion).parents(".version-area").toggleClass("opening");
                reload_all_function($('.module_list_wrapper'));
            }
        })
    };

    //删除版本
    var del_version_event = function(){
        var versionId = $(this).closest('.module-item').attr('data-id');
        var versionName = $(this).closest('.module-item').attr('data-version');
        $.post(del_version_url, {versionId : versionId, project_id : projectId}, function (data) {
            if (0 == data.code) {
                $('.list-build'+versionId).remove();
                var subLength = $('.sub-list-version'+versionName).children($('.sub')).length;
                if (0 == subLength) {
                    $('.list-version'+versionName).remove();
                }
                $('.ebms-success-tip').tip('保存成功');
            } else {
                if ('' != data.message) {
                    $('.ebms-failed-tip').tip(data.message);
                } else {
                    $('.ebms-failed-tip').tip('保存失败，请稍后重试');
                }
            }
        });
    };
    
    //重新加载
    function reload_all_function(obj) {
        obj.find('.module-item.main').on('click', arrow_icon_event);
        obj.find('.edit-module-name').on('click', edit_module_name_event);
        obj.find('.remove-module').on('click', del_version_event);
        obj.find('.save-text').on('click', save_text_event);
        obj.find('.button-submit').on('click', add_version_value_event);
        obj.find('.add-version').on('click', add_version_modal_event);
        obj.find('.btn-default').on('click', clear_input);
        obj.find('.add-sub-module').on('click', clear_version_input);
    };



    $(".module-item.main").click(arrow_icon_event);         //展开收起
    $(".edit-module-name").click(edit_module_name_event);   //编辑版本名称
    $('.save-text').click(save_text_event);                 //保存修改的版本名称
    $('.button-submit').click(add_version_value_event);     //保存添加的版本
    $('.add-version').click(add_version_modal_event);       //添加框导入数据
    $('.remove-module').click(del_version_event);           //删除版本
    $('.btn-default').click(clear_input);                   //点击添加版本按钮清空弹出框内的输入框
    $('.add-sub-module').click(clear_version_input);        //点击添加build号按钮清空弹出框内的输入框
});