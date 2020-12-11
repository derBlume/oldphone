const { JSDOM } = require("jsdom");

const db = require("./db");
const { scrapeApple } = require("./scrapeApple");
const { cleanApple } = require("./cleanApple");

async function getAppleUpdates() {
    await scrapeApple("https://support.apple.com/en-us/HT201222"); //2016 - now (th)
    await scrapeApple("https://support.apple.com/en-us/HT209441"); //2015 (th)
    await scrapeApple("https://support.apple.com/en-us/HT205762"); //2014 (th)
    await scrapeApple("https://support.apple.com/en-us/HT205759"); //2013 (th)
    await scrapeApple("https://support.apple.com/en-us/HT204611"); //2011-12 (td p strong) !!!!!
    await scrapeApple("https://support.apple.com/en-us/HT5165"); //2010 (tr id="header"/td div b)
    await scrapeApple("https://support.apple.com/en-us/HT4218"); //2008-09 (tr id="header"/td div b)
    await scrapeApple("https://support.apple.com/en-us/HT1263"); //2005-07 (tr id="header"/td div b)

    await cleanApple();
}

getAppleUpdates();
