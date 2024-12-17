function deactivateSlides($slides, $sliderBullets) {
  $slides.forEach($slide => $slide.classList.remove('slider__item_active'));
  $sliderBullets.forEach($bullet => $bullet.classList.remove('slider__dot_active'));
}

function activateSlide($slide, $sliderBullets, index) {
  $slide.classList.add('slider__item_active');
  $sliderBullets[index].classList.add('slider__dot_active');
}

function changeSlide($slides, $sliderBullets, index) {
  deactivateSlides($slides, $sliderBullets);
  activateSlide($slides[index], $sliderBullets, index);
}

function getActiveSlideIndex($sliderBullets) {
  return Array.from($sliderBullets).findIndex($bullet => $bullet.classList.contains('slider__dot_active'));
}

function onNextClick($slides, $sliderBullets) {
  const index = getActiveSlideIndex($sliderBullets);
  changeSlide($slides, $sliderBullets, (index + 1) % $slides.length);
}

function onPrevClick($slides, $sliderBullets) {
  const index = getActiveSlideIndex($sliderBullets);
  changeSlide($slides, $sliderBullets, (index - 1 + $slides.length) % $slides.length);
}

function onBulletClick($slides, $sliderBullets, index) {
  changeSlide($slides, $sliderBullets, index);
}

document.addEventListener('DOMContentLoaded', function () {
  const $sliderNextArrow = document.querySelector('.slider__arrow_next');
  const $sliderPrevArrow = document.querySelector('.slider__arrow_prev');
  const $sliderBullets = document.querySelectorAll('.slider__dot');
  const $slides = document.querySelectorAll('.slider__item');

  $sliderNextArrow.addEventListener('click', () => onNextClick($slides, $sliderBullets));
  $sliderPrevArrow.addEventListener('click', () => onPrevClick($slides, $sliderBullets));

  $sliderBullets.forEach(($bullet, index) => {
    $bullet.addEventListener('click', () => onBulletClick($slides, $sliderBullets, index));
  });

  activateSlide($slides[0], $sliderBullets, 0);
});
