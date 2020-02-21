const fs = require('fs');

exports.generateBlankUserAddPage = (req, res) => {
    fs.readFile('./dynamic/addUser.html', (err, data) => {
        if (err) throw err;
        res.send(data.toString());
    });
};

exports.generateUserEditPage = (req, res, c) => {
    fs.readFile('./dynamic/addUser.html', (err, data) => {
        if (err) throw err;
        data = data.toString();
        c.query(`SELECT * FROM users WHERE id = "${req.params.userId}"`, (err, row) => {
            if (err) res.send(data);

            if (row.length < 1) {
                res.status(404);
                return res.send('Not found');
            }
            row = row[0];
            console.log(row);
            // Replace variables in the .html
            data = data.replace('${id}', row.id);
            data = data.replace('${username}', row.username);
            data = data.replace('${permissions}', row.permissions);

            res.send(data);
        });
    });
}