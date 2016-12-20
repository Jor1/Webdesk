/* global jQuery */
/* global Color */
/* global wp */
function media_upload(button_class) {
    'use strict';

    jQuery('body').on('click', button_class, function () {
        var button_id = '#' + jQuery(this).attr('id');
        var display_field = jQuery(this).parent().children('input:text');
        var _custom_media = true;

        wp.media.editor.send.attachment = function (props, attachment) {

            if (_custom_media) {
                if (typeof display_field !== 'undefined') {
                    switch (props.size) {
                        case 'full':
                            display_field.val(attachment.sizes.full.url);
                            display_field.trigger('change');
                            break;
                        case 'medium':
                            display_field.val(attachment.sizes.medium.url);
                            display_field.trigger('change');
                            break;
                        case 'thumbnail':
                            display_field.val(attachment.sizes.thumbnail.url);
                            display_field.trigger('change');
                            break;
                        default:
                            display_field.val(attachment.url);
                            display_field.trigger('change');
                    }
                }
                _custom_media = false;
            } else {
                return wp.media.editor.send.attachment(button_id, [props, attachment]);
            }
        };
        wp.media.editor.open(button_class);
        return false;
    });
}

/********************************************
 *** Generate uniq id ***
 *********************************************/
function llorix_one_uniqid(prefix, more_entropy) {
    'use strict';
    if (typeof prefix === 'undefined') {
        prefix = '';
    }

    var retId;
    var php_js;
    var formatSeed = function (seed, reqWidth) {
        seed = parseInt(seed, 10)
            .toString(16); // to hex str
        if (reqWidth < seed.length) { // so long we split
            return seed.slice(seed.length - reqWidth);
        }
        if (reqWidth > seed.length) { // so short we pad
            return new Array(1 + (reqWidth - seed.length))
                    .join('0') + seed;
        }
        return seed;
    };

    // BEGIN REDUNDANT
    if (!php_js) {
        php_js = {};
    }
    // END REDUNDANT
    if (!php_js.uniqidSeed) { // init seed with big random int
        php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
    }
    php_js.uniqidSeed++;

    retId = prefix; // start with prefix, add current milliseconds hex string
    retId += formatSeed(parseInt(new Date()
            .getTime() / 1000, 10), 8);
    retId += formatSeed(php_js.uniqidSeed, 5); // add seed hex string
    if (more_entropy) {
        // for more entropy we add a float lower to 10
        retId += (Math.random() * 10)
            .toFixed(8)
            .toString();
    }

    return retId;
}


/********************************************
 *** General Repeater ***
 *********************************************/
function llorix_one_refresh_general_control_values() {
    'use strict';
    jQuery('.llorix_one_lite_general_control_repeater').each(function () {
        var values = [];
        var th = jQuery(this);
        th.find('.llorix_one_lite_general_control_repeater_container').each(function () {
            var icon_value = jQuery(this).find('.icp').val();
            var text = jQuery(this).find('.llorix_one_lite_text_control').val();
            var link = jQuery(this).find('.llorix_one_lite_link_control').val();
            var image_url = jQuery(this).find('.custom_media_url').val();
            var choice = jQuery(this).find('.llorix_one_lite_image_choice').val();
            var title = jQuery(this).find('.llorix_one_lite_title_control').val();
            var subtitle = jQuery(this).find('.llorix_one_lite_subtitle_control').val();
            var id = jQuery(this).find('.llorix_one_lite_box_id').val();
            var shortcode = jQuery(this).find('.llorix_one_lite_shortcode_control').val();
            if (text !== '' || image_url !== '' || title !== '' || subtitle !== '') {
                values.push({
                    'icon_value': (choice === 'llorix_one_lite_none' ? '' : icon_value),
                    'text': escapeHtml(text),
                    'link': link,
                    'image_url': (choice === 'llorix_one_lite_none' ? '' : image_url),
                    'choice': choice,
                    'title': escapeHtml(title),
                    'subtitle': escapeHtml(subtitle),
                    'id': id,
                    'shortcode': escapeHtml(shortcode)
                });
            }

        });
        th.find('.llorix_one_lite_repeater_colector').val(JSON.stringify(values));
        th.find('.llorix_one_lite_repeater_colector').trigger('change');
    });
}


