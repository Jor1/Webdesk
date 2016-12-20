/* Header section */
/* jshint undef: false, unused: false */
/* global Parallax */
jQuery(window).load(llorix_one_lite_effect);
jQuery(window).resize(llorix_one_lite_effect);

function llorix_one_lite_effect() {

    if (jQuery('#llorix_one_lite_move').length > 0) {
        var scene = document.getElementById('llorix_one_lite_move');
        var window_width = jQuery(window).outerWidth();
        jQuery('#llorix_one_lite_move').css({
            'width': window_width + 120,
            'margin-left': -60,
            'margin-top': -60,
            'position': 'absolute',
        });
        var h = jQuery('.overlay-layer-wrap').outerHeight();
        jQuery('#llorix_one_lite_move').children().each(function () {
            jQuery(this).css({
                'height': h + 100,
            });
        });
        var parallax = new Parallax(scene);
    }

}

