class Validator {
  constructor({
    selector,
    pattern = {},
    method
  }) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;

    // элементы формы - исключаем кнопки (их не надо валидировать)
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
    })

    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();

    // this.checkIt.bind(this)) - контекст вызова функции должен относиться к классу Validator
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));

    this.form.addEventListener('submit', (event) => {
      this.elementsForm.forEach(elem => this.checkIt({
        target: elem
      }));
      if (this.error.size) {
        event.preventDefault();
      }
    })
  }

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

    if (this.method) {
      const method = this.method[elem.id];

      if (method) {
        return method.every(item => {
          validatorMethod[item[0]](elem, this.pattern[item[1]]);
        });
      }
    } else {
      console.warn('Необходимо передать id полей ввода и методы проверки этих полей')
    }

    return true;
  }

  checkIt() {
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
      .success {
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

  setPattern() {

    if (!this.pattern.userName) {
      this.pattern.userName = /^\w+$/;
    }

    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }

    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
  }
}