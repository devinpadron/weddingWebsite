// Shared page shell for every wedding-site page (landing, schedule, travel).
// Wraps content in Nav + Footer + watermark + RSVP modal, applies the palette,
// and runs the global scroll-reveal observer. Components (Nav, Footer, etc.)
// come from sections.jsx / sections2.jsx, loaded before this file.

const { useState: usePageState, useEffect: usePageEffect, useCallback: usePageCallback, createContext, useContext } = React;

const PALETTES = {
  parchment: {
    '--parchment': '#F5F0E8',
    '--parchment-deep': '#ECE5D6',
    '--espresso': '#2C2A25',
    '--travertine': '#B8A98C',
    '--umber': '#7A6E5A',
    '--gold': '#C8B89A',
  },
  // Cooler, slightly greener — olive grove at dusk
  olive: {
    '--parchment': '#EFEBE0',
    '--parchment-deep': '#E3DDCB',
    '--espresso': '#2A2E26',
    '--travertine': '#A8AC8C',
    '--umber': '#6F7560',
    '--gold': '#BFC29A',
  },
  // Warmer, terracotta-tinged — late afternoon sun on stone
  terracotta: {
    '--parchment': '#F3EAE0',
    '--parchment-deep': '#E8D9C6',
    '--espresso': '#2E2520',
    '--travertine': '#C0997C',
    '--umber': '#8C6E5A',
    '--gold': '#D4B698',
  },
};

function applyPalette(name) {
  const p = PALETTES[name] || PALETTES.parchment;
  const root = document.documentElement;
  Object.entries(p).forEach(([k, v]) => root.style.setProperty(k, v));
}

// Lets any descendant (e.g. the landing link cards) open the RSVP modal.
const RSVPContext = createContext(() => {});
function useRSVP() { return useContext(RSVPContext); }

// Wraps a page's content. `solidNav` = true for hero-less pages (parchment top),
// false on the landing where the nav overlays the hero photo.
function WeddingPage({ children, solidNav = false }) {
  const t = window.__TWEAKS__ || {};
  const [rsvpOpen, setRsvpOpen] = usePageState(false);
  const openRSVP = usePageCallback(() => setRsvpOpen(true), []);

  usePageEffect(() => { applyPalette(t.palette); }, [t.palette]);

  // Open the RSVP modal automatically when linked with ?rsvp=1 or #rsvp
  // (used by static pages like /faq/ that can't open the modal themselves).
  usePageEffect(() => {
    try {
      const wants = new URLSearchParams(window.location.search).get('rsvp') === '1'
        || window.location.hash === '#rsvp';
      if (wants) setRsvpOpen(true);
    } catch (e) {}
  }, []);

  // Global scroll-reveal observer — catches every `.reveal` on the page.
  usePageEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const observe = () => document.querySelectorAll('.reveal:not(.in)').forEach((n) => io.observe(n));
    observe();
    const id = requestAnimationFrame(observe);
    // Reveal anything already in the initial viewport immediately.
    requestAnimationFrame(() => {
      document.querySelectorAll('.reveal').forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) n.classList.add('in');
      });
    });
    return () => { cancelAnimationFrame(id); io.disconnect(); };
  }, []);

  return (
    <RSVPContext.Provider value={openRSVP}>
      <Nav monogram={t.monogram} onRSVP={openRSVP} solid={solidNav} />
      <main>{children}</main>
      <Footer monogram={t.monogram} />
      <MonogramWatermark show={t.showWatermark} monogram={t.monogram} />
      <RSVPModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </RSVPContext.Provider>
  );
}

Object.assign(window, { WeddingPage, useRSVP, applyPalette, PALETTES });
