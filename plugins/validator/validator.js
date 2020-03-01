class Validator {
  constructor({
    selector,
    pattern = {},
    method // Объект с методами, где свойство - id поля, значение - массив с методами для этого поля.
  }) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;

    // элементы формы - исключаем кнопки (их не надо валидировать)
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
    })  // this.form.elements - nodeList. Чтобы использовать фильтр, нужен массив, поэтому используется spread-operator

    this.error = new Set(); // Коллекция ошибок. Так как здесь используются уникальные значения, то хорошо подходит Set
  }

  init() {
    this.applyStyle();
    this.setPattern();

    this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
    // this.checkIt.bind(this)) - контекст вызова функции должен относиться к классу Validator

    this.form.addEventListener('submit', (event) => {

      this.elementsForm.forEach(elem => this.checkIt({ // Запрет отправки пустой формы
        target: elem                                   // Чтобы не был event.target
      }));

      if (this.error.size) {       //Если есть ошибки, то запретить отправлять форму
        event.preventDefault();
      }
    })
  }

  // Функция проверяет поле на валидность
  // Использует переданные пользователем методы. Если их нет, то возвращает true  
  isValid(elem) {

    const validatorMethod = {

      notEmpty(elem) {
        if (elem.value.trim() === '') return false;
        return true;
      },

      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };

    if (this.method) { // если пользователь передал методы
      const method = this.method[elem.id]; // Получаем значение свойства в объекте method (массив с массивами)
      if (method) {
        return method.every(item => { // Перебор массивов в массиве, проверка выполнения условия
          return validatorMethod[item[0]](elem, this.pattern[item[1]]);
          // validatorMethod[item[0]] - обращаемся к функции notEmpty или pattern (первый элемент массива из большого массива)
          // (elem, this.pattern[item[1]]) - вызываем функцию, второй параметр - для pattern (обращаемся к значению объекта pattern по имени ключа,
          // имя ключа = item[1] - второй элемент массива из большого массива)
        });
      }
    } else {
      console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
    }

    return true;
  }

  // Функция запускает проверку на валидность и запускает showError или showSuccess
  // и добавляет (удаляет) ошибки в коллекции error
  checkIt(event) {
    const target = event.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');
    if (elem.previousElementSibling && elem.previousElementSibling.classList.contains('validator-error')) {
      return;
    }
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('beforebegin', errorDiv);
  }

  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');
    if (elem.previousElementSibling && elem.previousElementSibling.classList.contains('validator-error')) {
      elem.previousElementSibling.remove(); 
    }
  }

  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        background-color: lightgreen;
      }
      input.error {
        background-color: red;
      }
      .validator-error {
        font-size: 14px;
        font-falmily: sans-serif;
        color: red;
      }
    `;
    document.head.appendChild(style);
  }

  // Функция устанавливает паттерны
  // Если пользователь передал значения, то используюстся кастомные паттерны
  // Если нет - то дефлотные
  setPattern() {

    if (!this.pattern.name) {
      this.pattern.name = /^\w+$/;
    }

    if (!this.pattern.phone) {
      this.pattern.phone = /^[78]\d){10}$/;
    }

    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
  }
}