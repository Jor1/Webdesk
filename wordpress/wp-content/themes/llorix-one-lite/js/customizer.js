/**
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */
/* global wp */
/* global jQuery */
( function( $ ) {
	'use strict';
	/* Site title and description. */
	wp.customize( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '.site-title a' ).text( to );
		} );
	} );
	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).text( to );
		} );
	} );
	
	/* Header text color. */
	wp.customize( 'header_textcolor', function( value ) {
		value.bind( function( to ) {
			if ( 'blank' === to ) {
				$( '.site-title, .site-description' ).css( {
					'clip': 'rect(1px, 1px, 1px, 1px)',
					'position': 'absolute'
				} );
			} else {
				$( '.site-title, .site-description' ).css( {
					'clip': 'auto',
					'color': to,
					'position': 'relative'
				} );
			}
		} );
	} );
	
	/*************************************
    *********	Very top header ***********
	**************************************/
		
	/* llorix_one_lite_very_top_header_phone */
	wp.customize('llorix_one_lite_very_top_header_phone', function(value) {
        value.bind(function( to ) {
			$( '.very-top-left span' ).html( to );
		} );
    });
	
	/* llorix_one_lite_very_top_header_show */
	wp.customize( 'llorix_one_lite_very_top_header_show', function( value ) {
		value.bind( function( to ) {
			if ( true !== to ) {
				$( 'div#very-top-header' ).removeClass('llorix_one_lite_only_customizer');
			} else {
				$( 'div#very-top-header' ).addClass('llorix_one_lite_only_customizer');
			}
		} );
	} );
	
	/************************************
	************* Logos bar *************
	*************************************/
	
	/* llorix_one_lite_logos_show */
	wp.customize( 'llorix_one_lite_logos_show', function( value ) {
		value.bind( function( to ) {
			if ( true !== to ) {
				$( 'div#clients' ).removeClass('llorix_one_lite_only_customizer');
			} else {
				$( 'div#clients' ).addClass('llorix_one_lite_only_customizer');
			}
		} );
	} );
	
	/*************************************
    *********	Blog header **************
	**************************************/
	
	wp.customize('llorix_one_lite_blog_header_title', function(value) {
        value.bind(function( to ) {
			$( '.archive-top-big-title' ).html( to );
		} );
    });	
	wp.customize('llorix_one_lite_blog_header_subtitle', function(value) {
        value.bind(function( to ) {
			$( '.archive-top-text' ).html( to );
		} );
    });
	wp.customize('llorix_one_lite_blog_header_image', function(value) {
        value.bind(function( to ) {
			$('.archive-top').css('background-image', 'url(' + to + ')');
        } );
    });	
    
	/***************************************
	******** HEADER SECTION ****************
	****************************************/
	
	/* llorix_one_lite_logo */
	wp.customize('llorix_one_lite_logo', function(value) {
        value.bind(function( to ) {
			if( to !== '' ) {
				$( '.navbar-brand' ).removeClass( 'llorix_one_lite_only_customizer' );
				$( '.header-logo-wrap' ).addClass( 'llorix_one_lite_only_customizer' );
			}
			else {
				$( '.navbar-brand' ).addClass( 'llorix_one_lite_only_customizer' );
				$( '.header-logo-wrap' ).removeClass( 'llorix_one_lite_only_customizer' );
			}
            $('.navbar-brand img').attr( 'src', to );
        } );
    });

	/* llorix_one_lite_header_logo */
	wp.customize('llorix_one_lite_header_logo', function( value ){
		value.bind(function( to ) {
			var llorix_one_lite_header = $('#llorix_one_lite_header');
			if( to !== '' ) {
				llorix_one_lite_header.find('.only-logo').removeClass( 'llorix_one_lite_only_customizer' );
			} else {
				llorix_one_lite_header.find('.only-logo').addClass( 'llorix_one_lite_only_customizer' );
			}
			llorix_one_lite_header.find('.only-logo img').attr('src', to);
		});
		
	});
	
	/* llorix_one_lite_header_title */
	wp.customize('llorix_one_lite_header_title', function(value) {
        value.bind(function( to ) {
			var llorix_one_lite_header = $('#llorix_one_lite_header');
			if( to !== '' ) {
				llorix_one_lite_header.find( '.intro-section .intro' ).removeClass( 'llorix_one_lite_only_customizer' );
			} else {
				llorix_one_lite_header.find( '.intro-section .intro' ).addClass( 'llorix_one_lite_only_customizer' );
			}
			llorix_one_lite_header.find( '.intro-section .intro' ).text( to );
	    } );
		
    });
	
	/* llorix_one_lite_header_subtitle */
	wp.customize('llorix_one_lite_header_subtitle', function(value) {
        value.bind(function( to ) {
			var llorix_one_lite_header = $('#llorix_one_lite_header');
			if( to !== '' ) {
				llorix_one_lite_header.find( '.intro-section h5' ).removeClass( 'llorix_one_lite_only_customizer' );
			} else {
				llorix_one_lite_header.find( '.intro-section h5' ).addClass( 'llorix_one_lite_only_customizer' );
			}
			llorix_one_lite_header.find( '.intro-section h5' ).text( to );
		} );
		
    });
	
	/* llorix_one_lite_header_button_text */
	wp.customize('llorix_one_lite_header_button_text', function(value) {
        value.bind(function( to ) {
			var llorix_one_lite_header = $('#llorix_one_lite_header');
			if( to !== '' ) {
				llorix_one_lite_header.find( '#inpage_scroll_btn' ).removeClass( 'llorix_one_lite_only_customizer' );
			} else {
				llorix_one_lite_header.find( '#inpage_scroll_btn' ).addClass( 'llorix_one_lite_only_customizer' );
			}
			llorix_one_lite_header.find('#inpage_scroll_btn' ).text( to );
		} );
		
    });
	
	/* llorix_one_lite_header_button_link */
	wp.customize('llorix_one_lite_header_button_link', function(value) {
        value.bind(function( to ) {
			var llorix_one_lite_header = $('#llorix_one_lite_header');
        	if(to.charAt(0) === '#'){
				llorix_one_lite_header.find('#inpage_scroll_btn' ).attr('data-anchor',to);
				llorix_one_lite_header('#inpage_scroll_btn' ).removeAttr('onClick');
        	} else {
				llorix_one_lite_header.find('#inpage_scroll_btn' ).attr( 'onClick', 'parent.location=\''+to+'\'' );
				llorix_one_lite_header.find('#inpage_scroll_btn' ).removeAttr('data-anchor');
        	}
		} );
		
    });

	/******************************************************
	************* ABOUT SECTION ***************************
	*******************************************************/
	
	/* llorix_one_lite_our_story_show */
	wp.customize( 'llorix_one_lite_our_story_show', function( value ) {
		value.bind( function( to ) {
			if ( true !== to ) {
				$( 'section#story' ).removeClass('llorix_one_lite_only_customizer');
			} else {
				$( 'section#story' ).addClass('llorix_one_lite_only_customizer');
			}
		} );
	} );
	
	/* llorix_one_lite_our_story_title */
	wp.customize('llorix_one_lite_our_story_title', function(value) {
        value.bind(function( to ) {
			var brief = $( '.brief');
			var brief_content = brief.find('.content-section .brief-content-text');
			var brief_line = brief.find('.content-section .colored-line-left');
			var brief_header = brief.find('.content-section h2');
			var brief_content_two = brief.find('.brief-content-two');

			if( to !== '' ) {
				brief.removeClass( 'llorix_one_lite_only_customizer' );
				brief_header.removeClass( 'llorix_one_lite_only_customizer' );
				brief_line.removeClass(  'llorix_one_lite_only_customizer' );
				brief_header.text( to );
			} else {
				brief_header.addClass( 'llorix_one_lite_only_customizer' );
				brief_line.addClass(  'llorix_one_lite_only_customizer' );
				if( brief_content_two.hasClass('llorix_one_lite_only_customizer') && brief_content.hasClass('llorix_one_lite_only_customizer') ){
					brief.addClass( 'llorix_one_lite_only_customizer' );
				}
			}
	    } );
    });
	
	/* llorix_one_lite_our_story_text */
	wp.customize('llorix_one_lite_our_story_text',function(value) {
		value.bind(function( to ) {
			var brief = $( '.brief');
			var brief_content = brief.find('.content-section .brief-content-text');
			var brief_header = brief.find('.content-section h2');
			var brief_content_two = brief.find('.brief-content-two');
			if( to !== '' ) {
				brief.removeClass( 'llorix_one_lite_only_customizer' );
				brief_content.removeClass( 'llorix_one_lite_only_customizer' );
				brief_content.html( to );
			} else {
				brief_content.addClass( 'llorix_one_lite_only_customizer' );
				if( brief_header.hasClass('llorix_one_lite_only_customizer') && brief_content_two.hasClass('llorix_one_lite_only_customizer') ){
					brief.addClass( 'llorix_one_lite_only_customizer' );
				}
			}	
		});	
	});
	
	/* llorix_one_lite_our_story_image */
	wp.customize('llorix_one_lite_our_story_image',function(value) {
		value.bind(function( to ) {
			var brief = $( '.brief');
			var brief_content = brief.find('.content-section .brief-content-text');
			var brief_content_one = brief.find('.brief-content-one');
			var brief_content_two = brief.find('.brief-content-two');
			var brief_content_two_image = brief_content_two.find('.brief-image-right img');
			var brief_header = brief.find('.content-section h2');
			if( to !== '' ) {
				brief.removeClass( 'llorix_one_lite_only_customizer' );
				brief_content_two.removeClass( 'llorix_one_lite_only_customizer' );
				brief_content_two_image.attr('src', to);
				brief_content_one.removeClass( 'col-md-12');
				brief_content_one.addClass( 'col-md-6 ');
			} else {
				brief_content_two.addClass( 'llorix_one_lite_only_customizer' );
				brief_content_one.addClass( 'col-md-12');
				brief_content_one.removeClass( 'col-md-6 ');
				if( brief_header.hasClass('llorix_one_lite_only_customizer') && brief_content.hasClass('llorix_one_lite_only_customizer') ){
					brief.addClass( 'llorix_one_lite_only_customizer' );
				}
			}
		});
	});

	/******************************************************
	**************** RIBBON SECTION ***********************
	*******************************************************/
	
	/* llorix_one_lite_ribbon_show */
	wp.customize( 'llorix_one_lite_ribbon_show', function( value ) {
		value.bind( function( to ) {
			if ( true !== to ) {
				$( 'section#ribbon' ).removeClass('llorix_one_lite_only_customizer');
			} else {
				$( 'section#ribbon' ).addClass('llorix_one_lite_only_customizer');
			}
		} );
	} );
	
	/* llorix_one_lite_ribbon_background */
	wp.customize( 'llorix_one_lite_ribbon_background', function( value ) {
		value.bind( function( to ) {
			if ( '' !== to ) {
				$( '.ribbon-wrap' ).attr( 'style','background-image:url('+to+')' );
			} else {
				$( '.ribbon-wrap' ).removeAttr('style');
			}
		} );
	} );	
	
	/* llorix_one_lite_ribbon_title */
	wp.customize('llorix_one_lite_ribbon_title', function(value) {
        value.bind(function( to ) {
        	var ribbon_wrap = $( '.ribbon-wrap' );
			var ribbon_wrap_header = ribbon_wrap.find('h2');
			var ribbon_wrap_button = ribbon_wrap.find('button');
			if( to !== '' ) {
				ribbon_wrap.removeClass( 'llorix_one_lite_only_customizer' );
				ribbon_wrap_header.removeClass( 'llorix_one_lite_only_customizer' );
				ribbon_wrap_header.text( to );
			} else {
				ribbon_wrap_header.addClass( 'llorix_one_lite_only_customizer' );
				if( ribbon_wrap_button.hasClass( 'llorix_one_lite_only_customizer' ) ){
					ribbon_wrap.addClass( 'llorix_one_lite_only_customizer' );
				}
			}
		} );
    });
	
	/* llorix_one_lite_button_text */
	wp.customize('llorix_one_lite_button_text', function(value) {
        value.bind(function( to ) {
			var ribbon_wrap = $( '.ribbon-wrap' );
			var ribbon_wrap_header = ribbon_wrap.find('h2');
			var ribbon_wrap_button = ribbon_wrap.find('button');
			if( to !== '' ) {
				ribbon_wrap.removeClass( 'llorix_one_lite_only_customizer' );
				ribbon_wrap_button.removeClass( 'llorix_one_lite_only_customizer' );
				ribbon_wrap_button.text( to );
			} else {
				ribbon_wrap_button.addClass( 'llorix_one_lite_only_customizer' );
				if( ribbon_wrap_header.hasClass( 'llorix_one_lite_only_customizer' ) ){
					ribbon_wrap.addClass( 'llorix_one_lite_only_customizer' );
				}
			}
		} );
    });
	
	/* llorix_one_lite_button_link */
	wp.customize('llorix_one_lite_button_link', function(value) {
        value.bind(function( to ) {
        	var ribbon_button = $( '#ribbon').find('button');
			ribbon_button.attr( 'onclick', to );
		} );
    });	
	
	/******************************************************
	************ LATEST NEWS SECTION **********************
	*******************************************************/
	
	/* llorix_one_lite_latest_news_show */
	wp.customize( 'llorix_one_lite_latest_news_show', function( value ) {
		value.bind( function( to ) {
			if ( true !== to ) {
				$( 'section#latestnews' ).removeClass('llorix_one_lite_only_customizer');
			} else {
				$( 'section#latestnews' ).addClass('llorix_one_lite_only_customizer');
			}
		} );
	} );
	
	/* llorix_one_lite_latest_news_title */
	wp.customize('llorix_one_lite_latest_news_title', function(value) {
        value.bind(function( to ) {
        	var timeline_text = $( '.timeline .timeline-text' );
			var timeline_header = timeline_text.find('h2');
			if( to !== '' ) {
				timeline_text.removeClass( 'llorix_one_lite_only_customizer' );
			} else {
				timeline_text.addClass( 'llorix_one_lite_only_customizer' );
			}
			timeline_header.text( to );
		} );
    });
	
	/**************************************
	********* CONTACT INFO SECTION ********
	***************************************/
	
	/* llorix_one_lite_contact_info_show */
	wp.customize( 'llorix_one_lite_contact_info_show', function( value ) {
		value.bind( function( to ) {
			if ( true !== to ) {
				$( 'div#contactinfo' ).removeClass('llorix_one_lite_only_customizer');
				$( 'div.contactinfo-map' ).removeClass('llorix_one_lite_only_customizer');
			} else {
				$( 'div#contactinfo' ).addClass('llorix_one_lite_only_customizer');
				$( 'div.contactinfo-map' ).addClass('llorix_one_lite_only_customizer');
			}
		} );
	} );
    
	
	/***************************************
	******** FOOTER SECTION ****************
	****************************************/
	
	/* llorix_one_lite_copyright */
	wp.customize('llorix_one_lite_copyright', function(value) {
        value.bind(function( to ) {
        	var copyright_content = $( '.llorix_one_lite_copyright_content' );
			if( to !== '' ) {
				copyright_content.removeClass( 'llorix_one_lite_only_customizer' );
			} else {
				copyright_content.addClass( 'llorix_one_lite_only_customizer' );
			}
			copyright_content.text( to );
	    } );
    });
	
} )( jQuery );