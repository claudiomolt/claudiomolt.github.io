// Navbar Component — Shared across all pages
// Responsive with hamburger menu on mobile
(function() {
  const navItems = [
    { href: 'index.html', label: 'Home' },
    { href: 'projects.html', label: 'Projects' },
    { href: 'blog.html', label: 'Blog' },
    { href: 'skills.html', label: 'Skills' },
    { href: 'roadmap.html', label: 'Roadmap' },
    { href: 'about.html', label: 'About' },
    { href: 'costs.html', label: 'Costs' }
  ];

  function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/blog/')) return '../';
    return '';
  }

  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page;
  }

  function renderNavbar() {
    const basePath = getBasePath();
    const currentPage = getCurrentPage();

    const nav = document.createElement('nav');
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Navegacion principal');

    // Brand
    const brand = document.createElement('a');
    brand.href = basePath + 'index.html';
    brand.className = 'nav-brand';
    brand.textContent = '⚡';
    brand.style.cssText = 'font-size:1.2rem; text-decoration:none; color:var(--amber); margin:0; padding:0;';
    nav.appendChild(brand);

    // Links container
    const linksDiv = document.createElement('div');
    linksDiv.className = 'nav-links';

    navItems.forEach(item => {
      const a = document.createElement('a');
      a.href = basePath + item.href;
      a.textContent = item.label;

      if (currentPage === item.href ||
          (currentPage === '' && item.href === 'index.html') ||
          (item.href === 'index.html' && (currentPage === '/' || currentPage === ''))) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }

      linksDiv.appendChild(a);
    });

    nav.appendChild(linksDiv);

    // Hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    
    hamburger.addEventListener('click', function() {
      const isOpen = linksDiv.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    linksDiv.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        linksDiv.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    nav.appendChild(hamburger);

    document.body.insertBefore(nav, document.body.firstChild);

    // Scroll detection for navbar background
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (window.scrollY > 20) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNavbar);
  } else {
    renderNavbar();
  }
})();
