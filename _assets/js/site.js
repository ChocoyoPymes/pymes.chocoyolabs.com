var pathArray = window.location.pathname.split('/');
var pageSlug = pathArray[1];


jQuery(document).ready(function ($) {
  jQuery('.hasTooltip').tooltip({"html": true});
  if (window.MooTools) {

    // Mootools conflict fix for toggle with Bootstrap 3/JQuery
    window.addEvent('load', function () {
      $$('[rel=tooltip],[data-toggle],a[data-toggle],button[data-toggle],[data-toggle=collapse],a[data-toggle=dropdown],.hasTooltip').each(function (e) {
        e.getParent().hide = null;
        e.hide = null;
      });
    });

  }
});

jQuery(document).ready(function () {
  jQuery('select').chosen({
    "disable_search_threshold": 10,
    "search_contains": true,
    "allow_single_deselect": true,
    "placeholder_text_multiple": "Type or select some options",
    "placeholder_text_single": "Select an option",
    "no_results_text": "No results match"
  });
});

// back to top
(function ($) {
  $(document).ready(function () {
    var o = $("#back-top");
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        o.fadeIn()
      } else {
        o.fadeOut()
      }
    });
    var $scrollEl = ($.browser.mozilla || $.browser.msie) ? $("html") : $("body");
    o.find("a").click(function () {
      $scrollEl.animate({scrollTop: 0}, 400);
      return false
    })
  })
})(jQuery);

