// External functions
const apiEmail = require('./api/apiemail.js');
const apiCar = require('./api/apicar.js');
const apiImage = require('./api/apiimage.js');
const apiUser = require('./api/apiuser.js');
const apiAuth = require('./api/apiauth.js');
const { generateCarPage } = require('./dynamic/dyncar.js');
const { generateBlankAddPage, generateEditPage } = require('./dynamic/dynadd.js');
const { generateBlankUserAddPage, generateUserEditPage } = require('./dynamic/dynaddUser.js');

// Mysql setup
const mysql = require('mysql');
const { DATABASE_CREDENTIALS } = require('./config');
let pool = mysql.createPool(DATABASE_CREDENTIALS);

// Daily database backup
const mysqldump = require('mysqldump');
setInterval(() => { mysqldump({ connection: DATABASE_CREDENTIALS, dumpToFile: './dbBackup.sql' }) }, 1 * 24 * 60 * 60 * 1000);

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;



// Static hosting
app.use('/', express.static('static'));
app.use('/vendor/materialize-css', express.static('node_modules/materialize-css'));
app.use('/vendor/nouislider', express.static('node_modules/nouislider'));
app.use('/vendor/wnumb', express.static('node_modules/wnumb'));



// Dynamic pages
app.get('/car/:carId', (req, res) => generateCarPage(req, res, pool.getConnection()));
app.get('/add', (req, res) => generateBlankAddPage(req, res));
app.get('/add/:carId', (req, res) => generateEditPage(req, res, pool.getConnection()));
app.get('/addUser', (req, res) => generateBlankUserAddPage(req, res));
app.get('/addUser/:userId', (req, res) => generateUserEditPage(req, res, pool.getConnection()));


// API
app.get('/api', (req, res) => res.send('Hello World!'));
app.use(bodyParser.raw({ limit: '50mb', type: ['image/jpeg', 'image/png'] }));
app.post('/api/image/add', (req, res) => apiImage.upload(req, res, pool.getConnection()));
app.use(express.json());

// api-email
app.post('/api/testdrive', (req, res) => apiEmail.testdrive(req, res));

// api-car
app.get('/api/car', (req, res) => apiCar.inventory(req, res, pool.getConnection()));
app.get('/api/car/:carId', (req, res) => apiCar.info(req, res, pool.getConnection()));
app.post('/api/car/add', (req, res) => apiCar.add(req, res, pool.getConnection()));
app.post('/api/car/:carId/remove', (req, res) => apiCar.remove(req, res, pool.getConnection()));

// api-image
app.post('/api/image/:id/remove', (req, res) => apiImage.remove(req, res, pool.getConnection()));

// api-user
app.get('/api/user', (req, res) => apiUser.userList(req, res, pool.getConnection()));
app.get('/api/user/:username', (req, res) => apiUser.userExists(req, res, pool.getConnection()));
app.post('/api/user/add', (req, res) => apiUser.addUser(req, res, pool.getConnection()));
app.post('/api/user/:username/remove', (req, res) => apiUser.remove(req, res, pool.getConnection()));

// api-auth
app.post('/api/auth/:id', (req, res) => apiAuth.apiauth(req, res, pool.getConnection()));



// Put the server up
app.listen(port, () => console.log('SMS Server running on ' + port));