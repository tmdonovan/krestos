const {
    database,
    aql
} = require('./../../setup/database');

const resolvers = {
    Query: {
        getSkillByKey: async function (obj, args, ctx, info) {
            if (args._key == null) return;

            const result = await database.qNext(aql `
            RETURN DOCUMENT('skills', ${args._key})
        `);

            return result;
        },
        getSkillByName: async function (obj, args, ctx, info) {
            if (!args.name) return;

            let {
                name,
            } = args;

            name = name ? name : '';

            const result = await database.qNext(aql `
            FOR skill IN skills
                FILTER skill.name == ${name}
                RETURN skill
            `);

            return result;
        },
        getSkillsByName: async function (obj, args, ctx, info) {
            if (!args.name) return;

            let {
                name
            } = args;

            const result = await database.qAll(aql `
            FOR skill IN skills
                FILTER skill.name == ${name}
                RETURN skill
            `);
        }
    },
    Mutation: {
        upsertSkill: async function (obj, args, ctxN, info) {
            let record = args;

            record.updatedAt = new Date();

            if (record._key == null) {
                record.createdAt = new Date();
                record = await database.qNext(aql `
                INSERT ${record} INTO skills RETURN NEW
            `);
            }

            record = await database.qNext(aql `
            UPDATE ${record._key} WITH ${record} IN skills RETURN NEW
        `);

            return record;
        }
    }
}

module.exports = resolvers;