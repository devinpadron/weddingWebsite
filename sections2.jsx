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
            Quattro <em style={{ fontWeight: 300 }}>giornate</em>
          </h1>
          <p className="reveal reveal-delay-2" style={{ maxWidth: 560, margin: '30px auto 0', fontSize: 16, lineHeight: 1.8, color: 'var(--umber)' }}>
            A fresco is painted one <em>giornata</em> at a time &mdash; the patch of
            fresh plaster a painter can finish before it dries. A day&rsquo;s work,
            then another. Ours takes four.
          </p>
          <div className="reveal reveal-delay-3" style={{ marginTop: 44, display: 'inline-flex', alignItems: 'center', gap: 18 }}>
            <span style={{ width: 40, height: 0.5, background: 'var(--travertine)' }}></span>
            <span className="small-caps" style={{ color: 'var(--umber)' }}>1 &mdash; 4 June 2027 &middot; SPAO, Umbria</span>
            <span style={{ width: 40, height: 0.5, background: 'var(--travertine)' }}></span>
          </div>
        </div>
      </div>

      {/* Four patches of plaster, each cut by hand (see .giornata in site.css) */}
      <div className="giornate">
      <div className="container-narrow" style={{ padding: '40px 32px 60px' }}>
        {days.map((d) => (
          <article
            key={d.num}
            className="day-row giornata reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
              gap: 48,
            }}
          >
            <aside className="day-aside">
              <p className="micro" style={{ color: 'var(--travertine)', marginBottom: 14 }}>Giornata</p>
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
          .day-row { grid-template-columns: 1fr !important; gap: 24px !important; }
          .day-aside { display: flex; align-items: baseline; flex-wrap: wrap; gap: 16px; }
          .day-aside > p:first-child { width: 100%; margin-bottom: 0; }
          .day-aside > div:last-child { display: flex !important; gap: 28px; margin-top: 8px !important; }
        }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   ChalkMap — central Italy in red chalk; the A1 draws itself in,
   then the last climb from Orvieto to the villa.
   Projection: x = (lon − 11.0) · 147, y = (44.0 − lat) · 200
