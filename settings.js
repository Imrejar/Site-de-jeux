// JavaScript

$(document).ready(function () {
    $(".custom-carousel .item").mouseenter(function () {
        $(".custom-carousel .item").not($(this)).removeClass("active");
        $(this).toggleClass("active");
    }).mouseleave(function () {
        $(this).removeClass("active");
    });
});
