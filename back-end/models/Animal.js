// /backend/data.js
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const GENDERS = require('./enums/Gender');
const ANIMAL_TYPES = require('./enums/Animal');

// this will be our data base's data structure
const AnimalSchema = new Schema(
  {
    name: {
      type: String
    },
    code: {
      type: Number,
      unique: true
    },
    birthdate: {
      type: Date
    },
    gender: {
      type: String,
      enum: GENDERS,
      default: 'NONE'
    },
    animalType: {
      type: String,
      enum: ANIMAL_TYPES,
      default: 'NONE'
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
    owner: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    shelter: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Shelter'
      }
    ]
  },
  { timestamps: true }
);

AnimalSchema.plugin(uniqueValidator);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Animal', AnimalSchema);
