    // Simple JQuery Custom SelectBox Plugin
// https://plus.google.com/108949996304093815163/about
(function (a) {
    a.fn.customSelectBox = function (b) {
        b = a.extend({
            selectboxClass: "styled-select",
            buttonClass: "curr",
            selectedClass: "selected",
            disabledClass: "disabled",
            focusedClass: "focused"
        }, b);
        return this.each(function () {
            var g = a(this),
                c = 0;
            g.css("visibility", "hidden").wrap('<div class="' + b.selectboxClass + '"></div>');
            var d = g.parent(),
                f = d.find("option"),
                e = g.find("option:selected").html();
            d.append('<span class="' + b.buttonClass + '">' + e + '</span><ul style="display:none;"></ul>');
            f.each(function (l) {
                var k = a(this),
                    m = k.val() ? k.val() : k.html(),
                    h = k.html(),
                    j = k.is(":selected") ? b.selectedClass : k.is(":disabled") ? b.disabledClass : "";
                d.find("ul").append('<li class="' + j + " o-" + l + '" data-value="' + m + '">' + h + "</li>")
            });
            d.find("." + b.buttonClass).on("mousedown", function (h) {
                a("." + b.selectboxClass + " ." + b.focusedClass).removeClass(b.focusedClass).next().slideUp();
                if (c == 1) {
                    a(this).removeClass(b.focusedClass).next().slideUp();
                    c = 0
                } else {
                    a(this).addClass(b.focusedClass).next().slideDown();
                    c = 1
                }
                h.stopPropagation();
                a(document).on("mousedown", function () {
                    a("." + b.selectboxClass + " ." + b.focusedClass).removeClass(b.focusedClass).next().slideUp();
                    c = 0
                })
            }).next().find("li").on("mousedown", function () {
                if (!a(this).hasClass(b.disabledClass)) {
                    a(this).parent().slideUp().find("." + b.selectedClass).removeClass(b.selectedClass).parent().prev().removeClass(b.focusedClass).text(a(this).text()).prev().val(a(this).data("value")).trigger("change");
                    a(this).addClass(b.selectedClass)
                }
                c = 1
            })
        })
    }
})(jQuery);

/* ********************************** */
/* Custom Scripts */
/* ********************************** */
(function ($) {
    "use strict";

    /*==========================================================================
        :: All Essential Functions
    ==========================================================================*/
    function inputAnimate() {
        if ($('.form-control').length) {

            // Check if has value
            $('.form-control').each(function () {
                if ($(this).val()) {
                    $(this).parents(".form-group").addClass('focus');
                }
            })

            // Events
            $('.form-control').focus(function () {
                $(this).parents(".form-group").addClass('focus');
            });

            $('.form-label').on('click', function () {
                $(this).siblings(".form-control").focus();
            });

            $(".form-control").focusout(function () {
                if ($(this).val() == '' || $(this).val() == null) {
                    $(this).parents(".form-group").removeClass('focus');
                };
            });

            $(".form-control").on('change keyup paste', function (e) {
                // alert($(this).val());
                if ($(this).val()) {
                    $(this).parents(".form-group").addClass('focus');
                }
                // if ($(this).val() == '' || $(this).val() == null) {
                //     $(this).parents(".form-group").addClass('error');
                // } else {
                //     $(this).parents(".form-group").removeClass('error');
                //     $(this).parents(".form-group").addClass('focus');
                // }
            });
        }
    }

    function menuHide() {
        $('main').removeClass('overlay');
        $('.menu-toggler').removeClass('show');
        setTimeout(function () {
            $('.menu-toggler').removeClass('animate');
        }, 300);
        $('.site-header .menu-area').removeClass('show');
        $('body').css({
            'overflow-y': 'visible'
        })
    }

    function menuShow() {
        $('main').addClass('overlay');
        $('.menu-toggler').addClass('animate');
        setTimeout(function () {
            $('.menu-toggler').addClass('show');
        }, 400);
        $('.site-header .menu-area').addClass('show');
        $('body').css({
            'overflow-y': 'hidden'
        })
    }

    function menuToggler() {
        var btn = $('.menu-toggler');
        if (btn.length) {
            btn.on('click', function () {
                if (btn.hasClass('animate')) {
                    menuHide();
                } else {
                    menuShow();
                }

            })

            $(document).click(function(event) {
                if(
                    !$(event.target).is($(this).find('.menu-toggler')) &&
                    !$(event.target).is($(this).find('.menu-toggler *')) &&
                    !$(event.target).is($(this).find('.menu-area')) &&
                    !$(event.target).is($(this).find('.menu-area *'))
                ){
                    menuHide();
                }
            });
        }
    }

    function pageLoader() {
        if ($('.preloader').length) {
            $('.preloader').addClass('visible');
        }
    }

    function goTop() {
        $('#go-top').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 0);
        });
    }

    function dropdown() {
        if($('[data-toggle="dropdown"]').length && $(window).width() < 768){
            var btn = $('[data-toggle="dropdown"]');
            btn.on('click', function(e){
                e.preventDefault();
                $(this).siblings('.dropdown-menus').slideToggle();
            })

            $(document).click(function(e) {
              $('.dropdown').not($('.dropdown').has($(e.target))).children('.dropdown-menus').removeClass('show');
            });
        }
    }

    function featuredHover (){
        let el = $('.featured-item');
        el.on("mouseover", function () {
            el.removeClass('active');
            $(this).addClass('active')
        });
    }

    function roadMapSlider () {
        if($('.roadmap-slider').length){
            $('.roadmap-slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                mobileFirst: true,
                infinite: true,
                arrows: false,
                dots: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: 'unslick'
                    }
                ]
            });
        }
    }




    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
    $(window).on('load', function () {
        $('select').customSelectBox();
        roadMapSlider()
        menuToggler();
        inputAnimate();
        goTop();
        dropdown();
        featuredHover();
        
        // Call it to bottom
        pageLoader();

    });

    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).scroll(function () {
        if ($(window).scrollTop() < 150) {
            $('.back-to-top').removeClass('show');
            $('.site-header').removeClass('shadow');
        }
        else {
            $('.back-to-top').addClass('show');
            $('.site-header').addClass('shadow');
        }
    });

    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function () {
        //
    });

})(window.jQuery);