exports.auth = (id, password, c, action='') => {
    c.query(`SELECT * FROM users WHERE id = '${id}'`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) {
            return false;
        } else {
            if (true) return true;
        }
    })
}