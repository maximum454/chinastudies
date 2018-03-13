//= partials/jquery.min.js
//= partials/slick.min.js

$(function () {
    /*link*/
    $("a[href='#']").click(function () {
        return false;
    });

    $('.js-fast-news').slick({
        infinite: true,
        dots: false,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000
    });
    $('.js-slider-strategy').slick({
        infinite: true,
        dots: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000
    });
    
    $('.js-search').on('click', function () {
        $('.header__search').toggle();
        $('.header__search input').focus();
    });
});

