const { writeFile } = require('fs');
const minify = require('minify');

const options = {

}

const files = [
    './static/css/global.css',
    './static/js/add.js',
    './static/js/addUser.js',
    './static/js/admin.js',
    './static/js/inventory.js',
    './static/js/users.js',
    './static/js/financing.js',
    './static/js/index.js',
    './static/js/info.js',
    './static/js/rental.js',
    './static/js/specials.js',
    './static/js/testdrive.js'
]

let threads = [];

for (let i = 0; i < files.length; i++) {
    let file = files[i];
    console.log('Processing ' + file)
    let type = file.match(/(js|css|html)$/gm);
    threads.push(new Promise((resolve, reject) => {
        minify(file, options).then((data) => {
            let newFile = file.replace(/\.(js|css|html)$/gm, '.min.' + type[0]);
            console.log('Writing ' + newFile)
            writeFile(newFile, data, (err) => {
                if (err) {
                    console.log('Write error on file ' + file);
                    console.error(err);
                }
                resolve();
            })
        }).catch(err => {
            console.log('Minify error on file ' + file);
            console.error(err);
            resolve();
        });
    }));
}

Promise.all(threads).then(console.log('Done!'));