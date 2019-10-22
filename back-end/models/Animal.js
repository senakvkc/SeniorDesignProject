// /backend/data.js
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const GENDERS = require('./enums/Gender');
const CAT_BREEDS = require('./enums/CatBreed');
const DOG_BREEDS = require('./enums/DogBreed');
const ANIMAL_TYPES = require('./enums/AnimalType');

// this will be our data base's data structure
const AnimalSchema = new Schema(
  {
    name: {
      type: String
    },
    code: {
      type: String,
      unique: true,
      required: true
    },
    breed: {
      type: String,
      enum: [...CAT_BREEDS, ...DOG_BREEDS],
      required: true
    },
    birthdate: {
      type: Date
    },
    gender: {
      type: String,
      enum: GENDERS,
      default: 'NONE',
      required: true
    },
    animalType: {
      type: String,
      enum: ANIMAL_TYPES,
      required: true
    },
    description: {
      type: String
    },
    healthProblems: {
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    shelter: {
      type: Schema.Types.ObjectId,
      ref: 'Shelter'
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

AnimalSchema.plugin(uniqueValidator);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Animal', AnimalSchema);
