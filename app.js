(() => {
  'use strict';

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
      nav.classList.toggle('is-open', !isOpen);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Ouvrir le menu');
      nav.classList.remove('is-open');
    }));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Ouvrir le menu');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  document.querySelectorAll('[data-carousel][data-direction]').forEach((button) => {
    button.addEventListener('click', () => {
      const carousel = document.getElementById(button.dataset.carousel);
      if (!carousel) return;
      const firstCard = carousel.querySelector('.dish-card');
      const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : carousel.clientWidth * 0.8;
      const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;
      carousel.scrollBy({ left: (cardWidth + gap) * (button.dataset.direction === 'next' ? 1 : -1), behavior: 'smooth' });
    });
  });

  const dialog = document.querySelector('.meal-dialog');
  const dialogTitle = dialog?.querySelector('#dialog-title');
  const dialogDescription = dialog?.querySelector('.dialog-description');
  const dialogPrice = dialog?.querySelector('.dialog-price');
  if (dialog && dialogTitle && dialogDescription && dialogPrice) {
    document.querySelectorAll('[data-meal]').forEach((button) => button.addEventListener('click', () => {
      dialogTitle.textContent = button.dataset.meal || '';
      dialogDescription.textContent = button.dataset.description || '';
      dialogPrice.textContent = button.dataset.price || '';
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    }));
    dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
