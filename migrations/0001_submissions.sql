-- Project submissions from the site's "Submit a project" form. Nothing here is
-- shown on the page; approved entries are added to src/lib/links.ts by hand.
CREATE TABLE submissions (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	created_at TEXT NOT NULL DEFAULT (datetime('now')),
	title TEXT NOT NULL,
	url TEXT NOT NULL,
	section TEXT NOT NULL,
	note TEXT,
	contact TEXT,
	status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'added', 'rejected'))
);

CREATE INDEX submissions_status ON submissions (status, created_at);
