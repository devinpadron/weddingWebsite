// Wedding homepage — additional sections (schedule, travel, RSVP, footer)

const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

/* ────────────────────────────────────────────────────────────────
   ScheduleSection — three days, plus the morning everyone leaves
─────────────────────────────────────────────────────────────────*/
function ScheduleSection() {
  const ref = useReveal();
  const days = [
    {
      num: 'I', day: 'Tuesday', date: 'June 1st',
      title: 'Arrival & Welcome Party',
      subtitle: 'Evening in La Piazza',
      time: 'Timing TBD',
      checkIn: '2–7pm',
      checkInNote: 'Staying on site? Please try your absolute best to arrive in that window.',
      attire: 'Italian Summer Whites',
      attireDetail: 'Cocktail attire: chic white cocktail dresses, matching sets, white button-downs, light fabrics and linens.',
      note: 'Drop your bags, get settled, and meet us on site for drinks, food, and to see everyone you’ll be spending the next few days with.',
    },
    {
      num: 'II', day: 'Wednesday', date: 'June 2nd',
      title: 'The Wedding',
      time: 'Timing TBD',
      attire: 'Black Tie',
      attireDetail: 'Women: colorful dresses.',
      note: 'The day itself. The ceremony at the villa, then drinks, dinner, and dancing until late.',
      featured: true,
    },
    {
      num: 'III', day: 'Thursday', date: 'June 3rd',
      title: 'Rest & Recovery',
      time: 'Timing TBD',
      attire: 'Poolside Chic',
      attireDetail: 'Come ready for an afternoon by the pool with some summer Italian style.',
      note: 'A late BBQ lunch and drinks by the pool.',
    },
    {
      // Not one of the three days: the morning everyone heads home.
      departure: true, day: 'Friday', date: 'June 4th',
      title: 'Goodbye Breakfast',
      time: 'Check-out 11:00am',
      attire: 'Casual', // TODO: confirm departure-morning attire with Sam
      note: 'For everyone staying on the property. Check-out is at 11:00am.',
    },
  ];

  return (
    <section id="schedule" ref={ref} style={{ background: 'var(--parchment)' }}>
      {/* Header band */}
      <div style={{ background: 'var(--parchment-deep)', borderBottom: '0.5px solid var(--hairline)', padding: '150px 0 96px', textAlign: 'center' }}>
        <div className="container-narrow">
          <p className="micro reveal" style={{ marginBottom: 26 }}>The Week</p>
          <h1 className="serif reveal reveal-delay-1" style={{ fontSize: 'clamp(52px, 8vw, 104px)', margin: 0, fontWeight: 300, lineHeight: 1.02 }}>
            Three <em style={{ fontWeight: 300 }}>days</em>
          </h1>
          <p className="reveal reveal-delay-2" style={{ maxWidth: 560, margin: '30px auto 0', fontSize: 16, lineHeight: 1.8, color: 'var(--umber)' }}>
            Here&rsquo;s what&rsquo;s happening and when. Exact times are still being
            finalized, and we&rsquo;ll update this page as they&rsquo;re confirmed.
          </p>
          <div className="reveal reveal-delay-3" style={{ marginTop: 44, display: 'inline-flex', alignItems: 'center', gap: 18 }}>
            <span style={{ width: 40, height: 0.5, background: 'var(--travertine)' }}></span>
            <span className="small-caps" style={{ color: 'var(--umber)' }}>June 1–4, 2027 &middot; San Pietro Aquaeortus, Umbria</span>
            <span style={{ width: 40, height: 0.5, background: 'var(--travertine)' }}></span>
          </div>
        </div>
      </div>

      {/* Patches of plaster, each cut by hand (see .giornata in site.css) */}
      <div className="giornate">
      <div className="container-narrow" style={{ padding: '40px 32px 60px' }}>
        {days.map((d) => (
          <article
            key={d.date}
            className="day-row giornata reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
              gap: 48,
            }}
          >
            <aside className="day-aside">
              <p className="micro" style={{ color: 'var(--travertine)', marginBottom: 14 }}>{d.departure ? 'Departure' : 'Day'}</p>
              {d.num && (
                <div className="serif" style={{ fontSize: 84, fontStyle: 'italic', lineHeight: 0.9, color: d.featured ? 'var(--espresso)' : 'var(--travertine)', fontWeight: 300 }}>
                  {d.num}
                </div>
              )}
              <p className="serif-italic" style={{ fontSize: 24, margin: d.num ? '18px 0 0' : 0, color: 'var(--espresso)' }}>{d.day}</p>
              <p className="micro" style={{ marginTop: 6 }}>{d.date}</p>
            </aside>

            <div className="day-body">
              {d.featured && (
                <span className="small-caps" style={{ display: 'inline-block', marginBottom: 18, padding: '6px 16px', background: 'rgba(200, 184, 154, 0.28)', color: 'var(--espresso)', letterSpacing: '0.24em' }}>
                  The main event
                </span>
              )}
              <h2 className="serif" style={{ fontSize: d.departure ? 'clamp(28px, 3.2vw, 36px)' : 'clamp(34px, 4vw, 48px)', margin: 0, fontWeight: 300, lineHeight: 1.1, textWrap: 'balance' }}>
                {d.title}
              </h2>
              {d.subtitle && (
                <p className="serif-italic" style={{ fontSize: 24, margin: '10px 0 0', color: 'var(--umber)' }}>{d.subtitle}</p>
              )}

              {/* The practical details, right under the title where nobody can miss them */}
              <dl className="day-strip">
                <div>
                  <dt className="micro">Time</dt>
                  <dd>{d.time}</dd>
                </div>
                {d.checkIn && (
                  <div>
                    <dt className="micro">Check-in</dt>
                    <dd>{d.checkIn}<span>{d.checkInNote}</span></dd>
                  </div>
                )}
                <div>
                  <dt className="micro">Attire</dt>
                  <dd>{d.attire}{!d.departure && <span>Outfit mood board to come</span>}</dd>
                </div>
              </dl>

              <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.85, color: 'var(--umber)', maxWidth: 540 }}>
                {d.note}
              </p>
              {d.attireDetail && (
                <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.8, color: 'var(--umber)', maxWidth: 540 }}>
                  <strong style={{ fontWeight: 500, color: 'var(--espresso)' }}>What to wear. </strong>{d.attireDetail}
                </p>
              )}
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
            Hot days, <em style={{ fontWeight: 300 }}>cooler evenings</em>
          </h2>
          <p className="reveal reveal-delay-2" style={{ marginTop: 24, maxWidth: 520, margin: '24px auto 0', fontSize: 15, lineHeight: 1.8, color: 'rgba(245,240,232,0.72)' }}>
            Early June in Umbria is sunny and hot, and it cools off after dark.
            Much of the week is on stone and garden paths, so bring block heels or
            flats rather than stilettos, and a light layer for the evenings.
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
          .day-aside > p { margin-top: 0 !important; }
          .day-strip > div { grid-template-columns: 1fr !important; gap: 4px !important; }
        }
        .day-strip { margin: 24px 0 0; max-width: 540px; border: 0.5px solid var(--hairline); background: rgba(200, 184, 154, 0.16); }
        .day-strip > div { display: grid; grid-template-columns: 104px 1fr; gap: 16px; align-items: baseline; padding: 14px 20px; }
        .day-strip > div + div { border-top: 0.5px solid var(--hairline-soft); }
        .day-strip dt { margin: 0; }
        .day-strip dd { margin: 0; font-size: 17px; line-height: 1.4; font-weight: 400; color: var(--espresso); }
        .day-strip dd span { display: block; margin-top: 4px; font-size: 13px; line-height: 1.6; font-weight: 300; color: var(--umber); }
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
    { n: 'Fabro',     x: 177.4, y: 186.4, dx: 2.4,  dy: -0.6, d: 1.1 },
    { n: 'Orvieto',   x: 180.0, y: 194.7, dx: 2.2,  dy: 3.2,  d: 1.3 },
    { n: 'Rome',      x: 192.2, y: 230.8, dx: 2.2,  dy: 1.2,  d: 1.8 },
    { n: 'Fiumicino', x: 184.1, y: 235.2, dx: -2.2, dy: 3.6,  d: 2.0, end: true },
  ];
  return (
    <figure className="chalk-map reveal" aria-label="Chalk map of Italy showing the route from Florence and Rome to Fabro and the villa">
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
          <path className="route route-last" pathLength="1" strokeWidth="0.75" d="M177.4 186.4 L174.6 187.9" />
        </g>
        {towns.map((t) => (
          <g key={t.n} className="town" style={{ '--d': `${t.d + 3.9}s` }}>
            <circle cx={t.x} cy={t.y} r="0.75" fill="var(--sinopia)" />
            <text x={t.x + t.dx} y={t.y + t.dy} textAnchor={t.end ? 'end' : 'start'}>{t.n}</text>
          </g>
        ))}
        {/* The villa: a mark and a leader out to open sea for the label */}
        <g className="town" style={{ '--d': '6.9s' }}>
          <path d="M172.8 187.3 l2 2 M174.8 187.3 l-2 2" stroke="var(--sinopia)" strokeWidth="0.5" strokeLinecap="round" />
          <path d="M172.2 187.8 L158 182.5" stroke="var(--sinopia)" strokeWidth=".2" fill="none" />
          <text className="spao-label" x="156.8" y="183.6" textAnchor="end">S. Pietro Aquaeortus</text>
        </g>
        </g>
        {/* north */}
        <g className="town" style={{ '--d': '0s' }} stroke="var(--umber)" strokeWidth="0.6" fill="none">
          <path d="M368 46 v-22 M364 30 l4 -6 4 6" />
          <text x="368" y="58" textAnchor="middle" fill="var(--umber)" stroke="none" style={{ fontStyle: 'normal', fontSize: 9 }}>N</text>
        </g>
      </svg>
      <figcaption>Florence and Rome sit at either end of the A1.<br />Leave it at Fabro; the villa is a short drive away.</figcaption>
    </figure>
  );
}

