import $ from 'jquery'
import './slick'
import '@fancyapps/fancybox/dist/jquery.fancybox.min.css'
import '@fancyapps/fancybox/dist/jquery.fancybox.min.js'

$('.navbar-toggler').on('click', () => {
  console.log($('#navbar-panel').hasClass('active'))
  if ($('#navbar-panel').hasClass('active')) {
    $('#navbar-panel').removeClass('active')
  } else {
    $('#navbar-panel').addClass('active')
  }
})

$('.nav-item').on('click', (e) => {
  const $el = $(e.target)
  if ($el.hasClass('nav-item')) {
    $el.addClass('active')
  } else {
    $el.parents('.nav-item').addClass('active')
  }
})

const cap_re_show = () => {
  $.ajax({
    url: 'https://98goto.com/ds/imgcode/cap_re_show.php',
    type: 'POST',
    dataType: 'html',
    data: {},
    timeout: 3000,
    error: () => {
      console.error('')
    },
    success: (html) => {
      $('.verification-img').attr('src', html)
    }
  })
}

$(document).ready(function () {
  
  cap_re_show()

  $('.verification').on('click', function () {
    cap_re_show()
    return false
  })


  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  })
  $('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: true,
    focusOnSelect: true
  })
  $('.fancyapps').fancybox()
  
})
