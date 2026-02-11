// Navbar Component - Auto-inject and highlight active page
// Accessibility-enhanced with ARIA labels and semantic HTML
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
    // Check if we're in a subdirectory (like /blog/)
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
    
    // Create nav element with proper ARIA attributes
    const nav = document.createElement('nav');
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Navegación principal');
    
    navItems.forEach(item => {
      const a = document.createElement('a');
      a.href = basePath + item.href;
      a.textContent = item.label;
      
      // Mark active page with aria-current
      if (currentPage === item.href || 
          (currentPage === '' && item.href === 'index.html') ||
          (item.href === 'index.html' && (currentPage === '/' || currentPage === ''))) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
      
      nav.appendChild(a);
    });

    // Insert at the beginning of body
    document.body.insertBefore(nav, document.body.firstChild);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNavbar);
  } else {
    renderNavbar();
  }
})();
