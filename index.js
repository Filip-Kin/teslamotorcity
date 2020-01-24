const fs = require('fs');
const uuidv4 = require('uuidv4');

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
});

// API
app.get('/api', (req, res) => res.send('Hello World!'));

// Return car row
app.get('/api/car/:carId', (req, res) => {
    let response = {status: 404, error: "404 Car not found"}
    c.query(`SELECT * FROM cars WHERE id = "${req.params.carId}"`, (err, row) => {
        if (err) { 
            console.error(err);
            res.status(500);
            return res.send({status: 500, error: err.message});
        }
        if (row.length < 1) {
            return res.send(response);
        }
        res.send(row[0]);
    });
});

// Return image
app.get('/api/image/:imageId', (req, res) => {
    let response = {status: 404, error: "404 Car not found"}
    fs.readFile('carimg/'+req.params.imageId+'.jpg', (err, data) => {
        if (err) { 
            response.error = err.message;
            console.error(err);
        } else {
            return res.send(data);
        }
        if (response.status === 404) res.status(404);
        res.send(response);
    });
});

app.use(express.json());

// Add car
app.post('/api/car/add', (req, res) => {
    let id = uuidv4.uuid();
    console.log(id);
    console.log(req.body);
    c.query(`INSERT INTO cars 
    (id, make, model, year, vin, price, description, body, color, engine, drive, cylinders, transmission, fuel, images)
    VALUES (
        '${id}',
        '${req.body.make}',
        '${req.body.model}',
        '${req.body.year}',
        '${req.body.vin}',
        ${req.body.price},
        '${req.body.description}',
        '${req.body.body}',
        '${req.body.color}',
        '${req.body.engine}',
        '${req.body.drive}',
        '${req.body.cylinders}',
        '${req.body.transmission}',
        '${req.body.fuel}',
        '${req.body.images}'
    )`, (err) => {
        if (err) { 
            console.error(err);
            res.status(500);
            return res.send({status: 500, message: err.message}); 
        }
        res.send({status: 200, message: id});
    });
});

// Remove a car
app.post('/api/car/:carId/remove', (req, res) => {
    console.log('Remove '+req.params.carId);
    c.query(`DELETE FROM cars WHERE id = '${req.params.carId}';`, (err) => {
        if (err) { 
            console.error(err);
            res.status(500);
            return res.send({status: 500, message: err.message}); 
        }
        res.send({status: 200, message: 'Removed'});
    });
});

app.listen(port, () => console.log('SMS Server running on '+port));
