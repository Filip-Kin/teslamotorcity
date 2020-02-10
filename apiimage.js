const { unlink, existsSync, writeFile } = require('fs');
const uuid4 = require('uuidv4');

exports.fsRemove = (id, c, next) => {
    if (existsSync('web/img/'+id)) {
        unlink('web/img/'+id, (err) => {
            if (err) return next(err);
            return next(false);
        });
    } else {
        console.warn('Tried deleting an image that does not exist');
        return next(false);
    }
}

exports.remove = (req, res, c) => {
    fsRemove(req.params.id, c, (err) => {
        if (err) {
            res.status(500);
            return res.send({status: 500, message: err.message});
        }
        res.send({status: 200, message: req.params.id});
    })
}

exports.upload = (req, res, c) => {
    let id = uuid4.uuid();
    console.log(req.headers);
    let type = req.headers['content-type'].split('/')[1];
    writeFile('./web/img/'+id+type, req.body, (err) => {
        if (err) {
            res.status(500);
            res.send({status: 500, message: err.message});
        } else {
            res.status(200);
            res.send({status: 200, message: id+type});
        }
    })
}