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

module.exports.getUpdatesByDeviceId = function getUpdatesByDeviceId(device_id) {
    return db.query("SELECT * FROM apple_updates_clean WHERE device_id = $1", [
        device_id,
    ]);
};
