// ======================================
//   ALIGN-ALL WEBSITE — APP.JS
//   Clean Animation Engine (No overlay)
// ======================================

// =============================================
// 1. SCROLL PROGRESS BAR
// =============================================
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.prepend(progressBar);

// =============================================
// 2. NAVBAR scroll + hamburger
// =============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = Math.min((scrollTop / docHeight) * 100, 100);
  progressBar.style.width = pct + '%';

  navbar.classList.toggle('scrolled', scrollTop > 50);

  // Parallax orbs
  document.querySelectorAll('.hero-bg .orb').forEach((orb, i) => {
    orb.style.transform = `translateY(${scrollTop * (0.04 + i * 0.015)}px)`;
  });
}, { passive: true });

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinksEl.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity  = isOpen ? '0' : '';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// =============================================
// 3. SMOOTH SCROLL on nav clicks (no overlay)
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const targetEl = document.getElementById(href.slice(1));
    if (!targetEl) return;
    e.preventDefault();

    // Close mobile menu
    navLinksEl.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });

    // Smooth scroll
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// =============================================
// 4. ACTIVE NAV — highlight current section
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObs.observe(s));

// =============================================
// 5. SCROLL REVEAL — staggered entrance
// =============================================
document.querySelectorAll('.section-header, .hero-content, .hero-visual').forEach(el => {
  el.classList.add('reveal-section');
});

const staggerGroups = [
  { selector: '.why-card, .feature-card, .advantage-card', delay: 90  },
  { selector: '.step, .workflow-step',                      delay: 130 },
  { selector: '.gallery-card, .cap-card',                   delay: 110 },
  { selector: '.faq-item',                                  delay: 65  },
  { selector: '.contact-card, .contact-method-card',        delay: 110 },
  { selector: '.stat-banner-item, .stat-item',              delay: 90  },
  { selector: '.trusted-item',                              delay: 65  },
  { selector: '.testimonial-card',                          delay: 100 },
];

staggerGroups.forEach(({ selector, delay }) => {
  try {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal-item');
      el.style.transitionDelay = `${i * delay}ms`;
    });
  } catch(e) {}
});

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal-section, .reveal-item').forEach(el => {
  revealObs.observe(el);
});

// =============================================
// 6. SVG GRADIENT DEFS
// =============================================
document.body.insertAdjacentHTML('afterbegin', `
<svg width="0" height="0" style="position:absolute;pointer-events:none;z-index:-1">
  <defs>
    <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38D3D5"/>
      <stop offset="100%" stop-color="#7B6FE8"/>
    </linearGradient>
    <linearGradient id="gsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38D3D5"/>
      <stop offset="100%" stop-color="#7B6FE8"/>
    </linearGradient>
  </defs>
</svg>
`);

// =============================================
// 7. FAQ TOGGLE
// =============================================
function toggleFaq(id) {
  const item = document.getElementById(id);
  if (!item) return;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}
window.toggleFaq = toggleFaq;

// =============================================
// 8. ON LOAD — trigger visible elements
// =============================================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.reveal-item, .reveal-section').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) el.classList.add('visible');
    });
  }, 100);

  // Hero dial animation
  const dialProgress = document.querySelector('.dial-progress');
  if (dialProgress) {
    dialProgress.style.strokeDashoffset = '251';
    setTimeout(() => {
      dialProgress.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.6s';
      dialProgress.style.strokeDashoffset = '50';
    }, 400);
  }

  // Compliance bar
  const fill = document.querySelector('.compliance-fill');
  if (fill) {
    fill.style.width = '0%';
    setTimeout(() => {
      fill.style.transition = 'width 1.6s cubic-bezier(0.4,0,0.2,1) 0.5s';
      fill.style.width = '87%';
    }, 600);
  }
});

