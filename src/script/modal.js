const portfolioArray = document.querySelectorAll('[data-modal]');
const scrollBar = window.innerWidth - document.body.clientWidth;

portfolioArray.forEach((image) => {
  image.addEventListener('click', () => {
    modalBackground.style.display = 'block';
    modalBackground.firstElementChild.style.width = '90vw';
    modalBackground.firstElementChild.style.overflow = 'hidden';
    modalBackground.firstElementChild.style.padding = '0';
    modalBackground.parentElement.style.overflow = 'hidden';
    
    if (window.screen.width > 768) {
      document.body.style.marginRight = `${scrollBar}px`;
      document.querySelector('.header').style.paddingRight = `${scrollBar}px`;
      modalBackground.firstElementChild.style.width = 'max-content';
      modalBackground.firstElementChild.lastElementChild.style.height = '100vh';
      modalBackground.firstElementChild.style.maxHeight = '100vh';
    }
    state.activeModalBlock.innerHTML = image.outerHTML;
  });
});