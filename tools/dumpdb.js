const mysqldump = require('mysqldump');
const { DATABASE_CREDENTIALS } = require('../config');
mysqldump({connection: DATABASE_CREDENTIALS, dumpToFile: './dbBackup.sql'});
