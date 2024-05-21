'use strict';

//burger-btn
(function () {
  const burgerBtn = document.querySelector('.burger');
  const mobileNav = document.querySelector('.nav');
  const body = document.querySelector('body');
  const header = document.querySelector('.header');

  //при нажатии на якорную ссылку или на ссылку адрес/тлф - мобильное меню также должно закрываться
  //для этого я дал класс js-header-close чтобы получить нужный массив ссылок, при нажатии на которые header будет закрываться
  //получим все ссылки в mobile-header
  const links = Array.from(document.querySelectorAll('.js-header-close'));

  //присваиваем все классы одной функцией:
  function closeHeader() {
    burgerBtn.classList.toggle('burger_active');
    mobileNav.classList.toggle('nav_active');
    body.classList.toggle('stop-scroll');
    header.classList.toggle('header_active');
  }

  //клик по бургеру:
  burgerBtn.addEventListener('click', closeHeader);

  //клик по ссылкам в mobile-header должен работать и отключаться в зависимости от разрешения
  function checkCurrentWidth() {
    if (window.screen.width < 768) {
      links.forEach((el) => {
        el.addEventListener('click', closeHeader);
      });
    } else {
      links.forEach((el) => {
        el.removeEventListener('click', closeHeader);
      });
    }
  }

  checkCurrentWidth();

  //будем следить за поворотом экрана пользователем:
  window.addEventListener('resize', checkCurrentWidth);
})();

//active navigation shows where is user now:
(function () {
  const nav = document.querySelector('.nav__list');
  const links = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;

    document.querySelectorAll('.js-section').forEach((el, i) => {
      if (el.offsetTop - nav.clientHeight <= scrollDistance) {
        links.forEach((el) => {
          if (el.classList.contains('nav__link_active')) {
            el.classList.remove('nav__link_active');
          }
        });

        links[i].classList.add('nav__link_active');
      }
    });
  });
})();

//removing blocks with H1 and check-in button
(function () {
  //будем перемещать эти два узла:
  const firstTop = document.querySelector('.first__top');
  const checkIn = document.querySelector('.first__check-in');
  //в эти два объекта:
  const leftSide = document.querySelector('.first__left-side');
  const firstContainer = document.querySelector('.first__wrapper');

  //определим контрольные точки где будет меняться расположение узлов первой секции:
  const widthMax = window.matchMedia('(min-width: 767px)');
  const widthMin = window.matchMedia('(max-width: 768px)');

  //проверим ширину экрана пользователя при загрузке страницы:
  (function () {
    let screenWidth = window.screen.width;

    if (screenWidth > 768) {
      firstContainer.prepend(firstTop);
      firstContainer.appendChild(checkIn);
    }
  })();

  //вешаю обработчик событий на window
  window.addEventListener('resize', changeFirstSection);

  function changeFirstSection() {
    /*контрольная точка 767рх - при увеличении экрана с мобилки, JS удаляет узлы из firstTop and checkIn и добавляет их в leftSide:*/
    if (window.matchMedia('(min-width: 767px)').matches) {
      leftSide.prepend(firstTop);
      leftSide.appendChild(checkIn);
    } else if (window.matchMedia('(max-width: 768px)')) {
      /*теперь нужно переместить DOM элементы из ПК версии в мобильную в случае если пользователь переворачивает экран или меняет разрешение*/
      firstContainer.prepend(firstTop);
      firstContainer.appendChild(checkIn);
    }
  }
  
  return changeFirstSection();
})();

/*                                        */
// JS файлы из калькулятор index.js

const createInfoBlock = (id) => {
  const slides = [...document.querySelectorAll('#rotation > img')];
  // получаем номер активного слайда
  const activeSlide = slides.find((slide) => slide.style.display !== 'none').id;
  const { name, price, time } =
    activeSlide > 11 && activeSlide < 15
      ? data.find((value) => value.ids.includes(`${id}-back`)).descriptions
      : data.find((value) => value.ids.includes(id)).descriptions;
  return renderCalcBlock(name, price, time);
};

