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

          if (timePassed >= 500) {
            clearInterval(timer); // закончить анимацию 
            return;
          }

          popupContent.style.top = timePassed / 2 + 'px';
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

export default togglePopup;