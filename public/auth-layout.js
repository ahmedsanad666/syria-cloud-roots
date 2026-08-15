/* === Sham Cloud — AuthLayout component ===
 * Usage:
 *   <section class="auth-shell" data-auth-layout
 *            data-eyebrow="Welcome back"
 *            data-heading="Login"
 *            data-subtitle="Short supporting line.">
 *     <div class="auth-main">
 *       <div class="auth-card"> ...your form... </div>
 *     </div>
 *   </section>
 *   <script src="/auth-layout.js"></script>
 *
 * The illustrated left panel (gradient, orbs, floating service badges,
 * network lines, logo + heading + subtitle) is generated here so both the
 * Login and Register pages share one source of truth.
 */
(function () {
  var ICONS = {
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="#3B8BEB" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.1 11.2A3.9 3.9 0 0 0 6.5 19h11z"/></svg>',
    server: '<svg viewBox="0 0 24 24" fill="none" stroke="#F07030" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M11 6.5h4M11 17.5h4"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="#22C87A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z"/><path d="M9.2 12.2l2 2 3.6-3.8"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="#7C5CFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5.5" rx="7" ry="3"/><path d="M5 5.5v13c0 1.7 3.1 3 7 3s7-1.3 7-3v-13"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></svg>',
  };

  function badge(cls, icon, label) {
    return (
      '<div class="auth-badge ' + cls + '" role="img" aria-label="' + label + '">' + ICONS[icon] + '</div>'
    );
  }

  function build(el) {
    var eyebrow = el.getAttribute('data-eyebrow') || '';
    var heading = el.getAttribute('data-heading') || '';
    var subtitle = el.getAttribute('data-subtitle') || '';
    var home = el.getAttribute('data-home') || '/home.html';

    var aside = document.createElement('aside');
    aside.className = 'auth-aside';
    aside.innerHTML =
      '<span class="auth-orb auth-orb-1"></span>' +
      '<span class="auth-orb auth-orb-2"></span>' +
      '<span class="auth-orb auth-orb-3"></span>' +
      '<div class="auth-art" aria-hidden="true">' +
        '<svg class="auth-net" viewBox="0 0 100 100" preserveAspectRatio="none">' +
          '<path d="M18 20 C40 26, 55 14, 82 28" />' +
          '<path d="M30 50 C46 44, 62 62, 78 58" />' +
          '<circle cx="18" cy="20" /><circle cx="82" cy="28" /><circle cx="30" cy="50" /><circle cx="78" cy="58" />' +
        '</svg>' +
        badge('b1', 'cloud', 'Cloud') +
        badge('b2', 'server', 'Dedicated servers') +
        badge('b3', 'shield', 'Security') +
        badge('b4', 'database', 'Backup') +
      '</div>' +
      '<div class="auth-aside-top">' +
        '<a href="' + home + '" class="brand">' +
          '<svg class="brand-icon" viewBox="0 0 40 40" fill="none">' +
            '<path d="M12 20c0-4 3-7 7-7s7 3 7 7-3 7-7 7" stroke="#F07030" stroke-width="3" stroke-linecap="round"/>' +
            '<path d="M28 20c0-4-3-7-7-7s-7 3-7 7 3 7 7 7" stroke="#3B8BEB" stroke-width="3" stroke-linecap="round"/>' +
          '</svg> Sham Cloud' +
        '</a>' +
      '</div>' +
      '<div class="auth-aside-body">' +
        (eyebrow ? '<span class="auth-eyebrow">' + eyebrow + '</span>' : '') +
        (heading ? '<h1>' + heading + '</h1>' : '') +
        (subtitle ? '<p>' + subtitle + '</p>' : '') +
      '</div>';

    el.insertBefore(aside, el.firstChild);
  }

  function init() {
    document.querySelectorAll('[data-auth-layout]').forEach(build);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
