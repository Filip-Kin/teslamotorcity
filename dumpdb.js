const mysqldump = require('mysqldump');
let connectionDetails = {
    host: '34.74.167.132',
    port: 3306,
    user: 'starmotorsales',
    password: 'niwV^sqxb1s3Z!5h04KXlPTO8cdqO82@',
    database: 'starmotorsales'
};
mysqldump({connection: connectionDetails, dumpToFile: './dbBackup.sql'});
