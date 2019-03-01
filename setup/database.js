const config = require('../db.config.js');
const Sequelize = require('sequelize');

module.exports = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        dialect: 'postgres',
        host: config.host,
        port: config.port,
        logging: false,
        operatorsAliases: false,
    }
);
