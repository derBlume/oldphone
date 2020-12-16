const express = require("express");
const app = express();

const db = require("./db");

app.use(express.static("dist"));
app.use(express.json());

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
    let raw = [];
    let clean = [];
    if (request.query.raw === "all") {
        const { rows } = await db.getRawAll();
        raw = rows;
    }
    if (request.query.clean === "all") {
        const { rows } = await db.getCleanAll();
        clean = rows;
    }

    response.json({ raw, clean });
});

app.post("/api/admin/updates/approve", async (request, response) => {
    console.log(request.body);
    const { rows } = await db.updateApproved(request.body);
    response.json(rows[0]);
});

app.listen(process.env.PORT || 8081, () => {
    console.log("OLDPHONE IS LISTENING..");
});
