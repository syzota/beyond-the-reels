# Beyond the Reels — photo path patch

This patch connects the four transparent PNG files already placed in your project's `public/images` folder. It does not include or overwrite the image files themselves.

Expected files in your project:

```text
public/images/team/aku.png
public/images/team/beliau.png
public/images/mirror/reel.png
public/images/mirror/real.png
```

Files included in this patch:
- `src/content.js` — connects the two Meet the Team portraits.
- `src/mirror-widget.js` — uses `reel.png` and `real.png` in the mirror reveal.
- `src/mirror-widget.css` — styles the transparent cutouts inside the mirror.
- `src/styles.css` — styles the transparent team cutouts.

## Install
1. Stop Vite with `Ctrl + C`.
2. Extract this ZIP into the root of `beyond-the-reels-react`.
3. Choose **Replace files** when Windows asks.
4. Start the project again with `npm run dev`.
5. Hard-refresh the browser with `Ctrl + Shift + R`.

The `public` folder is served from the site root by Vite, so React uses `/images/...` paths, not `/public/images/...`.

Names and roles remain placeholders in `src/content.js`; change those two strings when ready.