const calculatorHandler = (selectors) => ({ target }) => {
  const activeBlock = window.screen.width > 768 ? state.activeBlock : state.activeModalBlock;
  if (target.classList.contains('active')) {
    return;
  } else {
    const activeButton = selectors.querySelector('.active');
    const name = activeBlock.firstElementChild.textContent;
    const priceOld = activeBlock.querySelector('.calculator__price').firstElementChild;
    const timeOld = activeBlock.querySelector('.calculator__time').firstElementChild;

    target.classList.add('active', 'animate__heartBeat');
    activeButton.classList.remove('active', 'animate__heartBeat');

    const { price, time } = data.find(
      (value) => value.descriptions.name === name
    ).descriptions;
    priceOld.textContent = `от ${price[target.id]} рублей`;
    timeOld.textContent = time[target.id];
  }
};

const animationHandler = ({ target }) => {
  const { activeButton, defaultBlock } = state;
  const activeBlock =
    window.screen.width > 768 ? state.activeBlock : state.activeModalBlock;
  if (window.screen.width <= 768) {
    modalBackground.style.display = 'block';
    modalBackground.parentElement.style.overflow = 'hidden';
    buttons.forEach((button) => (button.style.visibility = 'hidden'));
  }
  if (activeButton.id !== target.id) {
    if (activeButton.classList.contains('active')) {
      activeButton.classList.remove('active', 'animate__heartBeat');
    }
    target.classList.add('active', 'animate__heartBeat');
    state.activeButton = target;
    activeBlock.innerHTML = createInfoBlock(target.id);

    const selectors = activeBlock.querySelector('.selectors');
    selectors.childNodes.forEach((button) => {
      button.addEventListener('click', calculatorHandler(selectors));
    });
  } else {
    if (window.screen.width > 768) {
      activeBlock.innerHTML = defaultBlock;
    }
    activeButton.classList.remove('active', 'animate__heartBeat');
    state.activeButton = document.createElement('a');
  }
};

const modalBackground = document.querySelector('.modalBackground');
const modalClose = document.querySelector('.modalClose');

[modalClose, modalBackground].forEach((modal) => {
  modal.addEventListener('click', ({ target }) => {
    if (target === modalBackground || target === modalClose) {
      modalBackground.style.display = 'none';
      modalBackground.parentElement.style.overflow = '';
      if (modalBackground.firstElementChild.style.width !== '81.25%') {
        modalBackground.firstElementChild.style.width = '';
        modalBackground.firstElementChild.lastElementChild.style.height = '';
        modalBackground.firstElementChild.style.maxHeight = '';
        modalBackground.firstElementChild.style.overflow = '';
        document.querySelector('.header').style.paddingRight = '';
        modalBackground.firstElementChild.style.padding = '';
        document.body.style.marginRight = '';
      }

      if (state.activeButton.classList.contains('active')) {
        buttons.forEach((button) => button.style.visibility = 'visible');
        state.activeButton.classList.remove('active', 'animate__heartBeat');
        state.activeButton = document.createElement('a');
      }
    }
  });
});

buttons.forEach((button) => {
  // если профильные, ставим по умолчанию 90 градусов
  if (button.classList.contains('profile')) {
    button.style.transform = 'rotateY(90deg)';
  }
  button.addEventListener('click', animationHandler);
});

// функция добавления изображения на страницу после полной загрузки
const preloadImages = (array) => {
  if (!preloadImages.list) {
    preloadImages.list = [];
  }
  const list = preloadImages.list;
  for (let i = 0; i < array.length; i++) {
    const img = new Image();
    img.onload = () => {
      const index = list.indexOf(this);
      if (index !== -1) {
        list.splice(index, 1);
      }
    }
    list.push(img);
    img.src = array[i];
    img.id = i + 1;
    document.querySelector('#rotation').append(img);
  }
};

