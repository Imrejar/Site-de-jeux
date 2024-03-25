$(document).ready(function () {
    $(".custom-carousel .item").on("click", function () {
      var gameLink = $(this).data("href");
      if (gameLink) {
        window.location.href = gameLink;
      }
    });
  });