// =============================================
// 9. RIPPLE on CTA buttons
// =============================================
document.querySelectorAll('.btn-primary, .btn-primary-sm, .store-btn, .btn-secondary').forEach(btn => {
  btn.style.overflow = 'hidden';
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `
      position:absolute; pointer-events:none;
      width:${size}px; height:${size}px; border-radius:50%;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(255,255,255,0.18);
      transform:scale(0);
      animation:rippleAnim 0.55s ease-out forwards;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// =============================================
// 10. GOLD CURSOR GLOW (desktop)
// =============================================
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  document.body.appendChild(glow);
  let cx = -200, cy = -200, tx = -200, ty = -200;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  (function animGlow() {
    cx += (tx - cx) * 0.1;
    cy += (ty - cy) * 0.1;
    glow.style.transform = `translate(${cx - 150}px, ${cy - 150}px)`;
    requestAnimationFrame(animGlow);
  })();
}

// =============================================
// 11. STEP CONNECTOR line animate-in
// =============================================
document.querySelectorAll('.step-connector, .workflow-connector').forEach(c => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('animate-line'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  obs.observe(c);
});

console.log('%c✨ Align-All', 'color:#FFD700;font-size:22px;font-weight:900;');
console.log('%cPremium Dental Technology', 'color:#FFA500;font-size:13px;');

// =============================================

// =============================================
const formTabBtns = document.querySelectorAll('.form-tab-btn');
const doctorFields = document.getElementById('doctorFields');
const patientFields = document.getElementById('patientFields');
const formHeaderTitle = document.getElementById('formHeaderTitle');

const docNameInput = document.getElementById('docName');
const clinicNameInput = document.getElementById('clinicName');
const patientNameInput = document.getElementById('patientName');
const patientCityInput = document.getElementById('patientCity');

formTabBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    formTabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (btn.dataset.tab === 'doctor') {
      doctorFields.style.display = 'block';
      patientFields.style.display = 'none';
      formHeaderTitle.textContent = 'Request Clinical Info / Submit Case';
      
      if(docNameInput) docNameInput.setAttribute('required', 'true');
      if(clinicNameInput) clinicNameInput.setAttribute('required', 'true');
      if(patientNameInput) patientNameInput.removeAttribute('required');
      if(patientCityInput) patientCityInput.removeAttribute('required');
    } else {
      doctorFields.style.display = 'none';
      patientFields.style.display = 'block';
      formHeaderTitle.textContent = 'Contact Align-All Support';
      
      if(docNameInput) docNameInput.removeAttribute('required');
      if(clinicNameInput) clinicNameInput.removeAttribute('required');
      if(patientNameInput) patientNameInput.setAttribute('required', 'true');
      if(patientCityInput) patientCityInput.setAttribute('required', 'true');
    }
  });
});

// =============================================
// 12. PHONE SCREEN AUTO-ROTATION CAROUSEL
// =============================================
const phoneScreen = document.querySelector('.phone-screen');
if (phoneScreen) {
  const uis = phoneScreen.querySelectorAll('.app-ui');
  const card1 = document.querySelector('.floating-card.card-1');
  const card2 = document.querySelector('.floating-card.card-2');
  const dots = phoneScreen.closest('.phone-mockup').querySelectorAll('.indicator-dot');
  let currentScreenIdx = 0;
  let autoRotateInterval;

  // Initialize card states
  if (card1 && card2) {
    card1.classList.add('hidden');
    card2.classList.remove('hidden');
  }

  // Update UI function
  function updateMockupScreen(targetIdx) {
    // Hide current screen
    uis[currentScreenIdx].classList.remove('active');
    
    // Update index
    currentScreenIdx = targetIdx;
    
    // Show new screen
    uis[currentScreenIdx].classList.add('active');

    // Update dots active class
    if (dots.length > 0) {
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentScreenIdx);
      });
    }

    // Toggle card visibility based on active screen
    const screenName = uis[currentScreenIdx].dataset.screen;
    if (card1 && card2) {
      if (screenName === 'timer') {
        card1.classList.add('hidden');
        card2.classList.remove('hidden');
      } else if (screenName === 'scan') {
        card1.classList.remove('hidden');
        card2.classList.add('hidden');
      } else {
        card1.classList.add('hidden');
        card2.classList.add('hidden');
      }
    }

    // Trigger compliance timer animation if transitioning back to timer screen
    if (screenName === 'timer') {
      const dialProgress = uis[currentScreenIdx].querySelector('.dial-progress');
      if (dialProgress) {
        dialProgress.style.transition = 'none';
        dialProgress.style.strokeDashoffset = '251';
        setTimeout(() => {
          dialProgress.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1)';
          dialProgress.style.strokeDashoffset = '50';
        }, 50);
      }

      const fill = uis[currentScreenIdx].querySelector('.compliance-fill');
      if (fill) {
        fill.style.transition = 'none';
        fill.style.width = '0%';
        setTimeout(() => {
          fill.style.transition = 'width 1.6s cubic-bezier(0.4,0,0.2,1)';
          fill.style.width = '87%';
        }, 50);
      }
    }
  }

  // Start auto-rotation
  function startAutoRotation() {
    autoRotateInterval = setInterval(() => {
      const nextIdx = (currentScreenIdx + 1) % uis.length;
      updateMockupScreen(nextIdx);
    }, 2500);
  }

  // Reset auto-rotation on manual click to give user time to read
  function resetAutoRotation() {
    clearInterval(autoRotateInterval);
    startAutoRotation();
  }

  // Set up dot click listeners
  if (dots.length > 0) {
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        if (currentScreenIdx !== idx) {
          updateMockupScreen(idx);
          resetAutoRotation();
        }
      });
    });
  }

  // Initialize auto rotation
  startAutoRotation();
}

// =============================================
// 13. GOOGLE SHEETS FORM SUBMISSION HANDLER (IFRAME METHOD)
// =============================================
let formSubmitting = false;

window.iframeSubmitted = function() {
  if (formSubmitting) {
    alert('Success! Your case request has been sent. We will get back to you shortly.');
    const clinicalForm = document.getElementById('clinicalForm');
    if (clinicalForm) clinicalForm.reset();
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      submitBtn.textContent = 'Submit';
      submitBtn.disabled = false;
    }
    formSubmitting = false;
  }
};

const clinicalForm = document.getElementById('clinicalForm');
if (clinicalForm) {
  clinicalForm.addEventListener('submit', function() {
    formSubmitting = true;
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;
    }
  });
}


