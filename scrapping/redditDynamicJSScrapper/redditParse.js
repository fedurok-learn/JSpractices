"use strict";

const $ = require('cheerio');

const getHTML = require("./getRightHTML");

const url = "https://www.reddit.com/";

getHTML(url)
    .then(
        (html) => {
            $('h2', html).each(
                function() {
                    console.log($(this).text());
                }
            )
        },
        (err) => {
            console.log(err);
        }
    )