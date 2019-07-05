const { gql } = require('apollo-server-koa');
const person = require('./person');
const skill = require('./skill');
const typeDefs = gql`
    type Query{
        _empty: String
    }
    type Mutation {
        _empty: String
    }
    ${person}
    ${skill}
`;

module.exports = typeDefs;