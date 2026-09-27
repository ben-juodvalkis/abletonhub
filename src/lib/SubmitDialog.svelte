<script lang="ts">
	import { sections } from '$lib/links';
	import { limits, type SubmitResult } from '$lib/submission';

	let dialog: HTMLDialogElement;
	let form: HTMLFormElement;
	let openedAt = $state(0);
	let sending = $state(false);
	let result = $state<SubmitResult | null>(null);

	export function open() {
		result = null;
		openedAt = Date.now();
		dialog.showModal();
	}

	// Without JavaScript the form posts normally and the server redirects back.
	async function onsubmit(e: SubmitEvent) {
		e.preventDefault();
		sending = true;
		try {
			const res = await fetch(form.action, {
				method: 'POST',
				body: new FormData(form),
				headers: { accept: 'application/json' }
			});
			result = await res.json();
			if (result?.ok) form.reset();
		} catch {
			result = { ok: false, message: 'Couldn’t reach the server. Try again.' };
		} finally {
			sending = false;
		}
	}
</script>

<dialog bind:this={dialog} aria-labelledby="submit-title">
	<form bind:this={form} method="POST" action="/api/submit" {onsubmit}>
		<h2 id="submit-title" class="titlebar">Submit a project</h2>

		<div class="body">
			<p class="intro">
				Suggest a tool, device, extension or resource for Live users. Every submission is reviewed
				before it’s added.
			</p>

			<label>
				<span>Name</span>
				<input name="title" required minlength="2" maxlength={limits.title} autocomplete="off" />
			</label>
			<label>
				<span>Link</span>
				<input
					name="url"
					type="url"
					required
					maxlength={limits.url}
					placeholder="https://"
					autocomplete="off"
				/>
			</label>
			<label>
				<span>Category</span>
				<select name="section" required>
					<option value="" disabled selected>Choose…</option>
					{#each sections as s (s.id)}
						<option value={s.id}>{s.title}</option>
					{/each}
					<option value="other">Other</option>
				</select>
			</label>
			<label>
				<span>Short description <em>optional</em></span>
				<input name="note" maxlength={limits.note} placeholder="What does it do?" />
			</label>
			<label>
				<span>Your contact <em>optional</em></span>
				<input
					name="contact"
					maxlength={limits.contact}
					placeholder="Email or Discord, in case of questions"
				/>
			</label>
			<p class="fineprint">Contact details are only used to follow up and are never published.</p>

			<!-- Hidden from people; bots tend to fill it. -->
			<div class="trap" aria-hidden="true">
				<label>Website <input name="website" tabindex="-1" autocomplete="off" /></label>
			</div>
			<input type="hidden" name="t" value={openedAt || ''} />

			{#if result}
				<p class="result" class:error={!result.ok} role="status">{result.message}</p>
			{/if}
		</div>

		<div class="buttons">
			<button type="button" onclick={() => dialog.close()}>
				{result?.ok ? 'Close' : 'Cancel'}
			</button>
			<button type="submit" class="primary" disabled={sending}>
				{sending ? 'Sending…' : 'Submit'}
			</button>
		</div>
	</form>
</dialog>

<style>
	dialog {
		width: min(420px, calc(100vw - 32px));
		padding: 0;
		border: 1px solid var(--frame);
		border-radius: 3px;
		background: var(--surface);
		color: var(--text);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.35);
	}

	.titlebar {
		margin: 0;
		padding: 6px 10px;
		background: var(--surface-hi);
		border-bottom: 1px solid var(--frame);
		font-size: 12px;
		font-weight: 700;
	}

	.body {
		display: grid;
		gap: 8px;
		padding: 10px;
	}

	.intro,
	.fineprint {
		margin: 0;
		color: var(--text-dim);
	}

	.fineprint {
		font-size: 11px;
	}

	label {
		display: grid;
		gap: 3px;
	}

	label span {
		font-size: 11px;
		font-weight: 600;
	}

	em {
		font-style: normal;
		font-weight: 400;
		color: var(--text-dim);
	}

	input,
	select {
		height: 24px;
		box-sizing: border-box;
		padding: 0 6px;
		border: 1px solid var(--frame);
		border-radius: 2px;
		background: var(--text-field);
		color: var(--text);
		font: inherit;
		outline: none;
	}

	input:focus,
	select:focus {
		box-shadow: 0 0 0 1px var(--chosen);
	}

	.trap {
		position: absolute;
		left: -9999px;
	}

	.result {
		margin: 0;
		padding: 5px 8px;
		border-radius: 2px;
		background: var(--selection);
		color: #000;
	}

	.result.error {
		background: var(--alert);
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		gap: 6px;
		padding: 0 10px 10px;
	}

	button {
		min-width: 72px;
		height: 24px;
		border: 1px solid var(--frame);
		border-radius: 2px;
		background: var(--control);
		color: var(--text);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	button.primary {
		background: var(--chosen);
		color: #000;
	}

	button:disabled {
		opacity: 0.6;
		cursor: default;
	}

	@media (pointer: coarse) {
		input,
		select {
			height: 34px;
			font-size: 16px;
		}
		button {
			height: 34px;
		}
	}
</style>
