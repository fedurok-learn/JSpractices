"use strict";

const rp = require("request-promise");
const puppeteer = require("puppeteer");

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

module.exports = getHTML;