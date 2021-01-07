const express = require("express");
const app = express();

const db = require("./db");
const predictions = require("./predictions");

app.use(express.static("dist"));
app.use(express.json());

app.get("/api/devices/", async (request, response) => {
    if (request.query.search) {
        const { rows } = await db.findDevice(request.query.search);
        response.json(rows);
    } else if (request.query.id) {
        const device = await db.getDeviceById(request.query.id);
        const updates = await db.getUpdatesByDeviceId(request.query.id);
        const latest_os = await db.getLatestOs();
        const avg_support = await predictions.getAvgSupport(request.query.id);
        response.json({
            ...device.rows[0],
            updates: updates.rows,
            latest_os: latest_os.rows[0].software, //TODO: FIX DATA!
            avg_support: avg_support,
        });
    }
});

app.get("/api/devices/experimental/", async (request, response) => {
    if (request.query.search) {
        let results = [];
        const words = request.query.search.split(" ");
        console.log(words);

        for await (let word of words) {
            if (word) {
                const { rows } = await db.findDevice(word);
                results = [...results, ...rows];
            }
        }

        const filtered = results.filter(
            (v, i, a) => a.findIndex((t) => t.id === v.id) === i
        );

        response.json(filtered);
    } else if (request.query.id) {
        const device = await db.getDeviceById(request.query.id);
        const updates = await db.getUpdatesByDeviceId(request.query.id);
        const latest_os = await db.getLatestOs();
        const avg_support = await predictions.getAvgSupport(request.query.id);
        response.json({
            ...device.rows[0],
            updates: updates.rows,
            latest_os: latest_os.rows[0].software, //TODO: FIX DATA!
            avg_support: avg_support,
        });
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
    const { rows } = await db.updateApproved(request.body);
    response.json(rows[0]);
});

app.listen(process.env.PORT || 8081, () => {
    console.log("OLDPHONE IS LISTENING..");
});
