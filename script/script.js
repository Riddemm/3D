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
        timeRemaining = (dateStop - dateNow) / 1000;
        seconds = Math.floor(timeRemaining % 60);
        minutes = Math.floor(timeRemaining / 60 % 60);
        hours = Math.floor(timeRemaining / 3600);
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
      console.log(timer.timeRemaining);


      timerHours.textContent = formatDate(timer.hours);
      timerMinutes.textContent = formatDate(timer.minutes);
      timerSeconds.textContent = formatDate(timer.seconds);

      setTimeout(updateCLock, 1000);

    }

    updateCLock();
  }

  setInterval(countTimer, 1000, '2020-02-18 00:00:00');
})