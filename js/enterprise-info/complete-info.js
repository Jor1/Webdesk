/**
 * Created by lfs on 16/8/10.
 */

function ajaxGetSubIndustry(obj) {
    var key = obj.val()
    var ele = obj.attr('data-key');
    $.post("/site/get-sub-industry", {key: key, ele: ele}, function (data) {

        $("select[data-val=" + ele + "]").html(data);
    });
}
$('document').ready(function ($) {

    $('.selectAjax').change(function () {
        ajaxGetSubIndustry($(this));
    });

    $('.enterprise_type').click(function () {
        $('.enterprise_type').removeClass('active');
        $(this).addClass('active');
        var ele = $(this).attr('data-key');
        var type = $(this).val();
        $('.radio-e-type').removeAttr('checked').eq(type).attr('checked', 'checked');
        if (0 != type) {
            $.post("/site/get-industry-type", {ele: ele}, function (data) {
                $("select[data-val=enterprise_industry]").hide().html('<option value="-"></option>');
                $("select[data-key=enterprise_industry]").html(data).unbind('change');
            });
        } else {

            $.post("/site/get-industry-type", {ele: ele, level: 1}, function (data) {
                $("select[data-key=enterprise_industry]").html(data).bind('change', function () {
                    ajaxGetSubIndustry($(this));
                });
                ajaxGetSubIndustry($('select[data-key=enterprise_industry]'));
                $("select[data-val=enterprise_industry]").show();
            });
        }
    });

});