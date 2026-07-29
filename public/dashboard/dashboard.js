// === Sham Cloud — Dashboard shell behaviors ===
(function(){
  // Mobile drawer
  const side = document.querySelector('.side');
  const openBtn = document.querySelector('.drawer-btn');
  const backdrop = document.querySelector('.backdrop');
  function toggleDrawer(open){
    if(!side) return;
    const isOpen = open ?? !side.classList.contains('open');
    side.classList.toggle('open', isOpen);
    backdrop?.classList.toggle('open', isOpen);
  }
  openBtn?.addEventListener('click', () => toggleDrawer());
  backdrop?.addEventListener('click', () => toggleDrawer(false));

  // Avatar dropdown
  const avatarBtn = document.querySelector('.avatar-btn');
  const dropdown = document.querySelector('.avatar-dropdown');
  avatarBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown?.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if(dropdown && !dropdown.contains(e.target) && e.target !== avatarBtn){
      dropdown.classList.remove('open');
    }
  });

  // Language toggle
  const langBtn = document.querySelector('.top-lang');
  langBtn?.addEventListener('click', () => {
    langBtn.textContent = langBtn.textContent.trim() === 'EN' ? 'AR' : 'EN';
  });
})();
