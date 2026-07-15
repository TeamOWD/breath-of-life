/* Mobile hamburger + off-canvas drawer
   Builds the drawer DOM from the existing .nav markup so each page
   only needs to include this script. */

(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;

  var navInner = nav.querySelector('.nav-inner');
  var navLinks = nav.querySelector('.nav-links');
  var navCta = nav.querySelector('.nav-cta');
  var brand = nav.querySelector('.brand');
  if (!navInner || !navLinks || !navCta) return;

  // Avoid double-init
  if (document.querySelector('.nav-toggle')) return;

  // Hamburger button
  var toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'nav-drawer');
  toggle.innerHTML = '<span></span><span></span><span></span>';
  navCta.appendChild(toggle);

  // Drawer scaffolding
  var drawer = document.createElement('div');
  drawer.className = 'nav-drawer';
  drawer.id = 'nav-drawer';
  drawer.setAttribute('aria-hidden', 'true');

  var backdrop = document.createElement('div');
  backdrop.className = 'nav-drawer-backdrop';

  var panel = document.createElement('aside');
  panel.className = 'nav-drawer-panel';

  // Top row: brand + close
  var topRow = document.createElement('div');
  topRow.className = 'nav-drawer-top';

  if (brand) {
    var brandClone = brand.cloneNode(true);
    topRow.appendChild(brandClone);
  }

  var closeBtn = document.createElement('button');
  closeBtn.className = 'nav-drawer-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close menu');
  closeBtn.innerHTML = '&times;';
  topRow.appendChild(closeBtn);

  panel.appendChild(topRow);

  // Nav links cloned
  var drawerNav = document.createElement('nav');
  drawerNav.setAttribute('aria-label', 'Main navigation');
  drawerNav.appendChild(navLinks.cloneNode(true));
  panel.appendChild(drawerNav);

  // CTA cloned
  var ctaBtn = navCta.querySelector('a.btn');
  if (ctaBtn) {
    var ctaWrap = document.createElement('div');
    ctaWrap.className = 'nav-drawer-cta';
    ctaWrap.appendChild(ctaBtn.cloneNode(true));
    panel.appendChild(ctaWrap);
  }

  drawer.appendChild(backdrop);
  drawer.appendChild(panel);
  document.body.appendChild(drawer);

  // Open / close
  function openDrawer() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Close when a link inside the drawer is clicked
  drawer.addEventListener('click', function (e) {
    var target = e.target;
    if (target && target.tagName === 'A') closeDrawer();
  });

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });

  // Close if viewport grows beyond mobile breakpoint
  var mq = window.matchMedia('(min-width: 861px)');
  function handleMq(e) { if (e.matches && drawer.classList.contains('open')) closeDrawer(); }
  if (mq.addEventListener) mq.addEventListener('change', handleMq);
  else if (mq.addListener) mq.addListener(handleMq);
})();
