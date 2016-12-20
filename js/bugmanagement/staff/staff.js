/**
 * Created by chenyou on 16/8/16.
 */
$(function(){
    $(".testin-select").each(function(){
        var $this = $(this),
            $drop_list = $(this).find('.testin-select-hidden');
        $(this).on('click',function() {
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
})