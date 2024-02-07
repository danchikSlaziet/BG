// ====================== BRAND LOGIC =================

document.addEventListener('DOMContentLoaded', () => {
  const BrandSwiper = new Swiper('.brand-swiper', {
    spaceBetween: 12,
    slidesPerView: 'auto'
  });
  const AchieveSwiper = new Swiper('.achieve-swiper', {
    spaceBetween: 11,
    slidesPerView: 'auto'
  });
});
const firstBrandPage = document.querySelector('.brand-first');
const secondBrandPage = document.querySelector('.brand-second');
const gamesArray = firstBrandPage.querySelectorAll('.brand-first__game-full');
const backSecondBrandPage = secondBrandPage.querySelector('.brand-second__back');
const secondBrandTitle = secondBrandPage.querySelector('.brand-second__title');

gamesArray.forEach((elem, index) => {
  elem.addEventListener('click', () => {
    if (index !== gamesArray.length - 1) {
      secondBrandTitle.textContent = elem.querySelector('.brand-first__game-title').textContent;
      firstBrandPage.classList.remove('brand-first_active');
      secondBrandPage.classList.add('brand-second_active');
    }
  })
});
backSecondBrandPage.addEventListener('click', () => {
  firstBrandPage.classList.add('brand-first_active');
  secondBrandPage.classList.remove('brand-second_active');
});
document.addEventListener('touchstart', e => x = e.changedTouches[0].clientX);
secondBrandPage.addEventListener('touchend', (e) => {
  if (e.changedTouches[0].clientX - x > 170 && !e.target.className.includes('swiper')) {
    swipeRight();
  }
});
function swipeRight() {
  firstBrandPage.classList.add('brand-first_active');
  secondBrandPage.classList.remove('brand-second_active');
}