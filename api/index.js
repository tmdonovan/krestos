const typeDefs = require('./typedefs/index');

const resolvers = {
   Query: {
    getPersonByKey: async function (obj, args, ctx, info) {
        if(args._key == null) return;

        return ctx.database.qNext(ctx.aql`
            RETURN DOCUMENT('people', ${args._key})
        `);
    }
   },
   Mutation: {
    upsertPerson: async function (obj, args, ctx, info) {
        const record  = args;

        console.log(args);
        console.log(ctx);
        record.updatedAt = new Date();

        if (record._key == null) {
            record.createdAt = new Date();
            record = await ctx.qNext(ctx.aql`
                INSERT ${record} INTO people RETURN NEW
            `);
        }

        record = await ctx.qNext(ctx.aql`
            UPDATE ${record._key} WITH ${record} IN people RETURN NEW
        `);

        console.log(record);

        return record;
    }
   }
}

module.exports = {
    typeDefs,
    resolvers
}