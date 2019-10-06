// /backend/data.js
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const GENDERS = require('./enums/Gender');
const USER_TYPES = require('./enums/UserType');

// this will be our data base's data structure
const UserSchema = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    username: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profilePicture: {
      type: String,
      default: `/images/user/${Math.floor(Math.random() * 10) + 1}.svg` // random number between 1 and 10
    },
    gender: {
      type: String,
      enum: GENDERS,
      default: 'NONE'
    },
    address: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String,
      default: 'Türkiye'
    },
    userType: {
      type: String,
      enum: USER_TYPES,
      default: 'USER'
    },
    birthdate: {
      type: Date
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpiration: {
      type: String
    },
    createdBy: {
      type: String
    },
    updatedBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    },
    animals: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Animal'
      }
    ],
    shelters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Shelter'
      }
    ]
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('User', UserSchema);