─────────────────────────────────────────────────────────────────*/
function ChalkMap() {
  // Italy in chalk (Natural Earth 50m, simplified). Equirectangular, x = (lon − 6.6)·0.734·44, y = (47.1 − lat)·44.
  const towns = [
    { n: 'Florence',  x: 152.2, y: 148.5, dx: 2.2,  dy: 1.2,  d: 0.2 },
    { n: 'Perugia',   x: 189.0, y: 177.6, dx: 2.2,  dy: 1.2,  d: 0.9 },
    { n: 'Orvieto',   x: 180.0, y: 194.7, dx: 2.2,  dy: 3.2,  d: 1.2 },
    { n: 'Rome',      x: 192.2, y: 230.8, dx: 2.2,  dy: 1.2,  d: 1.8 },
    { n: 'Fiumicino', x: 184.1, y: 235.2, dx: -2.2, dy: 3.6,  d: 2.0, end: true },
  ];
  return (
    <figure className="chalk-map reveal" aria-label="Chalk map of Italy showing the route from Florence and Rome to the villa">
      <svg viewBox="0 0 392 466" role="img">
        <defs>
          <filter id="chalk" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="1.6" />
          </filter>
          <filter id="chalk-fine" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="0.9" />
          </filter>
        </defs>
        {/* Everything but the compass zooms into Umbria once the coast is drawn (site.css .map-zoom) */}
        <g className="map-zoom">
        <g className="italy" filter="url(#chalk)" fill="none" strokeLinejoin="round">
          <path className="route italy-coast" pathLength="1" d="M15.6 53.7 L19.1 55.7 L32.3 51.4 L40.4 53.8 L47.0 49.7 L51.3 43.3 L50.3 38.5 L59.2 30.8 L60.9 30.8 L62.0 39.6 L67.9 45.5 L73.7 47.0 L72.3 50.6 L78.0 57.9 L80.3 57.2 L79.6 49.7 L87.6 37.8 L87.9 29.5 L89.3 28.6 L93.3 29.2 L96.6 36.9 L100.2 37.4 L109.8 34.5 L114.4 40.4 L116.5 39.2 L113.0 29.1 L114.6 24.0 L118.1 23.1 L120.6 25.5 L125.7 26.2 L124.7 21.1 L126.4 12.3 L134.1 13.2 L138.6 16.3 L143.9 16.2 L148.4 9.2 L152.0 7.5 L169.2 7.0 L181.9 2.8 L182.9 3.7 L180.6 7.1 L181.4 9.2 L188.9 19.5 L214.1 25.2 L231.3 27.5 L230.6 30.0 L221.6 36.4 L220.9 38.9 L222.3 41.1 L229.1 42.6 L224.4 48.7 L224.4 51.0 L228.1 51.3 L227.5 58.7 L232.0 60.9 L236.9 67.3 L231.9 68.5 L234.0 66.8 L229.0 60.5 L226.7 60.5 L223.7 63.2 L215.4 60.5 L209.7 66.3 L192.5 74.1 L190.4 73.8 L193.7 70.4 L192.3 70.4 L185.3 74.8 L183.7 83.8 L185.6 85.3 L189.1 92.6 L193.3 95.8 L191.4 101.2 L188.8 103.3 L185.4 101.8 L184.4 106.6 L186.2 119.5 L189.2 128.5 L198.7 138.6 L205.7 141.9 L218.2 152.2 L226.9 157.3 L234.7 174.5 L241.3 196.1 L246.9 204.1 L258.5 215.7 L269.0 224.1 L278.7 229.3 L286.4 230.2 L304.4 229.1 L310.9 231.0 L311.7 234.6 L310.5 237.0 L302.8 243.1 L302.4 247.9 L306.0 251.2 L323.4 260.2 L341.2 267.7 L353.2 277.4 L368.7 285.6 L380.8 298.1 L385.1 304.7 L385.9 309.8 L381.3 322.3 L372.7 317.2 L365.8 302.1 L350.7 299.4 L346.2 296.8 L343.7 292.3 L338.9 291.8 L335.6 294.2 L327.2 308.4 L322.7 320.6 L322.4 325.5 L324.9 330.3 L332.2 333.0 L341.6 341.7 L341.8 352.4 L343.5 358.5 L341.1 361.9 L336.3 361.0 L330.0 363.3 L325.5 367.2 L323.6 370.9 L323.2 384.4 L314.7 391.4 L307.4 405.0 L296.7 405.1 L294.1 400.9 L294.1 394.7 L295.9 390.9 L299.8 389.1 L302.5 381.1 L301.7 375.4 L304.7 371.0 L311.9 369.0 L312.4 361.0 L309.1 357.4 L306.3 342.8 L295.7 314.8 L292.2 312.1 L282.8 311.3 L271.7 303.9 L271.0 300.8 L272.8 297.8 L271.6 293.7 L268.1 286.7 L265.7 285.0 L252.0 288.1 L255.9 282.3 L251.0 278.6 L242.4 278.7 L242.5 276.1 L236.5 264.7 L232.4 260.0 L226.6 260.2 L216.7 257.7 L211.6 259.7 L203.8 252.4 L196.8 249.7 L178.8 229.0 L170.2 222.8 L164.7 213.7 L153.7 207.8 L148.7 209.2 L147.4 208.1 L150.1 206.3 L149.5 202.9 L142.1 193.9 L137.7 191.0 L134.7 185.2 L128.4 183.8 L128.6 173.4 L126.3 166.1 L122.2 159.8 L119.7 144.9 L117.9 140.7 L113.3 137.5 L103.1 133.9 L88.9 124.4 L71.9 119.8 L65.0 123.2 L47.4 143.8 L30.8 148.6 L30.5 144.3 L36.8 134.7 L35.5 131.1 L25.2 132.3 L11.7 123.6 L9.8 115.9 L13.6 108.6 L15.9 106.9 L14.7 102.0 L6.5 97.9 L3.1 91.4 L2.9 89.2 L5.0 88.1 L9.8 88.4 L17.4 83.8 L19.6 77.6 L8.2 61.8 L8.6 58.6 L15.6 53.7Z M291.9 392.7 L280.9 411.9 L276.5 426.2 L277.1 431.7 L280.7 435.6 L278.9 437.2 L282.8 444.0 L282.8 445.8 L277.0 453.5 L276.9 460.1 L269.7 458.6 L266.1 459.1 L257.2 455.3 L252.9 447.6 L249.4 444.4 L245.6 441.8 L237.9 442.0 L234.6 440.4 L220.4 431.1 L214.2 425.3 L206.2 421.3 L197.1 420.2 L193.4 416.9 L190.5 410.3 L194.1 400.1 L200.1 394.3 L205.6 400.9 L210.3 398.7 L210.5 396.6 L213.9 394.0 L218.1 394.0 L230.7 402.4 L234.2 403.2 L242.6 400.6 L250.3 401.7 L257.3 400.4 L266.5 395.1 L277.1 395.7 L289.4 389.6 L293.8 390.6 L291.9 392.7Z M99.9 275.6 L105.5 292.4 L100.3 302.6 L102.3 313.7 L97.7 351.1 L95.2 352.3 L88.0 348.9 L84.3 349.7 L81.3 347.9 L80.2 356.5 L78.4 360.0 L75.7 362.2 L68.2 361.6 L60.7 349.3 L60.1 337.2 L61.7 333.6 L61.8 326.6 L62.4 325.5 L64.7 326.2 L64.9 321.5 L63.2 318.9 L60.4 318.0 L62.4 301.5 L58.6 292.4 L53.3 285.7 L54.5 274.2 L58.9 277.2 L65.7 277.0 L73.7 272.6 L86.9 259.1 L88.7 261.5 L94.2 263.8 L99.4 269.6 L97.4 273.4 L99.9 275.6Z" />
        </g>
        <g className="town sea" style={{ '--d': '1.4s' }}>
          <text x="173.2" y="332.0" textAnchor="middle">Tyrrhenian Sea</text>
          <text x="286.2" y="164.8" textAnchor="middle">Adriatic Sea</text>
        </g>
        <g filter="url(#chalk-fine)" fill="none" stroke="var(--sinopia)" strokeLinecap="round" strokeLinejoin="round">
          {/* A1: Florence → Arezzo → Orvieto → Rome → Fiumicino */}
          <path className="route" pathLength="1" strokeWidth="0.42" d="M152.2 148.5 C155.6 150.8 167.9 154.5 172.5 162.2 C177.2 169.9 176.7 183.3 180.0 194.7 C183.2 206.2 191.5 224.1 192.2 230.8 C192.9 237.5 185.5 234.5 184.1 235.2" />
          {/* the last climb */}
          <path className="route route-last" pathLength="1" strokeWidth="0.75" d="M180.0 194.7 L175.8 190.3" />
        </g>
        {towns.map((t) => (
          <g key={t.n} className="town" style={{ '--d': `${t.d + 3.9}s` }}>
            <circle cx={t.x} cy={t.y} r="0.75" fill="var(--sinopia)" />
            <text x={t.x + t.dx} y={t.y + t.dy} textAnchor={t.end ? 'end' : 'start'}>{t.n}</text>
          </g>
        ))}
        {/* SPAO: a mark and a leader out to open sea for the label */}
        <g className="town" style={{ '--d': '6.9s' }}>
          <path d="M172.8 187.3 l2 2 M174.8 187.3 l-2 2" stroke="var(--sinopia)" strokeWidth="0.5" strokeLinecap="round" />
          <path d="M172.2 187.8 L158 182.5" stroke="var(--sinopia)" strokeWidth=".2" fill="none" />
          <text className="spao-label" x="156.8" y="183.6" textAnchor="end">SPAO</text>
        </g>
        </g>
        {/* north */}
        <g className="town" style={{ '--d': '0s' }} stroke="var(--umber)" strokeWidth="0.6" fill="none">
          <path d="M368 46 v-22 M364 30 l4 -6 4 6" />
          <text x="368" y="58" textAnchor="middle" fill="var(--umber)" stroke="none" style={{ fontStyle: 'normal', fontSize: 9 }}>N</text>
        </g>
      </svg>
      <figcaption>Florence and Rome sit at either end of the A1.<br />Leave it at Orvieto and climb.</figcaption>
    </figure>
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
        <div className="journey-grid" style={{ marginTop: 30 }}>
        <div>
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
        <ChalkMap />
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
