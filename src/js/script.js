function toggle(elemID) {
  const elem = document.getElementById(elemID);

  if (elem.style.display === "block") {
    elem.style.display = "none";
  } else {
    elem.style.display = "block";
  }
}

console.log("coucou");
console.log("crotte");
console.log("Doctolib");
// console.log("RIP Naya Rivera <3");

$(document).ready(function () {
  $(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
    mobileFirst: false,
  });

  $(".slider-nav").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: true,
    centerMode: true,
    focusOnSelect: true,
    autoplay: false,
    autoplaySpeed: 5000,
    mobileFirst: false,
    pauseOnHover: false,
    pauseOnFocus: true,
    centerPadding: 0,
  });
});

if ($(window).width() < 768) {
  $(document).ready(function () {
    $(".slider-for").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: ".slider-nav",
      mobileFirst: false,
    });

    $(".slider-nav").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: ".slider-for",
      dots: true,
      centerMode: true,
      focusOnSelect: true,
      autoplay: false,
      autoplaySpeed: 5000,
      mobileFirst: false,
      pauseOnHover: false,
      pauseOnFocus: true,
      centerPadding: 0,
    });
  });
} else {
  $(document).ready(function () {
    $(".slider-for").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: ".slider-nav",
      mobileFirst: false,
    });

    $(".slider-nav").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: ".slider-for",
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      autoplay: false,
      autoplaySpeed: 5000,
      mobileFirst: false,
      pauseOnHover: false,
      pauseOnFocus: true,
      centerPadding: 0,
    });
  });
}

$(window).resize(function () {
  location.reload();
});

if ($(window).width() < 768) {
  $(document).ready(function () {
    $(".slider-for").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: ".slider-nav",
      mobileFirst: false,
    });

    $(".slider-nav").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: ".slider-for",
      dots: true,
      centerMode: true,
      focusOnSelect: true,
      autoplay: false,
      autoplaySpeed: 5000,
      mobileFirst: false,
      pauseOnHover: false,
      pauseOnFocus: true,
      centerPadding: 0,
    });
  });
} else {
  $(document).ready(function () {
    $(".slider-for").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: ".slider-nav",
      mobileFirst: false,
    });

    $(".slider-nav").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: ".slider-for",
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      autoplay: false,
      autoplaySpeed: 5000,
      mobileFirst: false,
      pauseOnHover: false,
      pauseOnFocus: true,
      centerPadding: 0,
    });
  });
}

function tabLoop() {
  tabTimeout = setTimeout(function () {
    var $next = $(".w-tab-menu").children(".w--current:first").next();

    if ($next.length) {
      $next.click(); // click resets timeout, so no need for interval
    } else {
      $(".w-tab-link:first").click();
    }
  }, 5000); // 3 second tab loop
}

// reset timeout if a tab is clicked
$(".w-tab-link").click(function () {
  clearTimeout(tabTimeout);
  tabLoop();
});



var Webflow = Webflow || [];
Webflow.push(function () {
  // DOMready has fired
  // May now use jQuery and Webflow api

// start everything
  var tabTimeout;
  clearTimeout(tabTimeout);
  tabLoop();

// define loop - cycle through all tabs
function tabLoop() {
    tabTimeout = setTimeout(function() {
        var $next = $('.w-tab-menu').children('.w--current:first').next();

        if($next.length) {
            $next.click();  // click resets timeout, so no need for interval
        } else {
            $('.w-tab-link:first').click();
        }
    }, 5500);  // 5 second tab loop
}

// reset timeout if a tab is clicked
$('.w-tab-link').click(function() {
    clearTimeout(tabTimeout);
    tabLoop();
    });
});