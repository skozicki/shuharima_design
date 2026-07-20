// cookies-popup.js
document.addEventListener('DOMContentLoaded', () => {
    // Wstrzyknij HTML popupa
    const popupHTML = `
    <!-- COOKIES POPUP MODAL -->
    <div class="cookies-popup-backdrop">
        <div class="cookies-popup-modal">
            <button class="cookies-popup-close" aria-label="Zamknij">×</button>
            <p class="cookies-popup-text">
                Klikając „Akceptuj", wyrażasz zgodę na używanie przeze mnie plików cookie na tej stronie wyłącznie w celach analitycznych. 
                Warto również wiedzieć, że używam Google Fonts API - <a href="https://developers.google.com/fonts/faq/privacy" target="_blank">przeczytaj co to oznacza</a>
            </p>
            <div class="cookies-popup-buttons">
                <button class="cookies-popup-btn-secondary">Odrzuć</button>
                <button class="cookies-popup-btn-accept">Akceptuj</button>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
    // Logika cookies
    const STORAGE_KEY = "cookiesBannerAcceptedAt";
    const REMEMBER_DAYS = 365;

    const $backdrop = document.querySelector(".cookies-popup-backdrop");
    const $acceptBtn = document.querySelector(".cookies-popup-btn-accept");
    const $closeBtn = document.querySelector(".cookies-popup-close");
    const $declineBtn = document.querySelector(".cookies-popup-btn-secondary");

    const acceptedAt = Number(localStorage.getItem(STORAGE_KEY));
    const remainingMs = REMEMBER_DAYS * 24 * 60 * 60 * 1000;
    const hasValidConsent = acceptedAt && (Date.now() - acceptedAt) < remainingMs;

    function closeCookieModal() {
        $backdrop.classList.remove("active");
    }

    function acceptCookies() {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
        closeCookieModal();
    }

    if (!hasValidConsent) {
        $backdrop.classList.add("active");
    }

    $acceptBtn.addEventListener("click", acceptCookies);
    if ($closeBtn) $closeBtn.addEventListener("click", closeCookieModal);
    if ($declineBtn) $declineBtn.addEventListener("click", closeCookieModal);
    $backdrop.addEventListener("click", (e) => {
        if (e.target === $backdrop) closeCookieModal();
    });
});