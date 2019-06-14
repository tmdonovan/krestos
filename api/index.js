const typeDefs = require('./typedefs/index');
const {
    database,
    aql
} = require('./../setup/database');

const resolvers = {
    Query: {
        getPersonByKey: async function (obj, args, ctx, info) {
            if (args._key == null) return;

            const result = await database.qNext(aql `
            RETURN DOCUMENT('people', ${args._key})
        `);

            return result;
        },
        getPersonByName: async function (obj, args, ctx, info) {
            if (!args.firstName && !args.lastName) return;

            console.log(args);
            let {
                firstName,
                lastName
            } = args;

            firstName = firstName ? firstName : '';
            lastName = lastName ? lastName : '';

            const result = await database.qNext(aql `
            FOR person IN people
                FILTER person.firstName == ${firstName} OR person.lastName == ${lastName}
                RETURN person
            `);

            return result;
        }
    },
    Mutation: {
        upsertPerson: async function (obj, args, ctxN, info) {
            let record = args;

            record.updatedAt = new Date();

            if (record._key == null) {
                record.createdAt = new Date();
                record = await database.qNext(aql `
                INSERT ${record} INTO people RETURN NEW
            `);
            }

            record = await database.qNext(aql `
            UPDATE ${record._key} WITH ${record} IN people RETURN NEW
        `);

            return record;
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}