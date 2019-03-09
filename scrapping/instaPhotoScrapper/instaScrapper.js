"use strict";

const $ = require("cheerio");
const fs = require('fs');
const rp = require('request-promise');


const getHTML = require("../getRightHTML");
const asyncf = require("../asyncMap");

const url = "https://www.instagram.com/_headless_nick_/"
const PATH =  __dirname + "/Photos/"
const addUrl = 'https://www.instagram.com'


String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

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
                        return PATH + item.hashCode() + ".jpg";
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