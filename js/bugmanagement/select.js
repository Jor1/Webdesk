/**
 * Created by chenyou on 16/8/2.
 */
$(function(){
    $.fn.testinSelect = function(options){
        var def ={
            ul:'.testin-select-list',
            p:'.testin-select-set'
        };
        var opts = $.extend({},def,options);
        return $(this).each(function(){
            var ul = $(this).find(opts.ul),
                p = $(this).find(opts.p);
            $(this).on('click','.testin-select-set',function() {
                if (ul.css("display") == "none") {
                    ul.slideDown();
                } else {
                    ul.slideUp();
                }
            });
            ul.on('click','li',function(){
                var li=$(this).text();
                $('#jobInput').val(li);
                p.html(li).removeClass("select");
                ul.hide();
                $('#jobError').html('').hide();
            });
        });
    };
    $(".testin-select").testinSelect();

    $(".set").click(function(){
        var _name = $(this).attr("name");
        if( $("[name="+_name+"]").length > 1 ){
            $("[name="+_name+"]").removeClass("select");
            $(this).addClass("select");
        } else {
            if( $(this).hasClass("select") ){
                $(this).removeClass("select");
            } else {
                $(this).addClass("select");
            }
        }
    });
});
