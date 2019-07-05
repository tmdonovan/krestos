const person = require('./person');
const skill = require('./skill');

module.exports = {
    ...person,
    ...skill,
};
