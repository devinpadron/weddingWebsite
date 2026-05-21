// App entry — composes all sections + Tweaks panel

const { useState: useStateApp, useEffect: useEffectApp } = React;

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

function App() {
  const defaults = window.__TWEAKS__ || {};
  const [t, setTweak] = useTweaks(defaults);
  const [rsvpOpen, setRsvpOpen] = useStateApp(false);

  useEffectApp(() => {
    applyPalette(t.palette);
  }, [t.palette]);

  // Global scroll-reveal observer — runs once, catches every `.reveal` on the page
  useEffectApp(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    // Observe whatever is already in the DOM, then re-observe after a tick
    // to catch any reveal elements mounted in the same frame.
    const observe = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach((n) => io.observe(n));
    };
    observe();
    const id = requestAnimationFrame(observe);
    // Belt-and-braces: kick the ones in the initial viewport visible immediately
    // so the hero copy never reads as "blank parchment" on first paint.
    requestAnimationFrame(() => {
      document.querySelectorAll('.reveal').forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) n.classList.add('in');
      });
    });
    return () => { cancelAnimationFrame(id); io.disconnect(); };
  }, []);

  return (
    <>
      <Nav monogram={t.monogram} onRSVP={() => setRsvpOpen(true)} />

      <main>
        <Hero
          monogram={t.monogram}
          heroCrop={t.heroCrop}
          italicAccents={t.italicAccents}
        />
        <InvitationNote italicAccents={t.italicAccents} />
        <StoryTeaser italicAccents={t.italicAccents} />
        <ScheduleSection />
        <TravelSection />
        <RegistryTeaser />
        <RSVPCallout onOpen={() => setRsvpOpen(true)} />
        <Footer monogram={t.monogram} />
      </main>

      <MonogramWatermark show={t.showWatermark} monogram={t.monogram} />

      <RSVPModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakSelect
            label="Colourway"
            value={t.palette}
            onChange={(v) => setTweak('palette', v)}
            options={[
              { value: 'parchment', label: 'Parchment & Espresso' },
              { value: 'olive', label: 'Olive Grove' },
              { value: 'terracotta', label: 'Terracotta' },
            ]}
          />
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            {Object.values(PALETTES[t.palette] || PALETTES.parchment).slice(0, 5).map((c, i) => (
              <span key={i} style={{ width: 22, height: 22, borderRadius: '50%', background: c, border: '0.5px solid rgba(0,0,0,0.15)' }}></span>
            ))}
          </div>
        </TweakSection>

        <TweakSection title="Monogram">
          <TweakRadio
            label="Style"
            value={t.monogram}
            onChange={(v) => setTweak('monogram', v)}
            options={[
              { value: 'D & S', label: 'D & S' },
              { value: 'DS', label: 'DS' },
              { value: 'D · S', label: 'D · S' },
            ]}
          />
          <TweakToggle
            label="Corner watermark"
            value={t.showWatermark}
            onChange={(v) => setTweak('showWatermark', v)}
          />
        </TweakSection>

        <TweakSection title="Composition">
          <TweakRadio
            label="Hero height"
            value={t.heroCrop}
            onChange={(v) => setTweak('heroCrop', v)}
            options={[
              { value: 'tall', label: 'Tall' },
              { value: 'standard', label: 'Standard' },
              { value: 'wide', label: 'Wide' },
            ]}
          />
          <TweakToggle
            label="Italicise headlines"
            value={t.italicAccents}
            onChange={(v) => setTweak('italicAccents', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
