/* slider [begin] */
var slideWidth;
var slideCount;
var slideHeight = 0;
var sliderUlHeight = 0;
var marginTop = 0;

/* LATEST NEWS */
jQuery(document).ready(function () {
    llorix_one_latest_news();
    jQuery('button.control_prev').click(function () {
        llorix_one_moveBottom();
    });
    jQuery('button.control_next').click(function () {
         llorix_one_moveTop();
    });
});

jQuery(window).resize(function() {    
   
    /* maximum height for slides */
    slideWidth;
    slideCount;
    slideHeight = 0;
    sliderUlHeight = 0;
    marginTop = 0;

    jQuery('#llorix_one_slider > ul > li').css('height','auto').each(function(){
        if ( slideHeight < jQuery(this).height() ){
            slideHeight = jQuery(this).height();
        }
    });

    slideCount = jQuery('#llorix_one_slider > ul > li').length;
    sliderUlHeight = slideCount * slideHeight;
    
    /* set height */
    jQuery('#llorix_one_slider').css({ width: slideWidth, height: slideHeight });
    jQuery('#llorix_one_slider > ul > li ').css({ height: slideHeight}); 
    jQuery('#llorix_one_slider > ul').css({ height: sliderUlHeight, top: marginTop });

    if( jQuery('.control_next').hasClass('fade-btn') ){
        jQuery('.control_next').removeClass('fade-btn');
    }
    if( !jQuery('.control_prev').hasClass('fade-btn') ){
        jQuery('.control_prev').addClass('fade-btn');
    }

});

/* latest news [start] */
function llorix_one_latest_news() {

     /* maximum height for slides */
    slideHeight = 0;

    jQuery('#llorix_one_slider > ul > li').css('height','auto').each(function(){
        if ( slideHeight < jQuery(this).height() ){
            slideHeight = jQuery(this).height();
        }
    });

    slideCount = jQuery('#llorix_one_slider > ul > li').length;
    sliderUlHeight = slideCount * slideHeight;
    
    /* set height */
    jQuery('#llorix_one_slider').css({ width: slideWidth, height: slideHeight });
    jQuery('#llorix_one_slider > ul > li ').css({ height: slideHeight}); 
    jQuery('#llorix_one_slider > ul').css({ height: sliderUlHeight});

}

function llorix_one_moveTop() {
    if ( marginTop - slideHeight >= - sliderUlHeight + slideHeight ){
        marginTop = marginTop - slideHeight;
        jQuery('#llorix_one_slider > ul').animate({
            top: marginTop
        }, 400 );
        if( marginTop === - slideHeight * (slideCount-1) ) {
            jQuery('.control_next').addClass('fade-btn');
        }
        if( jQuery('.control_prev').hasClass('fade-btn') ){
            jQuery('.control_prev').removeClass('fade-btn');
        }
    }
}

function llorix_one_moveBottom() {
    if ( marginTop + slideHeight <= 0 ){
        marginTop = marginTop + slideHeight;
        jQuery('#llorix_one_slider > ul').animate({
            top: marginTop
        }, 400 );
        if( marginTop === 0 ) {
            jQuery('.control_prev').addClass('fade-btn');
        }
        if( jQuery('.control_next').hasClass('fade-btn') ){
            jQuery('.control_next').removeClass('fade-btn');
        }
    }
}
/* latest news [end] */

/* PRE LOADER */
jQuery(window).load(function () {
    'use strict';
    jQuery('.status').fadeOut();
    jQuery('.preloader').delay(1000).fadeOut('slow');
});

jQuery(window).resize(function() {
    'use strict';
    var ww = jQuery(window).width();
    /* COLLAPSE NAVIGATION ON MOBILE AFTER CLICKING ON LINK */
    if (ww < 480) {
        jQuery('.sticky-navigation a').on('click', function() {
            jQuery('.navbar-toggle').click();
        });
    }
});

/*=============================
========= MAP OVERLAY =========
===============================*/
jQuery(document).ready(function(){
    jQuery('html').click(function() {
        jQuery('.llorix_one_lite_map_overlay').show();
    });
    
    jQuery('#container-fluid').click(function(event){
        event.stopPropagation();
    });
    
    jQuery('.llorix_one_lite_map_overlay').on('click',function(){
        jQuery(this).hide();
    });
});

jQuery(document).ready(function(){
    if(jQuery('.overlay-layer-nav').hasClass('sticky-navigation-open')){
        var llorix_one_lite_header_height = jQuery('.navbar').height();
        llorix_one_lite_header_height += 84;
        jQuery('.header .overlay-layer').css('padding-top',llorix_one_lite_header_height);
    }
});