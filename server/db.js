const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:patrick:postgres@localhost:5432/oldphone"
);

module.exports.getUpdatesByDevice = function getUpdatesByDevice(device) {
    return db.query("SELECT * FROM apple_updates_clean WHERE device = $1", [
        device,
    ]);
};
