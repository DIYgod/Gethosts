$(function () {
  (function ($, document, undefined) {

    var pluses = /\+/g;

    function raw(s) {
      return s;
    }

    function decoded(s) {
      return decodeURIComponent(s.replace(pluses, ' '));
    }

    var config = $.cookie = function (key, value, options) {

      // write
      if (value !== undefined) {
        options = $.extend({}, config.defaults, options);

        if (value === null) {
          options.expires = -1;
        }

        if (typeof options.expires === 'number') {
          var days = options.expires, t = options.expires = new Date();
          t.setDate(t.getDate() + days);
        }

        value = config.json ? JSON.stringify(value) : String(value);

        return (document.cookie = [
          encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
          options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
          options.path ? '; path=' + options.path : '',
          options.domain ? '; domain=' + options.domain : '',
          options.secure ? '; secure' : ''
        ].join(''));
      }

      // read
      var decode = config.raw ? raw : decoded;
      var cookies = document.cookie.split('; ');
      for (var i = 0, l = cookies.length; i < l; i++) {
        var parts = cookies[i].split('=');
        if (decode(parts.shift()) === key) {
          var cookie = decode(parts.join('='));
          return config.json ? JSON.parse(cookie) : cookie;
        }
      }

      return null;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
      if ($.cookie(key) !== null) {
        $.cookie(key, null, options);
        return true;
      }
      return false;
    };

  })(jQuery, document);

  $('#ee-download-btn, #ee-download-btn a, #ee-download-btn .span').click(function (e) {
    e.preventDefault();
    e.stopPropagation();

 
      $('#body-mask').show();
      $('#ee-service-protocol').fadeIn();
      return false;
 
  });

  $('.se-service-protocol-close-btn').click(function () {
    $('#body-mask').hide();
    $('#ee-service-protocol').fadeOut();
  });

  $('#agree-download').click(function (e) {
    if ($('#noshowanymore').attr('checked')) {
      $.cookie('noshowanymore', '1', {expires:100});
    }

    $('#body-mask').hide();
    $('#ee-service-protocol').fadeOut();

    var url = $('#ee-download-btn a').attr('href');
    window.open(url, '_self');
  }).mousedown(function (e) {
      $(this).css({'background':'#5d81cf'});
    }).mouseup(function (e) {
      $(this).css({'background':'#719CF4'});
    });
});

