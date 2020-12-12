DROP TABLE IF EXISTS devices;

CREATE TABLE devices(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    brand VARCHAR NOT NULL,
    model VARCHAR NOT NULL,
    release_date DATE NOT NULL,
    discontinued_date DATE,
    first_os VARCHAR NOT NULL,
    UNIQUE (brand, model)
);
