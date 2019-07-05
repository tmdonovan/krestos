const skill = `
    type skill {
        _key: ID!
        _id: ID!
        name: String
    }

    input skillInput {
        _key: ID
        _id: ID
        name: String
    }

    extend type Query {
        getSkillByKey (_key: ID): skill
        getSkillByName(name: String): skill
        getSkills(name: String): [skill]!
    }
    
    extend type Mutation {
        upsertSkill (_key: ID, name: String): skill
    }
`

module.exports = skill;