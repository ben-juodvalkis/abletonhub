<script lang="ts">
	import { sections, type Link, type Section } from '$lib/links';

	let query = $state('');
	let input: HTMLInputElement;
	let info = $state<{ link: Link; section: Section } | null>(null);

	const total = sections.reduce((n, s) => n + s.links.length, 0);
	const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return sections;
		return sections
			.map((s) => ({
				...s,
				links: s.links.filter((l) =>
					[l.title, l.note ?? '', l.url, s.title].some((t) => t.toLowerCase().includes(q))
				)
			}))
			.filter((s) => s.links.length > 0);
	});

	const shown = $derived(filtered.reduce((n, s) => n + s.links.length, 0));
	const firstMatch = $derived(filtered[0]?.links[0]);

	function onKeydown(e: KeyboardEvent) {
		if (e.key === '/' && document.activeElement !== input) {
			e.preventDefault();
			input.focus();
		}
	}

	function onSearchKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && firstMatch) window.open(firstMatch.url, '_blank', 'noopener');
		if (e.key === 'Escape') {
			query = '';
			input.blur();
		}
	}
</script>

<svelte:window onkeydown={onKeydown} />

<svelte:head>
	<title>Ableton Hub — unofficial</title>
	<meta
		name="description"
		content="An unofficial, community-made page of links for Ableton Live, Max for Live, Extensions and the tools around them. Not affiliated with Ableton AG."
	/>
</svelte:head>

