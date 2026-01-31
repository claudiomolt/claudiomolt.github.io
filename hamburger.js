// Hamburger menu for mobile
document.addEventListener('DOMContentLoaded', function() {
  var nav = document.querySelector('nav');
  if (!nav) return;

  // Wrap existing links
  var links = nav.querySelectorAll('a');
  var wrapper = document.createElement('div');
  wrapper.className = 'nav-links';
  links.forEach(function(a) { wrapper.appendChild(a); });

  // Create brand
  var brand = document.createElement('span');
  brand.className = 'nav-brand';
  brand.textContent = '⚡';

  // Create hamburger
  var btn = document.createElement('button');
  btn.className = 'hamburger';
  btn.setAttribute('aria-label', 'Menu');
  btn.innerHTML = '<span></span><span></span><span></span>';

  nav.appendChild(brand);
  nav.appendChild(btn);
  nav.appendChild(wrapper);

  btn.addEventListener('click', function() {
    btn.classList.toggle('active');
    wrapper.classList.toggle('open');
  });

  // Close on link click
  wrapper.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      btn.classList.remove('active');
      wrapper.classList.remove('open');
    });
  });
});
