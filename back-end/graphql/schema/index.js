const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
      _id: ID!
      firstName: String
      lastName: String
      username: String!
      email: String!
      password: String!
      profilePicture: String
      gender: Gender
      address: String
      city: String
      country: String
      userType: UserType!
      birthdate: String
      isActive: Boolean
      isBlocked: Boolean
      createdAt: String
      updatedAt: String
      createdBy: String
      updatedBy: String
      resetPasswordToken: String
      resetPasswordExpiration: String
      animals: [Animal]
      shelters: [Shelter]
    }

    enum UserType {
      USER
      SHELTER_OWNER
    }

    enum AnimalType {
      CAT
      DOG
      BIRD
      NONE
    }

    type Shelter {
      _id: ID!
      name: String!
      code: Int!
      address: String!
      city: String!
      country: String
      createdBy: String
      updatedBy: String
      createdAt: String
      updatedAt: String
      owner: User
    }

    type Animal {
      _id: ID!
      name: String
      code: Int!
      birthdate: String
      gender: Gender
      animalType: AnimalType
      owner: User
      createdBy: String
      updatedBy: String
      createdAt: String
      updatedAt: String
    }

    type AuthData {
      userId: ID!
      token: String!
      expiration: Int!
      user: User!
    }
    
    type ForgotPasswordData {
      emailOrUsername: String
      token: String
    }
    
    enum Gender {
      MALE
      FEMALE
    }

    input UserRegisterInput {
      username: String!
      email: String!
      password: String!
    }

    input UserLoginInput {
      email: String
      password: String
      expiration: Int
    }

    type RootQuery {
      login(userLoginInput: UserLoginInput): AuthData
      forgotPassword(emailOrUsername: String!): ForgotPasswordData

      getUsers: [User!]
      getUserById(userId: ID!): User
      getUserByUsername(username: String!): User

    }
    
    type RootMutation {
      register(userRegisterInput: UserRegisterInput!): User
      resetPassword(newPassword: String!, token: String!): User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `);
