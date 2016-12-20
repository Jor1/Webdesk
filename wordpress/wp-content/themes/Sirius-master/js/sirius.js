(function($) {
	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 1024px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});
	$.fn.postLike = function() {
		if ($(this).hasClass('done')) {
			alert('您已赞过该文章');
			return false;
		} else {
			$(this).addClass('done');
			var id = $(this).data("id"),
				action = $(this).data('action'),
				rateHolder = $(this).children('.count');
			var ajax_data = {
				action: "sirius_love",
				um_id: id,
				um_action: action
			};
			$.post("/wp-admin/admin-ajax.php", ajax_data, function(data) {
				$(rateHolder).html(data);
			});
			return false;
		}
	};
	$(document).on("click", ".SiriusLove", function() {
		$(this).postLike();
	});
	$(function() {
		var $body = $('body'),
			$header = $('#header'),
			$nav = $('#nav'),
			$nav_a = $nav.find('a'),
			$wrapper = $('#wrapper');
		$('form').placeholder();
		skel.on('+medium -medium', function() {
			$.prioritize('.important\\28 medium\\29', skel.breakpoint('medium').active)
		});
		$('<div id="titleBar">' + '<a href="#header" class="toggle"></a>' + '<span class="title">' + $('#site-name').html() + '</span>' + '</div>').appendTo($body);
		$('#header').panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'right',
			target: $body,
			visibleClass: 'header-visible'
		});
		if (skel.vars.os == 'wp' && skel.vars.osVersion < 10) $('#titleBar, #header, #wrapper').css('transition', 'none')
	})
})(jQuery);