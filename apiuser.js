const uuidv4 = require('uuidv4');

const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');
let hashPassword = (password) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let iterations = 10000;
    let keylen = 32;
    let hash = pbkdf2.pbkdf2Sync(password, salt, iterations, keylen);
    return {
        salt: salt,
        hash: hash,
        iterations: iterations,
        keylen: keylen
    };
};
let constructHashString = (hash) => {
    return `{X-PBKDF2}${hash.salt}:${hash.hash.toString('base64')}:${hash.iterations}:${hash.keylen}`;
}

exports.addUser = (req, res, c) => {
    let id = uuidv4.uuid();
    let hash = constructHashString(hashPassword(req.body.password));
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
            res.send({status: 200, message: (rows.length > 0)});
        }
    });
}