jQuery(document).ready(function () {
    'use strict';
    jQuery('#customize-theme-controls').on('click', '.llorix-one-lite-customize-control-title', function () {
        jQuery(this).next().slideToggle('medium', function () {
            if (jQuery(this).is(':visible')){
                jQuery(this).css('display', 'block');
            }
        });
    });

    jQuery('#customize-theme-controls').on('change', '.llorix_one_lite_image_choice', function () {
        if (jQuery(this).val() === 'llorix_one_lite_image') {
            jQuery(this).parent().parent().find('.llorix_one_lite_general_control_icon').hide();
            jQuery(this).parent().parent().find('.llorix_one_lite_image_control').show();
        }
        if (jQuery(this).val() === 'llorix_one_lite_icon') {
            jQuery(this).parent().parent().find('.llorix_one_lite_general_control_icon').show();
            jQuery(this).parent().parent().find('.llorix_one_lite_image_control').hide();
        }
        if (jQuery(this).val() === 'llorix_one_lite_none') {
            jQuery(this).parent().parent().find('.llorix_one_lite_general_control_icon').hide();
            jQuery(this).parent().parent().find('.llorix_one_lite_image_control').hide();
        }

        llorix_one_refresh_general_control_values();
        return false;
    });
    media_upload('.custom_media_button_llorix_one_lite');
    jQuery('.custom_media_url').live('change', function () {
        llorix_one_refresh_general_control_values();
        return false;
    });


    jQuery('#customize-theme-controls').on('change', '.icp', function () {
        llorix_one_refresh_general_control_values();
        return false;
    });

    jQuery('.llorix_one_lite_general_control_new_field').on('click', function () {

        var th = jQuery(this).parent();
        var id = 'llorix_one_lite_' + llorix_one_uniqid();
        if (typeof th !== 'undefined') {

            var field = th.find('.llorix_one_lite_general_control_repeater_container:first').clone();

            if (typeof field !== 'undefined') {
                field.find('.llorix_one_lite_image_choice').val('llorix_one_lite_icon');
                field.find('.llorix_one_lite_general_control_icon').show();

                if (field.find('.llorix_one_lite_general_control_icon').length > 0) {
                    field.find('.llorix_one_lite_image_control').hide();
                }

                field.find('.llorix_one_lite_general_control_remove_field').show();

                field.find('.icp').iconpicker().on('iconpickerUpdated', function () {
                    jQuery(this).trigger('change');
                });

                field.find('.iconpicker-component').html('');
                field.find('.icp').val('');
                field.find('.llorix_one_lite_text_control').val('');
                field.find('.llorix_one_lite_link_control').val('');
                field.find('.llorix_one_lite_box_id').val(id);
                field.find('.custom_media_url').val('');
                field.find('.llorix_one_lite_title_control').val('');
                field.find('.llorix_one_lite_subtitle_control').val('');
                field.find('.llorix_one_lite_shortcode_control').val('');
                th.find('.llorix_one_lite_general_control_repeater_container:first').parent().append(field);
                llorix_one_refresh_general_control_values();
            }

        }
        return false;
    });

    jQuery('#customize-theme-controls').on('click', '.llorix_one_lite_general_control_remove_field', function () {
        if (typeof  jQuery(this).parent() !== 'undefined') {
            jQuery(this).parent().parent().remove();
            llorix_one_refresh_general_control_values();
        }
        return false;
    });


    jQuery('#customize-theme-controls').on('keyup', '.llorix_one_lite_title_control', function () {
        llorix_one_refresh_general_control_values();
    });

    jQuery('#customize-theme-controls').on('keyup', '.llorix_one_lite_subtitle_control', function () {
        llorix_one_refresh_general_control_values();
    });

    jQuery('#customize-theme-controls').on('keyup', '.llorix_one_lite_shortcode_control', function () {
        llorix_one_refresh_general_control_values();
    });

    jQuery('#customize-theme-controls').on('keyup', '.llorix_one_lite_text_control', function () {
        llorix_one_refresh_general_control_values();
    });

    jQuery('#customize-theme-controls').on('keyup', '.llorix_one_lite_link_control', function () {
        llorix_one_refresh_general_control_values();
    });

    /*Drag and drop to change icons order*/
    jQuery('.llorix_one_lite_general_control_droppable').sortable({
        update: function () {
            llorix_one_refresh_general_control_values();
        }
    });

});

var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;'
};

function escapeHtml(string) {
    'use strict';
    string = String(string).replace(/\\/g, '&#92;');
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}
/********************************************
 *** Parallax effect
 *********************************************/

