// Landing page entry — the front door: hero, invitation, and a card index
// linking out to each dedicated page. Shared shell lives in page.jsx.

/* ────────────────────────────────────────────────────────────────
   LinkIndex — cards linking to each page (and opening the RSVP modal)
─────────────────────────────────────────────────────────────────*/
function LinkIndex() {
  const ref = useReveal();
  const openRSVP = useRSVP();
  const cards = [
    { n: 'I',   label: 'Schedule', href: '/schedule/', blurb: 'Four days in Umbria, and what happens on each.' },
    { n: 'II',  label: 'Travel',   href: '/travel/',   blurb: 'Flights, trains, and the last stretch to the villa.' },
    { n: 'III', label: 'Stay',     href: '/stay/',     blurb: 'Enter your invitation code to see where you’re staying.' },
    { n: 'IV',  label: 'FAQ',      href: '/faq/',      blurb: 'Answers to all your burning questions.' },
    { n: 'V',   label: 'RSVP',     rsvp: true,         blurb: 'Kindly reply by January 15th, 2027.' },
  ];
  // Optional tile image: add `img: 'file.jpg'` to a card above and it renders across the top.

  const Card = ({ c }) => {
    const inner = (
      <>
        {c.img && <img src={c.img} alt="" loading="lazy" style={{ width: 'calc(100% + 80px)', margin: '-44px -40px 28px', aspectRatio: '16 / 9', objectFit: 'cover' }} />}
        <p className="micro" style={{ marginBottom: 16 }}>{c.n}</p>
        <h3 className="serif" style={{ fontSize: 'clamp(28px, 3vw, 36px)', margin: 0, fontWeight: 300, fontStyle: 'italic' }}>
          {c.label}
        </h3>
        <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.7, color: 'var(--umber)' }}>{c.blurb}</p>
        <span className="small-caps" style={{ display: 'inline-block', marginTop: 26, color: 'var(--espresso)', borderBottom: '0.5px solid var(--travertine)', paddingBottom: 5 }}>
          {c.rsvp ? 'Reply' : 'Open'} &rarr;
        </span>
      </>
    );
    const style = {
      display: 'block', textAlign: 'left', width: '100%',
      padding: '44px 40px 40px', background: 'var(--parchment)',
      border: '0.5px solid var(--hairline)',
      gridColumn: c.rsvp ? '1 / -1' : undefined,
    };
    return c.rsvp
      ? <button className="reveal" onClick={openRSVP} style={{ ...style, cursor: 'pointer' }}>{inner}</button>
      : <a className="reveal" href={c.href} style={style}>{inner}</a>;
  };

  return (
    <section ref={ref} style={{ padding: '120px 0 130px', background: 'var(--parchment-deep)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className="micro reveal" style={{ marginBottom: 22 }}>Explore</p>
          <h2 className="serif reveal reveal-delay-1" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', margin: 0, fontWeight: 300 }}>
            Everything you&rsquo;ll <em style={{ fontWeight: 300 }}>need</em>
          </h2>
        </div>
        <div className="linkindex-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {cards.map((c) => <Card key={c.label} c={c} />)}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .linkindex-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function App() {
  const t = window.__TWEAKS__ || {};
  return (
    <WeddingPage solidNav={false}>
      <Hero monogram={t.monogram} heroCrop={t.heroCrop} italicAccents={t.italicAccents} />
      <InvitationNote italicAccents={t.italicAccents} />
      <LinkIndex />
    </WeddingPage>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
