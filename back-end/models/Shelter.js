// /backend/data.js
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// this will be our data base's data structure
const ShelterSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    code: {
      type: Number,
      unique: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      default: 'Türkiye'
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
    ]
  },
  { timestamps: true }
);

ShelterSchema.plugin(uniqueValidator);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Shelter', ShelterSchema);
