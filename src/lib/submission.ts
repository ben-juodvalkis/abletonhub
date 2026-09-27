// Shared between the submit dialog (input limits) and /api/submit (validation).
import { sections } from '$lib/links';

export const limits = { title: 60, url: 300, note: 80, contact: 120 };

export type SubmitResult = { ok: boolean; message: string };

export type Submission = {
	title: string;
	url: string;
	section: string;
	note: string | null;
	contact: string | null;
};

const normalize = (url: string) =>
	url
		.toLowerCase()
		.replace(/^https?:\/\/(www\.)?/, '')
		.replace(/\/+$/, '');
const listed = new Set(sections.flatMap((s) => s.links.map((l) => normalize(l.url))));

export const isListed = (url: string) => listed.has(normalize(url));

// Returns the cleaned submission, or an error message for the submitter.
export function parse(form: FormData): Submission | string {
	const get = (k: string) => String(form.get(k) ?? '').trim();
	const title = get('title');
	const url = get('url');
	const section = get('section');
	const note = get('note');
	const contact = get('contact');

	if (title.length < 2 || title.length > limits.title) return 'Give the project a name.';
	if (url.length > limits.url) return 'That URL is too long.';
	try {
		const u = new URL(url);
		if (u.protocol !== 'https:' && u.protocol !== 'http:') throw 0;
	} catch {
		return 'Enter a full link starting with https://';
	}
	if (section !== 'other' && !sections.some((s) => s.id === section)) return 'Pick a category.';
	if (note.length > limits.note) return `Keep the description under ${limits.note} characters.`;
	if (contact.length > limits.contact) return 'That contact is too long.';

	return { title, url, section, note: note || null, contact: contact || null };
}
