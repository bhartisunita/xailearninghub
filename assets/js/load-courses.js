// assets/js/load-courses.js
(async function(){
  const grid = document.getElementById('coursesGrid');
  if(!grid) return;
  try {
    const res = await fetch('/data/courses.json', {cache: "no-store"});
    const courses = await res.json();
    const utmParams = new URLSearchParams({ utm_source: 'xailearninghub', utm_medium: 'site', utm_campaign: 'course-card' });
    courses.forEach((c, idx) => {
      const a = document.createElement('a');
      a.className = 'course-link inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-teal-400 text-white shadow';
      a.setAttribute('target','_blank');
      a.setAttribute('rel','noopener noreferrer');
      // add utm only if valid URL
      try {
        const url = new URL(c.url);
        utmParams.forEach((v,k) => { if(!url.searchParams.has(k)) url.searchParams.set(k, v); });
        a.href = url.toString();
      } catch(e) {
        a.href = c.url; // fallback
      }

      // build card html
      const card = document.createElement('article');
      card.className = 'bg-white p-5 rounded-xl border card-hover';
      card.innerHTML = `
        <div class="flex items-start gap-4">
          <div class="w-14 h-14 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">X${idx+1}</div>
          <div class="flex-1">
            <h3 class="font-semibold">${escapeHtml(c.title)}</h3>
            <p class="text-sm text-slate-600 mt-1">${escapeHtml(c.desc)}</p>
            <div class="mt-4 flex items-center justify-between gap-3">
              <div class="text-sm text-slate-700 font-medium">${escapeHtml(c.price || '')}</div>
            </div>
          </div>
        </div>
      `;
      // append CTA under card
      const ctaWrap = document.createElement('div');
      ctaWrap.className = 'mt-4';
      a.textContent = 'View on Udemy';
      ctaWrap.appendChild(a);
      card.appendChild(ctaWrap);
      grid.appendChild(card);
    });
  } catch(err) {
    grid.innerHTML = '<div class="text-sm text-red-600">Failed to load courses. Check data/courses.json.</div>';
    console.error(err);
  }

  // small helper to avoid XSS from JSON if edited
  function escapeHtml(str){ if(!str) return ''; return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }
})();
