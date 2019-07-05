const { gql } = require('apollo-server-koa');
const person = require('./person');
const typeDefs = gql`
    type Query{
        _empty: String
    }
    type Mutation {
        _empty: String
    }
    ${person}
`;

module.exports = typeDefs;