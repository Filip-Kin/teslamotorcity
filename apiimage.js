const { unlink, existsSync } = require('fs');

exports.fsRemove = (id, c, next) => {
    c.query(`DELETE FROM images WHERE id = '${id}';`, (err) => {
        if (err) console.warn(err);
        if (existsSync('web/img/'+id)) {
            unlink('web/img/'+id, (err) => {
                if (err) return next(err);
                return next(false);
            });
        } else {
            console.warn('Tried deleting an image that does not exist');
            return next(false);
        }
    })
}

exports.remove = (req, res, c) => {
    fsRemove(req.params.id, c, (err) => {
        if (err) {
            res.status(500);
            return res.send({status: 500, message: err.message});
        }
        res.send({status: 200, message: req.params.id+' was deleted'});
    })
}

exports.upload = (req, res, c) => {
    // magic
}