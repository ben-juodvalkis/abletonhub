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
	// Track color. Values come from the clip palette in Live's Classic themes
	// (Clip1–Clip16 in the .ask files); clip text is always black on these.
	color: string;
	links: Link[];
};

export const sections: Section[] = [
	{
		id: 'ableton',
		color: '#e0aa2a',
		title: 'Ableton',
		links: [
			{ title: 'Ableton.com', url: 'https://www.ableton.com/' },
			{
				title: 'Your account',
				url: 'https://www.ableton.com/en/account/',
				note: 'Licenses, downloads, Packs'
			},
			{ title: 'Live manual', url: 'https://www.ableton.com/en/manual/welcome-to-live/' },
			{
				title: 'Keyboard shortcuts',
				url: 'https://www.ableton.com/en/manual/live-keyboard-shortcuts/',
				note: 'Live 12 reference'
			},
			{ title: 'Help & knowledge base', url: 'https://help.ableton.com/' },
			{ title: 'Live 12 release notes', url: 'https://www.ableton.com/en/release-notes/live-12/' },
			{ title: 'Beta program', url: 'https://www.ableton.com/beta/', note: 'Centercode sign-up' },
			{ title: 'Packs', url: 'https://www.ableton.com/en/packs/' },
			{ title: 'Blog', url: 'https://www.ableton.com/en/blog/' },
			{ title: 'Free trial', url: 'https://www.ableton.com/en/trial/', note: '30-day Live 12 Suite' }
		]
	},
	{
		id: 'learning',
		color: '#ffec75',
		title: 'Learning',
		links: [
			{
				title: 'Learn Live',
				url: 'https://www.ableton.com/en/live/learn-live/',
				note: 'Official video tutorials'
			},
			{ title: 'Learning Music', url: 'https://learningmusic.ableton.com/' },
			{ title: 'Learning Synths', url: 'https://learningsynths.ableton.com/' },
			{
				title: 'Making Music',
				url: 'https://makingmusic.ableton.com/',
				note: 'Ableton’s book, free chapters'
			},
			{
				title: 'Certified Trainers',
				url: 'https://www.ableton.com/en/certified-training/',
				note: 'Find a teacher near you'
			},
			{ title: 'Ableton on YouTube', url: 'https://www.youtube.com/@Ableton' },
			{
				title: 'Cycling ’74 Learn',
				url: 'https://docs.cycling74.com/learn/',
				note: 'Max, MSP & RNBO tutorials'
			},
			{ title: 'Cycling ’74 on YouTube', url: 'https://www.youtube.com/@C74connect' },
			{
				title: 'JavaScript in Live',
				url: 'https://adammurray.link/max-for-live/',
				note: 'V8 + Live API tutorials'
			},
			{
				title: 'Max Cookbook',
				url: 'https://music.arts.uci.edu/dobrian/maxcookbook/',
				note: 'Classic example patches'
			},
			{
				title: 'Amazing Max Stuff',
				url: 'https://www.youtube.com/@AmazingMaxStuff',
				note: 'Max tutorials on YouTube'
			}
		]
	},
	{
		id: 'extensions',
		color: '#6baace',
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
			{
				title: 'Launch post',
				url: 'https://www.ableton.com/en/blog/introducing-extensions-sdk/',
				note: 'June 2026 announcement'
			},
			{ title: 'ablx.live', url: 'https://ablx.live/', note: 'Open extension catalog' },
			{ title: 'ablx.live build guide', url: 'https://ablx.live/guide/' },
			{
				title: 'Patchwright',
				url: 'https://patchwright.live/',
				note: 'Visual, no-code extension builder'
			},
			{
				title: 'Federico Pepe’s extensions',
				url: 'https://github.com/federico-pepe/ableton-live-extensions'
			},
			{
				title: 'BBenCut',
				url: 'https://github.com/bencodec/BBenCut',
				note: 'BBCut breakbeat slicing'
			},
			{
				title: 'ablevsep',
				url: 'https://github.com/madisonrickert/ablevsep',
				note: 'Stem separation via MVSEP'
			},
			{
				title: 'Sheet music',
				url: 'https://github.com/madisonrickert/ableton-sheet-music-extension',
				note: 'MIDI clip to notation'
			},
			{
				title: 'Strudelton',
				url: 'https://github.com/bfollington/strudelton',
				note: 'Strudel patterns into clips'
			},
			{
				title: 'SDK agent skill',
				url: 'https://github.com/Ronvaknins/ableton-extensions-skill',
				note: 'Teach AI agents the SDK'
			}
		]
	},
	{
		id: 'max',
		color: '#81d24c',
		title: 'Max for Live',
		links: [
			{ title: 'maxforlive.com', url: 'https://maxforlive.com/', note: 'Community device library' },
			{
				title: 'Creative Extensions',
				url: 'https://www.ableton.com/en/packs/creative-extensions/',
				note: 'Free official devices'
			},
			{
				title: 'Connection Kit',
				url: 'https://www.ableton.com/en/packs/connection-kit/',
				note: 'Free hardware & IoT devices'
			},
			{
				title: 'Building Max Devices',
				url: 'https://www.ableton.com/en/packs/building-max-devices/',
				note: 'Official course pack'
			},
			{
				title: 'Isotonik Studios',
				url: 'https://isotonikstudios.com/product-category/maxforlive/',
				note: 'Device store'
			},
			{ title: 'ELPHNT', url: 'https://elphnt.io/', note: 'Devices & tutorials' },
			{
				title: 'EnvelopForLive',
				url: 'https://github.com/EnvelopSound/EnvelopForLive',
				note: 'Ambisonic 3D panning'
			},
			{
				title: 'little-scale devices',
				url: 'https://github.com/little-scale/littlescale-max-for-live',
				note: 'Large free collection'
			},
			{
				title: 'Simpler Recorder',
				url: 'https://github.com/ben-juodvalkis/Simpler-Record',
				note: 'Record audio into a new Simpler'
			}
		]
	},
	{
		id: 'maxdev',
		color: '#52ba46',
		title: 'Max & RNBO dev',
		links: [
			{ title: 'Cycling ’74', url: 'https://cycling74.com/' },
			{ title: 'Max documentation', url: 'https://docs.cycling74.com/' },
			{ title: 'Live Object Model', url: 'https://docs.cycling74.com/apiref/lom/' },
			{ title: 'LiveAPI (JS)', url: 'https://docs.cycling74.com/apiref/js/liveapi/' },
			{ title: 'Node for Max API', url: 'https://docs.cycling74.com/apiref/nodeformax/' },
			{ title: 'Node for Max examples', url: 'https://github.com/Cycling74/n4m-examples' },
			{
				title: 'Max Packages',
				url: 'https://cycling74.com/packages',
				note: 'Community package catalog'
			},
			{ title: 'RNBO', url: 'https://rnbo.cycling74.com/', note: 'Export patches as code' },
			{ title: 'maxdevtools', url: 'https://github.com/Ableton/maxdevtools' },
			{
				title: 'TypeScript M4L template',
				url: 'https://github.com/zsteinkamp/m4l-typescript-base'
			},
			{ title: 'Max SDK', url: 'https://github.com/Cycling74/max-sdk', note: 'C externals' },
			{ title: 'Min-DevKit', url: 'https://github.com/Cycling74/min-devkit', note: 'C++ externals' },
			{
				title: 'MIDI Hub for Max',
				url: 'https://github.com/ben-juodvalkis/midi-hub-max',
				note: 'Node for Max MIDI routing'
			}
		]
	},
	{
		id: 'control',
		color: '#afb95b',
		title: 'Scripting & control',
		links: [
			{
				title: 'AbletonOSC',
				url: 'https://github.com/ideoforms/AbletonOSC',
				note: 'OSC control of Live'
			},
			{
				title: 'ableton-js',
				url: 'https://github.com/leolabs/ableton-js',
				note: 'Control Live from Node'
			},
			{
				title: 'pylive',
				url: 'https://github.com/ideoforms/pylive',
				note: 'Control Live from Python'
			},
			{
				title: 'Live 12 Remote Scripts',
				url: 'https://github.com/gluon/AbletonLive12_MIDIRemoteScripts',
				note: 'Decompiled sources'
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
			{
				title: 'Remotify',
				url: 'https://remotify.io/',
				note: 'Build remote scripts with a GUI'
			},
			{
				title: 'TouchOSC for Live',
				url: 'https://hexler.net/touchosc/manual/getting-started-live',
				note: 'Official setup guide'
			},
			{
				title: 'Open Stage Control',
				url: 'https://openstagecontrol.ammd.net/',
				note: 'Open-source OSC/MIDI surfaces'
			},
			{ title: 'Protokol', url: 'https://hexler.net/protokol', note: 'MIDI & OSC monitor' }
		]
	},
	{
		id: 'hardware',
		color: '#d66b18',
		title: 'Hardware & Link',
		links: [
			{ title: 'Push 3 manual', url: 'https://www.ableton.com/en/push/manual/' },
			{ title: 'Move manual', url: 'https://www.ableton.com/en/move/manual/' },
			{ title: 'Ableton Note', url: 'https://www.ableton.com/en/note/', note: 'iOS sketch app' },
			{ title: 'Note manual', url: 'https://www.ableton.com/en/note/manual/' },
			{ title: 'Push 2 interface', url: 'https://github.com/Ableton/push-interface' },
			{
				title: 'RNBO on Move',
				url: 'https://cycling74.com/products/rnbo/move',
				note: 'Move Takeover'
			},
			{ title: 'Move Takeover templates', url: 'https://github.com/Cycling74/rnbo.move.templates' },
			{ title: 'Schwung', url: 'https://schwung.dev/', note: 'Unofficial Move framework' },
			{ title: 'Ableton Link', url: 'https://github.com/Ableton/link' },
			{ title: 'Link docs', url: 'https://ableton.github.io/link/' },
			{
				title: 'Link-enabled apps',
				url: 'https://www.ableton.com/en/link/products/',
				note: '200+ apps & devices'
			}
		]
	},
	{
		id: 'ai',
		color: '#ff5f80',
		title: 'AI',
		links: [
			{ title: 'Producer Pal', url: 'https://producer-pal.org/', note: 'AI assistant for Live' },
			{ title: 'Producer Pal on GitHub', url: 'https://github.com/adamjmurray/producer-pal' },
			{
				title: 'ableton-mcp',
				url: 'https://github.com/ahujasid/ableton-mcp',
				note: 'MCP server for Live'
			},
			{ title: 'ableton-mcp-extended', url: 'https://github.com/uisato/ableton-mcp-extended' },
			{
				title: 'ableton-copilot-mcp',
				url: 'https://github.com/xiaolaa2/ableton-copilot-mcp',
				note: 'MCP via ableton-js'
			},
			{
				title: 'loophole',
				url: 'https://github.com/OthmanAdi/loophole',
				note: 'MCP as an extension'
			}
		]
	},
	{
		id: 'files',
		color: '#999565',
		title: 'Files & Themes',
		links: [
			{
				title: 'Ableton Device Creator',
				url: 'https://github.com/ben-juodvalkis/Ableton-Device-Creator',
				note: 'Script .adg racks & .adv presets'
			},
			{
				title: 'abletoolz',
				url: 'https://github.com/elixirbeats/abletoolz',
				note: 'Fix, analyze & recolor Sets'
			},
			{ title: 'alsdiff', url: 'https://github.com/krfantasy/alsdiff', note: 'Diff .als files' },
			{
				title: 'dawtool',
				url: 'https://github.com/offlinemark/dawtool',
				note: '.als project parser'
			},
			{ title: 'LiveThemes', url: 'https://livethemes.app/', note: 'Theme editor & gallery' },
			{ title: 'ThemeCreator', url: 'https://themecreator.live/', note: 'Live 12 theme editor' }
		]
	},
	{
		id: 'community',
		color: '#b8ce93',
		title: 'Community',
		links: [
			{
				title: 'Ableton Discord',
				url: 'https://discord.gg/ableton',
				note: '#extensions-sdk lives here'
			},
			{ title: 'Ableton Forum', url: 'https://forum.ableton.com/' },
			{
				title: 'User Groups',
				url: 'https://www.ableton.com/en/community/user-groups/',
				note: 'Local meetups'
			},
			{ title: 'Max Discord', url: 'https://discord.gg/pmStRfUr2k' },
			{ title: 'Cycling ’74 forums', url: 'https://cycling74.com/forums' },
			{ title: 'Producer Pal Discord', url: 'https://discord.gg/rmU3DSzgwH' },
			{ title: 'r/ableton', url: 'https://www.reddit.com/r/ableton/' }
		]
	}
];
