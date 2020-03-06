'use strict';

import countTimer from './modules/countTImer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import changeCommandPhoto from './modules/changeCommandPhoto';
import scroll from './modules/scroll';
import sendForm from './modules/sendForm';

countTimer('2020-02-29 00:00:01');
toggleMenu();
togglePopup();
tabs();
slider();
calc(100);
scroll();
changeCommandPhoto();

[...document.forms].forEach((form) => {
  // Запрет ввода символов для имени и сообщения
  [...form.elements].forEach((elem) => {
    if (elem.classList.contains('mess') || elem.getAttribute('placeholder') === 'Ваше имя') {
      const pattern = /^[А-Яа-я\s]+$/;
      let saveInput = '';
      elem.addEventListener('input', () => {
        if (pattern.test(elem.value) || elem.value === '') {
          saveInput = elem.value;
        } else {
          elem.value = saveInput;
        }
      })
    }
  });

  sendForm(form);
})
