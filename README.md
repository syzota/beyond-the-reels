<<<<<<< HEAD
# beyond-the-reels
A self-reflection experience about how scrolling shapes our standards.
=======
# Beyond the Reels — fixed React + Mirror edition

This archive fixes the `src/App.jsx` syntax error in the previous download. The previous `App.jsx` was accidentally replaced with Markdown README text. The React component is now restored from the original starter, and the interactive mirror is integrated.

## Installation (Windows PowerShell)

Extract the ZIP to a new directory. Open a terminal inside the directory containing `package.json`.

```powershell
npm install
npm run dev
```

Visit **http://localhost:5173/** (or the address printed by Vite). The interactive mirror appears on the homepage after **The idea**. The nav and hero CTAs jump to it.

You can also open **http://localhost:5173/mirror-demo.html** to try the standalone demo served from `public/`.

To replace an existing installation: stop Vite with Ctrl+C, copy all files from this ZIP's `src/`, `index.html`, `package.json`, and `public/` into your existing project, overwriting old source files, then restart `npm run dev`. Node modules can be reused.

## Files

- `src/App.jsx`: React homepage, team, and journey; includes `<btr-mirror />`.
- `src/mirror-widget.js`: interactive custom-element mirror logic.
- `src/mirror-widget.css`: mirror visuals and responsive styling.
- `src/styles.css`: other site styling.
- `src/content.js`: edit team members, comparison triggers, personal values, and academic sources.
- `public/mirror-demo.html`: independent HTML demo.

## About safety

The mirror uses a visual metaphor; there is no webcam, face analysis, diagnosis, or collection of answers. The self-reflection prompts draw on WHO's *Doing What Matters in Times of Stress* (2020). This is not an official WHO product or a validated medical intervention.

## Status

The source was reconstructed using the original React starter and the separate interactive mirror demo. Structural checks and JS syntax verification were performed, but a real Vite build could not be run in this environment because dependencies are not installed here. `npm run dev` should be verified locally. No third-party demo code is copied verbatim.
>>>>>>> 01c0ad6 (Add BEYOND THE REELS website)
