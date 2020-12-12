const express = require("express");
const app = express();

const db = require("./db");

app.use(express.static("dist"));

app.get("/api/test", (request, response) => {
    response.json([
        {
            device: "testPhone X",
            software: "testOS 12",
            date: "Jan 01, 2018",
        },
        {
            device: "testPhone 6s",
            software: "testOS 16",
            date: "Jan 01, 2020",
        },
    ]);
});

app.get("/api/updates-by-device/:device", async (request, response) => {
    const { rows } = await db.getUpdatesByDevice(request.params.device);
    response.json(rows);
});

app.listen(process.env.PORT || 8081, () => {
    console.log("OLDPHONE IS LISTENING..");
});
