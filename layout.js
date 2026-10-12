// SafeVault — Layout helper
// Injects the sidebar + topbar into any page

(function() {
  // Detect which page is active based on filename
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const pageMap = {
    'index.html':    0,
    'documents.html':1,
    'deposer.html':  2,
    'partager.html': 3,
    'parametres.html':4,
  };
  const activePage = pageMap[path] ?? 0;

  const navItems = [
    { label: 'Accueil',          href: 'index.html',      icon: 'home' },
    { label: 'Mes documents',    href: 'documents.html',   icon: 'folder' },
    { label: 'Déposer un fichier', href: 'deposer.html',  icon: 'upload' },
    { label: 'Partager',         href: 'partager.html',    icon: 'share' },
    { label: 'Paramètres',       href: 'parametres.html',  icon: 'settings' },
  ];

  const icons = {
    home: `<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`,
    folder: `<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>`,
    upload: `<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>`,
    share: `<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>`,
    settings: `<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    shield: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2l7 3.5v5.5c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V5.5L12 2z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9.5 12a2.5 2.5 0 015 0v1.5H9.5V12z"/></svg>`,
    chevdown: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`,
  };

  function buildSidebar() {
    const hasDivider = activePage === 4;
    const navHTML = navItems.map((item, i) => {
      const isActive = i === activePage;
      const divider = (i === 4) ? `<div class="pt-2 mt-2 border-t sv-divider"></div>` : '';
      return `${divider}
      <a href="${item.href}" class="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${isActive ? 'sv-nav-active font-semibold' : 'sv-nav-item'}" ${isActive ? 'aria-current="page"' : ''}>
        ${icons[item.icon]}
        <span>${item.label}</span>
      </a>`;
    }).join('');

    return `
    <aside class="sv-sidebar w-64 lg:w-72 flex flex-col shrink-0 sticky top-0 h-screen z-20 select-none">
      <!-- Logo -->
      <div class="h-20 flex items-center px-6 border-b sv-divider gap-3">
        <div class="w-9 h-9 rounded-xl sv-icon flex items-center justify-center sv-text-primary shrink-0">
          ${icons.shield}
        </div>
        <div>
          <span class="text-base font-bold tracking-tight sv-text-primary block leading-tight">SafeVault</span>
          <span class="text-[10px] uppercase tracking-wider sv-text-muted font-medium">Cloud Sécurisé</span>
        </div>
      </div>
      <!-- Nav -->
      <nav class="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        ${navHTML}
      </nav>
    </aside>`;
  }

  function buildTopbar() {
    return `
    <header class="sv-header h-20 px-8 flex items-center justify-end shrink-0 sticky top-0 z-10">
      <div class="flex items-center gap-3 px-3 py-1.5 rounded-full sv-card cursor-pointer border border-[var(--border-default)] hover:border-[var(--border-strong)] transition-all" style="backdrop-filter: blur(20px);">
        <img class="h-8 w-8 rounded-full object-cover sv-avatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80" alt="Oswald Kds">
        <span class="text-sm font-medium sv-text-primary">Oswald Kds</span>
        ${icons.chevdown}
      </div>
    </header>`;
  }

  // Inject into #app-shell if exists
  document.addEventListener('DOMContentLoaded', function() {
    const shell = document.getElementById('app-shell');
    if (!shell) return;

    const sidebar = buildSidebar();
    const topbar  = buildTopbar();
    const content = document.getElementById('page-content');

    shell.innerHTML = `
      ${sidebar}
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        ${topbar}
        <main class="flex-1 overflow-y-auto p-8" id="page-main">
          ${content ? content.innerHTML : ''}
        </main>
      </div>`;
  });
})();
