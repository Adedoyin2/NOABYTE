// Mobile menu toggle
const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobileMenu');
const mobileClose=document.getElementById('mobileClose');
hamburger.onclick=()=>mobileMenu.classList.add('open');
mobileClose.onclick=()=>mobileMenu.classList.remove('open');

// Hero auto scroll horizontally
const heroSlides=document.getElementById('heroSlides');
let currentSlide=0;
const totalSlides=heroSlides.children.length;
setInterval(()=>{
  if (currentSlide < totalSlides -1) { currentSlide++}
  heroSlides.scrollTo({
    left:currentSlide*window.innerWidth,
    behavior:'smooth'
  });
},1200000);
 // small helper
 const $ = (sel) => document.querySelector(sel);

 // set year
//  document.getElementById('yr').textContent = new Date().getFullYear();

 /* ---------------------
    Typing effect for hero small taglines
    --------------------- */
 (function typingEffect(){
   const el = document.getElementById('typed-1');
   if(!el) return;
   const phrases = [
     "Building strong partnerships and success stories",
     "Designing products that users love",
     "Training the next generation of builders"
   ];
   let p = 0, idx = 0, forward = true;
   const step = () => {
     const full = phrases[p];
     if(forward) {
       el.textContent = full.slice(0, ++idx);
       if(idx === full.length) { forward=false; setTimeout(step,1200); return; }
     } else {
       el.textContent = full.slice(0, --idx);
       if(idx === 0) { forward=true; p = (p+1) % phrases.length; }
     }
     setTimeout(step, forward ? 40 : 24);
   };
   step();
 })();


 (function typingEffect(){
  const el = document.getElementById('typed-2');
  if(!el) return;
  const phrases = [
    "Training the next generation of builders",
    "A space where innovation thrives",
    "Training the next generation of builders",
  ];
  let p = 0, idx = 0, forward = true;
  const step = () => {
    const full = phrases[p];
    if(forward) {
      el.textContent = full.slice(0, ++idx);
      if(idx === full.length) { forward=false; setTimeout(step,1200); return; }
    } else {
      el.textContent = full.slice(0, --idx);
      if(idx === 0) { forward=true; p = (p+1) % phrases.length; }
    }
    setTimeout(step, forward ? 40 : 24);
  };
  step();
})();
 /* ---------------------
    Hero slides auto-scroll + manual
    - scrollSnap with interval; pause on user interaction
    --------------------- */
 (function heroAutoScroll(){
   const slidesEl = document.getElementById('heroSlides');
   if(!slidesEl) return;
   const slides = Array.from(slidesEl.querySelectorAll('.slide'));
   let current = 0;
   let interval = null;
   const delay = 1200000; // 10s per slide

   function goTo(index, smooth=true){
     if(index < 0) index = 0;
     if(index >= slides.length) index = slides.length-1;
     current = index;
     slides[index].scrollIntoView({behavior:smooth ? 'smooth' : 'auto'});
   }
   function start(){
     stop();
     interval = setInterval(()=> {
       const next = (current + 1) % slides.length;
       goTo(next, true);
     }, delay);
   }
   function stop(){ if(interval) { clearInterval(interval); interval = null; } }

   // start auto scroll
  //  start();

   // pause when user scrolls or touches
   let userInteracted = false;
   let interactionTimer;
   function onUser(){
     userInteracted = true;
     stop();
     clearTimeout(interactionTimer);
     interactionTimer = setTimeout(()=>{
       userInteracted = false;
       start();
     }, 1200000); // resume after 5s of inactivity
   }
   slidesEl.addEventListener('wheel', onUser, {passive:true});
   slidesEl.addEventListener('touchstart', onUser, {passive:true});
   slidesEl.addEventListener('mousedown', onUser, {passive:true});
   slidesEl.addEventListener('scroll', ()=>{
     // update current index based on scroll position
     const idx = slides.findIndex(s => {
       const rect = s.getBoundingClientRect();
       // find slide nearest to top of view
       return Math.abs(rect.top) < window.innerHeight/2;
     });
     if(idx >=0) current = idx;
   });

   // expose goTo for nav anchors if needed
   window.heroGoTo = goTo;
 })();

 /* ---------------------
    Scroll reveal for elements (fade-up)
    --------------------- */
 (function revealOnScroll(){
   const items = document.querySelectorAll('.fade-up');
   const obs = new IntersectionObserver((entries) => {
     entries.forEach(e => {
       if(e.isIntersecting){
         e.target.classList.add('in-view');
         // animate skill bars when skills section enters
         if(e.target.id === 'skills') animateSkills();
         obs.unobserve(e.target);
       }
     });
   }, { threshold: 0.18 });
   items.forEach(i => obs.observe(i));
 })();

 /* ---------------------
    Skills animation: fill bars to their data-val
    --------------------- */
 function animateSkills(){
   document.querySelectorAll('.progress > i').forEach(i=>{
     const val = Number(i.getAttribute('data-val')) || 0;
     setTimeout(()=> i.style.width = val + '%', 120);
   });
 }

 /* ---------------------
    Mobile drawer / hamburger
    --------------------- */
 (function mobileDrawer(){
   const ham = document.getElementById('hamburger');
   const drawer = document.createElement('aside');
   drawer.style.cssText = "position:fixed;top:0;right:-100%;width:320px;max-width:92%;height:100vh;background:var(--bg);box-shadow:-30px 0 50px rgba(8,20,30,0.12);z-index:2000;padding:18px;display:flex;flex-direction:column;gap:12px;transition:right 360ms cubic-bezier(.2,.9,.25,1)";
   drawer.innerHTML = `
     <div style="display:flex;align-items:center;justify-content:space-between">
       <div style="display:flex;align-items:center;gap:8px"><div style="font-weight:900;color:var(--primary)">NOABYTE</div></div>
       <div id="closeDrawer" style="font-size:20px;cursor:pointer">&#10005;</div>
     </div>
     <div style="display:flex;gap:10px;align-items:center">
       <a href="#" style="color:var(--muted)"><i class="fab fa-facebook-f"></i></a>
       <a href="#" style="color:var(--muted)"><i class="fab fa-twitter"></i></a>
       <a href="#" style="color:var(--muted)"><i class="fab fa-linkedin-in"></i></a>
     </div>
     <nav style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
       <a href="#home" class="drawer-link">Home</a>
       <a href="#about" class="drawer-link">About Us</a>
       <a href="#services" class="drawer-link">Services</a>
       <a href="#portfolio" class="drawer-link">Portfolio</a>
       <a href="#skills" class="drawer-link">Our Skills</a>
       <a href="#testimonial" class="drawer-link">Testimonial</a>
       <a href="#contact" class="drawer-link">Contact Us</a>
     </nav>
     <div style="margin-top:auto">
       <div style="font-weight:700;color:var(--primary);margin-bottom:8px">Contact</div>
       <div class="muted" style="font-size:14px">08039819143 • 09044211688</div>
       <div style="margin-top:8px"><a href="mailto:noabytetech@gmail.com" class="btn" style="display:inline-block">Email</a></div>
     </div>
   `;
   document.body.appendChild(drawer);
   ham.addEventListener('click', ()=> drawer.style.right = '0');
   drawer.querySelector('#closeDrawer').addEventListener('click', ()=> drawer.style.right = '-100%');
   // close when clicking a link
   drawer.querySelectorAll('.drawer-link').forEach(a=>{
     a.addEventListener('click', (e)=>{
       e.preventDefault();
       const href = a.getAttribute('href');
       drawer.style.right = '-100%';
       if(href && href.startsWith('#')) {
         const el = document.querySelector(href);
         if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
       }
     });
   });
 })();

 /* ---------------------
    Portfolio lightbox quick view (simple)
    --------------------- */
 (function portfolioLightbox(){
   document.querySelectorAll('.portfolio-item').forEach(it => {
     it.style.cursor = 'pointer';
     it.addEventListener('click', ()=>{
       const img = it.querySelector('img').src;
       const modal = document.createElement('div');
       modal.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);z-index:2500';
       modal.innerHTML = `<div style="max-width:92%;max-height:92%;"><img src="${img}" style="width:100%;height:auto;border-radius:8px;display:block"/></div>`;
       modal.addEventListener('click', ()=> modal.remove());
       document.body.appendChild(modal);
     });
   });
 })();

 /* ---------------------
    Testimonial auto slider
    --------------------- */
 (function testimonialSlider(){
   const wrap = document.getElementById('testiItems');
   if(!wrap) return;
   let pos = 0;
   const cards = wrap.children.length;
   setInterval(()=>{
     pos = (pos + 1) % cards;
     wrap.style.transform = `translateX(-${pos * (wrap.children[0].offsetWidth + 14)}px)`;
   }, 5200);
   // responsive adjustment on resize: reset transform
   window.addEventListener('resize', ()=> { wrap.style.transform = 'translateX(0)'; pos = 0; });
 })();

 /* ---------------------
    Contact form handler (demo)
    --------------------- */
 (function contactForm(){
   const form = document.getElementById('contactForm');
   if(!form) return;
   form.addEventListener('submit', (e)=>{
     e.preventDefault();
     // quick validation
     const name = form.name.value.trim(), email = form.email.value.trim(), msg = form.message.value.trim();
     if(!name || !email || !msg) {
       alert('Please complete all fields.');
       return;
     }
     // simulate submission
     alert('Thanks ' + name + '! Your message has been sent. We will contact you shortly at ' + email + '.');
     form.reset();
   });
 })();

 /* ---------------------
    Small: scroll to anchor smoothly when clicking top nav
    --------------------- */
 document.querySelectorAll('a[href^="#"]').forEach(a=>{
   a.addEventListener('click', function(e){
     const href = this.getAttribute('href');
     if(href.length>1){
       e.preventDefault();
       const el = document.querySelector(href);
       if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
     }
   });
 });

 /* ---------------------
    Accessibility: allow Esc to close video full-screen interactions / drawers
    --------------------- */
 document.addEventListener('keydown', (e) => {
   if(e.key === 'Escape'){
     // close any open drawer if present
     document.querySelectorAll('aside[style]').forEach(as => { if(as.style.right === '0px') as.style.right = '-100%'; });
   }
 });

 /* ---------------------
    On first load: reveal fade-up elements that are in view (for non-intersection supported)
    --------------------- */
 window.addEventListener('load', ()=> {
   document.querySelectorAll('.fade-up').forEach(el=>{
     const rect = el.getBoundingClientRect();
     if(rect.top < window.innerHeight - 120) el.classList.add('in-view');
   });
   // start skill default fill if in-view
   if(document.querySelector('#skills').getBoundingClientRect().top < window.innerHeight) animateSkills();
 });

 /* ---------------------
    Notes for you:
    - Replace video source in slide 1 with your preferred MP4 if needed (ensure CORS/hosting)
    - Replace portfolio images with real project images
    - This page is client-side only; for form submissions connect to your backend or email service
    --------------------- */