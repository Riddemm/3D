const calc = (price = 100) => {

  const calcBlock = document.querySelector('.calc-block');
  const calcInputs = calcBlock.querySelectorAll('[type="number"]');
  const calcType = calcBlock.querySelector('.calc-type');
  const calcSquare = calcInputs[0];
  const calcCount = calcInputs[1];
  const calcDay = calcInputs[2];
  const totalValue = calcBlock.querySelector('#total');

  let total = 0;
  let totalOld = 0;
  let interval;

  const countSum = () => {
    let countValue = 1; //количество помещений
    let dayValue = 1;
    const typeValue = calcType.options[calcType.selectedIndex].value;
    const squareValue = Number(calcSquare.value);

    if (calcCount.value && calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
    }
  };

  const animateCount = () => {
    interval = requestAnimationFrame(animateCount);
    let expCount = total - totalOld;

    if (totalOld > total) {
      if (expCount < 10000) {
        totalOld -= 10000;
      } else if (expCount < 1000) {
        totalOld -= 1000;
      } else if (expCount < 100) {
        totalOld -= 100;
      } else if (expCount < 0) {
        totalOld -= 10;
      } else {
        cancelAnimationFrame(interval);
      }
    } else if (totalOld < total) {
      if (expCount > 10000) {
        totalOld += 10000;
      } else if (expCount > 1000) {
        totalOld += 1000;
      } else if (expCount > 100) {
        totalOld += 100;
      } else if (expCount > 0) {
        totalOld += 10;
      } else {
        cancelAnimationFrame(interval);
      }
    } else {
      cancelAnimationFrame(interval);
    }
    totalValue.textContent = totalOld;
  };

  calcBlock.addEventListener('change', (event) => {
    const target = event.target;
    if (target === calcType || target === calcSquare || target === calcCount || target === calcDay) {
      totalOld = total;
      countSum();
      interval = requestAnimationFrame(animateCount);
    }
  })

  // Запрет вводить любые символы кроме цифр
  calcInputs.forEach((input) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/D/g, '');
    });
  });
}

export default calc;
