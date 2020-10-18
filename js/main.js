// Fullpage
$(document).ready(function () {
    $("#fullpage").fullpage({
      menu: "#menu",
      anchors: ["intro", "about", "products", "contact"],
      autoScrolling: true,
      scrollHorizontally: true,
      responsiveWidth: 1000,
      afterLoad: function (origin) {
        $(".intro").addClass("animate__fadeIn");
      },
      onLeave: function (origin, index) {
        if ($(window).width() > 1000) {
          if (origin.index === 0) {
            $(".about").addClass("animate__fadeIn");
          }
          if (origin.index === 1) {
            $(".products").addClass("animate__fadeIn");
          }
          if (origin.index === 2) {
            $(".contact").addClass("animate__fadeIn");
          }
        }
      },
    });
    // Intro section down arrow
    $(".arrowDown").click(function () {
      $.fn.fullpage.moveSectionDown();
    });
  });