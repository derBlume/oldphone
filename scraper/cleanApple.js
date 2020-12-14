const db = require("./db.js");

const DUPLICATE_ERROR = "duplicate key value violates unique constraint";

module.exports.cleanApple = async function cleanApple() {
    console.log("cleaning up Apple raw data");
    const { rows } = await db.getRawData();
    console.log("No of raw rows", rows.length);

    //filter all Rows with versions of iOS in "software"
    //special treatment for inconsistent rows in early days of iPhone
    const filtered1 = [];

    rows.forEach((el) => {
        el.software = el.software.replace(
            /(ios\s\d+(\.\d+)*)(?= for iPod)/gi,
            ""
        ); //discard iOS versions for iPod (iOS 3.x)
        const matches = el.software.match(/ios\s\d+(\.\d+)*/gi);
        const legacy_matches = el.software.match(/iphone\sv*\d+(\.\d+)*/gi);
        if (matches) {
            matches.forEach((match) => {
                filtered1.push({
                    ...el,
                    software: match,
                    release_date: new Date(el.release_date),
                });
            });
        }
        if (legacy_matches) {
            legacy_matches.forEach((match) => {
                filtered1.push({
                    ...el,
                    software: match.replace("iPhone", "iOS").replace("v", ""),
                    devices: "iPhone and later", //iPhone v1.0 through v2.0.2, iPhone 1.0 - 1.1.4, iPhone iPhone v1.0 or later, iPhone 1.0 through 1.1.1, iPhone, iPhone v1.0
                    release_date: new Date(el.release_date),
                });
            });
        }
    });
    console.log("No of rows with iOS", filtered1.length);

    //filter all rows with iPhone in "devices", expand comma-separated lists
    //special treatment for inconsistent rows in early days of iPhone
    const filtered2 = [];

    filtered1.forEach((el) => {
        const entries = el.devices.split(",");
        entries.forEach((entry) => {
            if (/iphone/gi.test(entry)) {
                //recent
                filtered2.push({ ...el, devices: entry.trim() });
            } else if (/OS 1.0 through /gi.test(entry)) {
                //some legacy cases
                filtered2.push({ ...el, devices: "iPhone and later" });
            }
        });
    });
    console.log("No of rows with iPhone", filtered2.length);

    //expand "iPhone 6s and later" to full list of devices
    //limit to devices available at date of update relase!

    const filtered3 = [];

    for await (const el of filtered2) {
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
    const filtered4 = [];

    for (const el of filtered3) {
        //removing inconsistencies in legacy data
        el.devices = el.devices.replace(/iOS .+ through .+ for /gi, "");

        // ignoring seperate updates for iPhone 4 GSM and CDMA models in 2011
        el.devices = el.devices.replace(/\s\(GSM model\)/gi, "");
        el.devices = el.devices.replace(/\s\(CDMA model\)/gi, "");

        // fix if comma separated list has ", and " (19 Nov 2020, iPhone 12)
        if (el.devices.startsWith("and")) {
            el.devices = el.devices.replace(/and\s/i, "");
        }

        //fix singular occurence of shorthand notation
        el.devices = el.devices.replace(
            "iPhone 6 and 6 Plus",
            "iPhone 6 and iPhone 6 Plus"
        );

        //expand "and"-separated lists
        const entries = el.devices.split(" and ");
        entries.forEach((entry) => {
            filtered4.push({ ...el, devices: entry.trim() });
        });
    }

    console.log("No of rows after cleaning up edge cases", filtered4.length);

    //matching devices
    const final = [];

    for (const el of filtered4) {
        const { rows } = await db.getDeviceIdByNameAndBrand({
            brand: "Apple",
            name: el.devices,
        });

        if (rows.length === 1) {
            final.push({ ...el, devices: rows[0].id });
        } else if (rows.length > 1) {
            console.log("device not unique: ", el.devices);
        } else {
            console.log("device not found: ", el.devices);
        }
    }

    let linesAdded = 0;
    let linesIgnored = 0;

    for await (const el of final) {
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
};
