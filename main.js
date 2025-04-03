document.addEventListener("DOMContentLoaded", function() {
  document.body.classList.remove("fade-out");
  document.getElementById("page-wrapper").classList.remove("fade-out");

  // Only run the animation if this is the homepage
  if (document.body.classList.contains("home-page")) {
    const h1 = document.querySelector('.hero-text h1');
    const fullText = h1.innerHTML;
    h1.innerHTML = "";
    
    function typeWriter(element, text, delay, callback) {
      let i = 0;
      let interval = setInterval(() => {
        element.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          if (callback) callback();
        }
      }, delay);
    }
    
    typeWriter(h1, fullText, 50, function() {
      // After the typewriter animation, show the nav links one by one
      const navItems = document.querySelectorAll('.nav-links li');
      navItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 100);
      });
    });
  }
});