jQuery(document).ready(function () {
    'use strict';
    var sh = jQuery('#customize-control-llorix_one_lite_enable_move').find('input:checkbox');
    if (!sh.is(':checked')) {
        jQuery('#customize-control-llorix_one_lite_first_layer').hide();
        jQuery('#customize-control-llorix_one_lite_second_layer').hide();
        jQuery('#customize-control-header_image').show();
    } else {
        jQuery('#customize-control-llorix_one_lite_first_layer').show();
        jQuery('#customize-control-llorix_one_lite_second_layer').show();
        jQuery('#customize-control-header_image').hide();
    }

    sh.on('change', function () {
        if (jQuery(this).is(':checked')) {
            jQuery('#customize-control-llorix_one_lite_first_layer').fadeIn();
            jQuery('#customize-control-llorix_one_lite_second_layer').fadeIn();
            jQuery('#customize-control-header_image').fadeOut();
        } else {
            jQuery('#customize-control-llorix_one_lite_first_layer').fadeOut();
            jQuery('#customize-control-llorix_one_lite_second_layer').fadeOut();
            jQuery('#customize-control-header_image').fadeIn();
        }
    });
});

/********************************************
 *** Alpha Opacity
 *********************************************/

jQuery(document).ready(function($) {
    'use strict';
    Color.prototype.toString = function(remove_alpha) {
        if (remove_alpha === 'no-alpha') {
            return this.toCSS('rgba', '1').replace(/\s+/g, '');
        }
        if (this._alpha < 1) {
            return this.toCSS('rgba', this._alpha).replace(/\s+/g, '');
        }
        var hex = parseInt(this._color, 10).toString(16);
        if (this.error) {
            return '';
        }
        if (hex.length < 6) {
            for (var i = 6 - hex.length - 1; i >= 0; i--) {
                hex = '0' + hex;
            }
        }
        return '#' + hex;
    };

    $('.pluto-color-control').each(function() {
        var $control = $(this),
            value = $control.val().replace(/\s+/g, '');
        var palette;
        // Manage Palettes
        var palette_input = $control.attr('data-palette');
        if (palette_input === 'false' || palette_input === false || palette_input === 0 || palette_input === '0') {
            palette = false;
        } else if (palette_input === 'true' || palette_input === true || palette_input === 1 || palette_input === '1') {
            palette = true;
        } else {
            palette = $control.attr('data-palette').split(',');
        }
        $control.wpColorPicker({ // change some things with the color picker
            change: function(event, ui) {
                var _new_value;
                // send ajax request to wp.customizer to enable Save & Publish button
                if( typeof ui.color !== 'undefined' ) {
                    _new_value = ui.color.toString();
                } else {
                    _new_value = $control.val();
                }
                var key = $control.attr('data-customize-setting-link');
                wp.customize(key, function(obj) {
                    obj.set(_new_value);
                });
                // change the background color of our transparency container whenever a color is updated
                var $transparency = $control.parents('.wp-picker-container:first').find('.transparency');
                // we only want to show the color at 100% alpha
                $transparency.css('backgroundColor', ui.color.toString('no-alpha'));
            },
            palettes: palette // remove the color palettes
        });
        $('<div class="llorix-one-lite-alpha-container"><div class="slider-alpha"></div><div class="transparency"></div></div>').appendTo($control.parents('.wp-picker-container'));
        var $alpha_slider = $control.parents('.wp-picker-container:first').find('.slider-alpha');
        // if in format RGBA - grab A channel value
        var alpha_val;
        if (value.match(/rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/)) {
            alpha_val = parseFloat(value.match(/rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/)[1]) * 100;
            alpha_val = parseInt(alpha_val);
        } else {
            alpha_val = 100;
        }
        $alpha_slider.slider({
            slide: function(event, ui) {
                $(this).find('.ui-slider-handle').text(ui.value); // show value on slider handle
                // send ajax request to wp.customizer to enable Save & Publish button
                var _new_value = $control.val();
                var key = $control.attr('data-customize-setting-link');
                wp.customize(key, function(obj) {
                    obj.set(_new_value);
                });
            },
            create: function() {
                var v = $(this).slider('value');
                $(this).find('.ui-slider-handle').text(v);
            },
            value: alpha_val,
            range: 'max',
            step: 1,
            min: 1,
            max: 100
        }); // slider
        $alpha_slider.slider().on('slidechange', function(event, ui) {
            var new_alpha_val = parseFloat(ui.value),
                iris = $control.data('a8cIris'),
                color_picker = $control.data('wpWpColorPicker');
            iris._color._alpha = new_alpha_val / 100.0;
            $control.val(iris._color.toString());
            color_picker.toggler.css({
                backgroundColor: $control.val()
            });
            // fix relationship between alpha slider and the 'side slider not updating.
            var get_val = $control.val();
            $($control).wpColorPicker('color', get_val);
        });
    });



});