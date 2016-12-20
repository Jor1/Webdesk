/**
 * Created by lfs on 16/8/22.
 */


$(document).ready(function(){
    $('#tabs li a').featureList({
        output			:	'#output li',
        start_item		:	1
    });

    $(window).bind("scroll",function() {
        var h = $('.team-help-main').offset().top + $('.team-help-main').height() / 2 - $(window).height() / 2;
        if ($(window).scrollTop() >= h) {
            $(".team-help-main").addClass("team-help-main-animate");
        };
    });

    $('#createPro').click(function(){
        var email = $.trim($('#proEmail').val());
        var reg = /\w+[@]{1}\w+[.]\w+/;

        if (reg.test(email)) {
            window.location = '/create-enterprise?e=' + email;
        } else {
            
        }

    });
});
