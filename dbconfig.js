require('dotenv').config();
const config = {

    "user": 'admin',

    "password": 'admin12345',
    //"password": 'admin',
    //"server": 'localhost',
    "server": 'dev401auto.ci1pydypsyf1.us-east-2.rds.amazonaws.com',

    "database": '401AutoDev_BackUpDB',

    "dialect": "mssql",
    "trustServerCertificate": true,

    "dialectOptions": {
        "instanceName": "SQLEXPRESS",
        "port": 1433
    }
};

module.exports = config;


