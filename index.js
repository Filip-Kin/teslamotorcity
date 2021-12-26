// External functions
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
let c = mysql.createConnection(DATABASE_CREDENTIALS);
c.connect();
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



// Dynamic pages
app.get('/car/:carId', (req, res) => generateCarPage(req, res, c));
app.get('/add', (req, res) => generateBlankAddPage(req, res));
app.get('/add/:carId', (req, res) => generateEditPage(req, res, c));
app.get('/addUser', (req, res) => generateBlankUserAddPage(req, res));
app.get('/addUser/:userId', (req, res) => generateUserEditPage(req, res, c));


// API
app.get('/api', (req, res) => res.send('Hello World!'));
app.use(bodyParser.raw({ limit: '50mb', type: ['image/jpeg', 'image/png'] }));
app.post('/api/image/add', (req, res) => apiImage.upload(req, res, c));
app.use(express.json());

// api-car
app.get('/api/car', (req, res) => apiCar.inventory(req, res, c));
app.get('/api/car/:carId', (req, res) => apiCar.info(req, res, c));
app.post('/api/car/add', (req, res) => apiCar.add(req, res, c));
app.post('/api/car/:carId/remove', (req, res) => apiCar.remove(req, res, c));

// api-image
app.post('/api/image/:id/remove', (req, res) => apiImage.remove(req, res, c));

// api-user
app.get('/api/user', (req, res) => apiUser.userList(req, res, c));
app.get('/api/user/:username', (req, res) => apiUser.userExists(req, res, c));
app.post('/api/user/add', (req, res) => apiUser.addUser(req, res, c));
app.post('/api/user/:username/remove', (req, res) => apiUser.remove(req, res, c));

// api-auth
app.post('/api/auth/:id', (req, res) => apiAuth.apiauth(req, res, c));



// Put the server up
app.listen(port, () => console.log('SMS Server running on ' + port));