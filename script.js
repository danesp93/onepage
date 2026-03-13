const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

const initIcons = () => {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
};

const initReveal = () => {
  const elements = document.querySelectorAll('.reveal');
  elements.forEach((el) => {
    const delay = el.getAttribute('data-delay');
    if (delay) {
      el.style.transitionDelay = `${delay}s`;
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
};

const initAccordion = () => {
  const accordion = document.getElementById('faq-accordion');
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll('.accordion-item'));

  const setOpen = (item, open) => {
    const content = item.querySelector('.accordion-content');
    const trigger = item.querySelector('.accordion-trigger');
    if (!content || !trigger) return;

    if (open) {
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      content.style.maxHeight = `${content.scrollHeight}px`;
    } else {
      item.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      content.style.maxHeight = '0px';
    }
  };

  items.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      items.forEach((other) => setOpen(other, false));
      setOpen(item, !isOpen);
    });

    setOpen(item, item.classList.contains('is-open'));
  });
};

const initForms = () => {
  const formIds = ['registration-form', 'contact-form'];
  formIds.forEach((id) => {
    const form = document.getElementById(id);
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      form.reset();
    });
  });
};

const initImageFallback = () => {
  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = 'true';
      img.src = ERROR_IMG_SRC;
      img.alt = 'Error loading image';
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initReveal();
  initAccordion();
  initForms();
  initImageFallback();
});
