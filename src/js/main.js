import MainSlider from "./modules/sliders/mainSlider";
import MiniSlider from "./modules/sliders/miniSlider";
import VideoPlayer from "./modules/videoPlayer";
import Difference from "./modules/difference";
import Forms from "./modules/forms";

window.addEventListener('DOMContentLoaded', () => {
  const slider = new MainSlider({container: '.page', btns: '.next'});
  slider.render();

  const modulePageSlider = new MainSlider({
    container: '.moduleapp',
    btns: '.next',
    prevPageModule: '.prevmodule',
    nextPageModule: '.nextmodule'});
  modulePageSlider.render();

  const showUpSlider = new MiniSlider({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    activeClass: 'card-active',
    animate: true
  });
  showUpSlider.init();

  const modulesSlider = new MiniSlider({
    container: '.modules__content-slider',
    prev: '.modules__info-btns .slick-prev',
    next: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    animate: true,
    autoplay: true
  });
  modulesSlider.init();

  const feedSlider = new MiniSlider({
    container: '.feed__slider',
    prev: '.feed__slider .slick-prev',
    next: '.feed__slider .slick-next',
    activeClass: 'feed__item-active',
  });
  feedSlider.init();

  const videoPlayer = new VideoPlayer('.showup .play', '.overlay');
  videoPlayer.init();

  new Difference('.officerold', '.officernew', '.officer__card-item').init();
  new Forms('.form').init();
});