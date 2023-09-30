import SliderPrototype from "./sliderPrototype";

export default class MainSlider extends SliderPrototype {
  constructor(btns) {
    super(btns);
  }

  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    try {
      this.block.style.opacity = '0';

      let blockTimeout;

      if (n === 3) {
        this.block.classList.add('animated');

        blockTimeout = setTimeout(() => {
          this.block.classList.add('slideInUp');
          this.block.style.opacity = '1';
        }, 3000);
      } else {
        this.block.classList.remove('slideInUp');
        clearTimeout(blockTimeout);
      }
    } catch(e) {}

    [...this.slides].forEach(slide => {
      slide.style.display = 'none';
    });

    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  changeSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  render() {
    try {
      this.block = document.querySelector('.hanson');
    } catch(e) {}

    this.showSlides(this.slideIndex);

    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.changeSlides(1);
      });

      btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
  }
}