/**
 * Created by yangming on 16/5/9.
 */
$(function () {
    'use strict';
    //左侧菜单展开收起
    var $navbar_expand_toggle = $(".navbar-expand-toggle"),
        $app_container = $('.app-container'),
        $navbar_right_expand_toggle = $('.navbar-right-expand-toggle'),
        $navbar_right = $(".navbar-right");
    $navbar_expand_toggle.click(function () {
        $app_container.toggleClass("expanded");
        $navbar_expand_toggle.toggleClass("fa-rotate-90");
    });
    $navbar_right_expand_toggle.click(function () {
        $navbar_right.toggleClass("expanded");
        $navbar_right_expand_toggle.toggleClass("fa-rotate-90");
    });
    //轮播图
    $('.swiper-container').height($(window).height()).swiper({
        pagination                  : '.swiper-pagination',
        nextButton                  : '.swiper-button-next',
        prevButton                  : '.swiper-button-prev',
        paginationClickable         : true,
        spaceBetween                : 0,
        centeredSlides              : true,
        autoplay                    : 8000,
        autoplayDisableOnInteraction: false
    });
    //全局提示
    $(".testin-tip").each(function () {
        var that = $(this);
        $(this).on('click', ".tip-close", function () {
            that.slideUp();
        });
    });
    //导航
    $('.navbar .dropdown-menu').click(function(e){
        e.stopPropagation();
    });
    //$(document).data('click.bs.dropdown.backdrop',true);
    var screenH = $(window).height();
    var screenW = $(window).width();//元素的宽度铺满全屏
    var top = $(".swiper-container");
    var navbar = $('.navbar');
    var navbar_nav = $('.navbar-nav');
    var w = $(window);
    top.height(screenH);
    //top.width(screenW);//元素的宽度铺满全屏
    w.on("resize",function(){
        top.css({
            //'width':$(window).width(),//元素的宽度铺满全屏
            'height':$(window).height()
        });

    });
    var isActive = false,
        isScroll = false;
    w.bind("scroll",function() {
        var w = $(window).width();	// 浏览器当前窗口可视区域宽度
        var i = 768;	// 屏宽范围
        if(w <= i){return false;}

        var t = 0;	// 上面导航条的高度
        var h = $(document).scrollTop();	// 页面滚动高度(上面卷起来的高度)
        if(h > t){
            navbar.addClass('toTop');
        }else if(h = 32&&!isActive){
            navbar.removeClass('toTop');
        }
    }).scroll();
    navbar.click(function(e){
        isScroll = $(e.target).hasClass('dropdown')||$(e.target).parent().hasClass('dropdown')?false:true;
    })
    $(".dropdown").on('click',function(e){
        if($(e.target).hasClass('nav-close')) return;
        $('.navbar').addClass('toTop');
    }).on('shown.bs.dropdown',function(){
        isActive = true;
    }).on('hidden.bs.dropdown',function(){
        isActive = false;
        !isScroll||w.scroll();
    });
    $(".nav-close").click(function(e){
        $('.dropdown').removeClass('open').trigger('hidden.bs.dropdown');
    });
    //rem定义
    var winW=document.documentElement.clientWidth;
    var desW=760;
    var rem=desW/100;
    if(winW>desW){
        winW=desW
    }
    document.documentElement.style.fontSize=winW/rem+"px";
    //仿select
    var def ={
        ul:'.testin-select-list',
        p:'.testin-select-set'
    };
    $.fn.testinSelect = function(options){
        var opts = $.extend({},def,options);
        return $(this).each(function(){
            var ul = $(this).find(opts.ul),
                p = $(this).find(opts.p);
            $(this).on('click','.testin-select-set',function(e) {
                ul.slideDown();
                e.stopPropagation();
            });
            ul.on('click','li',function(){
                var li=$(this).text();
                p.html(li).removeClass("select");
            });
        });
    };
    $('.testin-select').testinSelect();
    $(document).on('click.testin.select',function(){
        $(this).find(def.ul).slideUp();
    });


});
