const uuidv4 = require('uuidv4');
const { fsRemove } = require('./apiimage.js');

// Car inventory
exports.inventory = (req, res, c) => {
    c.query(`SELECT * FROM cars`, (err, row) => {
        if (err) { 
            console.error(err);
            res.status(500);
            return res.send({status: 500, error: err.message});
        }
        res.send(row);
    });
}

// Car info
exports.info = (req, res, c) => {
    let response = {status: 404, error: "404 Car not found"};
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
}

// Add or update car
exports.add = (req, res, c) => {
    req.body.images = JSON.parse(req.body.images);
    if (req.body.id !== undefined) {
        console.log(req.body);
        c.query(`UPDATE cars 
        SET
            make = '${req.body.make}',
            model = '${req.body.model}',
            year = '${req.body.year}',
            vin = '${req.body.vin}',
            price = ${req.body.price},
            description = '${req.body.description}',
            body = '${req.body.body}',
            color = '${req.body.color}',
            engine = '${req.body.engine}',
            drive = '${req.body.drive}',
            cylinders = '${req.body.cylinders}',
            transmission = '${req.body.transmission}',
            fuel = '${req.body.fuel}',
            images = '${JSON.stringify(req.body.images)}'
        WHERE id = '${req.body.id}'`, (err) => {
            if (err) { 
                console.error(err);
                res.status(500);
                return res.send({status: 500, message: err.message}); 
            }
            res.send({status: 200, message: req.body.id});
        });
    } else {
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
            '${JSON.stringify(req.body.images)}'
        )`, (err) => {
            if (err) { 
                console.error(err);
                res.status(500);
                return res.send({status: 500, message: err.message}); 
            }
            res.send({status: 200, message: id});
        });
    }
}

// Remove a car
(req, res, c) => {
    console.log('Remove '+req.params.carId);
    c.query(`DELETE FROM cars WHERE id = '${req.params.carId}';`, (err) => {
        if (err) { 
            console.error(err);
            res.status(500);
            return res.send({status: 500, message: err.message}); 
        }
        fsRemove((err) => {
            if (err) {
                console.error(err);
            }
            res.send({status: 200, message: 'Removed'});
        });
    });
}