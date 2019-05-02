const { expect } = require('chai')
const { it, describe } = require('mocha');
const config = require('../../db.config');

describe('The database', () => {
    const db = require('../../setup/database.js');

    it('... has a connection', () => {
        expect(db.database).to.have.property('_connection')
    });

    it('...has the krestos database', () => {
        expect(db.database.name).to.equal(config.database);
    });
    
    it('...has some cursor functions', () => {
        expect(db.database).to.have.property('q');
        expect(db.database).to.have.property('qNext');
        expect(db.database).to.have.property('qAll');
    });

    it('...has AQL along for the ride', () => {
        expect(db).to.have.property('aql');
    });

});


