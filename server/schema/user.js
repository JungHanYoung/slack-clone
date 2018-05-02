export default `
    type User {
        id: Int!
        email: String!
        username: String!
        teams: [Team!]!
    }

    type RegisterResponse {
        ok: Boolean!
        user: User
        errors: [Error!]
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): RegisterResponse!
    }

    type Query {
        getUser(id: Int!): User!
        allUsers: [User!]!
    }
`