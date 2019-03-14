const config = require('../db.config.js');
const Database = require('arangojs').Database;
const database = new Database(`${config.host}:${config.port}`);

database.useDatabase(config.database)
module.exports = database;
