function showLoading() {
    jQuery(".vxr-loading-overlay").height($(window).height()).show();
    jQuery(".vxr-loading-overlay img").css("margin-top", ($(window).height() - 75) / 2 + "px")
}

function hideLoading() {
    jQuery(".vxr-loading-overlay").hide()
}

function loadCSS(n, t, i) {
    "use strict";

    function f() {
        for (var e, t = 0; t < u.length; t++) u[t].href && u[t].href.indexOf(n) > -1 && (e = !0);
        e ? r.media = i || "all" : setTimeout(f)
    }
    var r = window.document.createElement("link"),
        e = t || window.document.getElementsByTagName("script")[0],
        u = window.document.styleSheets;
    return r.rel = "stylesheet", r.href = n, r.media = "only x", e.parentNode.insertBefore(r, e), f(), setTimeout(function() {
        $("body").removeAttr("style")
    }, 100), r
}

function showMenu() {
    $(".header-blue-right-menu-mobile").toggleClass("displayblock");
    $("#overlay-layout").toggleClass("displayblock");
    $("nav.header-blue").toggleClass("over-lay-fixed")
}

function getMobileOperatingSystem() {
    var n = navigator.userAgent || navigator.vendor || window.opera;
    return n.match(/iPad/i) || n.match(/iPhone/i) || n.match(/iPod/i) ? "iOS" : n.match(/Android/i) ? "Android" : "unknown"
}

function downloadAndroidApp() {
    window.location.href = "market://details?id=com.vexere.vexere"
}

function downloadAppStore() {
    window.location = urlVxrOnAppStore
}

function bindDownloadAppEvent() {
    var n = getMobileOperatingSystem();
    $(".play-store-button").click(function() {
        sendDownloadEvent("Android");
        window.open(urlVxrOnGooglePlay)
    });
    $(".app-store-button").click(function() {
        sendDownloadEvent("IOS");
        window.open(urlVxrOnAppStore)
    });
    n == "iOS" && $(".app-store-mobile-button").css("display", "block");
    n == "Android" && $(".play-store-mobile-button").css("display", "block");
    $(".app-store-mobile-button").parent().click(function() {
        n == "iOS" ? (sendDownloadEvent("IOS"), downloadAppStore()) : n == "Android" && (sendDownloadEvent("Android"), downloadAndroidApp())
    })
}

function getPageType() {
    var n = "Trang chủ";
    return window.location.href.indexOf("/xe-") >= 0 ? n = "Trang nhà xe" : window.location.href.indexOf("/ben-xe-") >= 0 ? n = "Trang bến xe" : window.location.href.indexOf("/ve-xe-") >= 0 ? n = "Trang tuyến đường" : window.location.href.indexOf("/vexetet") >= 0 && (n = "Trang vé xe Tết"), n
}

function sendDownloadEvent(n) {
    var t = "PC",
        i = getPageType(),
        r = $(window).width();
    r < 768 ? t = "mobile" : r <= 991 && (t = "table");
    console.log({
        event: "DownloadClick",
        apptype: n,
        pageType: i,
        device: t,
        brandtype: FLOW_NON_ECOM,
        eventCallback: function() {}
    });
    dataLayer.push({
        event: "DownloadClick",
        apptype: n,
        pagetype: i,
        device: t,
        brandtype: FLOW_NON_ECOM,
        eventCallback: function() {}
    })
}

function sendShowHotline(n) {
    var t = "showHotlineHeader",
        i;
    n == !1 && (t = "showHotlineFooter");
    i = getPageType();
    console.log(t + ", " + i);
    dataLayer.push({
        event: t,
        flow: FLOW_NON_ECOM,
        branchtype: "non-ecommerce",
        pagetype: i,
        eventCallback: function() {}
    })
}

function bindLeftMenu() {
    $("#overlay-layout").click(function() {
        showMenu()
    })
}

function popupPartialProcess() {
    $.ajax({
        url: "/vi-VN/Support/GetBannner?",
        type: "POST",
        success: function(n) {
            if (n = JSON.parse(n), $(window).width() < 768) {
                if (n.result.popup_banner_mobile.src != "" && n.result.popup_banner_mobile.status == !0) {
                    $(".img-popup-tet").attr("src", n.result.popup_banner_mobile.src);
                    $(".banner-link").attr("href", n.result.popup_banner_mobile.link);
                    setTimeout(function() {
                        sessionStorage.PopupShown != "yes" && ($("#vexetet-modal").modal("show"), sessionStorage.PopupShown = "yes")
                    }, 1e3);
                    $(".close-button").click(function() {
                        $("#vexetet-modal").modal("hide")
                    });
                    $(document).on("keydown", function(n) {
                        n.keyCode == 27 && $("#vexetet-modal").modal("hide")
                    })
                }
            } else if (n.result.popup_banner.src != "" && n.result.popup_banner.status == !0) {
                $(".img-popup-tet").attr("src", n.result.popup_banner.src);
                $(".banner-link").attr("href", n.result.popup_banner.link);
                setTimeout(function() {
                    sessionStorage.PopupShown != "yes" && ($("#vexetet-modal").modal("show"), sessionStorage.PopupShown = "yes")
                }, 1e3);
                $(".close-button").click(function() {
                    $("#vexetet-modal").modal("hide")
                });
                $(document).on("keydown", function(n) {
                    n.keyCode == 27 && $("#vexetet-modal").modal("hide")
                })
            }
        }
    })
}

function bindClickOnHotLineHeaderFooter() {
    $("#footer-hotline-link, #header-hotline-link").click(function() {
        $(this).next(".tooltip-hotline").toggle()
    });
    $("#header-hotline-link").mouseleave(function() {
        var n = $($(".tooltip-hotline")[0]).is(":hover");
        n || setTimeout(function() {
            $(".tooltip-hotline").hide()
        }, 500)
    });
    $("#footer-hotline-link").mouseleave(function() {
        setTimeout(function() {
            var n = $($(".tooltip-hotline-footer")).is(":hover");
            n || $(".tooltip-hotline").hide()
        }, 500)
    });
    $(".tooltip-hotline").mouseleave(function() {
        setTimeout(function() {
            $(".tooltip-hotline").hide()
        }, 500)
    });
    $(window).scroll(function() {
        setTimeout(function() {
            $(".tooltip-hotline").hide()
        }, 500)
    })
}

function INT(n) {
    return Math.floor(n)
}

function jdFromDate(n, t, i) {
    var f, r, e, u;
    return f = INT((14 - t) / 12), r = i + 4800 - f, e = t + 12 * f - 3, u = n + INT((153 * e + 2) / 5) + 365 * r + INT(r / 4) - INT(r / 100) + INT(r / 400) - 32045, u < 2299161 && (u = n + INT((153 * e + 2) / 5) + 365 * r + INT(r / 4) - 32083), u
}

function jdToDate(n) {
    var u, i, r, f, e, t, o, s, h;
    return n > 2299160 ? (u = n + 32044, i = INT((4 * u + 3) / 146097), r = u - INT(i * 146097 / 4)) : (i = 0, r = n + 32082), f = INT((4 * r + 3) / 1461), e = r - INT(1461 * f / 4), t = INT((5 * e + 2) / 153), o = e - INT((153 * t + 2) / 5) + 1, s = t + 3 - 12 * INT(t / 10), h = i * 100 + f - 4800 + INT(t / 10), [o, s, h]
}

function NewMoon(n) {
    var r, u, o, t, h, e, f, s, i, c;
    return r = n / 1236.85, u = r * r, o = u * r, t = PI / 180, h = 2415020.75933 + 29.53058868 * n + .0001178 * u - 155e-9 * o, h = h + .00033 * Math.sin((166.56 + 132.87 * r - .009173 * u) * t), e = 359.2242 + 29.10535608 * n - 333e-7 * u - 347e-8 * o, f = 306.0253 + 385.81691806 * n + .0107306 * u + 1236e-8 * o, s = 21.2964 + 390.67050646 * n - .0016528 * u - 239e-8 * o, i = (.1734 - .000393 * r) * Math.sin(e * t) + .0021 * Math.sin(2 * t * e), i = i - .4068 * Math.sin(f * t) + .0161 * Math.sin(t * 2 * f), i = i - .0004 * Math.sin(t * 3 * f), i = i + .0104 * Math.sin(t * 2 * s) - .0051 * Math.sin(t * (e + f)), i = i - .0074 * Math.sin(t * (e - f)) + .0004 * Math.sin(t * (2 * s + e)), i = i - .0004 * Math.sin(t * (2 * s - e)) - .0006 * Math.sin(t * (2 * s + f)), i = i + .001 * Math.sin(t * (2 * s - f)) + .0005 * Math.sin(t * (2 * f + e)), c = r < -11 ? .001 + .000839 * r + .0002261 * u - 845e-8 * o - 81e-9 * r * o : -.000278 + .000265 * r + .000262 * u, h + i - c
}

function SunLongitude(n) {
    var t, i, r, f, o, e, u;
    return t = (n - 2451545) / 36525, i = t * t, r = PI / 180, f = 357.5291 + 35999.0503 * t - .0001559 * i - 48e-8 * t * i, o = 280.46645 + 36000.76983 * t + .0003032 * i, e = (1.9146 - .004817 * t - 14e-6 * i) * Math.sin(r * f), e = e + (.019993 - .000101 * t) * Math.sin(r * 2 * f) + .00029 * Math.sin(r * 3 * f), u = o + e, u = u * r, u - PI * 2 * INT(u / (PI * 2))
}

function getSunLongitude(n, t) {
    return INT(SunLongitude(n - .5 - t / 24) / PI * 6)
}

function getNewMoonDay(n, t) {
    return INT(NewMoon(n) + .5 + t / 24)
}

function getLunarMonth11(n, t) {
    var r, u, i, f;
    return u = jdFromDate(31, 12, n) - 2415021, r = INT(u / 29.530588853), i = getNewMoonDay(r, t), f = getSunLongitude(i, t), f >= 9 && (i = getNewMoonDay(r - 1, t)), i
}

function getLeapMonthOffset(n, t) {
    var u, f, r, i;
    u = INT((n - 2415021.0769986948) / 29.530588853 + .5);
    f = 0;
    i = 1;
    r = getSunLongitude(getNewMoonDay(u + i, t), t);
    do f = r, i++, r = getSunLongitude(getNewMoonDay(u + i, t), t); while (r != f && i < 14);
    return i - 1
}

function convertSolar2Lunar(n, t, i, r) {
    var h, o, e, u, c, a, f, s, l;
    return o = jdFromDate(n, t, i), h = INT((o - 2415021.0769986948) / 29.530588853), e = getNewMoonDay(h + 1, r), e > o && (e = getNewMoonDay(h, r)), u = getLunarMonth11(i, r), c = u, u >= e ? (s = i, u = getLunarMonth11(i - 1, r)) : (s = i + 1, c = getLunarMonth11(i + 1, r)), a = o - e + 1, diff = INT((e - u) / 29), l = 0, f = diff + 11, c - u > 365 && (leapMonthDiff = getLeapMonthOffset(u, r), diff >= leapMonthDiff && (f = diff + 10, diff == leapMonthDiff && (l = 1))), f > 12 && (f = f - 12), f >= 11 && diff < 4 && (s -= 1), [a, f, s, l]
}

function convertLunar2Solar(n, t, i, r, u) {
    var c, e, s, f, h, o, l;
    if (t < 11 ? (e = getLunarMonth11(i - 1, u), s = getLunarMonth11(i, u)) : (e = getLunarMonth11(i, u), s = getLunarMonth11(i + 1, u)), c = INT(.5 + (e - 2415021.0769986948) / 29.530588853), f = t - 11, f < 0 && (f += 12), s - e > 365) {
        if (h = getLeapMonthOffset(e, u), o = h - 2, o < 0 && (o += 12), r != 0 && t != o) return [0, 0, 0];
        (r != 0 || f >= h) && (f += 1)
    }
    return l = getNewMoonDay(c + f, u), jdToDate(l + n - 1)
}

function initCustomDatePicker(n, t) {
    var i = 2;
    $(window).width() < 768 && (i = 1);
    $.datepicker.regional.vi = t == "vi" ? {
        dateFormat: "dd-mm-yy",
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: "",
        showButtonPanel: !1,
        gotoCurrent: !0,
        firstDay: 1,
        todayHighlight: !1,
        numberOfMonths: i,
        closeText: "Đóng",
        prevText: "&#x3c;Trước",
        nextText: "Tiếp&#x3e;",
        currentText: "Hôm nay",
        monthNames: ["Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"],
        monthNamesShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
        dayNames: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
        dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        weekHeader: "Tu",
        beforeShow: function(t) {
            var i;
            n && ($(window).width() < 768 ? ($.datepicker._pos = $.datepicker._findPos(t), $(t).attr("id") == "span-current-date" ? (i = $("#span-current-date").offset(), $.datepicker._pos[1] = i.top + 30) : $.datepicker._pos[1] = $.datepicker._pos[1] + 320, jQuery(this).datepicker("option", {
                minDate: 0
            }), setTimeout(function() {
                jQuery(".ui-datepicker-buttonpane").find(".ui-datepicker-current").hide()
            }, 1), $("html, body").animate({
                scrollTop: $.datepicker._pos[1] - 320
            }, 500), $(".tim-ve-2015 #searchSubmit").attr("style", "margin-top: 238px !important")) : ($.datepicker._pos = $.datepicker._findPos(t), $(t).attr("id") == "departDate" ? (i = $("#departDate").offset(), $.datepicker._pos[1] = i.top + 30) : $(t).attr("id") == "span-current-date" ? (i = $("#span-current-date").offset(), $.datepicker._pos[1] = i.top + 30) : $.datepicker._pos[1] = $.datepicker._pos[1] + 300, jQuery(this).datepicker("option", {
                minDate: 0
            }), setTimeout(function() {
                jQuery(".ui-datepicker-buttonpane").find(".ui-datepicker-current").hide()
            }, 1)))
        },
        onClose: function() {
            n && $(".tim-ve-2015 #searchSubmit").removeAttr("style")
        }
    } : {
        dateFormat: "dd-mm-yy",
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: "",
        showButtonPanel: !1,
        gotoCurrent: !0,
        firstDay: 1,
        todayHighlight: !1,
        numberOfMonths: i,
        beforeShow: function(t) {
            var i;
            n && ($(window).width() < 768 ? ($.datepicker._pos = $.datepicker._findPos(t), $(t).attr("id") == "span-current-date" ? (i = $("#span-current-date").offset(), $.datepicker._pos[1] = i.top + 30) : $.datepicker._pos[1] = $.datepicker._pos[1] + 320, jQuery(this).datepicker("option", {
                minDate: 0
            }), setTimeout(function() {
                jQuery(".ui-datepicker-buttonpane").find(".ui-datepicker-current").hide()
            }, 1), $("html, body").animate({
                scrollTop: $.datepicker._pos[1] - 320
            }, 500), $(".tim-ve-2015 #searchSubmit").attr("style", "margin-top: 238px !important")) : ($.datepicker._pos = $.datepicker._findPos(t), $(t).attr("id") == "departDate" ? (i = $("#departDate").offset(), $.datepicker._pos[1] = i.top + 30) : $(t).attr("id") == "span-current-date" ? (i = $("#span-current-date").offset(), $.datepicker._pos[1] = i.top + 30) : $.datepicker._pos[1] = $.datepicker._pos[1] + 300, jQuery(this).datepicker("option", {
                minDate: 0
            }), setTimeout(function() {
                jQuery(".ui-datepicker-buttonpane").find(".ui-datepicker-current").hide()
            }, 1)))
        },
        onClose: function() {
            n && $(".tim-ve-2015 #searchSubmit").removeAttr("style")
        }
    };
    $.datepicker.setDefaults($.datepicker.regional.vi)
}

function locdau(n) {
    return n = n.toLowerCase(), n = n.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a"), n = n.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e"), n = n.replace(/ì|í|ị|ỉ|ĩ/g, "i"), n = n.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o"), n = n.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u"), n = n.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y"), n = n.replace(/đ/g, "d"), n = n.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-"), n = n.replace(/-+-/g, "-"), n.replace(/^\-+|\-+$/g, "")
}

function filterAlphabet(n) {
    return n = n.toLowerCase(), n = n.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a"), n = n.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e"), n = n.replace(/ì|í|ị|ỉ|ĩ/g, "i"), n = n.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o"), n = n.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u"), n = n.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y"), n = n.replace(/đ/g, "d"), n = n.replace(/-+-/g, "-"), n.replace(/^\-+|\-+$/g, "")
}

function SearchRoute(n, t, i) {
    var r = t + "-" + i;
    window.location.href = r + "#" + n.replace(/-/g, "")
}

function parseDate(n) {
    var t = n.split("-");
    return new Date(t[0], t[1] - 1, t[2])
}

function getMinDate(n) {
    var t = new Date,
        i = parseDate(n);
    return i > t ? i : t
}

function getMaxDate(n) {
    return "" != n ? parseDate(n) : null
}

function numberWithDot(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

function closeSelector() {
    $(".place-selector").hide()
}

function getLanguage(n) {
    n && (language = n)
}

function setCommonDataWhenSearch() {
    sessionStorage.inSession = "true"
}

function getSearchInfoFromUserInuput(n, t) {
    var i = statecity.find(function(t) {
            return t.value == n
        }),
        r = statecity.find(function(n) {
            return n.value == t
        });
    i && r && (i.CityId > 0 ? ($("#start-point-type").val(2), $("#start-point-id").val(i.CityId)) : ($("#start-point-type").val(1), $("#start-point-id").val(i.StateId)), r.CityId > 0 ? ($("#stop-point-type").val(2), $("#stop-point-id").val(r.CityId)) : ($("#stop-point-type").val(1), $("#stop-point-id").val(r.StateId)))
}

function searchTickets(n) {
    var a, p, f, e, t, r, u, i;
    if (language || (language = "vi"), a = "Trang chủ", p = "formSearchSuccess", window.location.href.indexOf("/xe-") >= 0 ? a = "Trang nhà xe" : window.location.href.indexOf("/ben-xe-") >= 0 ? a = "Trang bến xe" : window.location.href.indexOf("/ve-xe-") >= 0 ? a = "Trang tuyến đường" : window.location.href.indexOf("/vexetet") >= 0 && (a = "Trang vé xe Tết", p = "searchvetet"), localStorage.searchForm = 1, language == "en") {
        if (isMobile) {
            if (f = $.trim($("#departPlace").val()), e = $.trim($("#destination").val()), f == "" || f == "" && e == "" ? ($("#departPlace").addClass("has-error"), $("#departPlace").attr("placeholder", Language.PleaseEnterDepartureCity)) : e == "" && ($("#destination").addClass("has-error"), $("#destination").attr("placeholder", Language.PleaseEnterArrivalCity)), !$.isNumeric($("#start-point-id").val())) return $departPlace.trigger("focus"), !1;
            if (!$.isNumeric($("#stop-point-id").val())) return $destination.trigger("focus"), !1;
            if (t = $("#departDate").val(), t != null && (t = t.replace(/\//gi, "")), t == null || t == "") return $("#departDate").trigger("focus"), !1;
            getSearchInfoFromUserInuput($("#departPlace").val(), $("#destination").val());
            r = locdau($("#departPlace").val());
            u = locdau($("#destination").val());
            "ho-chi-minh" == r && (r = "sai-gon");
            "ho-chi-minh" == u && (u = "sai-gon");
            var v = $("#search-busoperator-id").val(),
                w = locdau($("#search-busoperator-name").val()),
                o = "/bus-ticket-booking" + ("-from-" + r + "-to-" + u + "-"),
                s = $("#start-point-type").val(),
                h = $("#start-point-id").val(),
                c = $("#stop-point-type").val(),
                l = $("#stop-point-id").val(),
                y = 1;
            return s != "" && h != "" && c != "" && l != "" && (o += v > 0 ? String.format("{0}{1}t{2}{3}{4}-o{5}.html", s, h, c, l, y, v) : String.format("{0}{1}t{2}{3}{4}.html", s, h, c, l, y), n && showLoading(), t = t.replace(/-/g, ""), i = window.location.href.split("#")[0], i.indexOf("?source=") > -1 && (i = i.split("?source=")[1], o += "?source=" + i), window.dataLayer = window.dataLayer || [], window.dataLayer.push({
                event: p,
                flow: "ecommerce",
                formId: "searchForm",
                SearchCategory: $("#departPlace").val() + " - " + $("#destination").val() + " - " + $("#departDate").val(),
                SearchRoute: $("#departPlace").val() + " - " + $("#destination").val(),
                SearchRouteDate: $("#departDate").val(),
                SearchPage: a
            }), setCommonDataWhenSearch(), location.href = "/en-US" + o + "#" + t), !1
        }
        if (f = $.trim($("#departPlace").val()), e = $.trim($("#destination").val()), f == "" || f == "" && e == "" ? ($("#departPlace").addClass("has-error"), $("#departPlace").attr("placeholder", Language.PleaseEnterDepartureCity)) : e == "" && ($("#destination").addClass("has-error"), $("#destination").attr("placeholder", Language.PleaseEnterArrivalCity)), !$.isNumeric($("#start-point-id").val())) return $departPlace.trigger("focus"), !1;
        if (!$.isNumeric($("#stop-point-id").val())) return $destination.trigger("focus"), !1;
        if (t = $("#departDate").val(), t != null && (t = t.replace(/\//gi, "")), t == null || t == "") return $("#departDate").trigger("focus"), !1;
        getSearchInfoFromUserInuput($("#departPlace").val(), $("#destination").val());
        r = locdau($("#departPlace").val());
        u = locdau($("#destination").val());
        "ho-chi-minh" == r && (r = "sai-gon");
        "ho-chi-minh" == u && (u = "sai-gon");
        var v = $("#search-busoperator-id").val(),
            w = locdau($("#search-busoperator-name").val()),
            o = "/bus-ticket-booking" + ("-from-" + r + "-to-" + u + "-"),
            s = $("#start-point-type").val(),
            h = $("#start-point-id").val(),
            c = $("#stop-point-type").val(),
            l = $("#stop-point-id").val(),
            y = 1;
        return s != "" && h != "" && c != "" && l != "" && (o += v > 0 ? String.format("{0}{1}t{2}{3}{4}-o{5}.html", s, h, c, l, y, v) : String.format("{0}{1}t{2}{3}{4}.html", s, h, c, l, y), n && showLoading(), t = t.replace(/-/g, ""), i = window.location.href.split("#")[0], i.indexOf("?source=") > -1 && (i = i.split("?source=")[1], o += "?source=" + i), window.dataLayer = window.dataLayer || [], window.dataLayer.push({
            event: p,
            flow: "ecommerce",
            formId: "searchForm",
            SearchCategory: $("#departPlace").val() + " - " + $("#destination").val() + " - " + $("#departDate").val(),
            SearchRoute: $("#departPlace").val() + " - " + $("#destination").val(),
            SearchRouteDate: $("#departDate").val(),
            SearchPage: a
        }), setCommonDataWhenSearch(), location.href = "/en-US" + o + "#" + t), !1
    }
    if (isMobile) {
        if (f = $.trim($("#departPlace").val()), e = $.trim($("#destination").val()), f == "" || f == "" && e == "" ? ($("#departPlace").addClass("has-error"), $("#departPlace").attr("placeholder", Language.PleaseEnterDepartureCity)) : e == "" && ($("#destination").addClass("has-error"), $("#destination").attr("placeholder", Language.PleaseEnterArrivalCity)), !$.isNumeric($("#start-point-id").val())) return $departPlace.trigger("focus"), !1;
        if (!$.isNumeric($("#stop-point-id").val())) return $destination.trigger("focus"), !1;
        if (t = $("#departDate").val(), t != null && (t = t.replace(/\//gi, "")), t == null || t == "") return $("#departDate").trigger("focus"), !1;
        getSearchInfoFromUserInuput($("#departPlace").val(), $("#destination").val());
        r = locdau($("#departPlace").val());
        u = locdau($("#destination").val());
        "ho-chi-minh" == r && (r = "sai-gon");
        "ho-chi-minh" == u && (u = "sai-gon");
        var v = $("#search-busoperator-id").val(),
            w = locdau($("#search-busoperator-name").val()),
            o = "/ve-xe-khach" + ("-tu-" + r + "-di-" + u + "-"),
            s = $("#start-point-type").val(),
            h = $("#start-point-id").val(),
            c = $("#stop-point-type").val(),
            l = $("#stop-point-id").val(),
            y = 1;
        return s != "" && h != "" && c != "" && l != "" && (o += v > 0 ? String.format("{0}{1}t{2}{3}{4}-o{5}.html", s, h, c, l, y, v) : String.format("{0}{1}t{2}{3}{4}.html", s, h, c, l, y), n && showLoading(), t = t.replace(/-/g, ""), i = window.location.href.split("#")[0], i.indexOf("?source=") > -1 && (i = i.split("?source=")[1], o += "?source=" + i), window.dataLayer = window.dataLayer || [], window.dataLayer.push({
            event: p,
            flow: "ecommerce",
            formId: "searchForm",
            SearchCategory: $("#departPlace").val() + " - " + $("#destination").val() + " - " + $("#departDate").val(),
            SearchRoute: $("#departPlace").val() + " - " + $("#destination").val(),
            SearchRouteDate: $("#departDate").val(),
            SearchPage: a
        }), setCommonDataWhenSearch(), location.href = "/vi-VN" + o + "#" + t), !1
    }
    if (f = $.trim($("#departPlace").val()), e = $.trim($("#destination").val()), f == "" || f == "" && e == "" ? ($("#departPlace").addClass("has-error"), $("#departPlace").attr("placeholder", Language.PleaseEnterDepartureCity)) : e == "" && ($("#destination").addClass("has-error"), $("#destination").attr("placeholder", Language.PleaseEnterArrivalCity)), !$.isNumeric($("#start-point-id").val())) return $departPlace.trigger("focus"), !1;
    if (!$.isNumeric($("#stop-point-id").val())) return $destination.trigger("focus"), !1;
    if (t = $("#departDate").val(), t != null && (t = t.replace(/\//gi, "")), t == null || t == "") return $("#departDate").trigger("focus"), !1;
    getSearchInfoFromUserInuput($("#departPlace").val(), $("#destination").val());
    r = locdau($("#departPlace").val());
    u = locdau($("#destination").val());
    "ho-chi-minh" == r && (r = "sai-gon");
    "ho-chi-minh" == u && (u = "sai-gon");
    var v = $("#search-busoperator-id").val(),
        w = locdau($("#search-busoperator-name").val()),
        o = "/ve-xe-khach" + ("-tu-" + r + "-di-" + u + "-"),
        s = $("#start-point-type").val(),
        h = $("#start-point-id").val(),
        c = $("#stop-point-type").val(),
        l = $("#stop-point-id").val(),
        y = 1;
    return s != "" && h != "" && c != "" && l != "" && (o += v > 0 ? String.format("{0}{1}t{2}{3}{4}-o{5}.html", s, h, c, l, y, v) : String.format("{0}{1}t{2}{3}{4}.html", s, h, c, l, y), n && showLoading(), t = t.replace(/-/g, ""), i = window.location.href.split("#")[0], i.indexOf("?source=") > -1 && (i = i.split("?source=")[1], o += "?source=" + i), window.dataLayer = window.dataLayer || [], window.dataLayer.push({
        event: p,
        flow: "ecommerce",
        formId: "searchForm",
        SearchCategory: $("#departPlace").val() + " - " + $("#destination").val() + " - " + $("#departDate").val(),
        SearchRoute: $("#departPlace").val() + " - " + $("#destination").val(),
        SearchRouteDate: $("#departDate").val(),
        SearchPage: a
    }), setCommonDataWhenSearch(), location.href = "/vi-VN" + o + "#" + t), !1
}

function clickOutsideSelector(n) {
    $(document).mouseup(function(t) {
        var i = $(n),
            r = i.prev();
        !i.is(":visible") || r.is(":focus") || i.is(t.target) || i.has(t.target).length !== 0 || i.hide()
    })
}

function maskEventOnDepartureInput() {
    function n(n) {
        var t = n.keyCode || n.which;
        if (t == 9) return n.preventDefault(), !1
    }
    $("#departPlace").focus(function() {
        closeSelector();
        $(this).next("#departPlaceSelector").css("display", "block")
    });
    $("#departPlace").keypress(function(n) {
        n.keyCode == 13 ? $(this).val() ? $("#destination").focus() : $(this).focus() : closeSelector()
    });
    $departPlace.on("focus", function() {
        closeSelector();
        $(this).next("#departPlaceSelector").css("display", "block")
    }).on("keydown", function(n) {
        n.keyCode == 13 ? $(this).val() ? $("#destination").focus() : $(this).focus() : n.keyCode == 9 ? $("#destination").focus() : closeSelector()
    }).catcomplete({
        autoFocus: !0,
        delay: 0,
        source: function(n, t) {
            var r = slug(n.term),
                u = n.term,
                e = [],
                f = [],
                i = [],
                o = [];
            $.each(statecity, function(n, t) {
                var h = slug(t.value),
                    s = t.value,
                    l = s.toLowerCase(),
                    c;
                return (t.Category == "Quận - Huyện" || t.Category == "Bến xe" || t.Category == "Bus station") && h.split("qwerty")[1].toString().indexOf(r) === 0 ? (e.push(t), !0) : (c = abbreviate(s).toLowerCase(), r.toLowerCase() == c || r.toLowerCase() == slug(c)) ? (o.push(t), !0) : s.indexOf(u) === 0 ? (i = [t].concat(i), !0) : h.toLowerCase().indexOf(r.toLowerCase()) === 0 ? (i.push(t), !0) : s.indexOf(u) >= 0 ? (f.push(t), !0) : h.indexOf(r) === 0 ? (e.push(t), !0) : void 0
            });
            i = sortByMacthOrder(u, i);
            f = sortByMacthOrder(u, f);
            t(o.concat(i).concat(f).slice(0, 10))
        },
        select: function(n, t) {
            $("#destination").focus();
            $(".myModal-timnoi").modal("hide");
            $("#departPlace").val(t.item.label)
        },
        focus: function(n, t) {
            t.item.CityId > 0 ? ($("#start-point-type").val(2), $("#start-point-id").val(t.item.CityId)) : ($("#start-point-type").val(1), $("#start-point-id").val(t.item.StateId));
            $(this).data("label", t.item.value)
        }
    });
    $(document).on("keydown", n)
}

function sortByMacthOrder(n, t) {
    n = n.toLowerCase();
    var i = filterAlphabet(n);
    return $.each(t, function(t, r) {
        var u = r.value.toLowerCase();
        u.indexOf(n) >= 0 ? (r.MatchType = 1, r.MatchIndex = u.indexOf(n)) : filterAlphabet(u).indexOf(i) >= 0 && (r.MatchType = 2, r.MatchIndex = u.indexOf(i))
    }), t.sort(sortMatchTypeIndex)
}

function sortMatchTypeIndex(n, t) {
    return n.MatchType < t.MatchType ? -1 : n.MatchType > t.MatchType ? 1 : n.MatchIndex < t.MatchIndex ? -1 : n.MatchIndex > t.MatchIndex ? 1 : void 0
}

function maskEventOnDestinationInput() {
    $("#destination").focus(function() {
        closeSelector();
        $(this).next("#destinationSelector").css("display", "block")
    });
    $("#destination").keypress(function(n) {
        n.keyCode == 13 ? $(this).val() ? $("#departDate").focus() : $(this).focus() : closeSelector()
    });
    $destination.on("focus", function() {
        closeSelector();
        $(this).next("#destinationSelector").css("display", "block")
    }).on("keydown", function(n) {
        n.keyCode == 13 ? $(this).val() ? $("#departDate").focus() : $(this).focus() : n.keyCode == 9 ? $("#departDate").focus() : closeSelector()
    }).catcomplete({
        autoFocus: !0,
        delay: 0,
        source: function(n, t) {
            var r = slug(n.term),
                u = n.term,
                e = [],
                f = [],
                i = [],
                o = [];
            $.each(statecity, function(n, t) {
                var s = slug(t.value),
                    h = t.value,
                    c;
                return (t.Category == "Quận - Huyện" || t.Category == "Bến xe" || t.Category == "Bus station") && s.split("qwerty")[1].toString().indexOf(r) === 0 ? (e.push(t), !0) : (c = abbreviate(h).toLowerCase(), r.toLowerCase() == c || r.toLowerCase() == slug(c)) ? (o.push(t), !0) : h.indexOf(u) === 0 ? (i = [t].concat(i), !0) : s.toLowerCase().indexOf(r.toLowerCase()) === 0 ? (i.push(t), !0) : h.indexOf(u) >= 0 ? (f.push(t), !0) : s.indexOf(r) === 0 ? (e.push(t), !0) : void 0
            });
            i = sortByMacthOrder(u, i);
            f = sortByMacthOrder(u, f);
            t(o.concat(i).concat(f).concat(e).slice(0, 10))
        },
        select: function(n, t) {
            $("#departDate").focus();
            $(".myModal-timnoi").modal("hide");
            $("#destination").val(t.item.label)
        },
        focus: function(n, t) {
            t.item.CityId > 0 ? ($("#stop-point-type").val(2), $("#stop-point-id").val(t.item.CityId)) : ($("#stop-point-type").val(1), $("#stop-point-id").val(t.item.StateId));
            $(this).data("label", t.item.value)
        }
    })
}

function maskEventOnDepartTimeInput() {
    var n;
    n = $(window).width() > 768 ? 2 : 1;
    $("#departDate").datepicker({
        minDate: new Date,
        numberOfMonths: n,
        todayHighlight: !1,
        gotoCurrent: !0,
        onSelect: function() {
            var n = Math.abs(new Date - $(this).datepicker("getDate")),
                t = Math.round(n / 864e5);
            $(this).datepicker("getDate") > $("#returnDate").datepicker("getDate") && $("#returnDate").datepicker("option", "minDate", t + 1)
        }
    });
    $("#departDate").focus(function() {
        closeSelector()
    })
}

function maskEventOnDestinationTimeInput() {
    $("#returnDate").datepicker({
        minDate: new Date,
        numberOfMonths: 2
    });
    $("#returnDate").focus(function() {
        closeSelector()
    })
}

function maskEventOnNumTicketSelect() {
    $("#passengerNum").customSelect()
}

function maskEventOnSelectStatePopup() {
    $("li.city > a").click(function() {
        console.log("hello");
        var n = $(this).parent().parent().parent().parent().parent().parent().parent().parent(),
            t = $(this).attr("data-state");
        return "departPlaceSelector" == n.attr("id") ? ($departPlace.val($(this).text()), $("#start-point-type").val(1), $("#start-point-id").val(t), $("#destination").focus()) : "destinationSelector" == n.attr("id") && ($("#destination").val($(this).text()), $("#stop-point-type").val(1), $("#stop-point-id").val(t), $("#departDate").focus()), !1
    });
    $("a.close").click(function() {
        closeSelector()
    });
    clickOutsideSelector("#departPlaceSelector");
    clickOutsideSelector("#destinationSelector")
}

function maskEventOnSearchButton() {
    $("#searchForm").on("submit", function() {
        return searchTickets(!0), !1
    })
}

function initSearchTicketWidget() {
    maskEventOnDepartureInput();
    maskEventOnDestinationInput();
    maskEventOnDepartTimeInput();
    maskEventOnDestinationTimeInput();
    maskEventOnNumTicketSelect();
    maskEventOnSelectStatePopup();
    maskEventOnSearchButton()
}

function GetWhatOnBox() {
    $.ajaxQueue({
        url: "/vi-VN/Home/WhatOnBox",
        type: "post",
        success: function(n) {
            $("#whatsOn").replaceWith(n)
        }
    })
}

function getLanguageCultureAndParam() {
    var n = "vi-VN",
        i = window.location.href,
        t;
    return i.indexOf("vi-VN") > 0 ? n = "vi-VN" : i.indexOf("en-US") > 0 && (n = "en-US"), t = "", getUrlVars().user != undefined && (t = "user=1"), {
        culture: n,
        translatorParam: t
    }
}

function getUrlVars() {
    for (var t = [], n, r = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), i = 0; i < r.length; i++) n = r[i].split("="), t.push(n[0]), t[n[0]] = n[1];
    return t
}

function GetPopularRoute() {
    var n = getLanguageCultureAndParam().culture,
        t = getLanguageCultureAndParam().translatorParam;
    $.ajaxQueue({
        url: "/" + n + "/Home/PopularRoute?" + t,
        type: "post",
        success: function(n) {
            $("#routeSearch").replaceWith(n);
            $("#routeSearch .selectDate").datepicker({
                constrainInput: !0,
                showOn: "button",
                top: "15px",
                buttonText: Language.chonngay,
                numberOfMonths: 2,
                showButtonPanel: !0,
                defaultDate: new Date,
                minDate: new Date,
                onSelect: function(n, t) {
                    var i = $(t.input[0]).attr("data-url"),
                        r = $(t.input[0]).attr("data-param");
                    SearchRoute(n, i, r)
                }
            })
        }
    })
}

function GetFeaturedBusInfo() {
    var n = getLanguageCultureAndParam().culture,
        t = getLanguageCultureAndParam().translatorParam;
    $.ajaxQueue({
        url: "/" + n + "/Home/FeaturedBusInfo?" + t,
        type: "post",
        success: function(n) {
            $("#busNetwork").replaceWith(n)
        }
    })
}

function GetFeaturedBusStopInfo() {
    var n = getLanguageCultureAndParam().culture,
        t = getLanguageCultureAndParam().translatorParam;
    $.ajaxQueue({
        url: "/" + n + "/Home/FeaturedBusStopInfo?" + t,
        type: "post",
        success: function(n) {
            $("#stations").replaceWith(n)
        }
    })
}

function GetFeaturedLatestNews() {
    $.ajaxQueue({
        url: "/vi-VN/Home/FeaturedLatestNews",
        type: "post",
        success: function(n) {
            $("#news").replaceWith(n)
        }
    })
}

function InitHomePage(n) {
    $(document).ready(function() {
        var f, s, t, i;
        $(".image-slider").slick({
            slidesToShow: 4,
            variableWidth: !0,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: !0,
                    dots: !0
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }]
        });
        $(window).width() < 768 ? $(".slider-home-img").flexslider({
            animation: "slide",
            controlNav: !1,
            slideshowSpeed: slideshowSpeedTime,
            maxItem: 1,
            pauseOnAction: !1
        }) : $(".slider-home-img").flexslider({
            animation: "slide",
            controlNav: !0,
            slideshowSpeed: slideshowSpeedTime,
            maxItem: 1,
            pauseOnAction: !1
        });
        $(".slider-304-title").flexslider({
            animation: "slide",
            slideshowSpeed: slideshowSpeedTime,
            maxItem: 1
        });
        jQuery(".switchButton, .swapcities, .btn-switch-route").click(function() {
            var n = $("#departPlace").val();
            $("#departPlace").val($("#destination").val());
            $("#destination").val(n);
            n = $("#start-point-type").val();
            $("#start-point-type").val($("#stop-point-type").val());
            $("#stop-point-type").val(n);
            n = $("#start-point-id").val();
            $("#start-point-id").val($("#stop-point-id").val());
            $("#stop-point-id").val(n)
        });
        f = n;
        f && f != "" || (f = "vi");
        getLanguage(f);
        localStorage.clear();
        localStorage.version && localStorage.version == '@System.Configuration.ConfigurationManager.AppSettings["DeployVersion"]' || (localStorage.clear(), localStorage.setItem("version", '@System.Configuration.ConfigurationManager.AppSettings["DeployVersion"]'));
        var r = [],
            h = [],
            c = [],
            e = [],
            v = [],
            s = [];
        if (localStorage.getItem("fromName") != null && localStorage.getItem("fromName").indexOf("[") >= 0) {
            for (s = JSON.parse(localStorage.getItem("fromType")) || [], JSON.parse(localStorage.getItem("fromName")) && (e = JSON.parse(localStorage.getItem("fromName"))), JSON.parse(localStorage.getItem("fromId")) && (v = JSON.parse(localStorage.getItem("fromId"))), JSON.parse(localStorage.getItem("fromType")) && (s = JSON.parse(localStorage.getItem("fromType"))), t = 0; t < e.length; t++)
                if (r.indexOf(e[t]) >= 0) continue;
                else r.push(e[t]), h.push(v[t]), c.push(s[t]);
            var u = [],
                l = [],
                a = [],
                o = [],
                y = [],
                p = [];
            for (JSON.parse(localStorage.getItem("toName")) && (o = JSON.parse(localStorage.getItem("toName"))), JSON.parse(localStorage.getItem("toId")) && (y = JSON.parse(localStorage.getItem("toId"))), JSON.parse(localStorage.getItem("toType")) && (p = JSON.parse(localStorage.getItem("toType"))), t = 0; t < o.length; t++)
                if (u.indexOf(o[t]) >= 0) continue;
                else u.push(o[t]), l.push(y[t]), a.push(p[t]);
            for (t = 0; t < r.length; t += 2)
                if (i = "<tr>", i += "<td class='col-xs-6 pl0 pr0'><a class='popular-dep-place' data-fromid='" + h[t] + "' data-fromtype='" + c[t] + "' href='#'>" + r[t] + "<\/a><\/td>", t + 1 <= r.length - 1 && (i += "<td class='col-xs-6 pl0 pr0'><a class='popular-dep-place' data-fromid='" + h[t + 1] + "' data-fromtype='" + c[t + 1] + "' href='#'>" + r[t + 1] + "<\/a><\/td>"), i += "<\/tr>", $("#depart-table").find("tbody").append(i), t == 2) break;
            for (t = 0; t < u.length; t += 2)
                if (i = "<tr>", i += "<td class='col-xs-6 pl0 pr0'><a class='popular-des-place' data-toid='" + l[t] + "' data-totype='" + a[t] + "' href='#'>" + u[t] + "<\/a><\/td>", t + 1 <= u.length - 1 && (i += "<td class='col-xs-6 pl0 pr0'><a class='popular-des-place' data-toid='" + l[t + 1] + "' data-totype='" + a[t + 1] + "' href='#'>" + u[t + 1] + "<\/a><\/td>"), i += "<\/tr>", $("#destination-table").find("tbody").append(i), t == 2) break
        }
        $(window).width() <= 768 && ($("#departPlace").click(function() {
            $("#depart-modal").modal("show");
            $("#departPlace2").val($("#departPlace").val());
            $("#departPlace2").select();
            $("#departPlace2").focus()
        }), $("#destination").click(function() {
            $("#destination-modal").modal("show");
            $("#destination2").val($("#destination").val());
            $("#destination2").select();
            $("#destination2").focus()
        }), $(".popular-dep-place").click(function() {
            var i = $(this).attr("data-fromid"),
                r = $(this).attr("data-fromtype"),
                t = $(this).text(),
                n = $(this).data("searchtext");
            n != null && n != "" && (t = n);
            $("#departPlace").val(t);
            $("#start-point-type").val(r);
            $("#start-point-id").val(i);
            $("#depart-modal").modal("hide")
        }), $(".popular-des-place").click(function() {
            var i = $(this).attr("data-toid"),
                r = $(this).attr("data-totype"),
                t = $(this).text(),
                n = $(this).data("searchtext");
            n != null && n != "" && (t = n);
            $("#destination").val(t);
            $("#stop-point-type").val(r);
            $("#stop-point-id").val(i);
            $("#destination-modal").modal("hide")
        }), $(".dep-search-btn").click(function() {
            $("#depart-modal").modal("hide")
        }), $(".dep-search-btn").click(function() {
            $("#destination-modal").modal("hide")
        }), $("#clear-depart").click(function() {
            $("#departPlace2").val("");
            $("#departPlace2").focus()
        }), $("#clear-destination").click(function() {
            $("#destination2").val("");
            $("#destination2").focus()
        }))
    })
}

function rePos() {
    var n = window.pageYOffset || document.documentElement.scollTop;
    setTimeout(function() {
        window.scrollTo(0, n)
    }, 0)
}
var __Header, statecity, PI, slug, abbreviate, ajaxQueue, slideshowSpeedTime;
if (! function(n, t) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = n.document ? t(n, !0) : function(n) {
            if (!n.document) throw new Error("jQuery requires a window with a document");
            return t(n)
        } : t(n)
    }("undefined" != typeof window ? window : this, function(n, t) {
        function ii(n) {
            var t = !!n && "length" in n && n.length,
                r = i.type(n);
            return "function" === r || i.isWindow(n) ? !1 : "array" === r || 0 === t || "number" == typeof t && t > 0 && t - 1 in n
        }

        function ri(n, t, r) {
            if (i.isFunction(t)) return i.grep(n, function(n, i) {
                return !!t.call(n, i, n) !== r
            });
            if (t.nodeType) return i.grep(n, function(n) {
                return n === t !== r
            });
            if ("string" == typeof t) {
                if (wf.test(t)) return i.filter(t, n, r);
                t = i.filter(t, n)
            }
            return i.grep(n, function(n) {
                return ct.call(t, n) > -1 !== r
            })
        }

        function hr(n, t) {
            while ((n = n[t]) && 1 !== n.nodeType);
            return n
        }

        function bf(n) {
            var t = {};
            return i.each(n.match(h) || [], function(n, i) {
                t[i] = !0
            }), t
        }

        function vt() {
            u.removeEventListener("DOMContentLoaded", vt);
            n.removeEventListener("load", vt);
            i.ready()
        }

        function ft() {
            this.expando = i.expando + ft.uid++
        }

        function lr(n, t, r) {
            var u;
            if (void 0 === r && 1 === n.nodeType)
                if (u = "data-" + t.replace(cr, "-$&").toLowerCase(), r = n.getAttribute(u), "string" == typeof r) {
                    try {
                        r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : kf.test(r) ? i.parseJSON(r) : r
                    } catch (f) {}
                    e.set(n, t, r)
                } else r = void 0;
            return r
        }

        function vr(n, t, r, u) {
            var h, e = 1,
                l = 20,
                c = u ? function() {
                    return u.cur()
                } : function() {
                    return i.css(n, t, "")
                },
                s = c(),
                o = r && r[3] || (i.cssNumber[t] ? "" : "px"),
                f = (i.cssNumber[t] || "px" !== o && +s) && et.exec(i.css(n, t));
            if (f && f[3] !== o) {
                o = o || f[3];
                r = r || [];
                f = +s || 1;
                do e = e || ".5", f /= e, i.style(n, t, f + o); while (e !== (e = c() / s) && 1 !== e && --l)
            }
            return r && (f = +f || +s || 0, h = r[1] ? f + (r[1] + 1) * r[2] : +r[2], u && (u.unit = o, u.start = f, u.end = h)), h
        }

        function o(n, t) {
            var r = "undefined" != typeof n.getElementsByTagName ? n.getElementsByTagName(t || "*") : "undefined" != typeof n.querySelectorAll ? n.querySelectorAll(t || "*") : [];
            return void 0 === t || t && i.nodeName(n, t) ? i.merge([n], r) : r
        }

        function ui(n, t) {
            for (var i = 0, u = n.length; u > i; i++) r.set(n[i], "globalEval", !t || r.get(t[i], "globalEval"))
        }

        function kr(n, t, r, u, f) {
            for (var e, s, p, a, w, v, h = t.createDocumentFragment(), y = [], l = 0, b = n.length; b > l; l++)
                if (e = n[l], e || 0 === e)
                    if ("object" === i.type(e)) i.merge(y, e.nodeType ? [e] : e);
                    else if (br.test(e)) {
                for (s = s || h.appendChild(t.createElement("div")), p = (pr.exec(e) || ["", ""])[1].toLowerCase(), a = c[p] || c._default, s.innerHTML = a[1] + i.htmlPrefilter(e) + a[2], v = a[0]; v--;) s = s.lastChild;
                i.merge(y, s.childNodes);
                s = h.firstChild;
                s.textContent = ""
            } else y.push(t.createTextNode(e));
            for (h.textContent = "", l = 0; e = y[l++];)
                if (u && i.inArray(e, u) > -1) f && f.push(e);
                else if (w = i.contains(e.ownerDocument, e), s = o(h.appendChild(e), "script"), w && ui(s), r)
                for (v = 0; e = s[v++];) wr.test(e.type || "") && r.push(e);
            return h
        }

        function yt() {
            return !0
        }

        function nt() {
            return !1
        }

        function gr() {
            try {
                return u.activeElement
            } catch (n) {}
        }

        function fi(n, t, r, u, f, e) {
            var o, s;
            if ("object" == typeof t) {
                "string" != typeof r && (u = u || r, r = void 0);
                for (s in t) fi(n, s, r, u, t[s], e);
                return n
            }
            if (null == u && null == f ? (f = r, u = r = void 0) : null == f && ("string" == typeof r ? (f = u, u = void 0) : (f = u, u = r, r = void 0)), f === !1) f = nt;
            else if (!f) return this;
            return 1 === e && (o = f, f = function(n) {
                return i().off(n), o.apply(this, arguments)
            }, f.guid = o.guid || (o.guid = i.guid++)), n.each(function() {
                i.event.add(this, t, f, u, r)
            })
        }

        function nu(n, t) {
            return i.nodeName(n, "table") && i.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? n.getElementsByTagName("tbody")[0] || n : n
        }

        function fe(n) {
            return n.type = (null !== n.getAttribute("type")) + "/" + n.type, n
        }

        function ee(n) {
            var t = re.exec(n.type);
            return t ? n.type = t[1] : n.removeAttribute("type"), n
        }

        function tu(n, t) {
            var u, c, f, s, h, l, a, o;
            if (1 === t.nodeType) {
                if (r.hasData(n) && (s = r.access(n), h = r.set(t, s), o = s.events)) {
                    delete h.handle;
                    h.events = {};
                    for (f in o)
                        for (u = 0, c = o[f].length; c > u; u++) i.event.add(t, f, o[f][u])
                }
                e.hasData(n) && (l = e.access(n), a = i.extend({}, l), e.set(t, a))
            }
        }

        function oe(n, t) {
            var i = t.nodeName.toLowerCase();
            "input" === i && yr.test(n.type) ? t.checked = n.checked : ("input" === i || "textarea" === i) && (t.defaultValue = n.defaultValue)
        }

        function b(n, t, u, e) {
            t = gi.apply([], t);
            var l, p, c, a, s, w, h = 0,
                v = n.length,
                d = v - 1,
                y = t[0],
                k = i.isFunction(y);
            if (k || v > 1 && "string" == typeof y && !f.checkClone && ie.test(y)) return n.each(function(i) {
                var r = n.eq(i);
                k && (t[0] = y.call(this, i, r.html()));
                b(r, t, u, e)
            });
            if (v && (l = kr(t, n[0].ownerDocument, !1, n, e), p = l.firstChild, 1 === l.childNodes.length && (l = p), p || e)) {
                for (c = i.map(o(l, "script"), fe), a = c.length; v > h; h++) s = l, h !== d && (s = i.clone(s, !0, !0), a && i.merge(c, o(s, "script"))), u.call(n[h], s, h);
                if (a)
                    for (w = c[c.length - 1].ownerDocument, i.map(c, ee), h = 0; a > h; h++) s = c[h], wr.test(s.type || "") && !r.access(s, "globalEval") && i.contains(w, s) && (s.src ? i._evalUrl && i._evalUrl(s.src) : i.globalEval(s.textContent.replace(ue, "")))
            }
            return n
        }

        function iu(n, t, r) {
            for (var u, e = t ? i.filter(t, n) : n, f = 0; null != (u = e[f]); f++) r || 1 !== u.nodeType || i.cleanData(o(u)), u.parentNode && (r && i.contains(u.ownerDocument, u) && ui(o(u, "script")), u.parentNode.removeChild(u));
            return n
        }

        function ru(n, t) {
            var r = i(t.createElement(n)).appendTo(t.body),
                u = i.css(r[0], "display");
            return r.detach(), u
        }

        function oi(n) {
            var r = u,
                t = ei[n];
            return t || (t = ru(n, r), "none" !== t && t || (pt = (pt || i("<iframe frameborder='0' width='0' height='0'/>")).appendTo(r.documentElement), r = pt[0].contentDocument, r.write(), r.close(), t = ru(n, r), pt.detach()), ei[n] = t), t
        }

        function tt(n, t, r) {
            var o, s, h, u, e = n.style;
            return r = r || wt(n), r && (u = r.getPropertyValue(t) || r[t], "" !== u || i.contains(n.ownerDocument, n) || (u = i.style(n, t)), !f.pixelMarginRight() && si.test(u) && uu.test(t) && (o = e.width, s = e.minWidth, h = e.maxWidth, e.minWidth = e.maxWidth = e.width = u, u = r.width, e.width = o, e.minWidth = s, e.maxWidth = h)), void 0 !== u ? u + "" : u
        }

        function ci(n, t) {
            return {
                get: function() {
                    return n() ? void delete this.get : (this.get = t).apply(this, arguments)
                }
            }
        }

        function su(n) {
            if (n in ou) return n;
            for (var i = n[0].toUpperCase() + n.slice(1), t = eu.length; t--;)
                if (n = eu[t] + i, n in ou) return n
        }

        function hu(n, t, i) {
            var r = et.exec(t);
            return r ? Math.max(0, r[2] - (i || 0)) + (r[3] || "px") : t
        }

        function cu(n, t, r, u, f) {
            for (var e = r === (u ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > e; e += 2) "margin" === r && (o += i.css(n, r + w[e], !0, f)), u ? ("content" === r && (o -= i.css(n, "padding" + w[e], !0, f)), "margin" !== r && (o -= i.css(n, "border" + w[e] + "Width", !0, f))) : (o += i.css(n, "padding" + w[e], !0, f), "padding" !== r && (o += i.css(n, "border" + w[e] + "Width", !0, f)));
            return o
        }

        function lu(t, r, e) {
            var h = !0,
                o = "width" === r ? t.offsetWidth : t.offsetHeight,
                s = wt(t),
                c = "border-box" === i.css(t, "boxSizing", !1, s);
            if (u.msFullscreenElement && n.top !== n && t.getClientRects().length && (o = Math.round(100 * t.getBoundingClientRect()[r])), 0 >= o || null == o) {
                if (o = tt(t, r, s), (0 > o || null == o) && (o = t.style[r]), si.test(o)) return o;
                h = c && (f.boxSizingReliable() || o === t.style[r]);
                o = parseFloat(o) || 0
            }
            return o + cu(t, r, e || (c ? "border" : "content"), h, s) + "px"
        }

        function au(n, t) {
            for (var e, u, s, o = [], f = 0, h = n.length; h > f; f++) u = n[f], u.style && (o[f] = r.get(u, "olddisplay"), e = u.style.display, t ? (o[f] || "none" !== e || (u.style.display = ""), "" === u.style.display && ot(u) && (o[f] = r.access(u, "olddisplay", oi(u.nodeName)))) : (s = ot(u), "none" === e && s || r.set(u, "olddisplay", s ? e : i.css(u, "display"))));
            for (f = 0; h > f; f++) u = n[f], u.style && (t && "none" !== u.style.display && "" !== u.style.display || (u.style.display = t ? o[f] || "" : "none"));
            return n
        }

        function s(n, t, i, r, u) {
            return new s.prototype.init(n, t, i, r, u)
        }

        function pu() {
            return n.setTimeout(function() {
                it = void 0
            }), it = i.now()
        }

        function kt(n, t) {
            var r, u = 0,
                i = {
                    height: n
                };
            for (t = t ? 1 : 0; 4 > u; u += 2 - t) r = w[u], i["margin" + r] = i["padding" + r] = n;
            return t && (i.opacity = i.width = n), i
        }

        function wu(n, t, i) {
            for (var u, f = (l.tweeners[t] || []).concat(l.tweeners["*"]), r = 0, e = f.length; e > r; r++)
                if (u = f[r].call(i, t, n)) return u
        }

        function ce(n, t, u) {
            var f, a, p, v, o, w, h, b, l = this,
                y = {},
                s = n.style,
                c = n.nodeType && ot(n),
                e = r.get(n, "fxshow");
            u.queue || (o = i._queueHooks(n, "fx"), null == o.unqueued && (o.unqueued = 0, w = o.empty.fire, o.empty.fire = function() {
                o.unqueued || w()
            }), o.unqueued++, l.always(function() {
                l.always(function() {
                    o.unqueued--;
                    i.queue(n, "fx").length || o.empty.fire()
                })
            }));
            1 === n.nodeType && ("height" in t || "width" in t) && (u.overflow = [s.overflow, s.overflowX, s.overflowY], h = i.css(n, "display"), b = "none" === h ? r.get(n, "olddisplay") || oi(n.nodeName) : h, "inline" === b && "none" === i.css(n, "float") && (s.display = "inline-block"));
            u.overflow && (s.overflow = "hidden", l.always(function() {
                s.overflow = u.overflow[0];
                s.overflowX = u.overflow[1];
                s.overflowY = u.overflow[2]
            }));
            for (f in t)
                if (a = t[f], vu.exec(a)) {
                    if (delete t[f], p = p || "toggle" === a, a === (c ? "hide" : "show")) {
                        if ("show" !== a || !e || void 0 === e[f]) continue;
                        c = !0
                    }
                    y[f] = e && e[f] || i.style(n, f)
                } else h = void 0;
            if (i.isEmptyObject(y)) "inline" === ("none" === h ? oi(n.nodeName) : h) && (s.display = h);
            else {
                e ? "hidden" in e && (c = e.hidden) : e = r.access(n, "fxshow", {});
                p && (e.hidden = !c);
                c ? i(n).show() : l.done(function() {
                    i(n).hide()
                });
                l.done(function() {
                    var t;
                    r.remove(n, "fxshow");
                    for (t in y) i.style(n, t, y[t])
                });
                for (f in y) v = wu(c ? e[f] : 0, f, l), f in e || (e[f] = v.start, c && (v.end = v.start, v.start = "width" === f || "height" === f ? 1 : 0))
            }
        }

        function le(n, t) {
            var r, f, e, u, o;
            for (r in n)
                if (f = i.camelCase(r), e = t[f], u = n[r], i.isArray(u) && (e = u[1], u = n[r] = u[0]), r !== f && (n[f] = u, delete n[r]), o = i.cssHooks[f], o && "expand" in o) {
                    u = o.expand(u);
                    delete n[f];
                    for (r in u) r in n || (n[r] = u[r], t[r] = e)
                } else t[f] = e
        }

        function l(n, t, r) {
            var e, o, s = 0,
                a = l.prefilters.length,
                f = i.Deferred().always(function() {
                    delete c.elem
                }),
                c = function() {
                    if (o) return !1;
                    for (var s = it || pu(), t = Math.max(0, u.startTime + u.duration - s), h = t / u.duration || 0, i = 1 - h, r = 0, e = u.tweens.length; e > r; r++) u.tweens[r].run(i);
                    return f.notifyWith(n, [u, i, t]), 1 > i && e ? t : (f.resolveWith(n, [u]), !1)
                },
                u = f.promise({
                    elem: n,
                    props: i.extend({}, t),
                    opts: i.extend(!0, {
                        specialEasing: {},
                        easing: i.easing._default
                    }, r),
                    originalProperties: t,
                    originalOptions: r,
                    startTime: it || pu(),
                    duration: r.duration,
                    tweens: [],
                    createTween: function(t, r) {
                        var f = i.Tween(n, u.opts, t, r, u.opts.specialEasing[t] || u.opts.easing);
                        return u.tweens.push(f), f
                    },
                    stop: function(t) {
                        var i = 0,
                            r = t ? u.tweens.length : 0;
                        if (o) return this;
                        for (o = !0; r > i; i++) u.tweens[i].run(1);
                        return t ? (f.notifyWith(n, [u, 1, 0]), f.resolveWith(n, [u, t])) : f.rejectWith(n, [u, t]), this
                    }
                }),
                h = u.props;
            for (le(h, u.opts.specialEasing); a > s; s++)
                if (e = l.prefilters[s].call(u, n, h, u.opts)) return i.isFunction(e.stop) && (i._queueHooks(u.elem, u.opts.queue).stop = i.proxy(e.stop, e)), e;
            return i.map(h, wu, u), i.isFunction(u.opts.start) && u.opts.start.call(n, u), i.fx.timer(i.extend(c, {
                elem: n,
                anim: u,
                queue: u.opts.queue
            })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
        }

        function k(n) {
            return n.getAttribute && n.getAttribute("class") || ""
        }

        function uf(n) {
            return function(t, r) {
                "string" != typeof t && (r = t, t = "*");
                var u, f = 0,
                    e = t.toLowerCase().match(h) || [];
                if (i.isFunction(r))
                    while (u = e[f++]) "+" === u[0] ? (u = u.slice(1) || "*", (n[u] = n[u] || []).unshift(r)) : (n[u] = n[u] || []).push(r)
            }
        }

        function ff(n, t, r, u) {
            function e(s) {
                var h;
                return f[s] = !0, i.each(n[s] || [], function(n, i) {
                    var s = i(t, r, u);
                    return "string" != typeof s || o || f[s] ? o ? !(h = s) : void 0 : (t.dataTypes.unshift(s), e(s), !1)
                }), h
            }
            var f = {},
                o = n === yi;
            return e(t.dataTypes[0]) || !f["*"] && e("*")
        }

        function wi(n, t) {
            var r, u, f = i.ajaxSettings.flatOptions || {};
            for (r in t) void 0 !== t[r] && ((f[r] ? n : u || (u = {}))[r] = t[r]);
            return u && i.extend(!0, n, u), n
        }

        function we(n, t, i) {
            for (var e, u, f, o, s = n.contents, r = n.dataTypes;
                "*" === r[0];) r.shift(), void 0 === e && (e = n.mimeType || t.getResponseHeader("Content-Type"));
            if (e)
                for (u in s)
                    if (s[u] && s[u].test(e)) {
                        r.unshift(u);
                        break
                    }
            if (r[0] in i) f = r[0];
            else {
                for (u in i) {
                    if (!r[0] || n.converters[u + " " + r[0]]) {
                        f = u;
                        break
                    }
                    o || (o = u)
                }
                f = f || o
            }
            if (f) return (f !== r[0] && r.unshift(f), i[f])
        }

        function be(n, t, i, r) {
            var h, u, f, s, e, o = {},
                c = n.dataTypes.slice();
            if (c[1])
                for (f in n.converters) o[f.toLowerCase()] = n.converters[f];
            for (u = c.shift(); u;)
                if (n.responseFields[u] && (i[n.responseFields[u]] = t), !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)), e = u, u = c.shift())
                    if ("*" === u) u = e;
                    else if ("*" !== e && e !== u) {
                if (f = o[e + " " + u] || o["* " + u], !f)
                    for (h in o)
                        if (s = h.split(" "), s[1] === u && (f = o[e + " " + s[0]] || o["* " + s[0]])) {
                            f === !0 ? f = o[h] : o[h] !== !0 && (u = s[0], c.unshift(s[1]));
                            break
                        }
                if (f !== !0)
                    if (f && n.throws) t = f(t);
                    else try {
                        t = f(t)
                    } catch (l) {
                        return {
                            state: "parsererror",
                            error: f ? l : "No conversion from " + e + " to " + u
                        }
                    }
            }
            return {
                state: "success",
                data: t
            }
        }

        function bi(n, t, r, u) {
            var f;
            if (i.isArray(t)) i.each(t, function(t, i) {
                r || de.test(n) ? u(n, i) : bi(n + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, r, u)
            });
            else if (r || "object" !== i.type(t)) u(n, t);
            else
                for (f in t) bi(n + "[" + f + "]", t[f], r, u)
        }

        function sf(n) {
            return i.isWindow(n) ? n : 9 === n.nodeType && n.defaultView
        }
        var y = [],
            u = n.document,
            v = y.slice,
            gi = y.concat,
            ni = y.push,
            ct = y.indexOf,
            lt = {},
            lf = lt.toString,
            ti = lt.hasOwnProperty,
            f = {},
            nr = "2.2.0",
            i = function(n, t) {
                return new i.fn.init(n, t)
            },
            af = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            vf = /^-ms-/,
            yf = /-([\da-z])/gi,
            pf = function(n, t) {
                return t.toUpperCase()
            },
            p, ur, fr, er, or, sr, h, at, a, g, br, pt, ei, it, bt, vu, yu, bu, rt, ku, du, dt, gu, li, of , ut, ki, gt, di, hf, cf;
        i.fn = i.prototype = {
            jquery: nr,
            constructor: i,
            selector: "",
            length: 0,
            toArray: function() {
                return v.call(this)
            },
            get: function(n) {
                return null != n ? 0 > n ? this[n + this.length] : this[n] : v.call(this)
            },
            pushStack: function(n) {
                var t = i.merge(this.constructor(), n);
                return t.prevObject = this, t.context = this.context, t
            },
            each: function(n) {
                return i.each(this, n)
            },
            map: function(n) {
                return this.pushStack(i.map(this, function(t, i) {
                    return n.call(t, i, t)
                }))
            },
            slice: function() {
                return this.pushStack(v.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(n) {
                var i = this.length,
                    t = +n + (0 > n ? i : 0);
                return this.pushStack(t >= 0 && i > t ? [this[t]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: ni,
            sort: y.sort,
            splice: y.splice
        };
        i.extend = i.fn.extend = function() {
            var e, f, r, t, o, s, n = arguments[0] || {},
                u = 1,
                c = arguments.length,
                h = !1;
            for ("boolean" == typeof n && (h = n, n = arguments[u] || {}, u++), "object" == typeof n || i.isFunction(n) || (n = {}), u === c && (n = this, u--); c > u; u++)
                if (null != (e = arguments[u]))
                    for (f in e) r = n[f], t = e[f], n !== t && (h && t && (i.isPlainObject(t) || (o = i.isArray(t))) ? (o ? (o = !1, s = r && i.isArray(r) ? r : []) : s = r && i.isPlainObject(r) ? r : {}, n[f] = i.extend(h, s, t)) : void 0 !== t && (n[f] = t));
            return n
        };
        i.extend({
            expando: "jQuery" + (nr + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(n) {
                throw new Error(n);
            },
            noop: function() {},
            isFunction: function(n) {
                return "function" === i.type(n)
            },
            isArray: Array.isArray,
            isWindow: function(n) {
                return null != n && n === n.window
            },
            isNumeric: function(n) {
                var t = n && n.toString();
                return !i.isArray(n) && t - parseFloat(t) + 1 >= 0
            },
            isPlainObject: function(n) {
                return "object" !== i.type(n) || n.nodeType || i.isWindow(n) ? !1 : n.constructor && !ti.call(n.constructor.prototype, "isPrototypeOf") ? !1 : !0
            },
            isEmptyObject: function(n) {
                for (var t in n) return !1;
                return !0
            },
            type: function(n) {
                return null == n ? n + "" : "object" == typeof n || "function" == typeof n ? lt[lf.call(n)] || "object" : typeof n
            },
            globalEval: function(n) {
                var t, r = eval;
                n = i.trim(n);
                n && (1 === n.indexOf("use strict") ? (t = u.createElement("script"), t.text = n, u.head.appendChild(t).parentNode.removeChild(t)) : r(n))
            },
            camelCase: function(n) {
                return n.replace(vf, "ms-").replace(yf, pf)
            },
            nodeName: function(n, t) {
                return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(n, t) {
                var r, i = 0;
                if (ii(n)) {
                    for (r = n.length; r > i; i++)
                        if (t.call(n[i], i, n[i]) === !1) break
                } else
                    for (i in n)
                        if (t.call(n[i], i, n[i]) === !1) break;
                return n
            },
            trim: function(n) {
                return null == n ? "" : (n + "").replace(af, "")
            },
            makeArray: function(n, t) {
                var r = t || [];
                return null != n && (ii(Object(n)) ? i.merge(r, "string" == typeof n ? [n] : n) : ni.call(r, n)), r
            },
            inArray: function(n, t, i) {
                return null == t ? -1 : ct.call(t, n, i)
            },
            merge: function(n, t) {
                for (var u = +t.length, i = 0, r = n.length; u > i; i++) n[r++] = t[i];
                return n.length = r, n
            },
            grep: function(n, t, i) {
                for (var u, f = [], r = 0, e = n.length, o = !i; e > r; r++) u = !t(n[r], r), u !== o && f.push(n[r]);
                return f
            },
            map: function(n, t, i) {
                var e, u, r = 0,
                    f = [];
                if (ii(n))
                    for (e = n.length; e > r; r++) u = t(n[r], r, i), null != u && f.push(u);
                else
                    for (r in n) u = t(n[r], r, i), null != u && f.push(u);
                return gi.apply([], f)
            },
            guid: 1,
            proxy: function(n, t) {
                var u, f, r;
                return "string" == typeof t && (u = n[t], t = n, n = u), i.isFunction(n) ? (f = v.call(arguments, 2), r = function() {
                    return n.apply(t || this, f.concat(v.call(arguments)))
                }, r.guid = n.guid = n.guid || i.guid++, r) : void 0
            },
            now: Date.now,
            support: f
        });
        "function" == typeof Symbol && (i.fn[Symbol.iterator] = y[Symbol.iterator]);
        i.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(n, t) {
            lt["[object " + t + "]"] = t.toLowerCase()
        });
        p = function(n) {
            function u(n, t, r, u) {
                var l, w, a, s, nt, d, y, g, p = t && t.ownerDocument,
                    v = t ? t.nodeType : 9;
                if (r = r || [], "string" != typeof n || !n || 1 !== v && 9 !== v && 11 !== v) return r;
                if (!u && ((t ? t.ownerDocument || t : c) !== i && b(t), t = t || i, h)) {
                    if (11 !== v && (d = sr.exec(n)))
                        if (l = d[1]) {
                            if (9 === v) {
                                if (!(a = t.getElementById(l))) return r;
                                if (a.id === l) return r.push(a), r
                            } else if (p && (a = p.getElementById(l)) && et(t, a) && a.id === l) return r.push(a), r
                        } else {
                            if (d[2]) return k.apply(r, t.getElementsByTagName(n)), r;
                            if ((l = d[3]) && f.getElementsByClassName && t.getElementsByClassName) return k.apply(r, t.getElementsByClassName(l)), r
                        }
                    if (f.qsa && !lt[n + " "] && (!o || !o.test(n))) {
                        if (1 !== v) p = t, g = n;
                        else if ("object" !== t.nodeName.toLowerCase()) {
                            for ((s = t.getAttribute("id")) ? s = s.replace(hr, "\\$&") : t.setAttribute("id", s = e), y = ft(n), w = y.length, nt = yi.test(s) ? "#" + s : "[id='" + s + "']"; w--;) y[w] = nt + " " + yt(y[w]);
                            g = y.join(",");
                            p = gt.test(n) && ii(t.parentNode) || t
                        }
                        if (g) try {
                            return k.apply(r, p.querySelectorAll(g)), r
                        } catch (tt) {} finally {
                            s === e && t.removeAttribute("id")
                        }
                    }
                }
                return si(n.replace(at, "$1"), t, r, u)
            }

            function ni() {
                function n(r, u) {
                    return i.push(r + " ") > t.cacheLength && delete n[i.shift()], n[r + " "] = u
                }
                var i = [];
                return n
            }

            function l(n) {
                return n[e] = !0, n
            }

            function a(n) {
                var t = i.createElement("div");
                try {
                    return !!n(t)
                } catch (r) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t);
                    t = null
                }
            }

            function ti(n, i) {
                for (var r = n.split("|"), u = r.length; u--;) t.attrHandle[r[u]] = i
            }

            function wi(n, t) {
                var i = t && n,
                    r = i && 1 === n.nodeType && 1 === t.nodeType && (~t.sourceIndex || li) - (~n.sourceIndex || li);
                if (r) return r;
                if (i)
                    while (i = i.nextSibling)
                        if (i === t) return -1;
                return n ? 1 : -1
            }

            function cr(n) {
                return function(t) {
                    var i = t.nodeName.toLowerCase();
                    return "input" === i && t.type === n
                }
            }

            function lr(n) {
                return function(t) {
                    var i = t.nodeName.toLowerCase();
                    return ("input" === i || "button" === i) && t.type === n
                }
            }

            function it(n) {
                return l(function(t) {
                    return t = +t, l(function(i, r) {
                        for (var u, f = n([], i.length, t), e = f.length; e--;) i[u = f[e]] && (i[u] = !(r[u] = i[u]))
                    })
                })
            }

            function ii(n) {
                return n && "undefined" != typeof n.getElementsByTagName && n
            }

            function bi() {}

            function yt(n) {
                for (var t = 0, r = n.length, i = ""; r > t; t++) i += n[t].value;
                return i
            }

            function ri(n, t, i) {
                var r = t.dir,
                    u = i && "parentNode" === r,
                    f = ki++;
                return t.first ? function(t, i, f) {
                    while (t = t[r])
                        if (1 === t.nodeType || u) return n(t, i, f)
                } : function(t, i, o) {
                    var s, h, c, l = [v, f];
                    if (o) {
                        while (t = t[r])
                            if ((1 === t.nodeType || u) && n(t, i, o)) return !0
                    } else
                        while (t = t[r])
                            if (1 === t.nodeType || u) {
                                if (c = t[e] || (t[e] = {}), h = c[t.uniqueID] || (c[t.uniqueID] = {}), (s = h[r]) && s[0] === v && s[1] === f) return l[2] = s[2];
                                if (h[r] = l, l[2] = n(t, i, o)) return !0
                            }
                }
            }

            function ui(n) {
                return n.length > 1 ? function(t, i, r) {
                    for (var u = n.length; u--;)
                        if (!n[u](t, i, r)) return !1;
                    return !0
                } : n[0]
            }

            function ar(n, t, i) {
                for (var r = 0, f = t.length; f > r; r++) u(n, t[r], i);
                return i
            }

            function pt(n, t, i, r, u) {
                for (var e, o = [], f = 0, s = n.length, h = null != t; s > f; f++)(e = n[f]) && (!i || i(e, r, u)) && (o.push(e), h && t.push(f));
                return o
            }

            function fi(n, t, i, r, u, f) {
                return r && !r[e] && (r = fi(r)), u && !u[e] && (u = fi(u, f)), l(function(f, e, o, s) {
                    var l, c, a, p = [],
                        y = [],
                        w = e.length,
                        b = f || ar(t || "*", o.nodeType ? [o] : o, []),
                        v = !n || !f && t ? b : pt(b, p, n, o, s),
                        h = i ? u || (f ? n : w || r) ? [] : e : v;
                    if (i && i(v, h, o, s), r)
                        for (l = pt(h, y), r(l, [], o, s), c = l.length; c--;)(a = l[c]) && (h[y[c]] = !(v[y[c]] = a));
                    if (f) {
                        if (u || n) {
                            if (u) {
                                for (l = [], c = h.length; c--;)(a = h[c]) && l.push(v[c] = a);
                                u(null, h = [], l, s)
                            }
                            for (c = h.length; c--;)(a = h[c]) && (l = u ? nt(f, a) : p[c]) > -1 && (f[l] = !(e[l] = a))
                        }
                    } else h = pt(h === e ? h.splice(w, h.length) : h), u ? u(null, e, h, s) : k.apply(e, h)
                })
            }

            function ei(n) {
                for (var o, u, r, s = n.length, h = t.relative[n[0].type], c = h || t.relative[" "], i = h ? 1 : 0, l = ri(function(n) {
                        return n === o
                    }, c, !0), a = ri(function(n) {
                        return nt(o, n) > -1
                    }, c, !0), f = [function(n, t, i) {
                        var r = !h && (i || t !== ht) || ((o = t).nodeType ? l(n, t, i) : a(n, t, i));
                        return o = null, r
                    }]; s > i; i++)
                    if (u = t.relative[n[i].type]) f = [ri(ui(f), u)];
                    else {
                        if (u = t.filter[n[i].type].apply(null, n[i].matches), u[e]) {
                            for (r = ++i; s > r; r++)
                                if (t.relative[n[r].type]) break;
                            return fi(i > 1 && ui(f), i > 1 && yt(n.slice(0, i - 1).concat({
                                value: " " === n[i - 2].type ? "*" : ""
                            })).replace(at, "$1"), u, r > i && ei(n.slice(i, r)), s > r && ei(n = n.slice(r)), s > r && yt(n))
                        }
                        f.push(u)
                    }
                return ui(f)
            }

            function vr(n, r) {
                var f = r.length > 0,
                    e = n.length > 0,
                    o = function(o, s, c, l, a) {
                        var y, nt, d, g = 0,
                            p = "0",
                            tt = o && [],
                            w = [],
                            it = ht,
                            rt = o || e && t.find.TAG("*", a),
                            ut = v += null == it ? 1 : Math.random() || .1,
                            ft = rt.length;
                        for (a && (ht = s === i || s || a); p !== ft && null != (y = rt[p]); p++) {
                            if (e && y) {
                                for (nt = 0, s || y.ownerDocument === i || (b(y), c = !h); d = n[nt++];)
                                    if (d(y, s || i, c)) {
                                        l.push(y);
                                        break
                                    }
                                a && (v = ut)
                            }
                            f && ((y = !d && y) && g--, o && tt.push(y))
                        }
                        if (g += p, f && p !== g) {
                            for (nt = 0; d = r[nt++];) d(tt, w, s, c);
                            if (o) {
                                if (g > 0)
                                    while (p--) tt[p] || w[p] || (w[p] = gi.call(l));
                                w = pt(w)
                            }
                            k.apply(l, w);
                            a && !o && w.length > 0 && g + r.length > 1 && u.uniqueSort(l)
                        }
                        return a && (v = ut, ht = it), tt
                    };
                return f ? l(o) : o
            }
            var rt, f, t, st, oi, ft, wt, si, ht, w, ut, b, i, s, h, o, d, ct, et, e = "sizzle" + 1 * new Date,
                c = n.document,
                v = 0,
                ki = 0,
                hi = ni(),
                ci = ni(),
                lt = ni(),
                bt = function(n, t) {
                    return n === t && (ut = !0), 0
                },
                li = -2147483648,
                di = {}.hasOwnProperty,
                g = [],
                gi = g.pop,
                nr = g.push,
                k = g.push,
                ai = g.slice,
                nt = function(n, t) {
                    for (var i = 0, r = n.length; r > i; i++)
                        if (n[i] === t) return i;
                    return -1
                },
                kt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                r = "[\\x20\\t\\r\\n\\f]",
                tt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                vi = "\\[" + r + "*(" + tt + ")(?:" + r + "*([*^$|!~]?=)" + r + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + tt + "))|)" + r + "*\\]",
                dt = ":(" + tt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + vi + ")*)|.*)\\)|)",
                tr = new RegExp(r + "+", "g"),
                at = new RegExp("^" + r + "+|((?:^|[^\\\\])(?:\\\\.)*)" + r + "+$", "g"),
                ir = new RegExp("^" + r + "*," + r + "*"),
                rr = new RegExp("^" + r + "*([>+~]|" + r + ")" + r + "*"),
                ur = new RegExp("=" + r + "*([^\\]'\"]*?)" + r + "*\\]", "g"),
                fr = new RegExp(dt),
                yi = new RegExp("^" + tt + "$"),
                vt = {
                    ID: new RegExp("^#(" + tt + ")"),
                    CLASS: new RegExp("^\\.(" + tt + ")"),
                    TAG: new RegExp("^(" + tt + "|[*])"),
                    ATTR: new RegExp("^" + vi),
                    PSEUDO: new RegExp("^" + dt),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + r + "*(even|odd|(([+-]|)(\\d*)n|)" + r + "*(?:([+-]|)" + r + "*(\\d+)|))" + r + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + kt + ")$", "i"),
                    needsContext: new RegExp("^" + r + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + r + "*((?:-\\d)?\\d*)" + r + "*\\)|)(?=[^-]|$)", "i")
                },
                er = /^(?:input|select|textarea|button)$/i,
                or = /^h\d$/i,
                ot = /^[^{]+\{\s*\[native \w/,
                sr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                gt = /[+~]/,
                hr = /'|\\/g,
                y = new RegExp("\\\\([\\da-f]{1,6}" + r + "?|(" + r + ")|.)", "ig"),
                p = function(n, t, i) {
                    var r = "0x" + t - 65536;
                    return r !== r || i ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                },
                pi = function() {
                    b()
                };
            try {
                k.apply(g = ai.call(c.childNodes), c.childNodes);
                g[c.childNodes.length].nodeType
            } catch (yr) {
                k = {
                    apply: g.length ? function(n, t) {
                        nr.apply(n, ai.call(t))
                    } : function(n, t) {
                        for (var i = n.length, r = 0; n[i++] = t[r++];);
                        n.length = i - 1
                    }
                }
            }
            f = u.support = {};
            oi = u.isXML = function(n) {
                var t = n && (n.ownerDocument || n).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            };
            b = u.setDocument = function(n) {
                var v, u, l = n ? n.ownerDocument || n : c;
                return l !== i && 9 === l.nodeType && l.documentElement ? (i = l, s = i.documentElement, h = !oi(i), (u = i.defaultView) && u.top !== u && (u.addEventListener ? u.addEventListener("unload", pi, !1) : u.attachEvent && u.attachEvent("onunload", pi)), f.attributes = a(function(n) {
                    return n.className = "i", !n.getAttribute("className")
                }), f.getElementsByTagName = a(function(n) {
                    return n.appendChild(i.createComment("")), !n.getElementsByTagName("*").length
                }), f.getElementsByClassName = ot.test(i.getElementsByClassName), f.getById = a(function(n) {
                    return s.appendChild(n).id = e, !i.getElementsByName || !i.getElementsByName(e).length
                }), f.getById ? (t.find.ID = function(n, t) {
                    if ("undefined" != typeof t.getElementById && h) {
                        var i = t.getElementById(n);
                        return i ? [i] : []
                    }
                }, t.filter.ID = function(n) {
                    var t = n.replace(y, p);
                    return function(n) {
                        return n.getAttribute("id") === t
                    }
                }) : (delete t.find.ID, t.filter.ID = function(n) {
                    var t = n.replace(y, p);
                    return function(n) {
                        var i = "undefined" != typeof n.getAttributeNode && n.getAttributeNode("id");
                        return i && i.value === t
                    }
                }), t.find.TAG = f.getElementsByTagName ? function(n, t) {
                    return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(n) : f.qsa ? t.querySelectorAll(n) : void 0
                } : function(n, t) {
                    var i, r = [],
                        f = 0,
                        u = t.getElementsByTagName(n);
                    if ("*" === n) {
                        while (i = u[f++]) 1 === i.nodeType && r.push(i);
                        return r
                    }
                    return u
                }, t.find.CLASS = f.getElementsByClassName && function(n, t) {
                    if ("undefined" != typeof t.getElementsByClassName && h) return t.getElementsByClassName(n)
                }, d = [], o = [], (f.qsa = ot.test(i.querySelectorAll)) && (a(function(n) {
                    s.appendChild(n).innerHTML = "<a id='" + e + "'><\/a><select id='" + e + "-\r\\' msallowcapture=''><option selected=''><\/option><\/select>";
                    n.querySelectorAll("[msallowcapture^='']").length && o.push("[*^$]=" + r + "*(?:''|\"\")");
                    n.querySelectorAll("[selected]").length || o.push("\\[" + r + "*(?:value|" + kt + ")");
                    n.querySelectorAll("[id~=" + e + "-]").length || o.push("~=");
                    n.querySelectorAll(":checked").length || o.push(":checked");
                    n.querySelectorAll("a#" + e + "+*").length || o.push(".#.+[+~]")
                }), a(function(n) {
                    var t = i.createElement("input");
                    t.setAttribute("type", "hidden");
                    n.appendChild(t).setAttribute("name", "D");
                    n.querySelectorAll("[name=d]").length && o.push("name" + r + "*[*^$|!~]?=");
                    n.querySelectorAll(":enabled").length || o.push(":enabled", ":disabled");
                    n.querySelectorAll("*,:x");
                    o.push(",.*:")
                })), (f.matchesSelector = ot.test(ct = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector)) && a(function(n) {
                    f.disconnectedMatch = ct.call(n, "div");
                    ct.call(n, "[s!='']:x");
                    d.push("!=", dt)
                }), o = o.length && new RegExp(o.join("|")), d = d.length && new RegExp(d.join("|")), v = ot.test(s.compareDocumentPosition), et = v || ot.test(s.contains) ? function(n, t) {
                    var r = 9 === n.nodeType ? n.documentElement : n,
                        i = t && t.parentNode;
                    return n === i || !(!i || 1 !== i.nodeType || !(r.contains ? r.contains(i) : n.compareDocumentPosition && 16 & n.compareDocumentPosition(i)))
                } : function(n, t) {
                    if (t)
                        while (t = t.parentNode)
                            if (t === n) return !0;
                    return !1
                }, bt = v ? function(n, t) {
                    if (n === t) return ut = !0, 0;
                    var r = !n.compareDocumentPosition - !t.compareDocumentPosition;
                    return r ? r : (r = (n.ownerDocument || n) === (t.ownerDocument || t) ? n.compareDocumentPosition(t) : 1, 1 & r || !f.sortDetached && t.compareDocumentPosition(n) === r ? n === i || n.ownerDocument === c && et(c, n) ? -1 : t === i || t.ownerDocument === c && et(c, t) ? 1 : w ? nt(w, n) - nt(w, t) : 0 : 4 & r ? -1 : 1)
                } : function(n, t) {
                    if (n === t) return ut = !0, 0;
                    var r, u = 0,
                        o = n.parentNode,
                        s = t.parentNode,
                        f = [n],
                        e = [t];
                    if (!o || !s) return n === i ? -1 : t === i ? 1 : o ? -1 : s ? 1 : w ? nt(w, n) - nt(w, t) : 0;
                    if (o === s) return wi(n, t);
                    for (r = n; r = r.parentNode;) f.unshift(r);
                    for (r = t; r = r.parentNode;) e.unshift(r);
                    while (f[u] === e[u]) u++;
                    return u ? wi(f[u], e[u]) : f[u] === c ? -1 : e[u] === c ? 1 : 0
                }, i) : i
            };
            u.matches = function(n, t) {
                return u(n, null, null, t)
            };
            u.matchesSelector = function(n, t) {
                if ((n.ownerDocument || n) !== i && b(n), t = t.replace(ur, "='$1']"), f.matchesSelector && h && !lt[t + " "] && (!d || !d.test(t)) && (!o || !o.test(t))) try {
                    var r = ct.call(n, t);
                    if (r || f.disconnectedMatch || n.document && 11 !== n.document.nodeType) return r
                } catch (e) {}
                return u(t, i, null, [n]).length > 0
            };
            u.contains = function(n, t) {
                return (n.ownerDocument || n) !== i && b(n), et(n, t)
            };
            u.attr = function(n, r) {
                (n.ownerDocument || n) !== i && b(n);
                var e = t.attrHandle[r.toLowerCase()],
                    u = e && di.call(t.attrHandle, r.toLowerCase()) ? e(n, r, !h) : void 0;
                return void 0 !== u ? u : f.attributes || !h ? n.getAttribute(r) : (u = n.getAttributeNode(r)) && u.specified ? u.value : null
            };
            u.error = function(n) {
                throw new Error("Syntax error, unrecognized expression: " + n);
            };
            u.uniqueSort = function(n) {
                var r, u = [],
                    t = 0,
                    i = 0;
                if (ut = !f.detectDuplicates, w = !f.sortStable && n.slice(0), n.sort(bt), ut) {
                    while (r = n[i++]) r === n[i] && (t = u.push(i));
                    while (t--) n.splice(u[t], 1)
                }
                return w = null, n
            };
            st = u.getText = function(n) {
                var r, i = "",
                    u = 0,
                    t = n.nodeType;
                if (t) {
                    if (1 === t || 9 === t || 11 === t) {
                        if ("string" == typeof n.textContent) return n.textContent;
                        for (n = n.firstChild; n; n = n.nextSibling) i += st(n)
                    } else if (3 === t || 4 === t) return n.nodeValue
                } else
                    while (r = n[u++]) i += st(r);
                return i
            };
            t = u.selectors = {
                cacheLength: 50,
                createPseudo: l,
                match: vt,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(n) {
                        return n[1] = n[1].replace(y, p), n[3] = (n[3] || n[4] || n[5] || "").replace(y, p), "~=" === n[2] && (n[3] = " " + n[3] + " "), n.slice(0, 4)
                    },
                    CHILD: function(n) {
                        return n[1] = n[1].toLowerCase(), "nth" === n[1].slice(0, 3) ? (n[3] || u.error(n[0]), n[4] = +(n[4] ? n[5] + (n[6] || 1) : 2 * ("even" === n[3] || "odd" === n[3])), n[5] = +(n[7] + n[8] || "odd" === n[3])) : n[3] && u.error(n[0]), n
                    },
                    PSEUDO: function(n) {
                        var i, t = !n[6] && n[2];
                        return vt.CHILD.test(n[0]) ? null : (n[3] ? n[2] = n[4] || n[5] || "" : t && fr.test(t) && (i = ft(t, !0)) && (i = t.indexOf(")", t.length - i) - t.length) && (n[0] = n[0].slice(0, i), n[2] = t.slice(0, i)), n.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(n) {
                        var t = n.replace(y, p).toLowerCase();
                        return "*" === n ? function() {
                            return !0
                        } : function(n) {
                            return n.nodeName && n.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(n) {
                        var t = hi[n + " "];
                        return t || (t = new RegExp("(^|" + r + ")" + n + "(" + r + "|$)")) && hi(n, function(n) {
                            return t.test("string" == typeof n.className && n.className || "undefined" != typeof n.getAttribute && n.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(n, t, i) {
                        return function(r) {
                            var f = u.attr(r, n);
                            return null == f ? "!=" === t : t ? (f += "", "=" === t ? f === i : "!=" === t ? f !== i : "^=" === t ? i && 0 === f.indexOf(i) : "*=" === t ? i && f.indexOf(i) > -1 : "$=" === t ? i && f.slice(-i.length) === i : "~=" === t ? (" " + f.replace(tr, " ") + " ").indexOf(i) > -1 : "|=" === t ? f === i || f.slice(0, i.length + 1) === i + "-" : !1) : !0
                        }
                    },
                    CHILD: function(n, t, i, r, u) {
                        var s = "nth" !== n.slice(0, 3),
                            o = "last" !== n.slice(-4),
                            f = "of-type" === t;
                        return 1 === r && 0 === u ? function(n) {
                            return !!n.parentNode
                        } : function(t, i, h) {
                            var p, w, y, c, a, b, k = s !== o ? "nextSibling" : "previousSibling",
                                d = t.parentNode,
                                nt = f && t.nodeName.toLowerCase(),
                                g = !h && !f,
                                l = !1;
                            if (d) {
                                if (s) {
                                    while (k) {
                                        for (c = t; c = c[k];)
                                            if (f ? c.nodeName.toLowerCase() === nt : 1 === c.nodeType) return !1;
                                        b = k = "only" === n && !b && "nextSibling"
                                    }
                                    return !0
                                }
                                if (b = [o ? d.firstChild : d.lastChild], o && g) {
                                    for (c = d, y = c[e] || (c[e] = {}), w = y[c.uniqueID] || (y[c.uniqueID] = {}), p = w[n] || [], a = p[0] === v && p[1], l = a && p[2], c = a && d.childNodes[a]; c = ++a && c && c[k] || (l = a = 0) || b.pop();)
                                        if (1 === c.nodeType && ++l && c === t) {
                                            w[n] = [v, a, l];
                                            break
                                        }
                                } else if (g && (c = t, y = c[e] || (c[e] = {}), w = y[c.uniqueID] || (y[c.uniqueID] = {}), p = w[n] || [], a = p[0] === v && p[1], l = a), l === !1)
                                    while (c = ++a && c && c[k] || (l = a = 0) || b.pop())
                                        if ((f ? c.nodeName.toLowerCase() === nt : 1 === c.nodeType) && ++l && (g && (y = c[e] || (c[e] = {}), w = y[c.uniqueID] || (y[c.uniqueID] = {}), w[n] = [v, l]), c === t)) break;
                                return l -= u, l === r || l % r == 0 && l / r >= 0
                            }
                        }
                    },
                    PSEUDO: function(n, i) {
                        var f, r = t.pseudos[n] || t.setFilters[n.toLowerCase()] || u.error("unsupported pseudo: " + n);
                        return r[e] ? r(i) : r.length > 1 ? (f = [n, n, "", i], t.setFilters.hasOwnProperty(n.toLowerCase()) ? l(function(n, t) {
                            for (var u, f = r(n, i), e = f.length; e--;) u = nt(n, f[e]), n[u] = !(t[u] = f[e])
                        }) : function(n) {
                            return r(n, 0, f)
                        }) : r
                    }
                },
                pseudos: {
                    not: l(function(n) {
                        var t = [],
                            r = [],
                            i = wt(n.replace(at, "$1"));
                        return i[e] ? l(function(n, t, r, u) {
                            for (var e, o = i(n, null, u, []), f = n.length; f--;)(e = o[f]) && (n[f] = !(t[f] = e))
                        }) : function(n, u, f) {
                            return t[0] = n, i(t, null, f, r), t[0] = null, !r.pop()
                        }
                    }),
                    has: l(function(n) {
                        return function(t) {
                            return u(n, t).length > 0
                        }
                    }),
                    contains: l(function(n) {
                        return n = n.replace(y, p),
                            function(t) {
                                return (t.textContent || t.innerText || st(t)).indexOf(n) > -1
                            }
                    }),
                    lang: l(function(n) {
                        return yi.test(n || "") || u.error("unsupported lang: " + n), n = n.replace(y, p).toLowerCase(),
                            function(t) {
                                var i;
                                do
                                    if (i = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return i = i.toLowerCase(), i === n || 0 === i.indexOf(n + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var i = n.location && n.location.hash;
                        return i && i.slice(1) === t.id
                    },
                    root: function(n) {
                        return n === s
                    },
                    focus: function(n) {
                        return n === i.activeElement && (!i.hasFocus || i.hasFocus()) && !!(n.type || n.href || ~n.tabIndex)
                    },
                    enabled: function(n) {
                        return n.disabled === !1
                    },
                    disabled: function(n) {
                        return n.disabled === !0
                    },
                    checked: function(n) {
                        var t = n.nodeName.toLowerCase();
                        return "input" === t && !!n.checked || "option" === t && !!n.selected
                    },
                    selected: function(n) {
                        return n.parentNode && n.parentNode.selectedIndex, n.selected === !0
                    },
                    empty: function(n) {
                        for (n = n.firstChild; n; n = n.nextSibling)
                            if (n.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(n) {
                        return !t.pseudos.empty(n)
                    },
                    header: function(n) {
                        return or.test(n.nodeName)
                    },
                    input: function(n) {
                        return er.test(n.nodeName)
                    },
                    button: function(n) {
                        var t = n.nodeName.toLowerCase();
                        return "input" === t && "button" === n.type || "button" === t
                    },
                    text: function(n) {
                        var t;
                        return "input" === n.nodeName.toLowerCase() && "text" === n.type && (null == (t = n.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: it(function() {
                        return [0]
                    }),
                    last: it(function(n, t) {
                        return [t - 1]
                    }),
                    eq: it(function(n, t, i) {
                        return [0 > i ? i + t : i]
                    }),
                    even: it(function(n, t) {
                        for (var i = 0; t > i; i += 2) n.push(i);
                        return n
                    }),
                    odd: it(function(n, t) {
                        for (var i = 1; t > i; i += 2) n.push(i);
                        return n
                    }),
                    lt: it(function(n, t, i) {
                        for (var r = 0 > i ? i + t : i; --r >= 0;) n.push(r);
                        return n
                    }),
                    gt: it(function(n, t, i) {
                        for (var r = 0 > i ? i + t : i; ++r < t;) n.push(r);
                        return n
                    })
                }
            };
            t.pseudos.nth = t.pseudos.eq;
            for (rt in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) t.pseudos[rt] = cr(rt);
            for (rt in {
                    submit: !0,
                    reset: !0
                }) t.pseudos[rt] = lr(rt);
            return bi.prototype = t.filters = t.pseudos, t.setFilters = new bi, ft = u.tokenize = function(n, i) {
                var e, f, s, o, r, h, c, l = ci[n + " "];
                if (l) return i ? 0 : l.slice(0);
                for (r = n, h = [], c = t.preFilter; r;) {
                    (!e || (f = ir.exec(r))) && (f && (r = r.slice(f[0].length) || r), h.push(s = []));
                    e = !1;
                    (f = rr.exec(r)) && (e = f.shift(), s.push({
                        value: e,
                        type: f[0].replace(at, " ")
                    }), r = r.slice(e.length));
                    for (o in t.filter)(f = vt[o].exec(r)) && (!c[o] || (f = c[o](f))) && (e = f.shift(), s.push({
                        value: e,
                        type: o,
                        matches: f
                    }), r = r.slice(e.length));
                    if (!e) break
                }
                return i ? r.length : r ? u.error(n) : ci(n, h).slice(0)
            }, wt = u.compile = function(n, t) {
                var r, u = [],
                    f = [],
                    i = lt[n + " "];
                if (!i) {
                    for (t || (t = ft(n)), r = t.length; r--;) i = ei(t[r]), i[e] ? u.push(i) : f.push(i);
                    i = lt(n, vr(f, u));
                    i.selector = n
                }
                return i
            }, si = u.select = function(n, i, r, u) {
                var s, e, o, a, v, l = "function" == typeof n && n,
                    c = !u && ft(n = l.selector || n);
                if (r = r || [], 1 === c.length) {
                    if (e = c[0] = c[0].slice(0), e.length > 2 && "ID" === (o = e[0]).type && f.getById && 9 === i.nodeType && h && t.relative[e[1].type]) {
                        if (i = (t.find.ID(o.matches[0].replace(y, p), i) || [])[0], !i) return r;
                        l && (i = i.parentNode);
                        n = n.slice(e.shift().value.length)
                    }
                    for (s = vt.needsContext.test(n) ? 0 : e.length; s--;) {
                        if (o = e[s], t.relative[a = o.type]) break;
                        if ((v = t.find[a]) && (u = v(o.matches[0].replace(y, p), gt.test(e[0].type) && ii(i.parentNode) || i))) {
                            if (e.splice(s, 1), n = u.length && yt(e), !n) return k.apply(r, u), r;
                            break
                        }
                    }
                }
                return (l || wt(n, c))(u, i, !h, r, !i || gt.test(n) && ii(i.parentNode) || i), r
            }, f.sortStable = e.split("").sort(bt).join("") === e, f.detectDuplicates = !!ut, b(), f.sortDetached = a(function(n) {
                return 1 & n.compareDocumentPosition(i.createElement("div"))
            }), a(function(n) {
                return n.innerHTML = "<a href='#'><\/a>", "#" === n.firstChild.getAttribute("href")
            }) || ti("type|href|height|width", function(n, t, i) {
                if (!i) return n.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), f.attributes && a(function(n) {
                return n.innerHTML = "<input/>", n.firstChild.setAttribute("value", ""), "" === n.firstChild.getAttribute("value")
            }) || ti("value", function(n, t, i) {
                if (!i && "input" === n.nodeName.toLowerCase()) return n.defaultValue
            }), a(function(n) {
                return null == n.getAttribute("disabled")
            }) || ti(kt, function(n, t, i) {
                var r;
                if (!i) return n[t] === !0 ? t.toLowerCase() : (r = n.getAttributeNode(t)) && r.specified ? r.value : null
            }), u
        }(n);
        i.find = p;
        i.expr = p.selectors;
        i.expr[":"] = i.expr.pseudos;
        i.uniqueSort = i.unique = p.uniqueSort;
        i.text = p.getText;
        i.isXMLDoc = p.isXML;
        i.contains = p.contains;
        var d = function(n, t, r) {
                for (var u = [], f = void 0 !== r;
                    (n = n[t]) && 9 !== n.nodeType;)
                    if (1 === n.nodeType) {
                        if (f && i(n).is(r)) break;
                        u.push(n)
                    }
                return u
            },
            tr = function(n, t) {
                for (var i = []; n; n = n.nextSibling) 1 === n.nodeType && n !== t && i.push(n);
                return i
            },
            ir = i.expr.match.needsContext,
            rr = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
            wf = /^.[^:#\[\.,]*$/;
        i.filter = function(n, t, r) {
            var u = t[0];
            return r && (n = ":not(" + n + ")"), 1 === t.length && 1 === u.nodeType ? i.find.matchesSelector(u, n) ? [u] : [] : i.find.matches(n, i.grep(t, function(n) {
                return 1 === n.nodeType
            }))
        };
        i.fn.extend({
            find: function(n) {
                var t, u = this.length,
                    r = [],
                    f = this;
                if ("string" != typeof n) return this.pushStack(i(n).filter(function() {
                    for (t = 0; u > t; t++)
                        if (i.contains(f[t], this)) return !0
                }));
                for (t = 0; u > t; t++) i.find(n, f[t], r);
                return r = this.pushStack(u > 1 ? i.unique(r) : r), r.selector = this.selector ? this.selector + " " + n : n, r
            },
            filter: function(n) {
                return this.pushStack(ri(this, n || [], !1))
            },
            not: function(n) {
                return this.pushStack(ri(this, n || [], !0))
            },
            is: function(n) {
                return !!ri(this, "string" == typeof n && ir.test(n) ? i(n) : n || [], !1).length
            }
        });
        fr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
        er = i.fn.init = function(n, t, r) {
            var f, e;
            if (!n) return this;
            if (r = r || ur, "string" == typeof n) {
                if (f = "<" === n[0] && ">" === n[n.length - 1] && n.length >= 3 ? [null, n, null] : fr.exec(n), !f || !f[1] && t) return !t || t.jquery ? (t || r).find(n) : this.constructor(t).find(n);
                if (f[1]) {
                    if (t = t instanceof i ? t[0] : t, i.merge(this, i.parseHTML(f[1], t && t.nodeType ? t.ownerDocument || t : u, !0)), rr.test(f[1]) && i.isPlainObject(t))
                        for (f in t) i.isFunction(this[f]) ? this[f](t[f]) : this.attr(f, t[f]);
                    return this
                }
                return e = u.getElementById(f[2]), e && e.parentNode && (this.length = 1, this[0] = e), this.context = u, this.selector = n, this
            }
            return n.nodeType ? (this.context = this[0] = n, this.length = 1, this) : i.isFunction(n) ? void 0 !== r.ready ? r.ready(n) : n(i) : (void 0 !== n.selector && (this.selector = n.selector, this.context = n.context), i.makeArray(n, this))
        };
        er.prototype = i.fn;
        ur = i(u);
        or = /^(?:parents|prev(?:Until|All))/;
        sr = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
        i.fn.extend({
            has: function(n) {
                var t = i(n, this),
                    r = t.length;
                return this.filter(function() {
                    for (var n = 0; r > n; n++)
                        if (i.contains(this, t[n])) return !0
                })
            },
            closest: function(n, t) {
                for (var r, f = 0, o = this.length, u = [], e = ir.test(n) || "string" != typeof n ? i(n, t || this.context) : 0; o > f; f++)
                    for (r = this[f]; r && r !== t; r = r.parentNode)
                        if (r.nodeType < 11 && (e ? e.index(r) > -1 : 1 === r.nodeType && i.find.matchesSelector(r, n))) {
                            u.push(r);
                            break
                        }
                return this.pushStack(u.length > 1 ? i.uniqueSort(u) : u)
            },
            index: function(n) {
                return n ? "string" == typeof n ? ct.call(i(n), this[0]) : ct.call(this, n.jquery ? n[0] : n) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(n, t) {
                return this.pushStack(i.uniqueSort(i.merge(this.get(), i(n, t))))
            },
            addBack: function(n) {
                return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
            }
        });
        i.each({
            parent: function(n) {
                var t = n.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(n) {
                return d(n, "parentNode")
            },
            parentsUntil: function(n, t, i) {
                return d(n, "parentNode", i)
            },
            next: function(n) {
                return hr(n, "nextSibling")
            },
            prev: function(n) {
                return hr(n, "previousSibling")
            },
            nextAll: function(n) {
                return d(n, "nextSibling")
            },
            prevAll: function(n) {
                return d(n, "previousSibling")
            },
            nextUntil: function(n, t, i) {
                return d(n, "nextSibling", i)
            },
            prevUntil: function(n, t, i) {
                return d(n, "previousSibling", i)
            },
            siblings: function(n) {
                return tr((n.parentNode || {}).firstChild, n)
            },
            children: function(n) {
                return tr(n.firstChild)
            },
            contents: function(n) {
                return n.contentDocument || i.merge([], n.childNodes)
            }
        }, function(n, t) {
            i.fn[n] = function(r, u) {
                var f = i.map(this, t, r);
                return "Until" !== n.slice(-5) && (u = r), u && "string" == typeof u && (f = i.filter(u, f)), this.length > 1 && (sr[n] || i.uniqueSort(f), or.test(n) && f.reverse()), this.pushStack(f)
            }
        });
        h = /\S+/g;
        i.Callbacks = function(n) {
            n = "string" == typeof n ? bf(n) : i.extend({}, n);
            var o, r, h, f, t = [],
                e = [],
                u = -1,
                c = function() {
                    for (f = n.once, h = o = !0; e.length; u = -1)
                        for (r = e.shift(); ++u < t.length;) t[u].apply(r[0], r[1]) === !1 && n.stopOnFalse && (u = t.length, r = !1);
                    n.memory || (r = !1);
                    o = !1;
                    f && (t = r ? [] : "")
                },
                s = {
                    add: function() {
                        return t && (r && !o && (u = t.length - 1, e.push(r)), function f(r) {
                            i.each(r, function(r, u) {
                                i.isFunction(u) ? n.unique && s.has(u) || t.push(u) : u && u.length && "string" !== i.type(u) && f(u)
                            })
                        }(arguments), r && !o && c()), this
                    },
                    remove: function() {
                        return i.each(arguments, function(n, r) {
                            for (var f;
                                (f = i.inArray(r, t, f)) > -1;) t.splice(f, 1), u >= f && u--
                        }), this
                    },
                    has: function(n) {
                        return n ? i.inArray(n, t) > -1 : t.length > 0
                    },
                    empty: function() {
                        return t && (t = []), this
                    },
                    disable: function() {
                        return f = e = [], t = r = "", this
                    },
                    disabled: function() {
                        return !t
                    },
                    lock: function() {
                        return f = e = [], r || (t = r = ""), this
                    },
                    locked: function() {
                        return !!f
                    },
                    fireWith: function(n, t) {
                        return f || (t = t || [], t = [n, t.slice ? t.slice() : t], e.push(t), o || c()), this
                    },
                    fire: function() {
                        return s.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!h
                    }
                };
            return s
        };
        i.extend({
            Deferred: function(n) {
                var u = [
                        ["resolve", "done", i.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", i.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", i.Callbacks("memory")]
                    ],
                    f = "pending",
                    r = {
                        state: function() {
                            return f
                        },
                        always: function() {
                            return t.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var n = arguments;
                            return i.Deferred(function(f) {
                                i.each(u, function(u, e) {
                                    var o = i.isFunction(n[u]) && n[u];
                                    t[e[1]](function() {
                                        var n = o && o.apply(this, arguments);
                                        n && i.isFunction(n.promise) ? n.promise().progress(f.notify).done(f.resolve).fail(f.reject) : f[e[0] + "With"](this === r ? f.promise() : this, o ? [n] : arguments)
                                    })
                                });
                                n = null
                            }).promise()
                        },
                        promise: function(n) {
                            return null != n ? i.extend(n, r) : r
                        }
                    },
                    t = {};
                return r.pipe = r.then, i.each(u, function(n, i) {
                    var e = i[2],
                        o = i[3];
                    r[i[1]] = e.add;
                    o && e.add(function() {
                        f = o
                    }, u[1 ^ n][2].disable, u[2][2].lock);
                    t[i[0]] = function() {
                        return t[i[0] + "With"](this === t ? r : this, arguments), this
                    };
                    t[i[0] + "With"] = e.fireWith
                }), r.promise(t), n && n.call(t, t), t
            },
            when: function(n) {
                var t = 0,
                    u = v.call(arguments),
                    r = u.length,
                    e = 1 !== r || n && i.isFunction(n.promise) ? r : 0,
                    f = 1 === e ? n : i.Deferred(),
                    h = function(n, t, i) {
                        return function(r) {
                            t[n] = this;
                            i[n] = arguments.length > 1 ? v.call(arguments) : r;
                            i === o ? f.notifyWith(t, i) : --e || f.resolveWith(t, i)
                        }
                    },
                    o, c, s;
                if (r > 1)
                    for (o = new Array(r), c = new Array(r), s = new Array(r); r > t; t++) u[t] && i.isFunction(u[t].promise) ? u[t].promise().progress(h(t, c, o)).done(h(t, s, u)).fail(f.reject) : --e;
                return e || f.resolveWith(s, u), f.promise()
            }
        });
        i.fn.ready = function(n) {
            return i.ready.promise().done(n), this
        };
        i.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(n) {
                n ? i.readyWait++ : i.ready(!0)
            },
            ready: function(n) {
                (n === !0 ? --i.readyWait : i.isReady) || (i.isReady = !0, n !== !0 && --i.readyWait > 0 || (at.resolveWith(u, [i]), i.fn.triggerHandler && (i(u).triggerHandler("ready"), i(u).off("ready"))))
            }
        });
        i.ready.promise = function(t) {
            return at || (at = i.Deferred(), "complete" === u.readyState || "loading" !== u.readyState && !u.documentElement.doScroll ? n.setTimeout(i.ready) : (u.addEventListener("DOMContentLoaded", vt), n.addEventListener("load", vt))), at.promise(t)
        };
        i.ready.promise();
        a = function(n, t, r, u, f, e, o) {
            var s = 0,
                c = n.length,
                h = null == r;
            if ("object" === i.type(r)) {
                f = !0;
                for (s in r) a(n, t, s, r[s], !0, e, o)
            } else if (void 0 !== u && (f = !0, i.isFunction(u) || (o = !0), h && (o ? (t.call(n, u), t = null) : (h = t, t = function(n, t, r) {
                    return h.call(i(n), r)
                })), t))
                for (; c > s; s++) t(n[s], r, o ? u : u.call(n[s], s, t(n[s], r)));
            return f ? n : h ? t.call(n) : c ? t(n[0], r) : e
        };
        g = function(n) {
            return 1 === n.nodeType || 9 === n.nodeType || !+n.nodeType
        };
        ft.uid = 1;
        ft.prototype = {
            register: function(n, t) {
                var i = t || {};
                return n.nodeType ? n[this.expando] = i : Object.defineProperty(n, this.expando, {
                    value: i,
                    writable: !0,
                    configurable: !0
                }), n[this.expando]
            },
            cache: function(n) {
                if (!g(n)) return {};
                var t = n[this.expando];
                return t || (t = {}, g(n) && (n.nodeType ? n[this.expando] = t : Object.defineProperty(n, this.expando, {
                    value: t,
                    configurable: !0
                }))), t
            },
            set: function(n, t, i) {
                var r, u = this.cache(n);
                if ("string" == typeof t) u[t] = i;
                else
                    for (r in t) u[r] = t[r];
                return u
            },
            get: function(n, t) {
                return void 0 === t ? this.cache(n) : n[this.expando] && n[this.expando][t]
            },
            access: function(n, t, r) {
                var u;
                return void 0 === t || t && "string" == typeof t && void 0 === r ? (u = this.get(n, t), void 0 !== u ? u : this.get(n, i.camelCase(t))) : (this.set(n, t, r), void 0 !== r ? r : t)
            },
            remove: function(n, t) {
                var f, r, e, u = n[this.expando];
                if (void 0 !== u) {
                    if (void 0 === t) this.register(n);
                    else
                        for (i.isArray(t) ? r = t.concat(t.map(i.camelCase)) : (e = i.camelCase(t), (t in u) ? r = [t, e] : (r = e, r = (r in u) ? [r] : r.match(h) || [])), f = r.length; f--;) delete u[r[f]];
                    (void 0 === t || i.isEmptyObject(u)) && (n.nodeType ? n[this.expando] = void 0 : delete n[this.expando])
                }
            },
            hasData: function(n) {
                var t = n[this.expando];
                return void 0 !== t && !i.isEmptyObject(t)
            }
        };
        var r = new ft,
            e = new ft,
            kf = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            cr = /[A-Z]/g;
        i.extend({
            hasData: function(n) {
                return e.hasData(n) || r.hasData(n)
            },
            data: function(n, t, i) {
                return e.access(n, t, i)
            },
            removeData: function(n, t) {
                e.remove(n, t)
            },
            _data: function(n, t, i) {
                return r.access(n, t, i)
            },
            _removeData: function(n, t) {
                r.remove(n, t)
            }
        });
        i.fn.extend({
            data: function(n, t) {
                var o, f, s, u = this[0],
                    h = u && u.attributes;
                if (void 0 === n) {
                    if (this.length && (s = e.get(u), 1 === u.nodeType && !r.get(u, "hasDataAttrs"))) {
                        for (o = h.length; o--;) h[o] && (f = h[o].name, 0 === f.indexOf("data-") && (f = i.camelCase(f.slice(5)), lr(u, f, s[f])));
                        r.set(u, "hasDataAttrs", !0)
                    }
                    return s
                }
                return "object" == typeof n ? this.each(function() {
                    e.set(this, n)
                }) : a(this, function(t) {
                    var r, f;
                    if (u && void 0 === t) {
                        if ((r = e.get(u, n) || e.get(u, n.replace(cr, "-$&").toLowerCase()), void 0 !== r) || (f = i.camelCase(n), r = e.get(u, f), void 0 !== r) || (r = lr(u, f, void 0), void 0 !== r)) return r
                    } else f = i.camelCase(n), this.each(function() {
                        var i = e.get(this, f);
                        e.set(this, f, t);
                        n.indexOf("-") > -1 && void 0 !== i && e.set(this, n, t)
                    })
                }, null, t, arguments.length > 1, null, !0)
            },
            removeData: function(n) {
                return this.each(function() {
                    e.remove(this, n)
                })
            }
        });
        i.extend({
            queue: function(n, t, u) {
                var f;
                if (n) return (t = (t || "fx") + "queue", f = r.get(n, t), u && (!f || i.isArray(u) ? f = r.access(n, t, i.makeArray(u)) : f.push(u)), f || [])
            },
            dequeue: function(n, t) {
                t = t || "fx";
                var r = i.queue(n, t),
                    e = r.length,
                    u = r.shift(),
                    f = i._queueHooks(n, t),
                    o = function() {
                        i.dequeue(n, t)
                    };
                "inprogress" === u && (u = r.shift(), e--);
                u && ("fx" === t && r.unshift("inprogress"), delete f.stop, u.call(n, o, f));
                !e && f && f.empty.fire()
            },
            _queueHooks: function(n, t) {
                var u = t + "queueHooks";
                return r.get(n, u) || r.access(n, u, {
                    empty: i.Callbacks("once memory").add(function() {
                        r.remove(n, [t + "queue", u])
                    })
                })
            }
        });
        i.fn.extend({
            queue: function(n, t) {
                var r = 2;
                return "string" != typeof n && (t = n, n = "fx", r--), arguments.length < r ? i.queue(this[0], n) : void 0 === t ? this : this.each(function() {
                    var r = i.queue(this, n, t);
                    i._queueHooks(this, n);
                    "fx" === n && "inprogress" !== r[0] && i.dequeue(this, n)
                })
            },
            dequeue: function(n) {
                return this.each(function() {
                    i.dequeue(this, n)
                })
            },
            clearQueue: function(n) {
                return this.queue(n || "fx", [])
            },
            promise: function(n, t) {
                var u, e = 1,
                    o = i.Deferred(),
                    f = this,
                    s = this.length,
                    h = function() {
                        --e || o.resolveWith(f, [f])
                    };
                for ("string" != typeof n && (t = n, n = void 0), n = n || "fx"; s--;) u = r.get(f[s], n + "queueHooks"), u && u.empty && (e++, u.empty.add(h));
                return h(), o.promise(t)
            }
        });
        var ar = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            et = new RegExp("^(?:([+-])=|)(" + ar + ")([a-z%]*)$", "i"),
            w = ["Top", "Right", "Bottom", "Left"],
            ot = function(n, t) {
                return n = t || n, "none" === i.css(n, "display") || !i.contains(n.ownerDocument, n)
            };
        var yr = /^(?:checkbox|radio)$/i,
            pr = /<([\w:-]+)/,
            wr = /^$|\/(?:java|ecma)script/i,
            c = {
                option: [1, "<select multiple='multiple'>", "<\/select>"],
                thead: [1, "<table>", "<\/table>"],
                col: [2, "<table><colgroup>", "<\/colgroup><\/table>"],
                tr: [2, "<table><tbody>", "<\/tbody><\/table>"],
                td: [3, "<table><tbody><tr>", "<\/tr><\/tbody><\/table>"],
                _default: [0, "", ""]
            };
        c.optgroup = c.option;
        c.tbody = c.tfoot = c.colgroup = c.caption = c.thead;
        c.th = c.td;
        br = /<|&#?\w+;/;
        ! function() {
            var i = u.createDocumentFragment(),
                n = i.appendChild(u.createElement("div")),
                t = u.createElement("input");
            t.setAttribute("type", "radio");
            t.setAttribute("checked", "checked");
            t.setAttribute("name", "t");
            n.appendChild(t);
            f.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked;
            n.innerHTML = "<textarea>x<\/textarea>";
            f.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue
        }();
        var df = /^key/,
            gf = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            dr = /^([^.]*)(?:\.(.+)|)/;
        i.event = {
            global: {},
            add: function(n, t, u, f, e) {
                var v, y, w, p, b, c, s, l, o, k, d, a = r.get(n);
                if (a)
                    for (u.handler && (v = u, u = v.handler, e = v.selector), u.guid || (u.guid = i.guid++), (p = a.events) || (p = a.events = {}), (y = a.handle) || (y = a.handle = function(t) {
                            if ("undefined" != typeof i && i.event.triggered !== t.type) return i.event.dispatch.apply(n, arguments)
                        }), t = (t || "").match(h) || [""], b = t.length; b--;) w = dr.exec(t[b]) || [], o = d = w[1], k = (w[2] || "").split(".").sort(), o && (s = i.event.special[o] || {}, o = (e ? s.delegateType : s.bindType) || o, s = i.event.special[o] || {}, c = i.extend({
                        type: o,
                        origType: d,
                        data: f,
                        handler: u,
                        guid: u.guid,
                        selector: e,
                        needsContext: e && i.expr.match.needsContext.test(e),
                        namespace: k.join(".")
                    }, v), (l = p[o]) || (l = p[o] = [], l.delegateCount = 0, s.setup && s.setup.call(n, f, k, y) !== !1 || n.addEventListener && n.addEventListener(o, y)), s.add && (s.add.call(n, c), c.handler.guid || (c.handler.guid = u.guid)), e ? l.splice(l.delegateCount++, 0, c) : l.push(c), i.event.global[o] = !0)
            },
            remove: function(n, t, u, f, e) {
                var y, k, c, v, p, s, l, a, o, b, d, w = r.hasData(n) && r.get(n);
                if (w && (v = w.events)) {
                    for (t = (t || "").match(h) || [""], p = t.length; p--;)
                        if (c = dr.exec(t[p]) || [], o = d = c[1], b = (c[2] || "").split(".").sort(), o) {
                            for (l = i.event.special[o] || {}, o = (f ? l.delegateType : l.bindType) || o, a = v[o] || [], c = c[2] && new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)"), k = y = a.length; y--;) s = a[y], !e && d !== s.origType || u && u.guid !== s.guid || c && !c.test(s.namespace) || f && f !== s.selector && ("**" !== f || !s.selector) || (a.splice(y, 1), s.selector && a.delegateCount--, l.remove && l.remove.call(n, s));
                            k && !a.length && (l.teardown && l.teardown.call(n, b, w.handle) !== !1 || i.removeEvent(n, o, w.handle), delete v[o])
                        } else
                            for (o in v) i.event.remove(n, o + t[p], u, f, !0);
                    i.isEmptyObject(v) && r.remove(n, "handle events")
                }
            },
            dispatch: function(n) {
                n = i.event.fix(n);
                var o, s, e, u, t, h = [],
                    c = v.call(arguments),
                    l = (r.get(this, "events") || {})[n.type] || [],
                    f = i.event.special[n.type] || {};
                if (c[0] = n, n.delegateTarget = this, !f.preDispatch || f.preDispatch.call(this, n) !== !1) {
                    for (h = i.event.handlers.call(this, n, l), o = 0;
                        (u = h[o++]) && !n.isPropagationStopped();)
                        for (n.currentTarget = u.elem, s = 0;
                            (t = u.handlers[s++]) && !n.isImmediatePropagationStopped();)(!n.rnamespace || n.rnamespace.test(t.namespace)) && (n.handleObj = t, n.data = t.data, e = ((i.event.special[t.origType] || {}).handle || t.handler).apply(u.elem, c), void 0 !== e && (n.result = e) === !1 && (n.preventDefault(), n.stopPropagation()));
                    return f.postDispatch && f.postDispatch.call(this, n), n.result
                }
            },
            handlers: function(n, t) {
                var e, u, f, o, h = [],
                    s = t.delegateCount,
                    r = n.target;
                if (s && r.nodeType && ("click" !== n.type || isNaN(n.button) || n.button < 1))
                    for (; r !== this; r = r.parentNode || this)
                        if (1 === r.nodeType && (r.disabled !== !0 || "click" !== n.type)) {
                            for (u = [], e = 0; s > e; e++) o = t[e], f = o.selector + " ", void 0 === u[f] && (u[f] = o.needsContext ? i(f, this).index(r) > -1 : i.find(f, this, null, [r]).length), u[f] && u.push(o);
                            u.length && h.push({
                                elem: r,
                                handlers: u
                            })
                        }
                return s < t.length && h.push({
                    elem: this,
                    handlers: t.slice(s)
                }), h
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(n, t) {
                    return null == n.which && (n.which = null != t.charCode ? t.charCode : t.keyCode), n
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(n, t) {
                    var e, i, r, f = t.button;
                    return null == n.pageX && null != t.clientX && (e = n.target.ownerDocument || u, i = e.documentElement, r = e.body, n.pageX = t.clientX + (i && i.scrollLeft || r && r.scrollLeft || 0) - (i && i.clientLeft || r && r.clientLeft || 0), n.pageY = t.clientY + (i && i.scrollTop || r && r.scrollTop || 0) - (i && i.clientTop || r && r.clientTop || 0)), n.which || void 0 === f || (n.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), n
                }
            },
            fix: function(n) {
                if (n[i.expando]) return n;
                var f, e, o, r = n.type,
                    s = n,
                    t = this.fixHooks[r];
                for (t || (this.fixHooks[r] = t = gf.test(r) ? this.mouseHooks : df.test(r) ? this.keyHooks : {}), o = t.props ? this.props.concat(t.props) : this.props, n = new i.Event(s), f = o.length; f--;) e = o[f], n[e] = s[e];
                return n.target || (n.target = u), 3 === n.target.nodeType && (n.target = n.target.parentNode), t.filter ? t.filter(n, s) : n
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== gr() && this.focus) return (this.focus(), !1)
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === gr() && this.blur) return (this.blur(), !1)
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if ("checkbox" === this.type && this.click && i.nodeName(this, "input")) return (this.click(), !1)
                    },
                    _default: function(n) {
                        return i.nodeName(n.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(n) {
                        void 0 !== n.result && n.originalEvent && (n.originalEvent.returnValue = n.result)
                    }
                }
            }
        };
        i.removeEvent = function(n, t, i) {
            n.removeEventListener && n.removeEventListener(t, i)
        };
        i.Event = function(n, t) {
            return this instanceof i.Event ? (n && n.type ? (this.originalEvent = n, this.type = n.type, this.isDefaultPrevented = n.defaultPrevented || void 0 === n.defaultPrevented && n.returnValue === !1 ? yt : nt) : this.type = n, t && i.extend(this, t), this.timeStamp = n && n.timeStamp || i.now(), void(this[i.expando] = !0)) : new i.Event(n, t)
        };
        i.Event.prototype = {
            constructor: i.Event,
            isDefaultPrevented: nt,
            isPropagationStopped: nt,
            isImmediatePropagationStopped: nt,
            preventDefault: function() {
                var n = this.originalEvent;
                this.isDefaultPrevented = yt;
                n && n.preventDefault()
            },
            stopPropagation: function() {
                var n = this.originalEvent;
                this.isPropagationStopped = yt;
                n && n.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var n = this.originalEvent;
                this.isImmediatePropagationStopped = yt;
                n && n.stopImmediatePropagation();
                this.stopPropagation()
            }
        };
        i.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(n, t) {
            i.event.special[n] = {
                delegateType: t,
                bindType: t,
                handle: function(n) {
                    var u, f = this,
                        r = n.relatedTarget,
                        e = n.handleObj;
                    return (!r || r !== f && !i.contains(f, r)) && (n.type = e.origType, u = e.handler.apply(this, arguments), n.type = t), u
                }
            }
        });
        i.fn.extend({
            on: function(n, t, i, r) {
                return fi(this, n, t, i, r)
            },
            one: function(n, t, i, r) {
                return fi(this, n, t, i, r, 1)
            },
            off: function(n, t, r) {
                var u, f;
                if (n && n.preventDefault && n.handleObj) return u = n.handleObj, i(n.delegateTarget).off(u.namespace ? u.origType + "." + u.namespace : u.origType, u.selector, u.handler), this;
                if ("object" == typeof n) {
                    for (f in n) this.off(f, t, n[f]);
                    return this
                }
                return (t === !1 || "function" == typeof t) && (r = t, t = void 0), r === !1 && (r = nt), this.each(function() {
                    i.event.remove(this, n, r, t)
                })
            }
        });
        var ne = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
            te = /<script|<style|<link/i,
            ie = /checked\s*(?:[^=]|=\s*.checked.)/i,
            re = /^true\/(.*)/,
            ue = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        i.extend({
            htmlPrefilter: function(n) {
                return n.replace(ne, "<$1><\/$2>")
            },
            clone: function(n, t, r) {
                var u, c, s, e, h = n.cloneNode(!0),
                    l = i.contains(n.ownerDocument, n);
                if (!(f.noCloneChecked || 1 !== n.nodeType && 11 !== n.nodeType || i.isXMLDoc(n)))
                    for (e = o(h), s = o(n), u = 0, c = s.length; c > u; u++) oe(s[u], e[u]);
                if (t)
                    if (r)
                        for (s = s || o(n), e = e || o(h), u = 0, c = s.length; c > u; u++) tu(s[u], e[u]);
                    else tu(n, h);
                return e = o(h, "script"), e.length > 0 && ui(e, !l && o(n, "script")), h
            },
            cleanData: function(n) {
                for (var u, t, f, s = i.event.special, o = 0; void 0 !== (t = n[o]); o++)
                    if (g(t)) {
                        if (u = t[r.expando]) {
                            if (u.events)
                                for (f in u.events) s[f] ? i.event.remove(t, f) : i.removeEvent(t, f, u.handle);
                            t[r.expando] = void 0
                        }
                        t[e.expando] && (t[e.expando] = void 0)
                    }
            }
        });
        i.fn.extend({
            domManip: b,
            detach: function(n) {
                return iu(this, n, !0)
            },
            remove: function(n) {
                return iu(this, n)
            },
            text: function(n) {
                return a(this, function(n) {
                    return void 0 === n ? i.text(this) : this.empty().each(function() {
                        (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = n)
                    })
                }, null, n, arguments.length)
            },
            append: function() {
                return b(this, arguments, function(n) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = nu(this, n);
                        t.appendChild(n)
                    }
                })
            },
            prepend: function() {
                return b(this, arguments, function(n) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = nu(this, n);
                        t.insertBefore(n, t.firstChild)
                    }
                })
            },
            before: function() {
                return b(this, arguments, function(n) {
                    this.parentNode && this.parentNode.insertBefore(n, this)
                })
            },
            after: function() {
                return b(this, arguments, function(n) {
                    this.parentNode && this.parentNode.insertBefore(n, this.nextSibling)
                })
            },
            empty: function() {
                for (var n, t = 0; null != (n = this[t]); t++) 1 === n.nodeType && (i.cleanData(o(n, !1)), n.textContent = "");
                return this
            },
            clone: function(n, t) {
                return n = null == n ? !1 : n, t = null == t ? n : t, this.map(function() {
                    return i.clone(this, n, t)
                })
            },
            html: function(n) {
                return a(this, function(n) {
                    var t = this[0] || {},
                        r = 0,
                        u = this.length;
                    if (void 0 === n && 1 === t.nodeType) return t.innerHTML;
                    if ("string" == typeof n && !te.test(n) && !c[(pr.exec(n) || ["", ""])[1].toLowerCase()]) {
                        n = i.htmlPrefilter(n);
                        try {
                            for (; u > r; r++) t = this[r] || {}, 1 === t.nodeType && (i.cleanData(o(t, !1)), t.innerHTML = n);
                            t = 0
                        } catch (f) {}
                    }
                    t && this.empty().append(n)
                }, null, n, arguments.length)
            },
            replaceWith: function() {
                var n = [];
                return b(this, arguments, function(t) {
                    var r = this.parentNode;
                    i.inArray(this, n) < 0 && (i.cleanData(o(this)), r && r.replaceChild(t, this))
                }, n)
            }
        });
        i.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(n, t) {
            i.fn[n] = function(n) {
                for (var u, f = [], e = i(n), o = e.length - 1, r = 0; o >= r; r++) u = r === o ? this : this.clone(!0), i(e[r])[t](u), ni.apply(f, u.get());
                return this.pushStack(f)
            }
        });
        ei = {
            HTML: "block",
            BODY: "block"
        };
        var uu = /^margin/,
            si = new RegExp("^(" + ar + ")(?!px)[a-z%]+$", "i"),
            wt = function(t) {
                var i = t.ownerDocument.defaultView;
                return i.opener || (i = n), i.getComputedStyle(t)
            },
            hi = function(n, t, i, r) {
                var f, u, e = {};
                for (u in t) e[u] = n.style[u], n.style[u] = t[u];
                f = i.apply(n, r || []);
                for (u in t) n.style[u] = e[u];
                return f
            },
            st = u.documentElement;
        ! function() {
            var s, e, h, c, r = u.createElement("div"),
                t = u.createElement("div");
            if (t.style) {
                t.style.backgroundClip = "content-box";
                t.cloneNode(!0).style.backgroundClip = "";
                f.clearCloneStyle = "content-box" === t.style.backgroundClip;
                r.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute";
                r.appendChild(t);

                function o() {
                    t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%";
                    t.innerHTML = "";
                    st.appendChild(r);
                    var i = n.getComputedStyle(t);
                    s = "1%" !== i.top;
                    c = "2px" === i.marginLeft;
                    e = "4px" === i.width;
                    t.style.marginRight = "50%";
                    h = "4px" === i.marginRight;
                    st.removeChild(r)
                }
                i.extend(f, {
                    pixelPosition: function() {
                        return o(), s
                    },
                    boxSizingReliable: function() {
                        return null == e && o(), e
                    },
                    pixelMarginRight: function() {
                        return null == e && o(), h
                    },
                    reliableMarginLeft: function() {
                        return null == e && o(), c
                    },
                    reliableMarginRight: function() {
                        var f, i = t.appendChild(u.createElement("div"));
                        return i.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", t.style.width = "1px", st.appendChild(r), f = !parseFloat(n.getComputedStyle(i).marginRight), st.removeChild(r), t.removeChild(i), f
                    }
                })
            }
        }();
        var se = /^(none|table(?!-c[ea]).+)/,
            he = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            fu = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            eu = ["Webkit", "O", "Moz", "ms"],
            ou = u.createElement("div").style;
        i.extend({
            cssHooks: {
                opacity: {
                    get: function(n, t) {
                        if (t) {
                            var i = tt(n, "opacity");
                            return "" === i ? "1" : i
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                float: "cssFloat"
            },
            style: function(n, t, r, u) {
                if (n && 3 !== n.nodeType && 8 !== n.nodeType && n.style) {
                    var e, h, o, s = i.camelCase(t),
                        c = n.style;
                    return t = i.cssProps[s] || (i.cssProps[s] = su(s) || s), o = i.cssHooks[t] || i.cssHooks[s], void 0 === r ? o && "get" in o && void 0 !== (e = o.get(n, !1, u)) ? e : c[t] : (h = typeof r, "string" === h && (e = et.exec(r)) && e[1] && (r = vr(n, t, e), h = "number"), null != r && r === r && ("number" === h && (r += e && e[3] || (i.cssNumber[s] ? "" : "px")), f.clearCloneStyle || "" !== r || 0 !== t.indexOf("background") || (c[t] = "inherit"), o && "set" in o && void 0 === (r = o.set(n, r, u)) || (c[t] = r)), void 0)
                }
            },
            css: function(n, t, r, u) {
                var f, s, o, e = i.camelCase(t);
                return t = i.cssProps[e] || (i.cssProps[e] = su(e) || e), o = i.cssHooks[t] || i.cssHooks[e], o && "get" in o && (f = o.get(n, !0, r)), void 0 === f && (f = tt(n, t, u)), "normal" === f && t in fu && (f = fu[t]), "" === r || r ? (s = parseFloat(f), r === !0 || isFinite(s) ? s || 0 : f) : f
            }
        });
        i.each(["height", "width"], function(n, t) {
            i.cssHooks[t] = {
                get: function(n, r, u) {
                    if (r) return se.test(i.css(n, "display")) && 0 === n.offsetWidth ? hi(n, he, function() {
                        return lu(n, t, u)
                    }) : lu(n, t, u)
                },
                set: function(n, r, u) {
                    var f, e = u && wt(n),
                        o = u && cu(n, t, u, "border-box" === i.css(n, "boxSizing", !1, e), e);
                    return o && (f = et.exec(r)) && "px" !== (f[3] || "px") && (n.style[t] = r, r = i.css(n, t)), hu(n, r, o)
                }
            }
        });
        i.cssHooks.marginLeft = ci(f.reliableMarginLeft, function(n, t) {
            if (t) return (parseFloat(tt(n, "marginLeft")) || n.getBoundingClientRect().left - hi(n, {
                marginLeft: 0
            }, function() {
                return n.getBoundingClientRect().left
            })) + "px"
        });
        i.cssHooks.marginRight = ci(f.reliableMarginRight, function(n, t) {
            if (t) return hi(n, {
                display: "inline-block"
            }, tt, [n, "marginRight"])
        });
        i.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(n, t) {
            i.cssHooks[n + t] = {
                expand: function(i) {
                    for (var r = 0, f = {}, u = "string" == typeof i ? i.split(" ") : [i]; 4 > r; r++) f[n + w[r] + t] = u[r] || u[r - 2] || u[0];
                    return f
                }
            };
            uu.test(n) || (i.cssHooks[n + t].set = hu)
        });
        i.fn.extend({
            css: function(n, t) {
                return a(this, function(n, t, r) {
                    var f, e, o = {},
                        u = 0;
                    if (i.isArray(t)) {
                        for (f = wt(n), e = t.length; e > u; u++) o[t[u]] = i.css(n, t[u], !1, f);
                        return o
                    }
                    return void 0 !== r ? i.style(n, t, r) : i.css(n, t)
                }, n, t, arguments.length > 1)
            },
            show: function() {
                return au(this, !0)
            },
            hide: function() {
                return au(this)
            },
            toggle: function(n) {
                return "boolean" == typeof n ? n ? this.show() : this.hide() : this.each(function() {
                    ot(this) ? i(this).show() : i(this).hide()
                })
            }
        });
        i.Tween = s;
        s.prototype = {
            constructor: s,
            init: function(n, t, r, u, f, e) {
                this.elem = n;
                this.prop = r;
                this.easing = f || i.easing._default;
                this.options = t;
                this.start = this.now = this.cur();
                this.end = u;
                this.unit = e || (i.cssNumber[r] ? "" : "px")
            },
            cur: function() {
                var n = s.propHooks[this.prop];
                return n && n.get ? n.get(this) : s.propHooks._default.get(this)
            },
            run: function(n) {
                var t, r = s.propHooks[this.prop];
                return this.pos = this.options.duration ? t = i.easing[this.easing](n, this.options.duration * n, 0, 1, this.options.duration) : t = n, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), r && r.set ? r.set(this) : s.propHooks._default.set(this), this
            }
        };
        s.prototype.init.prototype = s.prototype;
        s.propHooks = {
            _default: {
                get: function(n) {
                    var t;
                    return 1 !== n.elem.nodeType || null != n.elem[n.prop] && null == n.elem.style[n.prop] ? n.elem[n.prop] : (t = i.css(n.elem, n.prop, ""), t && "auto" !== t ? t : 0)
                },
                set: function(n) {
                    i.fx.step[n.prop] ? i.fx.step[n.prop](n) : 1 !== n.elem.nodeType || null == n.elem.style[i.cssProps[n.prop]] && !i.cssHooks[n.prop] ? n.elem[n.prop] = n.now : i.style(n.elem, n.prop, n.now + n.unit)
                }
            }
        };
        s.propHooks.scrollTop = s.propHooks.scrollLeft = {
            set: function(n) {
                n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now)
            }
        };
        i.easing = {
            linear: function(n) {
                return n
            },
            swing: function(n) {
                return .5 - Math.cos(n * Math.PI) / 2
            },
            _default: "swing"
        };
        i.fx = s.prototype.init;
        i.fx.step = {};
        vu = /^(?:toggle|show|hide)$/;
        yu = /queueHooks$/;
        i.Animation = i.extend(l, {
            tweeners: {
                "*": [function(n, t) {
                    var i = this.createTween(n, t);
                    return vr(i.elem, n, et.exec(t), i), i
                }]
            },
            tweener: function(n, t) {
                i.isFunction(n) ? (t = n, n = ["*"]) : n = n.match(h);
                for (var r, u = 0, f = n.length; f > u; u++) r = n[u], l.tweeners[r] = l.tweeners[r] || [], l.tweeners[r].unshift(t)
            },
            prefilters: [ce],
            prefilter: function(n, t) {
                t ? l.prefilters.unshift(n) : l.prefilters.push(n)
            }
        });
        i.speed = function(n, t, r) {
            var u = n && "object" == typeof n ? i.extend({}, n) : {
                complete: r || !r && t || i.isFunction(n) && n,
                duration: n,
                easing: r && t || t && !i.isFunction(t) && t
            };
            return u.duration = i.fx.off ? 0 : "number" == typeof u.duration ? u.duration : u.duration in i.fx.speeds ? i.fx.speeds[u.duration] : i.fx.speeds._default, (null == u.queue || u.queue === !0) && (u.queue = "fx"), u.old = u.complete, u.complete = function() {
                i.isFunction(u.old) && u.old.call(this);
                u.queue && i.dequeue(this, u.queue)
            }, u
        };
        i.fn.extend({
            fadeTo: function(n, t, i, r) {
                return this.filter(ot).css("opacity", 0).show().end().animate({
                    opacity: t
                }, n, i, r)
            },
            animate: function(n, t, u, f) {
                var s = i.isEmptyObject(n),
                    o = i.speed(t, u, f),
                    e = function() {
                        var t = l(this, i.extend({}, n), o);
                        (s || r.get(this, "finish")) && t.stop(!0)
                    };
                return e.finish = e, s || o.queue === !1 ? this.each(e) : this.queue(o.queue, e)
            },
            stop: function(n, t, u) {
                var f = function(n) {
                    var t = n.stop;
                    delete n.stop;
                    t(u)
                };
                return "string" != typeof n && (u = t, t = n, n = void 0), t && n !== !1 && this.queue(n || "fx", []), this.each(function() {
                    var s = !0,
                        t = null != n && n + "queueHooks",
                        o = i.timers,
                        e = r.get(this);
                    if (t) e[t] && e[t].stop && f(e[t]);
                    else
                        for (t in e) e[t] && e[t].stop && yu.test(t) && f(e[t]);
                    for (t = o.length; t--;) o[t].elem !== this || null != n && o[t].queue !== n || (o[t].anim.stop(u), s = !1, o.splice(t, 1));
                    (s || !u) && i.dequeue(this, n)
                })
            },
            finish: function(n) {
                return n !== !1 && (n = n || "fx"), this.each(function() {
                    var t, e = r.get(this),
                        u = e[n + "queue"],
                        o = e[n + "queueHooks"],
                        f = i.timers,
                        s = u ? u.length : 0;
                    for (e.finish = !0, i.queue(this, n, []), o && o.stop && o.stop.call(this, !0), t = f.length; t--;) f[t].elem === this && f[t].queue === n && (f[t].anim.stop(!0), f.splice(t, 1));
                    for (t = 0; s > t; t++) u[t] && u[t].finish && u[t].finish.call(this);
                    delete e.finish
                })
            }
        });
        i.each(["toggle", "show", "hide"], function(n, t) {
            var r = i.fn[t];
            i.fn[t] = function(n, i, u) {
                return null == n || "boolean" == typeof n ? r.apply(this, arguments) : this.animate(kt(t, !0), n, i, u)
            }
        });
        i.each({
            slideDown: kt("show"),
            slideUp: kt("hide"),
            slideToggle: kt("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(n, t) {
            i.fn[n] = function(n, i, r) {
                return this.animate(t, n, i, r)
            }
        });
        i.timers = [];
        i.fx.tick = function() {
            var r, n = 0,
                t = i.timers;
            for (it = i.now(); n < t.length; n++) r = t[n], r() || t[n] !== r || t.splice(n--, 1);
            t.length || i.fx.stop();
            it = void 0
        };
        i.fx.timer = function(n) {
            i.timers.push(n);
            n() ? i.fx.start() : i.timers.pop()
        };
        i.fx.interval = 13;
        i.fx.start = function() {
            bt || (bt = n.setInterval(i.fx.tick, i.fx.interval))
        };
        i.fx.stop = function() {
            n.clearInterval(bt);
            bt = null
        };
        i.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        };
        i.fn.delay = function(t, r) {
                return t = i.fx ? i.fx.speeds[t] || t : t, r = r || "fx", this.queue(r, function(i, r) {
                    var u = n.setTimeout(i, t);
                    r.stop = function() {
                        n.clearTimeout(u)
                    }
                })
            },
            function() {
                var n = u.createElement("input"),
                    t = u.createElement("select"),
                    i = t.appendChild(u.createElement("option"));
                n.type = "checkbox";
                f.checkOn = "" !== n.value;
                f.optSelected = i.selected;
                t.disabled = !0;
                f.optDisabled = !i.disabled;
                n = u.createElement("input");
                n.value = "t";
                n.type = "radio";
                f.radioValue = "t" === n.value
            }();
        rt = i.expr.attrHandle;
        i.fn.extend({
            attr: function(n, t) {
                return a(this, i.attr, n, t, arguments.length > 1)
            },
            removeAttr: function(n) {
                return this.each(function() {
                    i.removeAttr(this, n)
                })
            }
        });
        i.extend({
            attr: function(n, t, r) {
                var u, f, e = n.nodeType;
                if (3 !== e && 8 !== e && 2 !== e) return "undefined" == typeof n.getAttribute ? i.prop(n, t, r) : (1 === e && i.isXMLDoc(n) || (t = t.toLowerCase(), f = i.attrHooks[t] || (i.expr.match.bool.test(t) ? bu : void 0)), void 0 !== r ? null === r ? void i.removeAttr(n, t) : f && "set" in f && void 0 !== (u = f.set(n, r, t)) ? u : (n.setAttribute(t, r + ""), r) : f && "get" in f && null !== (u = f.get(n, t)) ? u : (u = i.find.attr(n, t), null == u ? void 0 : u))
            },
            attrHooks: {
                type: {
                    set: function(n, t) {
                        if (!f.radioValue && "radio" === t && i.nodeName(n, "input")) {
                            var r = n.value;
                            return n.setAttribute("type", t), r && (n.value = r), t
                        }
                    }
                }
            },
            removeAttr: function(n, t) {
                var r, u, e = 0,
                    f = t && t.match(h);
                if (f && 1 === n.nodeType)
                    while (r = f[e++]) u = i.propFix[r] || r, i.expr.match.bool.test(r) && (n[u] = !1), n.removeAttribute(r)
            }
        });
        bu = {
            set: function(n, t, r) {
                return t === !1 ? i.removeAttr(n, r) : n.setAttribute(r, r), r
            }
        };
        i.each(i.expr.match.bool.source.match(/\w+/g), function(n, t) {
            var r = rt[t] || i.find.attr;
            rt[t] = function(n, t, i) {
                var u, f;
                return i || (f = rt[t], rt[t] = u, u = null != r(n, t, i) ? t.toLowerCase() : null, rt[t] = f), u
            }
        });
        ku = /^(?:input|select|textarea|button)$/i;
        du = /^(?:a|area)$/i;
        i.fn.extend({
            prop: function(n, t) {
                return a(this, i.prop, n, t, arguments.length > 1)
            },
            removeProp: function(n) {
                return this.each(function() {
                    delete this[i.propFix[n] || n]
                })
            }
        });
        i.extend({
            prop: function(n, t, r) {
                var f, u, e = n.nodeType;
                if (3 !== e && 8 !== e && 2 !== e) return 1 === e && i.isXMLDoc(n) || (t = i.propFix[t] || t, u = i.propHooks[t]), void 0 !== r ? u && "set" in u && void 0 !== (f = u.set(n, r, t)) ? f : n[t] = r : u && "get" in u && null !== (f = u.get(n, t)) ? f : n[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(n) {
                        var t = i.find.attr(n, "tabindex");
                        return t ? parseInt(t, 10) : ku.test(n.nodeName) || du.test(n.nodeName) && n.href ? 0 : -1
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        });
        f.optSelected || (i.propHooks.selected = {
            get: function(n) {
                var t = n.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null
            }
        });
        i.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            i.propFix[this.toLowerCase()] = this
        });
        dt = /[\t\r\n\f]/g;
        i.fn.extend({
            addClass: function(n) {
                var o, t, r, u, f, s, e, c = 0;
                if (i.isFunction(n)) return this.each(function(t) {
                    i(this).addClass(n.call(this, t, k(this)))
                });
                if ("string" == typeof n && n)
                    for (o = n.match(h) || []; t = this[c++];)
                        if (u = k(t), r = 1 === t.nodeType && (" " + u + " ").replace(dt, " ")) {
                            for (s = 0; f = o[s++];) r.indexOf(" " + f + " ") < 0 && (r += f + " ");
                            e = i.trim(r);
                            u !== e && t.setAttribute("class", e)
                        }
                return this
            },
            removeClass: function(n) {
                var o, r, t, u, f, s, e, c = 0;
                if (i.isFunction(n)) return this.each(function(t) {
                    i(this).removeClass(n.call(this, t, k(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof n && n)
                    for (o = n.match(h) || []; r = this[c++];)
                        if (u = k(r), t = 1 === r.nodeType && (" " + u + " ").replace(dt, " ")) {
                            for (s = 0; f = o[s++];)
                                while (t.indexOf(" " + f + " ") > -1) t = t.replace(" " + f + " ", " ");
                            e = i.trim(t);
                            u !== e && r.setAttribute("class", e)
                        }
                return this
            },
            toggleClass: function(n, t) {
                var u = typeof n;
                return "boolean" == typeof t && "string" === u ? t ? this.addClass(n) : this.removeClass(n) : i.isFunction(n) ? this.each(function(r) {
                    i(this).toggleClass(n.call(this, r, k(this), t), t)
                }) : this.each(function() {
                    var t, e, f, o;
                    if ("string" === u)
                        for (e = 0, f = i(this), o = n.match(h) || []; t = o[e++];) f.hasClass(t) ? f.removeClass(t) : f.addClass(t);
                    else(void 0 === n || "boolean" === u) && (t = k(this), t && r.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || n === !1 ? "" : r.get(this, "__className__") || ""))
                })
            },
            hasClass: function(n) {
                for (var t, r = 0, i = " " + n + " "; t = this[r++];)
                    if (1 === t.nodeType && (" " + k(t) + " ").replace(dt, " ").indexOf(i) > -1) return !0;
                return !1
            }
        });
        gu = /\r/g;
        i.fn.extend({
            val: function(n) {
                var t, r, f, u = this[0];
                return arguments.length ? (f = i.isFunction(n), this.each(function(r) {
                    var u;
                    1 === this.nodeType && (u = f ? n.call(this, r, i(this).val()) : n, null == u ? u = "" : "number" == typeof u ? u += "" : i.isArray(u) && (u = i.map(u, function(n) {
                        return null == n ? "" : n + ""
                    })), t = i.valHooks[this.type] || i.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, u, "value") || (this.value = u))
                })) : u ? (t = i.valHooks[u.type] || i.valHooks[u.nodeName.toLowerCase()], t && "get" in t && void 0 !== (r = t.get(u, "value")) ? r : (r = u.value, "string" == typeof r ? r.replace(gu, "") : null == r ? "" : r)) : void 0
            }
        });
        i.extend({
            valHooks: {
                option: {
                    get: function(n) {
                        return i.trim(n.value)
                    }
                },
                select: {
                    get: function(n) {
                        for (var o, t, s = n.options, r = n.selectedIndex, u = "select-one" === n.type || 0 > r, h = u ? null : [], c = u ? r + 1 : s.length, e = 0 > r ? c : u ? r : 0; c > e; e++)
                            if (t = s[e], (t.selected || e === r) && (f.optDisabled ? !t.disabled : null === t.getAttribute("disabled")) && (!t.parentNode.disabled || !i.nodeName(t.parentNode, "optgroup"))) {
                                if (o = i(t).val(), u) return o;
                                h.push(o)
                            }
                        return h
                    },
                    set: function(n, t) {
                        for (var u, r, f = n.options, e = i.makeArray(t), o = f.length; o--;) r = f[o], (r.selected = i.inArray(i.valHooks.option.get(r), e) > -1) && (u = !0);
                        return u || (n.selectedIndex = -1), e
                    }
                }
            }
        });
        i.each(["radio", "checkbox"], function() {
            i.valHooks[this] = {
                set: function(n, t) {
                    if (i.isArray(t)) return n.checked = i.inArray(i(n).val(), t) > -1
                }
            };
            f.checkOn || (i.valHooks[this].get = function(n) {
                return null === n.getAttribute("value") ? "on" : n.value
            })
        });
        li = /^(?:focusinfocus|focusoutblur)$/;
        i.extend(i.event, {
            trigger: function(t, f, e, o) {
                var w, s, c, b, a, v, l, p = [e || u],
                    h = ti.call(t, "type") ? t.type : t,
                    y = ti.call(t, "namespace") ? t.namespace.split(".") : [];
                if (s = c = e = e || u, 3 !== e.nodeType && 8 !== e.nodeType && !li.test(h + i.event.triggered) && (h.indexOf(".") > -1 && (y = h.split("."), h = y.shift(), y.sort()), a = h.indexOf(":") < 0 && "on" + h, t = t[i.expando] ? t : new i.Event(h, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = y.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = e), f = null == f ? [t] : i.makeArray(f, [t]), l = i.event.special[h] || {}, o || !l.trigger || l.trigger.apply(e, f) !== !1)) {
                    if (!o && !l.noBubble && !i.isWindow(e)) {
                        for (b = l.delegateType || h, li.test(b + h) || (s = s.parentNode); s; s = s.parentNode) p.push(s), c = s;
                        c === (e.ownerDocument || u) && p.push(c.defaultView || c.parentWindow || n)
                    }
                    for (w = 0;
                        (s = p[w++]) && !t.isPropagationStopped();) t.type = w > 1 ? b : l.bindType || h, v = (r.get(s, "events") || {})[t.type] && r.get(s, "handle"), v && v.apply(s, f), v = a && s[a], v && v.apply && g(s) && (t.result = v.apply(s, f), t.result === !1 && t.preventDefault());
                    return t.type = h, o || t.isDefaultPrevented() || l._default && l._default.apply(p.pop(), f) !== !1 || !g(e) || a && i.isFunction(e[h]) && !i.isWindow(e) && (c = e[a], c && (e[a] = null), i.event.triggered = h, e[h](), i.event.triggered = void 0, c && (e[a] = c)), t.result
                }
            },
            simulate: function(n, t, r) {
                var u = i.extend(new i.Event, r, {
                    type: n,
                    isSimulated: !0
                });
                i.event.trigger(u, null, t);
                u.isDefaultPrevented() && r.preventDefault()
            }
        });
        i.fn.extend({
            trigger: function(n, t) {
                return this.each(function() {
                    i.event.trigger(n, t, this)
                })
            },
            triggerHandler: function(n, t) {
                var r = this[0];
                if (r) return i.event.trigger(n, t, r, !0)
            }
        });
        i.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(n, t) {
            i.fn[t] = function(n, i) {
                return arguments.length > 0 ? this.on(t, null, n, i) : this.trigger(t)
            }
        });
        i.fn.extend({
            hover: function(n, t) {
                return this.mouseenter(n).mouseleave(t || n)
            }
        });
        f.focusin = "onfocusin" in n;
        f.focusin || i.each({
            focus: "focusin",
            blur: "focusout"
        }, function(n, t) {
            var u = function(n) {
                i.event.simulate(t, n.target, i.event.fix(n))
            };
            i.event.special[t] = {
                setup: function() {
                    var i = this.ownerDocument || this,
                        f = r.access(i, t);
                    f || i.addEventListener(n, u, !0);
                    r.access(i, t, (f || 0) + 1)
                },
                teardown: function() {
                    var i = this.ownerDocument || this,
                        f = r.access(i, t) - 1;
                    f ? r.access(i, t, f) : (i.removeEventListener(n, u, !0), r.remove(i, t))
                }
            }
        });
        var ht = n.location,
            ai = i.now(),
            vi = /\?/;
        i.parseJSON = function(n) {
            return JSON.parse(n + "")
        };
        i.parseXML = function(t) {
            var r;
            if (!t || "string" != typeof t) return null;
            try {
                r = (new n.DOMParser).parseFromString(t, "text/xml")
            } catch (u) {
                r = void 0
            }
            return (!r || r.getElementsByTagName("parsererror").length) && i.error("Invalid XML: " + t), r
        };
        var ae = /#.*$/,
            nf = /([?&])_=[^&]*/,
            ve = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            ye = /^(?:GET|HEAD)$/,
            pe = /^\/\//,
            tf = {},
            yi = {},
            rf = "*/".concat("*"),
            pi = u.createElement("a");
        pi.href = ht.href;
        i.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ht.href,
                type: "GET",
                isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(ht.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": rf,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": i.parseJSON,
                    "text xml": i.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(n, t) {
                return t ? wi(wi(n, i.ajaxSettings), t) : wi(i.ajaxSettings, n)
            },
            ajaxPrefilter: uf(tf),
            ajaxTransport: uf(yi),
            ajax: function(t, r) {
                function b(t, r, u, h) {
                    var a, rt, it, p, b, l = r;
                    2 !== s && (s = 2, d && n.clearTimeout(d), v = void 0, k = h || "", e.readyState = t > 0 ? 4 : 0, a = t >= 200 && 300 > t || 304 === t, u && (p = we(f, e, u)), p = be(f, p, e, a), a ? (f.ifModified && (b = e.getResponseHeader("Last-Modified"), b && (i.lastModified[o] = b), b = e.getResponseHeader("etag"), b && (i.etag[o] = b)), 204 === t || "HEAD" === f.type ? l = "nocontent" : 304 === t ? l = "notmodified" : (l = p.state, rt = p.data, it = p.error, a = !it)) : (it = l, (t || !l) && (l = "error", 0 > t && (t = 0))), e.status = t, e.statusText = (r || l) + "", a ? nt.resolveWith(c, [rt, l, e]) : nt.rejectWith(c, [e, l, it]), e.statusCode(w), w = void 0, y && g.trigger(a ? "ajaxSuccess" : "ajaxError", [e, f, a ? rt : it]), tt.fireWith(c, [e, l]), y && (g.trigger("ajaxComplete", [e, f]), --i.active || i.event.trigger("ajaxStop")))
                }
                "object" == typeof t && (r = t, t = void 0);
                r = r || {};
                var v, o, k, p, d, l, y, a, f = i.ajaxSetup({}, r),
                    c = f.context || f,
                    g = f.context && (c.nodeType || c.jquery) ? i(c) : i.event,
                    nt = i.Deferred(),
                    tt = i.Callbacks("once memory"),
                    w = f.statusCode || {},
                    it = {},
                    rt = {},
                    s = 0,
                    ut = "canceled",
                    e = {
                        readyState: 0,
                        getResponseHeader: function(n) {
                            var t;
                            if (2 === s) {
                                if (!p)
                                    for (p = {}; t = ve.exec(k);) p[t[1].toLowerCase()] = t[2];
                                t = p[n.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function() {
                            return 2 === s ? k : null
                        },
                        setRequestHeader: function(n, t) {
                            var i = n.toLowerCase();
                            return s || (n = rt[i] = rt[i] || n, it[n] = t), this
                        },
                        overrideMimeType: function(n) {
                            return s || (f.mimeType = n), this
                        },
                        statusCode: function(n) {
                            var t;
                            if (n)
                                if (2 > s)
                                    for (t in n) w[t] = [w[t], n[t]];
                                else e.always(n[e.status]);
                            return this
                        },
                        abort: function(n) {
                            var t = n || ut;
                            return v && v.abort(t), b(0, t), this
                        }
                    };
                if (nt.promise(e).complete = tt.add, e.success = e.done, e.error = e.fail, f.url = ((t || f.url || ht.href) + "").replace(ae, "").replace(pe, ht.protocol + "//"), f.type = r.method || r.type || f.method || f.type, f.dataTypes = i.trim(f.dataType || "*").toLowerCase().match(h) || [""], null == f.crossDomain) {
                    l = u.createElement("a");
                    try {
                        l.href = f.url;
                        l.href = l.href;
                        f.crossDomain = pi.protocol + "//" + pi.host != l.protocol + "//" + l.host
                    } catch (ft) {
                        f.crossDomain = !0
                    }
                }
                if (f.data && f.processData && "string" != typeof f.data && (f.data = i.param(f.data, f.traditional)), ff(tf, f, r, e), 2 === s) return e;
                y = i.event && f.global;
                y && 0 == i.active++ && i.event.trigger("ajaxStart");
                f.type = f.type.toUpperCase();
                f.hasContent = !ye.test(f.type);
                o = f.url;
                f.hasContent || (f.data && (o = f.url += (vi.test(o) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = nf.test(o) ? o.replace(nf, "$1_=" + ai++) : o + (vi.test(o) ? "&" : "?") + "_=" + ai++));
                f.ifModified && (i.lastModified[o] && e.setRequestHeader("If-Modified-Since", i.lastModified[o]), i.etag[o] && e.setRequestHeader("If-None-Match", i.etag[o]));
                (f.data && f.hasContent && f.contentType !== !1 || r.contentType) && e.setRequestHeader("Content-Type", f.contentType);
                e.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + rf + "; q=0.01" : "") : f.accepts["*"]);
                for (a in f.headers) e.setRequestHeader(a, f.headers[a]);
                if (f.beforeSend && (f.beforeSend.call(c, e, f) === !1 || 2 === s)) return e.abort();
                ut = "abort";
                for (a in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) e[a](f[a]);
                if (v = ff(yi, f, r, e)) {
                    if (e.readyState = 1, y && g.trigger("ajaxSend", [e, f]), 2 === s) return e;
                    f.async && f.timeout > 0 && (d = n.setTimeout(function() {
                        e.abort("timeout")
                    }, f.timeout));
                    try {
                        s = 1;
                        v.send(it, b)
                    } catch (ft) {
                        if (!(2 > s)) throw ft;
                        b(-1, ft)
                    }
                } else b(-1, "No Transport");
                return e
            },
            getJSON: function(n, t, r) {
                return i.get(n, t, r, "json")
            },
            getScript: function(n, t) {
                return i.get(n, void 0, t, "script")
            }
        });
        i.each(["get", "post"], function(n, t) {
            i[t] = function(n, r, u, f) {
                return i.isFunction(r) && (f = f || u, u = r, r = void 0), i.ajax(i.extend({
                    url: n,
                    type: t,
                    dataType: f,
                    data: r,
                    success: u
                }, i.isPlainObject(n) && n))
            }
        });
        i._evalUrl = function(n) {
            return i.ajax({
                url: n,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                throws: !0
            })
        };
        i.fn.extend({
            wrapAll: function(n) {
                var t;
                return i.isFunction(n) ? this.each(function(t) {
                    i(this).wrapAll(n.call(this, t))
                }) : (this[0] && (t = i(n, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var n = this; n.firstElementChild;) n = n.firstElementChild;
                    return n
                }).append(this)), this)
            },
            wrapInner: function(n) {
                return i.isFunction(n) ? this.each(function(t) {
                    i(this).wrapInner(n.call(this, t))
                }) : this.each(function() {
                    var t = i(this),
                        r = t.contents();
                    r.length ? r.wrapAll(n) : t.append(n)
                })
            },
            wrap: function(n) {
                var t = i.isFunction(n);
                return this.each(function(r) {
                    i(this).wrapAll(t ? n.call(this, r) : n)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    i.nodeName(this, "body") || i(this).replaceWith(this.childNodes)
                }).end()
            }
        });
        i.expr.filters.hidden = function(n) {
            return !i.expr.filters.visible(n)
        };
        i.expr.filters.visible = function(n) {
            return n.offsetWidth > 0 || n.offsetHeight > 0 || n.getClientRects().length > 0
        };
        var ke = /%20/g,
            de = /\[\]$/,
            ef = /\r?\n/g,
            ge = /^(?:submit|button|image|reset|file)$/i,
            no = /^(?:input|select|textarea|keygen)/i;
        return i.param = function(n, t) {
            var r, u = [],
                f = function(n, t) {
                    t = i.isFunction(t) ? t() : null == t ? "" : t;
                    u[u.length] = encodeURIComponent(n) + "=" + encodeURIComponent(t)
                };
            if (void 0 === t && (t = i.ajaxSettings && i.ajaxSettings.traditional), i.isArray(n) || n.jquery && !i.isPlainObject(n)) i.each(n, function() {
                f(this.name, this.value)
            });
            else
                for (r in n) bi(r, n[r], t, f);
            return u.join("&").replace(ke, "+")
        }, i.fn.extend({
            serialize: function() {
                return i.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var n = i.prop(this, "elements");
                    return n ? i.makeArray(n) : this
                }).filter(function() {
                    var n = this.type;
                    return this.name && !i(this).is(":disabled") && no.test(this.nodeName) && !ge.test(n) && (this.checked || !yr.test(n))
                }).map(function(n, t) {
                    var r = i(this).val();
                    return null == r ? null : i.isArray(r) ? i.map(r, function(n) {
                        return {
                            name: t.name,
                            value: n.replace(ef, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: r.replace(ef, "\r\n")
                    }
                }).get()
            }
        }), i.ajaxSettings.xhr = function() {
            try {
                return new n.XMLHttpRequest
            } catch (t) {}
        }, of = {
            0: 200,
            1223: 204
        }, ut = i.ajaxSettings.xhr(), f.cors = !!ut && "withCredentials" in ut, f.ajax = ut = !!ut, i.ajaxTransport(function(t) {
            var i, r;
            if (f.cors || ut && !t.crossDomain) return {
                send: function(u, f) {
                    var o, e = t.xhr();
                    if (e.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (o in t.xhrFields) e[o] = t.xhrFields[o];
                    t.mimeType && e.overrideMimeType && e.overrideMimeType(t.mimeType);
                    t.crossDomain || u["X-Requested-With"] || (u["X-Requested-With"] = "XMLHttpRequest");
                    for (o in u) e.setRequestHeader(o, u[o]);
                    i = function(n) {
                        return function() {
                            i && (i = r = e.onload = e.onerror = e.onabort = e.onreadystatechange = null, "abort" === n ? e.abort() : "error" === n ? "number" != typeof e.status ? f(0, "error") : f(e.status, e.statusText) : f( of [e.status] || e.status, e.statusText, "text" !== (e.responseType || "text") || "string" != typeof e.responseText ? {
                                binary: e.response
                            } : {
                                text: e.responseText
                            }, e.getAllResponseHeaders()))
                        }
                    };
                    e.onload = i();
                    r = e.onerror = i("error");
                    void 0 !== e.onabort ? e.onabort = r : e.onreadystatechange = function() {
                        4 === e.readyState && n.setTimeout(function() {
                            i && r()
                        })
                    };
                    i = i("abort");
                    try {
                        e.send(t.hasContent && t.data || null)
                    } catch (s) {
                        if (i) throw s;
                    }
                },
                abort: function() {
                    i && i()
                }
            }
        }), i.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(n) {
                    return i.globalEval(n), n
                }
            }
        }), i.ajaxPrefilter("script", function(n) {
            void 0 === n.cache && (n.cache = !1);
            n.crossDomain && (n.type = "GET")
        }), i.ajaxTransport("script", function(n) {
            if (n.crossDomain) {
                var r, t;
                return {
                    send: function(f, e) {
                        r = i("<script>").prop({
                            charset: n.scriptCharset,
                            src: n.url
                        }).on("load error", t = function(n) {
                            r.remove();
                            t = null;
                            n && e("error" === n.type ? 404 : 200, n.type)
                        });
                        u.head.appendChild(r[0])
                    },
                    abort: function() {
                        t && t()
                    }
                }
            }
        }), ki = [], gt = /(=)\?(?=&|$)|\?\?/, i.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var n = ki.pop() || i.expando + "_" + ai++;
                return this[n] = !0, n
            }
        }), i.ajaxPrefilter("json jsonp", function(t, r, u) {
            var f, e, o, s = t.jsonp !== !1 && (gt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && gt.test(t.data) && "data");
            if (s || "jsonp" === t.dataTypes[0]) return (f = t.jsonpCallback = i.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(gt, "$1" + f) : t.jsonp !== !1 && (t.url += (vi.test(t.url) ? "&" : "?") + t.jsonp + "=" + f), t.converters["script json"] = function() {
                return o || i.error(f + " was not called"), o[0]
            }, t.dataTypes[0] = "json", e = n[f], n[f] = function() {
                o = arguments
            }, u.always(function() {
                void 0 === e ? i(n).removeProp(f) : n[f] = e;
                t[f] && (t.jsonpCallback = r.jsonpCallback, ki.push(f));
                o && i.isFunction(e) && e(o[0]);
                o = e = void 0
            }), "script")
        }), f.createHTMLDocument = function() {
            var n = u.implementation.createHTMLDocument("").body;
            return n.innerHTML = "<form><\/form><form><\/form>", 2 === n.childNodes.length
        }(), i.parseHTML = function(n, t, r) {
            if (!n || "string" != typeof n) return null;
            "boolean" == typeof t && (r = t, t = !1);
            t = t || (f.createHTMLDocument ? u.implementation.createHTMLDocument("") : u);
            var e = rr.exec(n),
                o = !r && [];
            return e ? [t.createElement(e[1])] : (e = kr([n], t, o), o && o.length && i(o).remove(), i.merge([], e.childNodes))
        }, di = i.fn.load, i.fn.load = function(n, t, r) {
            if ("string" != typeof n && di) return di.apply(this, arguments);
            var f, o, s, u = this,
                e = n.indexOf(" ");
            return e > -1 && (f = i.trim(n.slice(e)), n = n.slice(0, e)), i.isFunction(t) ? (r = t, t = void 0) : t && "object" == typeof t && (o = "POST"), u.length > 0 && i.ajax({
                url: n,
                type: o || "GET",
                dataType: "html",
                data: t
            }).done(function(n) {
                s = arguments;
                u.html(f ? i("<div>").append(i.parseHTML(n)).find(f) : n)
            }).always(r && function(n, t) {
                u.each(function() {
                    r.apply(u, s || [n.responseText, t, n])
                })
            }), this
        }, i.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(n, t) {
            i.fn[t] = function(n) {
                return this.on(t, n)
            }
        }), i.expr.filters.animated = function(n) {
            return i.grep(i.timers, function(t) {
                return n === t.elem
            }).length
        }, i.offset = {
            setOffset: function(n, t, r) {
                var e, o, s, h, u, c, v, l = i.css(n, "position"),
                    a = i(n),
                    f = {};
                "static" === l && (n.style.position = "relative");
                u = a.offset();
                s = i.css(n, "top");
                c = i.css(n, "left");
                v = ("absolute" === l || "fixed" === l) && (s + c).indexOf("auto") > -1;
                v ? (e = a.position(), h = e.top, o = e.left) : (h = parseFloat(s) || 0, o = parseFloat(c) || 0);
                i.isFunction(t) && (t = t.call(n, r, i.extend({}, u)));
                null != t.top && (f.top = t.top - u.top + h);
                null != t.left && (f.left = t.left - u.left + o);
                "using" in t ? t.using.call(n, f) : a.css(f)
            }
        }, i.fn.extend({
            offset: function(n) {
                if (arguments.length) return void 0 === n ? this : this.each(function(t) {
                    i.offset.setOffset(this, n, t)
                });
                var t, f, r = this[0],
                    u = {
                        top: 0,
                        left: 0
                    },
                    e = r && r.ownerDocument;
                if (e) return t = e.documentElement, i.contains(t, r) ? (u = r.getBoundingClientRect(), f = sf(e), {
                    top: u.top + f.pageYOffset - t.clientTop,
                    left: u.left + f.pageXOffset - t.clientLeft
                }) : u
            },
            position: function() {
                if (this[0]) {
                    var n, r, u = this[0],
                        t = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === i.css(u, "position") ? r = u.getBoundingClientRect() : (n = this.offsetParent(), r = this.offset(), i.nodeName(n[0], "html") || (t = n.offset()), t.top += i.css(n[0], "borderTopWidth", !0) - n.scrollTop(), t.left += i.css(n[0], "borderLeftWidth", !0) - n.scrollLeft()), {
                        top: r.top - t.top - i.css(u, "marginTop", !0),
                        left: r.left - t.left - i.css(u, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var n = this.offsetParent; n && "static" === i.css(n, "position");) n = n.offsetParent;
                    return n || st
                })
            }
        }), i.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(n, t) {
            var r = "pageYOffset" === t;
            i.fn[n] = function(i) {
                return a(this, function(n, i, u) {
                    var f = sf(n);
                    return void 0 === u ? f ? f[t] : n[i] : void(f ? f.scrollTo(r ? f.pageXOffset : u, r ? u : f.pageYOffset) : n[i] = u)
                }, n, i, arguments.length)
            }
        }), i.each(["top", "left"], function(n, t) {
            i.cssHooks[t] = ci(f.pixelPosition, function(n, r) {
                if (r) return (r = tt(n, t), si.test(r) ? i(n).position()[t] + "px" : r)
            })
        }), i.each({
            Height: "height",
            Width: "width"
        }, function(n, t) {
            i.each({
                padding: "inner" + n,
                content: t,
                "": "outer" + n
            }, function(r, u) {
                i.fn[u] = function(u, f) {
                    var e = arguments.length && (r || "boolean" != typeof u),
                        o = r || (u === !0 || f === !0 ? "margin" : "border");
                    return a(this, function(t, r, u) {
                        var f;
                        return i.isWindow(t) ? t.document.documentElement["client" + n] : 9 === t.nodeType ? (f = t.documentElement, Math.max(t.body["scroll" + n], f["scroll" + n], t.body["offset" + n], f["offset" + n], f["client" + n])) : void 0 === u ? i.css(t, r, o) : i.style(t, r, u, o)
                    }, t, e ? u : void 0, e, null)
                }
            })
        }), i.fn.extend({
            bind: function(n, t, i) {
                return this.on(n, null, t, i)
            },
            unbind: function(n, t) {
                return this.off(n, null, t)
            },
            delegate: function(n, t, i, r) {
                return this.on(t, n, i, r)
            },
            undelegate: function(n, t, i) {
                return 1 === arguments.length ? this.off(n, "**") : this.off(t, n || "**", i)
            },
            size: function() {
                return this.length
            }
        }), i.fn.andSelf = i.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
            return i
        }), hf = n.jQuery, cf = n.$, i.noConflict = function(t) {
            return n.$ === i && (n.$ = cf), t && n.jQuery === i && (n.jQuery = hf), i
        }, t || (n.jQuery = n.$ = i), i
    }), function(n, t) {
        function i(t, i) {
            var u, f, e, o = t.nodeName.toLowerCase();
            return "area" === o ? (u = t.parentNode, f = u.name, !t.href || !f || u.nodeName.toLowerCase() !== "map") ? !1 : (e = n("img[usemap=#" + f + "]")[0], !!e && r(e)) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && r(t)
        }

        function r(t) {
            return n.expr.filters.visible(t) && !n(t).parents().addBack().filter(function() {
                return n.css(this, "visibility") === "hidden"
            }).length
        }
        var u = 0,
            f = /^ui-id-\d+$/;
        n.ui = n.ui || {};
        n.extend(n.ui, {
            version: "1.10.4",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        });
        n.fn.extend({
            focus: function(t) {
                return function(i, r) {
                    return typeof i == "number" ? this.each(function() {
                        var t = this;
                        setTimeout(function() {
                            n(t).focus();
                            r && r.call(t)
                        }, i)
                    }) : t.apply(this, arguments)
                }
            }(n.fn.focus),
            scrollParent: function() {
                var t;
                return t = n.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(n.css(this, "position")) && /(auto|scroll)/.test(n.css(this, "overflow") + n.css(this, "overflow-y") + n.css(this, "overflow-x"))
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(n.css(this, "overflow") + n.css(this, "overflow-y") + n.css(this, "overflow-x"))
                }).eq(0), /fixed/.test(this.css("position")) || !t.length ? n(document) : t
            },
            zIndex: function(i) {
                if (i !== t) return this.css("zIndex", i);
                if (this.length)
                    for (var r = n(this[0]), u, f; r.length && r[0] !== document;) {
                        if (u = r.css("position"), (u === "absolute" || u === "relative" || u === "fixed") && (f = parseInt(r.css("zIndex"), 10), !isNaN(f) && f !== 0)) return f;
                        r = r.parent()
                    }
                return 0
            },
            uniqueId: function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++u)
                })
            },
            removeUniqueId: function() {
                return this.each(function() {
                    f.test(this.id) && n(this).removeAttr("id")
                })
            }
        });
        n.extend(n.expr[":"], {
            data: n.expr.createPseudo ? n.expr.createPseudo(function(t) {
                return function(i) {
                    return !!n.data(i, t)
                }
            }) : function(t, i, r) {
                return !!n.data(t, r[3])
            },
            focusable: function(t) {
                return i(t, !isNaN(n.attr(t, "tabindex")))
            },
            tabbable: function(t) {
                var r = n.attr(t, "tabindex"),
                    u = isNaN(r);
                return (u || r >= 0) && i(t, !u)
            }
        });
        n("<a>").outerWidth(1).jquery || n.each(["Width", "Height"], function(i, r) {
            function u(t, i, r, u) {
                return n.each(o, function() {
                    i -= parseFloat(n.css(t, "padding" + this)) || 0;
                    r && (i -= parseFloat(n.css(t, "border" + this + "Width")) || 0);
                    u && (i -= parseFloat(n.css(t, "margin" + this)) || 0)
                }), i
            }
            var o = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                f = r.toLowerCase(),
                e = {
                    innerWidth: n.fn.innerWidth,
                    innerHeight: n.fn.innerHeight,
                    outerWidth: n.fn.outerWidth,
                    outerHeight: n.fn.outerHeight
                };
            n.fn["inner" + r] = function(i) {
                return i === t ? e["inner" + r].call(this) : this.each(function() {
                    n(this).css(f, u(this, i) + "px")
                })
            };
            n.fn["outer" + r] = function(t, i) {
                return typeof t != "number" ? e["outer" + r].call(this, t) : this.each(function() {
                    n(this).css(f, u(this, t, !0, i) + "px")
                })
            }
        });
        n.fn.addBack || (n.fn.addBack = function(n) {
            return this.add(n == null ? this.prevObject : this.prevObject.filter(n))
        });
        n("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (n.fn.removeData = function(t) {
            return function(i) {
                return arguments.length ? t.call(this, n.camelCase(i)) : t.call(this)
            }
        }(n.fn.removeData));
        n.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
        n.support.selectstart = "onselectstart" in document.createElement("div");
        n.fn.extend({
            disableSelection: function() {
                return this.bind((n.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(n) {
                    n.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            }
        });
        n.extend(n.ui, {
            plugin: {
                add: function(t, i, r) {
                    var u, f = n.ui[t].prototype;
                    for (u in r) f.plugins[u] = f.plugins[u] || [], f.plugins[u].push([i, r[u]])
                },
                call: function(n, t, i) {
                    var r, u = n.plugins[t];
                    if (u && n.element[0].parentNode && n.element[0].parentNode.nodeType !== 11)
                        for (r = 0; r < u.length; r++) n.options[u[r][0]] && u[r][1].apply(n.element, i)
                }
            },
            hasScroll: function(t, i) {
                if (n(t).css("overflow") === "hidden") return !1;
                var r = i && i === "left" ? "scrollLeft" : "scrollTop",
                    u = !1;
                return t[r] > 0 ? !0 : (t[r] = 1, u = t[r] > 0, t[r] = 0, u)
            }
        })
    }(jQuery), function(n, t) {
        var r = 0,
            i = Array.prototype.slice,
            u = n.cleanData;
        n.cleanData = function(t) {
            for (var i = 0, r;
                (r = t[i]) != null; i++) try {
                n(r).triggerHandler("remove")
            } catch (f) {}
            u(t)
        };
        n.widget = function(t, i, r) {
            var s, f, u, o, h = {},
                e = t.split(".")[0];
            t = t.split(".")[1];
            s = e + "-" + t;
            r || (r = i, i = n.Widget);
            n.expr[":"][s.toLowerCase()] = function(t) {
                return !!n.data(t, s)
            };
            n[e] = n[e] || {};
            f = n[e][t];
            u = n[e][t] = function(n, t) {
                if (!this._createWidget) return new u(n, t);
                arguments.length && this._createWidget(n, t)
            };
            n.extend(u, f, {
                version: r.version,
                _proto: n.extend({}, r),
                _childConstructors: []
            });
            o = new i;
            o.options = n.widget.extend({}, o.options);
            n.each(r, function(t, r) {
                if (!n.isFunction(r)) {
                    h[t] = r;
                    return
                }
                h[t] = function() {
                    var n = function() {
                            return i.prototype[t].apply(this, arguments)
                        },
                        u = function(n) {
                            return i.prototype[t].apply(this, n)
                        };
                    return function() {
                        var i = this._super,
                            f = this._superApply,
                            t;
                        return this._super = n, this._superApply = u, t = r.apply(this, arguments), this._super = i, this._superApply = f, t
                    }
                }()
            });
            u.prototype = n.widget.extend(o, {
                widgetEventPrefix: f ? o.widgetEventPrefix || t : t
            }, h, {
                constructor: u,
                namespace: e,
                widgetName: t,
                widgetFullName: s
            });
            f ? (n.each(f._childConstructors, function(t, i) {
                var r = i.prototype;
                n.widget(r.namespace + "." + r.widgetName, u, i._proto)
            }), delete f._childConstructors) : i._childConstructors.push(u);
            n.widget.bridge(t, u)
        };
        n.widget.extend = function(r) {
            for (var o = i.call(arguments, 1), e = 0, s = o.length, u, f; e < s; e++)
                for (u in o[e]) f = o[e][u], o[e].hasOwnProperty(u) && f !== t && (r[u] = n.isPlainObject(f) ? n.isPlainObject(r[u]) ? n.widget.extend({}, r[u], f) : n.widget.extend({}, f) : f);
            return r
        };
        n.widget.bridge = function(r, u) {
            var f = u.prototype.widgetFullName || r;
            n.fn[r] = function(e) {
                var h = typeof e == "string",
                    o = i.call(arguments, 1),
                    s = this;
                return e = !h && o.length ? n.widget.extend.apply(null, [e].concat(o)) : e, h ? this.each(function() {
                    var i, u = n.data(this, f);
                    return u ? !n.isFunction(u[e]) || e.charAt(0) === "_" ? n.error("no such method '" + e + "' for " + r + " widget instance") : (i = u[e].apply(u, o), i !== u && i !== t ? (s = i && i.jquery ? s.pushStack(i.get()) : i, !1) : void 0) : n.error("cannot call methods on " + r + " prior to initialization; attempted to call method '" + e + "'")
                }) : this.each(function() {
                    var t = n.data(this, f);
                    t ? t.option(e || {})._init() : n.data(this, f, new u(e, this))
                }), s
            }
        };
        n.Widget = function() {};
        n.Widget._childConstructors = [];
        n.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(t, i) {
                i = n(i || this.defaultElement || this)[0];
                this.element = n(i);
                this.uuid = r++;
                this.eventNamespace = "." + this.widgetName + this.uuid;
                this.options = n.widget.extend({}, this.options, this._getCreateOptions(), t);
                this.bindings = n();
                this.hoverable = n();
                this.focusable = n();
                i !== this && (n.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(n) {
                        n.target === i && this.destroy()
                    }
                }), this.document = n(i.style ? i.ownerDocument : i.document || i), this.window = n(this.document[0].defaultView || this.document[0].parentWindow));
                this._create();
                this._trigger("create", null, this._getCreateEventData());
                this._init()
            },
            _getCreateOptions: n.noop,
            _getCreateEventData: n.noop,
            _create: n.noop,
            _init: n.noop,
            destroy: function() {
                this._destroy();
                this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(n.camelCase(this.widgetFullName));
                this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
                this.bindings.unbind(this.eventNamespace);
                this.hoverable.removeClass("ui-state-hover");
                this.focusable.removeClass("ui-state-focus")
            },
            _destroy: n.noop,
            widget: function() {
                return this.element
            },
            option: function(i, r) {
                var o = i,
                    u, f, e;
                if (arguments.length === 0) return n.widget.extend({}, this.options);
                if (typeof i == "string")
                    if (o = {}, u = i.split("."), i = u.shift(), u.length) {
                        for (f = o[i] = n.widget.extend({}, this.options[i]), e = 0; e < u.length - 1; e++) f[u[e]] = f[u[e]] || {}, f = f[u[e]];
                        if (i = u.pop(), arguments.length === 1) return f[i] === t ? null : f[i];
                        f[i] = r
                    } else {
                        if (arguments.length === 1) return this.options[i] === t ? null : this.options[i];
                        o[i] = r
                    }
                return this._setOptions(o), this
            },
            _setOptions: function(n) {
                for (var t in n) this._setOption(t, n[t]);
                return this
            },
            _setOption: function(n, t) {
                return this.options[n] = t, n === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
            },
            enable: function() {
                return this._setOption("disabled", !1)
            },
            disable: function() {
                return this._setOption("disabled", !0)
            },
            _on: function(t, i, r) {
                var f, u = this;
                typeof t != "boolean" && (r = i, i = t, t = !1);
                r ? (i = f = n(i), this.bindings = this.bindings.add(i)) : (r = i, i = this.element, f = this.widget());
                n.each(r, function(r, e) {
                    function o() {
                        if (t || u.options.disabled !== !0 && !n(this).hasClass("ui-state-disabled")) return (typeof e == "string" ? u[e] : e).apply(u, arguments)
                    }
                    typeof e != "string" && (o.guid = e.guid = e.guid || o.guid || n.guid++);
                    var s = r.match(/^(\w+)\s*(.*)$/),
                        h = s[1] + u.eventNamespace,
                        c = s[2];
                    c ? f.delegate(c, h, o) : i.bind(h, o)
                })
            },
            _off: function(n, t) {
                t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
                n.unbind(t).undelegate(t)
            },
            _delay: function(n, t) {
                function r() {
                    return (typeof n == "string" ? i[n] : n).apply(i, arguments)
                }
                var i = this;
                return setTimeout(r, t || 0)
            },
            _hoverable: function(t) {
                this.hoverable = this.hoverable.add(t);
                this._on(t, {
                    mouseenter: function(t) {
                        n(t.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(t) {
                        n(t.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(t) {
                this.focusable = this.focusable.add(t);
                this._on(t, {
                    focusin: function(t) {
                        n(t.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(t) {
                        n(t.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(t, i, r) {
                var u, f, e = this.options[t];
                if (r = r || {}, i = n.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], f = i.originalEvent, f)
                    for (u in f) u in i || (i[u] = f[u]);
                return this.element.trigger(i, r), !(n.isFunction(e) && e.apply(this.element[0], [i].concat(r)) === !1 || i.isDefaultPrevented())
            }
        };
        n.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(t, i) {
            n.Widget.prototype["_" + t] = function(r, u, f) {
                typeof u == "string" && (u = {
                    effect: u
                });
                var o, e = u ? u === !0 || typeof u == "number" ? i : u.effect || i : t;
                u = u || {};
                typeof u == "number" && (u = {
                    duration: u
                });
                o = !n.isEmptyObject(u);
                u.complete = f;
                u.delay && r.delay(u.delay);
                o && n.effects && n.effects.effect[e] ? r[t](u) : e !== t && r[e] ? r[e](u.duration, u.easing, f) : r.queue(function(i) {
                    n(this)[t]();
                    f && f.call(r[0]);
                    i()
                })
            }
        })
    }(jQuery), function(n) {
        var t = !1;
        n(document).mouseup(function() {
            t = !1
        });
        n.widget("ui.mouse", {
            version: "1.10.4",
            options: {
                cancel: "input,textarea,button,select,option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function() {
                var t = this;
                this.element.bind("mousedown." + this.widgetName, function(n) {
                    return t._mouseDown(n)
                }).bind("click." + this.widgetName, function(i) {
                    if (!0 === n.data(i.target, t.widgetName + ".preventClickEvent")) return n.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1
                });
                this.started = !1
            },
            _mouseDestroy: function() {
                this.element.unbind("." + this.widgetName);
                this._mouseMoveDelegate && n(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function(i) {
                if (!t) {
                    this._mouseStarted && this._mouseUp(i);
                    this._mouseDownEvent = i;
                    var r = this,
                        u = i.which === 1,
                        f = typeof this.options.cancel == "string" && i.target.nodeName ? n(i.target).closest(this.options.cancel).length : !1;
                    return !u || f || !this._mouseCapture(i) ? !0 : (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                        r.mouseDelayMet = !0
                    }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted)) ? (i.preventDefault(), !0) : (!0 === n.data(i.target, this.widgetName + ".preventClickEvent") && n.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(n) {
                        return r._mouseMove(n)
                    }, this._mouseUpDelegate = function(n) {
                        return r._mouseUp(n)
                    }, n(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), t = !0, !0)
                }
            },
            _mouseMove: function(t) {
                return n.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
            },
            _mouseUp: function(t) {
                return n(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && n.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
            },
            _mouseDistanceMet: function(n) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - n.pageX), Math.abs(this._mouseDownEvent.pageY - n.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function() {
                return this.mouseDelayMet
            },
            _mouseStart: function() {},
            _mouseDrag: function() {},
            _mouseStop: function() {},
            _mouseCapture: function() {
                return !0
            }
        })
    }(jQuery), function(n, t) {
        function e(n, t, i) {
            return [parseFloat(n[0]) * (a.test(n[0]) ? t / 100 : 1), parseFloat(n[1]) * (a.test(n[1]) ? i / 100 : 1)]
        }

        function r(t, i) {
            return parseInt(n.css(t, i), 10) || 0
        }

        function v(t) {
            var i = t[0];
            return i.nodeType === 9 ? {
                width: t.width(),
                height: t.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : n.isWindow(i) ? {
                width: t.width(),
                height: t.height(),
                offset: {
                    top: t.scrollTop(),
                    left: t.scrollLeft()
                }
            } : i.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: i.pageY,
                    left: i.pageX
                }
            } : {
                width: t.outerWidth(),
                height: t.outerHeight(),
                offset: t.offset()
            }
        }
        n.ui = n.ui || {};
        var f, u = Math.max,
            i = Math.abs,
            o = Math.round,
            s = /left|center|right/,
            h = /top|center|bottom/,
            c = /[\+\-]\d+(\.[\d]+)?%?/,
            l = /^\w+/,
            a = /%$/,
            y = n.fn.position;
        n.position = {
            scrollbarWidth: function() {
                if (f !== t) return f;
                var u, r, i = n("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'><\/div><\/div>"),
                    e = i.children()[0];
                return n("body").append(i), u = e.offsetWidth, i.css("overflow", "scroll"), r = e.offsetWidth, u === r && (r = i[0].clientWidth), i.remove(), f = u - r
            },
            getScrollInfo: function(t) {
                var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                    r = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                    u = i === "scroll" || i === "auto" && t.width < t.element[0].scrollWidth,
                    f = r === "scroll" || r === "auto" && t.height < t.element[0].scrollHeight;
                return {
                    width: f ? n.position.scrollbarWidth() : 0,
                    height: u ? n.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function(t) {
                var i = n(t || window),
                    r = n.isWindow(i[0]),
                    u = !!i[0] && i[0].nodeType === 9;
                return {
                    element: i,
                    isWindow: r,
                    isDocument: u,
                    offset: i.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: i.scrollLeft(),
                    scrollTop: i.scrollTop(),
                    width: r ? i.width() : i.outerWidth(),
                    height: r ? i.height() : i.outerHeight()
                }
            }
        };
        n.fn.position = function(t) {
            if (!t || !t.of) return y.apply(this, arguments);
            t = n.extend({}, t);
            var b, f, a, w, p, d, g = n(t.of),
                tt = n.position.getWithinInfo(t.within),
                it = n.position.getScrollInfo(tt),
                k = (t.collision || "flip").split(" "),
                nt = {};
            return d = v(g), g[0].preventDefault && (t.at = "left top"), f = d.width, a = d.height, w = d.offset, p = n.extend({}, w), n.each(["my", "at"], function() {
                var n = (t[this] || "").split(" "),
                    i, r;
                n.length === 1 && (n = s.test(n[0]) ? n.concat(["center"]) : h.test(n[0]) ? ["center"].concat(n) : ["center", "center"]);
                n[0] = s.test(n[0]) ? n[0] : "center";
                n[1] = h.test(n[1]) ? n[1] : "center";
                i = c.exec(n[0]);
                r = c.exec(n[1]);
                nt[this] = [i ? i[0] : 0, r ? r[0] : 0];
                t[this] = [l.exec(n[0])[0], l.exec(n[1])[0]]
            }), k.length === 1 && (k[1] = k[0]), t.at[0] === "right" ? p.left += f : t.at[0] === "center" && (p.left += f / 2), t.at[1] === "bottom" ? p.top += a : t.at[1] === "center" && (p.top += a / 2), b = e(nt.at, f, a), p.left += b[0], p.top += b[1], this.each(function() {
                var y, d, h = n(this),
                    c = h.outerWidth(),
                    l = h.outerHeight(),
                    rt = r(this, "marginLeft"),
                    ut = r(this, "marginTop"),
                    ft = c + rt + r(this, "marginRight") + it.width,
                    et = l + ut + r(this, "marginBottom") + it.height,
                    s = n.extend({}, p),
                    v = e(nt.my, h.outerWidth(), h.outerHeight());
                t.my[0] === "right" ? s.left -= c : t.my[0] === "center" && (s.left -= c / 2);
                t.my[1] === "bottom" ? s.top -= l : t.my[1] === "center" && (s.top -= l / 2);
                s.left += v[0];
                s.top += v[1];
                n.support.offsetFractions || (s.left = o(s.left), s.top = o(s.top));
                y = {
                    marginLeft: rt,
                    marginTop: ut
                };
                n.each(["left", "top"], function(i, r) {
                    n.ui.position[k[i]] && n.ui.position[k[i]][r](s, {
                        targetWidth: f,
                        targetHeight: a,
                        elemWidth: c,
                        elemHeight: l,
                        collisionPosition: y,
                        collisionWidth: ft,
                        collisionHeight: et,
                        offset: [b[0] + v[0], b[1] + v[1]],
                        my: t.my,
                        at: t.at,
                        within: tt,
                        elem: h
                    })
                });
                t.using && (d = function(n) {
                    var r = w.left - s.left,
                        v = r + f - c,
                        e = w.top - s.top,
                        y = e + a - l,
                        o = {
                            target: {
                                element: g,
                                left: w.left,
                                top: w.top,
                                width: f,
                                height: a
                            },
                            element: {
                                element: h,
                                left: s.left,
                                top: s.top,
                                width: c,
                                height: l
                            },
                            horizontal: v < 0 ? "left" : r > 0 ? "right" : "center",
                            vertical: y < 0 ? "top" : e > 0 ? "bottom" : "middle"
                        };
                    f < c && i(r + v) < f && (o.horizontal = "center");
                    a < l && i(e + y) < a && (o.vertical = "middle");
                    o.important = u(i(r), i(v)) > u(i(e), i(y)) ? "horizontal" : "vertical";
                    t.using.call(this, n, o)
                });
                h.offset(n.extend(s, {
                    using: d
                }))
            })
        };
        n.ui.position = {
                fit: {
                    left: function(n, t) {
                        var e = t.within,
                            r = e.isWindow ? e.scrollLeft : e.offset.left,
                            o = e.width,
                            s = n.left - t.collisionPosition.marginLeft,
                            i = r - s,
                            f = s + t.collisionWidth - o - r,
                            h;
                        t.collisionWidth > o ? i > 0 && f <= 0 ? (h = n.left + i + t.collisionWidth - o - r, n.left += i - h) : n.left = f > 0 && i <= 0 ? r : i > f ? r + o - t.collisionWidth : r : i > 0 ? n.left += i : f > 0 ? n.left -= f : n.left = u(n.left - s, n.left)
                    },
                    top: function(n, t) {
                        var o = t.within,
                            r = o.isWindow ? o.scrollTop : o.offset.top,
                            e = t.within.height,
                            s = n.top - t.collisionPosition.marginTop,
                            i = r - s,
                            f = s + t.collisionHeight - e - r,
                            h;
                        t.collisionHeight > e ? i > 0 && f <= 0 ? (h = n.top + i + t.collisionHeight - e - r, n.top += i - h) : n.top = f > 0 && i <= 0 ? r : i > f ? r + e - t.collisionHeight : r : i > 0 ? n.top += i : f > 0 ? n.top -= f : n.top = u(n.top - s, n.top)
                    }
                },
                flip: {
                    left: function(n, t) {
                        var r = t.within,
                            y = r.offset.left + r.scrollLeft,
                            c = r.width,
                            o = r.isWindow ? r.scrollLeft : r.offset.left,
                            l = n.left - t.collisionPosition.marginLeft,
                            a = l - o,
                            v = l + t.collisionWidth - c - o,
                            u = t.my[0] === "left" ? -t.elemWidth : t.my[0] === "right" ? t.elemWidth : 0,
                            f = t.at[0] === "left" ? t.targetWidth : t.at[0] === "right" ? -t.targetWidth : 0,
                            e = -2 * t.offset[0],
                            s, h;
                        a < 0 ? (s = n.left + u + f + e + t.collisionWidth - c - y, (s < 0 || s < i(a)) && (n.left += u + f + e)) : v > 0 && (h = n.left - t.collisionPosition.marginLeft + u + f + e - o, (h > 0 || i(h) < v) && (n.left += u + f + e))
                    },
                    top: function(n, t) {
                        var r = t.within,
                            y = r.offset.top + r.scrollTop,
                            a = r.height,
                            o = r.isWindow ? r.scrollTop : r.offset.top,
                            v = n.top - t.collisionPosition.marginTop,
                            s = v - o,
                            h = v + t.collisionHeight - a - o,
                            p = t.my[1] === "top",
                            u = p ? -t.elemHeight : t.my[1] === "bottom" ? t.elemHeight : 0,
                            f = t.at[1] === "top" ? t.targetHeight : t.at[1] === "bottom" ? -t.targetHeight : 0,
                            e = -2 * t.offset[1],
                            c, l;
                        s < 0 ? (l = n.top + u + f + e + t.collisionHeight - a - y, n.top + u + f + e > s && (l < 0 || l < i(s)) && (n.top += u + f + e)) : h > 0 && (c = n.top - t.collisionPosition.marginTop + u + f + e - o, n.top + u + f + e > h && (c > 0 || i(c) < h) && (n.top += u + f + e))
                    }
                },
                flipfit: {
                    left: function() {
                        n.ui.position.flip.left.apply(this, arguments);
                        n.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        n.ui.position.flip.top.apply(this, arguments);
                        n.ui.position.fit.top.apply(this, arguments)
                    }
                }
            },
            function() {
                var t, i, r, u, f, e = document.getElementsByTagName("body")[0],
                    o = document.createElement("div");
                t = document.createElement(e ? "div" : "body");
                r = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                };
                e && n.extend(r, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
                for (f in r) t.style[f] = r[f];
                t.appendChild(o);
                i = e || document.documentElement;
                i.insertBefore(t, i.firstChild);
                o.style.cssText = "position: absolute; left: 10.7432222px;";
                u = n(o).offset().left;
                n.support.offsetFractions = u > 10 && u < 11;
                t.innerHTML = "";
                i.removeChild(t)
            }()
    }(jQuery), function(n) {
        n.widget("ui.draggable", n.ui.mouse, {
            version: "1.10.4",
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1,
                drag: null,
                start: null,
                stop: null
            },
            _create: function() {
                this.options.helper !== "original" || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");
                this.options.addClasses && this.element.addClass("ui-draggable");
                this.options.disabled && this.element.addClass("ui-draggable-disabled");
                this._mouseInit()
            },
            _destroy: function() {
                this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
                this._mouseDestroy()
            },
            _mouseCapture: function(t) {
                var i = this.options;
                return this.helper || i.disabled || n(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), !this.handle) ? !1 : (n(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function() {
                    n("<div class='ui-draggable-iframeFix' style='background: #fff;'><\/div>").css({
                        width: this.offsetWidth + "px",
                        height: this.offsetHeight + "px",
                        position: "absolute",
                        opacity: "0.001",
                        zIndex: 1e3
                    }).css(n(this).offset()).appendTo("body")
                }), !0)
            },
            _mouseStart: function(t) {
                var i = this.options;
                return (this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), n.ui.ddmanager && (n.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, this.offset.scroll = !1, n.extend(this.offset, {
                    click: {
                        left: t.pageX - this.offset.left,
                        top: t.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", t) === !1) ? (this._clear(), !1) : (this._cacheHelperProportions(), n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), n.ui.ddmanager && n.ui.ddmanager.dragStart(this, t), !0)
            },
            _mouseDrag: function(t, i) {
                if (this.offsetParentCssPosition === "fixed" && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                    var r = this._uiHash();
                    if (this._trigger("drag", t, r) === !1) return this._mouseUp({}), !1;
                    this.position = r.position
                }
                return this.options.axis && this.options.axis === "y" || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && this.options.axis === "x" || (this.helper[0].style.top = this.position.top + "px"), n.ui.ddmanager && n.ui.ddmanager.drag(this, t), !1
            },
            _mouseStop: function(t) {
                var r = this,
                    i = !1;
                return (n.ui.ddmanager && !this.options.dropBehaviour && (i = n.ui.ddmanager.drop(this, t)), this.dropped && (i = this.dropped, this.dropped = !1), this.options.helper === "original" && !n.contains(this.element[0].ownerDocument, this.element[0])) ? !1 : (this.options.revert === "invalid" && !i || this.options.revert === "valid" && i || this.options.revert === !0 || n.isFunction(this.options.revert) && this.options.revert.call(this.element, i) ? n(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    r._trigger("stop", t) !== !1 && r._clear()
                }) : this._trigger("stop", t) !== !1 && this._clear(), !1)
            },
            _mouseUp: function(t) {
                return n("div.ui-draggable-iframeFix").each(function() {
                    this.parentNode.removeChild(this)
                }), n.ui.ddmanager && n.ui.ddmanager.dragStop(this, t), n.ui.mouse.prototype._mouseUp.call(this, t)
            },
            cancel: function() {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
            },
            _getHandle: function(t) {
                return this.options.handle ? !!n(t.target).closest(this.element.find(this.options.handle)).length : !0
            },
            _createHelper: function(t) {
                var r = this.options,
                    i = n.isFunction(r.helper) ? n(r.helper.apply(this.element[0], [t])) : r.helper === "clone" ? this.element.clone().removeAttr("id") : this.element;
                return i.parents("body").length || i.appendTo(r.appendTo === "parent" ? this.element[0].parentNode : r.appendTo), i[0] === this.element[0] || /(fixed|absolute)/.test(i.css("position")) || i.css("position", "absolute"), i
            },
            _adjustOffsetFromHelper: function(t) {
                typeof t == "string" && (t = t.split(" "));
                n.isArray(t) && (t = {
                    left: +t[0],
                    top: +t[1] || 0
                });
                "left" in t && (this.offset.click.left = t.left + this.margins.left);
                "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left);
                "top" in t && (this.offset.click.top = t.top + this.margins.top);
                "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                var t = this.offsetParent.offset();
                return this.cssPosition === "absolute" && this.scrollParent[0] !== document && n.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && n.ui.ie) && (t = {
                    top: 0,
                    left: 0
                }), {
                    top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if (this.cssPosition === "relative") {
                    var n = this.element.position();
                    return {
                        top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var u, t, i, r = this.options;
                if (!r.containment) {
                    this.containment = null;
                    return
                }
                if (r.containment === "window") {
                    this.containment = [n(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, n(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, n(window).scrollLeft() + n(window).width() - this.helperProportions.width - this.margins.left, n(window).scrollTop() + (n(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                    return
                }
                if (r.containment === "document") {
                    this.containment = [0, 0, n(document).width() - this.helperProportions.width - this.margins.left, (n(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                    return
                }
                if (r.containment.constructor === Array) {
                    this.containment = r.containment;
                    return
                }(r.containment === "parent" && (r.containment = this.helper[0].parentNode), t = n(r.containment), i = t[0], i) && (u = t.css("overflow") !== "hidden", this.containment = [(parseInt(t.css("borderLeftWidth"), 10) || 0) + (parseInt(t.css("paddingLeft"), 10) || 0), (parseInt(t.css("borderTopWidth"), 10) || 0) + (parseInt(t.css("paddingTop"), 10) || 0), (u ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(t.css("borderRightWidth"), 10) || 0) - (parseInt(t.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (u ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(t.css("borderBottomWidth"), 10) || 0) - (parseInt(t.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = t)
            },
            _convertPositionTo: function(t, i) {
                i || (i = this.position);
                var r = t === "absolute" ? 1 : -1,
                    u = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && n.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent;
                return this.offset.scroll || (this.offset.scroll = {
                    top: u.scrollTop(),
                    left: u.scrollLeft()
                }), {
                    top: i.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * r,
                    left: i.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * r
                }
            },
            _generatePosition: function(t) {
                var i, e, u, f, r = this.options,
                    h = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && n.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                    o = t.pageX,
                    s = t.pageY;
                return this.offset.scroll || (this.offset.scroll = {
                    top: h.scrollTop(),
                    left: h.scrollLeft()
                }), this.originalPosition && (this.containment && (this.relative_container ? (e = this.relative_container.offset(), i = [this.containment[0] + e.left, this.containment[1] + e.top, this.containment[2] + e.left, this.containment[3] + e.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (o = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (s = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (o = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (s = i[3] + this.offset.click.top)), r.grid && (u = r.grid[1] ? this.originalPageY + Math.round((s - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY, s = i ? u - this.offset.click.top >= i[1] || u - this.offset.click.top > i[3] ? u : u - this.offset.click.top >= i[1] ? u - r.grid[1] : u + r.grid[1] : u, f = r.grid[0] ? this.originalPageX + Math.round((o - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX, o = i ? f - this.offset.click.left >= i[0] || f - this.offset.click.left > i[2] ? f : f - this.offset.click.left >= i[0] ? f - r.grid[0] : f + r.grid[0] : f)), {
                    top: s - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                    left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
                }
            },
            _clear: function() {
                this.helper.removeClass("ui-draggable-dragging");
                this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove();
                this.helper = null;
                this.cancelHelperRemoval = !1
            },
            _trigger: function(t, i, r) {
                return r = r || this._uiHash(), n.ui.plugin.call(this, t, [i, r]), t === "drag" && (this.positionAbs = this._convertPositionTo("absolute")), n.Widget.prototype._trigger.call(this, t, i, r)
            },
            plugins: {},
            _uiHash: function() {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                }
            }
        });
        n.ui.plugin.add("draggable", "connectToSortable", {
            start: function(t, i) {
                var r = n(this).data("ui-draggable"),
                    u = r.options,
                    f = n.extend({}, i, {
                        item: r.element
                    });
                r.sortables = [];
                n(u.connectToSortable).each(function() {
                    var i = n.data(this, "ui-sortable");
                    i && !i.options.disabled && (r.sortables.push({
                        instance: i,
                        shouldRevert: i.options.revert
                    }), i.refreshPositions(), i._trigger("activate", t, f))
                })
            },
            stop: function(t, i) {
                var r = n(this).data("ui-draggable"),
                    u = n.extend({}, i, {
                        item: r.element
                    });
                n.each(r.sortables, function() {
                    this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, r.options.helper === "original" && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, u))
                })
            },
            drag: function(t, i) {
                var r = n(this).data("ui-draggable"),
                    u = this;
                n.each(r.sortables, function() {
                    var f = !1,
                        e = this;
                    this.instance.positionAbs = r.positionAbs;
                    this.instance.helperProportions = r.helperProportions;
                    this.instance.offset.click = r.offset.click;
                    this.instance._intersectsWith(this.instance.containerCache) && (f = !0, n.each(r.sortables, function() {
                        return this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this !== e && this.instance._intersectsWith(this.instance.containerCache) && n.contains(e.instance.element[0], this.instance.element[0]) && (f = !1), f
                    }));
                    f ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = n(u).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                        return i.helper[0]
                    }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", t), r.dropped = !1)
                })
            }
        });
        n.ui.plugin.add("draggable", "cursor", {
            start: function() {
                var t = n("body"),
                    i = n(this).data("ui-draggable").options;
                t.css("cursor") && (i._cursor = t.css("cursor"));
                t.css("cursor", i.cursor)
            },
            stop: function() {
                var t = n(this).data("ui-draggable").options;
                t._cursor && n("body").css("cursor", t._cursor)
            }
        });
        n.ui.plugin.add("draggable", "opacity", {
            start: function(t, i) {
                var r = n(i.helper),
                    u = n(this).data("ui-draggable").options;
                r.css("opacity") && (u._opacity = r.css("opacity"));
                r.css("opacity", u.opacity)
            },
            stop: function(t, i) {
                var r = n(this).data("ui-draggable").options;
                r._opacity && n(i.helper).css("opacity", r._opacity)
            }
        });
        n.ui.plugin.add("draggable", "scroll", {
            start: function() {
                var t = n(this).data("ui-draggable");
                t.scrollParent[0] !== document && t.scrollParent[0].tagName !== "HTML" && (t.overflowOffset = t.scrollParent.offset())
            },
            drag: function(t) {
                var r = n(this).data("ui-draggable"),
                    i = r.options,
                    u = !1;
                r.scrollParent[0] !== document && r.scrollParent[0].tagName !== "HTML" ? (i.axis && i.axis === "x" || (r.overflowOffset.top + r.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? r.scrollParent[0].scrollTop = u = r.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - r.overflowOffset.top < i.scrollSensitivity && (r.scrollParent[0].scrollTop = u = r.scrollParent[0].scrollTop - i.scrollSpeed)), i.axis && i.axis === "y" || (r.overflowOffset.left + r.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? r.scrollParent[0].scrollLeft = u = r.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - r.overflowOffset.left < i.scrollSensitivity && (r.scrollParent[0].scrollLeft = u = r.scrollParent[0].scrollLeft - i.scrollSpeed))) : (i.axis && i.axis === "x" || (t.pageY - n(document).scrollTop() < i.scrollSensitivity ? u = n(document).scrollTop(n(document).scrollTop() - i.scrollSpeed) : n(window).height() - (t.pageY - n(document).scrollTop()) < i.scrollSensitivity && (u = n(document).scrollTop(n(document).scrollTop() + i.scrollSpeed))), i.axis && i.axis === "y" || (t.pageX - n(document).scrollLeft() < i.scrollSensitivity ? u = n(document).scrollLeft(n(document).scrollLeft() - i.scrollSpeed) : n(window).width() - (t.pageX - n(document).scrollLeft()) < i.scrollSensitivity && (u = n(document).scrollLeft(n(document).scrollLeft() + i.scrollSpeed))));
                u !== !1 && n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(r, t)
            }
        });
        n.ui.plugin.add("draggable", "snap", {
            start: function() {
                var t = n(this).data("ui-draggable"),
                    i = t.options;
                t.snapElements = [];
                n(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function() {
                    var i = n(this),
                        r = i.offset();
                    this !== t.element[0] && t.snapElements.push({
                        item: this,
                        width: i.outerWidth(),
                        height: i.outerHeight(),
                        top: r.top,
                        left: r.left
                    })
                })
            },
            drag: function(t, i) {
                for (var e, o, s, h, c, a, l, v, w, r = n(this).data("ui-draggable"), b = r.options, f = b.snapTolerance, y = i.offset.left, k = y + r.helperProportions.width, p = i.offset.top, d = p + r.helperProportions.height, u = r.snapElements.length - 1; u >= 0; u--) {
                    if (c = r.snapElements[u].left, a = c + r.snapElements[u].width, l = r.snapElements[u].top, v = l + r.snapElements[u].height, k < c - f || y > a + f || d < l - f || p > v + f || !n.contains(r.snapElements[u].item.ownerDocument, r.snapElements[u].item)) {
                        r.snapElements[u].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, n.extend(r._uiHash(), {
                            snapItem: r.snapElements[u].item
                        }));
                        r.snapElements[u].snapping = !1;
                        continue
                    }
                    b.snapMode !== "inner" && (e = Math.abs(l - d) <= f, o = Math.abs(v - p) <= f, s = Math.abs(c - k) <= f, h = Math.abs(a - y) <= f, e && (i.position.top = r._convertPositionTo("relative", {
                        top: l - r.helperProportions.height,
                        left: 0
                    }).top - r.margins.top), o && (i.position.top = r._convertPositionTo("relative", {
                        top: v,
                        left: 0
                    }).top - r.margins.top), s && (i.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: c - r.helperProportions.width
                    }).left - r.margins.left), h && (i.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: a
                    }).left - r.margins.left));
                    w = e || o || s || h;
                    b.snapMode !== "outer" && (e = Math.abs(l - p) <= f, o = Math.abs(v - d) <= f, s = Math.abs(c - y) <= f, h = Math.abs(a - k) <= f, e && (i.position.top = r._convertPositionTo("relative", {
                        top: l,
                        left: 0
                    }).top - r.margins.top), o && (i.position.top = r._convertPositionTo("relative", {
                        top: v - r.helperProportions.height,
                        left: 0
                    }).top - r.margins.top), s && (i.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: c
                    }).left - r.margins.left), h && (i.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: a - r.helperProportions.width
                    }).left - r.margins.left));
                    !r.snapElements[u].snapping && (e || o || s || h || w) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, n.extend(r._uiHash(), {
                        snapItem: r.snapElements[u].item
                    }));
                    r.snapElements[u].snapping = e || o || s || h || w
                }
            }
        });
        n.ui.plugin.add("draggable", "stack", {
            start: function() {
                var i, r = this.data("ui-draggable").options,
                    t = n.makeArray(n(r.stack)).sort(function(t, i) {
                        return (parseInt(n(t).css("zIndex"), 10) || 0) - (parseInt(n(i).css("zIndex"), 10) || 0)
                    });
                t.length && (i = parseInt(n(t[0]).css("zIndex"), 10) || 0, n(t).each(function(t) {
                    n(this).css("zIndex", i + t)
                }), this.css("zIndex", i + t.length))
            }
        });
        n.ui.plugin.add("draggable", "zIndex", {
            start: function(t, i) {
                var r = n(i.helper),
                    u = n(this).data("ui-draggable").options;
                r.css("zIndex") && (u._zIndex = r.css("zIndex"));
                r.css("zIndex", u.zIndex)
            },
            stop: function(t, i) {
                var r = n(this).data("ui-draggable").options;
                r._zIndex && n(i.helper).css("zIndex", r._zIndex)
            }
        })
    }(jQuery), function(n) {
        function t(n, t, i) {
            return n > t && n < t + i
        }
        n.widget("ui.droppable", {
            version: "1.10.4",
            widgetEventPrefix: "drop",
            options: {
                accept: "*",
                activeClass: !1,
                addClasses: !0,
                greedy: !1,
                hoverClass: !1,
                scope: "default",
                tolerance: "intersect",
                activate: null,
                deactivate: null,
                drop: null,
                out: null,
                over: null
            },
            _create: function() {
                var i, t = this.options,
                    r = t.accept;
                this.isover = !1;
                this.isout = !0;
                this.accept = n.isFunction(r) ? r : function(n) {
                    return n.is(r)
                };
                this.proportions = function() {
                    if (arguments.length) i = arguments[0];
                    else return i ? i : i = {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight
                    }
                };
                n.ui.ddmanager.droppables[t.scope] = n.ui.ddmanager.droppables[t.scope] || [];
                n.ui.ddmanager.droppables[t.scope].push(this);
                t.addClasses && this.element.addClass("ui-droppable")
            },
            _destroy: function() {
                for (var t = 0, i = n.ui.ddmanager.droppables[this.options.scope]; t < i.length; t++) i[t] === this && i.splice(t, 1);
                this.element.removeClass("ui-droppable ui-droppable-disabled")
            },
            _setOption: function(t, i) {
                t === "accept" && (this.accept = n.isFunction(i) ? i : function(n) {
                    return n.is(i)
                });
                n.Widget.prototype._setOption.apply(this, arguments)
            },
            _activate: function(t) {
                var i = n.ui.ddmanager.current;
                this.options.activeClass && this.element.addClass(this.options.activeClass);
                i && this._trigger("activate", t, this.ui(i))
            },
            _deactivate: function(t) {
                var i = n.ui.ddmanager.current;
                this.options.activeClass && this.element.removeClass(this.options.activeClass);
                i && this._trigger("deactivate", t, this.ui(i))
            },
            _over: function(t) {
                var i = n.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(i)))
            },
            _out: function(t) {
                var i = n.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(i)))
            },
            _drop: function(t, i) {
                var r = i || n.ui.ddmanager.current,
                    u = !1;
                return !r || (r.currentItem || r.element)[0] === this.element[0] ? !1 : (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                    var t = n.data(this, "ui-droppable");
                    if (t.options.greedy && !t.options.disabled && t.options.scope === r.options.scope && t.accept.call(t.element[0], r.currentItem || r.element) && n.ui.intersect(r, n.extend(t, {
                            offset: t.element.offset()
                        }), t.options.tolerance)) return u = !0, !1
                }), u) ? !1 : this.accept.call(this.element[0], r.currentItem || r.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(r)), this.element) : !1
            },
            ui: function(n) {
                return {
                    draggable: n.currentItem || n.element,
                    helper: n.helper,
                    position: n.position,
                    offset: n.positionAbs
                }
            }
        });
        n.ui.intersect = function(n, i, r) {
            if (!i.offset) return !1;
            var a, v, e = (n.positionAbs || n.position.absolute).left,
                o = (n.positionAbs || n.position.absolute).top,
                s = e + n.helperProportions.width,
                h = o + n.helperProportions.height,
                u = i.offset.left,
                f = i.offset.top,
                c = u + i.proportions().width,
                l = f + i.proportions().height;
            switch (r) {
                case "fit":
                    return u <= e && s <= c && f <= o && h <= l;
                case "intersect":
                    return u < e + n.helperProportions.width / 2 && s - n.helperProportions.width / 2 < c && f < o + n.helperProportions.height / 2 && h - n.helperProportions.height / 2 < l;
                case "pointer":
                    return a = (n.positionAbs || n.position.absolute).left + (n.clickOffset || n.offset.click).left, v = (n.positionAbs || n.position.absolute).top + (n.clickOffset || n.offset.click).top, t(v, f, i.proportions().height) && t(a, u, i.proportions().width);
                case "touch":
                    return (o >= f && o <= l || h >= f && h <= l || o < f && h > l) && (e >= u && e <= c || s >= u && s <= c || e < u && s > c);
                default:
                    return !1
            }
        };
        n.ui.ddmanager = {
            current: null,
            droppables: {
                "default": []
            },
            prepareOffsets: function(t, i) {
                var r, f, u = n.ui.ddmanager.droppables[t.options.scope] || [],
                    o = i ? i.type : null,
                    e = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
                n: for (r = 0; r < u.length; r++)
                    if (!u[r].options.disabled && (!t || u[r].accept.call(u[r].element[0], t.currentItem || t.element))) {
                        for (f = 0; f < e.length; f++)
                            if (e[f] === u[r].element[0]) {
                                u[r].proportions().height = 0;
                                continue n
                            }(u[r].visible = u[r].element.css("display") !== "none", u[r].visible) && (o === "mousedown" && u[r]._activate.call(u[r], i), u[r].offset = u[r].element.offset(), u[r].proportions({
                                width: u[r].element[0].offsetWidth,
                                height: u[r].element[0].offsetHeight
                            }))
                    }
            },
            drop: function(t, i) {
                var r = !1;
                return n.each((n.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() {
                    this.options && (!this.options.disabled && this.visible && n.ui.intersect(t, this, this.options.tolerance) && (r = this._drop.call(this, i) || r), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
                }), r
            },
            dragStart: function(t, i) {
                t.element.parentsUntil("body").bind("scroll.droppable", function() {
                    t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i)
                })
            },
            drag: function(t, i) {
                t.options.refreshPositions && n.ui.ddmanager.prepareOffsets(t, i);
                n.each(n.ui.ddmanager.droppables[t.options.scope] || [], function() {
                    if (!this.options.disabled && !this.greedyChild && this.visible) {
                        var r, e, f, o = n.ui.intersect(t, this, this.options.tolerance),
                            u = !o && this.isover ? "isout" : o && !this.isover ? "isover" : null;
                        u && (this.options.greedy && (e = this.options.scope, f = this.element.parents(":data(ui-droppable)").filter(function() {
                            return n.data(this, "ui-droppable").options.scope === e
                        }), f.length && (r = n.data(f[0], "ui-droppable"), r.greedyChild = u === "isover")), r && u === "isover" && (r.isover = !1, r.isout = !0, r._out.call(r, i)), this[u] = !0, this[u === "isout" ? "isover" : "isout"] = !1, this[u === "isover" ? "_over" : "_out"].call(this, i), r && u === "isout" && (r.isout = !1, r.isover = !0, r._over.call(r, i)))
                    }
                })
            },
            dragStop: function(t, i) {
                t.element.parentsUntil("body").unbind("scroll.droppable");
                t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i)
            }
        }
    }(jQuery), function(n) {
        function i(n) {
            return parseInt(n, 10) || 0
        }

        function t(n) {
            return !isNaN(parseInt(n, 10))
        }
        n.widget("ui.resizable", n.ui.mouse, {
            version: "1.10.4",
            widgetEventPrefix: "resize",
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: "slow",
                animateEasing: "swing",
                aspectRatio: !1,
                autoHide: !1,
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: "e,s,se",
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 90,
                resize: null,
                start: null,
                stop: null
            },
            _create: function() {
                var e, f, r, i, o, u = this,
                    t = this.options;
                if (this.element.addClass("ui-resizable"), n.extend(this, {
                        _aspectRatio: !!t.aspectRatio,
                        aspectRatio: t.aspectRatio,
                        originalElement: this.element,
                        _proportionallyResizeElements: [],
                        _helper: t.helper || t.ghost || t.animate ? t.helper || "ui-resizable-helper" : null
                    }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(n("<div class='ui-wrapper' style='overflow: hidden;'><\/div>").css({
                        position: this.element.css("position"),
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight(),
                        top: this.element.css("top"),
                        left: this.element.css("left")
                    })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({
                        marginLeft: this.originalElement.css("marginLeft"),
                        marginTop: this.originalElement.css("marginTop"),
                        marginRight: this.originalElement.css("marginRight"),
                        marginBottom: this.originalElement.css("marginBottom")
                    }), this.originalElement.css({
                        marginLeft: 0,
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                        position: "static",
                        zoom: 1,
                        display: "block"
                    })), this.originalElement.css({
                        margin: this.originalElement.css("margin")
                    }), this._proportionallyResize()), this.handles = t.handles || (n(".ui-resizable-handle", this.element).length ? {
                        n: ".ui-resizable-n",
                        e: ".ui-resizable-e",
                        s: ".ui-resizable-s",
                        w: ".ui-resizable-w",
                        se: ".ui-resizable-se",
                        sw: ".ui-resizable-sw",
                        ne: ".ui-resizable-ne",
                        nw: ".ui-resizable-nw"
                    } : "e,s,se"), this.handles.constructor === String)
                    for (this.handles === "all" && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, f = 0; f < e.length; f++) r = n.trim(e[f]), o = "ui-resizable-" + r, i = n("<div class='ui-resizable-handle " + o + "'><\/div>"), i.css({
                        zIndex: t.zIndex
                    }), "se" === r && i.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[r] = ".ui-resizable-" + r, this.element.append(i);
                this._renderAxis = function(t) {
                    var i, r, u, f;
                    t = t || this.element;
                    for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = n(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (r = n(this.handles[i], this.element), f = /sw|ne|nw|se|n|s/.test(i) ? r.outerHeight() : r.outerWidth(), u = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), t.css(u, f), this._proportionallyResize()), !n(this.handles[i]).length
                };
                this._renderAxis(this.element);
                this._handles = n(".ui-resizable-handle", this.element).disableSelection();
                this._handles.mouseover(function() {
                    u.resizing || (this.className && (i = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), u.axis = i && i[1] ? i[1] : "se")
                });
                t.autoHide && (this._handles.hide(), n(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                    t.disabled || (n(this).removeClass("ui-resizable-autohide"), u._handles.show())
                }).mouseleave(function() {
                    t.disabled || u.resizing || (n(this).addClass("ui-resizable-autohide"), u._handles.hide())
                }));
                this._mouseInit()
            },
            _destroy: function() {
                this._mouseDestroy();
                var t, i = function(t) {
                    n(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                };
                return this.elementIsWrapper && (i(this.element), t = this.element, this.originalElement.css({
                    position: t.css("position"),
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    top: t.css("top"),
                    left: t.css("left")
                }).insertAfter(t), t.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
            },
            _mouseCapture: function(t) {
                var r, i, u = !1;
                for (r in this.handles) i = n(this.handles[r])[0], (i === t.target || n.contains(i, t.target)) && (u = !0);
                return !this.options.disabled && u
            },
            _mouseStart: function(t) {
                var f, e, o, u = this.options,
                    s = this.element.position(),
                    r = this.element;
                return this.resizing = !0, /absolute/.test(r.css("position")) ? r.css({
                    position: "absolute",
                    top: r.css("top"),
                    left: r.css("left")
                }) : r.is(".ui-draggable") && r.css({
                    position: "absolute",
                    top: s.top,
                    left: s.left
                }), this._renderProxy(), f = i(this.helper.css("left")), e = i(this.helper.css("top")), u.containment && (f += n(u.containment).scrollLeft() || 0, e += n(u.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                    left: f,
                    top: e
                }, this.size = this._helper ? {
                    width: this.helper.width(),
                    height: this.helper.height()
                } : {
                    width: r.width(),
                    height: r.height()
                }, this.originalSize = this._helper ? {
                    width: r.outerWidth(),
                    height: r.outerHeight()
                } : {
                    width: r.width(),
                    height: r.height()
                }, this.originalPosition = {
                    left: f,
                    top: e
                }, this.sizeDiff = {
                    width: r.outerWidth() - r.width(),
                    height: r.outerHeight() - r.height()
                }, this.originalMousePosition = {
                    left: t.pageX,
                    top: t.pageY
                }, this.aspectRatio = typeof u.aspectRatio == "number" ? u.aspectRatio : this.originalSize.width / this.originalSize.height || 1, o = n(".ui-resizable-" + this.axis).css("cursor"), n("body").css("cursor", o === "auto" ? this.axis + "-resize" : o), r.addClass("ui-resizable-resizing"), this._propagate("start", t), !0
            },
            _mouseDrag: function(t) {
                var i, e = this.helper,
                    r = {},
                    u = this.originalMousePosition,
                    o = this.axis,
                    s = this.position.top,
                    h = this.position.left,
                    c = this.size.width,
                    l = this.size.height,
                    a = t.pageX - u.left || 0,
                    v = t.pageY - u.top || 0,
                    f = this._change[o];
                return f ? (i = f.apply(this, [t, a, v]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._updateCache(i), this._propagate("resize", t), this.position.top !== s && (r.top = this.position.top + "px"), this.position.left !== h && (r.left = this.position.left + "px"), this.size.width !== c && (r.width = this.size.width + "px"), this.size.height !== l && (r.height = this.size.height + "px"), e.css(r), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), n.isEmptyObject(r) || this._trigger("resize", t, this.ui()), !1) : !1
            },
            _mouseStop: function(t) {
                this.resizing = !1;
                var r, u, f, e, o, s, h, c = this.options,
                    i = this;
                return this._helper && (r = this._proportionallyResizeElements, u = r.length && /textarea/i.test(r[0].nodeName), f = u && n.ui.hasScroll(r[0], "left") ? 0 : i.sizeDiff.height, e = u ? 0 : i.sizeDiff.width, o = {
                    width: i.helper.width() - e,
                    height: i.helper.height() - f
                }, s = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null, h = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null, c.animate || this.element.css(n.extend(o, {
                    top: h,
                    left: s
                })), i.helper.height(i.size.height), i.helper.width(i.size.width), this._helper && !c.animate && this._proportionallyResize()), n("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
            },
            _updateVirtualBoundaries: function(n) {
                var u, f, e, o, i, r = this.options;
                i = {
                    minWidth: t(r.minWidth) ? r.minWidth : 0,
                    maxWidth: t(r.maxWidth) ? r.maxWidth : Infinity,
                    minHeight: t(r.minHeight) ? r.minHeight : 0,
                    maxHeight: t(r.maxHeight) ? r.maxHeight : Infinity
                };
                (this._aspectRatio || n) && (u = i.minHeight * this.aspectRatio, e = i.minWidth / this.aspectRatio, f = i.maxHeight * this.aspectRatio, o = i.maxWidth / this.aspectRatio, u > i.minWidth && (i.minWidth = u), e > i.minHeight && (i.minHeight = e), f < i.maxWidth && (i.maxWidth = f), o < i.maxHeight && (i.maxHeight = o));
                this._vBoundaries = i
            },
            _updateCache: function(n) {
                this.offset = this.helper.offset();
                t(n.left) && (this.position.left = n.left);
                t(n.top) && (this.position.top = n.top);
                t(n.height) && (this.size.height = n.height);
                t(n.width) && (this.size.width = n.width)
            },
            _updateRatio: function(n) {
                var i = this.position,
                    r = this.size,
                    u = this.axis;
                return t(n.height) ? n.width = n.height * this.aspectRatio : t(n.width) && (n.height = n.width / this.aspectRatio), u === "sw" && (n.left = i.left + (r.width - n.width), n.top = null), u === "nw" && (n.top = i.top + (r.height - n.height), n.left = i.left + (r.width - n.width)), n
            },
            _respectSize: function(n) {
                var i = this._vBoundaries,
                    r = this.axis,
                    u = t(n.width) && i.maxWidth && i.maxWidth < n.width,
                    f = t(n.height) && i.maxHeight && i.maxHeight < n.height,
                    e = t(n.width) && i.minWidth && i.minWidth > n.width,
                    o = t(n.height) && i.minHeight && i.minHeight > n.height,
                    s = this.originalPosition.left + this.originalSize.width,
                    h = this.position.top + this.size.height,
                    c = /sw|nw|w/.test(r),
                    l = /nw|ne|n/.test(r);
                return e && (n.width = i.minWidth), o && (n.height = i.minHeight), u && (n.width = i.maxWidth), f && (n.height = i.maxHeight), e && c && (n.left = s - i.minWidth), u && c && (n.left = s - i.maxWidth), o && l && (n.top = h - i.minHeight), f && l && (n.top = h - i.maxHeight), n.width || n.height || n.left || !n.top ? n.width || n.height || n.top || !n.left || (n.left = null) : n.top = null, n
            },
            _proportionallyResize: function() {
                if (this._proportionallyResizeElements.length)
                    for (var t, i, u, n, f = this.helper || this.element, r = 0; r < this._proportionallyResizeElements.length; r++) {
                        if (n = this._proportionallyResizeElements[r], !this.borderDif)
                            for (this.borderDif = [], i = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")], u = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")], t = 0; t < i.length; t++) this.borderDif[t] = (parseInt(i[t], 10) || 0) + (parseInt(u[t], 10) || 0);
                        n.css({
                            height: f.height() - this.borderDif[0] - this.borderDif[2] || 0,
                            width: f.width() - this.borderDif[1] - this.borderDif[3] || 0
                        })
                    }
            },
            _renderProxy: function() {
                var t = this.element,
                    i = this.options;
                this.elementOffset = t.offset();
                this._helper ? (this.helper = this.helper || n("<div style='overflow:hidden;'><\/div>"), this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() - 1,
                    height: this.element.outerHeight() - 1,
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++i.zIndex
                }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
            },
            _change: {
                e: function(n, t) {
                    return {
                        width: this.originalSize.width + t
                    }
                },
                w: function(n, t) {
                    var i = this.originalSize,
                        r = this.originalPosition;
                    return {
                        left: r.left + t,
                        width: i.width - t
                    }
                },
                n: function(n, t, i) {
                    var r = this.originalSize,
                        u = this.originalPosition;
                    return {
                        top: u.top + i,
                        height: r.height - i
                    }
                },
                s: function(n, t, i) {
                    return {
                        height: this.originalSize.height + i
                    }
                },
                se: function(t, i, r) {
                    return n.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
                },
                sw: function(t, i, r) {
                    return n.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
                },
                ne: function(t, i, r) {
                    return n.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
                },
                nw: function(t, i, r) {
                    return n.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
                }
            },
            _propagate: function(t, i) {
                n.ui.plugin.call(this, t, [i, this.ui()]);
                t !== "resize" && this._trigger(t, i, this.ui())
            },
            plugins: {},
            ui: function() {
                return {
                    originalElement: this.originalElement,
                    element: this.element,
                    helper: this.helper,
                    position: this.position,
                    size: this.size,
                    originalSize: this.originalSize,
                    originalPosition: this.originalPosition
                }
            }
        });
        n.ui.plugin.add("resizable", "animate", {
            stop: function(t) {
                var i = n(this).data("ui-resizable"),
                    u = i.options,
                    r = i._proportionallyResizeElements,
                    f = r.length && /textarea/i.test(r[0].nodeName),
                    s = f && n.ui.hasScroll(r[0], "left") ? 0 : i.sizeDiff.height,
                    h = f ? 0 : i.sizeDiff.width,
                    c = {
                        width: i.size.width - h,
                        height: i.size.height - s
                    },
                    e = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
                    o = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
                i.element.animate(n.extend(c, o && e ? {
                    top: o,
                    left: e
                } : {}), {
                    duration: u.animateDuration,
                    easing: u.animateEasing,
                    step: function() {
                        var u = {
                            width: parseInt(i.element.css("width"), 10),
                            height: parseInt(i.element.css("height"), 10),
                            top: parseInt(i.element.css("top"), 10),
                            left: parseInt(i.element.css("left"), 10)
                        };
                        r && r.length && n(r[0]).css({
                            width: u.width,
                            height: u.height
                        });
                        i._updateCache(u);
                        i._propagate("resize", t)
                    }
                })
            }
        });
        n.ui.plugin.add("resizable", "containment", {
            start: function() {
                var u, e, o, s, h, c, l, t = n(this).data("ui-resizable"),
                    a = t.options,
                    v = t.element,
                    f = a.containment,
                    r = f instanceof n ? f.get(0) : /parent/.test(f) ? v.parent().get(0) : f;
                r && (t.containerElement = n(r), /document/.test(f) || f === document ? (t.containerOffset = {
                    left: 0,
                    top: 0
                }, t.containerPosition = {
                    left: 0,
                    top: 0
                }, t.parentData = {
                    element: n(document),
                    left: 0,
                    top: 0,
                    width: n(document).width(),
                    height: n(document).height() || document.body.parentNode.scrollHeight
                }) : (u = n(r), e = [], n(["Top", "Right", "Left", "Bottom"]).each(function(n, t) {
                    e[n] = i(u.css("padding" + t))
                }), t.containerOffset = u.offset(), t.containerPosition = u.position(), t.containerSize = {
                    height: u.innerHeight() - e[3],
                    width: u.innerWidth() - e[1]
                }, o = t.containerOffset, s = t.containerSize.height, h = t.containerSize.width, c = n.ui.hasScroll(r, "left") ? r.scrollWidth : h, l = n.ui.hasScroll(r) ? r.scrollHeight : s, t.parentData = {
                    element: r,
                    left: o.left,
                    top: o.top,
                    width: c,
                    height: l
                }))
            },
            resize: function(t) {
                var f, o, s, h, i = n(this).data("ui-resizable"),
                    a = i.options,
                    r = i.containerOffset,
                    c = i.position,
                    e = i._aspectRatio || t.shiftKey,
                    u = {
                        top: 0,
                        left: 0
                    },
                    l = i.containerElement;
                l[0] !== document && /static/.test(l.css("position")) && (u = r);
                c.left < (i._helper ? r.left : 0) && (i.size.width = i.size.width + (i._helper ? i.position.left - r.left : i.position.left - u.left), e && (i.size.height = i.size.width / i.aspectRatio), i.position.left = a.helper ? r.left : 0);
                c.top < (i._helper ? r.top : 0) && (i.size.height = i.size.height + (i._helper ? i.position.top - r.top : i.position.top), e && (i.size.width = i.size.height * i.aspectRatio), i.position.top = i._helper ? r.top : 0);
                i.offset.left = i.parentData.left + i.position.left;
                i.offset.top = i.parentData.top + i.position.top;
                f = Math.abs((i._helper ? i.offset.left - u.left : i.offset.left - u.left) + i.sizeDiff.width);
                o = Math.abs((i._helper ? i.offset.top - u.top : i.offset.top - r.top) + i.sizeDiff.height);
                s = i.containerElement.get(0) === i.element.parent().get(0);
                h = /relative|absolute/.test(i.containerElement.css("position"));
                s && h && (f -= Math.abs(i.parentData.left));
                f + i.size.width >= i.parentData.width && (i.size.width = i.parentData.width - f, e && (i.size.height = i.size.width / i.aspectRatio));
                o + i.size.height >= i.parentData.height && (i.size.height = i.parentData.height - o, e && (i.size.width = i.size.height * i.aspectRatio))
            },
            stop: function() {
                var t = n(this).data("ui-resizable"),
                    r = t.options,
                    u = t.containerOffset,
                    f = t.containerPosition,
                    e = t.containerElement,
                    i = n(t.helper),
                    o = i.offset(),
                    s = i.outerWidth() - t.sizeDiff.width,
                    h = i.outerHeight() - t.sizeDiff.height;
                t._helper && !r.animate && /relative/.test(e.css("position")) && n(this).css({
                    left: o.left - f.left - u.left,
                    width: s,
                    height: h
                });
                t._helper && !r.animate && /static/.test(e.css("position")) && n(this).css({
                    left: o.left - f.left - u.left,
                    width: s,
                    height: h
                })
            }
        });
        n.ui.plugin.add("resizable", "alsoResize", {
            start: function() {
                var r = n(this).data("ui-resizable"),
                    t = r.options,
                    i = function(t) {
                        n(t).each(function() {
                            var t = n(this);
                            t.data("ui-resizable-alsoresize", {
                                width: parseInt(t.width(), 10),
                                height: parseInt(t.height(), 10),
                                left: parseInt(t.css("left"), 10),
                                top: parseInt(t.css("top"), 10)
                            })
                        })
                    };
                typeof t.alsoResize != "object" || t.alsoResize.parentNode ? i(t.alsoResize) : t.alsoResize.length ? (t.alsoResize = t.alsoResize[0], i(t.alsoResize)) : n.each(t.alsoResize, function(n) {
                    i(n)
                })
            },
            resize: function(t, i) {
                var r = n(this).data("ui-resizable"),
                    u = r.options,
                    f = r.originalSize,
                    e = r.originalPosition,
                    s = {
                        height: r.size.height - f.height || 0,
                        width: r.size.width - f.width || 0,
                        top: r.position.top - e.top || 0,
                        left: r.position.left - e.left || 0
                    },
                    o = function(t, r) {
                        n(t).each(function() {
                            var t = n(this),
                                f = n(this).data("ui-resizable-alsoresize"),
                                u = {},
                                e = r && r.length ? r : t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                            n.each(e, function(n, t) {
                                var i = (f[t] || 0) + (s[t] || 0);
                                i && i >= 0 && (u[t] = i || null)
                            });
                            t.css(u)
                        })
                    };
                typeof u.alsoResize != "object" || u.alsoResize.nodeType ? o(u.alsoResize) : n.each(u.alsoResize, function(n, t) {
                    o(n, t)
                })
            },
            stop: function() {
                n(this).removeData("resizable-alsoresize")
            }
        });
        n.ui.plugin.add("resizable", "ghost", {
            start: function() {
                var t = n(this).data("ui-resizable"),
                    i = t.options,
                    r = t.size;
                t.ghost = t.originalElement.clone();
                t.ghost.css({
                    opacity: .25,
                    display: "block",
                    position: "relative",
                    height: r.height,
                    width: r.width,
                    margin: 0,
                    left: 0,
                    top: 0
                }).addClass("ui-resizable-ghost").addClass(typeof i.ghost == "string" ? i.ghost : "");
                t.ghost.appendTo(t.helper)
            },
            resize: function() {
                var t = n(this).data("ui-resizable");
                t.ghost && t.ghost.css({
                    position: "relative",
                    height: t.size.height,
                    width: t.size.width
                })
            },
            stop: function() {
                var t = n(this).data("ui-resizable");
                t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
            }
        });
        n.ui.plugin.add("resizable", "grid", {
            resize: function() {
                var t = n(this).data("ui-resizable"),
                    i = t.options,
                    v = t.size,
                    o = t.originalSize,
                    s = t.originalPosition,
                    h = t.axis,
                    c = typeof i.grid == "number" ? [i.grid, i.grid] : i.grid,
                    f = c[0] || 1,
                    e = c[1] || 1,
                    l = Math.round((v.width - o.width) / f) * f,
                    a = Math.round((v.height - o.height) / e) * e,
                    r = o.width + l,
                    u = o.height + a,
                    y = i.maxWidth && i.maxWidth < r,
                    p = i.maxHeight && i.maxHeight < u,
                    w = i.minWidth && i.minWidth > r,
                    b = i.minHeight && i.minHeight > u;
                i.grid = c;
                w && (r = r + f);
                b && (u = u + e);
                y && (r = r - f);
                p && (u = u - e);
                /^(se|s|e)$/.test(h) ? (t.size.width = r, t.size.height = u) : /^(ne)$/.test(h) ? (t.size.width = r, t.size.height = u, t.position.top = s.top - a) : /^(sw)$/.test(h) ? (t.size.width = r, t.size.height = u, t.position.left = s.left - l) : (u - e > 0 ? (t.size.height = u, t.position.top = s.top - a) : (t.size.height = e, t.position.top = s.top + o.height - e), r - f > 0 ? (t.size.width = r, t.position.left = s.left - l) : (t.size.width = f, t.position.left = s.left + o.width - f))
            }
        })
    }(jQuery), function(n) {
        n.widget("ui.selectable", n.ui.mouse, {
            version: "1.10.4",
            options: {
                appendTo: "body",
                autoRefresh: !0,
                distance: 0,
                filter: "*",
                tolerance: "touch",
                selected: null,
                selecting: null,
                start: null,
                stop: null,
                unselected: null,
                unselecting: null
            },
            _create: function() {
                var t, i = this;
                this.element.addClass("ui-selectable");
                this.dragged = !1;
                this.refresh = function() {
                    t = n(i.options.filter, i.element[0]);
                    t.addClass("ui-selectee");
                    t.each(function() {
                        var t = n(this),
                            i = t.offset();
                        n.data(this, "selectable-item", {
                            element: this,
                            $element: t,
                            left: i.left,
                            top: i.top,
                            right: i.left + t.outerWidth(),
                            bottom: i.top + t.outerHeight(),
                            startselected: !1,
                            selected: t.hasClass("ui-selected"),
                            selecting: t.hasClass("ui-selecting"),
                            unselecting: t.hasClass("ui-unselecting")
                        })
                    })
                };
                this.refresh();
                this.selectees = t.addClass("ui-selectee");
                this._mouseInit();
                this.helper = n("<div class='ui-selectable-helper'><\/div>")
            },
            _destroy: function() {
                this.selectees.removeClass("ui-selectee").removeData("selectable-item");
                this.element.removeClass("ui-selectable ui-selectable-disabled");
                this._mouseDestroy()
            },
            _mouseStart: function(t) {
                var i = this,
                    r = this.options;
                (this.opos = [t.pageX, t.pageY], this.options.disabled) || (this.selectees = n(r.filter, this.element[0]), this._trigger("start", t), n(r.appendTo).append(this.helper), this.helper.css({
                    left: t.pageX,
                    top: t.pageY,
                    width: 0,
                    height: 0
                }), r.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                    var r = n.data(this, "selectable-item");
                    r.startselected = !0;
                    t.metaKey || t.ctrlKey || (r.$element.removeClass("ui-selected"), r.selected = !1, r.$element.addClass("ui-unselecting"), r.unselecting = !0, i._trigger("unselecting", t, {
                        unselecting: r.element
                    }))
                }), n(t.target).parents().addBack().each(function() {
                    var u, r = n.data(this, "selectable-item");
                    if (r) return u = !t.metaKey && !t.ctrlKey || !r.$element.hasClass("ui-selected"), r.$element.removeClass(u ? "ui-unselecting" : "ui-selected").addClass(u ? "ui-selecting" : "ui-unselecting"), r.unselecting = !u, r.selecting = u, r.selected = u, u ? i._trigger("selecting", t, {
                        selecting: r.element
                    }) : i._trigger("unselecting", t, {
                        unselecting: r.element
                    }), !1
                }))
            },
            _mouseDrag: function(t) {
                if (this.dragged = !0, !this.options.disabled) {
                    var e, o = this,
                        s = this.options,
                        i = this.opos[0],
                        r = this.opos[1],
                        u = t.pageX,
                        f = t.pageY;
                    return i > u && (e = u, u = i, i = e), r > f && (e = f, f = r, r = e), this.helper.css({
                        left: i,
                        top: r,
                        width: u - i,
                        height: f - r
                    }), this.selectees.each(function() {
                        var e = n.data(this, "selectable-item"),
                            h = !1;
                        e && e.element !== o.element[0] && (s.tolerance === "touch" ? h = !(e.left > u || e.right < i || e.top > f || e.bottom < r) : s.tolerance === "fit" && (h = e.left > i && e.right < u && e.top > r && e.bottom < f), h ? (e.selected && (e.$element.removeClass("ui-selected"), e.selected = !1), e.unselecting && (e.$element.removeClass("ui-unselecting"), e.unselecting = !1), e.selecting || (e.$element.addClass("ui-selecting"), e.selecting = !0, o._trigger("selecting", t, {
                            selecting: e.element
                        }))) : (e.selecting && ((t.metaKey || t.ctrlKey) && e.startselected ? (e.$element.removeClass("ui-selecting"), e.selecting = !1, e.$element.addClass("ui-selected"), e.selected = !0) : (e.$element.removeClass("ui-selecting"), e.selecting = !1, e.startselected && (e.$element.addClass("ui-unselecting"), e.unselecting = !0), o._trigger("unselecting", t, {
                            unselecting: e.element
                        }))), e.selected && (t.metaKey || t.ctrlKey || e.startselected || (e.$element.removeClass("ui-selected"), e.selected = !1, e.$element.addClass("ui-unselecting"), e.unselecting = !0, o._trigger("unselecting", t, {
                            unselecting: e.element
                        })))))
                    }), !1
                }
            },
            _mouseStop: function(t) {
                var i = this;
                return this.dragged = !1, n(".ui-unselecting", this.element[0]).each(function() {
                    var r = n.data(this, "selectable-item");
                    r.$element.removeClass("ui-unselecting");
                    r.unselecting = !1;
                    r.startselected = !1;
                    i._trigger("unselected", t, {
                        unselected: r.element
                    })
                }), n(".ui-selecting", this.element[0]).each(function() {
                    var r = n.data(this, "selectable-item");
                    r.$element.removeClass("ui-selecting").addClass("ui-selected");
                    r.selecting = !1;
                    r.selected = !0;
                    r.startselected = !0;
                    i._trigger("selected", t, {
                        selected: r.element
                    })
                }), this._trigger("stop", t), this.helper.remove(), !1
            }
        })
    }(jQuery), function(n) {
        function t(n, t, i) {
            return n > t && n < t + i
        }

        function i(n) {
            return /left|right/.test(n.css("float")) || /inline|table-cell/.test(n.css("display"))
        }
        n.widget("ui.sortable", n.ui.mouse, {
            version: "1.10.4",
            widgetEventPrefix: "sort",
            ready: !1,
            options: {
                appendTo: "parent",
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                items: "> *",
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: "default",
                tolerance: "intersect",
                zIndex: 1e3,
                activate: null,
                beforeStop: null,
                change: null,
                deactivate: null,
                out: null,
                over: null,
                receive: null,
                remove: null,
                sort: null,
                start: null,
                stop: null,
                update: null
            },
            _create: function() {
                var n = this.options;
                this.containerCache = {};
                this.element.addClass("ui-sortable");
                this.refresh();
                this.floating = this.items.length ? n.axis === "x" || i(this.items[0].item) : !1;
                this.offset = this.element.offset();
                this._mouseInit();
                this.ready = !0
            },
            _destroy: function() {
                this.element.removeClass("ui-sortable ui-sortable-disabled");
                this._mouseDestroy();
                for (var n = this.items.length - 1; n >= 0; n--) this.items[n].item.removeData(this.widgetName + "-item");
                return this
            },
            _setOption: function(t, i) {
                t === "disabled" ? (this.options[t] = i, this.widget().toggleClass("ui-sortable-disabled", !!i)) : n.Widget.prototype._setOption.apply(this, arguments)
            },
            _mouseCapture: function(t, i) {
                var r = null,
                    f = !1,
                    u = this;
                return this.reverting ? !1 : this.options.disabled || this.options.type === "static" ? !1 : (this._refreshItems(t), n(t.target).parents().each(function() {
                    if (n.data(this, u.widgetName + "-item") === u) return r = n(this), !1
                }), n.data(t.target, u.widgetName + "-item") === u && (r = n(t.target)), !r) ? !1 : this.options.handle && !i && (n(this.options.handle, r).find("*").addBack().each(function() {
                    this === t.target && (f = !0)
                }), !f) ? !1 : (this.currentItem = r, this._removeCurrentsFromItems(), !0)
            },
            _mouseStart: function(t, i, r) {
                var f, e, u = this.options;
                if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left
                    }, n.extend(this.offset, {
                        click: {
                            left: t.pageX - this.offset.left,
                            top: t.pageY - this.offset.top
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset()
                    }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, u.cursorAt && this._adjustOffsetFromHelper(u.cursorAt), this.domPosition = {
                        prev: this.currentItem.prev()[0],
                        parent: this.currentItem.parent()[0]
                    }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), u.containment && this._setContainment(), u.cursor && u.cursor !== "auto" && (e = this.document.find("body"), this.storedCursor = e.css("cursor"), e.css("cursor", u.cursor), this.storedStylesheet = n("<style>*{ cursor: " + u.cursor + " !important; }<\/style>").appendTo(e)), u.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", u.opacity)), u.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", u.zIndex)), this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML" && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !r)
                    for (f = this.containers.length - 1; f >= 0; f--) this.containers[f]._trigger("activate", t, this._uiHash(this));
                return n.ui.ddmanager && (n.ui.ddmanager.current = this), n.ui.ddmanager && !u.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0
            },
            _mouseDrag: function(t) {
                var e, u, f, o, i = this.options,
                    r = !1;
                for (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - this.overflowOffset.top < i.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - i.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - this.overflowOffset.left < i.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - i.scrollSpeed)) : (t.pageY - n(document).scrollTop() < i.scrollSensitivity ? r = n(document).scrollTop(n(document).scrollTop() - i.scrollSpeed) : n(window).height() - (t.pageY - n(document).scrollTop()) < i.scrollSensitivity && (r = n(document).scrollTop(n(document).scrollTop() + i.scrollSpeed)), t.pageX - n(document).scrollLeft() < i.scrollSensitivity ? r = n(document).scrollLeft(n(document).scrollLeft() - i.scrollSpeed) : n(window).width() - (t.pageX - n(document).scrollLeft()) < i.scrollSensitivity && (r = n(document).scrollLeft(n(document).scrollLeft() + i.scrollSpeed))), r !== !1 && n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && this.options.axis === "y" || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && this.options.axis === "x" || (this.helper[0].style.top = this.position.top + "px"), e = this.items.length - 1; e >= 0; e--)
                    if ((u = this.items[e], f = u.item[0], o = this._intersectsWithPointer(u), o) && u.instance === this.currentContainer && f !== this.currentItem[0] && this.placeholder[o === 1 ? "next" : "prev"]()[0] !== f && !n.contains(this.placeholder[0], f) && (this.options.type === "semi-dynamic" ? !n.contains(this.element[0], f) : !0)) {
                        if (this.direction = o === 1 ? "down" : "up", this.options.tolerance === "pointer" || this._intersectsWithSides(u)) this._rearrange(t, u);
                        else break;
                        this._trigger("change", t, this._uiHash());
                        break
                    }
                return this._contactContainers(t), n.ui.ddmanager && n.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
            },
            _mouseStop: function(t, i) {
                if (t) {
                    if (n.ui.ddmanager && !this.options.dropBehaviour && n.ui.ddmanager.drop(this, t), this.options.revert) {
                        var e = this,
                            f = this.placeholder.offset(),
                            r = this.options.axis,
                            u = {};
                        r && r !== "x" || (u.left = f.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft));
                        r && r !== "y" || (u.top = f.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop));
                        this.reverting = !0;
                        n(this.helper).animate(u, parseInt(this.options.revert, 10) || 500, function() {
                            e._clear(t)
                        })
                    } else this._clear(t, i);
                    return !1
                }
            },
            cancel: function() {
                if (this.dragging) {
                    this._mouseUp({
                        target: null
                    });
                    this.options.helper === "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                    for (var t = this.containers.length - 1; t >= 0; t--) this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0)
                }
                return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper !== "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), n.extend(this, {
                    helper: null,
                    dragging: !1,
                    reverting: !1,
                    _noFinalSort: null
                }), this.domPosition.prev ? n(this.domPosition.prev).after(this.currentItem) : n(this.domPosition.parent).prepend(this.currentItem)), this
            },
            serialize: function(t) {
                var r = this._getItemsAsjQuery(t && t.connected),
                    i = [];
                return t = t || {}, n(r).each(function() {
                    var r = (n(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
                    r && i.push((t.key || r[1] + "[]") + "=" + (t.key && t.expression ? r[1] : r[2]))
                }), !i.length && t.key && i.push(t.key + "="), i.join("&")
            },
            toArray: function(t) {
                var r = this._getItemsAsjQuery(t && t.connected),
                    i = [];
                return t = t || {}, r.each(function() {
                    i.push(n(t.item || this).attr(t.attribute || "id") || "")
                }), i
            },
            _intersectsWith: function(n) {
                var t = this.positionAbs.left,
                    h = t + this.helperProportions.width,
                    i = this.positionAbs.top,
                    c = i + this.helperProportions.height,
                    r = n.left,
                    f = r + n.width,
                    u = n.top,
                    e = u + n.height,
                    o = this.offset.click.top,
                    s = this.offset.click.left,
                    l = this.options.axis === "x" || i + o > u && i + o < e,
                    a = this.options.axis === "y" || t + s > r && t + s < f,
                    v = l && a;
                return this.options.tolerance === "pointer" || this.options.forcePointerForContainers || this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > n[this.floating ? "width" : "height"] ? v : r < t + this.helperProportions.width / 2 && h - this.helperProportions.width / 2 < f && u < i + this.helperProportions.height / 2 && c - this.helperProportions.height / 2 < e
            },
            _intersectsWithPointer: function(n) {
                var u = this.options.axis === "x" || t(this.positionAbs.top + this.offset.click.top, n.top, n.height),
                    f = this.options.axis === "y" || t(this.positionAbs.left + this.offset.click.left, n.left, n.width),
                    e = u && f,
                    i = this._getDragVerticalDirection(),
                    r = this._getDragHorizontalDirection();
                return e ? this.floating ? r && r === "right" || i === "down" ? 2 : 1 : i && (i === "down" ? 2 : 1) : !1
            },
            _intersectsWithSides: function(n) {
                var u = t(this.positionAbs.top + this.offset.click.top, n.top + n.height / 2, n.height),
                    f = t(this.positionAbs.left + this.offset.click.left, n.left + n.width / 2, n.width),
                    i = this._getDragVerticalDirection(),
                    r = this._getDragHorizontalDirection();
                return this.floating && r ? r === "right" && f || r === "left" && !f : i && (i === "down" && u || i === "up" && !u)
            },
            _getDragVerticalDirection: function() {
                var n = this.positionAbs.top - this.lastPositionAbs.top;
                return n !== 0 && (n > 0 ? "down" : "up")
            },
            _getDragHorizontalDirection: function() {
                var n = this.positionAbs.left - this.lastPositionAbs.left;
                return n !== 0 && (n > 0 ? "right" : "left")
            },
            refresh: function(n) {
                return this._refreshItems(n), this.refreshPositions(), this
            },
            _connectWith: function() {
                var n = this.options;
                return n.connectWith.constructor === String ? [n.connectWith] : n.connectWith
            },
            _getItemsAsjQuery: function(t) {
                function h() {
                    s.push(this)
                }
                var r, u, e, i, s = [],
                    f = [],
                    o = this._connectWith();
                if (o && t)
                    for (r = o.length - 1; r >= 0; r--)
                        for (e = n(o[r]), u = e.length - 1; u >= 0; u--) i = n.data(e[u], this.widgetFullName), i && i !== this && !i.options.disabled && f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element) : n(i.options.items, i.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), i]);
                for (f.push([n.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                        options: this.options,
                        item: this.currentItem
                    }) : n(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), r = f.length - 1; r >= 0; r--) f[r][0].each(h);
                return n(s)
            },
            _removeCurrentsFromItems: function() {
                var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
                this.items = n.grep(this.items, function(n) {
                    for (var i = 0; i < t.length; i++)
                        if (t[i] === n.item[0]) return !1;
                    return !0
                })
            },
            _refreshItems: function(t) {
                this.items = [];
                this.containers = [this];
                var r, u, e, i, o, s, h, l, a = this.items,
                    f = [
                        [n.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
                            item: this.currentItem
                        }) : n(this.options.items, this.element), this]
                    ],
                    c = this._connectWith();
                if (c && this.ready)
                    for (r = c.length - 1; r >= 0; r--)
                        for (e = n(c[r]), u = e.length - 1; u >= 0; u--) i = n.data(e[u], this.widgetFullName), i && i !== this && !i.options.disabled && (f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element[0], t, {
                            item: this.currentItem
                        }) : n(i.options.items, i.element), i]), this.containers.push(i));
                for (r = f.length - 1; r >= 0; r--)
                    for (o = f[r][1], s = f[r][0], u = 0, l = s.length; u < l; u++) h = n(s[u]), h.data(this.widgetName + "-item", o), a.push({
                        item: h,
                        instance: o,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
            },
            refreshPositions: function(t) {
                this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                for (var r, f, u, i = this.items.length - 1; i >= 0; i--)(r = this.items[i], r.instance !== this.currentContainer && this.currentContainer && r.item[0] !== this.currentItem[0]) || (f = this.options.toleranceElement ? n(this.options.toleranceElement, r.item) : r.item, t || (r.width = f.outerWidth(), r.height = f.outerHeight()), u = f.offset(), r.left = u.left, r.top = u.top);
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else
                    for (i = this.containers.length - 1; i >= 0; i--) u = this.containers[i].element.offset(), this.containers[i].containerCache.left = u.left, this.containers[i].containerCache.top = u.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                return this
            },
            _createPlaceholder: function(t) {
                t = t || this;
                var r, i = t.options;
                i.placeholder && i.placeholder.constructor !== String || (r = i.placeholder, i.placeholder = {
                    element: function() {
                        var u = t.currentItem[0].nodeName.toLowerCase(),
                            i = n("<" + u + ">", t.document[0]).addClass(r || t.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                        return u === "tr" ? t.currentItem.children().each(function() {
                            n("<td>&#160;<\/td>", t.document[0]).attr("colspan", n(this).attr("colspan") || 1).appendTo(i)
                        }) : u === "img" && i.attr("src", t.currentItem.attr("src")), r || i.css("visibility", "hidden"), i
                    },
                    update: function(n, u) {
                        (!r || i.forcePlaceholderSize) && (u.height() || u.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)), u.width() || u.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10)))
                    }
                });
                t.placeholder = n(i.placeholder.element.call(t.element, t.currentItem));
                t.currentItem.after(t.placeholder);
                i.placeholder.update(t, t.placeholder)
            },
            _contactContainers: function(r) {
                for (var u, v, s, l, y, h, o, p, a, c = null, f = null, e = this.containers.length - 1; e >= 0; e--)
                    if (!n.contains(this.currentItem[0], this.containers[e].element[0]))
                        if (this._intersectsWith(this.containers[e].containerCache)) {
                            if (c && n.contains(this.containers[e].element[0], c.element[0])) continue;
                            c = this.containers[e];
                            f = e
                        } else this.containers[e].containerCache.over && (this.containers[e]._trigger("out", r, this._uiHash(this)), this.containers[e].containerCache.over = 0);
                if (c)
                    if (this.containers.length === 1) this.containers[f].containerCache.over || (this.containers[f]._trigger("over", r, this._uiHash(this)), this.containers[f].containerCache.over = 1);
                    else {
                        for (v = 1e4, s = null, a = c.floating || i(this.currentItem), l = a ? "left" : "top", y = a ? "width" : "height", h = this.positionAbs[l] + this.offset.click[l], u = this.items.length - 1; u >= 0; u--) n.contains(this.containers[f].element[0], this.items[u].item[0]) && this.items[u].item[0] !== this.currentItem[0] && (!a || t(this.positionAbs.top + this.offset.click.top, this.items[u].top, this.items[u].height)) && (o = this.items[u].item.offset()[l], p = !1, Math.abs(o - h) > Math.abs(o + this.items[u][y] - h) && (p = !0, o += this.items[u][y]), Math.abs(o - h) < v && (v = Math.abs(o - h), s = this.items[u], this.direction = p ? "up" : "down"));
                        if (!s && !this.options.dropOnEmpty) return;
                        if (this.currentContainer === this.containers[f]) return;
                        s ? this._rearrange(r, s, null, !0) : this._rearrange(r, null, this.containers[f].element, !0);
                        this._trigger("change", r, this._uiHash());
                        this.containers[f]._trigger("change", r, this._uiHash(this));
                        this.currentContainer = this.containers[f];
                        this.options.placeholder.update(this.currentContainer, this.placeholder);
                        this.containers[f]._trigger("over", r, this._uiHash(this));
                        this.containers[f].containerCache.over = 1
                    }
            },
            _createHelper: function(t) {
                var r = this.options,
                    i = n.isFunction(r.helper) ? n(r.helper.apply(this.element[0], [t, this.currentItem])) : r.helper === "clone" ? this.currentItem.clone() : this.currentItem;
                return i.parents("body").length || n(r.appendTo !== "parent" ? r.appendTo : this.currentItem[0].parentNode)[0].appendChild(i[0]), i[0] === this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }), (!i[0].style.width || r.forceHelperSize) && i.width(this.currentItem.width()), (!i[0].style.height || r.forceHelperSize) && i.height(this.currentItem.height()), i
            },
            _adjustOffsetFromHelper: function(t) {
                typeof t == "string" && (t = t.split(" "));
                n.isArray(t) && (t = {
                    left: +t[0],
                    top: +t[1] || 0
                });
                "left" in t && (this.offset.click.left = t.left + this.margins.left);
                "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left);
                "top" in t && (this.offset.click.top = t.top + this.margins.top);
                "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                this.offsetParent = this.helper.offsetParent();
                var t = this.offsetParent.offset();
                return this.cssPosition === "absolute" && this.scrollParent[0] !== document && n.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && n.ui.ie) && (t = {
                    top: 0,
                    left: 0
                }), {
                    top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if (this.cssPosition === "relative") {
                    var n = this.currentItem.position();
                    return {
                        top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                    top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var t, r, u, i = this.options;
                i.containment === "parent" && (i.containment = this.helper[0].parentNode);
                (i.containment === "document" || i.containment === "window") && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, n(i.containment === "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (n(i.containment === "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]);
                /^(document|window|parent)$/.test(i.containment) || (t = n(i.containment)[0], r = n(i.containment).offset(), u = n(t).css("overflow") !== "hidden", this.containment = [r.left + (parseInt(n(t).css("borderLeftWidth"), 10) || 0) + (parseInt(n(t).css("paddingLeft"), 10) || 0) - this.margins.left, r.top + (parseInt(n(t).css("borderTopWidth"), 10) || 0) + (parseInt(n(t).css("paddingTop"), 10) || 0) - this.margins.top, r.left + (u ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(n(t).css("borderLeftWidth"), 10) || 0) - (parseInt(n(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, r.top + (u ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(n(t).css("borderTopWidth"), 10) || 0) - (parseInt(n(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
            },
            _convertPositionTo: function(t, i) {
                i || (i = this.position);
                var r = t === "absolute" ? 1 : -1,
                    u = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && n.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                    f = /(html|body)/i.test(u[0].tagName);
                return {
                    top: i.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : u.scrollTop()) * r,
                    left: i.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : u.scrollLeft()) * r
                }
            },
            _generatePosition: function(t) {
                var r, u, i = this.options,
                    f = t.pageX,
                    e = t.pageY,
                    o = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && n.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                    s = /(html|body)/i.test(o[0].tagName);
                return this.cssPosition !== "relative" || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (e = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (e = this.containment[3] + this.offset.click.top)), i.grid && (r = this.originalPageY + Math.round((e - this.originalPageY) / i.grid[1]) * i.grid[1], e = this.containment ? r - this.offset.click.top >= this.containment[1] && r - this.offset.click.top <= this.containment[3] ? r : r - this.offset.click.top >= this.containment[1] ? r - i.grid[1] : r + i.grid[1] : r, u = this.originalPageX + Math.round((f - this.originalPageX) / i.grid[0]) * i.grid[0], f = this.containment ? u - this.offset.click.left >= this.containment[0] && u - this.offset.click.left <= this.containment[2] ? u : u - this.offset.click.left >= this.containment[0] ? u - i.grid[0] : u + i.grid[0] : u)), {
                    top: e - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : s ? 0 : o.scrollTop()),
                    left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : s ? 0 : o.scrollLeft())
                }
            },
            _rearrange: function(n, t, i, r) {
                i ? i[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], this.direction === "down" ? t.item[0] : t.item[0].nextSibling);
                this.counter = this.counter ? ++this.counter : 1;
                var u = this.counter;
                this._delay(function() {
                    u === this.counter && this.refreshPositions(!r)
                })
            },
            _clear: function(n, t) {
                function u(n, t, i) {
                    return function(r) {
                        i._trigger(n, r, t._uiHash(t))
                    }
                }
                this.reverting = !1;
                var i, r = [];
                if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                    for (i in this._storedCSS)(this._storedCSS[i] === "auto" || this._storedCSS[i] === "static") && (this._storedCSS[i] = "");
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else this.currentItem.show();
                for (this.fromOutside && !t && r.push(function(n) {
                        this._trigger("receive", n, this._uiHash(this.fromOutside))
                    }), (this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !t && r.push(function(n) {
                        this._trigger("update", n, this._uiHash())
                    }), this !== this.currentContainer && (t || (r.push(function(n) {
                        this._trigger("remove", n, this._uiHash())
                    }), r.push(function(n) {
                        return function(t) {
                            n._trigger("receive", t, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)), r.push(function(n) {
                        return function(t) {
                            n._trigger("update", t, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--) t || r.push(u("deactivate", this, this.containers[i])), this.containers[i].containerCache.over && (r.push(u("out", this, this.containers[i])), this.containers[i].containerCache.over = 0);
                if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                    if (!t) {
                        for (this._trigger("beforeStop", n, this._uiHash()), i = 0; i < r.length; i++) r[i].call(this, n);
                        this._trigger("stop", n, this._uiHash())
                    }
                    return this.fromOutside = !1, !1
                }
                if (t || this._trigger("beforeStop", n, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !t) {
                    for (i = 0; i < r.length; i++) r[i].call(this, n);
                    this._trigger("stop", n, this._uiHash())
                }
                return this.fromOutside = !1, !0
            },
            _trigger: function() {
                n.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
            },
            _uiHash: function(t) {
                var i = t || this;
                return {
                    helper: i.helper,
                    placeholder: i.placeholder || n([]),
                    position: i.position,
                    originalPosition: i.originalPosition,
                    offset: i.positionAbs,
                    item: i.currentItem,
                    sender: t ? t.element : null
                }
            }
        })
    }(jQuery), function(n) {
        var r = 0,
            t = {},
            i = {};
        t.height = t.paddingTop = t.paddingBottom = t.borderTopWidth = t.borderBottomWidth = "hide";
        i.height = i.paddingTop = i.paddingBottom = i.borderTopWidth = i.borderBottomWidth = "show";
        n.widget("ui.accordion", {
            version: "1.10.4",
            options: {
                active: 0,
                animate: {},
                collapsible: !1,
                event: "click",
                header: "> li > :first-child,> :not(li):even",
                heightStyle: "auto",
                icons: {
                    activeHeader: "ui-icon-triangle-1-s",
                    header: "ui-icon-triangle-1-e"
                },
                activate: null,
                beforeActivate: null
            },
            _create: function() {
                var t = this.options;
                this.prevShow = this.prevHide = n();
                this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist");
                t.collapsible || t.active !== !1 && t.active != null || (t.active = 0);
                this._processPanels();
                t.active < 0 && (t.active += this.headers.length);
                this._refresh()
            },
            _getCreateEventData: function() {
                return {
                    header: this.active,
                    panel: this.active.length ? this.active.next() : n(),
                    content: this.active.length ? this.active.next() : n()
                }
            },
            _createIcons: function() {
                var t = this.options.icons;
                t && (n("<span>").addClass("ui-accordion-header-icon ui-icon " + t.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader), this.headers.addClass("ui-accordion-icons"))
            },
            _destroyIcons: function() {
                this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
            },
            _destroy: function() {
                var n;
                this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
                this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function() {
                    /^ui-accordion/.test(this.id) && this.removeAttribute("id")
                });
                this._destroyIcons();
                n = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function() {
                    /^ui-accordion/.test(this.id) && this.removeAttribute("id")
                });
                this.options.heightStyle !== "content" && n.css("height", "")
            },
            _setOption: function(n, t) {
                if (n === "active") {
                    this._activate(t);
                    return
                }
                n === "event" && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(t));
                this._super(n, t);
                n !== "collapsible" || t || this.options.active !== !1 || this._activate(0);
                n === "icons" && (this._destroyIcons(), t && this._createIcons());
                n === "disabled" && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!t)
            },
            _keydown: function(t) {
                if (!t.altKey && !t.ctrlKey) {
                    var i = n.ui.keyCode,
                        u = this.headers.length,
                        f = this.headers.index(t.target),
                        r = !1;
                    switch (t.keyCode) {
                        case i.RIGHT:
                        case i.DOWN:
                            r = this.headers[(f + 1) % u];
                            break;
                        case i.LEFT:
                        case i.UP:
                            r = this.headers[(f - 1 + u) % u];
                            break;
                        case i.SPACE:
                        case i.ENTER:
                            this._eventHandler(t);
                            break;
                        case i.HOME:
                            r = this.headers[0];
                            break;
                        case i.END:
                            r = this.headers[u - 1]
                    }
                    r && (n(t.target).attr("tabIndex", -1), n(r).attr("tabIndex", 0), r.focus(), t.preventDefault())
                }
            },
            _panelKeyDown: function(t) {
                t.keyCode === n.ui.keyCode.UP && t.ctrlKey && n(t.currentTarget).prev().focus()
            },
            refresh: function() {
                var t = this.options;
                this._processPanels();
                (t.active !== !1 || t.collapsible !== !0) && this.headers.length ? t.active === !1 ? this._activate(0) : this.active.length && !n.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (t.active = !1, this.active = n()) : this._activate(Math.max(0, t.active - 1)) : t.active = this.headers.index(this.active) : (t.active = !1, this.active = n());
                this._destroyIcons();
                this._refresh()
            },
            _processPanels: function() {
                this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all");
                this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
            },
            _refresh: function() {
                var t, i = this.options,
                    u = i.heightStyle,
                    e = this.element.parent(),
                    f = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++r);
                this.active = this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all");
                this.active.next().addClass("ui-accordion-content-active").show();
                this.headers.attr("role", "tab").each(function(t) {
                    var i = n(this),
                        r = i.attr("id"),
                        e = i.next(),
                        u = e.attr("id");
                    r || (r = f + "-header-" + t, i.attr("id", r));
                    u || (u = f + "-panel-" + t, e.attr("id", u));
                    i.attr("aria-controls", u);
                    e.attr("aria-labelledby", r)
                }).next().attr("role", "tabpanel");
                this.headers.not(this.active).attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1
                }).next().attr({
                    "aria-hidden": "true"
                }).hide();
                this.active.length ? this.active.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                }).next().attr({
                    "aria-hidden": "false"
                }) : this.headers.eq(0).attr("tabIndex", 0);
                this._createIcons();
                this._setupEvents(i.event);
                u === "fill" ? (t = e.height(), this.element.siblings(":visible").each(function() {
                    var i = n(this),
                        r = i.css("position");
                    r !== "absolute" && r !== "fixed" && (t -= i.outerHeight(!0))
                }), this.headers.each(function() {
                    t -= n(this).outerHeight(!0)
                }), this.headers.next().each(function() {
                    n(this).height(Math.max(0, t - n(this).innerHeight() + n(this).height()))
                }).css("overflow", "auto")) : u === "auto" && (t = 0, this.headers.next().each(function() {
                    t = Math.max(t, n(this).css("height", "").height())
                }).height(t))
            },
            _activate: function(t) {
                var i = this._findActive(t)[0];
                i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
                    target: i,
                    currentTarget: i,
                    preventDefault: n.noop
                }))
            },
            _findActive: function(t) {
                return typeof t == "number" ? this.headers.eq(t) : n()
            },
            _setupEvents: function(t) {
                var i = {
                    keydown: "_keydown"
                };
                t && n.each(t.split(" "), function(n, t) {
                    i[t] = "_eventHandler"
                });
                this._off(this.headers.add(this.headers.next()));
                this._on(this.headers, i);
                this._on(this.headers.next(), {
                    keydown: "_panelKeyDown"
                });
                this._hoverable(this.headers);
                this._focusable(this.headers)
            },
            _eventHandler: function(t) {
                var i = this.options,
                    u = this.active,
                    r = n(t.currentTarget),
                    f = r[0] === u[0],
                    e = f && i.collapsible,
                    s = e ? n() : r.next(),
                    h = u.next(),
                    o = {
                        oldHeader: u,
                        oldPanel: h,
                        newHeader: e ? n() : r,
                        newPanel: s
                    };
                (t.preventDefault(), (!f || i.collapsible) && this._trigger("beforeActivate", t, o) !== !1) && (i.active = e ? !1 : this.headers.index(r), this.active = f ? n() : r, this._toggle(o), u.removeClass("ui-accordion-header-active ui-state-active"), i.icons && u.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), f || (r.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && r.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), r.next().addClass("ui-accordion-content-active")))
            },
            _toggle: function(t) {
                var r = t.newPanel,
                    i = this.prevShow.length ? this.prevShow : t.oldPanel;
                this.prevShow.add(this.prevHide).stop(!0, !0);
                this.prevShow = r;
                this.prevHide = i;
                this.options.animate ? this._animate(r, i, t) : (i.hide(), r.show(), this._toggleComplete(t));
                i.attr({
                    "aria-hidden": "true"
                });
                i.prev().attr("aria-selected", "false");
                r.length && i.length ? i.prev().attr({
                    tabIndex: -1,
                    "aria-expanded": "false"
                }) : r.length && this.headers.filter(function() {
                    return n(this).attr("tabIndex") === 0
                }).attr("tabIndex", -1);
                r.attr("aria-hidden", "false").prev().attr({
                    "aria-selected": "true",
                    tabIndex: 0,
                    "aria-expanded": "true"
                })
            },
            _animate: function(n, r, u) {
                var l, f, e, a = this,
                    h = 0,
                    v = n.length && (!r.length || n.index() < r.index()),
                    s = this.options.animate || {},
                    o = v && s.down || s,
                    c = function() {
                        a._toggleComplete(u)
                    };
                if (typeof o == "number" && (e = o), typeof o == "string" && (f = o), f = f || o.easing || s.easing, e = e || o.duration || s.duration, !r.length) return n.animate(i, e, f, c);
                if (!n.length) return r.animate(t, e, f, c);
                l = n.show().outerHeight();
                r.animate(t, {
                    duration: e,
                    easing: f,
                    step: function(n, t) {
                        t.now = Math.round(n)
                    }
                });
                n.hide().animate(i, {
                    duration: e,
                    easing: f,
                    complete: c,
                    step: function(n, t) {
                        t.now = Math.round(n);
                        t.prop !== "height" ? h += t.now : a.options.heightStyle !== "content" && (t.now = Math.round(l - r.outerHeight() - h), h = 0)
                    }
                })
            },
            _toggleComplete: function(n) {
                var t = n.oldPanel;
                t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all");
                t.length && (t.parent()[0].className = t.parent()[0].className);
                this._trigger("activate", null, n)
            }
        })
    }(jQuery), function(n) {
        n.widget("ui.autocomplete", {
            version: "1.10.4",
            defaultElement: "<input>",
            options: {
                appendTo: null,
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                response: null,
                search: null,
                select: null
            },
            requestIndex: 0,
            pending: 0,
            _create: function() {
                var t, i, r, u = this.element[0].nodeName.toLowerCase(),
                    f = u === "textarea",
                    e = u === "input";
                this.isMultiLine = f ? !0 : e ? !1 : this.element.prop("isContentEditable");
                this.valueMethod = this.element[f || e ? "val" : "text"];
                this.isNewMenu = !0;
                this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");
                this._on(this.element, {
                    keydown: function(u) {
                        if (this.element.prop("readOnly")) {
                            t = !0;
                            r = !0;
                            i = !0;
                            return
                        }
                        t = !1;
                        r = !1;
                        i = !1;
                        var f = n.ui.keyCode;
                        switch (u.keyCode) {
                            case f.PAGE_UP:
                                t = !0;
                                this._move("previousPage", u);
                                break;
                            case f.PAGE_DOWN:
                                t = !0;
                                this._move("nextPage", u);
                                break;
                            case f.UP:
                                t = !0;
                                this._keyEvent("previous", u);
                                break;
                            case f.DOWN:
                                t = !0;
                                this._keyEvent("next", u);
                                break;
                            case f.ENTER:
                            case f.NUMPAD_ENTER:
                                this.menu.active && (t = !0, u.preventDefault(), this.menu.select(u));
                                break;
                            case f.TAB:
                                this.menu.active && this.menu.select(u);
                                break;
                            case f.ESCAPE:
                                this.menu.element.is(":visible") && (this._value(this.term), this.close(u), u.preventDefault());
                                break;
                            default:
                                i = !0;
                                this._searchTimeout(u)
                        }
                    },
                    keypress: function(r) {
                        if (t) {
                            t = !1;
                            (!this.isMultiLine || this.menu.element.is(":visible")) && r.preventDefault();
                            return
                        }
                        if (!i) {
                            var u = n.ui.keyCode;
                            switch (r.keyCode) {
                                case u.PAGE_UP:
                                    this._move("previousPage", r);
                                    break;
                                case u.PAGE_DOWN:
                                    this._move("nextPage", r);
                                    break;
                                case u.UP:
                                    this._keyEvent("previous", r);
                                    break;
                                case u.DOWN:
                                    this._keyEvent("next", r)
                            }
                        }
                    },
                    input: function(n) {
                        if (r) {
                            r = !1;
                            n.preventDefault();
                            return
                        }
                        this._searchTimeout(n)
                    },
                    focus: function() {
                        this.selectedItem = null;
                        this.previous = this._value()
                    },
                    blur: function(n) {
                        if (this.cancelBlur) {
                            delete this.cancelBlur;
                            return
                        }
                        clearTimeout(this.searching);
                        this.close(n);
                        this._change(n)
                    }
                });
                this._initSource();
                this.menu = n("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                    role: null
                }).hide().data("ui-menu");
                this._on(this.menu.element, {
                    mousedown: function(t) {
                        t.preventDefault();
                        this.cancelBlur = !0;
                        this._delay(function() {
                            delete this.cancelBlur
                        });
                        var i = this.menu.element[0];
                        n(t.target).closest(".ui-menu-item").length || this._delay(function() {
                            var t = this;
                            this.document.one("mousedown", function(r) {
                                r.target === t.element[0] || r.target === i || n.contains(i, r.target) || t.close()
                            })
                        })
                    },
                    menufocus: function(t, i) {
                        if (this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type))) {
                            this.menu.blur();
                            this.document.one("mousemove", function() {
                                n(t.target).trigger(t.originalEvent)
                            });
                            return
                        }
                        var r = i.item.data("ui-autocomplete-item");
                        !1 !== this._trigger("focus", t, {
                            item: r
                        }) ? t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(r.value) : this.liveRegion.text(r.value)
                    },
                    menuselect: function(n, t) {
                        var i = t.item.data("ui-autocomplete-item"),
                            r = this.previous;
                        this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = r, this._delay(function() {
                            this.previous = r;
                            this.selectedItem = i
                        }));
                        !1 !== this._trigger("select", n, {
                            item: i
                        }) && this._value(i.value);
                        this.term = this._value();
                        this.close(n);
                        this.selectedItem = i
                    }
                });
                this.liveRegion = n("<span>", {
                    role: "status",
                    "aria-live": "polite"
                }).addClass("ui-helper-hidden-accessible").insertBefore(this.element);
                this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _destroy: function() {
                clearTimeout(this.searching);
                this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");
                this.menu.element.remove();
                this.liveRegion.remove()
            },
            _setOption: function(n, t) {
                this._super(n, t);
                n === "source" && this._initSource();
                n === "appendTo" && this.menu.element.appendTo(this._appendTo());
                n === "disabled" && t && this.xhr && this.xhr.abort()
            },
            _appendTo: function() {
                var t = this.options.appendTo;
                return t && (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)), t || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t
            },
            _initSource: function() {
                var i, r, t = this;
                n.isArray(this.options.source) ? (i = this.options.source, this.source = function(t, r) {
                    r(n.ui.autocomplete.filter(i, t.term))
                }) : typeof this.options.source == "string" ? (r = this.options.source, this.source = function(i, u) {
                    t.xhr && t.xhr.abort();
                    t.xhr = n.ajax({
                        url: r,
                        data: i,
                        dataType: "json",
                        success: function(n) {
                            u(n)
                        },
                        error: function() {
                            u([])
                        }
                    })
                }) : this.source = this.options.source
            },
            _searchTimeout: function(n) {
                clearTimeout(this.searching);
                this.searching = this._delay(function() {
                    this.term !== this._value() && (this.selectedItem = null, this.search(null, n))
                }, this.options.delay)
            },
            search: function(n, t) {
                return (n = n != null ? n : this._value(), this.term = this._value(), n.length < this.options.minLength) ? this.close(t) : this._trigger("search", t) === !1 ? void 0 : this._search(n)
            },
            _search: function(n) {
                this.pending++;
                this.element.addClass("ui-autocomplete-loading");
                this.cancelSearch = !1;
                this.source({
                    term: n
                }, this._response())
            },
            _response: function() {
                var t = ++this.requestIndex;
                return n.proxy(function(n) {
                    t === this.requestIndex && this.__response(n);
                    this.pending--;
                    this.pending || this.element.removeClass("ui-autocomplete-loading")
                }, this)
            },
            __response: function(n) {
                n && (n = this._normalize(n));
                this._trigger("response", null, {
                    content: n
                });
                !this.options.disabled && n && n.length && !this.cancelSearch ? (this._suggest(n), this._trigger("open")) : this._close()
            },
            close: function(n) {
                this.cancelSearch = !0;
                this._close(n)
            },
            _close: function(n) {
                this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", n))
            },
            _change: function(n) {
                this.previous !== this._value() && this._trigger("change", n, {
                    item: this.selectedItem
                })
            },
            _normalize: function(t) {
                return t.length && t[0].label && t[0].value ? t : n.map(t, function(t) {
                    return typeof t == "string" ? {
                        label: t,
                        value: t
                    } : n.extend({
                        label: t.label || t.value,
                        value: t.value || t.label
                    }, t)
                })
            },
            _suggest: function(t) {
                var i = this.menu.element.empty();
                this._renderMenu(i, t);
                this.isNewMenu = !0;
                this.menu.refresh();
                i.show();
                this._resizeMenu();
                i.position(n.extend({ of: this.element
                }, this.options.position));
                this.options.autoFocus && this.menu.next()
            },
            _resizeMenu: function() {
                var n = this.menu.element;
                n.outerWidth(Math.max(n.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function(t, i) {
                var r = this;
                n.each(i, function(n, i) {
                    r._renderItemData(t, i)
                })
            },
            _renderItemData: function(n, t) {
                return this._renderItem(n, t).data("ui-autocomplete-item", t)
            },
            _renderItem: function(t, i) {
                return n("<li>").append(n("<a>").text(i.label)).appendTo(t)
            },
            _move: function(n, t) {
                if (!this.menu.element.is(":visible")) {
                    this.search(null, t);
                    return
                }
                if (this.menu.isFirstItem() && /^previous/.test(n) || this.menu.isLastItem() && /^next/.test(n)) {
                    this._value(this.term);
                    this.menu.blur();
                    return
                }
                this.menu[n](t)
            },
            widget: function() {
                return this.menu.element
            },
            _value: function() {
                return this.valueMethod.apply(this.element, arguments)
            },
            _keyEvent: function(n, t) {
                (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(n, t), t.preventDefault())
            }
        });
        n.extend(n.ui.autocomplete, {
            escapeRegex: function(n) {
                return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            },
            filter: function(t, i) {
                var r = new RegExp(n.ui.autocomplete.escapeRegex(i), "i");
                return n.grep(t, function(n) {
                    return r.test(n.label || n.value || n)
                })
            }
        });
        n.widget("ui.autocomplete", n.ui.autocomplete, {
            options: {
                messages: {
                    noResults: "No search results.",
                    results: function(n) {
                        return n + (n > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                    }
                }
            },
            __response: function(n) {
                var t;
                (this._superApply(arguments), this.options.disabled || this.cancelSearch) || (t = n && n.length ? this.options.messages.results(n.length) : this.options.messages.noResults, this.liveRegion.text(t))
            }
        })
    }(jQuery), function(n) {
        var t, i = "ui-button ui-widget ui-state-default ui-corner-all",
            r = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
            f = function() {
                var t = n(this);
                setTimeout(function() {
                    t.find(":ui-button").button("refresh")
                }, 1)
            },
            u = function(t) {
                var i = t.name,
                    r = t.form,
                    u = n([]);
                return i && (i = i.replace(/'/g, "\\'"), u = r ? n(r).find("[name='" + i + "']") : n("[name='" + i + "']", t.ownerDocument).filter(function() {
                    return !this.form
                })), u
            };
        n.widget("ui.button", {
            version: "1.10.4",
            defaultElement: "<button>",
            options: {
                disabled: null,
                text: !0,
                label: null,
                icons: {
                    primary: null,
                    secondary: null
                }
            },
            _create: function() {
                this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, f);
                typeof this.options.disabled != "boolean" ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled);
                this._determineButtonType();
                this.hasTitle = !!this.buttonElement.attr("title");
                var e = this,
                    r = this.options,
                    o = this.type === "checkbox" || this.type === "radio",
                    s = o ? "" : "ui-state-active";
                r.label === null && (r.label = this.type === "input" ? this.buttonElement.val() : this.buttonElement.html());
                this._hoverable(this.buttonElement);
                this.buttonElement.addClass(i).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                    r.disabled || this === t && n(this).addClass("ui-state-active")
                }).bind("mouseleave" + this.eventNamespace, function() {
                    r.disabled || n(this).removeClass(s)
                }).bind("click" + this.eventNamespace, function(n) {
                    r.disabled && (n.preventDefault(), n.stopImmediatePropagation())
                });
                this._on({
                    focus: function() {
                        this.buttonElement.addClass("ui-state-focus")
                    },
                    blur: function() {
                        this.buttonElement.removeClass("ui-state-focus")
                    }
                });
                o && this.element.bind("change" + this.eventNamespace, function() {
                    e.refresh()
                });
                this.type === "checkbox" ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                    if (r.disabled) return !1
                }) : this.type === "radio" ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                    if (r.disabled) return !1;
                    n(this).addClass("ui-state-active");
                    e.buttonElement.attr("aria-pressed", "true");
                    var t = e.element[0];
                    u(t).not(t).map(function() {
                        return n(this).button("widget")[0]
                    }).removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                    if (r.disabled) return !1;
                    n(this).addClass("ui-state-active");
                    t = this;
                    e.document.one("mouseup", function() {
                        t = null
                    })
                }).bind("mouseup" + this.eventNamespace, function() {
                    if (r.disabled) return !1;
                    n(this).removeClass("ui-state-active")
                }).bind("keydown" + this.eventNamespace, function(t) {
                    if (r.disabled) return !1;
                    (t.keyCode === n.ui.keyCode.SPACE || t.keyCode === n.ui.keyCode.ENTER) && n(this).addClass("ui-state-active")
                }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                    n(this).removeClass("ui-state-active")
                }), this.buttonElement.is("a") && this.buttonElement.keyup(function(t) {
                    t.keyCode === n.ui.keyCode.SPACE && n(this).click()
                }));
                this._setOption("disabled", r.disabled);
                this._resetButton()
            },
            _determineButtonType: function() {
                var n, t, i;
                this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button";
                this.type === "checkbox" || this.type === "radio" ? (n = this.element.parents().last(), t = "label[for='" + this.element.attr("id") + "']", this.buttonElement = n.find(t), this.buttonElement.length || (n = n.length ? n.siblings() : this.element.siblings(), this.buttonElement = n.filter(t), this.buttonElement.length || (this.buttonElement = n.find(t))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
            },
            widget: function() {
                return this.buttonElement
            },
            _destroy: function() {
                this.element.removeClass("ui-helper-hidden-accessible");
                this.buttonElement.removeClass(i + " ui-state-active " + r).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
                this.hasTitle || this.buttonElement.removeAttr("title")
            },
            _setOption: function(n, t) {
                if (this._super(n, t), n === "disabled") {
                    this.element.prop("disabled", !!t);
                    t && this.buttonElement.removeClass("ui-state-focus");
                    return
                }
                this._resetButton()
            },
            refresh: function() {
                var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
                t !== this.options.disabled && this._setOption("disabled", t);
                this.type === "radio" ? u(this.element[0]).each(function() {
                    n(this).is(":checked") ? n(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : n(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : this.type === "checkbox" && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
            },
            _resetButton: function() {
                if (this.type === "input") {
                    this.options.label && this.element.val(this.options.label);
                    return
                }
                var i = this.buttonElement.removeClass(r),
                    e = n("<span><\/span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(i.empty()).text(),
                    t = this.options.icons,
                    f = t.primary && t.secondary,
                    u = [];
                t.primary || t.secondary ? (this.options.text && u.push("ui-button-text-icon" + (f ? "s" : t.primary ? "-primary" : "-secondary")), t.primary && i.prepend("<span class='ui-button-icon-primary ui-icon " + t.primary + "'><\/span>"), t.secondary && i.append("<span class='ui-button-icon-secondary ui-icon " + t.secondary + "'><\/span>"), this.options.text || (u.push(f ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || i.attr("title", n.trim(e)))) : u.push("ui-button-text-only");
                i.addClass(u.join(" "))
            }
        });
        n.widget("ui.buttonset", {
            version: "1.10.4",
            options: {
                items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
            },
            _create: function() {
                this.element.addClass("ui-buttonset")
            },
            _init: function() {
                this.refresh()
            },
            _setOption: function(n, t) {
                n === "disabled" && this.buttons.button("option", n, t);
                this._super(n, t)
            },
            refresh: function() {
                var t = this.element.css("direction") === "rtl";
                this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                    return n(this).button("widget")[0]
                }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(t ? "ui-corner-left" : "ui-corner-right").end().end()
            },
            _destroy: function() {
                this.element.removeClass("ui-buttonset");
                this.buttons.map(function() {
                    return n(this).button("widget")[0]
                }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
            }
        })
    }(jQuery), function(n, t) {
        function f() {
            this._curInst = null;
            this._keyEvent = !1;
            this._disabledInputs = [];
            this._datepickerShowing = !1;
            this._inDialog = !1;
            this._mainDivId = "ui-datepicker-div";
            this._inlineClass = "ui-datepicker-inline";
            this._appendClass = "ui-datepicker-append";
            this._triggerClass = "ui-datepicker-trigger";
            this._dialogClass = "ui-datepicker-dialog";
            this._disableClass = "ui-datepicker-disabled";
            this._unselectableClass = "ui-datepicker-unselectable";
            this._currentClass = "ui-datepicker-current-day";
            this._dayOverClass = "ui-datepicker-days-cell-over";
            this.regional = [];
            this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            };
            this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            };
            n.extend(this._defaults, this.regional[""]);
            this.dpDiv = e(n("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>"))
        }

        function e(t) {
            var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return t.delegate(i, "mouseout", function() {
                n(this).removeClass("ui-state-hover");
                this.className.indexOf("ui-datepicker-prev") !== -1 && n(this).removeClass("ui-datepicker-prev-hover");
                this.className.indexOf("ui-datepicker-next") !== -1 && n(this).removeClass("ui-datepicker-next-hover")
            }).delegate(i, "mouseover", function() {
                n.datepicker._isDisabledDatepicker(u.inline ? t.parent()[0] : u.input[0]) || (n(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), n(this).addClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && n(this).addClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && n(this).addClass("ui-datepicker-next-hover"))
            })
        }

        function r(t, i) {
            n.extend(t, i);
            for (var r in i) i[r] == null && (t[r] = i[r]);
            return t
        }
        n.extend(n.ui, {
            datepicker: {
                version: "1.10.4"
            }
        });
        var i = "datepicker",
            u;
        n.extend(f.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            _widgetDatepicker: function() {
                return this.dpDiv
            },
            setDefaults: function(n) {
                return r(this._defaults, n || {}), this
            },
            _attachDatepicker: function(t, i) {
                var r, f, u;
                r = t.nodeName.toLowerCase();
                f = r === "div" || r === "span";
                t.id || (this.uuid += 1, t.id = "dp" + this.uuid);
                u = this._newInst(n(t), f);
                u.settings = n.extend({}, i || {});
                r === "input" ? this._connectDatepicker(t, u) : f && this._inlineDatepicker(t, u)
            },
            _newInst: function(t, i) {
                var r = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
                return {
                    id: r,
                    input: t,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: i,
                    dpDiv: i ? e(n("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>")) : this.dpDiv
                }
            },
            _connectDatepicker: function(t, r) {
                var u = n(t);
                (r.append = n([]), r.trigger = n([]), u.hasClass(this.markerClassName)) || (this._attachments(u, r), u.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(r), n.data(t, i, r), r.settings.disabled && this._disableDatepicker(t))
            },
            _attachments: function(t, i) {
                var u, r, f, e = this._get(i, "appendText"),
                    o = this._get(i, "isRTL");
                i.append && i.append.remove();
                e && (i.append = n("<span class='" + this._appendClass + "'>" + e + "<\/span>"), t[o ? "before" : "after"](i.append));
                t.unbind("focus", this._showDatepicker);
                i.trigger && i.trigger.remove();
                u = this._get(i, "showOn");
                (u === "focus" || u === "both") && t.focus(this._showDatepicker);
                (u === "button" || u === "both") && (r = this._get(i, "buttonText"), f = this._get(i, "buttonImage"), i.trigger = n(this._get(i, "buttonImageOnly") ? n("<img/>").addClass(this._triggerClass).attr({
                    src: f,
                    alt: r,
                    title: r
                }) : n("<button type='button'><\/button>").addClass(this._triggerClass).html(f ? n("<img/>").attr({
                    src: f,
                    alt: r,
                    title: r
                }) : r)), t[o ? "before" : "after"](i.trigger), i.trigger.click(function() {
                    return n.datepicker._datepickerShowing && n.datepicker._lastInput === t[0] ? n.datepicker._hideDatepicker() : n.datepicker._datepickerShowing && n.datepicker._lastInput !== t[0] ? (n.datepicker._hideDatepicker(), n.datepicker._showDatepicker(t[0])) : n.datepicker._showDatepicker(t[0]), !1
                }))
            },
            _autoSize: function(n) {
                if (this._get(n, "autoSize") && !n.inline) {
                    var r, u, f, t, i = new Date(2009, 11, 20),
                        e = this._get(n, "dateFormat");
                    e.match(/[DM]/) && (r = function(n) {
                        for (u = 0, f = 0, t = 0; t < n.length; t++) n[t].length > u && (u = n[t].length, f = t);
                        return f
                    }, i.setMonth(r(this._get(n, e.match(/MM/) ? "monthNames" : "monthNamesShort"))), i.setDate(r(this._get(n, e.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - i.getDay()));
                    n.input.attr("size", this._formatDate(n, i).length)
                }
            },
            _inlineDatepicker: function(t, r) {
                var u = n(t);
                u.hasClass(this.markerClassName) || (u.addClass(this.markerClassName).append(r.dpDiv), n.data(t, i, r), this._setDate(r, this._getDefaultDate(r), !0), this._updateDatepicker(r), this._updateAlternate(r), r.settings.disabled && this._disableDatepicker(t), r.dpDiv.css("display", "block"))
            },
            _dialogDatepicker: function(t, u, f, e, o) {
                var h, c, l, a, v, s = this._dialogInst;
                return s || (this.uuid += 1, h = "dp" + this.uuid, this._dialogInput = n("<input type='text' id='" + h + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), n("body").append(this._dialogInput), s = this._dialogInst = this._newInst(this._dialogInput, !1), s.settings = {}, n.data(this._dialogInput[0], i, s)), r(s.settings, e || {}), u = u && u.constructor === Date ? this._formatDate(s, u) : u, this._dialogInput.val(u), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (c = document.documentElement.clientWidth, l = document.documentElement.clientHeight, a = document.documentElement.scrollLeft || document.body.scrollLeft, v = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [c / 2 - 100 + a, l / 2 - 150 + v]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), s.settings.onSelect = f, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), n.blockUI && n.blockUI(this.dpDiv), n.data(this._dialogInput[0], i, s), this
            },
            _destroyDatepicker: function(t) {
                var r, u = n(t),
                    f = n.data(t, i);
                u.hasClass(this.markerClassName) && (r = t.nodeName.toLowerCase(), n.removeData(t, i), r === "input" ? (f.append.remove(), f.trigger.remove(), u.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (r === "div" || r === "span") && u.removeClass(this.markerClassName).empty())
            },
            _enableDatepicker: function(t) {
                var r, u, f = n(t),
                    e = n.data(t, i);
                f.hasClass(this.markerClassName) && (r = t.nodeName.toLowerCase(), r === "input" ? (t.disabled = !1, e.trigger.filter("button").each(function() {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })) : (r === "div" || r === "span") && (u = f.children("." + this._inlineClass), u.children().removeClass("ui-state-disabled"), u.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = n.map(this._disabledInputs, function(n) {
                    return n === t ? null : n
                }))
            },
            _disableDatepicker: function(t) {
                var r, u, f = n(t),
                    e = n.data(t, i);
                f.hasClass(this.markerClassName) && (r = t.nodeName.toLowerCase(), r === "input" ? (t.disabled = !0, e.trigger.filter("button").each(function() {
                    this.disabled = !0
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })) : (r === "div" || r === "span") && (u = f.children("." + this._inlineClass), u.children().addClass("ui-state-disabled"), u.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = n.map(this._disabledInputs, function(n) {
                    return n === t ? null : n
                }), this._disabledInputs[this._disabledInputs.length] = t)
            },
            _isDisabledDatepicker: function(n) {
                if (!n) return !1;
                for (var t = 0; t < this._disabledInputs.length; t++)
                    if (this._disabledInputs[t] === n) return !0;
                return !1
            },
            _getInst: function(t) {
                try {
                    return n.data(t, i)
                } catch (r) {
                    throw "Missing instance data for this datepicker";
                }
            },
            _optionDatepicker: function(i, u, f) {
                var o, c, s, h, e = this._getInst(i);
                if (arguments.length === 2 && typeof u == "string") return u === "defaults" ? n.extend({}, n.datepicker._defaults) : e ? u === "all" ? n.extend({}, e.settings) : this._get(e, u) : null;
                o = u || {};
                typeof u == "string" && (o = {}, o[u] = f);
                e && (this._curInst === e && this._hideDatepicker(), c = this._getDateDatepicker(i, !0), s = this._getMinMaxDate(e, "min"), h = this._getMinMaxDate(e, "max"), r(e.settings, o), s !== null && o.dateFormat !== t && o.minDate === t && (e.settings.minDate = this._formatDate(e, s)), h !== null && o.dateFormat !== t && o.maxDate === t && (e.settings.maxDate = this._formatDate(e, h)), "disabled" in o && (o.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(n(i), e), this._autoSize(e), this._setDate(e, c), this._updateAlternate(e), this._updateDatepicker(e))
            },
            _changeDatepicker: function(n, t, i) {
                this._optionDatepicker(n, t, i)
            },
            _refreshDatepicker: function(n) {
                var t = this._getInst(n);
                t && this._updateDatepicker(t)
            },
            _setDateDatepicker: function(n, t) {
                var i = this._getInst(n);
                i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
            },
            _getDateDatepicker: function(n, t) {
                var i = this._getInst(n);
                return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null
            },
            _doKeyDown: function(t) {
                var u, e, f, i = n.datepicker._getInst(t.target),
                    r = !0,
                    o = i.dpDiv.is(".ui-datepicker-rtl");
                if (i._keyEvent = !0, n.datepicker._datepickerShowing) switch (t.keyCode) {
                    case 9:
                        n.datepicker._hideDatepicker();
                        r = !1;
                        break;
                    case 13:
                        return f = n("td." + n.datepicker._dayOverClass + ":not(." + n.datepicker._currentClass + ")", i.dpDiv), f[0] && n.datepicker._selectDay(t.target, i.selectedMonth, i.selectedYear, f[0]), u = n.datepicker._get(i, "onSelect"), u ? (e = n.datepicker._formatDate(i), u.apply(i.input ? i.input[0] : null, [e, i])) : n.datepicker._hideDatepicker(), !1;
                    case 27:
                        n.datepicker._hideDatepicker();
                        break;
                    case 33:
                        n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                        break;
                    case 34:
                        n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                        break;
                    case 35:
                        (t.ctrlKey || t.metaKey) && n.datepicker._clearDate(t.target);
                        r = t.ctrlKey || t.metaKey;
                        break;
                    case 36:
                        (t.ctrlKey || t.metaKey) && n.datepicker._gotoToday(t.target);
                        r = t.ctrlKey || t.metaKey;
                        break;
                    case 37:
                        (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? 1 : -1, "D");
                        r = t.ctrlKey || t.metaKey;
                        t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                        break;
                    case 38:
                        (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, -7, "D");
                        r = t.ctrlKey || t.metaKey;
                        break;
                    case 39:
                        (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? -1 : 1, "D");
                        r = t.ctrlKey || t.metaKey;
                        t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                        break;
                    case 40:
                        (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, 7, "D");
                        r = t.ctrlKey || t.metaKey;
                        break;
                    default:
                        r = !1
                } else t.keyCode === 36 && t.ctrlKey ? n.datepicker._showDatepicker(this) : r = !1;
                r && (t.preventDefault(), t.stopPropagation())
            },
            _doKeyPress: function(t) {
                var i, r, u = n.datepicker._getInst(t.target);
                if (n.datepicker._get(u, "constrainInput")) return i = n.datepicker._possibleChars(n.datepicker._get(u, "dateFormat")), r = String.fromCharCode(t.charCode == null ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || r < " " || !i || i.indexOf(r) > -1
            },
            _doKeyUp: function(t) {
                var r, i = n.datepicker._getInst(t.target);
                if (i.input.val() !== i.lastVal) try {
                    r = n.datepicker.parseDate(n.datepicker._get(i, "dateFormat"), i.input ? i.input.val() : null, n.datepicker._getFormatConfig(i));
                    r && (n.datepicker._setDateFromField(i), n.datepicker._updateAlternate(i), n.datepicker._updateDatepicker(i))
                } catch (u) {}
                return !0
            },
            _showDatepicker: function(t) {
                if (t = t.target || t, t.nodeName.toLowerCase() !== "input" && (t = n("input", t.parentNode)[0]), !n.datepicker._isDisabledDatepicker(t) && n.datepicker._lastInput !== t) {
                    var i, o, s, u, f, e, h;
                    (i = n.datepicker._getInst(t), n.datepicker._curInst && n.datepicker._curInst !== i && (n.datepicker._curInst.dpDiv.stop(!0, !0), i && n.datepicker._datepickerShowing && n.datepicker._hideDatepicker(n.datepicker._curInst.input[0])), o = n.datepicker._get(i, "beforeShow"), s = o ? o.apply(t, [t, i]) : {}, s !== !1) && (r(i.settings, s), i.lastVal = null, n.datepicker._lastInput = t, n.datepicker._setDateFromField(i), n.datepicker._inDialog && (t.value = ""), n.datepicker._pos || (n.datepicker._pos = n.datepicker._findPos(t), n.datepicker._pos[1] += t.offsetHeight), u = !1, n(t).parents().each(function() {
                        return u |= n(this).css("position") === "fixed", !u
                    }), f = {
                        left: n.datepicker._pos[0],
                        top: n.datepicker._pos[1]
                    }, n.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    }), n.datepicker._updateDatepicker(i), f = n.datepicker._checkOffset(i, f, u), i.dpDiv.css({
                        position: n.datepicker._inDialog && n.blockUI ? "static" : u ? "fixed" : "absolute",
                        display: "none",
                        left: f.left + "px",
                        top: f.top + "px"
                    }), i.inline || (e = n.datepicker._get(i, "showAnim"), h = n.datepicker._get(i, "duration"), i.dpDiv.zIndex(n(t).zIndex() + 1), n.datepicker._datepickerShowing = !0, n.effects && n.effects.effect[e] ? i.dpDiv.show(e, n.datepicker._get(i, "showOptions"), h) : i.dpDiv[e || "show"](e ? h : null), n.datepicker._shouldFocusInput(i) && i.input.focus(), n.datepicker._curInst = i))
                }
            },
            _updateDatepicker: function(t) {
                this.maxRows = 4;
                u = t;
                t.dpDiv.empty().append(this._generateHTML(t));
                this._attachHandlers(t);
                t.dpDiv.find("." + this._dayOverClass + " a").mouseover();
                var i, r = this._getNumberOfMonths(t),
                    f = r[1];
                t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
                f > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", 17 * f + "em");
                t.dpDiv[(r[0] !== 1 || r[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
                t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
                t === n.datepicker._curInst && n.datepicker._datepickerShowing && n.datepicker._shouldFocusInput(t) && t.input.focus();
                t.yearshtml && (i = t.yearshtml, setTimeout(function() {
                    i === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml);
                    i = t.yearshtml = null
                }, 0))
            },
            _shouldFocusInput: function(n) {
                return n.input && n.input.is(":visible") && !n.input.is(":disabled") && !n.input.is(":focus")
            },
            _checkOffset: function(t, i, r) {
                var u = t.dpDiv.outerWidth(),
                    f = t.dpDiv.outerHeight(),
                    h = t.input ? t.input.outerWidth() : 0,
                    o = t.input ? t.input.outerHeight() : 0,
                    e = document.documentElement.clientWidth + (r ? 0 : n(document).scrollLeft()),
                    s = document.documentElement.clientHeight + (r ? 0 : n(document).scrollTop());
                return i.left -= this._get(t, "isRTL") ? u - h : 0, i.left -= r && i.left === t.input.offset().left ? n(document).scrollLeft() : 0, i.top -= r && i.top === t.input.offset().top + o ? n(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + u > e && e > u ? Math.abs(i.left + u - e) : 0), i.top -= Math.min(i.top, i.top + f > s && s > f ? Math.abs(f + o) : 0), i
            },
            _findPos: function(t) {
                for (var i, r = this._getInst(t), u = this._get(r, "isRTL"); t && (t.type === "hidden" || t.nodeType !== 1 || n.expr.filters.hidden(t));) t = t[u ? "previousSibling" : "nextSibling"];
                return i = n(t).offset(), [i.left, i.top]
            },
            _hideDatepicker: function(t) {
                var u, e, f, o, r = this._curInst;
                r && (!t || r === n.data(t, i)) && this._datepickerShowing && (u = this._get(r, "showAnim"), e = this._get(r, "duration"), f = function() {
                    n.datepicker._tidyDialog(r)
                }, n.effects && (n.effects.effect[u] || n.effects[u]) ? r.dpDiv.hide(u, n.datepicker._get(r, "showOptions"), e, f) : r.dpDiv[u === "slideDown" ? "slideUp" : u === "fadeIn" ? "fadeOut" : "hide"](u ? e : null, f), u || f(), this._datepickerShowing = !1, o = this._get(r, "onClose"), o && o.apply(r.input ? r.input[0] : null, [r.input ? r.input.val() : "", r]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), n.blockUI && (n.unblockUI(), n("body").append(this.dpDiv))), this._inDialog = !1)
            },
            _tidyDialog: function(n) {
                n.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
            },
            _checkExternalClick: function(t) {
                if (n.datepicker._curInst) {
                    var i = n(t.target),
                        r = n.datepicker._getInst(i[0]);
                    (i[0].id === n.datepicker._mainDivId || i.parents("#" + n.datepicker._mainDivId).length !== 0 || i.hasClass(n.datepicker.markerClassName) || i.closest("." + n.datepicker._triggerClass).length || !n.datepicker._datepickerShowing || n.datepicker._inDialog && n.blockUI) && (!i.hasClass(n.datepicker.markerClassName) || n.datepicker._curInst === r) || n.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function(t, i, r) {
                var f = n(t),
                    u = this._getInst(f[0]);
                this._isDisabledDatepicker(f[0]) || (this._adjustInstDate(u, i + (r === "M" ? this._get(u, "showCurrentAtPos") : 0), r), this._updateDatepicker(u))
            },
            _gotoToday: function(t) {
                var r, u = n(t),
                    i = this._getInst(u[0]);
                this._get(i, "gotoCurrent") && i.currentDay ? (i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear) : (r = new Date, i.selectedDay = r.getDate(), i.drawMonth = i.selectedMonth = r.getMonth(), i.drawYear = i.selectedYear = r.getFullYear());
                this._notifyChange(i);
                this._adjustDate(u)
            },
            _selectMonthYear: function(t, i, r) {
                var f = n(t),
                    u = this._getInst(f[0]);
                u["selected" + (r === "M" ? "Month" : "Year")] = u["draw" + (r === "M" ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10);
                this._notifyChange(u);
                this._adjustDate(f)
            },
            _selectDay: function(t, i, r, u) {
                var f, e = n(t);
                n(u).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0]) || (f = this._getInst(e[0]), f.selectedDay = f.currentDay = n("a .solar-date", u).html(), f.selectedMonth = f.currentMonth = i, f.selectedYear = f.currentYear = r, this._selectDate(t, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)))
            },
            _clearDate: function(t) {
                var i = n(t);
                this._selectDate(i, "")
            },
            _selectDate: function(t, i) {
                var u, f = n(t),
                    r = this._getInst(f[0]);
                i = i != null ? i : this._formatDate(r);
                r.input && r.input.val(i);
                this._updateAlternate(r);
                u = this._get(r, "onSelect");
                u ? u.apply(r.input ? r.input[0] : null, [i, r]) : r.input && r.input.trigger("change");
                r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(), this._lastInput = r.input[0], typeof r.input[0] != "object" && r.input.focus(), this._lastInput = null)
            },
            _updateAlternate: function(t) {
                var i, r, u, f = this._get(t, "altField");
                f && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"), r = this._getDate(t), u = this.formatDate(i, r, this._getFormatConfig(t)), n(f).each(function() {
                    n(this).val(u)
                }))
            },
            noWeekends: function(n) {
                var t = n.getDay();
                return [t > 0 && t < 6, ""]
            },
            iso8601Week: function(n) {
                var i, t = new Date(n.getTime());
                return t.setDate(t.getDate() + 4 - (t.getDay() || 7)), i = t.getTime(), t.setMonth(0), t.setDate(1), Math.floor(Math.round((i - t) / 864e5) / 7) + 1
            },
            parseDate: function(t, i, r) {
                if (t == null || i == null) throw "Invalid arguments";
                if (i = typeof i == "object" ? i.toString() : i + "", i === "") return null;
                for (var a, v, f = 0, y = (r ? r.shortYearCutoff : null) || this._defaults.shortYearCutoff, d = typeof y != "string" ? y : (new Date).getFullYear() % 100 + parseInt(y, 10), g = (r ? r.dayNamesShort : null) || this._defaults.dayNamesShort, nt = (r ? r.dayNames : null) || this._defaults.dayNames, tt = (r ? r.monthNamesShort : null) || this._defaults.monthNamesShort, it = (r ? r.monthNames : null) || this._defaults.monthNames, e = -1, o = -1, s = -1, p = -1, w = !1, u, l = function(n) {
                        var i = h + 1 < t.length && t.charAt(h + 1) === n;
                        return i && h++, i
                    }, c = function(n) {
                        var r = l(n),
                            u = n === "@" ? 14 : n === "!" ? 20 : n === "y" && r ? 4 : n === "o" ? 3 : 2,
                            e = new RegExp("^\\d{1," + u + "}"),
                            t = i.substring(f).match(e);
                        if (!t) throw "Missing number at position " + f;
                        return f += t[0].length, parseInt(t[0], 10)
                    }, k = function(t, r, u) {
                        var e = -1,
                            o = n.map(l(t) ? u : r, function(n, t) {
                                return [
                                    [t, n]
                                ]
                            }).sort(function(n, t) {
                                return -(n[1].length - t[1].length)
                            });
                        if (n.each(o, function(n, t) {
                                var r = t[1];
                                if (i.substr(f, r.length).toLowerCase() === r.toLowerCase()) return e = t[0], f += r.length, !1
                            }), e !== -1) return e + 1;
                        throw "Unknown name at position " + f;
                    }, b = function() {
                        if (i.charAt(f) !== t.charAt(h)) throw "Unexpected literal at position " + f;
                        f++
                    }, h = 0; h < t.length; h++)
                    if (w) t.charAt(h) !== "'" || l("'") ? b() : w = !1;
                    else switch (t.charAt(h)) {
                        case "d":
                            s = c("d");
                            break;
                        case "D":
                            k("D", g, nt);
                            break;
                        case "o":
                            p = c("o");
                            break;
                        case "m":
                            o = c("m");
                            break;
                        case "M":
                            o = k("M", tt, it);
                            break;
                        case "y":
                            e = c("y");
                            break;
                        case "@":
                            u = new Date(c("@"));
                            e = u.getFullYear();
                            o = u.getMonth() + 1;
                            s = u.getDate();
                            break;
                        case "!":
                            u = new Date((c("!") - this._ticksTo1970) / 1e4);
                            e = u.getFullYear();
                            o = u.getMonth() + 1;
                            s = u.getDate();
                            break;
                        case "'":
                            l("'") ? b() : w = !0;
                            break;
                        default:
                            b()
                    }
                if (f < i.length && (v = i.substr(f), !/^\s+/.test(v))) throw "Extra/unparsed characters found in date: " + v;
                if (e === -1 ? e = (new Date).getFullYear() : e < 100 && (e += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (e <= d ? 0 : -100)), p > -1) {
                    o = 1;
                    s = p;
                    do {
                        if (a = this._getDaysInMonth(e, o - 1), s <= a) break;
                        o++;
                        s -= a
                    } while (1)
                }
                if (u = this._daylightSavingAdjust(new Date(e, o - 1, s)), u.getFullYear() !== e || u.getMonth() + 1 !== o || u.getDate() !== s) throw "Invalid date";
                return u
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: (718685 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 864e9,
            formatDate: function(n, t, i) {
                if (!t) return "";
                var u, h = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                    c = (i ? i.dayNames : null) || this._defaults.dayNames,
                    l = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                    a = (i ? i.monthNames : null) || this._defaults.monthNames,
                    f = function(t) {
                        var i = u + 1 < n.length && n.charAt(u + 1) === t;
                        return i && u++, i
                    },
                    e = function(n, t, i) {
                        var r = "" + t;
                        if (f(n))
                            while (r.length < i) r = "0" + r;
                        return r
                    },
                    s = function(n, t, i, r) {
                        return f(n) ? r[t] : i[t]
                    },
                    r = "",
                    o = !1;
                if (t)
                    for (u = 0; u < n.length; u++)
                        if (o) n.charAt(u) !== "'" || f("'") ? r += n.charAt(u) : o = !1;
                        else switch (n.charAt(u)) {
                            case "d":
                                r += e("d", t.getDate(), 2);
                                break;
                            case "D":
                                r += s("D", t.getDay(), h, c);
                                break;
                            case "o":
                                r += e("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                r += e("m", t.getMonth() + 1, 2);
                                break;
                            case "M":
                                r += s("M", t.getMonth(), l, a);
                                break;
                            case "y":
                                r += f("y") ? t.getFullYear() : (t.getYear() % 100 < 10 ? "0" : "") + t.getYear() % 100;
                                break;
                            case "@":
                                r += t.getTime();
                                break;
                            case "!":
                                r += t.getTime() * 1e4 + this._ticksTo1970;
                                break;
                            case "'":
                                f("'") ? r += "'" : o = !0;
                                break;
                            default:
                                r += n.charAt(u)
                        }
                return r
            },
            _possibleChars: function(n) {
                for (var i = "", r = !1, u = function(i) {
                        var r = t + 1 < n.length && n.charAt(t + 1) === i;
                        return r && t++, r
                    }, t = 0; t < n.length; t++)
                    if (r) n.charAt(t) !== "'" || u("'") ? i += n.charAt(t) : r = !1;
                    else switch (n.charAt(t)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            i += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            u("'") ? i += "'" : r = !0;
                            break;
                        default:
                            i += n.charAt(t)
                    }
                return i
            },
            _get: function(n, i) {
                return n.settings[i] !== t ? n.settings[i] : this._defaults[i]
            },
            _setDateFromField: function(n, t) {
                if (n.input.val() !== n.lastVal) {
                    var f = this._get(n, "dateFormat"),
                        r = n.lastVal = n.input ? n.input.val() : null,
                        u = this._getDefaultDate(n),
                        i = u,
                        e = this._getFormatConfig(n);
                    try {
                        i = this.parseDate(f, r, e) || u
                    } catch (o) {
                        r = t ? "" : r
                    }
                    n.selectedDay = i.getDate();
                    n.drawMonth = n.selectedMonth = i.getMonth();
                    n.drawYear = n.selectedYear = i.getFullYear();
                    n.currentDay = r ? i.getDate() : 0;
                    n.currentMonth = r ? i.getMonth() : 0;
                    n.currentYear = r ? i.getFullYear() : 0;
                    this._adjustInstDate(n)
                }
            },
            _getDefaultDate: function(n) {
                return this._restrictMinMax(n, this._determineDate(n, this._get(n, "defaultDate"), new Date))
            },
            _determineDate: function(t, i, r) {
                var f = function(n) {
                        var t = new Date;
                        return t.setDate(t.getDate() + n), t
                    },
                    e = function(i) {
                        try {
                            return n.datepicker.parseDate(n.datepicker._get(t, "dateFormat"), i, n.datepicker._getFormatConfig(t))
                        } catch (h) {}
                        for (var o = (i.toLowerCase().match(/^c/) ? n.datepicker._getDate(t) : null) || new Date, f = o.getFullYear(), e = o.getMonth(), r = o.getDate(), s = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, u = s.exec(i); u;) {
                            switch (u[2] || "d") {
                                case "d":
                                case "D":
                                    r += parseInt(u[1], 10);
                                    break;
                                case "w":
                                case "W":
                                    r += parseInt(u[1], 10) * 7;
                                    break;
                                case "m":
                                case "M":
                                    e += parseInt(u[1], 10);
                                    r = Math.min(r, n.datepicker._getDaysInMonth(f, e));
                                    break;
                                case "y":
                                case "Y":
                                    f += parseInt(u[1], 10);
                                    r = Math.min(r, n.datepicker._getDaysInMonth(f, e))
                            }
                            u = s.exec(i)
                        }
                        return new Date(f, e, r)
                    },
                    u = i == null || i === "" ? r : typeof i == "string" ? e(i) : typeof i == "number" ? isNaN(i) ? r : f(i) : new Date(i.getTime());
                return u = u && u.toString() === "Invalid Date" ? r : u, u && (u.setHours(0), u.setMinutes(0), u.setSeconds(0), u.setMilliseconds(0)), this._daylightSavingAdjust(u)
            },
            _daylightSavingAdjust: function(n) {
                return n ? (n.setHours(n.getHours() > 12 ? n.getHours() + 2 : 0), n) : null
            },
            _setDate: function(n, t, i) {
                var u = !t,
                    f = n.selectedMonth,
                    e = n.selectedYear,
                    r = this._restrictMinMax(n, this._determineDate(n, t, new Date));
                n.selectedDay = n.currentDay = r.getDate();
                n.drawMonth = n.selectedMonth = n.currentMonth = r.getMonth();
                n.drawYear = n.selectedYear = n.currentYear = r.getFullYear();
                f === n.selectedMonth && e === n.selectedYear || i || this._notifyChange(n);
                this._adjustInstDate(n);
                n.input && n.input.val(u ? "" : this._formatDate(n))
            },
            _getDate: function(n) {
                return !n.currentYear || n.input && n.input.val() === "" ? null : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay))
            },
            _attachHandlers: function(t) {
                var r = this._get(t, "stepMonths"),
                    i = "#" + t.id.replace(/\\\\/g, "\\");
                t.dpDiv.find("[data-handler]").map(function() {
                    var t = {
                        prev: function() {
                            n.datepicker._adjustDate(i, -r, "M")
                        },
                        next: function() {
                            n.datepicker._adjustDate(i, +r, "M")
                        },
                        hide: function() {
                            n.datepicker._hideDatepicker()
                        },
                        today: function() {
                            n.datepicker._gotoToday(i)
                        },
                        selectDay: function() {
                            return n.datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                        },
                        selectMonth: function() {
                            return n.datepicker._selectMonthYear(i, this, "M"), !1
                        },
                        selectYear: function() {
                            return n.datepicker._selectMonthYear(i, this, "Y"), !1
                        }
                    };
                    n(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
                })
            },
            _generateHTML: function(n) {
                var b, s, rt, h, ut, k, ft, et, ei, c, ot, oi, si, hi, ci, st, g, li, ht, nt, f, y, ct, p, lt, l, u, at, vt, yt, pt, tt, wt, t, bt, kt, d, a, it, dt = new Date,
                    gt = this._daylightSavingAdjust(new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())),
                    e = this._get(n, "isRTL"),
                    pi = this._get(n, "showButtonPanel"),
                    ai = this._get(n, "hideIfNoPrevNext"),
                    ni = this._get(n, "navigationAsDateFormat"),
                    o = this._getNumberOfMonths(n),
                    wi = this._get(n, "showCurrentAtPos"),
                    vi = this._get(n, "stepMonths"),
                    ti = o[0] !== 1 || o[1] !== 1,
                    ii = this._daylightSavingAdjust(n.currentDay ? new Date(n.currentYear, n.currentMonth, n.currentDay) : new Date(9999, 9, 9)),
                    w = this._getMinMaxDate(n, "min"),
                    v = this._getMinMaxDate(n, "max"),
                    i = n.drawMonth - wi,
                    r = n.drawYear,
                    yi;
                if (i < 0 && (i += 12, r--), v)
                    for (b = this._daylightSavingAdjust(new Date(v.getFullYear(), v.getMonth() - o[0] * o[1] + 1, v.getDate())), b = w && b < w ? w : b; this._daylightSavingAdjust(new Date(r, i, 1)) > b;) i--, i < 0 && (i = 11, r--);
                for (n.drawMonth = i, n.drawYear = r, s = this._get(n, "prevText"), s = ni ? this.formatDate(s, this._daylightSavingAdjust(new Date(r, i - vi, 1)), this._getFormatConfig(n)) : s, rt = this._canAdjustMonth(n, -1, r, i) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (e ? "e" : "w") + "'>" + s + "<\/span><\/a>" : ai ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (e ? "e" : "w") + "'>" + s + "<\/span><\/a>", h = this._get(n, "nextText"), h = ni ? this.formatDate(h, this._daylightSavingAdjust(new Date(r, i + vi, 1)), this._getFormatConfig(n)) : h, ut = this._canAdjustMonth(n, 1, r, i) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (e ? "w" : "e") + "'>" + h + "<\/span><\/a>" : ai ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (e ? "w" : "e") + "'>" + h + "<\/span><\/a>", k = this._get(n, "currentText"), ft = this._get(n, "gotoCurrent") && n.currentDay ? ii : gt, k = ni ? this.formatDate(k, ft, this._getFormatConfig(n)) : k, et = n.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(n, "closeText") + "<\/button>", ei = pi ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (e ? et : "") + (this._isInRange(n, ft) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + k + "<\/button>" : "") + (e ? "" : et) + "<\/div>" : "", c = parseInt(this._get(n, "firstDay"), 10), c = isNaN(c) ? 0 : c, ot = this._get(n, "showWeek"), oi = this._get(n, "dayNames"), si = this._get(n, "dayNamesMin"), hi = this._get(n, "monthNames"), ci = this._get(n, "monthNamesShort"), st = this._get(n, "beforeShowDay"), g = this._get(n, "showOtherMonths"), li = this._get(n, "selectOtherMonths"), ht = this._getDefaultDate(n), nt = "", f, y = 0; y < o[0]; y++) {
                    for (ct = "", this.maxRows = 4, p = 0; p < o[1]; p++) {
                        if (lt = this._daylightSavingAdjust(new Date(r, i, n.selectedDay)), l = " ui-corner-all", u = "", ti) {
                            if (u += "<div class='ui-datepicker-group", o[1] > 1) switch (p) {
                                case 0:
                                    u += " ui-datepicker-group-first";
                                    l = " ui-corner-" + (e ? "right" : "left");
                                    break;
                                case o[1] - 1:
                                    u += " ui-datepicker-group-last";
                                    l = " ui-corner-" + (e ? "left" : "right");
                                    break;
                                default:
                                    u += " ui-datepicker-group-middle";
                                    l = ""
                            }
                            u += "'>"
                        }
                        for (u += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + l + "'>" + (/all|left/.test(l) && y === 0 ? e ? ut : rt : "") + (/all|right/.test(l) && y === 0 ? e ? rt : ut : "") + this._generateMonthYearHeader(n, i, r, w, v, y > 0 || p > 0, hi, ci) + "<\/div><table class='ui-datepicker-calendar'><thead><tr>", at = ot ? "<th class='ui-datepicker-week-col'>" + this._get(n, "weekHeader") + "<\/th>" : "", f = 0; f < 7; f++) vt = (f + c) % 7, at += "<th" + ((f + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + oi[vt] + "'>" + si[vt] + "<\/span><\/th>";
                        for (u += at + "<\/tr><\/thead><tbody>", yt = this._getDaysInMonth(r, i), r === n.selectedYear && i === n.selectedMonth && (n.selectedDay = Math.min(n.selectedDay, yt)), pt = (this._getFirstDayOfMonth(r, i) - c + 7) % 7, tt = Math.ceil((pt + yt) / 7), wt = ti ? this.maxRows > tt ? this.maxRows : tt : tt, this.maxRows = wt, t = this._daylightSavingAdjust(new Date(r, i, 1 - pt)), yi = ["26-1-2017", "27-1-2017", "28-1-2017", "29-1-2017", "30-1-2017", "31-1-2017"], bt = 0; bt < wt; bt++) {
                            for (u += "<tr class='tr-date'>", kt = ot ? "<td class='ui-datepicker-week-col'>" + this._get(n, "calculateWeek")(t) + "<\/td>" : "", f = 0; f < 7; f++) {
                                var ri = convertSolar2Lunar(+t.getDate(), t.getMonth() + 1, +t.getFullYear(), 7),
                                    ui = ri[0],
                                    fi = !1;
                                yi.indexOf(t.getDate() + "-" + (t.getMonth() + 1) + "-" + t.getFullYear()) >= 0 && (fi = !0);
                                ri[0] == "1" && (ui += "/" + ri[1], fi = !0);
                                d = st ? st.apply(n.input ? n.input[0] : null, [t]) : [!0, ""];
                                a = t.getMonth() !== i;
                                it = a && !li || !d[0] || w && t < w || v && t > v;
                                kt += "<td class='td-date " + (fi == !0 ? "special-date" : "") + ((f + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (a ? " ui-datepicker-other-month" : "") + (t.getTime() === lt.getTime() && i === n.selectedMonth && n._keyEvent || ht.getTime() === t.getTime() && ht.getTime() === lt.getTime() ? " " + this._dayOverClass : "") + (it ? " " + this._unselectableClass + " ui-state-disabled" : "") + (a && !g ? "" : " " + d[1] + (t.getTime() === ii.getTime() ? " " + this._currentClass : "") + (t.getTime() === gt.getTime() ? " ui-datepicker-today" : "")) + "'" + ((!a || g) && d[2] ? " title='" + d[2].replace(/'/g, "&#39;") + "'" : "") + (it ? "" : " data-handler='selectDay' data-event='click' data-month='" + t.getMonth() + "' data-year='" + t.getFullYear() + "'") + ">" + (a && !g ? "&#xa0;" : it ? "<span class='ui-state-default'><span class='solar-date'>" + t.getDate() + "<\/span><span class='lunar-date'>" + ui + "<\/span><\/span>" : "<a class='ui-state-default" + (t.getTime() === gt.getTime() ? " ui-state-highlight" : "") + (t.getTime() === ii.getTime() ? " ui-state-active" : "") + (a ? " ui-priority-secondary" : "") + "' href='#'><span class='solar-date'>" + t.getDate() + "<\/span><span class='lunar-date'>" + ui + "<\/span><\/a>") + "<\/td>";
                                t.setDate(t.getDate() + 1);
                                t = this._daylightSavingAdjust(t)
                            }
                            u += kt + "<\/tr>"
                        }
                        i++;
                        i > 11 && (i = 0, r++);
                        u += "<\/tbody><\/table>" + (ti ? "<\/div>" + (o[0] > 0 && p === o[1] - 1 ? "<div class='ui-datepicker-row-break'><\/div>" : "") : "");
                        ct += u
                    }
                    nt += ct
                }
                return nt += ei, n._keyEvent = !1, nt
            },
            _generateMonthYearHeader: function(n, t, i, r, u, f, e, o) {
                var k, d, h, v, y, p, s, a, w = this._get(n, "changeMonth"),
                    b = this._get(n, "changeYear"),
                    g = this._get(n, "showMonthAfterYear"),
                    c = "<div class='ui-datepicker-title'>",
                    l = "";
                if (f || !w) l += "<span class='ui-datepicker-month'>" + e[t] + "<\/span>";
                else {
                    for (k = r && r.getFullYear() === i, d = u && u.getFullYear() === i, l += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", h = 0; h < 12; h++)(!k || h >= r.getMonth()) && (!d || h <= u.getMonth()) && (l += "<option value='" + h + "'" + (h === t ? " selected='selected'" : "") + ">" + o[h] + "<\/option>");
                    l += "<\/select>"
                }
                if (g || (c += l + (f || !(w && b) ? "&#xa0;" : "")), !n.yearshtml)
                    if (n.yearshtml = "", f || !b) c += "<span class='ui-datepicker-year'>" + i + "<\/span>";
                    else {
                        for (v = this._get(n, "yearRange").split(":"), y = (new Date).getFullYear(), p = function(n) {
                                var t = n.match(/c[+\-].*/) ? i + parseInt(n.substring(1), 10) : n.match(/[+\-].*/) ? y + parseInt(n, 10) : parseInt(n, 10);
                                return isNaN(t) ? y : t
                            }, s = p(v[0]), a = Math.max(s, p(v[1] || "")), s = r ? Math.max(s, r.getFullYear()) : s, a = u ? Math.min(a, u.getFullYear()) : a, n.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; s <= a; s++) n.yearshtml += "<option value='" + s + "'" + (s === i ? " selected='selected'" : "") + ">" + s + "<\/option>";
                        n.yearshtml += "<\/select>";
                        c += n.yearshtml;
                        n.yearshtml = null
                    }
                return c += this._get(n, "yearSuffix"), g && (c += (f || !(w && b) ? "&#xa0;" : "") + l), c + "<\/div>"
            },
            _adjustInstDate: function(n, t, i) {
                var u = n.drawYear + (i === "Y" ? t : 0),
                    f = n.drawMonth + (i === "M" ? t : 0),
                    e = Math.min(n.selectedDay, this._getDaysInMonth(u, f)) + (i === "D" ? t : 0),
                    r = this._restrictMinMax(n, this._daylightSavingAdjust(new Date(u, f, e)));
                n.selectedDay = r.getDate();
                n.drawMonth = n.selectedMonth = r.getMonth();
                n.drawYear = n.selectedYear = r.getFullYear();
                (i === "M" || i === "Y") && this._notifyChange(n)
            },
            _restrictMinMax: function(n, t) {
                var i = this._getMinMaxDate(n, "min"),
                    r = this._getMinMaxDate(n, "max"),
                    u = i && t < i ? i : t;
                return r && u > r ? r : u
            },
            _notifyChange: function(n) {
                var t = this._get(n, "onChangeMonthYear");
                t && t.apply(n.input ? n.input[0] : null, [n.selectedYear, n.selectedMonth + 1, n])
            },
            _getNumberOfMonths: function(n) {
                var t = this._get(n, "numberOfMonths");
                return t == null ? [1, 1] : typeof t == "number" ? [1, t] : t
            },
            _getMinMaxDate: function(n, t) {
                return this._determineDate(n, this._get(n, t + "Date"), null)
            },
            _getDaysInMonth: function(n, t) {
                return 32 - this._daylightSavingAdjust(new Date(n, t, 32)).getDate()
            },
            _getFirstDayOfMonth: function(n, t) {
                return new Date(n, t, 1).getDay()
            },
            _canAdjustMonth: function(n, t, i, r) {
                var f = this._getNumberOfMonths(n),
                    u = this._daylightSavingAdjust(new Date(i, r + (t < 0 ? t : f[0] * f[1]), 1));
                return t < 0 && u.setDate(this._getDaysInMonth(u.getFullYear(), u.getMonth())), this._isInRange(n, u)
            },
            _isInRange: function(n, t) {
                var i, f, e = this._getMinMaxDate(n, "min"),
                    o = this._getMinMaxDate(n, "max"),
                    r = null,
                    u = null,
                    s = this._get(n, "yearRange");
                return s && (i = s.split(":"), f = (new Date).getFullYear(), r = parseInt(i[0], 10), u = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (r += f), i[1].match(/[+\-].*/) && (u += f)), (!e || t.getTime() >= e.getTime()) && (!o || t.getTime() <= o.getTime()) && (!r || t.getFullYear() >= r) && (!u || t.getFullYear() <= u)
            },
            _getFormatConfig: function(n) {
                var t = this._get(n, "shortYearCutoff");
                return t = typeof t != "string" ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
                    shortYearCutoff: t,
                    dayNamesShort: this._get(n, "dayNamesShort"),
                    dayNames: this._get(n, "dayNames"),
                    monthNamesShort: this._get(n, "monthNamesShort"),
                    monthNames: this._get(n, "monthNames")
                }
            },
            _formatDate: function(n, t, i, r) {
                t || (n.currentDay = n.selectedDay, n.currentMonth = n.selectedMonth, n.currentYear = n.selectedYear);
                var u = t ? typeof t == "object" ? t : this._daylightSavingAdjust(new Date(r, i, t)) : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay));
                return this.formatDate(this._get(n, "dateFormat"), u, this._getFormatConfig(n))
            }
        });
        n.fn.datepicker = function(t) {
            if (!this.length) return this;
            n.datepicker.initialized || (n(document).mousedown(n.datepicker._checkExternalClick), n.datepicker.initialized = !0);
            n("#" + n.datepicker._mainDivId).length === 0 && n("body").append(n.datepicker.dpDiv);
            var i = Array.prototype.slice.call(arguments, 1);
            return typeof t == "string" && (t === "isDisabled" || t === "getDate" || t === "widget") ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i)) : t === "option" && arguments.length === 2 && typeof arguments[1] == "string" ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i)) : this.each(function() {
                typeof t == "string" ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this].concat(i)) : n.datepicker._attachDatepicker(this, t)
            })
        };
        n.datepicker = new f;
        n.datepicker.initialized = !1;
        n.datepicker.uuid = (new Date).getTime();
        n.datepicker.version = "1.10.4"
    }(jQuery), function(n) {
        var t = {
                buttons: !0,
                height: !0,
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0,
                width: !0
            },
            i = {
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0
            };
        n.widget("ui.dialog", {
            version: "1.10.4",
            options: {
                appendTo: "body",
                autoOpen: !0,
                buttons: [],
                closeOnEscape: !0,
                closeText: "close",
                dialogClass: "",
                draggable: !0,
                hide: null,
                height: "auto",
                maxHeight: null,
                maxWidth: null,
                minHeight: 150,
                minWidth: 150,
                modal: !1,
                position: {
                    my: "center",
                    at: "center",
                    of: window,
                    collision: "fit",
                    using: function(t) {
                        var i = n(this).css(t).offset().top;
                        i < 0 && n(this).css("top", t.top - i)
                    }
                },
                resizable: !0,
                show: null,
                title: null,
                width: 300,
                beforeClose: null,
                close: null,
                drag: null,
                dragStart: null,
                dragStop: null,
                focus: null,
                open: null,
                resize: null,
                resizeStart: null,
                resizeStop: null
            },
            _create: function() {
                this.originalCss = {
                    display: this.element[0].style.display,
                    width: this.element[0].style.width,
                    minHeight: this.element[0].style.minHeight,
                    maxHeight: this.element[0].style.maxHeight,
                    height: this.element[0].style.height
                };
                this.originalPosition = {
                    parent: this.element.parent(),
                    index: this.element.parent().children().index(this.element)
                };
                this.originalTitle = this.element.attr("title");
                this.options.title = this.options.title || this.originalTitle;
                this._createWrapper();
                this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog);
                this._createTitlebar();
                this._createButtonPane();
                this.options.draggable && n.fn.draggable && this._makeDraggable();
                this.options.resizable && n.fn.resizable && this._makeResizable();
                this._isOpen = !1
            },
            _init: function() {
                this.options.autoOpen && this.open()
            },
            _appendTo: function() {
                var t = this.options.appendTo;
                return t && (t.jquery || t.nodeType) ? n(t) : this.document.find(t || "body").eq(0)
            },
            _destroy: function() {
                var n, t = this.originalPosition;
                this._destroyOverlay();
                this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach();
                this.uiDialog.stop(!0, !0).remove();
                this.originalTitle && this.element.attr("title", this.originalTitle);
                n = t.parent.children().eq(t.index);
                n.length && n[0] !== this.element[0] ? n.before(this.element) : t.parent.append(this.element)
            },
            widget: function() {
                return this.uiDialog
            },
            disable: n.noop,
            enable: n.noop,
            close: function(t) {
                var i, r = this;
                if (this._isOpen && this._trigger("beforeClose", t) !== !1) {
                    if (this._isOpen = !1, this._destroyOverlay(), !this.opener.filter(":focusable").focus().length) try {
                        i = this.document[0].activeElement;
                        i && i.nodeName.toLowerCase() !== "body" && n(i).blur()
                    } catch (u) {}
                    this._hide(this.uiDialog, this.options.hide, function() {
                        r._trigger("close", t)
                    })
                }
            },
            isOpen: function() {
                return this._isOpen
            },
            moveToTop: function() {
                this._moveToTop()
            },
            _moveToTop: function(n, t) {
                var i = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
                return i && !t && this._trigger("focus", n), i
            },
            open: function() {
                var t = this;
                if (this._isOpen) {
                    this._moveToTop() && this._focusTabbable();
                    return
                }
                this._isOpen = !0;
                this.opener = n(this.document[0].activeElement);
                this._size();
                this._position();
                this._createOverlay();
                this._moveToTop(null, !0);
                this._show(this.uiDialog, this.options.show, function() {
                    t._focusTabbable();
                    t._trigger("focus")
                });
                this._trigger("open")
            },
            _focusTabbable: function() {
                var n = this.element.find("[autofocus]");
                n.length || (n = this.element.find(":tabbable"));
                n.length || (n = this.uiDialogButtonPane.find(":tabbable"));
                n.length || (n = this.uiDialogTitlebarClose.filter(":tabbable"));
                n.length || (n = this.uiDialog);
                n.eq(0).focus()
            },
            _keepFocus: function(t) {
                function i() {
                    var t = this.document[0].activeElement,
                        i = this.uiDialog[0] === t || n.contains(this.uiDialog[0], t);
                    i || this._focusTabbable()
                }
                t.preventDefault();
                i.call(this);
                this._delay(i)
            },
            _createWrapper: function() {
                this.uiDialog = n("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                    tabIndex: -1,
                    role: "dialog"
                }).appendTo(this._appendTo());
                this._on(this.uiDialog, {
                    keydown: function(t) {
                        if (this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === n.ui.keyCode.ESCAPE) {
                            t.preventDefault();
                            this.close(t);
                            return
                        }
                        if (t.keyCode === n.ui.keyCode.TAB) {
                            var i = this.uiDialog.find(":tabbable"),
                                r = i.filter(":first"),
                                u = i.filter(":last");
                            t.target !== u[0] && t.target !== this.uiDialog[0] || t.shiftKey ? (t.target === r[0] || t.target === this.uiDialog[0]) && t.shiftKey && (u.focus(1), t.preventDefault()) : (r.focus(1), t.preventDefault())
                        }
                    },
                    mousedown: function(n) {
                        this._moveToTop(n) && this._focusTabbable()
                    }
                });
                this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                    "aria-describedby": this.element.uniqueId().attr("id")
                })
            },
            _createTitlebar: function() {
                var t;
                this.uiDialogTitlebar = n("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog);
                this._on(this.uiDialogTitlebar, {
                    mousedown: function(t) {
                        n(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                    }
                });
                this.uiDialogTitlebarClose = n("<button type='button'><\/button>").button({
                    label: this.options.closeText,
                    icons: {
                        primary: "ui-icon-closethick"
                    },
                    text: !1
                }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar);
                this._on(this.uiDialogTitlebarClose, {
                    click: function(n) {
                        n.preventDefault();
                        this.close(n)
                    }
                });
                t = n("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar);
                this._title(t);
                this.uiDialog.attr({
                    "aria-labelledby": t.attr("id")
                })
            },
            _title: function(n) {
                this.options.title || n.html("&#160;");
                n.text(this.options.title)
            },
            _createButtonPane: function() {
                this.uiDialogButtonPane = n("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
                this.uiButtonSet = n("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane);
                this._createButtons()
            },
            _createButtons: function() {
                var i = this,
                    t = this.options.buttons;
                if (this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), n.isEmptyObject(t) || n.isArray(t) && !t.length) {
                    this.uiDialog.removeClass("ui-dialog-buttons");
                    return
                }
                n.each(t, function(t, r) {
                    var u, f;
                    r = n.isFunction(r) ? {
                        click: r,
                        text: t
                    } : r;
                    r = n.extend({
                        type: "button"
                    }, r);
                    u = r.click;
                    r.click = function() {
                        u.apply(i.element[0], arguments)
                    };
                    f = {
                        icons: r.icons,
                        text: r.showText
                    };
                    delete r.icons;
                    delete r.showText;
                    n("<button><\/button>", r).button(f).appendTo(i.uiButtonSet)
                });
                this.uiDialog.addClass("ui-dialog-buttons");
                this.uiDialogButtonPane.appendTo(this.uiDialog)
            },
            _makeDraggable: function() {
                function i(n) {
                    return {
                        position: n.position,
                        offset: n.offset
                    }
                }
                var t = this,
                    r = this.options;
                this.uiDialog.draggable({
                    cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                    handle: ".ui-dialog-titlebar",
                    containment: "document",
                    start: function(r, u) {
                        n(this).addClass("ui-dialog-dragging");
                        t._blockFrames();
                        t._trigger("dragStart", r, i(u))
                    },
                    drag: function(n, r) {
                        t._trigger("drag", n, i(r))
                    },
                    stop: function(u, f) {
                        r.position = [f.position.left - t.document.scrollLeft(), f.position.top - t.document.scrollTop()];
                        n(this).removeClass("ui-dialog-dragging");
                        t._unblockFrames();
                        t._trigger("dragStop", u, i(f))
                    }
                })
            },
            _makeResizable: function() {
                function r(n) {
                    return {
                        originalPosition: n.originalPosition,
                        originalSize: n.originalSize,
                        position: n.position,
                        size: n.size
                    }
                }
                var i = this,
                    t = this.options,
                    u = t.resizable,
                    f = this.uiDialog.css("position"),
                    e = typeof u == "string" ? u : "n,e,s,w,se,sw,ne,nw";
                this.uiDialog.resizable({
                    cancel: ".ui-dialog-content",
                    containment: "document",
                    alsoResize: this.element,
                    maxWidth: t.maxWidth,
                    maxHeight: t.maxHeight,
                    minWidth: t.minWidth,
                    minHeight: this._minHeight(),
                    handles: e,
                    start: function(t, u) {
                        n(this).addClass("ui-dialog-resizing");
                        i._blockFrames();
                        i._trigger("resizeStart", t, r(u))
                    },
                    resize: function(n, t) {
                        i._trigger("resize", n, r(t))
                    },
                    stop: function(u, f) {
                        t.height = n(this).height();
                        t.width = n(this).width();
                        n(this).removeClass("ui-dialog-resizing");
                        i._unblockFrames();
                        i._trigger("resizeStop", u, r(f))
                    }
                }).css("position", f)
            },
            _minHeight: function() {
                var n = this.options;
                return n.height === "auto" ? n.minHeight : Math.min(n.minHeight, n.height)
            },
            _position: function() {
                var n = this.uiDialog.is(":visible");
                n || this.uiDialog.show();
                this.uiDialog.position(this.options.position);
                n || this.uiDialog.hide()
            },
            _setOptions: function(r) {
                var e = this,
                    u = !1,
                    f = {};
                n.each(r, function(n, r) {
                    e._setOption(n, r);
                    n in t && (u = !0);
                    n in i && (f[n] = r)
                });
                u && (this._size(), this._position());
                this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", f)
            },
            _setOption: function(n, t) {
                var u, r, i = this.uiDialog;
                (n === "dialogClass" && i.removeClass(this.options.dialogClass).addClass(t), n !== "disabled") && (this._super(n, t), n === "appendTo" && this.uiDialog.appendTo(this._appendTo()), n === "buttons" && this._createButtons(), n === "closeText" && this.uiDialogTitlebarClose.button({
                    label: "" + t
                }), n === "draggable" && (u = i.is(":data(ui-draggable)"), u && !t && i.draggable("destroy"), !u && t && this._makeDraggable()), n === "position" && this._position(), n === "resizable" && (r = i.is(":data(ui-resizable)"), r && !t && i.resizable("destroy"), r && typeof t == "string" && i.resizable("option", "handles", t), r || t === !1 || this._makeResizable()), n === "title" && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
            },
            _size: function() {
                var t, i, r, n = this.options;
                this.element.show().css({
                    width: "auto",
                    minHeight: 0,
                    maxHeight: "none",
                    height: 0
                });
                n.minWidth > n.width && (n.width = n.minWidth);
                t = this.uiDialog.css({
                    height: "auto",
                    width: n.width
                }).outerHeight();
                i = Math.max(0, n.minHeight - t);
                r = typeof n.maxHeight == "number" ? Math.max(0, n.maxHeight - t) : "none";
                n.height === "auto" ? this.element.css({
                    minHeight: i,
                    maxHeight: r,
                    height: "auto"
                }) : this.element.height(Math.max(0, n.height - t));
                this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
            },
            _blockFrames: function() {
                this.iframeBlocks = this.document.find("iframe").map(function() {
                    var t = n(this);
                    return n("<div>").css({
                        position: "absolute",
                        width: t.outerWidth(),
                        height: t.outerHeight()
                    }).appendTo(t.parent()).offset(t.offset())[0]
                })
            },
            _unblockFrames: function() {
                this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
            },
            _allowInteraction: function(t) {
                return n(t.target).closest(".ui-dialog").length ? !0 : !!n(t.target).closest(".ui-datepicker").length
            },
            _createOverlay: function() {
                if (this.options.modal) {
                    var t = this,
                        i = this.widgetFullName;
                    n.ui.dialog.overlayInstances || this._delay(function() {
                        n.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function(r) {
                            t._allowInteraction(r) || (r.preventDefault(), n(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())
                        })
                    });
                    this.overlay = n("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo());
                    this._on(this.overlay, {
                        mousedown: "_keepFocus"
                    });
                    n.ui.dialog.overlayInstances++
                }
            },
            _destroyOverlay: function() {
                this.options.modal && this.overlay && (n.ui.dialog.overlayInstances--, n.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"), this.overlay.remove(), this.overlay = null)
            }
        });
        n.ui.dialog.overlayInstances = 0;
        n.uiBackCompat !== !1 && n.widget("ui.dialog", n.ui.dialog, {
            _position: function() {
                var t = this.options.position,
                    i = [],
                    r = [0, 0],
                    u;
                t ? ((typeof t == "string" || typeof t == "object" && "0" in t) && (i = t.split ? t.split(" ") : [t[0], t[1]], i.length === 1 && (i[1] = i[0]), n.each(["left", "top"], function(n, t) {
                    +i[n] === i[n] && (r[n] = i[n], i[n] = t)
                }), t = {
                    my: i[0] + (r[0] < 0 ? r[0] : "+" + r[0]) + " " + i[1] + (r[1] < 0 ? r[1] : "+" + r[1]),
                    at: i.join(" ")
                }), t = n.extend({}, n.ui.dialog.prototype.options.position, t)) : t = n.ui.dialog.prototype.options.position;
                u = this.uiDialog.is(":visible");
                u || this.uiDialog.show();
                this.uiDialog.position(t);
                u || this.uiDialog.hide()
            }
        })
    }(jQuery), function(n) {
        n.widget("ui.menu", {
            version: "1.10.4",
            defaultElement: "<ul>",
            delay: 300,
            options: {
                icons: {
                    submenu: "ui-icon-carat-1-e"
                },
                menus: "ul",
                position: {
                    my: "left top",
                    at: "right top"
                },
                role: "menu",
                blur: null,
                focus: null,
                select: null
            },
            _create: function() {
                this.activeMenu = this.element;
                this.mouseHandled = !1;
                this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                    role: this.options.role,
                    tabIndex: 0
                }).bind("click" + this.eventNamespace, n.proxy(function(n) {
                    this.options.disabled && n.preventDefault()
                }, this));
                this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true");
                this._on({
                    "mousedown .ui-menu-item > a": function(n) {
                        n.preventDefault()
                    },
                    "click .ui-state-disabled > a": function(n) {
                        n.preventDefault()
                    },
                    "click .ui-menu-item:has(a)": function(t) {
                        var i = n(t.target).closest(".ui-menu-item");
                        !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && n(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && this.active.parents(".ui-menu").length === 1 && clearTimeout(this.timer)))
                    },
                    "mouseenter .ui-menu-item": function(t) {
                        var i = n(t.currentTarget);
                        i.siblings().children(".ui-state-active").removeClass("ui-state-active");
                        this.focus(t, i)
                    },
                    mouseleave: "collapseAll",
                    "mouseleave .ui-menu": "collapseAll",
                    focus: function(n, t) {
                        var i = this.active || this.element.children(".ui-menu-item").eq(0);
                        t || this.focus(n, i)
                    },
                    blur: function(t) {
                        this._delay(function() {
                            n.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
                        })
                    },
                    keydown: "_keydown"
                });
                this.refresh();
                this._on(this.document, {
                    click: function(t) {
                        n(t.target).closest(".ui-menu").length || this.collapseAll(t);
                        this.mouseHandled = !1
                    }
                })
            },
            _destroy: function() {
                this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
                this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                    var t = n(this);
                    t.data("ui-menu-submenu-carat") && t.remove()
                });
                this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
            },
            _keydown: function(t) {
                function o(n) {
                    return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
                }
                var i, f, r, e, u, s = !0;
                switch (t.keyCode) {
                    case n.ui.keyCode.PAGE_UP:
                        this.previousPage(t);
                        break;
                    case n.ui.keyCode.PAGE_DOWN:
                        this.nextPage(t);
                        break;
                    case n.ui.keyCode.HOME:
                        this._move("first", "first", t);
                        break;
                    case n.ui.keyCode.END:
                        this._move("last", "last", t);
                        break;
                    case n.ui.keyCode.UP:
                        this.previous(t);
                        break;
                    case n.ui.keyCode.DOWN:
                        this.next(t);
                        break;
                    case n.ui.keyCode.LEFT:
                        this.collapse(t);
                        break;
                    case n.ui.keyCode.RIGHT:
                        this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                        break;
                    case n.ui.keyCode.ENTER:
                    case n.ui.keyCode.SPACE:
                        this._activate(t);
                        break;
                    case n.ui.keyCode.ESCAPE:
                        this.collapse(t);
                        break;
                    default:
                        s = !1;
                        f = this.previousFilter || "";
                        r = String.fromCharCode(t.keyCode);
                        e = !1;
                        clearTimeout(this.filterTimer);
                        r === f ? e = !0 : r = f + r;
                        u = new RegExp("^" + o(r), "i");
                        i = this.activeMenu.children(".ui-menu-item").filter(function() {
                            return u.test(n(this).children("a").text())
                        });
                        i = e && i.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : i;
                        i.length || (r = String.fromCharCode(t.keyCode), u = new RegExp("^" + o(r), "i"), i = this.activeMenu.children(".ui-menu-item").filter(function() {
                            return u.test(n(this).children("a").text())
                        }));
                        i.length ? (this.focus(t, i), i.length > 1 ? (this.previousFilter = r, this.filterTimer = this._delay(function() {
                            delete this.previousFilter
                        }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
                }
                s && t.preventDefault()
            },
            _activate: function(n) {
                this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(n) : this.select(n))
            },
            refresh: function() {
                var t, r = this.options.icons.submenu,
                    i = this.element.find(this.options.menus);
                this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length);
                i.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                    role: this.options.role,
                    "aria-hidden": "true",
                    "aria-expanded": "false"
                }).each(function() {
                    var t = n(this),
                        i = t.prev("a"),
                        u = n("<span>").addClass("ui-menu-icon ui-icon " + r).data("ui-menu-submenu-carat", !0);
                    i.attr("aria-haspopup", "true").prepend(u);
                    t.attr("aria-labelledby", i.attr("id"))
                });
                t = i.add(this.element);
                t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                    tabIndex: -1,
                    role: this._itemRole()
                });
                t.children(":not(.ui-menu-item)").each(function() {
                    var t = n(this);
                    /[^\-\u2014\u2013\s]/.test(t.text()) || t.addClass("ui-widget-content ui-menu-divider")
                });
                t.children(".ui-state-disabled").attr("aria-disabled", "true");
                this.active && !n.contains(this.element[0], this.active[0]) && this.blur()
            },
            _itemRole: function() {
                return {
                    menu: "menuitem",
                    listbox: "option"
                }[this.options.role]
            },
            _setOption: function(n, t) {
                n === "icons" && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu);
                this._super(n, t)
            },
            focus: function(n, t) {
                var i, r;
                this.blur(n, n && n.type === "focus");
                this._scrollIntoView(t);
                this.active = t.first();
                r = this.active.children("a").addClass("ui-state-focus");
                this.options.role && this.element.attr("aria-activedescendant", r.attr("id"));
                this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active");
                n && n.type === "keydown" ? this._close() : this.timer = this._delay(function() {
                    this._close()
                }, this.delay);
                i = t.children(".ui-menu");
                i.length && n && /^mouse/.test(n.type) && this._startOpening(i);
                this.activeMenu = t.parent();
                this._trigger("focus", n, {
                    item: t
                })
            },
            _scrollIntoView: function(t) {
                var e, o, i, r, u, f;
                this._hasScroll() && (e = parseFloat(n.css(this.activeMenu[0], "borderTopWidth")) || 0, o = parseFloat(n.css(this.activeMenu[0], "paddingTop")) || 0, i = t.offset().top - this.activeMenu.offset().top - e - o, r = this.activeMenu.scrollTop(), u = this.activeMenu.height(), f = t.height(), i < 0 ? this.activeMenu.scrollTop(r + i) : i + f > u && this.activeMenu.scrollTop(r + i - u + f))
            },
            blur: function(n, t) {
                (t || clearTimeout(this.timer), this.active) && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", n, {
                    item: this.active
                }))
            },
            _startOpening: function(n) {
                (clearTimeout(this.timer), n.attr("aria-hidden") === "true") && (this.timer = this._delay(function() {
                    this._close();
                    this._open(n)
                }, this.delay))
            },
            _open: function(t) {
                var i = n.extend({ of: this.active
                }, this.options.position);
                clearTimeout(this.timer);
                this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true");
                t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
            },
            collapseAll: function(t, i) {
                clearTimeout(this.timer);
                this.timer = this._delay(function() {
                    var r = i ? this.element : n(t && t.target).closest(this.element.find(".ui-menu"));
                    r.length || (r = this.element);
                    this._close(r);
                    this.blur(t);
                    this.activeMenu = r
                }, this.delay)
            },
            _close: function(n) {
                n || (n = this.active ? this.active.parent() : this.element);
                n.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
            },
            collapse: function(n) {
                var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                t && t.length && (this._close(), this.focus(n, t))
            },
            expand: function(n) {
                var t = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
                t && t.length && (this._open(t.parent()), this._delay(function() {
                    this.focus(n, t)
                }))
            },
            next: function(n) {
                this._move("next", "first", n)
            },
            previous: function(n) {
                this._move("prev", "last", n)
            },
            isFirstItem: function() {
                return this.active && !this.active.prevAll(".ui-menu-item").length
            },
            isLastItem: function() {
                return this.active && !this.active.nextAll(".ui-menu-item").length
            },
            _move: function(n, t, i) {
                var r;
                this.active && (r = n === "first" || n === "last" ? this.active[n === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[n + "All"](".ui-menu-item").eq(0));
                r && r.length && this.active || (r = this.activeMenu.children(".ui-menu-item")[t]());
                this.focus(i, r)
            },
            nextPage: function(t) {
                var i, r, u;
                if (!this.active) {
                    this.next(t);
                    return
                }
                this.isLastItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                    return i = n(this), i.offset().top - r - u < 0
                }), this.focus(t, i)) : this.focus(t, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]()))
            },
            previousPage: function(t) {
                var i, r, u;
                if (!this.active) {
                    this.next(t);
                    return
                }
                this.isFirstItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                    return i = n(this), i.offset().top - r + u > 0
                }), this.focus(t, i)) : this.focus(t, this.activeMenu.children(".ui-menu-item").first()))
            },
            _hasScroll: function() {
                return this.element.outerHeight() < this.element.prop("scrollHeight")
            },
            select: function(t) {
                this.active = this.active || n(t.target).closest(".ui-menu-item");
                var i = {
                    item: this.active
                };
                this.active.has(".ui-menu").length || this.collapseAll(t, !0);
                this._trigger("select", t, i)
            }
        })
    }(jQuery), function(n, t) {
        n.widget("ui.progressbar", {
            version: "1.10.4",
            options: {
                max: 100,
                value: 0,
                change: null,
                complete: null
            },
            min: 0,
            _create: function() {
                this.oldValue = this.options.value = this._constrainedValue();
                this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                    role: "progressbar",
                    "aria-valuemin": this.min
                });
                this.valueDiv = n("<div class='ui-progressbar-value ui-widget-header ui-corner-left'><\/div>").appendTo(this.element);
                this._refreshValue()
            },
            _destroy: function() {
                this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
                this.valueDiv.remove()
            },
            value: function(n) {
                if (n === t) return this.options.value;
                this.options.value = this._constrainedValue(n);
                this._refreshValue()
            },
            _constrainedValue: function(n) {
                return n === t && (n = this.options.value), this.indeterminate = n === !1, typeof n != "number" && (n = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, n))
            },
            _setOptions: function(n) {
                var t = n.value;
                delete n.value;
                this._super(n);
                this.options.value = this._constrainedValue(t);
                this._refreshValue()
            },
            _setOption: function(n, t) {
                n === "max" && (t = Math.max(this.min, t));
                this._super(n, t)
            },
            _percentage: function() {
                return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
            },
            _refreshValue: function() {
                var t = this.options.value,
                    i = this._percentage();
                this.valueDiv.toggle(this.indeterminate || t > this.min).toggleClass("ui-corner-right", t === this.options.max).width(i.toFixed(0) + "%");
                this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate);
                this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = n("<div class='ui-progressbar-overlay'><\/div>").appendTo(this.valueDiv))) : (this.element.attr({
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": t
                }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null));
                this.oldValue !== t && (this.oldValue = t, this._trigger("change"));
                t === this.options.max && this._trigger("complete")
            }
        })
    }(jQuery), function(n) {
        var t = 5;
        n.widget("ui.slider", n.ui.mouse, {
            version: "1.10.4",
            widgetEventPrefix: "slide",
            options: {
                animate: !1,
                distance: 0,
                max: 100,
                min: 0,
                orientation: "horizontal",
                range: !1,
                step: 1,
                value: 0,
                values: null,
                change: null,
                slide: null,
                start: null,
                stop: null
            },
            _create: function() {
                this._keySliding = !1;
                this._mouseSliding = !1;
                this._animateOff = !0;
                this._handleIndex = null;
                this._detectOrientation();
                this._mouseInit();
                this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
                this._refresh();
                this._setOption("disabled", this.options.disabled);
                this._animateOff = !1
            },
            _refresh: function() {
                this._createRange();
                this._createHandles();
                this._setupEvents();
                this._refreshValue()
            },
            _createHandles: function() {
                var r, i, u = this.options,
                    t = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                    f = [];
                for (i = u.values && u.values.length || 1, t.length > i && (t.slice(i).remove(), t = t.slice(0, i)), r = t.length; r < i; r++) f.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'><\/a>");
                this.handles = t.add(n(f.join("")).appendTo(this.element));
                this.handle = this.handles.eq(0);
                this.handles.each(function(t) {
                    n(this).data("ui-slider-handle-index", t)
                })
            },
            _createRange: function() {
                var t = this.options,
                    i = "";
                t.range ? (t.range === !0 && (t.values ? t.values.length && t.values.length !== 2 ? t.values = [t.values[0], t.values[0]] : n.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                    left: "",
                    bottom: ""
                }) : (this.range = n("<div><\/div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + (t.range === "min" || t.range === "max" ? " ui-slider-range-" + t.range : ""))) : (this.range && this.range.remove(), this.range = null)
            },
            _setupEvents: function() {
                var n = this.handles.add(this.range).filter("a");
                this._off(n);
                this._on(n, this._handleEvents);
                this._hoverable(n);
                this._focusable(n)
            },
            _destroy: function() {
                this.handles.remove();
                this.range && this.range.remove();
                this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all");
                this._mouseDestroy()
            },
            _mouseCapture: function(t) {
                var s, f, r, i, u, h, e, c, o = this,
                    l = this.options;
                return l.disabled ? !1 : (this.elementSize = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight()
                }, this.elementOffset = this.element.offset(), s = {
                    x: t.pageX,
                    y: t.pageY
                }, f = this._normValueFromMouse(s), r = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t) {
                    var e = Math.abs(f - o.values(t));
                    (r > e || r === e && (t === o._lastChangedValue || o.values(t) === l.min)) && (r = e, i = n(this), u = t)
                }), h = this._start(t, u), h === !1) ? !1 : (this._mouseSliding = !0, this._handleIndex = u, i.addClass("ui-state-active").focus(), e = i.offset(), c = !n(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = c ? {
                    left: 0,
                    top: 0
                } : {
                    left: t.pageX - e.left - i.width() / 2,
                    top: t.pageY - e.top - i.height() / 2 - (parseInt(i.css("borderTopWidth"), 10) || 0) - (parseInt(i.css("borderBottomWidth"), 10) || 0) + (parseInt(i.css("marginTop"), 10) || 0)
                }, this.handles.hasClass("ui-state-hover") || this._slide(t, u, f), this._animateOff = !0, !0)
            },
            _mouseStart: function() {
                return !0
            },
            _mouseDrag: function(n) {
                var t = {
                        x: n.pageX,
                        y: n.pageY
                    },
                    i = this._normValueFromMouse(t);
                return this._slide(n, this._handleIndex, i), !1
            },
            _mouseStop: function(n) {
                return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(n, this._handleIndex), this._change(n, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
            },
            _detectOrientation: function() {
                this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
            },
            _normValueFromMouse: function(n) {
                var i, r, t, u, f;
                return this.orientation === "horizontal" ? (i = this.elementSize.width, r = n.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (i = this.elementSize.height, r = n.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), t = r / i, t > 1 && (t = 1), t < 0 && (t = 0), this.orientation === "vertical" && (t = 1 - t), u = this._valueMax() - this._valueMin(), f = this._valueMin() + t * u, this._trimAlignValue(f)
            },
            _start: function(n, t) {
                var i = {
                    handle: this.handles[t],
                    value: this.value()
                };
                return this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("start", n, i)
            },
            _slide: function(n, t, i) {
                var r, f, u;
                this.options.values && this.options.values.length ? (r = this.values(t ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (t === 0 && i > r || t === 1 && i < r) && (i = r), i !== this.values(t) && (f = this.values(), f[t] = i, u = this._trigger("slide", n, {
                    handle: this.handles[t],
                    value: i,
                    values: f
                }), r = this.values(t ? 0 : 1), u !== !1 && this.values(t, i))) : i !== this.value() && (u = this._trigger("slide", n, {
                    handle: this.handles[t],
                    value: i
                }), u !== !1 && this.value(i))
            },
            _stop: function(n, t) {
                var i = {
                    handle: this.handles[t],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values());
                this._trigger("stop", n, i)
            },
            _change: function(n, t) {
                if (!this._keySliding && !this._mouseSliding) {
                    var i = {
                        handle: this.handles[t],
                        value: this.value()
                    };
                    this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values());
                    this._lastChangedValue = t;
                    this._trigger("change", n, i)
                }
            },
            value: function(n) {
                if (arguments.length) {
                    this.options.value = this._trimAlignValue(n);
                    this._refreshValue();
                    this._change(null, 0);
                    return
                }
                return this._value()
            },
            values: function(t, i) {
                var u, f, r;
                if (arguments.length > 1) {
                    this.options.values[t] = this._trimAlignValue(i);
                    this._refreshValue();
                    this._change(null, t);
                    return
                }
                if (arguments.length)
                    if (n.isArray(arguments[0])) {
                        for (u = this.options.values, f = arguments[0], r = 0; r < u.length; r += 1) u[r] = this._trimAlignValue(f[r]), this._change(null, r);
                        this._refreshValue()
                    } else return this.options.values && this.options.values.length ? this._values(t) : this.value();
                else return this._values()
            },
            _setOption: function(t, i) {
                var r, u = 0;
                t === "range" && this.options.range === !0 && (i === "min" ? (this.options.value = this._values(0), this.options.values = null) : i === "max" && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null));
                n.isArray(this.options.values) && (u = this.options.values.length);
                n.Widget.prototype._setOption.apply(this, arguments);
                switch (t) {
                    case "orientation":
                        this._detectOrientation();
                        this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                        this._refreshValue();
                        break;
                    case "value":
                        this._animateOff = !0;
                        this._refreshValue();
                        this._change(null, 0);
                        this._animateOff = !1;
                        break;
                    case "values":
                        for (this._animateOff = !0, this._refreshValue(), r = 0; r < u; r += 1) this._change(null, r);
                        this._animateOff = !1;
                        break;
                    case "min":
                    case "max":
                        this._animateOff = !0;
                        this._refreshValue();
                        this._animateOff = !1;
                        break;
                    case "range":
                        this._animateOff = !0;
                        this._refresh();
                        this._animateOff = !1
                }
            },
            _value: function() {
                var n = this.options.value;
                return this._trimAlignValue(n)
            },
            _values: function(n) {
                var r, t, i;
                if (arguments.length) return r = this.options.values[n], this._trimAlignValue(r);
                if (this.options.values && this.options.values.length) {
                    for (t = this.options.values.slice(), i = 0; i < t.length; i += 1) t[i] = this._trimAlignValue(t[i]);
                    return t
                }
                return []
            },
            _trimAlignValue: function(n) {
                if (n <= this._valueMin()) return this._valueMin();
                if (n >= this._valueMax()) return this._valueMax();
                var t = this.options.step > 0 ? this.options.step : 1,
                    i = (n - this._valueMin()) % t,
                    r = n - i;
                return Math.abs(i) * 2 >= t && (r += i > 0 ? t : -t), parseFloat(r.toFixed(5))
            },
            _valueMin: function() {
                return this.options.min
            },
            _valueMax: function() {
                return this.options.max
            },
            _refreshValue: function() {
                var s, t, c, f, h, e = this.options.range,
                    i = this.options,
                    r = this,
                    u = this._animateOff ? !1 : i.animate,
                    o = {};
                this.options.values && this.options.values.length ? this.handles.each(function(f) {
                    t = (r.values(f) - r._valueMin()) / (r._valueMax() - r._valueMin()) * 100;
                    o[r.orientation === "horizontal" ? "left" : "bottom"] = t + "%";
                    n(this).stop(1, 1)[u ? "animate" : "css"](o, i.animate);
                    r.options.range === !0 && (r.orientation === "horizontal" ? (f === 0 && r.range.stop(1, 1)[u ? "animate" : "css"]({
                        left: t + "%"
                    }, i.animate), f === 1 && r.range[u ? "animate" : "css"]({
                        width: t - s + "%"
                    }, {
                        queue: !1,
                        duration: i.animate
                    })) : (f === 0 && r.range.stop(1, 1)[u ? "animate" : "css"]({
                        bottom: t + "%"
                    }, i.animate), f === 1 && r.range[u ? "animate" : "css"]({
                        height: t - s + "%"
                    }, {
                        queue: !1,
                        duration: i.animate
                    })));
                    s = t
                }) : (c = this.value(), f = this._valueMin(), h = this._valueMax(), t = h !== f ? (c - f) / (h - f) * 100 : 0, o[this.orientation === "horizontal" ? "left" : "bottom"] = t + "%", this.handle.stop(1, 1)[u ? "animate" : "css"](o, i.animate), e === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[u ? "animate" : "css"]({
                    width: t + "%"
                }, i.animate), e === "max" && this.orientation === "horizontal" && this.range[u ? "animate" : "css"]({
                    width: 100 - t + "%"
                }, {
                    queue: !1,
                    duration: i.animate
                }), e === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[u ? "animate" : "css"]({
                    height: t + "%"
                }, i.animate), e === "max" && this.orientation === "vertical" && this.range[u ? "animate" : "css"]({
                    height: 100 - t + "%"
                }, {
                    queue: !1,
                    duration: i.animate
                }))
            },
            _handleEvents: {
                keydown: function(i) {
                    var o, u, r, f, e = n(i.target).data("ui-slider-handle-index");
                    switch (i.keyCode) {
                        case n.ui.keyCode.HOME:
                        case n.ui.keyCode.END:
                        case n.ui.keyCode.PAGE_UP:
                        case n.ui.keyCode.PAGE_DOWN:
                        case n.ui.keyCode.UP:
                        case n.ui.keyCode.RIGHT:
                        case n.ui.keyCode.DOWN:
                        case n.ui.keyCode.LEFT:
                            if (i.preventDefault(), !this._keySliding && (this._keySliding = !0, n(i.target).addClass("ui-state-active"), o = this._start(i, e), o === !1)) return
                    }
                    f = this.options.step;
                    u = r = this.options.values && this.options.values.length ? this.values(e) : this.value();
                    switch (i.keyCode) {
                        case n.ui.keyCode.HOME:
                            r = this._valueMin();
                            break;
                        case n.ui.keyCode.END:
                            r = this._valueMax();
                            break;
                        case n.ui.keyCode.PAGE_UP:
                            r = this._trimAlignValue(u + (this._valueMax() - this._valueMin()) / t);
                            break;
                        case n.ui.keyCode.PAGE_DOWN:
                            r = this._trimAlignValue(u - (this._valueMax() - this._valueMin()) / t);
                            break;
                        case n.ui.keyCode.UP:
                        case n.ui.keyCode.RIGHT:
                            if (u === this._valueMax()) return;
                            r = this._trimAlignValue(u + f);
                            break;
                        case n.ui.keyCode.DOWN:
                        case n.ui.keyCode.LEFT:
                            if (u === this._valueMin()) return;
                            r = this._trimAlignValue(u - f)
                    }
                    this._slide(i, e, r)
                },
                click: function(n) {
                    n.preventDefault()
                },
                keyup: function(t) {
                    var i = n(t.target).data("ui-slider-handle-index");
                    this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), n(t.target).removeClass("ui-state-active"))
                }
            }
        })
    }(jQuery), function(n) {
        function t(n) {
            return function() {
                var t = this.element.val();
                n.apply(this, arguments);
                this._refresh();
                t !== this.element.val() && this._trigger("change")
            }
        }
        n.widget("ui.spinner", {
            version: "1.10.4",
            defaultElement: "<input>",
            widgetEventPrefix: "spin",
            options: {
                culture: null,
                icons: {
                    down: "ui-icon-triangle-1-s",
                    up: "ui-icon-triangle-1-n"
                },
                incremental: !0,
                max: null,
                min: null,
                numberFormat: null,
                page: 10,
                step: 1,
                change: null,
                spin: null,
                start: null,
                stop: null
            },
            _create: function() {
                this._setOption("max", this.options.max);
                this._setOption("min", this.options.min);
                this._setOption("step", this.options.step);
                this.value() !== "" && this._value(this.element.val(), !0);
                this._draw();
                this._on(this._events);
                this._refresh();
                this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _getCreateOptions: function() {
                var t = {},
                    i = this.element;
                return n.each(["min", "max", "step"], function(n, r) {
                    var u = i.attr(r);
                    u !== undefined && u.length && (t[r] = u)
                }), t
            },
            _events: {
                keydown: function(n) {
                    this._start(n) && this._keydown(n) && n.preventDefault()
                },
                keyup: "_stop",
                focus: function() {
                    this.previous = this.element.val()
                },
                blur: function(n) {
                    if (this.cancelBlur) {
                        delete this.cancelBlur;
                        return
                    }
                    this._stop();
                    this._refresh();
                    this.previous !== this.element.val() && this._trigger("change", n)
                },
                mousewheel: function(n, t) {
                    if (t) {
                        if (!this.spinning && !this._start(n)) return !1;
                        this._spin((t > 0 ? 1 : -1) * this.options.step, n);
                        clearTimeout(this.mousewheelTimer);
                        this.mousewheelTimer = this._delay(function() {
                            this.spinning && this._stop(n)
                        }, 100);
                        n.preventDefault()
                    }
                },
                "mousedown .ui-spinner-button": function(t) {
                    function r() {
                        var n = this.element[0] === this.document[0].activeElement;
                        n || (this.element.focus(), this.previous = i, this._delay(function() {
                            this.previous = i
                        }))
                    }
                    var i;
                    (i = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), t.preventDefault(), r.call(this), this.cancelBlur = !0, this._delay(function() {
                        delete this.cancelBlur;
                        r.call(this)
                    }), this._start(t) !== !1) && this._repeat(null, n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t)
                },
                "mouseup .ui-spinner-button": "_stop",
                "mouseenter .ui-spinner-button": function(t) {
                    if (n(t.currentTarget).hasClass("ui-state-active")) {
                        if (this._start(t) === !1) return !1;
                        this._repeat(null, n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t)
                    }
                },
                "mouseleave .ui-spinner-button": "_stop"
            },
            _draw: function() {
                var n = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
                this.element.attr("role", "spinbutton");
                this.buttons = n.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all");
                this.buttons.height() > Math.ceil(n.height() * .5) && n.height() > 0 && n.height(n.height());
                this.options.disabled && this.disable()
            },
            _keydown: function(t) {
                var r = this.options,
                    i = n.ui.keyCode;
                switch (t.keyCode) {
                    case i.UP:
                        return this._repeat(null, 1, t), !0;
                    case i.DOWN:
                        return this._repeat(null, -1, t), !0;
                    case i.PAGE_UP:
                        return this._repeat(null, r.page, t), !0;
                    case i.PAGE_DOWN:
                        return this._repeat(null, -r.page, t), !0
                }
                return !1
            },
            _uiSpinnerHtml: function() {
                return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'><\/span>"
            },
            _buttonHtml: function() {
                return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;<\/span><\/a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;<\/span><\/a>"
            },
            _start: function(n) {
                return !this.spinning && this._trigger("start", n) === !1 ? !1 : (this.counter || (this.counter = 1), this.spinning = !0, !0)
            },
            _repeat: function(n, t, i) {
                n = n || 500;
                clearTimeout(this.timer);
                this.timer = this._delay(function() {
                    this._repeat(40, t, i)
                }, n);
                this._spin(t * this.options.step, i)
            },
            _spin: function(n, t) {
                var i = this.value() || 0;
                this.counter || (this.counter = 1);
                i = this._adjustValue(i + n * this._increment(this.counter));
                this.spinning && this._trigger("spin", t, {
                    value: i
                }) === !1 || (this._value(i), this.counter++)
            },
            _increment: function(t) {
                var i = this.options.incremental;
                return i ? n.isFunction(i) ? i(t) : Math.floor(t * t * t / 5e4 - t * t / 500 + 17 * t / 200 + 1) : 1
            },
            _precision: function() {
                var n = this._precisionOf(this.options.step);
                return this.options.min !== null && (n = Math.max(n, this._precisionOf(this.options.min))), n
            },
            _precisionOf: function(n) {
                var t = n.toString(),
                    i = t.indexOf(".");
                return i === -1 ? 0 : t.length - i - 1
            },
            _adjustValue: function(n) {
                var r, i, t = this.options;
                return (r = t.min !== null ? t.min : 0, i = n - r, i = Math.round(i / t.step) * t.step, n = r + i, n = parseFloat(n.toFixed(this._precision())), t.max !== null && n > t.max) ? t.max : t.min !== null && n < t.min ? t.min : n
            },
            _stop: function(n) {
                this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", n))
            },
            _setOption: function(n, t) {
                if (n === "culture" || n === "numberFormat") {
                    var i = this._parse(this.element.val());
                    this.options[n] = t;
                    this.element.val(this._format(i));
                    return
                }(n === "max" || n === "min" || n === "step") && typeof t == "string" && (t = this._parse(t));
                n === "icons" && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(t.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(t.down));
                this._super(n, t);
                n === "disabled" && (t ? (this.element.prop("disabled", !0), this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable")))
            },
            _setOptions: t(function(n) {
                this._super(n);
                this._value(this.element.val())
            }),
            _parse: function(n) {
                return typeof n == "string" && n !== "" && (n = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(n, 10, this.options.culture) : +n), n === "" || isNaN(n) ? null : n
            },
            _format: function(n) {
                return n === "" ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(n, this.options.numberFormat, this.options.culture) : n
            },
            _refresh: function() {
                this.element.attr({
                    "aria-valuemin": this.options.min,
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": this._parse(this.element.val())
                })
            },
            _value: function(n, t) {
                var i;
                n !== "" && (i = this._parse(n), i !== null && (t || (i = this._adjustValue(i)), n = this._format(i)));
                this.element.val(n);
                this._refresh()
            },
            _destroy: function() {
                this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
                this.uiSpinner.replaceWith(this.element)
            },
            stepUp: t(function(n) {
                this._stepUp(n)
            }),
            _stepUp: function(n) {
                this._start() && (this._spin((n || 1) * this.options.step), this._stop())
            },
            stepDown: t(function(n) {
                this._stepDown(n)
            }),
            _stepDown: function(n) {
                this._start() && (this._spin((n || 1) * -this.options.step), this._stop())
            },
            pageUp: t(function(n) {
                this._stepUp((n || 1) * this.options.page)
            }),
            pageDown: t(function(n) {
                this._stepDown((n || 1) * this.options.page)
            }),
            value: function(n) {
                if (!arguments.length) return this._parse(this.element.val());
                t(this._value).call(this, n)
            },
            widget: function() {
                return this.uiSpinner
            }
        })
    }(jQuery), function(n, t) {
        function u() {
            return ++f
        }

        function i(n) {
            return n = n.cloneNode(!1), n.hash.length > 1 && decodeURIComponent(n.href.replace(r, "")) === decodeURIComponent(location.href.replace(r, ""))
        }
        var f = 0,
            r = /#.*$/;
        n.widget("ui.tabs", {
            version: "1.10.4",
            delay: 300,
            options: {
                active: null,
                collapsible: !1,
                event: "click",
                heightStyle: "content",
                hide: null,
                show: null,
                activate: null,
                beforeActivate: null,
                beforeLoad: null,
                load: null
            },
            _create: function() {
                var i = this,
                    t = this.options;
                this.running = !1;
                this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", t.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(t) {
                    n(this).is(".ui-state-disabled") && t.preventDefault()
                }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                    n(this).closest("li").is(".ui-state-disabled") && this.blur()
                });
                this._processTabs();
                t.active = this._initialActive();
                n.isArray(t.disabled) && (t.disabled = n.unique(t.disabled.concat(n.map(this.tabs.filter(".ui-state-disabled"), function(n) {
                    return i.tabs.index(n)
                }))).sort());
                this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(t.active) : n();
                this._refresh();
                this.active.length && this.load(t.active)
            },
            _initialActive: function() {
                var t = this.options.active,
                    i = this.options.collapsible,
                    r = location.hash.substring(1);
                return t === null && (r && this.tabs.each(function(i, u) {
                    if (n(u).attr("aria-controls") === r) return t = i, !1
                }), t === null && (t = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (t === null || t === -1) && (t = this.tabs.length ? 0 : !1)), t !== !1 && (t = this.tabs.index(this.tabs.eq(t)), t === -1 && (t = i ? !1 : 0)), !i && t === !1 && this.anchors.length && (t = 0), t
            },
            _getCreateEventData: function() {
                return {
                    tab: this.active,
                    panel: this.active.length ? this._getPanelForTab(this.active) : n()
                }
            },
            _tabKeydown: function(t) {
                var r = n(this.document[0].activeElement).closest("li"),
                    i = this.tabs.index(r),
                    u = !0;
                if (!this._handlePageNav(t)) {
                    switch (t.keyCode) {
                        case n.ui.keyCode.RIGHT:
                        case n.ui.keyCode.DOWN:
                            i++;
                            break;
                        case n.ui.keyCode.UP:
                        case n.ui.keyCode.LEFT:
                            u = !1;
                            i--;
                            break;
                        case n.ui.keyCode.END:
                            i = this.anchors.length - 1;
                            break;
                        case n.ui.keyCode.HOME:
                            i = 0;
                            break;
                        case n.ui.keyCode.SPACE:
                            t.preventDefault();
                            clearTimeout(this.activating);
                            this._activate(i);
                            return;
                        case n.ui.keyCode.ENTER:
                            t.preventDefault();
                            clearTimeout(this.activating);
                            this._activate(i === this.options.active ? !1 : i);
                            return;
                        default:
                            return
                    }
                    t.preventDefault();
                    clearTimeout(this.activating);
                    i = this._focusNextTab(i, u);
                    t.ctrlKey || (r.attr("aria-selected", "false"), this.tabs.eq(i).attr("aria-selected", "true"), this.activating = this._delay(function() {
                        this.option("active", i)
                    }, this.delay))
                }
            },
            _panelKeydown: function(t) {
                this._handlePageNav(t) || t.ctrlKey && t.keyCode === n.ui.keyCode.UP && (t.preventDefault(), this.active.focus())
            },
            _handlePageNav: function(t) {
                return t.altKey && t.keyCode === n.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : t.altKey && t.keyCode === n.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
            },
            _findNextTab: function(t, i) {
                function u() {
                    return t > r && (t = 0), t < 0 && (t = r), t
                }
                for (var r = this.tabs.length - 1; n.inArray(u(), this.options.disabled) !== -1;) t = i ? t + 1 : t - 1;
                return t
            },
            _focusNextTab: function(n, t) {
                return n = this._findNextTab(n, t), this.tabs.eq(n).focus(), n
            },
            _setOption: function(n, t) {
                if (n === "active") {
                    this._activate(t);
                    return
                }
                if (n === "disabled") {
                    this._setupDisabled(t);
                    return
                }
                this._super(n, t);
                n === "collapsible" && (this.element.toggleClass("ui-tabs-collapsible", t), t || this.options.active !== !1 || this._activate(0));
                n === "event" && this._setupEvents(t);
                n === "heightStyle" && this._setupHeightStyle(t)
            },
            _tabId: function(n) {
                return n.attr("aria-controls") || "ui-tabs-" + u()
            },
            _sanitizeSelector: function(n) {
                return n ? n.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
            },
            refresh: function() {
                var t = this.options,
                    i = this.tablist.children(":has(a[href])");
                t.disabled = n.map(i.filter(".ui-state-disabled"), function(n) {
                    return i.index(n)
                });
                this._processTabs();
                t.active !== !1 && this.anchors.length ? this.active.length && !n.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1, this.active = n()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active) : (t.active = !1, this.active = n());
                this._refresh()
            },
            _refresh: function() {
                this._setupDisabled(this.options.disabled);
                this._setupEvents(this.options.event);
                this._setupHeightStyle(this.options.heightStyle);
                this.tabs.not(this.active).attr({
                    "aria-selected": "false",
                    tabIndex: -1
                });
                this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                    "aria-expanded": "false",
                    "aria-hidden": "true"
                });
                this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                    "aria-selected": "true",
                    tabIndex: 0
                }), this._getPanelForTab(this.active).show().attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                })) : this.tabs.eq(0).attr("tabIndex", 0)
            },
            _processTabs: function() {
                var t = this;
                this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist");
                this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                    role: "tab",
                    tabIndex: -1
                });
                this.anchors = this.tabs.map(function() {
                    return n("a", this)[0]
                }).addClass("ui-tabs-anchor").attr({
                    role: "presentation",
                    tabIndex: -1
                });
                this.panels = n();
                this.anchors.each(function(r, u) {
                    var e, f, s, h = n(u).uniqueId().attr("id"),
                        o = n(u).closest("li"),
                        c = o.attr("aria-controls");
                    i(u) ? (e = u.hash, f = t.element.find(t._sanitizeSelector(e))) : (s = t._tabId(o), e = "#" + s, f = t.element.find(e), f.length || (f = t._createPanel(s), f.insertAfter(t.panels[r - 1] || t.tablist)), f.attr("aria-live", "polite"));
                    f.length && (t.panels = t.panels.add(f));
                    c && o.data("ui-tabs-aria-controls", c);
                    o.attr({
                        "aria-controls": e.substring(1),
                        "aria-labelledby": h
                    });
                    f.attr("aria-labelledby", h)
                });
                this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
            },
            _getList: function() {
                return this.tablist || this.element.find("ol,ul").eq(0)
            },
            _createPanel: function(t) {
                return n("<div>").attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
            },
            _setupDisabled: function(t) {
                n.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1);
                for (var i = 0, r; r = this.tabs[i]; i++) t === !0 || n.inArray(i, t) !== -1 ? n(r).addClass("ui-state-disabled").attr("aria-disabled", "true") : n(r).removeClass("ui-state-disabled").removeAttr("aria-disabled");
                this.options.disabled = t
            },
            _setupEvents: function(t) {
                var i = {
                    click: function(n) {
                        n.preventDefault()
                    }
                };
                t && n.each(t.split(" "), function(n, t) {
                    i[t] = "_eventHandler"
                });
                this._off(this.anchors.add(this.tabs).add(this.panels));
                this._on(this.anchors, i);
                this._on(this.tabs, {
                    keydown: "_tabKeydown"
                });
                this._on(this.panels, {
                    keydown: "_panelKeydown"
                });
                this._focusable(this.tabs);
                this._hoverable(this.tabs)
            },
            _setupHeightStyle: function(t) {
                var i, r = this.element.parent();
                t === "fill" ? (i = r.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                    var t = n(this),
                        r = t.css("position");
                    r !== "absolute" && r !== "fixed" && (i -= t.outerHeight(!0))
                }), this.element.children().not(this.panels).each(function() {
                    i -= n(this).outerHeight(!0)
                }), this.panels.each(function() {
                    n(this).height(Math.max(0, i - n(this).innerHeight() + n(this).height()))
                }).css("overflow", "auto")) : t === "auto" && (i = 0, this.panels.each(function() {
                    i = Math.max(i, n(this).height("").height())
                }).height(i))
            },
            _eventHandler: function(t) {
                var u = this.options,
                    r = this.active,
                    c = n(t.currentTarget),
                    i = c.closest("li"),
                    f = i[0] === r[0],
                    e = f && u.collapsible,
                    o = e ? n() : this._getPanelForTab(i),
                    s = r.length ? this._getPanelForTab(r) : n(),
                    h = {
                        oldTab: r,
                        oldPanel: s,
                        newTab: e ? n() : i,
                        newPanel: o
                    };
                (t.preventDefault(), i.hasClass("ui-state-disabled") || i.hasClass("ui-tabs-loading") || this.running || f && !u.collapsible || this._trigger("beforeActivate", t, h) === !1) || (u.active = e ? !1 : this.tabs.index(i), this.active = f ? n() : i, this.xhr && this.xhr.abort(), s.length || o.length || n.error("jQuery UI Tabs: Mismatching fragment identifier."), o.length && this.load(this.tabs.index(i), t), this._toggle(t, h))
            },
            _toggle: function(t, i) {
                function e() {
                    u.running = !1;
                    u._trigger("activate", t, i)
                }

                function o() {
                    i.newTab.closest("li").addClass("ui-tabs-active ui-state-active");
                    r.length && u.options.show ? u._show(r, u.options.show, e) : (r.show(), e())
                }
                var u = this,
                    r = i.newPanel,
                    f = i.oldPanel;
                this.running = !0;
                f.length && this.options.hide ? this._hide(f, this.options.hide, function() {
                    i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
                    o()
                }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), f.hide(), o());
                f.attr({
                    "aria-expanded": "false",
                    "aria-hidden": "true"
                });
                i.oldTab.attr("aria-selected", "false");
                r.length && f.length ? i.oldTab.attr("tabIndex", -1) : r.length && this.tabs.filter(function() {
                    return n(this).attr("tabIndex") === 0
                }).attr("tabIndex", -1);
                r.attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                });
                i.newTab.attr({
                    "aria-selected": "true",
                    tabIndex: 0
                })
            },
            _activate: function(t) {
                var r, i = this._findActive(t);
                i[0] !== this.active[0] && (i.length || (i = this.active), r = i.find(".ui-tabs-anchor")[0], this._eventHandler({
                    target: r,
                    currentTarget: r,
                    preventDefault: n.noop
                }))
            },
            _findActive: function(t) {
                return t === !1 ? n() : this.tabs.eq(t)
            },
            _getIndex: function(n) {
                return typeof n == "string" && (n = this.anchors.index(this.anchors.filter("[href$='" + n + "']"))), n
            },
            _destroy: function() {
                this.xhr && this.xhr.abort();
                this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");
                this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role");
                this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId();
                this.tabs.add(this.panels).each(function() {
                    n.data(this, "ui-tabs-destroy") ? n(this).remove() : n(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
                });
                this.tabs.each(function() {
                    var t = n(this),
                        i = t.data("ui-tabs-aria-controls");
                    i ? t.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : t.removeAttr("aria-controls")
                });
                this.panels.show();
                this.options.heightStyle !== "content" && this.panels.css("height", "")
            },
            enable: function(i) {
                var r = this.options.disabled;
                r !== !1 && (i === t ? r = !1 : (i = this._getIndex(i), r = n.isArray(r) ? n.map(r, function(n) {
                    return n !== i ? n : null
                }) : n.map(this.tabs, function(n, t) {
                    return t !== i ? t : null
                })), this._setupDisabled(r))
            },
            disable: function(i) {
                var r = this.options.disabled;
                if (r !== !0) {
                    if (i === t) r = !0;
                    else {
                        if (i = this._getIndex(i), n.inArray(i, r) !== -1) return;
                        r = n.isArray(r) ? n.merge([i], r).sort() : [i]
                    }
                    this._setupDisabled(r)
                }
            },
            load: function(t, r) {
                t = this._getIndex(t);
                var f = this,
                    u = this.tabs.eq(t),
                    o = u.find(".ui-tabs-anchor"),
                    e = this._getPanelForTab(u),
                    s = {
                        tab: u,
                        panel: e
                    };
                i(o[0]) || (this.xhr = n.ajax(this._ajaxSettings(o, r, s)), this.xhr && this.xhr.statusText !== "canceled" && (u.addClass("ui-tabs-loading"), e.attr("aria-busy", "true"), this.xhr.success(function(n) {
                    setTimeout(function() {
                        e.html(n);
                        f._trigger("load", r, s)
                    }, 1)
                }).complete(function(n, t) {
                    setTimeout(function() {
                        t === "abort" && f.panels.stop(!1, !0);
                        u.removeClass("ui-tabs-loading");
                        e.removeAttr("aria-busy");
                        n === f.xhr && delete f.xhr
                    }, 1)
                })))
            },
            _ajaxSettings: function(t, i, r) {
                var u = this;
                return {
                    url: t.attr("href"),
                    beforeSend: function(t, f) {
                        return u._trigger("beforeLoad", i, n.extend({
                            jqXHR: t,
                            ajaxSettings: f
                        }, r))
                    }
                }
            },
            _getPanelForTab: function(t) {
                var i = n(t).attr("aria-controls");
                return this.element.find(this._sanitizeSelector("#" + i))
            }
        })
    }(jQuery), function(n) {
        function t(t, i) {
            var r = (t.attr("aria-describedby") || "").split(/\s+/);
            r.push(i);
            t.data("ui-tooltip-id", i).attr("aria-describedby", n.trim(r.join(" ")))
        }

        function i(t) {
            var u = t.data("ui-tooltip-id"),
                i = (t.attr("aria-describedby") || "").split(/\s+/),
                r = n.inArray(u, i);
            r !== -1 && i.splice(r, 1);
            t.removeData("ui-tooltip-id");
            i = n.trim(i.join(" "));
            i ? t.attr("aria-describedby", i) : t.removeAttr("aria-describedby")
        }
        var r = 0;
        n.widget("ui.tooltip", {
            version: "1.10.4",
            options: {
                content: function() {
                    var t = n(this).attr("title") || "";
                    return n("<a>").text(t).html()
                },
                hide: !0,
                items: "[title]:not([disabled])",
                position: {
                    my: "left top+15",
                    at: "left bottom",
                    collision: "flipfit flip"
                },
                show: !0,
                tooltipClass: null,
                track: !1,
                close: null,
                open: null
            },
            _create: function() {
                this._on({
                    mouseover: "open",
                    focusin: "open"
                });
                this.tooltips = {};
                this.parents = {};
                this.options.disabled && this._disable()
            },
            _setOption: function(t, i) {
                var r = this;
                if (t === "disabled") {
                    this[i ? "_disable" : "_enable"]();
                    this.options[t] = i;
                    return
                }
                this._super(t, i);
                t === "content" && n.each(this.tooltips, function(n, t) {
                    r._updateContent(t)
                })
            },
            _disable: function() {
                var t = this;
                n.each(this.tooltips, function(i, r) {
                    var u = n.Event("blur");
                    u.target = u.currentTarget = r[0];
                    t.close(u, !0)
                });
                this.element.find(this.options.items).addBack().each(function() {
                    var t = n(this);
                    t.is("[title]") && t.data("ui-tooltip-title", t.attr("title")).attr("title", "")
                })
            },
            _enable: function() {
                this.element.find(this.options.items).addBack().each(function() {
                    var t = n(this);
                    t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title"))
                })
            },
            open: function(t) {
                var r = this,
                    i = n(t ? t.target : this.element).closest(this.options.items);
                i.length && !i.data("ui-tooltip-id") && (i.attr("title") && i.data("ui-tooltip-title", i.attr("title")), i.data("ui-tooltip-open", !0), t && t.type === "mouseover" && i.parents().each(function() {
                    var t = n(this),
                        i;
                    t.data("ui-tooltip-open") && (i = n.Event("blur"), i.target = i.currentTarget = this, r.close(i, !0));
                    t.attr("title") && (t.uniqueId(), r.parents[this.id] = {
                        element: this,
                        title: t.attr("title")
                    }, t.attr("title", ""))
                }), this._updateContent(i, t))
            },
            _updateContent: function(n, t) {
                var i, r = this.options.content,
                    u = this,
                    f = t ? t.type : null;
                if (typeof r == "string") return this._open(t, n, r);
                i = r.call(n[0], function(i) {
                    n.data("ui-tooltip-open") && u._delay(function() {
                        t && (t.type = f);
                        this._open(t, n, i)
                    })
                });
                i && this._open(t, n, i)
            },
            _open: function(i, r, u) {
                function o(n) {
                    (s.of = n, f.is(":hidden")) || f.position(s)
                }
                var f, e, h, s = n.extend({}, this.options.position);
                if (u) {
                    if (f = this._find(r), f.length) {
                        f.find(".ui-tooltip-content").html(u);
                        return
                    }
                    r.is("[title]") && (i && i.type === "mouseover" ? r.attr("title", "") : r.removeAttr("title"));
                    f = this._tooltip(r);
                    t(r, f.attr("id"));
                    f.find(".ui-tooltip-content").html(u);
                    this.options.track && i && /^mouse/.test(i.type) ? (this._on(this.document, {
                        mousemove: o
                    }), o(i)) : f.position(n.extend({ of: r
                    }, this.options.position));
                    f.hide();
                    this._show(f, this.options.show);
                    this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function() {
                        f.is(":visible") && (o(s.of), clearInterval(h))
                    }, n.fx.interval));
                    this._trigger("open", i, {
                        tooltip: f
                    });
                    e = {
                        keyup: function(t) {
                            if (t.keyCode === n.ui.keyCode.ESCAPE) {
                                var i = n.Event(t);
                                i.currentTarget = r[0];
                                this.close(i, !0)
                            }
                        },
                        remove: function() {
                            this._removeTooltip(f)
                        }
                    };
                    i && i.type !== "mouseover" || (e.mouseleave = "close");
                    i && i.type !== "focusin" || (e.focusout = "close");
                    this._on(!0, r, e)
                }
            },
            close: function(t) {
                var f = this,
                    r = n(t ? t.currentTarget : this.element),
                    u = this._find(r);
                this.closing || (clearInterval(this.delayedShow), r.data("ui-tooltip-title") && r.attr("title", r.data("ui-tooltip-title")), i(r), u.stop(!0), this._hide(u, this.options.hide, function() {
                    f._removeTooltip(n(this))
                }), r.removeData("ui-tooltip-open"), this._off(r, "mouseleave focusout keyup"), r[0] !== this.element[0] && this._off(r, "remove"), this._off(this.document, "mousemove"), t && t.type === "mouseleave" && n.each(this.parents, function(t, i) {
                    n(i.element).attr("title", i.title);
                    delete f.parents[t]
                }), this.closing = !0, this._trigger("close", t, {
                    tooltip: u
                }), this.closing = !1)
            },
            _tooltip: function(t) {
                var u = "ui-tooltip-" + r++,
                    i = n("<div>").attr({
                        id: u,
                        role: "tooltip"
                    }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
                return n("<div>").addClass("ui-tooltip-content").appendTo(i), i.appendTo(this.document[0].body), this.tooltips[u] = t, i
            },
            _find: function(t) {
                var i = t.data("ui-tooltip-id");
                return i ? n("#" + i) : n()
            },
            _removeTooltip: function(n) {
                n.remove();
                delete this.tooltips[n.attr("id")]
            },
            _destroy: function() {
                var t = this;
                n.each(this.tooltips, function(i, r) {
                    var u = n.Event("blur");
                    u.target = u.currentTarget = r[0];
                    t.close(u, !0);
                    n("#" + i).remove();
                    r.data("ui-tooltip-title") && (r.attr("title", r.data("ui-tooltip-title")), r.removeData("ui-tooltip-title"))
                })
            }
        })
    }(jQuery), function(n, t) {
        var i = "ui-effects-";
        n.effects = {
                effect: {}
            },
            function(n, t) {
                function f(n, t, i) {
                    var r = h[t.type] || {};
                    return n == null ? i || !t.def ? null : t.def : (n = r.floor ? ~~n : parseFloat(n), isNaN(n)) ? t.def : r.mod ? (n + r.mod) % r.mod : 0 > n ? 0 : r.max < n ? r.max : n
                }

                function s(t) {
                    var f = i(),
                        o = f._rgba = [];
                    return (t = t.toLowerCase(), r(v, function(n, i) {
                        var r, s = i.re.exec(t),
                            h = s && i.parse(s),
                            e = i.space || "rgba";
                        if (h) return r = f[e](h), f[u[e].cache] = r[u[e].cache], o = f._rgba = r._rgba, !1
                    }), o.length) ? (o.join() === "0,0,0,0" && n.extend(o, e.transparent), f) : e[t]
                }

                function o(n, t, i) {
                    return (i = (i + 1) % 1, i * 6 < 1) ? n + (t - n) * i * 6 : i * 2 < 1 ? t : i * 3 < 2 ? n + (t - n) * (2 / 3 - i) * 6 : n
                }
                var a = /^([\-+])=\s*(\d+\.?\d*)/,
                    v = [{
                        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(n) {
                            return [n[1], n[2], n[3], n[4]]
                        }
                    }, {
                        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(n) {
                            return [n[1] * 2.55, n[2] * 2.55, n[3] * 2.55, n[4]]
                        }
                    }, {
                        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                        parse: function(n) {
                            return [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)]
                        }
                    }, {
                        re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                        parse: function(n) {
                            return [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)]
                        }
                    }, {
                        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        space: "hsla",
                        parse: function(n) {
                            return [n[1], n[2] / 100, n[3] / 100, n[4]]
                        }
                    }],
                    i = n.Color = function(t, i, r, u) {
                        return new n.Color.fn.parse(t, i, r, u)
                    },
                    u = {
                        rgba: {
                            props: {
                                red: {
                                    idx: 0,
                                    type: "byte"
                                },
                                green: {
                                    idx: 1,
                                    type: "byte"
                                },
                                blue: {
                                    idx: 2,
                                    type: "byte"
                                }
                            }
                        },
                        hsla: {
                            props: {
                                hue: {
                                    idx: 0,
                                    type: "degrees"
                                },
                                saturation: {
                                    idx: 1,
                                    type: "percent"
                                },
                                lightness: {
                                    idx: 2,
                                    type: "percent"
                                }
                            }
                        }
                    },
                    h = {
                        byte: {
                            floor: !0,
                            max: 255
                        },
                        percent: {
                            max: 1
                        },
                        degrees: {
                            mod: 360,
                            floor: !0
                        }
                    },
                    c = i.support = {},
                    l = n("<p>")[0],
                    e, r = n.each;
                l.style.cssText = "background-color:rgba(1,1,1,.5)";
                c.rgba = l.style.backgroundColor.indexOf("rgba") > -1;
                r(u, function(n, t) {
                    t.cache = "_" + n;
                    t.props.alpha = {
                        idx: 3,
                        type: "percent",
                        def: 1
                    }
                });
                i.fn = n.extend(i.prototype, {
                    parse: function(o, h, c, l) {
                        if (o === t) return this._rgba = [null, null, null, null], this;
                        (o.jquery || o.nodeType) && (o = n(o).css(h), h = t);
                        var a = this,
                            v = n.type(o),
                            y = this._rgba = [];
                        return (h !== t && (o = [o, h, c, l], v = "array"), v === "string") ? this.parse(s(o) || e._default) : v === "array" ? (r(u.rgba.props, function(n, t) {
                            y[t.idx] = f(o[t.idx], t)
                        }), this) : v === "object" ? (o instanceof i ? r(u, function(n, t) {
                            o[t.cache] && (a[t.cache] = o[t.cache].slice())
                        }) : r(u, function(t, i) {
                            var u = i.cache;
                            r(i.props, function(n, t) {
                                if (!a[u] && i.to) {
                                    if (n === "alpha" || o[n] == null) return;
                                    a[u] = i.to(a._rgba)
                                }
                                a[u][t.idx] = f(o[n], t, !0)
                            });
                            a[u] && n.inArray(null, a[u].slice(0, 3)) < 0 && (a[u][3] = 1, i.from && (a._rgba = i.from(a[u])))
                        }), this) : void 0
                    },
                    is: function(n) {
                        var e = i(n),
                            t = !0,
                            f = this;
                        return r(u, function(n, i) {
                            var o, u = e[i.cache];
                            return u && (o = f[i.cache] || i.to && i.to(f._rgba) || [], r(i.props, function(n, i) {
                                if (u[i.idx] != null) return t = u[i.idx] === o[i.idx]
                            })), t
                        }), t
                    },
                    _space: function() {
                        var n = [],
                            t = this;
                        return r(u, function(i, r) {
                            t[r.cache] && n.push(i)
                        }), n.pop()
                    },
                    transition: function(n, t) {
                        var e = i(n),
                            c = e._space(),
                            o = u[c],
                            l = this.alpha() === 0 ? i("transparent") : this,
                            a = l[o.cache] || o.to(l._rgba),
                            s = a.slice();
                        return e = e[o.cache], r(o.props, function(n, i) {
                            var c = i.idx,
                                r = a[c],
                                u = e[c],
                                o = h[i.type] || {};
                            u !== null && (r === null ? s[c] = u : (o.mod && (u - r > o.mod / 2 ? r += o.mod : r - u > o.mod / 2 && (r -= o.mod)), s[c] = f((u - r) * t + r, i)))
                        }), this[c](s)
                    },
                    blend: function(t) {
                        if (this._rgba[3] === 1) return this;
                        var r = this._rgba.slice(),
                            u = r.pop(),
                            f = i(t)._rgba;
                        return i(n.map(r, function(n, t) {
                            return (1 - u) * f[t] + u * n
                        }))
                    },
                    toRgbaString: function() {
                        var i = "rgba(",
                            t = n.map(this._rgba, function(n, t) {
                                return n == null ? t > 2 ? 1 : 0 : n
                            });
                        return t[3] === 1 && (t.pop(), i = "rgb("), i + t.join() + ")"
                    },
                    toHslaString: function() {
                        var i = "hsla(",
                            t = n.map(this.hsla(), function(n, t) {
                                return n == null && (n = t > 2 ? 1 : 0), t && t < 3 && (n = Math.round(n * 100) + "%"), n
                            });
                        return t[3] === 1 && (t.pop(), i = "hsl("), i + t.join() + ")"
                    },
                    toHexString: function(t) {
                        var i = this._rgba.slice(),
                            r = i.pop();
                        return t && i.push(~~(r * 255)), "#" + n.map(i, function(n) {
                            return n = (n || 0).toString(16), n.length === 1 ? "0" + n : n
                        }).join("")
                    },
                    toString: function() {
                        return this._rgba[3] === 0 ? "transparent" : this.toRgbaString()
                    }
                });
                i.fn.parse.prototype = i.fn;
                u.hsla.to = function(n) {
                    if (n[0] == null || n[1] == null || n[2] == null) return [null, null, null, n[3]];
                    var i = n[0] / 255,
                        r = n[1] / 255,
                        f = n[2] / 255,
                        s = n[3],
                        u = Math.max(i, r, f),
                        e = Math.min(i, r, f),
                        t = u - e,
                        o = u + e,
                        h = o * .5,
                        c, l;
                    return c = e === u ? 0 : i === u ? 60 * (r - f) / t + 360 : r === u ? 60 * (f - i) / t + 120 : 60 * (i - r) / t + 240, l = t === 0 ? 0 : h <= .5 ? t / o : t / (2 - o), [Math.round(c) % 360, l, h, s == null ? 1 : s]
                };
                u.hsla.from = function(n) {
                    if (n[0] == null || n[1] == null || n[2] == null) return [null, null, null, n[3]];
                    var r = n[0] / 360,
                        u = n[1],
                        t = n[2],
                        e = n[3],
                        i = t <= .5 ? t * (1 + u) : t + u - t * u,
                        f = 2 * t - i;
                    return [Math.round(o(f, i, r + 1 / 3) * 255), Math.round(o(f, i, r) * 255), Math.round(o(f, i, r - 1 / 3) * 255), e]
                };
                r(u, function(u, e) {
                    var s = e.props,
                        o = e.cache,
                        h = e.to,
                        c = e.from;
                    i.fn[u] = function(u) {
                        if (h && !this[o] && (this[o] = h(this._rgba)), u === t) return this[o].slice();
                        var l, a = n.type(u),
                            v = a === "array" || a === "object" ? u : arguments,
                            e = this[o].slice();
                        return r(s, function(n, t) {
                            var i = v[a === "object" ? n : t.idx];
                            i == null && (i = e[t.idx]);
                            e[t.idx] = f(i, t)
                        }), c ? (l = i(c(e)), l[o] = e, l) : i(e)
                    };
                    r(s, function(t, r) {
                        i.fn[t] || (i.fn[t] = function(i) {
                            var f = n.type(i),
                                h = t === "alpha" ? this._hsla ? "hsla" : "rgba" : u,
                                o = this[h](),
                                s = o[r.idx],
                                e;
                            return f === "undefined" ? s : (f === "function" && (i = i.call(this, s), f = n.type(i)), i == null && r.empty) ? this : (f === "string" && (e = a.exec(i), e && (i = s + parseFloat(e[2]) * (e[1] === "+" ? 1 : -1))), o[r.idx] = i, this[h](o))
                        })
                    })
                });
                i.hook = function(t) {
                    var u = t.split(" ");
                    r(u, function(t, r) {
                        n.cssHooks[r] = {
                            set: function(t, u) {
                                var o, f, e = "";
                                if (u !== "transparent" && (n.type(u) !== "string" || (o = s(u)))) {
                                    if (u = i(o || u), !c.rgba && u._rgba[3] !== 1) {
                                        for (f = r === "backgroundColor" ? t.parentNode : t;
                                            (e === "" || e === "transparent") && f && f.style;) try {
                                            e = n.css(f, "backgroundColor");
                                            f = f.parentNode
                                        } catch (h) {}
                                        u = u.blend(e && e !== "transparent" ? e : "_default")
                                    }
                                    u = u.toRgbaString()
                                }
                                try {
                                    t.style[r] = u
                                } catch (h) {}
                            }
                        };
                        n.fx.step[r] = function(t) {
                            t.colorInit || (t.start = i(t.elem, r), t.end = i(t.end), t.colorInit = !0);
                            n.cssHooks[r].set(t.elem, t.start.transition(t.end, t.pos))
                        }
                    })
                };
                i.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor");
                n.cssHooks.borderColor = {
                    expand: function(n) {
                        var t = {};
                        return r(["Top", "Right", "Bottom", "Left"], function(i, r) {
                            t["border" + r + "Color"] = n
                        }), t
                    }
                };
                e = n.Color.names = {
                    aqua: "#00ffff",
                    black: "#000000",
                    blue: "#0000ff",
                    fuchsia: "#ff00ff",
                    gray: "#808080",
                    green: "#008000",
                    lime: "#00ff00",
                    maroon: "#800000",
                    navy: "#000080",
                    olive: "#808000",
                    purple: "#800080",
                    red: "#ff0000",
                    silver: "#c0c0c0",
                    teal: "#008080",
                    white: "#ffffff",
                    yellow: "#ffff00",
                    transparent: [null, null, null, 0],
                    _default: "#ffffff"
                }
            }(jQuery),
            function() {
                function i(t) {
                    var r, u, i = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle,
                        f = {};
                    if (i && i.length && i[0] && i[i[0]])
                        for (u = i.length; u--;) r = i[u], typeof i[r] == "string" && (f[n.camelCase(r)] = i[r]);
                    else
                        for (r in i) typeof i[r] == "string" && (f[r] = i[r]);
                    return f
                }

                function r(t, i) {
                    var e = {},
                        r, u;
                    for (r in i) u = i[r], t[r] !== u && (f[r] || (n.fx.step[r] || !isNaN(parseFloat(u))) && (e[r] = u));
                    return e
                }
                var u = ["add", "remove", "toggle"],
                    f = {
                        border: 1,
                        borderBottom: 1,
                        borderColor: 1,
                        borderLeft: 1,
                        borderRight: 1,
                        borderTop: 1,
                        borderWidth: 1,
                        margin: 1,
                        padding: 1
                    };
                n.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, i) {
                    n.fx.step[i] = function(n) {
                        (n.end === "none" || n.setAttr) && (n.pos !== 1 || n.setAttr) || (jQuery.style(n.elem, i, n.end), n.setAttr = !0)
                    }
                });
                n.fn.addBack || (n.fn.addBack = function(n) {
                    return this.add(n == null ? this.prevObject : this.prevObject.filter(n))
                });
                n.effects.animateClass = function(t, f, e, o) {
                    var s = n.speed(f, e, o);
                    return this.queue(function() {
                        var e = n(this),
                            h = e.attr("class") || "",
                            o, f = s.children ? e.find("*").addBack() : e;
                        f = f.map(function() {
                            var t = n(this);
                            return {
                                el: t,
                                start: i(this)
                            }
                        });
                        o = function() {
                            n.each(u, function(n, i) {
                                t[i] && e[i + "Class"](t[i])
                            })
                        };
                        o();
                        f = f.map(function() {
                            return this.end = i(this.el[0]), this.diff = r(this.start, this.end), this
                        });
                        e.attr("class", h);
                        f = f.map(function() {
                            var i = this,
                                t = n.Deferred(),
                                r = n.extend({}, s, {
                                    queue: !1,
                                    complete: function() {
                                        t.resolve(i)
                                    }
                                });
                            return this.el.animate(this.diff, r), t.promise()
                        });
                        n.when.apply(n, f.get()).done(function() {
                            o();
                            n.each(arguments, function() {
                                var t = this.el;
                                n.each(this.diff, function(n) {
                                    t.css(n, "")
                                })
                            });
                            s.complete.call(e[0])
                        })
                    })
                };
                n.fn.extend({
                    addClass: function(t) {
                        return function(i, r, u, f) {
                            return r ? n.effects.animateClass.call(this, {
                                add: i
                            }, r, u, f) : t.apply(this, arguments)
                        }
                    }(n.fn.addClass),
                    removeClass: function(t) {
                        return function(i, r, u, f) {
                            return arguments.length > 1 ? n.effects.animateClass.call(this, {
                                remove: i
                            }, r, u, f) : t.apply(this, arguments)
                        }
                    }(n.fn.removeClass),
                    toggleClass: function(i) {
                        return function(r, u, f, e, o) {
                            return typeof u == "boolean" || u === t ? f ? n.effects.animateClass.call(this, u ? {
                                add: r
                            } : {
                                remove: r
                            }, f, e, o) : i.apply(this, arguments) : n.effects.animateClass.call(this, {
                                toggle: r
                            }, u, f, e)
                        }
                    }(n.fn.toggleClass),
                    switchClass: function(t, i, r, u, f) {
                        return n.effects.animateClass.call(this, {
                            add: i,
                            remove: t
                        }, r, u, f)
                    }
                })
            }(),
            function() {
                function r(t, i, r, u) {
                    return n.isPlainObject(t) && (i = t, t = t.effect), t = {
                        effect: t
                    }, i == null && (i = {}), n.isFunction(i) && (u = i, r = null, i = {}), (typeof i == "number" || n.fx.speeds[i]) && (u = r, r = i, i = {}), n.isFunction(r) && (u = r, r = null), i && n.extend(t, i), r = r || i.duration, t.duration = n.fx.off ? 0 : typeof r == "number" ? r : r in n.fx.speeds ? n.fx.speeds[r] : n.fx.speeds._default, t.complete = u || i.complete, t
                }

                function u(t) {
                    return !t || typeof t == "number" || n.fx.speeds[t] ? !0 : typeof t == "string" && !n.effects.effect[t] ? !0 : n.isFunction(t) ? !0 : typeof t == "object" && !t.effect ? !0 : !1
                }
                n.extend(n.effects, {
                    version: "1.10.4",
                    save: function(n, t) {
                        for (var r = 0; r < t.length; r++) t[r] !== null && n.data(i + t[r], n[0].style[t[r]])
                    },
                    restore: function(n, r) {
                        for (var f, u = 0; u < r.length; u++) r[u] !== null && (f = n.data(i + r[u]), f === t && (f = ""), n.css(r[u], f))
                    },
                    setMode: function(n, t) {
                        return t === "toggle" && (t = n.is(":hidden") ? "show" : "hide"), t
                    },
                    getBaseline: function(n, t) {
                        var i, r;
                        switch (n[0]) {
                            case "top":
                                i = 0;
                                break;
                            case "middle":
                                i = .5;
                                break;
                            case "bottom":
                                i = 1;
                                break;
                            default:
                                i = n[0] / t.height
                        }
                        switch (n[1]) {
                            case "left":
                                r = 0;
                                break;
                            case "center":
                                r = .5;
                                break;
                            case "right":
                                r = 1;
                                break;
                            default:
                                r = n[1] / t.width
                        }
                        return {
                            x: r,
                            y: i
                        }
                    },
                    createWrapper: function(t) {
                        if (t.parent().is(".ui-effects-wrapper")) return t.parent();
                        var i = {
                                width: t.outerWidth(!0),
                                height: t.outerHeight(!0),
                                float: t.css("float")
                            },
                            u = n("<div><\/div>").addClass("ui-effects-wrapper").css({
                                fontSize: "100%",
                                background: "transparent",
                                border: "none",
                                margin: 0,
                                padding: 0
                            }),
                            f = {
                                width: t.width(),
                                height: t.height()
                            },
                            r = document.activeElement;
                        try {
                            r.id
                        } catch (e) {
                            r = document.body
                        }
                        return t.wrap(u), (t[0] === r || n.contains(t[0], r)) && n(r).focus(), u = t.parent(), t.css("position") === "static" ? (u.css({
                            position: "relative"
                        }), t.css({
                            position: "relative"
                        })) : (n.extend(i, {
                            position: t.css("position"),
                            zIndex: t.css("z-index")
                        }), n.each(["top", "left", "bottom", "right"], function(n, r) {
                            i[r] = t.css(r);
                            isNaN(parseInt(i[r], 10)) && (i[r] = "auto")
                        }), t.css({
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: "auto",
                            bottom: "auto"
                        })), t.css(f), u.css(i).show()
                    },
                    removeWrapper: function(t) {
                        var i = document.activeElement;
                        return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || n.contains(t[0], i)) && n(i).focus()), t
                    },
                    setTransition: function(t, i, r, u) {
                        return u = u || {}, n.each(i, function(n, i) {
                            var f = t.cssUnit(i);
                            f[0] > 0 && (u[i] = f[0] * r + f[1])
                        }), u
                    }
                });
                n.fn.extend({
                    effect: function() {
                        function i(i) {
                            function f() {
                                n.isFunction(o) && o.call(r[0]);
                                n.isFunction(i) && i()
                            }
                            var r = n(this),
                                o = t.complete,
                                u = t.mode;
                            (r.is(":hidden") ? u === "hide" : u === "show") ? (r[u](), f()) : e.call(r[0], t, f)
                        }
                        var t = r.apply(this, arguments),
                            u = t.mode,
                            f = t.queue,
                            e = n.effects.effect[t.effect];
                        return n.fx.off || !e ? u ? this[u](t.duration, t.complete) : this.each(function() {
                            t.complete && t.complete.call(this)
                        }) : f === !1 ? this.each(i) : this.queue(f || "fx", i)
                    },
                    show: function(n) {
                        return function(t) {
                            if (u(t)) return n.apply(this, arguments);
                            var i = r.apply(this, arguments);
                            return i.mode = "show", this.effect.call(this, i)
                        }
                    }(n.fn.show),
                    hide: function(n) {
                        return function(t) {
                            if (u(t)) return n.apply(this, arguments);
                            var i = r.apply(this, arguments);
                            return i.mode = "hide", this.effect.call(this, i)
                        }
                    }(n.fn.hide),
                    toggle: function(n) {
                        return function(t) {
                            if (u(t) || typeof t == "boolean") return n.apply(this, arguments);
                            var i = r.apply(this, arguments);
                            return i.mode = "toggle", this.effect.call(this, i)
                        }
                    }(n.fn.toggle),
                    cssUnit: function(t) {
                        var i = this.css(t),
                            r = [];
                        return n.each(["em", "px", "%", "pt"], function(n, t) {
                            i.indexOf(t) > 0 && (r = [parseFloat(i), t])
                        }), r
                    }
                })
            }(),
            function() {
                var t = {};
                n.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(n, i) {
                    t[i] = function(t) {
                        return Math.pow(t, n + 2)
                    }
                });
                n.extend(t, {
                    Sine: function(n) {
                        return 1 - Math.cos(n * Math.PI / 2)
                    },
                    Circ: function(n) {
                        return 1 - Math.sqrt(1 - n * n)
                    },
                    Elastic: function(n) {
                        return n === 0 || n === 1 ? n : -Math.pow(2, 8 * (n - 1)) * Math.sin(((n - 1) * 80 - 7.5) * Math.PI / 15)
                    },
                    Back: function(n) {
                        return n * n * (3 * n - 2)
                    },
                    Bounce: function(n) {
                        for (var t, i = 4; n < ((t = Math.pow(2, --i)) - 1) / 11;);
                        return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((t * 3 - 2) / 22 - n, 2)
                    }
                });
                n.each(t, function(t, i) {
                    n.easing["easeIn" + t] = i;
                    n.easing["easeOut" + t] = function(n) {
                        return 1 - i(1 - n)
                    };
                    n.easing["easeInOut" + t] = function(n) {
                        return n < .5 ? i(n * 2) / 2 : 1 - i(n * -2 + 2) / 2
                    }
                })
            }()
    }(jQuery), function(n) {
        var t = /up|down|vertical/,
            i = /up|left|vertical|horizontal/;
        n.effects.effect.blind = function(r, u) {
            var f = n(this),
                c = ["position", "top", "bottom", "left", "right", "height", "width"],
                p = n.effects.setMode(f, r.mode || "hide"),
                w = r.direction || "up",
                o = t.test(w),
                l = o ? "height" : "width",
                a = o ? "top" : "left",
                b = i.test(w),
                v = {},
                y = p === "show",
                e, s, h;
            f.parent().is(".ui-effects-wrapper") ? n.effects.save(f.parent(), c) : n.effects.save(f, c);
            f.show();
            e = n.effects.createWrapper(f).css({
                overflow: "hidden"
            });
            s = e[l]();
            h = parseFloat(e.css(a)) || 0;
            v[l] = y ? s : 0;
            b || (f.css(o ? "bottom" : "right", 0).css(o ? "top" : "left", "auto").css({
                position: "absolute"
            }), v[a] = y ? h : s + h);
            y && (e.css(l, 0), b || e.css(a, h + s));
            e.animate(v, {
                duration: r.duration,
                easing: r.easing,
                queue: !1,
                complete: function() {
                    p === "hide" && f.hide();
                    n.effects.restore(f, c);
                    n.effects.removeWrapper(f);
                    u()
                }
            })
        }
    }(jQuery), function(n) {
        n.effects.effect.bounce = function(t, i) {
            var r = n(this),
                v = ["position", "top", "bottom", "left", "right", "height", "width"],
                k = n.effects.setMode(r, t.mode || "effect"),
                f = k === "hide",
                y = k === "show",
                h = t.direction || "up",
                u = t.distance,
                p = t.times || 5,
                d = p * 2 + (y || f ? 1 : 0),
                c = t.duration / d,
                l = t.easing,
                e = h === "up" || h === "down" ? "top" : "left",
                w = h === "up" || h === "left",
                b, o, s, a = r.queue(),
                g = a.length;
            for ((y || f) && v.push("opacity"), n.effects.save(r, v), r.show(), n.effects.createWrapper(r), u || (u = r[e === "top" ? "outerHeight" : "outerWidth"]() / 3), y && (s = {
                    opacity: 1
                }, s[e] = 0, r.css("opacity", 0).css(e, w ? -u * 2 : u * 2).animate(s, c, l)), f && (u = u / Math.pow(2, p - 1)), s = {}, s[e] = 0, b = 0; b < p; b++) o = {}, o[e] = (w ? "-=" : "+=") + u, r.animate(o, c, l).animate(s, c, l), u = f ? u * 2 : u / 2;
            f && (o = {
                opacity: 0
            }, o[e] = (w ? "-=" : "+=") + u, r.animate(o, c, l));
            r.queue(function() {
                f && r.hide();
                n.effects.restore(r, v);
                n.effects.removeWrapper(r);
                i()
            });
            g > 1 && a.splice.apply(a, [1, 0].concat(a.splice(g, d + 1)));
            r.dequeue()
        }
    }(jQuery), function(n) {
        n.effects.effect.clip = function(t, i) {
            var r = n(this),
                h = ["position", "top", "bottom", "left", "right", "height", "width"],
                v = n.effects.setMode(r, t.mode || "hide"),
                f = v === "show",
                y = t.direction || "vertical",
                c = y === "vertical",
                o = c ? "height" : "width",
                l = c ? "top" : "left",
                s = {},
                a, u, e;
            n.effects.save(r, h);
            r.show();
            a = n.effects.createWrapper(r).css({
                overflow: "hidden"
            });
            u = r[0].tagName === "IMG" ? a : r;
            e = u[o]();
            f && (u.css(o, 0), u.css(l, e / 2));
            s[o] = f ? e : 0;
            s[l] = f ? 0 : e / 2;
            u.animate(s, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: function() {
                    f || r.hide();
                    n.effects.restore(r, h);
                    n.effects.removeWrapper(r);
                    i()
                }
            })
        }
    }(jQuery), function(n) {
        n.effects.effect.drop = function(t, i) {
            var r = n(this),
                h = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
                c = n.effects.setMode(r, t.mode || "hide"),
                e = c === "show",
                u = t.direction || "left",
                o = u === "up" || u === "down" ? "top" : "left",
                s = u === "up" || u === "left" ? "pos" : "neg",
                l = {
                    opacity: e ? 1 : 0
                },
                f;
            n.effects.save(r, h);
            r.show();
            n.effects.createWrapper(r);
            f = t.distance || r[o === "top" ? "outerHeight" : "outerWidth"](!0) / 2;
            e && r.css("opacity", 0).css(o, s === "pos" ? -f : f);
            l[o] = (e ? s === "pos" ? "+=" : "-=" : s === "pos" ? "-=" : "+=") + f;
            r.animate(l, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: function() {
                    c === "hide" && r.hide();
                    n.effects.restore(r, h);
                    n.effects.removeWrapper(r);
                    i()
                }
            })
        }
    }(jQuery), function(n) {
        n.effects.effect.explode = function(t, i) {
            function b() {
                l.push(this);
                l.length === e * c && k()
            }

            function k() {
                r.css({
                    visibility: "visible"
                });
                n(l).remove();
                u || r.hide();
                i()
            }
            for (var e = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3, c = e, r = n(this), d = n.effects.setMode(r, t.mode || "hide"), u = d === "show", w = r.show().css("visibility", "hidden").offset(), o = Math.ceil(r.outerWidth() / c), s = Math.ceil(r.outerHeight() / e), l = [], f, a, v, y, p, h = 0; h < e; h++)
                for (v = w.top + h * s, p = h - (e - 1) / 2, f = 0; f < c; f++) a = w.left + f * o, y = f - (c - 1) / 2, r.clone().appendTo("body").wrap("<div><\/div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -f * o,
                    top: -h * s
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: o,
                    height: s,
                    left: a + (u ? y * o : 0),
                    top: v + (u ? p * s : 0),
                    opacity: u ? 0 : 1
                }).animate({
                    left: a + (u ? 0 : y * o),
                    top: v + (u ? 0 : p * s),
                    opacity: u ? 1 : 0
                }, t.duration || 500, t.easing, b)
        }
    }(jQuery), function(n) {
        n.effects.effect.fade = function(t, i) {
            var r = n(this),
                u = n.effects.setMode(r, t.mode || "toggle");
            r.animate({
                opacity: u
            }, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: i
            })
        }
    }(jQuery), function(n) {
        n.effects.effect.fold = function(t, i) {
            var r = n(this),
                s = ["position", "top", "bottom", "left", "right", "height", "width"],
                h = n.effects.setMode(r, t.mode || "hide"),
                e = h === "show",
                c = h === "hide",
                f = t.size || 15,
                l = /([0-9]+)%/.exec(f),
                a = !!t.horizFirst,
                v = e !== a,
                y = v ? ["width", "height"] : ["height", "width"],
                p = t.duration / 2,
                u, o, w = {},
                b = {};
            n.effects.save(r, s);
            r.show();
            u = n.effects.createWrapper(r).css({
                overflow: "hidden"
            });
            o = v ? [u.width(), u.height()] : [u.height(), u.width()];
            l && (f = parseInt(l[1], 10) / 100 * o[c ? 0 : 1]);
            e && u.css(a ? {
                height: 0,
                width: f
            } : {
                height: f,
                width: 0
            });
            w[y[0]] = e ? o[0] : f;
            b[y[1]] = e ? o[1] : 0;
            u.animate(w, p, t.easing).animate(b, p, t.easing, function() {
                c && r.hide();
                n.effects.restore(r, s);
                n.effects.removeWrapper(r);
                i()
            })
        }
    }(jQuery), function(n) {
        n.effects.effect.highlight = function(t, i) {
            var r = n(this),
                u = ["backgroundImage", "backgroundColor", "opacity"],
                f = n.effects.setMode(r, t.mode || "show"),
                e = {
                    backgroundColor: r.css("backgroundColor")
                };
            f === "hide" && (e.opacity = 0);
            n.effects.save(r, u);
            r.show().css({
                backgroundImage: "none",
                backgroundColor: t.color || "#ffff99"
            }).animate(e, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: function() {
                    f === "hide" && r.hide();
                    n.effects.restore(r, u);
                    i()
                }
            })
        }
    }(jQuery), function(n) {
        n.effects.effect.pulsate = function(t, i) {
            var r = n(this),
                e = n.effects.setMode(r, t.mode || "show"),
                h = e === "show",
                a = e === "hide",
                v = h || e === "hide",
                o = (t.times || 5) * 2 + (v ? 1 : 0),
                c = t.duration / o,
                u = 0,
                f = r.queue(),
                l = f.length,
                s;
            for ((h || !r.is(":visible")) && (r.css("opacity", 0).show(), u = 1), s = 1; s < o; s++) r.animate({
                opacity: u
            }, c, t.easing), u = 1 - u;
            r.animate({
                opacity: u
            }, c, t.easing);
            r.queue(function() {
                a && r.hide();
                i()
            });
            l > 1 && f.splice.apply(f, [1, 0].concat(f.splice(l, o + 1)));
            r.dequeue()
        }
    }(jQuery), function(n) {
        n.effects.effect.puff = function(t, i) {
            var r = n(this),
                e = n.effects.setMode(r, t.mode || "hide"),
                o = e === "hide",
                s = parseInt(t.percent, 10) || 150,
                f = s / 100,
                u = {
                    height: r.height(),
                    width: r.width(),
                    outerHeight: r.outerHeight(),
                    outerWidth: r.outerWidth()
                };
            n.extend(t, {
                effect: "scale",
                queue: !1,
                fade: !0,
                mode: e,
                complete: i,
                percent: o ? s : 100,
                from: o ? u : {
                    height: u.height * f,
                    width: u.width * f,
                    outerHeight: u.outerHeight * f,
                    outerWidth: u.outerWidth * f
                }
            });
            r.effect(t)
        };
        n.effects.effect.scale = function(t, i) {
            var u = n(this),
                r = n.extend(!0, {}, t),
                f = n.effects.setMode(u, t.mode || "effect"),
                s = parseInt(t.percent, 10) || (parseInt(t.percent, 10) === 0 ? 0 : f === "hide" ? 0 : 100),
                h = t.direction || "both",
                c = t.origin,
                e = {
                    height: u.height(),
                    width: u.width(),
                    outerHeight: u.outerHeight(),
                    outerWidth: u.outerWidth()
                },
                o = {
                    y: h !== "horizontal" ? s / 100 : 1,
                    x: h !== "vertical" ? s / 100 : 1
                };
            r.effect = "size";
            r.queue = !1;
            r.complete = i;
            f !== "effect" && (r.origin = c || ["middle", "center"], r.restore = !0);
            r.from = t.from || (f === "show" ? {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            } : e);
            r.to = {
                height: e.height * o.y,
                width: e.width * o.x,
                outerHeight: e.outerHeight * o.y,
                outerWidth: e.outerWidth * o.x
            };
            r.fade && (f === "show" && (r.from.opacity = 0, r.to.opacity = 1), f === "hide" && (r.from.opacity = 1, r.to.opacity = 0));
            u.effect(r)
        };
        n.effects.effect.size = function(t, i) {
            var f, l, u, r = n(this),
                w = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                a = ["width", "height", "overflow"],
                v = ["fontSize"],
                e = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                o = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                h = n.effects.setMode(r, t.mode || "effect"),
                y = t.restore || h !== "effect",
                c = t.scale || "both",
                b = t.origin || ["middle", "center"],
                k = r.css("position"),
                s = y ? w : ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                p = {
                    height: 0,
                    width: 0,
                    outerHeight: 0,
                    outerWidth: 0
                };
            h === "show" && r.show();
            f = {
                height: r.height(),
                width: r.width(),
                outerHeight: r.outerHeight(),
                outerWidth: r.outerWidth()
            };
            t.mode === "toggle" && h === "show" ? (r.from = t.to || p, r.to = t.from || f) : (r.from = t.from || (h === "show" ? p : f), r.to = t.to || (h === "hide" ? p : f));
            u = {
                from: {
                    y: r.from.height / f.height,
                    x: r.from.width / f.width
                },
                to: {
                    y: r.to.height / f.height,
                    x: r.to.width / f.width
                }
            };
            (c === "box" || c === "both") && (u.from.y !== u.to.y && (s = s.concat(e), r.from = n.effects.setTransition(r, e, u.from.y, r.from), r.to = n.effects.setTransition(r, e, u.to.y, r.to)), u.from.x !== u.to.x && (s = s.concat(o), r.from = n.effects.setTransition(r, o, u.from.x, r.from), r.to = n.effects.setTransition(r, o, u.to.x, r.to)));
            (c === "content" || c === "both") && u.from.y !== u.to.y && (s = s.concat(v).concat(a), r.from = n.effects.setTransition(r, v, u.from.y, r.from), r.to = n.effects.setTransition(r, v, u.to.y, r.to));
            n.effects.save(r, s);
            r.show();
            n.effects.createWrapper(r);
            r.css("overflow", "hidden").css(r.from);
            b && (l = n.effects.getBaseline(b, f), r.from.top = (f.outerHeight - r.outerHeight()) * l.y, r.from.left = (f.outerWidth - r.outerWidth()) * l.x, r.to.top = (f.outerHeight - r.to.outerHeight) * l.y, r.to.left = (f.outerWidth - r.to.outerWidth) * l.x);
            r.css(r.from);
            (c === "content" || c === "both") && (e = e.concat(["marginTop", "marginBottom"]).concat(v), o = o.concat(["marginLeft", "marginRight"]), a = w.concat(e).concat(o), r.find("*[width]").each(function() {
                var i = n(this),
                    r = {
                        height: i.height(),
                        width: i.width(),
                        outerHeight: i.outerHeight(),
                        outerWidth: i.outerWidth()
                    };
                y && n.effects.save(i, a);
                i.from = {
                    height: r.height * u.from.y,
                    width: r.width * u.from.x,
                    outerHeight: r.outerHeight * u.from.y,
                    outerWidth: r.outerWidth * u.from.x
                };
                i.to = {
                    height: r.height * u.to.y,
                    width: r.width * u.to.x,
                    outerHeight: r.height * u.to.y,
                    outerWidth: r.width * u.to.x
                };
                u.from.y !== u.to.y && (i.from = n.effects.setTransition(i, e, u.from.y, i.from), i.to = n.effects.setTransition(i, e, u.to.y, i.to));
                u.from.x !== u.to.x && (i.from = n.effects.setTransition(i, o, u.from.x, i.from), i.to = n.effects.setTransition(i, o, u.to.x, i.to));
                i.css(i.from);
                i.animate(i.to, t.duration, t.easing, function() {
                    y && n.effects.restore(i, a)
                })
            }));
            r.animate(r.to, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: function() {
                    r.to.opacity === 0 && r.css("opacity", r.from.opacity);
                    h === "hide" && r.hide();
                    n.effects.restore(r, s);
                    y || (k === "static" ? r.css({
                        position: "relative",
                        top: r.to.top,
                        left: r.to.left
                    }) : n.each(["top", "left"], function(n, t) {
                        r.css(t, function(t, i) {
                            var f = parseInt(i, 10),
                                u = n ? r.to.left : r.to.top;
                            return i === "auto" ? u + "px" : f + u + "px"
                        })
                    }));
                    n.effects.removeWrapper(r);
                    i()
                }
            })
        }
    }(jQuery), function(n) {
        n.effects.effect.shake = function(t, i) {
            var r = n(this),
                v = ["position", "top", "bottom", "left", "right", "height", "width"],
                k = n.effects.setMode(r, t.mode || "effect"),
                f = t.direction || "left",
                o = t.distance || 20,
                y = t.times || 3,
                p = y * 2 + 1,
                u = Math.round(t.duration / p),
                s = f === "up" || f === "down" ? "top" : "left",
                h = f === "up" || f === "left",
                c = {},
                l = {},
                w = {},
                a, e = r.queue(),
                b = e.length;
            for (n.effects.save(r, v), r.show(), n.effects.createWrapper(r), c[s] = (h ? "-=" : "+=") + o, l[s] = (h ? "+=" : "-=") + o * 2, w[s] = (h ? "-=" : "+=") + o * 2, r.animate(c, u, t.easing), a = 1; a < y; a++) r.animate(l, u, t.easing).animate(w, u, t.easing);
            r.animate(l, u, t.easing).animate(c, u / 2, t.easing).queue(function() {
                k === "hide" && r.hide();
                n.effects.restore(r, v);
                n.effects.removeWrapper(r);
                i()
            });
            b > 1 && e.splice.apply(e, [1, 0].concat(e.splice(b, p + 1)));
            r.dequeue()
        }
    }(jQuery), function(n) {
        n.effects.effect.slide = function(t, i) {
            var r = n(this),
                s = ["position", "top", "bottom", "left", "right", "width", "height"],
                h = n.effects.setMode(r, t.mode || "show"),
                c = h === "show",
                f = t.direction || "left",
                e = f === "up" || f === "down" ? "top" : "left",
                o = f === "up" || f === "left",
                u, l = {};
            n.effects.save(r, s);
            r.show();
            u = t.distance || r[e === "top" ? "outerHeight" : "outerWidth"](!0);
            n.effects.createWrapper(r).css({
                overflow: "hidden"
            });
            c && r.css(e, o ? isNaN(u) ? "-" + u : -u : u);
            l[e] = (c ? o ? "+=" : "-=" : o ? "-=" : "+=") + u;
            r.animate(l, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: function() {
                    h === "hide" && r.hide();
                    n.effects.restore(r, s);
                    n.effects.removeWrapper(r);
                    i()
                }
            })
        }
    }(jQuery), function(n) {
        n.effects.effect.transfer = function(t, i) {
            var u = n(this),
                r = n(t.to),
                f = r.css("position") === "fixed",
                e = n("body"),
                o = f ? e.scrollTop() : 0,
                s = f ? e.scrollLeft() : 0,
                h = r.offset(),
                l = {
                    top: h.top - o,
                    left: h.left - s,
                    height: r.innerHeight(),
                    width: r.innerWidth()
                },
                c = u.offset(),
                a = n("<div class='ui-effects-transfer'><\/div>").appendTo(document.body).addClass(t.className).css({
                    top: c.top - o,
                    left: c.left - s,
                    height: u.innerHeight(),
                    width: u.innerWidth(),
                    position: f ? "fixed" : "absolute"
                }).animate(l, t.duration, t.easing, function() {
                    a.remove();
                    i()
                })
        }
    }(jQuery), typeof jQuery == "undefined") throw new Error("Bootstrap's JavaScript requires jQuery"); + function(n) {
    "use strict";
    var t = n.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || t[0] == 1 && t[1] == 9 && t[2] < 1 || t[0] > 2) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3");
}(jQuery); + function(n) {
    "use strict";

    function u(i) {
        return this.each(function() {
            var r = n(this),
                u = r.data("bs.alert");
            u || r.data("bs.alert", u = new t(this));
            typeof i == "string" && u[i].call(r)
        })
    }
    var i = '[data-dismiss="alert"]',
        t = function(t) {
            n(t).on("click", i, this.close)
        },
        r;
    t.VERSION = "3.3.6";
    t.TRANSITION_DURATION = 150;
    t.prototype.close = function(i) {
        function e() {
            r.detach().trigger("closed.bs.alert").remove()
        }
        var f = n(this),
            u = f.attr("data-target"),
            r;
        (u || (u = f.attr("href"), u = u && u.replace(/.*(?=#[^\s]*$)/, "")), r = n(u), i && i.preventDefault(), r.length || (r = f.closest(".alert")), r.trigger(i = n.Event("close.bs.alert")), i.isDefaultPrevented()) || (r.removeClass("in"), n.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e())
    };
    r = n.fn.alert;
    n.fn.alert = u;
    n.fn.alert.Constructor = t;
    n.fn.alert.noConflict = function() {
        return n.fn.alert = r, this
    };
    n(document).on("click.bs.alert.data-api", i, t.prototype.close)
}(jQuery); + function(n) {
    "use strict";

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.button"),
                f = typeof i == "object" && i;
            r || u.data("bs.button", r = new t(this, f));
            i == "toggle" ? r.toggle() : i && r.setState(i)
        })
    }
    var t = function(i, r) {
            this.$element = n(i);
            this.options = n.extend({}, t.DEFAULTS, r);
            this.isLoading = !1
        },
        r;
    t.VERSION = "3.3.6";
    t.DEFAULTS = {
        loadingText: "loading..."
    };
    t.prototype.setState = function(t) {
        var r = "disabled",
            i = this.$element,
            f = i.is("input") ? "val" : "html",
            u = i.data();
        t += "Text";
        u.resetText == null && i.data("resetText", i[f]());
        setTimeout(n.proxy(function() {
            i[f](u[t] == null ? this.options[t] : u[t]);
            t == "loadingText" ? (this.isLoading = !0, i.addClass(r).attr(r, r)) : this.isLoading && (this.isLoading = !1, i.removeClass(r).removeAttr(r))
        }, this), 0)
    };
    t.prototype.toggle = function() {
        var t = !0,
            i = this.$element.closest('[data-toggle="buttons"]'),
            n;
        i.length ? (n = this.$element.find("input"), n.prop("type") == "radio" ? (n.prop("checked") && (t = !1), i.find(".active").removeClass("active"), this.$element.addClass("active")) : n.prop("type") == "checkbox" && (n.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), n.prop("checked", this.$element.hasClass("active")), t && n.trigger("change")) : (this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active"))
    };
    r = n.fn.button;
    n.fn.button = i;
    n.fn.button.Constructor = t;
    n.fn.button.noConflict = function() {
        return n.fn.button = r, this
    };
    n(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        var r = n(t.target);
        r.hasClass("btn") || (r = r.closest(".btn"));
        i.call(r, "toggle");
        n(t.target).is('input[type="radio"]') || n(t.target).is('input[type="checkbox"]') || t.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        n(t.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(t.type))
    })
}(jQuery); + function(n) {
    "use strict";

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.carousel"),
                f = n.extend({}, t.DEFAULTS, u.data(), typeof i == "object" && i),
                e = typeof i == "string" ? i : f.slide;
            r || u.data("bs.carousel", r = new t(this, f));
            typeof i == "number" ? r.to(i) : e ? r[e]() : f.interval && r.pause().cycle()
        })
    }
    var t = function(t, i) {
            this.$element = n(t);
            this.$indicators = this.$element.find(".carousel-indicators");
            this.options = i;
            this.paused = null;
            this.sliding = null;
            this.interval = null;
            this.$active = null;
            this.$items = null;
            this.options.keyboard && this.$element.on("keydown.bs.carousel", n.proxy(this.keydown, this));
            this.options.pause != "hover" || "ontouchstart" in document.documentElement || this.$element.on("mouseenter.bs.carousel", n.proxy(this.pause, this)).on("mouseleave.bs.carousel", n.proxy(this.cycle, this))
        },
        u, r;
    t.VERSION = "3.3.6";
    t.TRANSITION_DURATION = 600;
    t.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    };
    t.prototype.keydown = function(n) {
        if (!/input|textarea/i.test(n.target.tagName)) {
            switch (n.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            n.preventDefault()
        }
    };
    t.prototype.cycle = function(t) {
        return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(n.proxy(this.next, this), this.options.interval)), this
    };
    t.prototype.getItemIndex = function(n) {
        return this.$items = n.parent().children(".item"), this.$items.index(n || this.$active)
    };
    t.prototype.getItemForDirection = function(n, t) {
        var i = this.getItemIndex(t),
            f = n == "prev" && i === 0 || n == "next" && i == this.$items.length - 1,
            r, u;
        return f && !this.options.wrap ? t : (r = n == "prev" ? -1 : 1, u = (i + r) % this.$items.length, this.$items.eq(u))
    };
    t.prototype.to = function(n) {
        var i = this,
            t = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(n > this.$items.length - 1) && !(n < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            i.to(n)
        }) : t == n ? this.pause().cycle() : this.slide(n > t ? "next" : "prev", this.$items.eq(n))
    };
    t.prototype.pause = function(t) {
        return t || (this.paused = !0), this.$element.find(".next, .prev").length && n.support.transition && (this.$element.trigger(n.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    };
    t.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    };
    t.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    };
    t.prototype.slide = function(i, r) {
        var e = this.$element.find(".item.active"),
            u = r || this.getItemForDirection(i, e),
            l = this.interval,
            f = i == "next" ? "left" : "right",
            a = this,
            o, s, h, c;
        return u.hasClass("active") ? this.sliding = !1 : (o = u[0], s = n.Event("slide.bs.carousel", {
            relatedTarget: o,
            direction: f
        }), this.$element.trigger(s), s.isDefaultPrevented()) ? void 0 : (this.sliding = !0, l && this.pause(), this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), h = n(this.$indicators.children()[this.getItemIndex(u)]), h && h.addClass("active")), c = n.Event("slid.bs.carousel", {
            relatedTarget: o,
            direction: f
        }), n.support.transition && this.$element.hasClass("slide") ? (u.addClass(i), u[0].offsetWidth, e.addClass(f), u.addClass(f), e.one("bsTransitionEnd", function() {
            u.removeClass([i, f].join(" ")).addClass("active");
            e.removeClass(["active", f].join(" "));
            a.sliding = !1;
            setTimeout(function() {
                a.$element.trigger(c)
            }, 0)
        }).emulateTransitionEnd(t.TRANSITION_DURATION)) : (e.removeClass("active"), u.addClass("active"), this.sliding = !1, this.$element.trigger(c)), l && this.cycle(), this)
    };
    u = n.fn.carousel;
    n.fn.carousel = i;
    n.fn.carousel.Constructor = t;
    n.fn.carousel.noConflict = function() {
        return n.fn.carousel = u, this
    };
    r = function(t) {
        var o, r = n(this),
            u = n(r.attr("data-target") || (o = r.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, "")),
            e, f;
        u.hasClass("carousel") && (e = n.extend({}, u.data(), r.data()), f = r.attr("data-slide-to"), f && (e.interval = !1), i.call(u, e), f && u.data("bs.carousel").to(f), t.preventDefault())
    };
    n(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r);
    n(window).on("load", function() {
        n('[data-ride="carousel"]').each(function() {
            var t = n(this);
            i.call(t, t.data())
        })
    })
}(jQuery); + function(n) {
    "use strict";

    function r(t) {
        var i = t.attr("data-target"),
            r;
        return i || (i = t.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, "")), r = i && n(i), r && r.length ? r : t.parent()
    }

    function u(t) {
        t && t.which === 3 || (n(o).remove(), n(i).each(function() {
            var u = n(this),
                i = r(u),
                f = {
                    relatedTarget: this
                };
            i.hasClass("open") && (t && t.type == "click" && /input|textarea/i.test(t.target.tagName) && n.contains(i[0], t.target) || (i.trigger(t = n.Event("hide.bs.dropdown", f)), t.isDefaultPrevented()) || (u.attr("aria-expanded", "false"), i.removeClass("open").trigger(n.Event("hidden.bs.dropdown", f))))
        }))
    }

    function e(i) {
        return this.each(function() {
            var r = n(this),
                u = r.data("bs.dropdown");
            u || r.data("bs.dropdown", u = new t(this));
            typeof i == "string" && u[i].call(r)
        })
    }
    var o = ".dropdown-backdrop",
        i = '[data-toggle="dropdown"]',
        t = function(t) {
            n(t).on("click.bs.dropdown", this.toggle)
        },
        f;
    t.VERSION = "3.3.6";
    t.prototype.toggle = function(t) {
        var f = n(this),
            i, o, e;
        if (!f.is(".disabled, :disabled")) {
            if (i = r(f), o = i.hasClass("open"), u(), !o) {
                if ("ontouchstart" in document.documentElement && !i.closest(".navbar-nav").length) n(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(n(this)).on("click", u);
                if (e = {
                        relatedTarget: this
                    }, i.trigger(t = n.Event("show.bs.dropdown", e)), t.isDefaultPrevented()) return;
                f.trigger("focus").attr("aria-expanded", "true");
                i.toggleClass("open").trigger(n.Event("shown.bs.dropdown", e))
            }
            return !1
        }
    };
    t.prototype.keydown = function(t) {
        var e, o, s, h, f, u;
        if (/(38|40|27|32)/.test(t.which) && !/input|textarea/i.test(t.target.tagName) && (e = n(this), t.preventDefault(), t.stopPropagation(), !e.is(".disabled, :disabled"))) {
            if (o = r(e), s = o.hasClass("open"), !s && t.which != 27 || s && t.which == 27) return t.which == 27 && o.find(i).trigger("focus"), e.trigger("click");
            (h = " li:not(.disabled):visible a", f = o.find(".dropdown-menu" + h), f.length) && (u = f.index(t.target), t.which == 38 && u > 0 && u--, t.which == 40 && u < f.length - 1 && u++, ~u || (u = 0), f.eq(u).trigger("focus"))
        }
    };
    f = n.fn.dropdown;
    n.fn.dropdown = e;
    n.fn.dropdown.Constructor = t;
    n.fn.dropdown.noConflict = function() {
        return n.fn.dropdown = f, this
    };
    n(document).on("click.bs.dropdown.data-api", u).on("click.bs.dropdown.data-api", ".dropdown form", function(n) {
        n.stopPropagation()
    }).on("click.bs.dropdown.data-api", i, t.prototype.toggle).on("keydown.bs.dropdown.data-api", i, t.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", t.prototype.keydown)
}(jQuery); + function(n) {
    "use strict";

    function i(i, r) {
        return this.each(function() {
            var f = n(this),
                u = f.data("bs.modal"),
                e = n.extend({}, t.DEFAULTS, f.data(), typeof i == "object" && i);
            u || f.data("bs.modal", u = new t(this, e));
            typeof i == "string" ? u[i](r) : e.show && u.show(r)
        })
    }
    var t = function(t, i) {
            this.options = i;
            this.$body = n(document.body);
            this.$element = n(t);
            this.$dialog = this.$element.find(".modal-dialog");
            this.$backdrop = null;
            this.isShown = null;
            this.originalBodyPad = null;
            this.scrollbarWidth = 0;
            this.ignoreBackdropClick = !1;
            this.options.remote && this.$element.find(".modal-content").load(this.options.remote, n.proxy(function() {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        },
        r;
    t.VERSION = "3.3.6";
    t.TRANSITION_DURATION = 300;
    t.BACKDROP_TRANSITION_DURATION = 150;
    t.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    };
    t.prototype.toggle = function(n) {
        return this.isShown ? this.hide() : this.show(n)
    };
    t.prototype.show = function(i) {
        var r = this,
            u = n.Event("show.bs.modal", {
                relatedTarget: i
            });
        if (this.$element.trigger(u), !this.isShown && !u.isDefaultPrevented()) {
            this.isShown = !0;
            this.checkScrollbar();
            this.setScrollbar();
            this.$body.addClass("modal-open");
            this.escape();
            this.resize();
            this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', n.proxy(this.hide, this));
            this.$dialog.on("mousedown.dismiss.bs.modal", function() {
                r.$element.one("mouseup.dismiss.bs.modal", function(t) {
                    n(t.target).is(r.$element) && (r.ignoreBackdropClick = !0)
                })
            });
            this.backdrop(function() {
                var f = n.support.transition && r.$element.hasClass("fade"),
                    u;
                r.$element.parent().length || r.$element.appendTo(r.$body);
                r.$element.show().scrollTop(0);
                r.adjustDialog();
                f && r.$element[0].offsetWidth;
                r.$element.addClass("in");
                r.enforceFocus();
                u = n.Event("shown.bs.modal", {
                    relatedTarget: i
                });
                f ? r.$dialog.one("bsTransitionEnd", function() {
                    r.$element.trigger("focus").trigger(u)
                }).emulateTransitionEnd(t.TRANSITION_DURATION) : r.$element.trigger("focus").trigger(u)
            })
        }
    };
    t.prototype.hide = function(i) {
        (i && i.preventDefault(), i = n.Event("hide.bs.modal"), this.$element.trigger(i), this.isShown && !i.isDefaultPrevented()) && (this.isShown = !1, this.escape(), this.resize(), n(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), n.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", n.proxy(this.hideModal, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : this.hideModal())
    };
    t.prototype.enforceFocus = function() {
        n(document).off("focusin.bs.modal").on("focusin.bs.modal", n.proxy(function(n) {
            this.$element[0] === n.target || this.$element.has(n.target).length || this.$element.trigger("focus")
        }, this))
    };
    t.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) this.$element.on("keydown.dismiss.bs.modal", n.proxy(function(n) {
            n.which == 27 && this.hide()
        }, this));
        else this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    };
    t.prototype.resize = function() {
        if (this.isShown) n(window).on("resize.bs.modal", n.proxy(this.handleUpdate, this));
        else n(window).off("resize.bs.modal")
    };
    t.prototype.hideModal = function() {
        var n = this;
        this.$element.hide();
        this.backdrop(function() {
            n.$body.removeClass("modal-open");
            n.resetAdjustments();
            n.resetScrollbar();
            n.$element.trigger("hidden.bs.modal")
        })
    };
    t.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null
    };
    t.prototype.backdrop = function(i) {
        var e = this,
            f = this.$element.hasClass("fade") ? "fade" : "",
            r, u;
        if (this.isShown && this.options.backdrop) {
            r = n.support.transition && f;
            this.$backdrop = n(document.createElement("div")).addClass("modal-backdrop " + f).appendTo(this.$body);
            this.$element.on("click.dismiss.bs.modal", n.proxy(function(n) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = !1;
                    return
                }
                n.target === n.currentTarget && (this.options.backdrop == "static" ? this.$element[0].focus() : this.hide())
            }, this));
            if (r && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !i) return;
            r ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : i()
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), u = function() {
            e.removeBackdrop();
            i && i()
        }, n.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", u).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : u()) : i && i()
    };
    t.prototype.handleUpdate = function() {
        this.adjustDialog()
    };
    t.prototype.adjustDialog = function() {
        var n = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && n ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !n ? this.scrollbarWidth : ""
        })
    };
    t.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    };
    t.prototype.checkScrollbar = function() {
        var n = window.innerWidth,
            t;
        n || (t = document.documentElement.getBoundingClientRect(), n = t.right - Math.abs(t.left));
        this.bodyIsOverflowing = document.body.clientWidth < n;
        this.scrollbarWidth = this.measureScrollbar()
    };
    t.prototype.setScrollbar = function() {
        var n = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "";
        this.bodyIsOverflowing && this.$body.css("padding-right", n + this.scrollbarWidth)
    };
    t.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    };
    t.prototype.measureScrollbar = function() {
        var n = document.createElement("div"),
            t;
        return n.className = "modal-scrollbar-measure", this.$body.append(n), t = n.offsetWidth - n.clientWidth, this.$body[0].removeChild(n), t
    };
    r = n.fn.modal;
    n.fn.modal = i;
    n.fn.modal.Constructor = t;
    n.fn.modal.noConflict = function() {
        return n.fn.modal = r, this
    };
    n(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
        var r = n(this),
            f = r.attr("href"),
            u = n(r.attr("data-target") || f && f.replace(/.*(?=#[^\s]+$)/, "")),
            e = u.data("bs.modal") ? "toggle" : n.extend({
                remote: !/#/.test(f) && f
            }, u.data(), r.data());
        r.is("a") && t.preventDefault();
        u.one("show.bs.modal", function(n) {
            if (!n.isDefaultPrevented()) u.one("hidden.bs.modal", function() {
                r.is(":visible") && r.trigger("focus")
            })
        });
        i.call(u, e, this)
    })
}(jQuery); + function(n) {
    "use strict";

    function r(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.tooltip"),
                f = typeof i == "object" && i;
            (r || !/destroy|hide/.test(i)) && (r || u.data("bs.tooltip", r = new t(this, f)), typeof i == "string" && r[i]())
        })
    }
    var t = function(n, t) {
            this.type = null;
            this.options = null;
            this.enabled = null;
            this.timeout = null;
            this.hoverState = null;
            this.$element = null;
            this.inState = null;
            this.init("tooltip", n, t)
        },
        i;
    t.VERSION = "3.3.6";
    t.TRANSITION_DURATION = 150;
    t.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"><\/div><div class="tooltip-inner"><\/div><\/div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    };
    t.prototype.init = function(t, i, r) {
        var f, e, u, o, s;
        if (this.enabled = !0, this.type = t, this.$element = n(i), this.options = this.getOptions(r), this.$viewport = this.options.viewport && n(n.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (f = this.options.trigger.split(" "), e = f.length; e--;)
            if (u = f[e], u == "click") this.$element.on("click." + this.type, this.options.selector, n.proxy(this.toggle, this));
            else if (u != "manual") {
            o = u == "hover" ? "mouseenter" : "focusin";
            s = u == "hover" ? "mouseleave" : "focusout";
            this.$element.on(o + "." + this.type, this.options.selector, n.proxy(this.enter, this));
            this.$element.on(s + "." + this.type, this.options.selector, n.proxy(this.leave, this))
        }
        this.options.selector ? this._options = n.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    };
    t.prototype.getDefaults = function() {
        return t.DEFAULTS
    };
    t.prototype.getOptions = function(t) {
        return t = n.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && typeof t.delay == "number" && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), t
    };
    t.prototype.getDelegateOptions = function() {
        var t = {},
            i = this.getDefaults();
        return this._options && n.each(this._options, function(n, r) {
            i[n] != r && (t[n] = r)
        }), t
    };
    t.prototype.enter = function(t) {
        var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
        if (i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)), t instanceof n.Event && (i.inState[t.type == "focusin" ? "focus" : "hover"] = !0), i.tip().hasClass("in") || i.hoverState == "in") {
            i.hoverState = "in";
            return
        }
        if (clearTimeout(i.timeout), i.hoverState = "in", !i.options.delay || !i.options.delay.show) return i.show();
        i.timeout = setTimeout(function() {
            i.hoverState == "in" && i.show()
        }, i.options.delay.show)
    };
    t.prototype.isInStateTrue = function() {
        for (var n in this.inState)
            if (this.inState[n]) return !0;
        return !1
    };
    t.prototype.leave = function(t) {
        var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
        if (i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)), t instanceof n.Event && (i.inState[t.type == "focusout" ? "focus" : "hover"] = !1), !i.isInStateTrue()) {
            if (clearTimeout(i.timeout), i.hoverState = "out", !i.options.delay || !i.options.delay.hide) return i.hide();
            i.timeout = setTimeout(function() {
                i.hoverState == "out" && i.hide()
            }, i.options.delay.hide)
        }
    };
    t.prototype.show = function() {
        var c = n.Event("show.bs." + this.type),
            l, a, f, v, o;
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(c), l = n.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]), c.isDefaultPrevented() || !l) return;
            var u = this,
                r = this.tip(),
                y = this.getUID(this.type);
            this.setContent();
            r.attr("id", y);
            this.$element.attr("aria-describedby", y);
            this.options.animation && r.addClass("fade");
            var i = typeof this.options.placement == "function" ? this.options.placement.call(this, r[0], this.$element[0]) : this.options.placement,
                p = /\s?auto?\s?/i,
                w = p.test(i);
            w && (i = i.replace(p, "") || "top");
            r.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(i).data("bs." + this.type, this);
            this.options.container ? r.appendTo(this.options.container) : r.insertAfter(this.$element);
            this.$element.trigger("inserted.bs." + this.type);
            var e = this.getPosition(),
                s = r[0].offsetWidth,
                h = r[0].offsetHeight;
            w && (a = i, f = this.getPosition(this.$viewport), i = i == "bottom" && e.bottom + h > f.bottom ? "top" : i == "top" && e.top - h < f.top ? "bottom" : i == "right" && e.right + s > f.width ? "left" : i == "left" && e.left - s < f.left ? "right" : i, r.removeClass(a).addClass(i));
            v = this.getCalculatedOffset(i, e, s, h);
            this.applyPlacement(v, i);
            o = function() {
                var n = u.hoverState;
                u.$element.trigger("shown.bs." + u.type);
                u.hoverState = null;
                n == "out" && u.leave(u)
            };
            n.support.transition && this.$tip.hasClass("fade") ? r.one("bsTransitionEnd", o).emulateTransitionEnd(t.TRANSITION_DURATION) : o()
        }
    };
    t.prototype.applyPlacement = function(t, i) {
        var r = this.tip(),
            l = r[0].offsetWidth,
            e = r[0].offsetHeight,
            o = parseInt(r.css("margin-top"), 10),
            s = parseInt(r.css("margin-left"), 10),
            h, f, u;
        isNaN(o) && (o = 0);
        isNaN(s) && (s = 0);
        t.top += o;
        t.left += s;
        n.offset.setOffset(r[0], n.extend({
            using: function(n) {
                r.css({
                    top: Math.round(n.top),
                    left: Math.round(n.left)
                })
            }
        }, t), 0);
        r.addClass("in");
        h = r[0].offsetWidth;
        f = r[0].offsetHeight;
        i == "top" && f != e && (t.top = t.top + e - f);
        u = this.getViewportAdjustedDelta(i, t, h, f);
        u.left ? t.left += u.left : t.top += u.top;
        var c = /top|bottom/.test(i),
            a = c ? u.left * 2 - l + h : u.top * 2 - e + f,
            v = c ? "offsetWidth" : "offsetHeight";
        r.offset(t);
        this.replaceArrow(a, r[0][v], c)
    };
    t.prototype.replaceArrow = function(n, t, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - n / t) + "%").css(i ? "top" : "left", "")
    };
    t.prototype.setContent = function() {
        var n = this.tip(),
            t = this.getTitle();
        n.find(".tooltip-inner")[this.options.html ? "html" : "text"](t);
        n.removeClass("fade in top bottom left right")
    };
    t.prototype.hide = function(i) {
        function f() {
            u.hoverState != "in" && r.detach();
            u.$element.removeAttr("aria-describedby").trigger("hidden.bs." + u.type);
            i && i()
        }
        var u = this,
            r = n(this.$tip),
            e = n.Event("hide.bs." + this.type);
        if (this.$element.trigger(e), !e.isDefaultPrevented()) return r.removeClass("in"), n.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", f).emulateTransitionEnd(t.TRANSITION_DURATION) : f(), this.hoverState = null, this
    };
    t.prototype.fixTitle = function() {
        var n = this.$element;
        (n.attr("title") || typeof n.attr("data-original-title") != "string") && n.attr("data-original-title", n.attr("title") || "").attr("title", "")
    };
    t.prototype.hasContent = function() {
        return this.getTitle()
    };
    t.prototype.getPosition = function(t) {
        t = t || this.$element;
        var u = t[0],
            r = u.tagName == "BODY",
            i = u.getBoundingClientRect();
        i.width == null && (i = n.extend({}, i, {
            width: i.right - i.left,
            height: i.bottom - i.top
        }));
        var f = r ? {
                top: 0,
                left: 0
            } : t.offset(),
            e = {
                scroll: r ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
            },
            o = r ? {
                width: n(window).width(),
                height: n(window).height()
            } : null;
        return n.extend({}, i, e, o, f)
    };
    t.prototype.getCalculatedOffset = function(n, t, i, r) {
        return n == "bottom" ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - i / 2
        } : n == "top" ? {
            top: t.top - r,
            left: t.left + t.width / 2 - i / 2
        } : n == "left" ? {
            top: t.top + t.height / 2 - r / 2,
            left: t.left - i
        } : {
            top: t.top + t.height / 2 - r / 2,
            left: t.left + t.width
        }
    };
    t.prototype.getViewportAdjustedDelta = function(n, t, i, r) {
        var f = {
                top: 0,
                left: 0
            },
            e, u, o, s, h, c;
        return this.$viewport ? (e = this.options.viewport && this.options.viewport.padding || 0, u = this.getPosition(this.$viewport), /right|left/.test(n) ? (o = t.top - e - u.scroll, s = t.top + e - u.scroll + r, o < u.top ? f.top = u.top - o : s > u.top + u.height && (f.top = u.top + u.height - s)) : (h = t.left - e, c = t.left + e + i, h < u.left ? f.left = u.left - h : c > u.right && (f.left = u.left + u.width - c)), f) : f
    };
    t.prototype.getTitle = function() {
        var t = this.$element,
            n = this.options;
        return t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title)
    };
    t.prototype.getUID = function(n) {
        do n += ~~(Math.random() * 1e6); while (document.getElementById(n));
        return n
    };
    t.prototype.tip = function() {
        if (!this.$tip && (this.$tip = n(this.options.template), this.$tip.length != 1)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    };
    t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    };
    t.prototype.enable = function() {
        this.enabled = !0
    };
    t.prototype.disable = function() {
        this.enabled = !1
    };
    t.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    };
    t.prototype.toggle = function(t) {
        var i = this;
        t && (i = n(t.currentTarget).data("bs." + this.type), i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)));
        t ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    };
    t.prototype.destroy = function() {
        var n = this;
        clearTimeout(this.timeout);
        this.hide(function() {
            n.$element.off("." + n.type).removeData("bs." + n.type);
            n.$tip && n.$tip.detach();
            n.$tip = null;
            n.$arrow = null;
            n.$viewport = null
        })
    };
    i = n.fn.tooltip;
    n.fn.tooltip = r;
    n.fn.tooltip.Constructor = t;
    n.fn.tooltip.noConflict = function() {
        return n.fn.tooltip = i, this
    }
}(jQuery); + function(n) {
    "use strict";

    function r(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.popover"),
                f = typeof i == "object" && i;
            (r || !/destroy|hide/.test(i)) && (r || u.data("bs.popover", r = new t(this, f)), typeof i == "string" && r[i]())
        })
    }
    var t = function(n, t) {
            this.init("popover", n, t)
        },
        i;
    if (!n.fn.tooltip) throw new Error("Popover requires tooltip.js");
    t.VERSION = "3.3.6";
    t.DEFAULTS = n.extend({}, n.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>'
    });
    t.prototype = n.extend({}, n.fn.tooltip.Constructor.prototype);
    t.prototype.constructor = t;
    t.prototype.getDefaults = function() {
        return t.DEFAULTS
    };
    t.prototype.setContent = function() {
        var n = this.tip(),
            i = this.getTitle(),
            t = this.getContent();
        n.find(".popover-title")[this.options.html ? "html" : "text"](i);
        n.find(".popover-content").children().detach().end()[this.options.html ? typeof t == "string" ? "html" : "append" : "text"](t);
        n.removeClass("fade top bottom left right in");
        n.find(".popover-title").html() || n.find(".popover-title").hide()
    };
    t.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    };
    t.prototype.getContent = function() {
        var t = this.$element,
            n = this.options;
        return t.attr("data-content") || (typeof n.content == "function" ? n.content.call(t[0]) : n.content)
    };
    t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    i = n.fn.popover;
    n.fn.popover = r;
    n.fn.popover.Constructor = t;
    n.fn.popover.noConflict = function() {
        return n.fn.popover = i, this
    }
}(jQuery); + function(n) {
    "use strict";

    function r(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.tab");
            r || u.data("bs.tab", r = new t(this));
            typeof i == "string" && r[i]()
        })
    }
    var t = function(t) {
            this.element = n(t)
        },
        u, i;
    t.VERSION = "3.3.6";
    t.TRANSITION_DURATION = 150;
    t.prototype.show = function() {
        var t = this.element,
            f = t.closest("ul:not(.dropdown-menu)"),
            i = t.data("target"),
            u;
        if (i || (i = t.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
            var r = f.find(".active:last a"),
                e = n.Event("hide.bs.tab", {
                    relatedTarget: t[0]
                }),
                o = n.Event("show.bs.tab", {
                    relatedTarget: r[0]
                });
            (r.trigger(e), t.trigger(o), o.isDefaultPrevented() || e.isDefaultPrevented()) || (u = n(i), this.activate(t.closest("li"), f), this.activate(u, u.parent(), function() {
                r.trigger({
                    type: "hidden.bs.tab",
                    relatedTarget: t[0]
                });
                t.trigger({
                    type: "shown.bs.tab",
                    relatedTarget: r[0]
                })
            }))
        }
    };
    t.prototype.activate = function(i, r, u) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1);
            i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0);
            o ? (i[0].offsetWidth, i.addClass("in")) : i.removeClass("fade");
            i.parent(".dropdown-menu").length && i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0);
            u && u()
        }
        var f = r.find("> .active"),
            o = u && n.support.transition && (f.length && f.hasClass("fade") || !!r.find("> .fade").length);
        f.length && o ? f.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e();
        f.removeClass("in")
    };
    u = n.fn.tab;
    n.fn.tab = r;
    n.fn.tab.Constructor = t;
    n.fn.tab.noConflict = function() {
        return n.fn.tab = u, this
    };
    i = function(t) {
        t.preventDefault();
        r.call(n(this), "show")
    };
    n(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i)
}(jQuery); + function(n) {
    "use strict";

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.affix"),
                f = typeof i == "object" && i;
            r || u.data("bs.affix", r = new t(this, f));
            typeof i == "string" && r[i]()
        })
    }
    var t = function(i, r) {
            this.options = n.extend({}, t.DEFAULTS, r);
            this.$target = n(this.options.target).on("scroll.bs.affix.data-api", n.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", n.proxy(this.checkPositionWithEventLoop, this));
            this.$element = n(i);
            this.affixed = null;
            this.unpin = null;
            this.pinnedOffset = null;
            this.checkPosition()
        },
        r;
    t.VERSION = "3.3.6";
    t.RESET = "affix affix-top affix-bottom";
    t.DEFAULTS = {
        offset: 0,
        target: window
    };
    t.prototype.getState = function(n, t, i, r) {
        var u = this.$target.scrollTop(),
            f = this.$element.offset(),
            e = this.$target.height();
        if (i != null && this.affixed == "top") return u < i ? "top" : !1;
        if (this.affixed == "bottom") return i != null ? u + this.unpin <= f.top ? !1 : "bottom" : u + e <= n - r ? !1 : "bottom";
        var o = this.affixed == null,
            s = o ? u : f.top,
            h = o ? e : t;
        return i != null && u <= i ? "top" : r != null && s + h >= n - r ? "bottom" : !1
    };
    t.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(t.RESET).addClass("affix");
        var n = this.$target.scrollTop(),
            i = this.$element.offset();
        return this.pinnedOffset = i.top - n
    };
    t.prototype.checkPositionWithEventLoop = function() {
        setTimeout(n.proxy(this.checkPosition, this), 1)
    };
    t.prototype.checkPosition = function() {
        var i, f, o;
        if (this.$element.is(":visible")) {
            var s = this.$element.height(),
                r = this.options.offset,
                e = r.top,
                u = r.bottom,
                h = Math.max(n(document).height(), n(document.body).height());
            if (typeof r != "object" && (u = e = r), typeof e == "function" && (e = r.top(this.$element)), typeof u == "function" && (u = r.bottom(this.$element)), i = this.getState(h, s, e, u), this.affixed != i) {
                if (this.unpin != null && this.$element.css("top", ""), f = "affix" + (i ? "-" + i : ""), o = n.Event(f + ".bs.affix"), this.$element.trigger(o), o.isDefaultPrevented()) return;
                this.affixed = i;
                this.unpin = i == "bottom" ? this.getPinnedOffset() : null;
                this.$element.removeClass(t.RESET).addClass(f).trigger(f.replace("affix", "affixed") + ".bs.affix")
            }
            i == "bottom" && this.$element.offset({
                top: h - s - u
            })
        }
    };
    r = n.fn.affix;
    n.fn.affix = i;
    n.fn.affix.Constructor = t;
    n.fn.affix.noConflict = function() {
        return n.fn.affix = r, this
    };
    n(window).on("load", function() {
        n('[data-spy="affix"]').each(function() {
            var r = n(this),
                t = r.data();
            t.offset = t.offset || {};
            t.offsetBottom != null && (t.offset.bottom = t.offsetBottom);
            t.offsetTop != null && (t.offset.top = t.offsetTop);
            i.call(r, t)
        })
    })
}(jQuery); + function(n) {
    "use strict";

    function r(t) {
        var i, r = t.attr("data-target") || (i = t.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return n(r)
    }

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.collapse"),
                f = n.extend({}, t.DEFAULTS, u.data(), typeof i == "object" && i);
            !r && f.toggle && /show|hide/.test(i) && (f.toggle = !1);
            r || u.data("bs.collapse", r = new t(this, f));
            typeof i == "string" && r[i]()
        })
    }
    var t = function(i, r) {
            this.$element = n(i);
            this.options = n.extend({}, t.DEFAULTS, r);
            this.$trigger = n('[data-toggle="collapse"][href="#' + i.id + '"],[data-toggle="collapse"][data-target="#' + i.id + '"]');
            this.transitioning = null;
            this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger);
            this.options.toggle && this.toggle()
        },
        u;
    t.VERSION = "3.3.6";
    t.TRANSITION_DURATION = 350;
    t.DEFAULTS = {
        toggle: !0
    };
    t.prototype.dimension = function() {
        var n = this.$element.hasClass("width");
        return n ? "width" : "height"
    };
    t.prototype.show = function() {
        var f, r, e, u, o, s;
        if (!this.transitioning && !this.$element.hasClass("in") && (r = this.$parent && this.$parent.children(".panel").children(".in, .collapsing"), !r || !r.length || (f = r.data("bs.collapse"), !f || !f.transitioning)) && (e = n.Event("show.bs.collapse"), this.$element.trigger(e), !e.isDefaultPrevented())) {
            if (r && r.length && (i.call(r, "hide"), f || r.data("bs.collapse", null)), u = this.dimension(), this.$element.removeClass("collapse").addClass("collapsing")[u](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1, o = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[u]("");
                    this.transitioning = 0;
                    this.$element.trigger("shown.bs.collapse")
                }, !n.support.transition) return o.call(this);
            s = n.camelCase(["scroll", u].join("-"));
            this.$element.one("bsTransitionEnd", n.proxy(o, this)).emulateTransitionEnd(t.TRANSITION_DURATION)[u](this.$element[0][s])
        }
    };
    t.prototype.hide = function() {
        var r, i, u;
        if (!this.transitioning && this.$element.hasClass("in") && (r = n.Event("hide.bs.collapse"), this.$element.trigger(r), !r.isDefaultPrevented())) {
            if (i = this.dimension(), this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1, u = function() {
                    this.transitioning = 0;
                    this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                }, !n.support.transition) return u.call(this);
            this.$element[i](0).one("bsTransitionEnd", n.proxy(u, this)).emulateTransitionEnd(t.TRANSITION_DURATION)
        }
    };
    t.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    t.prototype.getParent = function() {
        return n(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(n.proxy(function(t, i) {
            var u = n(i);
            this.addAriaAndCollapsedClass(r(u), u)
        }, this)).end()
    };
    t.prototype.addAriaAndCollapsedClass = function(n, t) {
        var i = n.hasClass("in");
        n.attr("aria-expanded", i);
        t.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    u = n.fn.collapse;
    n.fn.collapse = i;
    n.fn.collapse.Constructor = t;
    n.fn.collapse.noConflict = function() {
        return n.fn.collapse = u, this
    };
    n(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(t) {
        var u = n(this);
        u.attr("data-target") || t.preventDefault();
        var f = r(u),
            e = f.data("bs.collapse"),
            o = e ? "toggle" : u.data();
        i.call(f, o)
    })
}(jQuery); + function(n) {
    "use strict";

    function t(i, r) {
        this.$body = n(document.body);
        this.$scrollElement = n(i).is(document.body) ? n(window) : n(i);
        this.options = n.extend({}, t.DEFAULTS, r);
        this.selector = (this.options.target || "") + " .nav li > a";
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on("scroll.bs.scrollspy", n.proxy(this.process, this));
        this.refresh();
        this.process()
    }

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.scrollspy"),
                f = typeof i == "object" && i;
            r || u.data("bs.scrollspy", r = new t(this, f));
            typeof i == "string" && r[i]()
        })
    }
    t.VERSION = "3.3.6";
    t.DEFAULTS = {
        offset: 10
    };
    t.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    };
    t.prototype.refresh = function() {
        var t = this,
            i = "offset",
            r = 0;
        this.offsets = [];
        this.targets = [];
        this.scrollHeight = this.getScrollHeight();
        n.isWindow(this.$scrollElement[0]) || (i = "position", r = this.$scrollElement.scrollTop());
        this.$body.find(this.selector).map(function() {
            var f = n(this),
                u = f.data("target") || f.attr("href"),
                t = /^#./.test(u) && n(u);
            return t && t.length && t.is(":visible") && [
                [t[i]().top + r, u]
            ] || null
        }).sort(function(n, t) {
            return n[0] - t[0]
        }).each(function() {
            t.offsets.push(this[0]);
            t.targets.push(this[1])
        })
    };
    t.prototype.process = function() {
        var i = this.$scrollElement.scrollTop() + this.options.offset,
            f = this.getScrollHeight(),
            e = this.options.offset + f - this.$scrollElement.height(),
            t = this.offsets,
            r = this.targets,
            u = this.activeTarget,
            n;
        if (this.scrollHeight != f && this.refresh(), i >= e) return u != (n = r[r.length - 1]) && this.activate(n);
        if (u && i < t[0]) return this.activeTarget = null, this.clear();
        for (n = t.length; n--;) u != r[n] && i >= t[n] && (t[n + 1] === undefined || i < t[n + 1]) && this.activate(r[n])
    };
    t.prototype.activate = function(t) {
        this.activeTarget = t;
        this.clear();
        var r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            i = n(r).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active"));
        i.trigger("activate.bs.scrollspy")
    };
    t.prototype.clear = function() {
        n(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var r = n.fn.scrollspy;
    n.fn.scrollspy = i;
    n.fn.scrollspy.Constructor = t;
    n.fn.scrollspy.noConflict = function() {
        return n.fn.scrollspy = r, this
    };
    n(window).on("load.bs.scrollspy.data-api", function() {
        n('[data-spy="scroll"]').each(function() {
            var t = n(this);
            i.call(t, t.data())
        })
    })
}(jQuery); + function(n) {
    "use strict";

    function t() {
        var i = document.createElement("bootstrap"),
            n = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var t in n)
            if (i.style[t] !== undefined) return {
                end: n[t]
            };
        return !1
    }
    n.fn.emulateTransitionEnd = function(t) {
        var i = !1,
            u = this,
            r;
        n(this).one("bsTransitionEnd", function() {
            i = !0
        });
        return r = function() {
            i || n(u).trigger(n.support.transition.end)
        }, setTimeout(r, t), this
    };
    n(function() {
        (n.support.transition = t(), n.support.transition) && (n.event.special.bsTransitionEnd = {
            bindType: n.support.transition.end,
            delegateType: n.support.transition.end,
            handle: function(t) {
                if (n(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery);
__Header = {
    resize: function() {
        var n = $(window).width();
        n <= 991 ? $(".header-blue-right-menu").hide() : $(".header-blue-right-menu").show()
    }
};
$(function() {
    $(".header-blue-language").on("click", function() {
        var n = $(this).attr("data-href");
        $.ajax({
            url: n,
            type: "get",
            success: function(n) {
                window.location = n.redirectUrl
            },
            error: function() {
                return !1
            }
        })
    });
    $("#overlay-layout").click(function() {
        showMenu()
    });
    $(".menu-action").click(function() {
        showMenu()
    });
    $(window).width() <= 768 && $(window).scroll(function() {
        var n = $("#overlay-layout"),
            t = $(window).scrollTop();
        t >= 65 ? (n.addClass("mt65"), $(".filter-mobile-popup").css("margin-top", "-60px")) : (n.removeClass("mt65"), $(".filter-mobile-popup").css("margin-top", "0"))
    });
    __Header.resize();
    $(".dropdown-menu li.disabled a").on("click", function() {
        return !1
    })
});
$(window).resize(__Header.resize),
    function(n, t) {
        typeof exports == "object" && typeof module != "undefined" ? module.exports = t() : typeof define == "function" && define.amd ? define(t) : n.moment = t()
    }(this, function() {
        "use strict";

        function i() {
            return bf.apply(null, arguments)
        }

        function uo(n) {
            bf = n
        }

        function gr() {
            return {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidMonth: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1
            }
        }

        function ri(n) {
            return Object.prototype.toString.call(n) === "[object Array]"
        }

        function wi(n) {
            return Object.prototype.toString.call(n) === "[object Date]" || n instanceof Date
        }

        function fo(n, t) {
            for (var r = [], i = 0; i < n.length; ++i) r.push(t(n[i], i));
            return r
        }

        function nt(n, t) {
            return Object.prototype.hasOwnProperty.call(n, t)
        }

        function ui(n, t) {
            for (var i in t) nt(t, i) && (n[i] = t[i]);
            return nt(t, "toString") && (n.toString = t.toString), nt(t, "valueOf") && (n.valueOf = t.valueOf), n
        }

        function bt(n, t, i, r) {
            return ku(n, t, i, r, !0).utc()
        }

        function nu(n) {
            return n._isValid == null && (n._isValid = !isNaN(n._d.getTime()) && n._pf.overflow < 0 && !n._pf.empty && !n._pf.invalidMonth && !n._pf.nullInput && !n._pf.invalidFormat && !n._pf.userInvalidated, n._strict && (n._isValid = n._isValid && n._pf.charsLeftOver === 0 && n._pf.unusedTokens.length === 0 && n._pf.bigHour === undefined)), n._isValid
        }

        function tu(n) {
            var t = bt(NaN);
            return n != null ? ui(t._pf, n) : t._pf.userInvalidated = !0, t
        }

        function iu(n, t) {
            var u, i, r;
            if (typeof t._isAMomentObject != "undefined" && (n._isAMomentObject = t._isAMomentObject), typeof t._i != "undefined" && (n._i = t._i), typeof t._f != "undefined" && (n._f = t._f), typeof t._l != "undefined" && (n._l = t._l), typeof t._strict != "undefined" && (n._strict = t._strict), typeof t._tzm != "undefined" && (n._tzm = t._tzm), typeof t._isUTC != "undefined" && (n._isUTC = t._isUTC), typeof t._offset != "undefined" && (n._offset = t._offset), typeof t._pf != "undefined" && (n._pf = t._pf), typeof t._locale != "undefined" && (n._locale = t._locale), or.length > 0)
                for (u in or) i = or[u], r = t[i], typeof r != "undefined" && (n[i] = r);
            return n
        }

        function kt(n) {
            iu(this, n);
            this._d = new Date(+n._d);
            sr === !1 && (sr = !0, i.updateOffset(this), sr = !1)
        }

        function tt(n) {
            return n instanceof kt || n != null && nt(n, "_isAMomentObject")
        }

        function o(n) {
            var t = +n,
                i = 0;
            return t !== 0 && isFinite(t) && (i = t >= 0 ? Math.floor(t) : Math.ceil(t)), i
        }

        function ru(n, t, i) {
            for (var f = Math.min(n.length, t.length), e = Math.abs(n.length - t.length), u = 0, r = 0; r < f; r++)(i && n[r] !== t[r] || !i && o(n[r]) !== o(t[r])) && u++;
            return u + e
        }

        function uu() {}

        function fu(n) {
            return n ? n.toLowerCase().replace("_", "-") : n
        }

        function eo(n) {
            for (var r = 0, i, t, f, u; r < n.length;) {
                for (u = fu(n[r]).split("-"), i = u.length, t = fu(n[r + 1]), t = t ? t.split("-") : null; i > 0;) {
                    if (f = eu(u.slice(0, i).join("-")), f) return f;
                    if (t && t.length >= i && ru(u, t, !0) >= i - 1) break;
                    i--
                }
                r++
            }
            return null
        }

        function eu(n) {
            var t = null;
            if (!st[n] && typeof module != "undefined" && module && module.exports) try {
                t = hi._abbr;
                require("./locale/" + n);
                dt(t)
            } catch (i) {}
            return st[n]
        }

        function dt(n, t) {
            var i;
            return n && (i = typeof t == "undefined" ? rt(n) : ou(n, t), i && (hi = i)), hi._abbr
        }

        function ou(n, t) {
            return t !== null ? (t.abbr = n, st[n] || (st[n] = new uu), st[n].set(t), dt(n), st[n]) : (delete st[n], null)
        }

        function rt(n) {
            var t;
            if (n && n._locale && n._locale._abbr && (n = n._locale._abbr), !n) return hi;
            if (!ri(n)) {
                if (t = eu(n), t) return t;
                n = [n]
            }
            return eo(n)
        }

        function c(n, t) {
            var i = n.toLowerCase();
            ti[i] = ti[i + "s"] = ti[t] = n
        }

        function v(n) {
            return typeof n == "string" ? ti[n] || ti[n.toLowerCase()] : undefined
        }

        function su(n) {
            var r = {},
                t;
            for (var i in n) nt(n, i) && (t = v(i), t && (r[t] = n[i]));
            return r
        }

        function yt(n, t) {
            return function(r) {
                return r != null ? (hu(this, n, r), i.updateOffset(this, t), this) : fi(this, n)
            }
        }

        function fi(n, t) {
            return n._d["get" + (n._isUTC ? "UTC" : "") + t]()
        }

        function hu(n, t, i) {
            return n._d["set" + (n._isUTC ? "UTC" : "") + t](i)
        }

        function cu(n, t) {
            var i;
            if (typeof n == "object")
                for (i in n) this.set(i, n[i]);
            else if (n = v(n), typeof this[n] == "function") return this[n](t);
            return this
        }

        function bi(n, t, i) {
            for (var r = "" + Math.abs(n), u = n >= 0; r.length < t;) r = "0" + r;
            return (u ? i ? "+" : "" : "-") + r
        }

        function u(n, t, i, r) {
            var u = r;
            typeof r == "string" && (u = function() {
                return this[r]()
            });
            n && (wt[n] = u);
            t && (wt[t[0]] = function() {
                return bi(u.apply(this, arguments), t[1], t[2])
            });
            i && (wt[i] = function() {
                return this.localeData().ordinal(u.apply(this, arguments), n)
            })
        }

        function oo(n) {
            return n.match(/\[[\s\S]/) ? n.replace(/^\[|\]$/g, "") : n.replace(/\\/g, "")
        }

        function so(n) {
            for (var i = n.match(kf), t = 0, r = i.length; t < r; t++) i[t] = wt[i[t]] ? wt[i[t]] : oo(i[t]);
            return function(u) {
                var f = "";
                for (t = 0; t < r; t++) f += i[t] instanceof Function ? i[t].call(u, n) : i[t];
                return f
            }
        }

        function ki(n, t) {
            return n.isValid() ? (t = lu(t, n.localeData()), hr[t] || (hr[t] = so(t)), hr[t](n)) : n.localeData().invalidDate()
        }

        function lu(n, t) {
            function r(n) {
                return t.longDateFormat(n) || n
            }
            var i = 5;
            for (ci.lastIndex = 0; i >= 0 && ci.test(n);) n = n.replace(ci, r), ci.lastIndex = 0, i -= 1;
            return n
        }

        function t(n, t, i) {
            ar[n] = typeof t == "function" ? t : function(n) {
                return n && i ? i : t
            }
        }

        function ho(n, t) {
            return nt(ar, n) ? ar[n](t._strict, t._locale) : new RegExp(co(n))
        }

        function co(n) {
            return n.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(n, t, i, r, u) {
                return t || i || r || u
            }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }

        function h(n, t) {
            var i, r = t;
            for (typeof n == "string" && (n = [n]), typeof t == "number" && (r = function(n, i) {
                    i[t] = o(n)
                }), i = 0; i < n.length; i++) vr[n[i]] = r
        }

        function gt(n, t) {
            h(n, function(n, i, r, u) {
                r._w = r._w || {};
                t(n, r._w, r, u)
            })
        }

        function lo(n, t, i) {
            t != null && nt(vr, n) && vr[n](t, i._a, i, n)
        }

        function di(n, t) {
            return new Date(Date.UTC(n, t + 1, 0)).getUTCDate()
        }

        function ao(n) {
            return this._months[n.month()]
        }

        function vo(n) {
            return this._monthsShort[n.month()]
        }

        function yo(n, t, i) {
            var r, u, f;
            for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), r = 0; r < 12; r++)
                if ((u = bt([2e3, r]), i && !this._longMonthsParse[r] && (this._longMonthsParse[r] = new RegExp("^" + this.months(u, "").replace(".", "") + "$", "i"), this._shortMonthsParse[r] = new RegExp("^" + this.monthsShort(u, "").replace(".", "") + "$", "i")), i || this._monthsParse[r] || (f = "^" + this.months(u, "") + "|^" + this.monthsShort(u, ""), this._monthsParse[r] = new RegExp(f.replace(".", ""), "i")), i && t === "MMMM" && this._longMonthsParse[r].test(n)) || i && t === "MMM" && this._shortMonthsParse[r].test(n) || !i && this._monthsParse[r].test(n)) return r
        }

        function au(n, t) {
            var i;
            return typeof t == "string" && (t = n.localeData().monthsParse(t), typeof t != "number") ? n : (i = Math.min(n.date(), di(n.year(), t)), n._d["set" + (n._isUTC ? "UTC" : "") + "Month"](t, i), n)
        }

        function vu(n) {
            return n != null ? (au(this, n), i.updateOffset(this, !0), this) : fi(this, "Month")
        }

        function po() {
            return di(this.year(), this.month())
        }

        function gi(n) {
            var i, t = n._a;
            return t && n._pf.overflow === -2 && (i = t[d] < 0 || t[d] > 11 ? d : t[w] < 1 || t[w] > di(t[k], t[d]) ? w : t[l] < 0 || t[l] > 24 || t[l] === 24 && (t[ht] !== 0 || t[ct] !== 0 || t[lt] !== 0) ? l : t[ht] < 0 || t[ht] > 59 ? ht : t[ct] < 0 || t[ct] > 59 ? ct : t[lt] < 0 || t[lt] > 999 ? lt : -1, n._pf._overflowDayOfYear && (i < k || i > w) && (i = w), n._pf.overflow = i), n
        }

        function yu(n) {
            i.suppressDeprecationWarnings === !1 && typeof console != "undefined" && console.warn && console.warn("Deprecation warning: " + n)
        }

        function y(n, t) {
            var i = !0;
            return ui(function() {
                return i && (yu(n), i = !1), t.apply(this, arguments)
            }, t)
        }

        function wo(n, t) {
            yr[n] || (yu(t), yr[n] = !0)
        }

        function pu(n) {
            var t, i, r = n._i,
                u = oa.exec(r);
            if (u) {
                for (n._pf.iso = !0, t = 0, i = kr.length; t < i; t++)
                    if (kr[t][1].exec(r)) {
                        n._f = kr[t][0] + (u[6] || " ");
                        break
                    }
                for (t = 0, i = dr.length; t < i; t++)
                    if (dr[t][1].exec(r)) {
                        n._f += dr[t][0];
                        break
                    }
                r.match(pi) && (n._f += "Z");
                ir(n)
            } else n._isValid = !1
        }

        function bo(n) {
            var t = sa.exec(n._i);
            if (t !== null) {
                n._d = new Date(+t[1]);
                return
            }
            pu(n);
            n._isValid === !1 && (delete n._isValid, i.createFromInputFallback(n))
        }

        function ko(n, t, i, r, u, f, e) {
            var o = new Date(n, t, i, r, u, f, e);
            return n < 1970 && o.setFullYear(n), o
        }

        function nr(n) {
            var t = new Date(Date.UTC.apply(null, arguments));
            return n < 1970 && t.setUTCFullYear(n), t
        }

        function wu(n) {
            return bu(n) ? 366 : 365
        }

        function bu(n) {
            return n % 4 == 0 && n % 100 != 0 || n % 400 == 0
        }

        function go() {
            return bu(this.year())
        }

        function ut(n, t, i) {
            var f = i - t,
                r = i - n.day(),
                u;
            return r > f && (r -= 7), r < f - 7 && (r += 7), u = e(n).add(r, "d"), {
                week: Math.ceil(u.dayOfYear() / 7),
                year: u.year()
            }
        }

        function ns(n) {
            return ut(n, this._week.dow, this._week.doy).week
        }

        function ts() {
            return this._week.dow
        }

        function is() {
            return this._week.doy
        }

        function rs(n) {
            var t = this.localeData().week(this);
            return n == null ? t : this.add((n - t) * 7, "d")
        }

        function us(n) {
            var t = ut(this, 1, 4).week;
            return n == null ? t : this.add((n - t) * 7, "d")
        }

        function fs(n, t, i, r, u) {
            var f = nr(n, 0, 1).getUTCDay(),
                o, e;
            return f = f === 0 ? 7 : f, i = i != null ? i : u, o = u - f + (f > r ? 7 : 0) - (f < u ? 7 : 0), e = 7 * (t - 1) + (i - u) + o + 1, {
                year: e > 0 ? n : n - 1,
                dayOfYear: e > 0 ? e : wu(n - 1) + e
            }
        }

        function es(n) {
            var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
            return n == null ? t : this.add(n - t, "d")
        }

        function pt(n, t, i) {
            return n != null ? n : t != null ? t : i
        }

        function os(n) {
            var t = new Date;
            return n._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
        }

        function tr(n) {
            var t, i, r = [],
                u, f;
            if (!n._d) {
                for (u = os(n), n._w && n._a[w] == null && n._a[d] == null && ss(n), n._dayOfYear && (f = pt(n._a[k], u[k]), n._dayOfYear > wu(f) && (n._pf._overflowDayOfYear = !0), i = nr(f, 0, n._dayOfYear), n._a[d] = i.getUTCMonth(), n._a[w] = i.getUTCDate()), t = 0; t < 3 && n._a[t] == null; ++t) n._a[t] = r[t] = u[t];
                for (; t < 7; t++) n._a[t] = r[t] = n._a[t] == null ? t === 2 ? 1 : 0 : n._a[t];
                n._a[l] === 24 && n._a[ht] === 0 && n._a[ct] === 0 && n._a[lt] === 0 && (n._nextDay = !0, n._a[l] = 0);
                n._d = (n._useUTC ? nr : ko).apply(null, r);
                n._tzm != null && n._d.setUTCMinutes(n._d.getUTCMinutes() - n._tzm);
                n._nextDay && (n._a[l] = 24)
            }
        }

        function ss(n) {
            var t, o, u, r, i, f, s;
            t = n._w;
            t.GG != null || t.W != null || t.E != null ? (i = 1, f = 4, o = pt(t.GG, n._a[k], ut(e(), 1, 4).year), u = pt(t.W, 1), r = pt(t.E, 1)) : (i = n._locale._week.dow, f = n._locale._week.doy, o = pt(t.gg, n._a[k], ut(e(), i, f).year), u = pt(t.w, 1), t.d != null ? (r = t.d, r < i && ++u) : r = t.e != null ? t.e + i : i);
            s = fs(o, u, r, f, i);
            n._a[k] = s.year;
            n._dayOfYear = s.dayOfYear
        }

        function ir(n) {
            if (n._f === i.ISO_8601) {
                pu(n);
                return
            }
            n._a = [];
            n._pf.empty = !0;
            for (var t = "" + n._i, r, u, f, h = t.length, o = 0, s = lu(n._f, n._locale).match(kf) || [], e = 0; e < s.length; e++) u = s[e], r = (t.match(ho(u, n)) || [])[0], r && (f = t.substr(0, t.indexOf(r)), f.length > 0 && n._pf.unusedInput.push(f), t = t.slice(t.indexOf(r) + r.length), o += r.length), wt[u] ? (r ? n._pf.empty = !1 : n._pf.unusedTokens.push(u), lo(u, r, n)) : n._strict && !r && n._pf.unusedTokens.push(u);
            n._pf.charsLeftOver = h - o;
            t.length > 0 && n._pf.unusedInput.push(t);
            n._pf.bigHour === !0 && n._a[l] <= 12 && (n._pf.bigHour = undefined);
            n._a[l] = hs(n._locale, n._a[l], n._meridiem);
            tr(n);
            gi(n)
        }

        function hs(n, t, i) {
            var r;
            return i == null ? t : n.meridiemHour != null ? n.meridiemHour(t, i) : n.isPM != null ? (r = n.isPM(i), r && t < 12 && (t += 12), r || t !== 12 || (t = 0), t) : t
        }

        function cs(n) {
            var t, f, u, r, i;
            if (n._f.length === 0) {
                n._pf.invalidFormat = !0;
                n._d = new Date(NaN);
                return
            }
            for (r = 0; r < n._f.length; r++)(i = 0, t = iu({}, n), n._useUTC != null && (t._useUTC = n._useUTC), t._pf = gr(), t._f = n._f[r], ir(t), nu(t)) && (i += t._pf.charsLeftOver, i += t._pf.unusedTokens.length * 10, t._pf.score = i, (u == null || i < u) && (u = i, f = t));
            ui(n, f || t)
        }

        function ls(n) {
            if (!n._d) {
                var t = su(n._i);
                n._a = [t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond];
                tr(n)
            }
        }

        function as(n) {
            var t = n._i,
                r = n._f,
                i;
            return (n._locale = n._locale || rt(n._l), t === null || r === undefined && t === "") ? tu({
                nullInput: !0
            }) : (typeof t == "string" && (n._i = t = n._locale.preparse(t)), tt(t)) ? new kt(gi(t)) : (ri(r) ? cs(n) : r ? ir(n) : vs(n), i = new kt(gi(n)), i._nextDay && (i.add(1, "d"), i._nextDay = undefined), i)
        }

        function vs(n) {
            var t = n._i;
            t === undefined ? n._d = new Date : wi(t) ? n._d = new Date(+t) : typeof t == "string" ? bo(n) : ri(t) ? (n._a = fo(t.slice(0), function(n) {
                return parseInt(n, 10)
            }), tr(n)) : typeof t == "object" ? ls(n) : typeof t == "number" ? n._d = new Date(t) : i.createFromInputFallback(n)
        }

        function ku(n, t, i, r, u) {
            var f = {};
            return typeof i == "boolean" && (r = i, i = undefined), f._isAMomentObject = !0, f._useUTC = f._isUTC = u, f._l = i, f._i = n, f._f = t, f._strict = r, f._pf = gr(), as(f)
        }

        function e(n, t, i, r) {
            return ku(n, t, i, r, !1)
        }

        function du(n, t) {
            var r, i;
            if (t.length === 1 && ri(t[0]) && (t = t[0]), !t.length) return e();
            for (r = t[0], i = 1; i < t.length; ++i) t[i][n](r) && (r = t[i]);
            return r
        }

        function ys() {
            var n = [].slice.call(arguments, 0);
            return du("isBefore", n)
        }

        function ps() {
            var n = [].slice.call(arguments, 0);
            return du("isAfter", n)
        }

        function ei(n) {
            var t = su(n),
                i = t.year || 0,
                r = t.quarter || 0,
                u = t.month || 0,
                f = t.week || 0,
                e = t.day || 0,
                o = t.hour || 0,
                s = t.minute || 0,
                h = t.second || 0,
                c = t.millisecond || 0;
            this._milliseconds = +c + h * 1e3 + s * 6e4 + o * 36e5;
            this._days = +e + f * 7;
            this._months = +u + r * 3 + i * 12;
            this._data = {};
            this._locale = rt();
            this._bubble()
        }

        function rr(n) {
            return n instanceof ei
        }

        function gu(n, t) {
            u(n, 0, 0, function() {
                var n = this.utcOffset(),
                    i = "+";
                return n < 0 && (n = -n, i = "-"), i + bi(~~(n / 60), 2) + t + bi(~~n % 60, 2)
            })
        }

        function ur(n) {
            var i = (n || "").match(pi) || [],
                u = i[i.length - 1] || [],
                t = (u + "").match(fe) || ["-", 0, 0],
                r = +(t[1] * 60) + o(t[2]);
            return t[0] === "+" ? r : -r
        }

        function fr(n, t) {
            var r, u;
            return t._isUTC ? (r = t.clone(), u = (tt(n) || wi(n) ? +n : +e(n)) - +r, r._d.setTime(+r._d + u), i.updateOffset(r, !1), r) : e(n).local()
        }

        function er(n) {
            return -Math.round(n._d.getTimezoneOffset() / 15) * 15
        }

        function ws(n, t) {
            var r = this._offset || 0,
                u;
            return n != null ? (typeof n == "string" && (n = ur(n)), Math.abs(n) < 16 && (n = n * 60), !this._isUTC && t && (u = er(this)), this._offset = n, this._isUTC = !0, u != null && this.add(u, "m"), r !== n && (!t || this._changeInProgress ? uf(this, ft(n - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, i.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? r : er(this)
        }

        function bs(n, t) {
            return n != null ? (typeof n != "string" && (n = -n), this.utcOffset(n, t), this) : -this.utcOffset()
        }

        function ks(n) {
            return this.utcOffset(0, n)
        }

        function ds(n) {
            return this._isUTC && (this.utcOffset(0, n), this._isUTC = !1, n && this.subtract(er(this), "m")), this
        }

        function gs() {
            return this._tzm ? this.utcOffset(this._tzm) : typeof this._i == "string" && this.utcOffset(ur(this._i)), this
        }

        function nh(n) {
            return n = n ? e(n).utcOffset() : 0, (this.utcOffset() - n) % 60 == 0
        }

        function th() {
            return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
        }

        function ih() {
            if (this._a) {
                var n = this._isUTC ? bt(this._a) : e(this._a);
                return this.isValid() && ru(this._a, n.toArray()) > 0
            }
            return !1
        }

        function rh() {
            return !this._isUTC
        }

        function uh() {
            return this._isUTC
        }

        function nf() {
            return this._isUTC && this._offset === 0
        }

        function ft(n, t) {
            var i = n,
                r = null,
                u, f, s;
            return rr(n) ? i = {
                ms: n._milliseconds,
                d: n._days,
                M: n._months
            } : typeof n == "number" ? (i = {}, t ? i[t] = n : i.milliseconds = n) : (r = ee.exec(n)) ? (u = r[1] === "-" ? -1 : 1, i = {
                y: 0,
                d: o(r[w]) * u,
                h: o(r[l]) * u,
                m: o(r[ht]) * u,
                s: o(r[ct]) * u,
                ms: o(r[lt]) * u
            }) : (r = oe.exec(n)) ? (u = r[1] === "-" ? -1 : 1, i = {
                y: et(r[2], u),
                M: et(r[3], u),
                d: et(r[4], u),
                h: et(r[5], u),
                m: et(r[6], u),
                s: et(r[7], u),
                w: et(r[8], u)
            }) : i == null ? i = {} : typeof i == "object" && ("from" in i || "to" in i) && (s = fh(e(i.from), e(i.to)), i = {}, i.ms = s.milliseconds, i.M = s.months), f = new ei(i), rr(n) && nt(n, "_locale") && (f._locale = n._locale), f
        }

        function et(n, t) {
            var i = n && parseFloat(n.replace(",", "."));
            return (isNaN(i) ? 0 : i) * t
        }

        function tf(n, t) {
            var i = {
                milliseconds: 0,
                months: 0
            };
            return i.months = t.month() - n.month() + (t.year() - n.year()) * 12, n.clone().add(i.months, "M").isAfter(t) && --i.months, i.milliseconds = +t - +n.clone().add(i.months, "M"), i
        }

        function fh(n, t) {
            var i;
            return t = fr(t, n), n.isBefore(t) ? i = tf(n, t) : (i = tf(t, n), i.milliseconds = -i.milliseconds, i.months = -i.months), i
        }

        function rf(n, t) {
            return function(i, r) {
                var u, f;
                return r === null || isNaN(+r) || (wo(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period)."), f = i, i = r, r = f), i = typeof i == "string" ? +i : i, u = ft(i, r), uf(this, u, n), this
            }
        }

        function uf(n, t, r, u) {
            var o = t._milliseconds,
                f = t._days,
                e = t._months;
            u = u == null ? !0 : u;
            o && n._d.setTime(+n._d + o * r);
            f && hu(n, "Date", fi(n, "Date") + f * r);
            e && au(n, fi(n, "Month") + e * r);
            u && i.updateOffset(n, f || e)
        }

        function eh(n) {
            var i = n || e(),
                r = fr(i, this).startOf("day"),
                t = this.diff(r, "days", !0),
                u = t < -6 ? "sameElse" : t < -1 ? "lastWeek" : t < 0 ? "lastDay" : t < 1 ? "sameDay" : t < 2 ? "nextDay" : t < 7 ? "nextWeek" : "sameElse";
            return this.format(this.localeData().calendar(u, this, e(i)))
        }

        function oh() {
            return new kt(this)
        }

        function sh(n, t) {
            var i;
            return t = v(typeof t != "undefined" ? t : "millisecond"), t === "millisecond" ? (n = tt(n) ? n : e(n), +this > +n) : (i = tt(n) ? +n : +e(n), i < +this.clone().startOf(t))
        }

        function hh(n, t) {
            var i;
            return t = v(typeof t != "undefined" ? t : "millisecond"), t === "millisecond" ? (n = tt(n) ? n : e(n), +this < +n) : (i = tt(n) ? +n : +e(n), +this.clone().endOf(t) < i)
        }

        function ch(n, t, i) {
            return this.isAfter(n, i) && this.isBefore(t, i)
        }

        function lh(n, t) {
            var i;
            return t = v(t || "millisecond"), t === "millisecond" ? (n = tt(n) ? n : e(n), +this == +n) : (i = +e(n), +this.clone().startOf(t) <= i && i <= +this.clone().endOf(t))
        }

        function p(n) {
            return n < 0 ? Math.ceil(n) : Math.floor(n)
        }

        function ah(n, t, i) {
            var f = fr(n, this),
                e = (f.utcOffset() - this.utcOffset()) * 6e4,
                u, r;
            return t = v(t), t === "year" || t === "month" || t === "quarter" ? (r = vh(this, f), t === "quarter" ? r = r / 3 : t === "year" && (r = r / 12)) : (u = this - f, r = t === "second" ? u / 1e3 : t === "minute" ? u / 6e4 : t === "hour" ? u / 36e5 : t === "day" ? (u - e) / 864e5 : t === "week" ? (u - e) / 6048e5 : u), i ? r : p(r)
        }

        function vh(n, t) {
            var r = (t.year() - n.year()) * 12 + (t.month() - n.month()),
                i = n.clone().add(r, "months"),
                u, f;
            return t - i < 0 ? (u = n.clone().add(r - 1, "months"), f = (t - i) / (i - u)) : (u = n.clone().add(r + 1, "months"), f = (t - i) / (u - i)), -(r + f)
        }

        function yh() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        }

        function ff() {
            var n = this.clone().utc();
            return 0 < n.year() && n.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : ki(n, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : ki(n, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        }

        function ph(n) {
            var t = ki(this, n || i.defaultFormat);
            return this.localeData().postformat(t)
        }

        function wh(n, t) {
            return ft({
                to: this,
                from: n
            }).locale(this.locale()).humanize(!t)
        }

        function bh(n) {
            return this.from(e(), n)
        }

        function ef(n) {
            var t;
            return n === undefined ? this._locale._abbr : (t = rt(n), t != null && (this._locale = t), this)
        }

        function of () {
            return this._locale
        }

        function kh(n) {
            n = v(n);
            switch (n) {
                case "year":
                    this.month(0);
                case "quarter":
                case "month":
                    this.date(1);
                case "week":
                case "isoWeek":
                case "day":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0)
            }
            return n === "week" && this.weekday(0), n === "isoWeek" && this.isoWeekday(1), n === "quarter" && this.month(Math.floor(this.month() / 3) * 3), this
        }

        function dh(n) {
            return (n = v(n), n === undefined || n === "millisecond") ? this : this.startOf(n).add(1, n === "isoWeek" ? "week" : n).subtract(1, "ms")
        }

        function gh() {
            return +this._d - (this._offset || 0) * 6e4
        }

        function nc() {
            return Math.floor(+this / 1e3)
        }

        function tc() {
            return this._offset ? new Date(+this) : this._d
        }

        function ic() {
            var n = this;
            return [n.year(), n.month(), n.date(), n.hour(), n.minute(), n.second(), n.millisecond()]
        }

        function rc() {
            return nu(this)
        }

        function uc() {
            return ui({}, this._pf)
        }

        function fc() {
            return this._pf.overflow
        }

        function oi(n, t) {
            u(0, [n, n.length], 0, t)
        }

        function sf(n, t, i) {
            return ut(e([n, 11, 31 + t - i]), t, i).week
        }

        function ec(n) {
            var t = ut(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return n == null ? t : this.add(n - t, "y")
        }

        function oc(n) {
            var t = ut(this, 1, 4).year;
            return n == null ? t : this.add(n - t, "y")
        }

        function sc() {
            return sf(this.year(), 1, 4)
        }

        function hc() {
            var n = this.localeData()._week;
            return sf(this.year(), n.dow, n.doy)
        }

        function cc(n) {
            return n == null ? Math.ceil((this.month() + 1) / 3) : this.month((n - 1) * 3 + this.month() % 3)
        }

        function lc(n, t) {
            if (typeof n == "string")
                if (isNaN(n)) {
                    if (n = t.weekdaysParse(n), typeof n != "number") return null
                } else n = parseInt(n, 10);
            return n
        }

        function ac(n) {
            return this._weekdays[n.day()]
        }

        function vc(n) {
            return this._weekdaysShort[n.day()]
        }

        function yc(n) {
            return this._weekdaysMin[n.day()]
        }

        function pc(n) {
            var t, i, r;
            for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; t < 7; t++)
                if (this._weekdaysParse[t] || (i = e([2e3, 1]).day(t), r = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[t] = new RegExp(r.replace(".", ""), "i")), this._weekdaysParse[t].test(n)) return t
        }

        function wc(n) {
            var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return n != null ? (n = lc(n, this.localeData()), this.add(n - t, "d")) : t
        }

        function bc(n) {
            var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return n == null ? t : this.add(n - t, "d")
        }

        function kc(n) {
            return n == null ? this.day() || 7 : this.day(this.day() % 7 ? n : n - 7)
        }

        function hf(n, t) {
            u(n, 0, 0, function() {
                return this.localeData().meridiem(this.hours(), this.minutes(), t)
            })
        }

        function cf(n, t) {
            return t._meridiemParse
        }

        function dc(n) {
            return (n + "").toLowerCase().charAt(0) === "p"
        }

        function gc(n, t, i) {
            return n > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
        }

        function lf(n) {
            u(0, [n, 3], 0, "millisecond")
        }

        function nl() {
            return this._isUTC ? "UTC" : ""
        }

        function tl() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        }

        function il(n) {
            return e(n * 1e3)
        }

        function rl() {
            return e.apply(null, arguments).parseZone()
        }

        function ul(n, t, i) {
            var r = this._calendar[n];
            return typeof r == "function" ? r.call(t, i) : r
        }

        function fl(n) {
            var t = this._longDateFormat[n];
            return !t && this._longDateFormat[n.toUpperCase()] && (t = this._longDateFormat[n.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(n) {
                return n.slice(1)
            }), this._longDateFormat[n] = t), t
        }

        function el() {
            return this._invalidDate
        }

        function ol(n) {
            return this._ordinal.replace("%d", n)
        }

        function af(n) {
            return n
        }

        function sl(n, t, i, r) {
            var u = this._relativeTime[i];
            return typeof u == "function" ? u(n, t, i, r) : u.replace(/%d/i, n)
        }

        function hl(n, t) {
            var i = this._relativeTime[n > 0 ? "future" : "past"];
            return typeof i == "function" ? i(t) : i.replace(/%s/i, t)
        }

        function cl(n) {
            var t;
            for (var i in n) t = n[i], typeof t == "function" ? this[i] = t : this["_" + i] = t;
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
        }

        function vf(n, t, i, r) {
            var u = rt(),
                f = bt().set(r, t);
            return u[i](f, n)
        }

        function ni(n, t, i, r, u) {
            if (typeof n == "number" && (t = n, n = undefined), n = n || "", t != null) return vf(n, t, i, u);
            for (var e = [], f = 0; f < r; f++) e[f] = vf(n, f, i, u);
            return e
        }

        function ll(n, t) {
            return ni(n, t, "months", 12, "month")
        }

        function al(n, t) {
            return ni(n, t, "monthsShort", 12, "month")
        }

        function vl(n, t) {
            return ni(n, t, "weekdays", 7, "day")
        }

        function yl(n, t) {
            return ni(n, t, "weekdaysShort", 7, "day")
        }

        function pl(n, t) {
            return ni(n, t, "weekdaysMin", 7, "day")
        }

        function wl() {
            var n = this._data;
            return this._milliseconds = b(this._milliseconds), this._days = b(this._days), this._months = b(this._months), n.milliseconds = b(n.milliseconds), n.seconds = b(n.seconds), n.minutes = b(n.minutes), n.hours = b(n.hours), n.months = b(n.months), n.years = b(n.years), this
        }

        function yf(n, t, i, r) {
            var u = ft(t, i);
            return n._milliseconds += r * u._milliseconds, n._days += r * u._days, n._months += r * u._months, n._bubble()
        }

        function bl(n, t) {
            return yf(this, n, t, 1)
        }

        function kl(n, t) {
            return yf(this, n, t, -1)
        }

        function dl() {
            var o = this._milliseconds,
                t = this._days,
                i = this._months,
                n = this._data,
                u, f, e, r = 0;
            return n.milliseconds = o % 1e3, u = p(o / 1e3), n.seconds = u % 60, f = p(u / 60), n.minutes = f % 60, e = p(f / 60), n.hours = e % 24, t += p(e / 24), r = p(pf(t)), t -= p(wf(r)), i += p(t / 30), t %= 30, r += p(i / 12), i %= 12, n.days = t, n.months = i, n.years = r, this
        }

        function pf(n) {
            return n * 400 / 146097
        }

        function wf(n) {
            return n * 146097 / 400
        }

        function gl(n) {
            var t, r, i = this._milliseconds;
            if (n = v(n), n === "month" || n === "year") return t = this._days + i / 864e5, r = this._months + pf(t) * 12, n === "month" ? r : r / 12;
            t = this._days + Math.round(wf(this._months / 12));
            switch (n) {
                case "week":
                    return t / 7 + i / 6048e5;
                case "day":
                    return t + i / 864e5;
                case "hour":
                    return t * 24 + i / 36e5;
                case "minute":
                    return t * 1440 + i / 6e4;
                case "second":
                    return t * 86400 + i / 1e3;
                case "millisecond":
                    return Math.floor(t * 864e5) + i;
                default:
                    throw new Error("Unknown unit " + n);
            }
        }

        function na() {
            return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + o(this._months / 12) * 31536e6
        }

        function it(n) {
            return function() {
                return this.as(n)
            }
        }

        function ta(n) {
            return n = v(n), this[n + "s"]()
        }

        function ot(n) {
            return function() {
                return this._data[n]
            }
        }

        function ia() {
            return p(this.days() / 7)
        }

        function ra(n, t, i, r, u) {
            return u.relativeTime(t || 1, !!i, n, r)
        }

        function ua(n, t, i) {
            var r = ft(n).abs(),
                h = at(r.as("s")),
                f = at(r.as("m")),
                e = at(r.as("h")),
                o = at(r.as("d")),
                s = at(r.as("M")),
                c = at(r.as("y")),
                u = h < g.s && ["s", h] || f === 1 && ["m"] || f < g.m && ["mm", f] || e === 1 && ["h"] || e < g.h && ["hh", e] || o === 1 && ["d"] || o < g.d && ["dd", o] || s === 1 && ["M"] || s < g.M && ["MM", s] || c === 1 && ["y"] || ["yy", c];
            return u[2] = t, u[3] = +n > 0, u[4] = i, ra.apply(null, u)
        }

        function fa(n, t) {
            return g[n] === undefined ? !1 : t === undefined ? g[n] : (g[n] = t, !0)
        }

        function ea(n) {
            var t = this.localeData(),
                i = ua(this, !n, t);
            return n && (i = t.pastFuture(+this, i)), t.postformat(i)
        }

        function si() {
            var r = vt(this.years()),
                u = vt(this.months()),
                f = vt(this.days()),
                n = vt(this.hours()),
                t = vt(this.minutes()),
                i = vt(this.seconds() + this.milliseconds() / 1e3),
                e = this.asSeconds();
            return e ? (e < 0 ? "-" : "") + "P" + (r ? r + "Y" : "") + (u ? u + "M" : "") + (f ? f + "D" : "") + (n || t || i ? "T" : "") + (n ? n + "H" : "") + (t ? t + "M" : "") + (i ? i + "S" : "") : "P0D"
        }
        var bf, or = i.momentProperties = [],
            sr = !1,
            st = {},
            hi, ti = {},
            kf = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,
            ci = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
            hr = {},
            wt = {},
            df = /\d/,
            a = /\d\d/,
            gf = /\d{3}/,
            cr = /\d{4}/,
            li = /[+-]?\d{6}/,
            s = /\d\d?/,
            ai = /\d{1,3}/,
            lr = /\d{1,4}/,
            vi = /[+-]?\d{1,6}/,
            yi = /[+-]?\d+/,
            pi = /Z|[+-]\d\d:?\d\d/gi,
            ii = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
            ar = {},
            vr = {},
            k = 0,
            d = 1,
            w = 2,
            l = 3,
            ht = 4,
            ct = 5,
            lt = 6,
            ne, te, yr, pr, ie, re, ue, fe, ee, oe, se, he, wr, br, ce, le, ae, ve, ye, pe, we, be, n, ke, de, ge, no, to, io, ro, r, b, at, g, vt, f;
        u("M", ["MM", 2], "Mo", function() {
            return this.month() + 1
        });
        u("MMM", 0, 0, function(n) {
            return this.localeData().monthsShort(this, n)
        });
        u("MMMM", 0, 0, function(n) {
            return this.localeData().months(this, n)
        });
        c("month", "M");
        t("M", s);
        t("MM", s, a);
        t("MMM", ii);
        t("MMMM", ii);
        h(["M", "MM"], function(n, t) {
            t[d] = o(n) - 1
        });
        h(["MMM", "MMMM"], function(n, t, i, r) {
            var u = i._locale.monthsParse(n, r, i._strict);
            u != null ? t[d] = u : i._pf.invalidMonth = n
        });
        ne = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
        te = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
        yr = {};
        i.suppressDeprecationWarnings = !1;
        var oa = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            kr = [
                ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
                ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
                ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
                ["GGGG-[W]WW", /\d{4}-W\d{2}/],
                ["YYYY-DDD", /\d{4}-\d{3}/]
            ],
            dr = [
                ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
                ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
                ["HH:mm", /(T| )\d\d:\d\d/],
                ["HH", /(T| )\d\d/]
            ],
            sa = /^\/?Date\((\-?\d+)/i;
        i.createFromInputFallback = y("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(n) {
            n._d = new Date(n._i + (n._useUTC ? " UTC" : ""))
        });
        u(0, ["YY", 2], 0, function() {
            return this.year() % 100
        });
        u(0, ["YYYY", 4], 0, "year");
        u(0, ["YYYYY", 5], 0, "year");
        u(0, ["YYYYYY", 6, !0], 0, "year");
        c("year", "y");
        t("Y", yi);
        t("YY", s, a);
        t("YYYY", lr, cr);
        t("YYYYY", vi, li);
        t("YYYYYY", vi, li);
        h(["YYYY", "YYYYY", "YYYYYY"], k);
        h("YY", function(n, t) {
            t[k] = i.parseTwoDigitYear(n)
        });
        i.parseTwoDigitYear = function(n) {
            return o(n) + (o(n) > 68 ? 1900 : 2e3)
        };
        pr = yt("FullYear", !1);
        u("w", ["ww", 2], "wo", "week");
        u("W", ["WW", 2], "Wo", "isoWeek");
        c("week", "w");
        c("isoWeek", "W");
        t("w", s);
        t("ww", s, a);
        t("W", s);
        t("WW", s, a);
        gt(["w", "ww", "W", "WW"], function(n, t, i, r) {
            t[r.substr(0, 1)] = o(n)
        });
        ie = {
            dow: 0,
            doy: 6
        };
        u("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
        c("dayOfYear", "DDD");
        t("DDD", ai);
        t("DDDD", gf);
        h(["DDD", "DDDD"], function(n, t, i) {
            i._dayOfYear = o(n)
        });
        i.ISO_8601 = function() {};
        re = y("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
            var n = e.apply(null, arguments);
            return n < this ? this : n
        });
        ue = y("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
            var n = e.apply(null, arguments);
            return n > this ? this : n
        });
        gu("Z", ":");
        gu("ZZ", "");
        t("Z", pi);
        t("ZZ", pi);
        h(["Z", "ZZ"], function(n, t, i) {
            i._useUTC = !0;
            i._tzm = ur(n)
        });
        fe = /([\+\-]|\d\d)/gi;
        i.updateOffset = function() {};
        ee = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;
        oe = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
        ft.fn = ei.prototype;
        se = rf(1, "add");
        he = rf(-1, "subtract");
        i.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
        wr = y("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(n) {
            return n === undefined ? this.localeData() : this.locale(n)
        });
        u(0, ["gg", 2], 0, function() {
            return this.weekYear() % 100
        });
        u(0, ["GG", 2], 0, function() {
            return this.isoWeekYear() % 100
        });
        oi("gggg", "weekYear");
        oi("ggggg", "weekYear");
        oi("GGGG", "isoWeekYear");
        oi("GGGGG", "isoWeekYear");
        c("weekYear", "gg");
        c("isoWeekYear", "GG");
        t("G", yi);
        t("g", yi);
        t("GG", s, a);
        t("gg", s, a);
        t("GGGG", lr, cr);
        t("gggg", lr, cr);
        t("GGGGG", vi, li);
        t("ggggg", vi, li);
        gt(["gggg", "ggggg", "GGGG", "GGGGG"], function(n, t, i, r) {
            t[r.substr(0, 2)] = o(n)
        });
        gt(["gg", "GG"], function(n, t, r, u) {
            t[u] = i.parseTwoDigitYear(n)
        });
        u("Q", 0, 0, "quarter");
        c("quarter", "Q");
        t("Q", df);
        h("Q", function(n, t) {
            t[d] = (o(n) - 1) * 3
        });
        u("D", ["DD", 2], "Do", "date");
        c("date", "D");
        t("D", s);
        t("DD", s, a);
        t("Do", function(n, t) {
            return n ? t._ordinalParse : t._ordinalParseLenient
        });
        h(["D", "DD"], w);
        h("Do", function(n, t) {
            t[w] = o(n.match(s)[0], 10)
        });
        br = yt("Date", !0);
        u("d", 0, "do", "day");
        u("dd", 0, 0, function(n) {
            return this.localeData().weekdaysMin(this, n)
        });
        u("ddd", 0, 0, function(n) {
            return this.localeData().weekdaysShort(this, n)
        });
        u("dddd", 0, 0, function(n) {
            return this.localeData().weekdays(this, n)
        });
        u("e", 0, 0, "weekday");
        u("E", 0, 0, "isoWeekday");
        c("day", "d");
        c("weekday", "e");
        c("isoWeekday", "E");
        t("d", s);
        t("e", s);
        t("E", s);
        t("dd", ii);
        t("ddd", ii);
        t("dddd", ii);
        gt(["dd", "ddd", "dddd"], function(n, t, i) {
            var r = i._locale.weekdaysParse(n);
            r != null ? t.d = r : i._pf.invalidWeekday = n
        });
        gt(["d", "e", "E"], function(n, t, i, r) {
            t[r] = o(n)
        });
        ce = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
        le = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
        ae = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
        u("H", ["HH", 2], 0, "hour");
        u("h", ["hh", 2], 0, function() {
            return this.hours() % 12 || 12
        });
        hf("a", !0);
        hf("A", !1);
        c("hour", "h");
        t("a", cf);
        t("A", cf);
        t("H", s);
        t("h", s);
        t("HH", s, a);
        t("hh", s, a);
        h(["H", "HH"], l);
        h(["a", "A"], function(n, t, i) {
            i._isPm = i._locale.isPM(n);
            i._meridiem = n
        });
        h(["h", "hh"], function(n, t, i) {
            t[l] = o(n);
            i._pf.bigHour = !0
        });
        ve = /[ap]\.?m?\.?/i;
        ye = yt("Hours", !0);
        u("m", ["mm", 2], 0, "minute");
        c("minute", "m");
        t("m", s);
        t("mm", s, a);
        h(["m", "mm"], ht);
        pe = yt("Minutes", !1);
        u("s", ["ss", 2], 0, "second");
        c("second", "s");
        t("s", s);
        t("ss", s, a);
        h(["s", "ss"], ct);
        we = yt("Seconds", !1);
        u("S", 0, 0, function() {
            return ~~(this.millisecond() / 100)
        });
        u(0, ["SS", 2], 0, function() {
            return ~~(this.millisecond() / 10)
        });
        lf("SSS");
        lf("SSSS");
        c("millisecond", "ms");
        t("S", ai, df);
        t("SS", ai, a);
        t("SSS", ai, gf);
        t("SSSS", /\d+/);
        h(["S", "SS", "SSS", "SSSS"], function(n, t) {
            t[lt] = o(("0." + n) * 1e3)
        });
        be = yt("Milliseconds", !1);
        u("z", 0, 0, "zoneAbbr");
        u("zz", 0, 0, "zoneName");
        n = kt.prototype;
        n.add = se;
        n.calendar = eh;
        n.clone = oh;
        n.diff = ah;
        n.endOf = dh;
        n.format = ph;
        n.from = wh;
        n.fromNow = bh;
        n.get = cu;
        n.invalidAt = fc;
        n.isAfter = sh;
        n.isBefore = hh;
        n.isBetween = ch;
        n.isSame = lh;
        n.isValid = rc;
        n.lang = wr;
        n.locale = ef;
        n.localeData = of ;
        n.max = ue;
        n.min = re;
        n.parsingFlags = uc;
        n.set = cu;
        n.startOf = kh;
        n.subtract = he;
        n.toArray = ic;
        n.toDate = tc;
        n.toISOString = ff;
        n.toJSON = ff;
        n.toString = yh;
        n.unix = nc;
        n.valueOf = gh;
        n.year = pr;
        n.isLeapYear = go;
        n.weekYear = ec;
        n.isoWeekYear = oc;
        n.quarter = n.quarters = cc;
        n.month = vu;
        n.daysInMonth = po;
        n.week = n.weeks = rs;
        n.isoWeek = n.isoWeeks = us;
        n.weeksInYear = hc;
        n.isoWeeksInYear = sc;
        n.date = br;
        n.day = n.days = wc;
        n.weekday = bc;
        n.isoWeekday = kc;
        n.dayOfYear = es;
        n.hour = n.hours = ye;
        n.minute = n.minutes = pe;
        n.second = n.seconds = we;
        n.millisecond = n.milliseconds = be;
        n.utcOffset = ws;
        n.utc = ks;
        n.local = ds;
        n.parseZone = gs;
        n.hasAlignedHourOffset = nh;
        n.isDST = th;
        n.isDSTShifted = ih;
        n.isLocal = rh;
        n.isUtcOffset = uh;
        n.isUtc = nf;
        n.isUTC = nf;
        n.zoneAbbr = nl;
        n.zoneName = tl;
        n.dates = y("dates accessor is deprecated. Use date instead.", br);
        n.months = y("months accessor is deprecated. Use month instead", vu);
        n.years = y("years accessor is deprecated. Use year instead", pr);
        n.zone = y("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", bs);
        ke = n;
        de = {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        };
        ge = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY LT",
            LLLL: "dddd, MMMM D, YYYY LT"
        };
        no = "Invalid date";
        to = "%d";
        io = /\d{1,2}/;
        ro = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        };
        r = uu.prototype;
        r._calendar = de;
        r.calendar = ul;
        r._longDateFormat = ge;
        r.longDateFormat = fl;
        r._invalidDate = no;
        r.invalidDate = el;
        r._ordinal = to;
        r.ordinal = ol;
        r._ordinalParse = io;
        r.preparse = af;
        r.postformat = af;
        r._relativeTime = ro;
        r.relativeTime = sl;
        r.pastFuture = hl;
        r.set = cl;
        r.months = ao;
        r._months = ne;
        r.monthsShort = vo;
        r._monthsShort = te;
        r.monthsParse = yo;
        r.week = ns;
        r._week = ie;
        r.firstDayOfYear = is;
        r.firstDayOfWeek = ts;
        r.weekdays = ac;
        r._weekdays = ce;
        r.weekdaysMin = yc;
        r._weekdaysMin = ae;
        r.weekdaysShort = vc;
        r._weekdaysShort = le;
        r.weekdaysParse = pc;
        r.isPM = dc;
        r._meridiemParse = ve;
        r.meridiem = gc;
        dt("en", {
            ordinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function(n) {
                var t = n % 10,
                    i = o(n % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
                return n + i
            }
        });
        i.lang = y("moment.lang is deprecated. Use moment.locale instead.", dt);
        i.langData = y("moment.langData is deprecated. Use moment.localeData instead.", rt);
        b = Math.abs;
        var ha = it("ms"),
            ca = it("s"),
            la = it("m"),
            aa = it("h"),
            va = it("d"),
            ya = it("w"),
            pa = it("M"),
            wa = it("y"),
            ba = ot("milliseconds"),
            ka = ot("seconds"),
            da = ot("minutes"),
            ga = ot("hours"),
            nv = ot("days"),
            tv = ot("months"),
            iv = ot("years");
        return at = Math.round, g = {
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        }, vt = Math.abs, f = ei.prototype, f.abs = wl, f.add = bl, f.subtract = kl, f.as = gl, f.asMilliseconds = ha, f.asSeconds = ca, f.asMinutes = la, f.asHours = aa, f.asDays = va, f.asWeeks = ya, f.asMonths = pa, f.asYears = wa, f.valueOf = na, f._bubble = dl, f.get = ta, f.milliseconds = ba, f.seconds = ka, f.minutes = da, f.hours = ga, f.days = nv, f.weeks = ia, f.months = tv, f.years = iv, f.humanize = ea, f.toISOString = si, f.toString = si, f.toJSON = si, f.locale = ef, f.localeData = of , f.toIsoString = y("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", si), f.lang = wr, u("X", 0, 0, "unix"), u("x", 0, 0, "valueOf"), t("x", yi), t("X", /[+-]?\d+(\.\d{1,3})?/), h("X", function(n, t, i) {
            i._d = new Date(parseFloat(n, 10) * 1e3)
        }), h("x", function(n, t, i) {
            i._d = new Date(o(n))
        }), i.version = "2.10.2", uo(e), i.fn = ke, i.min = ys, i.max = ps, i.utc = bt, i.unix = il, i.months = ll, i.isDate = wi, i.locale = dt, i.invalid = tu, i.duration = ft, i.isMoment = tt, i.weekdays = vl, i.parseZone = rl, i.localeData = rt, i.isDuration = rr, i.monthsShort = al, i.weekdaysMin = pl, i.defineLocale = ou, i.weekdaysShort = yl, i.normalizeUnits = v, i.relativeTimeThreshold = fa, i
    });
String.prototype.replaceAll = function(n, t) {
    var i = this;
    return i.replace(new RegExp(n, "g"), t)
};
var urlVxrOnGooglePlay = "https://play.google.com/store/apps/details?id=com.vexere.vexere",
    urlVxrOnAppStore = "https://itunes.apple.com/us/app/vexere.com/id1183279479?mt=8",
    FLOW_NON_ECOM = "non-ecommerce",
    FLOW_ECOM = "ecommerce";
$(document).ready(function() {
    bindClickOnHotLineHeaderFooter();
    bindDownloadAppEvent();
    bindLeftMenu();
    popupPartialProcess()
});
statecity = [{
    value: "Hà Nội",
    StateId: 24,
    CityId: 0,
    label: "Hà Nội",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Hải Phòng",
    StateId: 27,
    CityId: 0,
    label: "Hải Phòng",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Bắc Giang",
    StateId: 3,
    CityId: 0,
    label: "Bắc Giang",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Bắc Kạn",
    StateId: 4,
    CityId: 0,
    label: "Bắc Kạn",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Bắc Ninh",
    StateId: 6,
    CityId: 0,
    label: "Bắc Ninh",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Cao Bằng",
    StateId: 14,
    CityId: 0,
    label: "Cao Bằng",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Điện Biên",
    StateId: 18,
    CityId: 0,
    label: "Điện Biên",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Hà Giang",
    StateId: 22,
    CityId: 0,
    label: "Hà Giang",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Hà Nam",
    StateId: 23,
    CityId: 0,
    label: "Hà Nam",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Hải Dương",
    StateId: 26,
    CityId: 0,
    label: "Hải Dương",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Hòa Bình",
    StateId: 30,
    CityId: 0,
    label: "Hòa Bình",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Hưng Yên",
    StateId: 31,
    CityId: 0,
    label: "Hưng Yên",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Lạng Sơn",
    StateId: 37,
    CityId: 0,
    label: "Lạng Sơn",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Lào Cai",
    StateId: 38,
    CityId: 0,
    label: "Lào Cai",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Nam Định",
    StateId: 40,
    CityId: 0,
    label: "Nam Định",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Ninh Bình",
    StateId: 42,
    CityId: 0,
    label: "Ninh Bình",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Phú Thọ",
    StateId: 44,
    CityId: 0,
    label: "Phú Thọ",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Thái Bình",
    StateId: 54,
    CityId: 0,
    label: "Thái Bình",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Tuyên Quang",
    StateId: 60,
    CityId: 0,
    label: "Tuyên Quang",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Vinh - Nghệ An",
    StateId: 41,
    CityId: 0,
    label: "Vinh",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Vĩnh Phúc",
    StateId: 62,
    CityId: 0,
    label: "Vĩnh Phúc",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Yên Bái",
    StateId: 63,
    CityId: 0,
    label: "Yên Bái",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Đà Nẵng",
    StateId: 15,
    CityId: 0,
    label: "Đà Nẵng",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Bình Định",
    StateId: 8,
    CityId: 0,
    label: "Bình Định",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Bình Thuận",
    StateId: 11,
    CityId: 0,
    label: "Bình Thuận",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Đắk Lắk",
    StateId: 16,
    CityId: 0,
    label: "Đắk Lắk",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Đăk Nông",
    StateId: 17,
    CityId: 0,
    label: "Đăk Nông",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Gia Lai",
    StateId: 21,
    CityId: 0,
    label: "Gia Lai",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Hà Tĩnh",
    StateId: 25,
    CityId: 0,
    label: "Hà Tĩnh",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Khánh Hòa",
    StateId: 32,
    CityId: 0,
    label: "Khánh Hòa",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Kon Tum",
    StateId: 34,
    CityId: 0,
    label: "Kon Tum",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Lai Châu",
    StateId: 35,
    CityId: 0,
    label: "Lai Châu",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Lâm Đồng",
    StateId: 36,
    CityId: 0,
    label: "Lâm Đồng",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Nghệ An",
    StateId: 41,
    CityId: 0,
    label: "Nghệ An",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Ninh Thuận",
    StateId: 43,
    CityId: 0,
    label: "Ninh Thuận",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Phú Yên",
    StateId: 45,
    CityId: 0,
    label: "Phú Yên",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Quảng Bình",
    StateId: 46,
    CityId: 0,
    label: "Quảng Bình",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Kẻ Bàng - Quảng Bình",
    StateId: 46,
    CityId: 0,
    label: "Kẻ Bàng - Quảng Bình",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Sơn Đoòng - Quảng Bình",
    StateId: 46,
    CityId: 0,
    label: "Sơn Đoòng - Quảng Bình",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Quảng Nam",
    StateId: 47,
    CityId: 0,
    label: "Quảng Nam",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Quảng Ngãi",
    StateId: 48,
    CityId: 0,
    label: "Quảng Ngãi",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Quảng Ninh",
    StateId: 49,
    CityId: 0,
    label: "Quảng Ninh",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Quảng Trị",
    StateId: 50,
    CityId: 0,
    label: "Quảng Trị",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Sơn La",
    StateId: 52,
    CityId: 0,
    label: "Sơn La",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Thái Nguyên",
    StateId: 55,
    CityId: 0,
    label: "Thái Nguyên",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Thanh Hóa",
    StateId: 56,
    CityId: 0,
    label: "Thanh Hóa",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Thừa Thiên-Huế",
    StateId: 57,
    CityId: 0,
    label: "Thừa Thiên-Huế",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Attapeu - Lào",
    StateId: 28288,
    CityId: 0,
    label: "Attapeu - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Bokeo - Lào",
    StateId: 28289,
    CityId: 0,
    label: "Bokeo - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Borikhamxay - Lào",
    StateId: 28290,
    CityId: 0,
    label: "Borikhamxay - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Champasack - Lào",
    StateId: 28291,
    CityId: 0,
    label: "Champasack - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Huaphanh - Lào",
    StateId: 28292,
    CityId: 0,
    label: "Huaphanh - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Khammuane - Lào",
    StateId: 28293,
    CityId: 0,
    label: "Khammuane - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Luangnamtha - Lào",
    StateId: 28294,
    CityId: 0,
    label: "Luangnamtha - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Luangprabang - Lào",
    StateId: 28295,
    CityId: 0,
    label: "Luangprabang - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Oudomxay - Lào",
    StateId: 28296,
    CityId: 0,
    label: "Oudomxay - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Phongsaly - Lào",
    StateId: 28297,
    CityId: 0,
    label: "Phongsaly - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Saravane - Lào",
    StateId: 28298,
    CityId: 0,
    label: "Saravane - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Savannakhet - Lào",
    StateId: 28299,
    CityId: 0,
    label: "Savannakhet - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Vientiane - Lào",
    StateId: 28300,
    CityId: 0,
    label: "Vientiane - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Lào - Vientiane",
    StateId: 28300,
    CityId: 0,
    label: "Vientiane - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Xayabury - Lào",
    StateId: 28301,
    CityId: 0,
    label: "Xayabury - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Sekong - Lào",
    StateId: 28302,
    CityId: 0,
    label: "Sekong - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Xiengkhuang - Lào",
    StateId: 28303,
    CityId: 0,
    label: "Xiengkhuang - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Xaisomboun - Lào",
    StateId: 28304,
    CityId: 0,
    label: "Xaisomboun - Lào",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Banteay Meanchey - Campuchia",
    StateId: 49104,
    CityId: 0,
    label: "Banteay Meanchey - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Battambang - Campuchia",
    StateId: 49105,
    CityId: 0,
    label: "Battambang - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Kampong Cham - Campuchia",
    StateId: 49106,
    CityId: 0,
    label: "Kampong Cham - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Kampong Chhnang - Campuchia",
    StateId: 49107,
    CityId: 0,
    label: "Kampong Chhnang - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Kampong Speu - Campuchia",
    StateId: 49108,
    CityId: 0,
    label: "Kampong Speu - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Kampong Thom - Campuchia",
    StateId: 49109,
    CityId: 0,
    label: "Kampong Thom - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Kampot - Campuchia",
    StateId: 49110,
    CityId: 0,
    label: "Kampot - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Kandal - Campuchia",
    StateId: 49111,
    CityId: 0,
    label: "Kandal - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Kep - Campuchia",
    StateId: 49112,
    CityId: 0,
    label: "Kep - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Koh Kong - Campuchia",
    StateId: 49113,
    CityId: 0,
    label: "Koh Kong - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Kratie - Campuchia",
    StateId: 49114,
    CityId: 0,
    label: "Kratie - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Mondulkiri - Campuchia",
    StateId: 49115,
    CityId: 0,
    label: "Mondulkiri - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Oddar Meanchey - Campuchia",
    StateId: 49116,
    CityId: 0,
    label: "Oddar Meanchey - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Pailin - Campuchia",
    StateId: 49117,
    CityId: 0,
    label: "Pailin - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Campuchia - Phnôm Pênh",
    StateId: 49118,
    CityId: 0,
    label: "Phnôm Pênh - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Phnôm Pênh - Campuchia",
    StateId: 49118,
    CityId: 0,
    label: "Phnôm Pênh - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Preah Vihear - Campuchia",
    StateId: 49119,
    CityId: 0,
    label: "Preah Vihear - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Prey Veng - Campuchia",
    StateId: 49120,
    CityId: 0,
    label: "Prey Veng - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Pursat - Campuchia",
    StateId: 49121,
    CityId: 0,
    label: "Pursat - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Ratanakiri - Campuchia",
    StateId: 49122,
    CityId: 0,
    label: "Ratanakiri - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Siem Reap - Campuchia",
    StateId: 49123,
    CityId: 0,
    label: "Siem Reap - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Sihanoukville - Campuchia",
    StateId: 49124,
    CityId: 0,
    label: "Sihanoukville - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Svay Rieng - Campuchia",
    StateId: 49126,
    CityId: 0,
    label: "Svay Rieng - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Takéo - Campuchia",
    StateId: 49127,
    CityId: 0,
    label: "Takéo - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Tbong Khmum - Campuchia",
    StateId: 49128,
    CityId: 0,
    label: "Tbong Khmum - Campuchia",
    Category: Language.StateCity,
    Region: 2
}, {
    value: "Hồ Chí Minh",
    StateId: 29,
    CityId: 0,
    label: "Hồ Chí Minh",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Sài Gòn",
    StateId: 29,
    CityId: 0,
    label: "Sài Gòn",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Cần Thơ",
    StateId: 13,
    CityId: 0,
    label: "Cần Thơ",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "An Giang",
    StateId: 1,
    CityId: 0,
    label: "An Giang",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Bà Rịa-Vũng Tàu",
    StateId: 2,
    CityId: 0,
    label: "Bà Rịa-Vũng Tàu",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Bạc Liêu",
    StateId: 5,
    CityId: 0,
    label: "Bạc Liêu",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Bến Tre",
    StateId: 7,
    CityId: 0,
    label: "Bến Tre",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Bình Dương",
    StateId: 9,
    CityId: 0,
    label: "Bình Dương",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Bình Phước",
    StateId: 10,
    CityId: 0,
    label: "Bình Phước",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Cà Mau",
    StateId: 12,
    CityId: 0,
    label: "Cà Mau",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Đồng Nai",
    StateId: 19,
    CityId: 0,
    label: "Đồng Nai",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Đồng Tháp",
    StateId: 20,
    CityId: 0,
    label: "Đồng Tháp",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Hậu Giang",
    StateId: 28,
    CityId: 0,
    label: "Hậu Giang",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Kiên Giang",
    StateId: 33,
    CityId: 0,
    label: "Kiên Giang",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Kiến Đức - Đăk R'Lấp",
    StateId: 17,
    CityId: 159,
    label: "Kiến Đức - Đăk Đăk R'Lấp",
    Category: Language.district,
    Region: 3
}, {
    value: "Long An",
    StateId: 39,
    CityId: 0,
    label: "Long An",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Sóc Trăng",
    StateId: 51,
    CityId: 0,
    label: "Sóc Trăng",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Tây Ninh",
    StateId: 53,
    CityId: 0,
    label: "Tây Ninh",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Tiền Giang",
    StateId: 58,
    CityId: 0,
    label: "Tiền Giang",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Trà Vinh",
    StateId: 59,
    CityId: 0,
    label: "Trà Vinh",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Vĩnh Long",
    StateId: 61,
    CityId: 0,
    label: "Vĩnh Long",
    Category: Language.StateCity,
    Region: 3
}, {
    value: "Pakse - Lào",
    StateId: 65,
    CityId: 0,
    label: "Pakse - Lào",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Bến xe Miền Đông - Hồ Chí Minh",
    StateId: 29,
    CityId: 0,
    label: "Bến xe Miền Đông",
    Category: Language.benxeh1
}, {
    value: "Bến xe Miền Tây - Hồ Chí Minh",
    StateId: 29,
    CityId: 0,
    label: "Bến xe Miền Tây",
    Category: Language.benxeh1
}, {
    value: "Bến xe An Sương - Hồ Chí Minh",
    StateId: 29,
    CityId: 0,
    label: "Bến xe An Sương",
    Category: Language.benxeh1
}, {
    value: "Bến xe Mỹ Đình - Hà Nội",
    StateId: 24,
    CityId: 0,
    label: "Bến xe Mỹ Đình",
    Category: Language.benxeh1
}, {
    value: "Bến xe Gia Lâm - Hà Nội",
    StateId: 24,
    CityId: 0,
    label: "Bến xe Gia Lâm",
    Category: Language.benxeh1
}, {
    value: "Bến xe Giáp Bát - Hà Nội",
    StateId: 24,
    CityId: 0,
    label: "Bến xe Giáp Bát",
    Category: Language.benxeh1
}, {
    value: "Bến xe Nước Ngầm - Hà Nội",
    StateId: 24,
    CityId: 0,
    label: "Bến xe Nước Ngầm",
    Category: Language.benxeh1
}, {
    value: "Bến xe Lương Yên - Hà Nội",
    StateId: 24,
    CityId: 0,
    label: "Bến xe Lương Yên",
    Category: Language.benxeh1
}, {
    value: "Bến xe Yên Nghĩa - Hà Nội",
    StateId: 24,
    CityId: 0,
    label: "Bến xe Yên Nghĩa",
    Category: Language.benxeh1
}, {
    value: "Bến xe Trung tâm - Đà Nẵng",
    StateId: 15,
    CityId: 0,
    label: "Bến xe Trung tâm Đà Nẵng",
    Category: Language.benxeh1
}, {
    value: "Bến xe Khách phía nam - Đà Nẵng",
    StateId: 15,
    CityId: 0,
    label: "Bến xe Khách phía nam Đà Nẵng",
    Category: Language.benxeh1
}, {
    value: "Bến xe Khách - Đà Nẵng",
    StateId: 15,
    CityId: 0,
    label: "Bến xe Khách Đà Nẵng",
    Category: Language.benxeh1
}, {
    value: "Bến xe - Cần Thơ",
    StateId: 13,
    CityId: 0,
    label: "Bến xe Cần Thơ",
    Category: Language.benxeh1
}, {
    value: "Bến xe Thạch An - Cần Thơ",
    StateId: 13,
    CityId: 0,
    label: "Bến xe Thạch An",
    Category: Language.benxeh1
}, {
    value: "Bến xe Thốt Nốt - Cần Thơ",
    StateId: 13,
    CityId: 0,
    label: "Bến xe Thốt Nốt",
    Category: Language.benxeh1
}, {
    value: "Bến xe Bình Thủy - Cần Thơ",
    StateId: 13,
    CityId: 0,
    label: "Bến xe Bình Thủy",
    Category: Language.benxeh1
}, {
    value: "Bến xe Phong Điền - Cần Thơ",
    StateId: 13,
    CityId: 0,
    label: "Bến xe Phong Điền",
    Category: Language.benxeh1
}, {
    value: "Bến xe Khu đô thị nam - Cần Thơ",
    StateId: 13,
    CityId: 0,
    label: "Bến xe Khu đô thị nam Cần Thơ",
    Category: Language.benxeh1
}, {
    value: "Bến xe Cờ Đỏ - Cần Thơ",
    StateId: 13,
    CityId: 0,
    label: "Bến xe Cờ Đỏ",
    Category: Language.benxeh1
}, {
    value: "Bến xe 91B - Cần Thơ",
    StateId: 13,
    CityId: 0,
    label: "Bến xe 91B Cần Thơ",
    Category: Language.benxeh1
}, {
    value: "Bến xe Tàu - Cần Thơ",
    StateId: 13,
    CityId: 0,
    label: "Bến xe Tàu Cần Thơ",
    Category: Language.benxeh1
}, {
    value: "Bến xe Hùng Vương - Cần Thơ",
    StateId: 13,
    CityId: 0,
    label: "Bến xe Hùng Vương Cần Thơ",
    Category: Language.benxeh1
}, {
    value: "Bến xe Ô Môn - Cần Thơ",
    StateId: 13,
    CityId: 0,
    label: "Bến xe Ô Môn",
    Category: Language.benxeh1
}, {
    value: "Vinh - Nghệ An",
    StateId: 41,
    CityId: 470,
    label: "Vinh - Nghệ An",
    Category: Language.district
}, {
    value: "An Dương - Hải Phòng",
    StateId: 27,
    CityId: 285,
    label: "An Dương - Hải Phòng",
    Category: Language.district
}, {
    value: "An Lão - Hải Phòng",
    StateId: 27,
    CityId: 286,
    label: "An Lão - Hải Phòng",
    Category: Language.district
}, {
    value: "Bạch Long Vĩ - Hải Phòng",
    StateId: 27,
    CityId: 287,
    label: "Bạch Long Vĩ - Hải Phòng",
    Category: Language.district
}, {
    value: "Cát Hải - Hải Phòng",
    StateId: 27,
    CityId: 288,
    label: "Cát Hải - Hải Phòng",
    Category: Language.district
}, {
    value: "Dương Kinh - Hải Phòng",
    StateId: 27,
    CityId: 289,
    label: "Dương Kinh - Hải Phòng",
    Category: Language.district
}, {
    value: "Đồ Sơn - Hải Phòng",
    StateId: 27,
    CityId: 290,
    label: "Đồ Sơn - Hải Phòng",
    Category: Language.district
}, {
    value: "Hải An - Hải Phòng",
    StateId: 27,
    CityId: 291,
    label: "Hải An - Hải Phòng",
    Category: Language.district
}, {
    value: "Hồng Bàng - Hải Phòng",
    StateId: 27,
    CityId: 292,
    label: "Hồng Bàng - Hải Phòng",
    Category: Language.district
}, {
    value: "Kiến An - Hải Phòng",
    StateId: 27,
    CityId: 293,
    label: "Kiến An - Hải Phòng",
    Category: Language.district
}, {
    value: "Kiến Thụy - Hải Phòng",
    StateId: 27,
    CityId: 294,
    label: "Kiến Thụy - Hải Phòng",
    Category: Language.district
}, {
    value: "Lê Chân - Hải Phòng",
    StateId: 27,
    CityId: 295,
    label: "Lê Chân - Hải Phòng",
    Category: Language.district
}, {
    value: "Ngô Quyền - Hải Phòng",
    StateId: 27,
    CityId: 296,
    label: "Ngô Quyền - Hải Phòng",
    Category: Language.district
}, {
    value: "Thuỷ Nguyên - Hải Phòng",
    StateId: 27,
    CityId: 297,
    label: "Thuỷ Nguyên - Hải Phòng",
    Category: Language.district
}, {
    value: "Tiên Lãng - Hải Phòng",
    StateId: 27,
    CityId: 298,
    label: "Tiên Lãng - Hải Phòng",
    Category: Language.district
}, {
    value: "Vĩnh Bảo - Hải Phòng",
    StateId: 27,
    CityId: 299,
    label: "Vĩnh Bảo - Hải Phòng",
    Category: Language.district
}, {
    value: "Cát Bà - Hải Phòng",
    StateId: 27,
    CityId: 114248,
    label: "Cát Bà - Hải Phòng",
    Category: Language.district
}, {
    value: "An Phú - An Giang",
    StateId: 1,
    CityId: 1,
    label: "An Phú - An Giang",
    Category: Language.district
}, {
    value: "Châu Đốc - An Giang",
    StateId: 1,
    CityId: 2,
    label: "Châu Đốc - An Giang",
    Category: Language.district
}, {
    value: "Châu Phú - An Giang",
    StateId: 1,
    CityId: 3,
    label: "Châu Phú - An Giang",
    Category: Language.district
}, {
    value: "Châu Thành - An Giang",
    StateId: 1,
    CityId: 4,
    label: "Châu Thành - An Giang",
    Category: Language.district
}, {
    value: "Chợ Mới - An Giang",
    StateId: 1,
    CityId: 5,
    label: "Chợ Mới - An Giang",
    Category: Language.district
}, {
    value: "Long Xuyên - An Giang",
    StateId: 1,
    CityId: 6,
    label: "Long Xuyên - An Giang",
    Category: Language.district
}, {
    value: "Phú Tân - An Giang",
    StateId: 1,
    CityId: 7,
    label: "Phú Tân - An Giang",
    Category: Language.district
}, {
    value: "Tân Châu - An Giang",
    StateId: 1,
    CityId: 8,
    label: "Tân Châu - An Giang",
    Category: Language.district
}, {
    value: "Thoại Sơn - An Giang",
    StateId: 1,
    CityId: 9,
    label: "Thoại Sơn - An Giang",
    Category: Language.district
}, {
    value: "Núi Sập - Thoại Sơn - An Giang",
    StateId: 1,
    CityId: 9,
    label: "Núi Sập - Thoại Sơn - An Giang",
    Category: Language.district
}, {
    value: "Chi Lăng - Tịnh Biên - An Giang",
    StateId: 1,
    CityId: 10,
    label: "Chi Lăng - Tịnh Biên - An Giang",
    Category: Language.district
}, {
    value: "Nhà Bàng - Tịnh Biên - An Giang",
    StateId: 1,
    CityId: 10,
    label: "Nhà Bàng - Tịnh Biên - An Giang",
    Category: Language.district
}, {
    value: "Tri Tôn - An Giang",
    StateId: 1,
    CityId: 11,
    label: "Tri Tôn - An Giang",
    Category: Language.district
}, {
    value: "Trà Sư - An Giang",
    StateId: 1,
    CityId: 114233,
    label: "Trà Sư - An Giang",
    Category: Language.district
}, {
    value: "Chùa Bà Châu Đốc - An Giang",
    StateId: 1,
    CityId: 114234,
    label: "Chùa Bà Châu Đốc - An Giang",
    Category: Language.district
}, {
    value: "Tân Thành - Bà Rịa-Vũng Tàu",
    StateId: 2,
    CityId: 12,
    label: "Tân Thành - Bà Rịa-Vũng Tàu",
    Category: Language.district
}, {
    value: "Vũng Tàu - Bà Rịa-Vũng Tàu",
    StateId: 2,
    CityId: 13,
    label: "Vũng Tàu - Bà Rịa-Vũng Tàu",
    Category: Language.district
}, {
    value: "Xuyên Mộc - Bà Rịa-Vũng Tàu",
    StateId: 2,
    CityId: 14,
    label: "Xuyên Mộc - Bà Rịa-Vũng Tàu",
    Category: Language.district
}, {
    value: "Bà Rịa - Bà Rịa-Vũng Tàu",
    StateId: 2,
    CityId: 15,
    label: "Bà Rịa - Bà Rịa-Vũng Tàu",
    Category: Language.district
}, {
    value: "Châu Đức - Bà Rịa-Vũng Tàu",
    StateId: 2,
    CityId: 16,
    label: "Châu Đức - Bà Rịa-Vũng Tàu",
    Category: Language.district
}, {
    value: "Côn Đảo - Bà Rịa-Vũng Tàu",
    StateId: 2,
    CityId: 17,
    label: "Côn Đảo - Bà Rịa-Vũng Tàu",
    Category: Language.district
}, {
    value: "Đất Đỏ - Bà Rịa-Vũng Tàu",
    StateId: 2,
    CityId: 18,
    label: "Đất Đỏ - Bà Rịa-Vũng Tàu",
    Category: Language.district
}, {
    value: "Long Điền - Bà Rịa-Vũng Tàu",
    StateId: 2,
    CityId: 19,
    label: "Long Điền - Bà Rịa-Vũng Tàu",
    Category: Language.district
}, {
    value: "Long Hải - Bà Rịa-Vũng Tàu",
    StateId: 2,
    CityId: 114266,
    label: "Long Hải - Bà Rịa-Vũng Tàu",
    Category: Language.district
}, {
    value: "Bạc Liêu - Bạc Liêu",
    StateId: 5,
    CityId: 38,
    label: "Bạc Liêu - Bạc Liêu",
    Category: Language.district
}, {
    value: "Đông Hải - Bạc Liêu",
    StateId: 5,
    CityId: 39,
    label: "Đông Hải - Bạc Liêu",
    Category: Language.district
}, {
    value: "Giá Rai - Bạc Liêu",
    StateId: 5,
    CityId: 40,
    label: "Giá Rai - Bạc Liêu",
    Category: Language.district
}, {
    value: "Hoà Bình - Bạc Liêu",
    StateId: 5,
    CityId: 41,
    label: "Hoà Bình - Bạc Liêu",
    Category: Language.district
}, {
    value: "Hồng Dân - Bạc Liêu",
    StateId: 5,
    CityId: 42,
    label: "Hồng Dân - Bạc Liêu",
    Category: Language.district
}, {
    value: "Phước Long - Bạc Liêu",
    StateId: 5,
    CityId: 43,
    label: "Phước Long - Bạc Liêu",
    Category: Language.district
}, {
    value: "Vĩnh Lợi - Bạc Liêu",
    StateId: 5,
    CityId: 44,
    label: "Vĩnh Lợi - Bạc Liêu",
    Category: Language.district
}, {
    value: "Cánh Đồng Quạt Gió - Bạc Liêu",
    StateId: 5,
    CityId: 114235,
    label: "Cánh Đồng Quạt Gió - Bạc Liêu",
    Category: Language.district
}, {
    value: "Ba Bể - Bắc Kạn",
    StateId: 4,
    CityId: 30,
    label: "Ba Bể - Bắc Kạn",
    Category: Language.district
}, {
    value: "Bạch Thông - Bắc Kạn",
    StateId: 4,
    CityId: 31,
    label: "Bạch Thông - Bắc Kạn",
    Category: Language.district
}, {
    value: "Bắc Kạn - Bắc Kạn",
    StateId: 4,
    CityId: 32,
    label: "Bắc Kạn - Bắc Kạn",
    Category: Language.district
}, {
    value: "Chợ Đồn - Bắc Kạn",
    StateId: 4,
    CityId: 33,
    label: "Chợ Đồn - Bắc Kạn",
    Category: Language.district
}, {
    value: "Chợ Mới - Bắc Kạn",
    StateId: 4,
    CityId: 34,
    label: "Chợ Mới - Bắc Kạn",
    Category: Language.district
}, {
    value: "Na Rì - Bắc Kạn",
    StateId: 4,
    CityId: 35,
    label: "Na Rì - Bắc Kạn",
    Category: Language.district
}, {
    value: "Ngân Sơn - Bắc Kạn",
    StateId: 4,
    CityId: 36,
    label: "Ngân Sơn - Bắc Kạn",
    Category: Language.district
}, {
    value: "Pác Nặm - Bắc Kạn",
    StateId: 4,
    CityId: 37,
    label: "Pác Nặm - Bắc Kạn",
    Category: Language.district
}, {
    value: "Bắc Giang - Bắc Giang",
    StateId: 3,
    CityId: 20,
    label: "Bắc Giang - Bắc Giang",
    Category: Language.district
}, {
    value: "Hiệp Hòa - Bắc Giang",
    StateId: 3,
    CityId: 21,
    label: "Hiệp Hòa - Bắc Giang",
    Category: Language.district
}, {
    value: "Lạng Giang - Bắc Giang",
    StateId: 3,
    CityId: 22,
    label: "Lạng Giang - Bắc Giang",
    Category: Language.district
}, {
    value: "Lục Nam - Bắc Giang",
    StateId: 3,
    CityId: 23,
    label: "Lục Nam - Bắc Giang",
    Category: Language.district
}, {
    value: "Lục Ngạn - Bắc Giang",
    StateId: 3,
    CityId: 24,
    label: "Lục Ngạn - Bắc Giang",
    Category: Language.district
}, {
    value: "Sơn Động - Bắc Giang",
    StateId: 3,
    CityId: 25,
    label: "Sơn Động - Bắc Giang",
    Category: Language.district
}, {
    value: "Tân Yên - Bắc Giang",
    StateId: 3,
    CityId: 26,
    label: "Tân Yên - Bắc Giang",
    Category: Language.district
}, {
    value: "Việt Yên - Bắc Giang",
    StateId: 3,
    CityId: 27,
    label: "Việt Yên - Bắc Giang",
    Category: Language.district
}, {
    value: "Yên Dũng - Bắc Giang",
    StateId: 3,
    CityId: 28,
    label: "Yên Dũng - Bắc Giang",
    Category: Language.district
}, {
    value: "Yên Thế - Bắc Giang",
    StateId: 3,
    CityId: 29,
    label: "Yên Thế - Bắc Giang",
    Category: Language.district
}, {
    value: "Bắc Ninh - Bắc Ninh",
    StateId: 6,
    CityId: 45,
    label: "Bắc Ninh - Bắc Ninh",
    Category: Language.district
}, {
    value: "Gia Bình - Bắc Ninh",
    StateId: 6,
    CityId: 46,
    label: "Gia Bình - Bắc Ninh",
    Category: Language.district
}, {
    value: "Lương Tài - Bắc Ninh",
    StateId: 6,
    CityId: 47,
    label: "Lương Tài - Bắc Ninh",
    Category: Language.district
}, {
    value: "Quế Võ - Bắc Ninh",
    StateId: 6,
    CityId: 48,
    label: "Quế Võ - Bắc Ninh",
    Category: Language.district
}, {
    value: "Thuận Thành - Bắc Ninh",
    StateId: 6,
    CityId: 49,
    label: "Thuận Thành - Bắc Ninh",
    Category: Language.district
}, {
    value: "Tiên Du - Bắc Ninh",
    StateId: 6,
    CityId: 50,
    label: "Tiên Du - Bắc Ninh",
    Category: Language.district
}, {
    value: "Từ Sơn - Bắc Ninh",
    StateId: 6,
    CityId: 51,
    label: "Từ Sơn - Bắc Ninh",
    Category: Language.district
}, {
    value: "Yên Phong - Bắc Ninh",
    StateId: 6,
    CityId: 52,
    label: "Yên Phong - Bắc Ninh",
    Category: Language.district
}, {
    value: "Ba Tri - Bến Tre",
    StateId: 7,
    CityId: 53,
    label: "Ba Tri - Bến Tre",
    Category: Language.district
}, {
    value: "Bến Tre - Bến Tre",
    StateId: 7,
    CityId: 54,
    label: "Bến Tre - Bến Tre",
    Category: Language.district
}, {
    value: "Bình Đại - Bến Tre",
    StateId: 7,
    CityId: 55,
    label: "Bình Đại - Bến Tre",
    Category: Language.district
}, {
    value: "Châu Thành - Bến Tre",
    StateId: 7,
    CityId: 56,
    label: "Châu Thành - Bến Tre",
    Category: Language.district
}, {
    value: "Chợ Lách - Bến Tre",
    StateId: 7,
    CityId: 57,
    label: "Chợ Lách - Bến Tre",
    Category: Language.district
}, {
    value: "Giồng Trôm - Bến Tre",
    StateId: 7,
    CityId: 58,
    label: "Giồng Trôm - Bến Tre",
    Category: Language.district
}, {
    value: "Mỏ Cày Bắc - Bến Tre",
    StateId: 7,
    CityId: 59,
    label: "Mỏ Cày Bắc - Bến Tre",
    Category: Language.district
}, {
    value: "Mỏ Cày Nam - Bến Tre",
    StateId: 7,
    CityId: 60,
    label: "Mỏ Cày Nam - Bến Tre",
    Category: Language.district
}, {
    value: "Thạnh Phú - Bến Tre",
    StateId: 7,
    CityId: 61,
    label: "Thạnh Phú - Bến Tre",
    Category: Language.district
}, {
    value: "Cồn Phụng - Bến Tre",
    StateId: 7,
    CityId: 114236,
    label: "Cồn Phụng - Bến Tre",
    Category: Language.district
}, {
    value: "Bến Cát - Bình Dương",
    StateId: 9,
    CityId: 73,
    label: "Bến Cát - Bình Dương",
    Category: Language.district
}, {
    value: "Dầu Tiếng - Bình Dương",
    StateId: 9,
    CityId: 74,
    label: "Dầu Tiếng - Bình Dương",
    Category: Language.district
}, {
    value: "Dĩ An - Bình Dương",
    StateId: 9,
    CityId: 75,
    label: "Dĩ An - Bình Dương",
    Category: Language.district
}, {
    value: "Phú Giáo - Bình Dương",
    StateId: 9,
    CityId: 76,
    label: "Phú Giáo - Bình Dương",
    Category: Language.district
}, {
    value: "Tân Uyên - Bình Dương",
    StateId: 9,
    CityId: 77,
    label: "Tân Uyên - Bình Dương",
    Category: Language.district
}, {
    value: "Thủ Dầu Một - Bình Dương",
    StateId: 9,
    CityId: 78,
    label: "Thủ Dầu Một - Bình Dương",
    Category: Language.district
}, {
    value: "Thuận An - Bình Dương",
    StateId: 9,
    CityId: 79,
    label: "Thuận An - Bình Dương",
    Category: Language.district
}, {
    value: "An Lão - Bình Định",
    StateId: 8,
    CityId: 62,
    label: "An Lão - Bình Định",
    Category: Language.district
}, {
    value: "An Nhơn - Bình Định",
    StateId: 8,
    CityId: 63,
    label: "An Nhơn - Bình Định",
    Category: Language.district
}, {
    value: "Hoài Ân - Bình Định",
    StateId: 8,
    CityId: 64,
    label: "Hoài Ân - Bình Định",
    Category: Language.district
}, {
    value: "Hoài Nhơn - Bình Định",
    StateId: 8,
    CityId: 65,
    label: "Hoài Nhơn - Bình Định",
    Category: Language.district
}, {
    value: "Phù Cát - Bình Định",
    StateId: 8,
    CityId: 66,
    label: "Phù Cát - Bình Định",
    Category: Language.district
}, {
    value: "Phù Mỹ - Bình Định",
    StateId: 8,
    CityId: 67,
    label: "Phù Mỹ - Bình Định",
    Category: Language.district
}, {
    value: "Quy Nhơn - Bình Định",
    StateId: 8,
    CityId: 68,
    label: "Quy Nhơn - Bình Định",
    Category: Language.district
}, {
    value: "Tây Sơn - Bình Định",
    StateId: 8,
    CityId: 69,
    label: "Tây Sơn - Bình Định",
    Category: Language.district
}, {
    value: "Tuy Phước - Bình Định",
    StateId: 8,
    CityId: 70,
    label: "Tuy Phước - Bình Định",
    Category: Language.district
}, {
    value: "Vân Canh - Bình Định",
    StateId: 8,
    CityId: 71,
    label: "Vân Canh - Bình Định",
    Category: Language.district
}, {
    value: "Vĩnh Thạnh - Bình Định",
    StateId: 8,
    CityId: 72,
    label: "Vĩnh Thạnh - Bình Định",
    Category: Language.district
}, {
    value: "Bình Long - Bình Phước",
    StateId: 10,
    CityId: 80,
    label: "Bình Long - Bình Phước",
    Category: Language.district
}, {
    value: "Bù Đăng - Bình Phước",
    StateId: 10,
    CityId: 81,
    label: "Bù Đăng - Bình Phước",
    Category: Language.district
}, {
    value: "Bù Đốp - Bình Phước",
    StateId: 10,
    CityId: 82,
    label: "Bù Đốp - Bình Phước",
    Category: Language.district
}, {
    value: "Bù Gia Mập - Bình Phước",
    StateId: 10,
    CityId: 83,
    label: "Bù Gia Mập - Bình Phước",
    Category: Language.district
}, {
    value: "Chơn Thành - Bình Phước",
    StateId: 10,
    CityId: 84,
    label: "Chơn Thành - Bình Phước",
    Category: Language.district
}, {
    value: "Đồng Phú - Bình Phước",
    StateId: 10,
    CityId: 85,
    label: "Đồng Phú - Bình Phước",
    Category: Language.district
}, {
    value: "Đồng Xoài - Bình Phước",
    StateId: 10,
    CityId: 86,
    label: "Đồng Xoài - Bình Phước",
    Category: Language.district
}, {
    value: "Hớn Quản - Bình Phước",
    StateId: 10,
    CityId: 87,
    label: "Hớn Quản - Bình Phước",
    Category: Language.district
}, {
    value: "Lộc Ninh - Bình Phước",
    StateId: 10,
    CityId: 88,
    label: "Lộc Ninh - Bình Phước",
    Category: Language.district
}, {
    value: "Phước Long - Bình Phước",
    StateId: 10,
    CityId: 89,
    label: "Phước Long - Bình Phước",
    Category: Language.district
}, {
    value: "Bắc Bình - Bình Thuận",
    StateId: 11,
    CityId: 90,
    label: "Bắc Bình - Bình Thuận",
    Category: Language.district
}, {
    value: "Đức Linh - Bình Thuận",
    StateId: 11,
    CityId: 91,
    label: "Đức Linh - Bình Thuận",
    Category: Language.district
}, {
    value: "Hàm Tân - Bình Thuận",
    StateId: 11,
    CityId: 92,
    label: "Hàm Tân - Bình Thuận",
    Category: Language.district
}, {
    value: "Hàm Thuận Bắc - Bình Thuận",
    StateId: 11,
    CityId: 93,
    label: "Hàm Thuận Bắc - Bình Thuận",
    Category: Language.district
}, {
    value: "Hàm Thuận Nam - Bình Thuận",
    StateId: 11,
    CityId: 94,
    label: "Hàm Thuận Nam - Bình Thuận",
    Category: Language.district
}, {
    value: "Phan Thiết - Bình Thuận",
    StateId: 11,
    CityId: 96,
    label: "Phan Thiết - Bình Thuận",
    Category: Language.district
}, {
    value: "Coco Beach - Bình Thuận",
    StateId: 11,
    CityId: 114239,
    label: "Coco Beach - Bình Thuận",
    Category: Language.district
}, {
    value: "La Gi - Bình Thuận",
    StateId: 11,
    CityId: 95,
    label: "La Gi - Bình Thuận",
    Category: Language.district
}, {
    value: "Mũi Né - Bình Thuận",
    StateId: 11,
    CityId: 707,
    label: "Mũi Né - Bình Thuận",
    Category: Language.district
}, {
    value: "Phú Quý - Bình Thuận",
    StateId: 11,
    CityId: 97,
    label: "Phú Quý - Bình Thuận",
    Category: Language.district
}, {
    value: "Tánh Linh - Bình Thuận",
    StateId: 11,
    CityId: 98,
    label: "Tánh Linh - Bình Thuận",
    Category: Language.district
}, {
    value: "Tuy Phong - Bình Thuận",
    StateId: 11,
    CityId: 99,
    label: "Tuy Phong - Bình Thuận",
    Category: Language.district
}, {
    value: "Liên Hương - Bình Thuận",
    StateId: 11,
    CityId: 114238,
    label: "Liên Hương - Bình Thuận",
    Category: Language.district
}, {
    value: "Cổ Thạch - Bình Thuận",
    StateId: 11,
    CityId: 114240,
    label: "Cổ Thạch - Bình Thuận",
    Category: Language.district
}, {
    value: "Hòn Rơm - Bình Thuận",
    StateId: 11,
    CityId: 114241,
    label: "Hòn Rơm - Bình Thuận",
    Category: Language.district
}, {
    value: "Phan Rí - Bình Thuận",
    StateId: 11,
    CityId: 114237,
    label: "Phan Rí - Bình Thuận",
    Category: Language.district
}, {
    value: "Cà Mau - Cà Mau",
    StateId: 12,
    CityId: 100,
    label: "Cà Mau - Cà Mau",
    Category: Language.district
}, {
    value: "Cái Nước - Cà Mau",
    StateId: 12,
    CityId: 101,
    label: "Cái Nước - Cà Mau",
    Category: Language.district
}, {
    value: "Đầm Dơi - Cà Mau",
    StateId: 12,
    CityId: 102,
    label: "Đầm Dơi - Cà Mau",
    Category: Language.district
}, {
    value: "Năm Căn - Cà Mau",
    StateId: 12,
    CityId: 103,
    label: "Năm Căn - Cà Mau",
    Category: Language.district
}, {
    value: "Ngọc Hiển - Cà Mau",
    StateId: 12,
    CityId: 104,
    label: "Ngọc Hiển - Cà Mau",
    Category: Language.district
}, {
    value: "Phú Tân - Cà Mau",
    StateId: 12,
    CityId: 105,
    label: "Phú Tân - Cà Mau",
    Category: Language.district
}, {
    value: "Thới Bình - Cà Mau",
    StateId: 12,
    CityId: 106,
    label: "Thới Bình - Cà Mau",
    Category: Language.district
}, {
    value: "Trần Văn Thời - Cà Mau",
    StateId: 12,
    CityId: 107,
    label: "Trần Văn Thời - Cà Mau",
    Category: Language.district
}, {
    value: "U Minh - Cà Mau",
    StateId: 12,
    CityId: 108,
    label: "U Minh - Cà Mau",
    Category: Language.district
}, {
    value: "Biển Khai Long - Cà Mau",
    StateId: 12,
    CityId: 114242,
    label: "Biển Khai Long - Cà Mau",
    Category: Language.district
}, {
    value: "Chợ Nổi Cái Răng - Cần Thơ",
    StateId: 13,
    CityId: 114243,
    label: "Chợ Nổi Cái Răng - Cần Thơ",
    Category: Language.district
}, {
    value: "Bảo Lạc - Cao Bằng",
    StateId: 14,
    CityId: 119,
    label: "Bảo Lạc - Cao Bằng",
    Category: Language.district
}, {
    value: "Bảo Lâm - Cao Bằng",
    StateId: 14,
    CityId: 120,
    label: "Bảo Lâm - Cao Bằng",
    Category: Language.district
}, {
    value: "Cao Bằng - Cao Bằng",
    StateId: 14,
    CityId: 121,
    label: "Cao Bằng - Cao Bằng",
    Category: Language.district
}, {
    value: "Hà Quảng - Cao Bằng",
    StateId: 14,
    CityId: 122,
    label: "Hà Quảng - Cao Bằng",
    Category: Language.district
}, {
    value: "Hạ Lang - Cao Bằng",
    StateId: 14,
    CityId: 123,
    label: "Hạ Lang - Cao Bằng",
    Category: Language.district
}, {
    value: "Hòa An - Cao Bằng",
    StateId: 14,
    CityId: 124,
    label: "Hòa An - Cao Bằng",
    Category: Language.district
}, {
    value: "Nguyên Bình - Cao Bằng",
    StateId: 14,
    CityId: 125,
    label: "Nguyên Bình - Cao Bằng",
    Category: Language.district
}, {
    value: "Phục Hòa - Cao Bằng",
    StateId: 14,
    CityId: 126,
    label: "Phục Hòa - Cao Bằng",
    Category: Language.district
}, {
    value: "Quảng Uyên - Cao Bằng",
    StateId: 14,
    CityId: 127,
    label: "Quảng Uyên - Cao Bằng",
    Category: Language.district
}, {
    value: "Thạch An - Cao Bằng",
    StateId: 14,
    CityId: 128,
    label: "Thạch An - Cao Bằng",
    Category: Language.district
}, {
    value: "Thông Nông - Cao Bằng",
    StateId: 14,
    CityId: 129,
    label: "Thông Nông - Cao Bằng",
    Category: Language.district
}, {
    value: "Trà Lĩnh - Cao Bằng",
    StateId: 14,
    CityId: 130,
    label: "Trà Lĩnh - Cao Bằng",
    Category: Language.district
}, {
    value: "Trùng Khánh - Cao Bằng",
    StateId: 14,
    CityId: 131,
    label: "Trùng Khánh - Cao Bằng",
    Category: Language.district
}, {
    value: "Buôn Đôn - Đắk Lắk",
    StateId: 16,
    CityId: 141,
    label: "Buôn Đôn - Đắk Lắk",
    Category: Language.district
}, {
    value: "Buôn Hồ - Đắk Lắk",
    StateId: 16,
    CityId: 142,
    label: "Buôn Hồ - Đắk Lắk",
    Category: Language.district
}, {
    value: "Buôn Ma Thuột - Đắk Lắk",
    StateId: 16,
    CityId: 143,
    label: "Buôn Ma Thuột - Đắk Lắk",
    Category: Language.district
}, {
    value: "Cư Kuin - Đắk Lắk",
    StateId: 16,
    CityId: 144,
    label: "Cư Kuin - Đắk Lắk",
    Category: Language.district
}, {
    value: "Cư M'gar - Đắk Lắk",
    StateId: 16,
    CityId: 145,
    label: "Cư M'gar - Đắk Lắk",
    Category: Language.district
}, {
    value: "Ea H'leo - Đắk Lắk",
    StateId: 16,
    CityId: 146,
    label: "Ea H'leo - Đắk Lắk",
    Category: Language.district
}, {
    value: "Ea Kar - Đắk Lắk",
    StateId: 16,
    CityId: 147,
    label: "Ea Kar - Đắk Lắk",
    Category: Language.district
}, {
    value: "Ea Súp - Đắk Lắk",
    StateId: 16,
    CityId: 148,
    label: "Ea Súp - Đắk Lắk",
    Category: Language.district
}, {
    value: "Krông Ana - Đắk Lắk",
    StateId: 16,
    CityId: 149,
    label: "Krông Ana - Đắk Lắk",
    Category: Language.district
}, {
    value: "Krông Bông - Đắk Lắk",
    StateId: 16,
    CityId: 150,
    label: "Krông Bông - Đắk Lắk",
    Category: Language.district
}, {
    value: "Krông Búk - Đắk Lắk",
    StateId: 16,
    CityId: 151,
    label: "Krông Búk - Đắk Lắk",
    Category: Language.district
}, {
    value: "Krông Năng - Đắk Lắk",
    StateId: 16,
    CityId: 152,
    label: "Krông Năng - Đắk Lắk",
    Category: Language.district
}, {
    value: "Krông Pắk - Đắk Lắk",
    StateId: 16,
    CityId: 153,
    label: "Krông Pắk - Đắk Lắk",
    Category: Language.district
}, {
    value: "Lắk - Đắk Lắk",
    StateId: 16,
    CityId: 154,
    label: "Lắk - Đắk Lắk",
    Category: Language.district
}, {
    value: "M'Đrăk - Đắk Lắk",
    StateId: 16,
    CityId: 155,
    label: "M'Đrăk - Đắk Lắk",
    Category: Language.district
}, {
    value: "Hồ Lắk - Đắk Lắk",
    StateId: 16,
    CityId: 114244,
    label: "Hồ Lắk - Đắk Lắk",
    Category: Language.district
}, {
    value: "Cư Jút - Đăk Nông",
    StateId: 17,
    CityId: 156,
    label: "Cư Jút - Đăk Nông",
    Category: Language.district
}, {
    value: "Đăk Glong - Đăk Nông",
    StateId: 17,
    CityId: 157,
    label: "Đăk Glong - Đăk Nông",
    Category: Language.district
}, {
    value: "Quảng Sơn - Đăk Nông",
    StateId: 17,
    CityId: 157,
    label: "Quảng Sơn - Đăk Nông",
    Category: Language.district
}, {
    value: "Quảng Khê - Đăk Nông",
    StateId: 17,
    CityId: 157,
    label: "Quảng Khê - Đăk Nông",
    Category: Language.district
}, {
    value: "Đăk Mil - Đăk Nông",
    StateId: 17,
    CityId: 158,
    label: "Đăk Mil - Đăk Nông",
    Category: Language.district
}, {
    value: "Đăk R'Lấp - Đăk Nông",
    StateId: 17,
    CityId: 159,
    label: "Đăk R'Lấp - Đăk Nông",
    Category: Language.district
}, {
    value: "Đăk Song - Đăk Nông",
    StateId: 17,
    CityId: 160,
    label: "Đăk Song - Đăk Nông",
    Category: Language.district
}, {
    value: "Gia Nghĩa - Đăk Nông",
    StateId: 17,
    CityId: 161,
    label: "Gia Nghĩa - Đăk Nông",
    Category: Language.district
}, {
    value: "Krông Nô - Đăk Nông",
    StateId: 17,
    CityId: 162,
    label: "Krông Nô - Đăk Nông",
    Category: Language.district
}, {
    value: "Tuy Đức - Đăk Nông",
    StateId: 17,
    CityId: 163,
    label: "Tuy Đức - Đăk Nông",
    Category: Language.district
}, {
    value: "Điện Biên - Điện Biên",
    StateId: 18,
    CityId: 164,
    label: "Điện Biên - Điện Biên",
    Category: Language.district
}, {
    value: "Điện Biên Đông - Điện Biên",
    StateId: 18,
    CityId: 165,
    label: "Điện Biên Đông - Điện Biên",
    Category: Language.district
}, {
    value: "Điện Biên Phủ - Điện Biên",
    StateId: 18,
    CityId: 166,
    label: "Điện Biên Phủ - Điện Biên",
    Category: Language.district
}, {
    value: "Mường Ảng - Điện Biên",
    StateId: 18,
    CityId: 167,
    label: "Mường Ảng - Điện Biên",
    Category: Language.district
}, {
    value: "Mường Chà - Điện Biên",
    StateId: 18,
    CityId: 168,
    label: "Mường Chà - Điện Biên",
    Category: Language.district
}, {
    value: "Mường Lay - Điện Biên",
    StateId: 18,
    CityId: 169,
    label: "Mường Lay - Điện Biên",
    Category: Language.district
}, {
    value: "Mường Nhé - Điện Biên",
    StateId: 18,
    CityId: 170,
    label: "Mường Nhé - Điện Biên",
    Category: Language.district
}, {
    value: "Nậm Pồ - Điện Biên",
    StateId: 18,
    CityId: 171,
    label: "Nậm Pồ - Điện Biên",
    Category: Language.district
}, {
    value: "Tủa Chùa - Điện Biên",
    StateId: 18,
    CityId: 172,
    label: "Tủa Chùa - Điện Biên",
    Category: Language.district
}, {
    value: "Tuần Giáo - Điện Biên",
    StateId: 18,
    CityId: 173,
    label: "Tuần Giáo - Điện Biên",
    Category: Language.district
}, {
    value: "Biên Hòa - Đồng Nai",
    StateId: 19,
    CityId: 174,
    label: "Biên Hòa - Đồng Nai",
    Category: Language.district
}, {
    value: "Cẩm Mỹ - Đồng Nai",
    StateId: 19,
    CityId: 175,
    label: "Cẩm Mỹ - Đồng Nai",
    Category: Language.district
}, {
    value: "Định Quán - Đồng Nai",
    StateId: 19,
    CityId: 176,
    label: "Định Quán - Đồng Nai",
    Category: Language.district
}, {
    value: "Long Khánh - Đồng Nai",
    StateId: 19,
    CityId: 177,
    label: "Long Khánh - Đồng Nai",
    Category: Language.district
}, {
    value: "Long Thành - Đồng Nai",
    StateId: 19,
    CityId: 178,
    label: "Long Thành - Đồng Nai",
    Category: Language.district
}, {
    value: "Nhơn Trạch - Đồng Nai",
    StateId: 19,
    CityId: 179,
    label: "Nhơn Trạch - Đồng Nai",
    Category: Language.district
}, {
    value: "Tân Phú - Đồng Nai",
    StateId: 19,
    CityId: 180,
    label: "Tân Phú - Đồng Nai",
    Category: Language.district
}, {
    value: "Thống Nhất - Đồng Nai",
    StateId: 19,
    CityId: 181,
    label: "Thống Nhất - Đồng Nai",
    Category: Language.district
}, {
    value: "Trảng Bom - Đồng Nai",
    StateId: 19,
    CityId: 182,
    label: "Trảng Bom - Đồng Nai",
    Category: Language.district
}, {
    value: "Vĩnh Cửu - Đồng Nai",
    StateId: 19,
    CityId: 183,
    label: "Vĩnh Cửu - Đồng Nai",
    Category: Language.district
}, {
    value: "Xuân Lộc - Đồng Nai",
    StateId: 19,
    CityId: 184,
    label: "Xuân Lộc - Đồng Nai",
    Category: Language.district
}, {
    value: "Cao Lãnh - Đồng Tháp",
    StateId: 20,
    CityId: 185,
    label: "Tp.Cao Lãnh - Đồng Tháp",
    Category: Language.district
}, {
    value: "Cao Lãnh - Đồng Tháp",
    StateId: 20,
    CityId: 186,
    label: "H.Cao Lãnh - Đồng Tháp",
    Category: Language.district
}, {
    value: "Châu Thành - Đồng Tháp",
    StateId: 20,
    CityId: 187,
    label: "Châu Thành - Đồng Tháp",
    Category: Language.district
}, {
    value: "Tx.Hồng Ngự - Đồng Tháp",
    StateId: 20,
    CityId: 188,
    label: "Tx.Hồng Ngự - Đồng Tháp",
    Category: Language.district
}, {
    value: "H.Hồng Ngự - Đồng Tháp",
    StateId: 20,
    CityId: 189,
    label: "H.Hồng Ngự - Đồng Tháp",
    Category: Language.district
}, {
    value: "Lai Vung - Đồng Tháp",
    StateId: 20,
    CityId: 190,
    label: "Lai Vung - Đồng Tháp",
    Category: Language.district
}, {
    value: "Lấp Vò - Đồng Tháp",
    StateId: 20,
    CityId: 191,
    label: "Lấp Vò - Đồng Tháp",
    Category: Language.district
}, {
    value: "Sa Đéc - Đồng Tháp",
    StateId: 20,
    CityId: 192,
    label: "Sa Đéc - Đồng Tháp",
    Category: Language.district
}, {
    value: "Tam Nông - Đồng Tháp",
    StateId: 20,
    CityId: 193,
    label: "Tam Nông - Đồng Tháp",
    Category: Language.district
}, {
    value: "Tân Hồng - Đồng Tháp",
    StateId: 20,
    CityId: 194,
    label: "Tân Hồng - Đồng Tháp",
    Category: Language.district
}, {
    value: "Thanh Bình - Đồng Tháp",
    StateId: 20,
    CityId: 195,
    label: "Thanh Bình - Đồng Tháp",
    Category: Language.district
}, {
    value: "Tháp Mười - Đồng Tháp",
    StateId: 20,
    CityId: 196,
    label: "Tháp Mười - Đồng Tháp",
    Category: Language.district
}, {
    value: "An Khê - Gia Lai",
    StateId: 21,
    CityId: 197,
    label: "An Khê - Gia Lai",
    Category: Language.district
}, {
    value: "Ayun Pa - Gia Lai",
    StateId: 21,
    CityId: 198,
    label: "Ayun Pa - Gia Lai",
    Category: Language.district
}, {
    value: "Chư Păh - Gia Lai",
    StateId: 21,
    CityId: 199,
    label: "Chư Păh - Gia Lai",
    Category: Language.district
}, {
    value: "Chư Prông - Gia Lai",
    StateId: 21,
    CityId: 200,
    label: "Chư Prông - Gia Lai",
    Category: Language.district
}, {
    value: "Chư Pưh - Gia Lai",
    StateId: 21,
    CityId: 201,
    label: "Chư Pưh - Gia Lai",
    Category: Language.district
}, {
    value: "Chư Sê - Gia Lai",
    StateId: 21,
    CityId: 202,
    label: "Chư Sê - Gia Lai",
    Category: Language.district
}, {
    value: "Đăk Đoa - Gia Lai",
    StateId: 21,
    CityId: 203,
    label: "Đăk Đoa - Gia Lai",
    Category: Language.district
}, {
    value: "Đắk Pơ - Gia Lai",
    StateId: 21,
    CityId: 204,
    label: "Đắk Pơ - Gia Lai",
    Category: Language.district
}, {
    value: "Đức Cơ - Gia Lai",
    StateId: 21,
    CityId: 205,
    label: "Đức Cơ - Gia Lai",
    Category: Language.district
}, {
    value: "Ia Grai - Gia Lai",
    StateId: 21,
    CityId: 206,
    label: "Ia Grai - Gia Lai",
    Category: Language.district
}, {
    value: "Ia Pa - Gia Lai",
    StateId: 21,
    CityId: 207,
    label: "Ia Pa - Gia Lai",
    Category: Language.district
}, {
    value: "KBang - Gia Lai",
    StateId: 21,
    CityId: 208,
    label: "KBang - Gia Lai",
    Category: Language.district
}, {
    value: "Kông Chro - Gia Lai",
    StateId: 21,
    CityId: 209,
    label: "Kông Chro - Gia Lai",
    Category: Language.district
}, {
    value: "Krông Pa - Gia Lai",
    StateId: 21,
    CityId: 210,
    label: "Krông Pa - Gia Lai",
    Category: Language.district
}, {
    value: "Mang Yang - Gia Lai",
    StateId: 21,
    CityId: 211,
    label: "Mang Yang - Gia Lai",
    Category: Language.district
}, {
    value: "Phú Thiện - Gia Lai",
    StateId: 21,
    CityId: 212,
    label: "Phú Thiện - Gia Lai",
    Category: Language.district
}, {
    value: "Pleiku - Gia Lai",
    StateId: 21,
    CityId: 213,
    label: "Pleiku - Gia Lai",
    Category: Language.district
}, {
    value: "Chư Đăng Ya - Gia Lai",
    StateId: 21,
    CityId: 114245,
    label: "Chư Đăng Ya - Gia Lai",
    Category: Language.district
}, {
    value: "Bắc Mê - Hà Giang",
    StateId: 22,
    CityId: 214,
    label: "Bắc Mê - Hà Giang",
    Category: Language.district
}, {
    value: "Bắc Quang - Hà Giang",
    StateId: 22,
    CityId: 215,
    label: "Bắc Quang - Hà Giang",
    Category: Language.district
}, {
    value: "Đồng Văn - Hà Giang",
    StateId: 22,
    CityId: 216,
    label: "Đồng Văn - Hà Giang",
    Category: Language.district
}, {
    value: "Hà Giang - Hà Giang",
    StateId: 22,
    CityId: 217,
    label: "Hà Giang - Hà Giang",
    Category: Language.district
}, {
    value: "Hoàng Su Phì - Hà Giang",
    StateId: 22,
    CityId: 218,
    label: "Hoàng Su Phì - Hà Giang",
    Category: Language.district
}, {
    value: "Mèo Vạc - Hà Giang",
    StateId: 22,
    CityId: 219,
    label: "Mèo Vạc - Hà Giang",
    Category: Language.district
}, {
    value: "Quản Bạ - Hà Giang",
    StateId: 22,
    CityId: 220,
    label: "Quản Bạ - Hà Giang",
    Category: Language.district
}, {
    value: "Quang Bình - Hà Giang",
    StateId: 22,
    CityId: 221,
    label: "Quang Bình - Hà Giang",
    Category: Language.district
}, {
    value: "Vị Xuyên - Hà Giang",
    StateId: 22,
    CityId: 222,
    label: "Vị Xuyên - Hà Giang",
    Category: Language.district
}, {
    value: "Xín Mần - Hà Giang",
    StateId: 22,
    CityId: 223,
    label: "Xín Mần - Hà Giang",
    Category: Language.district
}, {
    value: "Yên Minh - Hà Giang",
    StateId: 22,
    CityId: 224,
    label: "Yên Minh - Hà Giang",
    Category: Language.district
}, {
    value: "Bình Lục - Hà Nam",
    StateId: 23,
    CityId: 225,
    label: "Bình Lục - Hà Nam",
    Category: Language.district
}, {
    value: "Duy Tiên - Hà Nam",
    StateId: 23,
    CityId: 226,
    label: "Duy Tiên - Hà Nam",
    Category: Language.district
}, {
    value: "Kim Bảng - Hà Nam",
    StateId: 23,
    CityId: 227,
    label: "Kim Bảng - Hà Nam",
    Category: Language.district
}, {
    value: "Lý Nhân - Hà Nam",
    StateId: 23,
    CityId: 228,
    label: "Lý Nhân - Hà Nam",
    Category: Language.district
}, {
    value: "Phủ Lý - Hà Nam",
    StateId: 23,
    CityId: 229,
    label: "Phủ Lý - Hà Nam",
    Category: Language.district
}, {
    value: "Thanh Liêm - Hà Nam",
    StateId: 23,
    CityId: 230,
    label: "Thanh Liêm - Hà Nam",
    Category: Language.district
}, {
    value: "Can Lộc - Hà Tĩnh",
    StateId: 25,
    CityId: 261,
    label: "Can Lộc - Hà Tĩnh",
    Category: Language.district
}, {
    value: "Cẩm Xuyên - Hà Tĩnh",
    StateId: 25,
    CityId: 262,
    label: "Cẩm Xuyên - Hà Tĩnh",
    Category: Language.district
}, {
    value: "Đức Thọ - Hà Tĩnh",
    StateId: 25,
    CityId: 263,
    label: "Đức Thọ - Hà Tĩnh",
    Category: Language.district
}, {
    value: "Hà Tĩnh - Hà Tĩnh",
    StateId: 25,
    CityId: 264,
    label: "Hà Tĩnh - Hà Tĩnh",
    Category: Language.district
}, {
    value: "Hồng Lĩnh - Hà Tĩnh",
    StateId: 25,
    CityId: 265,
    label: "Hồng Lĩnh - Hà Tĩnh",
    Category: Language.district
}, {
    value: "Hương Khê - Hà Tĩnh",
    StateId: 25,
    CityId: 266,
    label: "Hương Khê - Hà Tĩnh",
    Category: Language.district
}, {
    value: "Hương Sơn - Hà Tĩnh",
    StateId: 25,
    CityId: 267,
    label: "Hương Sơn - Hà Tĩnh",
    Category: Language.district
}, {
    value: "Kỳ Anh - Hà Tĩnh",
    StateId: 25,
    CityId: 268,
    label: "Kỳ Anh - Hà Tĩnh",
    Category: Language.district
}, {
    value: "Lộc Hà - Hà Tĩnh",
    StateId: 25,
    CityId: 269,
    label: "Lộc Hà - Hà Tĩnh",
    Category: Language.district
}, {
    value: "Nghi Xuân - Hà Tĩnh",
    StateId: 25,
    CityId: 270,
    label: "Nghi Xuân - Hà Tĩnh",
    Category: Language.district
}, {
    value: "Thạch Hà - Hà Tĩnh",
    StateId: 25,
    CityId: 271,
    label: "Thạch Hà - Hà Tĩnh",
    Category: Language.district
}, {
    value: "Vũ Quang - Hà Tĩnh",
    StateId: 25,
    CityId: 272,
    label: "Vũ Quang - Hà Tĩnh",
    Category: Language.district
}, {
    value: "Vũng Áng - Hà Tĩnh",
    StateId: 25,
    CityId: 114247,
    label: "Vũng Áng - Hà Tĩnh",
    Category: Language.district
}, {
    value: "Bình Giang - Hải Dương",
    StateId: 26,
    CityId: 273,
    label: "Bình Giang - Hải Dương",
    Category: Language.district
}, {
    value: "Cẩm Giàng - Hải Dương",
    StateId: 26,
    CityId: 274,
    label: "Cẩm Giàng - Hải Dương",
    Category: Language.district
}, {
    value: "Chí Linh - Hải Dương",
    StateId: 26,
    CityId: 275,
    label: "Chí Linh - Hải Dương",
    Category: Language.district
}, {
    value: "Gia Lộc - Hải Dương",
    StateId: 26,
    CityId: 276,
    label: "Gia Lộc - Hải Dương",
    Category: Language.district
}, {
    value: "Hải Dương - Hải Dương",
    StateId: 26,
    CityId: 277,
    label: "Hải Dương - Hải Dương",
    Category: Language.district
}, {
    value: "Kim Thành - Hải Dương",
    StateId: 26,
    CityId: 278,
    label: "Kim Thành - Hải Dương",
    Category: Language.district
}, {
    value: "Kinh Môn - Hải Dương",
    StateId: 26,
    CityId: 279,
    label: "Kinh Môn - Hải Dương",
    Category: Language.district
}, {
    value: "Nam Sách - Hải Dương",
    StateId: 26,
    CityId: 280,
    label: "Nam Sách - Hải Dương",
    Category: Language.district
}, {
    value: "Ninh Giang - Hải Dương",
    StateId: 26,
    CityId: 281,
    label: "Ninh Giang - Hải Dương",
    Category: Language.district
}, {
    value: "Thanh Hà - Hải Dương",
    StateId: 26,
    CityId: 282,
    label: "Thanh Hà - Hải Dương",
    Category: Language.district
}, {
    value: "Thanh Miện - Hải Dương",
    StateId: 26,
    CityId: 283,
    label: "Thanh Miện - Hải Dương",
    Category: Language.district
}, {
    value: "Tứ Kỳ - Hải Dương",
    StateId: 26,
    CityId: 284,
    label: "Tứ Kỳ - Hải Dương",
    Category: Language.district
}, {
    value: "Châu Thành - Hậu Giang",
    StateId: 28,
    CityId: 301,
    label: "Châu Thành - Hậu Giang",
    Category: Language.district
}, {
    value: "Châu Thành A - Hậu Giang",
    StateId: 28,
    CityId: 302,
    label: "Châu Thành A - Hậu Giang",
    Category: Language.district
}, {
    value: "Long Mỹ - Hậu Giang",
    StateId: 28,
    CityId: 303,
    label: "Long Mỹ - Hậu Giang",
    Category: Language.district
}, {
    value: "Ngã Bảy - Hậu Giang",
    StateId: 28,
    CityId: 304,
    label: "Ngã Bảy - Hậu Giang",
    Category: Language.district
}, {
    value: "Phụng Hiệp - Hậu Giang",
    StateId: 28,
    CityId: 305,
    label: "Phụng Hiệp - Hậu Giang",
    Category: Language.district
}, {
    value: "Vị Thanh - Hậu Giang",
    StateId: 28,
    CityId: 306,
    label: "Vị Thanh - Hậu Giang",
    Category: Language.district
}, {
    value: "Vị Thủy - Hậu Giang",
    StateId: 28,
    CityId: 307,
    label: "Vị Thủy - Hậu Giang",
    Category: Language.district
}, {
    value: "Chợ Nổi Ngã Bảy - Hậu Giang",
    StateId: 28,
    CityId: 114249,
    label: "Chợ Nổi Ngã Bảy - Hậu Giang",
    Category: Language.district
}, {
    value: "Cao Phong - Hòa Bình",
    StateId: 30,
    CityId: 333,
    label: "Cao Phong - Hòa Bình",
    Category: Language.district
}, {
    value: "Đà Bắc - Hòa Bình",
    StateId: 30,
    CityId: 334,
    label: "Đà Bắc - Hòa Bình",
    Category: Language.district
}, {
    value: "Hoà Bình - Hòa Bình",
    StateId: 30,
    CityId: 335,
    label: "Hoà Bình - Hòa Bình",
    Category: Language.district
}, {
    value: "Kim Bôi - Hòa Bình",
    StateId: 30,
    CityId: 336,
    label: "Kim Bôi - Hòa Bình",
    Category: Language.district
}, {
    value: "Kỳ Sơn - Hòa Bình",
    StateId: 30,
    CityId: 337,
    label: "Kỳ Sơn - Hòa Bình",
    Category: Language.district
}, {
    value: "Lạc Sơn - Hòa Bình",
    StateId: 30,
    CityId: 338,
    label: "Lạc Sơn - Hòa Bình",
    Category: Language.district
}, {
    value: "Lạc Thủy - Hòa Bình",
    StateId: 30,
    CityId: 339,
    label: "Lạc Thủy - Hòa Bình",
    Category: Language.district
}, {
    value: "Lương Sơn - Hòa Bình",
    StateId: 30,
    CityId: 340,
    label: "Lương Sơn - Hòa Bình",
    Category: Language.district
}, {
    value: "Mai Châu - Hòa Bình",
    StateId: 30,
    CityId: 341,
    label: "Mai Châu - Hòa Bình",
    Category: Language.district
}, {
    value: "Tân Lạc - Hòa Bình",
    StateId: 30,
    CityId: 342,
    label: "Tân Lạc - Hòa Bình",
    Category: Language.district
}, {
    value: "Yên Thủy - Hòa Bình",
    StateId: 30,
    CityId: 343,
    label: "Yên Thủy - Hòa Bình",
    Category: Language.district
}, {
    value: "Ân Thi - Hưng Yên",
    StateId: 31,
    CityId: 344,
    label: "Ân Thi - Hưng Yên",
    Category: Language.district
}, {
    value: "Hưng Yên - Hưng Yên",
    StateId: 31,
    CityId: 345,
    label: "Hưng Yên - Hưng Yên",
    Category: Language.district
}, {
    value: "Khoái Châu - Hưng Yên",
    StateId: 31,
    CityId: 346,
    label: "Khoái Châu - Hưng Yên",
    Category: Language.district
}, {
    value: "Kim Động - Hưng Yên",
    StateId: 31,
    CityId: 347,
    label: "Kim Động - Hưng Yên",
    Category: Language.district
}, {
    value: "Mỹ Hào - Hưng Yên",
    StateId: 31,
    CityId: 348,
    label: "Mỹ Hào - Hưng Yên",
    Category: Language.district
}, {
    value: "Phù Cừ - Hưng Yên",
    StateId: 31,
    CityId: 349,
    label: "Phù Cừ - Hưng Yên",
    Category: Language.district
}, {
    value: "Tiên Lữ - Hưng Yên",
    StateId: 31,
    CityId: 350,
    label: "Tiên Lữ - Hưng Yên",
    Category: Language.district
}, {
    value: "Văn Giang - Hưng Yên",
    StateId: 31,
    CityId: 351,
    label: "Văn Giang - Hưng Yên",
    Category: Language.district
}, {
    value: "Văn Lâm - Hưng Yên",
    StateId: 31,
    CityId: 352,
    label: "Văn Lâm - Hưng Yên",
    Category: Language.district
}, {
    value: "Yên Mỹ - Hưng Yên",
    StateId: 31,
    CityId: 353,
    label: "Yên Mỹ - Hưng Yên",
    Category: Language.district
}, {
    value: "Cam Lâm - Khánh Hòa",
    StateId: 32,
    CityId: 354,
    label: "Cam Lâm - Khánh Hòa",
    Category: Language.district
}, {
    value: "Cam Ranh - Khánh Hòa",
    StateId: 32,
    CityId: 355,
    label: "Cam Ranh - Khánh Hòa",
    Category: Language.district
}, {
    value: "Bình Ba - Cam Ranh - Khánh Hòa",
    StateId: 32,
    CityId: 355,
    label: "Bình Ba - Cam Ranh - Khánh Hòa",
    Category: Language.district
}, {
    value: "Diên Khánh - Khánh Hòa",
    StateId: 32,
    CityId: 356,
    label: "Diên Khánh - Khánh Hòa",
    Category: Language.district
}, {
    value: "Khánh Sơn - Khánh Hòa",
    StateId: 32,
    CityId: 357,
    label: "Khánh Sơn - Khánh Hòa",
    Category: Language.district
}, {
    value: "Khánh Vĩnh - Khánh Hòa",
    StateId: 32,
    CityId: 358,
    label: "Khánh Vĩnh - Khánh Hòa",
    Category: Language.district
}, {
    value: "Nha Trang - Khánh Hòa",
    StateId: 32,
    CityId: 359,
    label: "Nha Trang - Khánh Hòa",
    Category: Language.district
}, {
    value: "Ninh Hòa - Khánh Hòa",
    StateId: 32,
    CityId: 360,
    label: "Ninh Hòa - Khánh Hòa",
    Category: Language.district
}, {
    value: "Dốc Lết - Ninh Hòa - Khánh Hòa",
    StateId: 32,
    CityId: 360,
    label: "Dốc Lết - Ninh Hòa - Khánh Hòa",
    Category: Language.district
}, {
    value: "Ninh Diêm - Ninh Hòa - Khánh Hòa",
    StateId: 32,
    CityId: 360,
    label: "Ninh Diêm - Ninh Hòa - Khánh Hòa",
    Category: Language.district
}, {
    value: "Ninh Tịnh - Ninh Hòa - Khánh Hòa",
    StateId: 32,
    CityId: 360,
    label: "Ninh Tịnh - Ninh Hòa - Khánh Hòa",
    Category: Language.district
}, {
    value: "Trường Sa - Khánh Hòa",
    StateId: 32,
    CityId: 361,
    label: "Trường Sa - Khánh Hòa",
    Category: Language.district
}, {
    value: "Vạn Ninh - Khánh Hòa",
    StateId: 32,
    CityId: 362,
    label: "Vạn Ninh - Khánh Hòa",
    Category: Language.district
}, {
    value: "Tu Bông - Khánh Hòa",
    StateId: 32,
    CityId: 362,
    label: "Tu Bông - Khánh Hòa",
    Category: Language.district
}, {
    value: "Đầm Môn - Vạn Ninh - Khánh Hòa",
    StateId: 32,
    CityId: 362,
    label: "Đầm Môn - Vạn Ninh - Khánh Hòa",
    Category: Language.district
}, {
    value: "Điệp Sơn - Vạn Ninh - Khánh Hòa",
    StateId: 32,
    CityId: 362,
    label: "Điệp Sơn - Vạn Ninh - Khánh Hòa",
    Category: Language.district
}, {
    value: "Vịnh Vân Phong - Vạn Ninh - Khánh Hòa",
    StateId: 32,
    CityId: 362,
    label: "Vịnh Vân Phong - Vạn Ninh - Khánh Hòa",
    Category: Language.district
}, {
    value: "Vịnh Ninh Vân - Khánh Hòa",
    StateId: 32,
    CityId: 114251,
    label: "Vịnh Ninh Vân - Khánh Hòa",
    Category: Language.district
}, {
    value: "Vạn Giã - Khánh Hòa",
    StateId: 32,
    CityId: 362,
    label: "Vạn Giã - Khánh Hòa",
    Category: Language.district
}, {
    value: "An Biên - Kiên Giang",
    StateId: 33,
    CityId: 363,
    label: "An Biên - Kiên Giang",
    Category: Language.district
}, {
    value: "An Minh - Kiên Giang",
    StateId: 33,
    CityId: 364,
    label: "An Minh - Kiên Giang",
    Category: Language.district
}, {
    value: "Châu Thành - Kiên Giang",
    StateId: 33,
    CityId: 365,
    label: "Châu Thành - Kiên Giang",
    Category: Language.district
}, {
    value: "Giang Thành - Kiên Giang",
    StateId: 33,
    CityId: 366,
    label: "Giang Thành - Kiên Giang",
    Category: Language.district
}, {
    value: "Giồng Riềng - Kiên Giang",
    StateId: 33,
    CityId: 367,
    label: "Giồng Riềng - Kiên Giang",
    Category: Language.district
}, {
    value: "Gò Quao - Kiên Giang",
    StateId: 33,
    CityId: 368,
    label: "Gò Quao - Kiên Giang",
    Category: Language.district
}, {
    value: "Hà Tiên - Kiên Giang",
    StateId: 33,
    CityId: 369,
    label: "Hà Tiên - Kiên Giang",
    Category: Language.district
}, {
    value: "Hòn Đất - Kiên Giang",
    StateId: 33,
    CityId: 370,
    label: "Hòn Đất - Kiên Giang",
    Category: Language.district
}, {
    value: "Kiên Hải - Kiên Giang",
    StateId: 33,
    CityId: 371,
    label: "Kiên Hải - Kiên Giang",
    Category: Language.district
}, {
    value: "Kiên Lương - Kiên Giang",
    StateId: 33,
    CityId: 372,
    label: "Kiên Lương - Kiên Giang",
    Category: Language.district
}, {
    value: "Phú Quốc - Kiên Giang",
    StateId: 33,
    CityId: 373,
    label: "Phú Quốc - Kiên Giang",
    Category: Language.district
}, {
    value: "Rạch Giá - Kiên Giang",
    StateId: 33,
    CityId: 374,
    label: "Rạch Giá - Kiên Giang",
    Category: Language.district
}, {
    value: "Nam Du - Kiên Giang",
    StateId: 33,
    CityId: 374,
    label: "Nam Du - Kiên Giang",
    Category: Language.district
}, {
    value: "Tân Hiệp - Kiên Giang",
    StateId: 33,
    CityId: 375,
    label: "Tân Hiệp - Kiên Giang",
    Category: Language.district
}, {
    value: "U Minh Thượng - Kiên Giang",
    StateId: 33,
    CityId: 376,
    label: "U Minh Thượng - Kiên Giang",
    Category: Language.district
}, {
    value: "Vĩnh Thuận - Kiên Giang",
    StateId: 33,
    CityId: 377,
    label: "Vĩnh Thuận - Kiên Giang",
    Category: Language.district
}, {
    value: "Biển Mũi Nai - Kiên Giang",
    StateId: 33,
    CityId: 114246,
    label: "Biển Mũi Nai - Kiên Giang",
    Category: Language.district
}, {
    value: "Đắk Glei - Kon Tum",
    StateId: 34,
    CityId: 378,
    label: "Đắk Glei - Kon Tum",
    Category: Language.district
}, {
    value: "Đắk Hà - Kon Tum",
    StateId: 34,
    CityId: 379,
    label: "Đắk Hà - Kon Tum",
    Category: Language.district
}, {
    value: "Đăk Tô - Kon Tum",
    StateId: 34,
    CityId: 380,
    label: "Đăk Tô - Kon Tum",
    Category: Language.district
}, {
    value: "Kon Plông - Kon Tum",
    StateId: 34,
    CityId: 381,
    label: "Kon Plông - Kon Tum",
    Category: Language.district
}, {
    value: "Kon Rẫy - Kon Tum",
    StateId: 34,
    CityId: 382,
    label: "Kon Rẫy - Kon Tum",
    Category: Language.district
}, {
    value: "Kon Tum - Kon Tum",
    StateId: 34,
    CityId: 383,
    label: "Kon Tum - Kon Tum",
    Category: Language.district
}, {
    value: "Ngọc Hồi - Kon Tum",
    StateId: 34,
    CityId: 384,
    label: "Ngọc Hồi - Kon Tum",
    Category: Language.district
}, {
    value: "Sa Thầy - Kon Tum",
    StateId: 34,
    CityId: 385,
    label: "Sa Thầy - Kon Tum",
    Category: Language.district
}, {
    value: "Tu Mơ Rông - Kon Tum",
    StateId: 34,
    CityId: 386,
    label: "Tu Mơ Rông - Kon Tum",
    Category: Language.district
}, {
    value: "Lai Châu - Lai Châu",
    StateId: 35,
    CityId: 387,
    label: "Lai Châu - Lai Châu",
    Category: Language.district
}, {
    value: "Mường Tè - Lai Châu",
    StateId: 35,
    CityId: 388,
    label: "Mường Tè - Lai Châu",
    Category: Language.district
}, {
    value: "Nậm Nhùn - Lai Châu",
    StateId: 35,
    CityId: 389,
    label: "Nậm Nhùn - Lai Châu",
    Category: Language.district
}, {
    value: "Phong Thổ - Lai Châu",
    StateId: 35,
    CityId: 390,
    label: "Phong Thổ - Lai Châu",
    Category: Language.district
}, {
    value: "Sìn Hồ - Lai Châu",
    StateId: 35,
    CityId: 391,
    label: "Sìn Hồ - Lai Châu",
    Category: Language.district
}, {
    value: "Tam Đường - Lai Châu",
    StateId: 35,
    CityId: 392,
    label: "Tam Đường - Lai Châu",
    Category: Language.district
}, {
    value: "Tân Uyên - Lai Châu",
    StateId: 35,
    CityId: 393,
    label: "Tân Uyên - Lai Châu",
    Category: Language.district
}, {
    value: "Than Uyên - Lai Châu",
    StateId: 35,
    CityId: 394,
    label: "Than Uyên - Lai Châu",
    Category: Language.district
}, {
    value: "Bảo Lâm - Lâm Đồng",
    StateId: 36,
    CityId: 395,
    label: "Bảo Lâm - Lâm Đồng",
    Category: Language.district
}, {
    value: "Bảo Lộc - Lâm Đồng",
    StateId: 36,
    CityId: 396,
    label: "Bảo Lộc - Lâm Đồng",
    Category: Language.district
}, {
    value: "Cát Tiên - Lâm Đồng",
    StateId: 36,
    CityId: 397,
    label: "Cát Tiên - Lâm Đồng",
    Category: Language.district
}, {
    value: "Di Linh - Lâm Đồng",
    StateId: 36,
    CityId: 398,
    label: "Di Linh - Lâm Đồng",
    Category: Language.district
}, {
    value: "Đà Lạt - Lâm Đồng",
    StateId: 36,
    CityId: 399,
    label: "Đà Lạt - Lâm Đồng",
    Category: Language.district
}, {
    value: "Đạ Huoai - Lâm Đồng",
    StateId: 36,
    CityId: 400,
    label: "Đạ Huoai - Lâm Đồng",
    Category: Language.district
}, {
    value: "Đạ Tẻh - Lâm Đồng",
    StateId: 36,
    CityId: 401,
    label: "Đạ Tẻh - Lâm Đồng",
    Category: Language.district
}, {
    value: "Đam Rông - Lâm Đồng",
    StateId: 36,
    CityId: 402,
    label: "Đam Rông - Lâm Đồng",
    Category: Language.district
}, {
    value: "Đơn Dương - Lâm Đồng",
    StateId: 36,
    CityId: 403,
    label: "Đơn Dương - Lâm Đồng",
    Category: Language.district
}, {
    value: "Đức Trọng - Lâm Đồng",
    StateId: 36,
    CityId: 404,
    label: "Đức Trọng - Lâm Đồng",
    Category: Language.district
}, {
    value: "Lạc Dương - Lâm Đồng",
    StateId: 36,
    CityId: 405,
    label: "Lạc Dương - Lâm Đồng",
    Category: Language.district
}, {
    value: "Lâm Hà - Lâm Đồng",
    StateId: 36,
    CityId: 406,
    label: "Lâm Hà - Lâm Đồng",
    Category: Language.district
}, {
    value: "Bắc Sơn - Lạng Sơn",
    StateId: 37,
    CityId: 407,
    label: "Bắc Sơn - Lạng Sơn",
    Category: Language.district
}, {
    value: "Bình Gia - Lạng Sơn",
    StateId: 37,
    CityId: 408,
    label: "Bình Gia - Lạng Sơn",
    Category: Language.district
}, {
    value: "Cao Lộc - Lạng Sơn",
    StateId: 37,
    CityId: 409,
    label: "Cao Lộc - Lạng Sơn",
    Category: Language.district
}, {
    value: "Chi Lăng - Lạng Sơn",
    StateId: 37,
    CityId: 410,
    label: "Chi Lăng - Lạng Sơn",
    Category: Language.district
}, {
    value: "Đình Lập - Lạng Sơn",
    StateId: 37,
    CityId: 411,
    label: "Đình Lập - Lạng Sơn",
    Category: Language.district
}, {
    value: "Hữu Lũng - Lạng Sơn",
    StateId: 37,
    CityId: 412,
    label: "Hữu Lũng - Lạng Sơn",
    Category: Language.district
}, {
    value: "Lạng Sơn - Lạng Sơn",
    StateId: 37,
    CityId: 413,
    label: "Lạng Sơn - Lạng Sơn",
    Category: Language.district
}, {
    value: "Lộc Bình - Lạng Sơn",
    StateId: 37,
    CityId: 414,
    label: "Lộc Bình - Lạng Sơn",
    Category: Language.district
}, {
    value: "Tràng Định - Lạng Sơn",
    StateId: 37,
    CityId: 415,
    label: "Tràng Định - Lạng Sơn",
    Category: Language.district
}, {
    value: "Vãn Lãng - Lạng Sơn",
    StateId: 37,
    CityId: 416,
    label: "Vãn Lãng - Lạng Sơn",
    Category: Language.district
}, {
    value: "Văn Quan - Lạng Sơn",
    StateId: 37,
    CityId: 417,
    label: "Văn Quan - Lạng Sơn",
    Category: Language.district
}, {
    value: "Bảo Thắng - Lào Cai",
    StateId: 38,
    CityId: 418,
    label: "Bảo Thắng - Lào Cai",
    Category: Language.district
}, {
    value: "Bảo Yên - Lào Cai",
    StateId: 38,
    CityId: 419,
    label: "Bảo Yên - Lào Cai",
    Category: Language.district
}, {
    value: "Bát Xát - Lào Cai",
    StateId: 38,
    CityId: 420,
    label: "Bát Xát - Lào Cai",
    Category: Language.district
}, {
    value: "Bắc Hà - Lào Cai",
    StateId: 38,
    CityId: 421,
    label: "Bắc Hà - Lào Cai",
    Category: Language.district
}, {
    value: "Lào Cai - Lào Cai",
    StateId: 38,
    CityId: 422,
    label: "Lào Cai - Lào Cai",
    Category: Language.district
}, {
    value: "Mường Khương - Lào Cai",
    StateId: 38,
    CityId: 423,
    label: "Mường Khương - Lào Cai",
    Category: Language.district
}, {
    value: "Sa Pa - Lào Cai",
    StateId: 38,
    CityId: 424,
    label: "Sa Pa - Lào Cai",
    Category: Language.district
}, {
    value: "Si Ma Cai - Lào Cai",
    StateId: 38,
    CityId: 425,
    label: "Si Ma Cai - Lào Cai",
    Category: Language.district
}, {
    value: "Văn Bàn - Lào Cai",
    StateId: 38,
    CityId: 426,
    label: "Văn Bàn - Lào Cai",
    Category: Language.district
}, {
    value: "Bảo Hà - Lào Cai",
    StateId: 38,
    CityId: 114252,
    label: "Bảo Hà - Lào Cai",
    Category: Language.district
}, {
    value: "Bến Lức - Long An",
    StateId: 39,
    CityId: 427,
    label: "Bến Lức - Long An",
    Category: Language.district
}, {
    value: "Cần Đước - Long An",
    StateId: 39,
    CityId: 428,
    label: "Cần Đước - Long An",
    Category: Language.district
}, {
    value: "Cần Giuộc - Long An",
    StateId: 39,
    CityId: 429,
    label: "Cần Giuộc - Long An",
    Category: Language.district
}, {
    value: "Châu Thành - Long An",
    StateId: 39,
    CityId: 430,
    label: "Châu Thành - Long An",
    Category: Language.district
}, {
    value: "Đức Hòa - Long An",
    StateId: 39,
    CityId: 431,
    label: "Đức Hòa - Long An",
    Category: Language.district
}, {
    value: "Đức Huệ - Long An",
    StateId: 39,
    CityId: 432,
    label: "Đức Huệ - Long An",
    Category: Language.district
}, {
    value: "Kiến Tường - Long An",
    StateId: 39,
    CityId: 433,
    label: "Kiến Tường - Long An",
    Category: Language.district
}, {
    value: "Mộc Hóa - Long An",
    StateId: 39,
    CityId: 434,
    label: "Mộc Hóa - Long An",
    Category: Language.district
}, {
    value: "Tân An - Long An",
    StateId: 39,
    CityId: 435,
    label: "Tân An - Long An",
    Category: Language.district
}, {
    value: "Tân Hưng - Long An",
    StateId: 39,
    CityId: 436,
    label: "Tân Hưng - Long An",
    Category: Language.district
}, {
    value: "Tân Thạnh - Long An",
    StateId: 39,
    CityId: 437,
    label: "Tân Thạnh - Long An",
    Category: Language.district
}, {
    value: "Tân Trụ - Long An",
    StateId: 39,
    CityId: 438,
    label: "Tân Trụ - Long An",
    Category: Language.district
}, {
    value: "Thạnh Hóa - Long An",
    StateId: 39,
    CityId: 439,
    label: "Thạnh Hóa - Long An",
    Category: Language.district
}, {
    value: "Thủ Thừa - Long An",
    StateId: 39,
    CityId: 440,
    label: "Thủ Thừa - Long An",
    Category: Language.district
}, {
    value: "Vĩnh Hưng - Long An",
    StateId: 39,
    CityId: 441,
    label: "Vĩnh Hưng - Long An",
    Category: Language.district
}, {
    value: "Làng Nổi Tân Lập - Long An",
    StateId: 39,
    CityId: 114253,
    label: "Làng Nổi Tân Lập - Long An",
    Category: Language.district
}, {
    value: "Giao Thủy - Nam Định",
    StateId: 40,
    CityId: 442,
    label: "Giao Thủy - Nam Định",
    Category: Language.district
}, {
    value: "Hải Hậu - Nam Định",
    StateId: 40,
    CityId: 443,
    label: "Hải Hậu - Nam Định",
    Category: Language.district
}, {
    value: "Mỹ Lộc - Nam Định",
    StateId: 40,
    CityId: 444,
    label: "Mỹ Lộc - Nam Định",
    Category: Language.district
}, {
    value: "Nam Định - Nam Định",
    StateId: 40,
    CityId: 445,
    label: "Nam Định - Nam Định",
    Category: Language.district
}, {
    value: "Nam Trực - Nam Định",
    StateId: 40,
    CityId: 446,
    label: "Nam Trực - Nam Định",
    Category: Language.district
}, {
    value: "Nghĩa Hưng - Nam Định",
    StateId: 40,
    CityId: 447,
    label: "Nghĩa Hưng - Nam Định",
    Category: Language.district
}, {
    value: "Trực Ninh - Nam Định",
    StateId: 40,
    CityId: 448,
    label: "Trực Ninh - Nam Định",
    Category: Language.district
}, {
    value: "Vụ Bản - Nam Định",
    StateId: 40,
    CityId: 449,
    label: "Vụ Bản - Nam Định",
    Category: Language.district
}, {
    value: "Xuân Trường - Nam Định",
    StateId: 40,
    CityId: 450,
    label: "Xuân Trường - Nam Định",
    Category: Language.district
}, {
    value: "Ý Yên - Nam Định",
    StateId: 40,
    CityId: 451,
    label: "Ý Yên - Nam Định",
    Category: Language.district
}, {
    value: "Anh Sơn - Nghệ An",
    StateId: 41,
    CityId: 452,
    label: "Anh Sơn - Nghệ An",
    Category: Language.district
}, {
    value: "Con Cuông - Nghệ An",
    StateId: 41,
    CityId: 453,
    label: "Con Cuông - Nghệ An",
    Category: Language.district
}, {
    value: "Cửa Lò - Nghệ An",
    StateId: 41,
    CityId: 454,
    label: "Cửa Lò - Nghệ An",
    Category: Language.district
}, {
    value: "Diễn Châu - Nghệ An",
    StateId: 41,
    CityId: 455,
    label: "Diễn Châu - Nghệ An",
    Category: Language.district
}, {
    value: "Đô Lương - Nghệ An",
    StateId: 41,
    CityId: 456,
    label: "Đô Lương - Nghệ An",
    Category: Language.district
}, {
    value: "Hưng Nguyên - Nghệ An",
    StateId: 41,
    CityId: 457,
    label: "Hưng Nguyên - Nghệ An",
    Category: Language.district
}, {
    value: "Kỳ Sơn - Nghệ An",
    StateId: 41,
    CityId: 458,
    label: "Kỳ Sơn - Nghệ An",
    Category: Language.district
}, {
    value: "Nam Đàn - Nghệ An",
    StateId: 41,
    CityId: 459,
    label: "Nam Đàn - Nghệ An",
    Category: Language.district
}, {
    value: "Nghi Lộc - Nghệ An",
    StateId: 41,
    CityId: 460,
    label: "Nghi Lộc - Nghệ An",
    Category: Language.district
}, {
    value: "Nghĩa Đàn - Nghệ An",
    StateId: 41,
    CityId: 461,
    label: "Nghĩa Đàn - Nghệ An",
    Category: Language.district
}, {
    value: "Quế Phong - Nghệ An",
    StateId: 41,
    CityId: 462,
    label: "Quế Phong - Nghệ An",
    Category: Language.district
}, {
    value: "Quỳ Châu - Nghệ An",
    StateId: 41,
    CityId: 463,
    label: "Quỳ Châu - Nghệ An",
    Category: Language.district
}, {
    value: "Quỳ Hợp - Nghệ An",
    StateId: 41,
    CityId: 464,
    label: "Quỳ Hợp - Nghệ An",
    Category: Language.district
}, {
    value: "Quỳnh Lưu - Nghệ An",
    StateId: 41,
    CityId: 465,
    label: "Quỳnh Lưu - Nghệ An",
    Category: Language.district
}, {
    value: "Tân Kỳ - Nghệ An",
    StateId: 41,
    CityId: 466,
    label: "Tân Kỳ - Nghệ An",
    Category: Language.district
}, {
    value: "Thái Hòa - Nghệ An",
    StateId: 41,
    CityId: 467,
    label: "Thái Hòa - Nghệ An",
    Category: Language.district
}, {
    value: "Thanh Chương - Nghệ An",
    StateId: 41,
    CityId: 468,
    label: "Thanh Chương - Nghệ An",
    Category: Language.district
}, {
    value: "Tương Dương - Nghệ An",
    StateId: 41,
    CityId: 469,
    label: "Tương Dương - Nghệ An",
    Category: Language.district
}, {
    value: "Yên Thành - Nghệ An",
    StateId: 41,
    CityId: 471,
    label: "Yên Thành - Nghệ An",
    Category: Language.district
}, {
    value: "Tam Cốc - Ninh Bình",
    StateId: 42,
    CityId: 473,
    label: "Tam Cốc - Ninh Bình",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Tràng An - Ninh Bình",
    StateId: 42,
    CityId: 473,
    label: "Tràng An - Ninh Bình",
    Category: Language.StateCity,
    Region: 1
}, {
    value: "Gia Viễn - Ninh Bình",
    StateId: 42,
    CityId: 472,
    label: "Gia Viễn - Ninh Bình",
    Category: Language.district
}, {
    value: "Bái Đính - Ninh Bình",
    StateId: 42,
    CityId: 472,
    label: "Bái Đính - Ninh Bình",
    Category: Language.district
}, {
    value: "Kim Sơn - Ninh Bình",
    StateId: 42,
    CityId: 474,
    label: "Kim Sơn - Ninh Bình",
    Category: Language.district
}, {
    value: "Nho Quan - Ninh Bình",
    StateId: 42,
    CityId: 475,
    label: "Nho Quan - Ninh Bình",
    Category: Language.district
}, {
    value: "Ninh Bình - Ninh Bình",
    StateId: 42,
    CityId: 476,
    label: "Ninh Bình - Ninh Bình",
    Category: Language.district
}, {
    value: "Tam Điệp - Ninh Bình",
    StateId: 42,
    CityId: 477,
    label: "Tam Điệp - Ninh Bình",
    Category: Language.district
}, {
    value: "Yên Khánh - Ninh Bình",
    StateId: 42,
    CityId: 478,
    label: "Yên Khánh - Ninh Bình",
    Category: Language.district
}, {
    value: "Yên Mô - Ninh Bình",
    StateId: 42,
    CityId: 479,
    label: "Yên Mô - Ninh Bình",
    Category: Language.district
}, {
    value: "Tràng An - Bái Đính - Ninh Bình",
    StateId: 42,
    CityId: 114254,
    label: "Tràng An - Bái Đính - Ninh Bình",
    Category: Language.district
}, {
    value: "Tam Cốc Bích Động - Ninh Bình",
    StateId: 42,
    CityId: 114255,
    label: "Tam Cốc Bích Động - Ninh Bình",
    Category: Language.district
}, {
    value: "Bác Ái - Ninh Thuận",
    StateId: 43,
    CityId: 480,
    label: "Bác Ái - Ninh Thuận",
    Category: Language.district
}, {
    value: "Ninh Hải - Ninh Thuận",
    StateId: 43,
    CityId: 481,
    label: "Ninh Hải - Ninh Thuận",
    Category: Language.district
}, {
    value: "Bình Hưng - Ninh Hải - Ninh Thuận",
    StateId: 43,
    CityId: 481,
    label: "Bình Hưng - Ninh Hải - Ninh Thuận",
    Category: Language.district
}, {
    value: "Ninh Phước - Ninh Thuận",
    StateId: 43,
    CityId: 482,
    label: "Ninh Phước - Ninh Thuận",
    Category: Language.district
}, {
    value: "Ninh Sơn - Ninh Thuận",
    StateId: 43,
    CityId: 483,
    label: "Ninh Sơn - Ninh Thuận",
    Category: Language.district
}, {
    value: "Phan Rang-Tháp Chàm - Ninh Thuận",
    StateId: 43,
    CityId: 484,
    label: "Phan Rang-Tháp Chàm - Ninh Thuận",
    Category: Language.district
}, {
    value: "Thuận Bắc - Ninh Thuận",
    StateId: 43,
    CityId: 485,
    label: "Thuận Bắc - Ninh Thuận",
    Category: Language.district
}, {
    value: "Thuận Nam - Ninh Thuận",
    StateId: 43,
    CityId: 486,
    label: "Thuận Nam - Ninh Thuận",
    Category: Language.district
}, {
    value: "Ninh Chữ - Ninh Thuận",
    StateId: 43,
    CityId: 114256,
    label: "Ninh Chữ - Ninh Thuận",
    Category: Language.district
}, {
    value: "Vịnh Vĩnh Hy - Ninh Thuận",
    StateId: 43,
    CityId: 114257,
    label: "Vịnh Vĩnh Hy - Ninh Thuận",
    Category: Language.district
}, {
    value: "Cẩm Khê - Phú Thọ",
    StateId: 44,
    CityId: 487,
    label: "Cẩm Khê - Phú Thọ",
    Category: Language.district
}, {
    value: "Đoan Hùng - Phú Thọ",
    StateId: 44,
    CityId: 488,
    label: "Đoan Hùng - Phú Thọ",
    Category: Language.district
}, {
    value: "Hạ Hòa - Phú Thọ",
    StateId: 44,
    CityId: 489,
    label: "Hạ Hòa - Phú Thọ",
    Category: Language.district
}, {
    value: "Lâm Thao - Phú Thọ",
    StateId: 44,
    CityId: 490,
    label: "Lâm Thao - Phú Thọ",
    Category: Language.district
}, {
    value: "Phú Thọ - Phú Thọ",
    StateId: 44,
    CityId: 491,
    label: "Phú Thọ - Phú Thọ",
    Category: Language.district
}, {
    value: "Phù Ninh - Phú Thọ",
    StateId: 44,
    CityId: 492,
    label: "Phù Ninh - Phú Thọ",
    Category: Language.district
}, {
    value: "Tam Nông - Phú Thọ",
    StateId: 44,
    CityId: 493,
    label: "Tam Nông - Phú Thọ",
    Category: Language.district
}, {
    value: "Tân Sơn - Phú Thọ",
    StateId: 44,
    CityId: 494,
    label: "Tân Sơn - Phú Thọ",
    Category: Language.district
}, {
    value: "Thanh Ba - Phú Thọ",
    StateId: 44,
    CityId: 495,
    label: "Thanh Ba - Phú Thọ",
    Category: Language.district
}, {
    value: "Thanh Sơn - Phú Thọ",
    StateId: 44,
    CityId: 496,
    label: "Thanh Sơn - Phú Thọ",
    Category: Language.district
}, {
    value: "Thanh Thủy - Phú Thọ",
    StateId: 44,
    CityId: 497,
    label: "Thanh Thủy - Phú Thọ",
    Category: Language.district
}, {
    value: "Việt Trì - Phú Thọ",
    StateId: 44,
    CityId: 498,
    label: "Việt Trì - Phú Thọ",
    Category: Language.district
}, {
    value: "Yên Lập - Phú Thọ",
    StateId: 44,
    CityId: 499,
    label: "Yên Lập - Phú Thọ",
    Category: Language.district
}, {
    value: "Đông Hòa - Phú Yên",
    StateId: 45,
    CityId: 500,
    label: "Đông Hòa - Phú Yên",
    Category: Language.district
}, {
    value: "Đồng Xuân - Phú Yên",
    StateId: 45,
    CityId: 501,
    label: "Đồng Xuân - Phú Yên",
    Category: Language.district
}, {
    value: "Phú Hòa - Phú Yên",
    StateId: 45,
    CityId: 502,
    label: "Phú Hòa - Phú Yên",
    Category: Language.district
}, {
    value: "Sông Cầu - Phú Yên",
    StateId: 45,
    CityId: 503,
    label: "Sông Cầu - Phú Yên",
    Category: Language.district
}, {
    value: "Sông Hinh - Phú Yên",
    StateId: 45,
    CityId: 504,
    label: "Sông Hinh - Phú Yên",
    Category: Language.district
}, {
    value: "Sơn Hòa - Phú Yên",
    StateId: 45,
    CityId: 505,
    label: "Sơn Hòa - Phú Yên",
    Category: Language.district
}, {
    value: "Tây Hòa - Phú Yên",
    StateId: 45,
    CityId: 506,
    label: "Tây Hòa - Phú Yên",
    Category: Language.district
}, {
    value: "Tuy An - Phú Yên",
    StateId: 45,
    CityId: 507,
    label: "Tuy An - Phú Yên",
    Category: Language.district
}, {
    value: "Tuy Hòa - Phú Yên",
    StateId: 45,
    CityId: 508,
    label: "Tuy Hòa - Phú Yên",
    Category: Language.district
}, {
    value: "Ghềnh Đá Dĩa - Phú Yên",
    StateId: 45,
    CityId: 114258,
    label: "Ghềnh Đá Dĩa - Phú Yên",
    Category: Language.district
}, {
    value: "Vịnh Xuân Đài - Phú Yên",
    StateId: 45,
    CityId: 114259,
    label: "Vịnh Xuân Đài - Phú Yên",
    Category: Language.district
}, {
    value: "Đầm Ô Loan - Phú Yên",
    StateId: 45,
    CityId: 114260,
    label: "Đầm Ô Loan - Phú Yên",
    Category: Language.district
}, {
    value: "Vũng Rô - Phú Yên",
    StateId: 45,
    CityId: 117412,
    label: "Vũng Rô - Phú Yên",
    Category: Language.district
}, {
    value: "Bố Trạch - Quảng Bình",
    StateId: 46,
    CityId: 509,
    label: "Bố Trạch - Quảng Bình",
    Category: Language.district
}, {
    value: "Đồng Hới - Quảng Bình",
    StateId: 46,
    CityId: 510,
    label: "Đồng Hới - Quảng Bình",
    Category: Language.district
}, {
    value: "Lệ Thủy - Quảng Bình",
    StateId: 46,
    CityId: 511,
    label: "Lệ Thủy - Quảng Bình",
    Category: Language.district
}, {
    value: "Minh Hóa - Quảng Bình",
    StateId: 46,
    CityId: 512,
    label: "Minh Hóa - Quảng Bình",
    Category: Language.district
}, {
    value: "Quảng Ninh - Quảng Bình",
    StateId: 46,
    CityId: 513,
    label: "Quảng Ninh - Quảng Bình",
    Category: Language.district
}, {
    value: "Quảng Trạch - Quảng Bình",
    StateId: 46,
    CityId: 514,
    label: "Quảng Trạch - Quảng Bình",
    Category: Language.district
}, {
    value: "Tuyên Hóa - Quảng Bình",
    StateId: 46,
    CityId: 515,
    label: "Tuyên Hóa - Quảng Bình",
    Category: Language.district
}, {
    value: "Phong Nha - Quảng Bình",
    StateId: 46,
    CityId: 114261,
    label: "Phong Nha - Quảng Bình",
    Category: Language.district
}, {
    value: "Bắc Trà My - Quảng Nam",
    StateId: 47,
    CityId: 516,
    label: "Bắc Trà My - Quảng Nam",
    Category: Language.district
}, {
    value: "Duy Xuyên - Quảng Nam",
    StateId: 47,
    CityId: 517,
    label: "Duy Xuyên - Quảng Nam",
    Category: Language.district
}, {
    value: "Đại Lộc - Quảng Nam",
    StateId: 47,
    CityId: 518,
    label: "Đại Lộc - Quảng Nam",
    Category: Language.district
}, {
    value: "Điện Bàn - Quảng Nam",
    StateId: 47,
    CityId: 519,
    label: "Điện Bàn - Quảng Nam",
    Category: Language.district
}, {
    value: "Đông Giang - Quảng Nam",
    StateId: 47,
    CityId: 520,
    label: "Đông Giang - Quảng Nam",
    Category: Language.district
}, {
    value: "Hiệp Đức - Quảng Nam",
    StateId: 47,
    CityId: 521,
    label: "Hiệp Đức - Quảng Nam",
    Category: Language.district
}, {
    value: "Hội An - Quảng Nam",
    StateId: 47,
    CityId: 522,
    label: "Hội An - Quảng Nam",
    Category: Language.district
}, {
    value: "Nam Giang - Quảng Nam",
    StateId: 47,
    CityId: 523,
    label: "Nam Giang - Quảng Nam",
    Category: Language.district
}, {
    value: "Nam Trà My - Quảng Nam",
    StateId: 47,
    CityId: 524,
    label: "Nam Trà My - Quảng Nam",
    Category: Language.district
}, {
    value: "Nông Sơn - Quảng Nam",
    StateId: 47,
    CityId: 525,
    label: "Nông Sơn - Quảng Nam",
    Category: Language.district
}, {
    value: "Núi Thành - Quảng Nam",
    StateId: 47,
    CityId: 526,
    label: "Núi Thành - Quảng Nam",
    Category: Language.district
}, {
    value: "Phú Ninh - Quảng Nam",
    StateId: 47,
    CityId: 527,
    label: "Phú Ninh - Quảng Nam",
    Category: Language.district
}, {
    value: "Phước Sơn - Quảng Nam",
    StateId: 47,
    CityId: 528,
    label: "Phước Sơn - Quảng Nam",
    Category: Language.district
}, {
    value: "Quế Sơn - Quảng Nam",
    StateId: 47,
    CityId: 529,
    label: "Quế Sơn - Quảng Nam",
    Category: Language.district
}, {
    value: "Tam Kỳ - Quảng Nam",
    StateId: 47,
    CityId: 530,
    label: "Tam Kỳ - Quảng Nam",
    Category: Language.district
}, {
    value: "Tây Giang - Quảng Nam",
    StateId: 47,
    CityId: 531,
    label: "Tây Giang - Quảng Nam",
    Category: Language.district
}, {
    value: "Thăng Bình - Quảng Nam",
    StateId: 47,
    CityId: 532,
    label: "Thăng Bình - Quảng Nam",
    Category: Language.district
}, {
    value: "Tiên Phước - Quảng Nam",
    StateId: 47,
    CityId: 533,
    label: "Tiên Phước - Quảng Nam",
    Category: Language.district
}, {
    value: "Ba Tơ - Quảng Ngãi",
    StateId: 48,
    CityId: 534,
    label: "Ba Tơ - Quảng Ngãi",
    Category: Language.district
}, {
    value: "Bình Sơn - Quảng Ngãi",
    StateId: 48,
    CityId: 535,
    label: "Bình Sơn - Quảng Ngãi",
    Category: Language.district
}, {
    value: "Đức Phổ - Quảng Ngãi",
    StateId: 48,
    CityId: 536,
    label: "Đức Phổ - Quảng Ngãi",
    Category: Language.district
}, {
    value: "Lý Sơn - Quảng Ngãi",
    StateId: 48,
    CityId: 537,
    label: "Lý Sơn - Quảng Ngãi",
    Category: Language.district
}, {
    value: "Minh Long - Quảng Ngãi",
    StateId: 48,
    CityId: 538,
    label: "Minh Long - Quảng Ngãi",
    Category: Language.district
}, {
    value: "Mộ Đức - Quảng Ngãi",
    StateId: 48,
    CityId: 539,
    label: "Mộ Đức - Quảng Ngãi",
    Category: Language.district
}, {
    value: "Nghĩa Hành - Quảng Ngãi",
    StateId: 48,
    CityId: 540,
    label: "Nghĩa Hành - Quảng Ngãi",
    Category: Language.district
}, {
    value: "Quảng Ngãi - Quảng Ngãi",
    StateId: 48,
    CityId: 541,
    label: "Quảng Ngãi - Quảng Ngãi",
    Category: Language.district
}, {
    value: "Sơn Hà - Quảng Ngãi",
    StateId: 48,
    CityId: 542,
    label: "Sơn Hà - Quảng Ngãi",
    Category: Language.district
}, {
    value: "Sơn Tây - Quảng Ngãi",
    StateId: 48,
    CityId: 543,
    label: "Sơn Tây - Quảng Ngãi",
    Category: Language.district
}, {
    value: "Sơn Tịnh - Quảng Ngãi",
    StateId: 48,
    CityId: 544,
    label: "Sơn Tịnh - Quảng Ngãi",
    Category: Language.district
}, {
    value: "Tây Trà - Quảng Ngãi",
    StateId: 48,
    CityId: 545,
    label: "Tây Trà - Quảng Ngãi",
    Category: Language.district
}, {
    value: "Trà Bồng - Quảng Ngãi",
    StateId: 48,
    CityId: 546,
    label: "Trà Bồng - Quảng Ngãi",
    Category: Language.district
}, {
    value: "Tư Nghĩa - Quảng Ngãi",
    StateId: 48,
    CityId: 547,
    label: "Tư Nghĩa - Quảng Ngãi",
    Category: Language.district
}, {
    value: "Ba Chẽ - Quảng Ninh",
    StateId: 49,
    CityId: 548,
    label: "Ba Chẽ - Quảng Ninh",
    Category: Language.district
}, {
    value: "Bình Liêu - Quảng Ninh",
    StateId: 49,
    CityId: 549,
    label: "Bình Liêu - Quảng Ninh",
    Category: Language.district
}, {
    value: "Cẩm Phả - Quảng Ninh",
    StateId: 49,
    CityId: 550,
    label: "Cẩm Phả - Quảng Ninh",
    Category: Language.district
}, {
    value: "Cô Tô - Quảng Ninh",
    StateId: 49,
    CityId: 551,
    label: "Cô Tô - Quảng Ninh",
    Category: Language.district
}, {
    value: "Đầm Hà - Quảng Ninh",
    StateId: 49,
    CityId: 552,
    label: "Đầm Hà - Quảng Ninh",
    Category: Language.district
}, {
    value: "Đông Triều - Quảng Ninh",
    StateId: 49,
    CityId: 553,
    label: "Đông Triều - Quảng Ninh",
    Category: Language.district
}, {
    value: "Hạ Long - Quảng Ninh",
    StateId: 49,
    CityId: 554,
    label: "Hạ Long - Quảng Ninh",
    Category: Language.district
}, {
    value: "Hải Hà - Quảng Ninh",
    StateId: 49,
    CityId: 555,
    label: "Hải Hà - Quảng Ninh",
    Category: Language.district
}, {
    value: "Hoành Bồ - Quảng Ninh",
    StateId: 49,
    CityId: 556,
    label: "Hoành Bồ - Quảng Ninh",
    Category: Language.district
}, {
    value: "Móng Cái - Quảng Ninh",
    StateId: 49,
    CityId: 557,
    label: "Móng Cái - Quảng Ninh",
    Category: Language.district
}, {
    value: "Quảng Yên - Quảng Ninh",
    StateId: 49,
    CityId: 558,
    label: "Quảng Yên - Quảng Ninh",
    Category: Language.district
}, {
    value: "Tiên Yên - Quảng Ninh",
    StateId: 49,
    CityId: 559,
    label: "Tiên Yên - Quảng Ninh",
    Category: Language.district
}, {
    value: "Uông Bí - Quảng Ninh",
    StateId: 49,
    CityId: 560,
    label: "Uông Bí - Quảng Ninh",
    Category: Language.district
}, {
    value: "Vân Đồn - Quảng Ninh",
    StateId: 49,
    CityId: 561,
    label: "Vân Đồn - Quảng Ninh",
    Category: Language.district
}, {
    value: "Cái Rồng - Quảng Ninh",
    StateId: 49,
    CityId: 561,
    label: "Cái Rồng - Quảng Ninh",
    Category: Language.district
}, {
    value: "Cam Lộ - Quảng Trị",
    StateId: 50,
    CityId: 562,
    label: "Cam Lộ - Quảng Trị",
    Category: Language.district
}, {
    value: "Cồn Cỏ - Quảng Trị",
    StateId: 50,
    CityId: 563,
    label: "Cồn Cỏ - Quảng Trị",
    Category: Language.district
}, {
    value: "Đa Krông - Quảng Trị",
    StateId: 50,
    CityId: 564,
    label: "Đa Krông - Quảng Trị",
    Category: Language.district
}, {
    value: "Đông Hà - Quảng Trị",
    StateId: 50,
    CityId: 565,
    label: "Đông Hà - Quảng Trị",
    Category: Language.district
}, {
    value: "Gio Linh - Quảng Trị",
    StateId: 50,
    CityId: 566,
    label: "Gio Linh - Quảng Trị",
    Category: Language.district
}, {
    value: "Hải Lăng - Quảng Trị",
    StateId: 50,
    CityId: 567,
    label: "Hải Lăng - Quảng Trị",
    Category: Language.district
}, {
    value: "Hướng Hóa - Quảng Trị",
    StateId: 50,
    CityId: 568,
    label: "Hướng Hóa - Quảng Trị",
    Category: Language.district
}, {
    value: "Quảng Trị - Quảng Trị",
    StateId: 50,
    CityId: 569,
    label: "Quảng Trị - Quảng Trị",
    Category: Language.district
}, {
    value: "Triệu Phong - Quảng Trị",
    StateId: 50,
    CityId: 570,
    label: "Triệu Phong - Quảng Trị",
    Category: Language.district
}, {
    value: "Vĩnh Linh - Quảng Trị",
    StateId: 50,
    CityId: 571,
    label: "Vĩnh Linh - Quảng Trị",
    Category: Language.district
}, {
    value: "Châu Thành - Sóc Trăng",
    StateId: 51,
    CityId: 572,
    label: "Châu Thành - Sóc Trăng",
    Category: Language.district
}, {
    value: "Cù Lao Dung - Sóc Trăng",
    StateId: 51,
    CityId: 573,
    label: "Cù Lao Dung - Sóc Trăng",
    Category: Language.district
}, {
    value: "Kế Sách - Sóc Trăng",
    StateId: 51,
    CityId: 574,
    label: "Kế Sách - Sóc Trăng",
    Category: Language.district
}, {
    value: "Long Phú - Sóc Trăng",
    StateId: 51,
    CityId: 575,
    label: "Long Phú - Sóc Trăng",
    Category: Language.district
}, {
    value: "Mỹ Tú - Sóc Trăng",
    StateId: 51,
    CityId: 576,
    label: "Mỹ Tú - Sóc Trăng",
    Category: Language.district
}, {
    value: "Mỹ Xuyên - Sóc Trăng",
    StateId: 51,
    CityId: 577,
    label: "Mỹ Xuyên - Sóc Trăng",
    Category: Language.district
}, {
    value: "Ngã Năm - Sóc Trăng",
    StateId: 51,
    CityId: 578,
    label: "Ngã Năm - Sóc Trăng",
    Category: Language.district
}, {
    value: "Sóc Trăng - Sóc Trăng",
    StateId: 51,
    CityId: 579,
    label: "Sóc Trăng - Sóc Trăng",
    Category: Language.district
}, {
    value: "Thạnh Trị - Sóc Trăng",
    StateId: 51,
    CityId: 580,
    label: "Thạnh Trị - Sóc Trăng",
    Category: Language.district
}, {
    value: "Trần Đề - Sóc Trăng",
    StateId: 51,
    CityId: 581,
    label: "Trần Đề - Sóc Trăng",
    Category: Language.district
}, {
    value: "Vĩnh Châu - Sóc Trăng",
    StateId: 51,
    CityId: 582,
    label: "Vĩnh Châu - Sóc Trăng",
    Category: Language.district
}, {
    value: "Bắc Yên - Sơn La",
    StateId: 52,
    CityId: 583,
    label: "Bắc Yên - Sơn La",
    Category: Language.district
}, {
    value: "Mai Sơn - Sơn La",
    StateId: 52,
    CityId: 584,
    label: "Mai Sơn - Sơn La",
    Category: Language.district
}, {
    value: "Mộc Châu - Sơn La",
    StateId: 52,
    CityId: 585,
    label: "Mộc Châu - Sơn La",
    Category: Language.district
}, {
    value: "Mường La - Sơn La",
    StateId: 52,
    CityId: 586,
    label: "Mường La - Sơn La",
    Category: Language.district
}, {
    value: "Phù Yên - Sơn La",
    StateId: 52,
    CityId: 587,
    label: "Phù Yên - Sơn La",
    Category: Language.district
}, {
    value: "Quỳnh Nhai - Sơn La",
    StateId: 52,
    CityId: 588,
    label: "Quỳnh Nhai - Sơn La",
    Category: Language.district
}, {
    value: "Sông Mã - Sơn La",
    StateId: 52,
    CityId: 589,
    label: "Sông Mã - Sơn La",
    Category: Language.district
}, {
    value: "Sốp Cộp - Sơn La",
    StateId: 52,
    CityId: 590,
    label: "Sốp Cộp - Sơn La",
    Category: Language.district
}, {
    value: "Sơn La - Sơn La",
    StateId: 52,
    CityId: 591,
    label: "Sơn La - Sơn La",
    Category: Language.district
}, {
    value: "Thuận Châu - Sơn La",
    StateId: 52,
    CityId: 592,
    label: "Thuận Châu - Sơn La",
    Category: Language.district
}, {
    value: "Yên Châu - Sơn La",
    StateId: 52,
    CityId: 593,
    label: "Yên Châu - Sơn La",
    Category: Language.district
}, {
    value: "Bến Cầu - Tây Ninh",
    StateId: 53,
    CityId: 594,
    label: "Bến Cầu - Tây Ninh",
    Category: Language.district
}, {
    value: "Châu Thành - Tây Ninh",
    StateId: 53,
    CityId: 595,
    label: "Châu Thành - Tây Ninh",
    Category: Language.district
}, {
    value: "Dương Minh Châu - Tây Ninh",
    StateId: 53,
    CityId: 596,
    label: "Dương Minh Châu - Tây Ninh",
    Category: Language.district
}, {
    value: "Gò Dầu - Tây Ninh",
    StateId: 53,
    CityId: 597,
    label: "Gò Dầu - Tây Ninh",
    Category: Language.district
}, {
    value: "Hòa Thành - Tây Ninh",
    StateId: 53,
    CityId: 598,
    label: "Hòa Thành - Tây Ninh",
    Category: Language.district
}, {
    value: "Tân Biên - Tây Ninh",
    StateId: 53,
    CityId: 599,
    label: "Tân Biên - Tây Ninh",
    Category: Language.district
}, {
    value: "Tân Châu - Tây Ninh",
    StateId: 53,
    CityId: 600,
    label: "Tân Châu - Tây Ninh",
    Category: Language.district
}, {
    value: "Tây Ninh - Tây Ninh",
    StateId: 53,
    CityId: 601,
    label: "Tây Ninh - Tây Ninh",
    Category: Language.district
}, {
    value: "Trảng Bàng - Tây Ninh",
    StateId: 53,
    CityId: 602,
    label: "Trảng Bàng - Tây Ninh",
    Category: Language.district
}, {
    value: "Núi Bà Đen - Tây Ninh",
    StateId: 53,
    CityId: 114262,
    label: "Núi Bà Đen - Tây Ninh",
    Category: Language.district
}, {
    value: "Đông Hưng - Thái Bình",
    StateId: 54,
    CityId: 603,
    label: "Đông Hưng - Thái Bình",
    Category: Language.district
}, {
    value: "Hưng Hà - Thái Bình",
    StateId: 54,
    CityId: 604,
    label: "Hưng Hà - Thái Bình",
    Category: Language.district
}, {
    value: "Kiến Xương - Thái Bình",
    StateId: 54,
    CityId: 605,
    label: "Kiến Xương - Thái Bình",
    Category: Language.district
}, {
    value: "Quỳnh Phụ - Thái Bình",
    StateId: 54,
    CityId: 606,
    label: "Quỳnh Phụ - Thái Bình",
    Category: Language.district
}, {
    value: "Thái Bình - Thái Bình",
    StateId: 54,
    CityId: 607,
    label: "Thái Bình - Thái Bình",
    Category: Language.district
}, {
    value: "Thái Thụy - Thái Bình",
    StateId: 54,
    CityId: 608,
    label: "Thái Thụy - Thái Bình",
    Category: Language.district
}, {
    value: "Tiền Hải - Thái Bình",
    StateId: 54,
    CityId: 609,
    label: "Tiền Hải - Thái Bình",
    Category: Language.district
}, {
    value: "Vũ Thư - Thái Bình",
    StateId: 54,
    CityId: 610,
    label: "Vũ Thư - Thái Bình",
    Category: Language.district
}, {
    value: "Đại Từ - Thái Nguyên",
    StateId: 55,
    CityId: 611,
    label: "Đại Từ - Thái Nguyên",
    Category: Language.district
}, {
    value: "Định Hóa - Thái Nguyên",
    StateId: 55,
    CityId: 612,
    label: "Định Hóa - Thái Nguyên",
    Category: Language.district
}, {
    value: "Đồng Hỷ - Thái Nguyên",
    StateId: 55,
    CityId: 613,
    label: "Đồng Hỷ - Thái Nguyên",
    Category: Language.district
}, {
    value: "Phổ Yên - Thái Nguyên",
    StateId: 55,
    CityId: 614,
    label: "Phổ Yên - Thái Nguyên",
    Category: Language.district
}, {
    value: "Phú Bình - Thái Nguyên",
    StateId: 55,
    CityId: 615,
    label: "Phú Bình - Thái Nguyên",
    Category: Language.district
}, {
    value: "Phú Lương - Thái Nguyên",
    StateId: 55,
    CityId: 616,
    label: "Phú Lương - Thái Nguyên",
    Category: Language.district
}, {
    value: "Sông Công - Thái Nguyên",
    StateId: 55,
    CityId: 617,
    label: "Sông Công - Thái Nguyên",
    Category: Language.district
}, {
    value: "Thái Nguyên - Thái Nguyên",
    StateId: 55,
    CityId: 618,
    label: "Thái Nguyên - Thái Nguyên",
    Category: Language.district
}, {
    value: "Võ Nhai - Thái Nguyên",
    StateId: 55,
    CityId: 619,
    label: "Võ Nhai - Thái Nguyên",
    Category: Language.district
}, {
    value: "Bá Thước - Thanh Hóa",
    StateId: 56,
    CityId: 620,
    label: "Bá Thước - Thanh Hóa",
    Category: Language.district
}, {
    value: "Bỉm Sơn - Thanh Hóa",
    StateId: 56,
    CityId: 621,
    label: "Bỉm Sơn - Thanh Hóa",
    Category: Language.district
}, {
    value: "Cẩm Thủy - Thanh Hóa",
    StateId: 56,
    CityId: 622,
    label: "Cẩm Thủy - Thanh Hóa",
    Category: Language.district
}, {
    value: "Đông Sơn - Thanh Hóa",
    StateId: 56,
    CityId: 623,
    label: "Đông Sơn - Thanh Hóa",
    Category: Language.district
}, {
    value: "Hà Trung - Thanh Hóa",
    StateId: 56,
    CityId: 624,
    label: "Hà Trung - Thanh Hóa",
    Category: Language.district
}, {
    value: "Hậu Lộc - Thanh Hóa",
    StateId: 56,
    CityId: 625,
    label: "Hậu Lộc - Thanh Hóa",
    Category: Language.district
}, {
    value: "Hoằng Hóa - Thanh Hóa",
    StateId: 56,
    CityId: 626,
    label: "Hoằng Hóa - Thanh Hóa",
    Category: Language.district
}, {
    value: "Lang Chánh - Thanh Hóa",
    StateId: 56,
    CityId: 627,
    label: "Lang Chánh - Thanh Hóa",
    Category: Language.district
}, {
    value: "Mường Lát - Thanh Hóa",
    StateId: 56,
    CityId: 628,
    label: "Mường Lát - Thanh Hóa",
    Category: Language.district
}, {
    value: "Nga Sơn - Thanh Hóa",
    StateId: 56,
    CityId: 629,
    label: "Nga Sơn - Thanh Hóa",
    Category: Language.district
}, {
    value: "Ngọc Lặc - Thanh Hóa",
    StateId: 56,
    CityId: 630,
    label: "Ngọc Lặc - Thanh Hóa",
    Category: Language.district
}, {
    value: "Như Thanh - Thanh Hóa",
    StateId: 56,
    CityId: 631,
    label: "Như Thanh - Thanh Hóa",
    Category: Language.district
}, {
    value: "Như Xuân - Thanh Hóa",
    StateId: 56,
    CityId: 632,
    label: "Như Xuân - Thanh Hóa",
    Category: Language.district
}, {
    value: "Nhân Cơ - Đăk R'Lấp",
    StateId: 17,
    CityId: 159,
    label: "Nhân Cơ - Đăk R'Lấp",
    Category: Language.district,
    Region: 3
}, {
    value: "Nông Cống - Thanh Hóa",
    StateId: 56,
    CityId: 633,
    label: "Nông Cống - Thanh Hóa",
    Category: Language.district
}, {
    value: "Quan Hóa - Thanh Hóa",
    StateId: 56,
    CityId: 634,
    label: "Quan Hóa - Thanh Hóa",
    Category: Language.district
}, {
    value: "Quan Sơn - Thanh Hóa",
    StateId: 56,
    CityId: 635,
    label: "Quan Sơn - Thanh Hóa",
    Category: Language.district
}, {
    value: "Quảng Xương - Thanh Hóa",
    StateId: 56,
    CityId: 636,
    label: "Quảng Xương - Thanh Hóa",
    Category: Language.district
}, {
    value: "Sầm Sơn - Thanh Hóa",
    StateId: 56,
    CityId: 637,
    label: "Sầm Sơn - Thanh Hóa",
    Category: Language.district
}, {
    value: "Thạch Thành - Thanh Hóa",
    StateId: 56,
    CityId: 638,
    label: "Thạch Thành - Thanh Hóa",
    Category: Language.district
}, {
    value: "Thanh Hóa - Thanh Hóa",
    StateId: 56,
    CityId: 639,
    label: "Thanh Hóa - Thanh Hóa",
    Category: Language.district
}, {
    value: "Thiệu Hóa - Thanh Hóa",
    StateId: 56,
    CityId: 640,
    label: "Thiệu Hóa - Thanh Hóa",
    Category: Language.district
}, {
    value: "Thọ Xuân - Thanh Hóa",
    StateId: 56,
    CityId: 641,
    label: "Thọ Xuân - Thanh Hóa",
    Category: Language.district
}, {
    value: "Thường Xuân - Thanh Hóa",
    StateId: 56,
    CityId: 642,
    label: "Thường Xuân - Thanh Hóa",
    Category: Language.district
}, {
    value: "Tĩnh Gia - Thanh Hóa",
    StateId: 56,
    CityId: 643,
    label: "Tĩnh Gia - Thanh Hóa",
    Category: Language.district
}, {
    value: "Triệu Sơn - Thanh Hóa",
    StateId: 56,
    CityId: 644,
    label: "Triệu Sơn - Thanh Hóa",
    Category: Language.district
}, {
    value: "Vĩnh Lộc - Thanh Hóa",
    StateId: 56,
    CityId: 645,
    label: "Vĩnh Lộc - Thanh Hóa",
    Category: Language.district
}, {
    value: "Yên Định - Thanh Hóa",
    StateId: 56,
    CityId: 646,
    label: "Yên Định - Thanh Hóa",
    Category: Language.district
}, {
    value: "Huế - Thừa Thiên-Huế",
    StateId: 57,
    CityId: 647,
    label: "Huế - Thừa Thiên-Huế",
    Category: Language.district
}, {
    value: "Hương Thủy - Thừa Thiên-Huế",
    StateId: 57,
    CityId: 648,
    label: "Hương Thủy - Thừa Thiên-Huế",
    Category: Language.district
}, {
    value: "Hương Trà - Thừa Thiên-Huế",
    StateId: 57,
    CityId: 649,
    label: "Hương Trà - Thừa Thiên-Huế",
    Category: Language.district
}, {
    value: "Nam Đông - Thừa Thiên-Huế",
    StateId: 57,
    CityId: 650,
    label: "Nam Đông - Thừa Thiên-Huế",
    Category: Language.district
}, {
    value: "A Lưới - Thừa Thiên-Huế",
    StateId: 57,
    CityId: 651,
    label: "A Lưới - Thừa Thiên-Huế",
    Category: Language.district
}, {
    value: "Phong Điền - Thừa Thiên-Huế",
    StateId: 57,
    CityId: 652,
    label: "Phong Điền - Thừa Thiên-Huế",
    Category: Language.district
}, {
    value: "Phú Lộc - Thừa Thiên-Huế",
    StateId: 57,
    CityId: 653,
    label: "Phú Lộc - Thừa Thiên-Huế",
    Category: Language.district
}, {
    value: "Phú Vang - Thừa Thiên-Huế",
    StateId: 57,
    CityId: 654,
    label: "Phú Vang - Thừa Thiên-Huế",
    Category: Language.district
}, {
    value: "Quảng Điền - Thừa Thiên-Huế",
    StateId: 57,
    CityId: 655,
    label: "Quảng Điền - Thừa Thiên-Huế",
    Category: Language.district
}, {
    value: "Vịnh Lăng Cô - Thừa Thiên-Huế",
    StateId: 57,
    CityId: 114250,
    label: "Vịnh Lăng Cô - Thừa Thiên-Huế",
    Category: Language.district
}, {
    value: "Cai Lậy - Tiền Giang",
    StateId: 58,
    CityId: 656,
    label: "Cai Lậy - Tiền Giang",
    Category: Language.district
}, {
    value: "Cái Bè - Tiền Giang",
    StateId: 58,
    CityId: 657,
    label: "Cái Bè - Tiền Giang",
    Category: Language.district
}, {
    value: "Châu Thành - Tiền Giang",
    StateId: 58,
    CityId: 658,
    label: "Châu Thành - Tiền Giang",
    Category: Language.district
}, {
    value: "Chợ Gạo - Tiền Giang",
    StateId: 58,
    CityId: 659,
    label: "Chợ Gạo - Tiền Giang",
    Category: Language.district
}, {
    value: "Gò Công - Tiền Giang",
    StateId: 58,
    CityId: 660,
    label: "Gò Công - Tiền Giang",
    Category: Language.district
}, {
    value: "Gò Công Đông - Tiền Giang",
    StateId: 58,
    CityId: 661,
    label: "Gò Công Đông - Tiền Giang",
    Category: Language.district
}, {
    value: "Gò Công Tây - Tiền Giang",
    StateId: 58,
    CityId: 662,
    label: "Gò Công Tây - Tiền Giang",
    Category: Language.district
}, {
    value: "Mỹ Tho - Tiền Giang",
    StateId: 58,
    CityId: 663,
    label: "Mỹ Tho - Tiền Giang",
    Category: Language.district
}, {
    value: "Tân Phú Đông - Tiền Giang",
    StateId: 58,
    CityId: 664,
    label: "Tân Phú Đông - Tiền Giang",
    Category: Language.district
}, {
    value: "Tân Phước - Tiền Giang",
    StateId: 58,
    CityId: 665,
    label: "Tân Phước - Tiền Giang",
    Category: Language.district
}, {
    value: "Biển Tân Thành - Tiền Giang",
    StateId: 58,
    CityId: 114263,
    label: "Biển Tân Thành - Tiền Giang",
    Category: Language.district
}, {
    value: "Cù Lao Thái Sơn - Tiền Giang",
    StateId: 58,
    CityId: 114264,
    label: "Cù Lao Thái Sơn - Tiền Giang",
    Category: Language.district
}, {
    value: "Càng Long - Trà Vinh",
    StateId: 59,
    CityId: 666,
    label: "Càng Long - Trà Vinh",
    Category: Language.district
}, {
    value: "Cầu Kè - Trà Vinh",
    StateId: 59,
    CityId: 667,
    label: "Cầu Kè - Trà Vinh",
    Category: Language.district
}, {
    value: "Cầu Ngang - Trà Vinh",
    StateId: 59,
    CityId: 668,
    label: "Cầu Ngang - Trà Vinh",
    Category: Language.district
}, {
    value: "Châu Thành - Trà Vinh",
    StateId: 59,
    CityId: 669,
    label: "Châu Thành - Trà Vinh",
    Category: Language.district
}, {
    value: "Duyên Hải - Trà Vinh",
    StateId: 59,
    CityId: 670,
    label: "Duyên Hải - Trà Vinh",
    Category: Language.district
}, {
    value: "Tiểu Cần - Trà Vinh",
    StateId: 59,
    CityId: 671,
    label: "Tiểu Cần - Trà Vinh",
    Category: Language.district
}, {
    value: "Trà Cú - Trà Vinh",
    StateId: 59,
    CityId: 672,
    label: "Trà Cú - Trà Vinh",
    Category: Language.district
}, {
    value: "Trà Vinh - Trà Vinh",
    StateId: 59,
    CityId: 673,
    label: "Trà Vinh - Trà Vinh",
    Category: Language.district
}, {
    value: "Biển Ba Động - Trà Vinh",
    StateId: 59,
    CityId: 114265,
    label: "Biển Ba Động - Trà Vinh",
    Category: Language.district
}, {
    value: "Chiêm Hóa - Tuyên Quang",
    StateId: 60,
    CityId: 674,
    label: "Chiêm Hóa - Tuyên Quang",
    Category: Language.district
}, {
    value: "Hàm Yên - Tuyên Quang",
    StateId: 60,
    CityId: 675,
    label: "Hàm Yên - Tuyên Quang",
    Category: Language.district
}, {
    value: "Lâm Bình - Tuyên Quang",
    StateId: 60,
    CityId: 676,
    label: "Lâm Bình - Tuyên Quang",
    Category: Language.district
}, {
    value: "Na Hang - Tuyên Quang",
    StateId: 60,
    CityId: 677,
    label: "Na Hang - Tuyên Quang",
    Category: Language.district
}, {
    value: "Sơn Dương - Tuyên Quang",
    StateId: 60,
    CityId: 678,
    label: "Sơn Dương - Tuyên Quang",
    Category: Language.district
}, {
    value: "Tuyên Quang - Tuyên Quang",
    StateId: 60,
    CityId: 679,
    label: "Tuyên Quang - Tuyên Quang",
    Category: Language.district
}, {
    value: "Yên Sơn - Tuyên Quang",
    StateId: 60,
    CityId: 680,
    label: "Yên Sơn - Tuyên Quang",
    Category: Language.district
}, {
    value: "Bình Minh - Vĩnh Long",
    StateId: 61,
    CityId: 681,
    label: "Bình Minh - Vĩnh Long",
    Category: Language.district
}, {
    value: "Bình Tân - Vĩnh Long",
    StateId: 61,
    CityId: 682,
    label: "Bình Tân - Vĩnh Long",
    Category: Language.district
}, {
    value: "Long Hồ - Vĩnh Long",
    StateId: 61,
    CityId: 683,
    label: "Long Hồ - Vĩnh Long",
    Category: Language.district
}, {
    value: "Mang Thít - Vĩnh Long",
    StateId: 61,
    CityId: 684,
    label: "Mang Thít - Vĩnh Long",
    Category: Language.district
}, {
    value: "Tam Bình - Vĩnh Long",
    StateId: 61,
    CityId: 685,
    label: "Tam Bình - Vĩnh Long",
    Category: Language.district
}, {
    value: "Trà Ôn - Vĩnh Long",
    StateId: 61,
    CityId: 686,
    label: "Trà Ôn - Vĩnh Long",
    Category: Language.district
}, {
    value: "Vĩnh Long - Vĩnh Long",
    StateId: 61,
    CityId: 687,
    label: "Vĩnh Long - Vĩnh Long",
    Category: Language.district
}, {
    value: "Vũng Liêm - Vĩnh Long",
    StateId: 61,
    CityId: 688,
    label: "Vũng Liêm - Vĩnh Long",
    Category: Language.district
}, {
    value: "Bình Xuyên - Vĩnh Phúc",
    StateId: 62,
    CityId: 689,
    label: "Bình Xuyên - Vĩnh Phúc",
    Category: Language.district
}, {
    value: "Lập Thạch - Vĩnh Phúc",
    StateId: 62,
    CityId: 690,
    label: "Lập Thạch - Vĩnh Phúc",
    Category: Language.district
}, {
    value: "Phúc Yên - Vĩnh Phúc",
    StateId: 62,
    CityId: 691,
    label: "Phúc Yên - Vĩnh Phúc",
    Category: Language.district
}, {
    value: "Sông Lô - Vĩnh Phúc",
    StateId: 62,
    CityId: 692,
    label: "Sông Lô - Vĩnh Phúc",
    Category: Language.district
}, {
    value: "Tam Dương - Vĩnh Phúc",
    StateId: 62,
    CityId: 693,
    label: "Tam Dương - Vĩnh Phúc",
    Category: Language.district
}, {
    value: "Tam Đảo - Vĩnh Phúc",
    StateId: 62,
    CityId: 694,
    label: "Tam Đảo - Vĩnh Phúc",
    Category: Language.district
}, {
    value: "Vĩnh Tường - Vĩnh Phúc",
    StateId: 62,
    CityId: 695,
    label: "Vĩnh Tường - Vĩnh Phúc",
    Category: Language.district
}, {
    value: "Vĩnh Yên - Vĩnh Phúc",
    StateId: 62,
    CityId: 696,
    label: "Vĩnh Yên - Vĩnh Phúc",
    Category: Language.district
}, {
    value: "Yên Lạc - Vĩnh Phúc",
    StateId: 62,
    CityId: 697,
    label: "Yên Lạc - Vĩnh Phúc",
    Category: Language.district
}, {
    value: "Lục Yên - Yên Bái",
    StateId: 63,
    CityId: 698,
    label: "Lục Yên - Yên Bái",
    Category: Language.district
}, {
    value: "Mù Căng Chải - Yên Bái",
    StateId: 63,
    CityId: 699,
    label: "Mù Căng Chải - Yên Bái",
    Category: Language.district
}, {
    value: "Nghĩa Lộ - Yên Bái",
    StateId: 63,
    CityId: 700,
    label: "Nghĩa Lộ - Yên Bái",
    Category: Language.district
}, {
    value: "Trạm Tấu - Yên Bái",
    StateId: 63,
    CityId: 701,
    label: "Trạm Tấu - Yên Bái",
    Category: Language.district
}, {
    value: "Trấn Yên - Yên Bái",
    StateId: 63,
    CityId: 702,
    label: "Trấn Yên - Yên Bái",
    Category: Language.district
}, {
    value: "Văn Chấn - Yên Bái",
    StateId: 63,
    CityId: 703,
    label: "Văn Chấn - Yên Bái",
    Category: Language.district
}, {
    value: "Văn Yên - Yên Bái",
    StateId: 63,
    CityId: 704,
    label: "Văn Yên - Yên Bái",
    Category: Language.district
}, {
    value: "Yên Bái - Yên Bái",
    StateId: 63,
    CityId: 705,
    label: "Yên Bái - Yên Bái",
    Category: Language.district
}, {
    value: "Đại Lãnh - Vạn Ninh - Khánh Hòa",
    StateId: 32,
    CityId: 362,
    label: "Đại Lãnh - Vạn Ninh - Khánh Hòa",
    Category: Language.district
}, {
    value: "Yên Bình - Yên Bái",
    StateId: 63,
    CityId: 706,
    label: "Yên Bình - Yên Bái",
    Category: Language.district
}];
PI = Math.PI;
String.format = function() {
    for (var i, t = arguments[0], n = 0; n < arguments.length - 1; n++) i = new RegExp("\\{" + n + "\\}", "gm"), t = t.replace(i, arguments[n + 1]);
    return t
};
slug = function(n) {
    var i, r, t, u;
    for (n = n.replace(/^\s+|\s+$/g, ""), n = n.toLowerCase(), n = n.replace(/thành\s+phố\s+/g, ""), n = n.replace(/thanh\spho/g, ""), i = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ", r = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd", t = 0, u = i.length; t < u; t++) n = n.replace(new RegExp(i.charAt(t), "g"), r.charAt(t));
    return n = n.replace("-", "qwerty"), n.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "").replace(/-+/g, "").replace(/tp/g, "")
};
abbreviate = function(n) {
    if (!n || n.length <= 0) return n;
    var t = n.trim().split(" ");
    return t.map(function(n) {
        return n[0] || ""
    }).join("")
};
Number.prototype.formatMoney = function(n, t, i) {
    var u = this,
        n = isNaN(n = Math.abs(n)) ? 2 : n,
        t = t == undefined ? "." : t,
        i = i == undefined ? "," : i,
        e = u < 0 ? "-" : "",
        f = parseInt(u = Math.abs(+u || 0).toFixed(n)) + "",
        r = (r = f.length) > 3 ? r % 3 : 0;
    return e + (r ? f.substr(0, r) + i : "") + f.substr(r).replace(/(\d{3})(?=\d)/g, "$1" + i) + (n ? t + Math.abs(u - f).toFixed(n).slice(2) : "")
};
$.widget("custom.catcomplete", $.ui.autocomplete, {
        _renderMenu: function(n, t) {
            var r = this,
                i = "";
            t = t.sort(function(n, t) {
                return n.Category < t.Category ? 1 : n.Category > t.Category ? -1 : 0
            });
            $.each(t, function(t, u) {
                u.Category != i && (n.append("<li class='ui-autocomplete-category' style=font-weight:bold;>" + u.Category + "<\/li>"), i = u.Category);
                r._renderItemData(n, u)
            })
        }
    }),
    function(n) {
        "use strict";
        n.fn.extend({
            customSelect: function(t) {
                if (typeof document.body.style.maxHeight == "undefined") return this;
                var t = n.extend({
                        customClass: "customSelect",
                        mapClass: !0,
                        mapStyle: !0
                    }, t),
                    u = t.customClass,
                    r = function(t, r) {
                        var u = t.find(":selected"),
                            f = r.children(":first"),
                            e = u.html() || "&nbsp;";
                        f.html(e);
                        u.attr("disabled") ? r.addClass(i("DisabledOption")) : r.removeClass(i("DisabledOption"));
                        setTimeout(function() {
                            r.removeClass(i("Open"));
                            n(document).off("mouseup." + i("Open"))
                        }, 60)
                    },
                    i = function(n) {
                        return u + n
                    };
                return this.each(function() {
                    var e = n(this),
                        o = n("<span />").addClass(i("Inner")),
                        f = n("<span />");
                    e.after(f.append(o));
                    f.addClass(u);
                    t.mapClass && f.addClass(e.attr("class"));
                    t.mapStyle && f.attr("style", e.attr("style"));
                    e.addClass("hasCustomSelect").on("update", function() {
                        var n, t;
                        r(e, f);
                        n = parseInt(e.outerWidth(), 10) - (parseInt(f.outerWidth(), 10) - parseInt(f.width(), 10.5));
                        f.css({
                            display: "inline-block"
                        });
                        t = f.outerHeight();
                        e.attr("disabled") ? f.addClass(i("Disabled")) : f.removeClass(i("Disabled"));
                        o.css({
                            width: n,
                            display: "inline-block"
                        });
                        e.css({
                            "-webkit-appearance": "menulist-button",
                            width: f.outerWidth(),
                            position: "absolute",
                            opacity: 0,
                            height: t,
                            fontSize: f.css("font-size")
                        })
                    }).on("change", function() {
                        f.addClass(i("Changed"));
                        r(e, f)
                    }).on("keyup", function(n) {
                        f.hasClass(i("Open")) ? (n.which == 13 || n.which == 27) && r(e, f) : (e.blur(), e.focus())
                    }).on("mousedown", function() {
                        f.removeClass(i("Changed"))
                    }).on("mouseup", function(t) {
                        if (!f.hasClass(i("Open")))
                            if (n("." + i("Open")).not(f).length > 0 && typeof InstallTrigger != "undefined") e.focus();
                            else {
                                f.addClass(i("Open"));
                                t.stopPropagation();
                                n(document).one("mouseup." + i("Open"), function(t) {
                                    t.target != e.get(0) && n.inArray(t.target, e.find("*").get()) < 0 ? e.blur() : r(e, f)
                                })
                            }
                    }).focus(function() {
                        f.removeClass(i("Changed")).addClass(i("Focus"))
                    }).blur(function() {
                        f.removeClass(i("Focus") + " " + i("Open"))
                    }).hover(function() {
                        f.addClass(i("Hover"))
                    }, function() {
                        f.removeClass(i("Hover"))
                    }).trigger("update")
                })
            }
        })
    }(jQuery);
! function() {
    function t(n, t) {
        return [].slice.call((t || document).querySelectorAll(n))
    }
    if (window.addEventListener) {
        var n = window.StyleFix = {
            link: function(t) {
                try {
                    if ("stylesheet" !== t.rel || t.hasAttribute("data-noprefix")) return
                } catch (c) {
                    return
                }
                var f, u = t.href || t.getAttribute("data-href"),
                    r = u.replace(/[^\/]+$/, ""),
                    o = (/^[a-z]{3,10}:/.exec(r) || [""])[0],
                    s = (/^[a-z]{3,10}:\/\/[^\/]+/.exec(r) || [""])[0],
                    h = /^([^?]*)\??/.exec(u)[1],
                    e = t.parentNode,
                    i = new XMLHttpRequest;
                i.onreadystatechange = function() {
                    4 === i.readyState && f()
                };
                f = function() {
                    var u = i.responseText,
                        c, f;
                    u && t.parentNode && (!i.status || i.status < 400 || i.status > 600) && ((u = n.fix(u, !0, t), r) && (u = u.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi, function(n, t, i) {
                        return /^([a-z]{3,10}:|#)/i.test(i) ? n : /^\/\//.test(i) ? 'url("' + o + i + '")' : /^\//.test(i) ? 'url("' + s + i + '")' : /^\?/.test(i) ? 'url("' + h + i + '")' : 'url("' + r + i + '")'
                    }), c = r.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, "\\$1"), u = u.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)" + c, "gi"), "$1")), f = document.createElement("style"), f.textContent = u, f.media = t.media, f.disabled = t.disabled, f.setAttribute("data-href", t.getAttribute("href")), e.insertBefore(f, t), e.removeChild(t), f.media = t.media)
                };
                try {
                    i.open("GET", u);
                    i.send(null)
                } catch (c) {
                    "undefined" != typeof XDomainRequest && (i = new XDomainRequest, i.onerror = i.onprogress = function() {}, i.onload = f, i.open("GET", u), i.send(null))
                }
                t.setAttribute("data-inprogress", "")
            },
            styleElement: function(t) {
                if (!t.hasAttribute("data-noprefix")) {
                    var i = t.disabled;
                    t.textContent = n.fix(t.textContent, !0, t);
                    t.disabled = i
                }
            },
            styleAttribute: function(t) {
                var i = t.getAttribute("style");
                i = n.fix(i, !1, t);
                t.setAttribute("style", i)
            },
            process: function() {
                t("style").forEach(StyleFix.styleElement);
                t("[style]").forEach(StyleFix.styleAttribute)
            },
            register: function(t, i) {
                (n.fixers = n.fixers || []).splice(void 0 === i ? n.fixers.length : i, 0, t)
            },
            fix: function(t, i, r) {
                for (var u = 0; u < n.fixers.length; u++) t = n.fixers[u](t, i, r) || t;
                return t
            },
            camelCase: function(n) {
                return n.replace(/-([a-z])/g, function(n, t) {
                    return t.toUpperCase()
                }).replace("-", "")
            },
            deCamelCase: function(n) {
                return n.replace(/[A-Z]/g, function(n) {
                    return "-" + n.toLowerCase()
                })
            }
        };
        ! function() {
            setTimeout(function() {}, 10);
            document.addEventListener("DOMContentLoaded", StyleFix.process, !1)
        }()
    }
}(),
function(n) {
    function i(n, i, r, u, f) {
        if (n = t[n], n.length) {
            var e = RegExp(i + "(" + n.join("|") + ")" + r, "gi");
            f = f.replace(e, u)
        }
        return f
    }
    if (window.StyleFix && window.getComputedStyle) {
        var t = window.PrefixFree = {
            prefixCSS: function(n, r) {
                var u = t.prefix,
                    f;
                return (t.functions.indexOf("linear-gradient") > -1 && (n = n.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/gi, function(n, t, i, r) {
                    return t + (i || "") + "linear-gradient(" + (90 - r) + "deg"
                })), n = i("functions", "(\\s|:|,)", "\\s*\\(", "$1" + u + "$2(", n), n = i("keywords", "(\\s|:)", "(\\s|;|\\}|$)", "$1" + u + "$2$3", n), n = i("properties", "(^|\\{|\\s|;)", "\\s*:", "$1" + u + "$2:", n), t.properties.length) && (f = RegExp("\\b(" + t.properties.join("|") + ")(?!:)", "gi"), n = i("valueProperties", "\\b", ":(.+?);", function(n) {
                    return n.replace(f, u + "$1")
                }, n)), r && (n = i("selectors", "", "\\b", t.prefixSelector, n), n = i("atrules", "@", "\\b", "@" + u + "$1", n)), n = n.replace(RegExp("-" + u, "g"), "-"), n = n.replace(/-\*-(?=[a-z]+)/gi, t.prefix)
            },
            property: function(n) {
                return (t.properties.indexOf(n) ? t.prefix : "") + n
            },
            value: function(n) {
                return n = i("functions", "(^|\\s|,)", "\\s*\\(", "$1" + t.prefix + "$2(", n), n = i("keywords", "(^|\\s)", "(\\s|$)", "$1" + t.prefix + "$2$3", n)
            },
            prefixSelector: function(n) {
                return n.replace(/^:{1,2}/, function(n) {
                    return n + t.prefix
                })
            },
            prefixProperty: function(n, i) {
                var r = t.prefix + n;
                return i ? StyleFix.camelCase(r) : r
            }
        };
        ! function() {
            var u = {},
                i = [],
                f = getComputedStyle(document.documentElement, null),
                e = document.createElement("div").style,
                l = function(n) {
                    var t, f, r;
                    if ("-" === n.charAt(0))
                        for (i.push(n), t = n.split("-"), f = t[1], u[f] = ++u[f] || 1; t.length > 3;) t.pop(), r = t.join("-"), a(r) && -1 === i.indexOf(r) && i.push(r)
                },
                a = function(n) {
                    return StyleFix.camelCase(n) in e
                },
                o, s, h, n, r, c;
            if (f.length > 0)
                for (n = 0; n < f.length; n++) l(f[n]);
            else
                for (r in f) l(StyleFix.deCamelCase(r));
            o = {
                uses: 0
            };
            for (s in u) h = u[s], o.uses < h && (o = {
                prefix: s,
                uses: h
            });
            for (t.prefix = "-" + o.prefix + "-", t.Prefix = StyleFix.camelCase(t.prefix), t.properties = [], n = 0; n < i.length; n++) r = i[n], 0 === r.indexOf(t.prefix) && (c = r.slice(t.prefix.length), a(c) || t.properties.push(c));
            "Ms" != t.Prefix || "transform" in e || "MsTransform" in e || !("msTransform" in e) || t.properties.push("transform", "transform-origin");
            t.properties.sort()
        }(),
        function() {
            function u(n, t) {
                return f[t] = "", f[t] = n, !!f[t]
            }
            var n = {
                    "linear-gradient": {
                        property: "backgroundImage",
                        params: "red, teal"
                    },
                    calc: {
                        property: "width",
                        params: "1px + 5%"
                    },
                    element: {
                        property: "backgroundImage",
                        params: "#foo"
                    },
                    "cross-fade": {
                        property: "backgroundImage",
                        params: "url(a.png), url(b.png), 50%"
                    }
                },
                o, f, e, r, i;
            n["repeating-linear-gradient"] = n["repeating-radial-gradient"] = n["radial-gradient"] = n["linear-gradient"];
            o = {
                initial: "color",
                "zoom-in": "cursor",
                "zoom-out": "cursor",
                box: "display",
                flexbox: "display",
                "inline-flexbox": "display",
                flex: "display",
                "inline-flex": "display",
                grid: "display",
                "inline-grid": "display",
                "min-content": "width"
            };
            t.functions = [];
            t.keywords = [];
            f = document.createElement("div").style;
            for (e in n) {
                var s = n[e],
                    i = s.property,
                    h = e + "(" + s.params + ")";
                !u(h, i) && u(t.prefix + h, i) && t.functions.push(e)
            }
            for (r in o) i = o[r], !u(r, i) && u(t.prefix + r, i) && t.keywords.push(r)
        }(),
        function() {
            function u(n) {
                return f.textContent = n + "{}", !!f.sheet.cssRules.length
            }
            var o = {
                    ":read-only": null,
                    ":read-write": null,
                    ":any-link": null,
                    "::selection": null
                },
                s = {
                    keyframes: "name",
                    viewport: null,
                    document: 'regexp(".")'
                },
                f, r, e, i;
            t.selectors = [];
            t.atrules = [];
            f = n.appendChild(document.createElement("style"));
            for (r in o) i = r + (o[r] ? "(" + o[r] + ")" : ""), !u(i) && u(t.prefixSelector(i)) && t.selectors.push(r);
            for (e in s) i = e + " " + (s[e] || ""), !u("@" + i) && u("@" + t.prefix + i) && t.atrules.push(e);
            n.removeChild(f)
        }();
        t.valueProperties = ["transition", "transition-property"];
        n.className += " " + t.prefix;
        StyleFix.register(t.prefixCSS)
    }
}(document.documentElement),
function(n) {
    "use strict";
    typeof define == "function" && define.amd ? define(["jquery"], n) : typeof exports != "undefined" ? module.exports = n(require("jquery")) : n(jQuery)
}(function(n) {
    "use strict";
    var t = window.Slick || {};
    t = function() {
        function t(t, r) {
            var u = this,
                o, f, e;
            if (u.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: n(t),
                    appendDots: n(t),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="previous">Previous<\/button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="next">Next<\/button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(n, t) {
                        return '<button type="button" data-role="none">' + (t + 1) + "<\/button>"
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0
                }, u.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1
                }, n.extend(u, u.initials), u.activeBreakpoint = null, u.animType = null, u.animProp = null, u.breakpoints = [], u.breakpointSettings = [], u.cssTransitions = !1, u.hidden = "hidden", u.paused = !1, u.positionProp = null, u.respondTo = null, u.rowCount = 1, u.shouldClick = !0, u.$slider = n(t), u.$slidesCache = null, u.transformType = null, u.transitionType = null, u.visibilityChange = "visibilitychange", u.windowWidth = 0, u.windowTimer = null, o = n(t).data("slick") || {}, u.options = n.extend({}, u.defaults, o, r), u.currentSlide = u.options.initialSlide, u.originalSettings = u.options, f = u.options.responsive || null, f && f.length > -1) {
                u.respondTo = u.options.respondTo || "window";
                for (e in f) f.hasOwnProperty(e) && (u.breakpoints.push(f[e].breakpoint), u.breakpointSettings[f[e].breakpoint] = f[e].settings);
                u.breakpoints.sort(function(n, t) {
                    return u.options.mobileFirst === !0 ? n - t : t - n
                })
            }
            typeof document.mozHidden != "undefined" ? (u.hidden = "mozHidden", u.visibilityChange = "mozvisibilitychange") : typeof document.msHidden != "undefined" ? (u.hidden = "msHidden", u.visibilityChange = "msvisibilitychange") : typeof document.webkitHidden != "undefined" && (u.hidden = "webkitHidden", u.visibilityChange = "webkitvisibilitychange");
            u.autoPlay = n.proxy(u.autoPlay, u);
            u.autoPlayClear = n.proxy(u.autoPlayClear, u);
            u.changeSlide = n.proxy(u.changeSlide, u);
            u.clickHandler = n.proxy(u.clickHandler, u);
            u.selectHandler = n.proxy(u.selectHandler, u);
            u.setPosition = n.proxy(u.setPosition, u);
            u.swipeHandler = n.proxy(u.swipeHandler, u);
            u.dragHandler = n.proxy(u.dragHandler, u);
            u.keyHandler = n.proxy(u.keyHandler, u);
            u.autoPlayIterator = n.proxy(u.autoPlayIterator, u);
            u.instanceUid = i++;
            u.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
            u.init();
            u.checkResponsive(!0)
        }
        var i = 0;
        return t
    }();
    t.prototype.addSlide = t.prototype.slickAdd = function(t, i, r) {
        var u = this;
        if (typeof i == "boolean") r = i, i = null;
        else if (i < 0 || i >= u.slideCount) return !1;
        u.unload();
        typeof i == "number" ? i === 0 && u.$slides.length === 0 ? n(t).appendTo(u.$slideTrack) : r ? n(t).insertBefore(u.$slides.eq(i)) : n(t).insertAfter(u.$slides.eq(i)) : r === !0 ? n(t).prependTo(u.$slideTrack) : n(t).appendTo(u.$slideTrack);
        u.$slides = u.$slideTrack.children(this.options.slide);
        u.$slideTrack.children(this.options.slide).detach();
        u.$slideTrack.append(u.$slides);
        u.$slides.each(function(t, i) {
            n(i).attr("data-slick-index", t)
        });
        u.$slidesCache = u.$slides;
        u.reinit()
    };
    t.prototype.animateHeight = function() {
        var n = this,
            t;
        n.options.slidesToShow === 1 && n.options.adaptiveHeight === !0 && n.options.vertical === !1 && (t = n.$slides.eq(n.currentSlide).outerHeight(!0), n.$list.animate({
            height: t
        }, n.options.speed))
    };
    t.prototype.animateSlide = function(t, i) {
        var u = {},
            r = this;
        r.animateHeight();
        r.options.rtl === !0 && r.options.vertical === !1 && (t = -t);
        r.transformsEnabled === !1 ? r.options.vertical === !1 ? r.$slideTrack.animate({
            left: t
        }, r.options.speed, r.options.easing, i) : r.$slideTrack.animate({
            top: t
        }, r.options.speed, r.options.easing, i) : r.cssTransitions === !1 ? (r.options.rtl === !0 && (r.currentLeft = -r.currentLeft), n({
            animStart: r.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: r.options.speed,
            easing: r.options.easing,
            step: function(n) {
                n = Math.ceil(n);
                r.options.vertical === !1 ? (u[r.animType] = "translate(" + n + "px, 0px)", r.$slideTrack.css(u)) : (u[r.animType] = "translate(0px," + n + "px)", r.$slideTrack.css(u))
            },
            complete: function() {
                i && i.call()
            }
        })) : (r.applyTransition(), t = Math.ceil(t), u[r.animType] = r.options.vertical === !1 ? "translate3d(" + t + "px, 0px, 0px)" : "translate3d(0px," + t + "px, 0px)", r.$slideTrack.css(u), i && setTimeout(function() {
            r.disableTransition();
            i.call()
        }, r.options.speed))
    };
    t.prototype.asNavFor = function(t) {
        var i = this,
            r = i.options.asNavFor !== null ? n(i.options.asNavFor).slick("getSlick") : null;
        r !== null && r.slideHandler(t, !0)
    };
    t.prototype.applyTransition = function(n) {
        var t = this,
            i = {};
        i[t.transitionType] = t.options.fade === !1 ? t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : "opacity " + t.options.speed + "ms " + t.options.cssEase;
        t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(n).css(i)
    };
    t.prototype.autoPlay = function() {
        var n = this;
        n.autoPlayTimer && clearInterval(n.autoPlayTimer);
        n.slideCount > n.options.slidesToShow && n.paused !== !0 && (n.autoPlayTimer = setInterval(n.autoPlayIterator, n.options.autoplaySpeed))
    };
    t.prototype.autoPlayClear = function() {
        var n = this;
        n.autoPlayTimer && clearInterval(n.autoPlayTimer)
    };
    t.prototype.autoPlayIterator = function() {
        var n = this;
        n.options.infinite === !1 ? n.direction === 1 ? (n.currentSlide + 1 === n.slideCount - 1 && (n.direction = 0), n.slideHandler(n.currentSlide + n.options.slidesToScroll)) : (n.currentSlide - 1 == 0 && (n.direction = 1), n.slideHandler(n.currentSlide - n.options.slidesToScroll)) : n.slideHandler(n.currentSlide + n.options.slidesToScroll)
    };
    t.prototype.buildArrows = function() {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow = n(t.options.prevArrow), t.$nextArrow = n(t.options.nextArrow), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.appendTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), t.options.infinite !== !0 && t.$prevArrow.addClass("slick-disabled"))
    };
    t.prototype.buildDots = function() {
        var t = this,
            i, r;
        if (t.options.dots === !0 && t.slideCount > t.options.slidesToShow) {
            for (r = '<ul class="' + t.options.dotsClass + '">', i = 0; i <= t.getDotCount(); i += 1) r += "<li>" + t.options.customPaging.call(this, t, i) + "<\/li>";
            r += "<\/ul>";
            t.$dots = n(r).appendTo(t.options.appendDots);
            t.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    };
    t.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(":not(.slick-cloned)").addClass("slick-slide");
        t.slideCount = t.$slides.length;
        t.$slides.each(function(t, i) {
            n(i).attr("data-slick-index", t)
        });
        t.$slidesCache = t.$slides;
        t.$slider.addClass("slick-slider");
        t.$slideTrack = t.slideCount === 0 ? n('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent();
        t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent();
        t.$slideTrack.css("opacity", 0);
        (t.options.centerMode === !0 || t.options.swipeToSlide === !0) && (t.options.slidesToScroll = 1);
        n("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading");
        t.setupInfinite();
        t.buildArrows();
        t.buildDots();
        t.updateDots();
        t.options.accessibility === !0 && t.$list.prop("tabIndex", 0);
        t.setSlideClasses(typeof this.currentSlide == "number" ? this.currentSlide : 0);
        t.options.draggable === !0 && t.$list.addClass("draggable")
    };
    t.prototype.buildRows = function() {
        var n = this,
            t, i, r, f, c, u, e, o, s, h;
        if (f = document.createDocumentFragment(), u = n.$slider.children(), n.options.rows > 1) {
            for (e = n.options.slidesPerRow * n.options.rows, c = Math.ceil(u.length / e), t = 0; t < c; t++) {
                for (o = document.createElement("div"), i = 0; i < n.options.rows; i++) {
                    for (s = document.createElement("div"), r = 0; r < n.options.slidesPerRow; r++) h = t * e + (i * n.options.slidesPerRow + r), u.get(h) && s.appendChild(u.get(h));
                    o.appendChild(s)
                }
                f.appendChild(o)
            }
            n.$slider.html(f);
            n.$slider.children().children().children().width(100 / n.options.slidesPerRow + "%").css({
                display: "inline-block"
            })
        }
    };
    t.prototype.checkResponsive = function(t) {
        var i = this,
            u, r, f, e = i.$slider.width(),
            o = window.innerWidth || n(window).width();
        if (i.respondTo === "window" ? f = o : i.respondTo === "slider" ? f = e : i.respondTo === "min" && (f = Math.min(o, e)), i.originalSettings.responsive && i.originalSettings.responsive.length > -1 && i.originalSettings.responsive !== null) {
            r = null;
            for (u in i.breakpoints) i.breakpoints.hasOwnProperty(u) && (i.originalSettings.mobileFirst === !1 ? f < i.breakpoints[u] && (r = i.breakpoints[u]) : f > i.breakpoints[u] && (r = i.breakpoints[u]));
            r !== null ? i.activeBreakpoint !== null ? r !== i.activeBreakpoint && (i.activeBreakpoint = r, i.breakpointSettings[r] === "unslick" ? i.unslick() : (i.options = n.extend({}, i.originalSettings, i.breakpointSettings[r]), t === !0 && (i.currentSlide = i.options.initialSlide), i.refresh())) : (i.activeBreakpoint = r, i.breakpointSettings[r] === "unslick" ? i.unslick() : (i.options = n.extend({}, i.originalSettings, i.breakpointSettings[r]), t === !0 && (i.currentSlide = i.options.initialSlide), i.refresh())) : i.activeBreakpoint !== null && (i.activeBreakpoint = null, i.options = i.originalSettings, t === !0 && (i.currentSlide = i.options.initialSlide), i.refresh())
        }
    };
    t.prototype.changeSlide = function(t, i) {
        var r = this,
            s = n(t.target),
            u, f, e, o;
        s.is("a") && t.preventDefault();
        e = r.slideCount % r.options.slidesToScroll != 0;
        u = e ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll;
        switch (t.data.message) {
            case "previous":
                f = u === 0 ? r.options.slidesToScroll : r.options.slidesToShow - u;
                r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - f, !1, i);
                break;
            case "next":
                f = u === 0 ? r.options.slidesToScroll : u;
                r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + f, !1, i);
                break;
            case "index":
                o = t.data.index === 0 ? 0 : t.data.index || n(t.target).parent().index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(o), !1, i);
                break;
            default:
                return
        }
    };
    t.prototype.checkNavigable = function(n) {
        var u = this,
            t, i, r;
        if (t = u.getNavigableIndexes(), i = 0, n > t[t.length - 1]) n = t[t.length - 1];
        else
            for (r in t) {
                if (n < t[r]) {
                    n = i;
                    break
                }
                i = t[r]
            }
        return n
    };
    t.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots === !0 && t.slideCount > t.options.slidesToShow && n("li", t.$dots).off("click.slick", t.changeSlide);
        t.options.dots === !0 && t.options.pauseOnDotsHover === !0 && t.options.autoplay === !0 && n("li", t.$dots).off("mouseenter.slick", t.setPaused.bind(t, !0)).off("mouseleave.slick", t.setPaused.bind(t, !1));
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide));
        t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler);
        t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler);
        t.$list.off("touchend.slick mouseup.slick", t.swipeHandler);
        t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler);
        t.$list.off("click.slick", t.clickHandler);
        t.options.autoplay === !0 && n(document).off(t.visibilityChange, t.visibility);
        t.$list.off("mouseenter.slick", t.setPaused.bind(t, !0));
        t.$list.off("mouseleave.slick", t.setPaused.bind(t, !1));
        t.options.accessibility === !0 && t.$list.off("keydown.slick", t.keyHandler);
        t.options.focusOnSelect === !0 && n(t.$slideTrack).children().off("click.slick", t.selectHandler);
        n(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange);
        n(window).off("resize.slick.slick-" + t.instanceUid, t.resize);
        n("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault);
        n(window).off("load.slick.slick-" + t.instanceUid, t.setPosition);
        n(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
    };
    t.prototype.cleanUpRows = function() {
        var n = this,
            t;
        n.options.rows > 1 && (t = n.$slides.children().children(), t.removeAttr("style"), n.$slider.html(t))
    };
    t.prototype.clickHandler = function(n) {
        var t = this;
        t.shouldClick === !1 && (n.stopImmediatePropagation(), n.stopPropagation(), n.preventDefault())
    };
    t.prototype.destroy = function() {
        var t = this;
        t.autoPlayClear();
        t.touchObject = {};
        t.cleanUpEvents();
        n(".slick-cloned", t.$slider).remove();
        t.$dots && t.$dots.remove();
        t.$prevArrow && typeof t.options.prevArrow != "object" && t.$prevArrow.remove();
        t.$nextArrow && typeof t.options.nextArrow != "object" && t.$nextArrow.remove();
        t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible").attr("aria-hidden", "true").removeAttr("data-slick-index").css({
            position: "",
            left: "",
            top: "",
            zIndex: "",
            opacity: "",
            width: ""
        }), t.$slider.html(t.$slides));
        t.cleanUpRows();
        t.$slider.removeClass("slick-slider");
        t.$slider.removeClass("slick-initialized")
    };
    t.prototype.disableTransition = function(n) {
        var t = this,
            i = {};
        i[t.transitionType] = "";
        t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(n).css(i)
    };
    t.prototype.fadeSlide = function(n, t) {
        var i = this;
        i.cssTransitions === !1 ? (i.$slides.eq(n).css({
            zIndex: 1e3
        }), i.$slides.eq(n).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, t)) : (i.applyTransition(n), i.$slides.eq(n).css({
            opacity: 1,
            zIndex: 1e3
        }), t && setTimeout(function() {
            i.disableTransition(n);
            t.call()
        }, i.options.speed))
    };
    t.prototype.filterSlides = t.prototype.slickFilter = function(n) {
        var t = this;
        n !== null && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(n).appendTo(t.$slideTrack), t.reinit())
    };
    t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
        var n = this;
        return n.currentSlide
    };
    t.prototype.getDotCount = function() {
        var n = this,
            i = 0,
            r = 0,
            t = 0;
        if (n.options.infinite === !0) t = Math.ceil(n.slideCount / n.options.slidesToScroll);
        else if (n.options.centerMode === !0) t = n.slideCount;
        else
            while (i < n.slideCount) ++t, i = r + n.options.slidesToShow, r += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
        return t - 1
    };
    t.prototype.getLeft = function(n) {
        var t = this,
            f, r, u = 0,
            i;
        return t.slideOffset = 0, r = t.$slides.first().outerHeight(), t.options.infinite === !0 ? (t.slideCount > t.options.slidesToShow && (t.slideOffset = t.slideWidth * t.options.slidesToShow * -1, u = r * t.options.slidesToShow * -1), t.slideCount % t.options.slidesToScroll != 0 && n + t.options.slidesToScroll > t.slideCount && t.slideCount > t.options.slidesToShow && (n > t.slideCount ? (t.slideOffset = (t.options.slidesToShow - (n - t.slideCount)) * t.slideWidth * -1, u = (t.options.slidesToShow - (n - t.slideCount)) * r * -1) : (t.slideOffset = t.slideCount % t.options.slidesToScroll * t.slideWidth * -1, u = t.slideCount % t.options.slidesToScroll * r * -1))) : n + t.options.slidesToShow > t.slideCount && (t.slideOffset = (n + t.options.slidesToShow - t.slideCount) * t.slideWidth, u = (n + t.options.slidesToShow - t.slideCount) * r), t.slideCount <= t.options.slidesToShow && (t.slideOffset = 0, u = 0), t.options.centerMode === !0 && t.options.infinite === !0 ? t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2) - t.slideWidth : t.options.centerMode === !0 && (t.slideOffset = 0, t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2)), f = t.options.vertical === !1 ? n * t.slideWidth * -1 + t.slideOffset : n * r * -1 + u, t.options.variableWidth === !0 && (i = t.slideCount <= t.options.slidesToShow || t.options.infinite === !1 ? t.$slideTrack.children(".slick-slide").eq(n) : t.$slideTrack.children(".slick-slide").eq(n + t.options.slidesToShow), f = i[0] ? i[0].offsetLeft * -1 : 0, t.options.centerMode === !0 && (i = t.options.infinite === !1 ? t.$slideTrack.children(".slick-slide").eq(n) : t.$slideTrack.children(".slick-slide").eq(n + t.options.slidesToShow + 1), f = (i[0] ? i[0].offsetLeft * -1 : 0) + (t.$list.width() - i.outerWidth()) / 2)), f
    };
    t.prototype.getOption = t.prototype.slickGetOption = function(n) {
        var t = this;
        return t.options[n]
    };
    t.prototype.getNavigableIndexes = function() {
        var n = this,
            t = 0,
            r = 0,
            u = [],
            i;
        for (n.options.infinite === !1 ? (i = n.slideCount - n.options.slidesToShow + 1, n.options.centerMode === !0 && (i = n.slideCount)) : (t = n.options.slidesToScroll * -1, r = n.options.slidesToScroll * -1, i = n.slideCount * 2); t < i;) u.push(t), t = r + n.options.slidesToScroll, r += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
        return u
    };
    t.prototype.getSlick = function() {
        return this
    };
    t.prototype.getSlideCount = function() {
        var t = this,
            i, r;
        return r = t.options.centerMode === !0 ? t.slideWidth * Math.floor(t.options.slidesToShow / 2) : 0, t.options.swipeToSlide === !0 ? (t.$slideTrack.find(".slick-slide").each(function(u, f) {
            if (f.offsetLeft - r + n(f).outerWidth() / 2 > t.swipeLeft * -1) return i = f, !1
        }), Math.abs(n(i).attr("data-slick-index") - t.currentSlide) || 1) : t.options.slidesToScroll
    };
    t.prototype.goTo = t.prototype.slickGoTo = function(n, t) {
        var i = this;
        i.changeSlide({
            data: {
                message: "index",
                index: parseInt(n)
            }
        }, t)
    };
    t.prototype.init = function() {
        var t = this;
        n(t.$slider).hasClass("slick-initialized") || (n(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots());
        t.$slider.trigger("init", [t])
    };
    t.prototype.initArrowEvents = function() {
        var n = this;
        if (n.options.arrows === !0 && n.slideCount > n.options.slidesToShow) {
            n.$prevArrow.on("click.slick", {
                message: "previous"
            }, n.changeSlide);
            n.$nextArrow.on("click.slick", {
                message: "next"
            }, n.changeSlide)
        }
    };
    t.prototype.initDotEvents = function() {
        var t = this;
        if (t.options.dots === !0 && t.slideCount > t.options.slidesToShow) n("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide);
        if (t.options.dots === !0 && t.options.pauseOnDotsHover === !0 && t.options.autoplay === !0) n("li", t.$dots).on("mouseenter.slick", t.setPaused.bind(t, !0)).on("mouseleave.slick", t.setPaused.bind(t, !1))
    };
    t.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents();
        t.initDotEvents();
        t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler);
        t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler);
        t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler);
        t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler);
        t.$list.on("click.slick", t.clickHandler);
        if (t.options.autoplay === !0) n(document).on(t.visibilityChange, t.visibility.bind(t));
        t.$list.on("mouseenter.slick", t.setPaused.bind(t, !0));
        t.$list.on("mouseleave.slick", t.setPaused.bind(t, !1));
        if (t.options.accessibility === !0) t.$list.on("keydown.slick", t.keyHandler);
        if (t.options.focusOnSelect === !0) n(t.$slideTrack).children().on("click.slick", t.selectHandler);
        n(window).on("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange.bind(t));
        n(window).on("resize.slick.slick-" + t.instanceUid, t.resize.bind(t));
        n("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault);
        n(window).on("load.slick.slick-" + t.instanceUid, t.setPosition);
        n(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
    };
    t.prototype.initUI = function() {
        var n = this;
        n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && (n.$prevArrow.show(), n.$nextArrow.show());
        n.options.dots === !0 && n.slideCount > n.options.slidesToShow && n.$dots.show();
        n.options.autoplay === !0 && n.autoPlay()
    };
    t.prototype.keyHandler = function(n) {
        var t = this;
        n.keyCode === 37 && t.options.accessibility === !0 ? t.changeSlide({
            data: {
                message: "previous"
            }
        }) : n.keyCode === 39 && t.options.accessibility === !0 && t.changeSlide({
            data: {
                message: "next"
            }
        })
    };
    t.prototype.lazyLoad = function() {
        function f(t) {
            n("img[data-lazy]", t).each(function() {
                var t = n(this),
                    i = n(this).attr("data-lazy"),
                    r = document.createElement("img");
                r.onload = function() {
                    t.animate({
                        opacity: 1
                    }, 200)
                };
                r.src = i;
                t.css({
                    opacity: 0
                }).attr("src", i).removeAttr("data-lazy").removeClass("slick-loading")
            })
        }
        var t = this,
            e, r, i, u;
        t.options.centerMode === !0 ? t.options.infinite === !0 ? (i = t.currentSlide + (t.options.slidesToShow / 2 + 1), u = i + t.options.slidesToShow + 2) : (i = Math.max(0, t.currentSlide - (t.options.slidesToShow / 2 + 1)), u = 2 + (t.options.slidesToShow / 2 + 1) + t.currentSlide) : (i = t.options.infinite ? t.options.slidesToShow + t.currentSlide : t.currentSlide, u = i + t.options.slidesToShow, t.options.fade === !0 && (i > 0 && i--, u <= t.slideCount && u++));
        e = t.$slider.find(".slick-slide").slice(i, u);
        f(e);
        t.slideCount <= t.options.slidesToShow ? (r = t.$slider.find(".slick-slide"), f(r)) : t.currentSlide >= t.slideCount - t.options.slidesToShow ? (r = t.$slider.find(".slick-cloned").slice(0, t.options.slidesToShow), f(r)) : t.currentSlide === 0 && (r = t.$slider.find(".slick-cloned").slice(t.options.slidesToShow * -1), f(r))
    };
    t.prototype.loadSlider = function() {
        var n = this;
        n.setPosition();
        n.$slideTrack.css({
            opacity: 1
        });
        n.$slider.removeClass("slick-loading");
        n.initUI();
        n.options.lazyLoad === "progressive" && n.progressiveLazyLoad()
    };
    t.prototype.next = t.prototype.slickNext = function() {
        var n = this;
        n.changeSlide({
            data: {
                message: "next"
            }
        })
    };
    t.prototype.orientationChange = function() {
        var n = this;
        n.checkResponsive();
        n.setPosition()
    };
    t.prototype.pause = t.prototype.slickPause = function() {
        var n = this;
        n.autoPlayClear();
        n.paused = !0
    };
    t.prototype.play = t.prototype.slickPlay = function() {
        var n = this;
        n.paused = !1;
        n.autoPlay()
    };
    t.prototype.postSlide = function(n) {
        var t = this;
        t.$slider.trigger("afterChange", [t, n]);
        t.animating = !1;
        t.setPosition();
        t.swipeLeft = null;
        t.options.autoplay === !0 && t.paused === !1 && t.autoPlay()
    };
    t.prototype.prev = t.prototype.slickPrev = function() {
        var n = this;
        n.changeSlide({
            data: {
                message: "previous"
            }
        })
    };
    t.prototype.preventDefault = function(n) {
        n.preventDefault()
    };
    t.prototype.progressiveLazyLoad = function() {
        var t = this,
            r, i;
        r = n("img[data-lazy]", t.$slider).length;
        r > 0 && (i = n("img[data-lazy]", t.$slider).first(), i.attr("src", i.attr("data-lazy")).removeClass("slick-loading").load(function() {
            i.removeAttr("data-lazy");
            t.progressiveLazyLoad();
            t.options.adaptiveHeight === !0 && t.setPosition()
        }).error(function() {
            i.removeAttr("data-lazy");
            t.progressiveLazyLoad()
        }))
    };
    t.prototype.refresh = function() {
        var t = this,
            i = t.currentSlide;
        t.destroy();
        n.extend(t, t.initials);
        t.init();
        t.changeSlide({
            data: {
                message: "index",
                index: i
            }
        }, !1)
    };
    t.prototype.reinit = function() {
        var t = this;
        if (t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && t.currentSlide !== 0 && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.options.focusOnSelect === !0) n(t.$slideTrack).children().on("click.slick", t.selectHandler);
        t.setSlideClasses(0);
        t.setPosition();
        t.$slider.trigger("reInit", [t])
    };
    t.prototype.resize = function() {
        var t = this;
        n(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
            t.windowWidth = n(window).width();
            t.checkResponsive();
            t.setPosition()
        }, 50))
    };
    t.prototype.removeSlide = t.prototype.slickRemove = function(n, t, i) {
        var r = this;
        if (typeof n == "boolean" ? (t = n, n = t === !0 ? 0 : r.slideCount - 1) : n = t === !0 ? --n : n, r.slideCount < 1 || n < 0 || n > r.slideCount - 1) return !1;
        r.unload();
        i === !0 ? r.$slideTrack.children().remove() : r.$slideTrack.children(this.options.slide).eq(n).remove();
        r.$slides = r.$slideTrack.children(this.options.slide);
        r.$slideTrack.children(this.options.slide).detach();
        r.$slideTrack.append(r.$slides);
        r.$slidesCache = r.$slides;
        r.reinit()
    };
    t.prototype.setCSS = function(n) {
        var t = this,
            i = {},
            r, u;
        t.options.rtl === !0 && (n = -n);
        r = t.positionProp == "left" ? Math.ceil(n) + "px" : "0px";
        u = t.positionProp == "top" ? Math.ceil(n) + "px" : "0px";
        i[t.positionProp] = n;
        t.transformsEnabled === !1 ? t.$slideTrack.css(i) : (i = {}, t.cssTransitions === !1 ? (i[t.animType] = "translate(" + r + ", " + u + ")", t.$slideTrack.css(i)) : (i[t.animType] = "translate3d(" + r + ", " + u + ", 0px)", t.$slideTrack.css(i)))
    };
    t.prototype.setDimensions = function() {
        var n = this,
            t;
        n.options.vertical === !1 ? n.options.centerMode === !0 && n.$list.css({
            padding: "0px " + n.options.centerPadding
        }) : (n.$list.height(n.$slides.first().outerHeight(!0) * n.options.slidesToShow), n.options.centerMode === !0 && n.$list.css({
            padding: n.options.centerPadding + " 0px"
        }));
        n.listWidth = n.$list.width();
        n.listHeight = n.$list.height();
        n.options.vertical === !1 && n.options.variableWidth === !1 ? (n.slideWidth = Math.ceil(n.listWidth / n.options.slidesToShow), n.$slideTrack.width(Math.ceil(n.slideWidth * n.$slideTrack.children(".slick-slide").length))) : n.options.variableWidth === !0 ? n.$slideTrack.width(5e3 * n.slideCount) : (n.slideWidth = Math.ceil(n.listWidth), n.$slideTrack.height(Math.ceil(n.$slides.first().outerHeight(!0) * n.$slideTrack.children(".slick-slide").length)));
        t = n.$slides.first().outerWidth(!0) - n.$slides.first().width();
        n.options.variableWidth === !1 && n.$slideTrack.children(".slick-slide").width(n.slideWidth - t)
    };
    t.prototype.setFade = function() {
        var t = this,
            i;
        t.$slides.each(function(r, u) {
            i = t.slideWidth * r * -1;
            t.options.rtl === !0 ? n(u).css({
                position: "relative",
                right: i,
                top: 0,
                zIndex: 800,
                opacity: 0
            }) : n(u).css({
                position: "relative",
                left: i,
                top: 0,
                zIndex: 800,
                opacity: 0
            })
        });
        t.$slides.eq(t.currentSlide).css({
            zIndex: 900,
            opacity: 1
        })
    };
    t.prototype.setHeight = function() {
        var n = this,
            t;
        n.options.slidesToShow === 1 && n.options.adaptiveHeight === !0 && n.options.vertical === !1 && (t = n.$slides.eq(n.currentSlide).outerHeight(!0), n.$list.css("height", t))
    };
    t.prototype.setOption = t.prototype.slickSetOption = function(n, t, i) {
        var r = this;
        r.options[n] = t;
        i === !0 && (r.unload(), r.reinit())
    };
    t.prototype.setPosition = function() {
        var n = this;
        n.setDimensions();
        n.setHeight();
        n.options.fade === !1 ? n.setCSS(n.getLeft(n.currentSlide)) : n.setFade();
        n.$slider.trigger("setPosition", [n])
    };
    t.prototype.setProps = function() {
        var n = this,
            t = document.body.style;
        n.positionProp = n.options.vertical === !0 ? "top" : "left";
        n.positionProp === "top" ? n.$slider.addClass("slick-vertical") : n.$slider.removeClass("slick-vertical");
        (t.WebkitTransition !== undefined || t.MozTransition !== undefined || t.msTransition !== undefined) && n.options.useCSS === !0 && (n.cssTransitions = !0);
        t.OTransform !== undefined && (n.animType = "OTransform", n.transformType = "-o-transform", n.transitionType = "OTransition", t.perspectiveProperty === undefined && t.webkitPerspective === undefined && (n.animType = !1));
        t.MozTransform !== undefined && (n.animType = "MozTransform", n.transformType = "-moz-transform", n.transitionType = "MozTransition", t.perspectiveProperty === undefined && t.MozPerspective === undefined && (n.animType = !1));
        t.webkitTransform !== undefined && (n.animType = "webkitTransform", n.transformType = "-webkit-transform", n.transitionType = "webkitTransition", t.perspectiveProperty === undefined && t.webkitPerspective === undefined && (n.animType = !1));
        t.msTransform !== undefined && (n.animType = "msTransform", n.transformType = "-ms-transform", n.transitionType = "msTransition", t.msTransform === undefined && (n.animType = !1));
        t.transform !== undefined && n.animType !== !1 && (n.animType = "transform", n.transformType = "transform", n.transitionType = "transition");
        n.transformsEnabled = n.animType !== null && n.animType !== !1
    };
    t.prototype.setSlideClasses = function(n) {
        var t = this,
            u, i, r, f;
        t.$slider.find(".slick-slide").removeClass("slick-active").attr("aria-hidden", "true").removeClass("slick-center");
        i = t.$slider.find(".slick-slide");
        t.options.centerMode === !0 ? (u = Math.floor(t.options.slidesToShow / 2), t.options.infinite === !0 && (n >= u && n <= t.slideCount - 1 - u ? t.$slides.slice(n - u, n + u + 1).addClass("slick-active").attr("aria-hidden", "false") : (r = t.options.slidesToShow + n, i.slice(r - u + 1, r + u + 2).addClass("slick-active").attr("aria-hidden", "false")), n === 0 ? i.eq(i.length - 1 - t.options.slidesToShow).addClass("slick-center") : n === t.slideCount - 1 && i.eq(t.options.slidesToShow).addClass("slick-center")), t.$slides.eq(n).addClass("slick-center")) : n >= 0 && n <= t.slideCount - t.options.slidesToShow ? t.$slides.slice(n, n + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= t.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (f = t.slideCount % t.options.slidesToShow, r = t.options.infinite === !0 ? t.options.slidesToShow + n : n, t.options.slidesToShow == t.options.slidesToScroll && t.slideCount - n < t.options.slidesToShow ? i.slice(r - (t.options.slidesToShow - f), r + f).addClass("slick-active").attr("aria-hidden", "false") : i.slice(r, r + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        t.options.lazyLoad === "ondemand" && t.lazyLoad()
    };
    t.prototype.setupInfinite = function() {
        var t = this,
            i, r, u;
        if (t.options.fade === !0 && (t.options.centerMode = !1), t.options.infinite === !0 && t.options.fade === !1 && (r = null, t.slideCount > t.options.slidesToShow)) {
            for (u = t.options.centerMode === !0 ? t.options.slidesToShow + 1 : t.options.slidesToShow, i = t.slideCount; i > t.slideCount - u; i -= 1) r = i - 1, n(t.$slides[r]).clone(!0).attr("id", "").attr("data-slick-index", r - t.slideCount).prependTo(t.$slideTrack).addClass("slick-cloned");
            for (i = 0; i < u; i += 1) r = i, n(t.$slides[r]).clone(!0).attr("id", "").attr("data-slick-index", r + t.slideCount).appendTo(t.$slideTrack).addClass("slick-cloned");
            t.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                n(this).attr("id", "")
            })
        }
    };
    t.prototype.setPaused = function(n) {
        var t = this;
        t.options.autoplay === !0 && t.options.pauseOnHover === !0 && (t.paused = n, t.autoPlayClear())
    };
    t.prototype.selectHandler = function(t) {
        var i = this,
            u = n(t.target).is(".slick-slide") ? n(t.target) : n(t.target).parents(".slick-slide"),
            r = parseInt(u.attr("data-slick-index"));
        if (r || (r = 0), i.slideCount <= i.options.slidesToShow) {
            i.$slider.find(".slick-slide").removeClass("slick-active").attr("aria-hidden", "true");
            i.$slides.eq(r).addClass("slick-active").attr("aria-hidden", "false");
            i.options.centerMode === !0 && (i.$slider.find(".slick-slide").removeClass("slick-center"), i.$slides.eq(r).addClass("slick-center"));
            i.asNavFor(r);
            return
        }
        i.slideHandler(r)
    };
    t.prototype.slideHandler = function(n, t, i) {
        var u, f, s, e, o = null,
            r = this;
        if ((t = t || !1, r.animating !== !0 || r.options.waitForAnimate !== !0) && (r.options.fade !== !0 || r.currentSlide !== n) && !(r.slideCount <= r.options.slidesToShow)) {
            if (t === !1 && r.asNavFor(n), u = n, o = r.getLeft(u), e = r.getLeft(r.currentSlide), r.currentLeft = r.swipeLeft === null ? e : r.swipeLeft, r.options.infinite === !1 && r.options.centerMode === !1 && (n < 0 || n > r.getDotCount() * r.options.slidesToScroll)) {
                r.options.fade === !1 && (u = r.currentSlide, i !== !0 ? r.animateSlide(e, function() {
                    r.postSlide(u)
                }) : r.postSlide(u));
                return
            }
            if (r.options.infinite === !1 && r.options.centerMode === !0 && (n < 0 || n > r.slideCount - r.options.slidesToScroll)) {
                r.options.fade === !1 && (u = r.currentSlide, i !== !0 ? r.animateSlide(e, function() {
                    r.postSlide(u)
                }) : r.postSlide(u));
                return
            }
            if (r.options.autoplay === !0 && clearInterval(r.autoPlayTimer), f = u < 0 ? r.slideCount % r.options.slidesToScroll != 0 ? r.slideCount - r.slideCount % r.options.slidesToScroll : r.slideCount + u : u >= r.slideCount ? r.slideCount % r.options.slidesToScroll != 0 ? 0 : u - r.slideCount : u, r.animating = !0, r.$slider.trigger("beforeChange", [r, r.currentSlide, f]), s = r.currentSlide, r.currentSlide = f, r.setSlideClasses(r.currentSlide), r.updateDots(), r.updateArrows(), r.options.fade === !0) {
                i !== !0 ? r.fadeSlide(f, function() {
                    r.postSlide(f)
                }) : r.postSlide(f);
                r.animateHeight();
                return
            }
            i !== !0 ? r.animateSlide(o, function() {
                r.postSlide(f)
            }) : r.postSlide(f)
        }
    };
    t.prototype.startLoad = function() {
        var n = this;
        n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && (n.$prevArrow.hide(), n.$nextArrow.hide());
        n.options.dots === !0 && n.slideCount > n.options.slidesToShow && n.$dots.hide();
        n.$slider.addClass("slick-loading")
    };
    t.prototype.swipeDirection = function() {
        var i, r, u, n, t = this;
        return (i = t.touchObject.startX - t.touchObject.curX, r = t.touchObject.startY - t.touchObject.curY, u = Math.atan2(r, i), n = Math.round(u * 180 / Math.PI), n < 0 && (n = 360 - Math.abs(n)), n <= 45 && n >= 0) ? t.options.rtl === !1 ? "left" : "right" : n <= 360 && n >= 315 ? t.options.rtl === !1 ? "left" : "right" : n >= 135 && n <= 225 ? t.options.rtl === !1 ? "right" : "left" : t.options.verticalSwiping === !0 ? n >= 35 && n <= 135 ? "left" : "right" : "vertical"
    };
    t.prototype.swipeEnd = function() {
        var n = this,
            t;
        if (n.dragging = !1, n.shouldClick = n.touchObject.swipeLength > 10 ? !1 : !0, n.touchObject.curX === undefined) return !1;
        if (n.touchObject.edgeHit === !0 && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) switch (n.swipeDirection()) {
            case "left":
                t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount();
                n.slideHandler(t);
                n.currentDirection = 0;
                n.touchObject = {};
                n.$slider.trigger("swipe", [n, "left"]);
                break;
            case "right":
                t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount();
                n.slideHandler(t);
                n.currentDirection = 1;
                n.touchObject = {};
                n.$slider.trigger("swipe", [n, "right"])
        } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
    };
    t.prototype.swipeHandler = function(n) {
        var t = this;
        if (t.options.swipe !== !1 && (!("ontouchend" in document) || t.options.swipe !== !1) && (t.options.draggable !== !1 || n.type.indexOf("mouse") === -1)) {
            t.touchObject.fingerCount = n.originalEvent && n.originalEvent.touches !== undefined ? n.originalEvent.touches.length : 1;
            t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold;
            t.options.verticalSwiping === !0 && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold);
            switch (n.data.action) {
                case "start":
                    t.swipeStart(n);
                    break;
                case "move":
                    t.swipeMove(n);
                    break;
                case "end":
                    t.swipeEnd(n)
            }
        }
    };
    t.prototype.swipeMove = function(n) {
        var t = this,
            f, e, r, u, i;
        if (i = n.originalEvent !== undefined ? n.originalEvent.touches : null, !t.dragging || i && i.length !== 1) return !1;
        if (f = t.getLeft(t.currentSlide), t.touchObject.curX = i !== undefined ? i[0].pageX : n.clientX, t.touchObject.curY = i !== undefined ? i[0].pageY : n.clientY, t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curX - t.touchObject.startX, 2))), t.options.verticalSwiping === !0 && (t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curY - t.touchObject.startY, 2)))), e = t.swipeDirection(), e !== "vertical") {
            if (n.originalEvent !== undefined && t.touchObject.swipeLength > 4 && n.preventDefault(), u = (t.options.rtl === !1 ? 1 : -1) * (t.touchObject.curX > t.touchObject.startX ? 1 : -1), t.options.verticalSwiping === !0 && (u = t.touchObject.curY > t.touchObject.startY ? 1 : -1), r = t.touchObject.swipeLength, t.touchObject.edgeHit = !1, t.options.infinite === !1 && (t.currentSlide === 0 && e === "right" || t.currentSlide >= t.getDotCount() && e === "left") && (r = t.touchObject.swipeLength * t.options.edgeFriction, t.touchObject.edgeHit = !0), t.swipeLeft = t.options.vertical === !1 ? f + r * u : f + r * (t.$list.height() / t.listWidth) * u, t.options.verticalSwiping === !0 && (t.swipeLeft = f + r * u), t.options.fade === !0 || t.options.touchMove === !1) return !1;
            if (t.animating === !0) return t.swipeLeft = null, !1;
            t.setCSS(t.swipeLeft)
        }
    };
    t.prototype.swipeStart = function(n) {
        var t = this,
            i;
        if (t.touchObject.fingerCount !== 1 || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        n.originalEvent !== undefined && n.originalEvent.touches !== undefined && (i = n.originalEvent.touches[0]);
        t.touchObject.startX = t.touchObject.curX = i !== undefined ? i.pageX : n.clientX;
        t.touchObject.startY = t.touchObject.curY = i !== undefined ? i.pageY : n.clientY;
        t.dragging = !0
    };
    t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
        var n = this;
        n.$slidesCache !== null && (n.unload(), n.$slideTrack.children(this.options.slide).detach(), n.$slidesCache.appendTo(n.$slideTrack), n.reinit())
    };
    t.prototype.unload = function() {
        var t = this;
        n(".slick-cloned", t.$slider).remove();
        t.$dots && t.$dots.remove();
        t.$prevArrow && typeof t.options.prevArrow != "object" && t.$prevArrow.remove();
        t.$nextArrow && typeof t.options.nextArrow != "object" && t.$nextArrow.remove();
        t.$slides.removeClass("slick-slide slick-active slick-visible").attr("aria-hidden", "true").css("width", "")
    };
    t.prototype.unslick = function() {
        var n = this;
        n.destroy()
    };
    t.prototype.updateArrows = function() {
        var n = this,
            t;
        t = Math.floor(n.options.slidesToShow / 2);
        n.options.arrows === !0 && n.options.infinite !== !0 && n.slideCount > n.options.slidesToShow && (n.$prevArrow.removeClass("slick-disabled"), n.$nextArrow.removeClass("slick-disabled"), n.currentSlide === 0 ? (n.$prevArrow.addClass("slick-disabled"), n.$nextArrow.removeClass("slick-disabled")) : n.currentSlide >= n.slideCount - n.options.slidesToShow && n.options.centerMode === !1 ? (n.$nextArrow.addClass("slick-disabled"), n.$prevArrow.removeClass("slick-disabled")) : n.currentSlide >= n.slideCount - 1 && n.options.centerMode === !0 && (n.$nextArrow.addClass("slick-disabled"), n.$prevArrow.removeClass("slick-disabled")))
    };
    t.prototype.updateDots = function() {
        var n = this;
        n.$dots !== null && (n.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), n.$dots.find("li").eq(Math.floor(n.currentSlide / n.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    };
    t.prototype.visibility = function() {
        var n = this;
        document[n.hidden] ? (n.paused = !0, n.autoPlayClear()) : (n.paused = !1, n.autoPlay())
    };
    n.fn.slick = function() {
        var i = this,
            r = arguments[0],
            f = Array.prototype.slice.call(arguments, 1),
            e = i.length,
            n = 0,
            u;
        for (n; n < e; n++)
            if (typeof r == "object" || typeof r == "undefined" ? i[n].slick = new t(i[n], r) : u = i[n].slick[r].apply(i[n].slick, f), typeof u != "undefined") return u;
        return i
    }
}),
function(n) {
    var t = !0;
    n.flexslider = function(i, r) {
        var u = n(i);
        u.vars = n.extend({}, n.flexslider.defaults, r);
        var e = u.vars.namespace,
            y = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            p = ("ontouchstart" in window || y || window.DocumentTouch && document instanceof DocumentTouch) && u.vars.touch,
            v = "click touchend MSPointerUp keyup",
            h = "",
            w, c = u.vars.direction === "vertical",
            s = u.vars.reverse,
            o = u.vars.itemWidth > 0,
            l = u.vars.animation === "fade",
            a = u.vars.asNavFor !== "",
            f = {};
        n.data(i, "flexslider", u);
        f = {
            init: function() {
                u.animating = !1;
                u.currentSlide = parseInt(u.vars.startAt ? u.vars.startAt : 0, 10);
                isNaN(u.currentSlide) && (u.currentSlide = 0);
                u.animatingTo = u.currentSlide;
                u.atEnd = u.currentSlide === 0 || u.currentSlide === u.last;
                u.containerSelector = u.vars.selector.substr(0, u.vars.selector.search(" "));
                u.slides = n(u.vars.selector, u);
                u.container = n(u.containerSelector, u);
                u.count = u.slides.length;
                u.syncExists = n(u.vars.sync).length > 0;
                u.vars.animation === "slide" && (u.vars.animation = "swing");
                u.prop = c ? "top" : "marginLeft";
                u.args = {};
                u.manualPause = !1;
                u.stopped = !1;
                u.started = !1;
                u.startTimeout = null;
                u.transitions = !u.vars.video && !l && u.vars.useCSS && function() {
                    var i = document.createElement("div"),
                        n = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var t in n)
                        if (i.style[n[t]] !== undefined) return u.pfx = n[t].replace("Perspective", "").toLowerCase(), u.prop = "-" + u.pfx + "-transform", !0;
                    return !1
                }();
                u.ensureAnimationEnd = "";
                u.vars.controlsContainer !== "" && (u.controlsContainer = n(u.vars.controlsContainer).length > 0 && n(u.vars.controlsContainer));
                u.vars.manualControls !== "" && (u.manualControls = n(u.vars.manualControls).length > 0 && n(u.vars.manualControls));
                u.vars.customDirectionNav !== "" && (u.customDirectionNav = n(u.vars.customDirectionNav).length === 2 && n(u.vars.customDirectionNav));
                u.vars.randomize && (u.slides.sort(function() {
                    return Math.round(Math.random()) - .5
                }), u.container.empty().append(u.slides));
                u.doMath();
                u.setup("init");
                u.vars.controlNav && f.controlNav.setup();
                u.vars.directionNav && f.directionNav.setup();
                u.vars.keyboard && (n(u.containerSelector).length === 1 || u.vars.multipleKeyboard) && n(document).bind("keyup", function(n) {
                    var t = n.keyCode,
                        i;
                    u.animating || t !== 39 && t !== 37 || (i = t === 39 ? u.getTarget("next") : t === 37 ? u.getTarget("prev") : !1, u.flexAnimate(i, u.vars.pauseOnAction))
                });
                u.vars.mousewheel && u.bind("mousewheel", function(n, t) {
                    n.preventDefault();
                    var i = t < 0 ? u.getTarget("next") : u.getTarget("prev");
                    u.flexAnimate(i, u.vars.pauseOnAction)
                });
                u.vars.pausePlay && f.pausePlay.setup();
                u.vars.slideshow && u.vars.pauseInvisible && f.pauseInvisible.init();
                u.vars.slideshow && (u.vars.pauseOnHover && u.hover(function() {
                    u.manualPlay || u.manualPause || u.pause()
                }, function() {
                    u.manualPause || u.manualPlay || u.stopped || u.play()
                }), u.vars.pauseInvisible && f.pauseInvisible.isHidden() || (u.vars.initDelay > 0 ? u.startTimeout = setTimeout(u.play, u.vars.initDelay) : u.play()));
                a && f.asNav.setup();
                p && u.vars.touch && f.touch();
                (!l || l && u.vars.smoothHeight) && n(window).bind("resize orientationchange focus", f.resize);
                u.find("img").attr("draggable", "false");
                setTimeout(function() {
                    u.vars.start(u)
                }, 200)
            },
            asNav: {
                setup: function() {
                    if (u.asNav = !0, u.animatingTo = Math.floor(u.currentSlide / u.move), u.currentItem = u.currentSlide, u.slides.removeClass(e + "active-slide").eq(u.currentItem).addClass(e + "active-slide"), y) i._slider = u, u.slides.each(function() {
                        var t = this;
                        t._gesture = new MSGesture;
                        t._gesture.target = t;
                        t.addEventListener("MSPointerDown", function(n) {
                            n.preventDefault();
                            n.currentTarget._gesture && n.currentTarget._gesture.addPointer(n.pointerId)
                        }, !1);
                        t.addEventListener("MSGestureTap", function(t) {
                            t.preventDefault();
                            var i = n(this),
                                r = i.index();
                            n(u.vars.asNavFor).data("flexslider").animating || i.hasClass("active") || (u.direction = u.currentItem < r ? "next" : "prev", u.flexAnimate(r, u.vars.pauseOnAction, !1, !0, !0))
                        })
                    });
                    else u.slides.on(v, function(t) {
                        t.preventDefault();
                        var i = n(this),
                            r = i.index(),
                            f = i.offset().left - n(u).scrollLeft();
                        f <= 0 && i.hasClass(e + "active-slide") ? u.flexAnimate(u.getTarget("prev"), !0) : n(u.vars.asNavFor).data("flexslider").animating || i.hasClass(e + "active-slide") || (u.direction = u.currentItem < r ? "next" : "prev", u.flexAnimate(r, u.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    u.manualControls ? f.controlNav.setupManual() : f.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var c = u.vars.controlNav === "thumbnails" ? "control-thumbs" : "control-paging",
                        s = 1,
                        o, t, i, r;
                    if (u.controlNavScaffold = n('<ol class="' + e + "control-nav " + e + c + '"><\/ol>'), u.pagingCount > 1)
                        for (i = 0; i < u.pagingCount; i++) t = u.slides.eq(i), undefined === t.attr("data-thumb-alt") && t.attr("data-thumb-alt", ""), altText = "" !== t.attr("data-thumb-alt") ? altText = ' alt="' + t.attr("data-thumb-alt") + '"' : "", o = u.vars.controlNav === "thumbnails" ? '<img src="' + t.attr("data-thumb") + '"' + altText + "/>" : '<a href="#">' + s + "<\/a>", "thumbnails" === u.vars.controlNav && !0 === u.vars.thumbCaptions && (r = t.attr("data-thumbcaption"), "" !== r && undefined !== r && (o += '<span class="' + e + 'caption">' + r + "<\/span>")), u.controlNavScaffold.append("<li>" + o + "<\/li>"), s++;
                    u.controlsContainer ? n(u.controlsContainer).append(u.controlNavScaffold) : u.append(u.controlNavScaffold);
                    f.controlNav.set();
                    f.controlNav.active();
                    u.controlNavScaffold.delegate("a, img", v, function(t) {
                        if (t.preventDefault(), h === "" || h === t.type) {
                            var i = n(this),
                                r = u.controlNav.index(i);
                            i.hasClass(e + "active") || (u.direction = r > u.currentSlide ? "next" : "prev", u.flexAnimate(r, u.vars.pauseOnAction))
                        }
                        h === "" && (h = t.type);
                        f.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    u.controlNav = u.manualControls;
                    f.controlNav.active();
                    u.controlNav.bind(v, function(t) {
                        if (t.preventDefault(), h === "" || h === t.type) {
                            var i = n(this),
                                r = u.controlNav.index(i);
                            i.hasClass(e + "active") || (u.direction = r > u.currentSlide ? "next" : "prev", u.flexAnimate(r, u.vars.pauseOnAction))
                        }
                        h === "" && (h = t.type);
                        f.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var t = u.vars.controlNav === "thumbnails" ? "img" : "a";
                    u.controlNav = n("." + e + "control-nav li " + t, u.controlsContainer ? u.controlsContainer : u)
                },
                active: function() {
                    u.controlNav.removeClass(e + "active").eq(u.animatingTo).addClass(e + "active")
                },
                update: function(t, i) {
                    u.pagingCount > 1 && t === "add" ? u.controlNavScaffold.append(n('<li><a href="#">' + u.count + "<\/a><\/li>")) : u.pagingCount === 1 ? u.controlNavScaffold.find("li").remove() : u.controlNav.eq(i).closest("li").remove();
                    f.controlNav.set();
                    u.pagingCount > 1 && u.pagingCount !== u.controlNav.length ? u.update(i, t) : f.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var t = n('<ul class="' + e + 'direction-nav"><li class="' + e + 'nav-prev"><a class="' + e + 'prev" href="#">' + u.vars.prevText + '<\/a><\/li><li class="' + e + 'nav-next"><a class="' + e + 'next" href="#">' + u.vars.nextText + "<\/a><\/li><\/ul>");
                    u.customDirectionNav ? u.directionNav = u.customDirectionNav : u.controlsContainer ? (n(u.controlsContainer).append(t), u.directionNav = n("." + e + "direction-nav li a", u.controlsContainer)) : (u.append(t), u.directionNav = n("." + e + "direction-nav li a", u));
                    f.directionNav.update();
                    u.directionNav.bind(v, function(t) {
                        t.preventDefault();
                        var i;
                        (h === "" || h === t.type) && (i = n(this).hasClass(e + "next") ? u.getTarget("next") : u.getTarget("prev"), u.flexAnimate(i, u.vars.pauseOnAction));
                        h === "" && (h = t.type);
                        f.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var n = e + "disabled";
                    u.pagingCount === 1 ? u.directionNav.addClass(n).attr("tabindex", "-1") : u.vars.animationLoop ? u.directionNav.removeClass(n).removeAttr("tabindex") : u.animatingTo === 0 ? u.directionNav.removeClass(n).filter("." + e + "prev").addClass(n).attr("tabindex", "-1") : u.animatingTo === u.last ? u.directionNav.removeClass(n).filter("." + e + "next").addClass(n).attr("tabindex", "-1") : u.directionNav.removeClass(n).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var t = n('<div class="' + e + 'pauseplay"><a href="#"><\/a><\/div>');
                    u.controlsContainer ? (u.controlsContainer.append(t), u.pausePlay = n("." + e + "pauseplay a", u.controlsContainer)) : (u.append(t), u.pausePlay = n("." + e + "pauseplay a", u));
                    f.pausePlay.update(u.vars.slideshow ? e + "pause" : e + "play");
                    u.pausePlay.bind(v, function(t) {
                        t.preventDefault();
                        (h === "" || h === t.type) && (n(this).hasClass(e + "pause") ? (u.manualPause = !0, u.manualPlay = !1, u.pause()) : (u.manualPause = !1, u.manualPlay = !0, u.play()));
                        h === "" && (h = t.type);
                        f.setToClearWatchedEvent()
                    })
                },
                update: function(n) {
                    n === "play" ? u.pausePlay.removeClass(e + "pause").addClass(e + "play").html(u.vars.playText) : u.pausePlay.removeClass(e + "play").addClass(e + "pause").html(u.vars.pauseText)
                }
            },
            touch: function() {
                var p, w, f, r, n, e, d, b, k, h = !1,
                    a = 0,
                    v = 0,
                    t = 0;
                if (y) {
                    i.style.msTouchAction = "none";
                    i._gesture = new MSGesture;
                    i._gesture.target = i;
                    i.addEventListener("MSPointerDown", g, !1);
                    i._slider = u;
                    i.addEventListener("MSGestureChange", nt, !1);
                    i.addEventListener("MSGestureEnd", tt, !1);

                    function g(n) {
                        n.stopPropagation();
                        u.animating ? n.preventDefault() : (u.pause(), i._gesture.addPointer(n.pointerId), t = 0, r = c ? u.h : u.w, e = Number(new Date), f = o && s && u.animatingTo === u.last ? 0 : o && s ? u.limit - (u.itemW + u.vars.itemMargin) * u.move * u.animatingTo : o && u.currentSlide === u.last ? u.limit : o ? (u.itemW + u.vars.itemMargin) * u.move * u.currentSlide : s ? (u.last - u.currentSlide + u.cloneOffset) * r : (u.currentSlide + u.cloneOffset) * r)
                    }

                    function nt(u) {
                        var o, s, a;
                        if (u.stopPropagation(), o = u.target._slider, o) {
                            if (s = -u.translationX, a = -u.translationY, t = t + (c ? a : s), n = t, h = c ? Math.abs(t) < Math.abs(-s) : Math.abs(t) < Math.abs(-a), u.detail === u.MSGESTURE_FLAG_INERTIA) {
                                setImmediate(function() {
                                    i._gesture.stop()
                                });
                                return
                            }(!h || Number(new Date) - e > 500) && (u.preventDefault(), !l && o.transitions && (o.vars.animationLoop || (n = t / (o.currentSlide === 0 && t < 0 || o.currentSlide === o.last && t > 0 ? Math.abs(t) / r + 2 : 1)), o.setProps(f + n, "setTouch")))
                        }
                    }

                    function tt(i) {
                        var u, o, c;
                        (i.stopPropagation(), u = i.target._slider, u) && (u.animatingTo !== u.currentSlide || h || n === null || (o = s ? -n : n, c = o > 0 ? u.getTarget("next") : u.getTarget("prev"), u.canAdvance(c) && (Number(new Date) - e < 550 && Math.abs(o) > 50 || Math.abs(o) > r / 2) ? u.flexAnimate(c, u.vars.pauseOnAction) : l || u.flexAnimate(u.currentSlide, u.vars.pauseOnAction, !0)), p = null, w = null, n = null, f = null, t = 0)
                    }
                } else d = function(n) {
                    u.animating ? n.preventDefault() : (window.navigator.msPointerEnabled || n.touches.length === 1) && (u.pause(), r = c ? u.h : u.w, e = Number(new Date), a = n.touches[0].pageX, v = n.touches[0].pageY, f = o && s && u.animatingTo === u.last ? 0 : o && s ? u.limit - (u.itemW + u.vars.itemMargin) * u.move * u.animatingTo : o && u.currentSlide === u.last ? u.limit : o ? (u.itemW + u.vars.itemMargin) * u.move * u.currentSlide : s ? (u.last - u.currentSlide + u.cloneOffset) * r : (u.currentSlide + u.cloneOffset) * r, p = c ? v : a, w = c ? a : v, i.addEventListener("touchmove", b, !1), i.addEventListener("touchend", k, !1))
                }, b = function(t) {
                    a = t.touches[0].pageX;
                    v = t.touches[0].pageY;
                    n = c ? p - v : p - a;
                    h = c ? Math.abs(n) < Math.abs(a - w) : Math.abs(n) < Math.abs(v - w);
                    (!h || Number(new Date) - e > 500) && (t.preventDefault(), !l && u.transitions && (u.vars.animationLoop || (n = n / (u.currentSlide === 0 && n < 0 || u.currentSlide === u.last && n > 0 ? Math.abs(n) / r + 2 : 1)), u.setProps(f + n, "setTouch")))
                }, k = function() {
                    if (i.removeEventListener("touchmove", b, !1), u.animatingTo === u.currentSlide && !h && !(n === null)) {
                        var t = s ? -n : n,
                            o = t > 0 ? u.getTarget("next") : u.getTarget("prev");
                        u.canAdvance(o) && (Number(new Date) - e < 550 && Math.abs(t) > 50 || Math.abs(t) > r / 2) ? u.flexAnimate(o, u.vars.pauseOnAction) : l || u.flexAnimate(u.currentSlide, u.vars.pauseOnAction, !0)
                    }
                    i.removeEventListener("touchend", k, !1);
                    p = null;
                    w = null;
                    n = null;
                    f = null
                }, i.addEventListener("touchstart", d, !1)
            },
            resize: function() {
                !u.animating && u.is(":visible") && (o || u.doMath(), l ? f.smoothHeight() : o ? (u.slides.width(u.computedW), u.update(u.pagingCount), u.setProps()) : c ? (u.viewport.height(u.h), u.setProps(u.h, "setTotal")) : (u.vars.smoothHeight && f.smoothHeight(), u.newSlides.width(u.computedW), u.setProps(u.computedW, "setTotal")))
            },
            smoothHeight: function(n) {
                if (!c || l) {
                    var t = l ? u : u.viewport;
                    n ? t.animate({
                        height: u.slides.eq(u.animatingTo).height()
                    }, n) : t.height(u.slides.eq(u.animatingTo).height())
                }
            },
            sync: function(t) {
                var i = n(u.vars.sync).data("flexslider"),
                    r = u.animatingTo;
                switch (t) {
                    case "animate":
                        i.flexAnimate(r, u.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        i.playing || i.asNav || i.play();
                        break;
                    case "pause":
                        i.pause()
                }
            },
            uniqueID: function(t) {
                return t.filter("[id]").add(t.find("[id]")).each(function() {
                    var t = n(this);
                    t.attr("id", t.attr("id") + "_clone")
                }), t
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var n = f.pauseInvisible.getHiddenProp(),
                        t;
                    n && (t = n.replace(/[H|h]idden/, "") + "visibilitychange", document.addEventListener(t, function() {
                        f.pauseInvisible.isHidden() ? u.startTimeout ? clearTimeout(u.startTimeout) : u.pause() : u.started ? u.play() : u.vars.initDelay > 0 ? setTimeout(u.play, u.vars.initDelay) : u.play()
                    }))
                },
                isHidden: function() {
                    var n = f.pauseInvisible.getHiddenProp();
                    return n ? document[n] : !1
                },
                getHiddenProp: function() {
                    var t = ["webkit", "moz", "ms", "o"],
                        n;
                    if ("hidden" in document) return "hidden";
                    for (n = 0; n < t.length; n++)
                        if (t[n] + "Hidden" in document) return t[n] + "Hidden";
                    return null
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(w);
                w = setTimeout(function() {
                    h = ""
                }, 3e3)
            }
        };
        u.flexAnimate = function(t, i, r, h, v) {
            var w, y, d, b, k;
            if (u.vars.animationLoop || t === u.currentSlide || (u.direction = t > u.currentSlide ? "next" : "prev"), a && u.pagingCount === 1 && (u.direction = u.currentItem < t ? "next" : "prev"), !u.animating && (u.canAdvance(t, v) || r) && u.is(":visible")) {
                if (a && h)
                    if (w = n(u.vars.asNavFor).data("flexslider"), u.atEnd = t === 0 || t === u.count - 1, w.flexAnimate(t, !0, !1, !0, v), u.direction = u.currentItem < t ? "next" : "prev", w.direction = u.direction, Math.ceil((t + 1) / u.visible) - 1 !== u.currentSlide && t !== 0) u.currentItem = t, u.slides.removeClass(e + "active-slide").eq(t).addClass(e + "active-slide"), t = Math.floor(t / u.visible);
                    else return u.currentItem = t, u.slides.removeClass(e + "active-slide").eq(t).addClass(e + "active-slide"), !1;
                u.animating = !0;
                u.animatingTo = t;
                i && u.pause();
                u.vars.before(u);
                u.syncExists && !v && f.sync("animate");
                u.vars.controlNav && f.controlNav.active();
                o || u.slides.removeClass(e + "active-slide").eq(t).addClass(e + "active-slide");
                u.atEnd = t === 0 || t === u.last;
                u.vars.directionNav && f.directionNav.update();
                t === u.last && (u.vars.end(u), u.vars.animationLoop || u.pause());
                l ? p ? (u.slides.eq(u.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), u.slides.eq(t).css({
                    opacity: 1,
                    zIndex: 2
                }), u.wrapup(y)) : (u.slides.eq(u.currentSlide).css({
                    zIndex: 1
                }).animate({
                    opacity: 0
                }, u.vars.animationSpeed, u.vars.easing), u.slides.eq(t).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, u.vars.animationSpeed, u.vars.easing, u.wrapup)) : (y = c ? u.slides.filter(":first").height() : u.computedW, o ? (d = u.vars.itemMargin, k = (u.itemW + d) * u.move * u.animatingTo, b = k > u.limit && u.visible !== 1 ? u.limit : k) : b = u.currentSlide === 0 && t === u.count - 1 && u.vars.animationLoop && u.direction !== "next" ? s ? (u.count + u.cloneOffset) * y : 0 : u.currentSlide === u.last && t === 0 && u.vars.animationLoop && u.direction !== "prev" ? s ? 0 : (u.count + 1) * y : s ? (u.count - 1 - t + u.cloneOffset) * y : (t + u.cloneOffset) * y, u.setProps(b, "", u.vars.animationSpeed), u.transitions ? (u.vars.animationLoop && u.atEnd || (u.animating = !1, u.currentSlide = u.animatingTo), u.container.unbind("webkitTransitionEnd transitionend"), u.container.bind("webkitTransitionEnd transitionend", function() {
                    clearTimeout(u.ensureAnimationEnd);
                    u.wrapup(y)
                }), clearTimeout(u.ensureAnimationEnd), u.ensureAnimationEnd = setTimeout(function() {
                    u.wrapup(y)
                }, u.vars.animationSpeed + 100)) : u.container.animate(u.args, u.vars.animationSpeed, u.vars.easing, function() {
                    u.wrapup(y)
                }));
                u.vars.smoothHeight && f.smoothHeight(u.vars.animationSpeed)
            }
        };
        u.wrapup = function(n) {
            l || o || (u.currentSlide === 0 && u.animatingTo === u.last && u.vars.animationLoop ? u.setProps(n, "jumpEnd") : u.currentSlide === u.last && u.animatingTo === 0 && u.vars.animationLoop && u.setProps(n, "jumpStart"));
            u.animating = !1;
            u.currentSlide = u.animatingTo;
            u.vars.after(u)
        };
        u.animateSlides = function() {
            !u.animating && t && u.flexAnimate(u.getTarget("next"))
        };
        u.pause = function() {
            clearInterval(u.animatedSlides);
            u.animatedSlides = null;
            u.playing = !1;
            u.vars.pausePlay && f.pausePlay.update("play");
            u.syncExists && f.sync("pause")
        };
        u.play = function() {
            u.playing && clearInterval(u.animatedSlides);
            u.animatedSlides = u.animatedSlides || setInterval(u.animateSlides, u.vars.slideshowSpeed);
            u.started = u.playing = !0;
            u.vars.pausePlay && f.pausePlay.update("pause");
            u.syncExists && f.sync("play")
        };
        u.stop = function() {
            u.pause();
            u.stopped = !0
        };
        u.canAdvance = function(n, t) {
            var i = a ? u.pagingCount - 1 : u.last;
            return t ? !0 : a && u.currentItem === u.count - 1 && n === 0 && u.direction === "prev" ? !0 : a && u.currentItem === 0 && n === u.pagingCount - 1 && u.direction !== "next" ? !1 : n === u.currentSlide && !a ? !1 : u.vars.animationLoop ? !0 : u.atEnd && u.currentSlide === 0 && n === i && u.direction !== "next" ? !1 : u.atEnd && u.currentSlide === i && n === 0 && u.direction === "next" ? !1 : !0
        };
        u.getTarget = function(n) {
            return u.direction = n, n === "next" ? u.currentSlide === u.last ? 0 : u.currentSlide + 1 : u.currentSlide === 0 ? u.last : u.currentSlide - 1
        };
        u.setProps = function(n, t, i) {
            var r = function() {
                var i = n ? n : (u.itemW + u.vars.itemMargin) * u.move * u.animatingTo,
                    r = function() {
                        if (o) return t === "setTouch" ? n : s && u.animatingTo === u.last ? 0 : s ? u.limit - (u.itemW + u.vars.itemMargin) * u.move * u.animatingTo : u.animatingTo === u.last ? u.limit : i;
                        switch (t) {
                            case "setTotal":
                                return s ? (u.count - 1 - u.currentSlide + u.cloneOffset) * n : (u.currentSlide + u.cloneOffset) * n;
                            case "setTouch":
                                return s ? n : n;
                            case "jumpEnd":
                                return s ? n : u.count * n;
                            case "jumpStart":
                                return s ? u.count * n : n;
                            default:
                                return n
                        }
                    }();
                return r * -1 + "px"
            }();
            u.transitions && (r = c ? "translate3d(0," + r + ",0)" : "translate3d(" + r + ",0,0)", i = i !== undefined ? i / 1e3 + "s" : "0s", u.container.css("-" + u.pfx + "-transition-duration", i), u.container.css("transition-duration", i));
            u.args[u.prop] = r;
            (u.transitions || i === undefined) && u.container.css(u.args);
            u.container.css("transform", r)
        };
        u.setup = function(t) {
            if (l) u.slides.css({
                width: "100%",
                float: "left",
                marginRight: "-100%",
                position: "relative"
            }), t === "init" && (p ? u.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + u.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(u.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : u.vars.fadeFirstSlide == !1 ? u.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(u.currentSlide).css({
                zIndex: 2
            }).css({
                opacity: 1
            }) : u.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(u.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, u.vars.animationSpeed, u.vars.easing)), u.vars.smoothHeight && f.smoothHeight();
            else {
                var i, r;
                t === "init" && (u.viewport = n('<div class="' + e + 'viewport"><\/div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(u).append(u.container), u.cloneCount = 0, u.cloneOffset = 0, s && (r = n.makeArray(u.slides).reverse(), u.slides = n(r), u.container.empty().append(u.slides)));
                u.vars.animationLoop && !o && (u.cloneCount = 2, u.cloneOffset = 1, t !== "init" && u.container.find(".clone").remove(), u.container.append(f.uniqueID(u.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(f.uniqueID(u.slides.last().clone().addClass("clone")).attr("aria-hidden", "true")));
                u.newSlides = n(u.vars.selector, u);
                i = s ? u.count - 1 - u.currentSlide + u.cloneOffset : u.currentSlide + u.cloneOffset;
                c && !o ? (u.container.height((u.count + u.cloneCount) * 200 + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    u.newSlides.css({
                        display: "block"
                    });
                    u.doMath();
                    u.viewport.height(u.h);
                    u.setProps(i * u.h, "init")
                }, t === "init" ? 100 : 0)) : (u.container.width((u.count + u.cloneCount) * 200 + "%"), u.setProps(i * u.computedW, "init"), setTimeout(function() {
                    u.doMath();
                    u.newSlides.css({
                        width: u.computedW,
                        marginRight: u.computedM,
                        float: "left",
                        display: "block"
                    });
                    u.vars.smoothHeight && f.smoothHeight()
                }, t === "init" ? 100 : 0))
            }
            o || u.slides.removeClass(e + "active-slide").eq(u.currentSlide).addClass(e + "active-slide");
            u.vars.init(u)
        };
        u.doMath = function() {
            var r = u.slides.first(),
                n = u.vars.itemMargin,
                t = u.vars.minItems,
                i = u.vars.maxItems;
            u.w = u.viewport === undefined ? u.width() : u.viewport.width();
            u.h = r.height();
            u.boxPadding = r.outerWidth() - r.width();
            o ? (u.itemT = u.vars.itemWidth + n, u.itemM = n, u.minW = t ? t * u.itemT : u.w, u.maxW = i ? i * u.itemT - n : u.w, u.itemW = u.minW > u.w ? (u.w - n * (t - 1)) / t : u.maxW < u.w ? (u.w - n * (i - 1)) / i : u.vars.itemWidth > u.w ? u.w : u.vars.itemWidth, u.visible = Math.floor(u.w / u.itemW), u.move = u.vars.move > 0 && u.vars.move < u.visible ? u.vars.move : u.visible, u.pagingCount = Math.ceil((u.count - u.visible) / u.move + 1), u.last = u.pagingCount - 1, u.limit = u.pagingCount === 1 ? 0 : u.vars.itemWidth > u.w ? u.itemW * (u.count - 1) + n * (u.count - 1) : (u.itemW + n) * u.count - u.w - n) : (u.itemW = u.w, u.itemM = n, u.pagingCount = u.count, u.last = u.count - 1);
            u.computedW = u.itemW - u.boxPadding;
            u.computedM = u.itemM
        };
        u.update = function(n, t) {
            u.doMath();
            o || (n < u.currentSlide ? u.currentSlide += 1 : n <= u.currentSlide && n !== 0 && (u.currentSlide -= 1), u.animatingTo = u.currentSlide);
            u.vars.controlNav && !u.manualControls && (t === "add" && !o || u.pagingCount > u.controlNav.length ? f.controlNav.update("add") : (t === "remove" && !o || u.pagingCount < u.controlNav.length) && (o && u.currentSlide > u.last && (u.currentSlide -= 1, u.animatingTo -= 1), f.controlNav.update("remove", u.last)));
            u.vars.directionNav && f.directionNav.update()
        };
        u.addSlide = function(t, i) {
            var r = n(t);
            u.count += 1;
            u.last = u.count - 1;
            c && s ? i !== undefined ? u.slides.eq(u.count - i).after(r) : u.container.prepend(r) : i !== undefined ? u.slides.eq(i).before(r) : u.container.append(r);
            u.update(i, "add");
            u.slides = n(u.vars.selector + ":not(.clone)", u);
            u.setup();
            u.vars.added(u)
        };
        u.removeSlide = function(t) {
            var i = isNaN(t) ? u.slides.index(n(t)) : t;
            u.count -= 1;
            u.last = u.count - 1;
            isNaN(t) ? n(t, u.slides).remove() : c && s ? u.slides.eq(u.last).remove() : u.slides.eq(t).remove();
            u.doMath();
            u.update(i, "remove");
            u.slides = n(u.vars.selector + ":not(.clone)", u);
            u.setup();
            u.vars.removed(u)
        };
        f.init()
    };
    n(window).blur(function() {
        t = !1
    }).focus(function() {
        t = !0
    });
    n.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        fadeFirstSlide: !0,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        customDirectionNav: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    };
    n.fn.flexslider = function(t) {
        if (t === undefined && (t = {}), typeof t == "object") return this.each(function() {
            var i = n(this),
                u = t.selector ? t.selector : ".slides > li",
                r = i.find(u);
            r.length === 1 && t.allowOneSlide === !0 || r.length === 0 ? (r.fadeIn(400), t.start && t.start(i)) : i.data("flexslider") === undefined && new n.flexslider(this, t)
        });
        var i = n(this).data("flexslider");
        switch (t) {
            case "play":
                i.play();
                break;
            case "pause":
                i.pause();
                break;
            case "stop":
                i.stop();
                break;
            case "next":
                i.flexAnimate(i.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                i.flexAnimate(i.getTarget("prev"), !0);
                break;
            default:
                typeof t == "number" && i.flexAnimate(t, !0)
        }
    }
}(jQuery);
var departSelectors = {
        departPlace: "#departPlace",
        departPlace2: "#departPlace2"
    },
    destinationSelectors = {
        destination: "#destination",
        destination2: "#destination2"
    },
    isMobile = !1,
    language = "vi",
    $departPlace = $(departSelectors.departPlace + ", " + departSelectors.departPlace2),
    $destination = $(destinationSelectors.destination + ", " + destinationSelectors.destination2);
$(window).width() < 768 && (isMobile = !0);
$("#departPlace").focus(function() {
    $(this).on("mouseup.a keyup.a", function() {
        $(this).off("mouseup.a keyup.a");
        $(this).select()
    })
});
$("#destination").focus(function() {
    $(this).on("mouseup.a keyup.a", function() {
        $(this).off("mouseup.a keyup.a");
        $(this).select()
    })
});
$("#departPlace").on("keydown", function(n) {
    var t = n.keyCode || n.which;
    (t == 8 || t == 46) && ($("#start-point-type").val(""), $("#start-point-id").val(""))
}).on("blur", function() {
    this.value = $.trim(this.value);
    this.value && $(this).data("label") && (this.value = $(this).data("label"))
});
$("#destination").on("keydown", function(n) {
    var t = n.keyCode || n.which;
    (t == 8 || t == 46) && ($("#stop-point-type").val(""), $("#stop-point-id").val(""))
}).on("blur", function() {
    this.value = $.trim(this.value);
    this.value && $(this).data("label") && (this.value = $(this).data("label"))
});
(function(n, t) {
    var w, i, v;
    try {
        function o(n) {
            var r, t;
            if (n.length == 0) return null;
            var i = {},
                u = n[0],
                f = 1;
            for (r = 0; r < n.length; r++) t = n[r], i[t] == null ? i[t] = 1 : i[t]++, i[t] > f && (u = t, f = i[t]);
            return u
        }

        function u(n) {
            try {
                var t = JSON.parse(n || "[]");
                return Object.prototype.toString.call(t) !== "[object Array]" ? [] : t
            } catch (i) {
                return []
            }
        }

        function b() {
            return t ? t : null
        }

        function k() {
            if (!t) return !1;
            for (var n = 0, e, i = ["fromType", "#start-point-type", "fromId", "#start-point-id", "fromName", "#departPlace", "toType", "#stop-point-type", "toId", "#stop-point-id", "toName", "#destination"], o = i.length, r, f; n < i.length; n += 2) e = n + 1, r = u(t[i[n]]), f = $(i[e]).val().replace(/,/ig), f && (r.unshift(f), r.length > 20 && (r.length = 20), t[i[n]] = JSON.stringify(r))
        }
        $("#searchForm").on("submit", k);
        var y = $("#banggia .table-banggia"),
            s = [],
            p = [],
            h = [],
            c = [],
            l = !1;
        if (y && y.length > 0 && (l = !0, w = y.find("tbody tr"), $.each(w, function(n, t) {
                s.push(+$(t).attr("data-fromid"));
                p.push($(t).attr("data-fromname"));
                h.push(+$(t).attr("data-toid"));
                c.push($(t).attr("data-toname"))
            })), i = b(), i && i.fromId) {
            var r = [],
                f = [],
                e = [],
                a = 0;
            if (l ? $.each(u(i.fromId), function(n, t) {
                    s.indexOf(t) >= 0 && (r.push(+t), f.push(p[s.indexOf(t)]), e.push(1))
                }) : (r = u(i.fromId), f = u(i.fromName), e = u(i.fromType)), r.length > 0) return a = o(r), $("#start-point-type").val(o(e)), $("#start-point-id").val(a), $("#departPlace").val(o(f)), i.toId && (r = [], f = [], e = [], l ? ($.each(u(i.toId), function(n, t) {
                h.indexOf(t) >= 0 && t != a && (r.push(+t), f.push(c[h.indexOf(t)]), e.push(1))
            }), r.length == 0 && (v = s.indexOf(a), r.push(h[v]), f.push(c[v]), e.push(1))) : (r = u(i.toId), f = u(i.toName), e = u(i.toType)), $("#stop-point-type").val(o(e)), $("#stop-point-id").val(o(r)), $("#destination").val(o(f))), !0
        }
        if (!n.geolocation) return !1;
        n.geolocation.getCurrentPosition(function(n) {
            var t = new google.maps.Geocoder,
                i = new google.maps.LatLng(n.coords.latitude, n.coords.longitude);
            t.geocode({
                latLng: i
            }, function(n, t) {
                var f, e, o, i, r, a, u;
                if (t == google.maps.GeocoderStatus.OK) {
                    for (r in n[0].address_components)
                        if (f = n[0].address_components[r], f.types[0] === "administrative_area_level_1")
                            for (e = f.long_name, o = locdau(e), r = 0, a = statecity.length; r < a; r++)
                                if (i = statecity[r], ~locdau(i.label).indexOf(o)) {
                                    l ? (u = s.indexOf(+i.StateId), u >= 0 ? ($("#departPlace").val(i.value), i.CityId > 0 ? ($("#start-point-type").val(2), $("#start-point-id").val(i.CityId)) : ($("#start-point-type").val(1), $("#start-point-id").val(i.StateId)), $("#stop-point-type").val(1), $("#stop-point-id").val(h[u]), $("#destination").val(c[u])) : ($("#start-point-type").val(1), $("#start-point-id").val(s[0] || null), $("#departPlace").val(p[0] || null), $("#stop-point-type").val(1), $("#stop-point-id").val(h[0] || null), $("#destination").val(c[0] || null))) : ($("#departPlace").val(i.value), i.CityId > 0 ? ($("#start-point-type").val(2), $("#start-point-id").val(i.CityId)) : ($("#start-point-type").val(1), $("#start-point-id").val(i.StateId)));
                                    break
                                }
                } else console && console.log("Geocoder failed due to: " + t)
            })
        })
    } catch (d) {
        console && console.log(d)
    }
})(navigator, localStorage);
ajaxQueue = $({});
$.ajaxQueue = function(n) {
    var t = n.complete;
    ajaxQueue.queue(function(i) {
        n.complete = function() {
            t && t.apply(this, arguments);
            i()
        };
        $.ajax(n)
    })
};
slideshowSpeedTime = 1e4;
$(document).ready(function() {
    var i = location.href.toLowerCase(),
        n = i.indexOf("en-us") > -1 ? "en" : "vi",
        t = "Tiếng Việt";
    n == "en" && (t = "English");
    InitHomePage(n);
    initCustomDatePicker(!0, n);
    initSearchTicketWidget();
    GetPopularRoute();
    GetFeaturedBusInfo();
    GetFeaturedBusStopInfo();
    GetFeaturedLatestNews();
    dataLayer.push({
        event: "PageType",
        language: t,
        pagetype: "Trang chủ"
    })
});
$(window).load(function() {
    setTimeout(function() {
        window.vxrMobileApp == !0 && (console.log("start"), $.ajax({
            type: "post",
            url: "/vi-VN/Support/SetVxrMobileAppSession",
            data: {
                vxrMobileApp: "true"
            },
            success: function(n) {
                console.log(n);
                console.log("set ok")
            },
            error: function() {
                console.log("error when set Mobile")
            }
        }))
    }, 500)
})