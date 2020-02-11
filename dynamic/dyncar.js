const fs = require('fs');

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const imagesHTML = (imgs) => {
    imgs = JSON.parse(imgs);
    if (imgs.length < 1) return `<img src="https://via.placeholder.com/1280x720">`;
    let output = `<div class="row"><img src="/img/${imgs[0]}" class="responsive-img"></div>`;
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
            data = data.replace('${id}', row.id);
            data = data.replace('${make}', row.make);
            data = data.replace('${model}', row.model);
            data = data.replace('${year}', row.year);
            data = data.replace('${vin}', row.vin);
            data = data.replace('${price}', row.price/100);
            data = data.replace('${formattedPrice}', '$'+numberWithCommas(row.price/100));
            data = data.replace('${description}', row.description);
            data = data.replace('${body}', row.body);
            data = data.replace('${color}', row.color);
            data = data.replace('${engine}', row.engine);
            data = data.replace('${drive}', row.drive);
            data = data.replace('${cylinders}', row.cylinders);
            data = data.replace('${transmission}', row.transmission);
            data = data.replace('${fuel}', row.fuel);
            data = data.replace('${images}', row.images);
            data = data.replace('${imagesHTML}', imagesHTML(row.images));

            res.send(data);
        });
    });
}