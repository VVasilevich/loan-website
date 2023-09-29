import MainSlider from "./modules/sliders/mainSlider";
import MiniSlider from "./modules/sliders/miniSlider";
import VideoPlayer from "./modules/videoPlayer";

window.addEventListener('DOMContentLoaded', () => {
  const slider = new MainSlider({container: '.page', btns: '.next'});
  slider.render();

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
    animate: true
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
});