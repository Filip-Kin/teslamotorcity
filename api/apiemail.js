const { SMTP, CAPTCHA_SECRET } = require('../config');
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(SMTP);

// Captcha
exports.captcha = (req, res) => {
    fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET}&response=${req.body.token}`, {
        method: 'POST'
    })
    .then(data => data.json())
    .then(json => {
        if (json.success && json.score > 0.2) {
            res.send({valid: true});
        } else {
            res.send({valid: false});
        }
    });
};

// Test drive
exports.testdrive = (req, res) => {
    transporter.sendMail({
        from: '"Tesla Motor City" <ozella.wolf10@ethereal.email>',
        to: 'me@filipkin.com',
        subject: 'Test Drive Request', // Subject line
        html: `${req.body.firstName} ${req.body.lastName} is requesting to test drive a model ${req.body.model}<br><br>${req.body.email}<br>${req.body.phone}<br><br>${req.body.comment}`
    }).then(info => {
        console.log(info);
        res.send()
    });
};

// Rental
exports.rental = (req, res) => {
    transporter.sendMail({
        from: '"Tesla Motor City" <ozella.wolf10@ethereal.email>',
        to: 'me@filipkin.com',
        subject: 'Rental Request', // Subject line
        html: `${req.body.firstName} ${req.body.lastName} is requesting to rent a model ${req.body.model}<br><br>${req.body.email}<br>${req.body.phone}<br><br>${req.body.comment}`
    }).then(info => {
        console.log(info);
        res.send()
    });
};

// Special
exports.special = (req, res) => {
    transporter.sendMail({
        from: '"Tesla Motor City" <ozella.wolf10@ethereal.email>',
        to: 'me@filipkin.com',
        subject: 'Special Incentive Request', // Subject line
        html: `${req.body.firstName} ${req.body.lastName} is requesting a special on a model ${req.body.model}<br><br>${req.body.email}<br>${req.body.phone}`
    }).then(info => {
        console.log(info);
        res.send()
    });
};

// Eprice
exports.eprice = (req, res) => {
    transporter.sendMail({
        from: '"Tesla Motor City" <ozella.wolf10@ethereal.email>',
        to: 'me@filipkin.com',
        subject: 'Eprice Request', // Subject line
        html: `${req.body.firstName} ${req.body.lastName} is requesting an eprice on VIN ${req.body.vin}<br><br>${req.body.email}<br>${req.body.phone}`
    }).then(info => {
        console.log(info);
        res.send()
    });
};

// Info
exports.eprice = (req, res) => {
    transporter.sendMail({
        from: '"Tesla Motor City" <ozella.wolf10@ethereal.email>',
        to: 'me@filipkin.com',
        subject: 'Info Request', // Subject line
        html: `${req.body.firstName} ${req.body.lastName} is requesting more information on VIN ${req.body.vin}<br><br>${req.body.email}<br>${req.body.phone}<br><br>${req.body.comment}`
    }).then(info => {
        console.log(info);
        res.send()
    });
};

// Financing
exports.financing = (req, res) => {
    transporter.sendMail({
        from: '"Tesla Motor City" <ozella.wolf10@ethereal.email>',
        to: 'me@filipkin.com',
        subject: 'Financing Request', // Subject line
        html: `${JSON.stringify(req.body, null, 4).replace('"', '')}`
    }).then(info => {
        console.log(info);
        res.send()
    });
};