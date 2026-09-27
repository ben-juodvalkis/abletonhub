// The hub's content. Add a link by appending to a section's `links` array;
// `npm run check-links` verifies every URL still resolves.

export type Link = {
	title: string;
	url: string;
	note?: string;
};

export type Section = {
	id: string;
	title: string;
	links: Link[];
};

export const sections: Section[] = [
	{
		id: 'ableton',
		title: 'Ableton',
		links: [
			{ title: 'Ableton.com', url: 'https://www.ableton.com/' },
			{
				title: 'Your account',
				url: 'https://www.ableton.com/en/account/',
				note: 'Licenses, downloads, Packs'
			},
			{ title: 'Live manual', url: 'https://www.ableton.com/en/manual/welcome-to-live/' },
			{ title: 'Help & knowledge base', url: 'https://help.ableton.com/' },
			{ title: 'Live 12 release notes', url: 'https://www.ableton.com/en/release-notes/live-12/' },
			{ title: 'Beta program', url: 'https://www.ableton.com/beta/', note: 'Centercode sign-up' },
			{ title: 'Packs', url: 'https://www.ableton.com/en/packs/' },
			{ title: 'Blog', url: 'https://www.ableton.com/en/blog/' },
			{ title: 'Learning Music', url: 'https://learningmusic.ableton.com/' },
			{ title: 'Learning Synths', url: 'https://learningsynths.ableton.com/' }
		]
	},
	{
		id: 'extensions',
		title: 'Extensions',
		links: [
			{
				title: 'Extensions SDK',
				url: 'https://www.ableton.com/en/live/extensions/',
				note: 'Overview & examples'
			},
			{ title: 'SDK docs', url: 'https://ableton.github.io/extensions-sdk/' },
			{
				title: 'Extensions FAQ',
				url: 'https://help.ableton.com/hc/en-us/articles/27303428331420-Ableton-Extensions-FAQ'
			},
			{ title: 'ablx.live', url: 'https://ablx.live/', note: 'Open extension catalog' },
			{
				title: 'GitHub topic: ableton-extensions',
				url: 'https://github.com/topics/ableton-extensions'
			},
			{
				title: 'federico-pepe/ableton-live-extensions',
				url: 'https://github.com/federico-pepe/ableton-live-extensions'
			}
		]
	},
	{
		id: 'max',
		title: 'Max for Live',
		links: [
			{ title: 'maxforlive.com', url: 'https://maxforlive.com/', note: 'Community device library' },
			{ title: 'Cycling ’74', url: 'https://cycling74.com/' },
			{ title: 'Max documentation', url: 'https://docs.cycling74.com/' },
			{ title: 'Live Object Model', url: 'https://docs.cycling74.com/apiref/lom/' },
			{ title: 'LiveAPI (JS)', url: 'https://docs.cycling74.com/apiref/js/liveapi/' },
			{ title: 'Cycling ’74 forums', url: 'https://cycling74.com/forums' },
			{ title: 'M4L Connection Kit', url: 'https://github.com/Ableton/m4l-connection-kit' },
			{ title: 'maxdevtools', url: 'https://github.com/Ableton/maxdevtools' }
		]
	},
	{
		id: 'control',
		title: 'Scripting & control',
		links: [
			{
				title: 'AbletonOSC',
				url: 'https://github.com/ideoforms/AbletonOSC',
				note: 'OSC control of Live'
			},
			{
				title: 'Remote Scripts API',
				url: 'https://structure-void.com/ableton-live-midi-remote-scripts/',
				note: 'Structure Void'
			},
			{
				title: 'Control surface toolkit',
				url: 'https://github.com/oslo1989/ableton-control-surface-toolkit'
			},
			{
				title: 'Installing remote scripts',
				url: 'https://help.ableton.com/hc/en-us/articles/209072009-Installing-third-party-remote-scripts'
			},
			{ title: 'Ableton Link', url: 'https://github.com/Ableton/link' },
			{ title: 'Push 2 interface', url: 'https://github.com/Ableton/push-interface' }
		]
	},
	{
		id: 'ai',
		title: 'AI',
		links: [
			{ title: 'Producer Pal', url: 'https://producer-pal.org/', note: 'AI assistant for Live' },
			{ title: 'Producer Pal on GitHub', url: 'https://github.com/adamjmurray/producer-pal' }
		]
	},
	{
		id: 'community',
		title: 'Community',
		links: [
			{
				title: 'Ableton Discord',
				url: 'https://discord.gg/ableton',
				note: '#extensions-sdk lives here'
			},
			{ title: 'Producer Pal Discord', url: 'https://discord.gg/rmU3DSzgwH' },
			{ title: 'r/ableton', url: 'https://www.reddit.com/r/ableton/' }
		]
	},
	{
		id: 'mine',
		title: 'My tools',
		links: [
			{
				title: 'Ableton Web Components',
				url: 'https://ben-juodvalkis.github.io/ableton-web-components/'
			},
			{
				title: 'Command Palette',
				url: 'https://github.com/ben-juodvalkis/ableton-command-palette'
			},
			{ title: 'Device Creator', url: 'https://github.com/ben-juodvalkis/Ableton-Device-Creator' },
			{ title: 'MIDI Hub for Max', url: 'https://github.com/ben-juodvalkis/midi-hub-max' }
		]
	}
];
