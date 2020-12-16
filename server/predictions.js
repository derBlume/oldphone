const db = require("./db");

module.exports.getAvgSupport = async function getAvgSupport() {
    const { rows } = await db.getDevicesAll();
    const latest = await db.getLatestOs();

    const latest_os = latest.rows[0].software.match(/\d+/i)[0];

    let sum = 0;
    let count = 0;
    for await (const device of rows) {
        const updates = await db.getUpdatesByDeviceId(device.id);
        const last_update = updates.rows[0].release_date;
        const last_os = updates.rows[0].software.match(/\d+/i)[0];

        if (last_os !== latest_os) {
            const duration = last_update - device.release_date;

            sum = sum + duration;
            count = count + 1;
        }
    }

    return Math.floor(sum / count);
};
