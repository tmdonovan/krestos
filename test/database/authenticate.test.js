const { expect } = require('chai')
const { it, describe } = require('mocha');

describe('The database', () => {
    it('... actually exists', (done) => {
        const sequelize = require('../../setup/database.js');

            sequelize
                .authenticate()
                .then(() => {
                    expect(true).to.equal(true);
                })
                .catch(err => {
                    expect(true).to.equal(false);
                })
                .finally( () => {
                    done();
                });
    });
});


