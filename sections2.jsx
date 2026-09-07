// Wedding homepage — additional sections (schedule, travel, RSVP, footer)

const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

/* ────────────────────────────────────────────────────────────────
   ScheduleSection — 4-day weekend timeline
─────────────────────────────────────────────────────────────────*/
function ScheduleSection() {
  const ref = useReveal();
  const days = [
    {
      num: 'I', day: 'Tuesday', date: '1 June',
      title: 'Arrival & Pizza Party',
      time: 'from 17:00',
      attire: 'Casual',
      note: 'Drop your bags, pour a drink, and find us in the lower garden. A welcome night under string-lights — wood-fired pizza straight from the oven, a bottomless aperitivo cart, and absolutely no speeches.',
      highlights: ['Check-in closes 19:00', 'Wood-fired pizza', 'Aperitivo cart'],
    },
    {
      num: 'II', day: 'Wednesday', date: '2 June',
      title: 'The Wedding',
      time: '16:00 ceremony',
      attire: 'Formal · garden-suitable',
      note: 'The reason we’re all here. A ceremony among the olive trees at golden hour, cocktails on the terrace as the valley turns amber, then a long-table dinner in the orangery. Dancing until the cicadas give up.',
      highlights: ['Olive-grove ceremony', 'Terrace cocktails', 'Long-table dinner'],
      featured: true,
    },
    {
      num: 'III', day: 'Thursday', date: '3 June',
      title: 'Day-After BBQ',
      time: 'from 13:00',
      attire: 'Linen & sandals',
      note: 'A slow, sun-drunk lunch by the pool. Bring a swimsuit and leave your watch behind. Espresso martinis reappear at sunset for anyone still standing after the night before.',
      highlights: ['Poolside lunch', 'Bring a swimsuit', 'Sunset espresso martinis'],
    },
    {
      num: 'IV', day: 'Friday', date: '4 June',
      title: 'Farewell Breakfast',
      time: 'until 11:00',
      attire: 'Whatever you slept in',
      note: 'Coffee and warm cornetti on the loggia, and the slow business of saying goodbye. Check-out is at eleven — but please don’t leave without finding us for a hug.',
      highlights: ['Coffee & cornetti', 'On the loggia', 'Check-out by 11:00'],
    },
  ];

  return (
    <section id="schedule" ref={ref} style={{ background: 'var(--parchment)' }}>
      {/* Header band */}
      <div style={{ background: 'var(--parchment-deep)', borderBottom: '0.5px solid var(--hairline)', padding: '150px 0 96px', textAlign: 'center' }}>
        <div className="container-narrow">
          <p className="micro reveal" style={{ marginBottom: 26 }}>The Weekend</p>
          <h1 className="serif reveal reveal-delay-1" style={{ fontSize: 'clamp(52px, 8vw, 104px)', margin: 0, fontWeight: 300, lineHeight: 1.02 }}>
            Four days in <em style={{ fontWeight: 300 }}>Umbria</em>
          </h1>
          <p className="reveal reveal-delay-2" style={{ maxWidth: 560, margin: '30px auto 0', fontSize: 16, lineHeight: 1.8, color: 'var(--umber)' }}>
            We&rsquo;ve built the weekend like a good Italian meal &mdash; slow,
            generous, and with plenty of time between courses. Come for the wedding;
            stay for the long lunches.
          </p>
          <div className="reveal reveal-delay-3" style={{ marginTop: 44, display: 'inline-flex', alignItems: 'center', gap: 18 }}>
            <span style={{ width: 40, height: 0.5, background: 'var(--travertine)' }}></span>
            <span className="small-caps" style={{ color: 'var(--umber)' }}>1 &mdash; 4 June 2027 &middot; SPAO, Umbria</span>
            <span style={{ width: 40, height: 0.5, background: 'var(--travertine)' }}></span>
          </div>
        </div>
      </div>

      {/* Vertical timeline */}
      <div className="container-narrow" style={{ padding: '20px 32px 40px' }}>
        {days.map((d) => (
          <article
            key={d.num}
            className="day-row reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
              gap: 48,
              padding: '64px 0',
              borderBottom: '0.5px solid var(--hairline)',
            }}
          >
            <aside className="day-aside">
              <div className="serif" style={{ fontSize: 84, fontStyle: 'italic', lineHeight: 0.9, color: d.featured ? 'var(--espresso)' : 'var(--travertine)', fontWeight: 300 }}>
                {d.num}
              </div>
              <p className="serif-italic" style={{ fontSize: 24, margin: '18px 0 0', color: 'var(--espresso)' }}>{d.day}</p>
              <p className="micro" style={{ marginTop: 6 }}>{d.date}</p>
              <div style={{ marginTop: 24, display: 'grid', gap: 10 }}>
                <div>
                  <p className="micro" style={{ color: 'var(--travertine)', marginBottom: 4 }}>Time</p>
                  <p className="small-caps" style={{ color: 'var(--espresso)' }}>{d.time}</p>
                </div>
                <div>
                  <p className="micro" style={{ color: 'var(--travertine)', marginBottom: 4 }}>Attire</p>
                  <p className="small-caps" style={{ color: 'var(--umber)' }}>{d.attire}</p>
                </div>
              </div>
            </aside>

            <div className="day-body">
              {d.featured && (
                <span className="small-caps" style={{ display: 'inline-block', marginBottom: 18, padding: '6px 16px', background: 'rgba(200, 184, 154, 0.28)', color: 'var(--espresso)', letterSpacing: '0.24em' }}>
                  The main event
                </span>
              )}
              <h2 className="serif" style={{ fontSize: 'clamp(34px, 4vw, 48px)', margin: 0, fontWeight: 300, lineHeight: 1.1, textWrap: 'balance' }}>
                {d.title}
              </h2>
              <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.85, color: 'var(--umber)', maxWidth: 540 }}>
                {d.note}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '30px 0 0', display: 'flex', flexWrap: 'wrap', gap: '10px 12px' }}>
                {d.highlights.map((h) => (
                  <li key={h} className="small-caps" style={{ padding: '8px 16px', border: '0.5px solid var(--hairline)', color: 'var(--umber)', fontSize: 10 }}>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* Closing note */}
      <div style={{ background: 'var(--espresso)', color: 'var(--parchment)', padding: '110px 0', textAlign: 'center' }}>
        <div className="container-narrow">
          <p className="micro reveal" style={{ color: 'rgba(245,240,232,0.6)', marginBottom: 22 }}>Before you pack</p>
          <h2 className="serif reveal reveal-delay-1" style={{ fontSize: 'clamp(30px, 4vw, 46px)', margin: 0, fontWeight: 300, color: 'var(--parchment)', lineHeight: 1.15 }}>
            Dress for warm days and <em style={{ fontWeight: 300 }}>cooler evenings</em>
          </h2>
          <p className="reveal reveal-delay-2" style={{ marginTop: 24, maxWidth: 520, margin: '24px auto 0', fontSize: 15, lineHeight: 1.8, color: 'rgba(245,240,232,0.72)' }}>
            Early June in Umbria is generous with sunshine. Much of the weekend is on
            stone and garden paths, so pack block heels or elegant flats over stilettos,
            and a light layer for after dark.
          </p>
          <a href="/faq/" className="small-caps reveal reveal-delay-3" style={{ display: 'inline-block', marginTop: 40, color: 'var(--parchment)', borderBottom: '0.5px solid var(--gold)', paddingBottom: 6 }}>
            Packing &amp; travel notes &rarr;
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .day-row { grid-template-columns: 1fr !important; gap: 24px !important; padding: 48px 0 !important; }
          .day-aside { display: flex; align-items: baseline; flex-wrap: wrap; gap: 16px; }
          .day-aside > div:last-child { display: flex !important; gap: 28px; margin-top: 8px !important; }
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
  const [accomCode, setAccomCode] = useState2('');
  const [accomState, setAccomState] = useState2('idle'); // idle | loading | found | not_found | error
  const [accomData, setAccomData] = useState2(null);

  const lookupCode = async () => {
    const trimmed = accomCode.trim();
    if (!trimmed) return;
    setAccomState('loading');
    try {
      const res = await fetch(
        'https://yiuglondgjbgyqfoqunz.supabase.co/rest/v1/rpc/lookup_accommodation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'sb_publishable_ot6gkuv71siQwCe6dd4A0A_1ANgCQi2',
            'Authorization': 'Bearer sb_publishable_ot6gkuv71siQwCe6dd4A0A_1ANgCQi2',
          },
          body: JSON.stringify({ guest_code: trimmed }),
        }
      );
      const rows = await res.json();
      if (Array.isArray(rows) && rows.length > 0) {
        setAccomData(rows[0]);
        setAccomState('found');
      } else {
        setAccomState('not_found');
      }
    } catch (e) {
      setAccomState('error');
    }
  };

  const modes = [
    { k: 'By Air', v: 'Rome Fiumicino (FCO)', d: 'The nearest major airport — about 90 minutes north of the villa by car. Fly in on 1 June or earlier.' },
    { k: 'By Rail', v: 'Trenitalia to Orvieto', d: 'Frequent, comfortable trains from Rome. From Orvieto it’s a short 20-minute drive up into the hills.' },
    { k: 'By Car', v: 'A1 north, exit Orvieto', d: 'The A1 autostrada runs straight from Rome; leave at the Orvieto exit and wind your way into the countryside.' },
    { k: 'Shuttle', v: 'Complimentary · 1 & 2 June', d: 'We’ll run transfers from FCO on arrival days. Send your flight details with your RSVP so we can time them.' },
  ];

  const nearby = [
    { name: 'Orvieto', note: 'A cathedral town perched on a volcanic cliff — Gothic façade, underground caves, and a crisp Orvieto Classico.' },
    { name: 'Assisi', note: 'The rose-stone hill town of St. Francis, all frescoes and far-reaching valley views, under an hour away.' },
    { name: 'Perugia', note: 'Umbria’s handsome capital — medieval streets, a grand piazza, and very good chocolate.' },
  ];

  return (
    <section id="travel" ref={ref} style={{ background: 'var(--parchment-deep)' }}>
      {/* Header band */}
      <div style={{ background: 'var(--parchment)', borderBottom: '0.5px solid var(--hairline)', padding: '150px 0 96px', textAlign: 'center' }}>
        <div className="container-narrow">
          <p className="micro reveal" style={{ marginBottom: 26 }}>Getting There</p>
          <h1 className="serif reveal reveal-delay-1" style={{ fontSize: 'clamp(52px, 8vw, 104px)', margin: 0, fontWeight: 300, lineHeight: 1.02 }}>
            Plan your <em style={{ fontWeight: 300 }}>passage</em>
          </h1>
          <p className="reveal reveal-delay-2" style={{ maxWidth: 560, margin: '30px auto 0', fontSize: 16, lineHeight: 1.8, color: 'var(--umber)' }}>
            The celebration is in the hills of Umbria, in central Italy&rsquo;s green
            heart. Here&rsquo;s how to reach us, where you&rsquo;ll rest your head,
            and what&rsquo;s worth seeing along the way.
          </p>
        </div>
      </div>

      {/* Accommodations lookup */}
      <div id="stay" className="container-narrow" style={{ padding: '110px 32px 20px' }}>
        <div className="reveal" style={{ background: 'var(--parchment)', border: '0.5px solid var(--hairline)', padding: 'clamp(40px, 6vw, 72px)' }}>
          <p className="micro" style={{ marginBottom: 18 }}>Accommodations</p>
          <h2 className="serif" style={{ fontSize: 'clamp(34px, 4.4vw, 52px)', margin: 0, fontWeight: 300, fontStyle: 'italic', lineHeight: 1.05 }}>
            Where you&rsquo;re staying
          </h2>
          <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.8, color: 'var(--umber)', maxWidth: 560 }}>
            We&rsquo;ve arranged a room for every guest &mdash; some at the villa
            itself, others at a lovely hotel nearby. Enter the code from your
            invitation to see exactly where you&rsquo;ll be, and for how long.
          </p>

          {accomState !== 'found' && (
            <div style={{ marginTop: 40, maxWidth: 460 }}>
              <label style={{ display: 'block' }}>
                <span className="micro" style={{ display: 'block', marginBottom: 12 }}>Invitation code</span>
                <input
                  type="text"
                  value={accomCode}
                  onChange={(e) => { setAccomCode(e.target.value); setAccomState('idle'); }}
                  onKeyDown={(e) => e.key === 'Enter' && lookupCode()}
                  placeholder="Enter your code"
                  style={{
                    width: '100%',
                    padding: '14px 0',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '0.5px solid var(--hairline)',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 24,
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: 'var(--espresso)',
                    outline: 'none',
                  }}
                />
              </label>
              {accomState === 'not_found' && (
                <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.6, color: '#9B3A3A' }}>
                  Code not found — double-check your invitation and try again.
                </p>
              )}
              {accomState === 'error' && (
                <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.6, color: '#9B3A3A' }}>
                  Something went wrong — please try again.
                </p>
              )}
              <button
                onClick={lookupCode}
                disabled={accomState === 'loading' || !accomCode.trim()}
                className="small-caps"
                style={{
                  marginTop: 26,
                  background: 'var(--espresso)',
                  color: 'var(--parchment)',
                  border: 'none',
                  padding: '14px 32px',
                  letterSpacing: '0.28em',
                  opacity: (accomState === 'loading' || !accomCode.trim()) ? 0.5 : 1,
                  cursor: (accomState === 'loading' || !accomCode.trim()) ? 'not-allowed' : 'pointer',
                }}
              >
                {accomState === 'loading' ? 'Looking up…' : 'Look up →'}
              </button>
            </div>
          )}

          {accomState === 'found' && accomData && (
            <div style={{ marginTop: 40 }}>
              <div style={{ padding: '32px 0', borderTop: '0.5px solid var(--hairline)', borderBottom: '0.5px solid var(--hairline)' }}>
                <p className="micro" style={{ marginBottom: 10 }}>
                  {accomData.accommodation_type === 'villa' ? 'Villa · SPAO' : 'Hotel'}
                </p>
                <p className="serif-italic" style={{ fontSize: 30, margin: 0, color: 'var(--espresso)', lineHeight: 1.2 }}>
                  {accomData.property_name}
                </p>
                {accomData.room_detail && (
                  <p className="small-caps" style={{ marginTop: 8, color: 'var(--umber)', fontSize: 11 }}>
                    {accomData.room_detail}
                  </p>
                )}
                {(accomData.check_in || accomData.check_out) && (
                  <p style={{ marginTop: 16, fontSize: 14, color: 'var(--umber)', lineHeight: 1.6 }}>
                    {accomData.check_in && (
                      <>Check-in: <strong style={{ color: 'var(--espresso)', fontWeight: 500 }}>{accomData.check_in}</strong></>
                    )}
                    {accomData.check_in && accomData.check_out && ' · '}
                    {accomData.check_out && (
                      <>Check-out: <strong style={{ color: 'var(--espresso)', fontWeight: 500 }}>{accomData.check_out}</strong></>
                    )}
                  </p>
                )}
                {accomData.notes && (
                  <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.75, color: 'var(--umber)' }}>
                    {accomData.notes}
                  </p>
                )}
              </div>
              {accomData.booking_url && (
                <a
                  href={accomData.booking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="small-caps"
                  style={{ display: 'inline-block', marginTop: 24, borderBottom: '0.5px solid var(--travertine)', paddingBottom: 6 }}
                >
                  Booking details →
                </a>
              )}
              <button
                onClick={() => { setAccomState('idle'); setAccomCode(''); setAccomData(null); }}
                className="small-caps"
                style={{
                  display: 'block',
                  marginTop: accomData.booking_url ? 14 : 24,
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--umber)',
                  letterSpacing: '0.2em',
                  padding: 0,
                  cursor: 'pointer',
                  fontSize: 10,
                }}
              >
                Use a different code
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Getting to the villa */}
      <div className="container-narrow" style={{ padding: '90px 32px 20px' }}>
        <div style={{ marginBottom: 12 }}>
          <p className="micro reveal" style={{ marginBottom: 16 }}>The Journey</p>
          <h2 className="serif reveal reveal-delay-1" style={{ fontSize: 'clamp(30px, 3.6vw, 44px)', margin: 0, fontWeight: 300, fontStyle: 'italic' }}>
            Finding the villa
          </h2>
          <p className="reveal reveal-delay-2" style={{ marginTop: 20, fontSize: 16, lineHeight: 1.8, color: 'var(--umber)', maxWidth: 580 }}>
            However you come, the last stretch is the loveliest &mdash; cypress-lined
            roads climbing into the Umbrian hills. Four ways to reach us:
          </p>
        </div>
        <div style={{ marginTop: 30 }}>
          {modes.map((m, i) => (
            <div
              key={m.k}
              className="mode-row reveal"
              style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                gap: 32,
                padding: '30px 0',
                borderTop: '0.5px solid var(--hairline)',
                borderBottom: i === modes.length - 1 ? '0.5px solid var(--hairline)' : 'none',
              }}
            >
              <div className="mode-head">
                <p className="micro" style={{ color: 'var(--travertine)', marginBottom: 8 }}>{m.k}</p>
                <p className="serif-italic" style={{ fontSize: 22, margin: 0, color: 'var(--espresso)', lineHeight: 1.2 }}>{m.v}</p>
              </div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: 'var(--umber)' }}>{m.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Worth a detour */}
      <div className="container-narrow" style={{ padding: '90px 32px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="micro reveal" style={{ marginBottom: 16 }}>While You&rsquo;re Here</p>
          <h2 className="serif reveal reveal-delay-1" style={{ fontSize: 'clamp(30px, 3.6vw, 44px)', margin: 0, fontWeight: 300 }}>
            Worth a <em style={{ fontWeight: 300 }}>detour</em>
          </h2>
          <p className="reveal reveal-delay-2" style={{ maxWidth: 520, margin: '20px auto 0', fontSize: 15, lineHeight: 1.75, color: 'var(--umber)' }}>
            Umbria and neighbouring Tuscany reward a longer stay. A few favourites
            within an easy drive:
          </p>
        </div>
        <div className="nearby-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {nearby.map((n) => (
            <div key={n.name} className="reveal" style={{ background: 'var(--parchment)', border: '0.5px solid var(--hairline)', padding: '36px 32px 40px' }}>
              <h3 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 300, fontStyle: 'italic' }}>{n.name}</h3>
              <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.75, color: 'var(--umber)' }}>{n.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing note */}
      <div style={{ background: 'var(--espresso)', color: 'var(--parchment)', padding: '110px 0', textAlign: 'center' }}>
        <div className="container-narrow">
          <p className="micro reveal" style={{ color: 'rgba(245,240,232,0.6)', marginBottom: 22 }}>Still planning</p>
          <h2 className="serif reveal reveal-delay-1" style={{ fontSize: 'clamp(30px, 4vw, 46px)', margin: 0, fontWeight: 300, color: 'var(--parchment)', lineHeight: 1.15 }}>
            Visas, driving, money and <em style={{ fontWeight: 300 }}>more</em>
          </h2>
          <p className="reveal reveal-delay-2" style={{ marginTop: 24, maxWidth: 520, margin: '24px auto 0', fontSize: 15, lineHeight: 1.8, color: 'rgba(245,240,232,0.72)' }}>
            Car rentals, tipping, plug types, phone data and the little Italian customs
            worth knowing &mdash; the full guide lives in the FAQ.
          </p>
          <a href="/faq/" className="small-caps reveal reveal-delay-3" style={{ display: 'inline-block', marginTop: 40, color: 'var(--parchment)', borderBottom: '0.5px solid var(--gold)', paddingBottom: 6 }}>
            Read the guest guide &rarr;
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .mode-head { margin-bottom: 4px; }
          .mode-row { grid-template-columns: 1fr !important; gap: 12px !important; }
          .nearby-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   RSVPModal — elegant form with multi-step feel
