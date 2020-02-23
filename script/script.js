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
      let a = false;
      console.log(target);

      menuLinks.forEach((link) => {
        if (link === target) {
          a = true;
        }
      });

      btnMenu.childNodes.forEach((child) => {
        if (child === target) {
          a = true;
        }
      });

      if (target === closeBtn || target === btnMenu || a === true) {
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
})