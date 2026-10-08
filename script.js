const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

const glow = $('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

const progress = $('.progress');
const topBtn = $('.top');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (scrollY / max * 100) + '%';
  topBtn.classList.toggle('show', scrollY > 500);
  const links = $$('.nav nav a');
  const sections = $$('main section[id]');
  let current = '';
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 180) current = sec.id;
  });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}, {passive:true});

topBtn.addEventListener('click', () => scrollTo({top:0, behavior:'smooth'}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));

$('.menu').addEventListener('click', () => $('.nav nav').classList.toggle('open'));
$$('.nav nav a').forEach(a => a.addEventListener('click', () => $('.nav nav').classList.remove('open')));

document.addEventListener('mousemove', e => {
  $$('.portrait-card, .experience-card, .glass').forEach(card => {
    const r = card.getBoundingClientRect();
    if (r.width && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      card.style.transform = `perspective(900px) rotateX(${y*-2}deg) rotateY(${x*2}deg)`;
    } else if (!card.matches(':hover')) card.style.transform = '';
  });
});

document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const el = document.querySelector(a.getAttribute('href'));
  if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
}));
