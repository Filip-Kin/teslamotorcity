const uuidv4 = require('uuidv4');
const auth = require('./apiauth.js');

exports.addUser = (req, res, c) => {
    auth.auth(req.headers.id, req.headers.password, c, 2, (err, login, permission) => {
        if (err) {
            res.status(500);
            res.send({status: 500, message: err.message});
        } else if (!login || !permission) {
            res.status(403);
            res.send({status: 403, message: 'Invalid credentials'});
        } else {
            console.log(req.body);
            if (req.body.id !== '') {
                if (req.body.password === '') {
                    c.query(`UPDATE users
                    SET
                        username = '${req.body.username}',
                        permissions = ${req.body.permissions}
                    WHERE id = '${req.body.id}';`, (err) => {
                        if (err) {
                            res.status(500);
                            res.send({status: 500, message: err.message});
                        } else {
                            res.send({status: 200, message: req.body.id});
                        }
                    })
                } else {
                    let hash = auth.constructHashString(auth.hashPassword(req.body.password));
                    c.query(`UPDATE users
                    SET
                        username = '${req.body.username}',
                        permissions = ${req.body.permissions},
                        password = '${hash}'
                    WHERE id = '${req.body.id}';`, (err) => {
                        if (err) {
                            res.status(500);
                            res.send({status: 500, message: err.message});
                        } else {
                            res.send({status: 200, message: req.body.id});
                        }
                    })
                }
            } else {
                let id = uuidv4.uuid();
                let hash = auth.constructHashString(auth.hashPassword(req.body.password));
                console.log(id+' '+hash.length+' '+hash);
                c.query(`INSERT INTO users 
                (id, username, permissions, password) 
                VALUES (
                    '${id}',
                    '${req.body.username.toLowerCase()}',
                    ${req.body.permissions},
                    '${hash}'
                )`, (err) => {
                    if (err) {
                        res.status(500);
                        res.send({status: 500, message: err.message});
                    } else {
                        res.send({status: 200, message: id});
                    }
                });
            }
        }
    });
}

exports.userExists = (req, res, c) => {
    c.query(`SELECT id FROM users WHERE username = '${req.params.username.toLowerCase()}'`, (err, rows) => {
        if (err) {
            res.status(500);
            res.send({status: 500, message: err.message});
        } else {
            res.send({status: 200, message: (rows.length > 0), id: (rows.length > 0)?rows[0].id:false});
        }
    });
}

exports.userList = (req, res, c) => {
    c.query(`SELECT id, username, permissions FROM users`, (err, rows) => {
        if (err) {
            res.status(500);
            res.send({status: 500, message: err.message});
        } else {
            res.send(rows);
        }
    })
}

// Remove a user
exports.remove = (req, res, c) => {
    auth.auth(req.headers.id, req.headers.password, c, -1, (err, login, permission) => {
        if (err) {
            res.status(500);
            res.send({status: 500, message: err.message});
        } else {
            c.query(`SELECT * FROM users WHERE id = '${req.params.username}';`, (err, rows) => {
                if (err) { 
                    res.status(500);
                    res.send({status: 500, message: err.message}); 
                } else {
                    if (rows[0] !== undefined) {
                        if (!login || permission < 2 || (rows[0].permissions == 3 && permission < 3)) {
                            res.status(403);
                            res.send({status: 403, message: 'Invalid credentials'});
                        } else {
                            console.log('Remove '+req.params.username);
                            c.query(`DELETE FROM users WHERE id = '${req.params.username}';`, (err) => {
                                if (err) { 
                                    res.status(500);
                                    res.send({status: 500, message: err.message}); 
                                } else {
                                    res.send({status: 200, message: 'Removed'});
                                }
                            });
                        }
                    }
                }
            });
        }
    });
}
