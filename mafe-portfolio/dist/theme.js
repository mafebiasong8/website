(() => {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let saved;
  try { saved = localStorage.getItem('mafe-theme'); } catch {}
  let explicit = saved === 'dark' || saved === 'light';
  const apply = (theme) => {
    root.dataset.theme = theme;
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    const dark = theme === 'dark';
    button.hidden = false;
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', 'Dark mode');
    button.querySelector('.theme-label').textContent = dark ? 'Light mode' : 'Dark mode';
    button.querySelector('.theme-symbol').textContent = dark ? '☀' : '◐';
    button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  };
  apply(explicit ? saved : media.matches ? 'dark' : 'light');
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.querySelector('.theme-toggle').addEventListener('click', () => {
      const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      explicit = true;
      apply(theme);
      try { localStorage.setItem('mafe-theme', theme); } catch {}
    });
  });
  media.addEventListener('change', (event) => {
    if (!explicit) apply(event.matches ? 'dark' : 'light');
  });
})();
