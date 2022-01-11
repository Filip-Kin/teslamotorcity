const fs = require('fs');

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const imagesHTML = (imgs) => {
    imgs = JSON.parse(imgs);
    if (imgs.length < 1) return `<img src="https://via.placeholder.com/1280x720">`;
    let output = `<div class="row center"><img src="/img/${imgs[0]}" class="responsive-img"></div>`;
    if (imgs.length > 1) {
        for (let i = 0; i < imgs.length; i++) {
            if (i > 0) {
                if ((i-1)%2 === 0) output += `<div class="row">`;
                output += `<div class="col s12 m6"><img src="/img/${imgs[i]}" class="responsive-img"></div>`;
                if ((i-1)%2 !== 0 || i+1 === imgs.length) output += `</div>`;
            }
        }
    }
    return output;
}

exports.generateCarPage = (req, res, c) => {
    fs.readFile('./dynamic/car.html', (err, data) => {
        if (err) throw err;
        data = data.toString();
        c.query(`SELECT * FROM cars WHERE id = "${req.params.carId}"`, (err, row) => {
            if (err) res.send(data);

            if (row.length < 1) {
                res.status(404);
                return res.send('Not found');
            }
            row = row[0];
            console.log(row);
            // Replace variables in the .html
            data = data.replace(/\${id}/g, row.id);
            data = data.replace(/\${model}/g, row.model);
            data = data.replace(/\${year}/g, row.year);
            data = data.replace(/\${miles}/g, row.miles);
            data = data.replace(/\${vin}/g, row.vin);
            data = data.replace(/\${price}/g, row.price/100);
            data = data.replace(/\${formattedPrice}/g, '$'+numberWithCommas(row.price/100));
            data = data.replace(/\${description}/g, row.description);
            data = data.replace(/\${color}/g, row.color);
            data = data.replace(/\${engine}/g, row.engine);
            data = data.replace(/\${drive}/g, row.drive);
            data = data.replace(/\${assist}/g, row.assist);
            data = data.replace(/\${images}/g, row.images);
            data = data.replace(/\${imagesHTML}/g, imagesHTML(row.images));

            res.send(data);
        });
    });
}