import { json, redirect } from '@sveltejs/kit';
import { isListed, parse, type SubmitResult } from '$lib/submission';
import type { RequestHandler } from './$types';

// Submissions from the dialog (fetch, wants JSON) or a plain form post
// without JavaScript (gets redirected back to the page).
export const POST: RequestHandler = async ({ request, platform, getClientAddress }) => {
	const wantsJson = request.headers.get('accept')?.includes('application/json');
	const reply = (result: SubmitResult, status = 200) => {
		if (wantsJson) return json(result, { status });
		redirect(303, `/?submitted=${result.ok ? 'ok' : 'error'}`);
	};

	const env = platform?.env;
	if (!env) return reply({ ok: false, message: 'Submissions are unavailable right now.' }, 503);

	const { success } = await env.SUBMIT_LIMITER.limit({ key: getClientAddress() });
	if (!success)
		return reply({ ok: false, message: 'Too many submissions — try again in a minute.' }, 429);

	const form = await request.formData();

	// Bots fill the hidden field or submit within a moment of the dialog opening.
	// Tell them it worked and store nothing.
	const openedAt = Number(form.get('t'));
	if (form.get('website') || (openedAt && Date.now() - openedAt < 3000)) {
		return reply({ ok: true, message: 'Thanks! It’s in the review queue.' });
	}

	const parsed = parse(form);
	if (typeof parsed === 'string') return reply({ ok: false, message: parsed }, 400);

	if (isListed(parsed.url)) {
		return reply({ ok: false, message: 'That link is already in the directory.' }, 409);
	}

	const pending = await env.DB.prepare(
		"SELECT 1 FROM submissions WHERE url = ? AND status = 'pending' LIMIT 1"
	)
		.bind(parsed.url)
		.first();
	if (!pending) {
		await env.DB.prepare(
			'INSERT INTO submissions (title, url, section, note, contact) VALUES (?, ?, ?, ?, ?)'
		)
			.bind(parsed.title, parsed.url, parsed.section, parsed.note, parsed.contact)
			.run();
	}

	return reply({ ok: true, message: 'Thanks! It’s in the review queue.' });
};
