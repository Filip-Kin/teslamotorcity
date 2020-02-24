const path = require('path');
const xmlEdit = require('xml-edit');

const editor = xmlEdit.getInstance({
    indentation: 2,
    strict: true,
});

let xmlObject = await editor.read(path.resolve('./static/sitemap.xml'));

exports.updateCar = (id) => {
    let car = xmlObject.urlset.find((v) => (v.loc === 'https://www.starmotorsales.net/car/'+id));
    let today = new Date();
    let lastmod = today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate();

    if (car == undefined) {
        xmlObject.urlset.push({
            loc: 'https://www.starmotorsales.net/car/'+id,
            lastmod: lastmod,
            changefreq: 'weekly'
        });
    } else {
        xmlObject.urlset[xmlObject.urlset.indexOf(car)].lastmod = lastmod;
    }
    xmlObject.urlset[1].lastmod = lastmod;

    await editor.write(path.resolve('./static/sitemap.xml'), xmlObject, process.stdout);
}

exports.removeCar = (id) => {
    let car = xmlObject.urlset.find((v) => (v.loc === 'https://www.starmotorsales.net/car/'+id));
    let today = new Date();
    let lastmod = today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate();

    xmlObject.urlset = xmlObject.urlset.filter((v) => (v !== car));
    xmlObject.urlset[1].lastmod = lastmod;

    await editor.write(path.resolve('./static/sitemap.xml'), xmlObject, process.stdout);
}