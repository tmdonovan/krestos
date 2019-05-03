const { gql } = require('apollo-server-koa');
const person = require('./person');
const typeDefs = gql`
    ${person}
`;

module.exports = typeDefs;