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
      expiration: Int!
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
    }

    input UserLoginInput {
      emailOrPhone: String
      password: String
      expiration: Int
    }

    type RootQuery {
      login(userLoginInput: UserLoginInput): AuthData
      forgotPassword(emailOrUsername: String!): ForgotPasswordData
      
      getUsers: [User!]
      getUserById(userId: ID!): User
      getUserByUsername(username: String!): User
      getUserByPhone(phone: String!): User
      
      getLast10Posts: [Post]
      getPostById(postId: ID!): Post
      getPostsWithPage(offset: Int!, limit: Int!): [Post]
      getPostsByUser(userId: ID!): [Post]
      getPostsByUserWithPage(userId: ID!, offset: Int!, limit: Int!): [Post]

      getCommentsOfPost(postId: ID!): [Comment]

      getLast10Shelters: [Shelter]
      getShelterById(shelterId: ID!): Shelter
      getSheltersWithPage(offset: Int!, limit: Int!): [Shelter]
      getShelterByCode(code: String!): Shelter
      getSheltersByCity(city: String!): [Shelter]
      getShelterByName(name: String!): Shelter

      getLast15Stories: [Story]
      getLastStoriesOfUser(userId: ID!): [Story]
    }
    
    type RootMutation {
      register(userRegisterInput: UserRegisterInput!): User
      resetPassword(newPassword: String!, token: String!): User
      confirmAccount(confirmId: String!): Boolean

      addPost(postInput: PostInput): Post
      updatePost(postId: ID!, postInput: PostInput): Post
      deletePost(postId: ID!): Post

      addComment(sourceId: ID!, commentInput: CommentInput): Comment
      updateComment(commentId: ID!, commentInput: CommentInput): Comment
      deleteComment(commentId: ID!): Comment
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `);
