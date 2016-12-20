/**
 * Created by Chase on 16/7/28.
 */
$(document).ready(function(){
    /*下拉框效果start*/
    $(".testin-select").each(function(){
        var $this = $(this),
            $drop_list = $(this).find('.testin-select-hidden');
        $(this).on('click',function() {
            var className = this.className;
            if (className.indexOf('testin-select1') > 0) {
                if (1 == emptyProject) {
                    $('.ebms-warning-tip').tip('没有其他项目');
                }
            }
            if (className.indexOf('testin-select2') > 0) {
                if (1 == emptyDeleted) {
                    $('.ebms-warning-tip').tip('没有曾经邀请的用户');
                }
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
        if (1 == emptyDeleted) {
            $('.ebms-warning-tip').tip('没有曾经邀请的用户');
        }
        if($(this).hasClass('open'))
            e.stopPropagation();
    });
    /*下拉框效果end*/

    var inviteJs = {
        init : function(){
            var project_key = $('#input-hidden-projectKey').val();

            //改变角色
            $('.input-radio').change(function(){
                var role = $(this).val();
                var roleId = $(this).attr('data-id');
                inviteJs.changeRole(role,roleId,project_key);
            });
            //删除成员
            $('.a-remove-member').click(function(){
                var removeId = $(this).attr('data-id');
                inviteJs.delMember(removeId,project_key);
            });
            //重新邀请
            $('.button-reinvite').click(function(){
                var reinviteId = $(this).attr('data-id');
                inviteJs.reinviteMember(reinviteId);
            });
            //从其他项目里导入成员
            $('.li-project-list').click(function(){
                var selectProjectId = $(this).attr('data-id');
                var textContent = $('#textarea-email').val();
                inviteJs.selectProject(selectProjectId);
            });
            //从已删除的成员中导入
            $('.input-deleted-list').change(function(){
                var deletedMember = $(this).val();
                inviteJs.selectDeletedMember(this, deletedMember);
            });
            //邀请成员
            $('#submit-button').click(function() {
                inviteJs.formSubmit(project_key);
            });
        },

        /*检查邮箱格式*/
        checkEmail : function(a){
            var rule = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;
            if( !rule.test(a) ){
                return false;
            }
            return true;
        },
        //改变角色
        changeRole : function(role,id,projectKey){
            $.post(set_role_url, {id:id,member_role:role,projectKey:projectKey}, function(data){
                if (0 == data.code) {
                    $('.ebms-success-tip').tip('保存成功');
                } else {
                    if ('' != data.message) {
                        $('.ebms-failed-tip').tip(data.message);
                    } else {
                        $('.ebms-failed-tip').tip('保存失败，请刷新页面重试');
                    }
                }
            });
        },
        //删除成员
        delMember : function(id,project_key){
            $.post(del_member_url, {id:id,projectKey:project_key}, function(data){
                if (0 == data.code) {
                    $('#tr-member-'+id).remove();
                    $('.ebms-success-tip').tip('删除成员成功');
                } else {
                    if ('' != data.message) {
                        $('.ebms-failed-tip').tip(data.message);
                    } else {
                        $('.ebms-failed-tip').tip('删除失败，请刷新页面重试');
                    }
                }
            });
        },
        //重新邀请
        reinviteMember : function(id){
            $.post(reinvite_member_url, {id:id}, function(data){
                if (0 == data.code) {
                    $('.ebms-success-tip').tip('已向该成员重发邀请邮件');
                } else {
                    $('.ebms-failed-tip').tip('邀请邮件发送失败，请稍后重试');
                }
            });
        },
        //从其他项目里导入成员
        selectProject : function(selectProjectId){
            $.post(project_member_url, {projectKey:selectProjectId}, function(data){
                if (0 == data.code) {
                    var emails = $('#textarea-email').val();
                    if (emails.indexOf('\n') > 0 || emails.indexOf('，') > 0) {
                        emails = emails.replace(/，\n|\n|，/g,',');
                    }

                    var emailsArr = emails.split(',');
                    var newEmailsArr = data.message.split(',');

                    var mergeEmailsArr = $.merge(emailsArr, newEmailsArr);
                    //$.unique(mergeEmailsArr);

                    for(var i in mergeEmailsArr){
                        if ('' == $.trim(mergeEmailsArr[i])) {
                            mergeEmailsArr.splice(i,1);
                        }
                    }

                    $('#textarea-email').val(mergeEmailsArr);
                } else {
                    $('.ebms-failed-tip').tip('导入失败');
                }
            });
        },
        //从已删除的成员中导入
        selectDeletedMember : function(a, deletedMember){
            if ('checked' == $(a).attr('checked')) {
                $(a).removeAttr('checked');
            } else {
                $(a).attr('checked', 'checked');
            }

            var deletedArr = [deletedMember];
            var textContent = $('#textarea-email').val();
            if (textContent.indexOf('\n') > 0 || textContent.indexOf('，') > 0) {
                textContent = textContent.replace(/，\n|\n|，/g,',');
            }

            var textContent = textContent.split(',');
            var mergeEmailsArr = $.merge(textContent, deletedArr);
            //$.unique(mergeEmailsArr);
            for(var i in mergeEmailsArr){
                if ('checked' != $(a).attr('checked')) {
                    if (deletedMember == mergeEmailsArr[i]) {
                        mergeEmailsArr.splice(i,1);
                    }
                }
                if ('' == mergeEmailsArr[i]) {
                    mergeEmailsArr.splice(i,1);
                }
            }
            $('#textarea-email').val(mergeEmailsArr);
        },
        //邀请成员
        formSubmit : function(project_key){
            var textContent = $('#textarea-email').val();
            if (textContent.indexOf('\n') > 0 || textContent.indexOf('，') > 0) {
                textContent = textContent.replace(/，\n|\n|，/g,',');
            }

            var emailsArr = textContent.split(',');
            //$.unique(emailsArr);
            for(var i in emailsArr){
                if ('' == emailsArr[i]) {
                    emailsArr.splice(i,1);
                } else {
                    var checkRes = inviteJs.checkEmail(emailsArr[i]);
                    if (!checkRes) {
                        $('.ebms-failed-tip').tip('邮箱列表格式不正确');
                        return false;
                    }
                }
            }
            emails = emailsArr.toString();
            $.post(invite_member_url, {emails:emails, key:project_key}, function(data){
                if (0 == data.code) {
                    if (0 == data.data.warning_count) {
                        $('.ebms-success-tip').tip('成功邀请' + data.data.success_count + '位用户');
                    } else {
                        if (0 == data.data.success_count) {
                            var msg = '邀请失败，请检查用户是否已加入项目';
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
                        $('.ebms-failed-tip').tip('邀请失败');
                    }
                }
            });
        }
    };

    inviteJs.init();

});