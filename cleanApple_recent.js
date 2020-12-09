const db = require("./db.js");

const DUPLICATE_ERROR = "duplicate key value violates unique constraint";

module.exports.cleanApple = async function cleanApple() {
    console.log("cleaning up Apple raw data");
    const { rows } = await db.getRawData();
    console.log("No of raw rows", rows.length);

    //filter all Rows with versions of iOS in "software"
    const filtered1 = [];

    rows.forEach((el) => {
        const matches = el.software.match(/ios\s\d+(\.\d+)*/gi);
        if (matches) {
            matches.forEach((match) => {
                filtered1.push({
                    ...el,
                    software: match,
                    release_date: new Date(el.release_date),
                });
            });
        }
    });
    console.log("No of rows with iOS", filtered1.length);

    //filter all rows with iPhone in "devices", expand comma-separated lists
    const filtered2 = [];

    filtered1.forEach((el) => {
        const entries = el.devices.split(",");
        entries.forEach((entry) => {
            if (/iphone/gi.test(entry)) {
                filtered2.push({ ...el, devices: entry.trim() });
            }
        });
    });
    console.log("No of rows with iPhone", filtered2.length);

    //expand "iPhone 6s and later" to full list of devices

    const filtered3 = [];

    for await (el of filtered2) {
        const matches = el.devices.match(/iPhone.*(?=( and later))/gi);
        if (matches) {
            const { rows } = await db.getDeviceAndLater({
                device: matches[0],
                update_date: el.release_date,
            });

            if (rows.length) {
                rows.forEach((row) => {
                    filtered3.push({ ...el, devices: row.model });
                });
            } else {
                console.log("device not found");
            }
        } else {
            filtered3.push(el);
        }
    }
    console.log("No of rows after expanding -and later-", filtered3.length);

    // cleaning up some edge cases
    filtered4 = [];

    for (el of filtered3) {
        if (el.devices.startsWith("and")) {
            el.devices = el.devices.replace(/and\s/i, "");
        }

        el.devices = el.devices.replace(
            "iPhone 6 and 6 Plus",
            "iPhone 6 and iPhone 6 Plus"
        );
        const entries = el.devices.split(" and ");
        entries.forEach((entry) => {
            filtered4.push({ ...el, devices: entry.trim() });
        });
    }

    console.log("No of rows after cleaning up edge cases", filtered4.length);

    let linesAdded = 0;
    let linesIgnored = 0;

    for await (el of filtered4) {
        try {
            await db.addLineToCleanTable(el);
            linesAdded++;
        } catch (error) {
            if (error.message.startsWith(DUPLICATE_ERROR)) {
                linesIgnored++;
            } else {
                console.log(error.message);
            }
        }
    }
    console.log("Lines added to DB", linesAdded);
    console.log("Duplicate lines ignored", linesIgnored);

    // RegEx /ios\s*\d+(\.\d+)*/i  matches ios followed by 0 or more whitespaces, followed by 1 or more digits, followed by 0 or more instances of (. followed by 1 or more digits) ignoring casing
};
