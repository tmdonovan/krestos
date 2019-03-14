const { expect } = require('chai')
const { it, describe } = require('mocha');
const config = require('../../db.config');

describe('The database', () => {
    const db = require('../../setup/database.js');

    it('... has a connection', () => {
        expect(db).to.have.property('_connection')
    });

    it('...has the krestos database', () => {
        expect(db.name).to.equal(config.database);
    });
});


