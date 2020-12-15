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

app.get("/api/admin/updates", async (request, response) => {
    const raw = await db.getRawByApproved(null);

    let composed = [];
    for await (const row of raw.rows) {
        const clean = await db.getUpdatesByRawId(row.id);

        composed.push({ ...row, clean_rows: [...clean.rows] });
    }

    response.json(composed);
});

app.listen(process.env.PORT || 8081, () => {
    console.log("OLDPHONE IS LISTENING..");
});
