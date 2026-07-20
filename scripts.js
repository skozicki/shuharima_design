// jshint esversion: 6

function menuToggle() {
    var x = document.getElementById('myNavtoggle');
    if (x.className === 'navtoggle') {
        x.className += ' responsive';
    } else {
        x.className = 'navtoggle';
    }
}

(() => {
    const STORAGE_KEY = "cookiesBannerAcceptedAt";
    const REMEMBER_DAYS = 365;

    const $cookiesBanner = document.querySelector(".cookies-eu-banner");
    if (!$cookiesBanner) return;

    const $cookiesBannerButton = $cookiesBanner.querySelector("button");
    if (!$cookiesBannerButton) return;

    const acceptedAt = Number(localStorage.getItem(STORAGE_KEY));
    const remainingMs = REMEMBER_DAYS * 24 * 60 * 60 * 1000;
    const hasValidConsent = acceptedAt && (Date.now() - acceptedAt) < remainingMs;

    if (!hasValidConsent) {
        $cookiesBanner.classList.remove("hidden");
    }

    $cookiesBannerButton.addEventListener("click", () => {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
        $cookiesBanner.classList.add("hidden");
    });
})();



// Tylko przekierowuje - bez aktualizacji przycisków
function setLang(lang) {
    localStorage.setItem('lang', lang);

    const current = window.location.pathname.endsWith('index_en.html') ? 'en' : 'pl';

    if (lang !== current) {
        window.location.href = lang === 'en' ? 'index_en.html' : 'index.html';
    }
}

// Tylko ustawia aktywny przycisk na podstawie aktualnej strony
function initLang() {
    const current = window.location.pathname.endsWith('index_en.html') ? 'en' : 'pl';
    localStorage.setItem('lang', current);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === current);
    });
}

// Uruchom po załadowaniu DOM
document.addEventListener('DOMContentLoaded', initLang);


function animateCounter(el) {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
    }, step);
}

// Obsługuj zarówno .counter jak i .counter-value
const counters = document.querySelectorAll('.counter, .counter-value');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

counters.forEach(counter => {
    observer.observe(counter);
    
    // Jeśli element jest już widoczny, uruchom animację od razu
    if (counter.getBoundingClientRect().top < window.innerHeight) {
        animateCounter(counter);
        observer.unobserve(counter);
    }
});


(function () {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;
  const dots = document.querySelectorAll('#testimonialsDots .dot');
  let current = 0;
  let startX = 0;
  let isDragging = false;
  let dragDelta = 0;

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => goTo(+dot.dataset.index));
  });

  // STRZAŁKI NAWIGACYJNE
  const prevBtn = document.querySelector('.testimonials-nav-prev');
  const nextBtn = document.querySelector('.testimonials-nav-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (current > 0) goTo(current - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (current < dots.length - 1) goTo(current + 1);
    });
  }

  // Mouse drag
  track.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = 'none';
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    dragDelta = e.clientX - startX;
    track.style.transform = `translateX(calc(-${current * 100}% + ${dragDelta}px))`;
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    if (dragDelta < -80 && current < dots.length - 1) goTo(current + 1);
    else if (dragDelta > 80 && current > 0) goTo(current - 1);
    else goTo(current);
    dragDelta = 0;
  });

  // Touch swipe
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    track.style.transition = 'none';
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    dragDelta = e.touches[0].clientX - startX;
    track.style.transform = `translateX(calc(-${current * 100}% + ${dragDelta}px))`;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    track.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    if (dragDelta < -80 && current < dots.length - 1) goTo(current + 1);
    else if (dragDelta > 80 && current > 0) goTo(current - 1);
    else goTo(current);
    dragDelta = 0;
  });
})();




// FAQ

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
        toggle.textContent = '+';
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        toggle.textContent = '−';
      }
    });
  });
});


// FAQ - card
function stickyFaqCard() {
  const card = document.getElementById('faqCard');
  const faqList = document.querySelector('.faq-list');
  const faqRight = document.querySelector('.faq-right');

  if (!card || !faqList || !faqRight) return;
  if (window.innerWidth < 1024) {
    card.style.position = 'static';
    return;
  }

  const topOffset = 24;
  const cardHeight = card.offsetHeight;
  const cardWrapperTop = faqRight.getBoundingClientRect().top + window.scrollY;
  const desiredTop = window.scrollY + topOffset;

  if (desiredTop < cardWrapperTop) {
    card.style.position = 'static';
  } else if (desiredTop + cardHeight > cardWrapperTop + faqRight.offsetHeight) {
    card.style.position = 'absolute';
    card.style.top = (faqRight.offsetHeight - cardHeight) + 'px';
  } else {
    card.style.position = 'absolute';
    card.style.top = (desiredTop - cardWrapperTop) + 'px';
  }
}

window.addEventListener('scroll', stickyFaqCard);
window.addEventListener('resize', stickyFaqCard);
window.addEventListener('load', stickyFaqCard);


// rotator w footer

(function () {
  const words = ['design', 'build'];
  let index = 0;
  const el = document.getElementById('rotatorWord');

  if (!el) return;

  setInterval(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-30px)';

    setTimeout(() => {
      index = (index + 1) % words.length;
      el.textContent = words[index];
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'none';

      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }, 500);
  }, 2200);
})();