// Navbar Component - Auto-inject and highlight active page
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
    
    const nav = document.createElement('nav');
    
    navItems.forEach(item => {
      const a = document.createElement('a');
      a.href = basePath + item.href;
      a.textContent = item.label;
      
      // Mark active page
      if (currentPage === item.href || 
          (currentPage === '' && item.href === 'index.html') ||
          (item.href === 'index.html' && (currentPage === '/' || currentPage === ''))) {
        a.classList.add('active');
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
