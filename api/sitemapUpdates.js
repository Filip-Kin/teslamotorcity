const  {readFileSync, writeFileSync } = require('fs');
const xml = require('xml-js');

let xmlObject = xml.xml2json(readFileSync('./static/sitemap.xml'), {compact: true, spaces: 4});
console.log(xmlObject);

exports.updateCar = (id) => {
    let car = xmlObject.urlset.urlfind((v) => (v.loc === 'https://www.starmotorsales.net/car/'+id));
    let today = new Date();
    let lastmod = today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate();

    if (car == undefined) {
        xmlObject.urlset.urlpush({
            loc: 'https://www.starmotorsales.net/car/'+id,
            lastmod: lastmod,
            changefreq: 'weekly'
        });
    } else {
        xmlObject.urlset[xmlObject.urlset.urlindexOf(car)].lastmod = lastmod;
    }
    xmlObject.urlset[1].lastmod = lastmod;

    writeFileSync('./static/sitemap.xml', xml.json2xml(xmlObject, {compact: true, ignoreComment: true, spaces: 4}));
}

exports.removeCar = (id) => {
    let car = xmlObject.urlset.urlfind((v) => (v.loc === 'https://www.starmotorsales.net/car/'+id));
    let today = new Date();
    let lastmod = today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate();

    xmlObject.urlset = xmlObject.urlset.urlfilter((v) => (v !== car));
    xmlObject.urlset[1].lastmod = lastmod;

    writeFileSync('./static/sitemap.xml', xml.json2xml(xmlObject, {compact: true, ignoreComment: true, spaces: 4}));
}