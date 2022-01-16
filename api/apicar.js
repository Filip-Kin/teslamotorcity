const uuidv4 = require('uuidv4');
const { auth } = require('./apiauth.js');
const { fsRemove } = require('./apiimage.js');
const sitemap = require('./sitemapUpdates.js');

// Car inventory
exports.inventory = (req, res, c) => {
    c.query(`SELECT * FROM cars ORDER BY year DESC`, (err, row) => {
        if (err) {
            console.error(err);
            res.status(500);
            return res.send({ status: 500, error: err.message });
        }
        for (car of row) {
            car.price = car.price / 100
        }
        res.send(row);
    });
}

// Car info
exports.info = (req, res, c) => {
    let response = { status: 404, error: "404 Car not found" };
    c.query(`SELECT * FROM cars WHERE id = "${req.params.carId}"`, (err, row) => {
        if (err) {
            console.error(err);
            res.status(500);
            return res.send({ status: 500, error: err.message });
        }
        if (row.length < 1) {
            return res.send(response);
        }
        row[0].price = row[0].price / 100
        res.send(row[0]);
    });
}

// Add or update car
exports.add = (req, res, pool) => {
    pool.getConnection((err, c) => {
        auth(req.headers.id, req.headers.password, c, 1, (err, login, permission) => {
            if (err) {
                res.status(500);
                res.send({ status: 500, message: err.message });
            } else if (!login || !permission) {
                res.status(403);
                res.send({ status: 403, message: 'Invalid credentials' });
            } else {
                if (req.body.id !== '') {
                    console.log(req.body);
                    c.query(`UPDATE cars 
                    SET
                        stock = '${req.body.stock}',
                        model = '${req.body.model}',
                        year = '${req.body.year}',
                        miles = ${req.body.miles},
                        vin = '${req.body.vin}',
                        price = ${req.body.price*100},
                        description = '${req.body.description}',
                        color = '${req.body.color}',
                        engine = '${req.body.engine}',
                        drive = '${req.body.drive}',
                        assist = '${req.body.assist}',
                        images = '${JSON.stringify(req.body.images)}'
                    WHERE id = '${req.body.id}'`, (err) => {
                        if (err) {
                            console.error(err);
                            res.status(500);
                            return res.send({ status: 500, message: err.message });
                        }
                        res.send({ status: 200, message: req.body.id });
                        sitemap.updateCar(req.body.id);
                        c.release();
                    });
                } else {
                    let id = uuidv4.uuid();
                    console.log(id);
                    console.log(req.body);
                    c.query(`INSERT INTO cars 
                    (id, stock, model, year, miles, vin, price, description, color, engine, drive, assist, images)
                    VALUES (
                        '${id}',
                        '${req.body.stock}',
                        '${req.body.model}',
                        '${req.body.year}',
                        ${req.body.miles},
                        '${req.body.vin}',
                        ${req.body.price*100},
                        '${req.body.description}',
                        '${req.body.color}',
                        '${req.body.engine}',
                        '${req.body.drive}',
                        '${req.body.assist}',
                        '${JSON.stringify(req.body.images)}'
                    )`, (err) => {
                        if (err) {
                            console.error(err);
                            res.status(500);
                            return res.send({ status: 500, message: err.message });
                        }
                        res.send({ status: 200, message: id });
                        sitemap.updateCar(id);
                        c.release();
                    });
                }
            }
        });
    });
}

// Remove a car
exports.remove = (req, res, pool) => {
    pool.getConnection((err, c) => {
        auth(req.headers.id, req.headers.password, c, 1, (err, login, permission) => {
            if (err) {
                res.status(500);
                res.send({ status: 500, message: err.message });
            } else if (!login || !permission) {
                res.status(403);
                res.send({ status: 403, message: 'Invalid credentials' });
            } else {
                console.log('Remove ' + req.params.carId);
                c.query(`SELECT images FROM cars WHERE id = '${req.params.carId}';`, (err, rows) => {
                    if (err) {
                        res.status(500);
                        res.send({ status: 500, message: err.message });
                    } else {
                        let threads = [];

                        threads.push(new Promise(resolve => {
                            c.query(`DELETE FROM cars WHERE id = '${req.params.carId}';`, (err) => {
                                if (err) {
                                    res.status(500);
                                    res.send({ status: 500, message: err.message });
                                }
                                resolve();
                            });
                        }));

                        if (rows[0] !== undefined) {
                            for (img of JSON.parse(rows[0].images)) {
                                threads.push(new Promise((resolve, reject) => {
                                    fsRemove(img, (err) => {
                                        if (err) console.error(err);
                                        resolve();
                                    });
                                }));
                            }
                        }

                        Promise.all(threads).then(() => {
                            res.send({ status: 200, message: 'Removed' });
                            sitemap.removeCar(req.body.carId);
                            c.release();
                        });
                    }
                });
            }
        });
    });
}