// /backend/data.js
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// this will be our data base's data structure
const UserSessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    signedIn: {
      type: Date,
      default: Date.now()
    },
    browser: {
      type: String,
    },
    ipAddress: {
      type: String
    },
    expiration: {
      type: Date,
    }
    isRevoked: {
      type: Boolean,
      default: false,
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

UserSessionSchema.plugin(uniqueValidator);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('UserSession', UserSessionSchema);
