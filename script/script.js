window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  console.dir(screen);

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

  countTimer('2020-02-22 00:00:01');

  // Меню

  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = menu.querySelectorAll('ul > li');

    const handlerMenu = () => {
      // if (!menu.style.transform || menu.style.transform === 'translateX(-100%)') {
      //   menu.style.transform = 'translateX(0)'; // открыть меню
      // } else {
      //   menu.style.transform = 'translateX(-100%)'; // закрыть меню
      // }
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);

    closeBtn.addEventListener('click', handlerMenu);

    menuItems.forEach((item) => {
      item.addEventListener('click', handlerMenu);
    })
  }

  toggleMenu();

  // Popup

  const togglePopup = () => {

    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');
    const popupClose = document.querySelector('.popup-close');
    const popupContent = document.querySelector('.popup-content');

    popupBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        popup.style.display = 'block';
        if (screen.width > 768) {
          popupContent.style.top = 0;
          let start = Date.now(); // время начала

          let timer = setInterval(function () {
            let timePassed = Date.now() - start;     // времени прошло

            if (timePassed >= 1000) {
              clearInterval(timer); // закончить анимацию через секунду
              return;
            }

            // отрисовать анимацию на момент timePassed, прошедший с начала анимации
            popupContent.style.top = timePassed / 10 + 'px';

          }, 20);
        }
      });
    });

    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });

  };

  togglePopup();
})