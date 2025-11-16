<<<<<<< HEAD
# xailearninghubdev
This is to maintain code for Dev Environment
=======
xailearninghub-local — local starter (static + modular)

How to run locally:
1) Option A — VS Code Live Server extension (recommended)
   - Open folder in VS Code
   - Install Live Server extension
   - Right-click index.html -> "Open with Live Server"
   - Site opens at http://127.0.0.1:5500 or similar

2) Option B — simple Python HTTP server (no install)
   - From project root:
     python3 -m http.server 8000
   - Open http://localhost:8000

3) Option C — npx serve (Node):
   - Run: npx serve .
   - Open the provided URL

Files to edit when updating modules:
- Courses content -> edit `data/courses.json` (no code change needed)
- Change course card look -> edit `assets/js/load-courses.js` (or create a CSS class)
- Hero text / CTA -> edit `index.html` (Hero section)
- Testimonials / FAQ -> add file `data/testimonials.json` + small renderer (we can add this later)
- Contact form backend -> replace client handler in `assets/js/main.js` with fetch() to your server or Netlify form

Next steps I can do for you (choose any; I will implement immediately):
- Add testimonials module with `data/testimonials.json` and renderer
- Add FAQ module reading `data/faq.json`
- Hook contact form to Google Sheets or Netlify forms
- Convert to Next.js starter when you're ready
>>>>>>> 024cb86 (Initial site)
