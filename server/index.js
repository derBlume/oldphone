const express = require("express");
const app = express();

app.use(express.static("dist"));

app.get("/api/test", (request, response) => {
    response.json({ test: "I'm a test message" });
});

app.listen(process.env.PORT || 8081, () => {
    console.log("OLDPHONE IS LISTENING..");
});
