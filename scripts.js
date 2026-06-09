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
    const getCookie = (name) => {
        const value = " " + document.cookie;
        console.log("value", `==${value}==`);
        const parts = value.split(" " + name + "=");
        return parts.length < 2 ? undefined : parts.pop().split(";").shift();
    };

    const setCookie = function (name, value, expiryDays, domain, path, secure) {
        const exdate = new Date();
        exdate.setHours(
            exdate.getHours() +
            (typeof expiryDays !== "number" ? 365 : expiryDays) * 24
        );
        document.cookie =
            name +
            "=" +
            value +
            ";expires=" +
            exdate.toUTCString() +
            ";path=" +
            (path || "/") +
            (domain ? ";domain=" + domain : "") +
            (secure ? ";secure" : "");
    };

    const $cookiesBanner = document.querySelector(".cookies-eu-banner");
    const $cookiesBannerButton = $cookiesBanner.querySelector("button");
    const cookieName = "cookiesBanner";
    const hasCookie = getCookie(cookieName);

    if (!hasCookie) {
        $cookiesBanner.classList.remove("hidden");
    }

    $cookiesBannerButton.addEventListener("click", () => {
        setCookie(cookieName, "closed");
        $cookiesBanner.classList.add("hidden");
    });
})();



$("#slider").on("input change", (e)=>{
    const sliderPos = e.target.value;
    // Update the width of the foreground image
    $('.foreground-img').css('width', `${sliderPos}%`)
    // Update the position of the slider button
    $('.slider-button').css('left', `calc(${sliderPos}% - 18px)`)
  });


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

const counters = document.querySelectorAll('.counter');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));


(function () {
  const track = document.getElementById('testimonialsTrack');
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












