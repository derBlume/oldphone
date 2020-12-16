const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:patrick:postgres@localhost:5432/oldphone"
);

module.exports.findDevice = function findDevice(query) {
    return db.query(
        "SELECT id, brand, model FROM devices WHERE brand ILIKE $1 OR model ILIKE $1 ORDER BY release_date DESC",
        ["%" + query + "%"]
    );
};

module.exports.getDeviceById = function getDeviceById(id) {
    return db.query("SELECT * FROM devices WHERE id = $1", [id]);
};

module.exports.getDevicesAll = function getDevicesAll() {
    return db.query("SELECT * FROM devices");
};

module.exports.getUpdatesByDeviceId = function getUpdatesByDeviceId(device_id) {
    return db.query(
        "SELECT * FROM apple_updates_clean WHERE device_id = $1 ORDER BY release_date DESC",
        [device_id]
    );
};

module.exports.getLatestOs = function getLatestOs() {
    return db.query(
        `SELECT software FROM apple_updates_clean ORDER BY release_date DESC LIMIT 1`
    );
};

// BACKEND FUNCTIONALITY: ---------------------------------------------
module.exports.getRawAll = function getRawAll() {
    return db.query("SELECT * FROM apple_updates_raw");
};

module.exports.getCleanAll = function getCleanAll() {
    return db.query(
        `SELECT
                apple_updates_clean.id AS id,
                apple_updates_clean.created_at AS created_at,
                apple_updates_clean.raw_id AS raw_id,
                apple_updates_clean.url AS url,
                apple_updates_clean.software AS software,
                apple_updates_clean.device_id AS device_id,
                apple_updates_clean.release_date AS release_date,
                apple_updates_clean.approved AS approved,
                CONCAT(devices.brand, ' ', devices.model) AS device 
            FROM apple_updates_clean 
                JOIN devices ON apple_updates_clean.device_id=devices.id`
    );
};

module.exports.updateApproved = function updateApproved({ id, approved }) {
    return db.query(
        `UPDATE apple_updates_clean SET approved = $2 WHERE id = $1 RETURNING id,approved`,
        [id, approved]
    );
};

/* module.exports.getUpdatesByRawId = function getUpdatesByRawId(raw_id) {
    return db.query(
        `SELECT 
                apple_updates_clean.id AS id,
                apple_updates_clean.created_at AS created_at,
                apple_updates_clean.raw_id AS raw_id,
                apple_updates_clean.url AS url,
                apple_updates_clean.software AS software,
                apple_updates_clean.device_id AS device_id,
                apple_updates_clean.release_date AS release_date,
                apple_updates_clean.approved AS approved,
                CONCAT(devices.brand, ' ', devices.model) AS device
            FROM apple_updates_clean 
                JOIN devices ON apple_updates_clean.device_id=devices.id 
            WHERE apple_updates_clean.raw_id = $1`,
        [raw_id]
    );
};

module.exports.getRawByApproved = function getRawByApproved(approved) {
    if (approved === null) {
        return db.query(
            "SELECT * FROM apple_updates_raw WHERE approved IS NULL"
        );
    }
}; */
