// Horn of Africa Centre for Regional Integration — shared behaviour

(function () {
  var STORAGE_KEY = 'hoacri-lang';

  function applyLang(lang) {
    var isAr = lang === 'ar';
    document.documentElement.setAttribute('lang', isAr ? 'ar' : 'en');
    document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
    document.body.classList.toggle('lang-ar', isAr);

    document.querySelectorAll('[data-en]').forEach(function (el) {
      var text = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (text !== null) el.textContent = text;
    });

    document.querySelectorAll('[data-en-ph]').forEach(function (el) {
      var text = isAr ? el.getAttribute('data-ar-ph') : el.getAttribute('data-en-ph');
      if (text !== null) el.setAttribute('placeholder', text);
    });

    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = isAr ? 'EN' : 'عربي';
    });

    try { localStorage.setItem(STORAGE_KEY, isAr ? 'ar' : 'en'); } catch (e) {}
  }

  function currentLang() {
    try { return localStorage.getItem(STORAGE_KEY) || 'en'; } catch (e) { return 'en'; }
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(currentLang());

    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(currentLang() === 'ar' ? 'en' : 'ar');
      });
    });

    var navToggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('nav.primary');
    if (navToggle && nav) {
      navToggle.addEventListener('click', function () {
        nav.classList.toggle('open');
      });
    }

    document.querySelectorAll('.card.expandable').forEach(function (card) {
      function toggle() {
        var isOpen = card.classList.toggle('open');
        card.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  });
})();
