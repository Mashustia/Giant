'use strict';

(function () {
  Carrousel.init($("#wrap"));
}) ();

(function () {
  $('.slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    arrows: true,
    lazyLoad: 'progressive',
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1365,
        settings: {
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          arrows: false,
          lazyLoad: 'progressive',
          variableWidth: true
        }
      }
    ]
  });
}) ();
