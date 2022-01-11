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
            data = data.replace(/\${id}/g, row.id);
            data = data.replace(/\${model}/g, row.model);
            data = data.replace(/\${year}/g, row.year);
            data = data.replace(/\${miles}/g, row.miles);
            data = data.replace(/\${vin}/g, row.vin);
            data = data.replace(/\${price}/g, row.price/100);
            data = data.replace(/\${description}/g, row.description);
            data = data.replace(/\${color}/g, row.color);
            data = data.replace(/\${engine}/g, row.engine);
            data = data.replace(/\${drive}/g, row.drive);
            data = data.replace(/\${assist}/g, row.assist);
            data = data.replace(/\${images}/g, row.images);

            res.send(data);
        });
    });
}