const toggleMenu = () => {

  const menu = document.querySelector('menu');
  const btnMenu = document.querySelector('.menu');
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

export default toggleMenu;
