const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');

exports.hashPassword = (password) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let iterations = 10000;
    let keylen = 32;
    let hash = pbkdf2.pbkdf2Sync(password, salt, iterations, keylen);
    return {
        method: 'X-PBKDF2',
        salt: salt,
        hash: hash.toString('base64'),
        iterations: iterations,
        keylen: keylen
    };
};
exports.testPassword = (password, hash) => {
    return pbkdf2.pbkdf2Sync(password, hash.salt, hash.iterations, hash.keylen).toString('base64') === hash.hash;
}

exports.constructHashString = (hash) => {
    return `{${hash.method}}${hash.salt}:${hash.hash}:${hash.iterations}:${hash.keylen}`;
}
exports.deconstructHashString = (hash) => {
    let parts = hash.split('}')[1].split(':');
    return {
        method: hash.split('}')[0].replace('{', ''),
        salt: parts[0], 
        hash: parts[1],
        iterations: parseInt(parts[2]),
        keylen: parseInt(parts[3])
    }
}

exports.auth = (id, password, c, permissions, next) => {
    c.query(`SELECT * FROM users WHERE id = '${id}'`, (err, rows) => {
        if (err) next(err, null)
        console.log(rows);
        if (rows[0] == undefined) {
            next(false, false, false)
        } else {
            if (rows[0].permissions < permissions) return next(false, false, false); // If permission level is less than required
            if (permissions < 0) return next(false, this.testPassword(password, this.deconstructHashString(rows[0].password)), rows[0].permissions);
            next(false, this.testPassword(password, this.deconstructHashString(rows[0].password)), true);
        }
    })
}

exports.apiauth = (req, res, c) => {
    console.log(req.body);
    exports.auth(req.params.id, req.body.password, c, -1, (err, out, permissions) => {
        if (err) {
            res.status(500);
            res.send({status: 500, message: err.message});
        }
        res.send({status: 200, auth: out, permissions: permissions});
    });
}