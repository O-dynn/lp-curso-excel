// ===== Cálculo da altura da nav para offset dinâmico =====
const header = document.querySelector('.site-header');

function navOffset() {
  // 12px de folga extra para o topo não “colar”
  return (header?.offsetHeight || 72) + 12;
}

function setNavCssVar() {
  document.documentElement.style.setProperty('--navH', navOffset() + 'px');
}

setNavCssVar();
window.addEventListener('resize', setNavCssVar);

// ===== Scroll suave com OFFSET para âncoras =====
document.querySelectorAll('.js-scroll').forEach((link) => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();

      const el = document.querySelector(targetId);
      if (!el) return;

      const top =
        el.getBoundingClientRect().top + window.pageYOffset - navOffset();

      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== Animação leve ao clicar em CTA =====
const ctas = document.querySelectorAll('.btn-primary');

ctas.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 300);
  });
});

// ===== Validação simples de formulário =====
const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', (e) => {
    const emailField = form.querySelector('input[type="email"]');
    if (!emailField.value.includes('@')) {
      e.preventDefault();
      alert('Por favor, insira um e-mail válido.');
    }
  });
}

// ===== Feedback visual no foco de campos =====
const fields = document.querySelectorAll('input, textarea, select');

fields.forEach((f) => {
  f.addEventListener('focus', () => {
    f.style.boxShadow = '0 0 0 3px rgba(110,231,183,.3)';
  });
  f.addEventListener('blur', () => {
    f.style.boxShadow = 'none';
  });
});

// ===== Animação suave de entrada nas seções =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('section').forEach((section) => {
  observer.observe(section);
});

// ===== CSS inline para pequenas animações =====
const style = document.createElement('style');

style.textContent = `
  section { opacity: 0; transform: translateY(20px); transition: opacity .6s ease, transform .6s ease; }
  section.visible { opacity: 1; transform: none; }
  .btn-primary.active { transform: scale(0.96); box-shadow: 0 0 0 3px rgba(110,231,183,.4); }
`;

document.head.appendChild(style);

// ===== Slider automático de depoimentos =====
(function initTestimonialSlider() {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('.slider-dots .dot'));
  if (!slides.length) return;

  let i = 0;
  let timer;

  const setActive = (idx) => {
    slides.forEach((s, k) => s.classList.toggle('is-active', k === idx));
    dots.forEach((d, k) => {
      d.classList.toggle('is-active', k === idx);
      d.setAttribute('aria-selected', k === idx ? 'true' : 'false');
      d.tabIndex = k === idx ? 0 : -1;
    });
    i = idx;
  };

  const next = () => setActive((i + 1) % slides.length);

  const autoplay = () => {
    clearInterval(timer);
    timer = setInterval(next, 4500);
  };

  dots.forEach((d, idx) => {
    d.addEventListener('click', () => {
      setActive(idx);
      autoplay();
    });
  });

  setActive(0);
  autoplay();
})();
