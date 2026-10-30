// Genera privacy.html, terms.html y delete-account.html de reexapp.com (30 oct 2026) desde los textos de la app
// (../reex/src/legalReex.js), para que la app y la página siempre digan lo mismo. Apple y Google piden estas páginas.
// REEX usa la cuenta de VEEX: la Privacidad y los Términos llevan también los de VEEX (../veex/src/legalTextos.js),
// porque veexapp.com todavía no los publica (Abogado, 30 oct 2026: cada página tiene que entenderse sola).
// Inglés primero y español abajo. Sin JavaScript (la CSP de la página lo prohíbe).
// Uso:  node scripts/generar-legal.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const reex = await import(pathToFileURL(resolve('../reex/src/legalReex.js')).href)
const veex = await import(pathToFileURL(resolve('../veex/src/legalTextos.js')).href)
// El mismo logo de la portada (index.html)
const logo = readFileSync('index.html', 'utf8').match(/<svg class="logo"[\s\S]*?<\/svg>/)[0]

const escapar = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/([a-z]+@veexapp\.com)/g, '<a href="mailto:$1">$1</a>')
const seccion = (lista) => lista.map(({ titulo, texto }) => `
      <h3>${escapar(titulo)}</h3>
      <p>${escapar(texto)}</p>`).join('')

const PAGINAS = [
  {
    archivo: 'privacy.html', titulo: 'Privacy Policy', tituloEs: 'Política de privacidad',
    en: reex.PRIVACIDAD_REEX_EN, es: reex.PRIVACIDAD_REEX_ES,
    veex: { en: veex.PRIVACIDAD_EN, es: veex.PRIVACIDAD_ES, nombre: 'VEEX Privacy Policy', nombreEs: 'Política de privacidad de VEEX' },
  },
  {
    archivo: 'terms.html', titulo: 'Terms of Use', tituloEs: 'Términos de uso',
    en: reex.TERMINOS_REEX_EN, es: reex.TERMINOS_REEX_ES,
    veex: { en: veex.TERMINOS_EN, es: veex.TERMINOS_ES, nombre: 'VEEX Terms of Service', nombreEs: 'Términos del servicio de VEEX' },
  },
  {
    archivo: 'delete-account.html', titulo: 'Delete your REEX account', tituloEs: 'Borrar tu cuenta de REEX',
    en: reex.BORRAR_CUENTA_REEX_EN, es: reex.BORRAR_CUENTA_REEX_ES,
  },
]

const parteVeex = (p, es) => !p.veex ? '' : `
      <h2>${es ? 'Parte 2 · ' + p.veex.nombreEs : 'Part 2 · ' + p.veex.nombre}</h2>
      <p class="nota">${es
    ? 'REEX usa tu cuenta de VEEX, así que esto también se aplica. Si algo choca con la Parte 1, para REEX vale la Parte 1.'
    : 'REEX uses your VEEX account, so this also applies. If something conflicts with Part 1, Part 1 wins for REEX.'}</p>${seccion(es ? p.veex.es : p.veex.en)}`

const html = (p) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Generada por scripts/generar-legal.mjs desde los textos de la app: no se edita a mano -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'none'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'none'; base-uri 'none'; form-action 'none'; object-src 'none'; upgrade-insecure-requests">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>${p.titulo} — REEX</title>
  <meta name="description" content="REEX ${p.titulo}.">
  <meta name="theme-color" content="#f6f3ec">
  <link rel="icon" type="image/svg+xml" href="favicon.svg?v=8">
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png?v=8">
  <link rel="apple-touch-icon" href="apple-touch-icon.png?v=8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    /* Estilo Libreta de REEX: papel, tinta, sin recuadros; el azul solo en el logo */
    :root { --papel: #f6f3ec; --tinta: #20211e; --suave: #75766e; --linea: #d8d3c7; color-scheme: light; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--papel); color: var(--tinta); font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; }
    header, main, footer { max-width: 720px; margin: 0 auto; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
    header { padding-block: 28px 8px; border-bottom: 1.5px solid var(--tinta); display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; }
    header a { display: block; color: var(--tinta); }
    .logo { width: 118px; height: auto; display: block; }
    .logo .logo-ex { fill: color-mix(in srgb, currentColor 93%, #1f8fdc); }
    .idioma { font-size: 13px; font-weight: 500; color: var(--tinta); text-underline-offset: 3px; }
    main { padding-block: 32px 48px; }
    .aviso { color: var(--suave); font-size: 13px; margin-bottom: 26px; padding-left: 12px; border-left: 3px solid var(--tinta); }
    h1 { font-size: clamp(28px, 6vw, 38px); font-weight: 600; line-height: 1.15; text-wrap: balance; }
    .sub { color: var(--suave); font-size: 13px; margin: 6px 0 26px; }
    h2 { font-size: 13px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin: 44px 0 4px; padding-top: 16px; border-top: 1.5px solid var(--tinta); }
    h3 { font-size: 17px; font-weight: 600; margin: 24px 0 4px; }
    p { font-size: 15px; color: #3a3b36; max-width: 65ch; }
    p.nota { color: var(--suave); font-size: 14px; }
    a { color: var(--tinta); text-underline-offset: 3px; }
    .es { margin-top: 64px; }
    nav.docs { display: flex; flex-wrap: wrap; gap: 8px 22px; margin-top: 48px; padding-top: 18px; border-top: 1.5px solid var(--tinta); font-size: 14px; font-weight: 500; }
    nav.docs a { text-decoration: none; }
    nav.docs a:hover { text-decoration: underline; }
    footer { color: var(--suave); font-size: 12px; padding-block: 0 32px; }
  </style>
</head>
<body>
  <header>
    <a href="/" aria-label="REEX">${logo}</a>
    <a class="idioma" href="#es" lang="es">Español ›</a>
  </header>
  <main>
    <div class="en">
      <p class="aviso">Draft — under legal review. This document may change before REEX launches.</p>
      <h1>${p.titulo}</h1>
      <p class="sub">REEX · by Victor Martinez (VEEX), New York · Last updated: ${reex.ACTUALIZADO_REEX}</p>${p.veex ? '\n      <h2>Part 1 · REEX</h2>' : ''}${seccion(p.en)}${parteVeex(p, false)}
    </div>
    <div class="es" id="es" lang="es">
      <p class="aviso">Borrador — en revisión legal. Este documento puede cambiar antes del lanzamiento de REEX. Si algo difiere, vale la versión en inglés.</p>
      <h1>${p.tituloEs}</h1>
      <p class="sub">REEX · de Victor Martinez (VEEX), Nueva York · Última actualización: ${reex.ACTUALIZADO_REEX_ES}</p>${p.veex ? '\n      <h2>Parte 1 · REEX</h2>' : ''}${seccion(p.es)}${parteVeex(p, true)}
    </div>
    <nav class="docs" aria-label="Legal">
      <a href="/privacy">Privacy Policy ›</a>
      <a href="/terms">Terms of Use ›</a>
      <a href="/delete-account">Delete account ›</a>
      <a href="/">reexapp.com ›</a>
    </nav>
  </main>
  <footer>© 2026 REEX</footer>
</body>
</html>
`

for (const p of PAGINAS) {
  writeFileSync(p.archivo, html(p))
  console.log('✓', p.archivo)
}
