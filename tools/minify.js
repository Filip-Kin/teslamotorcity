const { writeFile, readFileSync } = require('fs');
const minifyCSS = require('uglifycss');
const minifyJS = require('uglify-js');

Promise.all([
    new Promise((resolve, reject) => {
        writeFile('static/css/global.min.css', minifyCSS.processFiles(['static/css/global.css']), () =>  resolve());
    }),
    new Promise((resolve, reject) => {
        let minified = minifyJS.minify({
            'add.js': readFileSync('static/js/add.js'),
            'admin.js': readFileSync('static/js/admin.js'),
            'index.js': readFileSync('static/js/index.js'),
            'inventory.js': readFileSync('static/js/inventory.js')
        });
        if (minified.error) console.error(minified.error);
        writeFile('static/js/global.min.js', minified.code, () => resolve());
    })
]).then(() => console.log('Done!'));