preloadImages([
  './src/images/services/1.jpg',
  './src/images/services/2.jpg',
  './src/images/services/3.jpg',
  './src/images/services/4.jpg',
  './src/images/services/5.jpg',
  './src/images/services/6.jpg',
  './src/images/services/7.jpg',
  './src/images/services/8.jpg',
  './src/images/services/9.jpg',
  './src/images/services/10.jpg',
  './src/images/services/11.jpg',
  './src/images/services/12.jpg',
  './src/images/services/13.jpg',
  './src/images/services/14.jpg',
  './src/images/services/15.jpg',
  './src/images/services/16.jpg',
  './src/images/services/17.jpg',
  './src/images/services/18.jpg',
  './src/images/services/19.jpg',
  './src/images/services/20.jpg',
  './src/images/services/21.jpg',
  './src/images/services/22.jpg',
  './src/images/services/23.jpg',
  './src/images/services/24.jpg',
]);


window.addEventListener('load', () => {
  $(document).ready(function () {
    $('#rotation').image360();
  });
});



/*                                        */

// js-swiper

const swiper1 = new Swiper('.js-swiper', {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 50,
  // pagination: {
  //   el: '.swiper-pagination',
  //   clickable: true,
  // },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// подключение слайдер в отзывах, он только в мобильной версии

//создадим еще еэкземпляр swiper: на пк будет демонстрироваться сразу 5 слайдов, на мобилке 1

const swiperReview = new Swiper('.js-swiper-reviews', {
  slidesPerView: 1,
  allowSlideNext: true,
  allowSlidePrev: true,
  allowTouchMove: true,
  grabCursor: true,
  loop: true,
  //чтобы слайдер крутил бесконечно нужно добавить в 2 раза больше картинок чем есть в slidesPerView
  spaceBetween: 20,
  
    navigation: {
    nextEl: '.portfolio__swiper-button-next',
    prevEl: '.portfolio__swiper-button-prev',
  },
  
  breakpoints: {
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 767px
    768: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // when window width is >= 1023px
    1024: {
      slidesPerView: 5,
      spaceBetween: 30
    },
  }
  
});






/*
const swiper2 = new Swiper('.js-swiper-reviews', {
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },
    // 1024: {
    //   swiper.destroy( deleteInstance , cleanStyles );
    // }
  },
});
*/
// подключение попапа в портфолио

class popupItem {
  constructor(src, alt) {
    this.src = src;
    this.alt = alt;
    // this.titile = titile;
    // this.descr = descr;
    // this.price = price;
    // this.classes = classes;
    // this.parent = document.querySelector(parentSelector);
    // this.transfer = 27;
    // this.changeToUAH();
  }

  // srcPicture() {
  //   this.picture =
  // }
}

/*

const modalPortfolio = document.querySelector('[data-modal]'),
      modal = document.querySelector('.popup'),
      modalInner = document.querySelector('.popup__inner'),
      modalClose = document.querySelector('[data-close]'),
      portfolioWrapper = document.querySelector('.portfolio__wrapper');

modalPortfolio.addEventListener('click', () => {
  modal.classList.toggle('open');
  modalInner.prepend(modalPortfolio);
});

modalClose.addEventListener('click', () => {
  modal.classList.toggle('open');
  portfolioWrapper.prepend(modalPortfolio);
})

*/
// const modalPortfolio = document.querySelectorAll('[data-modal]'),
//       modal = document.querySelector('.popup'),
//       modalInner = document.querySelector('.popup__inner'),
//       modalClose = document.querySelector('[data-close]'),
//       portfolioWrapper = document.querySelector('.portfolio__wrapper');

// modalPortfolio.forEach(item => {

//   item.addEventListener ('click', () => {
//     // const target = event.target;
//     modal.classList.toggle('open');
//     modalInner.prepend(modalPortfolio);
// });
// });

// modalClose.addEventListener('click', () => {
//   modal.classList.toggle('open');
//   portfolioWrapper.prepend(modalPortfolio);
// })

