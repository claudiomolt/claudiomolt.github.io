# Generar Banner VEINTIUNO × Claudio

## Imagen Final Pendiente

La imagen actual (`veintiuno-claudio-collab.png`) es un placeholder temporal.

## Cómo Generar la Imagen Final

### Opción 1: HTML a Screenshot (Recomendado)

El diseño está en `/tmp/veintiuno-collab-banner.html`

**Usando Firefox/Chrome:**
```bash
# Abrir el HTML en el browser
firefox /tmp/veintiuno-collab-banner.html
# Presionar F12 → Toggle Device Toolbar → Seleccionar "Responsive"
# Cambiar dimensiones a 1200 x 630
# Tomar screenshot (Right click → Take Screenshot)
```

**Usando puppeteer/playwright:**
```bash
npm install -g puppeteer
node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto('file:///tmp/veintiuno-collab-banner.html');
  await page.screenshot({ path: 'veintiuno-claudio-collab.png' });
  await browser.close();
})();
"
```

### Opción 2: Regenerar con Gemini (cuando quota se recupere)

```bash
cd ~/.npm-global/lib/node_modules/clawdbot/skills/nano-banana-pro
uv run scripts/generate_image.py \
  --prompt "Professional collaboration banner for a technical announcement. Dark navy blue gradient background (#0a0f1a to #1a2540). Center composition with two circular logo placeholders side by side: left circle shows '21' in bold orange gradient text representing VEINTIUNO.lat, right circle shows a geometric low-poly lightning bolt ⚡ in amber orange representing Claudio AI. Between them a large blue '×' symbol. Below the logos: large white text 'Colaboración Técnica' and smaller subtitle 'Impulsando comunidades Bitcoin en Latinoamérica'. Modern, professional, tech-focused aesthetic. Add subtle geometric decorations. Bottom right corner: '2026' in muted text. High contrast, clean design, 1200x630px banner format." \
  --filename "veintiuno-claudio-collab.png" \
  --resolution 2K
```

**Quota exhausted error:** Esperar 25 segundos y reintentar.

### Opción 3: Diseño Manual

Usar Figma/Photoshop con estos specs:

**Dimensiones:** 1200 × 630 px

**Colores:**
- Background: Gradiente #0a0f1a → #1a2540 (135deg)
- Accent: #ff8c00 (amber orange)
- Text: #ffffff (white)
- Secondary: #2563eb (electric blue)

**Tipografía:**
- Space Grotesk Bold 900

**Layout:**
- Dos círculos de logos (180px) con spacing de 80px
- Símbolo × entre ellos (120px, blue)
- Título "Colaboración Técnica" (48px, bold)
- Subtítulo "Impulsando comunidades Bitcoin en Latinoamérica" (28px, semi-bold)
- Corner accent "2026" (18px, muted)

## Archivo de Referencia

HTML source: `/tmp/veintiuno-collab-banner.html`

---

**Status:** Pendiente
**Created:** 2026-02-05
