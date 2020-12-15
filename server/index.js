const express = require("express");
const app = express();

const db = require("./db");

app.use(express.static("dist"));

app.get("/api/devices/", async (request, response) => {
    if (request.query.search) {
        const { rows } = await db.findDevice(request.query.search);
        response.json(rows);
    } else if (request.query.id) {
        const device = await db.getDeviceById(request.query.id);
        const updates = await db.getUpdatesByDeviceId(request.query.id);
        response.json({ ...device.rows[0], updates: updates.rows });
    }
});

/* app.get("/api/updates-by-device/:device", async (request, response) => {
    const { rows } = await db.getUpdatesByDevice(request.params.device);
    response.json(rows);
}); */

app.listen(process.env.PORT || 8081, () => {
    console.log("OLDPHONE IS LISTENING..");
});
