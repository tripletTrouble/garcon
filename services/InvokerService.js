var fs = require('node:fs');
var path = require('path');

var init = () => {
    fs.copyFileSync(
        path.join(__dirname, '../templates/config.tm.gc'),
        path.join(process.cwd(), './garcon.config.js')
    );
}

module.exports = init;
