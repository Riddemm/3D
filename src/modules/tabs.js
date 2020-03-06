const tabs = () => {
    const tabHeader = document.querySelector('.service-header');
    const tabs = tabHeader.querySelectorAll('.service-header-tab');
    const tabsContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabsContent.length; i++) {
        if (index === i) {
          tabs[i].classList.add('active');
          tabsContent[i].classList.remove('d-none');
        } else {
          tabs[i].classList.remove('active');
          tabsContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tabs.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

export default tabs;
