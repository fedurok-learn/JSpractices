"use strict";

const $ = require("cheerio");
const fs = require('fs');
const rp = require('request-promise');
const puppeteer = require("puppeteer");

const asyncf = require("../asyncMap");

const url = "https://www.instagram.com/_headless_nick_/"
const PATH =  __dirname + "/Photos/"
const addUrl = 'https://www.instagram.com'

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

let getHTML = (url) => {
    return new Promise(
        async (resolve, reject) => {
            try {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(url);
            
                await autoScroll(page);

                const content = await page.content();

                resolve(content);
            
                await browser.close();
            } catch(err) {
                reject(err);
            }
        }
    )
}

const processEveryPhoto = (links) => {
    
    function fn(item, nextFn) {
        let res = getHTML(item)
            .then(
                (html) => {
                    let clsName = ".KL4Bh";
                    let res = $(clsName, html).children().attr('src');

                    return res;
                }//errors
            )

        nextFn(null, res);
    }

    let arr = new Array();

    function done(err, res) {
        if (err) {
            console.log(err);
            return;
        }

        for(let i = 0; i < res.length; i++) {
            arr[i] = res[i];
        }
    }

    asyncf.map(links, fn, done);

    return arr;
}


//start of a program
getHTML(url)
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

            
            process.setMaxListeners(detailedPhotos.length);
            return detailedPhotos;
        }
    )
    .then(processEveryPhoto)
    .then(
        (linkArray) => {
            return Promise.all(linkArray);   
        }
    )
    .then(
        (linkArray) => {
            linkArray.map(
                (item) => {
                    const options = {
                        url: item,
                        encoding: null
                    }
                    
                    function genName(item) {
                        return PATH + Date.now() + ".jpg";
                    }

                    rp.get(options)
                        .then(
                            function (res) {
                                const buffer = Buffer.from(res, 'utf8');
                                fs.writeFileSync(genName(item), buffer);
                            }
                        );
                }
            )
        }
    )
    .catch(
        (err) => {
            console.log(err);
        }
    )