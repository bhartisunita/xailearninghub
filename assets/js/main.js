// assets/js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // mobile nav toggle for home
  const mobileBtn = document.getElementById('mobileBtn');
  const mobileNav = document.getElementById('mobileNav');
  if(mobileBtn){
    mobileBtn.addEventListener('click', () => mobileNav.classList.toggle('hidden'));
  }

  // ===== Contact form submission =====
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  // CONFIG: replace these with your Apps Script URL and secret if using Google Sheets
  const GAS_URL = 'GAS_WEB_APP_URL_REPLACE_ME'; // e.g. 'https://script.google.com/macros/s/AKfycb.../exec'
  const WRITE_SECRET_VALUE = 'WRITE_SECRET_VALUE_REPLACE_ME'; // optional secret configured in script properties

  if(contactForm){
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fd = new FormData(contactForm);
      const payload = {
        name: fd.get('name'),
        email: fd.get('email'),
        message: fd.get('message'),
        source: window.location.hostname || 'xailearninghub'
      };

      // include secret if set
      if (WRITE_SECRET_VALUE && !WRITE_SECRET_VALUE.includes('REPLACE_ME')) {
        payload._secret = WRITE_SECRET_VALUE;
      }

      // If GAS_URL not set, save locally (dev mode)
      if(!GAS_URL || GAS_URL.includes('REPLACE_ME')){
        // local dev: save to localStorage
        const out = JSON.parse(localStorage.getItem('xaileads_v1') || '[]');
        out.push({ ...payload, ts: new Date().toISOString() });
        localStorage.setItem('xaileads_v1', JSON.stringify(out));
        showStatus('Saved locally (dev). Configure GAS_URL to send to Google Sheets.', false, true);
        contactForm.reset();
        return;
      }

      try {
        showStatus('Sending…', false);
        const res = await fetch(GAS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json().catch(()=>({status:'error', message:'Invalid JSON response'}));
        if(res.ok && data && data.status === 'success'){
          showStatus('Thanks — message saved. We will contact you shortly.', false, true);
          contactForm.reset();
        } else {
          showStatus('Failed to save message: ' + (data.message || res.statusText), true);
        }
      } catch(err) {
        showStatus('Network error: ' + String(err), true);
        console.error(err);
      }
    });
  }

  function showStatus(msg, isError, sticky){
    if(!formStatus) return;
    formStatus.classList.remove('hidden');
    formStatus.style.color = isError ? 'crimson' : 'green';
    formStatus.textContent = msg;
    if(!sticky){
      setTimeout(()=> formStatus.classList.add('hidden'), 6000);
    }
  }
});
