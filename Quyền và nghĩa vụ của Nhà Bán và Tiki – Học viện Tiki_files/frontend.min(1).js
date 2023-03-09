/**
 * frontend.js
 *
 * @copyright  2018 CleverSoft. All rights reserved.
 * @license MIT
 */
(function ($) {
    "use strict";
    var cafe = {
        init: function () {
            var wrap = $('.append-class:not(.slick-slider)');
            cafe.cafe_StickyHeader();
            cafe.cafe_carousel();
            cafe.cafe_tabs();
            cafe.productFilter(wrap);
            cafe.cafe_category_accordion();
            cafe.cafe_Tabsfiler_Mobile(992);
            cafe.cafe_PaginationAjax('.cafe-products-wrap ul.products', '.product', 'a.cafe-pagination-next');
            cafe.cafe_AjaxSearch();
            cafe.cafe_AjaxCart();
            cafe.cafe_AjaxLogin();
            cafe.cafe_site_nav_menu();
            cafe.cafe_site_nav_menu_toggle();
            cafe.cafe_site_nav_widget();
            cafe.cafe_WipeBanner();
            cafe.cafe_TextonHover();
            cafe.cafe_masonry_layout();
        },
        //Cafe Text on Hover
        cafe_TextonHover: function () {
            if ($('.cafe-text-on-hover')[0]) {
                $('.cafe-text-on-hover .cafe-text').each(function () {
                    let $parent = $(this).closest('.cafe-text-on-hover');
                    if (!!$parent.data('video')) {
                        $parent.prepend('<div class="cafe-bg-cursor"><video src="' + $parent.data('video') + '" loop muted></div>');
                    } else {
                        if (!!$parent.data('image')) {
                            $parent.prepend('<div class="cafe-bg-cursor" style="background-image: url(' + $parent.data('image') + ')"></div>');
                        }
                    }
                });
                $(document).on('mousemove', '.cafe-text', function (e) {
                    let $parent = $(this).closest('.cafe-text-on-hover');
                    $parent.find('.cafe-bg-cursor').css({
                        left: e.clientX,
                        top: e.clientY
                    });
                })
                $(document).on('mouseover', '.cafe-text', function (e) {
                    let $parent = $(this).closest('.cafe-text-on-hover');
                    $parent.addClass('active');
                    if ($parent.find('video')[0]) {
                        $parent.find('video').get(0).play();
                    }
                })
                $(document).on('mouseout', '.cafe-text', function (e) {
                    let $parent = $(this).closest('.cafe-text-on-hover');
                    $parent.removeClass('active');
                    if ($parent.find('video')[0]) {
                        $parent.find('video').get(0).pause();
                        $parent.find('video').get(0).load();
                    }
                })
            }
        },
        //Cafe Wipe Banner
        cafe_WipeBanner: function () {
            $('.cafe-wiper').each(function () {
                let total = $(this).find('.cafe-banner-img').length;
                $(this).find('.cafe-banner-img').each(function () {
                    $(this).css('z-index', total);
                    total--;
                })
            });
            $(window).on('scroll', function () {
                $('.elementor-widget-clever-wipe-banner .cafe-wipe-banner:not(.on-screen)').each(function () {
                    if ($(window).scrollTop() + $(window).height() * 0.7 > $(this).offset().top) {
                        $(this).addClass('on-screen');
                        $(this).find('.wrap-heading .cafe-heading:first-child').addClass('active');
                        $(this).find('.cafe-banner-img:first-child').addClass('active');
                        $('body').addClass('disable-scroll');
                        $('html, body').animate({
                            scrollTop: $(this).closest('.elementor-widget-clever-wipe-banner').offset().top
                        }, 900);
                    }
                });
            });
            let allScroll = true;
            $('.elementor-widget-clever-wipe-banner .cafe-wipe-banner').on('mousewheel', function (e) {
                if (allScroll) {
                    let $activeItem = $(this).find('.cafe-heading.active');
                    let $activeImg = $(this).find('.cafe-banner-img.active');
                    if (e.deltaY < 0) {
                        if ($activeItem.next()[0]) {
                            $activeItem.removeClass('active').addClass('after-active');
                            $activeItem.next().addClass('active');
                            $activeImg.removeClass('active').addClass('after-active');
                            $activeImg.next().addClass('active');
                            $('body:not(.disable-scroll)').addClass('disable-scroll');
                            if ($(window).scrollTop() < $(this).closest('.elementor-widget-clever-wipe-banner').offset().top) {
                                $('html, body').animate({
                                    scrollTop: $(this).closest('.elementor-widget-clever-wipe-banner').offset().top
                                }, 900);
                            }
                        } else {
                            $('body').removeClass('disable-scroll');
                        }
                    } else {
                        if ($activeItem.prev()[0]) {
                            $activeItem.prev().removeClass('after-active').addClass('active');
                            $activeItem.removeClass('active');
                            $activeImg.prev().removeClass('after-active').addClass('active');
                            $activeImg.removeClass('active');
                            $('body:not(.disable-scroll)').addClass('disable-scroll');
                            if ($(window).scrollTop() > $(this).closest('.elementor-widget-clever-wipe-banner').offset().top) {
                                $('html, body').animate({
                                    scrollTop: $(this).closest('.elementor-widget-clever-wipe-banner').offset().top
                                }, 900);
                            }
                        } else {
                            $('body').removeClass('disable-scroll');
                        }
                    }
                    allScroll = false;
                    setTimeout(function () {
                        allScroll = true;
                    }, 900)
                }
            });
        },
        //Sticky Header
        cafe_StickyHeader: function () {
            if ($('.cafe-row-sticky')[0]) {
                $(window).on('load', function () {
                    $('.cafe-row-sticky').each(function () {
                        var $this = $(this);
                        var $parent = $(this).parent();
                        var current_width = 0;
                        $(window).resize(function () {
                            if (current_width != $(window).width()) {
                                current_width = $(window).width();
                                $parent.height('');
                                if (current_width > 1024.98 && $this.hasClass('desktop-sticky')) {
                                    setTimeout(function () {
                                        $parent.height($this.outerHeight());
                                    }, 500);
                                } else if (current_width < 1024.98 && current_width > 768.98 && $this.hasClass('tablet-sticky')) {
                                    setTimeout(function () {
                                        $parent.height($this.outerHeight());
                                    }, 500);
                                } else if (current_width < 768.98 && $this.hasClass('mobile-sticky')) {
                                    setTimeout(function () {
                                        $parent.height($this.outerHeight());
                                    }, 500);
                                } else {
                                    $this.removeClass('is-sticky');
                                    $this.find('.elementor-widget-clever-site-logo').removeClass('header-is-sticky');
                                }
                            }
                        }).resize();
                        var HeaderTop = $parent.offset().top - $('body').offset().top;
                        var windowWidth = $(window).width();
                        var old_top_position = 0;
                        $(window).on('scroll', function () {
                            var top = $(window).scrollTop();
                            if ($this.hasClass('cafe-scroll-up-sticky')) {
                                top = top - $parent.outerHeight();
                                if (old_top_position > top && top > $parent.outerHeight() * 3) {
                                    $this.not('.active-sticky').addClass('active-sticky');
                                } else {
                                    $this.removeClass('active-sticky');
                                }
                                old_top_position = top;
                            }
                            if (current_width > 1024.98 && $this.hasClass('desktop-sticky')) {
                                if (HeaderTop < top) {
                                    $this.not('.is-sticky').addClass('is-sticky');
                                    $this.find('.elementor-widget-clever-site-logo:not(.header-is-sticky)').addClass('header-is-sticky');
                                    $('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').removeClass('toggle-active');
                                    $('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').find('.wrap-menu-inner').slideUp();
                                } else {
                                    $this.removeClass('is-sticky');
                                    $this.find('.elementor-widget-clever-site-logo').removeClass('header-is-sticky');
                                    $('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').addClass('toggle-active');
                                    $('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').find('.wrap-menu-inner').slideDown();
                                }
                            } else if (current_width < 1024.98 && current_width > 768.98 && $this.hasClass('tablet-sticky')) {
                                if (HeaderTop < top) {
                                    $this.not('.is-sticky').addClass('is-sticky');
                                    $this.find('.elementor-widget-clever-site-logo').addClass('header-is-sticky');
                                    $('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').removeClass('toggle-active');
                                    $('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').find('.wrap-menu-inner').slideUp();
                                } else {
                                    $this.removeClass('is-sticky');
                                    $this.find('.elementor-widget-clever-site-logo').removeClass('header-is-sticky');
                                    $('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').addClass('toggle-active');
                                    $('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').find('.wrap-menu-inner').slideDown();
                                }
                            } else if (current_width < 768.98 && $this.hasClass('mobile-sticky')) {
                                if (HeaderTop < top) {
                                    $this.not('.is-sticky').addClass('is-sticky');
                                    $this.find('.elementor-widget-clever-site-logo:not(.header-is-sticky)').addClass('header-is-sticky');
                                    $('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').removeClass('toggle-active');
                                    $('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').find('.wrap-menu-inner').slideUp();
                                } else {
                                    $this.removeClass('is-sticky');
                                    $this.find('.elementor-widget-clever-site-logo.header-is-sticky').removeClass('header-is-sticky');
                                    $('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').addClass('toggle-active');
                                    $('.cafe-wrap-menu .toggle .arrow.on-scroll').parents('.cafe-wrap-menu').find('.wrap-menu-inner').slideDown();
                                }
                            }
                        });
                    })
                });
            }
        },
        cafe_Animated_Headlines: function () {
            $('.cafe-headline.animated-text').cafeAnimatedHeadlines();
        },
        //Ajax login
        cafe_AjaxLogin: function () {
            $('.cafe-account-modal .woocommerce-form-login').on('submit', function (e) {
                e.preventDefault();
                var user = {};
                var $form = $(this);
                user.username = $form.find('input[name=username]').val();
                user.password = $form.find('input[name=password]').val();
                user.rememberme = $form.find('input[name=rememberme]').is(":checked") ? true : false;
                $form.closest('.cafe-account-modal').addClass('cafe-loading');
                $.ajax({
                    url: ajaxurl,
                    type: "POST",
                    data: {
                        action: "cafe_user_login",
                        loginParam: JSON.stringify(user)
                    }
                }).done(function (result) {
                    if (!!result) {
                        if ($form.find('.cafe-notice')[0]) {
                            $form.find('.cafe-notice').html(result);
                        } else {
                            $form.prepend('<p class="cafe-notice">' + result + '</p>');
                        }
                        $form.closest('.cafe-account-modal').removeClass('cafe-loading');
                    } else {
                        location.reload(true);
                    }
                }).fail(function (result) {
                    console.log('Err' + result);
                });
            })
        },
        //Ajax cart. All ajax cart feature will work follow theme trigger;
        cafe_AjaxCart: function () {
            /*Close cart*/
            $(document).on('click', '.cafe-close-cart, .cafe-canvas-cart-mask', function (e) {
                e.preventDefault();
                $('.elementor-widget-clever-canvas-cart .cafe-toggle-input').prop('checked', false);
            });
            /* Remove Class cart empty with site install vanish cache after loaded*/
            if (typeof Cookies != 'undefined') {
                if (Cookies.get('woocommerce_items_in_cart') > 0) {
                    $('.cafe-canvas-cart.cart-empty').removeClass('cart-empty');
                }
            }
            //Update mini top cart ajax
            $(document).on('added_to_cart', function (event, fragments) {
                $('.cafe-canvas-cart.cart-empty').removeClass('cart-empty');
                $('.cafe-canvas-cart-content.loading').removeClass('loading');
                $('.cafe-cart-count').html(fragments['cart_count']);
                $('.cafe-cart-subtotal').html(fragments['cart_subtotal']);
            });
            //Ajax cart of single product after added
            $(document).on('zoo_single_product_cart_added', function (event, res) {
                $('.cafe-canvas-cart.cart-empty').removeClass('cart-empty');
                $('.cafe-canvas-cart-content.loading').removeClass('loading');
                var $response = $(res.response);
                $('.cafe-cart-count').html($response.find('.cafe-cart-count').html());
                $('.cafe-cart-subtotal').html($response.find('.cafe-cart-subtotal').html());
            });
            //Open cart when user click to button add to cart
            $(document).on('zoo_starting_add_to_cart', function () {
                $('.elementor-widget-clever-canvas-cart:visible input.cafe-toggle-input').prop("checked", true);
                $('.cafe-canvas-cart-content').addClass('loading');
            });
            $(document).on('adding_to_cart', function () {
                $('.elementor-widget-clever-canvas-cart:visible input.cafe-toggle-input').prop("checked", true);
                $('.cafe-canvas-cart-content').addClass('loading');
            });
            //Remove and revert cart item
            $(document).on('zoo_after_remove_product_item', function (event, response) {
                var fragments = response.fragments;
                if (fragments.cart_count == 0) {
                    $('.cafe-canvas-cart').addClass('cart-empty');
                }
                $('.cafe-cart-count').html(fragments['cart_count']);
                $('.cafe-cart-subtotal').html(fragments['cart_subtotal']);
            });
            $(document).on('zoo_after_restore_product_item', function (event, response) {
                var fragments = response.fragments;
                $('.cafe-canvas-cart.cart-empty').removeClass('cart-empty');
                $('.cafe-cart-count').html(fragments['cart_count']);
                $('.cafe-cart-subtotal').html(fragments['cart_subtotal']);
            });
        },
        // Ajax Search
        cafe_AjaxSearch: function () {
            $(document).on('click', function (e) {
                var $target = e.target;
                $('.cafe-search-form.searched').each(function () {
                    if (!$(this).is($target) && $target.closest('.cafe-search-form') == null) {
                        $(this).removeClass('searched');
                    }
                })
            });
            $(".cafe-search-form.ajax-search").each(function () {
                var inputtingTimer = null;
                var cafeSearchForm = $(this),
                    cafeSearchFormInputField = $(this).find(".cafe-search-field"),
                    cafeSearchFormSelectField = $(".cafe-product-cat", cafeSearchForm),
                    cafeSearchMaxResult = $("input[name=max_result]", cafeSearchForm),
                    cafeSearchPostType = $("input[name=post_type]", cafeSearchForm),
                    cafeSearchLayout = $("input[name=layout]", cafeSearchForm),
                    cafeSearchBySKU = $("input[name=searchBySKU]", cafeSearchForm);
                cafeSearchFormInputField.on("keypress", function (e) {
                    if (e.which === 13) // Abort enter action.
                        e.preventDefault();
                    cafe_ajax_searching();
                });
                cafeSearchFormSelectField.on('change', function () {
                    cafe_ajax_searching();
                });

                function cafe_ajax_searching() {
                    // Clear delayed timer before another key press.
                    clearTimeout(inputtingTimer);
                    // Delay 1s before handling user input.
                    inputtingTimer = setTimeout(function () {
                        var cafeSearchFormInputFieldVal = cafeSearchFormInputField.val();
                        if (cafeSearchFormInputFieldVal.length >= 3) {
                            var queryData = {
                                queryString: cafeSearchFormInputFieldVal
                            };
                            if (cafeSearchFormSelectField.length) {
                                queryData.productCat = cafeSearchFormSelectField.val();
                            }
                            if (cafeSearchPostType.length) {
                                queryData.postType = cafeSearchPostType.val();
                            }
                            if (cafeSearchMaxResult.length) {
                                queryData.maxResult = cafeSearchMaxResult.val();
                            }
                            if (cafeSearchLayout.length) {
                                queryData.layout = cafeSearchLayout.val();
                            }
                            if (cafeSearchBySKU.length) {
                                queryData.searchBySKU = cafeSearchBySKU.val();
                            }
                            cafeSearchForm.addClass('searching');
                            cafeSearchForm.removeClass('searched');
                            $.ajax({
                                url: ajaxurl,
                                type: "POST",
                                data: {
                                    action: "cafe_live_search_results",
                                    searchQuery: JSON.stringify(queryData)
                                }
                            }).done(function (result) {
                                if ($('.cafe-wrap-search-result .cafe-row')[0]) {
                                    $('.cafe-wrap-search-result .cafe-row').html(result);
                                } else {
                                    cafeSearchForm.find('.cafe-wrap-search-form-content .cafe-row').append(result);
                                }
                                cafeSearchForm.removeClass('searching');
                                cafeSearchForm.addClass('searched');
                            }).fail(function (result) {
                                cafeSearchForm.removeClass('searching');
                                cafeSearchForm.addClass('searched');
                                console.log(result);
                            });
                        }
                    }, 500);
                }
            });
        },
        // Pagination Ajax
        cafe_PaginationAjax: function (wrap, item, path) {
            $(document).on('click', '.view-more-button', function (e) {
                e.preventDefault();
            });
            if ($('.pagination-ajax')[0]) {
                if ($(path)[0]) {
                    var button = false;
                    var scrollThreshold = true;
                    if ($('.view-more-button')[0]) {
                        button = '.view-more-button';
                        scrollThreshold = false;
                        $(document).on('click', '.view-more-button', function () {
                            $(this).hide();
                        });
                    }
                    var infScroll = new InfiniteScroll(wrap, {
                        path: path,
                        append: item,
                        status: '.scroller-status',
                        hideNav: '.cafe-pagination',
                        button: button,
                        scrollThreshold: scrollThreshold,
                    });

                    $(wrap).on('history.infiniteScroll', function (event, response, path) {
                        $('.view-more-button').show();
                        if (typeof deferimg != "undefined") {
                            deferimg(wrap + ' img:not(.sec-img)', 0, 'loaded',
                                function () {
                                    $(this).closest('.loading').removeClass('loading');
                                });
                        }
                    });
                    $(wrap).on('last.infiniteScroll', function (event, response, path) {
                        $('.view-more-button').remove();
                    });
                } else {
                    $('.pagination-ajax,.infinite-scroll-error,.infinite-scroll-request,.view-more-button').remove();
                }
            }

        },
        //Image Comparison
        cafe_image_comparison: function ($target) {
            let $currentTarget = $target.find('.cafe-wrap-image-comparison');
            let beforelabel = !!$currentTarget.find('.before-img').attr('alt') ? $currentTarget.find('.before-img').attr('alt') : 'Before';
            let afterlabel = !!$currentTarget.find('.after-img').attr('alt') ? $currentTarget.find('.after-img').attr('alt') : 'After';
            let _orientation = !!$currentTarget.data('orientation') ? $currentTarget.data('orientation') : 'horizontal';
            $currentTarget.twentytwenty({
                orientation: _orientation,
                before_label: beforelabel, // Set a custom before label
                after_label: afterlabel, // Set a custom after label
            });
        },
        //Video Light Box
        cafe_video_light_box: function ($target) {
            $target.find('.cafe-wrap-content-video').on('click', function (e) {
                e.preventDefault();
                var $this = $(this).find('.cafe-video-button');
                var url = $this.attr('href');
                var config = $this.data('cafe-config');
                var height = config.height;
                var width = config.width;
                var html = '<div class="cafe-video-mask"></div><div class="cafe-wrap-video-popup"><iframe src="' + url + '" height="' + height + '" width="' + width + '" ></iframe></div>';
                $('body').append(html);
            });
            $(document).on('click', '.cafe-video-mask', function () {
                $('.cafe-wrap-video-popup, .cafe-video-mask').fadeOut();
                setTimeout(function () {
                    $('.cafe-wrap-video-popup, .cafe-video-mask').remove();
                }, 500)
            });
        },
        //Auto Typing
        cafe_auto_typing: function ($target) {
            let $currentTarget = $target.find('.cafe-auto-typing');
            let data = $currentTarget.data('cafe-config');
            $currentTarget.find(".cafe-content-auto-typing").typed({
                strings: data.text,
                typeSpeed: data.speed,
                startDelay: data.delay,
                showCursor: data.cursor ? true : false,
                loop: data.loop ? true : false,
            });
        },
        // Image 360 view
        cafe_image_360_view: function ($target) {

            let $currentTarget = $target.find(".cafe-image-360-view");

            var config = JSON.parse($currentTarget.attr('data-cafe-config'));
            var frame_width = config['width'];
            var frame_height = config['height'];
            if (parseInt(frame_width) > $currentTarget.find('.cafe-wrap-img-360-view').width()) {
                var res = parseInt(frame_width) / parseInt(frame_height);
                frame_width = $currentTarget.find('.cafe-wrap-img-360-view').width();
                frame_height = parseInt(parseInt(frame_width) / res);
            }
            $currentTarget.find('.cafe-wrap-content-view').spritespin({
                // path to the source images.
                source: config['source'].split(','),
                width: frame_width,  // width in pixels of the window/frame
                height: frame_height,  // height in pixels of the window/frame
                animate: false,
            });
            $(document).on('click', '.cafe-control-view.cafe-center:not(.active)', function () {
                $(this).addClass('active');
                $('.cafe-wrap-content-view').spritespin({
                    // path to the source images.
                    source: config['source'].split(','),
                    width: frame_width,  // width in pixels of the window/frame
                    height: frame_height,  // height in pixels of the window/frame
                    animate: true,
                    frameTime: 300,
                    sense: -1,
                });
            });
            $(document).on('click', '.cafe-control-view.cafe-center.active', function () {
                $(this).removeClass('active');
                $('.cafe-wrap-content-view').spritespin({
                    // path to the source images.
                    source: config['source'].split(','),
                    width: frame_width,  // width in pixels of the window/frame
                    height: frame_height,  // height in pixels of the window/frame
                    animate: false,
                });
            });

            var api = $currentTarget.find('.cafe-wrap-content-view').spritespin("api");
            // call function next/previous frame when click to button next/previous
            $currentTarget.find('.cafe-control-view.cafe-prev-item').on('click', function () {
                api.prevFrame();
            });
            $currentTarget.find('.cafe-control-view.cafe-next-item').on('click', function () {
                api.nextFrame();
            });
        },

        //For productCarousel
        cafe_carousel: function ($target, wrap_config, wrap_slider) {
            if (typeof $.fn.slick === 'undefined') {
                return false;
            }
            var $currentTarget = !!$target ? $target.find(".cafe-carousel:not(.slick-slider)") : $(".cafe-carousel:not(.slick-slider)");

            $currentTarget.each(function () {
                var data = JSON.parse($(this).attr('data-cafe-config'));
                var slides_to_show = data['slides_to_show'];
                var slides_to_show_tablet = data['slides_to_show_tablet'];
                var slides_to_show_mobile = data['slides_to_show_mobile'];
                var scroll = data['scroll'];
                var autoplay = data['autoplay'];
                var autoplay_tablet = data['autoplay_tablet'];
                var autoplay_mobile = data['autoplay_mobile'];
                var speed = data['speed'];
                var show_pag = data['show_pag'];
                var show_pag_tablet = data['show_pag_tablet'];
                var show_pag_mobile = data['show_pag_mobile'];
                var show_nav = data['show_nav'];
                var show_nav_tablet = data['show_nav_tablet'];
                var show_nav_mobile = data['show_nav_mobile'];
                var wrap = data['wrap'] != undefined ? data['wrap'] : '';
                var arrow_left = data['arrow_left'] != undefined ? data['arrow_left'] : 'cs-font clever-icon-arrow-left-1';
                var arrow_right = data['arrow_right'] != undefined ? data['arrow_right'] : 'cs-font clever-icon-arrow-right-1';
                var center_mode = data['center_mode'] != undefined ? data['center_mode'] : false;
                var infinite = data['infinite'] != undefined ? data['infinite'] : true;
                var wrapcaroul = !!wrap ? $(this).find(wrap) : $(this);

                var row = data['row'] != undefined ? data['row'] : 0;

                if (!wrapcaroul.hasClass('slick-slider')) {
                    if (typeof wrap_config != 'function') {
                        if (!!wrap_config || !!wrap_slider) {
                            if (!!wrap_slider) {
                                wrapcaroul = wrap_slider;
                            } else {
                                wrapcaroul = $(wrap_config).find($(wrap).not('.ajax-loaded'));
                            }
                        }
                        wrapcaroul.slick({
                            infinite: infinite,
                            slidesToShow: slides_to_show,
                            slidesToScroll: scroll > slides_to_show ? slides_to_show : scroll,
                            arrows: show_nav,
                            dots: show_pag,
                            prevArrow: '<span class="cafe-carousel-btn prev-item"><i class="' + arrow_left + '"></i></span>',
                            nextArrow: '<span class="cafe-carousel-btn next-item "><i class="' + arrow_right + '"></i></span>',
                            autoplay: autoplay,
                            autoplaySpeed: speed,
                            rows: row,
                            rtl: $('body.rtl')[0] ? true : false,
                            centerMode: center_mode,
                            centerPadding: '0',
                            responsive: [

                                {
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: slides_to_show_tablet,
                                        slidesToScroll: scroll > slides_to_show_tablet ? slides_to_show_tablet : scroll,
                                        autoplay: autoplay_tablet,
                                        arrows: show_nav_tablet,
                                        dots: show_pag_mobile,
                                    }
                                },
                                {
                                    breakpoint: 768.98,
                                    settings: {
                                        slidesToShow: slides_to_show_mobile,
                                        slidesToScroll: scroll > slides_to_show_mobile ? slides_to_show_mobile : scroll,
                                        autoplay: autoplay_mobile,
                                        arrows: show_nav_tablet,
                                        dots: show_pag_mobile,
                                    }
                                }
                            ]
                        });
                    }
                }
            });
        },
        //Tabs
        cafe_tabs: function () {
            $(document).on('click', '.cafe-wrap-tab-head .cafe-tab-item:not(.active)', function () {
                let tab_class = $(this).data('tab');
                $(this).closest('.cafe-wrap-tab-head').find('.active').removeClass('active');
                $(this).addClass('active');
                $(this).closest('.cafe-tabs').find('.cafe-tab.active').removeClass('active');
                $(this).closest('.cafe-tabs').find('.cafe-tab.' + tab_class).addClass('active');
                if ($(this).closest('.cafe-tabs').find('.slick-slider')[0]) {
                    $(this).closest('.cafe-tabs').find('.slick-slider').slick('reinit');
                }
            });
        },
        // Filter Product
        productFilter: function (wrap) {

            wrap.find('.cafe-ajax-load a.ajax-load').on('click', function (e) {
                e.preventDefault();
                var $this = $(this);
                var key = $this.data('value');
                wrap = $this.parents('.append-class');
                if ($this.hasClass('active')) {
                    return;
                }
                $this.parents('.cafe-ajax-load ').find('a').removeClass('active');
                $this.addClass('active');
                if ($this.hasClass('opened')) {
                    wrap.find('.products').html(wrap.find('.products').data(key));
                    if (wrap.hasClass('cafe-carousel')) {
                        wrap.find('.products').removeClass('slick-initialized slick-slider slick-dotted');
                        cafe.cafe_carousel(null, wrap, null);
                    }
                    return;
                }

                $this.addClass('opened');
                wrap.addClass('loading');
                var data = wrap.data('args');
                data['action'] = 'cafe_ajax_product_filter';
                if ($this.data('type') == 'product_cat') {
                    data['filter_categories'] = $this.data('value');
                }
                if ($this.data('type') == 'asset_type') {
                    data['asset_type'] = $this.data('value');
                }
                wrap.data('args', data);
                $.ajax({
                    url: wrap.data('url'),
                    data: data,
                    type: 'POST',
                }).success(function (response) {
                    wrap.removeClass('loading');
                    let content = $(response).html();
                    wrap.find('.products').html(content);
                    wrap.find('.products').data(key, content);
                    if (wrap.hasClass('cafe-carousel')) {
                        wrap.find('.products').removeClass('slick-initialized slick-slider slick-dotted');
                        cafe.cafe_carousel(null, wrap, null);
                    }
                }).error(function (ex) {
                    console.log(ex);
                });
            });
        },
        // Image 360 view
        cafe_category_accordion: function () {
            $(document).on('click', '.cafe-btn-accordion', function () {
                $(this).closest('.cafe-cat-item').toggleClass('activated');
                $(this).next('.cafe-sub-cat').slideToggle();
            });
        },
        // Progress bar
        cafe_progress_bar: function () {
            $(window).load(function () {
                $('.cafe-wrap-progress-bar:not(.loaded)').each(function () {
                    if ($(window).scrollTop() + $(window).height() > $(this).offset().top) {
                        cafe_progress_bar_animate($(this));
                    }
                });
            });
            $(window).on('scroll', function () {
                $('.cafe-wrap-progress-bar:not(.loaded)').each(function () {
                    if ($(window).scrollTop() + $(window).height() > $(this).offset().top) {
                        cafe_progress_bar_animate($(this));
                    }
                });
            });

            function cafe_progress_bar_animate($current) {
                $current.addClass('loaded');
                var config = $current.data('cafe-config');
                var percent = config.percent;
                if (!!percent) {
                    var duration = Math.round(config.duration / (percent + 10));
                    var width = 0;
                    var id = setInterval(frame, duration);

                    function frame() {
                        if (width >= percent) {
                            clearInterval(id);
                        } else {
                            width++;
                            $current.find('.value').text(width);
                            $current.find('.cafe-progress-bar').css('width', width + '%');
                        }
                    }
                }
            }
        },

        //Tabs filter in mobile
        cafe_Tabsfiler_Mobile: function ($poiter) {
            $('.cafe-head-product-filter.has-tabs .cafe-title').css('cursor', 'pointer');
            $(document).on('click', '.cafe-head-product-filter.has-tabs .cafe-title', function () {
                var w = $(window).width();
                if (w <= $poiter) {
                    $(this).parent().find('.cafe-ajax-load').slideToggle();
                    $(this).toggleClass('active');

                    return false;
                }
            });
        },
        //Site nav Menu
        cafe_site_nav_menu: function () {
            var current_width = 0;
            $(window).resize(function () {
                if (current_width != $(window).width()) {
                    current_width = $(window).width();
                    //Fix menu out of screen.
                    $('.cafe-site-menu .pos-left').removeClass('pos-left');
                    $('.cafe-site-menu .menu-item>ul, .cafe-site-menu li>.cmm4e-sub-panel').each(function () {
                        if (current_width < parseInt($(this).offset()['left'] + $(this).width())) {
                            $(this).addClass('pos-left');
                        }
                    });
                }
            }).resize();
            $(document).on('click', '.cafe-site-menu a', function (e) {
                let href = $(this).attr('href');
                if (!!href) {
                    if (href.startsWith("#")) {
                        if ($(href)[0]) {
                            $(this).closest('ul').find('.current-menu-item').removeClass('current-menu-item');
                            $(this).closest('.menu-item').addClass('current-menu-item');
                            $(this).closest('.cafe-site-menu').find('input:checked').prop('checked', false);
                            if (!$(href).hasClass('elementor-element')) {
                                let headerHeight = $('.site-header')[0] ? $('.site-header').height() : 0;
                                $('html, body').animate({
                                    scrollTop: $(href).offset().top - $('.site-header').height()
                                }, 500);
                            }
                        }
                    }
                }
            })
            //Scroll
            $('.cafe-menu>.menu-item>a').each(function () {
                let href = $(this).attr('href');
                if (!!href) {
                    if (href.startsWith("#")) {
                        if ($(href)[0]) {
                            $(this).addClass('is-static-link');
                        }
                    }
                }
            });
            $(window).on("scroll", function () {
                $('.is-static-link').each(function () {
                    let href = $(this).attr('href');
                    if (!!href) {
                        if (href.startsWith("#")) {
                            if ($(href)[0]) {

                                let top_of_element = $(href).offset().top;
                                let bottom_of_element = $(href).offset().top + $(href).outerHeight();
                                let bottom_of_screen = $(window).scrollTop() + $(window).innerHeight() / 2;
                                let top_of_screen = $(window).scrollTop();
                                let at_bottom = $(document).height();
                                if (bottom_of_screen > top_of_element || ((bottom_of_element + 50) > at_bottom && top_of_element < ($(window).scrollTop() + $(window).innerHeight()))) {
                                    $('.cafe-menu>.current-menu-item').removeClass('current-menu-item');
                                    $(this).closest('.menu-item').addClass('current-menu-item');
                                }
                            }
                        }
                    }
                })
            });
        },
        //Site nav Menu Toggle
        cafe_site_nav_menu_toggle: function () {
            $(document).on('click', '.cafe-site-menu .menu-item:not(.is-mega-menu) .cafe-menu-arrow', function (e) {
                if ($(this).closest('.horizontal')[0]) {
                    if ($(this).closest('.cafe-lg-width')[0] && $(window).width() > 1025) {
                        return;
                    }
                    if ($(this).closest('.cafe-md-width')[0] && $(window).width() > 768) {
                        return;
                    }
                }
                if (e.target !== this)
                    return;
                else {
                    e.preventDefault();
                    $(this).toggleClass('active');
                    $(this).closest('.menu-item:not(.is-mega-menu)').children('ul').slideToggle();
                    if (!$(this).hasClass('active')) {
                        $(this).closest('.menu-item:not(.is-mega-menu)').find('ul').slideUp();
                        $(this).closest('.menu-item:not(.is-mega-menu)').find('.active').removeClass('active');
                    }
                }
            });
            $(document).on('click', '.cafe-site-menu .is-mega-menu>a>.cafe-menu-arrow', function (e) {
                if ($(this).closest('.horizontal')[0]) {
                    if ($(this).closest('.cafe-lg-width')[0] && $(window).width() > 1025) {
                        return;
                    }
                    if ($(this).closest('.cafe-md-width')[0] && $(window).width() > 768) {
                        return;
                    }
                }
                if (e.target !== this)
                    return;
                else {
                    e.preventDefault();
                    $(this).toggleClass('active');
                    $(this).closest('.menu-item').children('.mega-menu-content').slideToggle();
                    if (!$(this).hasClass('active')) {
                        $(this).closest('.menu-item').find('.mega-menu-content').slideUp();
                        $(this).closest('.menu-item').find('.active').removeClass('active');
                    }
                }
            });
            $(document).on('click', '.cafe-site-menu .menu-item-mega .cafe-menu-arrow', function (e) {
                if ($(this).closest('.horizontal')[0]) {
                    if ($(this).closest('.cafe-lg-width')[0] && $(window).width() > 1025) {
                        return;
                    }
                    if ($(this).closest('.cafe-md-width')[0] && $(window).width() > 768) {
                        return;
                    }
                }
                if (e.target !== this)
                    return;
                else {
                    e.preventDefault();
                    $(this).toggleClass('active');
                    $(this).closest('.menu-item-mega').children('.mega-menu-submenu').slideToggle();
                    if (!$(this).hasClass('active')) {
                        $(this).closest('.menu-item-mega').find('.mega-menu-submenu').slideUp();
                        $(this).closest('.menu-item-mega').find('.active').removeClass('active');
                    }
                }
            });
            $(document).on('click', '.cafe-wrap-menu .toggle .arrow', function (e) {
                $(this).parents('.cafe-wrap-menu').toggleClass('toggle-active');
                $(this).parents('.cafe-wrap-menu').find('.wrap-menu-inner').slideToggle();
            });
        },
        //Site Menu widget
        cafe_site_nav_widget: function () {
            if ($('.cafe-hamburger-slide-left-effect')[0] && $('.cafe-site-header')[0]) {
                $('body').wrapInner('<div class="cafe-wrap-body-content-inner"/>');
                $('body').wrapInner('<div class="cafe-wrap-body-content"/>');
                $('body').append('<div class="cafe-wrap-menu-slide-left elementor-' + $('.cafe-site-header').attr('data-elementor-id') + '"/>')
                $('.cafe-hamburger-slide-left-effect').each(function () {
                    let id = $(this).find('.cafe-hamburger-input-control').attr('id');
                    let current_menu = $(this).closest('.elementor-widget-clever-site-nav-menu').clone();
                    current_menu.find('.cafe-hamburger-button, .cafe-hamburger-input-control').remove();
                    $('.cafe-wrap-menu-slide-left').append(current_menu);

                    $(this).find('.cafe-wrap-menu').remove();
                    $(this).find('.cafe-hamburger-mask').remove();
                });
            }
            $(document).on('click', '.cafe-hamburger-slide-left-effect .cafe-hamburger-button', function (e) {
                e.preventDefault();
                let target = $(this).closest('.elementor-widget-clever-site-nav-menu').attr('data-id');
                $('body').toggleClass('cafe-hamburger-slide-left-active');
                $('.cafe-wrap-menu-slide-left .elementor-element-' + target).toggleClass('hamburger-active');
                $(window).trigger('resize')
            });
            $(document).on('click', '.cafe-hamburger-slide-left-active .cafe-wrap-body-content', function (e) {
                e.preventDefault();
                if (!$(e.target).hasClass('cafe-hamburger-input-control')) {
                    $('body.cafe-hamburger-slide-left-active').removeClass('cafe-hamburger-slide-left-active');
                    $('.cafe-wrap-menu-slide-left .hamburger-active').removeClass('hamburger-active');
                    $(window).trigger('resize')
                }
            });
        },
        //Cafe Masonry
        cafe_masonry_layout: function(){
            if($('.masonry-layout')[0]){
                $('.masonry-layout .cafe-row').isotope({
                  itemSelector: '.cafe-banner',
                });

            }
        }
    };
    window.cafe = cafe;
    // DOCUMENT READY
    $(function () {
        cafe.init();
    });
    $(window).on('elementor/frontend/init', function () {
        //Animated Headlines
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/clever-animated-headlines.default",
            cafe.cafe_Animated_Headlines
        );
        //Image Comparison
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/clever-image-comparison.default",
            cafe.cafe_image_comparison
        );
        //Testimonial Slider
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/clever-testimonial.default",
            cafe.cafe_carousel
        );
        //Carousel Tabs
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/clever-carousel-tabs.default",
            cafe.cafe_carousel,
            cafe.cafe_tabs,
        );
        //Image 360 view
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/clever-image-360-view.default",
            cafe.cafe_image_360_view
        );
        //Auto Typing
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/clever-auto-typing.default",
            cafe.cafe_auto_typing
        );
        //Video Lightbox
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/clever-video-light-box.default",
            cafe.cafe_video_light_box
        );
        //Progress bar
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/clever-progress-bar.default",
            cafe.cafe_progress_bar
        );
        //Site Nav Menu
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/clever-site-nav-menu.default",
            cafe.cafe_site_nav_menu,
            cafe.cafe_site_nav_menu_toggle
        );
    });

    jQuery.fn.extend({
        cafeAnimatedHeadlines: function () {
            var $this = $(this);
            if (!$this[0]) {
                return;
            }
            //set animation timing
            var animationDelay = 2500,
                //loading bar effect
                barAnimationDelay = 3800,
                barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
                //letters effect
                lettersDelay = 50,
                //type effect
                typeLettersDelay = 150,
                selectionDuration = 500,
                typeAnimationDelay = selectionDuration + 800,
                //clip effect
                revealDuration = 600,
                revealAnimationDelay = 1500;

            initHeadline();


            function initHeadline() {
                //insert <i> element for each letter of a changing word
                $this.each(function () {
                    if ($this.hasClass('letters'))
                        singleLetters($this.find('b'));
                });
                //initialise headline animation
                animateHeadline($this);
            }

            function singleLetters($words) {
                $words.each(function () {
                    var word = $(this),
                        letters = word.text().split(''),
                        selected = word.hasClass('is-visible');
                    for (var i in letters) {
                        if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                        letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
                    }
                    var newLetters = letters.join('');
                    word.html(newLetters).css('opacity', 1);
                });
            }

            function animateHeadline($headlines) {
                var duration = animationDelay;
                $headlines.each(function () {
                    var headline = $(this);
                    if (headline.hasClass('random-selected')) {
                        let total_item = headline.find('.cafe-words-wrapper b').length;
                        headline.data('total_item', total_item);
                        //trigger animation
                        setInterval(function () {
                            hideWord(headline.find('.is-visible'));
                        }, duration);

                    } else {
                        if (headline.hasClass('loading-bar')) {
                            duration = barAnimationDelay;
                            setTimeout(function () {
                                headline.find('.cafe-words-wrapper').addClass('is-loading')
                            }, barWaiting);
                        } else if (headline.hasClass('clip')) {
                            var spanWrapper = headline.find('.cafe-words-wrapper'),
                                newWidth = spanWrapper.width() + 10;
                            spanWrapper.css('width', newWidth);
                        } else if (!headline.hasClass('type')) {
                            //assign to .cafe-words-wrapper the width of its longest word
                            var words = headline.find('.cafe-words-wrapper b'),
                                width = 0;
                            words.each(function () {
                                var wordWidth = $(this).width();
                                if (wordWidth > width) width = wordWidth;
                            });
                            headline.find('.cafe-words-wrapper').css('width', width);
                        }
                        //trigger animation
                        setTimeout(function () {
                            hideWord(headline.find('.is-visible').eq(0))
                        }, duration);
                    }
                });
            }

            function randomIndex(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }

            function hideWord($word) {
                var nextWord = takeNext($word);
                if ($word.parents('.cafe-headline').hasClass('random-selected')) {
                    let total_item = $word.parents('.cafe-headline').data('total_item');
                    nextWord = $word.parents('.cafe-headline').find('.cafe-words-wrapper b:eq(' + randomIndex(total_item) + ')');
                    switchWord($word, nextWord);
                } else if ($word.parents('.cafe-headline').hasClass('type')) {
                    var parentSpan = $word.parent('.cafe-words-wrapper');
                    parentSpan.addClass('selected').removeClass('waiting');
                    setTimeout(function () {
                        parentSpan.removeClass('selected');
                        $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
                    }, selectionDuration);
                    setTimeout(function () {
                        showWord(nextWord, typeLettersDelay)
                    }, typeAnimationDelay);

                } else if ($word.parents('.cafe-headline').hasClass('letters')) {
                    var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
                    hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
                    showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

                } else if ($word.parents('.cafe-headline').hasClass('clip')) {
                    $word.parents('.cafe-words-wrapper').animate({width: '2px'}, revealDuration, function () {
                        switchWord($word, nextWord);
                        showWord(nextWord);
                    });

                } else if ($word.parents('.cafe-headline').hasClass('loading-bar')) {
                    $word.parents('.cafe-words-wrapper').removeClass('is-loading');
                    switchWord($word, nextWord);
                    setTimeout(function () {
                        hideWord(nextWord)
                    }, barAnimationDelay);
                    setTimeout(function () {
                        $word.parents('.cafe-words-wrapper').addClass('is-loading')
                    }, barWaiting);

                } else {
                    switchWord($word, nextWord);
                    setTimeout(function () {
                        hideWord(nextWord)
                    }, animationDelay);
                }
            }

            function showWord($word, $duration) {
                if ($word.parents('.cafe-headline').hasClass('type')) {
                    showLetter($word.find('i').eq(0), $word, false, $duration);
                    $word.addClass('is-visible').removeClass('is-hidden');

                } else if ($word.parents('.cafe-headline').hasClass('clip')) {
                    $word.parents('.cafe-words-wrapper').animate({'width': $word.width() + 10}, revealDuration, function () {
                        setTimeout(function () {
                            hideWord($word)
                        }, revealAnimationDelay);
                    });
                }
            }

            function hideLetter($letter, $word, $bool, $duration) {
                $letter.removeClass('in').addClass('out');

                if (!$letter.is(':last-child')) {
                    setTimeout(function () {
                        hideLetter($letter.next(), $word, $bool, $duration);
                    }, $duration);
                } else if ($bool) {
                    setTimeout(function () {
                        hideWord(takeNext($word))
                    }, animationDelay);
                }

                if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
                    var nextWord = takeNext($word);
                    switchWord($word, nextWord);
                }
            }

            function showLetter($letter, $word, $bool, $duration) {
                $letter.addClass('in').removeClass('out');

                if (!$letter.is(':last-child')) {
                    setTimeout(function () {
                        showLetter($letter.next(), $word, $bool, $duration);
                    }, $duration);
                } else {
                    if ($word.parents('.cafe-headline').hasClass('type')) {
                        setTimeout(function () {
                            $word.parents('.cafe-words-wrapper').addClass('waiting');
                        }, 200);
                    }
                    if (!$bool) {
                        setTimeout(function () {
                            hideWord($word)
                        }, animationDelay)
                    }
                }
            }

            function takeNext($word) {
                return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
            }

            function takePrev($word) {
                return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
            }

            function switchWord($oldWord, $newWord) {
                $oldWord.removeClass('is-visible').addClass('is-hidden');
                $newWord.removeClass('is-hidden').addClass('is-visible');
            }
        }
    });
})(jQuery);

