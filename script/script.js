window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours');
    let timerMinutes = document.querySelector('#timer-minutes');
    let timerSeconds = document.querySelector('#timer-seconds');

    // Добавляет 0 в начало, если число меньше 10
    let formatDate = function (date) {
      if (date < 10) {
        return date = '0' + date;
      }
      return date;
    };

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime();
      let dateNow = new Date().getTime();
      let timeRemaining = (dateStop - dateNow) / 1000;

      let seconds = 0;
      let minutes = 0;
      let hours = 0;

      if (timeRemaining > 0) {
        seconds = Math.floor(timeRemaining % 60);
        minutes = Math.floor(timeRemaining / 60 % 60);
        hours = Math.floor(timeRemaining / 3600);
      }

      if (timeRemaining <= 0) {
        dateStop = new Date(deadline).getTime() + 3600 * 24 * 1000;
        let newDeadline = new Date(dateStop);
        countTimer(newDeadline);
      }

      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
    }

    function updateCLock() {
      let timer = getTimeRemaining();

      timerHours.textContent = formatDate(timer.hours);
      timerMinutes.textContent = formatDate(timer.minutes);
      timerSeconds.textContent = formatDate(timer.seconds);

      setTimeout(updateCLock, 1000);

    }

    updateCLock();
  }

  countTimer('2020-02-23 00:00:01');

  // Меню

  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuLinks = menu.querySelectorAll('ul > li > a');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    document.addEventListener('click', () => {
      let target = event.target;
      let bool = false; // переменная, которая показывает, был ли клик на кнопки

      menuLinks.forEach((link) => {
        if (link === target) {
          bool = true;
        }
      });

      btnMenu.childNodes.forEach((child) => {
        if (child === target) {
          bool = true;
        }
      });

      if (target === closeBtn || target === btnMenu || bool === true) {
        handlerMenu();
      } else {
        target = target.closest('menu');

        if (!target && menu.classList.contains('active-menu')) {
          handlerMenu();
        }
      }
    });
  }

  toggleMenu();

  // Popup

  const togglePopup = () => {

    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');
    const popupContent = document.querySelector('.popup-content');

    popupBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        popup.style.display = 'block';
        if (screen.width > 768) {
          popupContent.style.top = 0;
          let start = Date.now(); // время начала

          let timer = setInterval(function () {
            let timePassed = Date.now() - start; // времени прошло

            if (timePassed >= 1000) {
              clearInterval(timer); // закончить анимацию через секунду
              return;
            }

            popupContent.style.top = timePassed / 10 + 'px';
          }, 20);
        }
      });
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popup.style.display = 'none';
        }
      }
    });

  };

  togglePopup();

  // Плавная прокрутка страницы
  let serviceLink = document.querySelector('.service-link');
  serviceLink.addEventListener('click', (event) => {
    event.preventDefault();
    let start = Date.now(); // время начала

    let timer = setInterval(function () {
      let timePassed = Date.now() - start; // времени прошло

      if (document.documentElement.scrollTop > 840) {
        clearInterval(timer);
        return;
      }
      document.documentElement.scrollTop += timePassed / 100;
    }, 20);
  });

  // Табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header');
    const tabs = tabHeader.querySelectorAll('.service-header-tab');
    const tabsContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabsContent.length; i++) {
        if (index === i) {
          tabs[i].classList.add('active');
          tabsContent[i].classList.remove('d-none');
        } else {
          tabs[i].classList.remove('active');
          tabsContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tabs.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

  // Слайдер

  const slider = () => {
    const slider = document.querySelector('.portfolio-content');
    const slides = document.querySelectorAll('.portfolio-item');
    const btns = document.querySelectorAll('.portfolio-btn');

    const dotList = document.querySelector('.portfolio-dots');

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      dotList.append(dot);
    }
    const dots = document.querySelectorAll('.dot');
    dots[0].classList.add('dot-active');

    let currentSlide = 0;
    let interval;

    const prevSLide = (elems, index, strClass) => {
      elems[index].classList.remove(strClass);
    };

    const nextSLide = (elems, index, strClass) => {
      elems[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSLide(slides, currentSlide, 'portfolio-item-active');
      prevSLide(dots, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }
      nextSLide(slides, currentSlide, 'portfolio-item-active');
      nextSLide(dots, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSLide(slides, currentSlide, 'portfolio-item-active');
      prevSLide(dots, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dots.forEach((dot, index) => {
          if (target === dot) {
            currentSlide = index;
          }
        })
      }

      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slides.length - 1;
      }

      nextSLide(slides, currentSlide, 'portfolio-item-active');
      nextSLide(dots, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide(2000);
      }
    });

    startSlide(2000);

  };

  slider();

  // Наша команда, дата-атрибуты у картинок
  const commmand = document.querySelector('.command');
  const commandPhotoes = commmand.querySelectorAll('.command__photo');
  let oldSrc = '';

  commmand.addEventListener('mouseover', () => {
    let target = event.target;

    commandPhotoes.forEach((photo) => {
      if (photo === target) {
        oldSrc = target.src;
        target.src = target.dataset.img;
        target.dataset.img = oldSrc;
      }
    });
  });

  commmand.addEventListener('mouseout', (event) => {
    let target = event.target;

    commandPhotoes.forEach((photo) => {
      if (photo === target) {
        oldSrc = target.src;
        target.src = target.dataset.img;
        target.dataset.img = oldSrc;
      }
    });
  });

  // Калькулятор

  const calc = (price = 100) => {

    const calcBlock = document.querySelector('.calc-block');
    const calcInputs = calcBlock.querySelectorAll('[type="number"]');
    const calcType =  calcBlock.querySelector('.calc-type');
    const calcSquare = calcInputs[0];
    const calcCount = calcInputs[1];
    const calcDay = calcInputs[2];
    const totalValue = calcBlock.querySelector('#total');

    const countSum = () => {
      let total = 0;
      let countValue = 1;
      let dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value;
      const squareValue = Number(calcSquare.value);

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5; 
      } 

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      totalValue.textContent = total;
    };

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;
      if (target === calcType || target === calcSquare || target === calcCount || target === calcDay) {
        countSum();
      }
    })

    calcInputs.forEach((input) => {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/D/g, '');
      });
    });

  }

  calc(100);

})