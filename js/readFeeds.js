/**
 * Created by rmeghl on 5/1/2014.
 */

(function ($) {
//    var FEED_URL = "http://www.blogname.blogspot.com/feeds/posts/default?alt=rss";
    var FEED_URL = "http://blogname.blogspot.com/feeds/comments/default?alt=rss";
    var loopCount = 0, lastItemHeight = 0;
    var $feedItems = $(".results_item");
    var timer = loopCount == 1 || loopCount == 2 ? 3000 : 4000;
    var intervalId = 0;

    function feedLoop() {
        if (loopCount <= $feedItems.length - 1) {
            lastItemHeight += $(".results_item:eq(" + loopCount + ")").height();
            $feedItems.css({
                "transform": "translateY(-" + lastItemHeight + "px)"
            });
            loopCount++;
        } else {
            clearInterval(intervalId);
        }
    }

    $(".reset").on("click", function () {
        loopCount = 0;
        lastItemHeight = 0;
        $feedItems.css({
            "transform": "translateY(0px)"
        });
        clearInterval(intervalId);
        intervalId = setInterval(feedLoop, timer);
    });

    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(FEED_URL),
        dataType: 'jsonp',
        success: function (response) {
            console.log("From Success : ");
            console.log(response);
            feedLoop();
            loopCount++;
            if (loopCount <= $feedItems.length - 1) {
                intervalId = setInterval(feedLoop, timer);
            }
        },
        error: function (response) {
            console.log("From Error : ");
            console.log(response);
        }
    });
})(jQuery);