/* Shared by the Travel page; the FAQ carries the same words in plain HTML. */
function FonteverdeDirections() {
  const p = { margin: 0, fontSize: 15, lineHeight: 1.8, color: 'var(--umber)' };
  return (
    <>
      <p style={p}>
        Follow the same steps as everyone else as far as <strong style={{ fontWeight: 500, color: 'var(--espresso)' }}>Fabro-Ficulle</strong> station.
        From there, Fonteverde (Località Terme 1, San Casciano dei Bagni) is roughly a 20 to 30 minute drive, so book a taxi in advance
        or pick up a rental car at the airport.
      </p>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────
   TravelSection — how to reach the villa
─────────────────────────────────────────────────────────────────*/
const SB_URL = 'https://yiuglondgjbgyqfoqunz.supabase.co';
const SB_KEY = 'sb_publishable_ot6gkuv71siQwCe6dd4A0A_1ANgCQi2';
const sbHeaders = { 'Content-Type': 'application/json', 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY };

const AIRPORT = 'Rome Fiumicino Airport (FCO)';

function TravelSection() {
  const ref = useReveal();
  const [from, setFrom] = useState2('Rome');

  const B = ({ children }) => <strong style={{ fontWeight: 500, color: 'var(--espresso)' }}>{children}</strong>;
  const steps = [
    <>Fly into <B>{AIRPORT}</B>. Aim to land on Tuesday, June 1st or, better, a day or two before.</>,
    <>Follow the signs to the <B>train station</B> inside the airport.</>,
    <>Buy <B>one ticket</B>, directly from <B>Fiumicino Aeroporto</B> to <B>Fabro-Ficulle</B>. Use the Trenitalia app, trenitalia.com, or the machines in the station (they have an English option).</>,
    <>You might have to <B>change trains in Rome</B>, at either <B>Roma Termini</B> or <B>Roma Tiburtina</B>. Your ticket tells you which one.</>,
    <>Look for the <B>train number</B> on your ticket, then find that number on the departures board to see exactly which track (<em>binario</em>) it leaves from.</>,
    <>Get off at <B>Fabro-Ficulle</B>. Most apps will send you to Orvieto. Ignore them: Fabro-Ficulle is closer to the villa.</>,
    <>Take your <B>pre-booked taxi</B> from the station to the villa, a 15 to 20 minute drive. Taxis don&rsquo;t wait at the station, so book one of the drivers below in advance.</>,
  ];

  // Routes to Fabro-Ficulle by origin. Times are approximate; check Trenitalia before you book.
  const origins = {
    Rome: [
      ['From the airport', 'From ' + AIRPORT + ', buy one ticket from Fiumicino Aeroporto to Fabro-Ficulle. Depending on the train, you change in Rome at either Roma Termini or Roma Tiburtina. Allow about 3 hours in all.'],
      ['Rome to Fabro-Ficulle', 'From Roma Termini, a Regionale or Regionale Veloce toward Firenze or Chiusi stops at Fabro-Ficulle in about 1 hour 30, roughly €16 to €22. There are about 11 a day but they’re unevenly spaced, so check the timetable before you plan the connection.'],
      ['By car', 'About 140 km and 1 hour 30 from central Rome, or about 1 hour 40 from ' + AIRPORT + '. A1 north, exit Fabro.'],
    ],
    Naples: [
      ['Naples to Rome', 'Frecciarossa or Italo from Napoli Centrale to Roma Termini: about 1 hour 10. Book ahead for the best fares.'],
      ['Rome to Fabro-Ficulle', 'From Roma Termini, a Regionale toward Firenze or Chiusi stops at Fabro-Ficulle in about 1 hour 30. Allow 3.5 to 4 hours door to door.'],
      ['By car', 'About 340 km and 3 hours on the A1 north, exit Fabro.'],
    ],
    Florence: [
      ['Florence to Fabro-Ficulle', 'A direct Regionale from Firenze Santa Maria Novella to Fabro-Ficulle takes about 2 hours, with several a day and no change needed.'],
      ['By car', 'About 140 km and 1 hour 20 on the A1 south, exit Fabro.'],
    ],
  };

  const drivers = [
    ['Sandra Cassinadri', '+39 377 085 4964'],
    ['Taxi Orvieto NCC', '+39 370 318 1469'],
    ['Taxi Orvieto', '+39 349 729 2550'],
    ['Anelio Gennari', '+39 338 847 7349'],
    ['Giorgi', '+39 338 122 7823'],
  ];

  // Drive times from the villa (routing estimates; adjust if Google Maps disagrees).
  const nearby = [
    { name: 'Orvieto', drive: 'About a 35 minute drive', img: '', note: 'A cathedral town on a volcanic cliff. Gothic façade, caves underneath, and a crisp Orvieto Classico.' },
    { name: 'Perugia', drive: 'About a 1 hour 10 minute drive', img: '', note: 'Umbria’s capital. Medieval streets, a grand piazza, and very good chocolate.' },
    { name: 'Assisi', drive: 'About a 1 hour 35 minute drive', img: '', note: 'The hill town of St. Francis, all frescoes and valley views.' },
  ];

  // YouTube video IDs (the part after v= in the URL). Leave empty to hide the section.
  const videos = [];

  const h2 = { fontSize: 'clamp(30px, 3.6vw, 44px)', margin: 0, fontWeight: 300, fontStyle: 'italic' };

  return (
    <section id="travel" ref={ref} style={{ background: 'var(--parchment-deep)' }}>
      {/* Header band */}
      <div style={{ background: 'var(--parchment)', borderBottom: '0.5px solid var(--hairline)', padding: '150px 0 96px', textAlign: 'center' }}>
        <div className="container-narrow">
          <p className="micro reveal" style={{ marginBottom: 26 }}>Travel</p>
          <h1 className="serif reveal reveal-delay-1" style={{ fontSize: 'clamp(52px, 8vw, 104px)', margin: 0, fontWeight: 300, lineHeight: 1.02 }}>
            Getting <em style={{ fontWeight: 300 }}>there</em>
          </h1>
          <p className="reveal reveal-delay-2" style={{ maxWidth: 560, margin: '30px auto 0', fontSize: 16, lineHeight: 1.8, color: 'var(--umber)' }}>
            The villa is in the hills of Umbria, in central Italy. Fly to Rome,
            take the train to Fabro-Ficulle, and it&rsquo;s a short drive from there.
          </p>
        </div>
      </div>

      {/* Finding the villa */}
      <div className="container-narrow" style={{ padding: '100px 32px 20px' }}>
        <div style={{ marginBottom: 12 }}>
          <p className="micro reveal" style={{ marginBottom: 16 }}>The Journey</p>
          <h2 className="serif reveal reveal-delay-1" style={h2}>Finding the villa</h2>
        </div>
        <div className="journey-grid" style={{ marginTop: 30 }}>
        <div>
          <ol className="reveal" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {steps.map((step, i) => (
              <li
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '44px 1fr',
                  gap: 12,
                  alignItems: 'baseline',
                  padding: '20px 0',
                  borderTop: '0.5px solid var(--hairline)',
                  borderBottom: i === steps.length - 1 ? '0.5px solid var(--hairline)' : 'none',
                }}
              >
                <span className="serif-italic" style={{ fontSize: 30, lineHeight: 1, color: 'var(--travertine)' }}>{i + 1}</span>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.75, color: 'var(--umber)' }}>{step}</p>
              </li>
            ))}
          </ol>

          {/* Taxis & drivers */}
          <div className="reveal" style={{ marginTop: 40 }}>
            <p className="micro" style={{ marginBottom: 14 }}>Taxis &amp; drivers · Fabro-Ficulle to the villa</p>
            <p style={{ margin: '0 0 16px', fontSize: 15, lineHeight: 1.8, color: 'var(--umber)' }}>
              Taxis don&rsquo;t wait at the station, so book one in advance. Any of these can take you to the villa:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {drivers.map(([n, tel]) => (
                <li key={tel} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '12px 0', borderTop: '0.5px solid var(--hairline-soft)', fontSize: 15 }}>
                  <span style={{ color: 'var(--espresso)' }}>{n}</span>
                  <a href={'tel:' + tel.replace(/\s+/g, '')} className="small-caps" style={{ color: 'var(--umber)', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>{tel}</a>
                </li>
              ))}
            </ul>
            <p style={{ margin: '16px 0 0', fontSize: 14, lineHeight: 1.8, color: 'var(--umber)' }}>
              Prefer to drive? Hertz, Avis, Europcar, Sixt and Budget all have desks at {AIRPORT}. Book an automatic early; most rentals in Italy are manual.
            </p>
          </div>

          {/* Off-site guests */}
          <div className="reveal" style={{ marginTop: 40, padding: '26px 28px', background: 'var(--parchment)', border: '0.5px solid var(--hairline)' }}>
            <p className="micro" style={{ marginBottom: 12 }}>Staying at Fonteverde?</p>
            <FonteverdeDirections />
          </div>

          <a href="/faq/" className="small-caps reveal" style={{ display: 'inline-block', marginTop: 36, background: 'var(--espresso)', color: 'var(--parchment)', padding: '14px 32px', letterSpacing: '0.28em' }}>
            Here&rsquo;s more information &rarr;
          </a>
        </div>
        <ChalkMap />
        </div>
      </div>

      {/* Travelling from */}
      <div className="container-narrow" style={{ padding: '90px 32px 20px' }}>
        <p className="micro reveal" style={{ marginBottom: 16 }}>Travelling from</p>
        <h2 className="serif reveal reveal-delay-1" style={h2}>Rome, Naples or Florence</h2>
        <p className="reveal reveal-delay-2" style={{ marginTop: 20, fontSize: 15, lineHeight: 1.8, color: 'var(--umber)', maxWidth: 580 }}>
          Whichever city you start in, head for Fabro-Ficulle station. Times are approximate, so check Trenitalia before you book.
        </p>
        <div className="reveal" role="tablist" style={{ display: 'flex', gap: 8, marginTop: 28, flexWrap: 'wrap' }}>
          {Object.keys(origins).map((o) => (
            <button
              key={o}
              role="tab"
              aria-selected={from === o}
              onClick={() => setFrom(o)}
              className="small-caps"
              style={{
                padding: '12px 22px',
                background: from === o ? 'var(--espresso)' : 'transparent',
                color: from === o ? 'var(--parchment)' : 'var(--espresso)',
                border: '0.5px solid ' + (from === o ? 'var(--espresso)' : 'var(--hairline)'),
                letterSpacing: '0.2em',
                transition: 'all 0.2s',
              }}
            >
              {o}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 8, background: 'var(--parchment)', border: '0.5px solid var(--hairline)', padding: 'clamp(28px, 4vw, 44px)' }}>
          {origins[from].map(([h, d]) => (
            <div key={h} className="mode-row" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, padding: '20px 0', borderTop: '0.5px solid var(--hairline-soft)' }}>
              <p className="serif-italic mode-head" style={{ fontSize: 20, margin: 0, color: 'var(--espresso)', lineHeight: 1.25 }}>{h}</p>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: 'var(--umber)' }}>{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Videos */}
      {videos.length > 0 && (
        <div className="container-narrow" style={{ padding: '90px 32px 20px' }}>
          <p className="micro reveal" style={{ marginBottom: 16 }}>Watch</p>
          <h2 className="serif reveal reveal-delay-1" style={h2}>A few videos worth your time</h2>
          <div className="nearby-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 30 }}>
            {videos.map((id) => (
              <iframe key={id} src={'https://www.youtube-nocookie.com/embed/' + id} title="Travel video" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen style={{ width: '100%', aspectRatio: '16 / 9', border: '0.5px solid var(--hairline)', background: 'var(--parchment)' }}></iframe>
            ))}
          </div>
        </div>
      )}

      {/* Worth a detour */}
      <div className="container-narrow" style={{ padding: '90px 32px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="micro reveal" style={{ marginBottom: 16 }}>While You&rsquo;re Here</p>
          <h2 className="serif reveal reveal-delay-1" style={{ ...h2, fontStyle: 'normal' }}>
            Worth a <em style={{ fontWeight: 300 }}>detour</em>
          </h2>
          <p className="reveal reveal-delay-2" style={{ maxWidth: 520, margin: '20px auto 0', fontSize: 15, lineHeight: 1.75, color: 'var(--umber)' }}>
            Umbria and neighbouring Tuscany are worth a longer stay. A few favourites you can drive to:
          </p>
        </div>
        <div className="nearby-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {nearby.map((n) => (
            <div key={n.name} className="reveal" style={{ background: 'var(--parchment)', border: '0.5px solid var(--hairline)', padding: '0 0 40px', overflow: 'hidden' }}>
              {n.img
                ? <img src={n.img} alt={n.name} loading="lazy" style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }} />
                : <div className="ph" data-label={n.name + ' · photo to come'} style={{ aspectRatio: '4 / 3' }}></div>}
              <div style={{ padding: '28px 32px 0' }}>
                <h3 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 300, fontStyle: 'italic' }}>{n.name}</h3>
                <p className="small-caps" style={{ marginTop: 10, color: 'var(--espresso)', letterSpacing: '0.16em' }}>{n.drive}</p>
                <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.75, color: 'var(--umber)' }}>{n.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel questions (moved here from the FAQ) */}
      <div className="container-narrow" style={{ padding: '50px 32px 100px' }}>
        <div className="faq-section reveal">
          <p className="micro" style={{ marginBottom: 16 }}>Good to know</p>
          <h2>Travel questions</h2>

          <details className="qa">
            <summary>Which airport should I fly into?<span className="plus">+</span></summary>
            <div className="answer">
              <p><strong>{AIRPORT}</strong>. It&rsquo;s the closest large international airport, about 1 hour 40 from the villa by car or around 3 hours by train. <strong>Florence Airport (FLR)</strong> also works if you&rsquo;d like to start your trip there; it&rsquo;s about 2 hours away by direct train.</p>
            </div>
          </details>

          <details className="qa">
            <summary>Is there a shuttle?<span className="plus">+</span></summary>
            <div className="answer">
              <p>No. We aren&rsquo;t arranging group transport, so plan to reach the villa by train and taxi, or by rental car. The steps at the top of this page walk you through it.</p>
            </div>
          </details>

          <details className="qa">
            <summary>Do I need to rent a car?<span className="plus">+</span></summary>
            <div className="answer">
              <p>We aren&rsquo;t arranging group travel, so a car is the easiest way to come and go. If you do rent, get an <strong>International Driving Permit</strong> from AAA before you leave. It&rsquo;s super easy, costs about $20, and takes less than 30 minutes at a branch. Bring your licence and two passport photos. Book an automatic early, as most rentals in Italy are manual.</p>
              <p>If you don&rsquo;t rent a car, book a taxi from Fabro-Ficulle in advance. The numbers are above.</p>
            </div>
          </details>

          <details className="qa">
            <summary>Can I take the train?<span className="plus">+</span></summary>
            <div className="answer">
              <p>Yes, and we recommend it. Take the train to <strong>Fabro-Ficulle</strong> station, not Orvieto. Most apps will route you to Orvieto, but Fabro-Ficulle is closer to the villa and on the direct line from Rome and Florence.</p>
              <p>Trains in Italy are easy to understand once you know the basics. See <em>How do trains work in Italy?</em> below for best practices, and schedule a taxi from the station in advance.</p>
            </div>
          </details>

          <details className="qa">
            <summary>How far is the venue from Rome, Naples, Florence and Milan?<span className="plus">+</span></summary>
            <div className="answer">
              <p>Times are approximate. Train times are to Fabro-Ficulle station, plus a 15 to 20 minute drive to the villa.</p>
              <table className="dist">
                <tbody>
                  <tr><th>From</th><th>By train</th><th>By car</th></tr>
                  <tr><td>{AIRPORT}</td><td>About 3 hours, change at Roma Termini or Roma Tiburtina</td><td>About 1 hour 40</td></tr>
                  <tr><td>Rome (Termini)</td><td>About 1 hour 30, direct Regionale</td><td>About 1 hour 30 (140 km)</td></tr>
                  <tr><td>Naples</td><td>3.5 to 4 hours, change at Roma Termini</td><td>About 3 hours (340 km)</td></tr>
                  <tr><td>Florence</td><td>About 2 hours, direct Regionale</td><td>About 1 hour 20 (140 km)</td></tr>
                  <tr><td>Milan</td><td>4.5 to 5 hours, change at Florence</td><td>About 4 hours (440 km)</td></tr>
                </tbody>
              </table>
            </div>
          </details>

          <details className="qa">
            <summary>How do trains work in Italy?<span className="plus">+</span></summary>
            <div className="answer">
              <p><strong>Types of train.</strong> <span className="phrase">Frecciarossa</span> and <span className="phrase">Frecciargento</span> are Trenitalia&rsquo;s high-speed trains between big cities, and <span className="phrase">Italo</span> is a private company running similar ones. <span className="phrase">Intercity</span> trains are slower and cheaper. <span className="phrase">Regionale</span> and <span className="phrase">Regionale Veloce</span> are the local trains, and these are the ones that stop at Fabro-Ficulle.</p>
              <p><strong>Buying tickets.</strong> Use <span className="phrase">trenitalia.com</span> or the Trenitalia app, or the machines at any station (they have an English option). Italo sells its own tickets at <span className="phrase">italotreno.com</span>. High-speed tickets come with a reserved seat and get cheaper the earlier you book. Regional tickets are a fixed price, so you can buy them the same day.</p>
              <p><strong>Validating.</strong> If you buy a regional ticket in the app, it&rsquo;s tied to the train you chose and validates itself at departure. If the app shows a check-in prompt, tap it before you board. If you buy a <strong>paper</strong> regional ticket, you must stamp it in the small green and white machine on the platform before boarding, or you&rsquo;ll be fined.</p>
              <p><strong>At the station.</strong> Your platform (<span className="phrase">binario</span>) appears on the departures board, usually 10 to 15 minutes before the train leaves. Match the train number on your ticket to the board. On high-speed trains, find your carriage (<span className="phrase">carrozza</span>) number on the ticket. Keep your ticket handy; the conductor checks it on board.</p>
              <p><strong>Strikes.</strong> Train strikes (<span className="phrase">sciopero</span>) happen and are announced in advance. If you&rsquo;re travelling on a strike day, check Trenitalia for which trains still run.</p>
            </div>
          </details>
        </div>
      </div>

      {/* Closing note */}
      <div style={{ background: 'var(--espresso)', color: 'var(--parchment)', padding: '110px 0', textAlign: 'center' }}>
        <div className="container-narrow">
          <p className="micro reveal" style={{ color: 'rgba(245,240,232,0.6)', marginBottom: 22 }}>Still planning</p>
          <h2 className="serif reveal reveal-delay-1" style={{ fontSize: 'clamp(30px, 4vw, 46px)', margin: 0, fontWeight: 300, color: 'var(--parchment)', lineHeight: 1.15 }}>
            Answering all your <em style={{ fontWeight: 300 }}>burning questions</em>
          </h2>
          <p className="reveal reveal-delay-2" style={{ marginTop: 24, maxWidth: 520, margin: '24px auto 0', fontSize: 15, lineHeight: 1.8, color: 'rgba(245,240,232,0.72)' }}>
            Trains, driving, money, plugs, coffee, and everything else you might be wondering about. It&rsquo;s all in the FAQ.
          </p>
          <a href="/faq/" className="small-caps reveal reveal-delay-3" style={{ display: 'inline-block', marginTop: 40, color: 'var(--parchment)', borderBottom: '0.5px solid var(--gold)', paddingBottom: 6 }}>
            Read the FAQ &rarr;
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
   StaySection — invitation-code lookup: villa room, or Fonteverde
