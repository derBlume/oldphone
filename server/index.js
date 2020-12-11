const express = require("express");
const app = express();

app.use(express.static("client"));

app.get("/", (request, response) => {
    response.json({});
});

app.listen("8081");
