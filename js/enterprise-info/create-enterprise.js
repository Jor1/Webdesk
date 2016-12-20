/**
 * Created by baiby on 16/8/9.
 */
function checkPhone() {
    var inputObj = $('input[data-key="getVerifyCode"]');
    var phone = inputObj.val();
    var rule = /^(1[3|4|5|8|7][0-9])\d{8}$/;

    if (phone != 'undefined' && phone != '' && rule.test(phone)) {

        inputObj.attr('readonly', 'true');
        inputObj.blur();
        $.ajax({
            url: "/site/get-verify-code",
            type: 'POST',
            dataType: 'json',
            data: {
                phone: phone
            },
            success: function (data) {
                if (0 == data.code) {
                    $('.ebms-success-tip').tip(data.message);
                } else if (2 == data.code) {
                    $('.ebms-warning-tip').tip(data.message);
                    inputObj.removeAttr('readonly');
                    T_Countdown.stop(T_Countdown.i);
                } else {
                    inputObj.removeAttr('readonly');
                    inputObj.blur();
                    T_Countdown.stop(T_Countdown.i);
                    $('.ebms-failed-tip').tip(data.message);
                }
            },
            error: function () {
               // Notification.error({info: '验证码下发失败，请重试或联系客服协助解决'});
            }
        });

    } else {
        inputObj.blur();
        return false;
    }
}

function checkEnterpriseName(name) {
    $.post('/enterprise-info/check-enterprise-name', {name : name}, function (data) {
        if (0 == data.code) {
            $('.ebms-failed-tip').tip(data.message);
        }
    });
}

$('document').ready(function () {
    T_Countdown.setOpt({
        c: '重新获取(-TT-)s',
        e: '#get-phone',
        countType: 'D',
        beginCallback: 'checkPhone()'
    });

    $('#enterprisemanagemodel-enterprise_name').blur(function () {
        var name = $(this).val();
        checkEnterpriseName(name);
    });

});