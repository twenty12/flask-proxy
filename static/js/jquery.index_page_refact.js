function moveScroller() {
    var $anchor = $("#scroller-anchor");
    var $scroller = $('#scroller');
    var $map = $('#map-div');

    var move = function() {
        var st = $(window).scrollTop();
        var ot = $anchor.offset().top;
        if(st > ot) {
            $scroller.addClass('fixedNav');
            $scroller.removeClass('relativeNav');
            $map.addClass('fixedMap');
            $map.removeClass('relativeaMap');
        } else {
            $scroller.removeClass('fixedNav');
            $scroller.addClass('relativeNav');
            $map.removeClass('fixedMap');
            $map.addClass('relativeMap');
        }
    };
    $(window).scroll(move);
    move();
}