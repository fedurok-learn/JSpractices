"use strict";

const $ = require("cheerio");

const getHTML = require("../getRightHTML");
const asyncf = require("../asyncMap");

const url = "https://www.instagram.com/_headless_nick_/"
const addUrl = 'https://www.instagram.com'


const processEveryPhoto = (links) => {

    function fn(item, nextFn) {
        getHTML(item)
        .then(
            (html) => {
                let clsName = ".KL4Bh";
                let res = $(clsName, html).children().attr('src');

                return res;
            },
            nextFn
        )
        .then(nextFn);
    }

    asyncf.map(links, fn);

    return links;
}

let photoLinks = getHTML(url)
    .then(
        (html) => {
            let clsName = "v1Nh3 kIKUG  _bz0w";
            let detailedPhotos = [];

            $('.v1Nh3.kIKUG._bz0w', html)
            .each(
                function () {
                    let linkToPhoto = addUrl + $(this).children().attr('href');
                    detailedPhotos.push(linkToPhoto);
                }
            );
            
            return detailedPhotos;
        }
    )
    .then(processEveryPhoto)
    .then(console.log)
    .catch(
        (err) => {
            console.log(err);
        }
    )