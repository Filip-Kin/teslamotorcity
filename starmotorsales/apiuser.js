const uuidv4 = require('uuidv4');
const auth = require('./apiauth.js');

exports.addUser = (req, res, c) => {
    let id = uuidv4.uuid();
    let hash = auth.constructHashString(auth.hashPassword(req.body.password));
    console.log(id+' '+hash.length+' '+hash);
    c.query(`INSERT INTO users 
    (id, username, permissions, password) 
    VALUES (
        '${id}',
        '${req.body.username.toLowerCase()}',
        '',
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