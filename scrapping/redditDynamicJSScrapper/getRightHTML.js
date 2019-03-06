"use strict";

const rp = require("request-promise");
const puppeteer = require("puppeteer");

<<<<<<< HEAD
let getHTML = (url, func) => {
    async function run () {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        let content = await page.content();

        let prom  = new Promise( (resolve, reject) => { resolve(content) } )
        
        let res = func(prom);

        browser.close();

        return res;
    }
    return run();
}

getHTML.prototype

=======
function getHTML(url) {
    return puppeteer
        .launch()
        .then(function (browser) {
            return browser.newPage();
        })
        .then(function (page) {
            return page.goto(url).then(function () {
                return page.content();
            });
        })
}

>>>>>>> 071a292a141d14feea25064f099877e38d09ca86
module.exports = getHTML;