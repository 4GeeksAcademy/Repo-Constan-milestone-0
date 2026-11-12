# Brasaland: sitio web público

Primera web pública de Brasaland: landing de marca y registro en el programa de fidelización **Brasa Points**. Contenido, campos, validaciones y mensajes según [`BRIEFING.md`](../../BRIEFING.md).

| Archivo | Qué es |
|---|---|
| `index.html` | Landing: header, hero, historia, lo que nos hace únicos, ubicaciones, menú, Brasa Points, contacto y footer. Schema.org `Restaurant` |
| `application.html` | Formulario de registro en Brasa Points (11 campos del briefing) |
| `validation.js` | Validación en tiempo real, campos dependientes (país → ciudad → restaurante), mensajes del briefing y envío simulado |
| `src/input.css` | Entrada de Tailwind v4 con los colores y fuentes de la marca |
| `styles.css` | Tailwind compilado (no se edita a mano) |
| `img/` | Favicon e ilustración de la historia (SVG) |

## Cómo arrancarlo

Desde la raíz del monorepo:

```bash
npm install
npx @tailwindcss/cli -i uis/website/src/input.css -o uis/website/styles.css --minify
npx http-server uis/website -p 3000 -a 0.0.0.0 -c-1
```

Abre `http://localhost:3000`. En Codespaces, abre el puerto 3000 desde la pestaña **Ports** y cambia su visibilidad a **Public** para compartir la URL.

Atajos equivalentes: `npm run web:css`, `npm run web:css:watch` (mientras se edita) y `npm run web:serve`.

## Decisiones

- **Solo Tailwind**: sin CSS propio. Los estados de error y de éxito usan las variantes `aria-invalid:` y `data-[valido=true]:`.
- **Un idioma base (español)**; por eso `availableLanguage` del Schema solo incluye `Spanish`, como indica el briefing.
- **Accesibilidad**: enlace "Saltar al contenido", foco visible, errores enlazados con `aria-describedby` + `aria-invalid` y anunciados con `aria-live`, resumen de errores con enlaces a cada campo, menú móvil con `<details>` (funciona sin JavaScript).
- **Teléfono**: además de empezar por +57 o +1, el prefijo tiene que coincidir con el país elegido.
- **Preferencias alimentarias**: "Sin restricciones" desmarca las demás y al revés.
- Fuentes de Google cargadas sin bloquear el renderizado (`display=optional`).

## Lighthouse (local, 2026-11-12)

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|
| `index.html` (móvil y escritorio) | 100 | 100 | 100 | 100 |
| `application.html` (móvil y escritorio) | 100 | 100 | 100 | 100 |
