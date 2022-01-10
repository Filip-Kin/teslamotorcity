const { SMTP, CAPTCHA_SECRET } = require('../config');
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(SMTP);

// Captcha
exports.captcha = (req, res) => {
    fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET}&response=${req.params.token}`, {
        method: 'POST'
    })
    .then(data => data.json())
    .then(json => {
        res.send({valid: json.success})
    });
};

// Test drive
exports.testdrive = (req, res) => {
    transporter.sendMail({
        from: '"Tesla Motor City" <ozella.wolf10@ethereal.email>',
        to: 'me@filipkin.com',
        subject: 'Test Drive Request', // Subject line
        html: `${req.body.firstName} ${req.body.lastName} is requesting to test drive a model ${req.body.model}\n\n${req.body.email}\n${req.body.phone}\n\n${req.body.comment}`
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
        html: `${req.body.firstName} ${req.body.lastName} is requesting to rent a model ${req.body.model}\n\n${req.body.email}\n${req.body.phone}\n\n${req.body.comment}`
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
        html: `${req.body.firstName} ${req.body.lastName} is requesting a special on a model ${req.body.model}\n\n${req.body.email}\n${req.body.phone}`
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
        html: `${JSON.stringify(req.body, null, 4)}`
    }).then(info => {
        console.log(info);
        res.send()
    });
};