<div class="app">
	<header class="panel controlbar">
		<div class="brand">
			<svg class="mark" viewBox="0 0 16 16" aria-hidden="true">
				<rect x="0.5" y="0.5" width="15" height="15" rx="2" />
				<path d="M5.5 4.5v7l6-3.5z" />
			</svg>
			<h1>Ableton Hub</h1>
			<span class="badge" title="Not an official Ableton product">Unofficial</span>
		</div>

		<div class="controls">
			<output class="lcd" aria-live="polite">
				{query ? `${shown}/${total}` : total} LINKS
			</output>
			<label class="search">
				<span class="visually-hidden">Filter links</span>
				<input
					bind:this={input}
					bind:value={query}
					onkeydown={onSearchKeydown}
					type="search"
					placeholder="Filter…"
					autocomplete="off"
					spellcheck="false"
				/>
				<kbd aria-hidden="true">/</kbd>
			</label>
		</div>
	</header>

	<main class="panel session">
		{#if filtered.length === 0}
			<p class="empty">No clips match “{query}”.</p>
		{/if}

		<div class="tracks">
			{#each filtered as section (section.id)}
				<section class="track" aria-labelledby={section.id} style:--track={section.color}>
					<h2 id={section.id} class="track-title">{section.title}</h2>
					<ul>
						{#each section.links as link (link.url)}
							<li>
								<a
									class="clip"
									class:selected={query && link === firstMatch}
									href={link.url}
									target="_blank"
									rel="noopener"
									title={link.title}
									onmouseenter={() => (info = { link, section })}
									onmouseleave={() => (info = null)}
									onfocus={() => (info = { link, section })}
									onblur={() => (info = null)}
								>
									<svg class="play" viewBox="0 0 8 10" aria-hidden="true"
										><path d="M0 0v10l8-5z" /></svg
									>
									<span class="name">{link.title}</span>
								</a>
							</li>
						{/each}
					</ul>
				</section>
			{/each}
		</div>
	</main>

	<footer class="panel statusbar">
		<div class="infoview" aria-live="polite">
			{#if info}
				<strong>{info.link.title}</strong>
				<span>{info.link.note ? `${info.link.note} · ` : ''}{host(info.link.url)}</span>
			{:else}
				<strong>Info</strong>
				<span>Hover a clip to see where it goes. Press / to filter, Enter to open.</span>
			{/if}
		</div>
		<p class="disclaimer">
			Ableton Hub is an independent, community-made project. It is not an official Ableton product
			and is not affiliated with, endorsed by, or sponsored by Ableton AG. Ableton, Live, Push, Move
			and Max for Live are trademarks of their respective owners.
		</p>
	</footer>
</div>

<style>
	/* Colors are read from Live 12's bundled "Classic Medium Light" / "Classic
	   Medium Dark" themes (App-Resources/Themes/*.ask) — the Live 10-era look. */
	:global(:root) {
		--desktop: #565656;
		--surface: #929292;
		--surface-hi: #afafaf;
		--control: #c6c6c6;
		--text-field: #dadada;
		--frame: #383838;
		--text: #000000;
		--text-dim: #3a3a3a;
		--scene-line: #494949;
		--slot-button: #424242;
		--lcd-bg: #1d1d1d;
		--lcd-fg: #ffb901;
		--chosen: #ffb901;
		--selection: #cdf8ff;
		color-scheme: light;
	}

	@media (prefers-color-scheme: dark) {
		:global(:root) {
			--desktop: #2a2a2a;
			--surface: #4f4f4f;
			--surface-hi: #686868;
			--control: #424242;
			--text-field: #313131;
			--frame: #151515;
			--text: #e0e0e0;
			--text-dim: #a7a7a7;
			--scene-line: #393939;
			--slot-button: #2a2a2a;
			--lcd-bg: #1f1f1f;
			--lcd-fg: #ff9c39;
			--chosen: #ff9c39;
			--selection: #96d4e8;
			color-scheme: dark;
		}
	}

	:global(body) {
		margin: 0;
		background: var(--desktop);
		color: var(--text);
		font:
			12px/1.3 system-ui,
			-apple-system,
			'Segoe UI',
			'Helvetica Neue',
			Arial,
			sans-serif;
		-webkit-font-smoothing: antialiased;
	}

	.app {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-height: 100vh;
		min-height: 100dvh;
		padding: 4px;
		box-sizing: border-box;
	}

	.panel {
		background: var(--surface);
		border-radius: 3px;
	}

	/* Control bar */

	.controlbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 6px 8px;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 8px;
		min-width: 0;
	}

	.mark {
		flex: none;
		width: 18px;
		height: 18px;
	}

	.mark rect {
		fill: var(--chosen);
		stroke: var(--frame);
	}

	.mark path {
		fill: var(--frame);
	}

	h1 {
		margin: 0;
		font-size: 13px;
		font-weight: 700;
		white-space: nowrap;
	}

	.badge {
		padding: 1px 6px;
		border: 1px solid var(--frame);
		border-radius: 2px;
		background: var(--control);
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 6px;
		flex: 0 1 380px;
		min-width: 0;
	}

	.lcd {
		flex: none;
		padding: 3px 8px;
		border-radius: 2px;
		background: var(--lcd-bg);
		color: var(--lcd-fg);
		font:
			600 12px/16px ui-monospace,
			'SF Mono',
			Menlo,
			monospace;
		font-variant-numeric: tabular-nums;
	}

	.search {
		position: relative;
		flex: 1;
		min-width: 0;
	}

	.search input {
		width: 100%;
		box-sizing: border-box;
		height: 22px;
		padding: 0 26px 0 6px;
		border: 1px solid var(--frame);
		border-radius: 2px;
		background: var(--text-field);
		color: var(--text);
		font: inherit;
		outline: none;
	}

	.search input:focus {
		box-shadow: 0 0 0 1px var(--chosen);
	}

	kbd {
		position: absolute;
		right: 4px;
		top: 50%;
		transform: translateY(-50%);
		padding: 0 4px;
		border: 1px solid var(--frame);
		border-radius: 2px;
		color: var(--text-dim);
		font:
			10px/14px ui-monospace,
			monospace;
		pointer-events: none;
	}

	/* Session view */

	.session {
		flex: 1;
		padding: 4px;
	}

	/* Tracks in a row stretch to the tallest one, and each list's background
	   draws empty clip slots (stop square + scene line) to fill the gap, like
	   the unused slots of a Session View. */
	.tracks {
		--slot-h: 26px;
		--stop: color-mix(in srgb, var(--slot-button) 55%, transparent);
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
		gap: 4px 2px;
	}

	@media (min-width: 1100px) {
		.tracks {
			grid-template-columns: repeat(5, minmax(0, 1fr));
		}
	}

	.track {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.track-title {
		margin: 0 0 1px;
		padding: 0 6px;
		height: 20px;
		border-radius: 2px 2px 0 0;
		background: var(--track);
		color: #000;
		font-size: 11px;
		font-weight: 600;
		line-height: 20px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		flex: 1;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		align-content: start;
		gap: 1px;
		border-bottom: 1px solid var(--scene-line);
		background:
			repeating-linear-gradient(
					transparent 0 calc(var(--slot-h) / 2 - 3.5px),
					var(--stop) 0 calc(var(--slot-h) / 2 + 3.5px),
					transparent 0 calc(var(--slot-h) + 1px)
				)
				6px 0 / 7px 100% no-repeat,
			repeating-linear-gradient(
				var(--surface-hi) 0 var(--slot-h),
				var(--scene-line) 0 calc(var(--slot-h) + 1px)
			);
	}

	li {
		height: var(--slot-h);
	}

	.clip {
		display: flex;
		align-items: center;
		gap: 6px;
		height: 100%;
		padding: 0 6px;
		box-sizing: border-box;
		background: var(--track);
		color: #000;
		text-decoration: none;
	}

	.play {
		flex: none;
		width: 7px;
		height: 9px;
		fill: rgba(0, 0, 0, 0.75);
	}

	.name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.clip:hover,
	.clip:focus-visible {
		filter: brightness(1.12);
		outline: none;
	}

	.clip:focus-visible,
	.clip.selected {
		box-shadow: inset 0 0 0 2px var(--selection);
	}

	.empty {
		margin: 8px;
		color: var(--text-dim);
	}

	/* Info view + status bar */

	.statusbar {
		display: grid;
		grid-template-columns: minmax(0, 320px) minmax(0, 1fr);
		gap: 12px;
		align-items: start;
		padding: 6px 8px;
		position: sticky;
		bottom: 4px;
	}

	.infoview {
		display: flex;
		flex-direction: column;
		gap: 1px;
		min-height: 30px;
		min-width: 0;
		padding: 3px 6px;
		border-radius: 2px;
		background: var(--surface-hi);
	}

	.infoview span {
		color: var(--text-dim);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.disclaimer {
		margin: 0;
		color: var(--text-dim);
		font-size: 11px;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}

	@media (max-width: 640px) {
		.app {
			padding: 4px 16px;
		}
		.controlbar {
			flex-wrap: wrap;
		}
		.controls {
			flex-basis: 100%;
		}
		.statusbar {
			position: static;
			grid-template-columns: 1fr;
		}
		.infoview {
			display: none;
		}
		.tracks {
			grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		}
		.tracks {
			--slot-h: 32px;
		}
	}
</style>
