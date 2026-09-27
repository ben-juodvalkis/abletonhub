// Verifies every URL in src/lib/links.ts responds. Run with `npm run check-links`.
import { sections } from '../src/lib/links.ts';

const links = sections.flatMap((s) => s.links);
const results = await Promise.all(
	links.map(async (l) => {
		try {
			const res = await fetch(l.url, {
				redirect: 'follow',
				headers: { 'user-agent': 'Mozilla/5.0 (abletonhub link check)' }
			});
			return { ...l, status: res.status };
		} catch (err) {
			return { ...l, status: String(err) };
		}
	})
);

// Zendesk (help.ableton.com) and maxforlive.com answer scripted requests with 403
// but load fine in a browser, so 403 is a warning to check by hand, not a failure.
let failed = 0;
for (const r of results) {
	const ok = typeof r.status === 'number' && r.status < 400;
	const blocked = r.status === 403;
	if (!ok && !blocked) failed++;
	console.log(`${ok ? 'ok  ' : blocked ? 'bot?' : 'FAIL'} ${r.status}  ${r.url}`);
}
console.log(`\n${results.length - failed}/${results.length} ok`);
process.exit(failed ? 1 : 0);
