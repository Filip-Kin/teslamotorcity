const fs = require('fs');

const apiCar = require('./apicar.js');
const apiImage = require('./apiimage.js');
const apiUser = require('./apiuser.js');
const apiAuth = require('./apiauth.js');

const mysql = require('mysql');
let c = mysql.createConnection({
    host: '34.74.167.132',
    port: 3306,
    user: 'starmotorsales',
    password: 'niwV^sqxb1s3Z!5h04KXlPTO8cdqO82@',
    database: 'starmotorsales'
  });
   
c.connect();

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

const express = require('express');
const app = express();
const port = 3000;


// Front end
app.use('/', express.static('web'));
app.use('/vendor/materialize-css', express.static('node_modules/materialize-css'));

app.get('/car/:carId', (req, res) => {
    fs.readFile('web/car.html', (err, data) => {
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
});
app.get('/add', (req, res) => {
    fs.readFile('web/add.html', (err, data) => {
        if (err) throw err;
        res.send(data.toString().replace('${addOrEdit}', 'Add'));
    });
});
app.get('/add/:carId', (req, res) => {
    fs.readFile('web/add.html', (err, data) => {
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
            data = data.replace('${addOrEdit}', 'Save')

            res.send(data);
        });
    });
});



// API
app.get('/api', (req, res) => res.send('Hello World!'));
app.use(express.json());

// api-car
app.get('/api/car', (req, res) => apiCar.inventory(req, res, c));
app.get('/api/car/:carId', (req, res) => apiCar.info(req, res, c));
app.post('/api/car/add', (req, res) => apiCar.add(req, res, c));
app.post('/api/car/:carId/remove', (req, res) => apiCar.remove(req, res, c));

// api-image
app.post('/api/image/:id/remove', (req, res) => apiImage.remove(req, res, c));
app.post('/api/image/add', (req, res) => apiImage.upload(req, res, c));

// api-user
app.get('/api/user/:username', (req, res) => apiUser.userExists(req, res, c));
app.post('/api/user/add', (req, res) => apiUser.addUser(req, res, c));

// api-auth
app.post('/api/auth/:id', (req, res) => apiAuth.apiauth(req, res, c));


app.listen(port, () => console.log('SMS Server running on '+port));
