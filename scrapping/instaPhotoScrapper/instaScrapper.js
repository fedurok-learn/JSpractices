"use strict";

const rp = require("request-promise");
const $ = require("cheerio");

const getHTML = require("../redditDynamicJSScrapper/getRightHTML");

const url = "https://www.instagram.com/_headless_nick_/"
const addUrl = 'https://www.instagram.com'


let photoLinks = getHTML(url,
    (content) => {
        return content.then(
                (html) => {
                    let clsName = "v1Nh3 kIKUG  _bz0w";
                    let detailedPhotos = [];

                    $('.v1Nh3.kIKUG._bz0w', html).each(
                        function () {
                            let linkToPhoto = addUrl + $(this).children().attr('href');
                            detailedPhotos.push(linkToPhoto);
                        }
                    );

                    return detailedPhotos;
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )
    }
)

const processEveryPhoto = (links) => {
    let photoLinks = [];
    let index = 1;
    for (let link of links) {
        getHTML(link,
            (content) => {
                return content
                    .then(
                        (html) => {
                            let clsName = ".KL4Bh";
                            let res = $(clsName, html).children().attr('src')
                            photoLinks.push(
                                res
                            );
                        }
                    );
            }
        )
        if (++index > 5) break;
    }

    console.log(photoLinks)
    return photoLinks;
}

photoLinks
    .then(processEveryPhoto)
    .then(console.log);