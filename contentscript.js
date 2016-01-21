(function () {
    var t_id = location.href.match(/teacher\/info\/(\w+)/)[1];
    var date = new Date(new Date().getFullYear() + '-' + $('.teacher .cnt').first().children('span').first().text().replace('月', '-').replace('日', ''));
    $(".teacher ul").each(function (i) {
        var month = (date.getMonth() + 1);
        var day = date.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        var cur_datestr = date.getFullYear() + '' + month + '' + day;
        var cur_timeInt = (new Date().getHours() * 2) + 4;
        $(this).children('li').each(function (key, value) {
            var timeInt = key + 13;

            if (i === 0 && timeInt < cur_timeInt) {
                return;
            }
            var datetime_str = cur_datestr + '_' + timeInt;
            if ($(this).children('span.disable').length > 0) {
                $(this).html('<a class="disable btn_check_status" style="cursor: pointer;" data-datetime="' + datetime_str + '" href="javascript:void(0)">CLOSED</a>');
            }
        });
        date.setDate(date.getDate() + 1);
    });

    function check_schedule(self) {
        $.get('/reserve/course?t_id=' + t_id + '&date_time=' + $(self).data('datetime') + '&appointType=single', function (html) {
            if (html.search('不能被预约') > -1) {
                $(self).parent().html("<span class='disable'>未 开 课</span>");
            } else if (html.search('至少提前半小时') > -1) {
                $(self).parent().html("<span class='disable'>CLOSED</span>");
            } else {
                $(self).removeClass('btn_check_status disable').addClass('active u-btn').css({'cursor': 'context-menu',
                    "backgroundColor": "#ff8277",
                    "borderColor": "#ff8277"}).html("被 预 约");
            }
        });
    }

    $(".teacher ul li").on('click', '.btn_check_status', function () {
        check_schedule(this);
    });

    $(".teacher .cnt").css('cursor', 'pointer').on('click', function () {
        $(this).siblings('ul').find(".btn_check_status").each(function (i, n) {
            check_schedule(this);
        });
    });


})(jQuery);
