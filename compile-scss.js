require('node-sass').render({
    file: 'node_modules/materialize-css/sass/materialize.scss'
}, function(err, result) { 
    if (err) throw err;
    let out = result.css.toString();
    console.log(out);
    require('fs').writeFileSync('node_modules/materialize-css/css/materialize.css', out);
    let min = require('uglifycss').processString(out)
    console.log(min);
    require('fs').writeFileSync('node_modules/materialize-css/css/materialize.min.css', min);
    console.log('Done!');
});