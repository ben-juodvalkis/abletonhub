<script lang="ts">
	import { sections } from '$lib/links';

	let query = $state('');
	let input: HTMLInputElement;

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
	<title>Ableton Hub</title>
	<meta
		name="description"
		content="One page of links for Ableton Live, Max for Live, Extensions and the tools around them."
	/>
</svelte:head>

<main>
	<header>
		<h1><span class="mark" aria-hidden="true"></span>Ableton Hub</h1>
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
	</header>

	{#if filtered.length === 0}
		<p class="empty">Nothing matches “{query}”.</p>
	{/if}

	<div class="grid">
		{#each filtered as section (section.id)}
			<section aria-labelledby={section.id}>
				<h2 id={section.id}>{section.title}</h2>
				<ul>
					{#each section.links as link (link.url)}
						<li>
							<a
								href={link.url}
								target="_blank"
								rel="noopener"
								class:first={query && link === firstMatch}
							>
								<span class="title">{link.title}</span>
								<span class="meta">{link.note ?? host(link.url)}</span>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</main>

<style>
	:global(:root) {
		--bg: #1b1b1b;
		--panel: #262626;
		--line: #333;
		--text: #e6e6e6;
		--muted: #8c8c8c;
		--accent: #ff8a3d;
		--hover: #2f2f2f;
		color-scheme: dark;
	}

	@media (prefers-color-scheme: light) {
		:global(:root) {
			--bg: #d9d9d9;
			--panel: #ececec;
			--line: #c4c4c4;
			--text: #1b1b1b;
			--muted: #666;
			--accent: #e2691c;
			--hover: #f7f7f7;
			color-scheme: light;
		}
	}

	:global(body) {
		margin: 0;
		background: var(--bg);
		color: var(--text);
		font:
			15px/1.4 system-ui,
			-apple-system,
			'Helvetica Neue',
			sans-serif;
		-webkit-font-smoothing: antialiased;
	}

	main {
		max-width: 1320px;
		margin: 0 auto;
		padding: 28px 16px 48px;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 24px;
	}

	h1 {
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 0;
		font-size: 20px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	.mark {
		width: 14px;
		height: 14px;
		background: var(--accent);
		border-radius: 2px;
	}

	.search {
		position: relative;
		flex: 0 1 320px;
	}

	.search input {
		width: 100%;
		box-sizing: border-box;
		padding: 8px 32px 8px 10px;
		border: 1px solid var(--line);
		border-radius: 4px;
		background: var(--panel);
		color: var(--text);
		font: inherit;
		outline: none;
	}

	.search input:focus {
		border-color: var(--accent);
	}

	kbd {
		position: absolute;
		right: 8px;
		top: 50%;
		transform: translateY(-50%);
		padding: 0 6px;
		border: 1px solid var(--line);
		border-radius: 3px;
		color: var(--muted);
		font:
			12px/18px ui-monospace,
			monospace;
		pointer-events: none;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 16px;
		align-items: start;
	}

	section {
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 6px;
		overflow: hidden;
	}

	h2 {
		margin: 0;
		padding: 10px 14px;
		border-bottom: 1px solid var(--line);
		color: var(--muted);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 4px 0;
	}

	a {
		display: flex;
		flex-direction: column;
		padding: 8px 14px;
		border-left: 2px solid transparent;
		color: inherit;
		text-decoration: none;
	}

	a:hover,
	a:focus-visible {
		background: var(--hover);
		border-left-color: var(--accent);
		outline: none;
	}

	a.first {
		border-left-color: var(--accent);
	}

	.title {
		font-weight: 500;
	}

	.meta {
		color: var(--muted);
		font-size: 13px;
	}

	.empty {
		color: var(--muted);
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}

	@media (max-width: 560px) {
		header {
			flex-direction: column;
			align-items: stretch;
		}
		.search {
			flex-basis: auto;
		}
	}
</style>
