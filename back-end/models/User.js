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
    phone: {
      type: String,
      required: true,
      unique: true
    },
    profilePicture: {
      type: String,
      default: `/images/user/${Math.floor(Math.random() * 10) + 1}.svg` // random number between 1 and 10
    },
    gender: {
      type: String,
      enum: GENDERS,
      default: 'NONE',
      required: true
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
      default: 'USER',
      required: true
    },
    birthdate: {
      type: Date
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    confirmId: {
      type: String
    },
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpiration: {
      type: String
    },
    animals: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Animal'
      }
    ],
    shelter: {
      type: Schema.Types.ObjectId,
      ref: 'Shelter'
    },
    clinic: {
      type: Schema.Types.ObjectId,
      ref: 'Clinic'
    },
    stories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Story'
      }
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
    loginHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'LoginHistory'
      }
    ],
    donations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Donation'
      }
    ],
    sharedPhotos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SharedPhoto'
      }
    ],
    suggestions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Suggestion'
      }
    ],
    favoritedAnimals: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Animal'
      }
    ],
    isApproved: {
      type: Boolean,
      default: false
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
    }
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('User', UserSchema);
