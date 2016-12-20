/**
 * Created by yangming on 16/8/4.
 */
$(function(){
    var $body = $('body');
    $('.dropdown-select').each(function(){
        var $dropdown_text = $(this).find('.dropdown-text'),
            $hidden = $(this).find('input:hidden');
        $(this).find('.dropdown-menu').each(function(){
            $(this).on('click','>li',function(){
                $hidden.val($(this).attr('value'));
                $dropdown_text.html($(this).html());
                $(this).siblings('.selected').removeClass('selected').end().addClass('selected');
            });
        });
    });

    $('.dropdown-multi').each(function(){
        var isload = true,
            that = $(this),
            $all_cbx = $(this).find('.dropdown-multi-btn .checkbox-inline .input-checkbox'),
            $dropdown_menu = $(this).find('.dropdown-menu'),
            $other_cbxs = $dropdown_menu.find('.checkbox-inline .input-checkbox');
        $all_cbx.on('change',function(){
            $other_cbxs.prop('checked',$(this).prop('checked'));
        }).parent().on('click',function(e){
            e.stopPropagation();
        });
        $other_cbxs.on('change',function(){
            $all_cbx.prop('checked',$other_cbxs.filter(':checked').length);
        });
        $dropdown_menu.on('click','>li',function(e){
            e.stopPropagation();
        });
        $(this).data('dropdown_menu',$dropdown_menu).on('shown.bs.dropdown',function(e){
            var offset = $(this).data('offset')||$dropdown_menu.show().offset();
            $dropdown_menu.hide();
            if(isload){
                $dropdown_menu.addClass('dropdown-multi-menu').appendTo($body);
                isload = false;
                $(this).data('offset',offset);
            }
            $dropdown_menu.css(offset).show();
        }).on('hidden.bs.dropdown',function(){
            $(this).data('dropdown_menu').hide();
        });
    });
    var $version_list = $('.version-list');
    $('.btn-show-more').click(function(){
        $version_list.addClass('all');
        $(this).hide();
    });

    $('.swiper').each(function() {
        var swiper = $(this).swiper({
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                paginationClickable         : true,
                spaceBetween                : 0,
                centeredSlides              : true,
                autoplay                    : 8000,
                autoplayDisableOnInteraction: false,
                onSlideChangeEnd: function(_swiper){
                    if(_swiper.activeIndex===length-1){
                        $btn_next.addClass('disabled');
                    }else if(!_swiper.activeIndex){
                        $btn_prev.addClass('disabled');
                    }
                },
                onSlideNext:function(_swiper){
                    if($btn_prev.hasClass('disabled')&&_swiper.activeIndex===1){
                        $btn_prev.removeClass('disabled');
                    }
                },
                onSlidePrev:function(_swiper){
                    if($btn_next.hasClass('disabled')&&_swiper.activeIndex===length-2){
                        $btn_next.removeClass('disabled');
                    }
                }
            }),
            length = 0,
            $swiper_slide = $(this).find('.swiper-wrapper .swiper-slide'),
            $btn_prev = $(this).find('.swiper-button-prev').addClass('disabled'),
            $btn_next = $(this).find('.swiper-button-next');
        $btn_prev.on('click', function(e){
            e.preventDefault();
            swiper.swipePrev();
        });
        $btn_next.on('click', function(e){
            e.preventDefault();
            swiper.swipeNext();
        });
        if((length = $swiper_slide.length)>1){
            $btn_prev.find('.iconfont').show();
            $btn_next.find('.iconfont').show();
        }
    });

    $('.problem-desc').each(function(){
        var $that = $(this),
            $text = $(this).find('.problem-desc-content'),
            $input_text = $(this).find('input:text'),
            $btn_edit = $(this).find('.btn-edit'),
            $btn_save = $(this).find('.btn-save');
        //保存描述
        $(this).on('save.desc',function(){
            var val = $input_text.val();
            //文本框内容为空时不保存
            !val.length||$text.text(val);
            $btn_save.hide();
            $btn_edit.show();
            $input_text.hide();
            $text.css('display','inline-block');
        });
        $input_text.on('keyup',function(e){
            if(e.keyCode==13){
                $that.trigger('save');
            }else if($btn_save.is(':hidden')){
                $btn_edit.hide();
                $btn_save.show();
            }
        });
        $btn_edit.on('click',function(){
            $text.hide();
            $input_text.val($.trim($text.text())).show().focus();
        });
        $btn_save.on('click',function(){
            $that.trigger('save');
        });
    });
    $('.bugmanagement-right').on('click','.problem-item',function(e){
        var $that = $(this),href = $(this).attr('href');
        if($(e.target).attr('target')=='null'){
            $(this).removeAttr('href');
            setTimeout(function(){
                $that.attr('href',href);
            },100)
        }
    }).on('click','.dropdown-select,.dropdown-select *',function(){
        $(this).attr('target')||($(this).attr('target','null'));
    });
});