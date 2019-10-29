const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
      _id: ID!
      firstName: String
      lastName: String
      username: String
      email: String!
      password: String
      profilePicture: String
      gender: Gender
      phone: String
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

    type Shelter {
      _id: ID!
      name: String!
      code: Int!
      address: String!
      city: String!
      country: String!
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

    enum UserType {
      USER
      SHELTER_OWNER
      VET
    }

    enum AnimalType {
      CAT
      DOG
    }
    
    enum Gender {
      MALE
      FEMALE
    }

     
    type AuthData {
      userId: ID!
      token: String!
      user: User!
    }
    
    type ForgotPasswordData {
      emailOrUsername: String
      token: String
    }
    

    input UserRegisterInput {
      email: String!
      password: String!
      phone: String!
      username: String!
    }

    type RootQuery {
      forgotPassword(emailOrUsername: String!): ForgotPasswordData
      currentUser: User
      getUsers: [User!]
      getUserById(userId: ID!): User
      getUserByUsername(username: String!): User
      getUserByPhone(phone: String!): User
    }

    type RootMutation {
      login(emailOrPhone: String!, password: String!): AuthData

      register(userRegisterInput: UserRegisterInput!): AuthData
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `);
