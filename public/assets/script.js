/* Hanzla Amjad — progressive enhancement, motion and lead inquiries. */
(() => {
  'use strict';

  const root = document.documentElement;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  // Animations always run. The only exception is a visitor who has turned on
  // "reduce motion" in their own device settings; for them the sculpture stays still.
  const motionOff = () => motionQuery.matches;
  let updateFlowMotion = () => {};
  function syncMotion() {
    root.classList.toggle('motion-reduced', motionOff());
    updateFlowMotion();
  }
  syncMotion();
  // A light, projected 3D funnel. Content and navigation stay in the HTML.
  (() => {
    const canvas = document.querySelector('#flow-canvas');
    if (!canvas || typeof canvas.getContext !== 'function') return;
    let context;
    try { context = canvas.getContext('2d', { alpha: true }); } catch (_) { return; }
    if (!context) return;
    const stage = canvas.parentElement;
    let width = 0, height = 0, raf = 0, visible = true, lastFrame = 0, angle = .34, phase = 0;
    let pointerX = 0, pointerY = 0;
    const segments = window.innerWidth < 700 ? 28 : 42;
    const levels = window.innerWidth < 700 ? 16 : 22;
    const circle = Math.PI * 2;
    const radiusAt = u => 1.47 - 1.08 * Math.pow(Math.min(u / .82, 1), .86);
    const colorAt = u => {
      const colors = u < .48 ? [[130, 96, 255], [123, 116, 249], u / .48] :
        [[123, 116, 249], [58, 220, 238], (u - .48) / .52];
      return colors[0].map((c, i) => Math.round(c + (colors[1][i] - c) * colors[2]));
    };
    function draw() {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const size = Math.min(width, height) * .228;
      const spin = angle + pointerX * .3;
      const pitch = .42 + pointerY * .12;
      const sp = Math.sin(pitch), cp = Math.cos(pitch);
      const ss = Math.sin(spin), cs = Math.cos(spin);
      const project = (u, theta) => {
        const r = radiusAt(u), x = r * Math.cos(theta), z = r * Math.sin(theta);
        const x1 = x * cs - z * ss, z1 = x * ss + z * cs;
        const y = -1.19 + u * 2.38;
        const y1 = y * cp - z1 * sp, depth = y * sp + z1 * cp;
        const perspective = 5.4 / (5.4 + depth);
        return { x: width * .5 + x1 * size * perspective,
          y: height * .505 + y1 * size * perspective, depth };
      };
      const trace = points => {
        context.beginPath();
        points.forEach((p, i) => i ? context.lineTo(p.x, p.y) : context.moveTo(p.x, p.y));
      };
      const glow = context.createRadialGradient(width*.51,height*.46,8,width*.51,height*.46,size*2.4);
      glow.addColorStop(0,'rgba(106,76,248,.16)');
      glow.addColorStop(.55,'rgba(33,112,178,.07)');
      glow.addColorStop(1,'rgba(6,9,23,0)');
      context.fillStyle=glow;context.fillRect(0,0,width,height);

      const vertices = Array.from({length:levels+1},(_,i)=>
        Array.from({length:segments+1},(_,j)=>project(i/levels,j/segments*circle)));
      const faces=[];
      for(let i=0;i<levels;i++)for(let j=0;j<segments;j++){
        const quad=[vertices[i][j],vertices[i][j+1],vertices[i+1][j+1],vertices[i+1][j]];
        const depth=quad.reduce((n,p)=>n+p.depth,0)/4;
        faces.push({quad,depth,u:i/levels,theta:(j+.5)/segments*circle});
      }
      faces.sort((a,b)=>b.depth-a.depth);
      context.lineJoin='round';
      for(const face of faces){
        const [red,green,blue]=colorAt(face.u);
        const light=(Math.sin(face.theta+spin)+1)/2;
        const front=face.depth<.25;
        const alpha=(front?.43:.15)+light*(front?.13:.06);
        trace(face.quad);context.closePath();
        context.fillStyle='rgba('+red+','+green+','+blue+','+alpha+')';
        context.fill();
        if(face.u<.79 && face.theta % (circle/segments*4)<circle/segments){
          context.strokeStyle='rgba(166,218,255,'+(front?.18:.08)+')';
          context.lineWidth=.65;context.stroke();
        }
      }

      // The dark opening, double rim and taper make the silhouette read as a funnel.
      const top=Array.from({length:segments+1},(_,j)=>vertices[0][j]);
      trace(top);context.closePath();
      context.fillStyle='rgba(5,10,30,.83)';context.fill();
      const inner=Array.from({length:segments+1},(_,j)=>{
        const p=project(.015,j/segments*circle);
        return {x:width*.5+(p.x-width*.5)*.81,y:height*.505+(p.y-height*.505)*.81};
      });
      trace(inner);context.closePath();
      context.strokeStyle='rgba(155,120,255,.36)';context.lineWidth=2;context.stroke();
      const rim=context.createLinearGradient(width*.16,height*.3,width*.84,height*.63);
      rim.addColorStop(0,'#7d6dff');rim.addColorStop(.42,'#f7c4ff');
      rim.addColorStop(.72,'#69eeff');rim.addColorStop(1,'#7859ea');
      trace(top);context.closePath();
      context.shadowColor='rgba(113,127,255,.9)';context.shadowBlur=22;
      context.strokeStyle=rim;context.lineWidth=2.5;context.stroke();
      context.shadowBlur=0;

      // Latitude rings and bright meridians reveal depth while the object turns.
      for(const u of [.18,.43,.67,.82,1]){
        const line=Array.from({length:segments+1},(_,j)=>project(u,j/segments*circle));
        trace(line);context.closePath();
        context.strokeStyle=u===1?'rgba(71,232,247,.8)':'rgba(136,175,255,.27)';
        context.lineWidth=u===1?2:1;context.stroke();
      }
      for(let j=0;j<segments;j+=Math.max(1,Math.round(segments/10))){
        const points=Array.from({length:levels+1},(_,i)=>vertices[i][j]);
        trace(points);
        context.strokeStyle='rgba(179,206,255,.26)';
        context.lineWidth=.8;context.stroke();
      }
      context.beginPath();
      let streamOpen=false;
      for(let i=0;i<70;i++){
        const u=i/69;
        const point=project(u,phase*1.5+u*circle*1.85);
        if(point.depth>=.8){streamOpen=false;continue;}
        if(streamOpen)context.lineTo(point.x,point.y);
        else context.moveTo(point.x,point.y);
        streamOpen=true;
      }
      context.shadowColor='#60dff4';context.shadowBlur=13;
      context.strokeStyle='rgba(128,233,253,.75)';context.lineWidth=1.6;context.stroke();context.shadowBlur=0;
      for(let i=0;i<18;i++){
        const u=(i/18+phase*.085)%1;
        const point=project(u,i*2.399+phase*1.5+u*8);
        if(point.depth>.5)continue;
        const r=i%5===0?2.2:1.3;
        context.beginPath();context.arc(point.x,point.y,r,0,circle);
        context.fillStyle=i%3===0?'#dcbbff':'#8aecff';
        context.shadowColor='#8eeeff';context.shadowBlur=8;context.fill();
      }
      context.shadowBlur=0;
      stage.classList.add('canvas-ready');
    }
    function frame(time) {
      raf=0;
      if(motionOff() || document.hidden || !visible) return;
      if(time-lastFrame>=1000/(width<480?20:28)) {
        const delta=Math.min(50,time-lastFrame || 33);
        lastFrame=time;
        angle+=delta*.00012;
        phase+=delta*.00055;
        draw();
      }
      raf=requestAnimationFrame(frame);
    }
    function sync() {
      if(raf)cancelAnimationFrame(raf);
      raf=0;lastFrame=0;
      draw();
      if(!motionOff()&&!document.hidden&&visible)raf=requestAnimationFrame(frame);
    }
    function resize() {
      const bounds=stage.getBoundingClientRect();
      width=bounds.width;height=bounds.height;
      const ratio=Math.min(window.devicePixelRatio||1,1.5);
      canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
      context.setTransform(ratio,0,0,ratio,0,0);
      draw();
    }
    updateFlowMotion=sync;
    stage.addEventListener('pointermove',event=>{
      if(motionOff()||!finePointer.matches)return;
      const bounds=stage.getBoundingClientRect();
      pointerX=(event.clientX-bounds.left)/bounds.width-.5;
      pointerY=(event.clientY-bounds.top)/bounds.height-.5;
    },{passive:true});
    stage.addEventListener('pointerleave',()=>{pointerX=0;pointerY=0;});
    document.addEventListener('visibilitychange',sync);
    if('ResizeObserver' in window)new ResizeObserver(resize).observe(stage);
    else window.addEventListener('resize',resize,{passive:true});
    if('IntersectionObserver' in window)new IntersectionObserver(entries=>{
      visible=entries[0].isIntersecting;sync();
    },{rootMargin:'60px'}).observe(stage);
    resize();sync();
  })();
  motionQuery.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('tab-hidden', document.hidden));

  // Keep content visible if JavaScript or IntersectionObserver is unavailable.
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -18px 0px' });
    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
    root.classList.add('js');

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.desktop-nav a').forEach(link => {
          const current = link.hash === '#' + entry.target.id;
          link.classList.toggle('active', current);
          if (current) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-18% 0px -60% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

    const processObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('in-view', entry.isIntersecting));
    }, { rootMargin: '-15% 0px -25% 0px', threshold: 0.35 });
    document.querySelectorAll('.process-step').forEach(step => processObserver.observe(step));

    const contactBar = document.querySelector('.mobile-contact-bar');
    const visibleBottomSections = new Set();
    const contactObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visibleBottomSections.add(entry.target);
        else visibleBottomSections.delete(entry.target);
      });
      const hidden = visibleBottomSections.size > 0;
      contactBar.classList.toggle('is-hidden', hidden);
      contactBar.inert = hidden;
      contactBar.setAttribute('aria-hidden', String(hidden));
    }, { threshold: 0 });
    const contactSection = document.querySelector('#contact');
    if (contactSection) contactObserver.observe(contactSection);
    contactObserver.observe(document.querySelector('.site-footer'));
  }

  const progress = document.querySelector('.scroll-progress');
  let scrollScheduled = false;
  function updateProgress() {
    const range = root.scrollHeight - window.innerHeight;
    const value = range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) : 0;
    progress.style.transform = `scaleX(${value})`;
    scrollScheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-menu');
  function closeMenu(returnFocus = false) {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!menu.hidden && !event.target.closest('.site-header')) closeMenu();
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 860) closeMenu(); }, { passive: true });

  // The native cursor remains visible; hover motion is optional and bounded.
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (motionOff() || !finePointer.matches || event.pointerType === 'touch') return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 7}deg) rotate(3deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
  document.querySelectorAll('.magnetic').forEach(button => {
    button.addEventListener('pointermove', event => {
      if (motionOff() || !finePointer.matches || event.pointerType === 'touch') return;
      const rect = button.getBoundingClientRect();
      const x = Math.max(-5, Math.min(5, (event.clientX - rect.left - rect.width / 2) * .05));
      const y = Math.max(-4, Math.min(4, (event.clientY - rect.top - rect.height / 2) * .1));
      button.style.transform = `translate(${x}px,${y}px)`;
    });
    button.addEventListener('pointerleave', () => { button.style.transform = ''; });
  });

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
      submitLabel.textContent = 'Let’s make it happen';
      form.removeAttribute('aria-busy');
      status.focus({ preventScroll: true });
      status.scrollIntoView({ behavior: motionOff() ? 'auto' : 'smooth', block: 'nearest' });
    }
  });

  document.querySelector('#year').textContent = String(new Date().getFullYear());
})();
