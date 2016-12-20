/**
 * Created by Chase on 16/8/11.
 */
$(document).ready(function() {
    /*下拉框效果start*/
    $(".testin-select").each(function(){
        var $this = $(this),
            $drop_list = $(this).find('.testin-select-hidden');
        $(this).on('click',function() {
            if (1 == emptyDeleted) {
                $('.ebms-warning-tip').tip('没有曾经邀请的用户');
            }
            $drop_list.fadeIn(function(){
                $this.addClass('open');
            });
        });
    });

    $(document).click(function(){
        $(".testin-select.open .testin-select-hidden").fadeOut(function(){
            $(this).parent().removeClass('open');
        });
    })
    $(".testin-select2").on('click',function(e){
        if($(this).hasClass('open'))
            e.stopPropagation();
    });
    /*下拉框效果end*/
    
    function ajaxGetData(page){
        $.post(staff_list_url, {page: page}, function (data) {
            $('#staff-list').html(data);
            $('.icon-next').unbind('click');
            $('.icon-next').bind('click', change_page_event);
            $('.icon-prev').unbind('click');
            $('.icon-prev').bind('click', change_page_event);
            $('.delStaff').unbind('click');
            $('.delStaff').bind('click', del_staff_event);
            $('.delete').unbind('click');
            $('.delete').bind('click', confirm_del_event);
            $('.input-radio').unbind('change');
            $('.input-radio').bind('change', change_role_event);
        });
    }


    //ajax翻页
    var change_page_event = function () {
        var page = $(this).attr('data-page');
        var pages = $('.page-list').attr('data-pages');
        if (page <= pages && page > 0) {
            ajaxGetData(page);
        }
    };
    //点击移除按钮将id赋值到确认框
    var confirm_del_event = function () {
        var id = $(this).attr('data-id');
        $('#myModal').attr('data-id', id);
    };
    //删除员工
    var del_staff_event = function () {
        var id = $('#myModal').attr('data-id');
        $.ajax({
            url: del_staff_url,
            type: 'POST',
            data: {id: id},
            dataType: 'json',
            success: function (rep) {
                if (rep.data.status) {
                    ajaxGetData(1);
                    $('#myModal').modal("hide");
                    //$('#tr-member-'+id).remove();
                    $('.ebms-success-tip').tip('删除成员成功');
                }else{
                    if ('' != rep.data.msg) {
                        $('.ebms-failed-tip').tip(rep.data.msg);
                    } else {
                        $('.ebms-failed-tip').tip('删除失败，请刷新页面重试');
                    }
                }
            },
            error: function () {
                $('.ebms-failed-tip').tip('删除失败，请刷新页面重试');
            }
        });
    };

    //邀请员工
    var submit_emails_event = function () {
        var emails = $('#textarea-email').val();
        if (emails.indexOf('\n') > 0 || emails.indexOf('，') > 0) {
            emails = emails.replace(/，\n|\n|，/g,',');
        }
        var emailsArr = emails.split(',');
        for(var i in emailsArr){
            if ('' == emailsArr[i]) {
                emailsArr.splice(i,1);
            } else {
                var checkRes = checkEmail(emailsArr[i]);
                if (!checkRes) {
                    $('.ebms-failed-tip').tip('邮箱列表格式不正确');
                    return false;
                }
            }
        }
        emails = emailsArr.toString();
        $.post(invite_staff_url, {emails:emails}, function(data){
            if (0 == data.code) {
                if (0 == data.data.warning_count) {
                    $('.ebms-success-tip').tip('成功邀请' + data.data.success_count + '位用户');
                } else {
                    if (0 == data.data.success_count) {
                        var msg = '邀请失败，请检查用户是否已加入企业';
                    } else {
                        var msg = '成功邀请' + data.data.success_count + '位用户，' + data.data.warning_count + '位邀请失败';
                    }
                    $('.ebms-warning-tip').tip(msg);
                }

                setTimeout(function() {
                    location.reload()
                }, 3000);
            } else {
                if ('' != data.message) {
                    $('.ebms-failed-tip').tip(data.message);
                } else {
                    $('.ebms-failed-tip').tip('导入用户加载出错');
                }
            }
        });
    };
    //设置角色
    var change_role_event = function () {
        var role = $(this).val();
        var roleId = $(this).attr('data-id');
        $.post(set_role_url, {id:roleId,staff_role:role}, function(data){
            if (0 == data.code) {
                $('.ebms-success-tip').tip('保存成功');
            } else {
                $('.ebms-failed-tip').tip('保存失败，请刷新页面重试');
            }
        });
    };
    //重新邀请
    var reinvite_event = function () {
        var reinviteId = $(this).attr('data-id');
        $.post(reinvite_staff_url, {id:reinviteId}, function(data){
            if (0 == data.code) {
                $('.ebms-success-tip').tip('已向该成员重发邀请邮件');
            } else {
                $('.ebms-failed-tip').tip('邀请邮件发送失败，请稍后重试');
            }
        });
    };
    //从已删除的员工中导入
    var import_deleted_staff = function () {
        var deletedStaff = $(this).val();
        if ('checked' == $(this).attr('checked')) {
            $(this).removeAttr('checked');
        } else {
            $(this).attr('checked', 'checked');
        }

        var deletedArr = [deletedStaff];
        var textContent = $('#textarea-email').val();
        if (textContent.indexOf('\n') > 0 || textContent.indexOf('，') > 0) {
            textContent = textContent.replace(/，\n|\n|，/g,',');
        }

        var textContent = textContent.split(',');
        var mergeEmailsArr = $.merge(textContent, deletedArr);
        $.unique(mergeEmailsArr);
        for(var i in mergeEmailsArr){
            if ('checked' != $(this).attr('checked')) {
                if (deletedStaff == mergeEmailsArr[i]) {
                    mergeEmailsArr.splice(i,1);
                }
            }
            if ('' == mergeEmailsArr[i]) {
                mergeEmailsArr.splice(i,1);
            }
        }
        $('#textarea-email').val(mergeEmailsArr);
    };

    /*检查邮箱格式*/
    function checkEmail (a) {
        var rule = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;
        if( !rule.test(a) ){
            return false;
        }
        return true;
    }

    $('.icon-next').click(change_page_event);
    $('.icon-prev').click(change_page_event);
    $('.delStaff').click(del_staff_event);
    $('.input-deleted-list').change(import_deleted_staff);
    $('.delete').click(confirm_del_event);
    $('.button-reinvite').click(reinvite_event);
    $('#submit-button').click(submit_emails_event);
    $('.input-radio').change(change_role_event);
});