─────────────────────────────────────────────────────────────────*/
const ordinal = (n) => n + (n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th');
// "2027-06-01" → "Tuesday, June 1st"
const fmtDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-US', { weekday: 'long' }) + ', ' + d.toLocaleDateString('en-US', { month: 'long' }) + ' ' + ordinal(d.getDate());
};

const CONTACT_EMAIL = 'samanthaanddevin2027@gmail.com';
// Fonteverde 15% discount code. Leave empty until we have it; the page then says "coming soon".
const FONTEVERDE_CODE = '';

function CodeHelp({ style }) {
  return (
    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--umber)', ...style }}>
      If you can&rsquo;t find your code, please contact us at{' '}
      <a href={'mailto:' + CONTACT_EMAIL} style={{ color: 'var(--espresso)', borderBottom: '0.5px solid var(--travertine)' }}>{CONTACT_EMAIL}</a>
    </p>
  );
}

/* Room payment for on-site guests. The link is a Stripe Payment Link pasted in Admin. */
function RoomPayment({ data }) {
  if (!data.room_price && !data.payment_url) return null;
  const ref = String(data.code || '').replace(/[^A-Za-z0-9_-]/g, '');
  const href = data.payment_url
    ? data.payment_url + (data.payment_url.includes('?') ? '&' : '?') + 'client_reference_id=' + encodeURIComponent(ref)
    : null;
  return (
    <div style={{ marginTop: 36, padding: 'clamp(24px, 4vw, 36px)', border: '0.5px solid var(--hairline)', background: 'rgba(200, 184, 154, 0.16)' }}>
      <p className="micro" style={{ marginBottom: 10 }}>Your room at San Pietro Aquaeortus</p>
      {data.room_price && (
        <p className="serif-italic" style={{ fontSize: 34, margin: 0, color: 'var(--espresso)', lineHeight: 1.1 }}>{data.room_price}</p>
      )}
      {data.paid ? (
        <p style={{ margin: '14px 0 0', fontSize: 15, lineHeight: 1.7, color: 'var(--espresso)', fontWeight: 500 }}>Paid. Thank you!</p>
      ) : href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="small-caps" style={{ display: 'inline-block', marginTop: 20, background: 'var(--espresso)', color: 'var(--parchment)', padding: '14px 32px', letterSpacing: '0.28em' }}>
          Pay for your room &rarr;
        </a>
      ) : (
        <p style={{ margin: '14px 0 0', fontSize: 15, lineHeight: 1.7, color: 'var(--umber)' }}>Payment details are coming soon.</p>
      )}
      <p style={{ margin: '16px 0 0', fontSize: 13, lineHeight: 1.7, color: 'var(--umber)', maxWidth: 520 }}>
        This covers your stay for the wedding nights. Samantha &amp; Devin collect the payment and pay the villa on everyone&rsquo;s behalf.
      </p>
    </div>
  );
}

