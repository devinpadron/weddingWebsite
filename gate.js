(function () {
  // Password lives in Supabase (public.site_access), checked server-side via the
  // check_site_password RPC so the password is never sent to the browser. The
  // publishable key below is safe to embed in client code by design.
  const SUPABASE_URL = 'https://yiuglondgjbgyqfoqunz.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_ot6gkuv71siQwCe6dd4A0A_1ANgCQi2';
  const STORAGE_KEY   = 'wedding_invited_v1';
  const NAME_KEY      = 'wedding_visitor_name';

  // Paste your Google Apps Script web-app URL here. Format:
  //   https://script.google.com/macros/s/AKfycb.../exec
  // Leave as '' to skip logging (useful for local testing).
  const LOG_URL = 'https://script.google.com/macros/s/AKfycbzprcwUmXySggq0FRa6xhv2G-zfYgStW8XdSTeLGLWXIgqh84KaDVqxLyd-BELb1TiP/exec';

  if (document.documentElement.classList.contains('gate-unlocked')) return;

  const gate      = document.getElementById('passcode-gate');
  if (!gate) return;

  const nameInput = gate.querySelector('.name-input');
  const pwInput   = gate.querySelector('.pw-input');
  const submit    = gate.querySelector('.pw-submit');
  const errMsg    = gate.querySelector('.error-msg');

  // Pre-fill name on revisits where the unlock flag was cleared but name kept.
  try {
    const stored = localStorage.getItem(NAME_KEY);
    if (stored && nameInput) nameInput.value = stored;
  } catch (e) {}

  async function passwordMatches(pw) {
    const res = await fetch(SUPABASE_URL + '/rest/v1/rpc/check_site_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
      },
      body: JSON.stringify({ attempt: pw }),
    });
    if (!res.ok) throw new Error('rpc ' + res.status);
    return await res.json() === true;
  }

  function shake(el) {
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
  }

  function log(payload) {
    if (!LOG_URL) return;
    try {
      navigator.sendBeacon(LOG_URL, JSON.stringify(payload));
    } catch (e) {}
  }
  // Expose so other scripts on the page (e.g. RSVP) can log via the same URL.
  window.weddingLog = log;

  function logVisit(name) {
    log({
      type: 'visit',
      name: name,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    });
  }

  function reject() {
    errMsg.classList.remove('invisible');
    shake(pwInput);
    pwInput.value = '';
    setTimeout(() => errMsg.classList.add('invisible'), 2000);
  }

  async function tryUnlock() {
    const name = (nameInput.value || '').trim().slice(0, 80);
    const pw   = (pwInput.value   || '').trim();

    if (!name) {
      shake(nameInput);
      nameInput.focus();
      return;
    }

    let ok = false;
    try {
      ok = await passwordMatches(pw);
    } catch (e) {
      reject();  // network/RPC error → treat as failed attempt
      return;
    }
    if (!ok) {
      reject();
      return;
    }

    try { localStorage.setItem(STORAGE_KEY, '1');   } catch (e) {}
    try { localStorage.setItem(NAME_KEY, name);     } catch (e) {}

    logVisit(name);

    document.documentElement.classList.add('gate-unlocking');
    gate.classList.add('hidden');
    document.dispatchEvent(new CustomEvent('gate:unlocking'));
    setTimeout(() => {
      document.documentElement.classList.add('gate-unlocked');
      document.dispatchEvent(new CustomEvent('gate:unlocked'));
    }, 850);
  }

  submit.addEventListener('click', tryUnlock);
  [nameInput, pwInput].forEach(el => {
    if (!el) return;
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter') tryUnlock();
    });
  });

  (nameInput && !nameInput.value ? nameInput : pwInput).focus();
})();
