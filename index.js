const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('web'));
app.use('/vendor/materialize-css', express.static('node_modules/materialize-css'));
app.get('/api', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log('SMS Server running on '+port));