/* Passport photo upload for on-site guests: one file per person, sent to a private bucket. */
function PassportUpload({ code, received }) {
  const [names, setNames] = useState2(received || []);
  const [name, setName] = useState2('');
  const [file, setFile] = useState2(null);
  const [state, setState] = useState2('idle'); // idle | sending | done | error
  const [msg, setMsg] = useState2('');
  const fileRef = useRef2(null);

  const send = async () => {
    if (!name.trim() || !file) return;
    if (file.size > 10 * 1024 * 1024) { setState('error'); setMsg('That file is over 10 MB. Please choose a smaller photo.'); return; }
    setState('sending'); setMsg('');
    try {
      const body = new FormData();
      body.append('code', code);
      body.append('guest_name', name.trim());
      body.append('file', file);
      const res = await fetch(SB_URL + '/functions/v1/upload-passport', {
        method: 'POST', headers: { apikey: SB_KEY }, body,
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || 'Something went wrong, please try again.');
      setNames((n) => [...n, name.trim()]);
      setName(''); setFile(null);
      if (fileRef.current) fileRef.current.value = '';
      setState('done');
    } catch (e) { setState('error'); setMsg(e.message || 'Something went wrong, please try again.'); }
  };

  const busy = state === 'sending';
  const ready = name.trim() && file && !busy;
  return (
    <div style={{ marginTop: 36, paddingTop: 32, borderTop: '0.5px solid var(--hairline)' }}>
      <p className="micro" style={{ marginBottom: 10 }}>For the front desk</p>
      <h3 className="serif-italic" style={{ fontSize: 28, margin: 0, color: 'var(--espresso)', lineHeight: 1.15 }}>Passport information</h3>
      <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.8, color: 'var(--umber)', maxWidth: 560 }}>
        The villa&rsquo;s front desk needs passport information for every guest staying on site. Please upload a clear photo of the
        photo page of each person&rsquo;s passport, <strong style={{ fontWeight: 500, color: 'var(--espresso)' }}>one upload per person</strong>.
        It is stored privately and only shared with the front desk.
      </p>

      {names.length > 0 && (
        <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.7, color: 'var(--espresso)' }}>
          <strong style={{ fontWeight: 500 }}>Received: </strong>{names.join(', ')}
        </p>
      )}

      <div style={{ marginTop: 22, display: 'grid', gap: 20, maxWidth: 460 }}>
        <label style={{ display: 'block' }}>
          <span className="micro" style={{ display: 'block', marginBottom: 8 }}>Name on the passport</span>
          <input type="text" value={name} onChange={(e) => { setName(e.target.value); setState('idle'); }} placeholder="Full name" style={inputStyle} />
        </label>
        <label style={{ display: 'block' }}>
          <span className="micro" style={{ display: 'block', marginBottom: 8 }}>Photo of the passport photo page</span>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/heic,image/heif,application/pdf"
            onChange={(e) => { setFile(e.target.files[0] || null); setState('idle'); }}
            style={{ fontFamily: 'Jost, sans-serif', fontSize: 14, color: 'var(--espresso)', maxWidth: '100%' }}
          />
        </label>
      </div>
      {state === 'error' && <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.6, color: '#9B3A3A' }}>{msg}</p>}
      {state === 'done' && <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, color: 'var(--espresso)' }}>Got it, thank you. Add the next person, if there is one.</p>}
      <button
        onClick={send}
        disabled={!ready}
        className="small-caps"
        style={{
          marginTop: 22, background: 'var(--espresso)', color: 'var(--parchment)', border: 'none',
          padding: '14px 32px', letterSpacing: '0.28em',
          opacity: ready ? 1 : 0.5, cursor: ready ? 'pointer' : 'not-allowed',
        }}
      >
        {busy ? 'Uploading…' : 'Upload passport →'}
      </button>
    </div>
  );
}

