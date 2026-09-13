  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reveals = document.querySelectorAll('.reveal');
  const movingSvgs = document.querySelectorAll('svg:has(animateMotion)');
  let revealObserver;
  if ('IntersectionObserver' in window && !motionPreference.matches) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(element => revealObserver.observe(element));
    document.documentElement.classList.add('motion-ready');
  } else {
    reveals.forEach(element => element.classList.add('in-view'));
  }
  function applyMotionPreference() {
    movingSvgs.forEach(svg => {
      if (motionPreference.matches) svg.pauseAnimations();
      else svg.unpauseAnimations();
    });
    if (motionPreference.matches) {
      reveals.forEach(element => element.classList.add('in-view'));
      revealObserver?.disconnect();
    }
  }
  applyMotionPreference();
  motionPreference.addEventListener('change', applyMotionPreference);

  // O próprio CTA muda de posição: não há duplicação ou supressão de copy.
  const mobileViewport = window.matchMedia('(max-width: 560px)');
  const ctaSlot = document.querySelector('.hero-cta-slot');
  const heroButton = ctaSlot.querySelector('.btn');
  const purchasePanel = document.querySelector('.offer-purchase');
  const checkoutLink = document.querySelector('#checkout-link');
  const originalHref = heroButton.getAttribute('href');
  let ctaFrame;
  function updateMobileCta() {
    ctaFrame = null;
    const mobile = mobileViewport.matches;
    if (!heroButton.classList.contains('is-docked')) {
      ctaSlot.style.setProperty('--cta-slot-height', heroButton.getBoundingClientRect().height + 'px');
    }
    const passed = ctaSlot.getBoundingClientRect().bottom < 0;
    const purchaseBounds = purchasePanel.getBoundingClientRect();
    const purchaseVisible = purchaseBounds.top < window.innerHeight && purchaseBounds.bottom > 0;
    const otherCtaVisible = [...document.querySelectorAll('.btn')].some(button => {
      if (button === heroButton) return false;
      const bounds = button.getBoundingClientRect();
      return bounds.top < window.innerHeight && bounds.bottom > 44;
    });
    const dock = mobile && passed && !purchaseVisible && !otherCtaVisible;
    if (dock !== heroButton.classList.contains('is-docked')) {
      const focused = document.activeElement === heroButton;
      heroButton.classList.toggle('is-docked', dock);
      document.body.classList.toggle('has-docked-cta', dock);
      if (dock) {
        const checkout = checkoutLink.getAttribute('href');
        heroButton.setAttribute('href', checkout && checkout !== '#' ? checkout : originalHref);
        document.body.appendChild(heroButton);
      } else {
        heroButton.setAttribute('href', originalHref);
        ctaSlot.appendChild(heroButton);
      }
      if (focused) heroButton.focus({ preventScroll: true });
    }
    if (!mobile) ctaSlot.style.removeProperty('--cta-slot-height');
  }
  function scheduleCtaUpdate() {
    if (!ctaFrame) ctaFrame = requestAnimationFrame(updateMobileCta);
  }
  window.addEventListener('scroll', scheduleCtaUpdate, { passive: true });
  window.addEventListener('resize', scheduleCtaUpdate);
  mobileViewport.addEventListener('change', scheduleCtaUpdate);
  document.fonts.ready.then(scheduleCtaUpdate);
  if ('ResizeObserver' in window) {
    new ResizeObserver(scheduleCtaUpdate).observe(ctaSlot);
  }
  updateMobileCta();
