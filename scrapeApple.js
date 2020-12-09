const { JSDOM } = require("jsdom");

const db = require("./db.js");

const DUPLICATE_ERROR = "duplicate key value violates unique constraint";

module.exports.scrapeApple = async function scrapeApple(url) {
    console.log("getting", url);
    const dom = await JSDOM.fromURL(url);

    const { document } = dom.window;

    const rows = [
        ...document.querySelectorAll(
            "#tableWraper table tbody tr:not(#header)"
        ),
    ];

    const notes = [...document.querySelectorAll(".note")];
    notes.forEach((el) => {
        el.remove(); //remove from DOM!
    });

    let linesAdded = 0;
    let dublicatesIgnored = 0;

    for await (row of rows) {
        const tds = [...row.querySelectorAll("td")];

        if (tds.length) {
            let url = tds[0].querySelector("a");
            if (url) {
                url = url.href;
            }

            tds.push(url);

            const dataRow = {
                software: tds[0].textContent
                    .trim()
                    .replace(/[\r\n]+/g, " ")
                    .replace(/\s+/g, " "),
                devices: tds[1].textContent
                    .trim()
                    .replace(/[\r\n]+/g, " ")
                    .replace(/\s+/g, " "),
                release_date: tds[2].textContent
                    .trim()
                    .replace(/[\r\n]+/g, " ")
                    .replace(/\s+/g, " "),
                url: tds[3],
            };
            try {
                await db.addRawData(dataRow);
                linesAdded++;
            } catch (error) {
                if (error.message.startsWith(DUPLICATE_ERROR)) {
                    dublicatesIgnored++;
                } else {
                    console.log(error.message);
                }
            }
        }
    }

    console.log(linesAdded, "lines added to db");
    console.log(dublicatesIgnored, "lines ignored since already in db");
};