function StaySection() {
  const ref = useReveal();
  const [code, setCode] = useState2('');
  const [state, setState] = useState2('idle'); // idle | loading | found | not_found | error
  const [data, setData] = useState2(null);

  const lookup = async () => {
    const trimmed = code.trim();
    if (!trimmed) return;
    setState('loading');
    try {
      // Send along the name typed at the site gate so Admin can see who looked up which code.
      let visitor = '';
      try { visitor = localStorage.getItem('wedding_visitor_name') || ''; } catch (e) {}
      const call = (args) => fetch(SB_URL + '/rest/v1/rpc/lookup_accommodation', {
        method: 'POST', headers: sbHeaders, body: JSON.stringify(args),
      });
      let res = await call({ guest_code: trimmed, visitor_name: visitor });
      if (res.status === 404) res = await call({ guest_code: trimmed }); // database not yet updated to accept the name
      const rows = await res.json();
      if (Array.isArray(rows) && rows.length > 0) { setData(rows[0]); setState('found'); }
      else setState('not_found');
    } catch (e) { setState('error'); }
  };

  const onSite = data && data.accommodation_type === 'villa';
  const label = { display: 'block', marginBottom: 6 };
  const row = { marginTop: 22 };

  return (
    <section id="stay" ref={ref} style={{ background: 'var(--parchment-deep)' }}>
      <div style={{ background: 'var(--parchment)', borderBottom: '0.5px solid var(--hairline)', padding: '150px 0 96px', textAlign: 'center' }}>
        <div className="container-narrow">
          <p className="micro reveal" style={{ marginBottom: 26 }}>Stay</p>
          <h1 className="serif reveal reveal-delay-1" style={{ fontSize: 'clamp(52px, 8vw, 104px)', margin: 0, fontWeight: 300, lineHeight: 1.02 }}>
            Where you&rsquo;re <em style={{ fontWeight: 300 }}>staying</em>
          </h1>
          <p className="reveal reveal-delay-2" style={{ maxWidth: 560, margin: '30px auto 0', fontSize: 16, lineHeight: 1.8, color: 'var(--umber)' }}>
            Enter the code from your invitation to see where you&rsquo;ll be sleeping and who you&rsquo;re with.
          </p>
          <p className="reveal reveal-delay-2" style={{ maxWidth: 560, margin: '14px auto 0', fontSize: 16, lineHeight: 1.8, color: 'var(--umber)' }}>
            We&rsquo;re in the hills where Tuscany meets Umbria, a secluded and calm corner of Italy.
          </p>
        </div>
      </div>

      <div className="container-narrow" style={{ padding: '100px 32px 120px' }}>
        <div className="reveal" style={{ background: 'var(--parchment)', border: '0.5px solid var(--hairline)', padding: 'clamp(40px, 6vw, 72px)' }}>
          {state !== 'found' && (
            <div style={{ maxWidth: 460 }}>
              <label style={{ display: 'block' }}>
                <span className="micro" style={{ display: 'block', marginBottom: 12 }}>Invitation code</span>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setState('idle'); }}
                  onKeyDown={(e) => e.key === 'Enter' && lookup()}
                  placeholder="Enter your code"
                  autoCapitalize="characters"
                  style={{ ...inputStyle, fontSize: 24 }}
                />
              </label>
              {state === 'not_found' && (
                <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.6, color: '#9B3A3A' }}>
                  Code not found. Double-check your invitation and try again.
                </p>
              )}
              {state === 'error' && (
                <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.6, color: '#9B3A3A' }}>
                  Something went wrong, please try again.
                </p>
              )}
              <button
                onClick={lookup}
                disabled={state === 'loading' || !code.trim()}
                className="small-caps"
                style={{
                  marginTop: 26, background: 'var(--espresso)', color: 'var(--parchment)', border: 'none',
                  padding: '14px 32px', letterSpacing: '0.28em',
                  opacity: (state === 'loading' || !code.trim()) ? 0.5 : 1,
                  cursor: (state === 'loading' || !code.trim()) ? 'not-allowed' : 'pointer',
                }}
              >
                {state === 'loading' ? 'Looking up…' : 'Look up →'}
              </button>
              <CodeHelp style={{ margin: '26px 0 0' }} />
            </div>
          )}

          {state === 'found' && data && (
            <div>
              <p className="micro" style={{ marginBottom: 10 }}>{data.guest_name}</p>
              {onSite ? (
                <>
                  <h2 className="serif-italic" style={{ fontSize: 'clamp(30px, 4vw, 44px)', margin: 0, color: 'var(--espresso)', lineHeight: 1.1 }}>
                    You&rsquo;re staying at the villa
                  </h2>
                  <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.8, color: 'var(--umber)', maxWidth: 560 }}>
                    We&rsquo;ve set aside a room for you at {data.property_name || 'San Pietro Aquaeortus'}. Check-in is 2–7pm on Tuesday, June 1st; please try your best to arrive in that window.
                  </p>
                  <div style={{ marginTop: 32, padding: '28px 0', borderTop: '0.5px solid var(--hairline)', borderBottom: '0.5px solid var(--hairline)', display: 'grid', gap: 18 }}>
                    {data.room_detail && (
                      <div><span className="micro" style={label}>Room</span><span className="serif-italic" style={{ fontSize: 24 }}>{data.room_detail}</span></div>
                    )}
                    {data.sharing_with && (
                      <div><span className="micro" style={label}>Sharing with</span><span className="serif-italic" style={{ fontSize: 24 }}>{data.sharing_with}</span></div>
                    )}
                    {(data.check_in || data.check_out) && (
                      <div>
                        <span className="micro" style={label}>Dates</span>
                        <span className="serif-italic" style={{ fontSize: 24 }}>
                          {fmtDate(data.check_in)}{data.check_in && data.check_out ? ' to ' : ''}{fmtDate(data.check_out)}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="serif-italic" style={{ fontSize: 'clamp(30px, 4vw, 44px)', margin: 0, color: 'var(--espresso)', lineHeight: 1.1 }}>
                    We recommend Fonteverde
                  </h2>
                  <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.8, color: 'var(--umber)', maxWidth: 560 }}>
                    Rooms at the villa are limited, so for you we recommend <strong style={{ fontWeight: 500, color: 'var(--espresso)' }}>Fonteverde</strong>,
                    a thermal spa resort in San Casciano dei Bagni, just over the Tuscan border. It&rsquo;s about 20 km from the villa,
                    roughly a 20 minute drive, set in the secluded, calm Tuscan hills.
                  </p>
                  <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.8, color: 'var(--umber)', maxWidth: 560 }}>
                    We have a <strong style={{ fontWeight: 500, color: 'var(--espresso)' }}>15% coupon code</strong> for this location, but you are free to stay wherever you would like.{' '}
                    {FONTEVERDE_CODE
                      ? <>Use code <strong style={{ fontWeight: 500, color: 'var(--espresso)', letterSpacing: '0.08em' }}>{FONTEVERDE_CODE}</strong> when you book.</>
                      : 'The code is coming soon; check back here before you book.'}
                  </p>
                  <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.8, color: 'var(--umber)', maxWidth: 560 }}>
                    Book directly with the hotel. Località Terme 1, 53040 San Casciano dei Bagni (SI) · <a href="tel:+39057857241" style={{ borderBottom: '0.5px solid var(--travertine)' }}>+39 0578 57241</a>
                  </p>
                  <a
                    href={data.booking_url || 'https://fonteverdespa.com/en/'}
                    target="_blank" rel="noopener noreferrer"
                    className="small-caps"
                    style={{ display: 'inline-block', marginTop: 28, background: 'var(--espresso)', color: 'var(--parchment)', padding: '14px 32px', letterSpacing: '0.28em' }}
                  >
                    Fonteverde &rarr;
                  </a>
                </>
              )}
              {data.notes && (
                <p style={{ ...row, fontSize: 15, lineHeight: 1.75, color: 'var(--umber)', maxWidth: 560 }}>{data.notes}</p>
              )}
              {onSite && <RoomPayment data={data} />}
              {onSite && <PassportUpload code={data.code} received={data.passports || []} />}
              {onSite && data.booking_url && (
                <a href={data.booking_url} target="_blank" rel="noopener noreferrer" className="small-caps" style={{ display: 'inline-block', marginTop: 24, borderBottom: '0.5px solid var(--travertine)', paddingBottom: 6 }}>
                  Details &rarr;
                </a>
              )}
              <button
                onClick={() => { setState('idle'); setCode(''); setData(null); }}
                className="small-caps"
                style={{ display: 'block', marginTop: 28, background: 'transparent', border: 'none', color: 'var(--umber)', letterSpacing: '0.2em', padding: 0, cursor: 'pointer', fontSize: 10 }}
              >
                Use a different code
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   RSVPModal — elegant form with multi-step feel
─────────────────────────────────────────────────────────────────*/
function RSVPModal({ open, onClose }) {
  const [step, setStep] = useState2(0);
  const blank = { name: '', email: '', attending: null, diet: '', song: '', message: '' };
  const [data, setData] = useState2(blank);
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
      if (submitted) setData(blank); // a fresh form after a sent reply
      setStep(0);
      setSubmitted(false);
      setSubmitError(null);
    }
  }, [open]);

  const setField = (k, v) => setData((d) => ({ ...d, [k]: v }));

  if (!open) return null;

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
            name: data.name.trim(),
            email: data.email.trim(),
            attending: data.attending,
            diet: data.attending === 'yes' ? (data.diet.trim() || null) : null,
            song: data.attending === 'yes' ? (data.song.trim() || null) : null,
            message: data.message.trim() || null,
          }),
        }
      );
      if (!res.ok) throw new Error(`${res.status}`);
      setSubmitted(true);
    } catch (err) {
      setSubmitError('Something went wrong, please try again.');
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
                ? 'A confirmation is on its way to your inbox. See you in June.'
                : 'Thank you for letting us know. We\u2019ll miss you.'}
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
                Kindly reply by January 15th, 2027
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
                <Field label="Invited guests (as listed on your invitation)">
                  <textarea
                    value={data.name}
                    onChange={(e) => setField('name', e.target.value)}
                    rows={2}
                    placeholder="Names exactly as they appear on your invitation"
                    style={{ ...inputStyle, resize: 'vertical' }}
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
                <Field label="Dietary restrictions. Please do it by name so we know who is allergic to what">
                  <textarea
                    value={data.diet}
                    onChange={(e) => setField('diet', e.target.value)}
                    rows={3}
                    placeholder="e.g. Maria: gluten free. John: allergic to shellfish."
                    style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Jost, sans-serif', fontSize: 15, fontStyle: 'normal' }}
                  />
                </Field>
                <Field label="A song to fill the dance floor">
                  <input
                    type="text"
                    value={data.song}
                    onChange={(e) => setField('song', e.target.value)}
                    placeholder="Artist, title"
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
                    placeholder={'Anything you\u2019d like us to know\u2026'}
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
                    <em>{data.name.trim() || 'Guest'}</em>
                    <span style={{ color: 'var(--umber)' }}> · </span>
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
              Wednesday, June 2nd, 2027
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Monogram style={monogram} size={44} color="var(--espresso)" />
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className="micro" style={{ marginBottom: 8 }}>The Place</p>
            <p className="serif-italic" style={{ fontSize: 22, margin: 0, color: 'var(--espresso)' }}>
              San Pietro Aquaeortus, Umbria
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
  StaySection,
  RSVPModal,
  Footer,
  MonogramWatermark,
});
