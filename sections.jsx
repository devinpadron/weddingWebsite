// Wedding homepage — section components
// All components attached to window for cross-file use.

const { useState, useEffect, useRef, useCallback } = React;

/* ────────────────────────────────────────────────────────────────
   useReveal — IntersectionObserver hook for scroll-in animations
─────────────────────────────────────────────────────────────────*/
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold }
    );
    el.querySelectorAll('.reveal').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

/* ────────────────────────────────────────────────────────────────
   Monogram — flexible: "S & D", "SD", "S · D"
─────────────────────────────────────────────────────────────────*/
function Monogram({ style = 'S & D', size = 52, color = 'var(--espresso)' }) {
  return (
    <span
      className="serif"
      style={{
        fontSize: size,
        letterSpacing: style === 'DS' ? '0.18em' : '0.32em',
        color,
        display: 'inline-block',
        lineHeight: 1,
        fontWeight: 300,
        whiteSpace: 'nowrap',
      }}
    >
      {style}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────
   Nav — sticky, shrinks on scroll, opens drawer on mobile
─────────────────────────────────────────────────────────────────*/
function Nav({ monogram, onRSVP }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#schedule', label: 'Schedule' },
    { href: '#travel', label: 'Travel & Stay' },
    { href: '#registry', label: 'Registry' },
  ];

  const scrollTo = (href) => (e) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(245, 240, 232, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(140%) blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(140%) blur(14px)' : 'none',
        borderBottom: scrolled ? '0.5px solid var(--hairline)' : '0.5px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease, padding 0.4s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '14px 32px' : '22px 32px',
          transition: 'padding 0.4s ease',
        }}
      >
        <a
          href="#top"
          onClick={scrollTo('#top')}
          style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}
        >
          <Monogram
            style={monogram}
            size={scrolled ? 22 : 26}
            color={scrolled ? 'var(--espresso)' : 'var(--espresso)'}
          />
          <span
            className="micro"
            style={{
              display: scrolled ? 'none' : 'inline',
              color: 'var(--umber)',
            }}
          >
            01 · VI · 27
          </span>
        </a>

        {/* Desktop links */}
        <nav
          className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: 36 }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={scrollTo(l.href)}
              className="small-caps"
              style={{ color: 'var(--espresso)', opacity: 0.85 }}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onRSVP}
            className="small-caps"
            style={{
              background: 'var(--espresso)',
              color: 'var(--parchment)',
              border: 'none',
              padding: '10px 22px',
              letterSpacing: '0.28em',
            }}
          >
            RSVP
          </button>
        </nav>

        {/* Mobile burger */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="mobile-burger"
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            padding: 8,
          }}
        >
          <span style={{ display: 'block', width: 22, height: 0.5, background: 'var(--espresso)', marginBottom: 6 }}></span>
          <span style={{ display: 'block', width: 22, height: 0.5, background: 'var(--espresso)' }}></span>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'var(--parchment)',
            zIndex: 100, padding: '22px 22px',
            display: 'flex', flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Monogram style={monogram} size={26} />
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              style={{ background: 'transparent', border: 'none', fontSize: 24, color: 'var(--espresso)' }}
            >
              ×
            </button>
          </div>
          <nav style={{ marginTop: 60, display: 'flex', flexDirection: 'column', gap: 28 }}>
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={scrollTo(l.href)}
                className="serif"
                style={{ fontSize: 32, color: 'var(--espresso)' }}
              >
                <span className="micro" style={{ marginRight: 14 }}>{String(i + 1).padStart(2, '0')}</span>
                {l.label}
              </a>
            ))}
            <button
              onClick={() => { setOpen(false); onRSVP(); }}
              className="small-caps"
              style={{
                marginTop: 24,
                background: 'var(--espresso)',
                color: 'var(--parchment)',
                border: 'none',
                padding: '16px 22px',
                letterSpacing: '0.28em',
                alignSelf: 'stretch',
              }}
            >
              RSVP
            </button>
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 840px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: block !important; }
        }
      `}</style>
    </header>
  );
}

/* ────────────────────────────────────────────────────────────────
   Hero — full-bleed image-slot with parallax + overlay
─────────────────────────────────────────────────────────────────*/
function Hero({ monogram, heroCrop, italicAccents }) {
  const imgRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const el = imgRef.current;
      if (!el) return;
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(1.08)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heights = {
    tall: '100vh',
    standard: '78vh',
    wide: '64vh',
  };
  const heightVal = heights[heroCrop] || '100vh';

  return (
    <section id="top" style={{ position: 'relative', height: heightVal, minHeight: 560, overflow: 'hidden' }}>
      <div
        ref={imgRef}
        style={{
          position: 'absolute', inset: '-8% -4% -8% -4%',
          willChange: 'transform',
        }}
      >
        <image-slot
          id="hero-photo"
          shape="rect"
          src="eros-1735.jpg"
          placeholder="SPAO villa · golden hour · wide editorial crop"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        ></image-slot>
      </div>

      {/* Scrim — vertical gradient weighted where text sits + soft center wash */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: `
            linear-gradient(180deg, rgba(20,14,8,0.38) 0%, rgba(20,14,8,0.06) 22%, rgba(20,14,8,0.18) 58%, rgba(20,14,8,0.55) 100%),
            radial-gradient(70% 45% at 50% 52%, rgba(20,14,8,0.22) 0%, transparent 75%)
          `,
          pointerEvents: 'none',
        }}
      ></div>

      {/* Top hairline frame */}
      <div style={{
        position: 'absolute', top: 96, left: 32, right: 32,
        borderTop: '0.5px solid rgba(245,240,232,0.5)',
        display: 'flex', justifyContent: 'space-between',
        padding: '14px 0',
        color: 'var(--parchment)',
      }} className="hero-frame-top">
        <span className="micro" style={{ color: 'rgba(245,240,232,0.85)' }}>N 40° 45′ · E 14° 36′</span>
        <span className="micro" style={{ color: 'rgba(245,240,232,0.85)' }}>Vol. I — Invitation</span>
      </div>

      {/* Center stack */}
      <div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: 'var(--parchment)',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <p className="micro reveal" style={{ color: 'rgba(245,240,232,0.85)', marginBottom: 28 }}>
          Together with their families
        </p>
        <h1
          className="serif reveal reveal-delay-1"
          style={{
            fontStyle: italicAccents ? 'italic' : 'normal',
            fontSize: 'clamp(56px, 11vw, 148px)',
            margin: 0,
            lineHeight: 1.02,
            fontWeight: 300,
            letterSpacing: '0.005em',
            textShadow: '0 2px 32px rgba(20,14,8,0.45)',
          }}
        >
          Samantha
          <span className="serif" style={{ fontStyle: 'italic', opacity: 0.85, margin: '0 0.18em' }}>&amp;</span>
          Devin
        </h1>
        <div className="reveal reveal-delay-2" style={{ marginTop: 30, display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ width: 36, height: 0.5, background: 'rgba(245,240,232,0.6)' }}></span>
          <span className="small-caps" style={{ color: 'rgba(245,240,232,0.95)', letterSpacing: '0.42em' }}>
            The Second of June · MMXXVII
          </span>
          <span style={{ width: 36, height: 0.5, background: 'rgba(245,240,232,0.6)' }}></span>
        </div>
        <p
          className="serif-italic reveal reveal-delay-3"
          style={{
            marginTop: 22,
            fontSize: 'clamp(18px, 2vw, 22px)',
            color: 'rgba(245,240,232,0.95)',
            fontWeight: 300,
          }}
        >
          SPAO · Campania, Italy
        </p>
      </div>

      {/* Bottom marker */}
      <div
        className="reveal reveal-delay-4"
        style={{
          position: 'absolute', bottom: 36, left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          color: 'var(--parchment)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <span className="micro" style={{ color: 'rgba(245,240,232,0.8)' }}>Continue</span>
          <span style={{ width: 0.5, height: 44, background: 'rgba(245,240,232,0.5)' }}></span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-frame-top { left: 20px; right: 20px; top: 84px; }
        }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   InvitationNote — short love letter beneath hero
─────────────────────────────────────────────────────────────────*/
function InvitationNote({ italicAccents }) {
  const ref = useReveal();
  return (
    <section ref={ref} className="container-narrow" style={{ padding: '140px 32px 100px', textAlign: 'center' }}>
      <p className="micro reveal" style={{ marginBottom: 28 }}>I · An Invitation</p>
      <p
        className={italicAccents ? 'serif-italic reveal reveal-delay-1' : 'serif reveal reveal-delay-1'}
        style={{
          fontSize: 'clamp(26px, 3.4vw, 38px)',
          lineHeight: 1.45,
          margin: 0,
          color: 'var(--espresso)',
          fontWeight: 300,
          textWrap: 'pretty',
        }}
      >
        Come spend four slow days with us beneath a Campanian sun —
        share a long table, pour another glass, and watch two of your
        favourite people promise the rest of it to one another.
      </p>
      <div className="reveal reveal-delay-2" style={{ marginTop: 56, display: 'inline-flex', alignItems: 'center', gap: 18 }}>
        <span style={{ width: 32, height: 0.5, background: 'var(--travertine)' }}></span>
        <span className="small-caps" style={{ color: 'var(--umber)' }}>1 — 4 June 2027</span>
        <span style={{ width: 32, height: 0.5, background: 'var(--travertine)' }}></span>
      </div>
    </section>
  );
}

Object.assign(window, {
  useReveal,
  Monogram,
  Nav,
  Hero,
  InvitationNote,
});