// home form
if (pageSlug === '') {
  (function ($) {
    $(document).ready(function () {
      var v = $("#contact-form_221").validate({
        wrapper: "mark", submitHandler: function (f) {
          $(f).ajaxsendmail();
          return false
        }
      });
      $("#clear_221").click(function () {
        $("#contact-form_221").trigger("reset");
        v.resetForm();
        if (!$.support.placeholder) {
          $(".mod_tm_ajax_contact_form *[placeholder]").each(function (n) {
            $(this).parent().find(">.form_placeholder").show()
          })
        }
        return false
      });
      $("#message_3").rules("add", {minlength: 20});
    })
  })(jQuery);

  // slider
  (function ($, undefined) {
    $(document).ready(function () {
      function isIE() {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
      };
      var o = $("#swiper-slider_208");
      if (o.length) {
        function getSwiperHeight(object, attr) {
          var val = object.attr("data-" + attr), dim;
          if (!val) {
            return undefined;
          }
          dim = val.match(/(px)|(%)|(vh)$/i);
          if (dim.length) {
            switch (dim[0]) {
              case"px":
                return parseFloat(val);
              case"vh":
                return $(window).height() * (parseFloat(val) / 100);
              case"%":
                return object.width() * (parseFloat(val) / 100);
            }
          } else {
            return undefined;
          }
        }

        function toggleSwiperInnerVideos(swiper) {
          var videos;
          $.grep(swiper.slides, function (element, index) {
            var $slide = $(element), video;
            if (index === swiper.activeIndex) {
              videos = $slide.find("video");
              if (videos.length) {
                videos.get(0).play();
              }
            } else {
              $slide.find("video").each(function () {
                this.pause();
              });
            }
          });
        }

        function toggleSwiperCaptionAnimation(swiper) {
          if (isIE() && isIE() < 10) {
            return;
          }
          var prevSlide = $(swiper.container), nextSlide = $(swiper.slides[swiper.activeIndex]);
          prevSlide.find("[data-caption-animate]").each(function () {
            var $this = $(this);
            $this.removeClass("animated").removeClass($this.attr("data-caption-animate")).addClass("not-animated");
          });
          nextSlide.find("[data-caption-animate]").each(function () {
            var $this = $(this), delay = $this.attr("data-caption-delay");
            setTimeout(function () {
              $this.removeClass("not-animated").addClass($this.attr("data-caption-animate")).addClass("animated");
            }, delay ? parseInt(delay) : 0);
          });
        }

        $(document).ready(function () {
          o.each(function () {
            var s = $(this);
            var pag = s.find(".swiper-pagination"), next = s.find(".swiper-button-next"), prev = s.find(".swiper-button-prev"), bar = s.find(".swiper-scrollbar"), h = getSwiperHeight(o, "height"), mh = getSwiperHeight(o, "min-height");
            s.find(".swiper-slide").each(function () {
              var $this = $(this), url;
              if (url = $this.attr("data-slide-bg")) {
                $this.css({"background-image": "url(" + url + ")", "background-size": "cover"})
              }
            }).end().find("[data-caption-animate]").addClass("not-animated").end();

            var slider = new Swiper(s, {
              autoplay: s.attr('data-autoplay') ? s.attr('data-autoplay') === "false" ? undefined : s.attr('data-autoplay') : 5000,
              direction: s.attr('data-direction') ? s.attr('data-direction') : "horizontal",
              effect: s.attr('data-slide-effect') ? s.attr('data-slide-effect') : "slide",
              speed: s.attr('data-slide-speed') ? s.attr('data-slide-speed') : 600,
              keyboardControl: s.attr('data-keyboard') === "true",
              mousewheelControl: s.attr('data-mousewheel') === "true",
              mousewheelReleaseOnEdges: s.attr('data-mousewheel-release') === "true",
              nextButton: next.length ? next.get(0) : null,
              prevButton: prev.length ? prev.get(0) : null,
              pagination: pag.length ? pag.get(0) : null,
              paginationClickable: pag.length ? pag.attr("data-clickable") !== "false" : false,
              paginationBulletRender: pag.length ? pag.attr("data-index-bullet") === "true" ? function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                  } : null : null,
              scrollbar: bar.length ? bar.get(0) : null,
              scrollbarDraggable: bar.length ? bar.attr("data-draggable") !== "false" : true,
              scrollbarHide: bar.length ? bar.attr("data-draggable") === "false" : false,
              loop: s.attr('data-loop') !== "false",
              loopedSlides: 3,
              autoplayDisableOnInteraction: false,
              onTransitionStart: function (swiper) {
                toggleSwiperInnerVideos(swiper);
              },
              onTransitionEnd: function (swiper) {
                toggleSwiperCaptionAnimation(swiper);
              },
              onInit: function (swiper) {
                toggleSwiperInnerVideos(swiper);
                toggleSwiperCaptionAnimation(swiper);
                var o = $(swiper.container).find('.rd-parallax');
                if (o.length && window.RDParallax) {
                  o.RDParallax({layerDirection: ($('html').hasClass("smoothscroll") || $('html').hasClass("smoothscroll-all")) && !isIE() ? "normal" : "inverse"});
                }
              }
            });
            $(window).on("resize", function () {
              var mh = getSwiperHeight(s, "min-height"),
                h = getSwiperHeight(s, "height");
              if (h) {
                s.css("height", mh ? mh > h ? mh : h : h);
              }
            }).load(function () {
              s.find("video").each(function () {
                if (!$(this).parents(".swiper-slide-active").length) {
                  this.pause();
                }
              });
            }).trigger("resize");
          });
        });
      }
    });
  })(jQuery);
}

if (pageSlug === 'portafolio') {
  // gallery
  (function ($) {
    $(function () {
      var $container = $("#jg_gallery");
      $container.mixitup({
        effects: ["fade", "scale", "rotateZ"], onMixLoad: function () {
          $container.addClass("loaded")
        }
      });
      var click = true;
      $('a[data-fancybox="fancybox"]').fancybox({
        padding: 0,
        margin: 0,
        loop: true,
        openSpeed: 500,
        closeSpeed: 500,
        nextSpeed: 500,
        prevSpeed: 500,
        afterLoad: function () {
          $(".fancybox-inner").click(function () {
            if (click == true) {
              $("body").toggleClass("fancybox-full")
            }
          })
        },
        beforeShow: function () {
          $("body").addClass("fancybox-lock")
        },
        afterClose: function () {
          $("body").removeClass("fancybox-lock");
        },
        tpl: {image: '<div class="fancybox-image"style="background-image: url(\'{href}\');"/>'},
        helpers: {title: null, thumbs: {height: 50, width: 80}, overlay: {css: {"background": "#191919"}}}
      });
    })
  })(jQuery)
}


