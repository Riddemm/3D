const scroll = () => {
  const scrollPage = (top, time) => {
    let start = Date.now(); // время начала

    let timer = setInterval(function () {
      let timePassed = Date.now() - start; // времени прошло

      if (document.documentElement.scrollTop > top) {
        clearInterval(timer);
        return;
      }
      document.documentElement.scrollTop += timePassed / 1000;
    }, time);
  }

  // Считает координаты с начала документа
  function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  const menu = document.querySelector('menu');

  const serviceLink = document.querySelector('.service-link');
  const menuServiceLink = document.querySelectorAll('[href="#service-block"]')[1];
  const menuPortfolioLink = document.querySelector('[href="#portfolio"]');
  const menuCalcLink = document.querySelector('[href="#calc"]');
  const menuCommandLink = document.querySelector('[href="#command"]');
  const menuConnectLink = document.querySelector('[href="#connect"]');

  const menuService = document.querySelector('#service-block');
  const menuPortfolio = document.querySelector('#portfolio');
  const menuCalc = document.querySelector('#calc');
  const menuCommand = document.querySelector('#command');
  const menuConnect = document.querySelector('#connect');

  serviceLink.addEventListener('click', (event) => {
    event.preventDefault();
    scrollPage(getCoords(menuService).top, 20);
  });

  menu.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;

    if (target === menuServiceLink) {
      scrollPage(getCoords(menuService).top, 5);
    }
    if (target === menuPortfolioLink) {
      scrollPage(getCoords(menuPortfolio).top, 5);
    }
    if (target === menuCalcLink) {
      scrollPage(getCoords(menuCalc).top, 5);
    }
    if (target === menuCommandLink) {
      scrollPage(getCoords(menuCommand).top, 5);
    }
    if (target === menuConnectLink) {
      scrollPage(getCoords(menuConnect).top, 5);
    }
  });
}

export default scroll;