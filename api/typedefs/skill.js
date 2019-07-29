const skill = `
    type Skill {
        _key: ID!
        _id: ID!
        name: String
    }

    input SkillInput {
        _key: ID
        _id: ID
        name: String
    }

    extend type Query {
        getSkillByKey (_key: ID): Skill
        getSkillByName(name: String): Skill
        getSkillsByName(name: String): [Skill]!
    }
    
    extend type Mutation {
        upsertSkill (_key: ID, name: String): Skill
    }
`

module.exports = skill;