let seconds = 0;
let minutes = 0;
let hours = 0;

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

    if (timeRemaining > 0) {
      seconds = Math.floor(timeRemaining % 60);
      minutes = Math.floor(timeRemaining / 60 % 60);
      hours = Math.floor(timeRemaining / 3600);
    }

    if (timeRemaining < 0) {
      dateStop = new Date(deadline).getTime() + 3600 * 24 * 1000;
      let newDeadline = new Date(dateStop);
      timeRemaining = (dateStop - dateNow) / 1000;
      seconds = Math.floor(timeRemaining % 60);
      minutes = Math.floor(timeRemaining / 60 % 60);
      hours = Math.floor(timeRemaining / 3600);
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

    if (timer.timeRemaining >= 0) {
      setTimeout(updateCLock, 1000);
    }
  }

  updateCLock();
}

export default countTimer;