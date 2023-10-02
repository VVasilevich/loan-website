import SliderPrototype from "./sliderPrototype";

export default class MiniSlider extends SliderPrototype {
  constructor(container, prev, next, activeClass, animate, autoplay) {
    super(container, prev, next, activeClass, animate, autoplay);
  }

  decorizeSlides() {
    [...this.slides].forEach(slide => {
      slide.classList.remove(this.activeClass);

      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = '0.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      }
    });

    if (this.slides[0].closest('button')) {
      this.slides[0].classList.add(this.activeClass);
    }

    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }

  prevSLide() {
    for (let i = this.slides.length - 1; i > 0; i--) {
      if (this.slides[i].tagName !== 'BUTTON') {
        let active = this.slides[i];
        this.container.insertBefore(active, this.slides[0]);
        this.decorizeSlides();
        break;
      }
    }
  }

  nextSlide() {
    for (let i = 1; i < this.slides.length; i++) {
      if (this.slides[i].tagName !== 'BUTTON') {
        this.container.appendChild(this.slides[0]);
        this.decorizeSlides();
        break;
      } else {
        this.container.appendChild(this.slides[i]);
        i--;
      }
    }
  }

  startAutoplay() {
    this.autoplay = setInterval(() => {
      this.nextSlide()
    }, 5000);
  }

  addMouseEvents(element) {
    element.forEach(element => {
      element.addEventListener('mouseenter', () => {
        clearInterval(this.autoplay);
      });

      element.addEventListener('mouseleave', () => {
        this.startAutoplay()
      });
    });
  }

  bindTriggers() {
    this.prev.addEventListener('click', () => {
      this.prevSLide();
    });

    this.next.addEventListener('click', () => {
      this.nextSlide();
    });
  }  

  init() {
    this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      alight-items: flex-start;
    `;

    this.bindTriggers();
    this.decorizeSlides();

    if (this.autoplay) {
      this.startAutoplay();

      this.addMouseEvents([this.slides[0].parentNode, this.prev, this.next]);
    }
  }
}