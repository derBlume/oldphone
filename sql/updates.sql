DROP TABLE IF EXISTS apple_updates_clean;
DROP TABLE IF EXISTS apple_updates_raw;


CREATE TABLE apple_updates_raw(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    software VARCHAR NOT NULL,
    devices VARCHAR NOT NULL,
    release_date VARCHAR NOT NULL,
    url VARCHAR,
    approved BOOLEAN DEFAULT NULL,
    UNIQUE (software, devices, release_date)
);

CREATE TABLE apple_updates_clean(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    raw_id INTEGER NOT NULL REFERENCES apple_updates_raw(id),
    url VARCHAR,
    software VARCHAR NOT NULL,
    device_id INTEGER NOT NULL REFERENCES devices(id), 
    release_date DATE NOT NULL,
    approved BOOLEAN DEFAULT NULL,
    UNIQUE (software, device_id, release_date)
);

