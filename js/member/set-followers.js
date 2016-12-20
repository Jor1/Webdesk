/**
 * Created by baiby on 16/8/18.
 */

$(document).ready(function () {
    $('.changeInfo').change(function () {
        var obj = $(this);
        var appoint_type = obj.attr('name');
        var input_type = obj.attr('type');
        var projectKey = $('#project_key').val();
        var user_ids = [];
        var reqData = [];
        var changeStatus = [];
        changeStatus[0] = true;
        user_ids[0] = obj.attr('data-userId');
        var changeObj = $('input[name="' + appoint_type + '"][active]');
        if ('radio' == input_type && changeObj.length) {
            var changeUserId = changeObj.attr('data-userId');
            if (user_ids[0] != changeUserId) {
                changeObj.removeAttr('active');
                user_ids[1] = changeObj.attr('data-userId');
                changeStatus[1] = false;
                obj.attr('active', 'active');
            }

        }

        for (var user_key in user_ids) {
            var user_id = user_ids[user_key];

            var appoint = '';
            var followers = '';
            $('input[name="followers_' + user_id + '"]').each(function () {
                if ($(this).is(':checked')) {
                    followers += '1';
                } else {
                    followers += '0';
                }
            });
            $('input[data-key="appoint_' + user_id + '"]').each(function () {
                if ($(this).is(':checked')) {
                    appoint += '1';
                } else {
                    appoint += '0';
                }
            });
            //reqData[user_key] = {user_id: user_id, appoint: appoint, followers: followers};

            $.ajax({
                url: '/appoint?=id=<?=$project_id?>',
                url: '/member/set-followers?key=' + projectKey,
                type: 'POST',
                data: {user_id: user_id, appoint: appoint, followers: followers, changeStatus: changeStatus[user_key]},
                dataType: 'json',
                success: function (rep) {
                    if (rep.data.status) {
                        $('.ebms-success-tip').tip('保存成功');
                    } else {
                        if ('' != rep.data.msg) {
                            $('.ebms-failed-tip').tip(rep.data.msg);
                        } else {
                            $('.ebms-failed-tip').tip('保存失败，请刷新页面重试');
                        }
                    }
                },
                error: function () {
                    $('.ebms-failed-tip').tip('保存失败，请刷新页面重试');
                }
            });
        }


    });
});