/*Assign video backgound of slider to YT API*/
function onYouTubeIframeAPIReady() {
    jQuery('.slick-slide:not(.slick-cloned) .cafe-viewer-video.youtube-embed iframe').each(function () {
        if (jQuery(this).attr('id') != '') ;
        {
            let sound = jQuery(this).parent().data('cafe-config').sound;
            let player = new YT.Player(jQuery(this).attr('id'), {
                    playerVars: {
                        'autoplay': 0,
                        'controls': 0,
                        'modestbranding': 1,
                        'rel': 0,
                        'showinfo': 0
                    },
                    events: {
                        onReady: function (e) {
                            if (sound != 'yes') {
                                e.target.mute();
                            }
                            jQuery('#progressBar').hide();
                        }
                    }
                }
            );
            jQuery(this).parent().data('player', player);
        }
    })

}

/*End Assign video backgound of slider to YT API*/

// webpackModules
(function (modules) {
    // The module cache
    var $ = jQuery,
        installedModules = {};

    // The require function
    function __webpack_require__(moduleId) {

        // Check if module is in cache
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        // Flag the module as loaded
        module.l = true;

        // Return the exports of the module
        return module.exports;
    }

    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;

    // expose the module cache
    __webpack_require__.c = installedModules;

    // define getter function for harmony exports
    __webpack_require__.d = function (exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
            });
        }
    };

    // define __esModule on exports
    __webpack_require__.r = function (exports) {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, {
                value: 'Module'
            });
        }
        Object.defineProperty(exports, '__esModule', {
            value: true
        });
    };

    // create a fake namespace object
    // mode & 1: value is a module id, require it
    // mode & 2: merge all properties of value into the ns
    // mode & 4: return value when already ns object
    // mode & 8|1: behave like require
    __webpack_require__.t = function (value, mode) {
        if (mode & 1) value = __webpack_require__(value);
        if (mode & 8) return value;
        if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, 'default', {
            enumerable: true,
            value: value
        });
        if (mode & 2 && typeof value != 'string')
            for (var key in value) __webpack_require__.d(ns, key, function (key) {
                return value[key];
            }.bind(null, key));
        return ns;
    };

    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function (module) {
        var getter = module && module.__esModule ?
            function getDefault() {
                return module['default'];
            } :
            function getModuleExports() {
                return module;
            };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    };

    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };

    // __webpack_public_path__
    __webpack_require__.p = '';

    // Load entry module and return exports
    return __webpack_require__(__webpack_require__.s = 0);
})
([
    /* 0 */
    (function (module, exports, __webpack_require__) {
        'use strict';

        function CleverAddonsForElementor(elementor) {
            var self = this,
                handlers = {
                    slider: __webpack_require__(1)
                };
            this.modules = {};
            self.modules = {};
            jQuery.each(handlers, function (moduleName) {
                self.modules[moduleName] = new this(elementor);
            });

        }

        jQuery(window).on('elementor/frontend/init', function () {
            window.cafeFrontend = new CleverAddonsForElementor(elementorFrontend);
        });
    }),
    /* 1 */
    (function (module, exports, __webpack_require__) {
        'use strict';

        module.exports = function (elementor) {
            elementor.hooks.addAction('frontend/element_ready/clever-slider.default', __webpack_require__(2));
            elementor.hooks.addAction('frontend/element_ready/clever-section-bookmark.default', __webpack_require__(3));
            elementor.hooks.addAction('frontend/element_ready/clever-edd-tabs.default', __webpack_require__(4));
            elementor.hooks.addAction('frontend/element_ready/clever-scroll-to.default', __webpack_require__(7));
        };
    }),
    /* 2 */
    (function (module, exports, __webpack_require__) {
        'use strict';

        var CleverSlider = elementorModules.frontend.handlers.Base.extend({
            getDefaultSettings: function () {
                return {
                    selectors: {
                        slider: '.cafe-slider-slides',
                        slideBackground: '.slick-slide-bg',
                        slideContent: '.cafe-slide-content'
                    },
                    classes: {
                        animated: 'animated'
                    },
                    attributes: {
                        dataSliderOptions: 'slider_options',
                        dataAnimation: 'animation'
                    }
                };
            },
            /*Resize iframe fit to slider size*/
            resizeIframe: function ($slider) {
                let slide_res = $slider.width() / $slider.height();
                $slider.find('.cafe-viewer-video iframe').each(function () {
                    let frame_res = jQuery(this).attr('width') / jQuery(this).attr('height');
                    if (frame_res > slide_res) {
                        jQuery(this).attr('width', frame_res * $slider.height());
                        jQuery(this).width(frame_res * $slider.height());
                        jQuery(this).attr('height', $slider.height());
                    } else {
                        jQuery(this).attr('width', $slider.width());
                        jQuery(this).width($slider.width());
                        jQuery(this).attr('height', $slider.width() / frame_res);
                    }
                })
            },

            getDefaultElements: function () {
                var selectors = this.getSettings('selectors');
                return {
                    $slider: this.$element.find(selectors.slider)
                };
            },

            initSlider: function () {
                var $slider = this.elements.$slider;
                var settings = this.getSettings();
                if (!$slider.length) {
                    return;
                }

                $slider.slick($slider.data(this.getSettings('attributes.dataSliderOptions')));
                /*JS for slider video*/
                this.resizeIframe($slider);
                $slider.find('.cafe-viewer-video.vimeo-embed').each(function () {
                    var options = {
                        background: true
                    };
                    if (typeof Vimeo != 'undefined') {
                        var player = new Vimeo.Player(jQuery(this).find('iframe'), options);
                        player.setLoop(true);
                        var arg = jQuery(this).data('cafe-config');
                        if (arg.sound != 'yes') {
                            player.setVolume(0);
                        }
                        player.disableTextTrack();
                        jQuery(this).data('player', player);
                    }
                })
                if ($slider.find('.slick-active .cafe-viewer-video.vimeo-embed')[0]) {
                    let player = $slider.find('.slick-active .cafe-viewer-video.vimeo-embed').data('player');
                    player.play();
                }
                if ($slider.find('.slick-active .cafe-viewer-video.youtube-embed')[0]) {
                    let player = $slider.find('.slick-active .cafe-viewer-video.youtube-embed').data('player');
                    player.playVideo();
                }
                /*End JS for slider video*/
            },

            goToActiveSlide: function () {
                this.elements.$slider.slick('slickGoTo', this.getEditSettings('activeItemIndex') - 1);
            },

            onPanelShow: function () {
                var $slider = this.elements.$slider;

                $slider.slick('slickPause');

                // On switch between slides while editing. stop again.
                $slider.on('afterChange', function () {
                    $slider.slick('slickPause');
                });
            },

            bindEvents: function () {
                var $slider = this.elements.$slider,
                    settings = this.getSettings(),
                    animation = $slider.data(settings.attributes.dataAnimation);

                if (!animation) {
                    return;
                }

                if (elementorFrontend.isEditMode()) {
                    elementor.hooks.addAction('panel/open_editor/widget/clever-slider', this.onPanelShow);
                }

                $slider.on({
                    init: function (event, slick) {
                        let $currentSlide = $slider.find('.slick-current').find(settings.selectors.slideContent);
                        let $currentBgSlide = $slider.find('.slick-current').find(settings.selectors.slideBackground);

                        let selfAnimation = $currentSlide.data('animation');
                        let selfBgAnimation = $currentBgSlide.data('animation');

                        selfAnimation = selfAnimation == 'inherit' ? animation : selfAnimation;

                        $currentSlide.addClass(settings.classes.animated + ' ' + selfAnimation);
                        if (selfBgAnimation != 'inherit') {
                            $currentBgSlide.addClass(settings.classes.animated + ' ' + selfBgAnimation);
                        }
                    },
                    beforeChange: function (event, slick, currentSlide) {
                        let $sliderContent = $slider.find(settings.selectors.slideContent);
                        let $slideBackground = jQuery(slick.$slides.get(currentSlide)).find(settings.selectors.slideBackground);

                        let selfAnimation = $sliderContent.data('animation');
                        let selfBgAnimation = $slideBackground.data('animation');

                        selfAnimation = selfAnimation == 'inherit' ? animation : selfAnimation;

                        $sliderContent.removeClass(settings.classes.animated + ' ' + selfAnimation);

                        if (selfBgAnimation != 'inherit') {
                            $slideBackground.removeClass(settings.classes.animated + ' ' + selfBgAnimation);
                        }
                    },
                    afterChange: function (event, slick, currentSlide) {
                        let $currentSlide = jQuery(slick.$slides.get(currentSlide)).find(settings.selectors.slideContent);
                        let $currentBgSlide = jQuery(slick.$slides.get(currentSlide)).find(settings.selectors.slideBackground);

                        let selfAnimation = $currentSlide.data('animation');
                        let selfBgAnimation = $currentBgSlide.data('animation');

                        selfAnimation = selfAnimation == 'inherit' ? animation : selfAnimation;

                        $currentSlide.addClass(settings.classes.animated + ' ' + selfAnimation);
                        if (selfBgAnimation != 'inherit') {
                            $currentBgSlide.addClass(settings.classes.animated + ' ' + selfBgAnimation);
                        }
                        /*Video background control play/pause when change slide*/
                        $slider.find('.cafe-viewer-video.vimeo-embed').each(function () {
                            let player = jQuery(this).data('player');
                            if (jQuery(this).parents('.slick-active')[0]) {
                                player.play();
                            } else {
                                player.pause();
                            }
                        });
                        $slider.find('.cafe-viewer-video.youtube-embed').each(function () {
                            let player = jQuery(this).data('player');
                            if (typeof player != 'undefined') {
                                if (jQuery(this).parents('.slick-active')[0]) {
                                    player.playVideo();
                                } else {
                                    player.pauseVideo();
                                }
                            }
                        });
                        /*End Video background control play/pause when change slide*/
                    }
                });
                var $this = this;
                jQuery(window).on('resize', function () {
                    $this.resizeIframe($slider);
                })
            },

            onInit: function () {
                elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);

                this.initSlider();

                if (this.isEdit) {
                    this.goToActiveSlide();
                }
            },

            onEditSettingsChange: function (propertyName) {
                if ('activeItemIndex' === propertyName) {
                    this.goToActiveSlide();
                }
            }
        });

        module.exports = function ($scope) {
            new CleverSlider({
                $element: $scope
            });
        };
    }),
    /* 3 */
    (function (module, exports, __webpack_require__) {
        'use strict';

        var CleverSectionBookmark = elementorModules.frontend.handlers.Base.extend({
            addSection: function () {
                var context = jQuery(this.$element.context),
                    section = context.find('.cafe-bookmark-section'),
                    sectionId = section.attr('id'),
                    sectionIcon = section.data('icon'),
                    sectionLabel = section.data('label'),
                    sectionModelId = section.data('modelId');

                if (!elementorFrontend.isEditMode() && !context.hasClass('cafe-section-bookmark-container')) {
                    context.addClass('cafe-section-bookmark-container');
                }

                if (!context.hasClass('bookmarked')) {
                    this.navBar.append('<li><a class="cafe-section-bookmark-link ' + sectionIcon + ' section-link-' + sectionModelId + '" href="#' + sectionId + '"><span class="screen-reader-text">' + sectionLabel + '</span></a></li>');
                    context.addClass('bookmarked');
                } else {
                    this.navBar.find('a[href="#' + sectionId + '"]').replaceWith('<li><a class="cafe-section-bookmark-link ' + sectionIcon + ' section-link-' + sectionModelId + '" href="#' + sectionId + '"><span class="screen-reader-text">' + sectionLabel + '</span></a></li>');
                }
            },
            setActiveSection: function () {
                navLinks.removeClass('current');
                $('#navigation li a[href="#' + id + '"]').addClass('current');
            },
            goToActiveSection: function () {
                if (target.length) {
                    $('html, body').stop().animate({
                        scrollTop: target.offset().top
                    }, 1000);
                }
            },
            initNavBar: function () {
                var navBar = jQuery('#cafe-bookmark-bar');
                if (!navBar.length) {
                    var $ul = document.createElement('ul');
                    $ul.id = 'cafe-bookmark-bar';
                    $ul.style = 'list-style:none;margin:0;padding:0;position:fixed;width:20px;height:100px;right:1em;top:calc(50vh - 50px)';
                    document.body.appendChild($ul);
                    this.navBar = jQuery('#cafe-bookmark-bar');
                } else {
                    this.navBar = navBar;
                }
            },
            onInit: function () {
                elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);

                this.initNavBar();

                this.addSection();

                // draft code
                jQuery('.cafe-section-bookmark-link').on('click', function (e) {
                    var target = jQuery(this.getAttribute('href'));

                    if (target.length) {
                        e.preventDefault();
                        jQuery('html, body').stop().animate({
                            scrollTop: target.offset().top
                        }, 1000);
                    }
                });

                jQuery(window).scroll(function () {
                    var position = window.pageYOffset;
                    jQuery('.cafe-bookmark-section').each(function () {
                        var target = jQuery(this).offset().top;
                        var id = jQuery(this).attr('id');
                        var navLinks = jQuery('#cafe-bookmark-bar li a');
                        if (position >= target) {
                            navLinks.removeClass('current');
                            jQuery('#cafe-bookmark-bar li a[href="#' + id + '"]').addClass('current');
                        }
                    });
                });
            },
            onEditSettingsChange: function (propertyName) {
                console.log(propertyName);
            }
        });

        module.exports = function ($scope) {
            new CleverSectionBookmark({
                $element: $scope
            });
        };
    }),
    /* 4 */
    (function (module, exports, __webpack_require__) {
        'use strict';

        var TabsModule = __webpack_require__(5);

        module.exports = function ($scope) {
            new TabsModule({
                $element: $scope,
                toggleSelf: false
            });
        };
    }),
    /* 5 */
    (function (module, exports, __webpack_require__) {
        "use strict";

        var HandlerModule = __webpack_require__(6);

        module.exports = HandlerModule.extend({
            $activeContent: null,

            getDefaultSettings: function getDefaultSettings() {
                return {
                    selectors: {
                        tabTitle: '.elementor-tab-title',
                        tabContent: '.elementor-tab-content'
                    },
                    classes: {
                        active: 'elementor-active'
                    },
                    showTabFn: 'show',
                    hideTabFn: 'hide',
                    toggleSelf: true,
                    hidePrevious: true,
                    autoExpand: true
                };
            },

            getDefaultElements: function getDefaultElements() {
                var selectors = this.getSettings('selectors');

                return {
                    $tabTitles: this.findElement(selectors.tabTitle),
                    $tabContents: this.findElement(selectors.tabContent)
                };
            },

            activateDefaultTab: function activateDefaultTab() {
                var settings = this.getSettings();

                if (!settings.autoExpand || 'editor' === settings.autoExpand && !this.isEdit) {
                    return;
                }

                var defaultActiveTab = this.getEditSettings('activeItemIndex') || 1,
                    originalToggleMethods = {
                        showTabFn: settings.showTabFn,
                        hideTabFn: settings.hideTabFn
                    };

                // Toggle tabs without animation to avoid jumping
                this.setSettings({
                    showTabFn: 'show',
                    hideTabFn: 'hide'
                });

                this.changeActiveTab(defaultActiveTab);

                // Return back original toggle effects
                this.setSettings(originalToggleMethods);
            },

            deactivateActiveTab: function deactivateActiveTab(tabIndex) {
                var settings = this.getSettings(),
                    activeClass = settings.classes.active,
                    activeFilter = tabIndex ? '[data-tab="' + tabIndex + '"]' : '.' + activeClass,
                    $activeTitle = this.elements.$tabTitles.filter(activeFilter),
                    $activeContent = this.elements.$tabContents.filter(activeFilter);

                $activeTitle.add($activeContent).removeClass(activeClass);

                $activeContent[settings.hideTabFn]();
            },

            activateTab: function activateTab(tabIndex) {
                var settings = this.getSettings(),
                    activeClass = settings.classes.active,
                    $requestedTitle = this.elements.$tabTitles.filter('[data-tab="' + tabIndex + '"]'),
                    $requestedContent = this.elements.$tabContents.filter('[data-tab="' + tabIndex + '"]');

                $requestedTitle.add($requestedContent).addClass(activeClass);

                $requestedContent[settings.showTabFn]();
            },

            isActiveTab: function isActiveTab(tabIndex) {
                return this.elements.$tabTitles.filter('[data-tab="' + tabIndex + '"]').hasClass(this.getSettings('classes.active'));
            },

            bindEvents: function bindEvents() {
                var _this = this;

                this.elements.$tabTitles.on({
                    keydown: function keydown(event) {
                        if ('Enter' === event.key) {
                            event.preventDefault();

                            _this.changeActiveTab(event.currentTarget.dataset.tab);
                        }
                    },
                    click: function click(event) {
                        event.preventDefault();

                        _this.changeActiveTab(event.currentTarget.dataset.tab);
                    }
                });
            },

            onInit: function onInit() {
                HandlerModule.prototype.onInit.apply(this, arguments);

                this.activateDefaultTab();
            },

            onEditSettingsChange: function onEditSettingsChange(propertyName) {
                if ('activeItemIndex' === propertyName) {
                    this.activateDefaultTab();
                }
            },

            changeActiveTab: function changeActiveTab(tabIndex) {
                var isActiveTab = this.isActiveTab(tabIndex),
                    settings = this.getSettings();

                if ((settings.toggleSelf || !isActiveTab) && settings.hidePrevious) {
                    this.deactivateActiveTab();
                }

                if (!settings.hidePrevious && isActiveTab) {
                    this.deactivateActiveTab(tabIndex);
                }

                if (!isActiveTab) {
                    this.activateTab(tabIndex);
                }
            }
        });
    }),
    /* 6 */
    (function (module, exports, __webpack_require__) {

        "use strict";


        module.exports = elementorModules.ViewModule.extend({
            $element: null,

            editorListeners: null,

            onElementChange: null,

            onEditSettingsChange: null,

            onGeneralSettingsChange: null,

            onPageSettingsChange: null,

            isEdit: null,

            __construct: function __construct(settings) {
                this.$element = settings.$element;

                this.isEdit = this.$element.hasClass('elementor-element-edit-mode');

                if (this.isEdit) {
                    this.addEditorListeners();
                }
            },

            findElement: function findElement(selector) {
                var $mainElement = this.$element;

                return $mainElement.find(selector).filter(function () {
                    return jQuery(this).closest('.elementor-element').is($mainElement);
                });
            },

            getUniqueHandlerID: function getUniqueHandlerID(cid, $element) {
                if (!cid) {
                    cid = this.getModelCID();
                }

                if (!$element) {
                    $element = this.$element;
                }

                return cid + $element.attr('data-element_type') + this.getConstructorID();
            },

            initEditorListeners: function initEditorListeners() {
                var self = this;

                self.editorListeners = [{
                    event: 'element:destroy',
                    to: elementor.channels.data,
                    callback: function callback(removedModel) {
                        if (removedModel.cid !== self.getModelCID()) {
                            return;
                        }

                        self.onDestroy();
                    }
                }];

                if (self.onElementChange) {
                    var elementName = self.getElementName(),
                        eventName = 'change';

                    if ('global' !== elementName) {
                        eventName += ':' + elementName;
                    }

                    self.editorListeners.push({
                        event: eventName,
                        to: elementor.channels.editor,
                        callback: function callback(controlView, elementView) {
                            var elementViewHandlerID = self.getUniqueHandlerID(elementView.model.cid, elementView.$el);

                            if (elementViewHandlerID !== self.getUniqueHandlerID()) {
                                return;
                            }

                            self.onElementChange(controlView.model.get('name'), controlView, elementView);
                        }
                    });
                }

                if (self.onEditSettingsChange) {
                    self.editorListeners.push({
                        event: 'change:editSettings',
                        to: elementor.channels.editor,
                        callback: function callback(changedModel, view) {
                            if (view.model.cid !== self.getModelCID()) {
                                return;
                            }

                            self.onEditSettingsChange(Object.keys(changedModel.changed)[0]);
                        }
                    });
                }

                ['page', 'general'].forEach(function (settingsType) {
                    var listenerMethodName = 'on' + settingsType[0].toUpperCase() + settingsType.slice(1) + 'SettingsChange';

                    if (self[listenerMethodName]) {
                        self.editorListeners.push({
                            event: 'change',
                            to: elementor.settings[settingsType].model,
                            callback: function callback(model) {
                                self[listenerMethodName](model.changed);
                            }
                        });
                    }
                });
            },

            getEditorListeners: function getEditorListeners() {
                if (!this.editorListeners) {
                    this.initEditorListeners();
                }

                return this.editorListeners;
            },

            addEditorListeners: function addEditorListeners() {
                var uniqueHandlerID = this.getUniqueHandlerID();

                this.getEditorListeners().forEach(function (listener) {
                    elementorFrontend.addListenerOnce(uniqueHandlerID, listener.event, listener.callback, listener.to);
                });
            },

            removeEditorListeners: function removeEditorListeners() {
                var uniqueHandlerID = this.getUniqueHandlerID();

                this.getEditorListeners().forEach(function (listener) {
                    elementorFrontend.removeListeners(uniqueHandlerID, listener.event, null, listener.to);
                });
            },

            getElementName: function getElementName() {
                return this.$element.data('element_type').split('.')[0];
            },

            getID: function getID() {
                return this.$element.data('id');
            },

            getModelCID: function getModelCID() {
                return this.$element.data('model-cid');
            },

            getElementSettings: function getElementSettings(setting) {
                var elementSettings = {},
                    modelCID = this.getModelCID();

                if (this.isEdit && modelCID) {
                    var settings = elementorFrontend.config.elements.data[modelCID],
                        settingsKeys = elementorFrontend.config.elements.keys[settings.attributes.widgetType || settings.attributes.elType];

                    jQuery.each(settings.getActiveControls(), function (controlKey) {
                        if (-1 !== settingsKeys.indexOf(controlKey)) {
                            elementSettings[controlKey] = settings.attributes[controlKey];
                        }
                    });
                } else {
                    elementSettings = this.$element.data('settings') || {};
                }

                return this.getItems(elementSettings, setting);
            },

            getEditSettings: function getEditSettings(setting) {
                var attributes = {};

                if (this.isEdit) {
                    attributes = elementorFrontend.config.elements.editSettings[this.getModelCID()].attributes;
                }

                return this.getItems(attributes, setting);
            },

            onDestroy: function onDestroy() {
                this.removeEditorListeners();

                if (this.unbindEvents) {
                    this.unbindEvents();
                }
            }
        });
    }),
    /* 7 */
    (function (module, exports, __webpack_require__) {

        function CleverScrollTo($selector, settings) {
            var $ = jQuery,
                self = this,
                $window = $(window),
                $instance = $selector,
                checkTemps = $selector.find(".cafe-scrollto-sections-wrap").length,
                $htmlBody = $("html, body"),
                deviceType = $("body").data("elementor-device-mode"),
                $itemsList = $(".cafe-scrollto-nav-item", $instance),
                $menuItems = $(".cafe-scrollto-nav-menu-item", $instance),
                defaultSettings = {
                    speed: 1000,
                    offset: 1,
                    fullSection: true
                },
                settings = $.extend({}, defaultSettings, settings),
                sections = {},
                currentSection = null,
                isScrolling = false;

            jQuery.extend(jQuery.easing, {
                easeInOutCirc: function (x, t, b, c, d) {
                    if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
                    return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
                }
            });

            self.checkNextSection = function (object, key) {
                var keys = Object.keys(object),
                    idIndex = keys.indexOf(key),
                    nextIndex = (idIndex += 1);

                if (nextIndex >= keys.length) {
                    return false;
                }

                var nextKey = keys[nextIndex];

                return nextKey;
            };

            self.checkPrevSection = function (object, key) {
                var keys = Object.keys(object),
                    idIndex = keys.indexOf(key),
                    prevIndex = (idIndex -= 1);

                if (0 > idIndex) {
                    return false;
                }

                var prevKey = keys[prevIndex];

                return prevKey;
            };

            self.debounce = function (threshold, callback) {
                var timeout;

                return function debounced($event) {
                    function delayed() {
                        callback.call(this, $event);
                        timeout = null;
                    }

                    if (timeout) {
                        clearTimeout(timeout);
                    }

                    timeout = setTimeout(delayed, threshold);
                };
            };
            self.visible = function (selector, partial, hidden) {

                var s = selector.get(0),
                    vpHeight = $window.outerHeight(),
                    clientSize = hidden === true ? s.offsetWidth * s.offsetHeight : true;
                if (typeof s.getBoundingClientRect === 'function') {
                    var rec = s.getBoundingClientRect();
                    var tViz = rec.top >= 0 && rec.top < vpHeight,
                        bViz = rec.bottom > 0 && rec.bottom <= vpHeight,
                        vVisible = partial ? tViz || bViz : tViz && bViz,
                        vVisible = (rec.top < 0 && rec.bottom > vpHeight) ? true : vVisible;
                    return clientSize && vVisible;
                } else {
                    var viewTop = 0,
                        viewBottom = viewTop + vpHeight,
                        position = $window.position(),
                        _top = position.top,
                        _bottom = _top + $window.height(),
                        compareTop = partial === true ? _bottom : _top,
                        compareBottom = partial === true ? _top : _bottom;
                    return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
                }

            };

            self.init = function () {
                self.setSectionsData();
                $itemsList.on("click.premiumVerticalScroll", self.onNavDotChange);
                $menuItems.on("click.premiumVerticalScroll", self.onNavDotChange);

                $itemsList.on("mouseenter.premiumVerticalScroll", self.onNavDotEnter);

                $itemsList.on("mouseleave.premiumVerticalScroll", self.onNavDotLeave);

                if (deviceType === "desktop") {
                    $window.on("scroll.premiumVerticalScroll", self.onWheel);
                }
                $window.on(
                    "resize.premiumVerticalScroll orientationchange.premiumVerticalScroll",
                    self.debounce(50, self.onResize)
                );
                $window.on("load", function () {
                    self.setSectionsData();
                });

                $(document).keydown(function (event) {
                    if (38 == event.keyCode) {
                        self.onKeyUp(event, "up");
                    }

                    if (40 == event.keyCode) {
                        self.onKeyUp(event, "down");
                    }
                });
                if (settings.fullSection) {
                    var vSection = document.getElementById($instance.attr("id"));
                    if (checkTemps) {
                        document.addEventListener ?
                            vSection.addEventListener("wheel", self.onWheel, !1) :
                            vSection.attachEvent("onmousewheel", self.onWheel);
                    } else {
                        document.addEventListener ?
                            document.addEventListener("wheel", self.onWheel, !1) :
                            document.attachEvent("onmousewheel", self.onWheel);
                    }
                }

                for (var section in sections) {
                    var $section = sections[section].selector;
                    elementorFrontend.waypoint(
                        $section,
                        function (direction) {
                            var $this = $(this),
                                sectionId = $this.attr("id");
                            if ("down" === direction && !isScrolling) {
                                currentSection = sectionId;
                                $itemsList.removeClass("active");
                                $menuItems.removeClass("active");
                                $("[data-menuanchor=" + sectionId + "]", $instance).addClass(
                                    "active"
                                );
                            }
                        }, {
                            offset: "95%",
                            triggerOnce: false
                        }
                    );

                    elementorFrontend.waypoint(
                        $section,
                        function (direction) {
                            var $this = $(this),
                                sectionId = $this.attr("id");
                            if ("up" === direction && !isScrolling) {
                                currentSection = sectionId;
                                $itemsList.removeClass("active");
                                $menuItems.removeClass("active");
                                $("[data-menuanchor=" + sectionId + "]", $instance).addClass(
                                    "active"
                                );
                            }
                        }, {
                            offset: "0%",
                            triggerOnce: false
                        }
                    );
                }
            };

            self.setSectionsData = function () {
                $itemsList.each(function () {
                    var $this = $(this),
                        sectionId = $this.data("menuanchor"),
                        $section = $("#" + sectionId);
                    if ($section[0]) {
                        sections[sectionId] = {
                            selector: $section,
                            offset: Math.round($section.offset().top),
                            height: $section.outerHeight()
                        };
                    }
                });
            };

            self.onNavDotEnter = function () {
                var $this = $(this),
                    index = $this.data("index");
                if (settings.tooltips) {
                    $('<div class="cafe-scrollto-nav-item-tooltip"><span>' + $this.data('label') + '</span></div>').hide().appendTo($this).fadeIn(200);
                }
            };

            self.onNavDotLeave = function () {
                $(".cafe-scrollto-nav-item-tooltip").fadeOut(200, function () {
                    $(this).remove();
                });
            };

            self.onNavDotChange = function (event) {
                var $this = $(this),
                    index = $this.index(),
                    sectionId = $this.data("menuanchor"),
                    offset = null;

                if (!sections.hasOwnProperty(sectionId)) {
                    return false;
                }

                offset = sections[sectionId].offset - settings.offset;

                if (!isScrolling) {
                    isScrolling = true;

                    currentSection = sectionId;
                    $menuItems.removeClass("active");
                    $itemsList.removeClass("active");

                    if ($this.hasClass("cafe-scrollto-nav-menu-item")) {
                        $($itemsList[index]).addClass("active");
                    } else {
                        $($menuItems[index]).addClass("active");
                    }

                    $this.addClass("active");

                    $htmlBody
                        .stop()
                        .clearQueue()
                        .animate({
                                scrollTop: offset
                            },
                            settings.speed,
                            "easeInOutCirc",
                            function () {
                                isScrolling = false;
                            }
                        );
                }
            };

            self.onKeyUp = function (event, direction) {
                var direction = direction || "up",
                    sectionId,
                    nextItem = $(
                        ".cafe-scrollto-nav-item[data-menuanchor=" + currentSection + "]",
                        $instance
                    ).next(),
                    prevItem = $(
                        ".cafe-scrollto-nav-item[data-menuanchor=" + currentSection + "]",
                        $instance
                    ).prev();

                event.preventDefault();

                if (isScrolling) {
                    return false;
                }

                if ("up" === direction) {
                    if (prevItem[0]) {
                        prevItem.trigger("click.premiumVerticalScroll");
                    }
                }

                if ("down" === direction) {
                    if (nextItem[0]) {
                        nextItem.trigger("click.premiumVerticalScroll");
                    }
                }
            };

            self.onScroll = function (event) {
                /* On Scroll Event */
                if (isScrolling) {
                    event.preventDefault();
                }
            };

            function getFirstSection(object) {
                return Object.keys(object)[0];
            }

            function getLastSection(object) {
                return Object.keys(object)[Object.keys(object).length - 1];
            }

            function getDirection(e) {
                e = window.event || e;
                var t = Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY || -e.detail));
                return t;
            }

            self.onWheel = function (event) {
                if (isScrolling) {
                    event.preventDefault();
                    return false;
                }

                var $target = $(event.target),
                    sectionSelector = checkTemps ?
                        ".cafe-scrollto-temp" :
                        ".elementor-top-section",
                    $section = $target.closest(sectionSelector),
                    $vTarget = self.visible($instance, true, false),
                    sectionId = $section.attr("id"),
                    offset = 0,
                    newSectionId = false,
                    prevSectionId = false,
                    nextSectionId = false,
                    delta = getDirection(event),
                    direction = 0 > delta ? "down" : "up",
                    windowScrollTop = $window.scrollTop(),
                    dotIndex = $(".cafe-scrollto-nav-item.active").index();
                if ("mobile" === deviceType || "tablet" === deviceType) {
                    $(".cafe-scrollto-nav-item-tooltip").hide();
                    if (dotIndex === $itemsList.length - 1 && !$vTarget) {
                        $(".cafe-scrollto-nav-icons, .cafe-scrollto-nav-menu").addClass(
                            "cafe-scrollto-nav-icons-hide"
                        );
                    } else if (dotIndex === 0 && !$vTarget) {
                        if ($instance.offset().top - $(document).scrollTop() > 200) {
                            $(".cafe-scrollto-nav-icons, .cafe-scrollto-nav-menu").addClass(
                                "cafe-scrollto-nav-icons-hide"
                            );
                        }
                    } else {
                        $(".cafe-scrollto-nav-icons, .cafe-scrollto-nav-menu").removeClass(
                            "cafe-scrollto-nav-icons-hide"
                        );
                    }
                }

                if (beforeCheck()) {
                    sectionId = getFirstSection(sections);
                }

                if (afterCheck()) {
                    sectionId = getLastSection(sections);
                }
                if (sectionId && sections.hasOwnProperty(sectionId)) {
                    prevSectionId = self.checkPrevSection(sections, sectionId);
                    nextSectionId = self.checkNextSection(sections, sectionId);
                    if ("up" === direction) {
                        if (!nextSectionId && sections[sectionId].offset < windowScrollTop) {
                            newSectionId = sectionId;
                        } else {
                            newSectionId = prevSectionId;
                        }
                    }

                    if ("down" === direction) {
                        if (
                            !prevSectionId &&
                            sections[sectionId].offset > windowScrollTop + 5
                        ) {
                            newSectionId = sectionId;
                        } else {
                            newSectionId = nextSectionId;
                        }
                    }

                    if (newSectionId) {
                        $(".cafe-scrollto-nav-icons, .cafe-scrollto-nav-menu").removeClass(
                            "cafe-scrollto-nav-icons-hide"
                        );
                        event.preventDefault();
                        offset = sections[newSectionId].offset - settings.offset;
                        currentSection = newSectionId;
                        $itemsList.removeClass("active");
                        $menuItems.removeClass("active");
                        $("[data-menuanchor=" + newSectionId + "]", $instance).addClass(
                            "active"
                        );

                        isScrolling = true;
                        self.scrollStop();
                        $htmlBody.animate({
                                scrollTop: offset
                            },
                            settings.speed,
                            "easeInOutCirc",
                            function () {
                                isScrolling = false;
                            }
                        );
                    } else {
                        var $lastselector = checkTemps ? $instance : $("#" + sectionId);
                        if ("down" === direction) {
                            if (
                                $lastselector.offset().top +
                                $lastselector.innerHeight() -
                                $(document).scrollTop() >
                                600
                            ) {
                                $(".cafe-scrollto-nav-icons, .cafe-scrollto-nav-menu").addClass(
                                    "cafe-scrollto-nav-icons-hide"
                                );
                            }
                        } else if ("up" === direction) {
                            if ($lastselector.offset().top - $(document).scrollTop() > 200) {
                                $(".cafe-scrollto-nav-icons, .cafe-scrollto-nav-menu").addClass(
                                    "cafe-scrollto-nav-icons-hide"
                                );
                            }
                        }
                    }
                }
            }

            function beforeCheck(event) {
                var windowScrollTop = $window.scrollTop(),
                    firstSectionId = getFirstSection(sections),
                    offset = sections[firstSectionId].offset,
                    topBorder = windowScrollTop + $window.outerHeight(),
                    visible = self.visible($instance, true, false);

                if (topBorder > offset) {
                    return false;
                } else if (visible) {
                    return true;
                }
                return false;
            }

            function afterCheck(event) {
                var windowScrollTop = $window.scrollTop(),
                    lastSectionId = getLastSection(sections),
                    offset = sections[lastSectionId].offset,
                    bottomBorder =
                        sections[lastSectionId].offset + sections[lastSectionId].height,
                    visible = self.visible($instance, true, false);

                if (windowScrollTop < bottomBorder) {
                    return false;
                } else if (visible) {
                    return true;
                }

                return false;
            }

            self.onResize = function (event) {
                self.setSectionsData();
            };

            self.scrollStop = function () {
                $htmlBody.stop(true);
            };
        }

        module.exports = function ($scope) {
            var section = $scope.find(".cafe-scrollto-section");
            var module = new CleverScrollTo(section, section.data("settings"));
            module.init();
        }
    })
]);