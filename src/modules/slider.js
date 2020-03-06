const slider = () => {
  const slider = document.querySelector('.portfolio-content');
  const slides = document.querySelectorAll('.portfolio-item');
  const btns = document.querySelectorAll('.portfolio-btn');

  const dotList = document.querySelector('.portfolio-dots');

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dotList.append(dot);
  }
  const dots = document.querySelectorAll('.dot');
  dots[0].classList.add('dot-active');

  let currentSlide = 0;
  let interval;

  const prevSLide = (elems, index, strClass) => {
    elems[index].classList.remove(strClass);
  };

  const nextSLide = (elems, index, strClass) => {
    elems[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {
    prevSLide(slides, currentSlide, 'portfolio-item-active');
    prevSLide(dots, currentSlide, 'dot-active');
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    nextSLide(slides, currentSlide, 'portfolio-item-active');
    nextSLide(dots, currentSlide, 'dot-active');
  };

  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener('click', (event) => {
    event.preventDefault();

    let target = event.target;

    if (!target.matches('.portfolio-btn, .dot')) {
      return;
    }

    prevSLide(slides, currentSlide, 'portfolio-item-active');
    prevSLide(dots, currentSlide, 'dot-active');

    if (target.matches('#arrow-right')) {
      currentSlide++;
    } else if (target.matches('#arrow-left')) {
      currentSlide--;
    } else if (target.matches('.dot')) {
      dots.forEach((dot, index) => {
        if (target === dot) {
          currentSlide = index;
        }
      })
    }

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    nextSLide(slides, currentSlide, 'portfolio-item-active');
    nextSLide(dots, currentSlide, 'dot-active');

  });

  slider.addEventListener('mouseover', (event) => {
    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
      stopSlide();
    }
  });

  slider.addEventListener('mouseout', (event) => {
    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
      startSlide(2000);
    }
  });

  startSlide(2000);

};

export default slider;
