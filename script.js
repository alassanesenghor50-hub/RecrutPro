// =====================
// 1. MENU BURGER (mobile)
// =====================
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

if (burger) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// =====================
// 2. NAVBAR AU SCROLL
// =====================
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  navbar.style.boxShadow = window.scrollY > 60
    ? '0 4px 20px rgba(0,0,0,0.08)'
    : 'none';
});

// =====================
// 3. ANIMATION AU SCROLL
// =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// =====================
// 4. COMPTEUR ANIMÉ
// =====================
function animateCounter(el, target, suffix) {
  let count = 0;
  const step = target / (1500 / 16);
  const timer = setInterval(() => {
    count += step;
    if (count >= target) { count = target; clearInterval(timer); }
    el.textContent = Math.floor(count) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCounter(el, parseInt(el.dataset.target), el.dataset.suffix || '');
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stat h2').forEach(el => statsObserver.observe(el));

// =====================
// 5. LIEN ACTIF NAVBAR
// =====================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.id;
  });
  navItems.forEach(a => {
    a.style.color = '';
    a.style.fontWeight = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = '#185FA5';
      a.style.fontWeight = '500';
    }
  });
});

// =====================
// 6. FORMULAIRE DE CONTACT
// =====================
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nom = form.querySelector('#nom')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    if (!nom) return showAlert('Veuillez entrer votre nom.', 'error');
    if (!email || !email.includes('@')) return showAlert('Veuillez entrer un email valide.', 'error');
    if (!message) return showAlert('Veuillez écrire un message.', 'error');

    showAlert(`Merci ${nom} ! Votre message a été envoyé. Nous répondons sous 24h.`, 'success');
    form.reset();
  });
}

function showAlert(msg, type) {
  document.querySelector('.custom-alert')?.remove();
  const el = document.createElement('div');
  el.className = 'custom-alert';
  el.textContent = msg;
  el.style.cssText = `
    position:fixed; bottom:24px; right:24px;
    background:${type === 'success' ? '#0F6E56' : '#A32D2D'};
    color:#fff; padding:16px 24px; border-radius:12px;
    font-size:14px; max-width:360px; z-index:9999;
    box-shadow:0 8px 24px rgba(0,0,0,0.15);
    animation:slideIn 0.3s ease;
  `;
  const style = document.createElement('style');
  style.textContent = `@keyframes slideIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`;
  document.head.appendChild(style);
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}