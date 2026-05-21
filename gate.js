(function () {
  const PASSCODE_HASH = 'ebaa43867e8df5f72ccc6ad4a83b841df1d92eed05475f4c21f3bc65cd9d876b';
  const STORAGE_KEY = 'wedding_invited_v1';

  if (document.documentElement.classList.contains('gate-unlocked')) return;

  const gate = document.getElementById('passcode-gate');
  if (!gate) return;

  const input = gate.querySelector('.pw-input');
  const submit = gate.querySelector('.pw-submit');
  const errMsg = gate.querySelector('.error-msg');

  async function sha256Hex(text) {
    const buf = new TextEncoder().encode(text);
    const hashBuf = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hashBuf))
      .map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function tryUnlock() {
    const val = input.value.trim().toLowerCase();
    const hash = await sha256Hex(val);
    if (hash === PASSCODE_HASH) {
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
      document.documentElement.classList.add('gate-unlocking');
      gate.classList.add('hidden');
      document.dispatchEvent(new CustomEvent('gate:unlocking'));
      setTimeout(() => {
        document.documentElement.classList.add('gate-unlocked');
        document.dispatchEvent(new CustomEvent('gate:unlocked'));
      }, 850);
    } else {
      errMsg.classList.remove('invisible');
      input.classList.remove('shake');
      void input.offsetWidth;
      input.classList.add('shake');
      input.value = '';
      setTimeout(() => errMsg.classList.add('invisible'), 2000);
    }
  }

  submit.addEventListener('click', tryUnlock);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') tryUnlock();
  });

  input.focus();
})();
