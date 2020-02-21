const { unlink, existsSync, writeFile } = require('fs');
const { auth } = require('./apiauth.js');
const uuid4 = require('uuidv4');

exports.fsRemove = (id, c, next) => {
    if (existsSync('static/img/'+id)) {
        unlink('static/img/'+id, (err) => {
            if (err) return next(err);
            return next(false);
        });
    } else {
        console.warn('Tried deleting an image that does not exist');
        return next(false);
    }
}

exports.remove = (req, res, c) => {
    auth(req.headers.id, req.headers.password, c, 1, (err, login, permission) => {
        if (err) {
            res.status(500);
            res.send({status: 500, message: err.message});
        } else if (!login || !permission) {
            res.status(403);
            res.send({status: 403, message: 'Invalid credentials'});
        } else {
            this.fsRemove(req.params.id, c, (err) => {
                if (err) {
                    res.status(500);
                    return res.send({status: 500, message: err.message});
                }
                res.send({status: 200, message: req.params.id});
            });
        }
    });
}

exports.upload = (req, res, c) => {
    auth(req.headers.id, req.headers.password, c, 1, (err, login, permission) => {
        if (err) {
            res.status(500);
            res.send({status: 500, message: err.message});
        } else if (!login || !permission) {
            res.status(403);
            res.send({status: 403, message: 'Invalid credentials'});
        } else {
            let id = uuid4.uuid();
            console.log(req.headers);
            let type = '.'+req.headers['content-type'].split('/')[1];
            writeFile('./static/img/'+id+type, req.body, err => {
                if (err) {
                    res.status(500);
                    res.send({status: 500, message: err.message});
                } else {
                    res.status(200);
                    res.send({status: 200, message: id+type});
                }
            });
        }
    });
}
