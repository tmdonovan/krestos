const person = require('./person');
const skill = require('./skill');

module.exports = {
    Query: {
        ...person.Query,
        ...skill.Query
    },
    Mutation: {
        ...person.Mutation,
        ...skill.Mutation
    }
};
