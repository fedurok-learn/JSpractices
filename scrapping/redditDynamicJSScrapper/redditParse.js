"use strict";

const rp = require("request-promise");
const puppeteer = require("puppeteer");
const $ = require('cheerio');

const getHTML = require("./getRightHTML");

const url = "https://www.reddit.com/";

<<<<<<< HEAD
getHTML(url,
    (content) => {
        return content.then(
            (html) => {
            $('h2', html).each(function () {
                console.log($(this).text());
            });

        })
        .catch(function (err) {
            console.log( err );
        });
    }
);

=======
getHTML(url)
    .then(function (html) {
        $('h2', html).each(function () {
            console.log($(this).text());
        });
    })
    .catch(function (err) {
        console.log( err );
    });
>>>>>>> 071a292a141d14feea25064f099877e38d09ca86
