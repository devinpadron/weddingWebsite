(function () {
  const PASSCODE_HASH = 'ebaa43867e8df5f72ccc6ad4a83b841df1d92eed05475f4c21f3bc65cd9d876b';
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

  async function sha256Hex(text) {
    const buf = new TextEncoder().encode(text);
    const hashBuf = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hashBuf))
      .map(b => b.toString(16).padStart(2, '0')).join('');
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

  async function tryUnlock() {
    const name = (nameInput.value || '').trim().slice(0, 80);
    const pw   = (pwInput.value   || '').trim().toLowerCase();

    if (!name) {
      shake(nameInput);
      nameInput.focus();
      return;
    }

    const hash = await sha256Hex(pw);
    if (hash !== PASSCODE_HASH) {
      errMsg.classList.remove('invisible');
      shake(pwInput);
      pwInput.value = '';
      setTimeout(() => errMsg.classList.add('invisible'), 2000);
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
