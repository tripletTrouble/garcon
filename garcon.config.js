var fs = require('node:fs');
var path = require('path');

if (fs.existsSync(path.join(process.cwd(), './garcon.config.js'))) {
    var garconConfig = require(path.join(process.cwd(), './garcon.config.js'));
}else {
    console.error("Config not provided! Please run npx garcon init");
    process.exit(0);
}

module.exports = garconConfig;