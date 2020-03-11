// Отправка ajax-form
const sendForm = (form) => {
  const errorMessage = 'Что-то пошло не так';
  const loadMessage = 'Загрузка...';
  const successMessage = 'Ваша заявка отправлена';

  const statusImage = document.createElement('img');
  statusImage.setAttribute('src', './images/load.png');

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem';

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    form.append(statusMessage);
    statusMessage.textContent = loadMessage;

    form.append(statusImage);

    const formData = new FormData(form);
    let body = {};
    formData.forEach((key, val) => {
      body[key] = val;
    });

    let valid = true;

    // Валидация номера телефона
    [...form.elements].forEach((elem) => {
      if (elem.classList.contains('form-phone')) {
        const pattern = /^\+?[78]\d{10}$/;
        if (!pattern.test(elem.value)) {
          alert('Введите номер телефона в нужном формате');
          valid = false;
        }
      }

      elem.value = '';
    });

    postData(body)
      .then(response => {
        if (response.status === 200 && valid === true) {
          statusMessage.textContent = successMessage;
          statusImage.style.display = 'inline';
          statusImage.setAttribute('src', './images/success.jpg');
          setTimeout(() => {
            statusMessage.textContent = '';
            statusImage.style.display = 'none';
          }, 2000);
        } else {
          statusMessage.textContent = errorMessage;
          statusImage.setAttribute('src', './images/error.jpg');
          setTimeout(() => {
            statusMessage.textContent = '';
            statusImage.style.display = 'none';
          }, 2000);
        }
      })
      .catch(error => console.error(error));

  });
}

export default sendForm;