# ElysiumBoost

Static premium game-services storefront: browse, customize, copy a Discord ticket.

## Layout

- **`index.html`** — page shell
- **`css/styles.css`** — primary styles (tokens, layout, components)
- **`css/responsive.css`** — `@media` rules (loaded after `styles.css`)
- **`css/components/*.css`** — reserved slices for topbar, hero, cards, cart, forms (see file headers; rules still live in `styles.css` until extracted)
- **`js/`** — `config`, `products`, `state`, `storage`, `validation`, `cart` (includes renders), `render.js` / `receipt.js` placeholders, `search`, `ui`, `main`
- **`assets/`**
  - `logo/` — brand mark & social preview
  - `backgrounds/` — hero / page backplates (including 4K variants)
  - `thumbnails/arc/` — Arc Raiders category art & shared Arc thumbs
  - `thumbnails/valorant/` — Valorant service cards
  - `thumbnails/valorant/ranks/` — Valorant rank-badge WEBPs
  - `thumbnails/wow/`, `thumbnails/cs2/`, `thumbnails/lol/` — game-specific art (LoL folder may use `.gitkeep` until populated)
  - `audio/` — `elysium-loop.mp3`
  - `placeholders/` — `fallback-service.webp` (generic card fallback)

See **`AGENTS.md`** for brand rules and load-bearing cart/ticket code.

## GitHub Pages

Absolute OpenGraph image URL in `index.html` must match the deployed path under `assets/logo/`.
