import MainSlider from "./modules/sliders/mainSlider";
import VideoPlayer from "./modules/videoPlayer";

window.addEventListener('DOMContentLoaded', () => {
  const slider = new MainSlider({page: '.page', btns: '.next'});
  slider.render();

  const videoPlayer = new VideoPlayer('.showup .play', '.overlay');
  videoPlayer.init();
});