(function ($) {
  if (!!window.ActiveXObject && !window.XMLHttpRequest && (location.href=='http://chrome.360.cn/index.html' || location.href=='http://chrome.360.cn/')) return;
  $(function () {
    nav();
    bnrSilder();
    sideSlider();
    helpToggle();
    systole();
    slideImg();
    downM();
    ExtMutual();
    slides("#slides", ".slides");
    skinMutual();
    srollList("#dialog01", "11");
    srollList("#dialog02", "6");
    anchorLink();

    var img = document.createElement("img");
    img.src = "http://p1.qhimg.com/d/360browser/20130225/new03.png";
    img.onload = function() {
      window.onload = function () {
        skinShow();
      };
    };
  });

  function skinShow() {
    var img = $("#bnr-img");
    if (img.length == 0) return;
 var urls = [
      "http://p1.qhimg.com/d/360browser/20130225/new03.png",
      "http://p2.qhimg.com/d/360browser/20121010/bnr.png",
      "http://p2.qhimg.com/d/360browser/20121009/classic.png"
    ];
   

    var rslt = navigator.appVersion.match(/MSIE (\d+\.\d+)/, '');
    var itsAllGood = (rslt != null && Number(rslt[1]) < 9);
    if(itsAllGood)
    {
        /* var bg = $(".warper");
	  var bgs = [
      	 "http://p2.qhimg.com/d/360browser/20121009/bg01.jpg",
      	 "http://p8.qhimg.com/d/360browser/20121009/bg02.jpg"
    	 ];*/
        var t=0;
	 setTimeout(function () {
  	 setInterval(function () {
	 if(t==0){
	 img.attr('src', urls[1]);
          t=1;
         } else if (t == 1) {
	   img.attr('src',urls[2]);
           t = 2;
         } else {
	 	 img.attr('src',urls[0]);
	 	 t=0;
              }
},5000);
},4000);
     }else {
   
     var len = urls.length;
    var index = 0;
    setTimeout(function () {
      index = (index >= len - 1) ? 0 : index + 1;
      var url = urls[index];

      img.animate({opacity:0}, 1000, function () {
        this.src = url;
        $(this)[0].onload = function () {
          $(this).animate({opacity:1}, 1500);
        };
      });

      setInterval(function () {
        index = (index >= len - 1) ? 0 : index + 1;
        var url = urls[index];

        img.animate({opacity:0}, 1000, function () {
          this.src = url;
          $(this)[0].onload = function () {
            $(this).animate({opacity:1}, 1500);
          };
        });
      }, 6500);
    }, 4000);
}
  }

  function anchorLink() {
    $(".txt-nav li:not(':last')").click(function () {
      var idx = $(".txt-nav li").index(this),
        scrTop;
      switch (idx) {
        case  0 :
          scrTop = 200;
          break;
        case  1 :
          scrTop = 480;
          break;
        case  2 :
          scrTop = 875;
          break;
        case  3 :
          scrTop = 1500;
          break;
      }
      $("body,html").animate({scrollTop:scrTop}, 600);
    });
  }

  ;

  function nav() {
    var $liCur = $(".nav-box ul li.cur"),
      curP = $liCur.position().left,
      curW = $liCur.outerWidth(true),
      $slider = $(".nav-line"),
      $targetEle = $(".nav-box ul li:not('.last') a"),
      $navBox = $(".nav-box");
    $slider.stop(true, true).animate({
      "left":curP,
      "width":curW
    });
    $targetEle.mouseenter(function () {
      var $_parent = $(this).parent(),
        _width = $_parent.outerWidth(true),
        posL = $_parent.position().left;
      $slider.stop(true, true).animate({
        "left":posL,
        "width":_width
      }, "fast");
    });
    $navBox.mouseleave(function (cur, wid) {
      cur = curP;
      wid = curW;
      $slider.stop(true, true).animate({
        "left":cur,
        "width":wid
      }, "fast");
    });
  }

  ;

  function bnrSilder() {
    if (!$("#head").length && !$("#bnr").length) {
      return;
    }
    (function () {
      if (navigator.userAgent.toLocaleLowerCase().indexOf('opera') >= 0) return;
      var sstag = document.createElement('script');
      sstag.type = 'text/javascript';
      sstag.async = true;
      sstag.src = 'script/SmoothScroll.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(sstag, s);
    })();
    $(window).scroll(function () {
      var bTop = $(this).scrollTop();
      $('.bnr-box').css({
        'margin-top':-bTop * 0.48
      });
      $('.bnr-txt').css({
        'margin-top':-bTop * 0.68
      });
      $('.bnr-btn').css({
        'margin-top':-bTop * 0.68
      });
      $('.warper').css({
        "background-position":"50% " + bTop * 0.2 + "px"
      });
      if (bTop < 200) {
        $(".txt-warp").css({
          'margin-top':-bTop * 1.5
        });
        $(".txt-nav-warp").removeAttr("style");
      } else {
        $(".txt-warp").css({
          'margin-top':-240
        });
        $(".txt-nav-warp").css({
          "position":"fixed",
          "top":0,
          "left":0,
          "box-shadow":"0 2px 6px #eee"
        });

      }
      var idxs = 0;
      if (bTop >= 200 && bTop < 480) {
        idxs;
      } else if (bTop >= 480 && bTop < 755) {
        idxs = 1;
      } else if (bTop >= 755) {
        idxs = 2;
      }
      $('.txt-nav li a').eq(idxs).addClass('on').parent().siblings().children().removeClass

        ('on');
      if (bTop < 200) {
        $('.txt-nav li a').removeClass('on');
      }
    });
  };


  function sideSlider() {
    if (!$(".help-side dl").length) {
      return false;
    }
    var $aCur = $(".help-side dl").find(".cur a"),
      $targetA = $(".help-side dl dd a"),
      $sideSilder = $(".side-slider"),
      curT = $aCur.position().top - 3;
    $sideSilder.stop(true, true).animate({
      "top":curT
    });
    $targetA.mouseenter(function () {
      var posT = $(this).position().top - 3;
      $sideSilder.stop(true, true).animate({
        "top":posT
      }, 240);
    }).parents(".help-side").mouseleave(function (_curT) {
        _curT = curT
        $sideSilder.stop(true, true).animate({
          "top":_curT
        });
      });
  }

  ;

  function helpToggle() {
    if (!$(".help-cont dl dt a").length) {
      return;
    }
    var $targetEle = $(".help-cont dl dt a");
    $targetEle.toggle(function () {
      $(this).parent().css({
        "background-position":"0 -20px"
      }).siblings().slideDown();
      return false;
    }, function () {
      $(this).parent().removeAttr("style").siblings().slideUp();
      return false;
    });
  }

  ;

  function systole() {
    if (!$(".history").length) {
      return;
    }
    var $warpEle = $(".history-date"),
      $targetA = $warpEle.find("h2 a,ul li dl dt a"),
      parentH,
      eleTop = [];
    parentH = $warpEle.parent().height();
    $warpEle.parent().css({
      "height":59
    });
    setTimeout(function () {

      $warpEle.find("ul").children(":not('h2:first')").each(function (idx) {
        eleTop.push($(this).position().top);
        $(this).css({
          "margin-top":-eleTop[idx]
        }).children().hide();
      }).animate({
          "margin-top":0
        }, 1600).children().fadeIn();
      $warpEle.parent().animate({
        "height":parentH
      }, 2600);

      $warpEle.find("ul").children(":not('h2:first')").addClass("bounceInDown").css({
        "-webkit-animation-duration":"2s",
        "-webkit-animation-delay":"0",
        "-webkit-animation-timing-function":"ease",
        "-webkit-animation-fill-mode":"both"
      }).end().children("h2").css({
          "position":"relative"
        });
    }, 600);

    $targetA.click(function () {
      $(this).parent().css({
        "position":"relative"
      });
      $(this).parent().siblings().slideToggle();
      $warpEle.parent().removeAttr("style");
      return false;
    });

  }

  ;

  function statechange() {
    var $tabImg = $('#tab-img');
    var $groundLayer = $('#ground-layer');
    var $coverLayer = $('#cover-layer');

    if ($tabImg.attr('class') == 'fly-in') {
      $tabImg.attr('class', 'to-fly-out');
      /*        $tabImg.attr('class', '');
       $groundLayer.css('opacity', 1).css('z-index', 1).css('left', '-980px').css('top', '80px');
       $coverLayer.css('z-index', 0);
       setTimeout(function() {$tabImg.attr('class', 'to-fly-out');}, 0); */
    } else {
      $tabImg.attr('class', 'to-fly-in');
      /*        $tabImg.attr('class', '');
       $coverLayer.css('opacity', 1).css('z-index', 1).css('left', '980px').css('top', '-80px');
       $groundLayer.css('z-index', 0);
       setTimeout(function() {$tabImg.attr('class', 'to-fly-in');}, 0);*/
    }
  }

  function slideImg() {
    var webkit = navigator.userAgent.toLocaleLowerCase().indexOf("webkit") != -1;
    if (webkit) {
      $("#tab-img").show();
      var $tabImg = $('#tab-img');
      var $tabContBox = $(".tab-cont-box");
      if (!$tabImg.length) return false;

      $('#tab-img-btn-img1').click(function () {
        $tabImg.attr('class', 'fly-out');
        $tabContBox.first().fadeIn("slow").end().last().hide();
        setTimeout(statechange, 500);
      });
      $('#tab-img-btn-img2').click(function () {
        $tabImg.attr('class', 'fly-in');
        $tabContBox.last().fadeIn("slow").end().first().hide();
        setTimeout(statechange, 500);
      });

      return;
    }

    $("#tab-img-replace").show();
    if (!$("#tab-img-replace").length && !$(".tab-cont").length) {
      return false;
    }

    var $tabImg = $("#tab-img-replace"),
      $slideImg = $tabImg.find(".img-slide"),
      $slideBox = $(".tab-img-slide");
    $tabBtn = $(".tab-img-btn").find("a"),
      $tabContBox = $(".tab-cont-box");
    $tabBtn.toggle(function () {
      $(this).removeClass("pulse").addClass("btn flipInY");
      $slideImg.last().css({
        "left":$tabImg.width()
      }).show();
      $tabContBox.last().fadeIn("slow").end().first().hide();
      $slideBox.stop(true, true).animate({
        "margin-left":-$tabImg.width()
      }, 400, function () {
        $tabBtn.delay(1000).removeClass("flipInY");
        $slideImg.first().hide().end().last().css({
          "left":0
        });
        ;
        $(this).css({
          "margin-left":0
        });
      });
      return false;
    },function () {
      $(this).removeClass("flipInY pulse").addClass("flipInY").removeClass("btn");
      $slideImg.first().css({
        "left":$tabImg.width()
      }).show();
      $tabContBox.first().fadeIn("slow").end().last().hide();
      $slideBox.stop(true, true).animate({
        "margin-left":-$tabImg.width()
      }, 400, function () {
        $tabBtn.delay(1000).removeClass("flipInY");
        $slideImg.last().hide().end().first().css({
          "left":0
        });
        $(this).css({
          "margin-left":0
        });
      });
      return false;
    }).parent().hover(function () {
        $(this).children().addClass("pulse");
      }, function () {
        $(this).children().removeClass("pulse");
      });
  }

  ;

  function downM() {
    if (!$(".navi").length) {
      return false;
    }
    var $targetBtn = $(".pos-box > span"),
      targetW;
    $targetBtn.click(function () {
      $(this).parents(".pos-box").toggleClass("hover");
      targetW = $(this).parents("td").width() + 1;
      $(this).siblings(".search-box").find("span").width(targetW);
    }).parent().mouseleave(function () {
        $(this).parents("td").children().removeClass("hover");
      });
  }

  ;

  function ExtMutual() {
    var $extList = $(".extend-list li"),
      $extBtn = $(".ext-btn");
    $extList.delay(1000).hover(function () {
      $(this).find(".ext-logo").stop(true, true).delay(300).animate({
        "margin-top":-95
      }, 250);
    }, function () {
      $(this).find(".ext-logo").stop(true, true).animate({
        "margin-top":0
      }, 250);
    });
    $extList.each(function (idx) {
      $(this).click(function () {
        dialog("#dialog01");
      });
    });
    $extBtn.each(function (index) {
      $(this).click(function (e) {
        e.stopPropagation();
      });
    });
  }

  ;

  function skinMutual() {
    var $skinList = $(".skin-lists li"),
      $aTarget = $skinList.find("p a");
    $skinList.each(function (idx) {
      $(this).click(function () {
        dialog("#dialog02");
      });
    });
    $aTarget.click(function (e) {
      e.stopPropagation();
    });
  }

  ;

  function slides(eleId, targetEle) {
    if (!eleId && !targetEle) {
      return false;
    }
    var len = $(eleId).find(targetEle).length,
      cur = 0,
      zIdex = 2,
      t,
      tmpArr = [],
      w = $(eleId).find(targetEle).outerWidth(),
      h = $(eleId).find(targetEle).outerHeight();
    for (var i = 0; i < len; i += 1) {
      tmpArr.push("<li><a href='#nogo' hideFocus>" + i + "</a></li>");
    }
    $("<ul class='pagination' />").html(tmpArr.join("")).appendTo(eleId);
    $(".pagination li").eq(cur).addClass("current");
    $(eleId).find(targetEle).hide();
    $(eleId).find(targetEle).parent().css({
      "width":3 * w,
      "left":-w
    });
    $(eleId).find(targetEle).css({
      "left":w
    }).eq(cur).show().end().eq(cur + 1).css({
        "left":2 * w
      }).show();
    function animate(direction) {
      cur = (cur + 1) % len;
      $(".pagination li").removeClass("current").eq(cur).addClass("current");
      if (direction == 'top' || direction == 'bottom') {
        $(eleId).find(targetEle).parent().removeAttr("style").css({
          "height":3 * w,
          "top":-h
        });
        $(eleId).find(targetEle).removeAttr("style").css({
          "top":h
        }).eq(cur).show().end().eq(cur + 1).css({
            "top":2 * h
          }).show();
      }
      switch (direction) {
        case 'next':
          $(eleId).find(targetEle).hide().css({
            "left":w,
            "z-index":0
          }).eq(cur + 1 == len ? 0 : cur + 1).show().css({
              "left":2 * w
            })
            .end().eq(cur).show().css({
              "left":w,
              "z-index":zIdex
            });
          $(eleId).find(targetEle).parent().stop(true, true).animate({
            "left":-2 * w
          }, function () {
            $(this).css({
              "left":-w
            });
          });
          break;
        case 'prev':
          $(eleId).find(targetEle).hide().css({
            "left":w,
            "z-index":0
          }).eq(cur - 1 == -1 ? len - 1 : cur - 1).show().css({
              "left":0
            })
            .end().eq(cur).show().css({
              "left":w,
              "z-index":zIdex
            });
          $(eleId).find(targetEle).parent().stop(true, true).animate({
            "left":0
          }, function () {
            $(this).css({
              "left":-w
            });
          });
          break;
      }
    }

    ;

    $(".pagination li a").each(function (idx) {
      $(this).click(function () {
        var thisIdx = $(".pagination li.current").index();
        cur = idx - 1;
        if (idx == thisIdx) {
          return;
        }
        idx < thisIdx ? animate('prev') : animate('next');
      });

    });

    $(eleId).hover(function () {
      clearInterval(t);
    },function () {
      t = setInterval(function () {
        animate('next');
      }, 3000)
    }).trigger("mouseleave");
  }

  ;

  function dialog(id) {
    if (!$(".dialog-bg").length && !$(id).length) {
      return;
    }
    var $doc = $("body", document),
      $dialogWarp = $(".dialog-bg"),
      $dialog = $(id),
      $dialogCont = $(".dialog-cont"),
      $clsBtn = $("#closed-btn"),
      maxH = $doc.height(),
      posL = 425,
      posT = $(".dialog-cont").height() / 2,
      w = 850,
      h = $(".dialog-cont").height();
    //$dialogWarp.fadeOut();
    $dialogCont.hide();
    $clsBtn.hide();
    //$doc.css({"overflow":"hidden","margin-right":17});
    $doc.unbind("scroll");
    $dialogWarp.css({
      "height":maxH
    }).show();
    $dialog.delay(200).show().stop(true, true).animate({
      "width":w,
      "height":h,
      "margin-left":-posL,
      "margin-top":-posT
    }, "fast", "swing", function () {
      $dialogCont.show();
      $clsBtn.show();
    });
    $clsBtn.click(function () {

      $dialog.stop(true, false).animate({
        "width":0,
        "height":0,
        "margin-left":0,
        "margin-top":0
      }, function () {
        $(this).removeAttr("style");
      });
      $dialogCont.hide();
      $clsBtn.hide();
      $doc.removeAttr("style");
      $dialogWarp.removeAttr("style").hide();

    });
    $dialogWarp.click(function () {
      $dialog.stop(true, false).animate({
        "width":0,
        "height":0,
        "margin-left":0,
        "margin-top":0
      }, function () {
        $(this).removeAttr("style");
      });
      $dialogCont.hide();
      $clsBtn.hide();
      $doc.removeAttr("style");
      $dialogWarp.removeAttr("style").hide();
    });
  }

  ;

  function srollList(id, srlNum) {
    if (id == '' && srlNum == '') {
      return;
    }
    var $id = id,
      $prev = $("#prev", $id),
      $next = $("#next", $id),
      $btnList = $(".btn-list", $id),
      $ul = $("ul", $btnList),
      $li = $("li", $ul),
      $clsBtn = $("#closed-btn", $id),
      maxLen = $li.length,
      liW = $li.outerWidth(true),
      next = "-=",
      prev = "+=",
      page = 1,
      i = srlNum,
      srollW = liW * i,
      filledW = srollW - ((i - (maxLen % i)) * liW) == 0 ? srollW : srollW - ((i - (maxLen % i)) * liW),
      page_count = Math.ceil(maxLen / i);
    $next.click(function () {
      if (page == page_count) {
        return;
      }
      page == page_count - 1 && filledW > 0 ? srollW = filledW : srollW = liW * i;
      move(next);
      page++;
      //console.log(page);
    });
    $prev.click(function () {
      //var page_count = Math.ceil(maxLen / i);
      if (page == 1) {
        return;
      }
      page == page_count ? srollW = filledW : srollW = liW * i;
      move(prev);
      page--;
    });
    $li.click(function () {
      $(this).addClass("cur").siblings().removeClass("cur");
    });
    function move(path) {
      $ul.stop(true, true).animate({
        "margin-left":path + srollW
      }, 300);
    }

    ;
    $clsBtn.click(function () {
      page = 1;
      $ul.removeAttr("style");
    });
  }

  ;

})(jQuery);