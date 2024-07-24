-- postgresql
CREATE TABLE guest (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    name VARCHAR(255),
    expected_attendees INTEGER,
    confirmed_attendees INTEGER,
    bus BOOLEAN,
    allergies TEXT,
    bus_stop VARCHAR(255),
    bus_seats INTEGER,
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- sqlite
CREATE TABLE guest (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT NOT NULL UNIQUE,
    name TEXT,
    expected_attendees INTEGER,
    confirmed_attendees INTEGER,
    bus INTEGER,
    allergies TEXT,
    bus_stop TEXT,
    bus_seats INTEGER,
    modified_at TEXT DEFAULT (datetime('now', 'localtime'))
);
