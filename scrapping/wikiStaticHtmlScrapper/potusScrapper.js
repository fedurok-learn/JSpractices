"use strict";

const rp = require('request-promise');
const $ = require('cheerio');
const potusParse = require('./nameandbirthday');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
    .then(function (html) {
        const wikiUrls = [];
<<<<<<< HEAD
        let parsed = $('big > a', html);
        for (let i = 0; i < 45; i++) {
            wikiUrls.push(parsed[i].attribs.href);
=======
        for (let i = 0; i < 45; i++) {
            wikiUrls.push($('big > a', html)[i].attribs.href);
>>>>>>> 071a292a141d14feea25064f099877e38d09ca86
        }
        return Promise.all(
            wikiUrls.map(function (url) {
                return potusParse('https://en.wikipedia.org' + url);
            })
        );
    })
    .then(function (presidents) {
        console.log(presidents);
    })
    .catch(function (err) {
        //handle error
        console.log(err);
    });
