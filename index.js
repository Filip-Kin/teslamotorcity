const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('web'));
app.use('/vendor/materialize-css', express.static('node_modules/materialize-css'));

app.get('/car/:carId', (req, res) => {
    fs.readFile('web/car.html', (err, data) => {
        if (err) throw err;
        // mysql magic
        res.send(data.toString().replace('{$carId}', req.params.carId));
    });
});

// API
app.get('/api', (req, res) => res.send('Hello World!'));
app.get('/api/car/:carId', (req, res) => {
    let response = {status: 404, error: "404 Car not found"}
    // mysql magic
    if (response.status === 404) res.status(404);
    res.send(response);
});
app.get('/api/image/:imageId', (req, res) => {
    let response = {status: 404, error: "404 Car not found"}
    fs.readFile('carimg/'+req.params.imageId+'.jpg', (err, data) => {
        if (err) { 
            response.error = err.message;
        } else {
            return res.send(data);
        }
        if (response.status === 404) res.status(404);
        res.send(response);
    });
});


app.listen(port, () => console.log('SMS Server running on '+port));
