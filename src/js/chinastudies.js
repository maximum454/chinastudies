//= partials/jquery.min.js
//= partials/slick.min.js

$(function () {
    /*link*/
    $("a[href='#']").click(function () {
        return false;
    });
    if($main_slider.size() > 0){
        $main_slider.slick({
            infinite: true,
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            centerMode: true,
            centerPadding:'0',
            variableWidth: true
        });
    }
});

