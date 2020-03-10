const scroll = () => {

  const scrollPage = (top) => {
    let start = Date.now(); // время начала
    
    let timer = setInterval(function () {
      let timePassed = Date.now() - start; // времени прошло

      if (document.documentElement.scrollTop > top) {
        clearInterval(timer);
        return;
      }
      document.documentElement.scrollTop += timePassed / 10;
    }, 10);
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
      scrollPage(getCoords(menuService).top);
    }
    if (target === menuPortfolioLink) {
      scrollPage(getCoords(menuPortfolio).top);
    }
    if (target === menuCalcLink) {
      scrollPage(getCoords(menuCalc).top);
    }
    if (target === menuCommandLink) {
      scrollPage(getCoords(menuCommand).top);
    }
    if (target === menuConnectLink) {
      scrollPage(getCoords(menuConnect).top);
    }
  });
}

export default scroll;