const  {readFileSync, writeFileSync } = require('fs');
const xml = require('xml-js');

let xmlObject = JSON.parse(xml.xml2json(readFileSync('./static/sitemap.xml'), {compact: true, spaces: 4}));
console.log(xmlObject);

exports.updateCar = (id) => {
    let car = undefined;
    for (let i = 0; i < xmlObject.urlset.url.length; i++) {
        console.log(xmlObject.urlset.url[i]);
        if (xmlObject.urlset.url[i].loc._text === 'https://www.starmotorsales.net/car/'+id) car = i;
    }
    let today = new Date();
    let lastmod = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    if (car == undefined) {
        xmlObject.urlset.url.push({
            loc: { _text: 'https://www.starmotorsales.net/car/'+id },
            lastmod: { _text: lastmod },
            changefreq: { _text: 'weekly' }
        });
    } else {
        xmlObject.urlset.url[car].lastmod = { _text: lastmod };
    }
    xmlObject.urlset.url[1].lastmod = { _text: lastmod };

    writeFileSync('./static/sitemap.xml', xml.json2xml(JSON.stringify(xmlObject), {compact: true, ignoreComment: true, spaces: 4}));
}

exports.removeCar = (id) => {
    let car = undefined;
    for (let i = 0; i < xmlObject.urlset.url.length; i++) {
        console.log(xmlObject.urlset.url[i]);
        if (xmlObject.urlset.url[i].loc._text === 'https://www.starmotorsales.net/car/'+id) car = i;
    }
    let today = new Date();
    let lastmod = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    xmlObject.urlset.slice(i, 1);
    xmlObject.urlset.url[1].lastmod = { _text: lastmod };

    writeFileSync('./static/sitemap.xml', xml.json2xml(JSON.stringify(xmlObject), {compact: true, ignoreComment: true, spaces: 4}));
}