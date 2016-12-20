/**
 * Created by lfs on 16/8/22.
 */
$(function(){
    //切换
    var $select_type_box = $('.select-type-box'),
        $open_radio = $select_type_box.filter('.open-radio'),
        $field_serviceapplymodel_apple_store = $('.field-serviceapplymodel-apple_store');
    $select_type_box.each(function(){
        $(this).on("click",function(){
            var data_key = [],
                radio_length = 0;
            $(this).toggleClass("active");
            if($(this).hasClass('open-radio')){
                radio_length = $open_radio.filter('.active').length;
                $field_serviceapplymodel_apple_store.toggleClass('hidden',!radio_length);
            }
            $select_type_box.filter('.active').each(function(){
                data_key.push($(this).data('key'));
            });
            //data-key值以 逗号 连接
            //console.log(data_key.join(','));
            $('#choose-service').val(data_key.join(','));
        });
    });
    
});