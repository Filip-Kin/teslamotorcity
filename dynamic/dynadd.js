const fs = require('fs');

exports.generateBlankAddPage = (req, res) => {
    fs.readFile('./dynamic/add.html', (err, data) => {
        if (err) throw err;
        res.send(data.toString());
    });
};

exports.generateEditPage = (req, res, c) => {
    fs.readFile('./dynamic/add.html', (err, data) => {
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
            data = data.replace('${price}', row.price);
            data = data.replace('${description}', row.description);
            data = data.replace('${body}', row.body);
            data = data.replace('${color}', row.color);
            data = data.replace('${engine}', row.engine);
            data = data.replace('${drive}', row.drive);
            data = data.replace('${cylinders}', row.cylinders);
            data = data.replace('${transmission}', row.transmission);
            data = data.replace('${fuel}', row.fuel);
            data = data.replace('${images}', row.images);

            res.send(data);
        });
    });
}