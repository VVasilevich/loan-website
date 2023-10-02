/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/difference.js":
/*!**************************************!*\
  !*** ./src/js/modules/difference.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Difference; }
/* harmony export */ });
class Difference {
  constructor(oldOfficer, newOfficer, items) {
    this.oldOfficer = document.querySelector(oldOfficer);
    this.newOfficer = document.querySelector(newOfficer);
    this.oldItems = this.oldOfficer.querySelectorAll(items);
    this.newItems = this.newOfficer.querySelectorAll(items);
    this.oldCounter = 0;
    this.newCounter = 0;
  }
  bindTriggers() {
    this.oldOfficer.querySelector('.plus').addEventListener('click', () => {
      if (this.oldCounter !== this.oldItems.length - 2) {
        this.oldItems[this.oldCounter].style.display = 'flex';
        this.oldCounter++;
      } else {
        this.oldItems[this.oldCounter].style.display = 'flex';
        this.oldItems[this.oldItems.length - 1].remove();
      }
    });
    this.newOfficer.querySelector('.plus').addEventListener('click', () => {
      if (this.newCounter !== this.newItems.length - 2) {
        this.newItems[this.newCounter].style.display = 'flex';
        this.newCounter++;
      } else {
        this.newItems[this.newCounter].style.display = 'flex';
        this.newItems[this.newItems.length - 1].remove();
      }
    });
  }
  hideItems() {
    this.oldItems.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = 'none';
      }
    });
    this.newItems.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = 'none';
      }
    });
  }
  init() {
    this.hideItems();
    this.bindTriggers();
  }
}

/***/ }),

/***/ "./src/js/modules/sliders/mainSlider.js":
/*!**********************************************!*\
  !*** ./src/js/modules/sliders/mainSlider.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MainSlider; }
/* harmony export */ });
/* harmony import */ var _sliderPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sliderPrototype */ "./src/js/modules/sliders/sliderPrototype.js");

class MainSlider extends _sliderPrototype__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    } catch (e) {}
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
    } catch (e) {}
    this.showSlides(this.slideIndex);
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.changeSlides(1);
      });
      btn.parentNode.previousElementSibling.addEventListener('click', e => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/sliders/miniSlider.js":
/*!**********************************************!*\
  !*** ./src/js/modules/sliders/miniSlider.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MiniSlider; }
/* harmony export */ });
/* harmony import */ var _sliderPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sliderPrototype */ "./src/js/modules/sliders/sliderPrototype.js");

class MiniSlider extends _sliderPrototype__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
      this.nextSlide();
    }, 5000);
  }
  addMouseEvents(element) {
    element.forEach(element => {
      element.addEventListener('mouseenter', () => {
        clearInterval(this.autoplay);
      });
      element.addEventListener('mouseleave', () => {
        this.startAutoplay();
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

/***/ }),

/***/ "./src/js/modules/sliders/sliderPrototype.js":
/*!***************************************************!*\
  !*** ./src/js/modules/sliders/sliderPrototype.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SliderPrototype; }
/* harmony export */ });
class SliderPrototype {
  constructor() {
    let {
      container = null,
      btns = null,
      prev = null,
      next = null,
      activeClass = '',
      animate,
      autoplay
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.container = document.querySelector(container);
    this.slides = this.container.children;
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    this.slideIndex = 1;
  }
}

/***/ }),

/***/ "./src/js/modules/videoPlayer.js":
/*!***************************************!*\
  !*** ./src/js/modules/videoPlayer.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ VideoPlayer; }
/* harmony export */ });
class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = document.querySelector('.close');
  }
  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (document.querySelector('iframe#frame')) {
          this.overlay.style.display = 'flex';
        } else {
          const path = btn.getAttribute('data-url');
          this.createPlayer(path);
        }
      });
    });
  }
  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      if (this.player) {
        this.player.destroy();
      }
    });
  }
  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`
    });
    this.overlay.style.display = 'flex';
  }
  init() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    this.bindTriggers();
    this.bindCloseBtn();
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_sliders_mainSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/sliders/mainSlider */ "./src/js/modules/sliders/mainSlider.js");
/* harmony import */ var _modules_sliders_miniSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/sliders/miniSlider */ "./src/js/modules/sliders/miniSlider.js");
/* harmony import */ var _modules_videoPlayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/videoPlayer */ "./src/js/modules/videoPlayer.js");
/* harmony import */ var _modules_difference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/difference */ "./src/js/modules/difference.js");




window.addEventListener('DOMContentLoaded', () => {
  const slider = new _modules_sliders_mainSlider__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: '.page',
    btns: '.next'
  });
  slider.render();
  const showUpSlider = new _modules_sliders_miniSlider__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    activeClass: 'card-active',
    animate: true
  });
  showUpSlider.init();
  const modulesSlider = new _modules_sliders_miniSlider__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.modules__content-slider',
    prev: '.modules__info-btns .slick-prev',
    next: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    animate: true,
    autoplay: true
  });
  modulesSlider.init();
  const feedSlider = new _modules_sliders_miniSlider__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.feed__slider',
    prev: '.feed__slider .slick-prev',
    next: '.feed__slider .slick-next',
    activeClass: 'feed__item-active'
  });
  feedSlider.init();
  const videoPlayer = new _modules_videoPlayer__WEBPACK_IMPORTED_MODULE_2__["default"]('.showup .play', '.overlay');
  videoPlayer.init();
  new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"]('.officerold', '.officernew', '.officer__card-item').init();
});
}();
/******/ })()
;
//# sourceMappingURL=script.js.map