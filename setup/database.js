const config = require('../config/index').db;
const arangojs = require('arangojs');
const { Database, aql } = arangojs;
const database = new Database(`${config.host}:${config.port}`);


database.useDatabase(config.database);

if (config.user && config.password) {
    database.useBasicAuth(config.user, config.password);
}

const q = async function (...args) {
    let cursor = null;
    let attempts = 0;

    while (cursor == null) {
      attempts += 1
      try {
        cursor = await database.query(...args)
      } catch (err) {
        if (err.errorNum !== 1200 || attempts >= 50) {
          console.log(args);
          throw err;
        }
      }
    }

    return cursor
}

const qNext = async function (query) {
    const cursor = await q(query);

    return cursor.next();
}

const qAll = async function (query) {
    const cursor = await q(query);

    return cursor.all();
}

database.q = q;
database.qNext = qNext;
database.qAll = qAll;

module.exports = {
    database,
    aql
};
