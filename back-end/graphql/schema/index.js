const CAT_BREEDS = require('../../models/enums/CatBreed');
const DOG_BREEDS = require('../../models/enums/DogBreed');
const { gql } = require('apollo-server');


const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    phone: String
    about: String
    profilePicture: String
    gender: Gender
    address: String
    city: String
    country: String
    userType: UserType!
    birthdate: String
    isActive: Boolean
    isBlocked: Boolean
    confirmId: String
    phoneCode: String
    resetPasswordCode: String
    resetPasswordCodeExpiration: String
    emailConfirmed: Boolean
    phoneConfirmed: Boolean
    animals: [Animal]
    shelters: [Shelter]
    
    createdAt: String
    updatedAt: String
    createdBy: String
    updatedBy: String
  }

  type Shelter {
    _id: ID!
    name: String!
    code: Int!
    address: String!
    city: String!
    country: String!
    owner: User

    createdBy: String
    updatedBy: String
    createdAt: String
    updatedAt: String
  }

  type Animal {
    _id: ID
    name: String
    code: Int
    breed: Breed
    ageInterval: AgeInterval
    gender: Gender
    animalType: AnimalType
    description: String
    healthProblems: String
    characteristics: [Characteristic]
    profilePhoto: String
    images: [String]

    createdBy: String
    updatedBy: String
    createdAt: String
    updatedAt: String
  }

  type Post {
    title: String!
    description: String!
    slug: String!
    content: String!
    featuredImage: String
    user: User!
    comments: [Comment]
    
    createdBy: String
    updatedBy: String
    createdAt: String
    updatedAt: String
  }

  type Comment {
    content: String!
    user: User!
    
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
    NONE
  }
  
  enum AgeInterval {
    ZERO_SIX
    SIX_TWELVE
    TWELVE_TWOFOUR
    TWOFOUR_MORE
  }

  enum Breed {
    BREED_1
    BREED_2
    BREED_3
    BREED_4
    BREED_5
  }

  enum Characteristic {
    SHED
    DOCILE
    PLAYFUL
    ENERGETIC
    TRAINED
    FRIENDLY
    INTELLIGENT
    FREE_SPIRITED
  }
    
  type AuthData {
    userId: ID!
    token: String!
    user: User!
  }
  
  type ForgotPasswordData {
    phone: String
    token: String
  }
  

  input UserRegisterInput {
    email: String!
    password: String!
    phone: String!
    name: String!
    surname: String!
  }

  input CreatePetInput {
    type: AnimalType
    name: String
    age: AgeInterval
    breed: Breed
    characteristics: [Characteristic]
    description: String
    gender: Gender
    image: String
    phone: String
  }

  type Query {
    currentUser: User
    getUsers: [User!]
    getUserById(userId: ID!): User
    getUserByPhone(phone: String!): User
    
    getLast10Posts: [Post]
    getPostById(postId: ID!): Post
    getPostsWithPage(offset: Int, limit: Int): [Post]
    getPostsByUser(userId: ID!): [Post]
    getPostsByUserWithPage(offset: Int, limit: Int, userId: ID!): [Post]

  }

  type Mutation {
    login(phone: String!, password: String!): AuthData
    register(userRegisterInput: UserRegisterInput!): AuthData
    forgotPasswordWithPhone(phone: String!): Boolean
    resetPassword(phone: String!, code: String!, newPassword: String!): Boolean
    checkResetPasswordCode(phone: String!, code: String!): Boolean
    activateAccountWithPhone(phone: String!, code: String!): Boolean
    activateAccount(phone: String!, code: String!): Boolean

    createPet(createPetInput: CreatePetInput): Animal
  }
`;

module.exports = typeDefs;