jQuery(document).ready(function() {
    var llorix_one_aboutpage = llorixOneWelcomeScreenCustomizerObject.aboutpage;
    var llorix_one_nr_actions_required = llorixOneWelcomeScreenCustomizerObject.nr_actions_required;

    /* Number of required actions */
    if ((typeof llorix_one_aboutpage !== 'undefined') && (typeof llorix_one_nr_actions_required !== 'undefined') && (llorix_one_nr_actions_required != '0')) {
        jQuery('#accordion-section-themes .accordion-section-title').append('<a href="' + llorix_one_aboutpage + '"><span class="llorix-one-lite-actions-count">' + llorix_one_nr_actions_required + '</span></a>');
    }
});