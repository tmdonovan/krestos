const person = `
    type Person {
        _key: ID!
        _id: ID!
        firstName: String
        lastName: String
        spouse: Person
    }

    input PersonInput {
        _key: ID
        _id: ID
        firstName: String
        lastName: String
        Spouse: PersonInput
    }

    type Query {
        getPersonByKey (_key: ID): Person
        getPersonByName(firstName: String, lastName: String): Person
    }
    
    type Mutation {
        upsertPerson (_key: ID, firstName: String, lastName: String, spouse:PersonInput): Person
    }
`

module.exports = person;