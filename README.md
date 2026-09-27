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

## Submissions

"+ Submit" on the page posts to `/api/submit`, which stores entries in the
`abletonhub` D1 database (`migrations/`) as `pending`. Nothing is published
automatically. To review:

```sh
npm run submissions   # list pending entries
```

Approve one by adding it to `src/lib/links.ts`, then mark it handled:

```sh
npx wrangler d1 execute abletonhub --remote --command "UPDATE submissions SET status = 'added' WHERE id = 1"
```

(`'rejected'` for ones you pass on.) Spam protection: a hidden trap field, a
3-second minimum between opening the dialog and submitting, and a limit of 3
submissions per minute per client.

## Dev

```sh
npm install
npm run dev
```

`/` focuses the filter, Enter opens the first match, Esc clears.
