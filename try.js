const db = require("./db.js");

const raw1 = {
    software: "iOS 13.3.0 and iPadOS 13.2, iOS 12.2",
    devices:
        "iPhone 6s and later, iPod touch 7th generation, iPad Air 2 and later, and iPad mini 4 and later",
    release_date: "5 Nov 2020",
    url: "https://support.apple.com/kb/HT211929",
};

const raw2 = {
    software: "iOS 10.4",
    devices:
        "iPhone 5s, iPhone 6 and 6 Plus, iPad Air, iPad mini 2 and 3, iPod touch (6th generation)",
    release_date: "5 Nov 2020",
    url: "https://support.apple.com/kb/HT211929",
};

const rows = [raw1, raw2];

//filter all Rows with versions of iOS in "software"
const filtered1 = [];

rows.forEach((el) => {
    const matches = el.software.match(/ios\s*\d+(\.\d+)*/gi);
    //console.log("MATCHES:", matches);
    if (matches) {
        matches.forEach((match) => {
            filtered1.push({ ...el, software: match });
        });
    }
});

//console.log("FILTERED ARRAY: ", filtered1);

//filter all rows with iPhone in "devices"
const filtered2 = [];

filtered1.forEach((el) => {
    const entries = el.devices.split(",");
    entries.forEach((entry) => {
        if (/iphone/gi.test(entry)) {
            filtered2.push({ ...el, devices: entry });
        }
    });
});

//console.log("SECOND FILTERED ARRAY", filtered2);

const filtered3 = [];

filtered2.forEach(async (el) => {
    const matches = el.devices.match(/iPhone .*(?=( and later))/gi);
    //console.log("MATCHES", matches);
    if (matches) {
        /* const rows = [
            { model: "iPhone 6s" },
            { model: "iPhone 6s Plus" },
            { model: "iPhone SE" },
            { model: "iPhone 7" },
            { model: "iPhone 7 Plus" },
        ]; */
        const { rows } = await db.getDeviceAndLater(matches[0]);
        //console.log("DB ROWS", rows);
        if (rows.length) {
            rows.forEach((row) => {
                filtered3.push({ ...el, devices: row.model });
            });
        } else {
            console.log("device not found");
        }
    }
});

//console.log("THIRD FILTERED ARRAY", filtered3);
// RegEx /ios\s*\d+(\.\d+)*/i  matches ios followed by 0 or more whitespaces, followed by 1 or more digits, followed by 0 or more instances of (. followed by 1 or more digits) ignoring casing

let string1 = "iPhone 3GS and iPhone 4 (GSM model)";
let string2 = "iPhone 4 (CDMA model)";

string1 = string1.replace(/\s\(GSM model\)/gi, "");
string2 = string2.replace(/\s\(CDMA model\)/gi, "");

console.log(string1);
console.log(string2);

const match1 = string1.match(/iPhone.*(?=( and later))/gi);
const match2 = string2.match(/iPhone.*(?=( and later))/gi);

//console.log(match1);
//console.log(match2);

const test1 = /iPhone\s+.*(?=and later)/gi.test("iPhone 6s and later");
const test2 = /iPhone\s+.*(?=and later)/gi.test("iPhone 6 and 6 Plus");
//console.log(test1);
//console.log(test2);

const date = new Date("12 Nov 2020");
//console.log("DATE: ", date.toISOString());
