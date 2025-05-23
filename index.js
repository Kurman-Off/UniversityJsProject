`use strict`;

document.addEventListener('DOMContentLoaded', function() {

  const sliderCards = document.querySelectorAll('.slider__card');
  const leftArrow = document.querySelector('.arrow__left');
  const rightArrow = document.querySelector('.arrow__right');

  let currentIndex = 0;

  function showCards(index) {
    sliderCards.forEach((card, i) => {
      card.classList.remove('prev', 'active', 'next');

      if (i === index) {
        card.classList.add('active');
      } else if (i === (index - 1 + sliderCards.length) % sliderCards.length) {
        card.classList.add('prev');
      } else if (i === (index + 1) % sliderCards.length) {
        card.classList.add('next');
      }
    });
  }

  leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + sliderCards.length) % sliderCards.length;
    showCards(currentIndex);
  });

  rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % sliderCards.length;
    showCards(currentIndex);
  });

  showCards(currentIndex);
});