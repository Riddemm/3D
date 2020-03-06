  const changeCommandPhoto = () => {
    const commmand = document.querySelector('.command');
    const commandPhotoes = commmand.querySelectorAll('.command__photo');
    let oldSrc = '';

    commmand.addEventListener('mouseover', () => {
      let target = event.target;

      commandPhotoes.forEach((photo) => {
        if (photo === target) {
          oldSrc = target.src;
          target.src = target.dataset.img;
          target.dataset.img = oldSrc;
        }
      });
    });

    commmand.addEventListener('mouseout', (event) => {
      let target = event.target;

      commandPhotoes.forEach((photo) => {
        if (photo === target) {
          oldSrc = target.src;
          target.src = target.dataset.img;
          target.dataset.img = oldSrc;
        }
      });
    });
  }

export default changeCommandPhoto;
