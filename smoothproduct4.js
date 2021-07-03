!(function (s) {
    s.fn.extend({
      deleteSmoothProducts: function () {
        s(document.body).off("click", ".sp-lightbox"),
          s(document.body).off("click", "#sp-prev"),
          s(document.body).off("click", "#sp-next"),
          s(document.body).off("click", ".sp-large a"),
          s(document.body).off("click", ".sp-noff-touch .sp-zoom"),
          s(document.body).off("click", ".sp-tb-active a"),
          s(document.body).off("click", ".sp-thumbs");
      },
      smoothproducts: function () {
        function t() {
          s(".sp-selected").removeClass("sp-selected"),
            s(".sp-lightbox").fadeOut(function () {
              s(this).remove();
            });
        }
        function e(s) {
          return s.match(/url\([\"\']{0,1}(.+)[\"\']{0,1}\)+/i)[1];
        }
        s(".sp-loading").hide(),
          s(".sp-wrap").each(function () {
            var t, e, p, a, u;
            (jj = s("a img", this).attr("alt")),
              (a = "alt='" + jj + "'"),
              (jjj = s("a img", this).attr("title")),
              (u = "title='" + jjj + "'"),
              s(this).addClass("sp-touch"),
              1 < s("a", this).length
                ? ((p = !!s("a.sp-default", this)[0]),
                  s(this).append(
                    '<div class="sp-large"></div><div class="sp-thumbs sp-tb-active"></div>'
                  ),
                  s("a", this).each(function (a) {
                    var n = s("img", this).attr("src"),
                      i = s(this).attr("href"),
                      r = "";
                    ((0 === a && !p) || s(this).hasClass("sp-default")) &&
                      ((r = ' class="sp-current"'),
                      (t = i),
                      (e = s("img", this)[0].src)),
                      s(this)
                        .parents(".sp-wrap")
                        .find(".sp-thumbs")
                        .append(
                          '<a href="' +
                            i +
                            '" style="background-image:url(' +
                            n +
                            ')"' +
                            r +
                            "></a>"
                        ),
                      s(this).remove();
                  }),
                  s(".sp-large", this).append(
                    '<a href="' +
                      t +
                      '" class="sp-current-big"><img src="' +
                      e +
                      '" ' +
                      a + u +
                      " /></a>"
                  ))
                : (s(this).append('<div class="sp-large"></div>'),
                  s("a", this)
                    .appendTo(s(".sp-large", this))
                    .addClass(".sp-current-big")),
              s(".sp-wrap").css("display", "inline-block");
          }),
          s(document.body).on("click", ".sp-thumbs", function (s) {
            s.preventDefault();
          }),
          s(document.body).on("mouseover", function (t) {
            s(".sp-wrap").removeClass("sp-touch").addClass("sp-non-touch"),
              t.preventDefault();
          }),
          s(document.body).on("touchstart", function () {
            s(".sp-wrap").removeClass("sp-non-touch").addClass("sp-touch");
          }),
          s(document.body).on("click", ".sp-tb-active a", function (t) {
            var p = "alt='" + s(".sp-large a img").attr("alt") + "'";
            var u = "title='" + s(".sp-large a img").attr("title") + "'";
            t.preventDefault(),
              s(this).parent().find(".sp-current").removeClass(),
              s(this).addClass("sp-current"),
              s(this)
                .parents(".sp-wrap")
                .find(".sp-thumbs")
                .removeClass("sp-tb-active"),
              s(this).parents(".sp-wrap").find(".sp-zoom").remove();
            var a = s(this).parents(".sp-wrap").find(".sp-large").height(),
              n = s(this).parents(".sp-wrap").find(".sp-large").width();
            s(this)
              .parents(".sp-wrap")
              .find(".sp-large")
              .css({ overflow: "hidden", height: a + "px", width: n + "px" }),
              s(this)
                .addClass("sp-current")
                .parents(".sp-wrap")
                .find(".sp-large a")
                .remove();
            var i = s(this).parent().find(".sp-current").attr("href"),
              r = e(s(this).parent().find(".sp-current").css("backgroundImage"));
            s(this)
              .parents(".sp-wrap")
              .find(".sp-large")
              .html(
                '<a href="' +
                  i +
                  '" class="sp-current-big"><img src="' +
                  r +
                  '" ' +
                  p +
                  "/></a>"
              ),
              s(this)
                .parents(".sp-wrap")
                .find(".sp-large")
                .hide()
                .fadeIn(250, function () {
                  var t = s(this)
                    .parents(".sp-wrap")
                    .find(".sp-large img")
                    .height();
                  s(this)
                    .parents(".sp-wrap")
                    .find(".sp-large")
                    .animate({ height: t }, "fast", function () {
                      s(".sp-large").css({ height: "auto", width: "auto" });
                    }),
                    s(this)
                      .parents(".sp-wrap")
                      .find(".sp-thumbs")
                      .addClass("sp-tb-active");
                });
          }),
          s(document.body).on(
            "mouseenter",
            ".sp-non-touch .sp-large",
            function (t) {
              var e = s("a", this).attr("href");
              s(this).append('<div class="sp-zoom"><img src="' + e + '"/></div>'),
                s(this).find(".sp-zoom").fadeIn(250),
                t.preventDefault();
            }
          ),
          s(document.body).on(
            "mouseleave",
            ".sp-non-touch .sp-large",
            function (t) {
              s(this)
                .find(".sp-zoom")
                .fadeOut(250, function () {
                  s(this).remove();
                }),
                t.preventDefault();
            }
          ),
          s(document.body).on("click", ".sp-non-touch .sp-zoom", function (t) {
            var e = s(this).html(),
              p = s(this).parents(".sp-wrap").find(".sp-thumbs a").length,
              a =
                s(this)
                  .parents(".sp-wrap")
                  .find(".sp-thumbs .sp-current")
                  .index() + 1;
            s(this).parents(".sp-wrap").addClass("sp-selected"),
              s("body").append(
                "<div class='sp-lightbox' data-currenteq='" +
                  a +
                  "'>" +
                  e +
                  "</div>"
              ),
              1 < p &&
                (s(".sp-lightbox").append(
                  "<a href='#' id='sp-prev'></a><a href='#' id='sp-next'></a>"
                ),
                1 == a
                  ? s("#sp-prev").css("opacity", ".1")
                  : a == p && s("#sp-next").css("opacity", ".1")),
              s(".sp-lightbox").fadeIn(),
              t.preventDefault();
          }),
          s(document.body).on("click", ".sp-large a", function (t) {
            var e = s(this).attr("href"),
              p = s(this).parents(".sp-wrap").find(".sp-thumbs a").length,
              a =
                s(this)
                  .parents(".sp-wrap")
                  .find(".sp-thumbs .sp-current")
                  .index() + 1;
            s(this).parents(".sp-wrap").addClass("sp-selected"),
              s("body").append(
                '<div class="sp-lightbox" data-currenteq="' +
                  a +
                  '"><img src="' +
                  e +
                  '"/></div>'
              ),
              1 < p &&
                (s(".sp-lightbox").append(
                  "<a href='#' id='sp-prev'></a><a href='#' id='sp-next'></a>"
                ),
                1 == a
                  ? s("#sp-prev").css("opacity", ".1")
                  : a == p && s("#sp-next").css("opacity", ".1")),
              s(".sp-lightbox").fadeIn(),
              t.preventDefault();
          }),
          s(document.body).on("click", "#sp-next", function (t) {
            t.stopPropagation();
            var p,
              a,
              n,
              i = s(".sp-lightbox").data("currenteq"),
              r = s(".sp-selected .sp-thumbs a").length;
            r <= i ||
              ((p = i + 1),
              (a = s(".sp-selected .sp-thumbs")
                .find("a:eq(" + i + ")")
                .attr("href")),
              (n = e(
                s(".sp-selected .sp-thumbs")
                  .find("a:eq(" + i + ")")
                  .css("backgroundImage")
              )),
              i == r - 1 && s("#sp-next").css("opacity", ".1"),
              s("#sp-prev").css("opacity", "1"),
              s(".sp-selected .sp-current").removeClass(),
              s(".sp-selected .sp-thumbs a:eq(" + i + ")").addClass("sp-current"),
              s(".sp-selected .sp-large")
                .empty()
                .append("<a href=" + a + '><img src="' + n + '"/></a>'),
              s(".sp-lightbox img").fadeOut(250, function () {
                s(this).remove(),
                  s(".sp-lightbox")
                    .data("currenteq", p)
                    .append('<img src="' + a + '"/>'),
                  s(".sp-lightbox img").hide().fadeIn(250);
              })),
              t.preventDefault();
          }),
          s(document.body).on("click", "#sp-prev", function (t) {
            t.stopPropagation();
            var p,
              a,
              n,
              i = s(".sp-lightbox").data("currenteq");
            (i -= 1) <= 0 ||
              (1 == i && s("#sp-prev").css("opacity", ".1"),
              (p = i - 1),
              (a = s(".sp-selected .sp-thumbs")
                .find("a:eq(" + p + ")")
                .attr("href")),
              (n = e(
                s(".sp-selected .sp-thumbs")
                  .find("a:eq(" + p + ")")
                  .css("backgroundImage")
              )),
              s("#sp-next").css("opacity", "1"),
              s(".sp-selected .sp-current").removeClass(),
              s(".sp-selected .sp-thumbs a:eq(" + p + ")").addClass("sp-current"),
              s(".sp-selected .sp-large")
                .empty()
                .append("<a href=" + a + '><img src="' + n + '"/></a>'),
              s(".sp-lightbox img").fadeOut(250, function () {
                s(this).remove(),
                  s(".sp-lightbox")
                    .data("currenteq", i)
                    .append('<img src="' + a + '"/>'),
                  s(".sp-lightbox img").hide().fadeIn(250);
              })),
              t.preventDefault();
          }),
          s(document.body).on("click", ".sp-lightbox", function () {
            t();
          }),
          s(document).on("keydown", function (s) {
            if (27 == s.keyCode) return t(), !1;
          }),
          s(".sp-large").on("mousemove", function (t) {
            var e = s(this).width(),
              p = s(this).height(),
              a = s(this).offset(),
              n = s(this).find(".sp-zoom").width(),
              i = s(this).find(".sp-zoom").height(),
              r = t.pageX - a.left,
              o = t.pageY - a.top,
              d = Math.floor((r * (e - n)) / e),
              c = Math.floor((o * (p - i)) / p);
            s(this).find(".sp-zoom").css({ left: d, top: c });
          });
      },
    });
  })(jQuery);
  