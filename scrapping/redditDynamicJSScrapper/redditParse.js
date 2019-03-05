"use strict";

const rp = require("request-promise");
const puppeteer = require("puppeteer");
const $ = require('cheerio');

const getHTML = require("./getRightHTML");

const url = "https://www.reddit.com/";

getHTML(url)
    .then(function (html) {
        $('h2', html).each(function () {
            console.log($(this).text());
        });
    })
    .catch(function (err) {
        console.log( err );
    });