// carousel
(function ($) {
  $(document).ready(function () {
    var o = $(".owl-carousel_214");
    if (o.length) {
      var isTouch = "ontouchstart" in window;

      function preventScroll(e) {
        e.preventDefault();
      }

      $(document).ready(function () {
        o.each(function () {
          var c = $(this), responsive = {};
          var aliaces = ["-", "-xs-", "-sm-", "-md-", "-lg-"], values = [0, 480, 768, 992, 1200], i, j;
          for (i = 0; i < values.length; i++) {
            responsive[values[i]] = {};
            for (j = i; j >= -1; j--) {
              if (!responsive[values[i]]["items"] && c.attr("data" + aliaces[j] + "items")) {
                responsive[values[i]]["items"] = j < 0 ? 1 : parseInt(c.attr("data" + aliaces[j] + "items"));
              }
              if (!responsive[values[i]]["stagePadding"] && responsive[values[i]]["stagePadding"] !== 0 && c.attr("data" + aliaces[j] + "stage-padding")) {
                responsive[values[i]]["stagePadding"] = j < 0 ? 0 : parseInt(c.attr("data" + aliaces[j] + "stage-padding"));
              }
              if (!responsive[values[i]]["margin"] && responsive[values[i]]["margin"] !== 0 && c.attr("data" + aliaces[j] + "margin")) {
                responsive[values[i]]["margin"] = j < 0 ? 30 : parseInt(c.attr("data" + aliaces[j] + "margin"));
              }
            }
          }
          c.owlCarousel({
            autoplay: c.attr("data-autoplay") === "true",
            autoplayTimeout: 5000,
            loop: c.attr("data-loop") !== "false",
            nav: c.attr("data-nav") === "true",
            dots: c.attr("data-dots") === "true",
            dotsEach: c.attr("data-dots-each") ? parseInt(c.attr("data-dots-each")) : false,
            responsive: responsive,
            navText: [],
            onInitialized: function () {
              if ($.fn.magnificPopup) {
                var o = this.$element.find("[data-lightbox]").not("[data-lightbox='gallery'] [data-lightbox]"), g = this.$element.find("[data-lightbox^='gallery']");
                if (o.length) {
                  o.each(function () {
                    var $this = $(this);
                    $this.magnificPopup({
                      type: $this.attr("data-lightbox"),
                      callbacks: {
                        open: function () {
                          if (isTouch) {
                            $(document).on("touchmove", preventScroll);
                            $(document).swipe({
                              swipeDown: function () {
                                $.magnificPopup.close();
                              }
                            });
                          }
                        }, close: function () {
                          if (isTouch) {
                            $(document).off("touchmove", preventScroll);
                            $(document).swipe("destroy");
                          }
                        }
                      }
                    });
                  })
                }
                if (g.length) {
                  g.each(function () {
                    var $gallery = $(this);
                    $gallery.find("[data-lightbox]").each(function () {
                      var $item = $(this);
                      $item.addClass("mfp-" + $item.attr("data-lightbox"));
                    }).end().magnificPopup({
                      delegate: "[data-lightbox]",
                      type: "image",
                      gallery: {enabled: true},
                      callbacks: {
                        open: function () {
                          if (isTouch) {
                            $(document).on("touchmove", preventScroll);
                            $(document).swipe({
                              swipeDown: function () {
                                $.magnificPopup.close();
                              }
                            });
                          }
                        }, close: function () {
                          if (isTouch) {
                            $(document).off("touchmove", preventScroll);
                            $(document).swipe("destroy");
                          }
                        }
                      }
                    });
                  })
                }
              }
            }
          });
        });
      });
    }
  });
})(jQuery);

// menu
jQuery(function ($) {
  var e = $(window).width();
  $("#icemegamenu").find(".icesubMenu").each(function (a) {
    var b = $(this).offset();
    var c = b.left + $(this).width();
    if (c >= e) {
      $(this).addClass("ice_righttoleft")
    }
  });
  $(window).resize(function () {
    var d = $(window).width();
    $("#icemegamenu").find(".icesubMenu").removeClass("ice_righttoleft").each(function (a) {
      var b = $(this).offset();
      var c = b.left + $(this).width();
      if (c >= d) {
        $(this).addClass("ice_righttoleft")
      }
    })
  })
});