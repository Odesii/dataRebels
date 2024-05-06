// import anime from '../animejs/lib/anime.es.js';

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('.start-button');
  const startMenu = document.getElementById('start-menu');

  startButton.addEventListener('click', () => {
    if (window.getComputedStyle(startMenu).display === "none") {
      startMenu.style.display = "block";
      anime({
        targets: startMenu,
        opacity: 1,
        duration: 200,
        delay: 100
      });
    } else {
      anime({
        targets: startMenu,
        opacity: 0,
        duration: 500,
        easing: 'easeInOutQuad'
      });
      startMenu.style.display = "none"; // hide the menu after animation
    }
   
  });
})