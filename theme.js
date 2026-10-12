// SafeVault Theme Manager
(function() {
  const STORAGE_KEY = 'safevault-theme';

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'dark';
  }

  function setTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  }

  function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === 'light') {
      html.classList.remove('dark');
      html.classList.add('light');
      html.setAttribute('data-theme', 'light');
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
      html.setAttribute('data-theme', 'dark');
    }
    // Update all theme toggles on the page
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      updateToggleUI(btn, theme);
    });
  }

  function updateToggleUI(toggleEl, theme) {
    const thumb = toggleEl.querySelector('.toggle-thumb');
    const moonLabel = toggleEl.closest('[data-theme-row]')?.querySelector('[data-theme-moon]');
    const sunLabel = toggleEl.closest('[data-theme-row]')?.querySelector('[data-theme-sun]');
    if (theme === 'light') {
      if (thumb) { thumb.style.transform = 'translateX(2rem)'; }
      if (moonLabel) moonLabel.classList.remove('text-neutral-300', 'text-slate-700'); moonLabel?.classList.add('text-slate-400');
      if (sunLabel) sunLabel?.classList.add('font-semibold');
    } else {
      if (thumb) { thumb.style.transform = 'translateX(0.125rem)'; }
    }
  }

  function toggleTheme() {
    const current = getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Expose globally
  window.SafeVaultTheme = { get: getTheme, set: setTheme, toggle: toggleTheme, apply: applyTheme };

  // Auto-apply on load
  document.addEventListener('DOMContentLoaded', function() {
    applyTheme(getTheme());
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });
  });

  // Apply immediately (before DOMContentLoaded) to prevent flash
  applyTheme(getTheme());
})();