─────────────────────────────────────────────────────────────────*/
function RSVPModal({ open, onClose }) {
  const [step, setStep] = useState2(0);
  const [data, setData] = useState2({
    name: '', email: '', party: 1, attending: null,
    diet: [], song: '', message: '',
  });
  const [submitted, setSubmitted] = useState2(false);
  const [submitting, setSubmitting] = useState2(false);
  const [submitError, setSubmitError] = useState2(null);

  useEffect2(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect2(() => {
    if (open) {
      setStep(0);
      setSubmitted(false);
      setSubmitError(null);
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

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());
  const step0Valid = data.name.trim() && emailValid && data.attending;

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(
        'https://yiuglondgjbgyqfoqunz.supabase.co/rest/v1/rsvps',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'sb_publishable_ot6gkuv71siQwCe6dd4A0A_1ANgCQi2',
            'Authorization': 'Bearer sb_publishable_ot6gkuv71siQwCe6dd4A0A_1ANgCQi2',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email.trim(),
            party_size: data.party,
            attending: data.attending,
            diet: data.diet,
            song: data.song || null,
            message: data.message || null,
          }),
        }
      );
      if (!res.ok) throw new Error(`${res.status}`);
      setSubmitted(true);
    } catch (err) {
      setSubmitError('Something went wrong — please try again or email samanthaanddevin2027@gmail.com.');
    } finally {
      setSubmitting(false);
    }
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
            <Monogram style="S & D" size={56} />
            <p className="serif-italic" style={{ fontSize: 36, marginTop: 36, marginBottom: 18, lineHeight: 1.2 }}>
              {data.attending === 'yes' ? 'We can\u2019t wait to see you.' : 'We\u2019ll miss you dearly.'}
            </p>
            <p style={{ color: 'var(--umber)', fontSize: 15, lineHeight: 1.7, maxWidth: 380, margin: '0 auto' }}>
              {data.attending === 'yes'
                ? 'A confirmation is on its way to your inbox. Pack linen.'
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
              <p className="micro" style={{ marginBottom: 14 }}>RSVP</p>
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
                <Field label="Email address">
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setField('email', e.target.value)}
                    placeholder="So we can send your confirmation"
                    autoComplete="email"
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
                    disabled={!step0Valid}
                    onClick={() => setStep(data.attending === 'yes' ? 1 : 2)}
                    className="small-caps"
                    style={{
                      background: 'var(--espresso)', color: 'var(--parchment)',
                      border: 'none', padding: '14px 32px',
                      letterSpacing: '0.28em',
                      opacity: !step0Valid ? 0.4 : 1,
                      cursor: !step0Valid ? 'not-allowed' : 'pointer',
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
                {submitError && (
                  <p style={{ color: '#9B3A3A', fontSize: 13, lineHeight: 1.6, margin: '0 0 4px' }}>
                    {submitError}
                  </p>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  <button
                    onClick={() => setStep(data.attending === 'yes' ? 1 : 0)}
                    className="small-caps"
                    style={{ background: 'transparent', border: 'none', color: 'var(--umber)', letterSpacing: '0.2em' }}
                    disabled={submitting}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={submit}
                    className="small-caps"
                    disabled={submitting}
                    style={{
                      background: 'var(--gold)', color: 'var(--espresso)',
                      border: 'none', padding: '14px 32px',
                      letterSpacing: '0.28em',
                      opacity: submitting ? 0.6 : 1,
                      cursor: submitting ? 'wait' : 'pointer',
                    }}
                  >
                    {submitting ? 'Sending…' : 'Send reply'}
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
              SPAO, Umbria
            </p>
          </div>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 28, flexWrap: 'wrap', gap: 18,
        }}>
          <span className="micro" style={{ color: 'var(--umber)' }}>
            With love from S &amp; D
          </span>
          <span className="micro" style={{ color: 'var(--umber)' }}>
            Questions? samanthaanddevin2027@gmail.com
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
  RSVPModal,
  Footer,
  MonogramWatermark,
});
