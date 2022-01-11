const mysql = require('mysql');
const { DATABASE_CREDENTIALS } = require('../config');
let c = mysql.createConnection(DATABASE_CREDENTIALS);

c.connect();

c.query('CREATE TABLE IF NOT EXISTS `cars` (' +
    '`id` VARCHAR(36) NOT NULL,' +
    '`stock` VARCHAR(256),' +
    '`model` VARCHAR(256),' +
    '`year` INT,' +
    '`miles` INT,' +
    '`vin` VARCHAR(17),' +
    '`price` INT,' +
    '`description` VARCHAR(1024),' +
    '`color` VARCHAR(64),' +
    '`engine` VARCHAR(64),' +
    '`drive` VARCHAR(64),' +
    '`assist` VARCHAR(64),' +
    '`images` VARCHAR(512),' +
    'PRIMARY KEY (`id`)' +
    ');', (err) => {
        if (err) throw err;
        c.query('CREATE TABLE IF NOT EXISTS `users` (' +
            '`id` VARCHAR(36) NOT NULL,' +
            '`username` VARCHAR(256),' +
            '`permissions` INT,' +
            '`password` VARCHAR(128),' +
            'PRIMARY KEY (`id`)' +
            ');', (err) => {
                if (err) throw err;
                c.end();
                console.log('Done!');
            });
    });