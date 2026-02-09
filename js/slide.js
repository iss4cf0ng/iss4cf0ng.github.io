function initSlide() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const titles = document.querySelectorAll('.slide-title');
  if (!slides.length) return;

  let index = 0;

  function show(i) {
    slides.forEach(s => s.classList.remove('active'));
    if (dots.length) dots.forEach(d => d.classList.remove('active'));
    if (titles.length) titles.forEach(t => t.style.display = 'none');

    slides[i].classList.add('active');
    if (dots[i]) dots[i].classList.add('active');
    if (titles[i]) titles[i].style.display = 'block';
  }

  show(index);

  if (dots.length > 0) {
    dots.forEach((d, i) => {
      d.onclick = () => {
        index = i;
        show(index);
      };
    });
  }

  setInterval(() => {
    index = (index + 1) % slides.length;
    show(index);
  }, 5000);
}

document.addEventListener('DOMContentLoaded', initSlide);
document.addEventListener('pjax:complete', initSlide);
