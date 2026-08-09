/* ==================================================
   MATHEUS FRAGA — PORTFÓLIO
   Menu mobile, header no scroll, seção ativa,
   animações de entrada e navegação suave.
================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Referências ---------- */
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = document.querySelectorAll('main section[id]');

  /* ---------- Header muda ao rolar a página ---------- */
  const updateHeaderOnScroll = () => {
    if (window.scrollY > 12) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  updateHeaderOnScroll();
  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const closeMobileMenu = () => {
    mobileMenu.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  };

  const openMobileMenu = () => {
    mobileMenu.classList.add('is-open');
    menuToggle.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Fechar menu');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('is-open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  /* Fecha o menu mobile ao clicar em um link */
  document.querySelectorAll('.mobile-menu__list a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---------- Indicação da seção ativa no menu ---------- */
  const setActiveNav = (id) => {
    navLinks.forEach((link) => {
      const isMatch = link.dataset.nav === id;
      link.classList.toggle('is-active', isMatch);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => navObserver.observe(section));
  }

  /* ---------- Animações de entrada (fade-up) ---------- */
  const fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeEls.forEach((el) => fadeObserver.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Brilho que acompanha o cursor no background ---------- */
  const cursorGlow = document.getElementById('cursorGlow');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasHover = window.matchMedia('(hover: hover)').matches;

  if (cursorGlow && !prefersReducedMotion && hasHover) {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let isActive = false;

    window.addEventListener('mousemove', (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!isActive) {
        cursorGlow.classList.add('is-active');
        isActive = true;
      }
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('is-active');
      isActive = false;
    });

    const renderGlow = () => {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderGlow);
    };

    requestAnimationFrame(renderGlow);
  }

  /* ---------- Navegação suave com offset do header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

});
