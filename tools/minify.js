const minify = require('uglifycss');
let globalMin = minify.processFiles(['web/css/global.css']);
require('fs').writeFileSync('web/css/global.min.css', globalMin);
console.log('Done!');