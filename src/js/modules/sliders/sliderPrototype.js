export default class SliderPrototype {
  constructor({
    container = null,
    btns = null,
    prev = null,
    next = null,
    prevPageModule = null,
    nextPageModule = null,
    activeClass = '',
    animate,
    autoplay} = {}) {
    this.container = document.querySelector(container);
    try {this.slides = this.container.children;} catch(e){};
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.prevPageModule = document.querySelectorAll(prevPageModule);
    this.nextPageModule = document.querySelectorAll(nextPageModule)
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    this.slideIndex = 1;
  }
}