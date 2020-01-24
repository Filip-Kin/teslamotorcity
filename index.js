const fs = require('fs');

const mysql = require('mysql');
let c = mysql.createConnection({
    host: '34.74.167.132',
    port: 3306,
    user: 'starmotorsales',
    password: 'niwV^sqxb1s3Z!5h04KXlPTO8cdqO82@',
    database: 'starmotorsales'
  });
   
c.connect();

const express = require('express');
const app = express();
const port = 3000;


app.use('/', express.static('web'));
app.use('/vendor/materialize-css', express.static('node_modules/materialize-css'));

app.get('/car/:carId', (req, res) => {
    fs.readFile('web/car.html', (err, data) => {
        if (err) throw err;
        data = data.toString();
        c.query(`SELECT * FROM cars WHERE id = "${req.params.carId}"`, (err, row) => {
            if (err) res.send(data);

            row = row[0];
            // Replace variables in the .html
            data.replace('${id}', row.id);
            data.replace('${make}', row.make);
            data.replace('${model}', row.model);
            data.replace('${year}', row.year);
            data.replace('${vin}', row.vin);
            data.replace('${price}', row.price);
            data.replace('${description}', row.description);
            data.replace('${body}', row.body);
            data.replace('${color}', row.color);
            data.replace('${engine}', row.engine);
            data.replace('${drive}', row.drive);
            data.replace('${cylinders}', row.cylinders);
            data.replace('${transmission}', row.transmission);
            data.replace('${fuel}', row.fuel);
            data.replace('${images}', row.images);

            res.send(data);
        });
    });
});

// API
app.get('/api', (req, res) => res.send('Hello World!'));

// Return car row
app.get('/api/car/:carId', (req, res) => {
    let response = {status: 404, error: "404 Car not found"}
    c.query(`SELECT * FROM cars WHERE id = "${req.params.carId}"`, (err, row) => {
        if (err) { response.status = 500; response.error = "err.message"; }
        res.send(row[0]);
    });
    res.status(response.status);
    res.send(response);
});

// Return image
app.get('/api/image/:imageId', (req, res) => {
    let response = {status: 404, error: "404 Car not found"}
    fs.readFile('carimg/'+req.params.imageId+'.jpg', (err, data) => {
        if (err) { 
            response.error = err.message;
        } else {
            return res.send(data);
        }
        if (response.status === 404) res.status(404);
        res.send(response);
    });
});


app.listen(port, () => console.log('SMS Server running on '+port));
