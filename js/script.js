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
    variableWidth: true
  });
}) ();
