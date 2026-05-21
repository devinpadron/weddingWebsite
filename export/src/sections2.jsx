// Wedding homepage — additional sections (schedule, travel, RSVP, footer)

const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

/* ────────────────────────────────────────────────────────────────
   ScheduleSection — 4-day weekend timeline
─────────────────────────────────────────────────────────────────*/
function ScheduleSection() {
  const ref = useReveal();
  const days = [
    {
      num: 'I', date: 'Tuesday · 1 June',
      title: 'Arrival & Pizza Party',
      time: 'from 17:00',
      attire: 'Casual',
      note: 'Check-in closes at 19:00. Welcome night under string-lights in the lower garden — wood-fired pizza, a bottomless aperitivo cart, no speeches.',
    },
    {
      num: 'II', date: 'Wednesday · 2 June',
      title: 'The Wedding',
      time: '16:00 ceremony',
      attire: 'Formal · garden-suitable',
      note: 'Ceremony in the olive grove, followed by cocktails on the terrace and a long-table dinner in the orangery. Dancing until the cicadas stop.',
      featured: true,
    },
    {
      num: 'III', date: 'Thursday · 3 June',
      title: 'Day-After BBQ',
      time: '13:00',
      attire: 'Linen & sandals',
      note: 'Lazy lunch by the pool. Bring a swimsuit, leave your watch. Espresso martinis return at sunset for anyone who can stand them.',
    },
    {
      num: 'IV', date: 'Friday · 4 June',
      title: 'Farewell Breakfast',
      time: 'until 11:00',
      attire: 'Whatever you slept in',
      note: 'Coffee, cornetti, slow goodbyes on the loggia. Check-out by eleven; please don\u2019t leave without a hug.',
    },
  ];

  return (
    <section
      id="schedule"
      ref={ref}
      style={{ padding: '140px 0 120px', background: 'var(--parchment)' }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <p className="micro reveal" style={{ marginBottom: 22 }}>III · The Weekend</p>
          <h2
            className="serif reveal reveal-delay-1"
            style={{
              fontSize: 'clamp(44px, 5.5vw, 72px)',
              margin: 0,
              fontWeight: 300,
              lineHeight: 1.05,
            }}
          >
            Four days in <em style={{ fontWeight: 300 }}>Campania</em>
          </h2>
          <p
            className="reveal reveal-delay-2"
            style={{
              maxWidth: 540, margin: '24px auto 0',
              fontSize: 15, lineHeight: 1.7, color: 'var(--umber)',
            }}
          >
            We&rsquo;ve built the weekend like a good Italian meal — slow,
            generous, with plenty of time between courses.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
            borderTop: '0.5px solid var(--hairline)',
            borderBottom: '0.5px solid var(--hairline)',
          }}
          className="schedule-grid"
        >
          {days.map((d, i) => (
            <div
              key={d.num}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
              style={{
                padding: '40px 28px 44px',
                borderRight: i < days.length - 1 ? '0.5px solid var(--hairline)' : 'none',
                background: d.featured ? 'rgba(200, 184, 154, 0.18)' : 'transparent',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 28 }}>
                <span className="serif" style={{ fontSize: 32, fontStyle: 'italic', color: 'var(--travertine)', fontWeight: 300 }}>
                  {d.num}
                </span>
                <span className="micro" style={{ color: 'var(--umber)' }}>{d.date}</span>
              </div>
              <h3
                className="serif"
                style={{
                  fontSize: 30,
                  margin: 0,
                  fontWeight: 300,
                  lineHeight: 1.15,
                  textWrap: 'balance',
                }}
              >
                {d.title}
              </h3>
              <div style={{ marginTop: 22, display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                <span className="small-caps" style={{ color: 'var(--espresso)' }}>{d.time}</span>
                <span style={{ width: 0.5, background: 'var(--hairline)' }}></span>
                <span className="small-caps" style={{ color: 'var(--umber)' }}>{d.attire}</span>
              </div>
              <p style={{
                marginTop: 24,
                fontSize: 14,
                lineHeight: 1.75,
                color: 'var(--umber)',
              }}>
                {d.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .schedule-grid { grid-template-columns: 1fr 1fr !important; }
          .schedule-grid > div:nth-child(2) { border-right: none !important; }
          .schedule-grid > div:nth-child(1), .schedule-grid > div:nth-child(2) { border-bottom: 0.5px solid var(--hairline); }
        }
        @media (max-width: 640px) {
          .schedule-grid { grid-template-columns: 1fr !important; }
          .schedule-grid > div { border-right: none !important; border-bottom: 0.5px solid var(--hairline); }
          .schedule-grid > div:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   TravelSection — stay + travel teasers side-by-side
─────────────────────────────────────────────────────────────────*/
function TravelSection() {
  const ref = useReveal();
  return (
    <section
      id="travel"
      ref={ref}
      style={{ padding: '140px 0 120px', background: 'var(--parchment-deep)' }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <p className="micro reveal" style={{ marginBottom: 22 }}>IV · Getting There</p>
          <h2 className="serif reveal reveal-delay-1" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: 0, fontWeight: 300 }}>
            Plan your <em style={{ fontWeight: 300 }}>passage</em>
          </h2>
        </div>

        <div
          className="travel-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
            border: '0.5px solid var(--hairline)',
            background: 'var(--parchment)',
          }}
        >
          {/* Stay card */}
          <div id="stay" className="reveal" style={{ padding: '56px 56px 64px', borderRight: '0.5px solid var(--hairline)' }}>
            <p className="micro" style={{ marginBottom: 18 }}>Accommodations</p>
            <h3 className="serif" style={{ fontSize: 38, margin: 0, fontWeight: 300, fontStyle: 'italic' }}>
              Staying at SPAO
            </h3>
            <p style={{ marginTop: 22, fontSize: 15, lineHeight: 1.75, color: 'var(--umber)' }}>
              We&rsquo;ve reserved every room on the estate for the weekend — 24
              rooms across the main villa and the converted stables. Booking
              opens for guests on <strong style={{ color: 'var(--espresso)', fontWeight: 500 }}>15 October 2026</strong> using
              the code you&rsquo;ll receive with your invitation.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0 0', display: 'grid', gap: 14 }}>
              {[
                ['Casa Madre', 'Main villa · 12 rooms · €380/night'],
                ['Le Stalle', 'Stables wing · 8 rooms · €280/night'],
                ['I Giardini', 'Garden cottages · 4 suites · €440/night'],
              ].map(([k, v]) => (
                <li key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '0.5px dashed var(--hairline-soft)', paddingBottom: 10 }}>
                  <span className="serif-italic" style={{ fontSize: 18, color: 'var(--espresso)' }}>{k}</span>
                  <span className="small-caps" style={{ color: 'var(--umber)' }}>{v}</span>
                </li>
              ))}
            </ul>
            <a href="#" className="small-caps reveal reveal-delay-2" style={{ display: 'inline-block', marginTop: 36, borderBottom: '0.5px solid var(--travertine)', paddingBottom: 6 }}>
              Booking details →
            </a>
          </div>

          {/* Travel card */}
          <div className="reveal reveal-delay-1" style={{ padding: '56px 56px 64px' }}>
            <p className="micro" style={{ marginBottom: 18 }}>Travel Guide</p>
            <h3 className="serif" style={{ fontSize: 38, margin: 0, fontWeight: 300, fontStyle: 'italic' }}>
              Finding the villa
            </h3>
            <p style={{ marginTop: 22, fontSize: 15, lineHeight: 1.75, color: 'var(--umber)' }}>
              The closest airport is <strong style={{ color: 'var(--espresso)', fontWeight: 500 }}>Naples (NAP)</strong>, an hour
              south of the villa by car. Rome (FCO) is a beautiful three-hour
              train ride if you&rsquo;d like a slower entrance.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0 0', display: 'grid', gap: 14 }}>
              {[
                ['By Air', 'Fly into NAP · 60 min transfer'],
                ['By Rail', 'Frecciarossa to Salerno · 30 min onward'],
                ['By Car', 'A3 south from Naples · 70 km'],
                ['Shuttle', 'Complimentary from NAP, 1 & 2 June'],
              ].map(([k, v]) => (
                <li key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '0.5px dashed var(--hairline-soft)', paddingBottom: 10 }}>
                  <span className="serif-italic" style={{ fontSize: 18, color: 'var(--espresso)' }}>{k}</span>
                  <span className="small-caps" style={{ color: 'var(--umber)' }}>{v}</span>
                </li>
              ))}
            </ul>
            <a href="#" className="small-caps" style={{ display: 'inline-block', marginTop: 36, borderBottom: '0.5px solid var(--travertine)', paddingBottom: 6 }}>
              Full travel guide →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .travel-grid { grid-template-columns: 1fr !important; }
          .travel-grid > div { border-right: none !important; }
          .travel-grid > div:first-child { border-bottom: 0.5px solid var(--hairline); }
        }
        @media (max-width: 640px) {
          .travel-grid > div { padding: 40px 28px 44px !important; }
        }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   RegistryTeaser — small section linking to registry
─────────────────────────────────────────────────────────────────*/
function RegistryTeaser() {
  const ref = useReveal();
  return (
    <section
      id="registry"
      ref={ref}
      style={{ padding: '120px 0', textAlign: 'center', background: 'var(--parchment)' }}
    >
      <div className="container-narrow">
        <p className="micro reveal" style={{ marginBottom: 22 }}>V · Registry</p>
        <h2 className="serif reveal reveal-delay-1" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: 0, fontWeight: 300, textWrap: 'balance' }}>
          Your presence is the gift. <em style={{ fontWeight: 300 }}>Truly.</em>
        </h2>
        <p className="reveal reveal-delay-2" style={{ marginTop: 24, fontSize: 15, lineHeight: 1.75, color: 'var(--umber)', maxWidth: 540, margin: '24px auto 0' }}>
          But if you&rsquo;d like to send us off with something for the new house,
          we&rsquo;ve curated a small registry — a few favourite linens, a
          ridiculous pasta maker, a contribution to the honeymoon in Puglia.
        </p>
        <a href="#" className="small-caps reveal reveal-delay-3" style={{ display: 'inline-block', marginTop: 40, borderBottom: '0.5px solid var(--travertine)', paddingBottom: 6 }}>
          Visit the registry →
        </a>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   RSVPModal — elegant form with multi-step feel
─────────────────────────────────────────────────────────────────*/
function RSVPModal({ open, onClose }) {
  const [step, setStep] = useState2(0);
  const [data, setData] = useState2({
    name: '', party: 1, attending: null,
    diet: [], song: '', message: '',
  });
  const [submitted, setSubmitted] = useState2(false);

  useEffect2(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect2(() => {
    if (open) {
      setStep(0);
      setSubmitted(false);
    }
  }, [open]);

  const setField = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const toggleDiet = (d) =>
    setData((s) => ({
      ...s,
      diet: s.diet.includes(d) ? s.diet.filter((x) => x !== d) : [...s.diet, d],
    }));

  if (!open) return null;

  const dietOptions = ['Vegetarian', 'Vegan', 'Gluten-free', 'Pescatarian', 'No shellfish', 'Nut allergy'];

  const submit = () => {
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(44, 42, 37, 0.55)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.3s ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: 'var(--parchment)',
          maxWidth: 640, width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '0.5px solid var(--hairline)',
          padding: 'clamp(36px, 5vw, 64px)',
          position: 'relative',
          animation: 'slideUp 0.5s cubic-bezier(.2,.6,.2,1)',
        }}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          style={{
            position: 'absolute', top: 18, right: 22,
            background: 'transparent', border: 'none',
            fontSize: 28, color: 'var(--umber)', lineHeight: 1,
          }}
        >×</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Monogram style="D & S" size={56} />
            <p className="serif-italic" style={{ fontSize: 36, marginTop: 36, marginBottom: 18, lineHeight: 1.2 }}>
              {data.attending === 'yes' ? 'We can\u2019t wait to see you.' : 'We\u2019ll miss you dearly.'}
            </p>
            <p style={{ color: 'var(--umber)', fontSize: 15, lineHeight: 1.7, maxWidth: 380, margin: '0 auto' }}>
              {data.attending === 'yes'
                ? 'Confirmation and booking code are on their way to your inbox. Pack linen.'
                : 'Thank you for letting us know. We\u2019ll raise a glass for you on June 2.'}
            </p>
            <button
              onClick={onClose}
              className="small-caps"
              style={{
                marginTop: 44,
                background: 'var(--espresso)', color: 'var(--parchment)',
                border: 'none', padding: '14px 36px',
                letterSpacing: '0.28em',
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <p className="micro" style={{ marginBottom: 14 }}>VII · RSVP</p>
              <h3 className="serif" style={{ fontSize: 'clamp(34px, 4vw, 46px)', margin: 0, fontWeight: 300, fontStyle: 'italic' }}>
                Kindly reply by 1 March 2027
              </h3>
            </div>

            {/* Progress */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: i === step ? 28 : 12,
                    height: 1,
                    background: i <= step ? 'var(--espresso)' : 'var(--travertine)',
                    transition: 'all 0.4s ease',
                  }}
                ></span>
              ))}
            </div>

            {step === 0 && (
              <div style={{ display: 'grid', gap: 28 }}>
                <Field label="Your name">
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setField('name', e.target.value)}
                    placeholder="As it appears on your invitation"
                    style={inputStyle}
                  />
                </Field>
                <Field label="Party size">
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[1, 2, 3, 4].map((n) => (
                      <button
                        key={n}
                        onClick={() => setField('party', n)}
                        className="small-caps"
                        style={{
                          flex: 1, padding: '14px 0',
                          background: data.party === n ? 'var(--espresso)' : 'transparent',
                          color: data.party === n ? 'var(--parchment)' : 'var(--espresso)',
                          border: '0.5px solid ' + (data.party === n ? 'var(--espresso)' : 'var(--hairline)'),
                          letterSpacing: '0.2em',
                          transition: 'all 0.2s',
                        }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Will you be joining us?">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <button
                      onClick={() => setField('attending', 'yes')}
                      style={{
                        padding: '18px',
                        background: data.attending === 'yes' ? 'var(--espresso)' : 'transparent',
                        color: data.attending === 'yes' ? 'var(--parchment)' : 'var(--espresso)',
                        border: '0.5px solid ' + (data.attending === 'yes' ? 'var(--espresso)' : 'var(--hairline)'),
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: 22,
                        fontStyle: 'italic',
                        fontWeight: 300,
                        transition: 'all 0.2s',
                      }}
                    >
                      Joyfully, yes
                    </button>
                    <button
                      onClick={() => setField('attending', 'no')}
                      style={{
                        padding: '18px',
                        background: data.attending === 'no' ? 'var(--espresso)' : 'transparent',
                        color: data.attending === 'no' ? 'var(--parchment)' : 'var(--espresso)',
                        border: '0.5px solid ' + (data.attending === 'no' ? 'var(--espresso)' : 'var(--hairline)'),
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: 22,
                        fontStyle: 'italic',
                        fontWeight: 300,
                        transition: 'all 0.2s',
                      }}
                    >
                      Regretfully, no
                    </button>
                  </div>
                </Field>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                  <button
                    disabled={!data.name || !data.attending}
                    onClick={() => setStep(data.attending === 'yes' ? 1 : 2)}
                    className="small-caps"
                    style={{
                      background: 'var(--espresso)', color: 'var(--parchment)',
                      border: 'none', padding: '14px 32px',
                      letterSpacing: '0.28em',
                      opacity: (!data.name || !data.attending) ? 0.4 : 1,
                      cursor: (!data.name || !data.attending) ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div style={{ display: 'grid', gap: 28 }}>
                <Field label="Dietary preferences (select any that apply)">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {dietOptions.map((d) => {
                      const on = data.diet.includes(d);
                      return (
                        <button
                          key={d}
                          onClick={() => toggleDiet(d)}
                          className="small-caps"
                          style={{
                            padding: '10px 18px',
                            background: on ? 'var(--espresso)' : 'transparent',
                            color: on ? 'var(--parchment)' : 'var(--espresso)',
                            border: '0.5px solid ' + (on ? 'var(--espresso)' : 'var(--hairline)'),
                            letterSpacing: '0.2em',
                            transition: 'all 0.2s',
                          }}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </Field>
                <Field label="A song to fill the dance floor">
                  <input
                    type="text"
                    value={data.song}
                    onChange={(e) => setField('song', e.target.value)}
                    placeholder="Artist — Title"
                    style={inputStyle}
                  />
                </Field>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  <button
                    onClick={() => setStep(0)}
                    className="small-caps"
                    style={{ background: 'transparent', border: 'none', color: 'var(--umber)', letterSpacing: '0.2em' }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="small-caps"
                    style={{
                      background: 'var(--espresso)', color: 'var(--parchment)',
                      border: 'none', padding: '14px 32px',
                      letterSpacing: '0.28em',
                    }}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'grid', gap: 28 }}>
                <Field label={data.attending === 'yes' ? 'A note for the couple (optional)' : 'Send them a note'}>
                  <textarea
                    value={data.message}
                    onChange={(e) => setField('message', e.target.value)}
                    rows={5}
                    placeholder="Anything you\u2019d like us to know\u2026"
                    style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Jost, sans-serif' }}
                  />
                </Field>
                <div style={{
                  padding: 24,
                  background: 'rgba(200, 184, 154, 0.18)',
                  border: '0.5px solid var(--hairline)',
                }}>
                  <p className="micro" style={{ marginBottom: 12 }}>Summary</p>
                  <p className="serif" style={{ fontSize: 22, margin: 0, lineHeight: 1.4 }}>
                    <em>{data.name || 'Guest'}</em>
                    <span style={{ color: 'var(--umber)' }}> · party of {data.party} · </span>
                    {data.attending === 'yes' ? 'joining us' : 'unable to join'}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  <button
                    onClick={() => setStep(data.attending === 'yes' ? 1 : 0)}
                    className="small-caps"
                    style={{ background: 'transparent', border: 'none', color: 'var(--umber)', letterSpacing: '0.2em' }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={submit}
                    className="small-caps"
                    style={{
                      background: 'var(--gold)', color: 'var(--espresso)',
                      border: 'none', padding: '14px 32px',
                      letterSpacing: '0.28em',
                    }}
                  >
                    Send reply
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(24px); opacity: 0; } to { transform: none; opacity: 1; } }
      `}</style>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '14px 0',
  background: 'transparent',
  border: 'none',
  borderBottom: '0.5px solid var(--hairline)',
  fontFamily: 'Cormorant Garamond, serif',
  fontSize: 22,
  fontStyle: 'italic',
  fontWeight: 300,
  color: 'var(--espresso)',
  outline: 'none',
};

function Field({ label, children }) {
  return (
    <label style={{ display: 'block' }}>
      <span className="micro" style={{ display: 'block', marginBottom: 12 }}>{label}</span>
      {children}
    </label>
  );
}

/* ────────────────────────────────────────────────────────────────
   RSVPCallout — full-width section that opens the modal
─────────────────────────────────────────────────────────────────*/
function RSVPCallout({ onOpen }) {
  const ref = useReveal();
  return (
    <section
      ref={ref}
      style={{
        background: 'var(--espresso)',
        color: 'var(--parchment)',
        padding: '140px 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-narrow" style={{ position: 'relative', zIndex: 2 }}>
        <p className="micro reveal" style={{ color: 'rgba(245,240,232,0.7)', marginBottom: 22 }}>VI · The Favour of Your Reply</p>
        <h2
          className="serif reveal reveal-delay-1"
          style={{
            fontSize: 'clamp(48px, 6vw, 88px)',
            margin: 0, fontWeight: 300, lineHeight: 1.02,
            color: 'var(--parchment)',
          }}
        >
          <em style={{ fontWeight: 300 }}>Will you</em><br />
          join us?
        </h2>
        <p className="reveal reveal-delay-2" style={{ marginTop: 32, color: 'rgba(245,240,232,0.7)', fontSize: 15, letterSpacing: '0.04em' }}>
          Kindly reply by the first of March, two thousand twenty-seven.
        </p>
        <button
          onClick={onOpen}
          className="small-caps reveal reveal-delay-3"
          style={{
            marginTop: 48,
            background: 'var(--gold)',
            color: 'var(--espresso)',
            border: 'none',
            padding: '18px 48px',
            letterSpacing: '0.32em',
            fontSize: 12,
          }}
        >
          Begin your reply
        </button>
      </div>

      {/* Decorative monogram watermark */}
      <span
        aria-hidden
        className="serif"
        style={{
          position: 'absolute',
          right: '-2vw', bottom: '-8vh',
          fontSize: 'clamp(240px, 38vw, 520px)',
          color: 'rgba(245,240,232,0.04)',
          fontStyle: 'italic',
          lineHeight: 1, pointerEvents: 'none',
          fontWeight: 300,
        }}
      >
        D&amp;S
      </span>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   Footer
─────────────────────────────────────────────────────────────────*/
function Footer({ monogram }) {
  return (
    <footer style={{ background: 'var(--parchment)', borderTop: '0.5px solid var(--hairline)' }}>
      <div className="container" style={{ padding: '64px 32px 56px' }}>
        <div
          className="footer-row"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 40,
            alignItems: 'center',
            paddingBottom: 48,
            borderBottom: '0.5px solid var(--hairline-soft)',
          }}
        >
          <div>
            <p className="micro" style={{ marginBottom: 8 }}>The Day</p>
            <p className="serif-italic" style={{ fontSize: 22, margin: 0, color: 'var(--espresso)' }}>
              2 June 2027
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Monogram style={monogram} size={44} color="var(--espresso)" />
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className="micro" style={{ marginBottom: 8 }}>The Place</p>
            <p className="serif-italic" style={{ fontSize: 22, margin: 0, color: 'var(--espresso)' }}>
              SPAO, Campania
            </p>
          </div>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 28, flexWrap: 'wrap', gap: 18,
        }}>
          <span className="micro" style={{ color: 'var(--umber)' }}>
            With love from D &amp; S
          </span>
          <span className="micro" style={{ color: 'var(--umber)' }}>
            Questions? hello@devinandsamantha.com
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-row { grid-template-columns: 1fr !important; text-align: center !important; }
          .footer-row > div { text-align: center !important; }
        }
      `}</style>
    </footer>
  );
}

/* ────────────────────────────────────────────────────────────────
   Monogram Watermark — fixed corner accent
─────────────────────────────────────────────────────────────────*/
function MonogramWatermark({ show, monogram }) {
  if (!show) return null;
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        right: 24,
        bottom: 22,
        zIndex: 30,
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
        opacity: 0.42,
      }}
      className="watermark-fixed"
    >
      <span className="serif-italic" style={{ fontSize: 14, letterSpacing: '0.18em', color: 'var(--umber)' }}>
        {monogram} · MMXXVII
      </span>
    </div>
  );
}

Object.assign(window, {
  ScheduleSection,
  TravelSection,
  RegistryTeaser,
  RSVPModal,
  RSVPCallout,
  Footer,
  MonogramWatermark,
});
