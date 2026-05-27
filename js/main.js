// ─────────────────────────────────────────
// BRISA OLIVEIRA E SILVA — Portfolio JS
// ─────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // ── NAV: scrolled state ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── NAV: mobile toggle ──
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    const spans = toggle.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    }
  });

  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.querySelectorAll('span').forEach(s => s.style.transform = '');
    });
  });

  // ── FADE-IN on scroll ──
  const fadeEls = document.querySelectorAll(
    '.work-item, .about-grid, .meta-block, .skill-col, .certifications, .contact-grid, .prototype-card, .prototypes-intro, .prototypes-note'
  );
  fadeEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  // Stagger work items
  document.querySelectorAll('.work-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.04}s`;
  });

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
      }
    });
  });

  // ── ACTIVE NAV on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--terracotta)' : '';
        });
      }
    });
  }, { threshold: 0.4 }).observe && sections.forEach(s => {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(a => {
            a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--terracotta)' : '';
          });
        }
      });
    }, { threshold: 0.35 }).observe(s);
  });

  // ─────────────────────────────────────────
  // SHAPEDIVER MODAL
  // ─────────────────────────────────────────
  const modal      = document.getElementById('sd-modal');
  const iframe     = document.getElementById('sd-iframe');
  const loading    = document.getElementById('sd-loading');
  const modalName  = document.getElementById('sd-modal-name');
  const openLink   = document.getElementById('sd-open-link');
  const closeBtn   = document.getElementById('sd-close');
  const backdrop   = modal?.querySelector('.sd-modal-backdrop');

  function openModal(title, url) {
    // Set header info
    modalName.textContent = title;
    openLink.href = url;

    // Show loading, clear previous iframe src
    loading.classList.remove('hidden');
    iframe.src = '';

    // Show modal
    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    // Small delay so modal animation plays before heavy iframe load
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        iframe.src = url;
      });
    });

    // Hide loading spinner once iframe has loaded
    iframe.onload = () => {
      // Give the 3D scene a moment to initialise before hiding spinner
      setTimeout(() => loading.classList.add('hidden'), 800);
    };
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    // Clear iframe to stop WebGL context running in background
    iframe.src = '';
    loading.classList.remove('hidden');
  }

  // Attach click to every prototype card
  document.querySelectorAll('.prototype-card[data-url]').forEach(card => {
    card.addEventListener('click', () => {
      openModal(card.dataset.title, card.dataset.url);
    });
  });

  // Close via button or backdrop click
  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

});
