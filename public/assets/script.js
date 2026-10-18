/* Hanzla Amjad — navigation, ordered project galleries and project inquiries. */
(() => {
  'use strict';
  const root = document.documentElement;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionOff = () => motionQuery.matches;
  root.classList.toggle('motion-reduced', motionOff());
  motionQuery.addEventListener('change', () => root.classList.toggle('motion-reduced', motionOff()));

  const progress = document.querySelector('.scroll-progress');
  let scrollScheduled = false;
  function updateProgress() {
    const range = root.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) : 0})`;
    scrollScheduled = false;
  }
  window.addEventListener('scroll', () => { if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateProgress); } }, {passive:true});
  window.addEventListener('resize', updateProgress, {passive:true});
  updateProgress();

  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-menu');
  function closeMenu(returnFocus = false) {
    if (!menu || !menuButton) return;
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded','false');
    menuButton.setAttribute('aria-label','Open navigation');
    if (returnFocus) menuButton.focus();
  }
  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menu.hidden = !open;
      menuButton.setAttribute('aria-expanded',String(open));
      menuButton.setAttribute('aria-label',open ? 'Close navigation' : 'Open navigation');
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click',()=>closeMenu()));
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden)closeMenu(true);});
    document.addEventListener('click',event=>{if(!menu.hidden&&!event.target.closest('.site-header'))closeMenu();});
    window.addEventListener('resize',()=>{if(window.innerWidth>820)closeMenu();},{passive:true});
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('will-reveal'); observer.unobserve(entry.target); }
    }), {threshold:.03,rootMargin:'0px 0px -20px 0px'});
    document.querySelectorAll('.reveal').forEach(element=>{if(!motionOff())element.classList.add('will-reveal');observer.observe(element);});
    root.classList.add('js');
  }

  // Every gallery follows the sequence supplied in src/projects.mjs. No autoplay.
  const dataElement = document.querySelector('#portfolio-data');
  const galleryDialog = document.querySelector('#gallery-dialog');
  if (dataElement && galleryDialog) {
    const data = JSON.parse(dataElement.textContent);
    const records = new Map(data.projects.map(project=>[project.id,project]));
    records.set('a2p',{id:'a2p',name:'A2P Registration & Approvals',category:'GHL TRUST CENTER',slides:data.a2pProofs});
    const positions = new Map([...records.keys()].map(id=>[id,0]));
    const cards = new Map();
    let active = null;
    const pad = n=>String(n).padStart(2,'0');
    function move(id,amount) {
      const record=records.get(id); if(!record||!record.slides.length)return;
      const index=((amount%record.slides.length)+record.slides.length)%record.slides.length;
      positions.set(id,index);
      const slide=record.slides[index],card=cards.get(id);
      if(card){
        const image=card.querySelector('.gallery-image');image.src=slide.src;image.alt=slide.description;image.width=slide.width;image.height=slide.height;
        card.querySelector('.slide-label').textContent=slide.label;
        card.querySelector('.slide-count').textContent=`${pad(index+1)} / ${pad(record.slides.length)}`;
        card.querySelector('.gallery-progress span').style.width=`${(index+1)/record.slides.length*100}%`;
      }
      if(active===id){
        const image=galleryDialog.querySelector('#dialog-image');image.src=slide.src;image.alt=slide.description;image.width=slide.width;image.height=slide.height;
        galleryDialog.querySelector('#dialog-title').textContent=record.name;
        galleryDialog.querySelector('#dialog-category').textContent=record.category;
        galleryDialog.querySelector('#dialog-label').textContent=slide.label;
        galleryDialog.querySelector('#dialog-description').textContent=slide.description;
        galleryDialog.querySelector('#dialog-count').textContent=`${pad(index+1)} / ${pad(record.slides.length)}`;
        galleryDialog.querySelector('#dialog-original').href=slide.src;
      }
    }
    document.querySelectorAll('[data-gallery]').forEach(card=>{
      const id=card.dataset.gallery;cards.set(id,card);
      card.querySelector('[data-previous]').addEventListener('click',()=>move(id,positions.get(id)-1));
      card.querySelector('[data-next]').addEventListener('click',()=>move(id,positions.get(id)+1));
      card.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(id,positions.get(id)+(event.key==='ArrowRight'?1:-1));}});
      let startX=0,startY=0;
      card.addEventListener('touchstart',event=>{startX=event.changedTouches[0].clientX;startY=event.changedTouches[0].clientY;},{passive:true});
      card.addEventListener('touchend',event=>{const dx=event.changedTouches[0].clientX-startX,dy=event.changedTouches[0].clientY-startY;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)move(id,positions.get(id)+(dx<0?1:-1));},{passive:true});
    });
    document.querySelectorAll('[data-open-gallery]').forEach(button=>button.addEventListener('click',()=>{
      const id=button.dataset.openGallery;if(!records.has(id))return;
      active=id;
      move(id,button.dataset.start!==undefined?Number(button.dataset.start):positions.get(id));
      if(!galleryDialog.open)galleryDialog.showModal();
      document.body.classList.add('modal-open');
    }));
    galleryDialog.querySelector('[data-close-gallery]').addEventListener('click',()=>galleryDialog.close());
    galleryDialog.querySelector('[data-dialog-previous]').addEventListener('click',()=>move(active,positions.get(active)-1));
    galleryDialog.querySelector('[data-dialog-next]').addEventListener('click',()=>move(active,positions.get(active)+1));
    galleryDialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(active,positions.get(active)+(event.key==='ArrowRight'?1:-1));}});
    galleryDialog.addEventListener('click',event=>{if(event.target===galleryDialog)galleryDialog.close();});
    galleryDialog.addEventListener('close',()=>{active=null;document.body.classList.remove('modal-open');});
  }
  const privacy = document.querySelector('#privacy-dialog');
  if (privacy) {
    document.querySelectorAll('[data-open-privacy]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();privacy.showModal();document.body.classList.add('modal-open');}));
    document.querySelector('[data-close-privacy]').addEventListener('click',()=>privacy.close());
    privacy.addEventListener('click',event=>{if(event.target===privacy)privacy.close();});
    privacy.addEventListener('close',()=>document.body.classList.remove('modal-open'));
    if (window.location.hash==='#privacy') {privacy.showModal();document.body.classList.add('modal-open');}
  }

  // These events contain no name, email, phone number or message.
  // They are queued locally only; install your own consent-aware analytics separately.
  function track(event, details = {}) {
    if (!Array.isArray(window.dataLayer)) window.dataLayer = [];
    window.dataLayer.push({ event, ...details });
  }
  document.querySelectorAll('[data-channel]').forEach(link => link.addEventListener('click', () => {
    track('contact_click', { contact_channel: link.dataset.channel });
  }));

  // Preserve attribution in this tab; never store the visitor's contact fields.
  const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'msclkid'];
  const query = new URLSearchParams(window.location.search);
  let attribution = {};
  try { attribution = JSON.parse(sessionStorage.getItem('ha-campaign-v1') || '{}'); } catch (_) {}
  if (!attribution || typeof attribution !== 'object' || Array.isArray(attribution)) attribution = {};
  const hasNewCampaign = campaignKeys.some(key => query.has(key));
  if (hasNewCampaign) {
    attribution = {};
    campaignKeys.forEach(key => { const value = query.get(key); if (value) attribution[key] = value.slice(0, 250); });
    try { sessionStorage.setItem('ha-campaign-v1', JSON.stringify(attribution)); } catch (_) {}
  }


  const pricingGrid=document.querySelector('.pricing-grid');
  if(pricingGrid)document.querySelectorAll('[data-pricing-filter]').forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.pricingFilter;
    pricingGrid.dataset.activeFilter=filter;
    document.querySelectorAll('[data-pricing-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    pricingGrid.querySelectorAll('[data-plan-type]').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.planType!==filter;});
  }));

  const form = document.querySelector('#contactForm');
  if (!form) {
    const year = document.querySelector('#year');
    if (year) year.textContent = String(new Date().getFullYear());
    return;
  }
  const submitButton = document.querySelector('#submitBtn');
  const submitLabel = submitButton.querySelector('.submit-label');
  const status = document.querySelector('#formStatus');
  const subject = document.querySelector('#cf-subject');
  const requestedService = query.get('service');
  if (requestedService && Array.from(subject.options || []).some(option => option.value === requestedService)) subject.value = requestedService;
  const phone = document.querySelector('#cf-whatsapp');
  const phoneError = document.querySelector('#phone-error');
  let started = false;
  let sending = false;
  form.addEventListener('focusin', () => {
    if (!started) { track('lead_form_start'); started = true; }
  });
  document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
    subject.value = link.dataset.service;
  }));

  campaignKeys.forEach(key => {
    if (typeof attribution[key] !== 'string') return;
    const field = document.createElement('input');
    field.type = 'hidden'; field.name = key; field.value = attribution[key].slice(0, 250); form.appendChild(field);
  });

  function validatePhone(showError = false) {
    const value = phone.value.trim();
    const digits = value.replace(/\D/g, '').length;
    const valid = value === '' || (/^\+?[\d\s().-]+$/.test(value) && digits >= 7 && digits <= 15);
    phone.setCustomValidity(valid ? '' : 'Please enter a phone number with 7–15 digits.');
    phoneError.hidden = valid || !showError;
    if (valid) phone.removeAttribute('aria-invalid');
    else if (showError) phone.setAttribute('aria-invalid', 'true');
    return valid;
  }
  phone.addEventListener('input', () => validatePhone(!phoneError.hidden));
  phone.addEventListener('blur', () => validatePhone(true));
  phone.addEventListener('invalid', () => validatePhone(true));
  const requiredText = [document.querySelector('#cf-name'), document.querySelector('#cf-message')];
  function validateText(field) {
    const minimum = field.id === 'cf-name' ? 2 : 10;
    field.setCustomValidity(field.value.trim().length < minimum ? `Please enter at least ${minimum} characters.` : '');
  }
  requiredText.forEach(field => {
    field.addEventListener('input', () => validateText(field));
    field.addEventListener('blur', () => validateText(field));
  });
  function setStatus(type, text) {
    status.hidden = false;
    status.className = 'form-status ' + type;
    status.textContent = text;
  }
  function addEmailFallback() {
    const link = document.createElement('a');
    link.href = 'mailto:hanzala.ghl@gmail.com';
    link.textContent = 'Email Hanzla directly';
    status.appendChild(document.createTextNode(' '));
    status.appendChild(link);
    status.appendChild(document.createTextNode(' or use WhatsApp.'));
  }

  const initialSubmitLabel = submitLabel.textContent;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    validatePhone(true);
    requiredText.forEach(validateText);
    if (!form.reportValidity()) return;
    if (form.elements.botcheck.checked) return;
    const submittedService = subject.value;
    const payload = new FormData(form);
    ['name', 'email', 'whatsapp', 'message'].forEach(key => payload.set(key, String(payload.get(key) || '').trim()));
    sending = true;
    submitButton.disabled = true;
    form.setAttribute('aria-busy', 'true');
    submitLabel.textContent = 'Sending your project brief…';
    setStatus('sending', 'Sending your details. Please keep this page open.');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(form.action, {
        method: 'POST', body: payload, headers: { Accept: 'application/json' }, signal: controller.signal
      });
      const data = await response.json();
      if (!response.ok || data.success !== true) throw new Error('submission_rejected');
      setStatus('success', 'Thanks — your project brief has been sent. I’ll get back to you by email.');
      track('generate_lead', { service: submittedService });
      form.reset();
      requiredText.forEach(field => field.setCustomValidity(''));
      phone.setCustomValidity('');
      phone.removeAttribute('aria-invalid');
      phoneError.hidden = true;
      started = false;
    } catch (error) {
      const text = error.name === 'AbortError'
        ? 'The confirmation is taking longer than expected. Your brief may have been sent; please contact me directly before retrying.'
        : 'Your brief couldn’t be confirmed. Your details are still here so you can try again.';
      setStatus('error', text);
      addEmailFallback();
    } finally {
      clearTimeout(timeout);
      sending = false;
      submitButton.disabled = false;
      submitLabel.textContent = initialSubmitLabel || 'Send your project';
      form.removeAttribute('aria-busy');
      status.focus({ preventScroll: true });
      status.scrollIntoView({ behavior: motionOff() ? 'auto' : 'smooth', block: 'nearest' });
    }
  });

  document.querySelector('#year').textContent = String(new Date().getFullYear());

})();
