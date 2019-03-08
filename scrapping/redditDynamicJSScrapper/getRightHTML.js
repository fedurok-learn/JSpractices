"use strict";

const puppeteer = require("puppeteer");



let getHTML = (url) => {
    return new Promise(
        async (resolve, reject) => {
            try {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(url);
                let content = await page.content();

                let prom  = new Promise( (resolve, reject) => { resolve(content) } )

                resolve(content);
            
                browser.close();
            } catch (err) {
                reject(err);
            }
        }
    )
}

module.exports = getHTML;