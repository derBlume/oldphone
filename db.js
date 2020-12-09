const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:patrick:postgres@localhost:5432/oldphone"
);

module.exports.addRawData = function addRawData({
    software,
    devices,
    release_date,
    url,
}) {
    return db.query(
        "INSERT INTO apple_updates_raw (software, devices, release_date, url) VALUES ($1, $2, $3, $4)",
        [software, devices, release_date, url]
    );
};

module.exports.getRawData = function getRawData() {
    return db.query("SELECT * FROM apple_updates_raw");
};

module.exports.getDeviceAndLater = function getDeviceAndLater({
    device,
    update_date,
}) {
    return db.query(
        `SELECT model FROM devices WHERE release_date >= (SELECT release_date FROM devices WHERE model ILIKE $1) AND release_date <= $2`,
        [device, update_date]
    );
};

module.exports.addLineToCleanTable = function addLineToCleanTable({
    software,
    devices,
    release_date,
    url,
    id,
}) {
    return db.query(
        "INSERT INTO apple_updates_clean (software, device, release_date, url, raw_id) VALUES ($1, $2, $3, $4, $5)",
        [software, devices, release_date, url, id]
    );
};
