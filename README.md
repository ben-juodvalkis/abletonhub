# Ableton Hub

One page of links for Ableton Live, Max for Live, Extensions and the tools
around them. Live at **https://abletonhub.org**.

SvelteKit, prerendered, served by a Cloudflare Worker.

## Editing links

All content lives in `src/lib/links.ts`. Append to a section's `links` array
(or add a section). Then:

```sh
npm run check-links   # every URL must resolve (403 = bot-blocked, check by hand)
npm run check && npm run lint
npm run deploy        # build + wrangler deploy to abletonhub.org
```

## Dev

```sh
npm install
npm run dev
```

`/` focuses the filter, Enter opens the first match, Esc clears.
