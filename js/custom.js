document.getElementById('current-year').textContent = new Date().getFullYear();

(function () {
      const toggle = document.getElementById('myWorksToggle');
      const menu = document.getElementById('myWorksMenu');

      if (!toggle || !menu) return;

      toggle.addEventListener('click', function (event) {
        event.preventDefault();
        const isOpen = menu.classList.toggle('show');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      document.addEventListener('click', function (event) {
        if (!event.target.closest('.my-works-dropdown')) {
          menu.classList.remove('show');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    })();

(function () {
      const el = document.getElementById('typing-animation');
      const texts = ['Java Backend', 'DevOps & CI/CD', 'Payment Systems'];
      const TYPING_SPEED = 80;   // ms per char
      const PAUSE_AFTER = 1000;  // pause after full text
      let txtIndex = 0, charIndex = 0, typing = true;

      function type() {
        const current = texts[txtIndex];
        if (typing) {
          el.textContent = current.slice(0, charIndex + 1);
          charIndex++;
          if (charIndex === current.length) {
            typing = false;
            setTimeout(type, PAUSE_AFTER);
            return;
          }
          setTimeout(type, TYPING_SPEED);
        } else {
          // deleting
          el.textContent = current.slice(0, charIndex - 1);
          charIndex--;
          if (charIndex === 0) {
            typing = true;
            txtIndex = (txtIndex + 1) % texts.length;
            setTimeout(type, 300);
            return;
          }
          setTimeout(type, TYPING_SPEED / 1.5);
        }
      }
      // start
      if (el) type();
    })();

(function () {
  const counters = document.querySelectorAll('.counter-wrap .number[data-number]');

  function animateCounter(counter) {
    if (counter.dataset.counted === 'true') return;
    counter.dataset.counted = 'true';

    const target = Number(counter.dataset.number);
    if (!Number.isFinite(target) || target < 0) return;

    const duration = 5000;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * easedProgress);

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    counters.forEach(function (counter) { observer.observe(counter); });
  } else {
    counters.forEach(animateCounter);
  }
})();
