/**
 * global js
 */

 //postzan
( function( $ ) {

$.fn.postLike = function() {
	if ($(this).hasClass('done')) {
		return false;
	} else {
		$(this).addClass('done');
		var id = $(this).data("id"),
		action = $(this).data('action'),
		rateHolder = $(this).children('.count');
		var ajax_data = {
			action: "specs_zan",
			um_id: id,
			um_action: action
		};
		$.post("/wp-admin/admin-ajax.php", ajax_data,
		function(data) {
			$(rateHolder).html(data);
		});
		return false;
	}
};
$(document).on("click", ".specsZan",
	function() {
		$(this).postLike();
});

// SHOW COMMENTS
	
	
		jQuery('.comments-hidden').show();
		jQuery('.comments-main').hide();
	
	   jQuery('.comments-hidden').click(function(){
		jQuery('.comments-main').slideDown(500);
		jQuery('.comments-hidden').hide();
	});
	

//gotop	
	
jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 100,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

});	

//nav show/hidden
$(function(){
	var h1 = 0;
	var h2 = 50;
	var ss = $(document).scrollTop();
	$(window).scroll(function(){
		var s = $(document).scrollTop();

		if(s== h1){
			$('.site-header').removeClass('yya');
		}if(s > h1){
			$('.site-header').addClass('yya');
		}if(s > h2){
			$('.site-header').addClass('gizle');
			if(s > ss){
				$('.site-header').removeClass('sabit');
			}else{
				$('.site-header').addClass('sabit');
			}
			ss = s;
		}


	});
	
});

//lightbox

 baguetteBox.run('.entry-content', {
        captions: function(element) {
            // `this` == Array of current gallery items
            return element.getElementsByTagName('img')[0].alt;
        }
    });



$(function () {
                $('.js-toggle-search').on('click', function () {
                    $('.js-toggle-search').toggleClass('is-active');
                    $('.js-search').toggleClass('is-visible');
                });

}); 

$('.openNav').click(function () {
	    $('body').toggleClass('navOpen');
	    $('.mo-nav').toggleClass('open');
	    $('.wrapper').toggleClass('open');
	    $(this).toggleClass('open');
	});

 
//preloading
$(window).load(function() {
	$("#loading").delay(300).fadeOut(300);
	$("#loading-center").click(function() {
	$("#loading").fadeOut(500);
	});
});

jQuery(document).ready(function($){
	jQuery('.archives').hide();
	jQuery('.archives:first').show();
	jQuery('#archives-temp h3').click(function() {
		jQuery(this).next().slideToggle('fast');
		return false;
	});
});


//pagenav-ajax
$("#pagination a").live("click", function(){
        $(this).addClass("loading").text("");
        $.ajax({
    type: "POST",
            url: $(this).attr("href") + "#main",
            success: function(data){
                result = $(data).find("#main .post");
                nextHref = $(data).find("#pagination a").attr("href");
                // 渐显新内容
                $("#main").append(result.fadeIn(300));
                $("#pagination a").removeClass("loading").text("加载更多");
                if ( nextHref != undefined ) {
                    $("#pagination a").attr("href", nextHref);
                } else {
                // 若没有链接，即为最后一页，则移除导航
                    $("#pagination").remove();
				
                }
            }
        });
        return false;
    });
	

// 评论分页
$body=(window.opera)?(document.compatMode=="CSS1Compat"?$('html'):$('body')):$('html,body');
// 点击分页导航链接时触发分页
$('#comments-navi a').live('click', function(e){
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: $(this).attr('href'),
        beforeSend: function(){
            $('#comments-navi').remove();
            $('ul.commentwrap').remove();
            $('#loading-comments').slideDown();
            $body.animate({scrollTop: $('#comments-list-title').offset().top - 65}, 800 );
        },
        dataType: "html",
        success: function(out){
            result = $(out).find('ul.commentwrap');
            nextlink = $(out).find('#comments-navi');
            $('#loading-comments').slideUp('fast');
            $('#loading-comments').after(result.fadeIn(500));
            $('ul.commentwrap').after(nextlink);
        }
    });
});

// 顶部加载条
$({property: 0}).animate({property: 100}, {
                duration: 1000,
                step: function() {
                    var percentage = Math.round(this.property);
                    $('#progress').css('width',  percentage+"%");
                     if(percentage == 100) {
                            $("#progress").addClass("done");//完成，隐藏进度条
                        }
                }
});


       
	
})( jQuery );

